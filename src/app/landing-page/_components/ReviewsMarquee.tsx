"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const reviews = [
  { src: "/assets/Reviews/r-0.PNG", width: 679, height: 204 },
  { src: "/assets/Reviews/r-1.PNG", width: 684, height: 307 },
  { src: "/assets/Reviews/r-2.PNG", width: 682, height: 211 },
  { src: "/assets/Reviews/r-3.PNG", width: 793, height: 143 },
  { src: "/assets/Reviews/r-4.PNG", width: 789, height: 316 },
  { src: "/assets/Reviews/r-5.PNG", width: 684, height: 182 },
  { src: "/assets/Reviews/r-6.PNG", width: 801, height: 408 },
  { src: "/assets/Reviews/r-7.PNG", width: 801, height: 268 },
  { src: "/assets/Reviews/cc.PNG", width: 508, height: 371 },
];

export default function ReviewsMarquee() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0E] py-20 lg:py-28 border-b border-white/[0.08]">
      <div className="bg-grain absolute inset-0 opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10 mb-12 lg:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          REVIEWS
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white max-w-2xl mx-auto"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
          data-cursor="text"
          data-cursor-on-dark=""
          data-text="More receipts, if you needed them."
        >
          More receipts,{" "}
          <span className="text-[#5C45FD] italic">if you needed them.</span>
        </motion.h2>
      </div>

      <div className="group relative flex w-fit overflow-hidden [--duration:35s] [--gap:1.5rem]">
        {[0, 1].map((groupIdx) => (
          <div
            key={groupIdx}
            aria-hidden={groupIdx === 1}
            className="flex shrink-0 items-center [gap:var(--gap)] px-6 animate-marquee group-hover:[animation-play-state:paused]"
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-40 sm:h-48 lg:h-56 rounded-2xl overflow-hidden border border-white/[0.08] shadow-lg shadow-black/35"
              >
                <Image
                  src={r.src}
                  alt="Client review"
                  width={r.width}
                  height={r.height}
                  className="h-full w-auto object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0E] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0E] to-transparent z-10" />
    </section>
  );
}
