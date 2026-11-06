import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parseLeadInput } from "@/lib/lead-input";

// Receives the "quick website review" email box on /book-call and sends the
// owner a notification. Phase 3 of the conversion work extends this route
// (stores the lead, sends the visitor a thank-you, starts the follow-up).
//
// Privacy: the email address and phone number only ever go into the
// notification below. They are never logged, never sent to analytics and
// never written to the repository. Error logs name the failure only.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_INBOX = "info@nexdevsolutions.net";
const FROM_ADDRESS = "NeXDev Solutions <notifications@nexdevsolutions.net>";

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
  const { email, whatsapp, cameFrom } = parsed.value;

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set - the lead notification was not sent.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const lines = [
    `Email: ${email}`,
    `WhatsApp: ${whatsapp ?? "not given"}`,
    `Came from: ${cameFrom || "unknown"}`,
    "Page: /book-call (quick website review box)",
    "Status: Asked for a quick website review by email",
  ];

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: LEAD_INBOX,
      subject: "New lead - REVIEW REQUEST",
      text: lines.join("\n"),
    });
    if (error) {
      // Name only: the error object can echo the recipient.
      console.error("Lead notification was rejected by the email service:", error.name);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    console.error("Lead notification could not be sent.");
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
