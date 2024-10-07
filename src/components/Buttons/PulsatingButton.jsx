"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function PulsatingButton({
  className,
  children,
  pulseColor = "#5c45fd",
  duration = "1.5s",
  url,
  ...props
}) {
  return (
    <Link href={`${url}`} target="_blank">
      <button
        className={cn(
          "relative text-center cursor-pointer flex justify-center items-center rounded-lg text-[#f5f5f5] bg-[#5c45fd] px-4 py-2",
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
    </Link>
  );
}
