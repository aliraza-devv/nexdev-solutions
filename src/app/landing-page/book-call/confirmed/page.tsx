"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Navbar from "../../_components/Navbar";
import Testimonials from "../../_components/Testimonials";
import ReviewsMarquee from "../../_components/ReviewsMarquee";
import FinalCTA from "../../_components/FinalCTA";
import Results from "../../_components/Results";

export default function BookCallConfirmedPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />

      <section className="px-6 pb-16 pt-32 md:px-12 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[700px] text-center"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#5C45FD]/10 text-[#5C45FD]">
            <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
          </div>
          <h1
            className="text-[#0A0A0E] tracking-tighter"
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "clamp(28px, 5vw, 46px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
            }}
          >
            You&apos;re booked.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-zinc-500">
            Check your inbox for the calendar invite and call details. While you
            wait, here&apos;s a bit more proof we do what we say.
          </p>
        </motion.div>
      </section>
      <Results />
      <Testimonials />
      <ReviewsMarquee />
      <FinalCTA />
    </main>
  );
}
