"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLenisScrollTo } from "@/hooks/use-lenis-scroll-to";
import FooterWatermarkReveal from "./FooterWatermarkReveal";

// lucide-react has no WhatsApp glyph, so this is a plain inline SVG of the
// standard logo. currentColor keeps it in sync with the other social icons'
// text-zinc-400 / hover:text-white treatment without a separate fill prop.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.05.31-3.5-.73-2.96-1.25-4.83-4.25-4.97-4.45-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2.01.89 2.16.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.29.15.47.13.64-.08.17-.2.72-.84.92-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.94.29.14.48.22.55.34.07.13.07.72-.17 1.4Z" />
    </svg>
  );
}

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
                {/* Generic stock avatars, not real client photos - decorative
                    filler for the "200+ Satisfied clients" stat next to them,
                    which already carries the actual information. alt="" so
                    a screen reader doesn't announce "client" five times. */}
                <Image
                  src={`https://i.pravatar.cc/100?img=${i + 10}`}
                  alt=""
                  width={40}
                  height={40}
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

        {/* Main Headline - same block-overflow-hidden slide-up reveal as the
            default heading below, just as one unit instead of hard-coded
            per-line splits, since a case study's custom headline is a
            dynamic string rather than fixed copy. */}
        {headline ? (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="tracking-tighter text-white max-w-5xl font-medium text-center"
            style={{
              fontFamily: primaryFont,
              fontSize: "clamp(36px, 6.2vw, 64px)",
              lineHeight: "1.1",
            }}
          >
            <span
              className="block overflow-hidden pb-1"
              data-cursor="text"
              data-cursor-on-dark=""
              data-text={flattenToText(headline)}
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                {headline}
              </motion.span>
            </span>
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
          <Link href="/landing-page/qualify" data-cursor="cta" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#5C45FD] px-5 py-3 sm:py-2.5 text-sm font-bold text-white shadow-lg shadow-[#5C45FD]/25 transition-all hover:bg-[#4a36e0]"
              style={{ fontFamily: primaryFont }}
            >
              Book Your Free Call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>

          {/* items-start, not items-center: with items-center the dot
              vertically centers against the whole wrapped 2-line block
              on mobile, landing in the gap between the lines instead of
              next to either one. Top-aligning it against the first line
              (plus a hair of margin to sit on its cap-height, not its
              very top edge) is what actually reads as "aligned". */}
          <div className="flex items-start justify-center gap-2.5 px-4 text-center max-w-[290px] sm:max-w-none">
            <div className="mt-[3px] h-1.5 w-1.5 rounded-full bg-[#22C55E] shrink-0 shadow-[0_0_8px_#22C55E] sm:mt-[5px]" />
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
                  sizes="176px"
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
                <Link
                  href="https://wa.me/923081992088"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="text-zinc-400 hover:text-white transition-colors p-2.5"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </Link>
                <Link
                  href="mailto:info@nexdevsolutions.net"
                  data-cursor="button"
                  className="text-zinc-400 hover:text-white transition-colors p-2.5"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
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
                  href="https://wa.me/923081992088"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="hover:text-white transition-colors py-1.5 px-1"
                  aria-label="Chat on WhatsApp: +92 308 199 2088"
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

          {/* Huge NEXDEV Watermark, each letter rises into place on scroll into view */}
          <div
            className="w-full mt-12 mb-0 select-none pointer-events-none overflow-hidden flex justify-center"
            style={{ aspectRatio: "1440 / 220" }}
          >
            <FooterWatermarkReveal />
          </div>
        </div>
      </div>
    </footer>
  );
}
