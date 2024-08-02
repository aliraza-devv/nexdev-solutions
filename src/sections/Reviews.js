import React from "react";
import { cn } from "@/lib/utils";
import Marquee from "@/components/Cards/Marquee";
import SparklesText from "@/components/Text/SparklesText";
import Trish from "../../public/Assets/images/Trish.jpeg";
import Sheraz from "../../public/Assets/images/Sheraz.jpeg";
import Naveed from "../../public/Assets/images/Naveed.jpg";
import Abrar from "../../public/Assets/images/Abrar.jpg";
import Uzair from "../../public/Assets/images/Uzair.jpeg";
import Najam from "../../public/Assets/images/Najam.jpg";
import Image from "next/image";

const reviews = [
  {
    name: "Trishelle",
    username: "Co-Founder & CEO",
    body: `I enthusiastically endorse NeXDev Solutions for any web or software development needs. Their expertise and talent shine through in every project.`,
    img: Trish,
  },
  {
    name: "Sheraz",
    username: "CEO",
    body: "I highly recommend NeXdev Solutions their exceptional work as a freelance web developer. Their technical proficiency,and  attention to detail, resulted in a visually stunning and highly functional website. ",
    img: Sheraz,
  },
  {
    name: "Naveed",
    username: "Founder & CEO",
    body: "I enthusiastically endorse NeXDev Solutions for any web or software development needs. Their expertise and talent shine through in every project.",
    img: Naveed,
  },
  {
    name: "Abrar",
    username: "Founder",
    body: "I enthusiastically endorse NeXDev Solutions for any web or software development needs. Their expertise and talent shine through in every project.",
    img: Abrar,
  },
  {
    name: "Uzair",
    username: "Designer",
    body: "NeXDev Solitions is very passionate and has great vision for his work. Their focus keeps everything moving smoothly, They makes sure all the deadlines are met.",
    img: Uzair,
  },
  {
    name: "Najam",
    username: "Founder & CEO",
    body: "I had the pleasure of working with NeXDev Solutions, who transformed my ideas into a fantastic reality. They skillfully created a responsive landing page and seamlessly integrated user authentication.",
    img: Najam,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  const insertLineBreaks = (text, wordsCount) => {
    const words = text.split(" ");
    const chunks = [];

    for (let i = 0; i < words.length; i += wordsCount) {
      chunks.push(words.slice(i, i + wordsCount).join(" "));
    }

    return chunks.map((chunk, index) => (
      <React.Fragment key={index}>
        {chunk}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <figure
      className={cn(
        "relative w-70 h-40 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-white text-sm">
        {insertLineBreaks(body, 8)}
      </blockquote>
    </figure>
  );
};

export function Reviews() {
  return (
    <div
      id="reviews"
      className="relative flex h-[70vh] w-full flex-col items-center mt-10 justify-center overflow-hidden bg-background md:shadow-xl"
    >
      <h1 className="text-center">
        <SparklesText text="Words from Our Clients" />
      </h1>
      <Marquee pauseOnHover className="[--duration:20s] mt-10 sub-font">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] sub-font">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black dark:from-background"></div> */}
    </div>
  );
}
