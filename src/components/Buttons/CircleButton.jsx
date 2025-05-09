import React from "react";
import styles from "../../styles/CircleButton.module.css";
import Link from "next/link";

const CircleButton = () => {
  const text = "DISCUSS PROJECT";
  const charArray = text.split("");
  return (
    <Link target="_blank" href="https://cal.com/nexdevsolutions/discovery-call">
      <button class={styles.button}>
        <p className={styles.button__text}>
          {charArray.map((char, index) => (
            <span
              key={index}
              style={{ "--index": index }}
              className="absolute inset-2 transform rotate-[calc(var(--angle)*var(--index))]"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <div class={styles.button__circle}>
          <svg
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class={styles.button__icon}
            width="14"
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            ></path>
          </svg>

          <svg
            viewBox="0 0 14 15"
            fill="none"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
            class={`${styles.button__icon} ${styles.button__icon__copy}`}
          >
            <path
              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
    </Link>
  );
};

export default CircleButton;
