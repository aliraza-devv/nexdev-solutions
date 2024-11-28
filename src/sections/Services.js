"use client";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import BeamCard from "@/components/Cards/BeamCard";
import FloatingCallBooking from "@/components/FloatingCallBooking/FloatingCallBooking";
import SparklesText from "@/components/Text/SparklesText";
import { useState, useEffect } from "react";
import web from "../../public/Assets/icons/Web.png";
import web3d from "../../public/Assets/icons/3dweb.png";
import seo from "../../public/Assets/icons/seo.png";
import content from "../../public/Assets/icons/content writing.png";
import uiux from "../../public/Assets/icons/ui-ux.png";
import CircleButton from "@/components/Buttons/CircleButton";

const cardDetails = [
  {
    icon: uiux,
    title: "Web Design",
    description:
      "We are specialized in creating good looking and high conversion UI and UX designs of mobile apps and web application/website.",
  },
  {
    icon: web,
    title: "Web Development",
    description:
      "We are specialized in custom web development, frontend, backend CRM, CMS, LMS, WordPress, Shopify, and no-code web/app development",
  },
  {
    icon: web3d,
    title: "3D Development",
    description:
      "We are specialized in 3D web development using Threejs, Babylon.js, Blender with other tech stacks and creating complex 3D environments",
  },
  // {
  //   icon: web,
  //   title: "No-Code ",
  //   description:
  //     "We are specialized in mobile app development creating complex and high-performing mobile applications using Flutter and Android Studio.",
  // },
  {
    icon: seo,
    title: "SEO",
    description:
      "We are specialized in ranking your website to high ranking on search engine with on-page SEO, off-page SEO, technical SEO, and semantic SEO.",
  },
  {
    icon: content,
    title: "Content Writing",
    description:
      "We are specialized in SEO based content writing to for the website aiming to high conversion rate and boost sales.",
  },
];

const Services = () => {
  const chunkedCards = Array(Math.ceil(cardDetails.length / 3))
    .fill()
    .map((_, index) => cardDetails.slice(index * 3, index * 3 + 3));

  const [showFloatingCallBooking, setShowFloatingCallBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.body.scrollHeight - 200;
      if (window.scrollY > 500 && scrollPosition < threshold) {
        setShowFloatingCallBooking(true);
      } else {
        setShowFloatingCallBooking(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="services" className="flex flex-col items-center justify-center relative mt-24 gap-16">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center">
          <SparklesText text="What do we do?" />
        </h1>
        <h3 className="sub-font mb-20 text-lg text-[#f5f5f5]">
          Solution to your Next Gen Problems
        </h3>
      </div>
      <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Services
      </h1>
      <div>
        <div  className="grid grid-cols-1 sm-12:grid-cols-1 gap-y-8 gap-x-20 4xl:gap-x-10 4xl:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:ml-[20px] justify-center mx-auto">
          {cardDetails.map((card) => (
            <BeamCard
              key={card.title}
              title={card.title}
              description={card.description}
              className="w-full"
            />
          ))}
        </div>
      </div>
      {showFloatingCallBooking && (
        <div className="fixed right-4 bottom-4 p-4 z-50 shadow-lg">
          {/* <FloatingCallBooking /> */}
          <CircleButton />
        </div>
      )}
    </div>
  );
};

export default Services;
