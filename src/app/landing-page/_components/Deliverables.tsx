'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const deliverables = [
  "Deep-dive strategy session",
  "Conversion copywriting, every page",
  "Custom UI/UX, psychology-backed",
  "High-performance development",
  "SEO foundation + site speed",
  "CTA engineering + friction mapping",
  "Unlimited revisions",
  "Full ownership — yours, forever"
];

const bonuses = [
  "Website audit before we start",
  "Conversion tracking setup",
  "60-day post-launch check-in"
];

export default function Deliverables() {
  return (
    <section id="deliverables" className="relative bg-[#f9f9f9] py-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 text-[#5C45FD] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">DELIVERABLES</div>
        {/* Mobile Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="tracking-tighter text-[#0A0A0E] mb-16 max-w-2xl font-normal block md:hidden"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: 'clamp(28px, 5vw, 46px)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em'
          }}
        >
          Everything your website needs to actually work — nothing it doesn&apos;t.
        </motion.h2>

        {/* Desktop Heading */}
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
          className="tracking-tighter text-[#0A0A0E] mb-16 max-w-2xl font-normal hidden md:block"
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
              Everything your website needs
            </motion.span>
          </span>
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
              to actually work — nothing it doesn&apos;t.
            </motion.span>
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 lg:pl-10">
            {deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-10%", once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#5C45FD] text-white flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 stroke-[3px]" />
                </div>
                <span className="text-lg font-normal text-[#0A0A0E] transition-colors group-hover:text-[#5C45FD] leading-tight">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-10%", once: true }}
            className="relative overflow-hidden rounded-[28px] border border-[#5C45FD]/20 bg-[#5C45FD]/5 p-8 lg:p-11"
          >
            <div className="flex h-fit flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold tracking-widest text-[#5C45FD] uppercase">Free with every project</div>
                <div className="h-px flex-1 bg-[#5C45FD]/20 mx-6" />
              </div>

              <div className="space-y-4">
                {bonuses.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#5C45FD]" />
                    <span className="text-lg font-semibold text-[#0A0A0E]">{b}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-2">
                <p className="text-[#6b7280] text-[12px] leading-relaxed max-w-[260px]">
                  Ensuring your new channel doesn&apos;t just launch, but sustains its momentum.
                </p>
              </div>

              {/* CTA Button */}
              <div className="mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-[#5C45FD] text-white py-3.5 px-8 rounded-full font-bold text-[13px] hover:bg-[#4a36e0] transition-colors shadow-lg shadow-[#5C45FD]/25"
                >
                  Book Your Free Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
