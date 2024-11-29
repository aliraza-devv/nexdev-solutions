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
  point7,
  point8,
  point9,
  point10,
  url,
  miniTitle,
  priceCut,
}) => {
  return (
    <div className={`min-sm:w-[50px] ${styles.card} `}>
      <div className={styles.card__border}></div>
      <div className={`${styles.card_title__container}`}>
        <span
          className={`${styles.card_miniTitle} border rounded-full border-[#5c45fd] bg-none px-3 py-1 text-[#f5f5f5] heading-secondary `}
        >
          {miniTitle}
        </span>
        <span
          className={`${styles.card_title} mb-3 mt-4 heading-secondary flex flex-col`}
        >
          {title}
        </span>
        <span
          className={`${styles.card_price} bg-none px-3 py-1 text-[#f5f5f5] heading-secondary `}
        >
          <span className={`${styles.card_priceCut} text-[#9b9b9b] mr-2`}>
            {priceCut}
          </span>
          {price}
        </span>
        <p className={`${styles.card_paragraph} mt-3`}>{subTitle}</p>
      </div>
      <hr className={`${styles.line} max-sm:mb-[15px] max-sm:mt-[10px]`} />
      <ul className={`${styles.card__list} sub-font`}>
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
          <span className={styles.list_text}>{point1}</span>
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
          <span className={styles.list_text}>{point2}</span>
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
          <span className={styles.list_text}>{point3}</span>
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
          <span className={styles.list_text}>{point4}</span>
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
          <span className={styles.list_text}>{point5}</span>
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
          <span className={styles.list_text}>{point6}</span>
        </li>
        <div className="w-full flex justify-center items-center gap-2 max-sm:gap-[0] mt-6 mb-6">
          <hr className={`${styles.line_second}`} />
          <div className={styles.card_title__container}>
            <span className={`${styles.card_sub_title} flex flex-col`}>
              You&apos;ll also get
            </span>
          </div>
          <hr className={`${styles.line_second}`} />
        </div>
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
          <span className={styles.list_text}>{point7}</span>
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
          <span className={styles.list_text}>{point8}</span>
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
          <span className={styles.list_text}>{point9}</span>
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
          <span className={styles.list_text}>{point10}</span>
        </li>
      </ul>
      <button className={`${styles.button} sub-font font-bold mt-4`}>
        <Link href={`${url}`}>Get a Quote</Link>
      </button>
    </div>
  );
};

export default PricingCard;
