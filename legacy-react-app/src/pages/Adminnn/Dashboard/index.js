import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import HeaderAdmin from 'components/Header/HeaderAdmin/index';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import { MdOutlineRocket } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import HeaderAdminMobile from "components/Header/HeaderAdminMobile/index";
import { FiMenu } from 'react-icons/fi';
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import ForgotPassword from "components/ForgotPass/index";
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import { BsPersonFillLock, BsFileEarmarkLock2Fill } from "react-icons/bs";


const DashboardAdminPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem('userId'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasAccess, setHasAccess] = useState(false); // Track if the user has access
    const allowedUserIds = [9, 43]; // List of allowed user IDs

    useEffect(() => {
        if (token && userId) {
            setIsAuthenticated(true);
            // Check if the user's ID is in the allowed list
            if (allowedUserIds.includes(userId)) {
                setHasAccess(true);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [userId]);


    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [isPopup3Open, setIsPopup3Open] = useState(false);

    const openPopup1 = () => {
        setIsPopup1Open(true);
    };

    const openPopup2 = () => {
        setIsPopup2Open(true);
    };

    const openPopup3 = () => {
        setIsPopup3Open(true);
        setIsPopup1Open(false);
    };

    const closePopup1 = () => {
        setIsPopup1Open(false);
    };

    const closePopup2 = () => {
        setIsPopup2Open(false);
    };

    const closePopup3 = () => {
        setIsPopup3Open(false);
    };


    const [dashboardData, setDashboardData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // For search input
    const [loading, setLoading] = useState(false); // For loading indicator
    const [error, setError] = useState(null); // For error handling

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('https://halaltravel.ai/ht/api/admin/users/summary');
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching data:', error); // Handle errors
            }
        };

        fetchDashboardData(); // Call the async function
    }, []);

    console.log("Dashboard Data: ", dashboardData);


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    function handleNavigate() {
        navigate("/admin-member-management");
    }


    return (
        <>
            <div className='fixed w-full' style={{ zIndex: 2 }}>
                {/* <HeaderAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" /> */}
                <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
                {/* <HeaderAdminMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" /> */}
                <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
                <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
                <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
                {/* <ForgotPassword isOpen={isPopup3Open} closePopup3={closePopup3} /> */}
                {/* <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" /> */}
            </div>

            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                {!isAuthenticated ? (
                    <div className="flex items-center text-center p-6">
                        <BsPersonFillLock size={50} className="text-red-500 mr-1" />
                        <p className="text-red-500 text-xl font-semibold">
                            Unauthorized user. Please log in.
                        </p>
                    </div>
                ) : !hasAccess ? (
                    <div className="flex flex-col justify-center items-center text-center p-6">
                        <BsFileEarmarkLock2Fill size={40} className="text-red-500 mr-1 mb-6" />
                        <p className="text-red-500 text-xl font-semibold">
                            Access Denied.
                        </p>
                        <p className="text-red-500 text-lg font-semibold">
                            You do not have permission to view this page.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="w-full font-montserrat bg-gray-50 xs:pt-[160px] lg:pt-[92px]">
                            <div className="flex min-h-screen items-start">
                                {/* Hamburger Icon */}
                                {!isSidebarOpen && (
                                    // <div className="hidden lg:flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col">
                                    <div className="flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col">
                                        <button onClick={toggleSidebar} className="p-5">
                                            <FiMenu size={30} className="text-[#FFFFFF]" />
                                        </button>
                                    </div>
                                )}

                                {/* Sidebar */}
                                {isSidebarOpen && (
                                    // <div className="hidden lg:flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col ">
                                    <div className="flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col ">
                                        {/* Toggle Button */}
                                        <button onClick={toggleSidebar} className="p-5">
                                            <FiMenu size={30} className="text-[#FFFFFF]" />
                                        </button>

                                        {/* Options at the bottom */}
                                        <div
                                            className="mt-[5px] py-[15px] pl-[15px] bg-[#FFFFFF] bg-opacity-30 flex w-[250px] cursor-pointer items-center"
                                        >
                                            <MdOutlineRocket size={35} className="text-[#FFFFFF]" />
                                            <div className="ml-[20px]">
                                                <span className="font-montserrat font-semibold text-sm text-[#FFFFFF]">
                                                    Dashboard
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="py-[15px] pl-[15px] flex w-[250px] cursor-pointer hover:bg-[#FFFFFF] hover:bg-opacity-10 items-center"
                                            onClick={handleNavigate}
                                        >
                                            <BsPeople size={35} className="text-[#FFFFFF]" />
                                            <div className="ml-[20px]">
                                                <span className="font-montserrat font-semibold text-sm text-[#FFFFFF]">
                                                    Member Management
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`p-[30px] min-h-screen w-full overflow-x-auto transition-all duration-300 
                                    ${isSidebarOpen ? 'ml-[250px]' : 'ml-[70px]'}`}
                                >
                                    <div className="flex items-center">
                                        <MdOutlineRocket size={35} className="md:hidden lg:block text-[#2A3075]" />
                                        <MdOutlineRocket size={65} className="md:block lg:hidden text-[#2A3075]" />
                                        <div className="ml-[20px]">
                                            <text className="font-montserrat font-semibold md:text-3xl lg:text-xl text-[#2A3075]">
                                                Dashboard
                                            </text>
                                        </div>
                                    </div>

                                    <div className="lg:flex lg:justify-between pt-[40px] w-full gap-2">
                                        <div className="flex items-center shadow-md py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserPlus size={55} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserPlus size={85} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-4xl lg:text-xl font-montserrat font-semibold">
                                                        Total Registered User
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalRegistered}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center shadow-md md:mt-[10px] lg:mt-[0px] py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserCheck size={55} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserCheck size={85} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-4xl lg:text-xl font-montserrat font-semibold">
                                                        Total Active User
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalActive}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:flex lg:justify-between pt-[10px] w-full gap-2">
                                        <div className="flex items-center shadow-md py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserPlus size={50} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserPlus size={80} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-3xl lg:text-lg font-montserrat font-semibold">
                                                        Total Registered
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#00A19A] md:text-2xl lg:text-sm font-montserrat font-semibold">
                                                        (This Week)
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalRegisteredWeek}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center shadow-md md:mt-[10px] lg:mt-[0px] py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserPlus size={50} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserPlus size={80} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-3xl lg:text-lg font-montserrat font-semibold">
                                                        Total Registered
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#00A19A] md:text-2xl lg:text-sm font-montserrat font-semibold">
                                                        (This Month)
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalRegisteredMonth}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center shadow-md md:mt-[10px] lg:mt-[0px] py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserPlus size={50} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserPlus size={80} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-3xl lg:text-lg font-montserrat font-semibold">
                                                        Total Registered
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#00A19A] md:text-2xl lg:text-sm font-montserrat font-semibold">
                                                        (This Year)
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalRegisteredYear}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:flex lg:justify-between pt-[10px] w-full gap-2">
                                        <div className="flex items-center shadow-md py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserCheck size={50} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserCheck size={80} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-3xl lg:text-lg font-montserrat font-semibold">
                                                        Total Active
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#00A19A] md:text-2xl lg:text-sm font-montserrat font-semibold">
                                                        (This Week)
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalActiveWeek}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center shadow-md md:mt-[10px] lg:mt-[0px] py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserCheck size={50} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserCheck size={80} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-3xl lg:text-lg font-montserrat font-semibold">
                                                        Total Active
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#00A19A] md:text-2xl lg:text-sm font-montserrat font-semibold">
                                                        (This Month)
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalActiveMonth}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center shadow-md md:mt-[10px] lg:mt-[0px] py-[30px] px-[40px] bg-[#FFFFFF] border-[0.5px] border-[#AEAEAE] rounded-[10px] w-full">
                                            <div className="rounded-full md:p-[40px] lg:p-[20px] bg-[#00A19A] flex justify-center">
                                                <FaUserCheck size={50} className="md:hidden lg:block text-[#FFFFFF]" />
                                                <FaUserCheck size={80} className="md:block lg:hidden text-[#FFFFFF]" />
                                            </div>
                                            <div className="ml-[40px]">
                                                <div>
                                                    <text className="text-[#00A19A] md:text-3xl lg:text-lg font-montserrat font-semibold">
                                                        Total Active
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#00A19A] md:text-2xl lg:text-sm font-montserrat font-semibold">
                                                        (This Year)
                                                    </text>
                                                </div>
                                                <div>
                                                    <text className="text-[#1E1E1E] md:text-2xl lg:text-sm font-montserrat font-medium">
                                                        {dashboardData.totalActiveYear}
                                                    </text>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>



                        </div>
                    </>
                )}
            </div>
        </>
    );

};

export default DashboardAdminPage;