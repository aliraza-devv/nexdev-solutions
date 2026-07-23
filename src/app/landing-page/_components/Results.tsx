'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const cases = [
  {
    stat: "$50k/mo",
    brand: "Examanagement",
    context: "from zero inbound leads",
    desc: "Rebuilt as a conversion funnel. 5 qualified leads in 2 weeks. $50k/month recurring from their website alone.",
  },
  {
    stat: "48% CVR",
    brand: "Seller Goals",
    context: "was under 3%",
    desc: "Full SYNC rebuild. 6 high-ticket clients in 3 weeks. Now closing 7–10 clients/month on autopilot.",
  },
  {
    stat: "100% funded",
    brand: "Smarterform",
    context: "in 30 days",
    desc: "Investor-facing site built on Yield Narrative + Neuro Persuasion. Full investor target hit within the first month.",
  }
];

function CaseCard({ c, i, progress, total }: { c: any, i: number, progress: any, total: number }) {
  // Define the range for this specific card
  const start = i / total;
  const end = 1;

  // Scaling happens throughout the scroll
  const scale = useTransform(progress, [start, end], [1, 1 - (total - 1 - i) * 0.05]);

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
    isLast ? [1, 1] : [1, 1, 0.4]
  );

  const stickyTop = 100 + (i * 24);

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
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
        className="group relative grid grid-cols-1 lg:grid-cols-2 bg-[#14141A]/90 rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl origin-top transition-colors duration-500"
      >
        {/* Content Side */}
        <div className={i % 2 === 1 ? "lg:order-2 p-10 lg:p-16" : "p-10 lg:p-16"}>
          <div className="text-4xl lg:text-5xl font-bold text-[#5C45FD] mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
            {c.stat}
          </div>
          <div className="text-2xl font-bold text-white mb-2">{c.brand}</div>
          <div className="text-sm font-medium text-white/40 mb-8 italic">{c.context}</div>
          <p className="text-lg text-white/60 leading-relaxed font-light mb-10 max-w-md">
            {c.desc}
          </p>
          <Link href="#" className="inline-flex items-center gap-2 py-3 -ml-0.5 px-0.5 text-xs font-bold text-[#5C45FD] uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
            READ THE STORY <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Image / Graphic Side */}
        <div className={i % 2 === 1 ? "lg:order-1 bg-white/[0.02]" : "bg-white/[0.02]"}>
          <div className="h-full w-full min-h-[300px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/5 to-transparent" />
            <div className="w-2/3 aspect-video bg-[#222235] border border-white/5 rounded-2xl relative">
              <div className="absolute top-4 left-4 h-2 w-12 bg-white/5 rounded-full" />
              <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full border border-white/10" />
            </div>
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
        <div className="text-4xl font-bold text-[#5C45FD] mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
          {c.stat}
        </div>
        <div className="text-2xl font-bold text-white mb-1">{c.brand}</div>
        <div className="text-xs font-medium text-white/40 mb-6 italic">{c.context}</div>
        <p className="text-base text-white/60 leading-relaxed font-light mb-8">
          {c.desc}
        </p>
        <Link href="#" className="inline-flex items-center gap-2 py-3 -ml-0.5 px-0.5 text-xs font-bold text-[#5C45FD] uppercase tracking-[0.2em] group-hover:gap-4 transition-all duration-300">
          READ THE STORY <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Image / Graphic Side (Bleeds full width and bottom of the card) */}
      <div className="mt-8 bg-white/[0.02] -mx-8 -mb-8 overflow-hidden">
        <div className="h-[200px] w-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/5 to-transparent" />
          <div className="w-4/5 aspect-video bg-[#222235] border border-white/5 rounded-2xl relative">
            <div className="absolute top-3 left-3 h-1.5 w-10 bg-white/5 rounded-full" />
            <div className="absolute bottom-3 right-3 h-6 w-6 rounded-full border border-white/10" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Results() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section id="results" ref={container} className="relative bg-[#0A0A0E] py-20 lg:py-40 border-b border-white/[0.08]">
      <div className="bg-grain absolute inset-0 opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10">

        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">RESULTS</div>
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
              className="text-white leading-[1.1] font-normal tracking-tighter"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 'clamp(28px, 5vw, 46px)',
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
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  about our <span className="text-[#5C45FD] italic">pitch</span>.
                </motion.span>
              </span>
            </motion.h2>
          </div>

          <Link href="/case-studies">
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
            <Link href="#cta" className="text-[#5C45FD] underline underline-offset-8 decoration-white/20 hover:decoration-[#5C45FD] transition-all mt-2 md:mt-0 inline-block md:inline">
              Let&apos;s build yours.
            </Link>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
