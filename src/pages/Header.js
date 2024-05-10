import React from "react";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-center font-serif text-gray-600 mt-3">
      <p className="text-6xl">P</p>
      <div className="relative mt-1 cursor-pointer" onClick={() => navigate('/')}>
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
  );
}

export default Header;
