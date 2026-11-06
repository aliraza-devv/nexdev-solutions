import { createHmac } from "crypto";
import { describe, expect, it } from "vitest";
import { extractAnswers, parseBookingPayload, parseNoShow, rescheduleUrl, verifyCalSignature } from "./cal";

const secret = "cal-secret";
const body = JSON.stringify({ triggerEvent: "BOOKING_CREATED", payload: { uid: "abc" } });
const goodSignature = createHmac("sha256", secret).update(body).digest("hex");

describe("verifyCalSignature", () => {
  it("accepts the right signature", () => {
    expect(verifyCalSignature(body, goodSignature, secret)).toBe(true);
    expect(verifyCalSignature(body, goodSignature.toUpperCase(), secret)).toBe(true);
  });

  it("rejects a missing, wrong or short signature", () => {
    expect(verifyCalSignature(body, null, secret)).toBe(false);
    expect(verifyCalSignature(body, "", secret)).toBe(false);
    expect(verifyCalSignature(body, "deadbeef", secret)).toBe(false);
    expect(verifyCalSignature(body, goodSignature.replace(/.$/, "0"), secret)).toBe(false);
  });

  it("rejects a body that was changed after signing", () => {
    expect(verifyCalSignature(`${body} `, goodSignature, secret)).toBe(false);
  });

  it("rejects everything when no secret is set", () => {
    expect(verifyCalSignature(body, goodSignature, "")).toBe(false);
  });
});

describe("rescheduleUrl", () => {
  it("builds the one-click link from the booking id", () => {
    expect(rescheduleUrl("abc123")).toBe("https://cal.com/reschedule/abc123");
    expect(rescheduleUrl("a b")).toBe("https://cal.com/reschedule/a%20b");
  });
});

describe("extractAnswers", () => {
  it("keeps the booking questions and drops standard and hidden fields", () => {
    const answers = extractAnswers({
      name: { label: "Name", value: "Sam Lee" },
      email: { label: "Email", value: "sam@example.com" },
      guests: { label: "Guests", value: [] },
      location: { value: { optionValue: "", value: "integrations:google:meet" } },
      website: { label: "Your website", value: "example.com" },
      goal: { label: "Main goal", value: ["More calls", "More sales"] },
      secret: { label: "Hidden one", value: "x", isHidden: true },
      empty: { label: "Empty", value: "   " },
      nolabel: { value: "kept" },
    });
    expect(answers).toEqual([
      { label: "Your website", value: "example.com" },
      { label: "Main goal", value: "More calls, More sales" },
      { label: "nolabel", value: "kept" },
    ]);
  });

  it("copes with junk", () => {
    expect(extractAnswers(null)).toEqual([]);
    expect(extractAnswers("text")).toEqual([]);
    expect(extractAnswers({ a: null, b: 5 })).toEqual([]);
  });
});

const payload = {
  uid: "uid-1",
  startTime: "2026-11-10T14:00:00.000Z",
  endTime: "2026-11-10T14:30:00.000Z",
  attendees: [{ name: "Sam Lee", email: " sam@example.com ", timeZone: "America/New_York" }],
  responses: { website: { label: "Your website", value: "example.com" } },
  metadata: { cameFrom: "/case-studies/acme" },
  rescheduleUid: "old-uid",
};

describe("parseBookingPayload", () => {
  it("reads a booking", () => {
    const info = parseBookingPayload(payload)!;
    expect(info.uid).toBe("uid-1");
    expect(info.startMs).toBe(Date.parse("2026-11-10T14:00:00.000Z"));
    expect(info.endMs).toBe(Date.parse("2026-11-10T14:30:00.000Z"));
    expect(info.name).toBe("Sam Lee");
    expect(info.firstName).toBe("Sam");
    expect(info.email).toBe("sam@example.com");
    expect(info.timeZone).toBe("America/New_York");
    expect(info.answers).toEqual([{ label: "Your website", value: "example.com" }]);
    expect(info.cameFrom).toBe("/case-studies/acme");
    expect(info.rescheduleUid).toBe("old-uid");
  });

  it("falls back to UTC and an empty page when those are missing", () => {
    const info = parseBookingPayload({ ...payload, attendees: [{ name: "", email: "a@b.co" }], metadata: undefined })!;
    expect(info.timeZone).toBe("UTC");
    expect(info.firstName).toBe("");
    expect(info.cameFrom).toBe("");
    expect(parseBookingPayload({ ...payload, rescheduleUid: undefined })!.rescheduleUid).toBeNull();
  });

  it("returns null when the booking is unusable", () => {
    expect(parseBookingPayload(null)).toBeNull();
    expect(parseBookingPayload({ ...payload, uid: "" })).toBeNull();
    expect(parseBookingPayload({ ...payload, attendees: [] })).toBeNull();
    expect(parseBookingPayload({ ...payload, attendees: [{ name: "x" }] })).toBeNull();
    expect(parseBookingPayload({ ...payload, startTime: "nope" })).toBeNull();
  });
});

describe("parseNoShow", () => {
  it("returns the attendees marked as no-show", () => {
    expect(
      parseNoShow({
        bookingUid: "uid-1",
        attendees: [
          { email: "a@example.com", noShow: true },
          { email: "b@example.com", noShow: false },
        ],
      }),
    ).toEqual({ bookingUid: "uid-1", emails: ["a@example.com"] });
  });

  it("returns null without a booking or attendee list", () => {
    expect(parseNoShow({ attendees: [] })).toBeNull();
    expect(parseNoShow({ bookingUid: "x" })).toBeNull();
    expect(parseNoShow(null)).toBeNull();
  });
});
