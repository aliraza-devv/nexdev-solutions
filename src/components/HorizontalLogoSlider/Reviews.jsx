"use client";
import Slider from "react-infinite-logo-slider";
import One from "../../../public/Assets/Reviews/r-0.PNG";
import Two from "../../../public/Assets/Reviews/r-1.PNG";
import Three from "../../../public/Assets/Reviews/r-2.PNG";
import Four from "../../../public/Assets/Reviews/r-3.PNG";
import Five from "../../../public/Assets/Reviews/r-4.PNG";
import Six from "../../../public/Assets/Reviews/r-5.PNG";
import Seven from "../../../public/Assets/Reviews/r-6.PNG";
import Eight from "../../../public/Assets/Reviews/r-7.PNG";
import Image from "next/image";
import Marquee from "../Cards/Marquee";
import { cn } from "@/lib/utils";
import SparklesText from "../Text/SparklesText";

const slideImages = [
  {
    name: One,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Two,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Three,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Four,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Five,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Six,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Seven,
    caption: "Nexdev solutions testimonial",
  },
  {
    name: Eight,
    caption: "Nexdev solutions testimonial",
  },
];
const secondRow = slideImages.slice(slideImages.length / 2);
const ImageCard = ({ img, caption }) => {
  return (
    <figure>
      <Image
        className="ml-7"
        src={img}
        height={100}
        width={375}
        alt={caption}
      />
    </figure>
  );
};
const ReviewsImageSlider = () => {
  return (
    <div className="w-[100%] flex justify-center flex-col items-center mb-20 mt-10">
      <h1 className="text-center">
        <SparklesText text="Why you should trust?" />
      </h1>
      <Marquee pauseOnHover className="[--duration:30s] mt-10 ">
        {slideImages.map((image) => (
          <ImageCard
            key={image.name}
            img={image.name}
            caption={image.caption}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default ReviewsImageSlider;
