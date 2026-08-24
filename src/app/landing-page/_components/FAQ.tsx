"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "I already have a website. Do I need a full rebuild?",
    a: "Not always. We start every project with a SYNC Audit that shows exactly where visitors drop off. Sometimes the fix is a rebuild. Sometimes it's restructuring what you already have. You'll know which one before you spend anything.",
  },
  {
    q: "I don't have a website yet. Can you build one from scratch?",
    a: "Yes. About half our projects are new builds. The process is the same: we start with the audit of your business and your competitors, then build the site in the SYNC order, so it sells from day one instead of looking good and doing nothing.",
  },
  {
    q: "What platforms do you build on?",
    a: "WordPress, Shopify, custom code, and most no-code tools. The platform follows the project, not the other way around. We'll recommend the right one during the audit.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects are live in 3 to 6 weeks. You'll get a progress update every 2 to 3 days, so nothing goes quiet. If we're behind, you'll know before we are.",
  },
  {
    q: "What does it cost?",
    a: "Projects start at $500 and go up based on scope. You'll get a fixed quote after the audit call, not a surprise invoice at the end. If you're under $500, we'll point you to the right starting option instead.",
  },
  {
    q: "Can you guarantee results?",
    a: "No, and you should be cautious of anyone who does without defining the terms. What we can tell you: our last four builds averaged a 51% conversion lift, and our process is designed around measuring before and after. If the numbers don't move, we keep working until they do.",
  },
  {
    q: "What if I already have a designer or developer?",
    a: "That's fine. We can run the SYNC Audit and hand you the conversion strategy, and your team handles the implementation. We also work alongside existing teams when it makes sense.",
  },
  {
    q: "Do I own everything you build?",
    a: "Yes. Code, design, copy, all of it. No lock-in, no monthly dependency, no \"you lose the site if you leave.\" It's yours on day one.",
  },
  {
    q: "What happens on the first call?",
    a: "We ask about your business, your traffic, and what's not working. Then we tell you what we'd do, in plain language, with no jargon. If we're not the right fit, we'll say so. The call is 30 minutes, no pitch deck.",
  },
  {
    q: "I've been burned by an agency before. How is this different?",
    a: "Most of the 200+ projects behind NeXDev are rebuilds for people in exactly that situation. The difference is the order we build in. We figure out why visitors leave before anyone opens a design tool, so the site sells first and looks good second, not the other way around.",
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const primaryFont = "Arial, sans-serif";
  const secondaryFont = "Arial, sans-serif";

  return (
    <section
      id="faq"
      className="relative bg-[#0A0A0E] pt-20 pb-20 lg:py-40 overflow-hidden"
    >
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
                  staggerChildren: 0.08,
                },
              },
            }}
            className="text-white tracking-tighter font-normal"
            style={{
              fontFamily: primaryFont,
              fontSize: "clamp(28px, 5vw, 46px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            <span
              className="block overflow-hidden pb-1"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text="The questions"
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "100%" },
                  visible: {
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                The questions
              </motion.span>
            </span>
            <span
              className="block overflow-hidden pb-1"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text="you're already thinking."
            >
              <motion.span
                className="block text-white/20"
                variants={{
                  hidden: { y: "100%" },
                  visible: {
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
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
                data-cursor="button"
                className="flex w-full items-center justify-between gap-8 group"
              >
                <span
                  className={`text-left text-[19px] md:text-xl lg:text-2xl font-medium tracking-tight transition-all duration-300 ${
                    activeIdx === i
                      ? "text-white opacity-100"
                      : "text-white opacity-70 group-hover:opacity-100"
                  }`}
                  style={{ fontFamily: primaryFont }}
                >
                  {f.q}
                </span>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${activeIdx === i ? "bg-[#5C45FD] border-[#5C45FD] text-white" : "border-white/10 text-white/40"}`}
                >
                  {activeIdx === i ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
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
