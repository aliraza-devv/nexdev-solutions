import React from "react";
import styles from "../../styles/BeamCard.module.css";
import Image from "next/image";

const BeamCard = ({ title, description, icon }) => {
  // const iconSrc = icon === "ICON" ? "/fallback/path/to/icon.png" : icon;

  return (
    // <div className={styles.outer}>
    <>
      {/* <div className={styles.dot}></div> */}
      <div className={`${styles.card} sm-13:w-[50%] flex flex-col items-start p-[30px] overflow-hidden min-sm:w-[100%]`}>
        {/* <div className={styles.ray}></div> */}
        {/* <Image
          className="ml-14 mt-10"
          src={iconSrc}
          height={70}
          width={70}
          alt={`Nexdev solutions ${title} service`}
        /> */}
        <Image src={icon} width={100} height={100} className="mb-[15px]" alt="NexDev Solutions Services" />
        <h1 className={`${styles.text} text-[2rem] lg-1178:text-[28px] sm-700:text-[25px] lg-4:text-[28px] mb-[20px] font-bold  lg-1178:font-semibold  text-white  `}>
          {title}
        </h1>
        <p className="   sub-font text-lg">{description}</p>
        {/* <div className="ml-14 mt-10"></div>
        <div className={`${styles.topl} ${styles.line}`}></div>
        <div className={`${styles.leftl} ${styles.line}`}></div>
        <div className={`${styles.bottoml} ${styles.line}`}></div>
        <div className={`${styles.rightl} ${styles.line}`}></div> */}
      </div>
    </>
    // </div>
  );
};

export default BeamCard;
