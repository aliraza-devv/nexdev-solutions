"use client";

import { useState } from "react";
import Link from "next/link";
import { emitGenerateLead } from "@/lib/track";

type Status = "idle" | "sending" | "done" | "error";

// Sits under the calendar. Collapsed by default: until a visitor opens it,
// this is one sentence and a button, with no inputs and no network calls, so
// it cannot slow the calendar down.
export default function ReviewRequest() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    setStatus("sending");
    setMessage("");

    // Where the visitor came from: a path on this site, or the other site's
    // host name. Never the full URL, so no query string is passed along.
    let cameFrom = "";
    try {
      if (document.referrer) {
        const ref = new URL(document.referrer);
        cameFrom = ref.origin === window.location.origin ? ref.pathname : ref.hostname;
      }
    } catch {
      cameFrom = "";
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          whatsapp: form.get("whatsapp"),
          company: form.get("company"),
          cameFrom,
        }),
      });
      if (res.ok) {
        emitGenerateLead("review_request", "nurture");
        setStatus("done");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setMessage(
        data.error === "invalid_email"
          ? "That email does not look right."
          : data.error === "invalid_whatsapp"
            ? "That WhatsApp number does not look right."
            : "Something went wrong. Please try again.",
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
    setStatus("error");
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-[850px] text-center text-sm text-zinc-500">
      {status === "done" ? (
        <p role="status" className="font-medium text-zinc-700">
          Thanks, got it. Watch your inbox.
        </p>
      ) : (
        <>
          <p>
            Not ready for a call?{" "}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="review-request-form"
              className="font-semibold text-[#5C45FD] underline-offset-2 hover:underline"
            >
              Get a quick website review by email.
            </button>
          </p>

          {open && (
            <form
              id="review-request-form"
              onSubmit={onSubmit}
              className="mx-auto mt-4 flex max-w-md flex-col gap-2 text-left"
            >
              <label htmlFor="review-email" className="sr-only">
                Email
              </label>
              <input
                id="review-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email"
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#5C45FD]"
              />
              <label htmlFor="review-whatsapp" className="sr-only">
                WhatsApp number (optional)
              </label>
              <input
                id="review-whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                placeholder="WhatsApp number (optional)"
                className="w-full rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none focus:border-[#5C45FD]"
              />
              {/* Honeypot: hidden from people, bots fill it in. */}
              <input
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 rounded-full bg-[#5C45FD] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4a36e0] disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send me the review"}
              </button>
              {message && (
                <p role="alert" className="text-center text-sm text-red-600">
                  {message}
                </p>
              )}
              <p className="text-center text-xs text-zinc-400">
                We only use your details to send your review and follow-ups. Unsubscribe any time.{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          )}
        </>
      )}
    </div>
  );
}
