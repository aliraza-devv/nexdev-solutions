import {
  BOOKING_URL,
  BUSINESS_NAME,
  OWNER_FIRST_NAME,
  OWNER_TIME_ZONE,
  type NurtureStepKey,
} from "./config";
import type { Answer } from "./cal";
import { formatWhen } from "./schedule";

// All the words the follow-up system sends. Rules for every email here:
// conversational and confident, short sentences, no corporate jargon, no dashes
// used as punctuation, and a capital letter at the start of every sentence.
// copy.test.ts checks the mechanical rules on every email.
//
// Emails to a lead end with the business name, one line saying why they are
// getting it, and an unsubscribe link. Emails to the owner do not.

export interface Email {
  subject: string;
  text: string;
  html: string;
}

const URL_RE = /(https?:\/\/[^\s<]+)/g;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toHtml(text: string): string {
  return text
    .split("\n\n")
    .map((block) => {
      const linked = escapeHtml(block)
        .replace(URL_RE, (url) => `<a href="${url}">${url}</a>`)
        .replace(/\n/g, "<br>");
      return `<p style="margin:0 0 14px">${linked}</p>`;
    })
    .join("");
}

function build(subject: string, blocks: string[]): Email {
  const text = blocks.join("\n\n");
  return { subject, text, html: toHtml(text) };
}

function greeting(firstName?: string | null): string {
  return firstName ? `Hi ${firstName},` : "Hi there,";
}

function footer(reason: string, unsubscribeUrl: string): string {
  const lines = [BUSINESS_NAME, reason];
  const address = process.env.MAIL_POSTAL_ADDRESS;
  if (address) lines.push(address);
  lines.push(`Unsubscribe: ${unsubscribeUrl}`);
  return lines.join("\n");
}

const REASON_REVIEW = "You are getting this because you asked for a website review on nexdevsolutions.net.";
const REASON_BOOKING = "You are getting this because you booked a call on nexdevsolutions.net.";

// ---------------------------------------------------------------------------
// To someone who asked for a review by email
// ---------------------------------------------------------------------------

export function reviewThanks(unsubscribeUrl: string): Email {
  return build("Got it. Here is what happens next", [
    greeting(),
    "Thanks for asking for a website review. I got your request.",
    "Here is what happens next. I will send you a short review by email. If you reply with your website address, I can start right away.",
    `Would you rather talk it through? Pick a time that suits you: ${BOOKING_URL}`,
    "It is a free 30 minute video call. No pitch.",
    OWNER_FIRST_NAME,
    footer(REASON_REVIEW, unsubscribeUrl),
  ]);
}

export function nurtureEmail(step: NurtureStepKey, unsubscribeUrl: string): Email {
  const end = [OWNER_FIRST_NAME, footer(REASON_REVIEW, unsubscribeUrl)];
  if (step === "tip") {
    return build("One fix that helps most websites", [
      greeting(),
      "Here is one quick tip. Open your website on your phone. Look at the first screen only. Can a stranger tell in five seconds what you sell and what to do next?",
      "If not, that is usually your biggest leak. Fix it with one clear sentence and one button at the top. Nothing else on that screen.",
      `Want a second pair of eyes on yours? Pick a time here: ${BOOKING_URL}`,
      ...end,
    ]);
  }
  if (step === "checkin") {
    return build("Want to talk it through?", [
      greeting(),
      "Just checking in. If you would like to talk through your website, I keep a few free slots open each week.",
      "It is 30 minutes on video. You tell me what is not working. I tell you what I would fix first. No pitch.",
      `Pick a time that suits you: ${BOOKING_URL}`,
      ...end,
    ]);
  }
  return build("My last note", [
    greeting(),
    "This is my last email about this. If now is not the right time, that is completely fine.",
    `If you ever want a second opinion on your website, the calendar is here: ${BOOKING_URL}`,
    "I wish you all the best with it.",
    ...end,
  ]);
}

// ---------------------------------------------------------------------------
// To someone who booked a call
// ---------------------------------------------------------------------------

export function bookingPrepare(input: {
  firstName: string;
  whenText: string;
  rescheduleUrl: string;
  unsubscribeUrl: string;
}): Email {
  return build("You are booked. Here is what to have ready", [
    greeting(input.firstName),
    `You are booked for ${input.whenText}. It is a video call on Google Meet. The link is in your calendar invite.`,
    [
      "To make the 30 minutes count, have these ready:",
      "1. What you sell and who you sell it to.",
      "2. The one thing you want more of. For example calls, sales or sign-ups.",
      "3. Any numbers you know. For example customers a month or what one customer is worth.",
    ].join("\n"),
    "No numbers? No problem. We will work with what you have.",
    `Need a different time? Reschedule in one click: ${input.rescheduleUrl}`,
    "See you then.",
    OWNER_FIRST_NAME,
    footer(REASON_BOOKING, input.unsubscribeUrl),
  ]);
}

export function reminder24(input: {
  firstName: string;
  whenText: string;
  rescheduleUrl: string;
  unsubscribeUrl: string;
}): Email {
  return build("Our call is tomorrow", [
    greeting(input.firstName),
    `A quick reminder. We talk in about 24 hours, on ${input.whenText}. The link is in your calendar invite.`,
    `Need a different time? Reschedule in one click: ${input.rescheduleUrl}`,
    "See you then.",
    OWNER_FIRST_NAME,
    footer(REASON_BOOKING, input.unsubscribeUrl),
  ]);
}

export function reminder2(input: {
  firstName: string;
  whenText: string;
  rescheduleUrl: string;
  unsubscribeUrl: string;
}): Email {
  return build("Our call is in 2 hours", [
    greeting(input.firstName),
    `A quick reminder. We talk in about 2 hours, on ${input.whenText}. The link is in your calendar invite.`,
    `Cannot make it? Pick a new time in one click: ${input.rescheduleUrl}`,
    "See you soon.",
    OWNER_FIRST_NAME,
    footer(REASON_BOOKING, input.unsubscribeUrl),
  ]);
}

export function noShow(input: { firstName: string; unsubscribeUrl: string }): Email {
  return build("Sorry we missed you", [
    greeting(input.firstName),
    "Sorry we missed you. These things happen.",
    `Want to try again? Pick a new time here: ${BOOKING_URL}`,
    "It takes a minute.",
    OWNER_FIRST_NAME,
    footer(REASON_BOOKING, input.unsubscribeUrl),
  ]);
}

// ---------------------------------------------------------------------------
// To the owner
// ---------------------------------------------------------------------------

const DIGITS_RE = /\D/g;

/** A WhatsApp link with the message already typed. The owner sends it by hand. */
export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number.replace(DIGITS_RE, "")}?text=${encodeURIComponent(message)}`;
}

const WHATSAPP_OPENER =
  "Hi, this is Ali from NeXDev Solutions. Thanks for asking for a website review. What is your website address? I will take a look.";

function whatsappBlock(number: string): string {
  return [
    "WhatsApp message to send by hand. Check the country code first.",
    `Link: ${whatsappLink(number, WHATSAPP_OPENER)}`,
    `Message: ${WHATSAPP_OPENER}`,
  ].join("\n");
}

function ownerEmail(subject: string, blocks: string[]): Email {
  return build(subject, blocks);
}

export function ownerNewReviewLead(input: {
  email: string;
  whatsapp: string | null;
  cameFrom: string;
  unsubscribedBefore: boolean;
}): Email {
  const blocks = [
    "Someone asked for a website review.",
    [
      `Email: ${input.email}`,
      `WhatsApp: ${input.whatsapp ?? "not given"}`,
      `Came from: ${input.cameFrom || "unknown"}`,
      "Page: /book-call (review box)",
    ].join("\n"),
  ];
  if (input.whatsapp) blocks.push(whatsappBlock(input.whatsapp));
  blocks.push(
    input.unsubscribedBefore
      ? "They unsubscribed earlier, so no automatic emails were sent to them."
      : "A thank-you email went out. Follow-ups run on their own until they book or unsubscribe.",
  );
  return ownerEmail("New lead: review request", blocks);
}

export function ownerNewBooking(input: {
  name: string;
  email: string;
  startMs: number;
  timeZone: string;
  answers: Answer[];
  cameFrom: string;
}): Email {
  const blocks = [
    [
      `Name: ${input.name || "not given"}`,
      `Email: ${input.email}`,
      `When, your time: ${formatWhen(input.startMs, OWNER_TIME_ZONE)}`,
      `When, their time: ${formatWhen(input.startMs, input.timeZone)}`,
      `Came from: ${input.cameFrom || "unknown"}`,
    ].join("\n"),
  ];
  if (input.answers.length > 0) {
    blocks.push(["Their answers:", ...input.answers.map((a) => `- ${a.label}: ${a.value}`)].join("\n"));
  }
  return ownerEmail(`New booking: ${input.name || input.email}`, blocks);
}

export function ownerBookingMoved(input: { name: string; email: string; startMs: number; timeZone: string }): Email {
  return ownerEmail(`Booking moved: ${input.name || input.email}`, [
    [
      `New time, your time: ${formatWhen(input.startMs, OWNER_TIME_ZONE)}`,
      `New time, their time: ${formatWhen(input.startMs, input.timeZone)}`,
    ].join("\n"),
    "Their reminders were reset for the new time.",
  ]);
}

export function ownerBookingCancelled(input: { name: string; email: string }): Email {
  return ownerEmail(`Booking cancelled: ${input.name || input.email}`, [
    "They cancelled their call. Their reminders were stopped.",
  ]);
}

export function ownerThankYouDraft(input: { name: string; firstName: string; email: string }): Email {
  const draft = [
    greeting(input.firstName),
    "Thanks for your time today. Here is what we agreed:",
    "- Add the key point here.",
    "- Add the next step here.",
    "If you have any questions, just reply to this email.",
    OWNER_FIRST_NAME,
  ].join("\n");
  const mailto = `mailto:${input.email}?subject=${encodeURIComponent("Thanks for today")}&body=${encodeURIComponent(draft)}`;
  return ownerEmail(`Draft thank-you for ${input.firstName || input.name || input.email}`, [
    "Your call just ended. Here is a draft thank-you. Edit it and send it yourself. Nothing was sent to them.",
    `Open it in your mail app: ${mailto}`,
    ["The draft:", "", draft].join("\n"),
  ]);
}

export interface DigestLead {
  email: string;
  whatsapp: string | null;
  source: string;
  daysAgo: number;
}

export interface DigestStats {
  days: number;
  asked: number;
  booked: number;
}

export function ownerWeeklyDigest(leads: DigestLead[], stats: DigestStats): Email {
  const lines = leads.map((lead, i) => {
    const parts = [
      `${i + 1}. ${lead.email}`,
      `   Asked ${lead.daysAgo} days ago. Came from: ${lead.source || "unknown"}. WhatsApp: ${lead.whatsapp ?? "none"}.`,
    ];
    if (lead.whatsapp) parts.push(`   Message them: ${whatsappLink(lead.whatsapp, WHATSAPP_OPENER)}`);
    return parts.join("\n");
  });
  return ownerEmail(`Weekly: ${leads.length} leads who have not booked`, [
    "These people asked for a review and have not booked a call. Message the best ones yourself.",
    lines.join("\n\n"),
    "They also get automatic follow-ups until they book or unsubscribe.",
    `In the last ${stats.days} days, ${stats.asked} people asked for a review. ${stats.booked} of them booked a call.`,
  ]);
}
