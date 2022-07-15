import React, { useState,useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/images/logo.svg";
import MenuItem from "../MenuItem/MenuItem";

import { FiAlignLeft } from "react-icons/fi";
import Metamask from "../../Auth/Metamask/Metamask";
import { useMoralis } from "react-moralis";
import Signup from "../../Auth/Signup/Signup";
import Login from "../../Auth/Login/Login";
import CircleNav from "../CircleNav/CircleNav";
import Notification from "../Notification/Notification";

function Navbar() {
  const [isopen, setIsOpen] = useState(false);
  const [scrollNav,setScrollNav] = useState(false)
  const { isAuthenticated } = useMoralis();
  const showMenu = () => {
    setIsOpen(!isopen);
  };

  const changeNav = () => {
    if (window.scrollY >= 110) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);


  return (
    <>
      <nav className={scrollNav ? "sticky top-0 flex justify-around h-[85px] w-full navbar bg-[#05011E] lg:items-center z-10":"sticky top-0 flex justify-around h-[85px] bg-white/5 w-full navbar lg:items-center z-10"}>
        <div className="h-[85px] w-[165px] items-center flex xl:hidden sm:w-[70px] md:w-[80px] lg:w-[165px]">
          <FiAlignLeft
            className="xl:hidden text-white w-[40px] h-[40px] cursor-pointer"
            onClick={showMenu}
          />
        </div>
        <div className="flex items-center sm:w-[146px] md:w-[146px] lg:w-[307px]">
          <img src={Logo} />
        </div>
        <div className="items-center hidden space-x-8 xl:flex text-white">
          <a href="/home" className="hover:text-[#DB46FF]">Home</a>
          <a href="/zone" className="hover:text-[#DB46FF]">Zone</a>
          <a href="/map" className="hover:text-[#DB46FF]">Map</a>
          <a href="/marketplace" className="hover:text-[#DB46FF]">Marketplace</a>
          <a href="/whitepaper" className="hover:text-[#DB46FF]">Whitepaper</a>
        </div>
        {isAuthenticated ? (
          <div className="flex flex-row items-center">
            <CircleNav />
            <Notification/>
            <Metamask />
          </div>
        ) : (
          <div>
            <Login />
            <Signup />
          </div>
        )}
      </nav>
      <MenuItem showMenu={showMenu} isOpen={isopen} />
    </>
  );
}

export default Navbar;
