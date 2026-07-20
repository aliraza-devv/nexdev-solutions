'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X } from 'lucide-react';

const videoTestimonials = [
  {
    id: 1,
    name: "Trishelle",
    role: "CEO, Examanagement",
    quote: "They didn't build us a website. They built us a lead generation machine. Our pipeline has never been this full.",
    videoUrl: "/assets/TESTIMONIALS/Testimonial-1.mp4"
  },
  {
    id: 2,
    name: "Sheraz Ali",
    role: "CEO, Seller Goals",
    quote: "The SYNC method actually works. The strategy behind the design is what sets them apart from every other agency.",
    videoUrl: "/assets/TESTIMONIALS/Testimonial-2.MP4"
  },
  {
    id: 2.1,
    name: "Najam Imran",
    role: "Founder, AlphaStream",
    quote: "Hit every deadline. Exceeded expectations on every level. The conversion results have been incredible.",
    videoUrl: ""
  },
  {
    id: 4,
    name: "Sarah Jensen",
    role: "Director, Flux Media",
    quote: "Professional, creative, and data-driven. They understood our brand immediately and delivered a world-class site.",
    videoUrl: ""
  },
  {
    id: 5,
    name: "David Chen",
    role: "Founder, ScaleUp",
    quote: "Investor-facing site built on Yield Narrative. Full investor target hit within the first month. 10/10.",
    videoUrl: ""
  }
];

export default function Testimonials() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileVideoId, setMobileVideoId] = useState<number | null>(null);

  const activeIndex = videoTestimonials.findIndex(v => v.id === activeId);
  const activeVideo = activeId !== null ? videoTestimonials[activeIndex] : null;

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = cardWidth + cardGap;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkCanScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScroll(scrollWidth > clientWidth + 2);
    }
  };

  useEffect(() => {
    checkCanScroll();
    window.addEventListener('resize', checkCanScroll);
    return () => window.removeEventListener('resize', checkCanScroll);
  }, [activeId]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setActiveId(null);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && mobileVideoId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, mobileVideoId]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveId(videoTestimonials[activeIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex < videoTestimonials.length - 1) {
      setActiveId(videoTestimonials[activeIndex + 1].id);
    }
  };

  const handleSelect = (id: number) => {
    if (isMobile) {
      setMobileVideoId(id);
    } else {
      setActiveId(id);
    }
  };

  // Consistent card width and spacing
  const cardWidth = 230;
  const cardGap = 24;

  const primaryFont = 'Arial, sans-serif';
  const secondaryFont = 'Arial, sans-serif';

  return (
    <section id="testimonials" className="relative bg-[#0A0A0E] pt-24 pb-12 lg:pt-40 lg:pb-12 overflow-hidden">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-12 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-5 md:mb-24">
          <div>
            <div 
              className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#5C45FD]/40 bg-[#5C45FD]/10 text-[#C1B9FF] text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
              style={{ fontFamily: secondaryFont }}
            >
              FROM CLIENTS
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
              className="text-white leading-[1.1] tracking-tighter font-medium"
              style={{ 
                fontFamily: primaryFont,
                fontSize: 'clamp(28px, 5vw, 46px)',
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
                  From business owners.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block text-white/30"
                  variants={{
                    hidden: { y: "100%" },
                    visible: {
                      y: 0,
                      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                    }
                  }}
                >
                  Not us.
                </motion.span>
              </span>
            </motion.h2>
          </div>

          {/* Mobile Navigation Arrows (Stacked below in column flow, only if overflowing) */}
          {activeId === null && canScroll && (
            <div className="flex md:hidden gap-3 self-start flex-shrink-0">
              <button 
                onClick={() => scrollTestimonials('left')}
                className="w-12 h-12 rounded-full bg-[#121216]/90 border border-white/[0.08] flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollTestimonials('right')}
                className="w-12 h-12 rounded-full bg-[#121216]/90 border border-white/[0.08] flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Main Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch min-h-[500px]">
          
          {/* Left Side: Video Carousel Area */}
          <motion.div 
            animate={{ width: activeId ? '50%' : '100%' }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={`relative flex items-center justify-center min-h-[500px] group/container ${activeId !== null ? 'overflow-hidden' : ''}`}
          >
            {/* Edge Gradients for theater mode */}
            <AnimatePresence>
              {activeId !== null && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0A0A0E] to-transparent z-40 pointer-events-none" 
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0A0A0E] to-transparent z-40 pointer-events-none" 
                  />
                </>
              )}
            </AnimatePresence>

            {/* Left and Right Floating Nav Arrows (Always visible, desktop only, hidden if all fit) */}
            {activeId === null && canScroll && (
              <>
                <button 
                  onClick={() => scrollTestimonials('left')}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#121216]/90 hover:bg-[#161622]/95 border border-white/[0.08] hover:border-[#5C45FD]/50 items-center justify-center text-white backdrop-blur-md z-50 transition-all opacity-100 shadow-xl hover:scale-105 duration-300 cursor-pointer hidden md:flex"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollTestimonials('right')}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#121216]/90 hover:bg-[#161622]/95 border border-white/[0.08] hover:border-[#5C45FD]/50 items-center justify-center text-white backdrop-blur-md z-50 transition-all opacity-100 shadow-xl hover:scale-105 duration-300 cursor-pointer hidden md:flex"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <div 
              ref={scrollContainerRef}
              className={`
                transition-all duration-700 ease-in-out [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                ${activeId === null 
                  ? '-mx-6 md:-mx-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] flex justify-start md:justify-center gap-6 overflow-x-auto scroll-smooth pb-4 px-6 md:px-12 select-none' 
                  : 'absolute flex items-center gap-6'
                }
              `}
              style={activeId !== null ? { 
                transform: `translateX(${(2 - activeIndex) * (cardWidth + cardGap)}px)` 
              } : {}}
            >
              {videoTestimonials.map((v, i) => {
                const isActive = activeId === v.id;
                const isSelected = activeId !== null;
                
                return (
                  <motion.div
                    key={v.id}
                    onClick={() => handleSelect(v.id)}
                    animate={{
                      opacity: isSelected ? (isActive ? 1 : 0.6) : 1,
                    }}
                    style={{ width: `${cardWidth}px` }}
                    className={`
                      group relative aspect-[9/16] cursor-pointer overflow-hidden border border-white/5 shadow-2xl rounded-[14px] flex-shrink-0 transition-all duration-500
                    `}
                  >
                    {/* Render active video player inside card for desktop */}
                    {!isMobile && isActive && v.videoUrl ? (
                      <div 
                        className="absolute inset-0 z-30 bg-black"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <video
                          src={v.videoUrl}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        {/* Background Thumbnail: video start frame if present, fallback to static design */}
                        {v.videoUrl ? (
                          <video 
                            src={v.videoUrl}
                            preload="metadata"
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#1A1A24]">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#5C45FD_0%,_transparent_70%)]" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#5C45FD] transition-all duration-300 ${isActive ? 'bg-[#5C45FD]' : ''}`}>
                            <Play className="text-white fill-white ml-0.5 w-3 h-3" />
                          </div>
                        </div>
                      </>
                    )}

                    <div className={`absolute bottom-6 left-6 right-6 z-20 transition-opacity duration-300 ${isSelected ? 'opacity-0' : 'opacity-100'}`}>
                      <div 
                        className="text-white text-sm lg:text-base font-medium mb-0.5 leading-tight"
                        style={{ fontFamily: primaryFont }}
                      >
                        {v.name}
                      </div>
                      <div 
                        className="text-white/40 text-[10px] lg:text-[10px] font-medium uppercase tracking-wider"
                        style={{ fontFamily: secondaryFont }}
                      >
                        {v.role}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side: Info Panel */}
          <AnimatePresence>
            {activeId !== null && activeVideo && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '50%', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="hidden lg:flex flex-col justify-center relative overflow-hidden"
              >
                <div className="w-[600px] pl-20 pr-12 flex-shrink-0">
                  <button 
                    onClick={() => setActiveId(null)}
                    className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <img 
                    src="/assets/testimonial-icon.png" 
                    alt="quote icon" 
                    className="w-12 h-12 mb-8 object-contain"
                  />
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 
                        className="text-white text-xl lg:text-[22px] font-normal leading-[1.6] tracking-tight mb-12 italic opacity-80"
                        style={{ fontFamily: primaryFont }}
                      >
                        &quot;{activeVideo.quote}&quot;
                      </h3>
                      
                      <div className="mb-12">
                        <div 
                          className="text-white text-xl font-medium mb-1"
                          style={{ fontFamily: primaryFont }}
                        >
                          {activeVideo.name}
                        </div>
                        <div 
                          className="text-white/40 text-sm font-medium uppercase tracking-widest"
                          style={{ fontFamily: secondaryFont }}
                        >
                          {activeVideo.role}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex gap-4">
                    <button 
                      onClick={handlePrev}
                      disabled={activeIndex === 0}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={handleNext}
                      disabled={activeIndex === videoTestimonials.length - 1}
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* Mobile Video Player Modal */}
      <AnimatePresence>
        {isMobile && mobileVideoId !== null && (() => {
          const videoItem = videoTestimonials.find(v => v.id === mobileVideoId);
          if (!videoItem) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[9999] flex items-center justify-center p-4"
              onClick={() => setMobileVideoId(null)}
            >
              <button 
                onClick={() => setMobileVideoId(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-50 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative w-full max-w-[400px] aspect-[9/16] bg-[#121216] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {videoItem.videoUrl ? (
                  <video 
                    src={videoItem.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#121216] to-[#1A1A24] px-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
                      <Play className="w-6 h-6 text-[#5C45FD]/60" />
                    </div>
                    <h4 className="text-white text-sm font-semibold mb-1" style={{ fontFamily: primaryFont }}>
                      Video Testimonial
                    </h4>
                    <p className="text-white/40 text-xs">
                      Coming soon...
                    </p>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none bg-gradient-to-t from-black/95 via-black/45 to-transparent p-6 pb-8">
                  <div 
                    className="text-white text-base font-semibold mb-0.5"
                    style={{ fontFamily: primaryFont }}
                  >
                    {videoItem.name}
                  </div>
                  <div 
                    className="text-white/60 text-[11px] font-medium uppercase tracking-wider"
                    style={{ fontFamily: secondaryFont }}
                  >
                    {videoItem.role}
                  </div>
                  <p className="text-white/80 text-xs mt-2 italic leading-relaxed font-normal text-wrap">
                    &quot;{videoItem.quote}&quot;
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
