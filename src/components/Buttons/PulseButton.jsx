"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function PulseButton({
  className,
  children,
  pulseColor = "#a89bff",
  duration = "1.5s",
  ...props
}) {
  return (
    <button
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-[#5c45fd]  px-4 py-2",
        className
      )}
      style={{
        "--pulse-color": pulseColor,
        "--duration": duration,
      }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}