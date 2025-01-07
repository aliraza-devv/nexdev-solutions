"use client";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import BeamCard from "@/components/Cards/BeamCard";
import FloatingCallBooking from "@/components/FloatingCallBooking/FloatingCallBooking";
import SparklesText from "@/components/Text/SparklesText";
import { useState, useEffect } from "react";
import web from "../../public/Assets/icons/Web.png";
import web3d from "../../public/Assets/icons/3dweb.png";
// import seo from "../../public/Assets/icons/seo.png";
import content from "../../public/Assets/icons/content writing.png";
import uiux from "../../public/Assets/icons/ui-ux.png";
import CircleButton from "@/components/Buttons/CircleButton";
import { CardSpotlight } from "@/components/CardSpotlight/CardSpotlight";
import webDesign from "/public/Assets/icons/web-design.gif";
import webDevelopment from "/public/Assets/icons/web-development.gif";
import d3Dev from "/public/Assets/icons/3D-Dev.gif";
import seo from "/public/Assets/icons/seo.gif";
import contentWriting from "/public/Assets/icons/content-writing.gif";


const cardDetails = [
  {
    // icon: uiux,
    title: "Web Design",
    subHeading: "Designing Uniquely Yours",
    shortDesc: "Good-looking and high-conversion UI and UX designs of mobile apps and web application/website.",
    description:
      "We are specialized in creating good looking and high conversion UI and UX designs of mobile apps and web application/website.",
    icon: webDesign,
    number: "01",
    image: "/Assets/images/website-13.png"
  },
  {
    // icon: web,
    icon: webDevelopment,
    number: "02",
    shortDesc: "Custom web development, frontend, backend CRM, CMS, LMS, WordPress, Shopify, and no-code web/app development.",
    title: "Web Development",
    subHeading: "From Vision To Virtual Reality",
    description:
      "We are specialized in custom web development, frontend, backend CRM, CMS, LMS, WordPress, Shopify, and no-code web/app development.",
    image: "/Assets/images/website-15.png"
  },
  {
    icon: d3Dev,
    number: "03",
    title: "3D Development",
    shortDesc: "3D web development using Threejs, Babylon.js, Blender with other tech stacks and creating complex 3D environments.",
    subHeading: "Websites That Feel Alive",
    description:
      "We are specialized in 3D web development using Threejs, Babylon.js, Blender with other tech stacks and creating complex 3D environments.",
    image: "/Assets/images/website-17.png"
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
    number: "04",
    shortDesc: "High ranking on search engine with on-page SEO, off-page SEO, technical SEO, and semantic SEO.",
    subHeading: "Crafted For Top-Ranking Every Time",
    description:
      "We are specialized in ranking your website to high ranking on search engine with on-page SEO, off-page SEO, technical SEO, and semantic SEO.",
    image: "/Assets/images/website-18.png",
  },
  {
    icon: contentWriting,
    number: "05",
    title: "Content Writing",
    subHeading: "Copy That Hooks Your Visitor",
    shortDesc: "SEO based content writing for to high conversion rate and magnified sales.",
    description:
      "We are specialized in SEO based content writing to for the website aiming to high conversion rate and boost sales.",
    image: "/Assets/images/website-19.png"
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
    <div id="services" className="flex  overflow-x-hidden flex-col items-center justify-center relative mt-24 gap-16">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center">
          <SparklesText text="What do we do?" />
        </h1>
        <h3 className="bricolage-font-family mb-20 text-lg text-[#f5f5f5]">
          Solution to your Next Gen Problems
        </h3>
      </div>
      <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Services
      </h1>
      <div className="base-sm:w-[100%] sm-448:w-[100%] sm-654:w-[100%] sm-20:flex w-[90%] sm-383:flex sm-383:justify-center sm-20:justify-center">
        <div  className="grid grid-cols-1 w-[100%] sm-20:w-[100%] sm-16:w-[90%]  lg-4:grid-cols-1 sm-383:w-[90%] sm-448:w-[100%] sm-617:grid-cols-1 sm-20:grid-cols-1 min-sm:grid-cols-1 min-sm:w-[95%] gap-y-8 gap-x-20 4xl:gap-x-10 lg-1074:gap-x-[15px] 4xl:grid-cols-1  lg:grid-cols-1 xl:grid-cols-1 justify-center mx-auto">
          {cardDetails.map((card) => (
            // <CardSpotlight className="overflow-hidden p-[0] cursor-pointer border-[0.4px] border-[#9687ff]">
            <BeamCard
              key={card.title}
              subHeading={card.subHeading}
              shortDesc={card.shortDesc}
              number={card.number}
              title={card.title}
              description={card.description}
              icon={card.icon}
              image={card.image}
            />
            // </CardSpotlight>
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
