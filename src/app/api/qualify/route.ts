import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { QualifyOption, QualifyPayload, QualifyResponse } from "@/app/qualify/types";

// Never send to the browser: read server-side only, inside this route
// handler, and never re-exported.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_INBOX = "info@nexdevsolutions.net";
// nexdevsolutions.net is verified in Resend as of Sep 2026 - this no
// longer needs to be the onboarding@resend.dev sandbox address, which
// could only ever deliver to the Resend account's own inbox, never to
// LEAD_INBOX above. That's why no nurture email ever arrived before this.
const FROM_ADDRESS = "NeXDev Solutions <notifications@nexdevsolutions.net>";
// The lead magnet goes out from info@ specifically, not notifications@ -
// info@ is the one address with a real, confirmed-working mailbox behind
// it (it's also LEAD_INBOX above), so a lead who hits "reply" on this
// email actually reaches someone instead of bouncing.
const LEAD_MAGNET_FROM_ADDRESS = "NeXDev Solutions <info@nexdevsolutions.net>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LEAD_MAGNET_FILENAME = "NeXDev-Conversion-Leak-Check.pdf";
const LEAD_MAGNET_PATH = join(process.cwd(), "public", "assets", "lead-magnets", LEAD_MAGNET_FILENAME);
const LEAD_MAGNET_SUBJECT = "Your Conversion Leak Check is here";
const LEAD_MAGNET_BODY = `Here's your Conversion Leak Check.

Run the 12 questions on your own site, it takes about ten minutes. Every "no" is a place you're quietly losing customers you already paid to attract.

Count more than 3 or 4 nos and it's not a design problem, it's a conversion problem. That's exactly what we fix. When you want us to run all 12 on your actual site, just reply to this email or book a quick call: https://www.nexdevsolutions.net/qualify

NeXDev Solutions`;

// Read once per warm serverless instance rather than on every request -
// the file never changes at runtime. Cached as base64 so a failed read
// (missing file, bad permissions) is discovered once, logged once, and
// every request after that just skips the attachment instead of
// retrying a read that will keep failing.
let cachedLeadMagnetBase64: string | null | undefined;
function getLeadMagnetBase64(): string | null {
  if (cachedLeadMagnetBase64 !== undefined) return cachedLeadMagnetBase64;
  try {
    cachedLeadMagnetBase64 = readFileSync(LEAD_MAGNET_PATH).toString("base64");
  } catch (err) {
    console.error("Failed to read lead magnet PDF:", err);
    cachedLeadMagnetBase64 = null;
  }
  return cachedLeadMagnetBase64;
}

// Best-effort, single-instance throttle: not a real cross-instance rate
// limit (this route runs on Vercel's serverless model, a cold start
// resets this map), but it stops a warm instance from being hammered.
// The honeypot and email regex below are the primary guard against
// spam, this is defense in depth on top of them.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestTimestampsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  // No real IP to key on (always the case in local dev, where there is
  // no proxy setting x-forwarded-for) - skip rather than bucket every
  // anonymous client together under one shared "unknown" key, which
  // would let unrelated visitors rate-limit each other. Vercel always
  // sets x-forwarded-for in production, so this only ever short-circuits
  // locally.
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

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function readOption(value: unknown): QualifyOption | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (!isNonEmptyString(record.label)) return null;
  return {
    label: record.label,
    value: typeof record.value === "string" ? record.value : undefined,
  };
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Partial<QualifyPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot: hidden from real visitors, so anything filling it is a bot.
  if (isNonEmptyString(body.honeypot)) {
    return NextResponse.json({ error: "Rejected" }, { status: 400 });
  }

  const situation = readOption(body.situation);
  const pain = readOption(body.pain);
  const desiredOutcome = readOption(body.desired_outcome);
  const readiness = readOption(body.readiness);

  // The readiness question doubles as the budget signal: "Fix it",
  // "see the plan first", and "tight budget" all still want to move
  // forward, they just carry different budget expectations. Only "just
  // exploring" signals no real intent yet, that's the one disqualified
  // segment.
  const qualified = readiness?.value === "high" || readiness?.value === "mid" || readiness?.value === "low";

  // Contact info only ever exists here when a disqualified lead submits
  // the downsell screen's email capture - the main form never asks for
  // it, so this request has no email attached most of the time.
  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  const hasEmail = email.length > 0;

  if (hasEmail && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // A disqualified lead's first POST (the form completion, no email yet)
  // sends nothing, it just reports the verdict - only the second POST,
  // once they've actually submitted an email on the downsell screen,
  // triggers this nurture notification.
  if (!qualified && hasEmail) {
    const summaryLines = [
      `Email: ${email}`,
      `Situation: ${situation?.label ?? "-"}`,
      `Frustration: ${pain?.label ?? "-"}`,
      `Desired outcome: ${desiredOutcome?.label ?? "-"}`,
      `Readiness: ${readiness?.label ?? "-"}`,
      `Status: Disqualified, offered audit`,
    ];

    if (RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: LEAD_INBOX,
          subject: "New lead - NURTURE",
          text: summaryLines.join("\n"),
        });
      } catch (err) {
        console.error("Failed to send nurture email:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
      }
    } else {
      console.error("RESEND_API_KEY is not set - nurture email was not sent.");
    }

    // Second, separate email, this one to the lead rather than the
    // internal inbox. Its own try/catch on purpose: a failure here must
    // never fail the response or block the user's screen, the nurture
    // notification above already succeeded and that's what matters for
    // the API's own success/failure contract.
    if (RESEND_API_KEY) {
      const attachmentContent = getLeadMagnetBase64();
      if (attachmentContent) {
        try {
          const resend = new Resend(RESEND_API_KEY);
          await resend.emails.send({
            from: LEAD_MAGNET_FROM_ADDRESS,
            to: email,
            subject: LEAD_MAGNET_SUBJECT,
            text: LEAD_MAGNET_BODY,
            attachments: [
              {
                filename: LEAD_MAGNET_FILENAME,
                content: attachmentContent,
              },
            ],
          });
        } catch (err) {
          console.error("Failed to send lead magnet email:", err);
        }
      }
    }
  }

  // Qualified leads give their contact info on the booking page, not
  // here, so this is a heads-up notification only - no lead email to
  // include yet. Unlike the nurture email above, a failed send here
  // never fails the response: the visitor is already on their way to
  // the calendar (see qualify/page.tsx), and a missed internal
  // notification shouldn't block that.
  if (qualified) {
    const summaryLines = [
      `Situation: ${situation?.label ?? "-"}`,
      `Frustration: ${pain?.label ?? "-"}`,
      `Desired outcome: ${desiredOutcome?.label ?? "-"}`,
      `Readiness: ${readiness?.label ?? "-"}`,
      `Status: Qualified, sent to book a call`,
    ];

    if (RESEND_API_KEY) {
      try {
        const resend = new Resend(RESEND_API_KEY);
        await resend.emails.send({
          from: FROM_ADDRESS,
          to: LEAD_INBOX,
          subject: "New lead - QUALIFIED",
          text: summaryLines.join("\n"),
        });
      } catch (err) {
        console.error("Failed to send qualified-lead email:", err);
      }
    } else {
      console.error("RESEND_API_KEY is not set - qualified-lead email was not sent.");
    }
  }

  const response: QualifyResponse = { qualified };
  return NextResponse.json(response);
}
