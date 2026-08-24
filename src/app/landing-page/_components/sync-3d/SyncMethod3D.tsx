"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionGate } from "../solution/use-motion-gate";
import {
  CTA,
  EYEBROW,
  HEADLINE,
  LAYERS,
  PIPELINE_HIGH_LABEL,
  PIPELINE_HIGH_VALUE,
  PIPELINE_LOW_LABEL,
  PIPELINE_LOW_VALUE,
  SUBHEAD,
} from "./sync-content";
import type { SyncPanelsApi } from "./SyncPanels";

const SyncPanelsScene = dynamic(() => import("./SyncPanelsScene"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function pipelineValueAt(progress: number): number {
  return Math.round(PIPELINE_LOW_VALUE + (PIPELINE_HIGH_VALUE - PIPELINE_LOW_VALUE) * progress);
}

// The 3D SYNC Method section: four glass panels that scatter in the
// broken state and lock into one aligned, glowing stack as the visitor
// scrolls through. A pipeline number climbs alongside it, and hovering a
// panel reveals that layer's one line job.
export default function SyncMethod3D() {
  const allowMotion = useMotionGate();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px -10% 0px" });
  const [sceneApi, setSceneApi] = useState<SyncPanelsApi | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pipelineValue, setPipelineValue] = useState(PIPELINE_LOW_VALUE);
  const hasScrolledRef = useRef(false);

  const applyProgress = useMemo(
    () => (p: number) => {
      sceneApi?.setProgress(p);
      setPipelineValue(pipelineValueAt(p));
    },
    [sceneApi],
  );

  // ScrollTrigger scrub, not pinned: one short scrub across the
  // section's own ~130vh, then it releases and scrolling continues
  // normally.
  useEffect(() => {
    if (!allowMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.4,
        onUpdate: (self) => {
          hasScrolledRef.current = true;
          applyProgress(self.progress);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [allowMotion, applyProgress]);

  // Idle auto play once, only if the visitor has not already started
  // scrolling through the section by the time it enters view.
  useEffect(() => {
    if (!allowMotion || !isInView) return;
    if (hasScrolledRef.current) return;

    const proxy = { p: 0 };
    const tween = gsap.to(proxy, {
      p: 1,
      duration: 3.4,
      delay: 0.3,
      ease: "power2.inOut",
      onUpdate: () => {
        if (hasScrolledRef.current) {
          tween.kill();
          return;
        }
        applyProgress(proxy.p);
      },
    });

    return () => {
      tween.kill();
    };
  }, [allowMotion, isInView, applyProgress]);

  const hoveredLayer = hoverIndex !== null ? LAYERS[hoverIndex] : null;

  return (
    <section ref={sectionRef} className="relative bg-[#161616] py-20 lg:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1000px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center rounded-full border border-[#5c45fd]/40 bg-[#5c45fd]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a89bff]"
        >
          {EYEBROW}
        </motion.div>
        <h2
          className="text-[#f5f5f5] font-normal leading-tight tracking-tight"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(28px, 5vw, 46px)",
            letterSpacing: "-0.02em",
          }}
        >
          {HEADLINE}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-[#f5f5f5]/60">{SUBHEAD}</p>
      </div>

      <div className="relative mx-auto mt-6 h-[70vh] min-h-[480px] max-w-[1000px] px-6 lg:h-[75vh]">
        {allowMotion && (
          <SyncPanelsScene
            className="absolute inset-0"
            onReady={setSceneApi}
            onHoverChange={setHoverIndex}
          />
        )}

        {!allowMotion && (
          <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LAYERS.map((layer) => (
              <div
                key={layer.letter}
                className="flex flex-col items-center justify-center rounded-2xl border border-[#5c45fd]/25 bg-[#5c45fd]/[0.06] p-6 text-center"
              >
                <span
                  className="text-4xl font-black text-[#a89bff]"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  {layer.letter}
                </span>
                <span className="mt-2 text-sm font-bold text-[#f5f5f5]">{layer.name}</span>
                <span className="mt-1 text-xs text-[#f5f5f5]/60">{layer.job}</span>
              </div>
            ))}
          </div>
        )}

        {allowMotion && hoveredLayer && (
          <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-xl border border-[#5c45fd]/40 bg-[#161616]/90 px-5 py-3 text-center backdrop-blur">
            <p className="text-sm font-bold text-[#a89bff]">
              {hoveredLayer.letter} &middot; {hoveredLayer.name}
            </p>
            <p className="mt-1 text-xs text-[#f5f5f5]/70">{hoveredLayer.job}</p>
          </div>
        )}
      </div>

      <div className="relative z-10 mx-auto mt-14 flex max-w-[1000px] flex-col items-center gap-8 px-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#f5f5f5]/40">
            {PIPELINE_LOW_LABEL}
          </p>
          <p
            className="text-2xl font-bold text-[#f5f5f5]/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {formatCurrency(PIPELINE_LOW_VALUE)}
          </p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#a89bff]">
            {PIPELINE_HIGH_LABEL}
          </p>
          <p
            className="text-4xl font-black text-[#f5f5f5]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {formatCurrency(pipelineValue)}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 text-center">
        <button
          type="button"
          data-cursor="cta"
          className="rounded-full bg-[#5c45fd] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#5c45fd]/25 transition-transform hover:scale-[1.02]"
        >
          {CTA}
        </button>
      </div>
    </section>
  );
}
