"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "working" | "done" | "error";

// One button, one request. The token in the link says who this is, so the
// visitor does not type anything. No analytics events fire from this page.
export default function UnsubscribeForm({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>("idle");

  if (!token) {
    return (
      <p className="mt-5 text-zinc-500">
        This link does not look right. Reply to any of our emails and we will remove you by hand.
      </p>
    );
  }

  async function onClick() {
    if (status === "working") return;
    setStatus("working");
    try {
      const res = await fetch(`/api/unsubscribe?t=${encodeURIComponent(token)}`, { method: "POST" });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="mt-5">
        <p className="font-medium text-zinc-800">Done. You will not get any more emails from us.</p>
        <Link href="/" className="mt-4 inline-block text-sm text-[#5C45FD] underline-offset-2 hover:underline">
          Back to the website
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-5">
      <p className="text-zinc-500">Click the button and we will stop emailing you. It takes effect straight away.</p>
      <button
        type="button"
        onClick={onClick}
        disabled={status === "working"}
        className="mt-6 rounded-full bg-[#5C45FD] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#4a36e0] disabled:opacity-60"
      >
        {status === "working" ? "Working..." : "Unsubscribe me"}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          Something went wrong. Please try again, or reply to any of our emails and we will remove you by hand.
        </p>
      )}
    </div>
  );
}
