import { createHmac, timingSafeEqual } from "crypto";
import { cleanCameFrom } from "@/lib/lead-input";

// Reading Cal.com webhooks: verify the signature, then pull out only what the
// follow-up needs. Answers to booking questions are passed on to the owner's
// notification email and never stored, logged or sent to analytics.

export function verifyCalSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature || !secret) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(rawBody).digest("hex"));
  const given = Buffer.from(signature.trim().toLowerCase());
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function rescheduleUrl(uid: string): string {
  return `https://cal.com/reschedule/${encodeURIComponent(uid)}`;
}

export interface Answer {
  label: string;
  value: string;
}

export interface BookingInfo {
  uid: string;
  startMs: number;
  endMs: number;
  name: string;
  firstName: string;
  email: string;
  timeZone: string;
  answers: Answer[];
  cameFrom: string;
  rescheduleUid: string | null;
}

const IGNORED_RESPONSE_KEYS = new Set([
  "name",
  "email",
  "guests",
  "location",
  "rescheduleReason",
  "attendeePhoneNumber",
]);

function answerText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(answerText).filter(Boolean).join(", ");
  return "";
}

/** The visitor's answers to the booking questions, without the standard fields. */
export function extractAnswers(responses: unknown): Answer[] {
  if (!responses || typeof responses !== "object") return [];
  const answers: Answer[] = [];
  for (const [key, raw] of Object.entries(responses as Record<string, unknown>)) {
    if (IGNORED_RESPONSE_KEYS.has(key)) continue;
    const item = raw as { label?: unknown; value?: unknown; isHidden?: unknown } | null;
    if (!item || typeof item !== "object" || item.isHidden === true) continue;
    const value = answerText(item.value);
    if (!value) continue;
    answers.push({ label: typeof item.label === "string" && item.label ? item.label : key, value });
  }
  return answers;
}

export function parseBookingPayload(payload: unknown): BookingInfo | null {
  const p = payload as Record<string, any> | null;
  if (!p || typeof p !== "object") return null;
  const attendee = Array.isArray(p.attendees) ? p.attendees[0] : null;
  const startMs = Date.parse(p.startTime);
  const endMs = Date.parse(p.endTime);
  if (!p.uid || !attendee || typeof attendee.email !== "string" || !attendee.email) return null;
  if (!Number.isFinite(startMs) || !Number.isFinite(endMs)) return null;
  const name = typeof attendee.name === "string" ? attendee.name.trim() : "";
  return {
    uid: String(p.uid),
    startMs,
    endMs,
    name,
    firstName: name.split(/\s+/)[0] || "",
    email: attendee.email.trim(),
    timeZone: typeof attendee.timeZone === "string" && attendee.timeZone ? attendee.timeZone : "UTC",
    answers: extractAnswers(p.responses),
    cameFrom: cleanCameFrom(p.metadata && p.metadata.cameFrom),
    rescheduleUid: p.rescheduleUid ? String(p.rescheduleUid) : null,
  };
}

/** From a BOOKING_NO_SHOW_UPDATED webhook: the booking and the attendees marked as no-show. */
export function parseNoShow(payload: unknown): { bookingUid: string; emails: string[] } | null {
  const p = payload as Record<string, any> | null;
  if (!p || typeof p !== "object" || !p.bookingUid || !Array.isArray(p.attendees)) return null;
  const emails = p.attendees
    .filter((a: any) => a && a.noShow === true && typeof a.email === "string" && a.email)
    .map((a: any) => String(a.email).trim());
  return { bookingUid: String(p.bookingUid), emails };
}
