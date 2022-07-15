import React from "react";
import Logo from "../../assets/images/logo.svg";
import Line from "../../assets/images/bi_line.svg";
import Face from "../../assets/images/dashicons_facebook.svg";
import Dis from "../../assets/images/discord.svg";
import Tele from "../../assets/images/telegram.svg";

function Footer() {
  return (
    <footer className="bg-white sm:p-6 bg-[#131313]">
      <div className="lg:flex lg:justify-between xl:pl-[100px] xl:pr-[100px] sm:pl-[50px] sm:pr-[50px]">
        <div className="mb-6 lg:mb-0">
          <center>
            <img src={Logo} className="h-[16px] w-[189px]" />
          </center>
        </div>
        <div className="grid grid-cols-2 sm:gap-2 sm:grid-cols-1 lg:grid-cols-1">
          <div>
            <h2 className="mb-6 lg:max-w-[150px] xl:ml-[20px] text-sm font-semibold text-white text-center xl:max-w-sm ">
              236 Sathorn Mansion 1 Alley, Khwaeng Khlong Ton Sai Khet Khlong
              San, Bangkok 10600 Thailand
            </h2>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white text-center">
            Contact
          </h2>
          <p className="text-center text-white">
            Time: 10:00 - 19:00น. <br />
            Tel : 0000000000 <br />
            Email: Line: @100yhgrv
          </p>
        </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="" className="hover:underline">
            MetaverseXr
          </a>
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img src={Line} alt="" />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img src={Face} alt="" />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img src={Dis} alt="" />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <img src={Tele} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
