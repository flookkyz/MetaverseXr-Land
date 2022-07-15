import React from "react";
import Layer1Left from "../components/MapLayer1/Layer1Left"
import Layer1Right from "../components/MapLayer1/Layer1Right"

function Map() {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <div className="h-[60px] text-gray-600 text-2xl pl-[100px] pt-[20px] ">
          <a href="#" className="mx-3 text-[#DB46FF] underline underline-offset-[12px] decoration-[4px] decoration-[#DB46FF]">MAP</a>
          <a href="#" className="mx-3 hover:text-[#DB46FF] hover:underline hover:underline-offset-[12px] hover:decoration-[4px] hover:decoration-[#DB46FF]">LIST</a>
          <a href="#" className="mx-3 hover:text-[#DB46FF] hover:underline hover:underline-offset-[12px] hover:decoration-[4px] hover:decoration-[#DB46FF]">My Store</a>
      </div>
      
      
      <div className="flex flex-row justify-center pt-10 mb-[100px]">
        <Layer1Left />
        <div className="mt-px">
          <div className="mt-24 ml-2">
            <Layer1Right />
          </div>
        </div>
      </div>
      
      
    </>
  );
}

export default Map;
