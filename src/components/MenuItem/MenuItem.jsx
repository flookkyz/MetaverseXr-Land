import React from "react";
import { IoClose } from "react-icons/io5";
import "./MenuItem.css"
function MenuItem({ showMenu, isOpen }) {
  return (
    <div
      className={
        isOpen ? "xl:hidden animate" : "hidden"
      }
    >
      <div className="flex items-center text-center text-white flex-col bg-white/30 text-white h-screen text-[24px] cursor-pointer">
        <IoClose onClick={showMenu} className="ml-[300px] mt-[10px] lg:ml-[550px]" />
        <a className="py-[30px]" href="">
          Home
        </a>
        <a className="py-[30px]" href="">
          Zone
        </a>
        <a className="py-[30px]" href="">
          Map
        </a>
        <a className="py-[30px]" href="">
          Marketplace
        </a>
        <a className="py-[30px]" href="">
          Whitepaper
        </a>
      </div>
    </div>
  );
}

export default MenuItem;
