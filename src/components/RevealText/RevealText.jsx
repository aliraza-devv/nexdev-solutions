"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export const RevealText = ({ text, className }) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-[80px] lg-3:pt-[80px]  mx-auto mb-[-10rem] flex h-[20%] max-w-5xl items-center bg-transparent px-[1rem]"
        }
      >
        <p
          ref={targetRef}
          className={
            "flex flex-wrap text-3xl font-bold text-white/20 md:p-8 md:text-6xl lg:p-10 lg:text-6xl xl:text-6xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"gradient-text"}>
        {children}
      </motion.span>
    </span>
  );
};
