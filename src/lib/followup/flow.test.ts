import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BookingInfo } from "./cal";

// The real store, handlers and daily job, run against an in-memory stand-in for
// Redis and a recording stand-in for the email service. Nothing leaves the test.

const fake = vi.hoisted(() => {
  const hashes = new Map<string, Map<string, string>>();
  const sets = new Map<string, Set<string>>();
  const sent: { to: string; subject: string; sendAt?: number; owner: boolean; id: string }[] = [];
  const cancelled: string[] = [];
  let counter = 0;
  return { hashes, sets, sent, cancelled, digestText: "", next: () => `id-${++counter}` };
});

vi.mock("./redis", () => ({
  redisConfigured: () => true,
  redis: async (...args: (string | number)[]) => {
    const [command, key, ...rest] = args.map(String);
    const { hashes, sets } = fake;
    switch (command) {
      case "HSET": {
        const h = hashes.get(key) ?? new Map<string, string>();
        for (let i = 0; i + 1 < rest.length; i += 2) h.set(rest[i], rest[i + 1]);
        hashes.set(key, h);
        return rest.length / 2;
      }
      case "HGETALL":
        return [...(hashes.get(key) ?? new Map<string, string>()).entries()].flat();
      case "HDEL": {
        const h = hashes.get(key);
        for (const field of rest) h?.delete(field);
        return 1;
      }
      case "HINCRBY": {
        const h = hashes.get(key) ?? new Map<string, string>();
        const value = Number(h.get(rest[0]) ?? 0) + Number(rest[1]);
        h.set(rest[0], String(value));
        hashes.set(key, h);
        return value;
      }
      case "DEL":
        hashes.delete(key);
        return 1;
      case "SADD": {
        const s = sets.get(key) ?? new Set<string>();
        rest.forEach((m) => s.add(m));
        sets.set(key, s);
        return 1;
      }
      case "SREM":
        rest.forEach((m) => sets.get(key)?.delete(m));
        return 1;
      case "SMEMBERS":
        return [...(sets.get(key) ?? new Set<string>())];
      default:
        return 1; // EXPIRE, PERSIST
    }
  },
}));

vi.mock("./mail", () => ({
  sendOwnerEmail: async (email: { subject: string; text: string }, sendAt?: number) => {
    const id = fake.next();
    if (email.subject.startsWith("Weekly:")) fake.digestText = email.text;
    fake.sent.push({ to: "owner", subject: email.subject, sendAt, owner: true, id });
    return id;
  },
  sendLeadEmail: async (input: { to: string; email: { subject: string }; sendAt?: number }) => {
    const id = fake.next();
    fake.sent.push({ to: input.to, subject: input.email.subject, sendAt: input.sendAt, owner: false, id });
    return id;
  },
  cancelEmail: async (id: string) => {
    if (id && id !== "skipped") fake.cancelled.push(id);
  },
}));

import { runDaily } from "./cron";
import { DAY_MS } from "./config";
import {
  handleBookingCancelled,
  handleBookingCreated,
  handleBookingRescheduled,
  handleNoShow,
  handleReviewRequest,
  unsubscribeByKey,
} from "./handlers";
import { getBooking, getLead, leadKey } from "./store";

const HOUR = 3_600_000;
const T0 = Date.UTC(2026, 10, 2, 12, 0, 0); // Monday November 2, 12:00 UTC
const MONDAY_RUN = Date.UTC(2026, 10, 9, 5, 0, 0); // Monday November 9, 10:00 in Karachi

const sam = { email: "sam@example.com", whatsapp: null, cameFrom: "/case-studies/acme" };

function booking(overrides: Partial<BookingInfo> = {}): BookingInfo {
  return {
    uid: "uid-1",
    startMs: T0 + 3 * DAY_MS,
    endMs: T0 + 3 * DAY_MS + 30 * 60_000,
    name: "Sam Lee",
    firstName: "Sam",
    email: "sam@example.com",
    timeZone: "America/New_York",
    answers: [{ label: "Your website", value: "example.com" }],
    cameFrom: "/book-call",
    rescheduleUid: null,
    ...overrides,
  };
}

function leadEmailsTo(email: string) {
  return fake.sent.filter((s) => s.to === email);
}

beforeEach(() => {
  fake.hashes.clear();
  fake.sets.clear();
  fake.sent.length = 0;
  fake.cancelled.length = 0;
  vi.stubEnv("LEAD_TOKEN_SECRET", "test-secret");
});

describe("a review request", () => {
  it("is stored, tells the owner and thanks the visitor once", async () => {
    expect(await handleReviewRequest(sam, T0)).toBe(true);
    expect(fake.sent.map((s) => s.subject)).toEqual([
      "New lead: review request",
      "Got it. Here is what happens next",
    ]);
    const lead = await getLead(leadKey("sam@example.com"));
    expect(lead?.status).toBe("new");

    // Asking twice tells the owner again but does not thank the visitor again.
    await handleReviewRequest(sam, T0 + HOUR);
    expect(fake.sent.filter((s) => s.subject === "Got it. Here is what happens next")).toHaveLength(1);
    expect(fake.sent.filter((s) => s.owner)).toHaveLength(2);
  });

  it("does not email someone who unsubscribed before", async () => {
    await handleReviewRequest(sam, T0);
    await unsubscribeByKey(leadKey("sam@example.com"));
    fake.sent.length = 0;
    await handleReviewRequest(sam, T0 + DAY_MS);
    expect(fake.sent.map((s) => s.subject)).toEqual(["New lead: review request"]);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(0);
  });
});

describe("the nurture sequence", () => {
  it("sends day 2, day 5 and day 10, then stops for good", async () => {
    await handleReviewRequest(sam, T0);
    fake.sent.length = 0;

    await runDaily(T0 + 1 * DAY_MS);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(0);

    await runDaily(T0 + 2 * DAY_MS);
    expect(leadEmailsTo("sam@example.com").map((s) => s.subject)).toEqual(["One fix that helps most websites"]);

    // The same day's second run sends nothing more.
    await runDaily(T0 + 2 * DAY_MS + HOUR);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(1);

    await runDaily(T0 + 5 * DAY_MS);
    await runDaily(T0 + 10 * DAY_MS);
    expect(leadEmailsTo("sam@example.com").map((s) => s.subject)).toEqual([
      "One fix that helps most websites",
      "Want to talk it through?",
      "My last note",
    ]);
    expect((await getLead(leadKey("sam@example.com")))?.status).toBe("done");

    await runDaily(T0 + 60 * DAY_MS);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(3);
  });

  it("stops the moment they book", async () => {
    await handleReviewRequest(sam, T0);
    await handleBookingCreated(booking({ startMs: T0 + 10 * DAY_MS, endMs: T0 + 10 * DAY_MS + 1800_000 }), T0 + DAY_MS);
    fake.sent.length = 0;
    await runDaily(T0 + 3 * DAY_MS);
    await runDaily(T0 + 6 * DAY_MS);
    const subjects = leadEmailsTo("sam@example.com").map((s) => s.subject);
    expect(subjects).not.toContain("One fix that helps most websites");
    expect(subjects).not.toContain("Want to talk it through?");
    expect((await getLead(leadKey("sam@example.com")))?.status).toBe("booked");
  });

  it("stops the moment they unsubscribe, and deletes their contact details", async () => {
    await handleReviewRequest({ ...sam, whatsapp: "+923001234567" }, T0);
    const key = leadKey("sam@example.com");
    await unsubscribeByKey(key);
    fake.sent.length = 0;
    await runDaily(T0 + 3 * DAY_MS);
    await runDaily(T0 + 30 * DAY_MS);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(0);

    const lead = await getLead(key);
    expect(lead?.status).toBe("unsubscribed");
    expect(lead?.email).toBeNull();
    expect(lead?.whatsapp).toBeNull();
    const everything = [...fake.hashes.entries()].map(([k, h]) => [k, [...h.entries()]]);
    expect(JSON.stringify(everything)).not.toContain("sam@example.com");
    expect(JSON.stringify(everything)).not.toContain("923001234567");
  });

  it("keeps an unsubscribed person unsubscribed when they book later", async () => {
    await handleReviewRequest(sam, T0);
    await unsubscribeByKey(leadKey("sam@example.com"));
    fake.sent.length = 0;
    await handleBookingCreated(booking(), T0 + DAY_MS);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(0);
    // The owner still hears about the booking.
    expect(fake.sent.map((s) => s.subject)).toEqual(["New booking: Sam Lee"]);
  });
});

describe("a booking", () => {
  it("sends the prepare email at once and schedules both reminders and the draft", async () => {
    const info = booking();
    await handleBookingCreated(info, T0);
    const toSam = leadEmailsTo("sam@example.com");
    expect(toSam.map((s) => s.subject)).toEqual([
      "You are booked. Here is what to have ready",
      "Our call is tomorrow",
      "Our call is in 2 hours",
    ]);
    expect(toSam[0].sendAt).toBeUndefined();
    expect(toSam[1].sendAt).toBe(info.startMs - 24 * HOUR);
    expect(toSam[2].sendAt).toBe(info.startMs - 2 * HOUR);

    const draft = fake.sent.find((s) => s.owner && s.subject.startsWith("Draft thank-you"));
    expect(draft?.sendAt).toBe(info.endMs + 15 * 60_000);
    expect(fake.sent.some((s) => s.owner && s.subject === "New booking: Sam Lee")).toBe(true);
  });

  it("skips a reminder that is already too late", async () => {
    const start = T0 + 3 * HOUR;
    await handleBookingCreated(booking({ startMs: start, endMs: start + 1800_000 }), T0);
    const subjects = leadEmailsTo("sam@example.com").map((s) => s.subject);
    expect(subjects).toContain("Our call is in 2 hours");
    expect(subjects).not.toContain("Our call is tomorrow");
  });

  it("holds reminders for a far-away booking and schedules them on a later run", async () => {
    const start = T0 + 40 * DAY_MS;
    await handleBookingCreated(booking({ startMs: start, endMs: start + 1800_000 }), T0);
    expect(leadEmailsTo("sam@example.com").map((s) => s.subject)).toEqual([
      "You are booked. Here is what to have ready",
    ]);
    expect([...(fake.sets.get("bookings:pending") ?? [])]).toEqual(["uid-1"]);

    await runDaily(T0 + 5 * DAY_MS); // start is 35 days away: still too early
    expect(leadEmailsTo("sam@example.com")).toHaveLength(1);

    await runDaily(T0 + 12 * DAY_MS); // start is 28 days away: everything fits
    expect(leadEmailsTo("sam@example.com").map((s) => s.subject)).toEqual([
      "You are booked. Here is what to have ready",
      "Our call is tomorrow",
      "Our call is in 2 hours",
    ]);
    expect([...(fake.sets.get("bookings:pending") ?? [])]).toEqual([]);

    // Running again does not send the reminders twice.
    await runDaily(T0 + 13 * DAY_MS);
    expect(leadEmailsTo("sam@example.com")).toHaveLength(3);
  });

  it("ignores a duplicate delivery of the same booking", async () => {
    await handleBookingCreated(booking(), T0);
    const count = fake.sent.length;
    await handleBookingCreated(booking(), T0 + 1000);
    expect(fake.sent).toHaveLength(count);
  });

  it("cancels the scheduled emails when the booking is cancelled", async () => {
    await handleBookingCreated(booking(), T0);
    const scheduledIds = fake.sent.filter((s) => s.sendAt !== undefined).map((s) => s.id);
    expect(scheduledIds).toHaveLength(3);

    await handleBookingCancelled(booking());
    expect([...fake.cancelled].sort()).toEqual([...scheduledIds].sort());
    expect(await getBooking("uid-1")).toBeNull();
    expect((await getLead(leadKey("sam@example.com")))?.status).toBe("cancelled");
    expect(fake.sent[fake.sent.length - 1].subject).toBe("Booking cancelled: Sam Lee");
  });

  it("moves the reminders when the booking is moved", async () => {
    await handleBookingCreated(booking(), T0);
    const oldIds = fake.sent.filter((s) => s.sendAt !== undefined).map((s) => s.id);
    const later = booking({
      uid: "uid-2",
      rescheduleUid: "uid-1",
      startMs: T0 + 5 * DAY_MS,
      endMs: T0 + 5 * DAY_MS + 1800_000,
    });
    await handleBookingRescheduled(later, T0 + HOUR);

    expect([...fake.cancelled].sort()).toEqual([...oldIds].sort());
    expect(await getBooking("uid-1")).toBeNull();
    expect(await getBooking("uid-2")).not.toBeNull();
    const reminders = fake.sent.filter((s) => s.subject === "Our call is tomorrow");
    expect(reminders[reminders.length - 1].sendAt).toBe(later.startMs - 24 * HOUR);
  });

  it("cancels booking emails when someone unsubscribes", async () => {
    await handleBookingCreated(booking(), T0);
    const scheduledLeadIds = fake.sent.filter((s) => !s.owner && s.sendAt !== undefined).map((s) => s.id);
    await unsubscribeByKey(leadKey("sam@example.com"));
    for (const id of scheduledLeadIds) expect(fake.cancelled).toContain(id);
  });
});

describe("a no-show", () => {
  it("sends the apology one hour later, and only to people still subscribed", async () => {
    await handleBookingCreated(booking(), T0);
    fake.sent.length = 0;
    const now = T0 + 4 * DAY_MS;
    await handleNoShow({ bookingUid: "uid-1", emails: ["sam@example.com"] }, now);
    expect(fake.sent).toHaveLength(1);
    expect(fake.sent[0].subject).toBe("Sorry we missed you");
    expect(fake.sent[0].sendAt).toBe(now + HOUR);

    await unsubscribeByKey(leadKey("sam@example.com"));
    fake.sent.length = 0;
    await handleNoShow({ bookingUid: "uid-1", emails: ["sam@example.com"] }, now);
    expect(fake.sent).toHaveLength(0);
  });

  it("cancels the owner's thank-you draft, because the call did not happen", async () => {
    await handleBookingCreated(booking(), T0);
    const draft = fake.sent.find((s) => s.owner && s.subject.startsWith("Draft thank-you"));
    expect(draft).toBeDefined();
    await handleNoShow({ bookingUid: "uid-1", emails: ["sam@example.com"] }, T0 + 4 * DAY_MS);
    expect(fake.cancelled).toContain(draft!.id);
    expect((await getBooking("uid-1"))?.ids.draft).toBe("skipped");
  });

  it("ignores someone we have never heard of", async () => {
    await handleNoShow({ bookingUid: "nope", emails: ["stranger@example.com"] }, T0);
    expect(fake.sent).toHaveLength(0);
  });
});

describe("the weekly list", () => {
  it("goes out on Monday with people who have not booked, and not on other days", async () => {
    await handleReviewRequest(sam, T0);
    await handleReviewRequest({ email: "kim@example.com", whatsapp: "+923001234567", cameFrom: "" }, T0);
    await handleReviewRequest({ email: "lee@example.com", whatsapp: null, cameFrom: "" }, T0);
    await handleBookingCreated(booking({ email: "lee@example.com", name: "Lee", firstName: "Lee" }), T0 + HOUR);
    fake.sent.length = 0;

    await runDaily(Date.UTC(2026, 10, 10, 5, 0)); // Tuesday
    expect(fake.sent.some((s) => s.subject.startsWith("Weekly:"))).toBe(false);

    fake.sent.length = 0;
    const result = await runDaily(MONDAY_RUN);
    const digest = fake.sent.find((s) => s.subject.startsWith("Weekly:"));
    expect(digest?.subject).toBe("Weekly: 2 leads who have not booked");
    expect(result.digestSent).toBe(true);
    expect(fake.digestText).toContain("In the last 60 days, 3 people asked for a review. 1 of them booked a call.");
    expect(fake.digestText).toContain("sam@example.com");
    expect(fake.digestText).toContain("kim@example.com");
    expect(fake.digestText).not.toContain("lee@example.com");
  });

  it("is not sent when nobody is waiting", async () => {
    const result = await runDaily(MONDAY_RUN);
    expect(result.digestSent).toBe(false);
  });
});
