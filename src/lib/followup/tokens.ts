import { createHmac, timingSafeEqual } from "crypto";
import { SITE_URL } from "./config";

// Signed tokens for the unsubscribe link. The token carries only the lead's
// key (a hash), never an email address, so the link leaks nothing if it is
// forwarded. It has no expiry: an unsubscribe link must keep working.

function toBase64Url(buffer: Buffer): string {
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function sign(body: string, secret: string): string {
  return toBase64Url(createHmac("sha256", secret).update(body).digest());
}

export function signToken(payload: Record<string, string>, secret: string): string {
  const body = toBase64Url(Buffer.from(JSON.stringify(payload)));
  return `${body}.${sign(body, secret)}`;
}

export function verifyToken(token: string, secret: string): Record<string, string> | null {
  const [body, signature] = token.split(".");
  if (!body || !signature || !secret) return null;
  const expected = Buffer.from(sign(body, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const padded = body.replace(/-/g, "+").replace(/_/g, "/");
    const parsed = JSON.parse(Buffer.from(padded, "base64").toString("utf8"));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export interface UnsubscribeUrls {
  /** The page a person opens from the email. */
  page: string;
  /** The one-click endpoint for the List-Unsubscribe header. */
  post: string;
}

export function unsubscribeUrls(leadKey: string): UnsubscribeUrls | null {
  const secret = process.env.LEAD_TOKEN_SECRET;
  if (!secret) return null;
  const token = signToken({ k: leadKey, p: "unsubscribe" }, secret);
  return {
    page: `${SITE_URL}/unsubscribe?t=${token}`,
    post: `${SITE_URL}/api/unsubscribe?t=${token}`,
  };
}

export function leadKeyFromUnsubscribeToken(token: string): string | null {
  const secret = process.env.LEAD_TOKEN_SECRET;
  if (!secret) return null;
  const payload = verifyToken(token, secret);
  return payload && payload.p === "unsubscribe" && payload.k ? payload.k : null;
}
