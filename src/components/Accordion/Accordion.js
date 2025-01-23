"use client";
import React, { useState } from "react";
import data from "../../../data/data";
import SingleQuestion from "./Question";
import SparklesText from "../Text/SparklesText";

const Accordion = () => {
  const [questions, setQuestions] = useState(data);

  return (
    <main
      id="faqs"
      className="flex flex-col justify-center items-center w-[100%]"
    >
      <h1 className="text-center mb-10 mt-20">
        <SparklesText text="You got Questions?" />
      </h1>
      <h2 className="text-[#f5f5f5] font-semibold text-lg bricolage-font-family">
        We have got the Answers
      </h2>
      <div className="pt-[2rem] pb-[2rem] pl-[2.5rem] pr-[2.5rem] sm-595:pl-[0px] sm-595:pr-[0px] w-[100%] xl:w-[60%]">
        <section className="info bricolage-font-family sm-20:font-extralight w-[100%]">
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Accordion;
