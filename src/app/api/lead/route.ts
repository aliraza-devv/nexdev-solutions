import { NextResponse } from "next/server";
import { parseLeadInput } from "@/lib/lead-input";
import { handleReviewRequest } from "@/lib/followup/handlers";

// Receives the "quick website review" email box on /book-call. It stores the
// lead, tells the owner, and sends the visitor a thank-you; the daily job then
// sends the follow-ups until they book or unsubscribe (src/lib/followup).
//
// Privacy: the email address and phone number only go to the lead store, the
// owner's notification and the visitor's own emails. They are never logged,
// never sent to analytics and never written to the repository. Error logs name
// the failure only.

// Best-effort, single-instance throttle, same idea as /api/qualify: it
// stops a warm serverless instance from being hammered. The honeypot and
// the validation are the primary guards.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestTimestampsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  // No real IP to key on (always the case in local dev): skip rather than
  // bucket every anonymous client under one shared key.
  if (ip === "unknown") return false;
  const now = Date.now();
  const timestamps = (requestTimestampsByIp.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestTimestampsByIp.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseLeadInput(body);
  // `in` narrows the result; `!parsed.ok` does not under this project's
  // non-strict TypeScript settings.
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const notified = await handleReviewRequest(parsed.value);
    if (!notified) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  } catch {
    console.error("A lead could not be processed.");
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
