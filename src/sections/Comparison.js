"use client";
import RetroThreeD from "@/components/Backgrounds/RetroThreeD";
import WordPullUp from "@/components/Text/WordPullUp";
import Image from "next/image";
import Cross from "../../public/Assets/icons/cross.svg";
import Person from "../../public/Assets/icons/person.svg";
import Speed from "../../public/Assets/icons/rocket.svg";
import deliver from "../../public/Assets/icons/deliver-svgrepo-com.svg";
import Team from "../../public/Assets/icons/team-3-svgrepo-com.svg";
import Top from "../../public/Assets/icons/top-right-svgrepo-com.svg";
import Extra from "../../public/Assets/icons/bulb-on-svgrepo-com.svg";
import Plan from "../../public/Assets/icons/plan-svgrepo-com.svg";
import Boost from "../../public/Assets/icons/boost-for-reddit-svgrepo-coma.svg";
import Secure from "../../public/Assets/icons/secure-shield-password-protect-safe-svgrepo-com.svg";

const Comparison = () => {
  return (
    <div
      id="comparison"
      className="relative flex flex-col items-center jus min-h-screen  p-10 z-10 "
    >
      <div className="absolute inset-0 z-0">
        <RetroThreeD />
      </div>

      <div className="relative z-10 flex flex-col items-center lg:flex-row justify-center gap-6 lg:gap-10 mt-6 lg:mt-10">
        <WordPullUp
          className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
          words="Other Agencies"
        />
        <div className="flex justify-center shadow-md shadow-[#5c45fd] mt-2 text-[#f5f5f5] border rounded-full border-[#5c45fd] w-16 h-16 lg:w-20 lg:h-20 text-2xl lg:text-4xl font-bold items-center">
          <span className="mr-[-2px] z-10 heading-primary">V</span>
          <div className="h-16 w-2 lg:h-20 lg:w-2 rotate-12 shadow-md blur-[1px] bg-[#5c45fd] shadow-[#5c45fd] border border-[#5c45fd]"></div>
          <span className="ml-[-2px] z-10 heading-primary">S</span>
        </div>
        <div className="flex justify-center items-center gap-2 lg:gap-4">
          <WordPullUp
            className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
            words="NeXDev Solutions"
          />
        </div>
      </div>

      <h2 className="relative z-10 text-[#f5f5f5] mt-6 font-semibold sub-font text-lg text-center">
        &quot;Excellence is not a skill, it&apos;s an attitude.&quot; - Ralph
        Marston
      </h2>
      <h2 className="relative z-10 text-[#b5b5b5] sub-font text-lg text-center">
        We treat your business as if it were our own
      </h2>

      <div className="relative z-10 flex flex-col items-center gap-10 lg:gap-20 mt-6 lg:mt-10 w-full">
        <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-10 w-full max-w-screen-lg">
          <div className="w-full lg:w-1/2 lg:text-left">
            <h2 className="text-[#f5f5f5] mt-6 font-semibold sub-font z-10 text-lg">
              Other Agencies / Freelancers
            </h2>
            <div className="mt-4">
              <div className="flex flex-col gap-4 sub-font items-start">
                {[
                  "Inexperienced Juniors",
                  "No focus on conversion, growth, & Sales",
                  "Old & typical",
                  "Slow Implementation",
                  "Lack of Creativity & Implementation Power.",
                  "No Plan & Strategy",
                  "Settle for Ordinary",
                  "Traditional & Old fashion Designs & Development",
                  "No expert team for every domain",
                  "Deliver only What is Expected",
                ].map((text, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Image src={Cross} height={24} width={24} alt="List Icon" />
                    <span className="text-[#f5f5f5] z-10">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:text-left">
            <h2 className="text-[#f5f5f5] mt-6 z-10 sub-font font-semibold text-lg">
              NeXDev Solutions
            </h2>
            <div className="mt-4">
              <div className="flex flex-col gap-4 sub-font items-start">
                {[
                  { text: "Top Experienced Team", icon: Person },
                  {
                    text: "High-conversion, Sales & business growth approach",
                    icon: Boost,
                  },
                  { text: "Use Proven K-Sight Mechanism", icon: Secure },
                  { text: "Lightning Fast Implementation", icon: Speed },
                  { text: "World-class designer & dev team", icon: Team },
                  { text: "Planned & strategic approach", icon: Plan },
                  { text: "Always go for Extraordinary", icon: Extra },
                  { text: "Modern age & Next Gen. solutions", icon: Top },
                  { text: "Teams of Experts for every Domain", icon: Team },
                  {
                    text: "Always go an Extra mile for our Clients",
                    icon: deliver,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Image
                      src={item.icon}
                      height={24}
                      width={24}
                      alt="List Icon"
                    />
                    <span className="text-[#f5f5f5] z-10">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
