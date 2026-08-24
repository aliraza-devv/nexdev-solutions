"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenisScrollTo } from "@/hooks/use-lenis-scroll-to";
import FooterWatermarkFill from "./FooterWatermarkFill";

function flattenToText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenToText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return flattenToText(props.children);
  }
  return "";
}

export default function FinalCTA({
  headline,
  subline,
}: {
  headline?: string;
  subline?: string;
} = {}) {
  const primaryFont = "Arial, sans-serif";
  const secondaryFont = '"Inter", sans-serif';
  const pathname = usePathname();
  const scrollTo = useLenisScrollTo();

  // Same-page hash links ease there with Lenis. A hash link to a different
  // route falls through to Next's normal navigation, then SmoothScroll
  // picks up the hash once the new route has mounted.
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const [path, hash] = href.split("#");
    if (!hash || path !== pathname) return;
    e.preventDefault();
    scrollTo(`#${hash}`);
  };

  return (
    <footer id="cta" className="relative pt-20 overflow-hidden isolate">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#0A0A0E] -z-20" />

      <div className="mx-auto max-w-[1280px] px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Satisfied Clients Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-[#0A0A0E] overflow-hidden bg-gray-800"
              >
                <img
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt="client"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="text-white text-sm font-bold leading-none mb-1">
              200+
            </div>
            <div className="text-white/40 text-[10px] uppercase tracking-wider font-medium">
              Satisfied clients
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        {headline ? (
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="tracking-tighter text-white max-w-5xl font-medium text-center"
            style={{
              fontFamily: primaryFont,
              fontSize: "clamp(36px, 6.2vw, 64px)",
              lineHeight: "1.1",
            }}
            data-cursor="text"
            data-cursor-on-dark=""
            data-text={flattenToText(headline)}
          >
            {headline}
          </motion.h2>
        ) : (
          <>
            {/* Mobile Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="tracking-tighter text-white max-w-5xl font-medium text-center block md:hidden"
              style={{
                fontFamily: primaryFont,
                fontSize: "clamp(36px, 6.2vw, 64px)",
                lineHeight: "1.1",
              }}
            >
              <span className="inline-block" data-cursor="text" data-cursor-on-dark="" data-text="The right">
                The right
              </span>{" "}
              <span
                className="inline-block italic text-[#5C45FD]"
                data-cursor="text"
                data-cursor-on-dark=""
                data-text="website"
              >
                website
              </span>{" "}
              <span
                className="inline-block"
                data-cursor="text"
                data-cursor-on-dark=""
                data-text="turns visitors into customers. Let's build yours."
              >
                turns visitors into customers. Let&apos;s build yours.
              </span>{" "}
            </motion.h2>

            {/* Desktop Heading */}
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
              className="tracking-tighter text-white max-w-5xl font-medium text-center hidden md:block"
              style={{
                fontFamily: primaryFont,
                fontSize: "clamp(36px, 6.2vw, 64px)",
                lineHeight: "1.1",
              }}
            >
              <span className="block overflow-hidden pb-1">
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
                  <span className="inline-block" data-cursor="text" data-cursor-on-dark="" data-text="The right">
                    The right
                  </span>{" "}
                  <span
                    className="inline-block italic text-[#5C45FD]"
                    data-cursor="text"
                    data-cursor-on-dark=""
                    data-text="website"
                  >
                    website
                  </span>{" "}
                  <span
                    className="inline-block"
                    data-cursor="text"
                    data-cursor-on-dark=""
                    data-text="turns visitors"
                  >
                    turns visitors
                  </span>
                </motion.span>
              </span>
              <span
                className="block overflow-hidden pb-1"
                data-cursor="text"
                data-cursor-on-dark=""
                data-text="into customers. Let's build"
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
                  into customers. Let&apos;s build
                </motion.span>
              </span>
              <span
                className="block overflow-hidden pb-1"
                data-cursor="text"
                data-cursor-on-dark=""
                data-text="yours"
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
                  yours{" "}
                  {/* <span className="italic text-white/30">don&apos;t leave.</span> */}
                </motion.span>
              </span>
            </motion.h2>
          </>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg lg:text-xl font-normal text-white/60 max-w-2xl text-center leading-relaxed"
          style={{ fontFamily: secondaryFont }}
        >
          {subline ?? (
            <>
              30 minutes. No pitch. Just a clear look at what&apos;s holding{" "}
              <br className="hidden lg:block" />
              your site back, and what to do about it.
            </>
          )}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col items-center gap-8 w-full max-w-md sm:max-w-none"
        >
          <Link
            href="/landing-page/qualify"
            data-cursor="cta"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#5C45FD] px-7 py-4 text-base font-bold text-white transition-all hover:bg-[#4a36e0] hover:scale-105 shadow-xl shadow-[#5C45FD]/20"
            style={{ fontFamily: primaryFont }}
          >
            Book Your Free Strategy Call
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center justify-center gap-2.5 px-4 text-center max-w-[290px] sm:max-w-none">
            <div className="h-1.5 w-1.5 rounded-full bg-[#22C55E] shrink-0 shadow-[0_0_8px_#22C55E]" />
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.08em] sm:tracking-[0.1em] text-white/80 uppercase leading-relaxed text-center">
              4 to 6 spots open per month. Currently accepting new clients.
            </span>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="mt-12 md:mt-32 w-full border-t border-white/5 pt-12 md:pt-16">
          {/* Main Footer Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-16 text-left w-full">
            {/* Column 1: Brand (Logo & Tagline & Socials) */}
            <div className="col-span-1 md:col-span-6 flex flex-col items-start gap-4">
              <Link href="/" data-cursor="button" className="relative h-10 w-44">
                <Image
                  src="/assets/nexdev-full-logo.png"
                  alt="NeXDev Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </Link>
              <p
                className="text-zinc-400 text-sm max-w-sm mt-3 leading-relaxed"
                style={{ fontFamily: secondaryFont }}
              >
                Engineering high-converting digital experiences for ambitious
                brands.
              </p>

              {/* Social Links Side-by-Side (Icons only) */}
              <div className="flex gap-2 -ml-2.5 mt-4">
                <Link
                  href="https://www.linkedin.com/company/nexdev-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="text-zinc-400 hover:text-white transition-colors p-2.5"
                  aria-label="Linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/nexdevsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="text-zinc-400 hover:text-white transition-colors p-2.5"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="col-span-1 md:col-span-3 flex flex-col items-start gap-4">
              <div
                className="text-[11px] font-bold text-[#5C45FD] uppercase tracking-[0.2em] mb-2"
                style={{ fontFamily: secondaryFont }}
              >
                Quick Links
              </div>
              <div
                className="flex flex-col gap-1 -ml-1 text-sm font-medium text-zinc-300"
                style={{ fontFamily: secondaryFont }}
              >
                <Link
                  href="/landing-page/case-studies"
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                >
                  Case studies
                </Link>
                <Link
                  href="/landing-page#testimonials"
                  onClick={(e) => handleAnchorClick(e, "/landing-page#testimonials")}
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                >
                  Testimonials
                </Link>
                <Link
                  href="/landing-page#how-it-works"
                  onClick={(e) => handleAnchorClick(e, "/landing-page#how-it-works")}
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                >
                  Our Process
                </Link>
                <Link
                  href="/landing-page#faq"
                  onClick={(e) => handleAnchorClick(e, "/landing-page#faq")}
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                >
                  FAQs
                </Link>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div className="col-span-1 md:col-span-3 flex flex-col items-start gap-4">
              <div
                className="text-[11px] font-bold text-[#5C45FD] uppercase tracking-[0.2em] mb-2"
                style={{ fontFamily: secondaryFont }}
              >
                Contact
              </div>
              <div
                className="flex flex-col gap-1 -ml-1 text-sm font-medium text-zinc-300"
                style={{ fontFamily: secondaryFont }}
              >
                <Link
                  href="mailto:info@nexdevsolutions.net"
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                >
                  info@nexdevsolutions.net
                </Link>
                <Link
                  href="tel:+923081992088"
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                >
                  +92 308 199 2088
                </Link>
              </div>
            </div>
          </div>

          {/* Horizontal Divider Line */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Bottom Row: Legal */}
          <div
            className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pb-8 text-[10px] font-semibold tracking-wider text-zinc-500"
            style={{ fontFamily: secondaryFont }}
          >
            <div>© 2026 NEXDEV SOLUTIONS. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-6">
              <Link
                href="/landing-page/privacy-policy"
                data-cursor="button"
                className="hover:text-white transition-colors py-2 px-1"
              >
                Privacy Policy
              </Link>
              <Link
                href="/landing-page/terms-and-conditions"
                data-cursor="button"
                className="hover:text-white transition-colors py-2 px-1"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Huge NEXDEV Watermark, fills purple like water on scroll into view */}
          <div className="w-full mt-12 mb-0 select-none pointer-events-none overflow-hidden flex justify-center">
            <FooterWatermarkFill />
          </div>
        </div>
      </div>
    </footer>
  );
}
