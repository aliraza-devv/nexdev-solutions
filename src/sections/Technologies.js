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
    <div className="relative max-2xl:mt-[270px] 5xl:mt-[750px] sm-17:mt-[170%] sm-18:mt-[800px] sm-19:mt-[850px]">
      <h1 className="text-center mt-20">
        <SparklesText text="Technologies" />
      </h1>
      <div className="flex flex-col lg:flex-row relative items-center md:items-start justify-center w-full gap-10">
        <div className="mt-10 p-10 flex flex-col justify-start items-start w-full lg:w-[40%]">
          <WordPullUp
            className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
            words="One step a Head"
          />
          <p className="text-lg sub-font sm:text-xl text-[#f5f5f5] mt-6 sm:mt-10">
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
        <div className="relative flex h-full w-full lg:w-[50%] max-w-[38rem] items-center justify-center overflow-hidden rounded-lg px-6 sm:px-10 lg:px-20 pb-10 sm:pb-20 pt-6 sm:pt-8">
          <IconCloud iconSlugs={slugs} />
        </div>
      </div>
    </div>
  );
};

export default Technologies;
