"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// The six NEXDEV letterforms as their own paths (traced from the brand
// wordmark), so each one can rise into place independently rather than
// the watermark appearing as a single flat image.
const LETTER_PATHS = [
  "M45.9523 158.638H2V2H48.7577L92.2424 60.681L115.154 96.6844H118.193L116.089 62.5513V2H160.041V158.638H113.283L66.9933 98.321L47.1212 67.4608H44.082L45.9523 97.3858V158.638Z",
  "M339.109 158.638H200.005V2H339.109V41.5103H243.958V60.2134H335.603V99.4899H243.958V119.128H339.109V158.638Z",
  "M425.623 158.638H368.111L427.26 81.722V78.6827L368.111 2H425.623L463.497 52.7322H466.536L502.306 2H559.818L500.903 79.6179V82.6571L559.818 158.638H502.306L464.666 107.673H461.627L425.623 158.638Z",
  "M672.134 158.638H592.88V2H672.134C723.801 2 756.532 30.756 756.532 80.3192C756.532 129.882 723.801 158.638 672.134 158.638ZM672.134 41.5103H636.832V119.128H672.134C699.955 119.128 709.54 115.621 709.54 80.3192C709.54 45.0171 699.955 41.5103 672.134 41.5103Z",
  "M933.125 158.638H794.021V2H933.125V41.5103H837.973V60.2134H929.618V99.4899H837.973V119.128H933.125V158.638Z",
  "M1088.14 158.638H1025.02L962.127 2H1015.2L1055.64 114.219H1058.68L1098.19 2H1151.03L1088.14 158.638Z",
];

// Each letter of the NEXDEV watermark rises up from below the footer's
// bottom edge and settles into place, one after another, once the
// footer scrolls into view. The clip-path that already crops the
// wordmark to its frame doubles as the mask that hides each letter
// while it's still below the baseline - no extra clipping needed.
export default function FooterWatermarkReveal() {
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const revealed = inView || reduceMotion;

  return (
    <svg
      ref={ref}
      viewBox="0 0 1153 135"
      className="w-full h-full opacity-10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#nexdev-footer-clip)">
        {LETTER_PATHS.map((d, i) => (
          <motion.g
            key={i}
            initial={{ y: 70, opacity: 0 }}
            animate={revealed ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 1.3,
              delay: i * 0.16,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            <path d={d} fill="white" />
          </motion.g>
        ))}
      </g>
      <defs>
        <clipPath id="nexdev-footer-clip">
          <rect width="1153" height="135" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
