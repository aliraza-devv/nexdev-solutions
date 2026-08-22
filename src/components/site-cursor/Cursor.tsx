"use client";

import { useCursor } from "./useCursor";
import styles from "./cursor-mark.module.css";

// Mounted once from the root layout. A registration mark: a circle,
// four crosshair arms, and a solid center dot. It only ever
// translates, scales, and rotates, it never contains text and never
// morphs into a rectangle. Every hover treatment (fills, labels,
// lenses, spotlights) lives on the hovered element itself, driven by
// the --mx/--my/--r-target custom properties this system writes onto
// it, see element-mask.css.
export default function Cursor() {
  const { dotLayerRef, ringLayerRef, dotRotateRef, ringRotateRef, enabled } = useCursor();

  if (!enabled) return null;

  return (
    <div className={styles.fixedRoot} aria-hidden="true">
      <div ref={dotLayerRef} className={styles.dotLayer}>
        <div ref={dotRotateRef} className={styles.rotateWrap} data-variant="default">
          <svg className={styles.dotSvg} viewBox="-4 -4 8 8" focusable="false">
            <circle className={styles.dot} r="1.5" />
          </svg>
        </div>
      </div>
      <div ref={ringLayerRef} className={styles.ringLayer}>
        <div ref={ringRotateRef} className={styles.rotateWrap} data-variant="default">
          <svg className={styles.ringSvg} viewBox="-30 -30 60 60" focusable="false">
            <circle className={styles.dashedRing} r="20" />
            <circle className={styles.circle} r="13" />
            <line className={`${styles.arm} ${styles.armN}`} x1="0" y1="-15" x2="0" y2="-20" />
            <line className={`${styles.arm} ${styles.armE}`} x1="15" y1="0" x2="20" y2="0" />
            <line className={`${styles.arm} ${styles.armS}`} x1="0" y1="15" x2="0" y2="20" />
            <line className={`${styles.arm} ${styles.armW}`} x1="-15" y1="0" x2="-20" y2="0" />
            <path className={styles.playGlyph} d="M-3,-5 L-3,5 L5,0 Z" />
            <g className={styles.pauseGlyph}>
              <rect x="-4" y="-5" width="3" height="10" />
              <rect x="2" y="-5" width="3" height="10" />
            </g>
            <path className={styles.chevronLeft} d="M-25,-6 L-31,0 L-25,6" />
            <path className={styles.chevronRight} d="M25,-6 L31,0 L25,6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
