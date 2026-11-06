import type { LeadInput } from "@/lib/lead-input";
import { rescheduleUrl, type BookingInfo } from "./cal";
import {
  bookingPrepare,
  noShow,
  ownerBookingCancelled,
  ownerBookingMoved,
  ownerNewBooking,
  ownerNewReviewLead,
  ownerThankYouDraft,
  reminder2,
  reminder24,
  reviewThanks,
} from "./copy";
import { cancelEmail, sendLeadEmail, sendOwnerEmail } from "./mail";
import { redisConfigured } from "./redis";
import {
  DRAFT_DELAY_AFTER_END_MS,
  NO_SHOW_DELAY_MS,
  REMINDER_LEAD_MS,
  formatWhen,
  scheduleDecision,
} from "./schedule";
import {
  addBookingUid,
  deleteBooking,
  getBooking,
  getLead,
  leadKey,
  markBooked,
  saveBooking,
  saveReviewLead,
  setLeadStatus,
  unsubscribeLead,
  type BookingRecord,
} from "./store";
import { unsubscribeUrls } from "./tokens";

// What happens when something arrives: a review request from the website, or a
// booking event from Cal.com. Each step catches its own failure so one broken
// email never blocks the rest. Nothing here logs an address, name or answer.

/** The email box on /book-call. Returns false when the owner could not be notified. */
export async function handleReviewRequest(input: LeadInput, now = Date.now()): Promise<boolean> {
  const key = leadKey(input.email);
  let created = true;
  let unsubscribedBefore = false;

  if (redisConfigured()) {
    try {
      const saved = await saveReviewLead({
        email: input.email,
        whatsapp: input.whatsapp,
        source: input.cameFrom,
        now,
      });
      created = saved.created;
      unsubscribedBefore = saved.lead.status === "unsubscribed";
    } catch {
      console.error("A lead could not be stored.");
    }
  } else {
    console.error("Upstash Redis is not configured - follow-ups will not run for this lead.");
  }

  const notified = await sendOwnerEmail(
    ownerNewReviewLead({
      email: input.email,
      whatsapp: input.whatsapp,
      cameFrom: input.cameFrom,
      unsubscribedBefore,
    }),
  );
  if (!notified) return false;

  if (created && !unsubscribedBefore) {
    const urls = unsubscribeUrls(key);
    if (urls) {
      await sendLeadEmail({
        to: input.email,
        email: reviewThanks(urls.page),
        urls,
        idempotencyKey: `review-thanks-${key}`,
      });
    } else {
      console.error("LEAD_TOKEN_SECRET is not set - the thank-you email was not sent.");
    }
  }
  return true;
}

/**
 * Hands the booking emails to Resend and remembers their ids. Used when the
 * booking arrives and by the daily run for bookings that were too far away to
 * schedule then. Emails that cannot be scheduled yet stay pending.
 */
export async function scheduleBookingEmails(
  uid: string,
  record: BookingRecord,
  email: string,
  now: number,
): Promise<void> {
  const urls = unsubscribeUrls(record.leadKey);
  const whenText = formatWhen(record.startMs, record.timeZone);
  const resched = rescheduleUrl(uid);

  const plan = [
    { id: "r24", at: record.startMs - REMINDER_LEAD_MS.r24, owner: false },
    { id: "r2", at: record.startMs - REMINDER_LEAD_MS.r2, owner: false },
    { id: "draft", at: record.endMs + DRAFT_DELAY_AFTER_END_MS, owner: true },
  ];

  let pending = false;
  for (const item of plan) {
    if (record.ids[item.id]) continue;
    const decision = scheduleDecision(item.at, now);
    if (decision === "past") {
      record.ids[item.id] = "skipped";
      continue;
    }
    if (decision === "later") {
      pending = true;
      continue;
    }
    let id: string | null = null;
    if (item.owner) {
      id = await sendOwnerEmail(
        ownerThankYouDraft({ name: record.firstName, firstName: record.firstName, email }),
        item.at,
      );
    } else if (urls) {
      const input = { firstName: record.firstName, whenText, rescheduleUrl: resched, unsubscribeUrl: urls.page };
      id = await sendLeadEmail({
        to: email,
        email: item.id === "r24" ? reminder24(input) : reminder2(input),
        urls,
        sendAt: item.at,
        idempotencyKey: `${item.id}-${uid}`,
      });
    }
    if (id) record.ids[item.id] = id;
    else pending = true;
  }
  await saveBooking(uid, record, pending, now);
}

async function startBooking(info: BookingInfo, key: string, now: number): Promise<void> {
  const record: BookingRecord = {
    leadKey: key,
    startMs: info.startMs,
    endMs: info.endMs,
    timeZone: info.timeZone,
    firstName: info.firstName,
    ids: {},
  };
  await scheduleBookingEmails(info.uid, record, info.email, now);
  await addBookingUid(key, info.uid);
}

/** Cancels every email still scheduled for a booking and forgets the booking. */
export async function cancelBookingEmails(uid: string): Promise<void> {
  const record = await getBooking(uid);
  if (!record) return;
  for (const id of Object.values(record.ids)) await cancelEmail(id);
  await deleteBooking(uid);
}

export async function handleBookingCreated(info: BookingInfo, now = Date.now()): Promise<void> {
  // Cal.com can deliver the same event twice. A booking we already know is done.
  if (await getBooking(info.uid)) return;
  const lead = await markBooked({ email: info.email, now });
  await sendOwnerEmail(
    ownerNewBooking({
      name: info.name,
      email: info.email,
      startMs: info.startMs,
      timeZone: info.timeZone,
      answers: info.answers,
      cameFrom: info.cameFrom,
    }),
  );
  if (lead.status === "unsubscribed") return;

  const urls = unsubscribeUrls(lead.key);
  if (!urls) {
    console.error("LEAD_TOKEN_SECRET is not set - booking emails were not sent.");
    return;
  }
  await sendLeadEmail({
    to: info.email,
    email: bookingPrepare({
      firstName: info.firstName,
      whenText: formatWhen(info.startMs, info.timeZone),
      rescheduleUrl: rescheduleUrl(info.uid),
      unsubscribeUrl: urls.page,
    }),
    urls,
    idempotencyKey: `prepare-${info.uid}`,
  });
  await startBooking(info, lead.key, now);
}

export async function handleBookingRescheduled(info: BookingInfo, now = Date.now()): Promise<void> {
  if (info.rescheduleUid) await cancelBookingEmails(info.rescheduleUid);
  const lead = await markBooked({ email: info.email, now });
  await sendOwnerEmail(
    ownerBookingMoved({ name: info.name, email: info.email, startMs: info.startMs, timeZone: info.timeZone }),
  );
  if (lead.status === "unsubscribed") return;
  await startBooking(info, lead.key, now);
}

export async function handleBookingCancelled(info: BookingInfo): Promise<void> {
  await cancelBookingEmails(info.uid);
  const key = leadKey(info.email);
  const lead = await getLead(key);
  if (lead && lead.status === "booked") await setLeadStatus(key, "cancelled");
  await sendOwnerEmail(ownerBookingCancelled({ name: info.name, email: info.email }));
}

/** The owner marked an attendee as a no-show in Cal.com: apologise an hour later. */
export async function handleNoShow(
  input: { bookingUid: string; emails: string[] },
  now = Date.now(),
): Promise<void> {
  const record = await getBooking(input.bookingUid);
  // The call did not happen, so the owner's "draft a thank-you" email makes no
  // sense. Cancel it if it has not gone out yet. The booking is over, so nothing
  // else is waiting to be scheduled for it.
  if (record && record.ids.draft && record.ids.draft !== "skipped") {
    await cancelEmail(record.ids.draft);
    record.ids.draft = "skipped";
    await saveBooking(input.bookingUid, record, false, now);
  }
  for (const email of input.emails) {
    const key = leadKey(email);
    const lead = await getLead(key);
    if (!lead || lead.status === "unsubscribed") continue;
    const urls = unsubscribeUrls(key);
    if (!urls) continue;
    await sendLeadEmail({
      to: email,
      email: noShow({ firstName: record ? record.firstName : "", unsubscribeUrl: urls.page }),
      urls,
      sendAt: now + NO_SHOW_DELAY_MS,
      idempotencyKey: `noshow-${input.bookingUid}-${key}`,
    });
  }
}

/** Unsubscribes at once: stops the sequence, cancels scheduled emails, deletes the contact details. */
export async function unsubscribeByKey(key: string): Promise<void> {
  const uids = await unsubscribeLead(key);
  for (const uid of uids) await cancelBookingEmails(uid);
}
