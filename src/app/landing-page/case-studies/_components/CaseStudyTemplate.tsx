"use client";

// ============================================================================
// Shared case study page template. Every case-study-[brand] route renders
// this same component with its own CaseStudyData. Edit a brand's data.ts to
// change that page's content; edit this file to change the structure/design
// of every case study page at once.
//
// Styling deliberately mirrors the main /landing-page components (Arial
// headings via inline style, the site's pill-tag/button classes, the shared
// #5C45FD accent) rather than a standalone design system, so these pages
// read as part of the same site. Navbar and FinalCTA (which includes the
// footer) are the real site-wide components, not case-study-specific
// reimplementations.
//
// Single-CTA rule: every button on this page points at the /qualify page
// via the same href, and the Navbar's CTA is overridden (via its
// ctaLabel/ctaHref props) to match, so there is exactly one conversion
// action repeated in different words, not several destinations.
//
// Several fields are optional (heroEyebrow, approachIntro/PlusLine,
// turningPoint, results.note, finalCta, microResult per fix) precisely so
// earlier case studies that don't set them keep rendering byte-identical to
// before - every addition here is additive, not a redesign.
// ============================================================================

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  ArrowRight,
  TrendingUp,
  MousePointerClick,
  BarChart3,
} from "lucide-react";
import type {
  CaseStudyData,
  ApproachModule,
  ChallengeCard,
  MetricItem,
} from "./types";
import Navbar from "../../_components/Navbar";
import SiteFooter from "../../_components/FinalCTA";

const ACCENT = "#5C45FD";
const METRIC_ICONS = [TrendingUp, MousePointerClick, BarChart3];
const CTA_HREF = "/landing-page/qualify";

// A results tier usually has 3 stats, but not always (e.g. a two-stat MVP
// phase) - size the grid to what's actually there instead of leaving an
// empty third column.
function statsGridCols(count: number) {
  if (count <= 1) return "sm:grid-cols-1";
  if (count === 2) return "sm:grid-cols-2";
  return "sm:grid-cols-3";
}

// ----------------------------------------------------------------------------
// Reveal wrapper: fade/slide-up on scroll, shared by every section so the
// motion feels consistent instead of each section rolling its own timing.
// Reduced-motion users get the final state immediately, no animation at all.
// ----------------------------------------------------------------------------
function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
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
// Renders a real photo/screenshot once a brand's data.ts points at one;
// until then, falls back to a blank box that keeps the exact aspect ratio
// the final asset will use so the layout never shifts once it's dropped in.
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const isReal = !label.startsWith("PLACEHOLDER:");

  useEffect(() => {
    if (!isReal) return;
    const el = wrapRef.current;
    const img = el?.querySelector("img");
    if (!el || !img) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        el,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power3.out", immediateRender: true }
      ).fromTo(
        img,
        { y: "6%", scale: 1.08 },
        { y: "0%", scale: 1, duration: 1.1, ease: "power3.out", immediateRender: true },
        0
      );
    }, el);
    return () => ctx.revert();
  }, [isReal, label]);

  if (isReal) {
    // object-contain (not object-cover) so a real screenshot always shows
    // in full inside the box, regardless of its native aspect ratio -
    // cover would crop it to fill the box exactly, contain never crops,
    // it just letterboxes on the shorter axis against the bg color.
    // The GSAP effect above grows the box open (clip-path) while the image
    // itself settles in from a slight zoom, once it scrolls into view.
    return (
      <div
        ref={wrapRef}
        className={`relative w-full ${aspect} ${rounded} overflow-hidden bg-zinc-100 ${className}`}
      >
        <Image src={label} alt="" fill className="object-contain" />
      </div>
    );
  }
  const clean = label.replace(/^PLACEHOLDER:\s*/, "");
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${clean}`}
      className={`w-full ${aspect} ${rounded} bg-zinc-100 ${className}`}
    />
  );
}

// ----------------------------------------------------------------------------
// Below tablet width (lg), the second image in a pair is not mounted at all -
// not just visually hidden - so it's never requested on phones/tablets once
// these placeholders become real next/image assets. Starts false on both
// server and client so hydration matches; the real check runs after mount.
// ----------------------------------------------------------------------------
function useShowSecondImage() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return show;
}

// Index 0 is always the more meaningful ("after"/result) image and is the
// only one shown below desktop width.
function ImagePair({
  images,
  aspect = "aspect-[4/3]",
  rounded = "rounded-2xl",
}: {
  images: [string, string];
  aspect?: string;
  rounded?: string;
}) {
  const showSecond = useShowSecondImage();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ImagePlaceholder label={images[0]} aspect={aspect} rounded={rounded} />
      {showSecond && (
        <ImagePlaceholder label={images[1]} aspect={aspect} rounded={rounded} />
      )}
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

function MetricCard({ metric, index }: { metric: MetricItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const target = "to" in metric ? parseMetric(metric.to) : null;
  const [display, setDisplay] = useState(() => {
    if (!("to" in metric)) return "";
    return reduceMotion ? metric.to : metric.from;
  });
  const Icon = METRIC_ICONS[index % METRIC_ICONS.length];

  useEffect(() => {
    if (!inView || !target || !("to" in metric)) return;
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
        {"change" in metric && metric.change && (
          <span className="rounded-full bg-[#5C45FD]/10 px-2.5 py-1 text-xs font-bold text-[#5C45FD]">
            {metric.change}
          </span>
        )}
      </div>
      {!("to" in metric) ? (
        <div
          className="text-lg font-bold leading-snug text-[#0A0A0E]"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {metric.label}
        </div>
      ) : (
        <div>
          <div
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#0A0A0E]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {display}
          </div>
          <div className="mt-1 text-sm text-zinc-500">{metric.label}</div>
        </div>
      )}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
        {label}
      </div>
      {value ? (
        <div className="mt-1.5 text-sm font-medium text-zinc-700">{value}</div>
      ) : (
        <div className="mt-1.5 text-sm font-medium italic text-zinc-300">
          [Add {label.toLowerCase()}]
        </div>
      )}
    </div>
  );
}

function Hero({ data }: { data: CaseStudyData }) {
  return (
    <section className="relative bg-white px-6 pb-16 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal>
          <Eyebrow>{data.heroEyebrow ?? data.client}</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="mx-auto max-w-3xl text-[32px] leading-[1.1] tracking-tight text-[#0A0A0E] md:text-[48px] lg:text-[56px]"
            style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
          >
            {data.headline}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="mt-5 text-lg font-bold text-[#5C45FD] md:text-xl"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {data.heroStat}
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-col items-center gap-3">
          <a
            href={CTA_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-[#5C45FD] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25 transition-all hover:bg-[#4a36e0] hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C45FD]"
          >
            {data.cta.primary}
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-zinc-400">
            {data.heroCtaMicrocopy ?? "Free 30-min call. No pitch, just clarity."}
          </p>
        </Reveal>

        <Reveal
          delay={0.28}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-y border-black/[0.06] py-6"
        >
          <MetaItem label="Industry" value={data.meta.industry} />
          <MetaItem label="Services" value={data.meta.services.join(", ")} />
          <MetaItem
            label="Timeline"
            value={
              data.meta.timeline
                ? data.meta.year
                  ? `${data.meta.timeline} · ${data.meta.year}`
                  : data.meta.timeline
                : ""
            }
          />
        </Reveal>
      </div>

      <Reveal delay={0.3} className="mx-auto mt-12 max-w-[1400px]">
        <ImagePair images={data.heroImages} aspect="aspect-[4/3]" rounded="rounded-[24px]" />
      </Reveal>
    </section>
  );
}

function Context({ data }: { data: CaseStudyData }) {
  return (
    <section className="bg-white px-6 pb-16 md:px-10 md:pb-20">
      <div className="mx-auto flex max-w-[760px] flex-col gap-5 text-center">
        {data.context.map((paragraph, i) => (
          <Reveal key={i} delay={i * 0.12}>
            <p
              className="text-xl leading-snug text-[#0A0A0E] md:text-2xl"
              style={{ fontFamily: "Arial, sans-serif", fontWeight: 500 }}
            >
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

function ApproachRow({
  item,
  index,
  challenge,
}: {
  item: ApproachModule;
  index: number;
  challenge: ChallengeCard;
}) {
  const reversed = index % 2 === 1;
  return (
    <Reveal className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={reversed ? "lg:order-2" : ""}>
        <span
          className="text-3xl font-bold text-zinc-300 md:text-4xl"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {item.microResult && (
            <span className="inline-flex items-center rounded-full bg-[#5C45FD]/10 px-3.5 py-1.5 text-xs font-bold text-[#5C45FD]">
              {item.microResult}
            </span>
          )}
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${SEVERITY_STYLES[challenge.severity]}`}
          >
            Solves: {challenge.tag}
          </span>
        </div>
        <h3
          className="mt-3 text-2xl text-[#0A0A0E] md:text-[28px]"
          style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
        >
          {item.title}
        </h3>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600">{item.body}</p>
      </div>
      <div className={reversed ? "lg:order-1" : ""}>
        <ImagePlaceholder label={item.image} aspect="aspect-[4/3]" />
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
            {data.approachHeader}
          </p>
          {data.approachIntro && (
            <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
              {data.approachIntro}
            </p>
          )}
        </Reveal>

        <div className="flex flex-col gap-16 md:gap-24">
          {data.approach.map((item, i) => (
            <ApproachRow
              key={item.title}
              item={item}
              index={i}
              challenge={data.challenge.problems[item.solves]}
            />
          ))}
        </div>

        {data.approachPlusLine && (
          <Reveal delay={0.1} className="mx-auto mt-16 max-w-2xl text-center md:mt-24">
            <p className="text-[15px] leading-relaxed text-zinc-500">
              {data.approachPlusLine}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const TURNING_POINT_MONO =
  'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

// First metrics-tier entry with an actual number to show as this
// section's proof number. Bamper/Reality Cheque/the funnel all have
// one; Smarterform and The HDDs only have qualitative metrics, so this
// returns null for them and MetricProof falls back to a statement
// instead of faking a count.
function findKeyMetric(metrics: MetricItem[]): { value: string; label: string } | null {
  const withNumber = metrics.find((m): m is Extract<MetricItem, { to: string }> => "to" in m && /\d/.test(m.to));
  return withNumber ? { value: withNumber.to, label: withNumber.label } : null;
}

function MetricProof({ metrics }: { metrics: MetricItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();
  const keyMetric = findKeyMetric(metrics);
  const target = keyMetric ? parseMetric(keyMetric.value) : null;
  const [display, setDisplay] = useState(() => {
    if (!keyMetric || !target) return "";
    return reduceMotion ? keyMetric.value : `${target.prefix}0${target.suffix}`;
  });

  useEffect(() => {
    if (!inView || !keyMetric || !target) return;
    if (reduceMotion) {
      setDisplay(keyMetric.value);
      return;
    }
    const controls = animate(0, target.number, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${target.prefix}${v.toFixed(target.decimals)}${target.suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!keyMetric) {
    // No numeric metric in this case study's data - a qualitative
    // statement stands in rather than a fabricated number.
    return (
      <div ref={ref} className="text-center">
        <p
          className="mx-auto max-w-2xl text-2xl font-extrabold leading-snug text-[#F5F5F5] md:text-3xl"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {metrics[0]?.label}
        </p>
      </div>
    );
  }

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-extrabold text-[#5C45FD]"
        style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(32px, 4vw, 52px)" }}
      >
        {display}
      </div>
      <div
        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(245,245,245,0.5)]"
        style={{ fontFamily: TURNING_POINT_MONO }}
      >
        {keyMetric.label}
      </div>
    </div>
  );
}

// Optional narrative beat between Approach and Results - only renders when a
// case study's data sets `turningPoint`. Before/after split: the problem
// (muted, left) against the turning point and result (bright, purple-edged,
// right), then the case study's real key number full width below - three
// layers of hierarchy (muted problem, bright insight, proof number) instead
// of a wall of paragraphs on a light card that didn't match the rest of the
// (dark) site.
function TurningPoint({ data }: { data: CaseStudyData }) {
  if (!data.turningPoint) return null;
  const [problem, ...rest] = data.turningPoint.body;
  const insight = rest.join(" ");

  return (
    <section className="bg-[#0A0A0E] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1040px]">
        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-0">
          {/* Divider between the two halves, gone once they stack on mobile */}
          <div className="pointer-events-none absolute inset-y-6 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#A89BFF66] to-transparent md:block" />

          <Reveal duration={0.3} className="md:pr-8">
            <div
              className="h-full rounded-[20px] p-8 md:p-10"
              style={{ background: "#1F1F26", border: "1px solid rgba(245,245,245,0.09)" }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[rgba(245,245,245,0.4)]"
                style={{ fontFamily: TURNING_POINT_MONO }}
              >
                The Problem
              </span>
              <p className="mt-4 text-[15px] leading-[1.6] text-[rgba(245,245,245,0.66)] md:text-base">
                {problem}
              </p>
            </div>
          </Reveal>

          <Reveal duration={0.3} delay={0.12} className="md:pl-8">
            <div
              className="h-full rounded-[20px] p-8 md:p-10"
              style={{
                background: "#1F1F26",
                border: "1px solid rgba(245,245,245,0.09)",
                borderTopColor: "rgba(168,155,255,0.4)",
              }}
            >
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A89BFF]"
                style={{ fontFamily: TURNING_POINT_MONO }}
              >
                The Turning Point
              </span>
              <p
                className="mt-4 text-xl font-extrabold leading-snug text-[#F5F5F5] md:text-2xl"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                {data.turningPoint.header}
              </p>
              <p className="mt-4 text-[15px] leading-[1.6] text-[rgba(245,245,245,0.72)] md:text-base">
                {insight}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-16">
          <MetricProof metrics={data.metrics} />
        </div>
      </div>
    </section>
  );
}

function ResultsAtLaunch({ data }: { data: CaseStudyData }) {
  return (
    <section id="results" className="bg-white px-6 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <Eyebrow>{data.resultsAtLaunchEyebrow}</Eyebrow>
            <p
              className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
              style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
            >
              Impact by the Numbers
            </p>
          </Reveal>
          {data.results.intro && (
            <Reveal delay={0.1} className="max-w-sm">
              <p className="text-sm leading-relaxed text-zinc-500">{data.results.intro}</p>
            </Reveal>
          )}
        </div>

        <div className={`mt-10 grid grid-cols-1 gap-4 ${statsGridCols(data.metrics.length)}`}>
          {data.metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-6">
          <ImagePlaceholder
            label={data.results.chartImage}
            aspect={data.results.chartImage.startsWith("PLACEHOLDER:") ? "aspect-[16/7]" : "aspect-[4/3]"}
            rounded="rounded-[24px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

// Thin visual link between the two results tiers so they read as two points
// on one timeline (Day 1 -> Month 6) rather than two unrelated stat grids.
function ResultsTimelineConnector() {
  return (
    <div className="bg-white px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-3">
        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#5C45FD]" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Day 1
        </span>
        <span className="h-px w-full max-w-[240px] bg-zinc-200" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Month 6
        </span>
        <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#5C45FD]" />
      </div>
    </div>
  );
}

function ResultsSustained({ data }: { data: CaseStudyData }) {
  return (
    <section className="bg-zinc-50/60 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal>
          <Eyebrow>{data.resultsSustainedEyebrow}</Eyebrow>
          {data.results.note && (
            <p
              className="text-2xl leading-snug text-[#0A0A0E] md:text-3xl"
              style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
            >
              {data.results.note}
            </p>
          )}
        </Reveal>

        <div
          className={`mt-10 grid grid-cols-1 gap-8 border-t border-black/[0.06] pt-8 sm:divide-x sm:divide-black/[0.06] ${statsGridCols((data.results.stats ?? []).length)}`}
        >
          {(data.results.stats ?? []).map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              {stat.value ? (
                <>
                  <div
                    className="text-2xl font-bold text-[#0A0A0E]"
                    style={{ fontFamily: "Arial, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    {stat.label}
                  </div>
                </>
              ) : (
                <div
                  className="text-lg font-bold leading-snug text-[#0A0A0E]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {stat.label}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial({ data }: { data: CaseStudyData }) {
  return (
    <section className="bg-white px-6 py-20 md:px-10 md:py-28">
      <Reveal className="mx-auto max-w-[800px] text-center">
        <p
          className="text-2xl italic leading-snug text-[#0A0A0E] md:text-3xl"
          style={{ fontFamily: "Arial, sans-serif", fontWeight: 400 }}
        >
          &quot;{data.quote.text}&quot;
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-14 w-14 flex-shrink-0">
            <ImagePlaceholder
              label={data.quote.photo}
              aspect="aspect-square"
              rounded="rounded-full"
            />
          </div>
          <div className="text-left">
            {data.quote.name ? (
              <div className="text-sm font-bold text-[#0A0A0E]">{data.quote.name}</div>
            ) : (
              <div className="text-sm font-bold italic text-zinc-300">[Add client name]</div>
            )}
            {data.quote.role ? (
              <div className="text-xs text-zinc-500">{data.quote.role}</div>
            ) : (
              <div className="text-xs italic text-zinc-300">[Add role/company]</div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    // --accent is the single line to change for a full rebrand: every
    // color reference in this file reads from this CSS variable.
    <div style={{ "--accent": ACCENT } as React.CSSProperties} className="bg-white">
      <Navbar ctaLabel="Book a Free Call" ctaHref={CTA_HREF} />
      <main className="relative min-h-screen">
        <Hero data={data} />
        <Context data={data} />
        <Challenge data={data} />
        <Approach data={data} />
        <TurningPoint data={data} />
        <ResultsAtLaunch data={data} />
        {data.resultsSustainedEyebrow && data.results.stats && data.results.stats.length > 0 && (
          <>
            <ResultsTimelineConnector />
            <ResultsSustained data={data} />
          </>
        )}
        <Testimonial data={data} />
      </main>
      <SiteFooter headline={data.finalCta?.headline} subline={data.finalCta?.subline} />
    </div>
  );
}
