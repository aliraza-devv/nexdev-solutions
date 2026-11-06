import { NextResponse } from "next/server";
import { unsubscribeByKey } from "@/lib/followup/handlers";
import { leadKeyFromUnsubscribeToken } from "@/lib/followup/tokens";

export const dynamic = "force-dynamic";

// Unsubscribes at once. POST only, on purpose: mail scanners open links in
// emails, and a link that unsubscribed on GET would remove people by accident.
// Two callers use this: the button on /unsubscribe, and mail apps that support
// one-click unsubscribe (the List-Unsubscribe-Post header on every lead email).
// The signed token in the link identifies the lead; it holds no email address.
export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("t") ?? "";
  const key = leadKeyFromUnsubscribeToken(token);
  if (!key) return NextResponse.json({ error: "invalid_link" }, { status: 400 });

  try {
    await unsubscribeByKey(key);
  } catch {
    console.error("An unsubscribe could not be saved.");
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
