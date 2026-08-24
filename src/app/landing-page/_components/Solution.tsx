"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = [
  {
    char: "S",
    title: "Sales Triggers",
    desc: "We integrate pricing psychology and offer clarity directly into the UI.",
  },
  {
    char: "Y",
    title: "Your Brand Story",
    desc: "We craft the narrative that hooks users in the first 3 seconds.",
  },
  {
    char: "N",
    title: "Neuro-Persuasion",
    desc: "We use behavioral data to match how your specific audience thinks.",
  },
  {
    char: "C",
    title: "Conversion Design",
    desc: "Frictionless UI/UX flows that guide the user to the 'Buy' button.",
  },
];

export default function Solution() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-[#0A0A0E] pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden select-none">
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5C45FD]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            The Solution
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white font-normal leading-tight tracking-tight max-w-4xl mx-auto text-center"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "clamp(28px, 5vw, 46px)",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="inline-block"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text="There's a fix. And it's not"
            >
              There&apos;s a fix. And it&apos;s not
            </span>{" "}
            <span
              className="inline-block text-[#5C45FD] italic"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text="another redesign."
            >
              another redesign.
            </span>
          </motion.h2>
        </div>

        {/* Letters Area: each card is always in the flow above its own
            letter (not a hover-only overlay), so there's no empty reserved
            gap when nothing is hovered. Hovering a letter or its card just
            highlights that one. */}
        <div className="relative flex justify-between items-start w-full max-w-5xl mx-auto py-6 md:py-10">
          {letters.map((item, idx) => {
            // Determine initial animation offset to make them slide apart from center
            let initialX = 0;
            if (idx === 0)
              initialX = 70; // S slides left from center-left
            else if (idx === 1)
              initialX = 25; // Y slides left slightly
            else if (idx === 2)
              initialX = -25; // N slides right slightly
            else if (idx === 3) initialX = -70; // C slides right from center-right

            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={item.char}
                initial={{ x: initialX, opacity: 0, scale: 0.9 }}
                whileInView={{ x: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Mobile tap handler
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setHoveredIndex(hoveredIndex === idx ? null : idx);
                  }
                }}
                data-cursor="button"
                className="relative cursor-pointer select-none group flex-1 flex flex-col items-center gap-5"
              >
                {/* Card: always visible, hover just highlights it. Plain
                    conditional classes + CSS transition rather than a
                    framer-motion `animate` prop, so the highlight is driven
                    by React state directly instead of Framer's own
                    rAF-driven animation loop. */}
                <div
                  className={`hidden md:block w-full max-w-[220px] p-5 rounded-xl bg-[#0F0F16]/90 border backdrop-blur-md transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 scale-[1.04] border-[#5C45FD]/60 shadow-[0_0_15px_rgba(92,69,253,0.15)]"
                      : "opacity-85 scale-100 border-[#5C45FD]/30"
                  }`}
                >
                  <h4 className="text-[13px] font-bold uppercase tracking-wider mb-2 text-white">
                    {item.title}
                  </h4>
                  <p className="text-[#E5E7EB] text-[13px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <motion.span
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-[64px] xs:text-[92px] sm:text-[135px] md:text-[170px] lg:text-[210px] font-bold tracking-tighter leading-none transition-colors duration-300 ${
                    isHovered
                      ? "text-[#5C45FD] drop-shadow-[0_0_30px_rgba(92,69,253,0.3)]"
                      : "text-[#16161E] group-hover:text-white/[0.08]"
                  }`}
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {item.char}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile static helper: displays selected letter description below letters */}
        <div className="block md:hidden mt-8 min-h-[80px] text-center px-4">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null ? (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-xl bg-[#0F0F16]/90 border border-[#5C45FD]/30"
              >
                <h4 className="text-[#5C45FD] text-xs font-bold uppercase tracking-wider mb-1">
                  {letters[hoveredIndex].title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {letters[hoveredIndex].desc}
                </p>
              </motion.div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Tap on any letter to explore the SYNC elements
              </p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
