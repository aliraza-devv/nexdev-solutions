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

  const name = isNonEmptyString(body.name) ? body.name.trim() : "";
  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  if (name.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Missing or invalid name or email" }, { status: 400 });
  }

  const type = readOption(body.type);
  const problem = readOption(body.problem);
  const budget = readOption(body.budget);
  const timeline = readOption(body.timeline);

  // The only disqualifier: budget under $500.
  const qualified = budget?.value !== "low";

  const summaryLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business type: ${type?.label ?? "-"}`,
    `Main problem: ${problem?.label ?? "-"}`,
    `Budget: ${budget?.label ?? "-"}`,
    `Timeline: ${timeline?.label ?? "-"}`,
    `Qualified: ${qualified ? "Yes" : "No, nurture (under $500 budget)"}`,
  ];

  if (RESEND_API_KEY) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: LEAD_INBOX,
        subject: `New lead: ${name} [${qualified ? "QUALIFIED" : "NURTURE"}]`,
        text: summaryLines.join("\n"),
      });
    } catch (err) {
      console.error("Failed to send qualification email:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }
  } else {
    console.error("RESEND_API_KEY is not set - qualification email was not sent.");
  }

  const response: QualifyResponse = { qualified };
  return NextResponse.json(response);
}
