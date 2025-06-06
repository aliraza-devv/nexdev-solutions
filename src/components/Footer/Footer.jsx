import React from "react";
import WordPullUp from "../Text/WordPullUp";
import BtnPrimary from "../Buttons/BtnPrimary";
import SocialMedia from "../SocialMedia/SocialMedia";
import RetroGrid from "../Backgrounds/RetroGrid";
import Image from "next/image";

const Footer = () => {
  return (
    <div
      id="footer"
      className="w-full base-sm:w-[100%] overflow-hidden max-2xl:h-[90vh] lg-5:h-[140vh] lg-3:h-[120vh] base-sm:h-[150vh] sm-20:h-[140vh]  h-[98vh] md:h-[70vh] flex flex-col justify-center items-center base-sm:p-[10px] p-5 sm-817:p-[0] mt-20"
    >
      <div className="w-[95%] relative base-sm:w-[100%] border max-2xl:h-[100%] base-sm:h-[100%] sm-20:w-[100%] base-sm:overflow-hidden overflow-hidden h-[100%] flex flex-col justify-center items-center bg-[#161616]  rounded-[1rem]">
        <RetroGrid />
        <div className="w-full p-10 sm-15:p-[30px] sm-611:p-[20px] absolute flex flex-col justify-between h-full top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-[100%] sm-20:gap-[10%] gap-10 w-full">
            <div className="w-full">
              <WordPullUp
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start mb-10 w-full md:w-[17rem]"
                words="Do you like what you see?"
              />
              {/* <div className="flex flex-col items-center justify-center w-[70%]">
                <Image className="mb-[16px]" style={{marginBotom: "50px"}} height={300} width={400} src="/Assets/images/Founder.png" />
                <div className="text-white">CEO and Founder</div>
                <div className="text-white mt-[10px]">Ali Raza</div>
                <div  className="mt-[16px]"> */}
                  <BtnPrimary
                    title="Contact Now"
                    url="https://cal.com/nexdevsolutions/discovery-call"
                   
                  />
                {/* </div>
              </div> */}
            </div>
            <div className=" lg-5:justify-self-end lg-5:w-[50%] sm-20:w-[100%] sm-20:justify-self-start base-sm:ml-[0]">
              <WordPullUp
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start mb-10 w-full md:w-[17rem] heading-primary"
                words="Services"
              />
              <ul className="text-[#f5f5f5] bricolage-font-family flex flex-col gap-3">
                <li>Web Development</li>
                <li>3D web Development</li>
                <li>UI/UX Design</li>
                <li>SEO</li>
              </ul>
            </div>
            <div>
              <WordPullUp
                className="tracking-[-0.02em] text-[#f5f5f5] text-3xl md:text-4xl text-start sm-20:mb-[8px] mb-10 w-full md:w-[17rem] heading-primary"
                words="Get in Touch"
              />
              <h4 className="text-[#f5f5f5] mb-5 sm-20:mb-[5px] bricolage-font-family">
                info@nexdevsolutions.net
              </h4>
              <h4 className="text-[#f5f5f5] mb-5 bricolage-font-family">+923081992088</h4>
              {/* <SocialMedia /> */}
            </div>
          </div>
          <div className="base-sm:mt-[80px] mt-[30px] mb-[20px] sm-20:mt-[30px]">
            <WordPullUp
              className="word-spacing tracking-[-0.01em] sm-13:text-start sm-13:p-[0px] heading-primary text-white text-[3rem] min-sm:w-[100%] max-sm:ml-[-10px] sm-542:text-[4rem] min-sm:text-[3rem] sm-20:text-[5rem] sm:text-[4rem] md:text-[3rem] sm-603:text-[5rem] sm-742:text-[6rem] big-max:text-[9rem] max-2xl:text-[9rem] p-10 leading-[5rem] sm-20:leading-[5rem] sm-603:leading-[5rem] min-sm:leading-[3rem] 4xl:leading-[8rem]"
              words="Crafting Since 2016"
            />
            <p className="text-[#f5f5f5] sm-583:w-[100%] text-lg sm-547:text-[14px] text-center mt-6 bricolage-font-family">
              © nexdevsolutions.com 2024. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
