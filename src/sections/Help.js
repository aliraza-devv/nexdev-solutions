import React from "react";
import HelpCard from "@/components/Cards/HelpCard";
import SparklesText from "@/components/Text/SparklesText";
import Graph from "../../public/Assets/icons/graph-up-svgrepo-com.svg";
import Happy from "../../public/Assets/icons/happy-face-2-svgrepo-com.svg";
import Boost from "../../public/Assets/icons/boost-for-reddit-svgrepo-com.svg";
import Solution from "../../public/Assets/icons/solution-bulb-concept-svgrepo-com.svg";
import Rocket from "../../public/Assets/icons/rocket-startup-svgrepo-com.svg";
import BtnPrimary from "@/components/Buttons/BtnPrimary";

const helpCardsData = [
  {
    title: "High Conversion",
    description:
      "We help you in converting your website traffic into high paying and loyal customers through our proven K-SIGHT mechanism.",
    icon: Graph,
  },
  {
    title: "Increase Leads",
    description:
      "We help you in increase leads through website our proven K-SIGHT mechanism.",
    icon: Rocket,
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
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center mb-2 mt-20">
          <SparklesText text="How we help you?" />
        </h1>
        <h3 className="mb-20 text-xl text-center sub-font text-[#f5f5f5]">
          We Guarantee 100% Staisfaction to our clients
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-10 place-items-center w-full place-content-center">
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
