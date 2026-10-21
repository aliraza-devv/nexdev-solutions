"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONSENT_GRANTED_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  type StoredConsent,
} from "@/lib/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function readStoredConsent(): StoredConsent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent> | null;
    if (!parsed || typeof parsed.analytics !== "boolean") return null;
    return { v: 1, analytics: parsed.analytics, ts: Number(parsed.ts) || 0 };
  } catch {
    return null;
  }
}

// Both buttons share these exact classes on purpose: neither choice is
// visually favoured over the other.
const CHOICE_BUTTON =
  "rounded-full border border-white/15 bg-[#26262e] px-4 py-2.5 text-sm font-bold text-[#f5f5f5] transition-colors hover:border-[#a89bff]/60 hover:bg-[#31313b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a89bff]";

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<StoredConsent | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldFocusRef = useRef(false);
  const tagsStartedRef = useRef(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setCurrent(stored);
    if (!stored) setOpen(true);
    // A saved Accept is granted before GTM loads, so GA4 Config and Clarity Base
    // already started from their normal triggers on this page.
    if (stored?.analytics) tagsStartedRef.current = true;

    const reopen = () => {
      shouldFocusRef.current = true;
      setCurrent(readStoredConsent());
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  // Only pull focus when the visitor reopened this themselves from the
  // footer. On first visit the banner must never steal focus from the page.
  useEffect(() => {
    if (open && shouldFocusRef.current) {
      shouldFocusRef.current = false;
      panelRef.current?.focus();
    }
  }, [open]);

  const choose = useCallback((analytics: boolean) => {
    const stored: StoredConsent = { v: 1, analytics, ts: Date.now() };
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Private mode or blocked storage: the choice still applies for this
      // page view via the gtag update below, it just will not persist.
    }
    // Ad signals stay denied whichever button was pressed.
    window.gtag?.("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    // The update above does not re-run tags GTM already blocked at page load, so a
    // first-visit Accept needs this event to start GA4 Config and Clarity Base now.
    // GTM has no once-per-page option on these two tag types, so it is pushed at
    // most once per page, and never when the tags already started at load.
    if (analytics && !tagsStartedRef.current) {
      tagsStartedRef.current = true;
      window.dataLayer?.push({ event: CONSENT_GRANTED_EVENT });
    }
    setCurrent(stored);
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open || !current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, current]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie preferences"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-[18px] border border-white/10 bg-[#14141A] p-5 text-white shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)] outline-none animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[400px]"
    >
      <p className="text-[15px] font-semibold tracking-[-0.01em]">Cookies</p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-white/[0.66]">
        We use analytics cookies to understand how people use this site. They stay off unless you
        accept. Ad cookies stay off either way.{" "}
        <Link
          href="/privacy-policy"
          className="text-[#a89bff] underline underline-offset-[3px] transition-colors hover:text-white"
        >
          Privacy Policy
        </Link>
      </p>

      {current && (
        <p className="mt-2 text-[12.5px] text-white/[0.38]">
          Your current choice: {current.analytics ? "Accepted" : "Rejected"}.
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose(true)} data-cursor="button" className={CHOICE_BUTTON}>
          Accept
        </button>
        <button type="button" onClick={() => choose(false)} data-cursor="button" className={CHOICE_BUTTON}>
          Reject
        </button>
      </div>

      {current && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          data-cursor="button"
          className="mt-3 text-[12.5px] text-white/[0.38] underline underline-offset-[3px] transition-colors hover:text-[#a89bff]"
        >
          Close without changing
        </button>
      )}
    </div>
  );
}
