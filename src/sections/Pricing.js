import PricingCard from "@/components/Cards/PricingCard";
import SparklesText from "@/components/Text/SparklesText";
import React from "react";

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="flex relative flex-col justify-center  items-center min-sm:w-[100%] w-full h-full"
    >
      <h1 className="text-center mb-2 sm-644:mt-[30px]">
        <SparklesText text="Get a Quote Now" />
      </h1>
      <h3 className="mb-24 text-xl text-center bricolage-font-family text-[#f5f5f5]">
        Are you ready to boost your online credibility?
      </h3>
      <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Pricing
      </h1>
      <div className="grid min-sm:w-[95%] lg-1168:grid-cols-1 grid-cols-3 p-[10px] min-sm:flex min-sm:flex-col xl:grid-cols-3 gap-[20px] lg-1168:gap-[25px]  min-sm:justify-items-start justify-items-center ">
        <PricingCard
          miniTitle="One-time"
          title="Design + Develop + Copywriting"
          price="Get a Quote"
          point1="Branding (Colors, fonts, brand guidelines)"
          point2="Compelling & SEO-focused copywriting"
          point3="High-converting landing page design"
          point4="Landing page development"
          point5="Updates delivery every 2-3 days"
          point6="Unlimited revisions"
          statement="Perfect for coaches, creators, and service-based businesses that need a high-converting landing page."
          url="https://cal.com/nexdevsolutions/discovery-call"
        />
        <PricingCard
          miniTitle="One-time"
          title="Design + Development + Copywriting"
          price="Get a Quote"
          subTitle=""
          point1="Branding (Colors, fonts, brand guidelines)"
          point2="Compelling & SEO-focused copywriting"
          point3="High-converting landing page design"
          point4="Website development"
          point5="Updates delivery every 2-3 days"
          point6="Unlimited revisions"
          statement="Perfect for coaches, creators, and service-based businesses who need a high-converting 4-6 pages website."
          url="https://cal.com/nexdevsolutions/discovery-call"
        />
        <PricingCard
          miniTitle="One-time"
          title="Custom Poject"
          price="Get a Quote"
          subTitle=""
          point1="Do you want to discuss your project with us?"
          point2="Consult with us to find out a solution for you."
          point3="Share your requirements with us."
          point4="Free Consultation"
          point5="A full plan to follow"
          point6="Research and analysis"
          statement="Perfect for you if you need funnels, web app, custom development, or you're confused/unsure or have different requirements or need other services.
"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Pricing;
