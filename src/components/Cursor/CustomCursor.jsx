"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const App = () => {
  useEffect(() => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 });
    let targets = gsap.utils.toArray(".ball");

    window.addEventListener("mousemove", (e) => {
      // Clamp the mouse position to ensure it stays within the viewport bounds
      const x = Math.min(window.innerWidth, Math.max(0, e.clientX)); // Clamp to viewport width
      const y = Math.min(window.innerHeight, Math.max(0, e.clientY)); // Clamp to viewport height

      gsap.to(targets, {
        duration: 0.5,
        x: x, 
        y: y, 
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    });
  }, []);

  return (
    <>
      <div className="">
        <div className="ball bg-[#5c45fd] w-5 h-5 fixed top-0 left-0 rounded-full z-[-1]"></div>
        <div className="ball bg-[#5c45fd] w-5 h-5 fixed top-0 left-0 rounded-full z-[-1]"></div>
        <div className="ball bg-[#5c45fd] w-5 h-5 fixed top-0 left-0 rounded-full z-[-1]"></div>
        <div className="ball bg-[#5c45fd] w-5 h-5 fixed top-0 left-0 rounded-full z-[-1]"></div>
        <div className="ball bg-[#5c45fd] w-5 h-5 fixed top-0 left-0 rounded-full z-[-1]"></div>
      </div>
    </>
  );
};

export default App;