'use client';

import React, { useState } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

const column1Images = [
  '/mockups/01.png',
  '/mockups/02.png',
  '/mockups/03.png',
  '/mockups/04.png',
  '/mockups/05.png',
];

const column2Images = [
  '/mockups/06.png',
  '/mockups/07.png',
  '/mockups/08.png',
  '/mockups/09.png',
  '/mockups/10.png',
];

const MockupColumn = ({ images, speed = 20, reverse = false }: { images: string[], speed?: number, reverse?: boolean }) => {
  return (
    <div className="relative flex h-[120vh] flex-col gap-6 py-4">

      <motion.div
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex flex-col gap-6 py-4"
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative aspect-[524/354] w-full rounded-lg overflow-hidden border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.04)] bg-white">
            <Image
              src={src}
              alt={`Mockup ${i}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 300px"
              priority={i < 3}
            />
          </div>
        ))}
      </motion.div>

    </div>
  );
};

const MockupRow = ({ images, speed = 20, reverse = false }: { images: string[], speed?: number, reverse?: boolean }) => {
  return (
    <div className="relative overflow-hidden w-full py-1">
      <motion.div
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex gap-4 w-max"
      >
        {[...images, ...images].map((src, i) => (
          <div key={i} className="relative aspect-[524/354] w-[172px] sm:w-[230px] rounded-lg overflow-hidden border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex-shrink-0 bg-white">
            <Image
              src={src}
              alt={`Mockup ${i}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 230px, 300px"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Hero() {
  const [isVslOpen, setIsVslOpen] = useState(false);

  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-white flex items-center">
      <div className="mx-auto max-w-[1280px] w-full px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 pt-28 pb-6 lg:py-20 lg:grid-cols-2 lg:gap-20">

          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0
                }
              }
            }}
            className="z-10 flex flex-col items-center lg:items-start text-center lg:text-left pb-0"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 60, damping: 20 }
                }
              }}
              className="mb-4 text-left text-xs sm:text-sm font-sans text-gray-500"
            >
              Visitors lost today on low conversion: <span className="font-semibold text-black">1,204,101</span>
            </motion.div>

            <h1
              className="text-[22px] sm:text-[38px] md:text-[48px] lg:text-[56px] leading-[1.15] font-normal tracking-tight text-[#0A0A0E]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block whitespace-nowrap"
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  We Build Websites
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block whitespace-nowrap"
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }
                    }
                  }}
                >
                  That Sells and Increase
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block whitespace-nowrap"
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }
                    }
                  }}
                >
                  <span className="italic text-[#5C45FD] font-normal">2-5x Conversion.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 50, damping: 18 }
                }
              }}
              className="mt-5 max-w-lg text-sm text-[#6b7280] md:text-base mx-auto lg:mx-0 font-medium"
            >
              We build websites that increase 2-5x conversions in 3 weeks using our <span className="font-bold text-gray-900">SYNC Method™</span> - or we work for free until it does.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 50, damping: 18 }
                }
              }}
              className="w-full mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-[#5C45FD] px-5 py-4 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25"
              >
                Book Your Free Strategy Call
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <div className="relative w-full sm:w-auto">
                {/* Clipping Container for Peeking Card (Desktop Only) */}
                <div className="hidden md:block absolute bottom-[80%] right-0 -z-10 w-48 h-32 overflow-hidden pointer-events-none">
                  {/* Peeking Video Thumbnail Preview */}
                  <motion.div
                    animate={{
                      rotate: [0, 15, 15, 0],
                      y: [30, -30, -30, 30]
                    }}
                    style={{ transformOrigin: 'right top' }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                    className="absolute right-[20px] top-[116px] w-28 aspect-[4/3] rounded-xl bg-[#F5F3FF] border border-[#5C45FD]/20 shadow-[0_8px_24px_rgba(92,69,253,0.15)] overflow-hidden select-none"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5C45FD]/20 via-transparent to-white/80 flex items-center justify-center">
                      {/* Play Button Icon */}
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-[#5C45FD]/10 shadow-[0_4px_12px_rgba(92,69,253,0.15)]">
                        <Play className="text-[#5C45FD] fill-[#5C45FD] w-3 h-3 ml-0.5" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  onClick={() => setIsVslOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 py-4 sm:py-2.5 text-sm font-medium text-[#0A0A0E] transition-all hover:bg-gray-50"
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black/5 transition-colors group-hover:bg-black/10">
                    <Play className="h-2 w-2 fill-current" />
                  </div>
                  See How It Works
                </motion.button>
              </div>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 55, damping: 20 }
                }
              }}
              className="mt-5 text-[11px] font-medium text-[#9CA3AF] text-center lg:text-left"
            >
              Free 30-min call. No pitch, just clarity
            </motion.p>

            {/* Mobile Visuals - 2 horizontal scrolling rows */}
            <div className="-mx-6 w-[calc(100%+3rem)] md:-mx-12 md:w-[calc(100%+6rem)] flex flex-col gap-3 lg:hidden mt-8 overflow-hidden">
              <MockupRow images={column1Images} speed={25} />
              <MockupRow images={column2Images} speed={22} reverse={true} />
            </div>
          </motion.div>


          {/* Right Visuals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative hidden h-[500px] lg:block"
          >
            <div className="absolute inset-0 top-[-15%] z-0 h-[130%] w-full" style={{ transform: 'rotate(12deg) scale(1.1)' }}>


              <div className="grid grid-cols-2 gap-4 h-full">
                <MockupColumn images={column1Images} speed={45} />
                <MockupColumn images={column2Images} speed={40} reverse={true} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom fade for mockups only - covering right half */}
      <div className="absolute bottom-0 right-0 left-1/3 h-20 z-20 pointer-events-none hidden lg:block"
        style={{ background: 'linear-gradient(to top, #ffffff 17%, rgba(255, 255, 255, 0.7) 56%, rgba(255, 255, 255, 0))' }} />
      {/* VSL Modal Overlay */}
      <AnimatePresence>
        {isVslOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={() => setIsVslOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVslOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              <video
                src="/assets/TESTIMONIALS/Testimonial-1.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>







  );
}

