"use client";
import React from "react";
import { RevealText } from "@/components/RevealText/RevealText";
import Image from "next/image";
import { useState, useEffect } from "react";
import Examangement from "../../public/Assets/mockups/Mockup-1.png";
import Sellergoals from "../../public/Assets/mockups/Mockup-3.png";
import Smarterform from "../../public/Assets/mockups/Smarterform.png";

const Success = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex w-[100vw] flex-col items-center justify-center mt-36">
      <RevealText
        className="heading-bold sm-328:pt-[80px]"
        text={
          width > 939
            ? "Proven Designs perfect for Leads and Clients"
            : "Proven Designs Perfect for Leads and Clients"
        }
      />

      {/* 1st */}
      <div className="h-full pt-20 lg-3:pt-20 w-full flex flex-col items-center">
        <div className="flex flex-row justify-evenly items-center sm-6:items-start sm-945:ml-[0px]   sm-4:ml-[0]  sm-3:w-[85vw] sm-5:flex-col sm-5:gap-[30px] w-[60%] mt-36 max-xl:w-[75vw] max-lg:w-[78vw] lg-1:ml-[0] max-xl:ml-[100px]">
          <div className="w-[40%] sm-5:w-[100%] relative">
            <div className="glassmorphism p-7 w-30% absolute top-[-3rem] text-center left-[-9rem] lg-1:hidden">
              <span className="text-[#f5f5f5] bricolage-font-family max-lg:text-md heading-bold text-xl lg-1:hidden">
                Closed 5+ leads
                <br /> in 2 weeks of launch
              </span>
            </div>
            <div className="glassmorphism bricolage-font-family p-7 w-30% absolute bottom-[-2rem] right-0 lg-1:hidden">
              <span className="text-[#f5f5f5] heading-primary text-xl">
                $50k/month
              </span>
            </div>
            <Image
              src={Examangement}
              // height={400}
              // width={400}
              alt="web app project mockup"
              className="rounded-[1rem] bricolage-font-family  sm-5:w-[100%] sm-6:w-[100%] sm-5:h-[30%]  sm-6:ml-[0]"
            />
          </div>
          <div className="flex flex-col w-[60%] sm-5:w-[100%] sm-5:ml-[0] big-max:ml-6 max-2xl:ml-6">
            <h3 className="font-semibold bricolage-font-family xs-1:font-normal xs-2:font-light mb-5 xs-2:text-md text-3xl xs-1:text-2xl w-full text-[#f5f5f5]">
              Closed 5+ leads from website in 2 weeks of launch and making
              $50k/month.
            </h3>
            <p className="text-xl sm-991:font-extralight xs-2:font-thin xs-1:text-lg xs-2:text-sm text-[#f5f5f5] w-[100%] bricolage-font-family">
              We built a service base website funnel which helps EXAMANAGEMENT
              close more leads, stand out from competitors.
            </p>
          </div>
        </div>

        {/* 2nd */}
        <div className="flex  flex-row justify-between items-center sm-5:items-end sm-5:flex-col sm-5:gap-[30px] w-[60%] mt-36 sm-3:w-[85vw] max-lg:w-[80vw] max-xl:w-[75vw]">
          {width > 866 && (
            <div className="flex flex-col w-[60%] sm-5:w-[100%]">
              <h3 className="heading-bold bricolage-font-family  mb-5 text-3xl xs-1:font-normal xs-2:text-md xs-1:text-2xl xs-2:font-light w-full text-[#f5f5f5] sm-5:w-[100%] max-2xl:w-[80%]">
                Increased 48% conversion and booked 6 high-ticket clients in
                first 3 weeks
              </h3>
              <p className="text-xl  sm-991:font-extralight text-[#f5f5f5] xs-2:font-thin xs-1:text-lg xs-2:text-sm w-[100%] bricolage-font-family">
                We built a service base website funnel for Seller Goals which
                converts 48% of their traffic. Every month they are booking 7-10
                high-ticket clients through website.
              </p>
            </div>
          )}
          <div className="w-[40%] sm-5:w-[100%] relative max-2xl:ml-6 max-xl:ml-6 lg-2:ml-10 sm-5:ml-[0]">
            <div className="glassmorphism p-7 w-30% absolute top-[-4.5rem] max-xl-left-[0] text-center left-[-8rem] lg-1:hidden">
              <span className="text-[#f5f5f5] bricolage-font-family  heading-semibold text-xl">
                Increased <br /> 48% Conversion
              </span>
            </div>
            <div className="glassmorphism p-7 w-30% sm-3:w-[80%] lg-1:hidden absolute text-center bottom-[-4rem] right-[-5rem]  sm-3:left-[0]">
              <span className="text-[#f5f5f5] bricolage-font-family  heading-semibold text-xl">
                closing 7-10 <br />
                high-ticket clients/month
              </span>
            </div>
            <Image
              src={Sellergoals}
              // height={400}
              // width={400}
              alt="web app project mockup"
              className="rounded-[1rem] sm-5:w-[100%] sm-6:w-[100%] sm-5:h-[30%]"
            />
            {width <= 866 && (
              <div className="flex flex-col mt-[30px] w-[60%] sm-5:w-[100%]">
                <h3 className="heading-bold bricolage-font-family  mb-5 text-3xl xs-1:font-normal xs-2:text-md xs-1:text-2xl xs-2:font-light w-full text-[#f5f5f5] sm-5:w-[100%] max-2xl:w-[80%]">
                  Increased 48% conversion and booked 6 high-ticket clients in
                  first 3 weeks
                </h3>
                <p className="text-xl  sm-991:font-extralight text-[#f5f5f5] xs-2:font-thin xs-1:text-lg xs-2:text-sm w-[100%] bricolage-font-family">
                  We built a service base website funnel for Seller Goals which
                  converts 48% of their traffic. Every month they are booking
                  7-10 high-ticket clients through website.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3rd */}

        <div className="flex flex-row justify-evenly sm-3:w-[85vw] sm-5:gap-[30px]  items-center sm-5:items-start sm-5:flex-col w-[60%] max-lg:w-[78vw] mt-36 max-xl:w-[75vw]">
          <div className="w-[40%] sm-5:w-[100%] relative">
            <div className="glassmorphism lg-1:hidden p-7 w-30% absolute top-[-2rem] left-[-4rem]">
              <span className="text-[#f5f5f5] bricolage-font-family  heading-semibold text-xl">
                100% Investors
              </span>
            </div>
            <div className="glassmorphism lg-1:hidden p-7 w-30% absolute bottom-[-2rem] right-0">
              <span className="text-[#f5f5f5] bricolage-font-family  heading-semibold text-xl">
                Within 1 month
              </span>
            </div>
            <Image
              src={Smarterform}
              height={400}
              width={400}
              alt="web app project mockup"
              className="rounded-[1rem] sm-5:w-[100%] sm-6:w-[100%] sm-5:h-[30%]"
            />
          </div>
          <div className="flex flex-col w-[60%] sm-5:w-[100%] max-2xl:ml-6 sm-5:ml-[0]">
            <h3 className="heading-bold bricolage-font-family  mb-5 text-3xl xs-1:font-normal xs-2:text-md xs-1:text-2xl xs-2:font-light w-full text-[#f5f5f5]">
              Increased 100% investors within 1 month
            </h3>
            <p className="text-xl sm-991:font-extralight text-[#f5f5f5] w-[80%] xs-2:font-thin xs-1:text-lg xs-2:text-sm bricolage-font-family">
              Smarterform completed their goal of getting 100% investors in
              first month by working with us.
            </p>
          </div>
        </div>
        <div className="mt-20 flex gap-10 flex-col md:flex-row">
          <video width="300" className="rounded-xl" controls>
            <source src="/myvideo.mp4" type="video/mp4" />
            {/* <source src="/myvideo.webm" type="video/webm" /> */}
            Your browser does not support the video tag.
          </video>
          <video width="300" className="rounded-xl" controls>
            <source src="/Testimonial-2.MP4" type="video/mp4" />
            {/* <source src="/myvideo.webm" type="video/webm" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Success;
