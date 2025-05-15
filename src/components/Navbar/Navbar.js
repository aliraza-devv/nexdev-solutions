"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import nexdev from "../../../public/Assets/Logos/nexdevNew.png";
import BtnPrimary from "../Buttons/BtnPrimary";
import BtnLight from "../Buttons/BtnLight";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
   
  };

  useEffect(() => {
      console.log("isOpen has the value of", isOpen);
      if (isOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
  }, [isOpen])

  return (
    <div style={{zIndex: '999999'}} className="fixed glassmorphism sm-20:mt-[100px] rounded-[1rem] min-w-[90%] max-w-[80%] h-[80px] mt-[5rem]  md:mt-[7rem] flex justify-between items-center px-4 lg:px-8">
      <Link href={"#home"}>
        <div>

          <Image
            src={nexdev}
            height={75}
            width={75}
            alt="NeXDev Solutions Logo"
          />
        </div>
      </Link>
      <div className="hidden xl:flex justify-center items-center">
        <SlideTabs />
      </div>
      <div className="hidden xl:block">
        <BtnPrimary
          url="https://cal.com/nexdevsolutions/discovery-call"
          title="Book Your Free Call"
        />
        {/* <span className="ml-2">
          <BtnLight
            title="Get Free Audit"
            url="https://form.jotform.com/242006777431454"
          />
        </span> */}
      </div>
      <div className="xl:hidden flex items-center">
        <button onClick={toggleMenu} className="text-[#f5f5f5]">
          {!isOpen ? (
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
          ) : (
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0.8, y: 0 }}
          animate={{ opacity: 1, y: 1 }}
          exit={{ opacity: 0.2, y: -20 }} // Fade away and move up slightly when exiting
          transition={{
            delay: 0.2,
            duration: 0.3, // Adjust duration for a smoother fade out
            ease: "easeInOut",
          }}
          className="absolute block h-[530px] w-full top-[90px] p-10 left-[0px] right-[100px] border bg-[#15131D] rounded-[1rem] flex flex-col items-start justify-start gap-32"
        >
          <ul className="flex bricolage-font-family text-3xl font-bold flex-col items-start">
            <motion.li
              onClick={toggleMenu}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="text-[#f5f5f5] py-2 link-hover"
            >
              <Link href={"#services"}>Services </Link>
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="text-[#f5f5f5] py-2 link-hover"
            >
              <Link href="#projects">Work </Link>
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="text-[#f5f5f5] py-2 link-hover"
            >
              <Link href={"#process"}>Process </Link>
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="text-[#f5f5f5] py-2 link-hover"
            >
              <Link href="#pricing">Pricing </Link>
            </motion.li>
            <motion.li
              onClick={toggleMenu}
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="text-[#f5f5f5] py-2 link-hover"
            >
              <Link href="#comparison">Why us? </Link>
            </motion.li>
          </ul>
          <div className="pb-[20px] flex flex-col gap-3" onClick={toggleMenu}>
            <BtnPrimary
              url="https://cal.com/nexdevsolutions/discovery-call"
              title="Book Your Free Call"
            />
            {/* <BtnLight
              title="Get Free Audit"
              url="https://form.jotform.com/242006777431454"
            /> */}
          </div>
        </motion.div>
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
      className="relative mx-auto flex w-fit p-1 heading-primary"
    >
      <Tab setPosition={setPosition}>
        <Link href={"#services"}>Services </Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link href="#projects">Work </Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link href={"#process"}>Process </Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link href="#pricing">Pricing </Link>
      </Tab>
      <Tab setPosition={setPosition}>
        <Link href="#comparison">Why us? </Link>
      </Tab>
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
      className="relative bricolage-font-family z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-[#f5f5f5] md:px-5 md:py-3 md:text-lg"
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
      className="absolute z-0 h-7 rounded-[1rem]  bg-[#5c45fd] md:h-12"
    />
  );
};
