import React, { useState } from "react";
import ProfileImg from "../../assets/images/ProfileIcon.svg";
import Noti from "../../assets/images/Notification.svg";
import Ac from "../../assets/images/Ac.svg"
import logOut from "../../assets/images/logout.svg"
import { useMoralis } from "react-moralis";

function CircleNav() {
  const [showDrop, setShowDrop] = useState(false);
  const {logout} = useMoralis();
  const handleClick = () => {
    setShowDrop(!showDrop);
  };

  return (
    <div className="mt-[5px]">
      <button className="items-center" onClick={handleClick}>
        <img src={ProfileImg} className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" />
      </button>
      {showDrop && (
        <div className="z-10 w-[125px] h-[80px] absolute mt-[5px] bg-[#374151] divide-y divide-gray-100 rounded shadow w-44 text-center">
          <ul
            class="py-1 text-sm text-white dark:text-gray-200"
          >
            <li>
              <div
                className="flex flex-row block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                  <div className="mt-[2px] mr-[8px]">
                      <img src={Ac}/>
                  </div>
                Settings
              </div>
            </li>

            <li>
              <div
                onClick={()=>logout()}
                className="flex flex-row block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                  <span className="mt-[3px] mr-[5px]">
                      <img src={logOut}/>
                  </span>
                Sign out
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CircleNav;
