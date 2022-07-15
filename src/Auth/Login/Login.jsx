import React,{useState} from 'react'
import {useMoralis} from "react-moralis"
import styled from "styled-components";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./Login.css"

const StyledPopup = styled(Popup)`
  &-content {
    width: 450px;
    height: 500px;
    background: #696969;
    border-radius: 10px;
    border: none;
  }
`;

function Login() {

  const {login} = useMoralis()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
    <StyledPopup
        trigger={
          <button className='btnO w-[121px] h-[45px] text-white mr-[25px]'>
            Login
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div>
            <h1 className="text-white text-[24px] p-[20px]">Log In</h1>
            <div className="text-center">
              {/* <input
                className="rounded-md bg-white  w-[361px] h-[48px]"
                type="text"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /> */}
              <input
                className="p-2.5 rounded-md bg-white w-[361px] h-[48px] mt-[24px]"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* <input
                className="rounded-md bg-white w-[361px] h-[48px] mt-[24px]"
                type="password"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
              <input
                className="p-2.5 rounded-md bg-white w-[361px] h-[48px] mt-[24px]"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn2 w-[208px] h-[45px] rounded-lg mt-[43px] mb-[35px] text-white"
                onClick={() => {
                  login(username, password);
                }}
              >
                Sign Up
              </button>
              <br />
              <span className="text-white">Already a Member? </span>
              <span className="text-[#DB46FF]">
                <a href="">Login</a>
              </span>
            </div>
          </div>
        )}
      </StyledPopup>
    </>
  )
}

export default Login