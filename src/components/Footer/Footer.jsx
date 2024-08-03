import React from "react";
import WordPullUp from "../Text/WordPullUp";
import BtnPrimary from "../Buttons/BtnPrimary";
import SocialMedia from "../SocialMedia/SocialMedia";
import RetroGrid from "../Backgrounds/RetroGrid";

const Footer = () => {
  return (
    <div
      id="footer"
      className="w-full h-[95vh] md:h-[70vh] flex flex-col justify-center items-center p-5 mt-20"
    >
      <div className="w-[95%] relative h-full flex flex-col justify-center items-center side-gradient border rounded-[1rem]">
        <RetroGrid />
        <div className="w-full p-10 absolute top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            <div>
              <WordPullUp
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start mb-10 w-full md:w-[17rem]"
                words="Do you like what you see?"
              />
              <BtnPrimary
                title="Contact Now"
                url="https://cal.com/nexdevsolutions/discovery-call"
              />
            </div>
            <div>
              <WordPullUp
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start mb-10 w-full md:w-[17rem]"
                words="Services"
              />
              <ul className="text-[#f5f5f5] sub-font flex flex-col gap-3">
                <li>Web Development</li>
                <li>3D web Development</li>
                <li>UI/UX Design</li>
                <li>SEO</li>
              </ul>
            </div>
            <div>
              <WordPullUp
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start mb-10 w-full md:w-[17rem]"
                words="Get in Touch"
              />
              <h4 className="text-[#f5f5f5] mb-5 sub-font">
                contact@nexdevsolutions.com
              </h4>
              <h4 className="text-[#f5f5f5] mb-5 sub-font">+923081992088</h4>
              <SocialMedia />
            </div>
          </div>
          <div className="">
            <WordPullUp
              className="tracking-[-0.02em] heading-primary gradient-text text-[3rem] sm:text-[4rem] md:text-[5rem] xl:text-[8rem] p-10 leading-[5rem]"
              words="Crafting Since 2016"
            />
            <p className="text-[#f5f5f5] text-lg text-center mt-6 index">
              © nexdevsolutions.com 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
