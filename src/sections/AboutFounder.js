"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lamp } from "@/components/Lamp/Lamp";
import Image from "next/image";
import Founder from "../../public/Assets/images/Founder.png";
import {useState, useEffect} from "react";

export function AboutFounder() {
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
    <div style={{marginTop: width == 768 && "0px"}} className="mb-50 flex justify-center sm-20:mt-[-280px]  sm-438:mt-[-380px] sm-383:mt-[-400px]">
      <Lamp />
    </div>
  );
}
