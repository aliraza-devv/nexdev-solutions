"use client";

// ============================================================================
// Case study page — all interactive UI lives here as a Client Component so
// the parent page.tsx can stay a Server Component and own SEO metadata.
//
// Styling deliberately mirrors the main /landing-page components (Arial
// headings via inline style, the site's pill-tag/button classes, the shared
// #5C45FD accent) rather than a standalone design system, so this page reads
// as part of the same site. Testimonials and FAQ are the real site-wide
// components, not case-study-specific reimplementations.
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { CASE_STUDY, type ApproachModule } from "./data";
import Navbar from "../landing-page/_components/Navbar";
import SiteFooter from "../landing-page/_components/FinalCTA";
import Testimonials from "../landing-page/_components/Testimonials";
import FAQ from "../landing-page/_components/FAQ";

const ACCENT = "#5C45FD";

// ----------------------------------------------------------------------------
// Reveal wrapper — fade/slide-up on scroll, shared by every section so the
// motion feels consistent instead of each section rolling its own timing.
// Reduced-motion users get the final state immediately, no animation at all.
// ----------------------------------------------------------------------------
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Matches the pill-tag pattern used on every /landing-page section
// (Results, WhyUs, Deliverables, Solution, etc.) instead of a plain label.
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 text-[#5C45FD] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
      {children}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Labeled placeholder box — stands in for every real image. Keeps the exact
// aspect ratio the final asset will use so the layout never shifts once real
// photography/screens are dropped in; the label doubles as the accessible
// name until then.
// ----------------------------------------------------------------------------
function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
  className = "",
}: {
  label: string;
  aspect?: string;
  rounded?: string;
  className?: string;
}) {
  const clean = label.replace(/^PLACEHOLDER:\s*/, "");
  return (
    <div
      role="img"
      aria-label={`Placeholder image — ${clean}`}
      className={`relative w-full ${aspect} ${rounded} border-2 border-dashed border-black/10 bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="text-center px-6">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.04] text-black/25">
          <ImageIcon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <p className="text-xs font-medium text-zinc-400 leading-relaxed max-w-[220px] mx-auto">
          {clean}
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Parses a formatted metric string ("$52", "1.9%", "2.6×") into the pieces
// needed to animate it: a numeric value to tween, plus the prefix/suffix and
// decimal precision to reconstruct the same format on every animation frame.
// ----------------------------------------------------------------------------
function parseMetric(value: string) {
  const match = value.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, number: parseFloat(numStr), suffix, decimals };
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof CASE_STUDY.metrics)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const target = parseMetric(metric.to);
  const [display, setDisplay] = useState(reduceMotion ? metric.to : metric.from);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplay(metric.to);
      return;
    }
    const controls = animate(0, target.number, {
      duration: 1.4,
      delay: index * 0.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplay(`${target.prefix}${v.toFixed(target.decimals)}${target.suffix}`);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)]"
    >
      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400">
        {metric.label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-medium text-zinc-400 line-through decoration-zinc-300">
          {metric.from}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-zinc-300" />
        <span
          className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0E]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {display}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[#5C45FD]/10 px-2.5 py-1 text-xs font-bold text-[#5C45FD]">
          {metric.change}
        </span>
        <span className="text-xs text-zinc-400">{metric.window}</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative bg-white px-6 pb-16 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-6 flex flex-wrap items-center gap-3">
          <ImagePlaceholder
            label={CASE_STUDY.clientLogo}
            aspect="aspect-[3/1]"
            rounded="rounded-lg"
            className="w-[100px] flex-shrink-0"
          />
          <span className="min-w-0 text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {CASE_STUDY.client} — Case Study
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="max-w-4xl text-[32px] leading-[1.1] tracking-tight text-[#0A0A0E] md:text-[48px] lg:text-[56px]"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {CASE_STUDY.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#final-cta"
            className="inline-flex items-center gap-2 rounded-full bg-[#5C45FD] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25 transition-all hover:bg-[#4a36e0] hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C45FD]"
          >
            {CASE_STUDY.cta.primary}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={CASE_STUDY.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-3.5 text-sm font-semibold text-[#0A0A0E] transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C45FD]"
          >
            View live site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <ImagePlaceholder
            label={CASE_STUDY.heroImage}
            aspect="aspect-[16/10]"
            rounded="rounded-[28px]"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CASE_STUDY.metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaBar() {
  const items = [
    CASE_STUDY.meta.year,
    CASE_STUDY.meta.timeline,
    CASE_STUDY.meta.industry,
    CASE_STUDY.meta.services.join(", "),
  ];
  return (
    <section className="border-y border-black/[0.06] bg-zinc-50/60 px-6 py-6 md:px-10">
      <Reveal className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-2 text-sm text-zinc-500">
        {items.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && <span className="text-zinc-300">·</span>}
            <span className={i === items.length - 1 ? "font-medium text-zinc-600" : ""}>
              {item}
            </span>
          </React.Fragment>
        ))}
      </Reveal>
    </section>
  );
}

function Challenge() {
  return (
    <section id="challenge" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <Eyebrow>The Challenge</Eyebrow>
          <p
            className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {CASE_STUDY.challenge.intro}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {CASE_STUDY.challenge.problems.map((problem, i) => (
            <Reveal key={problem} delay={i * 0.08}>
              <div className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-5">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#5C45FD]" />
                <p className="text-[15px] leading-relaxed text-zinc-600">{problem}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachRow({ item, index }: { item: ApproachModule; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reversed ? "lg:order-2" : ""}>
        <ImagePlaceholder label={item.image} aspect="aspect-[4/3]" />
      </div>
      <div className={reversed ? "lg:order-1" : ""}>
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="mt-3 text-2xl text-[#0A0A0E] md:text-[28px]"
          style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
        >
          {item.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{item.body}</p>
        <span className="mt-5 inline-flex items-center rounded-full bg-[#5C45FD]/10 px-3.5 py-1.5 text-xs font-bold text-[#5C45FD]">
          {item.microResult}
        </span>
      </div>
    </Reveal>
  );
}

function Approach() {
  return (
    <section id="approach" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <Eyebrow>The Approach</Eyebrow>
          <p
            className="text-2xl text-[#0A0A0E] md:text-3xl"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            Four fixes, each proven on its own before it added up to the whole.
          </p>
        </Reveal>

        <div className="flex flex-col gap-20 md:gap-28">
          {CASE_STUDY.approach.map((item, i) => (
            <ApproachRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MidCTA() {
  return (
    <section className="bg-white px-6 pb-20 md:px-10 md:pb-28">
      <Reveal className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 rounded-2xl border border-[#5C45FD]/15 bg-[#5C45FD]/[0.04] px-8 py-8 sm:flex-row">
        <p className="text-center text-lg font-medium text-[#0A0A0E] sm:text-left">
          Curious what a CRO pass would find on your site?
        </p>
        <a
          href="#final-cta"
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#5C45FD] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/20 transition-all hover:bg-[#4a36e0] hover:scale-[1.02]"
        >
          {CASE_STUDY.cta.secondary}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}

function Results() {
  return (
    <section id="results" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <Eyebrow>Where Things Stand Now</Eyebrow>
          <p
            className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {CASE_STUDY.results.intro}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CASE_STUDY.results.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="rounded-2xl border border-black/[0.06] bg-zinc-50/60 p-6 text-center">
                <div
                  className="text-3xl font-bold text-[#0A0A0E]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-[15px] leading-relaxed text-zinc-500">
            {CASE_STUDY.results.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default function CaseStudyClient() {
  return (
    // --accent is the single line to change for a full rebrand — every
    // color reference in this file reads from this CSS variable.
    <div style={{ "--accent": ACCENT } as React.CSSProperties} className="bg-white">
      <Navbar />
      <main className="relative min-h-screen">
        <Hero />
        <MetaBar />
        <Challenge />
        <Approach />
        {/* Real site testimonials, not a case-study-specific reimplementation */}
        <Testimonials />
        <MidCTA />
        <Results />
        {/* Real site FAQ in place of a duplicate closing CTA band */}
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
