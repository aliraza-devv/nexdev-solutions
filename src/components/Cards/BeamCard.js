import React from "react";
import styles from "../../styles/BeamCard.module.css";

const BeamCard = ({ title, description }) => {
  // const iconSrc = icon === "ICON" ? "/fallback/path/to/icon.png" : icon;

  return (
    // <div className={styles.outer}>
    <>
      {/* <div className={styles.dot}></div> */}
      <div className={`${styles.card} sm-13:w-[50%] flex flex-col items-start p-[30px] justify-center overflow-hidden min-sm:w-[100%]`}>
        {/* <div className={styles.ray}></div> */}
        {/* <Image
          className="ml-14 mt-10"
          src={iconSrc}
          height={70}
          width={70}
          alt={`Nexdev solutions ${title} service`}
        /> */}
        <h1 className={`${styles.text} mb-[20px]   text-white heading-secondary `}>
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
