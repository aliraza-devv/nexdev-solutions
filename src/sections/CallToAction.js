"use client";
import React from "react";
import One from "../../public/Assets/parallax/seller.PNG";
// import Ten from "../../public/Assets/parallax/aceternityui.png";
import Three from "../../public/Assets/images/website-11.png";
import Four from "../../public/Assets/images/website-12.png";
import Five from "../../public/Assets/images/website-13.png";
import Six from "../../public/Assets/images/website-14.png";
import Seven from "../../public/Assets/images/website-1.png";
import Eight from "../../public/Assets/images/website-2.png";
import Nine from "../../public/Assets/images/website-3.png";
import Ten from "../../public/Assets/images/website-4.png";
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
    title: "Hello Boba",
    // link: "https://cursor.so",
    thumbnail: Ten,
  },
  {
    title: "Nathan Lauren",
    // link: "https://userogue.com",
    thumbnail: Three,
  },

  {
    title: "Logo",
    // link: "https://editorially.org",
    thumbnail: Four,
  },
  {
    title: "Raquel",
    // link: "https://editrix.ai",
    thumbnail: Five,
  },
  {
    title: "Richard Moore",
    // link: "https://app.pixelperfect.quest",
    thumbnail: Six,
  },

  {
    title: "Dentist",
    // link: "https://algochurn.com",
    thumbnail: Seven,
  },
  {
    title: "Green Leaf",
    // link: "https://ui.aceternity.com",
    thumbnail: Eight,
  },
  {
    title: "Nisa",
    // link: "https://tailwindmasterkit.com",
    thumbnail: Nine,
  },
  {
    title: "Hello Boba",
    // link: "https://smartbridgetech.com",
    thumbnail: Ten,
  },
  {
    title: "Nthan Lauren",
    // link: "https://renderwork.studio",
    thumbnail: Three,
  },

  {
    title: "Raquel",
    // link: "https://cremedigital.com",
    thumbnail: Five,
  },
  {
    title: "Hello Boba",
    // link: "https://goldenbellsacademy.com",
    thumbnail: Ten,
  },
  {
    title: "Richard Moore",
    // link: "https://invoker.lol",
    thumbnail: Six,
  },
  {
    title: "Hello Boba",
    // link: "https://efreeinvoice.com",
    thumbnail: Ten,
  },
];
