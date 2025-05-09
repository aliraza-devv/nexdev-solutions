"use client";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import React from "react";
import Image from "next/image";
import img1 from "../../public/Assets/images/Trish.jpeg";
import img2 from "../../public/Assets/images/Uzair.jpeg";
import img3 from "../../public/Assets/images/Sheraz.jpeg";
import img4 from "../../public/Assets/images/Naveed.jpg";
import img5 from "../../public/Assets/images//Najam.jpg";
import arrow from "../../public/Assets/graphics/arrow0.png";
import Star from "../../public/Assets/icons/star-alt-3-svgrepo-com.svg";
import RetroGrid from "@/components/Backgrounds/RetroGrid";
import HorizontalLogoSlider from "@/components/HorizontalLogoSlider/HorizontalLogoSlider";
import { AnimatedTooltip } from "@/components/AnimatedTooltip/AnimatedTooltip";
import Link from "next/link";
import AnimatedGradientText from "@/components/Text/AnimatedGradientText";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Google from "../../public/Assets/graphics/google.png";
import Clutch from "../../public/Assets/graphics/clutch.png";
import BtnLight from "../components/Buttons/BtnLight";
import {Spotlight} from "/src/components/ui/HeroSpotlight";
import {useState, useEffect} from "react";
import { PulsatingButton } from "@/components/Buttons/PulsatingButton";
import styles from "../styles/BtnLight.module.css";

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
  const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
  return (
    <div className="overflow-hidden">
      <div className="overflow-hidden">
        <RetroGrid className="mt-[0px]" />

      </div>
      <div
        id="home"
        className="relative flex bg-grid-white/[1] antialiased flex-col justify-center overflow-hidden items-center w-full h-[100%] purple-gradient"
      >
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#5c45fd"
      />
        {/* <div className="absolute bg-[linear-gradient(to_top,_#15131D_10%,_#4a3a7f_40%,_#15131D_100%)] glow-effect shadow-lg w-[70%] h-[70px] rotate-[45deg] top-[10px] left-[10px]"></div> */}
        <div className="z-10 base-sm:mt-[52px] sm-20:mt-[70px] min-sm:mb-[10px] flex min-h-[13rem] mt-20 mb-[-2rem] sm-20:mt-10 lg:mb-[-4rem] items-center justify-center">
          <AnimatedGradientText>
            <span className="inline min-sm:hidden animate-gradient bricolage-font-family bg-gradient-to-r from-[#a89bff] via-[#f5f5f5] to-[#5c45fd] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Hurry
            </span>{" "}
            <hr className="mx-2 min-sm:hidden h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
            <span
              className={cn(
                `inline bricolage-font-family animate-gradient bg-gradient-to-r from-[#a89bff] via-[#f5f5f5] to-[#5c45fd] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Only 4 Spots Left For this Month
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-full md:w-4/5 min-sm:w-5/5 flex flex-col justify-center items-center text-center px-4 md:px-0">
            <div className="w-32 h-32 bg-blue absolute right-48 border-[#5c45fd]"></div>
            <div className="flex min-sm:mt-[-33px] max-sm:mt-[-100px] w-full justify-center items-center">
           
              <h1 className="z-10 text-white text-[2rem] lg-1025:mt-[0px] max-sm:mt-[25px] sm-6:mt-[-15px] sm:text-5xl heading-primary md:text-6xl lg:text-6xl xl:text-7xl font-bold mt-[20px]">
                
                  <span style={{marginTop: "1rem"}}  className="gradient-text max-sm:mt-[20px]">Grow Your</span> <br />
               
                Business & Conversion<br />
                <span className="gradient-text">With Web/App Design</span><br />
                & Development <br />
              </h1>
            </div>
            <p className="text-[#f5f5f5] w-full mt-4 font-medium text-base sm:text-lg bricolage-font-family md:text-xl lg:text-2xl mb-14 z-10">
              <span className="gradient-text font-bold">NeXDev Solutions</span>{" "}
              helped 200+ businesses convert{" "}
              <span className="gradient-text font-bold">55%</span> of web
              traffic into
              <br className="hidden md:block" /> paying customers with our
              proven{" "}
              <span className="gradient-text font-bold">K-SIGHT mechanism</span>
              .
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16 w-[100%]">
              <PulsatingButton className="" url="https://cal.com/nexdevsolutions/discovery-call">
                Book Your Free Call
              </PulsatingButton>
              <button
                className={`h-[55px] base-sm:hidden relative w-[230px] hover:text-[#161616] font-semibold text-lg rounded-[1rem] text-white border border-2 overflow-hidden group`}
                href="https://form.jotform.com/242006777431454"
              >
                <div className="absolute w-[0px] bg-[white] h-[200px] top-[0] left-[0] transition-all duration-300 group-hover:w-[300px]">
                </div>
                <div className=" relative z-[3] bricolage-font-family">Get Your Free Audit</div>
              </button>
            </div>
            <div className="flex sm-842:flex-col sm-842:gap-[22px] sm-842:mt-[40px] items-center justify-between gap-[50px] z-50 mt-[30px]">
              <div className="flex sm-842:flex-col sm-842:items-center sm-842:gap-[17px]  flex-between gap-16">
                <Link href="#reviews" 
                // className="sm-595:hidden"
                >
                  <div className="flex flex-row items-center">
                    <AnimatedTooltip items={people} />
                  </div>
                </Link>
                <div className="flex sm-842:ml-[15px] sm-786:mt-[10px] flex-col text-start bricolage-font-family text-white mt-4 md:mt-0 md:ml-[-2rem] z-10">
                  <span className="font-bold text-lg md:text-xl">{`200+ ${width < 842 ? " Satisfied Clients" : ""}`}</span>
                  <span className="font-light sm-842:hidden text-sm sm-786:text-sm md:text-base">
                    Satisfied clients
                  </span>
                </div>
              </div>
              <div className="flex gap-[50px] sm-842:gap-[75px]">
                <Image
                  src={Google}
                  alt="Google review badge"
                  height={50}
                  width={150}
                />
                <Image
                  src={Clutch}
                  alt="Clutch review badge"
                  height={50}
                  width={70}
                  // className="sm-694:hidden"
                />
              </div>
            </div>
          </div>
        </div>
        <HorizontalLogoSlider />
      </div>
    </div>
  );
};

export default Hero;
