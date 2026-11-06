import { NextResponse } from "next/server";
import { parseBookingPayload, parseNoShow, verifyCalSignature } from "@/lib/followup/cal";
import {
  handleBookingCancelled,
  handleBookingCreated,
  handleBookingRescheduled,
  handleNoShow,
} from "@/lib/followup/handlers";

export const dynamic = "force-dynamic";

// Cal.com sends a signed message here when a booking is made, moved,
// cancelled, or an attendee is marked as a no-show. We match the booking to a
// lead by email, stop their follow-ups, and schedule the booking emails.
//
// Privacy: nothing from the payload is logged. Names, emails and answers go
// only into the emails we send; answers are not stored.
export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error("CAL_WEBHOOK_SECRET is not set - a Cal.com event was ignored.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  // The signature covers the raw text, so read it before parsing.
  const raw = await request.text();
  if (!verifyCalSignature(raw, request.headers.get("x-cal-signature-256"), secret)) {
    return NextResponse.json({ error: "bad_signature" }, { status: 401 });
  }

  let event: { triggerEvent?: unknown; payload?: unknown };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  try {
    switch (event.triggerEvent) {
      case "BOOKING_CREATED": {
        const info = parseBookingPayload(event.payload);
        if (info) await handleBookingCreated(info);
        break;
      }
      case "BOOKING_RESCHEDULED": {
        const info = parseBookingPayload(event.payload);
        if (info) await handleBookingRescheduled(info);
        break;
      }
      case "BOOKING_CANCELLED": {
        const info = parseBookingPayload(event.payload);
        if (info) await handleBookingCancelled(info);
        break;
      }
      case "BOOKING_NO_SHOW_UPDATED": {
        const noShow = parseNoShow(event.payload);
        if (noShow && noShow.emails.length > 0) await handleNoShow(noShow);
        break;
      }
      default:
        // PING and any trigger we did not subscribe to: acknowledge and ignore.
        break;
    }
  } catch {
    console.error("A Cal.com event could not be processed.");
    return NextResponse.json({ error: "processing_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
