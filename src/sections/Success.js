import React from "react";
import { RevealText } from "@/components/RevealText/RevealText";
import Image from "next/image";

import Examangement from "../../public/Assets/mockups/Mockup-1.png";
import Sellergoals from "../../public/Assets/mockups/Mockup-3.png";
import Smarterform from "../../public/Assets/mockups/Smarterform.png";

const Success = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center mt-36">
      <RevealText
        className="heading-bold"
        text="Conversion-Focused Design That Attracts Leads and Clients, Proven by Real Results"
      />

      {/* 1st */}
      <div className="flex flex-col justify-evenly items-center md:flex-row w-[60%] mt-36">
        <div className="w-[40%] relative">
          <div className="glassmorphism p-7 w-30% absolute top-[-3rem] text-center left-[-9rem]">
            <span className="text-[#f5f5f5] heading-bold text-xl">
              Closed 15+ leads
              <br /> in 3 days of launch
            </span>
          </div>
          <div className="glassmorphism p-7 w-30% absolute bottom-[-2rem] right-0">
            <span className="text-[#f5f5f5] heading-bold text-xl">
              $120k/month
            </span>
          </div>
          <Image
            src={Examangement}
            height={400}
            width={400}
            alt="web app project mockup"
            className="rounded-[1rem]"
          />
        </div>
        <div className="flex flex-col w-[60%]">
          <h3 className="heading-bold mb-5 text-3xl w-full text-[#f5f5f5]">
            EXAMANAGEMENT closed 15+ leads from website in 3 day of launch and
            making $120k/month
          </h3>
          <p className="text-xl text-[#f5f5f5] w-[80%]">
            We built a service base website funnel which helps EXAMANAGEMENT
            close 35+ leads per month an making $120k/month
          </p>
        </div>
      </div>

      {/* 2nd */}
      <div className="flex flex-col justify-between items-center md:flex-row w-[60%] mt-36">
        <div className="flex flex-col w-[60%]">
          <h3 className="heading-bold mb-5 text-3xl w-full text-[#f5f5f5]">
            Increased 62% conversion and booked 10 high-ticket clients in first
            2 weeks
          </h3>
          <p className="text-xl text-[#f5f5f5] w-[100%]">
            We built a service base website funnel for Seller Goals which
            converts 62% of their traffic and helped them close 10 high-ticket
            clients. Every month they are booking 10-15 high-ticket leads
            through website.
          </p>
        </div>
        <div className="w-[40%] relative">
          <div className="glassmorphism p-7 w-30% absolute top-[-4.5rem] text-center left-[-8rem]">
            <span className="text-[#f5f5f5] heading-bold text-xl">
              Increased <br /> 62% Conversion
            </span>
          </div>
          <div className="glassmorphism p-7 w-30% absolute text-center bottom-[-4rem] right-[-5rem]">
            <span className="text-[#f5f5f5] heading-bold text-xl">
              closed 10 <br />
              high-ticket clients
            </span>
          </div>
          <Image
            src={Sellergoals}
            height={400}
            width={400}
            alt="web app project mockup"
            className="rounded-[1rem]"
          />
        </div>
      </div>

      {/* 3rd */}

      <div className="flex flex-col justify-evenly items-center md:flex-row w-[60%] mt-36">
        <div className="w-[40%] relative">
          <div className="glassmorphism p-7 w-30% absolute top-[-2rem] left-[-4rem]">
            <span className="text-[#f5f5f5] heading-bold text-xl">
              100% Investors
            </span>
          </div>
          <div className="glassmorphism p-7 w-30% absolute bottom-[-2rem] right-0">
            <span className="text-[#f5f5f5] heading-bold text-xl">
              Within 1 month
            </span>
          </div>
          <Image
            src={Smarterform}
            height={400}
            width={400}
            alt="web app project mockup"
            className="rounded-[1rem]"
          />
        </div>
        <div className="flex flex-col w-[60%]">
          <h3 className="heading-bold mb-5 text-3xl w-full text-[#f5f5f5]">
            Increased 100% investors within 1 month
          </h3>
          <p className="text-xl text-[#f5f5f5] w-[80%]">
            Smarterform completed their goal of getting 100% investors in first
            month by working with us.
          </p>
        </div>
      </div>
      <div className="mt-20">
        <video width="300" controls>
          <source src="/myvideo.mp4" type="video/mp4" />
          {/* <source src="/myvideo.webm" type="video/webm" /> */}
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Success;
