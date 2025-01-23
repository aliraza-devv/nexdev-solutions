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
      <div className="w-[50%] max-2xl:w-[57%] sm-15:w-[80%] sm-575:w-[90%] sm-465:w-[94%] lg-5:w-[80%] sm-15:flex sm-15:flex-col sm-15:items-center sm-15:justify-center rounded-[1rem] bg-[#5c45fd] sm-516:p-[15px] sm-588:p-[20px] p-10">
        <div className="flex  sm-15:w-[100%] sm-15:flex-col max-2xl:w-[100%] max-2xl:gap-[70px] sm-15:gap-[20px] sm-15:items-center flex-between gap-16">
          <Link href="#reviews" className="base-sm:w-[100%] base-sm:ml-[-10px] base-sm:flex base-sm:justify-center ">
            <div className="flex flex-row items-center base-sm:justify-center base-sm:w-[100%]">
              <AnimatedTooltip items={people} />
            </div>
          </Link>
          <div className="flex flex-col sm-15:flex-row sm-15:gap-[5px] text-start bricolage-font-family text-[#f5f5f5] mt-4 md:mt-0 md:ml-[-2rem] z-10">
            <span className="font-light text-sm md:text-base sm-15:mt-[4.6px]">Loved by</span>
            <span className="font-bold text-lg md:text-lg">
              200+ businesses
            </span>
          </div>
        </div>
        <h2 className="text-[#f5f5f5] base-sm:flex sm-15:text-center base-sm:justify-center sm-525:text-[30px] sm-617:text-[32px] sm-465:text-[28px] sm-441:text-[26px] sm-417:text-[22px] sm-370:text-[19px] heading-primary sm-805:text-[35px] mt-9 max-2xl:w-[100%] sm-15:w-[100%] w-[70%]">
          Your Business Deserves Great Designs
        </h2>
        <p className="text-[#f5f5f5] sm-991:font-extralight sm-13:text-lg max-2xl:text-xl sm-15:text-center mt-7 mb-7 4xl:w-[100%] w-[70%] sm-15:w-[100%] base-sm:w-[100%] base-sm:flex base-sm:justify-center">
          After working with 200+ businesses since 2016, we know how to combine
          design, psychology, and marketing to create pages that don&apos;t just look
          good, but sell.
        </p>
        <div className="flex w-[250px] flex-col items-center">
          <PulsatingButtonLight
            className="mt-8 mb-3"
            url="https://cal.com/nexdevsolutions/discovery-call"
          >
            Book Your Call Now
          </PulsatingButtonLight>
          <span className="font-semibold mt-[-4px] max-2xl:text-md text-md text-[#f5f5f5]">
            Hurry! Only a few spots left.
          </span>
        </div>
        {/* <span className="text-[#f5f5f5]">(Hurry up! Limited Spots Left!)</span> */}
      </div>
    </div>
  );
};

export default CallToActions;
