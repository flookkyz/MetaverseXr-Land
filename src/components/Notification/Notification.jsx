import React from "react";
import Noti from "../../assets/images/Notification.svg"

function Notification() {
  return (
    <>
      <button className="mr-[23px] ml-[15px] items-center">
        <img src={Noti} />
      </button>
    </>
  );
}

export default Notification;
