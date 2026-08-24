"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// NOTE: built from the written spec in the port request, not from
// reference/casestudy-card.html - that file was never added to the
// repo. If it shows up later, re-check this against it.

interface CaseMetric {
  value: string;
  label: string;
  // "From X to Y" or a qualifier like "Launch period" / "First 60
  // days" - never fabricated, only what the case study data already
  // establishes elsewhere.
  context: string;
}

interface CaseStudyCard {
  brand: string;
  // The key metric inside the heading is wrapped in its own span
  // (highlighted in light purple) rather than derived by regex, so
  // each card controls exactly which words get the emphasis.
  heading: React.ReactNode;
  desc: string;
  results: [CaseMetric, CaseMetric];
  href: string;
  image?: string;
}

const HEADING_HIGHLIGHT = "text-[#A89BFF]";

const cases: CaseStudyCard[] = [
  {
    brand: "Reality Cheque",
    heading: (
      <>
        <span className={HEADING_HIGHLIGHT}>51.12%</span> more conversions for Pakistan&apos;s biggest coaching
        platform
      </>
    ),
    desc: "Reality Cheque had the audience but a site that wasn't turning attention into signups. We rebuilt it around conversion and brand authority.",
    results: [
      { value: "51.12%", label: "Conversion lift", context: "Launch period" },
      { value: "407", label: "New signups", context: "First 24 hours" },
    ],
    href: "/landing-page/case-studies/case-study-reality-cheque",
    image: "/assets/case-studies/Reality-cheque-case-study.png",
  },
  {
    brand: "Bamper",
    heading: (
      <>
        <span className={HEADING_HIGHLIGHT}>4.2%</span> conversion rate for a brand-new e-commerce store
      </>
    ),
    desc: "A new bamboo-goods brand that needed to sell fast. We built the store around conversion and brand trust from day one.",
    results: [
      { value: "4.2%", label: "Conversion rate", context: "From 0% to 4.2%" },
      { value: "60 Days", label: "To sell out", context: "From launch" },
    ],
    href: "/landing-page/case-studies/case-study-bamper",
    image: "/assets/case-studies/Bamper-case-study.png",
  },
  {
    brand: "Smarterform",
    heading: (
      <>
        Funded in <span className={HEADING_HIGHLIGHT}>2 weeks</span>: a secure form platform built for law firms
      </>
    ),
    desc: "A drag-and-drop, multi-step form builder for law firms and compliance teams handling sensitive data. An MVP fast enough to raise on.",
    results: [
      { value: "2 Weeks", label: "To secure funding", context: "From kickoff" },
      { value: "30 Days", label: "To MVP", context: "From kickoff" },
    ],
    href: "/landing-page/case-studies/case-study-smarterform",
    image: "/assets/case-studies/Smarterform-case-study.png",
  },
  {
    brand: "Reality Cheque",
    heading: (
      <>
        <span className={HEADING_HIGHLIGHT}>26X ROAS</span> from a lead-gen funnel for Pakistan&apos;s biggest
        coaching platform
      </>
    ),
    desc: "Same brand, different goal: book high-quality leads for their service business with a dedicated funnel.",
    results: [
      { value: "26X", label: "ROAS", context: "From $1,000 ad spend" },
      { value: "70+", label: "Qualified leads", context: "First 2 weeks" },
    ],
    href: "/landing-page/case-studies/case-study-reality-cheque-funnel",
  },
];

// Parses a formatted metric ("51.12%", "60 Days", "26X") into the
// pieces needed to animate it: a numeric value to tween, plus the
// suffix and decimal precision to reconstruct the same format on every
// frame. Decimal values count with the same number of decimal places,
// integers count as whole numbers, matching spec.
function parseMetric(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { number: 0, suffix: value, decimals: 0 };
  const [, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { number: parseFloat(numStr), suffix, decimals };
}

// Counts up independently the moment THIS metric (not the card, not
// the section) crosses 35% into the viewport, over 800ms. Under
// reduced motion it just shows the final value.
function MetricValue({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const target = parseMetric(value);
  const [display, setDisplay] = useState(reduceMotion ? value : `0${target.suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, target.number, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${v.toFixed(target.decimals)}${target.suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={ref}
      className="text-2xl font-bold text-[#A89BFF] lg:text-3xl"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {display}
    </div>
  );
}

function CaseMetrics({ results }: { results: [CaseMetric, CaseMetric] }) {
  return (
    <div className="mb-10 flex max-w-md flex-col items-start gap-5 border-t border-white/10 pt-6 md:flex-row md:gap-8">
      {results.map((r, ri) => (
        <div
          key={ri}
          className={
            ri > 0
              ? "border-t border-white/10 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0"
              : ""
          }
        >
          <MetricValue value={r.value} />
          <div
            className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/40"
            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
          >
            {r.label}
          </div>
          <div className="mt-0.5 text-[11px] text-white/30">{r.context}</div>
        </div>
      ))}
    </div>
  );
}

// Kept exactly as it was before this port (per explicit request): a
// plain full-bleed screenshot, or the original decorative placeholder
// when a case study has no image yet. No laptop frame.
function CaseMockup({ image, brand }: { image?: string; brand: string }) {
  return (
    <div className="h-full w-full min-h-[300px] flex items-center justify-center relative overflow-hidden bg-white/[0.02]">
      {image ? (
        <Image src={image} alt={brand} fill className="object-cover" />
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
  );
}

function CaseCardBody({ c }: { c: CaseStudyCard }) {
  return (
    <div className="p-10 lg:p-16">
      <span className="mb-5 inline-block rounded-full bg-[#5C45FD] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
        {c.brand}
      </span>
      <div
        className="mb-6 text-4xl font-bold text-white lg:text-5xl"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {c.heading}
      </div>
      <p className="mb-8 max-w-md text-lg font-light leading-relaxed text-white/60">{c.desc}</p>
      <CaseMetrics results={c.results} />
      <span className="inline-flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#5C45FD] transition-all duration-300 group-hover:gap-4">
        See how we did it <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  );
}

function CaseCard({
  c,
  i,
  progress,
  total,
}: {
  c: CaseStudyCard;
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const start = i / total;
  const end = 1;
  const scale = useTransform(progress, [start, end], [1, 1 - (total - 1 - i) * 0.05]);

  const isLast = i === total - 1;
  const nextCardArrival = (i + 1) / total;
  const fadeStart = Math.min(0.9, nextCardArrival + (1 / total) * 0.4);
  const fadeEnd = Math.min(1, fadeStart + 0.1);
  const opacity = useTransform(
    progress,
    isLast ? [0, 1] : [start, fadeStart, fadeEnd],
    isLast ? [1, 1] : [1, 1, 0],
  );

  const stickyTop = 100 + i * 24;

  return (
    <div style={{ top: `${stickyTop}px` }} className="sticky mb-[15vh] flex w-full items-center justify-center">
      <motion.div style={{ scale, opacity, zIndex: i }} className="w-full origin-top">
        <Link
          href={c.href}
          data-cursor="card"
          className="group relative grid grid-cols-1 overflow-hidden rounded-[22px] border border-[rgba(245,245,245,0.09)] bg-[#14141A] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(168,155,255,0.38)] hover:shadow-[0_30px_60px_-25px_rgba(92,69,253,0.35)] lg:grid-cols-2"
        >
          <div className={i % 2 === 1 ? "lg:order-2" : ""}>
            <CaseCardBody c={c} />
          </div>
          <div className={i % 2 === 1 ? "lg:order-1" : ""}>
            <CaseMockup brand={c.brand} image={c.image} />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

function MobileCaseCard({ c, i }: { c: CaseStudyCard; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <Link
        href={c.href}
        data-cursor="card"
        className="group relative flex flex-col overflow-hidden rounded-[22px] border border-[rgba(245,245,245,0.09)] bg-[#14141A] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(168,155,255,0.38)] hover:shadow-[0_30px_60px_-25px_rgba(92,69,253,0.35)]"
      >
        <CaseCardBody c={c} />
        <CaseMockup brand={c.brand} image={c.image} />
      </Link>
    </motion.div>
  );
}

export default function Results() {
  // Scoped to just the sticky-card stack, not the whole section (which
  // also includes the tall header and footer CTA) - otherwise most of
  // the 0-1 scroll progress gets spent scrolling past those, and the
  // stack transitions end up compressed into a sliver of the actual
  // scroll range instead of spanning the time the cards are in view.
  const stackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="results"
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
              <span
                className="block overflow-hidden pb-1"
                data-cursor="text"
                data-cursor-on-dark=""
                data-text="Numbers don't care"
              >
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
              <span
                className="block overflow-hidden pb-1"
                data-cursor="text"
                data-cursor-on-dark=""
                data-text="about our pitch."
              >
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

          <Link href="landing-page/case-studies" data-cursor="cta">
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
        <div ref={stackRef} className="hidden lg:block relative">
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
          className="mt-24 lg:mt-64 text-center"
        >
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed md:leading-normal">
            Want results like these? <br className="md:hidden" />
            <Link
              href="/landing-page/qualify"
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
