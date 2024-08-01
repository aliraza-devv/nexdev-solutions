"use client";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Question = ({ title, info }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`question ${expanded ? "expanded" : ""}`}>
      <header>
        <h4
          onClick={() => setExpanded(!expanded)}
          className="question-title font-semibold"
        >
          {title}
        </h4>
        <button className="btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {expanded && <p>{info}</p>}
    </article>
  );
};

export default Question;
