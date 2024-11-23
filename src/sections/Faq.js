import React from "react";
import Accordion from "../components/Accordion/Accordion";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import { PulsatingButton } from "@/components/Buttons/PulsatingButton";

const Faq = () => {
  return (
    <div className="w-[100%] h-full">
      <Accordion />
      <div className="flex items-center justify-center w-full">
        {/* <BtnPrimary
          url="https://cal.com/nexdevsolutions/discovery-call"
          title="Book a Free Call"
        /> */}
        {/* <PulsatingButton url="https://cal.com/nexdevsolutions/discovery-call">
              Book Your Call Now
            </PulsatingButton> */}
      </div>
    </div>
  );
};

export default Faq;
