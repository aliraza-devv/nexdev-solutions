"use client";
import Slider from "react-infinite-logo-slider";
import One from "../../../public/Assets/Logos/careerify-logo-final.png";
import Two from "../../../public/Assets/Logos/Gadgeterz.png";
import Three from "../../../public/Assets/Logos/Benefits.png";
import Four from "../../../public/Assets/Logos/goinbazar.png";
import Five from "../../../public/Assets/Logos/americashines.png";
import Six from "../../../public/Assets/Logos/LandA.png";
import Seven from "../../../public/Assets/Logos/uandu.png";
import Eight from "../../../public/Assets/Logos/mobiledoc.png";
import Nine from "../../../public/Assets/Logos/logo-uzfan-health-care.png";
import Image from "next/image";
import Marquee from "../Cards/Marquee";
import { cn } from "@/lib/utils";

const slideImages = [
  {
    percentage: "80%",
    description: "Increase in Growth",
    dimension: 50,
    name: One,
    caption: "Slide 1",
  },
  {
    percentage: "47%",
    description: "Increase in Conversion Rate",
    dimension: 75,
    name: Two,
    caption: "Slide 2",
  },
  {
    percentage: "42%",
    description: "Increase in Conversion Rate",
    dimension: 75,
    name: Five,
    caption: "Slide 3",
  },
  {
    percentage: "57%",
    description: "Increase in Conversion Rate",
    dimension: 75,
    name: Six,
    caption: "Slide 3",
  },
  {
    percentage: "70%",
    description: "Increase in Growth Rate",
    dimension: 75,
    name: Seven,
    caption: "Slide 3",
  },
  // {
  //   name: Eight,
  //   caption: "Slide 3",
  // },
  {
    percentage: "67%",
    description: "Growth in Sales",
    dimension: 75,
    name: Nine,
    caption: "Slide 3",
  },
];
const secondRow = slideImages.slice(slideImages.length / 2);
const ImageCard = ({ img, caption, percentage, description, dimension }) => {
  return (
    <figure>
      <div className="h-[250px] overflow-hidden w-[200px] rounded-xl border border-[#5c45fd]">
        <div className="w-[100%] h-[160px] p-[20px] pt-[27px]" >
          <div className="text-white text-4xl bricolage-font-family ">{percentage}</div>
          <div className="text-white font-light text-xl mt-[20px] bricolage-font-family">{description}</div>
        </div>
        <div className="mt-[10px] flex items-center justify-center h-[80px] border-t border-[#5c45fd] w-[100%]">
          <Image className=" flex items-center" src={img} height={dimension} width={dimension} alt={caption} />
        </div>
      </div>
    </figure>
  );
};
const Logo = () => {
  return (
    <div className="w-[75%] flex justify-center flex-col items-center">
      <Marquee pauseOnHover className="[--duration:30s] mt-10 ">
        {slideImages.map((image) => (
          <ImageCard
            key={image.name}
            img={image.name}
            caption={image.caption}
            percentage={image.percentage}
            description={image.description}
            dimension={image.dimension}
          />
        ))}
      </Marquee>
    </div>
  );
};

export default Logo;
