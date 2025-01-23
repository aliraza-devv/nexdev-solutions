"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Founder from "../../../public/Assets/images/Founder.png";
import Image from "next/image";
import {useState, useEffect} from "react";

export function Lamp() {
  const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
  return (
    <>
    {/* <LampContainer className="h-[40px] w-full sm-20:w-full"></LampContainer> */}
    {/* <div className="absolute top-[0px] border inset-auto z-[99999999999999999] h-[100px] w-full bg-[red] "></div> */}
      <div className="w-[90%]  relative sm-438:pt-[0px] pt-[40px] mt-[90px] sm-383:pt-[100px] flex flex-row justify-center items-center overflow-hidden lg:w-[100%]  sm-20:w-[100%] ">
     
        <div className="flex flex-col lg:flex-row w-[90%]  items-center sm-20:gap-[5px] justify-center gap-20">
          {width > 1025 && (<motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-full mt-[-60px]  md:w-[60%] sm-20:w-[100%] lg:w-[70%]"
          >
            <motion.h1 className="bg-gradient-to-br w-full sm-20:text-center from-slate-300 lg-1189:text-5xl to-slate-500 py-4 bg-clip-text text-start text-4xl font-medium tracking-tight text-transparent md:text-7xl heading-primary">
              Meet the Founder
            </motion.h1>
            <p className="mt-1 bg-gradient-to-br sm-20:text-center text-[#f5f5f5] py-4 bg-clip-text text-start text-xl font-medium tracking-tight md:text-2xl bricolage-font-family">
              Hey, I am{" "}
              <span className="gradient-text font-bold">Ali Raza</span>. I have
              always been a tech enthusiast. With more than 8 years of
              experience in my field, learning from the best in the industury,
              investing my time and money, I have found my proven <br />
              The
              <span className="gradient-text font-bold">
                {" "}K-SIGHT mechanism
              </span>{" "}
              which can boost your leads, conversion, sales, and business in the
              best way possible.{" "}
              <span className="gradient-text font-bold">My Goal </span>
              through NeXDev Solutions is to create the best web experiences
              that actually sell and convert normal users into your loyal
              customers.
            </p>
          </motion.div>)}
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-[30%] flex flex-col items-center "
          >
            {/* {width < 1025 && (
              <>
                <motion.h1 className="bg-gradient-to-br flex justify-center w-[500px] mt-[0px] sm-20:text-center from-slate-300 lg-1189:text-5xl to-slate-500 bg-clip-text text-start text-4xl font-medium tracking-tight text-transparent md:text-7xl">
                Meet the Founder
                </motion.h1>
                Hey, I am{" "}
                <span className="gradient-text w-[500px] font-bold">Ali Raza</span>.
                With more than 8 years of
                experience in my field, learning from the best in the industury, I have found my proven The <span className="gradient-text font-bold">{" "}K-SIGHT mechanism
                </span>{" "}
                which can boost your leads, conversion, sales, and business in the
                best way possible.{" "}
              </>
            )} */}
            { width < 1025 && 
            (<div className="w-[700px] heading-primary sm-20:text-3xl sm-420:text-2xl min-sm:text-xl lg-5:bricolage-font-family text-5xl text-center text-[#f5f5f5] ">
              CEO and Founder
            </div>)}
            <Image
              src={Founder}
              height={350}
              width={450}
              alt="Nexdev solutions Founder"
              className="rounded-[1rem] mt-[30px] mb-4 base-sm:max-w-[220%] lg-1025:max-w-[180%] bg-gradient-to-r from-[#5c45fd]   to-[#a89bff] p-1 inline-block border-[#f5f5f5] border"
            />
            <span className="signature-font text-5xl text-center w-[600px] text-[#f5f5f5] mt-3">
              Ali Raza
            </span>
            {
              width < 1025 && (
                <p className="mt-1 sm-20:font-extralight sm-991:font-extralight bg-gradient-to-br sm-603:w-[500px] sm-364:w-[300px] sm-417:w-[350px] sm-521:w-[400px] w-[600px] sm-20:text-center text-[#f5f5f5] py-4 bg-clip-text text-start text-xl font-medium tracking-tight md:text-2xl">
                Hey, I am{" "}
                <span className="gradient-text font-bold">Ali Raza</span>. I have
                always been a tech enthusiast. With more than 8 years of
                experience in my field, learning from the best in the industury,
                investing my time and money, I have found my proven <br />
                The
                <span className="gradient-text font-bold">
                  {" "}K-SIGHT mechanism
                </span>{" "}
                which can boost your leads, conversion, sales, and business in the
                best way possible.{" "}
                <span className="gradient-text font-bold">My Goal </span>
                through NeXDev Solutions is to create the best web experiences
                that actually sell and convert normal users into your loyal
                customers.
                </p>
              )
            }
           
          </motion.div>
      </div>
        </div>
        </>
  
  );
}

export const LampContainer = ({ children, className }) => {
  const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  return (
    <div 
    // style={{paddingTop: width > 1025 ? "400px": "" }} 
    className="w-full 
    z-0 mt-[120px] overflow-hidden ">
    <div
      className={cn(
        "absolute mt-[-50px] overflow-hidden flex flex-col items-center justify-center bg-[#161616] w-full rounded-md  z-0 ",
        className
      )}
    >
      <div className="relative flex w-full sm-617:w-[100%] flex-1 items-center justify-center z-999999 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: width < 322 ? "15rem" : width < 542 ? "15rem" :  "30rem"  }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute z-50 sm-617:w-[70%] top-[-160px] inset-auto right-1/2 h-56 overflow-visible w-[20rem] bg-gradient-conic from-[#5c45fd] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-[#161616] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-[#161616]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: width < 322 ? "15rem" :  width < 542 ? "15rem": "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto z-50 top-[-160px] left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#5c45fd] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute base-sm:w-74  w-40 h-[100%] right-0 bg-[#161616]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-[#161616] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        {/* <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#161616] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div> */}
        {/* <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[green] opacity-0 blur-3xl"></div> */}
        {/* <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 base-sm:w-10 -translate-y-[6rem] rounded-full base-sm:bg-gradient-to-r from-[#161616] via-[#5c45fd] to-[#161616] blur-2xl"
        ></motion.div> */}

        <div className="absolute inset-auto z-40 h-14 w-full -translate-y-[12.5rem] bg-[#161616] "></div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width:  width < 322 ? "15rem" : width < 542 ? "15rem" : "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto top-[-50px] z-50 h-[5px] w-[30rem] -translate-y-[7rem] bg-[#5c45fd] "
        ></motion.div>
       
      </div>

      {/* <div className="relative w-full z-50 flex flex-col items-center heading-primary px-5">
        {children}
      </div> */}
    </div>
    </div>
  );
};
