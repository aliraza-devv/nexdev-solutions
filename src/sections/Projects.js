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

import LandA from "../../public/Assets/mockups/LandA.png";
import Smartform from "../../public/Assets/mockups/Smarterform.png";
import SellerGoals from "../../public/Assets/mockups/sellergoals.png";
import lighthouse from "../../public/Assets/mockups/lighthouse-reality.png";

export function Projects() {
  const projectData = [
    {
      title: "Smarter Form",
      imageUrl: Smartform,
      url: "https://smarterform.online/",
      subtitle: "SaaS CRM with complex multi-step forms and Dashboards",
      description:
        "NeXDev Solutions and their team created this SaaS CRM web app for multiple business owners to create their own flow of forms. All three users have their own dashboards where they can create, submit, and review the forms.",
      stats: [
        { label: "Increased Leads", value: "100%" },
        { label: "Increased Investment", value: "67%" },
        { label: "Increased Perfomance", value: "120%" },
      ],
      tags: ["Development", "Database", "DevOps"],
    },
    {
      title: "L&A Outsource",
      imageUrl: LandA,
      url: "https://laoutsourced.com/",
      subtitle: "WordPress Website",
      description:
        "NeXDev Solutions and their team created this WordPress website to showcase an outsource company and their services of outsourcing administration, compliance, and software.",
      stats: [
        { label: "Increased Leads", value: "100%" },
        { label: "Increased Traffic", value: "87%" },
        { label: "Increased Revenue", value: "100%" },
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
        { label: "Increased Leads", value: "80%" },
        { label: "Increased Revenue", value: "140%" },
        { label: "Boost Sales", value: "90%" },
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
        <SparklesText text="Our Work" />
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
          animate={{ x: -5, y: 66, scale: 0.7, rotate: 0 }}
          className="fade-in-bottom w-[90%] flex gap-6 justify-center flex-col mb-20 rounded-[1rem] dark:bg-gray-50/[.10] p-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <WordPullUp
              className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
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
                className="rounded"
              />
              <div className="flex mt-6 gap-4 flex-wrap">
                {project.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex sub-font justify-center items-center w-[40%] lg:w-[42%] hover:bg-[#5c45fd] hover:border-none hover:text-[#f5f5f5] p-2 border rounded-full border-[#a89bff] text-[#f5f5f5]"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[43%]">
              <h3 className="text-[#f5f5f5] sub-font mb-10 font-medium text-2xl md:text-3xl heading-sub-responsive">
                {project.subtitle}
              </h3>
              <p className="text-[#f5f5f5] sub-font mb-10 font-sm text-xl heading-sub-responsive">
                {project.description}
              </p>
              <FadeText
                className="text-lg text-black dark:text-white mt-10"
                direction="up"
                framerProps={{ show: { transition: { delay: 0.2 } } }}
              />
            </div>
            <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row justify-around w-full lg:w-[40%] gap-4">
              {project.stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div>
                    <h4 className="w-[9rem] sub-font h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                      {stat.value}
                    </h4>
                    <p className="text-[#f5f5f5] sub-font text-md text-center">
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
      <div className="flex items-center justify-center w-full mb-10">
        <BtnPrimary
          url="https://cal.com/nexdevsolutions/discovery-call"
          title="Book a Call"
        />
      </div>
      <VelocityScroll
        text="Let's Work Together."
        default_velocity={2}
        className="font-display index text-center font-bold tracking-[-0.02em] heading-primary text-black drop-shadow-xl dark:text-white text-[8rem] mb-14 leading-[5rem]"
      />
    </div>
  );
}
