
"use client"
import Image from "next/image";
import React from "react";
import { Timeline } from "../components/Process/Process";
import Pic from "../../public/Assets/mockups/L&A Outsource.png";
import Discuss from "../../public/Assets/graphics/discuss-2.svg";
import Discuss3 from "../../public/Assets/graphics/discuss-3.gif";
import Discuss4 from "../../public/Assets/graphics/discuss-4.gif";
import Discuss5 from "../../public/Assets/graphics/discuss-5.svg";
import Launch from "../../public/Assets/graphics/Launch-2.svg";
import Launch3 from "../../public/Assets/graphics/Launch-3.gif";
import Launch4 from "../../public/Assets/graphics/Launch-4.gif";
import Launch5 from "../../public/Assets/graphics/Launch-5.svg";
import Schedule from "../../public/Assets/graphics/Schedule-2.svg";
import Schedule3 from "../../public/Assets/graphics/Schedule-3.gif";
import Schedule4 from "../../public/Assets/graphics/Schedule-4.gif";
import Schedule5 from "../../public/Assets/graphics/Schedule-5.svg";
import { CardSpotlight } from "@/components/CardSpotlight/CardSpotlight";
import SparklesText from "@/components/Text/SparklesText";
import Meeting from "../../public/Assets/icons/meeting.gif";
import Dev from "../../public/Assets/icons/dev.gif";
import launch from "../../public/Assets/icons/launch.gif";
import {useState, useEffect} from "react";

export function Process() {
   const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  const data = [
    {
      title: "01. Book a Call",
      content: (
        <div>
          <p className="bricolage-font-family text-[#f5f5f5] text-sm md:text-lg font-normal mb-8">
            Book your call with us to discuss your project and your needs in
            detail with free consultation from our experts with more than 10
            years of experience.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={Schedule}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Schedule3}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Schedule4}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Schedule5}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "02. Discuss your Project",
      content: (
        <div className="bricolage-font-family">
          <p className="text-[#f5f5f5] text-sm md:text-lg font-normal mb-8">
            Discuss your needs and project with experts in the call and select
            your project which fits you best.
          </p>
          <p className="text-[#f5f5f5] text-sm md:text-lg font-normal mb-8">
            NeXev Solutions love to hear your ideas and nurture them more to
            make it alive.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={Discuss}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Discuss3}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Discuss4}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Discuss5}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "03. Revise & Relaunch",
      content: (
        <div>
          <p className="text-[#f5f5f5] bricolage-font-family text-sm md:text-lg font-normal mb-4">
            We&apos;ll revise the design until you are 100% satisfied, and then
            watch your business grow. We make sure that:
          </p>
          <div className="mb-8 bricolage-font-family">
            <div className="flex gap-2 items-center text-[#f5f5f5] text-sm md:text-lg">
              <span className="text-[#5c45fd]">&#10003;</span> You&apos;re 100%
              satisfied
            </div>
            <div className="flex gap-2 items-center text-[#f5f5f5] text-sm md:text-lg">
              <span className="text-[#5c45fd]">&#10003;</span> Your website is
              bug free
            </div>
            <div className="flex gap-2 items-center text-[#f5f5f5] text-sm md:text-lg">
              <span className="text-[#5c45fd]">&#10003;</span> The website i
              fully optimized
            </div>
            <div className="flex gap-2 items-center text-[#f5f5f5] text-sm md:text-lg">
              <span className="text-[#5c45fd]">&#10003;</span> You get more than
              your expectations
            </div>
            <div className="flex gap-2 items-center text-[#f5f5f5] text-sm md:text-lg">
              <span className="text-[#5c45fd]">&#10003;</span> The design and
              content is high-converting
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={Launch}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Launch3}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Launch4}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src={Launch5}
              alt="NexDev Solutions Process"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full flex flex-col justify-evenly items-center">
      {/* <Timeline data={data} /> */}
      <div className="flex flex-col mt-20">
        <h1 className="text-center mb-2">
          <SparklesText text="Our Process" />
        </h1>
        <h3 className="mb-20 min-sm:p-[6px] text-xl text-[#f5f5f5] bricolage-font-family text-center">
          We create websites that Inspire & Boost Sales.
        </h3>
      </div>

      <div 
      // style={{background: width < 961 ? "transparent" : "-webkit-linear-gradient(to left, transparent, transparent, transparent, rgba(92, 69, 253, 0.4)), -webkit-linear-gradient(to right, transparent, transparent, transparent, rgba(92, 69, 253, 0.4)); background: linear-gradient(to left, transparent, transparent, transparent, rgba(92, 69, 253, 0.4)), linear-gradient(to right, transparent, transparent, transparent, rgba(92, 69, 253, 0.4))"}} 
      className="border sm-961:p-[0px] sm-961:border-[transparent] sm-min-961:bg-[linear-gradient(to_left,_transparent,_transparent,_transparent,_rgba(92,_69,_253,_0.4)),_linear-gradient(to_right,_transparent,_transparent,_transparent,_rgba(92,_69,_253,_0.4))] lg-3:w-[90%] border-[#5c45fd] 8xl:w-[95%] flex justify-center p-[30px] rounded-[1rem]  w-[75%]">
      <div className="flex w-full 8xl:w-full items-center  flex-col 5xl:h-[100%] lg-5:gap-[30px] ">
      <div className="flex        sm-961:hidden  w-full   justify-center">
        <div className="w-[80%]     justify-center flex items-center">
          <div className="w-[30px] h-[30px]  rounded-full bg-transparent 
              border-[2px] border-[#9687ff]
              flex items-center justify-center text-lg text-white font-bricolage-grotesque" >1</div>
          <div className="w-[33%] border-t-[2px]  border-[#9687ff] h-[0]  "></div>
          <div className="w-[30px] h-[30px]  rounded-full bg-transparent 
              border-[2px] border-[#9687ff]
              flex items-center justify-center text-lg text-white font-bricolage-grotesque" >2</div>
          <div className="w-[33%] border-t-[2px] border-[#9687ff] h-[0]"></div>
          <div className="w-[30px] h-[30px] rounded-full bg-transparent 
              border-[2px] border-[#9687ff]
              flex items-center justify-center text-lg text-white font-bricolage-grotesque" >3</div>

        </div>
      </div>
      <div className="flex 5xl:gap-[26px] mt-10 sm-961:mt-[0px] items-center  lg-5:gap-[15px] lg-5:w-[90%] 5xl:w-[94%] 8xl:w-full  sm-961:flex-col  gap-[20px] justify-evenly sm-16:items-center items-center sm-16:w-[100%]">
        <div className="sm-16:w-[90%] lg-5:w-[60%] sm-20:w-[70%] 5xl:w-[60%] base-sm:w-[95%]">
          <CardSpotlight className="glassmorphism max-sm:h-[320px] sm-2:h-[370px] sm-961:h-[300px] lg-1025:h-[350px] lg-1109:h-[330px] h-[300px] lg-5:w-[100%] overflow-hidden  5xl:w-[100%] base-sm:w-[100%] w-80 sm-16:w-[100%]  ">
            <Image src={Meeting} width={75} height={75} alt="Icon" />
            <h3 className="heading-primary text-xl flex gap-3 font-bold relative z-20 mt-2 text-[#f5f5f5]">
              Book Your Call
            </h3>
            <p className="text-neutral-200 sm-991:font-extralight mt-4 relative z-20 text-md bricolage-font-family">
              We discuss your goals and needs in details and get to the
              solution and create a custom plan for you, and then we onboard you.
            </p>
          </CardSpotlight>
        </div>

        <div className="sm-16:w-[90%] lg-5:w-[60%] sm-20:w-[70%] 5xl:w-[60%] base-sm:w-[95%]">
          <CardSpotlight className="glassmorphism max-sm:h-[330px] sm-961:h-[300px] sm-2:h-[370px] lg-1025:h-[350px] lg-1109:h-[330px] h-[300px] lg-5:w-[100%] overflow-hidden base-sm:w-[100%] 5xl:w-[100%] sm-16:w-[100%]  w-80 ">
            <Image src={Dev} width={75} height={75} alt="Icon" />
            <h3 className="heading-primary text-xl flex gap-3 font-bold relative z-20 mt-2 text-[#f5f5f5]">
              Design,
              Development, Test
            </h3>
            <p className="text-neutral-200 sm-991:font-extralight mt-4 relative z-20 text-md bricolage-font-family">
              We start working on the project, providing you updates to stay
              up-to-date. Giving you the freedom to focus on what truly matters:
              profitability.
            </p>
          </CardSpotlight>
        </div>
        <div className="sm-16:w-[90%] lg-5:w-[60%] sm-20:w-[70%] 5xl:w-[60%] base-sm:w-[95%]" >
          <CardSpotlight className="glassmorphism sm-961:h-[300px] max-sm:h-[330px] sm-2:h-[370px] lg-1025:h-[350px] lg-1109:h-[330px] h-[300px] lg-5:w-[100%] 5xl:w-[100%] base-sm:w-[100%] overflow-hidden sm-16:w-[100%] w-80">
            <Image src={launch} width={75} height={75} alt="Icon" />
            <h3 className="heading-primary text-xl flex gap-3 font-bold relative z-20 mt-2 text-[#f5f5f5]">
              Launch and
              deliever
            </h3>
            <p className="text-neutral-200 sm-991:font-extralight mt-4 relative z-20 text-md bricolage-font-family">
            After ensuring your 100% satisfaction, we proceed to launch it and transfer full ownership to you. We also make certain that everything functions flawlessly.
            </p>
          </CardSpotlight>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
