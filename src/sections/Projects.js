"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeText from "@/components/Text/FadeText";
import WordPullUp from "@/components/Text/WordPullUp";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import SparklesText from "@/components/Text/SparklesText";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import { VelocityScroll } from "@/components/Text/VelocityScroll";
import { useState, useEffect } from "react";
import LandA from "../../public/Assets/mockups/Mockup-2.png";
import Smartform from "../../public/Assets/mockups/Smarterform.png";
import SellerGoals from "../../public/Assets/mockups/Mockup-3.png";
import Alphagon from "../../public/Assets/mockups/Mockup-7.png";
import lighthouse from "../../public/Assets/mockups/lighthouse-reality.png";
import { IconCode, IconDatabase, IconSettings } from "@tabler/icons-react";


export function Projects() {
 
  const projectData = [
    {
      title: "The Alphagon ",
      imageUrl: Alphagon,
      url: "https://thealphagon.com/",
      subtitle: "WordPress website for digital markeing agency",
      description:
        "NeXDev Solutions and their team created designed and developed a wordpress website for The Alphagon which helped them attract more leads and convert them into loyal clients.",
      stats: [
        { label: "Increased Conversion", value: "59%" },
        { label: "Increased Sales", value: "62%" },
        { label: "Increased Performance", value: "100%" },
      ],
      tags: ["Development", "Design"],
    },
    {
      title: "L&A Outsource",
      imageUrl: LandA,
      url: "https://laoutsourced.com/",
      subtitle: "WordPress Website for and outsource company",
      description:
        "NeXDev Solutions and their team created this WordPress website to showcase an outsource company and their services of outsourcing administration, compliance, and software.",
      stats: [
        { label: "Increased Conversion", value: "57%" },
        // { label: "Booking Leads/month", value: "20-25" },
        { label: "Increased Sales", value: "76%" },
      ],
      tags: ["Development", "UI/UX", "SEO"],
    },
    {
      title: "Seller Goals",
      imageUrl: SellerGoals,
      url: "https://sellergoals.com/",
      subtitle: "WordPress Website",
      description:
        "NeXDev Solutions created and designed this website to showcase an Amazon Agency and their services of outsourcing administration compliance, and software. Users can view all the details about the agency and their services. NeXDev Solutions integrated multi-step forms with complex logic.",
      stats: [
        { label: "Increased Conversion", value: "62%" },
        // { label: "Booking Leads", value: "20-30" },
        { label: "Increased Sales", value: "73%" },
      ],
      tags: ["Development", "UI/UX", "SEO"],
    },
    {
      title: "Light House Reality",
      imageUrl: lighthouse,
      url: "https://www.behance.net/gallery/181830587/Lighthouse-Reality",
      subtitle: "Real Esate Website",
      description:
        "NeXDev Solutions created and designed this real estate website to showcase real estate properties, realtors, and much more functionalities. The website has ability to sell or rnt the proprty with complete management system. Realtors can list the properties and also can manage their profile.",
      stats: [
        { label: "Increased Conversion", value: "60%" },
        { label: "Increased Revenue", value: "130%" },
        { label: "Boost Sales", value: "85%" },
      ],
      tags: ["Development", "UI/UX"],
    },
  ];

  
  
  return (
    <div
      id="projects"
      className="w-full h-full mt-36 relative flex flex-col items-center"
    >
      <h1 className="text-center mb-2">
        <SparklesText text="More Work" />
      </h1>
      <h3 className="mb-20 text-xl text-[#f5f5f5] sub-font text-center">
        We create websites that Inspire & Boost Sales.
      </h3>
      <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Proud
      </h1>

      {projectData.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="fade-in-bottom w-[90%] flex gap-6 justify-center flex-col mb-20 rounded-[1rem] bg-gray-50/[.10] p-10"
        >
          <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
            <WordPullUp
              className="text-4xl font-bold tracking-[-0.02em] sm-20:text-3xl  text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
              words={project.title}
            />
            <TertiaryButton
              title="Learn More"
              url={project.url}
              className="mt-4 md:mt-0"
            />
          </div>
          <hr className="w-full border-[#f5f5f5] mt-6 md:mt-0" />
          <div className="flex flex-col lg:flex-row justify-around items-start gap-10 mt-6">
            <div className="w-full lg:w-[30%]">
              <Image
                src={project.imageUrl}
                width={400}
                height={400}
                alt={`${project.title} Project Mockup`}
                className="rounded-[1rem] sm-7:w-[100%]"
              />
              <div className={"flex  min-w-max mt-6 gap-4 flex-wrap"}>
                 {project.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex min-w-max sub-font justify-center items-center w-[40%] lg:w-[42%] hover:bg-[#5c45fd] hover:border-none hover:text-[#f5f5f5] p-2 border rounded-[1rem] border-[#a89bff] text-[#f5f5f5]"
                  >
                    { tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[43%]">
              <h3 className="text-[#f5f5f5] sub-font mb-10 font-medium text-2xl md:text-3xl heading-sub-responsive">
                {project.subtitle}
              </h3>
              <p className="text-[#f5f5f5] sub-font mb-10 font-sm text-xl heading-sub-responsive sm-11:hidden">
                {project.description}
              </p>
              <FadeText
                className="text-lg text-white mt-10"
                direction="up"
                framerProps={{ show: { transition: { delay: 0.2 } } }}
              />
            </div>
            <div  className="grid sm-11:mt-[-35px] lg-3:grid-cols-1 sm-9:grid-cols-1 lg:grid-cols-2  sm-8:w-[100%]  sm-7:grid-cols-2 lg-4:grid-cols-3 gap-4 w-full lg-4:w-[100%] sm-11:w-[100%] lg-3:w-[20%] sm-7:w-[70%] lg:w-[40%]">
              {project.stats.map((stat, i) => (
                <div  key={i} className="flex flex-col items-center lg-3:items-start sm-9:ml-[27%] sm-10:ml-[0] sm-11:w-[100%]">
                  <div className={`sm-11:w-[100%] ${stat.label == "Increased Conversion" ? "sm-11:ml-[43%]" : stat.label == "Increased Performance" ? "sm-11:ml-[43%]" : stat.label == "Boost Sales" ? "sm-11:ml-[43%]" : ""}`}>
                    <h4 className="w-[9rem] sub-font h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded-[1rem] bg-[#5c45fd] path-clip">
                      {stat.value}
                    </h4>
                    <p className={`text-[#f5f5f5] sub-font text-md ${stat.label == "Increased Sales" ? "lg-3:ml-[15px]" : stat.label == "Increased Conversion" ? "lg-3:ml-[-8px]" : stat.label == "Increased Revenue" ? "lg-3:ml-[3px]" : stat.label == "Boost Sales" ? "lg-3:ml-[30px]" : ""} lg-3:ml-[-15px]`}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      <div className="h-full w-full flex items-center justify-center"></div>
      <VelocityScroll
        text="Let's Work Together."
        default_velocity={2}
        className="
          font-display 
          index 
          text-center 
          font-bold 
          tracking-[-0.02em] 
          heading-primary
          drop-shadow-xl 
          text-white 
          text-[4rem] 
          sm:text-[6rem] 
          md:text-[8rem] 
          lg:text-[10rem] 
          xl:text-[12rem] 
          mb-14 
          leading-[3rem] 
          sm:leading-[4rem] 
          md:leading-[5rem] 
          lg:leading-[6rem] 
          xl:leading-[7rem]"
      />
    </div>
  );
}
