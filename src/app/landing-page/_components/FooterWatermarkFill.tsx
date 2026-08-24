"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Gentle amplitude and a wide period, so the crest reads as a soft
// water-surface shimmer rather than a jagged cartoon wave.
const WAVE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 28'%3E%3Cpath d='M0 18 Q 30 10 60 18 T 120 18 T 180 18 T 240 18 V28 H0 Z' fill='%23ffffff' fill-opacity='0.9'/%3E%3C/svg%3E";

// Purple "water" rises through the NEXDEV watermark letterforms, masked
// to their exact shape, once the footer scrolls into view. Two wave
// layers drift at different speeds along the fill's surface.
export default function FooterWatermarkFill() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();

  const maskStyle: React.CSSProperties = {
    WebkitMaskImage: "url(/assets/NEXDEV-footer.svg)",
    maskImage: "url(/assets/NEXDEV-footer.svg)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: "1440 / 220" }}>
      <img
        src="/assets/NEXDEV-footer.svg"
        alt="NEXDEV"
        className="absolute inset-0 h-full w-full opacity-10"
      />
      <div className="absolute inset-0 overflow-hidden" style={maskStyle}>
        <motion.div
          className="absolute inset-x-0 bottom-0"
          initial={{ height: "0%" }}
          animate={{ height: inView || reduceMotion ? "100%" : "0%" }}
          transition={{ duration: 3.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="absolute inset-x-0 bottom-0 top-2 bg-[#5c45fd]" />
          {/* Single soft, blurred crest, one layer only, so it reads as
              one calm shimmer instead of two overlapping wave shapes
              fighting each other. */}
          <div
            className="absolute inset-x-0 top-0 h-5 opacity-70 blur-[0.5px]"
            style={{
              backgroundImage: `url("${WAVE_SVG}")`,
              backgroundRepeat: "repeat-x",
              backgroundSize: "220px 20px",
              animation: reduceMotion ? "none" : "footerWaveDrift 5.5s linear infinite",
            }}
          />
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes footerWaveDrift {
          from {
            background-position-x: 0;
          }
          to {
            background-position-x: -220px;
          }
        }
      `}</style>
    </div>
  );
}
