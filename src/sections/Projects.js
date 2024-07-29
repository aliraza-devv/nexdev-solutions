"use client";
import React from "react";
import Image from "next/image";
import FadeText from "@/components/Text/FadeText";
import WordPullUp from "@/components/Text/WordPullUp";
import BtnPrimary from "@/components/Buttons/BtnPrimary";
import LandA from "../../public/Assets/mockups/LandA.png";
import SparklesText from "@/components/Text/SparklesText";
import TertiaryButton from "@/components/Buttons/TertiaryButton";
import { VelocityScroll } from "@/components/Text/VelocityScroll";
import Smartform from "../../public/Assets/mockups/Smarterform.png";
import SellerGoals from "../../public/Assets/mockups/sellergoals.png";

export function Projects() {
  return (
    <div className="w-[100%] h-full mt-36 relative flex flex-col items-center">
      <h1 className="text-center mb-20">
        <SparklesText text="Our Work" />
      </h1>
      <h1 className="absolute left-4 md:left-10 top-0 font-black heading-primary text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] z-[-1] text-[#242424]">
        Proud
      </h1>
      <div className="fade-in-bottom w-[90%] flex gap-6 justify-center flex-col mb-20 rounded dark:bg-gray-50/[.10] p-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <WordPullUp
            className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
            words="Smarter Form"
          />
          <TertiaryButton title="Learn More" url="https://smarterform.online/" className="mt-4 md:mt-0" />
        </div>
        <hr className="w-full border-[#f5f5f5] mt-6 md:mt-0" />
        <div className="flex flex-col lg:flex-row justify-around items-start gap-10 mt-6">
          <div className="w-full lg:w-[30%]">
            <Image
              src={Smartform}
              width={400}
              height={400}
              alt="NeXDev Solutions Project Mockup"
              className="rounded"
            />
            <div className="flex mt-6 gap-4 flex-wrap">
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                Development
              </div>
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                Database
              </div>
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                DevOps
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[43%]">
            <h2 className="text-[#f5f5f5] mb-10 font-semibold text-2xl md:text-3xl heading-sub-responsive">
              SaaS CRM with complex multi-step forms and Dashboards
            </h2>
            <FadeText
              className="text-lg text-black dark:text-white mt-10"
              direction="up"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
              text="NeXDev Solutions and their team created this SaaS CRM web app for multiple business owners to create their own flow of forms. All three users have their own dashboards where they can create, submit, and review the forms."
            />
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row justify-around w-full lg:w-[40%] gap-4">
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  100%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Leads
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  67%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Revenue
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  200%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Visibility
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Project */}
      <div className="fade-in-bottom w-[90%] flex gap-6 justify-center flex-col mb-20 rounded dark:bg-gray-50/[.10] p-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <WordPullUp
            className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
            words="L&A Outsource"
          />
          <TertiaryButton title="Learn More" url="https://laoutsourced.com/" className="mt-4 md:mt-0" />
        </div>
        <hr className="w-full border-[#f5f5f5] mt-6 md:mt-0" />
        <div className="flex flex-col lg:flex-row justify-around items-start gap-10 mt-6">
          <div className="w-full lg:w-[30%]">
            <Image
              src={LandA}
              width={400}
              height={400}
              alt="NeXDev Solutions Project Mockup"
              className="rounded"
            />
            <div className="flex mt-6 gap-4 flex-wrap">
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                Development
              </div>
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                UI/UX
              </div>
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                SEO
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[43%]">
            <h2 className="text-[#f5f5f5] mb-10 font-semibold text-2xl md:text-3xl">
              WordPress website
            </h2>
            <FadeText
              className="text-lg text-black dark:text-white mt-10"
              direction="up"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
              text="NeXDev Solutions and their team created this and designed this website which showcases an outsource company and their services of outsourcing administration compliance, and software. Users can contact through WhatsApp or contact form through the website."
            />
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row justify-around w-full lg:w-[40%] gap-4">
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  100%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Leads
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  87%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Investors
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  100%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3rd Project */}
      <div className="fade-in-bottom w-[90%] flex gap-6 justify-center flex-col mb-20 rounded dark:bg-gray-50/[.10] p-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <WordPullUp
            className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-[#f5f5f5] md:text-5xl md:leading-[5rem]"
            words="Seller Goals"
          />
          <TertiaryButton title="Learn More" url="https://sellergoals.com/" className="mt-4 md:mt-0" />
        </div>
        <hr className="w-full border-[#f5f5f5] mt-6 md:mt-0" />
        <div className="flex flex-col lg:flex-row justify-around items-start gap-10 mt-6">
          <div className="w-full lg:w-[30%]">
            <Image
              src={SellerGoals}
              width={400}
              height={400}
              alt="NeXDev Solutions Project Mockup"
              className="rounded"
            />
            <div className="flex mt-6 gap-4 flex-wrap">
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                Development
              </div>
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                UI/UX
              </div>
              <div className="flex justify-center items-center w-[30%] lg:w-[33%] rounded p-2 border border-[#a89bff] text-[#f5f5f5]">
                SEO
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[43%]">
            <h2 className="text-[#f5f5f5] mb-10 font-semibold text-2xl md:text-3xl">
              WordPress website
            </h2>
            <FadeText
              className="text-lg text-black dark:text-white mt-10"
              direction="up"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
              text="NeXDev Solutions and their team Created and designed this website which showcase an Amazon Agency and their services of outsourcing administration compliance, and software. User can views all the details about the agency and their services. NeXDev Solutions integrated multi-step forms with complex logics. NeXDev Solutions"
            />
          </div>
          <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row justify-around w-full lg:w-[40%] gap-4">
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  80%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Leads
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  140%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Revenue
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h4 className="w-[9rem] h-[10vh] mb-6 flex justify-center items-center text-[#f5f5f5] rounded bg-[#5c45fd] path-clip">
                  140%
                </h4>
                <p className="text-[#f5f5f5] text-sm text-center">
                  Increased Revenue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[100%] w-full flex items-center justify-center"></div>
      <div className="flex items-center justify-center w-full mb-10">
        <BtnPrimary
          url="https://cal.com/nexdevsolutions/discovery-call"
          title="Book a Call"
        />
      </div>
      <VelocityScroll
        text="Let's Work Together."
        default_velocity={1}
        className="font-display index text-center font-bold tracking-[-0.02em] heading-primary text-black drop-shadow-xl dark:text-white text-[8rem] mb-14 leading-[5rem]"
      />
    </div>
  );
}
