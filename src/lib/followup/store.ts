import { createHash } from "crypto";
import { BOOKING_TTL_AFTER_END_SECONDS, LEAD_TTL_SECONDS } from "./config";
import { redis } from "./redis";

// What is stored, and why:
//   lead:<key>     email, optional WhatsApp number, status, when they asked, the
//                  page they came from, how many follow-ups were sent. Needed
//                  to send the follow-ups and to stop them. Never logged.
//   booking:<uid>  times, first name and the ids of the emails already handed to
//                  Resend, so they can be cancelled if the booking changes.
// Answers to booking questions and full names are not stored anywhere.
// On unsubscribe the email and number are deleted and only a "unsubscribed"
// marker stays, so the address is never emailed again.

export type LeadStatus = "new" | "booked" | "cancelled" | "done" | "unsubscribed";

export interface Lead {
  key: string;
  email: string | null;
  whatsapp: string | null;
  status: LeadStatus;
  createdAt: number;
  source: string;
  sent: number;
  bookingUids: string[];
}

export interface BookingRecord {
  leadKey: string;
  startMs: number;
  endMs: number;
  timeZone: string;
  firstName: string;
  /** Resend email ids by name; "skipped" when the moment had already passed. */
  ids: Record<string, string>;
}

const LEADS_ALL = "leads:all";
const BOOKINGS_PENDING = "bookings:pending";

export function leadKey(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

function fromPairs(result: unknown): Record<string, string> | null {
  if (!Array.isArray(result) || result.length === 0) return null;
  const out: Record<string, string> = {};
  for (let i = 0; i + 1 < result.length; i += 2) out[String(result[i])] = String(result[i + 1]);
  return out;
}

function parseJson<T>(value: string | undefined, fallback: T): T {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function toLead(key: string, h: Record<string, string>): Lead {
  return {
    key,
    email: h.email || null,
    whatsapp: h.whatsapp || null,
    status: (h.status as LeadStatus) || "new",
    createdAt: Number(h.createdAt) || 0,
    source: h.source || "",
    sent: Number(h.sent) || 0,
    bookingUids: parseJson<string[]>(h.bookingUids, []),
  };
}

export async function getLead(key: string): Promise<Lead | null> {
  const hash = fromPairs(await redis("HGETALL", `lead:${key}`));
  return hash ? toLead(key, hash) : null;
}

async function createLead(lead: Lead): Promise<void> {
  await redis(
    "HSET",
    `lead:${lead.key}`,
    "email", lead.email ?? "",
    "whatsapp", lead.whatsapp ?? "",
    "status", lead.status,
    "createdAt", lead.createdAt,
    "source", lead.source,
    "sent", lead.sent,
    "bookingUids", JSON.stringify(lead.bookingUids),
  );
  await redis("EXPIRE", `lead:${lead.key}`, LEAD_TTL_SECONDS);
  await redis("SADD", LEADS_ALL, lead.key);
}

/** Saves someone who asked for a review. `created` is false when we already knew them. */
export async function saveReviewLead(input: {
  email: string;
  whatsapp: string | null;
  source: string;
  now: number;
}): Promise<{ lead: Lead; created: boolean }> {
  const key = leadKey(input.email);
  const existing = await getLead(key);
  if (existing) {
    if (existing.status !== "unsubscribed" && input.whatsapp && !existing.whatsapp) {
      await redis("HSET", `lead:${key}`, "whatsapp", input.whatsapp);
    }
    return { lead: existing, created: false };
  }
  const lead: Lead = {
    key,
    email: input.email,
    whatsapp: input.whatsapp,
    status: "new",
    createdAt: input.now,
    source: input.source,
    sent: 0,
    bookingUids: [],
  };
  await createLead(lead);
  return { lead, created: true };
}

/** Marks a person as booked, which ends their nurture sequence. */
export async function markBooked(input: { email: string; now: number }): Promise<Lead> {
  const key = leadKey(input.email);
  const existing = await getLead(key);
  if (existing) {
    if (existing.status === "unsubscribed") return existing;
    await redis("HSET", `lead:${key}`, "status", "booked");
    return { ...existing, status: "booked" };
  }
  const lead: Lead = {
    key,
    email: input.email,
    whatsapp: null,
    status: "booked",
    createdAt: input.now,
    source: "booking",
    sent: 0,
    bookingUids: [],
  };
  await createLead(lead);
  return lead;
}

export async function setLeadStatus(key: string, status: LeadStatus): Promise<void> {
  await redis("HSET", `lead:${key}`, "status", status);
}

export async function incrementSent(key: string): Promise<number> {
  return Number(await redis("HINCRBY", `lead:${key}`, "sent", 1));
}

export async function addBookingUid(key: string, uid: string): Promise<void> {
  const lead = await getLead(key);
  if (!lead || lead.bookingUids.includes(uid)) return;
  const next = [...lead.bookingUids, uid].slice(-10);
  await redis("HSET", `lead:${key}`, "bookingUids", JSON.stringify(next));
}

/** Unsubscribes and deletes the contact details. Returns the booking ids to cancel emails for. */
export async function unsubscribeLead(key: string): Promise<string[]> {
  const lead = await getLead(key);
  await redis("HSET", `lead:${key}`, "status", "unsubscribed");
  await redis("HDEL", `lead:${key}`, "email", "whatsapp", "source", "bookingUids");
  await redis("PERSIST", `lead:${key}`);
  await redis("SADD", LEADS_ALL, key);
  return lead ? lead.bookingUids : [];
}

export async function listLeads(): Promise<Lead[]> {
  const keys = (await redis("SMEMBERS", LEADS_ALL)) as string[];
  const leads: Lead[] = [];
  for (const key of keys || []) {
    const lead = await getLead(key);
    if (lead) leads.push(lead);
  }
  return leads;
}

export async function getBooking(uid: string): Promise<BookingRecord | null> {
  const h = fromPairs(await redis("HGETALL", `booking:${uid}`));
  if (!h) return null;
  return {
    leadKey: h.leadKey,
    startMs: Number(h.startMs),
    endMs: Number(h.endMs),
    timeZone: h.timeZone || "UTC",
    firstName: h.firstName || "",
    ids: parseJson<Record<string, string>>(h.ids, {}),
  };
}

export async function saveBooking(uid: string, record: BookingRecord, pending: boolean, now: number): Promise<void> {
  await redis(
    "HSET",
    `booking:${uid}`,
    "leadKey", record.leadKey,
    "startMs", record.startMs,
    "endMs", record.endMs,
    "timeZone", record.timeZone,
    "firstName", record.firstName,
    "ids", JSON.stringify(record.ids),
  );
  const ttl = Math.max(3600, Math.round((record.endMs - now) / 1000) + BOOKING_TTL_AFTER_END_SECONDS);
  await redis("EXPIRE", `booking:${uid}`, ttl);
  await redis(pending ? "SADD" : "SREM", BOOKINGS_PENDING, uid);
}

export async function deleteBooking(uid: string): Promise<void> {
  await redis("DEL", `booking:${uid}`);
  await redis("SREM", BOOKINGS_PENDING, uid);
}

export async function listPendingBookingUids(): Promise<string[]> {
  return ((await redis("SMEMBERS", BOOKINGS_PENDING)) as string[]) || [];
}
