"use client";

import React from "react";
import { Target, TrendingUp, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    icon: Target,
    num: "8 Years",
    label: "We've fixed what other agencies broke.",
    desc: "Most of our 200+ projects are rebuilds — founders who paid another agency for a 'beautiful' site that never sold a thing. Our SYNC Method™ audits exactly why visitors leave before we touch a single pixel.",
  },
  {
    icon: TrendingUp,
    num: "Sales > Style",
    label: "Built to sell. Not just to look good.",
    desc: "We're not a design studio chasing awards. Every layout, headline, and button exists to move a visitor toward a sale — good looks are a side effect, never the goal.",
  },
  {
    icon: Zap,
    num: "Speed & transparency",
    label: "Fast. Transparent. No surprises.",
    desc: "A progress update every 2–3 days and a live site in weeks, not months — you always know exactly where things stand.",
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
          <span className="block">You&apos;ve seen agencies.</span>
          <span className="block text-black/30">You haven&apos;t seen this.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group flex flex-col gap-5 p-8 lg:p-9 rounded-3xl border border-black/[0.06] bg-zinc-50/60 transition-all duration-300 hover:border-[#5C45FD]/25 hover:bg-white hover:shadow-[0_24px_48px_-20px_rgba(92,69,253,0.18)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5C45FD] text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </div>
                <div
                  className="text-3xl md:text-4xl font-black text-[#5C45FD] tracking-tighter"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {s.num}
                </div>
                <h3
                  className="text-lg md:text-xl text-[#0A0A0E] font-bold tracking-tight"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {s.label}
                </h3>
                <p className="text-base leading-relaxed text-[#6b7280]">
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
          <Link
            href="/landing-page/book-call"
            className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#5C45FD] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/20 transition-all hover:bg-[#4a36e0]"
          >
            Book Your Free Strategy Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
