import React from "react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export const Spotlight = ({ className, fill }) => {
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
    <svg
      className={cn(
        "animate-spotlight transform translate-x-[-72%] translate-y-[-62%] top-[0] pointer-events-none absolute z-[1] h-[200%] w-[138%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        {/* First Spotlight */}
        {
          width < 981 ? (
            <ellipse
            cx="2300.71"
            cy="-50.501"
            rx="800" /* Thinner ray */
            ry="500" /* Thinner ray */
            transform="matrix(1 0 0 1 0 0)"
            fill={fill || "#9686ff"}
            fillOpacity="0.3" /* Slightly reduced opacity */
          ></ellipse>
          ) : (
            <>
              {/* <ellipse
                cx="3000.71"
                cy="720.501"
                rx="800" 
                ry="70" 
                transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                fill={"red"}
                fillOpacity="0.3" 
              ></ellipse> */}
            <ellipse
              cx="2300.71"
              cy="500.501"
              rx="800" /* Thinner ray */
              ry="30" /* Thinner ray */
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
              fill={fill}
              fillOpacity="0.4" /* Slightly reduced opacity */
            ></ellipse>
            <ellipse
              cx="2300" /* Reduced the gap by decreasing cx */
              cy="310.501"
              rx="800" /* Thinner ray */
              ry="30" /* Thinner ray */
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 4000 2500)"
              fill={fill}
              fillOpacity="0.5"
            ></ellipse>
            <ellipse
              cx="2000" /* Reduced the gap by decreasing cx */
              cy="80.501"
              rx="800" /* Thinner ray */
              ry="30" /* Thinner ray */
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 4000 2500)"
              fill={fill}
              fillOpacity="0.6"
            ></ellipse>
             <ellipse
              cx="2000" /* Reduced the gap by decreasing cx */
              cy="-150.501"
              rx="700" /* Thinner ray */
              ry="30" /* Thinner ray */
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 4000 2500)"
              fill={fill}
              fillOpacity="0.6"
            ></ellipse>
             <ellipse
              cx="2000" /* Reduced the gap by decreasing cx */
              cy="-400.501"
              rx="650" /* Thinner ray */
              ry="30" /* Thinner ray */
              transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 4000 2500)"
              fill={fill}
              fillOpacity="0.7"
            ></ellipse>
            </>
          )
        }
       
        {/* Second Spotlight */}
        
        {/* Layered Effect for Radiance */}
        {/* <ellipse
          cx="2300.71"
          cy="273.501"
          rx="500" 
          ry="60"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "#9686FF"}
          fillOpacity="1"
        ></ellipse>
        <ellipse
          cx="2400" 
          cy="1000"
          rx="480"
          ry="70"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 4000 2500)"
          fill={fill || "#9686FF"}
          fillOpacity="1"
        ></ellipse> */}
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="70" /* Reduced for thinner glow */
            result="effect1_foregroundBlur_1065_8"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};