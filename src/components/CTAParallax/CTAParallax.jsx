"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import BtnPrimary from "../Buttons/BtnPrimary";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { PulsatingButton } from "../Buttons/PulsatingButton";

export const CTAParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 100, bounce: 30 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      id="audit"
      ref={ref}
      className="h-[2710px] lg-1023:mb-[30px] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex gap-[200px] flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row gap-[200px] mb-20 space-x-20">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse gap-[200px] space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <>
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 sm-17:p-[0] w-full left-0 top-0">
        <h1 className="text-4xl px-6 md:text-7xl font-bold text-white heading-primary">
          Get a Free
          <br />
          Website Audit Now
        </h1>
        <p className="max-w-2xl sm-991:font-extralight px-6 text-base md:text-xl mt-8 text-neutral-200 mb-10">
          Get a free Audit of your website by NeXDev Solutions to know about
          your website&apos;s health. The audit will contain a deep study of
          your website including problems, SEO, design issues, their solutions,
          and much more.
        </p>
        d
      </div>
      <div className="max-w-7xl px-6 z-50 relative mx-auto w-full left-0 top-[-2.5rem] md:top-[-10rem]">
        <div className="w-[300px] max-sm:ml-[-10px] flex flex-col items-center justify-center">
          <PulsatingButton url="https://form.jotform.com/242006777431454">
            Get Your Free Website Audit
          </PulsatingButton>
          <div className="font-semibold mt-[8px] max-2xl:text-md text-md text-[#f5f5f5]">
            Hurry! Only a few spots left.
          </div>
        </div>
      </div>
    </>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      {/* <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      > */}
      <Image
        src={product.thumbnail}
        height={600}
        width={600}
        className="object-cover image-exception rounded-[1rem] absolute h-full w-[150%] inset-0"
        alt={product.title}
      />
      {/* </Link> */}
      <div className="absolute inset-0 h-full rounded-[1rem] w-[150%] opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 rounded-[1rem] left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
