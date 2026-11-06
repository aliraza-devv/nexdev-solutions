// Validation for the "quick website review" email box on /book-call.
// Pure functions with no I/O so they can be unit tested. Nothing here logs or
// stores a value, and callers must not log the result either: an email
// address and a phone number are personal data (see TRACKING_PLAN.md).

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Digits, +, spaces, brackets and dashes only. The digit count is checked
// separately (7 to 15, the range E.164 allows).
const WHATSAPP_CHARS_RE = /^[0-9+()\-\s]{7,30}$/;

// Where the visitor came from: either a path on this site ("/case-studies/x")
// or a bare host name ("l.instagram.com"). Never a full URL, so no query
// string or fragment can carry anything personal into the notification.
const CAME_FROM_RE = /^(\/[a-z0-9\-_/]{0,79}|[a-z0-9.\-]{1,80})$/i;

export interface LeadInput {
  email: string;
  whatsapp: string | null;
  cameFrom: string;
}

export type LeadInputError = "bot" | "invalid_email" | "invalid_whatsapp";

export type LeadInputResult =
  | { ok: true; value: LeadInput }
  | { ok: false; error: LeadInputError };

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function parseLeadInput(body: unknown): LeadInputResult {
  const input = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Honeypot: the "company" field is hidden from real visitors, so anything
  // in it is a bot.
  if (text(input.company) !== "") return { ok: false, error: "bot" };

  const email = text(input.email);
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid_email" };
  }

  const whatsappRaw = text(input.whatsapp);
  let whatsapp: string | null = null;
  if (whatsappRaw !== "") {
    const digits = whatsappRaw.replace(/\D/g, "");
    if (!WHATSAPP_CHARS_RE.test(whatsappRaw) || digits.length < 7 || digits.length > 15) {
      return { ok: false, error: "invalid_whatsapp" };
    }
    whatsapp = whatsappRaw;
  }

  const from = text(input.cameFrom);
  return {
    ok: true,
    value: { email, whatsapp, cameFrom: CAME_FROM_RE.test(from) ? from : "" },
  };
}
