"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Native mode only: no wrapper/content options are passed to Lenis, so it
// drives the window's own scroll instead of wrapping the page in a
// transformed container. A transform wrapper breaks every position:sticky
// element on this site (OurProcess, SyncMethod, the Results stacking
// cards), so this is not a style choice, it is a requirement.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // App Router keeps this provider mounted across client-side navigations,
  // it never remounts. So a link to a hash on a DIFFERENT route (Next
  // navigates there first, the hash cannot be scrolled to until the new
  // page's content exists) is handled here, keyed on pathname: once the
  // route has changed, scroll to whatever hash is now in the URL. A link
  // to a hash on the SAME route is handled by useLenisScrollTo directly in
  // the click handler instead, since there is no navigation to wait for.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const scroll = () => lenisRef.current?.scrollTo(el, { offset: 0 });
    const raf = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      // Longer duration plus a gentler quart-out curve (rather than the
      // old sharp expo-out) is what actually reads as "premium weight"
      // instead of "snappy then stuck" - it decelerates gradually the
      // whole way through the glide instead of almost all at once.
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // Below 1: each wheel notch covers a bit less distance, so the
      // page doesn't feel like it's racing even on a fast scroll wheel.
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Only the case-study template uses GSAP ScrollTrigger, so this is a
    // dynamic import kept out of the shared root bundle rather than a
    // static one: it is fetched as its own lazy chunk after mount instead
    // of inflating every route's first-load JS. Calling ScrollTrigger.update
    // on routes with no ScrollTrigger instances is a harmless no-op. This
    // keeps GSAP's own scroll-linked animations synced to Lenis's eased
    // scroll position instead of drifting a frame behind it.
    let cleanupGsapSync: (() => void) | undefined;
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      cleanupGsapSync = () => lenis.off("scroll", onScroll);
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanupGsapSync?.();
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
