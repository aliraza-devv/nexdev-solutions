import React from "react";
import HelpCard from "@/components/Cards/HelpCard";
import SparklesText from "@/components/Text/SparklesText";
import Graph from "../../public/Assets/icons/graph-up-svgrepo-com.svg";
import Happy from "../../public/Assets/icons/happy-face-2-svgrepo-com.svg";
import Boost from "../../public/Assets/icons/boost-for-reddit-svgrepo-com.svg";
import Solution from "../../public/Assets/icons/solution-bulb-concept-svgrepo-com.svg";
import BtnPrimary from "@/components/Buttons/BtnPrimary";

const helpCardsData = [
  {
    title: "High Conversion",
    description:
      "We help you in converting your website traffic into high paying and loyal customers through our proven K-SIGHT mechanism.",
    icon: Graph,
  },
  {
    title: "Tust & Credibility",
    description:
      "We help your brand build trust & credibility in your targeted audience through our proven K-SIGHT mechanism.",
    icon: Happy,
  },
  {
    title: "Boost Sales",
    description:
      "We help you boost your Sales through our proven K-SIGHT mechanism",
    icon: Boost,
  },
  {
    title: "Custom Solutions",
    description:
      "We do not follow typical themes or templates, Instead we go an extra mile for our clients with custom solutions of design & development.",
    icon: Solution,
  },
];

const Help = () => {
  return (
    <>
      <h1 className="text-center mb-20 mt-20">
        <SparklesText text="How we help you?" />
      </h1>
      <div className="flex flex-col items-center gap-4 lg:gap-10 md:flex-row justify-center">
        {helpCardsData.map((card, index) => (
          <HelpCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
      {/* <div className="w-full flex justify-center items-center mt-10">
        <BtnPrimary title="Book a Free Call" />
      </div> */}
    </>
  );
};

export default Help;
