import React from "react";
import WordPullUp from "@/components/Text/WordPullUp";
import RetroGrid from "@/components/Backgrounds/RetroGrid";
import { CardSpotlight } from "@/components/CardSpotlight/CardSpotlight";
import { RevealText } from "@/components/RevealText/RevealText";
import Announce from "../../public/Assets/icons/announce.gif";
import Image from "next/image";
import { PulsatingButton } from "@/components/Buttons/PulsatingButton";
import Process from "../../public/Assets/images/Process.png";

const Solution = () => {
  return (
    <>
      <RevealText
        className="heading-bold relative z-10"
        text="You only need a website optimized for high-conversion."
      />
      <div className="w-full  flex flex-col items-center  pt-10 sm-20:pt-20 h-full">
      <div className="w-full sm-20:w-[90vw]  flex justify-center mt-20 items-center">
        <div className="flex justify-between min-sm:p-[10px] min-sm:pt-[20px] sm-20:w-[100%] items-center border-[#5c45fd] border-2 flex-col rounded-[1rem] p-7 relative side-gradient w-[95%] sm:w-[80%] md:w-[70%]">
          {/* <RetroGrid className="mt-[-1.8rem] z-[-1]" /> */}
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-[#f5f5f5] heading-primary text-xl sm:text-2xl md:text-3xl flex justify-center items-center font-bold md:mt-5">
                The Solution:
              </h1>
              <WordPullUp
                className="text-3xl sm:text-6xl heading-bold tracking-[-0.02em] text-[#f5f5f5] md:leading-[4rem]"
                words="K-SIGHT"
              />
            </div>
            <div className="w-full sm:w-[50%] mt-10 sm:mt-0">
              <p className="text-[#f5f5f5] text-md sm:text-lg">
                We specialize in crafting high-converting landing pages,
                websites, sales funnels, and web apps for entrepreneurs, coaches,
                and consultants like you. <br /> <br />
                <span className="gradient-text text-2xl font-bold">
                  Our secret sauce?
                </span>{" "}
                <br /> <br />
                Conversion-driven design that follow psychology, design,
                marketing, copywriting rules which we have discovered with 8+
                years of research and development.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center z-10 w-full ">
            <div className="flex flex-col sm:flex-row gap-2 justify-evenly w-full">
              <CardSpotlight className="glassmorphism w-80 sm:w-96 mt-10 min-sm:w-[100%]">
                <h3 className="heading-primary flex gap-3 text-xl heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  <Image src={Announce} width={24} height={24} className="min-sm:hidden" alt="Icon" />
                  Design Meets Marketing
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  We combine our K-SIGHT mechanism with design and marketing
                  strategies to deliver high-converting websites built
                  specifically to grow your brand.
                </p>
              </CardSpotlight>
              <CardSpotlight className="glassmorphism w-80 sm:w-96 min-sm:w-[100%] mt-10">
                <h3 className="heading-primary flex gap-3  text-xl heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  <Image src={Announce} width={24} className="min-sm:hidden" height={24} alt="Icon" />
                  Boost Conversions
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  Using our K-SIGHT mechanism, we turn visitors into loyal
                  clients, helping your business grow with a focus on measurable
                  results.
                </p>
              </CardSpotlight>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-evenly w-full">
              <CardSpotlight className="glassmorphism w-80 sm:w-96 mt-10 min-sm:w-[100%]">
                <h3 className="heading-primary text-xl flex gap-3 heading-bold font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  <Image src={Announce} className="min-sm:hidden" width={24} height={24} alt="Icon" />
                  Brand Excellence
                </h3>
                <p className="text-neutral-200 heading-secondary mt-4 relative z-20 text-md">
                  We elevate your brand with custom branding, clear messaging,
                  and optimized design that meets your high standards and
                  attracts attention.
                </p>
              </CardSpotlight>
              <CardSpotlight className="glassmorphism w-80 sm:w-96 mt-10 min-sm:w-[100%]">
                <h3 className="heading-primary text-xl heading-bold flex gap-3 font-bold relative z-20 mt-2 text-[#f5f5f5]">
                  <Image src={Announce} className="min-sm:hidden" width={24} height={24} alt="Icon" />
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
          <div className="mt-20">
            <PulsatingButton url="https://cal.com/nexdevsolutions/discovery-call">
              Book Your Call Now
            </PulsatingButton>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-20">
        <Image
          src={Process}
          width={1000}
          height={1000}
          alt="How K-SIGHT works?"
        />
      </div>
      </div>
    </>
  );
};

export default Solution;
