"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import QualifyStepper from "../_components/QualifyStepper";

const CONFIRMATION_PATH = "/landing-page/book-call/confirmed";

// Cal.com's inline-embed loader is vanilla JS that defines window.Cal and
// injects app.cal.com's own script tag - kept byte-for-byte as provided,
// just wrapped in an effect so it runs client-side after the target div
// exists. The `container.childElementCount` guard stops React 18 dev
// Strict Mode's double-effect-invoke from mounting the calendar twice.
function useCalEmbed() {
  useEffect(() => {
    const container = document.getElementById("my-cal-inline-discovery-call");
    if (!container || container.childElementCount > 0) return;

    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          const ar = args;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function (...apiArgs: any[]) {
              p(api, apiArgs);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    Cal("init", "discovery-call", { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns["discovery-call"]("inline", {
      elementOrSelector: "#my-cal-inline-discovery-call",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "nexdevsolutions/discovery-call",
    });

    Cal.ns["discovery-call"]("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#292929" },
        dark: { "cal-brand": "#fafafa" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    // Send them to our own confirmation page once a booking actually goes
    // through, instead of leaving them looking at Cal's own success screen
    // inside the embed.
    Cal.ns["discovery-call"]("on", {
      action: "bookingSuccessful",
      callback: () => {
        window.location.href = CONFIRMATION_PATH;
      },
    });
  }, []);
}

export default function BookCallPage() {
  useCalEmbed();

  return (
    <main className="relative min-h-screen bg-white">
      {/* Bare logo, not a link - this page has exactly one thing to do:
          book the call. No navigation, no other CTA, no exit. */}
      <div className="px-6 pt-6 md:px-12 md:pt-8">
        <div className="relative h-7 w-36 md:h-8 md:w-40">
          <Image
            src="/assets/nexdev-full-logo-black.png"
            alt="NeXDev Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      <QualifyStepper step1="done" step2="active" connectorFilled />

      <section className="px-6 pb-16 pt-6 md:px-12 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-[850px]"
        >
          <div
            id="my-cal-inline-discovery-call"
            style={{ width: "100%", overflow: "scroll" }}
            className="h-[600px] rounded-2xl border border-black/[0.06] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.15)] sm:h-[650px] md:h-[700px] lg:h-[750px]"
          />
        </motion.div>
      </section>
    </main>
  );
}
