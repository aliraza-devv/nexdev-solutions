"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLenisScrollTo } from "@/hooks/use-lenis-scroll-to";

export default function Navbar({
  ctaLabel = "Book Your Free Call",
  ctaHref = "/qualify",
}: {
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Results", href: "/#results" },
    { name: "The Math", href: "/#calculator" },
    { name: "FAQs", href: "/#faq" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          scrolled
            ? "mt-4 mx-4 md:mx-auto md:max-w-[1200px] bg-white/90 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-xl py-3"
            : "bg-white/40 backdrop-blur-md border-b border-black/5 py-4",
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-[1280px] flex items-center justify-between",
            scrolled ? "px-3 md:px-5" : "px-4 md:px-12",
          )}
        >
          <div className="flex items-center gap-2">
            <Link
              href="/"
              data-cursor="button"
              className="relative h-7 w-36 md:h-8 md:w-40"
            >
              <Image
                src="/assets/nexdev-full-logo-black.png"
                alt="NeXDev Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                data-cursor="button"
                className="text-[15px] font-medium text-[#0A0A0E]/80 transition-colors hover:text-[#5C45FD]"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link href={ctaHref} data-cursor="cta">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-[#5C45FD] px-5 py-2 text-[14px] font-bold text-white shadow-lg shadow-[#5C45FD]/20 transition-all hover:bg-[#4a36e0] md:px-6 md:py-2.5"
              >
                {ctaLabel}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Burger Menu Icon */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              data-cursor="button"
              className="p-1.5 rounded-full text-[#0A0A0E]/80 hover:text-[#5C45FD] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C45FD] focus-visible:ring-offset-2"
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Side Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
            />

            {/* Side Drawer Panel (covers 80% width) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 z-[70] h-full w-[80vw] max-w-[360px] bg-white p-6 shadow-2xl flex flex-col justify-between border-l border-black/5 lg:hidden"
            >
              <div>
                {/* Header inside Drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-black/5">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="relative h-6 w-32"
                  >
                    <Image
                      src="/assets/nexdev-full-logo-black.png"
                      alt="NeXDev Logo"
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full text-[#0A0A0E]/70 hover:text-[#5C45FD] transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5C45FD] focus-visible:ring-offset-2"
                    aria-label="Close Menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Vertical Stacked Menu Links */}
                <div className="mt-8 flex flex-col gap-5">
                  {navLinks.map((item, idx) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          setIsOpen(false);
                          handleAnchorClick(e, item.href);
                        }}
                        className="block py-2 text-[15px] font-semibold text-[#0A0A0E]/70 transition-colors hover:text-[#5C45FD]"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Drawer CTA Button */}
              <div className="pt-6 border-t border-black/5">
                <Link href={ctaHref} onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-full bg-[#5C45FD] py-3 text-[14px] font-bold text-white shadow-lg shadow-[#5C45FD]/20 transition-all hover:bg-[#4a36e0]"
                  >
                    {ctaLabel}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
