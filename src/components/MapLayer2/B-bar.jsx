import React from "react";

function Bbar() {
  return (
    <div className="w-[780px] h-[40px] mt-5 ml-[300px] mb-[150px] bg-gray-800 rounded-lg flex flex-row items-center justify-center text-white font-medium">
      <div className="w-4 h-4 bg-[#490CFA] mx-1"></div> My land
      <div className="w-4 h-4 bg-blue-500 ml-4 mx-1"></div> My List
      <div className="w-4 h-4 bg-yellow-600 ml-4 mr-1"></div> Has bought
      <div className="w-4 h-4 bg-purple-800 ml-4 mr-1"></div> From MXR
      <div className="w-4 h-4 bg-green-600 ml-4 mr-1"></div> Lands sale
      <div className="w-4 h-4 bg-[#DA46FF] ml-4 mr-1"></div> Premium
      <div className="w-4 h-4 bg-red-800 ml-4 mr-1"></div> Outside zone
    </div>
  );
}

export default Bbar;
