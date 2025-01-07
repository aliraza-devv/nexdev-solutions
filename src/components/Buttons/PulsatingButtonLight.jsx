"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PulsatingButtonLight({
  className,
  children,
  pulseColor = "#f5f5f5",
  duration = "1.5s",
  url,
  ...props
}) {
  return (
    <Link href={`${url}`} target="_blank">
      <button
        className={cn(
          "relative text-center text-xl hover:scale-110 transition duration-[200] heading-primary cursor-pointer flex justify-center items-center rounded-[1rem] text-[#5c45fd] bg-[#f5f5f5] px-7 py-4",
          className
        )}
        style={{
          "--pulse-color": pulseColor,
          "--duration": duration,
        }}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div className="absolute top-1/2 left-1/2 size-full rounded-[1rem] bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
      </button>
    </Link>
  );
}
