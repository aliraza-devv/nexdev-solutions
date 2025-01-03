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
      <h2 className="text-[#f5f5f5] font-semibold sub-font text-lg">
        We have got the Answers
      </h2>
      <div className="container w-[100%] xl:w-[60%]">
        <section className="info sub-font w-[100%]">
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Accordion;
