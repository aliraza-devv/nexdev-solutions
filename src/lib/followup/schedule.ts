import { DAY_MS, MAX_SCHEDULE_AHEAD_MS, NURTURE_STEPS } from "./config";

// Pure timing rules, so they can be unit tested without a clock or a network.

/**
 * The job runs once a day, so a step is due half a day early. That way "Day 2"
 * lands between day 1.5 and day 2.5 after the request, which is as close to day 2
 * as one run a day can get.
 */
export const DUE_EARLY_MS = DAY_MS / 2;

/** The next nurture step that is due, or null when none is due yet or all were sent. */
export function nextNurtureStep(createdAt: number, sentCount: number, now: number) {
  const step = NURTURE_STEPS[sentCount];
  if (!step) return null;
  return now - createdAt >= step.afterDays * DAY_MS - DUE_EARLY_MS ? step : null;
}

export const REMINDER_LEAD_MS = { r24: 24 * 60 * 60 * 1000, r2: 2 * 60 * 60 * 1000 } as const;
export const DRAFT_DELAY_AFTER_END_MS = 15 * 60 * 1000;
export const NO_SHOW_DELAY_MS = 60 * 60 * 1000;

/** Anything less than a minute away counts as already past. */
const PAST_GRACE_MS = 60_000;

export type ScheduleDecision = "past" | "now" | "later";

/** Can an email for this moment be handed to Resend now, is it too late, or too early? */
export function scheduleDecision(sendAt: number, now: number): ScheduleDecision {
  if (sendAt - now <= PAST_GRACE_MS) return "past";
  return sendAt - now <= MAX_SCHEDULE_AHEAD_MS ? "now" : "later";
}

export function formatWhen(ms: number, timeZone: string): string {
  try {
    const date = new Date(ms);
    const day = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone,
    }).format(date);
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone,
    }).format(date);
    // Newer Node versions put a narrow no-break space before AM or PM. Use a plain space.
    return `${day} at ${time.replace(/ /g, " ")} (${timeZone})`;
  } catch {
    return new Date(ms).toISOString();
  }
}

export function isMondayIn(ms: number, timeZone: string): boolean {
  return new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone }).format(new Date(ms)) === "Monday";
}
