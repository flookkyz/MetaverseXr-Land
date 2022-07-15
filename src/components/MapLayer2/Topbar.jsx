import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <>
      <div className="flex flex-row ">
        <Link to="/map" className="flex flex-row ">
          <BsFillArrowLeftCircleFill className="fill-white w-[25px] h-[25px] ml-[220px] mt-[65px] hover:fill-[#DB46FF]" />
          <span className="text-white text-3xl ml-[15px] my-[57px] hover:underline">
            Zone 1
          </span>
        </Link>
      </div>
    </>
  );
}

export default Topbar;
