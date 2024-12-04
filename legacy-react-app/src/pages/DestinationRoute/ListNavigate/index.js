import React, { useState } from 'react';
import HeaderOTA from 'components/Header/HeaderOTA/index';
import { Input } from 'components/Input/index';
import { Text, Img, Line, Button } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import Footerepic from 'components/Footer/Footerepic/index';
import { useAuth } from 'AuthContext';
import LoginPage from "components/Login/index";
import { MdOutlineChevronLeft, MdTrain, MdLocalTaxi, MdChevronRight, MdDirectionsCar } from "react-icons/md";
import { FaArrowRight, FaBus } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import SignupPage from "components/SignUp/index";


const ListNavigatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { fromDestination, toDestination, travelOptions, fromDestinationFull, toDestinationFull } = location.state || { fromDestination: '', toDestination: '', travelOptions: [], fromDestinationFull: '', toDestinationFull: ''};
    const { setIsLoggedIn } = useAuth();

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

    const handleNavigate = (type) => {
        switch (type) {
            case 'drive':
                navigate("/carnav",{
                    state: {
                        fromDestination, 
                        toDestination, 
                        travelOptions,
                        fromDestinationFull,
                        toDestinationFull
                    }
                });
                break;
            case 'taxi':
                navigate("/taxinav",{
                    state: {
                        fromDestination, 
                        toDestination, 
                        fromDestinationFull,
                        toDestinationFull,
                        travelOptions
                    }
                });
                break;
            case 'train':
                navigate("/subnav2",{
                    state: {
                        fromDestination,
                        toDestination,
                        fromDestinationFull,
                        toDestinationFull
                    }
                });
                break;
            case 'bus':
                navigate("/busnav2",{
                    state: {
                        fromDestination,
                        toDestination,
                        fromDestinationFull,
                        toDestinationFull
                    }
                });
                break;
            default:
                break;
        }
    };

    const getIcon = (travelOption) => {
        switch (travelOption) {
            case 'drive':
                return <MdDirectionsCar size={56} className="text-[#555555]" />;
            case 'taxi':
                return <MdLocalTaxi size={58} className="text-[#ECE200]" />;
            case 'train':
                return <MdTrain size={56} className="text-[#1E1E1E]" />;
            case 'bus':
                return <FaBus size={56} className="text-[#F67702]" />;
            default:
                return null;
        }
    };

    const getBadge = (option) => {
        if (option.fatest && option.cheapest) {
            return (
                <div className="bg-[#ACD9B7] py-[10px] px-[30px]">
                    <text className="text-[#2E9D49] text-[24px] font-semibold">
                        BEST
                    </text>
                </div>
            );
        } else if (option.fatest) {
            return (
                <div className="bg-[#ACD9B7] py-[10px] px-[30px]">
                    <text className="text-[#2E9D49] text-[24px] font-semibold">
                        FASTEST
                    </text>
                </div>
            );
        } else if (option.cheapest) {
            return (
                <div className="bg-[#ACD9B7] py-[10px] px-[30px]">
                    <text className="text-[#2E9D49] text-[24px] font-semibold">
                        CHEAPEST
                    </text>
                </div>
            );
        }
        return null;
    };

    // const sortedOptions = travelOptions.sort((a, b) => {
    //     if (a.fatest && a.cheapest) return -1;
    //     if (b.fatest && b.cheapest) return 1;
    //     if (a.fatest) return -1;
    //     if (b.fatest) return 1;
    //     if (a.cheapest) return -1;
    //     if (b.cheapest) return 1;
    //     return 0;
    // });

    const bestAndFastestOptions = travelOptions.filter(option => option.fatest || option.cheapest);
    const otherOptions = travelOptions.filter(option => !option.fatest && !option.cheapest);

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
            <div className="w-full font-montserrat h-fit xs:pt-[160px] lg:pt-[92px] md:block lg:hidden px-[50px]">

                <div className="flex pt-[50px] pb-[50px]">
                    <div className="bg-[#F5F5F5] border-[#555555] border-[0.5px] p-[15px] w-full flex justify-center items-center">
                        <div className="">
                            <text className="text-[#1E1E1E] text-[31px] font-semibold">
                                {fromDestination}
                            </text>
                        </div>
                        <div className="ml-[100px] flex items-center">
                            <FaArrowRight size={32} className="text-[#1E1E1E]" />
                        </div>
                        <div className="ml-[100px]">
                            <text className="text-[#1E1E1E] text-[31px] font-semibold">
                                {toDestination}
                            </text>
                        </div>
                    </div>
                </div>

                <div classname="">
                    <text className="text-[#1E1E1E] text-[42px] font-semibold">
                        {travelOptions.length} ways to travel from {fromDestination} to {toDestination}
                    </text>
                </div>

                {bestAndFastestOptions.map((option, index) => (
                    <div className="pt-[40px]" key={index}>
                        <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px]" onClick={() => handleNavigate(option.travelOptions)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    {getIcon(option.travelOptions)}
                                </div>
                                {getBadge(option)}

                            </div>
                            <div className="flex items-end justify-between mt-[30px]">
                                <div className="grid">
                                    <text className="font-medium text-[34px] text-[#1E1E1E]">
                                        {option.travelOptions.charAt(0).toUpperCase() + option.travelOptions.slice(1)}
                                    </text>
                                    <text className="font-light text-[28px] text-[#555555]">
                                        {option.duration}
                                    </text>
                                </div>
                                <div className="flex items-center">
                                    {option.travelOptions === 'drive' && <BsFuelPumpFill size={50} className="text-[#2A3075] pr-[10px]" />}
                                    <text className="font-semibold text-[34px] text-[#2A3075]">
                                        {option.fare}
                                    </text>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

                {otherOptions.length > 0 && (
                    <div className="pt-[50px]">
                        <text className="font-semibold text-[34px] text-[#1E1E1E]">
                            OTHER OPTIONS
                        </text>
                    </div>
                )}

                {otherOptions.map((option, index) => (
                    <div className="pt-[20px]" key={index}>
                        <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px]" onClick={() => handleNavigate(option.travelOptions)}>
                            <div className="flex justify-between items-center">
                                <div>
                                    {getIcon(option.travelOptions)}
                                </div>
                            </div>
                            <div className="flex items-end justify-between mt-[30px]">
                                <div className="grid">
                                    <text className="font-medium text-[34px] text-[#1E1E1E]">
                                        {option.travelOptions.charAt(0).toUpperCase() + option.travelOptions.slice(1)}
                                    </text>
                                    <text className="font-light text-[28px] text-[#555555]">
                                        {option.duration}
                                    </text>
                                </div>
                                <div className="flex items-center">
                                    {option.travelOptions === 'drive' && <BsFuelPumpFill size={50} className="text-[#2A3075] pr-[10px]" />}
                                    <text className="font-semibold text-[34px] text-[#2A3075]">
                                        {option.fare}
                                    </text>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-[100px]">
                    <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px] flex justify-between">
                        <div>
                            <text className="font-semibold text-[34px] text-[#1E1E1E]">
                                Accomodations near {toDestination}
                            </text>
                        </div>
                        <MdChevronRight size={55} className="text-[#1E1E1E]" />
                    </div>
                </div>

            </div>



            <div className="md:mt-[10px] lg:mt-[500px]">
                <Footerepic />
            </div>


        </>
    );

};

export default ListNavigatePage;