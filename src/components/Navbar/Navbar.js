"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import nexdev from "../../../public/Assets/Logos/nexdev-logo.png";
import BtnPrimary from "../Buttons/BtnPrimary";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed index-2 glassmorphism rounded-full w-[90%] lg:w-[80%] h-[10%] mt-[8rem] flex justify-between items-center px-4 lg:px-8">
      <Link href={"#home"}>
        <div>
          <Image src={nexdev} height={75} width={75} alt="NeXDev Solutions" />
        </div>
      </Link>
      <div className="hidden lg:flex justify-center items-center">
        {/* <div className=""> */}
        <SlideTabs />
        {/* </div> */}
      </div>
      <div className="hidden lg:block">
        <BtnPrimary
          url="https://cal.com/nexdevsolutions/discovery-call"
          title="Book a Call"
        />
      </div>
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-[#f5f5f5]">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute index-2 top-20 left-0 right-0 bg-[#161616] rounded flex flex-col items-center">
          <ul className="flex index-2 flex-col items-center">
            <li className="text-[#f5f5f5] py-2 link-hover">Services</li>
            <li className="text-[#f5f5f5] py-2 link-hover">Work</li>
            <li className="text-[#f5f5f5] py-2 link-hover">Process</li>
            <li className="text-[#f5f5f5] py-2 link-hover">Get a Quote</li>
            <li className="text-[#f5f5f5] py-2 link-hover">Why us?</li>
            <li className="text-[#f5f5f5] py-2 link-hover">FAQs</li>
          </ul>
          <div className="py-4">
            <BtnPrimary
              url="https://cal.com/nexdevsolutions/discovery-call"
              title="Book a Call"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-fit p-1"
    >
      <Tab setPosition={setPosition}>Services</Tab>
      <Tab setPosition={setPosition}>Work</Tab>
      <Tab setPosition={setPosition}>Process</Tab>
      <Tab setPosition={setPosition}>Get a Quote</Tab>
      <Tab setPosition={setPosition}>FAQs</Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-[#f5f5f5] md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full  bg-[#5c45fd] md:h-12"
    />
  );
};