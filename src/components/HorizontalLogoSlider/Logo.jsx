"use client";
import Slider from "react-infinite-logo-slider";
import One from "../../../public/Assets/Logos/dbuggers.png";
import Two from "../../../public/Assets/Logos/Gadgeterz.png";
import Three from "../../../public/Assets/Logos/Benefits.png";
import Four from "../../../public/Assets/Logos/goinbazar.png";
import Five from "../../../public/Assets/Logos/americashines.png";
import Six from "../../../public/Assets/Logos/LandA.png";
import Seven from "../../../public/Assets/Logos/uandu.png";
import Eight from "../../../public/Assets/Logos/mobiledoc.png";
import Image from "next/image";
import Marquee from "../Cards/Marquee";
import { cn } from "@/lib/utils";

const slideImages = [
  {
    name: One,
    caption: "Slide 1",
  },
  {
    name: Two,
    caption: "Slide 2",
  },
  {
    name: Three,
    caption: "Slide 3",
  },
  {
    name: Four,
    caption: "Slide 3",
  },
  {
    name: Five,
    caption: "Slide 3",
  },
  {
    name: Six,
    caption: "Slide 3",
  },
  {
    name: Seven,
    caption: "Slide 3",
  },
  {
    name: Eight,
    caption: "Slide 3",
  },
];
const secondRow = slideImages.slice(slideImages.length / 2);
const ImageCard = ({ img, caption }) => {
  return (
    <figure>
      <Image
        className="ml-14"
        src={img}
        height={150}
        width={100}
        alt={caption}
      />
    </figure>
  );
};
const Logo = () => {
  return (
    <div className="w-[75%] flex justify-center flex-col items-center">
      <Marquee pauseOnHover className="[--duration:30s] mt-10">
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

export default Logo;
