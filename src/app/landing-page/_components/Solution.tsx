'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const letters = [
  {
    char: 'S',
    title: 'Sales Triggers',
    desc: 'We integrate pricing psychology and offer clarity directly into the UI.'
  },
  {
    char: 'Y',
    title: 'Your Brand Story',
    desc: 'We craft the narrative that hooks users in the first 3 seconds.'
  },
  {
    char: 'N',
    title: 'Neuro-Persuasion',
    desc: 'We use behavioral data to match how your specific audience thinks.'
  },
  {
    char: 'C',
    title: 'Conversion Design',
    desc: "Frictionless UI/UX flows that guide the user to the 'Buy' button."
  }
];

export default function Solution() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position inside the container
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse tracking
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const tooltipX = useSpring(mouseX, springConfig);
  const tooltipY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Center the tooltip horizontally (w-[320px] is 320px, so offset by 160px)
    // Place it just above the cursor (offset by 135px vertically to avoid overlap)
    mouseX.set(e.clientX - rect.left - 160);
    mouseY.set(e.clientY - rect.top - 135);
  };



  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-[#0A0A0E] pt-24 pb-12 lg:pt-40 lg:pb-16 overflow-hidden select-none"
    >
      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5C45FD]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            The Solution
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-white font-normal leading-tight tracking-tight max-w-4xl mx-auto text-center"
            style={{ 
              fontFamily: 'Arial, sans-serif',
              fontSize: 'clamp(28px, 5vw, 46px)',
              letterSpacing: '-0.02em'
            }}
          >
            There&apos;s a fix. And it&apos;s not <span className="text-[#5C45FD] italic">another redesign.</span>
          </motion.h2>
        </div>

        {/* Letters Area */}
        <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto py-12 md:py-20">
          
          {letters.map((item, idx) => {
            // Determine initial animation offset to make them slide apart from center
            let initialX = 0;
            if (idx === 0) initialX = 70;      // S slides left from center-left
            else if (idx === 1) initialX = 25; // Y slides left slightly
            else if (idx === 2) initialX = -25;// N slides right slightly
            else if (idx === 3) initialX = -70;// C slides right from center-right

            return (
              <motion.div
                key={item.char}
                initial={{ x: initialX, opacity: 0, scale: 0.9 }}
                whileInView={{ x: 0, opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Mobile tap handler
                onClick={() => {
                  if (window.innerWidth < 768) {
                    setHoveredIndex(hoveredIndex === idx ? null : idx);
                  }
                }}
                className="relative cursor-pointer select-none group flex-1 flex justify-center items-center"
              >
                <span 
                  className={`text-[80px] xs:text-[120px] sm:text-[180px] md:text-[220px] lg:text-[280px] font-bold tracking-tighter leading-none transition-all duration-300 ${
                    hoveredIndex === idx 
                      ? 'text-[#5C45FD] drop-shadow-[0_0_30px_rgba(92,69,253,0.3)]' 
                      : 'text-[#16161E] group-hover:text-white/[0.08]'
                  }`}
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {item.char}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile static helper: displays selected letter description below letters */}
        <div className="block md:hidden mt-8 min-h-[80px] text-center px-4">
          <AnimatePresence mode="wait">
            {hoveredIndex !== null ? (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-xl bg-[#0F0F16]/90 border border-[#5C45FD]/30"
              >
                <h4 className="text-[#5C45FD] text-xs font-bold uppercase tracking-wider mb-1">
                  {letters[hoveredIndex].title}
                </h4>
                <p className="text-gray-300 text-sm">
                  {letters[hoveredIndex].desc}
                </p>
              </motion.div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Tap on any letter to explore the SYNC elements
              </p>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Floating Microsoft-style modal following mouse (Desktop only) */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            style={{
              position: 'absolute',
              left: tooltipX,
              top: tooltipY,
              pointerEvents: 'none',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="hidden md:block z-50 w-[320px] p-5 rounded-xl bg-[#0F0F16]/95 border border-[#5C45FD]/40 shadow-[0_8px_32px_rgba(92,69,253,0.25)] backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/10 to-transparent rounded-xl pointer-events-none" />
            <h4 className="text-white text-[15px] font-bold uppercase tracking-wider mb-2 relative z-10 whitespace-nowrap">
              {letters[hoveredIndex].title}
            </h4>
            <p className="text-[#9CA3AF] text-[13px] leading-relaxed relative z-10">
              {letters[hoveredIndex].desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
