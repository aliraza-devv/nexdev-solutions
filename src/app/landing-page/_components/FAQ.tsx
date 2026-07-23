'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  { 
    q: "How fast will this actually launch?", 
    a: "Most SYNC rebuilds live within 2–4 weeks. Complex enterprise custom builds typically range 6–10 weeks depending on integrations." 
  },
  { 
    q: "What if I don't like the design?", 
    a: "We don't stop until you love it. Our guarantee means unlimited revisions. We strategy-first, so design decisions are data-backed, reducing friction early." 
  },
  { 
    q: "What makes this different from a cheaper agency?", 
    a: "Standard agencies build pages. We build psychology-backed conversion channels. The difference is the Result — we don't focus on how it looks, we focus on what happens after someone lands." 
  },
  { 
    q: "Is it really 100% mine when it's done?", 
    a: "Yes. You own the code, the copy, and the assets. We hand over the keys completely. No recurring licensing fees." 
  },
  { 
    q: "What happens after launch?", 
    a: "We don't ghost. Every project includes a 60-day check-in to ensure the conversion engineering is performing as expected." 
  },
  { 
    q: "Will it rank on Google?", 
    a: "Every site is built on an SEO-perfect foundation. We optimize for speed, accessibility, and crawlability from line one." 
  },
  { 
    q: "How do I get started?", 
    a: "Book a 30-min strategy call. No pitch. We'll audit your current situation and see if SYNC is the right fix for your leak." 
  }
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const primaryFont = 'Arial, sans-serif';
  const secondaryFont = 'Arial, sans-serif';

  return (
    <section id="faq" className="relative bg-[#0A0A0E] pt-20 pb-20 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        
        {/* Centered Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div 
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
            style={{ fontFamily: secondaryFont }}
          >
            FAQ
          </div>
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
            className="text-white tracking-tighter font-normal"
            style={{ 
              fontFamily: primaryFont,
              fontSize: 'clamp(28px, 5vw, 46px)',
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
                The questions
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block text-white/20"
                variants={{
                  hidden: { y: "100%" },
                  visible: {
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                you&apos;re already thinking.
              </motion.span>
            </span>
          </motion.h2>
        </div>

        <div className="space-y-0">
          {faqs.map((f, i) => (
            <div key={i} className="border-t border-white/5 last:border-b py-8">
               <button 
                  onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  className="flex w-full items-center justify-between gap-8 group"
               >
                  <span 
                    className={`text-left text-[19px] md:text-xl lg:text-2xl font-medium tracking-tight transition-all duration-300 ${
                      activeIdx === i 
                        ? 'text-white opacity-100' 
                        : 'text-white opacity-70 group-hover:opacity-100'
                    }`}
                    style={{ fontFamily: primaryFont }}
                  >
                      {f.q}
                  </span>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${activeIdx === i ? 'bg-[#5C45FD] border-[#5C45FD] text-white' : 'border-white/10 text-white/40'}`}>
                      {activeIdx === i ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </div>
               </button>
               
               <AnimatePresence>
                  {activeIdx === i && (
                     <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                     >
                        <p 
                          className="mt-6 text-base lg:text-lg text-white/50 leading-relaxed max-w-3xl"
                          style={{ fontFamily: secondaryFont }}
                        >
                            {f.a}
                        </p>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
