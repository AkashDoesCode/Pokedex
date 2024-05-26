import React, { useState } from "react";
import ReactNiceAvatar from "react-nice-avatar";
import { useNavigate } from "react-router";
import Avatar, { genConfig } from "react-nice-avatar";
import { useSelector } from "react-redux";
import Logout from "../Component/Auth/Logout";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const config = genConfig(userInfo.user.email); // creating avatar based on email;

  const [profileView, setProfileView] = useState(false);

  const showProfileBox = () => {
    setProfileView(!profileView);
  };

  return (
    <>
      <div className="flex flex-row justify-center font-serif text-gray-600 mt-3 relative">
        <p className="text-6xl">P</p>
        <div
          className="relative mt-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-7">
            <span className="inline-block border-2 border-[#555555] rounded-t-full h-7 w-12 bg-red-600 mt-1"></span>
          </div>
          <div className="h-7">
            <span className="inline-block border-2 border-[#555555] rounded-b-full h-6 w-12 bg-white "></span>
          </div>
          <div className="absolute border-2 border-[#BBBBBB] outline outline-2 outline-[#555555] top-[22px] left-1/2 -translate-x-1/2  rounded-full w-3 h-3 bg-white"></div>
        </div>
        <p className="text-6xl">k</p>
        <p className="text-6xl">é</p>
        <p className="text-6xl">d</p>
        <p className="text-6xl">e</p>
        <p className="text-6xl">x</p>
      </div>

      <div className="absolute top-6 right-10 " onClick={showProfileBox}>
        <Avatar
          className="w-10 h-10 cursor-pointer border-2 border-red-500"
          {...config}
        />
      </div>

      {profileView && (
        <div className="absolute font-serif right-5 bg-white h-20 w-20 rounded-lg shadow-xl text-sm flex flex-col items-center text-center cursor-pointer">
          <div className="h-1/2 w-3/4 border-b-2 border-[#AAAAAA] pt-2">
            profile
          </div>
         
          <Logout />
        </div>
      )}
    </>
  );
}

export default Header;
