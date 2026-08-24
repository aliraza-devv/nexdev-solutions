"use client";

import { useCursor } from "./useCursor";
import styles from "./cursor-mark.module.css";

// A single dot. It only ever translates and scales, never contains
// text, never becomes a ring or a crosshair. Hover treatment (fills,
// labels, spotlights) lives on the hovered element itself, driven by
// the --mx/--my/--r-target custom properties this system writes onto
// it, see element-mask.css.
export default function Cursor() {
  const { dotLayerRef, dotRef, labelRef, enabled } = useCursor();

  if (!enabled) return null;

  return (
    <div className={styles.fixedRoot} aria-hidden="true">
      <div ref={dotLayerRef} className={styles.dotLayer}>
        <div ref={dotRef} className={styles.dot} data-variant="default">
          <span ref={labelRef} className={styles.label} />
          {/* Smiley, only shown on the brand's purple CTA pills
              (data-cursor="cta") - see .face in cursor-mark.module.css. */}
          <svg className={styles.face} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="8.5" cy="9.5" r="1.6" fill="#5C45FD" />
            <circle cx="15.5" cy="9.5" r="1.6" fill="#5C45FD" />
            <path
              d="M7 14.5 Q12 18.5 17 14.5"
              stroke="#5C45FD"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
