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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 justify-items-center">
        <PricingCard
          miniTitle="One Off"
          title="Design + Develop + Copywriting"
          price="$2099"
          priceCut="$3500"
          subTitle="Conversion-driven landing page design"
          point1="High Conversion Design"
          point2="Best Practice Developement"
          point3="Complete SEO focused content Writing"
          point4="Updates every 2-3 days"
          point5="Unlimited revisions"
          point6="Guide to manage your site"
          point7="FREE Premium Theme (Worth: $299)"
          point8="FREE Elementor Pro (Worth: $99)"
          point10="FREE 6 Months Hosting"
          point9="FREE 2 Months Technical Support"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />

        <PricingCard
          miniTitle="One Off"
          title="Custom Coding"
          price="Starting from $899"
          subTitle="Have a custom coding Project?"
          point1="Complete Website Design"
          point2="Complete Development"
          point3="Fast Page Speed"
          point4="Bugs Free"
          point5="Dedicated & Experienced Team"
          point6="SEO Focused Content Writing & Graphics"
          point7="Fast Hosting Server"
          point8="DevOps Pipeline"
          point9="FREE 2 month Technical Support"
          point10="FREE 2 month SEO"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />

        <PricingCard
          miniTitle="Monthly Subscription"
          title="Custom Poject"
          price="Get a Quote"
          subTitle="Have an idea to discuss & Implement"
          point1="Tell us Your Requirements"
          point2="We Have Best Team of Developer"
          point3="We Have Best Team of Designers"
          point4="We Have Best Team of SEO"
          point5="High Conversion Approach"
          point6="Highly Skilled DevOps Team"
          point7="FREE 2 months Technical Support"
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
