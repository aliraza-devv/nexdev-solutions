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
          className=" sm-20:font-extralight sm-991:font-extralight font-semibold bricolage-font-family"
        >
          {title}
        </p>
        <button className="btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </header>
      {expanded && <p className="bricolage-font-family">{info}</p>}
    </article>
  );
};

export default Question;
