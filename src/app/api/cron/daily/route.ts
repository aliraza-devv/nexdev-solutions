import { NextResponse } from "next/server";
import { runDaily } from "@/lib/followup/cron";

export const dynamic = "force-dynamic";

// Runs once a day (see vercel.json). Vercel sends "Authorization: Bearer
// <CRON_SECRET>" when the CRON_SECRET variable exists. Without the secret set
// this route refuses to run, so nobody can trigger sends by visiting the URL.
// The response holds counts only.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("CRON_SECRET is not set - the daily follow-up run was refused.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json({ ok: true, ...(await runDaily()) });
  } catch {
    console.error("The daily follow-up run failed.");
    return NextResponse.json({ error: "run_failed" }, { status: 500 });
  }
}
