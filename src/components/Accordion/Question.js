"use client";
import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Question = ({ title, info }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={`question ${expanded ? "expanded" : ""}`}>
      <header>
        <p
          onClick={() => setExpanded(!expanded)}
          className=" sm-20:font-thin font-semibold"
        >
          {title}
        </p>
        <button className="btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {expanded && <p>{info}</p>}
    </article>
  );
};

export default Question;
