import React, { useState, useEffect } from 'react'
import HeaderOTA from 'components/Header/HeaderOTA/index';
import { Input } from 'components/Input/index';
import { Text, Img, Line, Button } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import Footerepic from 'components/Footer/Footerepic/index';
import { useAuth } from 'AuthContext';
import LoginPage from "components/Login/index";
import { MdTrain, MdTram, MdPerson, MdLocationPin, MdDirectionsBoat, MdDirectionsBus, MdDirectionsWalk, MdLocationOn, MdLink, MdChevronRight, MdDirectionsSubway } from "react-icons/md";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import SignupPage from "components/SignUp/index";
import axios from 'axios';

const Subnav3Page = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    //setIsLoggedIn(true);
    const location = useLocation();
    const { fromDestination, toDestination, date, noOfPassengers, fromDestinationFull, toDestinationFull, order } = location.state || {
        fromDestination: '', toDestination: ''
        , date: '', noOfPassengers: '', fromDestinationFull: '', toDestinationFull: '', order: ''
    };

    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [routeDetails, setRouteDetails] = useState([]);
    const [initialData, setInitialData] = useState({
        travelOptions: "",
        duration: "",
        distance: "",
        fare: "",
        departureTime: "",
        arrivalTime: "",
        noOfPassenger: "",
    });

    useEffect(() => {
        fetchData(noOfPassengers);
    }, [noOfPassengers]);

    const fetchData = async (passengers) => {
        try {
            const response = await axios.get(`https://halaltravel.ai/ht/api/route/routeDetails?from=${fromDestinationFull}&to=${toDestinationFull}&travelOption=train&noOfPassengers=${passengers}&order=${order}`);
            const data = response.data;
            setInitialData({
                travelOptions: data.travelOptions,
                duration: data.duration,
                distance: data.distance,
                fare: data.fare,
                departureTime: data.departureTime,
                arrivalTime: data.arrivalTime,
                noOfPassenger: data.noOfPassenger,
            });
            setRouteDetails(data.routeDetails);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

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

    const renderTravelModeIcon = (mode, instruction) => {
        if (mode === 'WALK') {
            return <MdDirectionsWalk size={45} className="" />;
        } else if (mode === 'TRANSIT') {
            if (instruction.startsWith('Bus')) {
                return <MdDirectionsBus size={45} className="" />;
            } else if (instruction.startsWith('Subway')) {
                return <MdDirectionsSubway size={45} className="" />;
            } else if (instruction.startsWith('Train')) {
                return <MdTrain size={45} className="" />;
            } else if (instruction.startsWith('Ferry')) {
                return <MdDirectionsBoat size={40} className="" />;
            } else if (instruction.startsWith('Monorail')) {
                return <MdTram size={45} className="" />;
            } else if (instruction.startsWith('ERL')) {
                return <MdTrain size={45} className="" />;
            } else {
                return <MdTrain size={45} className="" />;
            }
        } else {
            return null;
        }
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).replace(/, (\d{4})/, ' $1');
    };

    const addMinutes = (timeString, minutes) => {
        const [hours, mins] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(mins + minutes);

        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const parseDuration = (duration) => {
        const parts = duration.match(/(\d+)(?=min)|(\d+)(?=h)/g);
        let minutes = 0;
        if (parts) {
            for (let part of parts) {
                if (part.includes('h')) {
                    minutes += parseInt(part) * 60;
                } else {
                    minutes += parseInt(part);
                }
            }
        }
        return minutes;
    };

    const calculateTimes = () => {
        let currentTime = initialData.departureTime;
        return routeDetails.map((detail, index) => {
            const durationMinutes = parseDuration(detail.duration);
            const nextTime = addMinutes(currentTime, durationMinutes);
            const result = {
                ...detail,
                startTime: currentTime,
                endTime: nextTime,
            };
            currentTime = nextTime;
            return result;
        });
    };


    const detailedRoute = calculateTimes();

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
                    <MdDirectionsSubway size={60} className="text-[#874178]" />
                    <div className="ml-[30px]">
                        <text className="text-[42px] text-[#1E1E1E] font-semibold">
                            {fromDestination} to {toDestination}
                        </text>
                    </div>
                </div>

                <div className="p-[50px] h-fit w-screen">
                    <div className="flex">
                        <div className="mr-[50px]">
                            <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                {initialData.fare}
                            </text>
                        </div>
                        <div className="flex">
                            <MdPerson size={51} className="text-[#1E1E1E] mr-[20px]" />
                            <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                {initialData.noOfPassenger}
                            </text>
                        </div>
                    </div>

                    <div className="flex pt-[50px] ">
                        <div className="grid mr-[150px]">
                            <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                Leaving
                            </text>
                            <text className="font-medium text-[25px] text-[#1E1E1E]">
                                {formatDate(date)}
                            </text>
                        </div>
                        <div className="grid">
                            <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                Total duration
                            </text>
                            <text className="font-medium text-[25px] text-[#1E1E1E]">
                                {initialData.duration}
                            </text>
                        </div>
                    </div>
                </div>

                {/* <div className="p-[50px] flex justify-between">
                    <div className="flex items-center">
                        <FaChevronLeft size={30} className="text-[#1E1E1E] mr-2" />
                        <text className="font-medium text-[28px] text-[#1E1E1E]">
                            Earlier
                        </text>
                    </div>
                    <div className="">
                        <text className="font-medium text-[28px] text-[#1E1E1E] mr-2">
                            {initialData.departureTime}
                        </text>
                        <text className="font-medium text-[28px] text-[#1E1E1E] mr-2">
                            -
                        </text>
                        <text className="font-medium text-[28px] text-[#1E1E1E]">
                            {initialData.arrivalTime}
                        </text>
                    </div>
                    <div className="flex items-center">
                        <text className="font-medium text-[28px] text-[#1E1E1E] mr-2">
                            Later
                        </text>
                        <FaChevronRight size={30} className="text-[#1E1E1E]" />
                    </div>
                </div> */}

                <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] p-[50px] h-fit w-screen">
                    <div className="flex flex-col">
                        {detailedRoute.map((detail, index) => (
                            <div key={index} className="flex items-start mb-[10px]">
                                {/* Time */}
                                <div className="w-[155px]">
                                    <text className="pr-[10px] font-medium text-[30px] text-[#1E1E1E]">
                                        {detail.departureTime}
                                    </text>
                                </div>

                                {/* Icon and Line */}
                                <div className="flex flex-col items-center w-[40px]">
                                    {renderTravelModeIcon(detail.travelMode, detail.instruction)}
                                    {/* Conditional rendering of dotted line for the last start location if instruction starts with "WALK" */}
                                    {index === detailedRoute.length - 1 && (
                                        detail.instruction.startsWith("WALK") ? (

                                            <div className="dotted-line22 mt-[10px]"></div>
                                        ) : (
                                            <div className="item-center h-[235px] w-[8px] my-[1px]"
                                                style={{ backgroundColor: detail.transitLine.color }}>
                                            </div>
                                        )
                                    )}
                                    {index < detailedRoute.length - 1 && (

                                        detail.travelMode === 'WALK' ? (
                                            <div className="dotted-line22"></div>
                                        ) : (
                                            <div className="item-center h-[235px] w-[8px] my-[1px]"
                                                style={{ backgroundColor: detail.transitLine.color }}>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Start Location and Instruction */}
                                <div className="flex-1 pl-[15px]">
                                    <div>
                                        <text className="semi-bold font-medium text-[30px] text-[#1E1E1E]">
                                            {detail.startLocation}
                                        </text>


                                    </div>
                                    <div className='pt-[10px]'>
                                        <text className="font-regular text-[28px] text-[#555555]">
                                            {detail.duration} • {detail.distance}
                                        </text>
                                    </div>
                                    {detail.travelMode === 'TRANSIT' && (
                                        <div className="pt-2">
                                            <span className="text-[28px] text-gray-600">
                                                <span style={{ color: '#ffffff', background: detail.transitLine.color }}>
                                                    {detail.transitLine.shortName || detail.transitLine.name}
                                                </span>{' '}
                                                {detail.headSign}
                                            </span>
                                        </div>
                                    )}
                                    <div className='pt-[10px]'>
                                        <text className="font-regular text-[28px] text-[#555555]">
                                            {detail.instruction}
                                        </text>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Render the end location for the last route detail */}
                        {detailedRoute.length > 0 && (
                            <div className="flex items-start mb-[20px] items-center justify-center">
                                {/* Arrival Time */}
                                <div className="w-[155px]">
                                    <text className="pr-[10px] font-medium text-[30px] text-gray-800">
                                        {detailedRoute[detailedRoute.length - 1].arrivalTime}
                                    </text>
                                </div>

                                {/* Final Icon and Line */}
                                <div className="flex  items-center justify-center w-[40px]">
                                    <div className="waypoint mb-1"></div>
                                </div>

                                {/* End Location */}
                                <div className="flex-1">
                                    <span className="pl-[10px] font-semibold text-[30px] text-gray-800">
                                        {detailedRoute[detailedRoute.length - 1].endLocation}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>



                <div className="pt-[50px] px-[50px]">
                    <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px] flex justify-between">
                        <div>
                            <text className="font-semibold text-[34px] text-[#1E1E1E]">
                                Accomodations near {toDestination}
                            </text>
                        </div>
                        <MdChevronRight size={55} className="text-[#1E1E1E]" />
                    </div>
                </div>

                <div className="pt-[100px]">
                    <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] p-[50px] h-fit w-screen">
                        <div className="flex items-center">
                            <div>
                                <Img
                                    src="images/rapid.png"
                                    className="w-[250px] object-cover"
                                    alt="rapidkl"
                                />
                            </div>
                            <div className="ml-[50px]">
                                <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                    Rapid KL
                                </text>
                            </div>
                            <div className="bg-[#2A3075] px-[10px] py-[5px] ml-[20px]">
                                <text className="text-[20px] text-[#FFFFFF]">
                                    Pyl
                                </text>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-start gap-[10px] pt-[50px]">
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        Duration
                                    </text>
                                </div>
                                <div>
                                    <text className="font-medium text-[24px] text-[#1E1E1E]">
                                        13 minutes
                                    </text>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        Estimated Price
                                    </text>
                                </div>
                                <div>
                                    <text className="font-medium text-[24px] text-[#1E1E1E]">
                                        MYR 2 - 4
                                    </text>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        How often
                                    </text>
                                </div>
                                <div>
                                    <text className="font-medium text-[24px] text-[#1E1E1E]">
                                        Every 10 minutes
                                    </text>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        Schedules at
                                    </text>
                                </div>
                                <div>
                                    <a href="https://myrapid.com.my/" className="flex items-center">
                                        <text className="font-medium text-[24px] text-[#2A3075]">
                                            Rapid KL
                                        </text>
                                        <MdLink size={48} className="text-[#2A3075] ml-[10px]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-[50px]">
                    <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] p-[50px] h-fit w-screen">
                        <div className="flex items-center">
                            <div>
                                <Img
                                    src="images/ktm.png"
                                    className="w-[250px] object-cover"
                                    alt="ktm"
                                />
                            </div>
                            <div className="ml-[50px]">
                                <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                    KTM Komuter
                                </text>
                            </div>
                            <div className="bg-[#2A3075] px-[10px] py-[5px] ml-[20px]">
                                <text className="text-[20px] text-[#FFFFFF]">
                                    Pulau Sebang
                                </text>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-start gap-[10px] pt-[50px]">
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        Duration
                                    </text>
                                </div>
                                <div>
                                    <text className="font-medium text-[24px] text-[#1E1E1E]">
                                        7 minutes
                                    </text>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        Estimated Price
                                    </text>
                                </div>
                                <div>
                                    <text className="font-medium text-[24px] text-[#1E1E1E]">
                                        MYR 1 - 2
                                    </text>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        How often
                                    </text>
                                </div>
                                <div>
                                    <text className="font-medium text-[24px] text-[#1E1E1E]">
                                        Hourly
                                    </text>
                                </div>
                            </div>
                            <div className="">
                                <div>
                                    <text className="font-semibold text-[28px] text-[#1E1E1E]">
                                        Schedules at
                                    </text>
                                </div>
                                <div>
                                    <a href="https://www.ktmb.com.my/Komuter.html" className="flex items-center">
                                        <text className="font-medium text-[24px] text-[#2A3075]">
                                            KTM Intercity
                                        </text>
                                        <MdLink size={48} className="text-[#2A3075] ml-[10px]" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div >



            <div className="md:mt-[10px] lg:mt-[500px]">
                <Footerepic />
            </div>


        </>
    );

};

export default Subnav3Page;