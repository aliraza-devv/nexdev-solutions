"use client";
import Slider from "react-infinite-logo-slider";
import One from "../../../public/Assets//images/website-11.png";
import Two from "../../../public/Assets//images/website-12.png";
import Three from "../../../public/Assets//images/website-13.png";
import Four from "../../../public/Assets//images/website-14.png";
import Five from "../../../public/Assets//images/website-1.png";
import Six from "../../../public/Assets//images/website-2.png";
import Seven from "../../../public/Assets//images/website-3.png";
import Eight from "../../../public/Assets//images/website-4.png";
import Nine from "../../../public/Assets//images/website-5.png";
import Ten from "../../../public/Assets//images/website-6.png";
import Eleven from "../../../public/Assets//images/website-7.png";
import Twelve from "../../../public/Assets//images/website-8.png";
import Thirteen from "../../../public/Assets//images/website-9.png";
import Fourteen from "../../../public/Assets//images/website-10.png";
import Fifteen from "../../../public/Assets//images/website-15.png";
import Image from "next/image";
import Marquee from "../Cards/Marquee";
import { cn } from "@/lib/utils";

const slideImages = [
  {
    name: One,
    caption: "Slide 1",
    displayName: "Nathan Lauren"
  },
  {
    name: Two,
    caption: "Slide 2",
    displayName: "Logo"
  },
  {
    name: Three,
    caption: "Slide 3",
    displayName: "Raquel"
  },
  {
    name: Four,
    caption: "Slide 4",
    displayName: "Richard Moore"
  },
  {
    name: Five,
    caption: "Slide 5",
    displayName: "Dentist"
  },
  {
    name: Six,
    caption: "Slide 6",
    displayName: "Green Leaf"
  },
  {
    name: Seven,
    caption: "Slide 7",
    displayName: "Nisa"
  },
  {
    name: Eight,
    caption: "Slide 8",
    displayName: "Hello Boba"
  },
  {
    name: Nine,
    caption: "Slide 9",
    displayName: "Fishing"
  },
  {
    name: Ten,
    caption: "Slide 10",
    displayName: "Muslim American Alliance"
  },
  {
    name: Eleven,
    caption: "Slide 11",
    displayName: "Eden Digital Marketing"
  },
  {
    name: Twelve,
    caption: "Slide 12",
    displayName: "Solutions"
  },
  {
    name: Thirteen,
    caption: "Slide 13",
    displayName: "PM Book Keeper"
  },
  {
    name: Fourteen,
    caption: "Slide 14",
    displayName: "Topnatch Freight"
  },
];
const secondRow = slideImages.slice(slideImages.length / 2);
const ImageCard = ({ img, caption, displayName }) => {
  return (
    <figure>
      <div className="h-[270px] overflow-y-hidden rounded-xl w-[460px]">
        <div className="relative w-[100%] flex justify-center">
          <Image src={img} height={500} width={500} className="mt-[0px] rounded-tl-xl rounded-tr-xl" alt={caption} />
          {/* <div className="absolute bottom-[10px] left-[10px] text-white font-semibold">{displayName}</div> */}
        </div>
      </div>
    </figure>
  );
};
const HorizontalLogoSlider = () => {
  return (
    <div className="w-full mt-[40px] bg-[#161616]">
      <Marquee pauseOnHover className="[--duration:30s]">
        {slideImages.map((image) => (
          <ImageCard
            key={image.name}
            img={image.name}
            caption={image.caption}
            displayName={image.displayName}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default HorizontalLogoSlider;
