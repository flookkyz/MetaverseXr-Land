import React from 'react'
import CookieConsent from 'react-cookie-consent'
import "./Cookie.css"

function Cookie() {
  return (
    <div className="pop-up ">
        <CookieConsent
          disableStyles
          location="none"
          buttonText="ยอมรับ / Accept"
          cookieName="getCookie"
          overlay
          overlayClasses="overlayclass"
          buttonStyle={{background: "linear-gradient(to right,blue, violet)",fontSize: "16px",width:"120px",height:"35px",margin:"25px 0px 0px 0px"}}
          style={{ background: "#05011E"}}
        >
          เว็บไซต์นี้ใช้คุกกี้เพื่อวัตถุประสงค์ในการปรับปรุงประสบการณ์ของผู้ใช้งานให้ดียิ่งขึ้น
          กรุณาศึกษารายละเอียด{" "}
          <span className="text-[#DB46FF]">
            <a href=''>นโยบายความเป็นส่วนตัว</a>
          </span>
          <br />
          <br/>
          This site uses cookies to give you the best experience on our site. 
          <span className="text-[#DB46FF]">
            <a href=''> Privacy Policy.</a>
          </span>
          
        </CookieConsent>
      </div>
  )
}

export default Cookie