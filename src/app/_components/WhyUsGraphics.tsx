"use client";

import React, { useEffect, useRef } from "react";
import styles from "./WhyUsGraphics.module.css";

function useGfxMotion<T extends Element>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.add(styles.run, styles.paused);

    const io = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle(styles.paused, !entry.isIntersecting);
      },
      { rootMargin: "80px 0px", threshold: 0 },
    );
    io.observe(node);

    const handleVisibility = () => {
      if (document.hidden) node.classList.add(styles.paused);
      else node.classList.remove(styles.paused);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return ref;
}

export function ComparisonSliderGraphic() {
  const ref = useGfxMotion<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={`${styles.gfx} ${styles.g1}`}
      viewBox="0 0 260 190"
      aria-hidden="true"
    >
      <text className={`${styles.tag} ${styles.cold}`} x="40" y="22">
        THEIR BUILD
      </text>
      <text
        className={`${styles.tag} ${styles.hot}`}
        x="220"
        y="22"
        textAnchor="end"
      >
        OUR REBUILD
      </text>

      <rect className={styles.shade} x="40" y="36" width="180" height="130" rx="12" />

      {/* what the last agency shipped */}
      <g className={styles.before}>
        <rect className={styles.beforeSurface} x="40" y="32" width="180" height="130" rx="12" />
        <g className={styles.tiltA} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <rect className={styles.beforeInk} x="54" y="46" width="96" height="11" rx="5.5" />
        </g>
        <g className={styles.tiltB} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <rect className={styles.beforeInk2} x="54" y="66" width="70" height="34" rx="7" />
        </g>
        <rect className={styles.beforeInk2} x="134" y="70" width="66" height="30" rx="7" />
        <rect className={styles.beforeInk} x="54" y="110" width="112" height="7" rx="3.5" />
        <rect className={styles.beforeInk} x="54" y="123" width="74" height="7" rx="3.5" />
        <rect className={styles.dead} x="54" y="138" width="58" height="16" rx="8" />
        <path className={styles.crack} d="M172 32 l-8 30 l10 16 l-9 32 l7 22 l-5 30" />
      </g>

      {/* what we rebuilt */}
      <g className={styles.after}>
        <rect className={styles.afterSurface} x="40" y="32" width="180" height="130" rx="12" />
        <rect className={styles.afterInk} x="54" y="46" width="104" height="11" rx="5.5" />
        <rect className={styles.afterInk2} x="54" y="66" width="70" height="34" rx="7" />
        <rect className={styles.afterInk2} x="134" y="66" width="66" height="34" rx="7" />
        <rect className={styles.afterInk} x="54" y="110" width="132" height="7" rx="3.5" />
        <rect className={styles.afterInk} x="54" y="123" width="88" height="7" rx="3.5" />
        <rect className={styles.afterCta} x="54" y="136" width="66" height="19" rx="9.5" />
        <path
          d="M64 145.5 h14 M74 141.5 l4.5 4 l-4.5 4"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* the drag handle */}
      <g className={styles.handle}>
        <rect x="39" y="32" width="2.5" height="130" rx="1.25" fill="#5c45fd" />
        <circle cx="40" cy="97" r="12" fill="#fff" stroke="#5c45fd" strokeWidth="2.2" />
        <path
          d="M36.5 93 l-3.2 4 l3.2 4 M43.5 93 l3.2 4 l-3.2 4"
          fill="none"
          stroke="#5c45fd"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function ABTestGraphic() {
  const ref = useGfxMotion<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={`${styles.gfx} ${styles.g2}`}
      viewBox="0 0 260 190"
      aria-hidden="true"
    >
      <text className={`${styles.tag} ${styles.cold}`} x="18" y="36">
        A &middot; STYLE
      </text>
      <text className={`${styles.tag} ${styles.hot}`} x="142" y="36">
        B &middot; SELLS
      </text>

      {/* variant A: beautiful, no way in */}
      <rect className={styles.shade} x="18" y="48" width="100" height="94" rx="11" />
      <rect className={styles.coldSurface} x="18" y="44" width="100" height="94" rx="11" />
      <circle className={styles.ornament} cx="68" cy="76" r="19" />
      <path className={styles.flourish} d="M34 106 q10 -7 20 0 q10 7 20 0 q10 -7 20 0" />
      <rect className={styles.coldInk} x="34" y="118" width="68" height="6" rx="3" />
      <rect className={styles.meter} x="18" y="152" width="100" height="7" rx="3.5" />
      <rect className={`${styles.bar} ${styles.cold}`} x="18" y="152" width="100" height="7" rx="3.5" />

      {/* variant B: plain, one obvious way in */}
      <rect className={styles.shade} x="142" y="48" width="100" height="94" rx="11" />
      <rect className={styles.warmSurface} x="142" y="44" width="100" height="94" rx="11" />
      <rect className={styles.warmInk} x="156" y="58" width="66" height="10" rx="5" />
      <rect className={styles.warmInk2} x="156" y="74" width="46" height="6" rx="3" />
      <rect className={styles.cta} x="156" y="96" width="68" height="22" rx="11" />
      <path className={styles.ctaArrow} d="M168 107 h16 M180 102.5 l4.5 4.5 l-4.5 4.5" />
      <rect className={styles.meter} x="142" y="152" width="100" height="7" rx="3.5" />
      <rect className={`${styles.bar} ${styles.hot}`} x="142" y="152" width="100" height="7" rx="3.5" />

      {/* the visitors */}
      <circle className={`${styles.v} ${styles.l1}`} cx="42" cy="12" r="3.6" fill="#c2c2d0" />
      <circle className={`${styles.v} ${styles.l2}`} cx="68" cy="12" r="3.6" fill="#c2c2d0" />
      <circle className={`${styles.v} ${styles.l3}`} cx="94" cy="12" r="3.6" fill="#c2c2d0" />
      <circle className={`${styles.v} ${styles.r1}`} cx="166" cy="12" r="3.6" fill="#5c45fd" />
      <circle className={`${styles.v} ${styles.r2}`} cx="190" cy="12" r="3.6" fill="#5c45fd" />
      <circle className={`${styles.v} ${styles.r3}`} cx="214" cy="12" r="3.6" fill="#5c45fd" />
    </svg>
  );
}

function GStep({
  cy,
  checkD,
  label,
}: {
  cy: number;
  checkD: string;
  label: string;
}) {
  return (
    <g className={styles.gStep}>
      <circle className={styles.stepRing} cx="50" cy={cy} r="8" />
      <circle className={styles.stepFill} cx="50" cy={cy} r="8" />
      <path className={styles.stepCheck} d={checkD} />
      <text className={styles.stepTxt} x="66" y={cy + 3}>
        {label}
      </text>
    </g>
  );
}

export function ProjectDashboardGraphic() {
  const ref = useGfxMotion<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={`${styles.gfx} ${styles.g3}`}
      viewBox="0 0 260 190"
      aria-hidden="true"
    >
      <g className={styles.boardGroup}>
        <rect className={styles.shade} x="26" y="34" width="208" height="140" rx="13" />
        <rect className={styles.board} x="26" y="30" width="208" height="140" rx="13" />

        <text className={styles.boardTitle} x="42" y="52">
          Your build
        </text>
        <circle className={styles.liveDot} cx="196" cy="49" r="3.5" />
        <text className={styles.liveTxt} x="204" y="52">
          LIVE
        </text>

        <rect className={styles.trackBg} x="42" y="62" width="176" height="8" rx="4" />
        <rect className={styles.trackFill} x="42" y="62" width="176" height="8" rx="4" />

        <GStep cy={92} checkD="M46.4 92 l2.6 2.8 l4.6 -5.6" label="Strategy locked" />
        <GStep cy={114} checkD="M46.4 114 l2.6 2.8 l4.6 -5.6" label="Copy and design" />
        <GStep cy={136} checkD="M46.4 136 l2.6 2.8 l4.6 -5.6" label="Build and test" />
        <GStep cy={158} checkD="M46.4 158 l2.6 2.8 l4.6 -5.6" label="Live" />
      </g>

      {/* the update that lands in your inbox every 2 to 3 days */}
      <g className={styles.toast}>
        <rect x="128" y="2" width="112" height="24" rx="12" />
        <circle cx="143" cy="14" r="4" />
        <text x="154" y="17">
          Progress update sent
        </text>
      </g>
    </svg>
  );
}
