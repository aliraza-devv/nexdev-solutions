import React from "react";
import WordPullUp from "@/components/Text/WordPullUp";
import { FeaturedSection } from "@/components/Cards/FeaturedSection";
import RetroGrid from "@/components/Backgrounds/RetroGrid";
import { CardSpotlight } from "@/components/CardSpotlight/CardSpotlight";
import { RevealText } from "@/components/RevealText/RevealText";
import man from "../../public/Assets/3dimages/man.png";
import Image from "next/image";

const Solution = () => {
  return (
    <>
      <RevealText
        className="heading-bold"
        text="You only need a design optimed for high-conversion."
      />
      <div className="w-full flex justify-center items-center mt-20">
        <div className="flex justify-between items-center border-[#5c45fd] border-2 flex-col rounded-[1rem] p-7 relative side-gradient w-[70%]">
          {/* <RetroGrid className="mt-[-1.8rem] z-[-1]" /> */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-[#f5f5f5] heading-primary text-3xl flex justify-center items-center font-bold mt-60 md:mt-5">
                The Solution:
              </h1>
              <WordPullUp
                className="text-6xl font-bold tracking-[-0.02em] text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
                words="K-SIGHT Mechanism"
              />
            </div>
            <div className="w-[50%]">
              <p className="text-[#f5f5f5] text-lg">
                We specialize in crafting high-converting landing pages,
                websites, and sales funnels for entrepreneurs, coaches, and
                consultants like you. <br /> <br />
                <span className="gradient-text text-2xl font-bold">
                  Our secret sauce?
                </span>{" "}
                <br /> <br />
                Conversion-driven design that follow design, marketing,
                copywriting rules which we have discovered with 8+ years of
                research and development.
              </p>
            </div>
          </div>
          <div className="flex flex-col z-10 w-full">
            <div className="flex justify-evenly w-full">
              <CardSpotlight className="glassmorphism w-96 mt-10">
                <h3 className="heading-primary text-xl heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  Design Meets Marketing
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  We combine our K-SIGHT mechanism with design and marketing
                  strategies to deliver high-converting websites built
                  specifically to grow your brand.
                </p>
              </CardSpotlight>
              <CardSpotlight className="glassmorphism w-96 mt-10">
                <h3 className="heading-primary text-xl heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  Boost Conversions
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  Using our K-SIGHT mechanism, we turn visitors into loyal
                  clients, helping your business grow with a focus on measurable
                  results.
                </p>
              </CardSpotlight>
            </div>
            <div className="flex justify-evenly w-full">
              <CardSpotlight className="glassmorphism w-96 mt-10">
                <h3 className="heading-primary text-xl heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  Brand Excellence
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  We elevate your brand with custom branding, clear messaging,
                  and optimized design that meets your high standards and
                  attracts attention.
                </p>
              </CardSpotlight>
              <CardSpotlight className="glassmorphism w-96 mt-10">
                <h3 className="heading-primary text-xl heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  Custom Approach
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  No cookie-cutter solutions. Every website and funnel is
                  customized to align with your business goals and reflect your
                  unique brand vision.
                </p>
              </CardSpotlight>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Solution;
