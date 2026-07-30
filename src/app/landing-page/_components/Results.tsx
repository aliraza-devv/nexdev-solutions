"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const cases = [
  {
    stat: "Rebuilt a Coaching website",
    brand: "Reality Cheque",
    desc: "We rebuilt Pakistan's biggest coaching platform for conversions. Reality Cheque had the audience but a site that wasn't turning attention into signups. We rebuilt it around conversion and brand authority.",
    results: [
      { value: "51.12%", label: "Increase conversion rate" },
      { value: "407", label: "members in 24 hrs" },
    ],
    href: "/landing-page/case-studies/case-study-reality-cheque-coaching",
    image: "/assets/case-studies/Reality-cheque-case-study.png",
  },
  {
    stat: "Built a funnel for service business",
    brand: "Reality Cheque",
    desc: "We built a lead-gen funnel from scratch for their DFY service. Same brand, different goal: book high-quality leads for their service business. So we built a dedicated funnel from the ground up.",
    results: [
      { value: "70+", label: "leads in 2 weeks" },
      { value: "26X", label: "ROAS" },
    ],
    href: "/landing-page/case-studies/case-study-reality-cheque-funnel",
  },
  {
    stat: "Shopify store built for a brand",
    brand: "Bamper",
    desc: "We built a Shopify store from scratch for a bamboo-goods brand. A new e-commerce brand that needed to sell fast. We built the store around conversion and brand trust from day one.",
    results: [
      { value: "60 Days", label: "Sold-out inventory" },
      { value: "4.2%", label: "Conversion rate" },
    ],
    href: "/landing-page/case-studies/case-study-bamper",
    image: "/assets/case-studies/Bamper-case-study.png",
  },
];

function CaseCard({
  c,
  i,
  progress,
  total,
}: {
  c: any;
  i: number;
  progress: any;
  total: number;
}) {
  // Define the range for this specific card
  const start = i / total;
  const end = 1;

  // Scaling happens throughout the scroll
  const scale = useTransform(
    progress,
    [start, end],
    [1, 1 - (total - 1 - i) * 0.05],
  );

  // Opacity logic:
  // Only start fading when the NEXT card arrives
  const isLast = i === total - 1;
  const nextCardArrival = (i + 1) / total;

  // We trigger the fade based on the next card's arrival
  // Ensure the range values are within [0, 1] and strictly increasing
  const fadeStart = Math.min(0.9, nextCardArrival + (1 / total) * 0.4);
  const fadeEnd = Math.min(1, fadeStart + 0.1);

  const opacity = useTransform(
    progress,
    isLast ? [0, 1] : [start, fadeStart, fadeEnd],
    isLast ? [1, 1] : [1, 1, 0.4],
  );

  const stickyTop = 100 + i * 24;

  return (
    <div
      style={{ top: `${stickyTop}px` }}
      className="sticky w-full flex items-center justify-center mb-[15vh]"
    >
      <motion.div
        style={{
          scale,
          opacity,
          zIndex: i,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
        className="group relative grid grid-cols-1 lg:grid-cols-2 bg-[#14141A]/90 rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl origin-top transition-colors duration-500"
      >
        {/* Content Side */}
        <div
          className={i % 2 === 1 ? "lg:order-2 p-10 lg:p-16" : "p-10 lg:p-16"}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#5C45FD] text-white text-xs font-bold uppercase tracking-wide mb-5">
            {c.brand}
          </span>
          <div
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {c.stat}
          </div>
          <p className="text-lg text-white/60 leading-relaxed font-light mb-8 max-w-md">
            {c.desc}
          </p>
          <div className="flex items-start gap-8 pt-6 mb-10 max-w-md border-t border-white/10">
            {c.results.map(
              (r: { value: string; label: string }, ri: number) => (
                <div
                  key={ri}
                  className={ri > 0 ? "pl-8 border-l border-white/10" : ""}
                >
                  <div
                    className="text-2xl lg:text-3xl font-bold text-[#5C45FD]"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {r.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mt-1">
                    {r.label}
                  </div>
                </div>
              ),
            )}
          </div>
          <Link
            href={c.href}
            className="inline-flex items-center gap-2 py-3 -ml-0.5 px-0.5 text-xs font-bold text-[#5C45FD] uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300"
          >
            READ THE STORY <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Image / Graphic Side */}
        <div
          className={
            i % 2 === 1 ? "lg:order-1 bg-white/[0.02]" : "bg-white/[0.02]"
          }
        >
          <div className="h-full w-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
            {c.image ? (
              <Image
                src={c.image}
                alt={c.brand}
                fill
                className="object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/5 to-transparent" />
                <div className="w-2/3 aspect-video bg-[#222235] border border-white/5 rounded-2xl relative">
                  <div className="absolute top-4 left-4 h-2 w-12 bg-white/5 rounded-full" />
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full border border-white/10" />
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileCaseCard({ c, i }: { c: any; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="group relative flex flex-col bg-[#14141A]/90 rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl transition-colors duration-500 p-8"
    >
      {/* Content Side */}
      <div className="flex flex-col">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#5C45FD] text-white text-[11px] font-bold uppercase tracking-wide mb-4 self-start">
          {c.brand}
        </span>
        <div
          className="text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {c.stat}
        </div>
        <p className="text-base text-white/60 leading-relaxed font-light mb-6">
          {c.desc}
        </p>
        <div className="flex items-start gap-6 pt-5 mb-8 border-t border-white/10">
          {c.results.map((r: { value: string; label: string }, ri: number) => (
            <div
              key={ri}
              className={ri > 0 ? "pl-6 border-l border-white/10" : ""}
            >
              <div
                className="text-xl font-bold text-[#5C45FD]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {r.value}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/40 font-semibold mt-1">
                {r.label}
              </div>
            </div>
          ))}
        </div>
        <Link
          href={c.href}
          className="inline-flex items-center gap-2 py-3 -ml-0.5 px-0.5 text-xs font-bold text-[#5C45FD] uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300"
        >
          READ THE STORY <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Image / Graphic Side (Bleeds full width and bottom of the card) */}
      <div className="mt-8 bg-white/[0.02] -mx-8 -mb-8 overflow-hidden">
        <div className="h-[200px] w-full flex items-center justify-center relative">
          {c.image ? (
            <Image src={c.image} alt={c.brand} fill className="object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/5 to-transparent" />
              <div className="w-4/5 aspect-video bg-[#222235] border border-white/5 rounded-2xl relative">
                <div className="absolute top-3 left-3 h-1.5 w-10 bg-white/5 rounded-full" />
                <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full border border-white/10" />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Results() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="results"
      ref={container}
      className="relative bg-[#0A0A0E] py-20 lg:py-40 border-b border-white/[0.08]"
    >
      <div className="bg-grain absolute inset-0 opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              RESULTS
            </div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
              }}
              className="text-white leading-[1.1] font-normal tracking-tighter"
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "clamp(28px, 5vw, 46px)",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  Numbers don&apos;t care
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  about our <span className="text-[#5C45FD] italic">pitch</span>
                  .
                </motion.span>
              </span>
            </motion.h2>
          </div>

          <Link href="landing-page/case-studies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 rounded-full bg-[#5C45FD] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/20 transition-all hover:bg-[#4a36e0]"
            >
              View all Case Studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>

        {/* Stacking Case Study Cards (Desktop/Tablet Only) */}
        <div className="hidden lg:block relative">
          {cases.map((c, i) => (
            <CaseCard
              key={i}
              c={c}
              i={i}
              progress={scrollYProgress}
              total={cases.length}
            />
          ))}
        </div>

        {/* Scrollable Case Study Cards (Mobile Only) */}
        <div className="block lg:hidden space-y-8">
          {cases.map((c, i) => (
            <MobileCaseCard key={i} c={c} i={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-40 text-center"
        >
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed md:leading-normal">
            Want results like these? <br className="md:hidden" />
            <Link
              href="#cta"
              className="text-[#5C45FD] underline underline-offset-8 decoration-white/20 hover:decoration-[#5C45FD] transition-all mt-2 md:mt-0 inline-block md:inline"
            >
              Let&apos;s build yours.
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
