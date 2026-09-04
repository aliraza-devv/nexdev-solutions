"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { logo: "/assets/partner-1.png", name: "Reality Cheque", metric: "26X", label: "ROAS" },
  { logo: "/assets/partner-2.png", name: "Partner logo", metric: "3.2%", label: "Conversion" },
  { logo: "/assets/partner-3.png", name: "OutSouth Tech", metric: "+180%", label: "Growth" },
  { logo: "/assets/partner-4.png", name: "Bamper", metric: "60 days", label: "Sold-out" },
  { logo: "/assets/partner-5.png", name: "The Elemental Shop", metric: "+147%", label: "Leads" },
  { logo: "/assets/partner-6.png", name: "Partner logo", metric: "+83%", label: "Growth" },
  { logo: "/assets/partner-7.svg", name: "Clenvia", metric: "+57%", label: "Conversion" },
  { logo: "/assets/partner-8.png", name: "Shevat Vitamins", metric: "+51.3%", label: "Conversion" },
];

export default function LogosStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      className="relative overflow-hidden bg-[#0A0A0E] py-8 border-y border-white/[0.12]"
    >
      <div className="flex w-fit overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex items-center gap-6 whitespace-nowrap px-6"
        >
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="group flex h-20 items-stretch overflow-hidden rounded-xl border border-white/[0.08] bg-[#121216] transition-all hover:border-white/[0.18] hover:bg-[#16161e] shadow-lg shadow-black/35"
            >
              {/* Left Panel: Logo (Square & Full-Bleed) */}
              <div className="relative aspect-square h-full bg-black overflow-hidden border-r border-white/[0.08]">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="80px"
                  className="object-cover opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>

              {/* Right Panel: Metrics (20% Larger) */}
              <div className="flex flex-col justify-center bg-white/[0.01] px-8 py-3">
                <span className="text-2xl font-bold tracking-tight text-white leading-tight">
                  {partner.metric}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#5C45FD]">
                  {partner.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0E] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0E] to-transparent z-10" />
    </motion.section>
  );
}
