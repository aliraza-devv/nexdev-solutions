"use client";
import React, { useState } from "react";
import data from "../../../data/data";
import SingleQuestion from "./Question";
import SparklesText from "../Text/SparklesText";

const Accordion = () => {
  const [questions, setQuestions] = useState(data);

  return (
    <main className="flex flex-col justify-center items-center w-[100%]">
      <h1 className="text-center mb-10 mt-20">
        <SparklesText text="You got Questions?" />
        <h2 className="text-[#f5f5f5] mt-6 font-semibold text-lg">
          We have got the Answers
        </h2>
      </h1>
      <div className="container w-[80%] xl:w-[60%]">
        <section className="info w-[100%] index">
          {questions.map((question) => (
            <SingleQuestion key={question.id} {...question} />
          ))}
        </section>
      </div>
    </main>
  );
};

export default Accordion;