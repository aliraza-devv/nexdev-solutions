"use client";
import React from "react";
import One from "../../public/Assets/parallax/seller.PNG";
// import Ten from "../../public/Assets/parallax/aceternityui.png";
import Three from "../../public/Assets/parallax/algochurn.png";
import Four from "../../public/Assets/parallax/cremedigital.png";
import Five from "../../public/Assets/parallax/cursor.png";
import Six from "../../public/Assets/parallax/goldenbellsacademy.png";
import Seven from "../../public/Assets/parallax/moonbeam.png";
import Eight from "../../public/Assets/parallax/pixelperfect.png";
import Nine from "../../public/Assets/parallax/renderwork.png";
import Ten from "../../public/Assets/parallax/rogue.png";
import { CTAParallax } from "@/components/CTAParallax/CTAParallax";

export function CallToAction() {
  return <CTAParallax products={products} />;
}
export const products = [
  {
    title: "Moonbeam",
    // link: "https://gomoonbeam.com",
    thumbnail: One,
  },
  {
    title: "Cursor",
    // link: "https://cursor.so",
    thumbnail: Ten,
  },
  {
    title: "Rogue",
    // link: "https://userogue.com",
    thumbnail: Three,
  },

  {
    title: "Editorially",
    // link: "https://editorially.org",
    thumbnail: Four,
  },
  {
    title: "Editrix AI",
    // link: "https://editrix.ai",
    thumbnail: Five,
  },
  {
    title: "Pixel Perfect",
    // link: "https://app.pixelperfect.quest",
    thumbnail: Six,
  },

  {
    title: "Algochurn",
    // link: "https://algochurn.com",
    thumbnail: Seven,
  },
  {
    title: "Aceternity UI",
    // link: "https://ui.aceternity.com",
    thumbnail: Eight,
  },
  {
    title: "Tailwind Master Kit",
    // link: "https://tailwindmasterkit.com",
    thumbnail: Nine,
  },
  {
    title: "SmartBridge",
    // link: "https://smartbridgetech.com",
    thumbnail: Ten,
  },
  {
    title: "Renderwork Studio",
    // link: "https://renderwork.studio",
    thumbnail: Three,
  },

  {
    title: "Creme Digital",
    // link: "https://cremedigital.com",
    thumbnail: Five,
  },
  {
    title: "Golden Bells Academy",
    // link: "https://goldenbellsacademy.com",
    thumbnail: Ten,
  },
  {
    title: "Invoker Labs",
    // link: "https://invoker.lol",
    thumbnail: Six,
  },
  {
    title: "E Free Invoice",
    // link: "https://efreeinvoice.com",
    thumbnail: Ten,
  },
];
