import Image from "next/image";
import React from "react";
import Ali from "../../../public/Assets/images/Picsart_23-03-11_15-34-32-841.jpg";
import BtnLight from "../Buttons/BtnLight";

const FloatingCallBooking = () => {
  return (
    <div className="w-[100%] h-[6rem] text-center bg-[#5c45fd] text-[#f5f5f5] rounded-[1rem]">
      <div className="flex justify-around items-center h-full">
        <Image
          src={Ali}
          height={75}
          width={75}
          alt="NeXDev Solutions Meeting"
          className="rounded-full image-border"
        />
        <div>
          <h5 className="font-bold text-start text-2xl heading-primary">
            Ali Raza
          </h5>
          <h5 className="font-sm text-start bricolage-font-family">Growth & Strategy</h5>
        </div>
        <BtnLight
          title="Book Your Call"
          url="https://cal.com/nexdevsolutions/discovery-call"
        />
      </div>
    </div>
  );
};

export default FloatingCallBooking;
