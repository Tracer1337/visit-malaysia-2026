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
import { MdChevronRight, MdDirectionsSubway } from "react-icons/md";
import SignupPage from "components/SignUp/index";


const Subnav1Page = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    const location = useLocation();
    const { fromDestination, toDestination } = location.state || { fromDestination: '', toDestination: ''};

    //setIsLoggedIn(true);

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

    function handleNavigate1() {
        navigate("/subnav2");
    }

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
                
                <div className="flex items-center pt-[50px] px-[50px]">
                    <MdDirectionsSubway size={60} className="text-[#874178]"/>
                    <div className="ml-[30px]">
                        <text className="text-[42px] text-[#1E1E1E] font-semibold">
                            {fromDestination} to {toDestination}
                        </text>
                    </div>
                </div>

                <div className="pt-[40px]">
                    <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] p-[50px] h-fit w-screen">
                        <div>
                            <text className="font-semibold text-[34px] text-[#1E1E1E]">
                                Services on route
                            </text>
                        </div>
                        <div className="flex justify-between items-center pt-[30px]">
                            <div>
                                <Img
                                    src="images/rapid.png"
                                    className="w-[200px] object-cover"
                                    alt="rapid"
                                />
                            </div>
                            <div className="grid">
                                <text className="font-medium text-[28px] text-[#1E1E1E]">
                                    Rapid KL
                                </text>
                                <text className="font-light text-[24px] text-[#555555]">
                                    Every 10 minutes
                                </text>
                            </div>
                            <div className="grid">
                                <text className="font-medium text-[28px] text-[#1E1E1E]">
                                    MYR 2 - 4
                                </text>
                                <text className="font-light text-[24px] text-[#555555]">
                                    13min
                                </text>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-[30px]">
                            <div>
                                <Img
                                    src="images/ktm.png"
                                    className="w-[200px] object-cover"
                                    alt="ktm"
                                />
                            </div>
                            <div className="grid">
                                <text className="font-medium text-[28px] text-[#1E1E1E]">
                                    KTM Komuter
                                </text>
                                <text className="font-light text-[24px] text-[#555555]">
                                    Hourly
                                </text>
                            </div>
                            <div className="grid">
                                <text className="font-medium text-[28px] text-[#1E1E1E]">
                                    MYR 2 - 4
                                </text>
                                <text className="font-light text-[24px] text-[#555555]">
                                    13min
                                </text>
                            </div>
                        </div>
                        <div className="pt-[100px]">
                            <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px] flex justify-between" onClick={handleNavigate1}>
                                <div>
                                    <text className="font-semibold text-[34px] text-[#1E1E1E]">
                                        View schedules
                                    </text>
                                </div>
                                <MdChevronRight size={55} className="text-[#1E1E1E]"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            

            <div className="md:mt-[10px] lg:mt-[500px]">
                <Footerepic />
            </div>


        </>
    );

};

export default Subnav1Page;