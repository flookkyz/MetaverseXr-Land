import React from "react";
import Market from "../components/Marketplace/Market";

function Marketplace() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <div className="text-white text-3xl text-center my-[20px] font-semibold">
          Marketplace
        </div>

        <div className="overflow-y-auto h-[1000px] w-[1000px] itemmarket ">
          <Market />
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
