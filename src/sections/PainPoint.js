import React from "react";
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
const data = [
  {
    id: 0,
    text: "You want to scale your business because you are missing on potential leads.",
  },
  {
    id: 1,
    text: "Your have visitors but they are not taking any actions.",
  },
  {
    id: 2,
    text: "Your website has an outdated design which loses trust and credibility. And it does not make your business stand out.",
  },
  {
    id: 3,
    text: "You hold your brand to high standards, but you are unsure who can meet your expectations and deliver the results you&apos;re looking for.",
  },
  {
    id: 4,
    text: "You want to build a complex web app.",
  },
];

const PainPoint = () => {
  return (
    <>
      <div className="flex flex-col 3xl:w-[100%] justify-center items-center">
        <h1 className="text-center mb-2 mt-20">
          <SparklesText text="If You Are Here..." />
        </h1>
      </div>
      <div className="w-full">
        <div className="flex flex-col text-[#f5f5f5] justify-center items-center gap-5 mt-10 w-full px-4 md:px-0">
          {data.map((text) => (
            <div
              key={text.id}
              className="p-7 w-full md:w-[42%] 3xl:w-[50%] 7xl:w-[60%] 8xl:w-[70%] 9xl:w-[80%] sm-949:w-[90%] sm-659:w-[95%] sm-575:w-[100%]  bg-gray-50/[.10]  flex gap-4 rounded-[1rem] items-start"
            >
              <div
                key={text.id}
                className="w-3 h-3 mt-2 bg-[#5c45fd] rounded-full shrink-0 blur-sm"
              ></div>
              <p className="text-base sm-20:font-extralight sm-991:font-extralight 3xl:text-[22px] 6xl:text-[21px] 8xl:text-[20px] sm-949:text-[21px] sm-659:text-[18px] sm-493:text-[17px] sm-694:text-[19px] sm-20:text-[20px] bricolage-font-family" id={text.id}>
                {text.text}
              </p>
            </div>
          ))}
          <h1 className="text-[#f5f5f5] heading-primary text-3xl flex justify-center items-center font-bold mt-7">
            You&apos;re on the right place. Read on...
          </h1>
        </div>
      </div>
    </>
  );
};

export default PainPoint;
