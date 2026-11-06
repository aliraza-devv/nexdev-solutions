import { Resend } from "resend";
import { LEAD_FROM, NOTIFY_FROM, OWNER_INBOX } from "./config";
import type { Email } from "./copy";
import type { UnsubscribeUrls } from "./tokens";

// Every send goes through here. Failures are logged by name only: the error
// objects and the payloads can contain an email address.

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

async function send(input: {
  from: string;
  to: string;
  email: Email;
  replyTo?: string;
  headers?: Record<string, string>;
  sendAt?: number;
  idempotencyKey?: string;
}): Promise<string | null> {
  const resend = client();
  if (!resend) {
    console.error("RESEND_API_KEY is not set - an email was not sent.");
    return null;
  }
  try {
    const { data, error } = await resend.emails.send(
      {
        from: input.from,
        to: input.to,
        subject: input.email.subject,
        text: input.email.text,
        html: input.email.html,
        replyTo: input.replyTo,
        headers: input.headers,
        scheduledAt: input.sendAt ? new Date(input.sendAt).toISOString() : undefined,
      },
      input.idempotencyKey ? { idempotencyKey: input.idempotencyKey } : undefined,
    );
    if (error || !data) {
      console.error("An email was rejected by the email service:", error ? error.name : "no_data");
      return null;
    }
    return data.id;
  } catch {
    console.error("An email could not be sent.");
    return null;
  }
}

/** To the owner. Returns the Resend id, or null when it was not sent. */
export function sendOwnerEmail(email: Email, sendAt?: number): Promise<string | null> {
  return send({ from: NOTIFY_FROM, to: OWNER_INBOX, email, sendAt });
}

/** To a lead. Always carries an unsubscribe link and the one-click header. */
export function sendLeadEmail(input: {
  to: string;
  email: Email;
  urls: UnsubscribeUrls;
  sendAt?: number;
  idempotencyKey?: string;
}): Promise<string | null> {
  return send({
    from: LEAD_FROM,
    to: input.to,
    email: input.email,
    replyTo: OWNER_INBOX,
    headers: {
      "List-Unsubscribe": `<${input.urls.post}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    sendAt: input.sendAt,
    idempotencyKey: input.idempotencyKey,
  });
}

/** Cancels an email Resend has scheduled but not sent yet. Best effort. */
export async function cancelEmail(id: string): Promise<void> {
  if (!id || id === "skipped") return;
  const resend = client();
  if (!resend) return;
  try {
    await resend.emails.cancel(id);
  } catch {
    console.error("A scheduled email could not be cancelled.");
  }
}
