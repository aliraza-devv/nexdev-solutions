"use client";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import React from "react";
import Image from "next/image";
import img1 from "../../public/Assets/images/Trish.jpeg";
import img2 from "../../public/Assets/images/Uzair.jpeg";
import img3 from "../../public/Assets/images/Sheraz.jpeg";
import img4 from "../../public/Assets/images/Naveed.jpg";
import img5 from "../../public/Assets/images//Najam.jpg";
import RetroGrid from "@/components/Backgrounds/RetroGrid";
import HorizontalLogoSlider from "@/components/HorizontalLogoSlider/HorizontalLogoSlider";
import { AnimatedTooltip } from "@/components/AnimatedTooltip/AnimatedTooltip";
import Link from "next/link";
import AnimatedGradientText from "@/components/Text/AnimatedGradientText";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const people = [
  {
    id: 1,
    name: "Trishelle",
    designation: "CEO & Founder",
    image: img1,
  },
  {
    id: 2,
    name: "Uzair Ahmad",
    designation: "CEO",
    image: img2,
  },
  {
    id: 3,
    name: "Sheraz Ali",
    designation: "CEO & Founder",
    image: img3,
  },
  {
    id: 4,
    name: "Naveed",
    designation: "CEO & Founder",
    image: img4,
  },
  {
    id: 5,
    name: "Najam Imran",
    designation: "CEO & Founder",
    image: img5,
  },
];

const Hero = () => {
  return (
    <>
      <RetroGrid />
      <div
        id="home"
        className=" flex flex-col justify-center items-center w-full h-[100%] side-gradient"
      >
        <div className="z-10 flex min-h-[15rem] mt-20 items-center justify-center">
          <AnimatedGradientText>
            <span className="inline animate-gradient bg-gradient-to-r from-[#a89bff] via-[#f5f5f5] to-[#5c45fd] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Aug
            </span>{" "}
            <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#a89bff] via-[#f5f5f5] to-[#5c45fd] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Only 5 Spots Left for the month
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-full md:w-4/5 flex flex-col justify-center items-center text-center px-4 md:px-0">
            <h1 className="z-10 text-white text-4xl sm:text-5xl heading-primary md:text-6xl lg:text-6xl xl:text-7xl font-bold mt-[-3rem]">
              <span className="gradient-text">Top 1% </span>web/app <br />
              Development Agency, <br />
              <span className="gradient-text">Helped 200+ Businesses</span>
            </h1>

            <p className="text-[#f5f5f5] mt-12 sub-font font-medium text-base sm:text-lg md:text-xl lg:text-2xl mb-14 z-10">
              We helped 200+ businesses convert{" "}
              <span className="gradient-text ">40%</span> of web traffic
              into paying <br className="hidden md:block" /> customers with our
              proven <span className="gradient-text">K-SHIGT mechanism</span>.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 w-full">
              <BtnPrimary
                url="https://cal.com/nexdevsolutions/discovery-call"
                title="Book a Free Call"
              />
              <Link href="#reviews">
                <div className="flex flex-row items-center">
                  <AnimatedTooltip items={people} />
                </div>
              </Link>
              <div className="flex flex-col text-start gap-1 text-white mt-4 md:mt-0 md:ml-[-2rem] z-10">
                <span className="font-bold text-lg md:text-xl">200+</span>
                <span className="font-light text-sm md:text-base">
                  Satisfied clients
                </span>
              </div>
            </div>
          </div>
        </div>

        <HorizontalLogoSlider />
      </div>
    </>
  );
};

export default Hero;
