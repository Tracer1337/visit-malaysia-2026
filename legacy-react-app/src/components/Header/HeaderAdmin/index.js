import { HiUserCircle } from "react-icons/hi2";
import React from "react";


const HeaderAdmin = ({ openPopup1 }) => {
  


  return (
    <header className="bg-[#FFFFFF]] font-montserrat p-2 shadow-bs h-max w-full invisible lg:visible hidden lg:flex w-full flex justify-between">
      <div className="flex justify-between items-center w-full">
        <div className="">
            <img src="/images/VMBETA.png" className="h-[50px]"/>
        </div>
        <div className="flex items-center">
          <div className="mr-5">
            <text className="font-medium text-m text-[#2A3075]">
              Super Admin
            </text>
          </div>
          <HiUserCircle size={50} className="text-[#2A3075]"/>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
