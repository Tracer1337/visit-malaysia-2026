import React, { useState, useEffect } from 'react'
import HeaderOTA from 'components/Header/HeaderOTA/index';
import { Input } from 'components/Input/index';
import { Text, Img, Line, Button } from "components";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import Footerepic from 'components/Footer/Footerepic/index';
import { useAuth } from 'AuthContext';
import LoginPage from "components/Login/index";
import { MdTrain,MdTram, MdBusAlert,MdDirectionsBoat, MdDirectionsWalk, MdChevronRight, MdDirectionsBus, MdPerson, MdCalendarToday, MdLink, MdDirectionsSubway } from "react-icons/md";
import { FaBus } from "react-icons/fa";
import SignupPage from "components/SignUp/index";
import { busData } from "./data";
import axios from 'axios';


const Busnav1Page = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();
    const location = useLocation();
   // const { fromDestination, toDestination } = location.state || { fromDestination: '', toDestination: '' };
    //setIsLoggedIn(true);
    const { fromDestination, toDestination, fromDestinationFull, toDestinationFull } = location.state || { fromDestination: '', toDestination: '', fromDestinationFull: '', toDestinationFull: '' };

    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [noOfPassengers, setNoOfPassengers] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [routeSummaries, setRouteSummaries] = useState([]);
    const [allRouteDetails, setAllRouteDetails] = useState([]);

    useEffect(() => {
        fetchData(noOfPassengers);
    }, [noOfPassengers]);

    const fetchData = async (passengers) => {
        try {
            const response = await axios.get(`https://halaltravel.ai/ht/api/route/alterativeRouteDetailsSummary?from=${fromDestinationFull}&to=${toDestinationFull}&travelOption=bus&noOfPassengers=${passengers}`);
            const data = response.data;
            setRouteSummaries(data);
            fetchAllRouteDetails(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const fetchAllRouteDetails = async (summaries) => {
        try {
            const detailsPromises = summaries.map(route =>
                axios.get(`https://halaltravel.ai/ht/api/route/routeDetails?from=${fromDestinationFull}&to=${toDestinationFull}&travelOption=bus&noOfPassengers=${noOfPassengers}&order=${route.order}`)
            );
            const detailsResponses = await Promise.all(detailsPromises);
            const details = detailsResponses.map(response => response.data.routeDetails);
            setAllRouteDetails(details);
        } catch (error) {
            console.error("Error fetching route details: ", error);
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

    function navigatePage(order) {
        navigate("/busnav3", {
            state: {
                fromDestination,
                toDestination,
                fromDestinationFull,
                toDestinationFull,
                date,
                noOfPassengers,
                order
            }
        });
    }

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
                <div className="px-[50px]">

                    <div className="flex items-center py-[50px]">
                        <FaBus size={56} className="text-[#F67702]" />
                        <div className="ml-[30px]">
                            <text className="text-[42px] text-[#1E1E1E] font-semibold">
                                {fromDestination} to {toDestination}
                            </text>
                        </div>
                    </div>

                    <div className="flex">

                        <div className="p-[15px] bg-[#F4F4F4] rounded-[10px] border-[#B0ADAD] border-[0.5px] w-fit flex items-center">
                            <MdCalendarToday size={49} className="text-[#555555] mr-[30px]" />
                            <input
                                type="date"
                                className="p-0 h-[50px] w-[250px] text-[#555555] text-[31px] border-none bg-[#F4F4F4]"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="Select date"
                            />
                        </div>

                        <div className="ml-[30px] p-[15px] bg-[#F4F4F4] rounded-[10px] border-[#B0ADAD] border-[0.5px] w-fit flex items-center">
                            <MdPerson size={51} className="text-[#555555] mr-[30px]" />
                            <select
                                className="h-[50px] w-[200px] text-[#555555] text-[31px] border-none bg-[#F4F4F4]"
                                value={noOfPassengers}
                                onChange={(e) => setNoOfPassengers(e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                    </div>

                    {/* {busData.map((data, index) => ( */}

                    {routeSummaries.map((data, index) => (
                        <div key={index} className="pt-[40px]">
                            <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px]"
                                onClick={() => navigatePage(data.order)}>
                                <div className="flex items-center">
                                    <text className="font-semibold text-[32px] text-[#2A3075]">
                                        {data.departureTime}
                                    </text>
                                    <MdChevronRight size={35} className="font-semibold text-[#1E1E1E] mx-[10px]" />
                                    <text className="font-semibold text-[32px] text-[#2A3075]">
                                        {data.arrivalTime}
                                    </text>
                                </div>
                                <div className="flex justify-left pt-[30px]">
                                    <div className="justify-left">
                                        <text className="font-light text-[30px] text-[#1E1E1E]">
                                            {data.duration} • Arrive at {data.arrivalTime}
                                        </text>
                                    </div>
                                </div>
                                {/* <div className="flex justify-left">
                                <text className="font-light text-[20px] text-[#1E1E1E]">
                                    One-way, {noOfPassengers} passenger{noOfPassengers > 1 ? 's' : ''}
                                </text>
                            </div> */}

                                <div className="flex items-center pt-[30px]">
                                    {/* {data.routeDetails.map((detail, index) => (
                                        <React.Fragment key={index}>
                                            {renderTravelModeIcon(detail.travelMode, detail.instruction)}

                                            {index < data.routeDetails.length - 1 && <MdChevronRight size={50} className="mx-[5px]" />}
                                        </React.Fragment>
                                    ))} */}
                                    {allRouteDetails[index] && allRouteDetails[index].map((detail, detailIndex) => (
                                        <React.Fragment key={detailIndex}>
                                            {renderTravelModeIcon(detail.travelMode, detail.instruction)}
                                            {detailIndex < allRouteDetails[index].length - 1 && <MdChevronRight size={50} className="mx-[5px]" />}
                                        </React.Fragment>
                                    ))}
                                </div>
                                

                                <div className="flex justify-end pt-[40px]">
                                    <text className="font-semibold text-[32px] text-[#2A3075]">
                                        MYR {data.fare}
                                    </text>
                                </div>
                                <div className="flex justify-end">
                                    <text className="font-light text-[30px] text-[#1E1E1E]">
                                        One-way, {noOfPassengers} passenger{noOfPassengers > 1 ? 's' : ''}
                                    </text>
                                </div>
                            </div>
                        </div>

                    ))}

                    {/* <div className="pt-[50px]">
                        <div className="bg-[#FFFFF] border-[#B0ADAD] border-[0.5px] rounded-[10px] p-[40px] flex justify-between">
                            <div>
                                <text className="font-semibold text-[34px] text-[#1E1E1E]">
                                    Show later times
                                </text>
                            </div>
                            <MdChevronRight size={55} className="text-[#1E1E1E]" />
                        </div>
                    </div> */}
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
                                        5 minutes
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
                                        MYR 1 - 5
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
                                        Every 5 minutes
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
                                    <a href="https://myrapid.com.my/bus-train/rapid-kl/bus/" className="flex items-center">
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
            </div>



            <div className="md:mt-[10px] lg:mt-[500px]">
                <Footerepic />
            </div>


        </>
    );

};

export default Busnav1Page;