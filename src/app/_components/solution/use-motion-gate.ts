"use client";

import { useEffect, useState } from "react";

const MIN_WIDTH = 900;

// Three.js never initialises under prefers-reduced-motion or below 900px
// wide. Both variants render their flat fallback in those cases instead.
export function useMotionGate(): boolean {
  const [allowMotion, setAllowMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => {
      setAllowMotion(!query.matches && window.innerWidth >= MIN_WIDTH);
    };
    evaluate();
    query.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      query.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return allowMotion;
}
