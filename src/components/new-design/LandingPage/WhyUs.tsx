'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    num: "8 yrs",
    label: "Strategy first. Always.",
    desc: "8 years. 200+ projects. Every decision backed by data and psychology — not aesthetic preference."
  },
  {
    num: "200+",
    label: "Senior team. No handoffs.",
    desc: "Ali Raza and a senior team personally run your strategy, design, and QA. Your project never gets passed down."
  },
  {
    num: "2–4 wks",
    label: "Fast. Transparent. No surprises.",
    desc: "Updates every 2–3 days. Most projects live in 2–4 weeks. You always know where things stand."
  }
];

export default function WhyUs() {
  return (
    <section className="relative bg-white pt-20 pb-10 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 text-[#5C45FD] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">WHY US</div>
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08
              }
            }
          }}
          className="tracking-tighter text-[#0A0A0E] mb-16 lg:mb-24 font-normal" 
          style={{ 
            fontFamily: 'Arial, sans-serif', 
            fontSize: 'clamp(28px, 5vw, 46px)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}
        >
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              You&apos;ve seen agencies.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block text-black/30"
              variants={{
                hidden: { y: "100%" },
                visible: {
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              You haven&apos;t seen this.
            </motion.span>
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col gap-3 md:gap-6"
            >
              <div className="text-5xl md:text-7xl font-black text-[#5C45FD] tracking-tighter" style={{ fontFamily: 'Arial, sans-serif' }}>
                {s.num}
              </div>
              <h3 className="text-xl md:text-3xl text-[#0A0A0E] tracking-tight" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal' }}>
                {s.label}
              </h3>
              <p className="text-base md:text-xl font-normal leading-relaxed text-[#6b7280]">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
