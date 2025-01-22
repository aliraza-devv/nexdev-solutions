import React from "react";
import styles from "../../styles/PricingCard.module.css";
import Link from "next/link";

const PricingCard = ({
  title,
  price,
  subTitle,
  point1,
  point2,
  point3,
  point4,
  point5,
  point6,
  url,
  miniTitle,
  statement
}) => {
  return (
    <div className={` ${styles.card} min-w-[300px] max-w-[425px] `}>
      <div className={styles.card__border}></div>
      <div className={`${styles.card_title__container}`}>
        <div
          className={`${styles.card_miniTitle} w-[100px] border rounded-full border-[#5c45fd] bg-none px-3 py-1 text-[#f5f5f5] bricolage-font-family `}
        >
          {miniTitle}
        </div>
        
        <div
          className={`${styles.card_price} mt-[7px] bg-none px-3 py-1 text-[#f5f5f5] bricolage-font-family `}
        >
          {price}
        </div>
        <div
          className={`${styles.card_title} mt-[7px] mb-3 mt-4 bricolage-font-family flex flex-col`}
        >
          {title}
        </div>
        <p className={`${styles.card_paragraph} mt-3`}>{subTitle}</p>
      </div>
      <hr className={`${styles.line} max-sm:mb-[15px] max-sm:mt-[10px]`} />
      <ul className={`${styles.card__list} bricolage-font-family mt-[20px]`}>
        <li className={styles.card__list_item}>
          <span className={styles.check}>
            <svg
              className={styles.check_svg}
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span className={`${styles.list_text} font-[500] sm-20:font-extralight sm-991:font-extralight`}>{point1}</span>
        </li>
        <li className={styles.card__list_item}>
          <span className={styles.check}>
            <svg
              className={styles.check_svg}
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span className={`${styles.list_text} font-[500] sm-20:font-extralight sm-991:font-extralight`}>{point2}</span>
        </li>
        <li className={styles.card__list_item}>
          <span className={styles.check}>
            <svg
              className={styles.check_svg}
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span className={`${styles.list_text} font-[500] sm-20:font-extralight sm-991:font-extralight`}>{point3}</span>
        </li>
        <li className={styles.card__list_item}>
          <span className={styles.check}>
            <svg
              className={styles.check_svg}
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span className={`${styles.list_text} font-[500] sm-20:font-extralight sm-991:font-extralight`}>{point4}</span>
        </li>
        <li className={styles.card__list_item}>
          <span className={styles.check}>
            <svg
              className={styles.check_svg}
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span className={`${styles.list_text} font-[500] sm-20:font-extralight sm-991:font-extralight`}>{point5}</span>
        </li>
        <li className={styles.card__list_item}>
          <span className={styles.check}>
            <svg
              className={styles.check_svg}
              fill="currentColor"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </span>
          <span className={`${styles.list_text} font-[500] sm-20:font-extralight sm-991:font-extralight`}>{point6}</span>
        </li>
      </ul>
      <div className="text-white sm-20:font-extralight sm-991:font-extralight font-normal mt-[20px]">{statement}</div>
      <button className={`${styles.button} bricolage-font-family font-bold mt-4`}>
        <Link className="font-[600]" href={`${url}`}>Book Your Call Now</Link>
      </button>
      <div className="font-semibold text-center mt-[8px] max-2xl:text-sm text-sm text-[#f5f5f5]">
          Hurry! Only a few spots left.
      </div>
    </div>
  );
};

export default PricingCard;
