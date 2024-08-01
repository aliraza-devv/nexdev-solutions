"use client";
import IconCloud from "@/components/IconCloud/IconCloud";
import FadeText from "@/components/Text/FadeText";
import SparklesText from "@/components/Text/SparklesText";
import { VelocityScroll } from "@/components/Text/VelocityScroll";
import WordPullUp from "@/components/Text/WordPullUp";
import React from "react";

const slugs = [
  "typescript",
  "javascript",
  "liquid",
  "react",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "github",
  "gitlab",
  "visualstudiocode",
  "mysql",
  "mongodb",
  "adobexd",
  "figma",
  "wordpress",
  "shopify",
  "remix",
];

const Technologies = () => {
  return (
    <div className="relatve mt-30">
      <h1 className="text-center">
        <SparklesText text="Technologies" />
      </h1>

      {/* <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Strength
      </h1> */}
      <div className="flex flex-col lg:flex-row relative justify-center w-full gap-10">
        <div className="mt-10 p-10 flex flex-col justify-start items-start w-full lg:w-[40%]">
          <WordPullUp
            className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-black dark:text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
            words="One step a Head"
          />
          <p className="text-lg sm:text-xl text-[#f5f5f5] mt-6 sm:mt-10">
            <span className="gradient-text font-semibold">
              NeXDev Solutions
            </span>{" "}
            use the best trending tech-stacks and technologies to fulfill your
            needs and outshine you from your competitors. NeXDev Solutions is a
            team of highly skilled and{" "}
            <span className="gradient-text font-semibold">
              experienced developers
            </span>{" "}
            who are always up to date with the latest technologies and trends.
            We use the best tools and technologies to deliver{" "}
            <span className="gradient-text font-semibold">
              high-quality and efficient solutions
            </span>{" "}
            that meet your business needs.
          </p>
        </div>
        <div className="relative flex h-full w-full lg:w-[50%] max-w-[38rem] items-center justify-center overflow-hidden rounded-lg bg-background px-6 sm:px-10 lg:px-20 pb-10 sm:pb-20 pt-6 sm:pt-8">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>

      {/* <VelocityScroll
        text="Let's Work Together."
        default_velocity={1}
        className="font-display text-center font-bold tracking-[-0.02em] heading-primary text-black drop-shadow-xl dark:text-white text-[8rem] mb-14 leading-[5rem]"
      /> */}
    </div>
  );
};

export default Technologies;
