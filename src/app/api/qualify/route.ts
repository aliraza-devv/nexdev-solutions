import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { QualifyOption, QualifyPayload, QualifyResponse } from "@/app/landing-page/qualify/types";

// Never send to the browser: read server-side only, inside this route
// handler, and never re-exported.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const LEAD_INBOX = "info@nexdevsolutions.net";
// Resend requires a verified sending domain for a custom "from" address.
// Swap this to something on nexdevsolutions.net once that domain is
// verified in the Resend dashboard.
const FROM_ADDRESS = "NeXDev Solutions <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // The readiness question doubles as the budget signal: "Fix it" and
  // "see the plan first" are the $500+ leads, serious or evaluating.
  // "Tight budget" and "just exploring" are the under-$500 segment.
  const qualified = readiness?.value === "high" || readiness?.value === "mid";

  // Contact info only ever exists here when a disqualified lead submits
  // the downsell screen's email capture - the main form never asks for
  // it, so this request has no email attached most of the time.
  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  const hasEmail = email.length > 0;

  if (hasEmail && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Qualified leads give their contact info on the booking page - there
  // is nothing to email here. A disqualified lead's first POST (the
  // form completion, no email yet) sends nothing either, it just
  // reports the verdict. Only the second POST, once they've actually
  // submitted an email on the downsell screen, triggers a notification.
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
  }

  const response: QualifyResponse = { qualified };
  return NextResponse.json(response);
}
