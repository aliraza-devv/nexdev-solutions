"use client";

import { useCallback } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Routes every in-page anchor through the shared Lenis instance so it eases
// to the target instead of jumping, falling back to a native smooth scroll
// if Lenis has not mounted yet (or was skipped for prefers-reduced-motion).
export function useLenisScrollTo() {
  return useCallback(
    (
      target: string | HTMLElement,
      options?: { offset?: number; duration?: number },
    ) => {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.duration ?? 1.2,
        });
      } else {
        const el =
          typeof target === "string" ? document.querySelector(target) : target;
        el?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [],
  );
}
