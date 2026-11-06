// Constants for the follow-up emails. Nothing secret lives here: secrets come
// from environment variables (see CHANGELOG.md for the names).

export const SITE_URL = "https://www.nexdevsolutions.net";
export const BOOKING_URL = `${SITE_URL}/book-call`;
export const BUSINESS_NAME = "NeXDev Solutions";
export const OWNER_FIRST_NAME = "Ali";
export const OWNER_INBOX = "info@nexdevsolutions.net";
export const OWNER_TIME_ZONE = "Asia/Karachi";

// Notifications to the owner come from notifications@. Emails to leads come
// from info@, a real mailbox, so a reply reaches the owner.
export const NOTIFY_FROM = "NeXDev Solutions <notifications@nexdevsolutions.net>";
export const LEAD_FROM = "Ali at NeXDev Solutions <info@nexdevsolutions.net>";

export const DAY_MS = 86_400_000;

// The follow-up for someone who left an email and did not book. One step per
// daily run at most; the sequence stops the moment they book or unsubscribe.
export const NURTURE_STEPS = [
  { key: "tip", afterDays: 2 },
  { key: "checkin", afterDays: 5 },
  { key: "last", afterDays: 10 },
] as const;
export type NurtureStepKey = (typeof NURTURE_STEPS)[number]["key"];

// Resend can schedule an email up to 30 days ahead. Stay inside that.
export const MAX_SCHEDULE_AHEAD_MS = 29 * DAY_MS;

export const LEAD_TTL_SECONDS = 365 * 24 * 60 * 60;
export const BOOKING_TTL_AFTER_END_SECONDS = 30 * 24 * 60 * 60;
export const DIGEST_LOOKBACK_DAYS = 60;
