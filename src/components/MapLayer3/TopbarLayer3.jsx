import React from 'react'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

function TopbarLayer3() {
    let {idl1, ldl2} = useParams();
  return (
    <>
      
        <div className="flex flex-row ">
        <Link to={`/mapz4b1/${idl1}`} className="flex flex-row ">
          <BsFillArrowLeftCircleFill
            className="fill-white w-[25px] h-[25px] ml-[220px] mt-[30px] hover:fill-[#DB46FF]"
          />
          <span className="text-white text-3xl ml-[15px] my-[22px] hover:underline">
            Back
          </span>
          </Link>
        </div>
      
    </>
  )
}

export default TopbarLayer3