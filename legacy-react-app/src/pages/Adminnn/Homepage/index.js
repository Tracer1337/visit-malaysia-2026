import React, { useState } from 'react'
import { HiUserCircle } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";


const HomepageAdminPage = () => {
    

    return (
        <>
            <div className="bg-gradient-to-b from-[#00A19A] to-[#2A3075] min-h-screen flex justify-center">
                {/* Web View */}
                <div className="sm:hidden lg:block bg-[#FFFFFF] md:p-[30px] lg:p-[40px] xl:p-[40px] 2xl:p-[50px] rounded-[30px] top-5 w-[50%]">
                    <div className="flex justify-end">
                        <img src="/images/VMBETA.png" className="md:h-[40px] lg:h-[40px] xl:h-[40px] 2xl:h-[50px]"/>
                    </div>
                    <div className="flex justify-center mt-[10px]">
                        <HiUserCircle size={130} className="text-[#2A3075]"/>
                    </div>
                    <div className="flex justify-center">
                        <text className="text-xl font-montserrat font-semibold text-[#2A3075]">
                            Admin Panel
                        </text>
                    </div>
                    <div className="md:mt-[20px] lg:mt-[20px] xl:mt-[30px] 2xl:mt-[40px]">
                        <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                            <FaUser size={24} className="text-[#747373]"/>
                            <input type="text" className="border-none p-0 bg-transparent ml-5 font-montserrat text-sm placeholder:text-[#AEAEAE] text-[#747373]"
                            placeholder="Enter username"/>
                        </div>
                    </div>
                    <div className="md:mt-[5px] lg:mt-[5px] xl:mt-[10px] 2xl:mt-[20px]">
                        <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                            <IoMdLock size={24} className="text-[#747373]"/>
                            <input type="text" className="border-none p-0 bg-transparent ml-5 font-montserrat text-sm placeholder:text-[#AEAEAE] text-[#747373]"
                             placeholder="Enter password" />
                        </div>
                    </div>
                    <div className="mt-[5px] flex justify-between items-center">
                        <div class="flex items-center mb-4 mt-4">
                            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-[#747373] bg-[#F9FAFB] border-[#AEAEAE] rounded"/>
                            <label for="default-checkbox" class="ml-2 text-sm font-montserrat font-medium text-[#747373]">Remember me</label>
                        </div>
                        <div className="">
                            <text href="#"
                            className="font-montserrat font-medium text-[#747373] hover:text-[#5B5B5B] hover:underline">
                                Forgot password?
                            </text>
                        </div>
                    </div>
                    <div className="md:mt-[20px] lg:mt-[20px] xl:mt-[30px] 2xl:mt-[80px] flex justify-center w-full p-[12px] bg-[#2A3075] rounded-[10px] cursor-pointer">
                        <text className="font-montserrat text-sm text-[#FFFFFF]">
                            Login
                        </text>
                    </div>

                </div>

                {/* Mobile View */}
                <div className="sm:block lg:hidden bg-[#FFFFFF] p-[50px] rounded-[30px] top-5 w-[80%]">
                    <div className="flex justify-end">
                        <img src="/images/VMBETA.png" className="h-[70px]"/>
                    </div>
                    <div className="flex justify-center mt-[10px]">
                        <HiUserCircle size={280} className="text-[#2A3075]"/>
                    </div>
                    <div className="flex justify-center">
                        <text className="text-[45px] font-montserrat font-semibold text-[#2A3075]">
                            Admin Panel
                        </text>
                    </div>
                    <div className="mt-[50px]">
                        <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[20px] rounded-[5px]">
                            <FaUser size={40} className="text-[#747373]"/>
                            <input type="text" className="border-none p-0 bg-transparent ml-5 font-montserrat text-[32px] placeholder:text-[#AEAEAE] text-[#747373]"
                            placeholder="Enter username"/>
                        </div>
                    </div>
                    <div className="mt-[30px]">
                        <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[20px] rounded-[5px]">
                            <IoMdLock size={40} className="text-[#747373]"/>
                            <input type="text" className="border-none p-0 bg-transparent ml-5 font-montserrat text-[32px] placeholder:text-[#AEAEAE] text-[#747373]"
                             placeholder="Enter password" />
                        </div>
                    </div>
                    <div className="mt-[5px] flex justify-between items-center">
                        <div class="flex items-center mb-4 mt-4">
                            <input id="default-checkbox" type="checkbox" value="" class="w-8 h-8 text-[#747373] bg-[#F9FAFB] border-[#AEAEAE] rounded"/>
                            <label for="default-checkbox" class="ml-2 text-[24px] font-montserrat font-medium text-[#747373]">Remember me</label>
                        </div>
                        <div className="">
                            <text href="#"
                            className="font-montserrat font-medium text-[24px] text-[#747373] hover:text-[#5B5B5B] hover:underline">
                                Forgot password?
                            </text>
                        </div>
                    </div>
                    <div className="mt-[80px] flex justify-center w-full p-[12px] bg-[#2A3075] rounded-[10px] cursor-pointer">
                        <text className="font-montserrat text-[24px] text-[#FFFFFF]">
                            Login
                        </text>
                    </div>

                </div>
            </div>

        </>
    );

};

export default HomepageAdminPage;