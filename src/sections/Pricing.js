import PricingCard from "@/components/Cards/PricingCard";
import SparklesText from "@/components/Text/SparklesText";
import React from "react";

const Pricing = () => {
  return (
    <div
      id="pricing"
      className="flex relative flex-col justify-center items-center w-full h-[100%]"
    >
      <h1 className="text-center mb-2">
        <SparklesText text="Get a Quote Now" />
      </h1>
      <h3 className="mb-24 text-xl text-center sub-font text-[#f5f5f5]">
        Are you ready to boost your online credibility?
      </h3>
      <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Pricing
      </h1>
      <div className="flex flex-col lg:flex-row justify-around items-center gap-10">
        <PricingCard
          title="WordPress Website"
          price="Starting from $699"
          subTitle="WordPress Design & Develoment"
          point1="4-pages High Conversion Design"
          point2="Best Practice Developement"
          point3="Complete SEO focused content Writing"
          point4="Fast & Secure Integration of Plugins"
          point5="Website Bradning"
          point6="Newsletter Setup"
          point7="FREE Premium Theme (Worth: $299)"
          point8="FREE Elementor Pro (Worth: $99)"
          point9="1 Year FREE Hosting"
          point10="1 Month Revision"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />

        <PricingCard
          title="Custom Coding"
          price="Starting from $899"
          subTitle="Have a custom coding Project?"
          point1="Complete Website Design"
          point2="Complete Development"
          point3="Fast Page Speed"
          point4="Bugs Free"
          point5="Experienced Team"
          point6="SEO Focused Content Writing & Graphics"
          point7="Fast Hosting Server"
          point8="DevOps Pipeline"
          point9="FREE 2 month Technical Support"
          point10="FREE 2 month SEO"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />

        <PricingCard
          title="Custom Poject"
          price="Get a Quote"
          subTitle="Have an idea to discuss & Implement"
          point1="Tell us Your Requirements"
          point2="We Have Best Team of Developer"
          point3="We Have Best Team of Designers"
          point4="We Have Best Team of SEO"
          point5="High Conversion Approach"
          point6="Highly Skilled DevOps Team"
          point7="Technical Support"
          point8="FREE Consultation From Experts"
          point9="A One Stop Permanent Solution"
          point10="Solution to Your Problems"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />
      </div>
    </div>
  );
};

export default Pricing;
