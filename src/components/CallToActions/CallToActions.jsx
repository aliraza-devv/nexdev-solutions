import React from "react";
import Link from "next/link";
import img1 from "../../../public/Assets/images/Trish.jpeg";
import img2 from "../../../public/Assets/images/Uzair.jpeg";
import img3 from "../../../public/Assets/images/Sheraz.jpeg";
import img4 from "../../../public/Assets/images/Naveed.jpg";
import img5 from "../../../public/Assets/images//Najam.jpg";

import { AnimatedTooltip } from "../AnimatedTooltip/AnimatedTooltip";
import { PulsatingButton } from "../Buttons/PulsatingButton";
import { PulsatingButtonLight } from "../Buttons/PulsatingButtonLight";

const CallToActions = () => {
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

  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="w-[50%] base-sm:w-[95%] lg-5:w-[80%] base-sm:flex base-sm:flex-col base-sm:items-center base-sm:justify-center rounded-[1rem] bg-[#5c45fd] p-10">
        <div className="flex  base-sm:w-[100%] base-sm:flex-col base-sm:gap-[20px] base-sm:items-center flex-between gap-16">
          <Link href="#reviews" className="base-sm:w-[100%] base-sm:ml-[-10px] base-sm:flex base-sm:justify-center ">
            <div className="flex flex-row items-center base-sm:justify-center base-sm:w-[100%]">
              <AnimatedTooltip items={people} />
            </div>
          </Link>
          <div className="flex flex-col base-sm:flex-row base-sm:gap-[5px] text-start sub-font text-[#f5f5f5] mt-4 md:mt-0 md:ml-[-2rem] z-10">
            <span className="font-light text-sm md:text-base base-sm:mt-[4.6px]">Loved by</span>
            <span className="font-bold text-lg md:text-lg">
              200+ businesses
            </span>
          </div>
        </div>
        <h2 className="text-[#f5f5f5] base-sm:flex base-sm:justify-center heading-primary mt-9 base-sm:w-[100%] w-[70%]">
          Your Business Deserves Great Designs
        </h2>
        <p className="text-[#f5f5f5] mt-7 mb-7 w-[70%] base-sm:w-[87%] base-sm:flex base-sm:justify-center">
          After working with 200+ businesses since 2016, we know how to combine
          design, psychology, and marketing to create pages that don't just look
          good, but sell.
        </p>
        <span className="font-black text-[#f5f5f5]">
          Book Your Free Call Today!
        </span>
        <PulsatingButtonLight
          className="mt-8 mb-3"
          url="https://cal.com/nexdevsolutions/discovery-call"
        >
          Book Your Call Now
        </PulsatingButtonLight>
        {/* <span className="text-[#f5f5f5]">(Hurry up! Limited Spots Left!)</span> */}
      </div>
    </div>
  );
};

export default CallToActions;