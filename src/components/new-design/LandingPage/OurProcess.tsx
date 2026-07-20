'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';

const defaultLayers = [
  {
    letter: 'S',
    title: 'Sales Architecture',
    desc: 'What your site says — and in what order. Built around how your customer thinks, not how you talk about yourself.',
  },
  {
    letter: 'Y',
    title: 'Yield Narrative',
    desc: 'Your story, told so the right visitor feels: "this is exactly for me." Trust before they scroll halfway.',
  },
  {
    letter: 'N',
    title: 'Neuro Persuasion',
    desc: 'Cognitive psychology — heuristics, bias, mental models — baked into every layout decision. Not manipulation. Just how brains work.',
  },
  {
    letter: 'C',
    title: 'Conversion Engineering',
    desc: 'UX, CTA placement, friction removal. Every element has a job. If it doesn\'t convert, it doesn\'t stay.',
  }
];

interface Layer {
  letter: string;
  title: string;
  subtitle?: string;
  desc: string;
}

interface SyncMethodProps {
  chipText?: string;
  heading?: React.ReactNode;
  headingLines?: React.ReactNode[];
  layers?: Layer[];
}

export default function OurProcess({
  chipText = "THE SYSTEM",
  heading = (
    <>
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
          Other agencies build websites.
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
          We build what happens <span className="text-[#5C45FD] italic">after</span>.
        </motion.span>
      </span>
    </>
  ),
  headingLines,
  layers = defaultLayers
}: SyncMethodProps) {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Balanced segments for 4 steps
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setIndex(0);
    else if (latest < 0.45) setIndex(1);
    else if (latest < 0.7) setIndex(2);
    else setIndex(3);
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const mockupRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section id="how-it-works" ref={containerRef} className="relative bg-white">
      {/* 1. Static Headline Section (Mobile Only) */}
      <div className="pt-24 pb-12 lg:hidden bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 text-[#5C45FD] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            {chipText}
          </motion.div>
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
            className="tracking-tighter text-[#0A0A0E] leading-[1.1] font-normal"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(28px, 5vw, 46px)',
              letterSpacing: '-0.02em'
            }}>
            {headingLines ? (
              headingLines.map((line, idx) => (
                <span key={idx} className="block overflow-hidden pb-1">
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
                    {line}
                  </motion.span>
                </span>
              ))
            ) : heading}
          </motion.h2>
        </div>
      </div>

      {/* 2. Sticky Interactive Section (Desktop/Tablet Only) */}
      <div className="hidden lg:block h-[400vh] relative">
        <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden bg-white pt-24 pb-8">
          <div className="absolute bottom-0 left-0 h-1 bg-[#5C45FD]/10 w-full z-50">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
              className="h-full bg-[#5C45FD] w-full"
            />
          </div>
          <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 flex flex-col justify-center relative gap-8 lg:gap-10">
            
            {/* Integrated Desktop Headline */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/25 bg-[#5C45FD]/8 text-[#5C45FD] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
              >
                {chipText}
              </motion.div>
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
                className="tracking-tighter text-[#0A0A0E] leading-[1.1] font-normal"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: 'clamp(28px, 5vw, 46px)',
                  letterSpacing: '-0.02em'
                }}>
                {headingLines ? (
                  headingLines.map((line, idx) => (
                    <span key={idx} className="block overflow-hidden pb-1">
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
                        {line}
                      </motion.span>
                    </span>
                  ))
                ) : heading}
              </motion.h2>
            </div>

            <div className="flex items-center">
              {/* Left Side: Step Numbers */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center -space-y-4 lg:-space-y-6">
                  {layers.map((l, i) => (
                    <motion.div
                      key={i}
                      className="text-[3.8rem] lg:text-[5.5rem] font-black leading-none select-none"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      animate={{
                        color: index === i ? '#5C45FD' : '#E5E7EB',
                        scale: index === i ? 1 : 0.65,
                        opacity: index === i ? 1 : 0.3,
                        filter: index === i ? 'blur(0px)' : 'blur(2px)'
                      }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                    >
                      {l.letter}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Middle Content: Dynamic Text */}
              <div className="relative z-10 flex-1 px-12 lg:px-20">
                <div className="relative h-36 w-full max-w-md">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <h3 className="text-xl lg:text-2xl font-black text-[#5C45FD] mb-2 uppercase">
                        {layers[index].title}
                      </h3>
                      <p className="text-base text-zinc-600 font-medium leading-snug">
                        {layers[index].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Side: Visual Card */}
              <div className="relative z-10 w-[28%] max-w-[280px] flex items-center justify-center">
                <div className="relative w-full aspect-[4/4.5] rounded-[24px] lg:rounded-[32px] bg-white border border-black/[0.05] shadow-[0_40px_80px_-20px_rgba(92,69,253,0.15)] overflow-hidden">
                  {/* Static Card Header (Layered on top) */}
                  <div className="absolute top-0 left-0 w-full p-8 flex items-center justify-between z-20 pointer-events-none">
                    <div className="h-2 w-16 bg-zinc-100 rounded-full" />
                    <div className="flex gap-1.5">
                      {[0, 1, 2, 3].map((dot) => (
                        <motion.div
                          key={dot}
                          initial={false}
                          animate={{
                            backgroundColor: index === dot ? '#5C45FD' : '#E5E7EB',
                            scale: index === dot ? 1.2 : 1
                          }}
                          className="w-2 h-2 rounded-full"
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-0"
                    >
                      {index === 0 && <DiscoveryGraphics />}

                      {index === 1 && <SyncAuditGraphics />}

                      {index === 2 && <DesignDevGraphics />}

                      {index === 3 && <LaunchSupportGraphics />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Vertically-Stacked Section (Mobile Only) */}
      <div className="block lg:hidden bg-white pt-10 pb-24">
        <div className="mx-auto w-full max-w-[1280px] px-6 space-y-16">
          {layers.map((l, i) => (
            <div key={i} className="flex flex-col gap-6 border-b border-zinc-100 pb-12 last:border-0 last:pb-0">
              {/* Top Text Content Block */}
              <div className="relative">
                {/* Large semi-translucent watermark step number beside the heading */}
                <div 
                  className="absolute right-0 -top-8 text-[6.5rem] font-black text-[#5C45FD]/12 leading-none select-none pointer-events-none"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {l.letter}
                </div>
                <h3 className="text-2xl font-black text-[#5C45FD] mb-3 uppercase pr-20">
                  {l.title}
                </h3>
                <p className="text-base text-zinc-600 font-medium leading-relaxed">
                  {l.desc}
                </p>
              </div>

              {/* Bottom Visual Card Block */}
              <div className="relative w-full aspect-[4/4.5] rounded-[24px] bg-white border border-black/[0.05] shadow-[0_20px_40px_-10px_rgba(92,69,253,0.08)] overflow-hidden">
                {/* Dots Indicator */}
                <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between z-20 pointer-events-none">
                  <div className="h-1.5 w-12 bg-zinc-100 rounded-full" />
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((dot) => (
                      <div
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          i === dot ? 'bg-[#5C45FD]' : 'bg-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Layer Graphic Wrapper (Matches desktop absolute wrapper to prevent collapsing/squishing) */}
                <div className="absolute inset-0 pt-4 scale-[0.9] xs:scale-100">
                  {i === 0 && <DiscoveryGraphics />}
                  {i === 1 && <SyncAuditGraphics />}
                  {i === 2 && <DesignDevGraphics />}
                  {i === 3 && <LaunchSupportGraphics />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchSupportGraphics() {
  return (
    <div className="p-8 pt-8 h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[280px] aspect-[4/2.8] grid grid-cols-2 grid-rows-2 gap-3">
        {/* 1. Monitoring Indicator (Top Left) */}
        <div className="col-span-1 row-span-1 bg-white rounded-xl border border-black/[0.05] p-3 flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-[#5C45FD]"
          />
          <div className="w-8 h-8 rounded-full bg-[#5C45FD] flex items-center justify-center mb-2 shadow-lg shadow-[#5C45FD]/20">
            <div className="w-4 h-4 text-white">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
          <div className="text-[8px] font-bold text-[#5C45FD] uppercase">60 Days Monitoring</div>
        </div>

        {/* 2. Page Speed Chart (Top Right) */}
        <div className="col-span-1 row-span-1 bg-zinc-50 rounded-xl border border-black/[0.03] p-3">
          <div className="text-[8px] font-bold text-zinc-400 uppercase mb-2">Page Speed</div>
          <div className="flex items-end gap-1 h-10">
            {[40, 70, 50, 90].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                className="flex-1 bg-zinc-200 rounded-t-sm"
              />
            ))}
          </div>
        </div>

        {/* 3. Conversion Growth (Bottom Wide) */}
        <div className="col-span-2 row-span-1 bg-white rounded-xl border border-black/[0.05] shadow-sm p-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-[8px] font-bold text-zinc-400 uppercase">Conversion Rate</div>
            <div className="text-lg font-black text-[#0A0A0E]">+124%</div>
          </div>
          <div className="w-24 h-12 relative">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <motion.path
                d="M0 35 Q 25 35, 50 20 T 100 5"
                fill="none"
                stroke="#5C45FD"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignDevGraphics() {
  return (
    <div className="p-8 pt-8 h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[280px] aspect-[4/2.8] grid grid-cols-6 grid-rows-4 gap-2">
        {/* 1. UI Block (Large) */}
        <motion.div
          initial={{ x: -50, y: -20, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1, boxShadow: ["0 0 0px rgba(92,69,253,0)", "0 0 20px rgba(92,69,253,0.2)", "0 0 0px rgba(92,69,253,0)"] }}
          transition={{ duration: 0.8, delay: 0.2, boxShadow: { duration: 1.5, repeat: Infinity } }}
          className="col-span-4 row-span-3 bg-white rounded-xl border border-black/[0.05] shadow-sm p-3 flex flex-col gap-2"
        >
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
            <div className="w-2 h-2 rounded-full bg-green-400/50" />
          </div>
          <div className="space-y-2 pt-1">
            <div className="h-2 w-full bg-zinc-100 rounded-full" />
            <div className="h-2 w-3/4 bg-zinc-100 rounded-full" />
            <div className="h-12 w-full bg-zinc-50 rounded-lg border border-dashed border-zinc-200" />
          </div>
        </motion.div>

        {/* 2. Copy Block */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="col-span-2 row-span-2 bg-zinc-50 rounded-xl border border-black/[0.03] p-3 flex flex-col gap-2"
        >
          <div className="w-6 h-6 rounded-lg bg-[#5C45FD]/10 flex items-center justify-center">
            <div className="w-3 h-0.5 bg-[#5C45FD] rounded-full" />
          </div>
          <div className="space-y-1">
            <div className="h-1 w-full bg-zinc-200 rounded-full" />
            <div className="h-1 w-full bg-zinc-200 rounded-full" />
            <div className="h-1 w-2/3 bg-zinc-200 rounded-full" />
          </div>
        </motion.div>

        {/* 3. Stats/Psychology Block */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="col-span-2 row-span-2 bg-white rounded-xl border border-black/[0.05] shadow-sm p-3 flex items-center justify-center"
        >
          <div className="relative w-10 h-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[#5C45FD]/20 rounded-full"
            />
            <div className="absolute inset-2 bg-[#5C45FD] rounded-full" />
          </div>
        </motion.div>

        {/* 4. CTA Block (Bottom Wide) */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="col-span-4 row-span-1 bg-[#5C45FD] rounded-xl flex items-center justify-center"
        >
          <span className="text-[8px] font-bold text-white uppercase tracking-widest">Publish Live</span>
        </motion.div>
      </div>
    </div>
  );
}

function SyncAuditGraphics() {
  return (
    <div className="p-8 pt-8 h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="mb-3 flex items-center gap-1">
        <span className="text-[11px] font-bold text-[#5C45FD] uppercase tracking-wider">SYNC Scanning</span>
        <div className="flex gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-[2.2px] h-[2.2px] rounded-full bg-[#5C45FD]"
            />
          ))}
        </div>
      </div>
      <div className="relative w-full max-w-[280px] aspect-[4/2.8] bg-zinc-50/50 rounded-xl border border-black/[0.03] p-4 overflow-hidden">
        {/* Wireframe Elements */}
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="w-12 h-2 bg-zinc-200 rounded-full" />
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-zinc-200 rounded-full" />
              <div className="w-4 h-2 bg-zinc-200 rounded-full" />
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="h-3 w-3/4 bg-zinc-200 rounded-full mb-1"
              animate={{ backgroundColor: ["#E5E7EB", "#5C45FD", "#E5E7EB"] }}
              transition={{ duration: 3, repeat: Infinity, times: [0.3, 0.4, 0.7] }}
            />
            <motion.div
              className="h-3 w-1/2 bg-zinc-200 rounded-full"
              animate={{ backgroundColor: ["#E5E7EB", "#5C45FD", "#E5E7EB"] }}
              transition={{ duration: 3, repeat: Infinity, times: [0.35, 0.45, 0.75] }}
            />
          </div>

          <div className="h-16 w-full bg-zinc-200/50 rounded-lg border border-dashed border-zinc-300 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, times: [0.4, 0.5, 0.8] }}
              className="w-6 h-6 rounded-full bg-[#5C45FD]/20 flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-[#5C45FD] rounded-full" />
            </motion.div>
          </div>

          <div className="flex justify-center pt-2">
            <motion.div
              className="h-6 w-24 bg-zinc-200 rounded-lg shadow-sm"
              animate={{
                backgroundColor: ["#E5E7EB", "#5C45FD", "#E5E7EB"],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, times: [0.5, 0.6, 0.9] }}
            />
          </div>
        </div>

        <motion.div
          className="absolute top-0 bottom-0 w-8 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(92, 69, 253, 0.1), rgba(92, 69, 253, 0.3), rgba(92, 69, 253, 0.1), transparent)'
          }}
          animate={{ x: [-50, 350] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-y-0 left-1/2 w-[2px] bg-[#5C45FD] shadow-[0_0_15px_rgba(92, 69, 253, 0.5)]" />
        </motion.div>
      </div>
    </div>
  );
}

function DiscoveryGraphics() {
  const [subIndex, setSubIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % 4);
    }, 3000); // Slightly slower for better readability
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { id: 0, title: "Audience Mapping", color: "bg-zinc-50" },
    { id: 1, title: "Competitor Analysis", color: "bg-zinc-50" },
    { id: 2, title: "Goal Identification", color: "bg-zinc-50" },
    { id: 3, title: "Content Audit", color: "bg-zinc-50" }
  ];

  return (
    <div className="p-8 pt-8 h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-[280px] aspect-[4/2.8]">
        {cards.map((card, i) => {
          // Calculate relative position in the stack
          const position = (i - subIndex + 4) % 4;
          const isActive = position === 0;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                y: position * 8,
                scale: 1 - position * 0.04,
                zIndex: 4 - position,
                opacity: position === 3 ? 0 : 1,
                filter: position === 0 ? "blur(0px)" : `blur(${position * 1}px)`
              }}
              transition={{
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="absolute inset-0 p-5 rounded-2xl bg-white border border-black/[0.05] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{card.title}</div>

                {card.id === 0 && (
                  <div className="space-y-2">
                    {[
                      { percent: '90%', delay: 0.2 },
                      { percent: '65%', delay: 0.4 },
                      { percent: '45%', delay: 0.6 }
                    ].map((profile, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-zinc-100 border border-black/5 flex-shrink-0" />
                        <div className="h-1 flex-1 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: isActive ? profile.percent : '0%' }}
                            transition={{ duration: 1.5, delay: profile.delay, ease: "easeInOut" }}
                            className="h-full bg-[#5C45FD]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {card.id === 1 && (
                  <div className="flex gap-3 h-16 pt-2">
                    <motion.div 
                      animate={{ opacity: isActive ? 0.3 : 1, scale: isActive ? 0.95 : 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="flex-1 bg-zinc-100 rounded-xl border border-black/[0.03] p-3 flex flex-col justify-between"
                    >
                      <div className="text-[7px] font-bold text-zinc-400 uppercase">Competitor</div>
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-zinc-200 rounded-full" />
                        <div className="h-1 w-2/3 bg-zinc-200 rounded-full" />
                      </div>
                    </motion.div>
                    <motion.div 
                      animate={{ 
                        backgroundColor: isActive ? "#22C55E" : "#F4F4F5",
                        borderColor: isActive ? "#16A34A" : "rgba(0,0,0,0.03)"
                      }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                      className="flex-1 rounded-xl border p-3 flex flex-col justify-between shadow-sm"
                    >
                      <div className={`text-[7px] font-bold uppercase ${isActive ? 'text-white' : 'text-zinc-400'}`}>YOU</div>
                      <div className="flex items-center justify-between">
                        <div className={`h-1 w-1/2 rounded-full ${isActive ? 'bg-white/50' : 'bg-zinc-200'}`} />
                        {isActive && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="none" className="w-2 h-2 text-green-600" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}

                {card.id === 2 && (
                  <div className="space-y-3 pt-1">
                    {[0, 1, 2].map(idx => (
                      <div key={idx} className="flex items-center gap-3">
                        <motion.div 
                          animate={{ 
                            backgroundColor: isActive && idx <= 1 ? '#5C45FD' : '#F4F4F5',
                            scale: isActive && idx <= 1 ? [1, 1.1, 1] : 1
                          }}
                          transition={{ delay: idx * 0.4 }}
                          className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] text-white flex-shrink-0"
                        >
                          {isActive && idx <= 1 && "✓"}
                        </motion.div>
                        <div className="h-1 flex-1 bg-zinc-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: isActive && idx <= 1 ? '100%' : '0%' }}
                            transition={{ delay: idx * 0.4 + 0.2, duration: 0.8 }}
                            className="h-full bg-[#5C45FD]/40" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {card.id === 3 && (
                  <div className="text-[11px] font-medium leading-tight py-1 space-y-2">
                    <div className="relative inline-block">
                      <span className="text-zinc-400">"We sell high quality websites."</span>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? '100%' : 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute top-1/2 left-0 h-[1.5px] bg-[#5C45FD] -translate-y-1/2"
                      />
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="text-[#5C45FD] font-bold"
                      >
                        "Engineered to convert visitors into clients."
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="h-1 w-8 bg-zinc-100 rounded-full" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}