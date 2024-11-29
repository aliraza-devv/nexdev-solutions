import React from "react";
import WordPullUp from "../Text/WordPullUp";
import BtnPrimary from "../Buttons/BtnPrimary";
import SocialMedia from "../SocialMedia/SocialMedia";
import RetroGrid from "../Backgrounds/RetroGrid";

const Footer = () => {
  return (
    <div
      id="footer"
      className="w-full base-sm:w-[100%]  h-[95vh] md:h-[70vh] flex flex-col justify-center items-center base-sm:p-[10px] p-5 mt-20"
    >
      <div className="w-[95%] relative base-sm:w-[100%] h-full flex flex-col justify-center items-center side-gradient  rounded-[1rem]">
        <RetroGrid />
        <div className="w-full p-10 absolute flex flex-col justify-between h-full top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[100%] sm-20:gap-[10%] gap-10 w-full">
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
            <div className="sm-20:ml-[37%] base-sm:ml-[0]">
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
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start sm-20:mb-[8px] mb-10 w-full md:w-[17rem]"
                words="Get in Touch"
              />
              <h4 className="text-[#f5f5f5] mb-5 sm-20:mb-[5px] sub-font">
                info@nexdevsolutions.net
              </h4>
              <h4 className="text-[#f5f5f5] mb-5 sub-font">+923081992088</h4>
              {/* <SocialMedia /> */}
            </div>
          </div>
          <div className="base-sm:mt-[80px]">
            <WordPullUp
              className=" tracking-[-0.02em] heading-primary text-white text-[3rem] min-sm:w-[100%] max-sm:ml-[-10px] min-sm:text-[3rem] sm:text-[4rem] md:text-[3rem] xl:text-[6rem] p-10 leading-[5rem]"
              words="Crafting Since 2016"
            />
            <p className="text-[#f5f5f5] text-lg text-center mt-6">
              © nexdevsolutions.com 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
