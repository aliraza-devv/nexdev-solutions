import React from "react";
import styles from "../../styles/CircleButton.module.css";
import Link from "next/link";

const CircleButton = () => {
  return (
    <Link target="_blank" href="https://cal.com/nexdevsolutions/discovery-call">
      <button class={styles.button}>
        <p class={styles.button__text}>
          <span
            style={{ "--index": 11 }}
            className="absolute inset-2 transform rotate-[calc(19deg*11)]"
          >
            {" "}
          </span>
          <span
            style={{ "--index": 0 }}
            className="absolute inset-2 transform rotate-[calc(19deg*0)]"
          >
            D
          </span>
          <span
            style={{ "--index": 1 }}
            className="absolute inset-2 transform rotate-[calc(19deg*1)]"
          >
            I
          </span>
          <span
            style={{ "--index": 2 }}
            className="absolute inset-2 transform rotate-[calc(19deg*2)]"
          >
            S
          </span>
          <span
            style={{ "--index": 3 }}
            className="absolute inset-2 transform rotate-[calc(19deg*3)]"
          >
            C
          </span>
          <span
            style={{ "--index": 4 }}
            className="absolute inset-2 transform rotate-[calc(19deg*4)]"
          >
            O
          </span>
          <span
            style={{ "--index": 5 }}
            className="absolute inset-2 transform rotate-[calc(19deg*5)]"
          >
            S
          </span>
          <span
            style={{ "--index": 6 }}
            className="absolute inset-2 transform rotate-[calc(19deg*6)]"
          >
            S
          </span>
          <span
            style={{ "--index": 7 }}
            className="absolute inset-2 transform rotate-[calc(19deg*7)]"
          >
            {" "}
          </span>
          <span
            style={{ "--index": 8 }}
            className="absolute inset-2 transform rotate-[calc(19deg*7)]"
          >
            {" "}
          </span>
          <span
            style={{ "--index": 9 }}
            className="absolute inset-2 transform rotate-[calc(19deg*12)]"
          >
            P
          </span>
          <span
            style={{ "--index": 10 }}
            className="absolute inset-2 transform rotate-[calc(19deg*13)]"
          >
            R
          </span>
          <span
            style={{ "--index": 11 }}
            className="absolute inset-2 transform rotate-[calc(19deg*14)]"
          >
            O
          </span>
          <span
            style={{ "--index": 12 }}
            className="absolute inset-2 transform rotate-[calc(19deg*15)]"
          >
            J
          </span>
          <span
            style={{ "--index": 13 }}
            className="absolute inset-2 transform rotate-[calc(19deg*16)]"
          >
            E
          </span>
          <span
            style={{ "--index": 14 }}
            className="absolute inset-2 transform rotate-[calc(19deg*17)]"
          >
            C
          </span>
          <span
            style={{ "--index": 15 }}
            className="absolute inset-2 transform rotate-[calc(19deg*17)]"
          >
            T
          </span>
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
