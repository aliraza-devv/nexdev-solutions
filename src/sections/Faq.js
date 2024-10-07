import React from "react";
import Accordion from "../components/Accordion/Accordion";
import BtnPrimary from "@/components/Buttons/BtnPrimary";

const Faq = () => {
  return (
    <div className="w-[100%] h-full">
      <Accordion />
      <div className="flex items-center justify-center w-full">
        <BtnPrimary
          url="https://cal.com/nexdevsolutions/discovery-call"
          title="Book Your Call Now"
        />
      </div>
    </div>
  );
};

export default Faq;
