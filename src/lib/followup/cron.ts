import {
  DAY_MS,
  DIGEST_LOOKBACK_DAYS,
  NURTURE_STEPS,
  OWNER_TIME_ZONE,
} from "./config";
import { nurtureEmail, ownerWeeklyDigest, type DigestLead } from "./copy";
import { scheduleBookingEmails } from "./handlers";
import { sendLeadEmail, sendOwnerEmail } from "./mail";
import { isMondayIn, nextNurtureStep } from "./schedule";
import {
  getBooking,
  getLead,
  incrementSent,
  listLeads,
  listPendingBookingUids,
  setLeadStatus,
} from "./store";
import { unsubscribeUrls } from "./tokens";

export interface DailyResult {
  nurtureSent: number;
  bookingsRechecked: number;
  digestSent: boolean;
}

/**
 * The once-a-day job. It sends the next follow-up to people who left an email
 * and have not booked (status is checked right before each send, so booking or
 * unsubscribing stops the sequence at once), schedules reminders for bookings
 * that were too far away to schedule earlier, and on Mondays sends the owner the
 * list of leads who have not booked. The result holds counts only.
 */
export async function runDaily(now = Date.now()): Promise<DailyResult> {
  const result: DailyResult = { nurtureSent: 0, bookingsRechecked: 0, digestSent: false };
  const leads = await listLeads();

  for (const lead of leads) {
    if (lead.status !== "new" || !lead.email) continue;
    const step = nextNurtureStep(lead.createdAt, lead.sent, now);
    if (!step) continue;
    const urls = unsubscribeUrls(lead.key);
    if (!urls) continue;
    const id = await sendLeadEmail({
      to: lead.email,
      email: nurtureEmail(step.key, urls.page),
      urls,
      idempotencyKey: `nurture-${lead.key}-${step.key}`,
    });
    if (!id) continue;
    result.nurtureSent += 1;
    const sent = await incrementSent(lead.key);
    if (sent >= NURTURE_STEPS.length) await setLeadStatus(lead.key, "done");
  }

  for (const uid of await listPendingBookingUids()) {
    const record = await getBooking(uid);
    if (!record) continue;
    const lead = await getLead(record.leadKey);
    if (!lead || !lead.email || lead.status === "unsubscribed") continue;
    await scheduleBookingEmails(uid, record, lead.email, now);
    result.bookingsRechecked += 1;
  }

  if (isMondayIn(now, OWNER_TIME_ZONE)) {
    const cutoff = now - DIGEST_LOOKBACK_DAYS * DAY_MS;
    const waiting: DigestLead[] = leads
      .filter(
        (lead) =>
          lead.email &&
          lead.createdAt >= cutoff &&
          (lead.status === "new" || lead.status === "done" || lead.status === "cancelled"),
      )
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((lead) => ({
        email: lead.email as string,
        whatsapp: lead.whatsapp,
        source: lead.source,
        daysAgo: Math.floor((now - lead.createdAt) / DAY_MS),
      }));
    if (waiting.length > 0) {
      // How well the follow-up works: of the people who asked for a review, how many booked.
      const asked = leads.filter(
        (lead) => lead.email && lead.source !== "booking" && lead.createdAt >= cutoff,
      );
      const stats = {
        days: DIGEST_LOOKBACK_DAYS,
        asked: asked.length,
        booked: asked.filter((lead) => lead.status === "booked" || lead.bookingUids.length > 0).length,
      };
      result.digestSent = (await sendOwnerEmail(ownerWeeklyDigest(waiting, stats))) !== null;
    }
  }
  return result;
}
