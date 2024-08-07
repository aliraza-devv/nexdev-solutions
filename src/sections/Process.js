"use client";
import React from "react";
import Image from "next/image";
import StickyScroll from "@/components/StickyScroll/StickyScroll";
import SparklesText from "@/components/Text/SparklesText";
import Planning from "../../public/Assets/3d images/download.gif";
import Develop from "../../public/Assets/3d images/download2.gif";
import Testing from "../../public/Assets/3d images/download3.gif";
import Deploy from "../../public/Assets/3d images/download4.gif";
import call from "../../public/Assets/graphics/02.png";
import discuss from "../../public/Assets/graphics/01.png";
import launch from "../../public/Assets/graphics/03.png";

const content = [
  {
    number: "01",
    title: "Select Package/Book a Call",
    description:
      "Select the package or book a free call with us to discuss your project and your needs in detail with free consultation from our experts with more than 10 years of experience.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={call}
          width={500}
          height={500}
          //   className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    number: "02",
    title: "Discuss your project",
    description:
      "Discuss your needs and project in the call and select your project which fits you best.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={discuss}
          width={500}
          height={500}
          //   className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    number: "03",
    title: "Revise & Relaunch",
    description:
      "We'll revise the design until you are 100% satisfied, and then watch your business grow.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src={launch}
          width={420}
          height={420}
          //   className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  // {
  //   number: "04",
  //   title: "Deploy",
  //   description:
  //     "In this Phase NeXDev Solutions deploy the website/app to servers. NeXDev Solutions takes care of your DevOps flow and hand it over to you after the project is done.",
  //   content: (
  //     <div className="h-full w-full  flex items-center justify-center text-white">
  //       <Image
  //         src={Deploy}
  //         width={500}
  //         height={500}
  //         //   className="h-full w-full object-cover"
  //         alt="linear board demo"
  //       />
  //     </div>
  //   ),
  // },
];

function Process() {
  return (
    <div id="process" className="p-10 over w-[100%] mb-30">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center mb-2">
          <SparklesText text="Our Process" />
        </h1>
        <h3 className="mb-20 text-xl sub-font text-center text-[#f5f5f5]">
          How we can help you achieve your goals
        </h3>
      </div>
      <StickyScroll content={content} />
    </div>
  );
}

export default Process;
