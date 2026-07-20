'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const problems = [
  {
    title: "Visitors leave. Always.",
    desc: "Good traffic, zero action. Something on your page is pushing them out."
  },
  {
    title: "Your competitor just won a customer who almost chose you.",
    desc: "Their site felt more credible. It wasn't luck — it was engineered."
  },
  {
    title: "You've been here before.",
    desc: "Paid thousands. Got a pretty page. Nothing moved. That ends here."
  },
  {
    title: "Every day costs you.",
    desc: "Not in theory — in real leads, real revenue, real momentum lost."
  }
];

const AnimatedNumber = ({ value, duration = 800, isActive, prefix = "", suffix = "", decimals = 1 }: { value: number, duration?: number, isActive: boolean, prefix?: string, suffix?: string, decimals?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayValue(0);
      return;
    }

    let start = 0;
    const end = value;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(progress * end);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, value, duration]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return <span>{prefix}{formattedValue}{suffix}</span>;
};

const VisitorGraphic = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full p-6 gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/60">Bounced Traffic</span>
          <span className="text-red-400 font-bold">
            <AnimatedNumber value={97} isActive={isActive} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "97%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-red-500 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/40">Engaged Traffic</span>
          <span className="text-[#5C45FD] font-bold">
            <AnimatedNumber value={3} isActive={isActive} suffix="%" decimals={1} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "3%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="h-full bg-[#5C45FD] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const CompetitorGraphic = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full p-6 gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/60">Competitor</span>
          <span className="text-[#5C45FD] font-bold">
            <AnimatedNumber value={8.2} isActive={isActive} suffix="% CVR" decimals={1} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "82%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-[#5C45FD] rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/40">Your Site</span>
          <span className="text-white/40">
            <AnimatedNumber value={1.1} isActive={isActive} suffix="% CVR" decimals={1} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "11%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="h-full bg-white/20 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const CycleGraphic = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full p-6 gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/60">Marketing Budget</span>
          <span className="text-white font-bold">
            <AnimatedNumber value={100} isActive={isActive} suffix="% Spent" decimals={0} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-white/25 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/40">Customer Return</span>
          <span className="text-red-400 font-bold">
            <AnimatedNumber value={0} isActive={isActive} suffix="% Leads" decimals={1} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "0%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="h-full bg-red-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const CostsGraphic = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex flex-col justify-center w-full h-full p-6 gap-5">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/60">Leaking Revenue</span>
          <span className="text-red-400 font-bold">
            <AnimatedNumber value={2450} isActive={isActive} prefix="-$" suffix=" / day" decimals={0} />
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "85%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-red-500/80 rounded-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[12px]">
          <span className="text-white/40">Leak Status</span>
          <span className="text-red-400 font-bold animate-pulse">Critical</span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="h-full bg-white/20 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default function Problem() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const renderGraphic = (index: number, isActive: boolean) => {
    switch (index) {
      case 0:
        return <VisitorGraphic isActive={isActive} />;
      case 1:
        return <CompetitorGraphic isActive={isActive} />;
      case 2:
        return <CycleGraphic isActive={isActive} />;
      case 3:
        return <CostsGraphic isActive={isActive} />;
      default:
        return null;
    }
  };

  return (
    <section id="problem" className="relative bg-[#0A0A0E] py-24 lg:py-40 overflow-hidden">
      <div className="bg-grain absolute inset-0 opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10">
        <div className="mb-14 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            The Problem
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
            className="text-left text-white max-w-4xl"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(28px, 5vw, 46px)',
              fontWeight: '400',
              lineHeight: '1.1',
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
                Traffic without conversions isn't growth.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block text-white/40"
                variants={{
                  hidden: { y: "100%" },
                  visible: {
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                It's an expensive leak.
              </motion.span>
            </span>
          </motion.h2>
        </div>

        <div className="w-full">
          {problems.map((p, i) => (
            <div 
              key={i} 
              onMouseEnter={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                  setActiveIndex(i);
                }
              }}
              onClick={() => {
                setActiveIndex(activeIndex === i ? null : i);
              }}
              className={`py-8 flex gap-8 items-center justify-between w-full cursor-pointer group ${
                i !== problems.length - 1 ? "border-b border-white/10" : ""
              }`}
            >
              {/* Left Side: Headline and Description */}
              <div className="flex-1 min-w-0">
                <div className="w-full flex items-center gap-6 md:gap-8 text-left">
                  <div className={`flex-shrink-0 transition-colors duration-300 ${activeIndex === i ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {activeIndex === i ? (
                      <Minus className="w-6 h-6 md:w-8 md:h-8 text-[#5C45FD]" />
                    ) : (
                      <Plus className="w-6 h-6 md:w-8 md:h-8" />
                    )}
                  </div>

                  <span
                    className={`text-[20px] md:text-[26px] font-normal transition-all duration-300 ${
                      activeIndex === i ? 'text-white opacity-100' : 'text-white opacity-70 group-hover:opacity-100'
                    }`}
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    {p.title}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {activeIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pl-12 md:pl-16 text-lg md:text-xl text-white/50 leading-[1.45] md:leading-relaxed font-light">
                        {p.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side: Graphic */}
              <div className="hidden md:block flex-shrink-0 self-center overflow-hidden">
                <motion.div
                  initial={{ height: 0, opacity: 0, scale: 0.95 }}
                  animate={{ 
                    height: activeIndex === i ? 195 : 0, 
                    opacity: activeIndex === i ? 1 : 0,
                    scale: activeIndex === i ? 1 : 0.95
                  }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  className="w-[310px] flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden"
                >
                  <div className="w-full h-[195px] flex items-center justify-center">
                    {renderGraphic(i, activeIndex === i)}
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
