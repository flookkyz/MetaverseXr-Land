import React from "react";
import MXR from "../../assets/images/MXR.m4v";

function HeroSection() {
  return (
    <div className="w-full h-[90vh] top-[90px] pt-[20px] flex justify-center">
      <video
        className="object-cover h-[800px] w-[97%] absolute -z-10 rounded-3xl"
        src={MXR}
        autoPlay
        loop
        muted
      />
      <div className="w-full h-[90%] flex flex-col justify-end items-center">
        <div>
          <button className="w-[120px] h-[45px] bg-[#490CFA] m-[90px] text-white rounded-md">
            View Land
          </button>
          <button className="w-[120px] h-[45px] bg-gray-500 m-[90px] text-gray-100 rounded-md">
            Learn
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
