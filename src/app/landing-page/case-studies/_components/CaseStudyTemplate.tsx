"use client";

// ============================================================================
// Shared case study page template — every case-study-[brand] route renders
// this same component with its own CaseStudyData. Edit a brand's data.ts to
// change that page's content; edit this file to change the structure/design
// of every case study page at once.
//
// Styling deliberately mirrors the main /landing-page components (Arial
// headings via inline style, the site's pill-tag/button classes, the shared
// #5C45FD accent) rather than a standalone design system, so these pages
// read as part of the same site. Navbar, FinalCTA (which includes the
// footer), Testimonials and FAQ are the real site-wide components, not
// case-study-specific reimplementations.
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  MousePointerClick,
  BarChart3,
} from "lucide-react";
import type { CaseStudyData, ApproachModule, ChallengeCard } from "./types";
import Navbar from "../../_components/Navbar";
import SiteFooter from "../../_components/FinalCTA";
import Testimonials from "../../_components/Testimonials";
import FAQ from "../../_components/FAQ";

const ACCENT = "#5C45FD";
const METRIC_ICONS = [TrendingUp, MousePointerClick, BarChart3];

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
// Blank placeholder box — stands in for every real image/screenshot. Keeps
// the exact aspect ratio the final asset will use so the layout never shifts
// once real photography/screens are dropped in; the label is aria-only so
// the block itself reads clean, matching the reference layout.
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
      className={`w-full ${aspect} ${rounded} bg-zinc-100 ${className}`}
    />
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
  metric: CaseStudyData["metrics"][number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const target = parseMetric(metric.to);
  const [display, setDisplay] = useState(reduceMotion ? metric.to : metric.from);
  const Icon = METRIC_ICONS[index % METRIC_ICONS.length];

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
      className="flex flex-col gap-5 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5C45FD]/10 text-[#5C45FD]">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
        <span className="rounded-full bg-[#5C45FD]/10 px-2.5 py-1 text-xs font-bold text-[#5C45FD]">
          {metric.change}
        </span>
      </div>
      <div>
        <div
          className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0E]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {display}
        </div>
        <div className="mt-1 text-sm text-zinc-500">{metric.label}</div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
        {label}
      </div>
      <div className="mt-1.5 text-sm font-medium text-zinc-700">{value}</div>
    </div>
  );
}

function Hero({ data }: { data: CaseStudyData }) {
  const domain = data.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <section className="relative bg-white px-6 pb-16 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal className="mb-6 flex items-center justify-center gap-2 text-sm">
          <span className="font-semibold text-zinc-700">{data.client}</span>
          <span className="text-zinc-300">·</span>
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-[#5C45FD]"
          >
            {domain}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="mx-auto max-w-3xl text-[32px] leading-[1.1] tracking-tight text-[#0A0A0E] md:text-[48px] lg:text-[56px]"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {data.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#final-cta"
            className="inline-flex items-center gap-2 rounded-full bg-[#5C45FD] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25 transition-all hover:bg-[#4a36e0] hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C45FD]"
          >
            {data.cta.primary}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={data.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-3.5 text-sm font-semibold text-[#0A0A0E] transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C45FD]"
          >
            View live site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal
          delay={0.28}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-y border-black/[0.06] py-6"
        >
          <MetaItem label="Industry" value={data.meta.industry} />
          <MetaItem label="Services" value={data.meta.services.join(", ")} />
          <MetaItem label="Timeline" value={`${data.meta.timeline} · ${data.meta.year}`} />
        </Reveal>
      </div>

      <Reveal delay={0.3} className="mx-auto mt-12 grid max-w-[1400px] grid-cols-1 gap-4 sm:grid-cols-2">
        {data.heroImages.map((img, i) => (
          <ImagePlaceholder key={i} label={img} aspect="aspect-[4/3]" rounded="rounded-[24px]" />
        ))}
      </Reveal>
    </section>
  );
}

const SEVERITY_STYLES: Record<ChallengeCard["severity"], string> = {
  critical: "border-red-100 bg-red-50 text-red-600",
  warning: "border-amber-100 bg-amber-50 text-amber-600",
  info: "border-[#5C45FD]/15 bg-[#5C45FD]/8 text-[#5C45FD]",
};

function Challenge({ data }: { data: CaseStudyData }) {
  return (
    <section id="challenge" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="max-w-[900px]">
          <Eyebrow>The Challenge</Eyebrow>
          <p
            className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {data.challenge.intro}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.challenge.problems.map((problem, i) => (
            <Reveal key={problem.title} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-6">
                <span
                  className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${SEVERITY_STYLES[problem.severity]}`}
                >
                  {problem.tag}
                </span>
                <h4 className="text-[15px] font-bold text-[#0A0A0E]">{problem.title}</h4>
                <p className="text-sm leading-relaxed text-zinc-500">{problem.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachRow({ item, index }: { item: ApproachModule; index: number }) {
  return (
    <Reveal>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full bg-[#5C45FD]/10 px-3.5 py-1.5 text-xs font-bold text-[#5C45FD]">
          {item.microResult}
        </span>
      </div>
      <h3
        className="mt-3 text-2xl text-[#0A0A0E] md:text-[28px]"
        style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
      >
        {item.title}
      </h3>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600">{item.body}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {item.images.map((img, i) => (
          <ImagePlaceholder key={i} label={img} aspect="aspect-[4/3]" />
        ))}
      </div>
    </Reveal>
  );
}

function Approach({ data }: { data: CaseStudyData }) {
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

        <div className="flex flex-col gap-16 md:gap-24">
          {data.approach.map((item, i) => (
            <ApproachRow key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MidCTA({ data }: { data: CaseStudyData }) {
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
          {data.cta.secondary}
          <ArrowRight className="h-4 w-4" />
        </a>
      </Reveal>
    </section>
  );
}

function ResultsPrimary({ data }: { data: CaseStudyData }) {
  return (
    <section id="results" className="bg-white px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>The Result</Eyebrow>
            <p
              className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
              style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
            >
              Impact by the Numbers
            </p>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-sm leading-relaxed text-zinc-500">{data.results.intro}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-6">
          <ImagePlaceholder
            label={data.results.chartImage}
            aspect="aspect-[16/7]"
            rounded="rounded-[24px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

function ResultsSecondary({ data }: { data: CaseStudyData }) {
  return (
    <section className="bg-zinc-50/60 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal>
          <Eyebrow>Measurable Impact</Eyebrow>
          <p
            className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {data.results.note}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-black/[0.06] pt-8 sm:grid-cols-3 sm:divide-x sm:divide-black/[0.06]">
          {data.results.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div
                className="text-2xl font-bold text-[#0A0A0E]"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    // --accent is the single line to change for a full rebrand — every
    // color reference in this file reads from this CSS variable.
    <div style={{ "--accent": ACCENT } as React.CSSProperties} className="bg-white">
      <Navbar />
      <main className="relative min-h-screen">
        <Hero data={data} />
        <Challenge data={data} />
        <Approach data={data} />
        {/* Real site testimonials, not a case-study-specific reimplementation */}
        <Testimonials />
        <MidCTA data={data} />
        <ResultsPrimary data={data} />
        <ResultsSecondary data={data} />
        {/* Real site FAQ in place of a duplicate closing CTA band */}
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
