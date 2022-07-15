import React from "react";
import ExPic from "../../assets/images/tree city detail 07.jpg";

function Zonedetail() {
  const listZone = [
    {
      img: ExPic,
      headerZone: "Averon",
      disc: "Lorem ipsum dolor sit amet,consectetur adipiscing elit.Tortor sit risus neque,diam mi gravida cursus. Lorem ipsum dolor sit amet,consectetur adipiscing elit.Tortor sit risus neque,diam mi gravida cursus. Lorem ipsum dolor sit amet,consectetur adipiscing elit.Tortor sit risus neque,diam mi gravida cursus. Lorem ipsum dolor sit amet,consectetur adipiscing elit.Tortor sit risus neque,diam mi gravida cursus. Lorem ipsum dolor sit amet,consectetur adipiscing elit.Tortor sit risus neque,diam mi gravida cursus.",
    },
    {
      img: ExPic,
      headerZone: "Rowenheim",
      disc: "Lorem ipsum dolor sit amet,consectetur adipiscing elit.Tortor sit risus neque,diam mi gravida cursus.",
    },
    {
      img: ExPic,
      headerZone: "NameZone Goes Here",
      disc: "Lorem ipsum dolor sit amet",
    },
  ];
  return (
    <div>
      {listZone.map((datazone, index) => (
        <div key={index} className="flex flex-col  text-white mb-[60px] ">
          <div className="flex justify-center">
            <div className="w-[65%] ">
              {/* <div className="text-3xl mb-[20px] ">{datazone.headerZone}</div> */}
              <a href="#">
              <img
                src={datazone.img}
                alt={datazone.headerZone}
                className="rounded-t-xl"
              />
              </a>
              <div className="text-3xl bg-gray-800 py-[30px] px-[60px] rounded-b-xl text-center">{datazone.headerZone}</div>
              {/* <div className="bg-gray-800 py-[30px] px-[60px] rounded-b-xl">
                {datazone.disc}
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Zonedetail;
