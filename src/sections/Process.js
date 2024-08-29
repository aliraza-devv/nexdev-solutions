// "use client";
// import React from "react";
// import Image from "next/image";
// import StickyScroll from "@/components/StickyScroll/StickyScroll";
// import SparklesText from "@/components/Text/SparklesText";
// import Planning from "../../public/Assets/3d images/download.gif";
// import Develop from "../../public/Assets/3d images/download2.gif";
// import Testing from "../../public/Assets/3d images/download3.gif";
// import Deploy from "../../public/Assets/3d images/download4.gif";
// import call from "../../public/Assets/graphics/02.png";
// import discuss from "../../public/Assets/graphics/01.png";
// import launch from "../../public/Assets/graphics/03.png";

// const content = [
//   {
//     number: "01",
//     title: "Select Package/Book a Call",
//     description:
//       "Select the package or book a free call with us to discuss your project and your needs in detail with free consultation from our experts with more than 10 years of experience.",
//     content: (
//       <div className="h-full w-full  flex items-center justify-center text-white">
//         <Image
//           src={call}
//           width={500}
//           height={500}
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },
//   {
//     number: "02",
//     title: "Discuss your project",
//     description:
//       "Discuss your needs and project in the call and select your project which fits you best.",
//     content: (
//       <div className="h-full w-full  flex items-center justify-center text-white">
//         <Image
//           src={discuss}
//           width={500}
//           height={500}
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },
//   {
//     number: "03",
//     title: "Revise & Relaunch",
//     description:
//       "We'll revise the design until you are 100% satisfied, and then watch your business grow.",
//     content: (
//       <div className="h-full w-full  flex items-center justify-center text-white">
//         <Image
//           src={launch}
//           width={420}
//           height={420}
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },

// ];

// function Process() {
//   return (
//     <div id="process" className="p-10 over w-[100%] mb-30">
//       <div className="flex flex-col justify-center items-center">
//         <h1 className="text-center mb-2">
//           <SparklesText text="Our Process" />
//         </h1>
//         <h3 className="mb-20 text-xl sub-font text-center text-[#f5f5f5]">
//           How we can help you achieve your goals
//         </h3>
//       </div>
//       <StickyScroll content={content} />
//     </div>
//   );
// }

// export default Process;

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

export function Process() {
  const data = [
    {
      title: "01. Book a Call",
      content: (
        <div>
          <p className="heading-secondary text-[#f5f5f5] text-sm md:text-lg font-normal mb-8">
            Select the package or book a free call with us to discuss your
            project and your needs in detail with free consultation from our
            experts with more than 10 years of experience.
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
        <div className="heading-secondary">
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
          <p className="text-[#f5f5f5] heading-secondary text-sm md:text-lg font-normal mb-4">
            We&apos;ll revise the design until you are 100% satisfied, and then
            watch your business grow. We make sure that:
          </p>
          <div className="mb-8 heading-secondary">
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
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
