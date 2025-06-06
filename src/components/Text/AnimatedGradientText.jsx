import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

export default function AnimatedGradientText({ children, className }) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-2xl bg-white/40 px-4 py-1.5 text-md font-bold shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] bg-[#161616]",
        className
      )}
    >
      <div
        className={`absolute inset-0 block w-[100%] animate-gradient bg-gradient-to-r from-[#a89bff]/50 via-[#f5f5f5]/50 to-[#5c45fd]/50 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />

      {children}
    </div>
  );
}

AnimatedGradientText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
