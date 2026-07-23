'use client';

import React, { useRef, useState } from 'react';
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
  layers?: Layer[];
}

export default function SyncMethod({ 
  chipText = "THE SYSTEM", 
  heading = (
    <>
      Other agencies build websites. <br />
      We build what happens <span className="text-[#5C45FD] italic">after</span>.
    </>
  ),
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
      {/* 1. Static Headline Section */}
      <div className="pt-24 pb-12 bg-white">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold tracking-[0.4em] text-[#5C45FD] uppercase mb-4"
          >
            {chipText}
          </motion.div>
          <h2 className="tracking-tighter text-[#0A0A0E] leading-[1.1] font-normal" 
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(28px, 5.6vw, 50px)',
                letterSpacing: '-0.02em'
              }}>
            {heading}
          </h2>
        </div>
      </div>

      {/* 2. Sticky Interactive Section (Desktop/Tablet Only) */}
      <div className="hidden lg:block h-[400vh] relative">
        <div className="sticky top-0 flex h-[100dvh] w-full items-center overflow-hidden bg-white">
          <div className="absolute bottom-0 left-0 h-1 bg-[#5C45FD]/10 w-full z-50">
              <motion.div 
                 style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                 className="h-full bg-[#5C45FD] w-full" 
              />
          </div>
          <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 flex flex-col justify-center relative">
            <div className="flex items-center">
              {/* Left Side: SYNC Letters */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center -space-y-6 lg:-space-y-8">
                  {layers.map((l, i) => (
                    <motion.div
                      key={i}
                      className="text-[4.8rem] lg:text-[7.2rem] font-black leading-none select-none"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                      animate={{
                        color: index === i ? '#5C45FD' : '#E5E7EB',
                        scale: index === i ? 1 : 0.75,
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

              {/* Middle Content */}
              <div className="relative z-10 flex-1 px-12 lg:px-20">
                <div className="relative h-40 w-full max-w-md">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <h3 className="text-2xl lg:text-3xl font-black text-[#5C45FD] mb-2 uppercase">
                        {layers[index].title}
                      </h3>
                      {layers[index].subtitle && (
                        <p className="text-lg font-bold italic text-[#0A0A0E] mb-4 leading-tight">
                          {layers[index].subtitle}
                        </p>
                      )}
                      <p className="text-lg text-zinc-600 font-medium leading-snug">
                        {layers[index].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Side: SYNC Specific Mockup */}
              <div className="relative z-10 w-[35%] flex items-center justify-center pr-4">
                <motion.div 
                  style={{ scale: mockupScale, rotateY: mockupRotate, perspective: 1000 }}
                  className="relative h-[300px] lg:h-[400px] w-full rounded-[30px] bg-white border border-black/[0.05] overflow-hidden shadow-[0_30px_60px_-15px_rgba(92,69,253,0.12)]"
                >
                  <div className="absolute inset-0 p-4 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-1.5 w-16 bg-zinc-100 rounded-full" />
                      <div className="flex gap-2">
                        <div className="h-3 w-3 bg-zinc-100 rounded-full" />
                        <div className="h-3 w-3 bg-zinc-100 rounded-full" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        animate={{ backgroundColor: index >= 0 ? '#0A0A0E' : '#F4F4F5' }}
                        className="h-8 w-full rounded-lg" 
                      />
                      <motion.div 
                        animate={{ 
                          backgroundColor: index >= 1 ? '#0A0A0E' : '#F4F4F5',
                          x: index === 1 ? -10 : 0 
                        }}
                        className="h-16 w-4/5 rounded-lg" 
                      />
                      <motion.div 
                        animate={{ 
                          backgroundColor: index >= 2 ? '#F5F3FF' : '#F4F4F5',
                          borderColor: index >= 2 ? '#C4B5FD' : 'transparent',
                          borderWidth: 1
                        }}
                        className="h-20 w-full rounded-lg flex items-center justify-center overflow-hidden relative"
                      >
                        {index >= 2 && (
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[8px] font-bold text-[#5C45FD] z-10 bg-white/80 px-3 py-0.5 rounded-full shadow-sm">
                            NEURO-MATCHED
                          </motion.span>
                        )}
                      </motion.div>
                      <motion.div 
                        animate={{ 
                          backgroundColor: index >= 3 ? '#5C45FD' : '#F4F4F5',
                          scale: index === 3 ? 1.05 : 1
                        }}
                        className="h-10 w-3/4 mx-auto rounded-full flex items-center justify-center"
                      >
                        {index === 3 && <span className="text-white text-[10px] font-black tracking-widest">ACTIVATE</span>}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
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
                {/* Large semi-translucent watermark step letter beside the heading */}
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
                <div className="absolute inset-0 pt-16 px-8 pb-8 flex items-center justify-center scale-[0.9] xs:scale-100">
                  <div className="relative h-[260px] w-full rounded-[24px] bg-white border border-black/[0.05] overflow-hidden shadow-[0_20px_40px_-10px_rgba(92,69,253,0.08)]">
                    <div className="absolute inset-0 p-4 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-1.5 w-16 bg-zinc-100 rounded-full" />
                        <div className="flex gap-2">
                          <div className="h-2.5 w-2.5 bg-zinc-100 rounded-full" />
                          <div className="h-2.5 w-2.5 bg-zinc-100 rounded-full" />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div 
                          className={`h-7 w-full rounded-lg transition-colors duration-300 ${i >= 0 ? 'bg-[#0A0A0E]' : 'bg-[#F4F4F5]'}`}
                        />
                        <div 
                          style={{ transform: i === 1 ? 'translateX(-10px)' : 'none' }}
                          className={`h-14 w-4/5 rounded-lg transition-all duration-300 ${i >= 1 ? 'bg-[#0A0A0E]' : 'bg-[#F4F4F5]'}`}
                        />
                        <div 
                          className={`h-16 w-full rounded-lg flex items-center justify-center overflow-hidden relative border transition-all duration-300 ${
                            i >= 2 ? 'bg-[#F5F3FF] border-[#C4B5FD]' : 'bg-[#F4F4F5] border-transparent'
                          }`}
                        >
                          {i >= 2 && (
                            <span className="text-[8px] font-bold text-[#5C45FD] z-10 bg-white/80 px-3 py-0.5 rounded-full shadow-sm">
                              NEURO-MATCHED
                            </span>
                          )}
                        </div>
                        <div 
                          className={`h-8 w-3/4 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                            i === 3 ? 'bg-[#5C45FD] scale-105 shadow-md shadow-[#5C45FD]/20' : 'bg-[#F4F4F5]'
                          }`}
                        >
                          {i === 3 && <span className="text-white text-[9px] font-black tracking-widest">ACTIVATE</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}