import React, { useState } from 'react'
import HeaderOTA from 'components/Header/HeaderOTA/index';
import { Input } from 'components/Input/index';
import { Text, Img, Line, Button } from "components";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import Footerepic from 'components/Footer/Footerepic/index';
import { useAuth } from 'AuthContext';
import LoginPage from "components/Login/index";
import { MdDirectionsCar, MdLocationOn, MdChevronRight } from "react-icons/md";
import SignupPage from "components/SignUp/index";


const CarnavPage = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    const location = useLocation();
    const { fromDestination, toDestination, travelOptions } = location.state || { fromDestination: '', toDestination: '', travelOptions: [] };

    //setIsLoggedIn(true);

    const driveOption = travelOptions.find(option => option.travelOptions === 'drive') || {};

    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);

    const openPopup1 = () => {
        setIsPopup1Open(true);
    };

    const openPopup2 = () => {
        setIsPopup2Open(true);
    };

    const closePopup1 = () => {
        setIsPopup1Open(false);
    };

    const closePopup2 = () => {
        setIsPopup2Open(false);
    };

    return (
        <>

            <div className='fixed w-full'>
                <HeaderOTA openPopup1={openPopup1} className="fixed invisible lg:visible" />
                <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
                <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
                <HeaderOTAMobileEpic openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
            </div>

            <div className="w-full font-montserrat h-fit xs:pt-[160px] lg:pt-[92px] md:hidden lg:block">
                <text className="text-[15px]">
                    Only available on mobile for now
                </text>
            </div>

            {/* mobile view */}
            <div className="w-full font-montserrat h-fit xs:pt-[160px] lg:pt-[92px] md:block lg:hidden">
                
                <div className="flex items-center py-[50px] px-[50px]">
                    <MdDirectionsCar size={56} className="text-[#555555]"/>
                    <div className="ml-[30px]">
                        <text className="text-[42px] text-[#1E1E1E] font-semibold">
                            {fromDestination} to {toDestination}
                        </text>
                    </div>
                </div>

                <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] p-[50px] h-fit w-screen">
                    <div className="flex justify-between">
                        <text className="font-semibold text-[34px] text-[#1E1E1E]">
                            Journey overview
                        </text>
                    </div>

                    <div className="flex items-center pt-[50px]">
                        <MdDirectionsCar size={56} className="text-[#555555]"/>
                        <div className="ml-[50px] grid">
                            <text className="font-medium text-[28px] text-[#1E1E1E]">
                                {fromDestination}
                            </text>
                            {/* <text className="font-regular text-[24px] text-[#1E1E1E]">
                                Kuala Lumpur, Malaysia
                            </text> */}
                        </div>
                    </div>

                    <div className="flex items-center ml-[30px] pt-[20px]">
                        <div className="h-[250px] bg-[#555555] w-[1.5px]"></div>
                        <div className="ml-[80px] grid">
                            <text className="font-regular text-[28px] text-[#555555]">
                                {driveOption.duration}
                            </text>
                            <text className="font-regular text-[24px] text-[#1E1E1E]">
                                {driveOption.distance}
                            </text>
                        </div>
                    </div>

                    <div className="flex items-center pt-[20px]">
                        <MdLocationOn size={56} className="text-[#555555]"/>
                        <div className="ml-[50px] grid">
                            <text className="font-medium text-[28px] text-[#1E1E1E]">
                                {toDestination}
                            </text>
                            {/* <text className="font-regular text-[24px] text-[#1E1E1E]">
                                Kuala Lumpur, Malaysia
                            </text> */}
                        </div>
                    </div>        

                </div>

                <div className="pt-[50px] px-[50px]">
                    <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px] flex justify-between">
                        <div>
                            <text className="font-semibold text-[34px] text-[#1E1E1E]">
                                Accomodations near {toDestination}
                            </text>
                        </div>
                        <MdChevronRight size={55} className="text-[#1E1E1E]"/>
                    </div>
                </div>

            </div>

            

            <div className="md:mt-[10px] lg:mt-[500px]">
                <Footerepic />
            </div>


        </>
    );

};

export default CarnavPage;