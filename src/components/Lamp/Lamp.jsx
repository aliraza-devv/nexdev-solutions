"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Founder from "../../../public/Assets/images/Founder.png";
import Image from "next/image";

export function Lamp() {
  return (
    <LampContainer>
      <div className="w-[100%] lg:w-[80%]">
        <div className="flex flex-col lg:flex-row items-center w-full justify-center gap-20">
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-full md:w-[60%] lg:w-[70%]"
          >
            <motion.h1 className="bg-gradient-to-br w-full from-slate-300 to-slate-500 py-4 bg-clip-text text-start text-4xl font-medium tracking-tight text-transparent md:text-7xl">
              Meet the Founder
            </motion.h1>
            <p className="mt-1 bg-gradient-to-br text-[#f5f5f5] py-4 bg-clip-text text-start text-xl font-medium tracking-tight md:text-2xl">
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
              that that actually sells and convert normal user into your loyal
              customer.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-full md:w-[40%] flex flex-col"
          >
            <Image
              src={Founder}
              height={350}
              width={450}
              alt="Nexdev solutions Founder"
              className="rounded-[1rem] mt-8 mb-4 bg-gradient-to-r from-[#5c45fd]  to-[#a89bff] p-1 inline-block border-[#f5f5f5] border"
            />
            <span className="signature-font text-5xl text-center w-full text-[#f5f5f5] mt-3">
              Ali Raza
            </span>
          </motion.div>
        </div>
      </div>
    </LampContainer>
  );
}

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#161616] w-full rounded-md z-0 mb-20 mt-20",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-[#5c45fd] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-[#161616] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-[#161616]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-[#5c45fd] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-[#161616]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-[#161616] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#161616] blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#5c45fd] opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-[#5c45fd] blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-[#5c45fd] "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#161616] "></div>
      </div>

      <div className="relative lg:top-[-15rem] z-50 flex flex-col items-center heading-primary px-5">
        {children}
      </div>
    </div>
  );
};
