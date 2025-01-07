"use client";
import styles from "../../styles/BtnPrimary.module.css";
import star from "../../../public/Assets/icons/14.svg";
import Image from "next/image";
import Link from "next/link";

const BtnPrimary = ({ title, url }) => {
  return (
    <Link href={`${url}`} target="_blank">
      <button className={`${styles.btnPrimary} heading-primary`}>
        {title}
        {/* <div className={styles.star1}>
          <Image src={star} />
        </div>
        <div className={styles.star2}>
          <Image src={star} />
        </div>
        <div className={styles.star3}>
          <Image src={star} />
        </div>
        <div className={styles.star4}>
          <Image src={star} />
        </div>
        <div className={styles.star5}>
          <Image src={star} />
        </div>
        <div className={styles.star6}>
          <Image src={star} />
        </div> */}
      </button>
    </Link>
  );
};

export default BtnPrimary;
