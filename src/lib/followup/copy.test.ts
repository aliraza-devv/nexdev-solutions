import { afterEach, describe, expect, it, vi } from "vitest";
import { BOOKING_URL, BUSINESS_NAME } from "./config";
import {
  bookingPrepare,
  noShow,
  nurtureEmail,
  ownerBookingCancelled,
  ownerBookingMoved,
  ownerNewBooking,
  ownerNewReviewLead,
  ownerThankYouDraft,
  ownerWeeklyDigest,
  reminder2,
  reminder24,
  reviewThanks,
  whatsappLink,
  type Email,
} from "./copy";

afterEach(() => {
  vi.unstubAllEnvs();
});

const UNSUB = "https://www.nexdevsolutions.net/unsubscribe?t=TOKEN";
const RESCHEDULE = "https://cal.com/reschedule/uid-1";
const WHEN = "Tuesday, November 10 at 9:00 AM (America/New_York)";
const booking = { firstName: "Sam", whenText: WHEN, rescheduleUrl: RESCHEDULE, unsubscribeUrl: UNSUB };

// Emails sent to a lead. These also need the footer.
const leadEmails: Record<string, Email> = {
  reviewThanks: reviewThanks(UNSUB),
  nurtureTip: nurtureEmail("tip", UNSUB),
  nurtureCheckin: nurtureEmail("checkin", UNSUB),
  nurtureLast: nurtureEmail("last", UNSUB),
  bookingPrepare: bookingPrepare(booking),
  reminder24: reminder24(booking),
  reminder2: reminder2(booking),
  noShow: noShow({ firstName: "Sam", unsubscribeUrl: UNSUB }),
  noShowNoName: noShow({ firstName: "", unsubscribeUrl: UNSUB }),
};

// Emails sent to the owner.
const ownerEmails: Record<string, Email> = {
  newLeadWithWhatsapp: ownerNewReviewLead({
    email: "sam@example.com",
    whatsapp: "+92 300 1234567",
    cameFrom: "/case-studies/acme",
    unsubscribedBefore: false,
  }),
  newLeadNoWhatsapp: ownerNewReviewLead({
    email: "sam@example.com",
    whatsapp: null,
    cameFrom: "",
    unsubscribedBefore: true,
  }),
  newBooking: ownerNewBooking({
    name: "Sam Lee",
    email: "sam@example.com",
    startMs: Date.UTC(2026, 10, 10, 14, 0),
    timeZone: "America/New_York",
    answers: [{ label: "Your website", value: "Example.com" }],
    cameFrom: "/book-call",
  }),
  moved: ownerBookingMoved({
    name: "Sam Lee",
    email: "sam@example.com",
    startMs: Date.UTC(2026, 10, 10, 14, 0),
    timeZone: "America/New_York",
  }),
  cancelled: ownerBookingCancelled({ name: "Sam Lee", email: "sam@example.com" }),
  draft: ownerThankYouDraft({ name: "Sam Lee", firstName: "Sam", email: "sam@example.com" }),
  digest: ownerWeeklyDigest(
    [
      { email: "sam@example.com", whatsapp: "+923001234567", source: "/", daysAgo: 6 },
      { email: "kim@example.com", whatsapp: null, source: "", daysAgo: 12 },
    ],
    { days: 60, asked: 9, booked: 2 },
  ),
};

const all = { ...leadEmails, ...ownerEmails };

function sentences(text: string): string[] {
  const out: string[] = [];
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim().replace(/^(\d+\.\s+|-\s+)/, "");
    if (!line) continue;
    for (const part of line.split(/(?<=[.!?])\s+/)) {
      const piece = part.trim();
      // A bare email address or link is data, not a sentence.
      if (/^\S+$/.test(piece) && (piece.includes("@") || piece.startsWith("http"))) continue;
      out.push(piece);
    }
  }
  return out;
}

describe.each(Object.entries(all))("copy rules: %s", (_name, email) => {
  it("has a short subject", () => {
    expect(email.subject.length).toBeGreaterThan(0);
    expect(email.subject.length).toBeLessThanOrEqual(60);
  });

  it("uses no em dashes or en dashes", () => {
    for (const value of [email.subject, email.text, email.html]) {
      expect(value).not.toMatch(/[–—]/);
    }
    expect(email.text).not.toContain(" -- ");
  });

  it("starts every sentence with a capital letter", () => {
    for (const sentence of [email.subject, ...sentences(email.text)]) {
      const first = sentence.charAt(0);
      if (/[a-z]/i.test(first)) expect(first, sentence).toBe(first.toUpperCase());
    }
  });

  it("has an html version that matches the text", () => {
    expect(email.html).toContain("<p");
    expect(email.html).not.toMatch(/<script/i);
  });
});

describe.each(Object.entries(leadEmails))("lead email footer: %s", (_name, email) => {
  it("names the business, says why they got it, and links to unsubscribe", () => {
    expect(email.text).toContain(BUSINESS_NAME);
    expect(email.text).toMatch(/You are getting this because/);
    expect(email.text).toContain(`Unsubscribe: ${UNSUB}`);
    expect(email.html).toContain(`href="${UNSUB}"`);
  });

  it("has the footer last", () => {
    const lines = email.text.trim().split("\n");
    expect(lines[lines.length - 1]).toBe(`Unsubscribe: ${UNSUB}`);
  });
});

describe("the sequence", () => {
  it("points the review thank-you and nurture emails at the booking page", () => {
    for (const email of [leadEmails.reviewThanks, leadEmails.nurtureTip, leadEmails.nurtureCheckin, leadEmails.nurtureLast]) {
      expect(email.text).toContain(BOOKING_URL);
    }
  });

  it("gives the reschedule link in the booking emails", () => {
    for (const email of [leadEmails.bookingPrepare, leadEmails.reminder24, leadEmails.reminder2]) {
      expect(email.text).toContain(RESCHEDULE);
      expect(email.text).toContain(WHEN);
    }
  });

  it("offers a new time after a no-show", () => {
    expect(leadEmails.noShow.text).toContain(BOOKING_URL);
  });

  it("greets by first name, or politely without one", () => {
    expect(leadEmails.noShow.text.startsWith("Hi Sam,")).toBe(true);
    expect(leadEmails.noShowNoName.text.startsWith("Hi there,")).toBe(true);
  });

  it("says the last nudge is the last", () => {
    expect(leadEmails.nurtureLast.text).toMatch(/last email/i);
  });
});

describe("the postal address", () => {
  it("is added to the footer when MAIL_POSTAL_ADDRESS is set", () => {
    vi.stubEnv("MAIL_POSTAL_ADDRESS", "1 Example Street, Lahore");
    const lines = reviewThanks(UNSUB).text.split("\n");
    expect(lines).toContain("1 Example Street, Lahore");
    expect(lines.indexOf("1 Example Street, Lahore")).toBeLessThan(lines.indexOf(`Unsubscribe: ${UNSUB}`));
  });

  it("is left out when it is not set", () => {
    vi.stubEnv("MAIL_POSTAL_ADDRESS", "");
    expect(reviewThanks(UNSUB).text).not.toContain("Example Street");
  });
});

describe("escaping", () => {
  it("escapes markup in names so it cannot reach the html", () => {
    const email = reminder24({ ...booking, firstName: "<b>Sam</b>" });
    expect(email.html).toContain("&lt;b&gt;Sam&lt;/b&gt;");
    expect(email.html).not.toContain("<b>Sam</b>");
  });
});

describe("owner emails", () => {
  it("do not carry an unsubscribe footer", () => {
    for (const email of Object.values(ownerEmails)) {
      expect(email.text).not.toContain("Unsubscribe:");
    }
  });

  it("include a ready WhatsApp message only when a number was given", () => {
    expect(ownerEmails.newLeadWithWhatsapp.text).toContain("https://wa.me/923001234567?text=");
    expect(ownerEmails.newLeadWithWhatsapp.text).toContain("Message: Hi, this is Ali from NeXDev Solutions.");
    expect(ownerEmails.newLeadNoWhatsapp.text).not.toContain("wa.me");
  });

  it("show the contact details, the page they came from and their answers", () => {
    expect(ownerEmails.newLeadWithWhatsapp.text).toContain("Email: sam@example.com");
    expect(ownerEmails.newLeadWithWhatsapp.text).toContain("Came from: /case-studies/acme");
    expect(ownerEmails.newBooking.text).toContain("Email: sam@example.com");
    expect(ownerEmails.newBooking.text).toContain("Came from: /book-call");
    expect(ownerEmails.newBooking.text).toContain("- Your website: Example.com");
  });

  it("show the booking in the owner's time and the visitor's time", () => {
    expect(ownerEmails.newBooking.text).toContain("(Asia/Karachi)");
    expect(ownerEmails.newBooking.text).toContain("(America/New_York)");
  });

  it("make the thank-you a draft the owner sends by hand", () => {
    expect(ownerEmails.draft.text).toContain("Nothing was sent to them.");
    expect(ownerEmails.draft.text).toContain("mailto:sam@example.com?subject=");
  });

  it("list WhatsApp links in the weekly digest only for people who gave a number", () => {
    const text = ownerEmails.digest.text;
    expect(text).toContain("1. sam@example.com");
    expect(text).toContain("2. kim@example.com");
    expect(text.match(/wa\.me/g)).toHaveLength(1);
    expect(ownerEmails.digest.subject).toBe("Weekly: 2 leads who have not booked");
  });

  it("end the weekly list with how many people booked", () => {
    expect(ownerEmails.digest.text).toContain(
      "In the last 60 days, 9 people asked for a review. 2 of them booked a call.",
    );
  });
});

describe("whatsappLink", () => {
  it("keeps digits only and encodes the message", () => {
    expect(whatsappLink("+92 (300) 123-4567", "Hi there & welcome")).toBe(
      "https://wa.me/923001234567?text=Hi%20there%20%26%20welcome",
    );
  });
});
