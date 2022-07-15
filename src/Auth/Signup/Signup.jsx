import React, { useState } from "react";
import { useMoralis } from "react-moralis";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";

import "./Signup.css";

const StyledPopup = styled(Popup)`
  &-content {
    width: 419px;
    height: 556px;
    background: #05011e;
    border-radius: 10px;
    border: none;
  }
`;

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useMoralis();

  return (
    <>
      <StyledPopup
        trigger={
          <button className="btn w-[123px] h-[45px] text-[#DA46FF] rounded-[5px]">
            Sign Up
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div>
            <h1 className="text-white text-[24px] p-[20px]">sign up</h1>
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
                  signup(username, password);
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
  );
}

export default Signup;
