"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ComparisonSliderGraphic, ABTestGraphic, ProjectDashboardGraphic } from "./WhyUsGraphics";

const stats = [
  {
    Graphic: ComparisonSliderGraphic,
    num: "Since 2016",
    label: "We've fixed what other agencies broke.",
    desc: "Most of our 200+ projects are rebuilds for founders who paid someone else for a pretty site that never sold. We find out why visitors leave before we touch a pixel.",
  },
  {
    Graphic: ABTestGraphic,
    num: "Sales > Style",
    label: "Built to sell. Not just to look good.",
    desc: "We're not chasing awards. Every layout, headline, and button is there to move someone closer to buying. Good looks are a side effect.",
  },
  {
    Graphic: ProjectDashboardGraphic,
    num: "Speed & transparency",
    label: "Fast. Transparent. No surprises.",
    desc: "An update every 2 to 3 days. A live site in weeks, not months. You always know where things stand.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative bg-white pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 text-[#5C45FD] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
          WHY US
        </div>
        <h2
          className="tracking-tighter text-[#0A0A0E] mb-16 lg:mb-20 font-normal"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            lineHeight: "1.1",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="block" data-cursor="text" data-text="You've seen agencies.">
            You&apos;ve seen agencies.
          </span>
          <span
            className="block text-black/30"
            data-cursor="text"
            data-text="You haven't seen this."
          >
            You haven&apos;t seen this.
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {stats.map((s, i) => {
            const Graphic = s.Graphic;
            return (
              <div
                key={i}
                className="group flex h-full flex-col rounded-3xl border border-black/[0.06] bg-zinc-50/60 p-8 lg:p-9 transition-all duration-300 hover:border-[#5C45FD]/25 hover:bg-white hover:shadow-[0_24px_48px_-20px_rgba(92,69,253,0.18)]"
              >
                <div
                  className="min-h-[2.2em] max-[940px]:min-h-0 text-[clamp(24px,2.1vw,29px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-[#5C45FD]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {s.num}
                </div>
                <p
                  className="mt-[10px] text-[15px] font-bold leading-[1.35] text-[#1c1c26]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {s.label}
                </p>

                <div className="mt-6 grid h-[196px] max-[940px]:h-[170px] w-full place-items-center overflow-hidden rounded-[14px] bg-[#f7f6ff] transition-colors duration-[220ms] group-hover:bg-[#f0edff]">
                  <Graphic />
                </div>

                <div className="mt-6 h-px w-full bg-[rgba(22,22,22,0.08)]" />

                <p className="mt-5 text-[14.5px] leading-[1.62] text-[#5a5a70]">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bridge to Action */}
        <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-[#5C45FD]/15 bg-[#5C45FD]/[0.04] px-8 py-6">
          <p className="text-lg font-medium text-[#0A0A0E] text-center sm:text-left">
            Curious how we&apos;d approach your website?
          </p>
          <div className="flex flex-shrink-0 flex-col items-center gap-2">
            <Link href="/qualify" data-cursor="cta">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#5C45FD] px-5 py-3 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25 transition-all hover:bg-[#4a36e0]"
              >
                Let&apos;s talk about your site
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <p className="text-[13px] text-[#6b7280]">30 minutes. No pitch deck.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
