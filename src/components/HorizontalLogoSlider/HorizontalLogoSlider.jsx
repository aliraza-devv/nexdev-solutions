"use client";
import Slider from "react-infinite-logo-slider";
import One from "../../../public/Assets//images/1.jpg";
import Two from "../../../public/Assets//images/2.jpg";
import Three from "../../../public/Assets//images/3.png";
import Four from "../../../public/Assets//images/4.png";
import Five from "../../../public/Assets//images/5.png";
import Six from "../../../public/Assets//images/6.jpg";
import Seven from "../../../public/Assets//images/7.png";
import Eight from "../../../public/Assets//images/8.png";
import Nine from "../../../public/Assets//images/9.jpg";
import Ten from "../../../public/Assets//images/10.jpg";
import Eleven from "../../../public/Assets//images/11.jpg";
import Twelve from "../../../public/Assets//images/12.jpg";
import Thirteen from "../../../public/Assets//images/13.jpg";
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
    caption: "Slide 4",
  },
  {
    name: Five,
    caption: "Slide 5",
  },
  {
    name: Six,
    caption: "Slide 6",
  },
  {
    name: Seven,
    caption: "Slide 7",
  },
  {
    name: Eight,
    caption: "Slide 8",
  },
  {
    name: Nine,
    caption: "Slide 9",
  },
  {
    name: Ten,
    caption: "Slide 10",
  },
  {
    name: Eleven,
    caption: "Slide 11",
  },
  {
    name: Twelve,
    caption: "Slide 12",
  },
  {
    name: Thirteen,
    caption: "Slide 13",
  },
];
const secondRow = slideImages.slice(slideImages.length / 2);
const ImageCard = ({ img, caption }) => {
  return (
    <figure>
      <Image src={img} height={400} width={300} alt={caption} />
    </figure>
  );
};
const HorizontalLogoSlider = () => {
  return (
    <div className="w-full">
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

export default HorizontalLogoSlider;
