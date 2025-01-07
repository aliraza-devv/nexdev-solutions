import React from "react";
import styles from "../../styles/BeamCard.module.css";
import Image from "next/image";
import {useState, useEffect} from "react";

const BeamCard = ({ title, image, description, icon, subHeading, number, shortDesc }) => {
  // const iconSrc = icon === "ICON" ? "/fallback/path/to/icon.png" : icon;
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    // <div className={styles.outer}>
    <>
      {/* <div className={styles.dot}></div> */}
      <div className={`${styles.card} glassmorphism h-[400px] sm-448px:h-[600px] sm-20:h-[650px] pb-[10px] sm-892:h-[670px] sm-892:w-[90%] sm-588:w-[100%] sm-892:justify-self-center flex flex-col items-start p-[20px] pl-[30px] pr-[30px] overflow-hidden min-sm:w-[100%]`}>
        {/* <div className={styles.ray}></div> */}
        {/* <Image
          className="ml-14 mt-10"
          src={iconSrc}
          height={70}
          width={70}
          alt={`Nexdev solutions ${title} service`}
        /> */}
        {/* <Image src={icon} width={100} height={100} className="mb-[15px]" alt="NexDev Solutions Services" /> */}
        <div className={"w-[100%] h-[90px] border-b items-center flex justify-between"}>
          <div className={`heading-bold text-4xl font-bold tracking-[-0.02em] sm-20:text-3xl  text-[#f5f5f5] md:text-5xl md:leading-[5rem]`}>{title}</div>
          {width > 399 && (<h2 className="bricolage-font-family">{number}</h2>)}
        </div>
        {/* <h1 className={`${styles.text} text-[2rem] lg-1178:text-[28px] sm-700:text-[25px] lg-4:text-[28px] mb-[20px] font-bold  lg-1178:font-semibold  text-white  `}>
          {title}
        </h1> */}
        <div className={"flex sm-892:flex-col w-[100%] sm-892:gap-[10px] gap-[30px] h-[300px] sm-892:items-start items-center"}>
          <Image src={image} width={400} height={150} className="mt-[5px] sm-892:mt-[40px] sm-892:h-[300px] h-[240px] lg-1074:w-[350px] sm-892:w-[100%] 9xl:w-[300px] rounded-[1rem]" alt="NexDev Solutions Services" />
          <div className="w-[80%] sm-892:w-[100%]">
            <div className="flex gap-[20px]">
            <h2 className={"bricolage-font-family sm-805:text-[28px]  sm-892:mt-[15px] lg-3:text-[35px] lg-3:leading-[40px]"}>{`${subHeading}`}</h2>
            {/* <h2 className="bricolage-font-family">{number}</h2> */}
            {/* <div className="text-4xl font-bold cursor-pointer text-[#5C45FD]"></div> */}
            </div>
            <p className=" sm-991:font-extralight lg-1074:w-[90%] sm-20:w-[100%] text-lg w-[72%] lg-3:w-[85%] sm-892:mt-[7px] mt-[25px]">{width > 991 ? description : shortDesc}</p>
          </div> 
        </div>
       
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
