import React from "react";
import { Row, Text, Button, Img } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsPeople, BsPersonFill } from 'react-icons/bs';
import { MdOutlineRocket } from 'react-icons/md';
import GlobalConstant from "constant/global";
import { useAuth } from "AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { IoIosNotificationsOutline } from 'react-icons/io';
import { HiUserCircle } from 'react-icons/hi';
import { FaKaaba, FaCrown } from 'react-icons/fa';


const HeaderOTAMobile = ({ openPopup1 }) => {
    const navigate = useNavigate();
    const [nav, setNav] = useState(false)

    function handleNavigate1() {
        navigate("/admin-dashboard");
    }
    function handleNavigate2() {
        navigate("/admin-member-management");
    }

    const { isLoggedIn } = useAuth();
    const [nav1, setNav1] = useState(false);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");
    const defaultProfileImageUrl = "/images/default_profile_login.jpg";
    const [profileImage, setProfileImagePath] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };
    const handleSignOut = (event) => {
        // Clear the entire local storage
        localStorage.clear();
        isLoggedIn(false); // Update the isLoggedIn state
        navigate("/admin-dashboard");
    };

    const toggleDropdown2 = () => {
        setNav1((prevState) => !prevState); // Toggles the state between true and false
    };

    useEffect(() => {
        // Function to check if click is outside of dropdowns
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown-btn') && !event.target.closest('.dropdown-content')) {
                setNav1(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [commissionUserId, setCommissionUserId] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        console.log('logo: ', GlobalConstant.LOGO)
        if (isLoggedIn) {
            axios
                .get(`https://halaltravel.ai/ht/api/profile/${userId}`)
                .then((response) => {
                    const data = response.data;
                    const profileImage = data.profileImage;
                    const userName = data.userName;
                    const email = data.email;
                    const commissionUserId = data.commissionUserId;
                    setProfileImagePath(profileImage);
                    setUserName(userName);
                    setCommissionUserId(commissionUserId);
                    setLoading(false);
                    setEmail(email);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                    console.error("Error fetching profile data:", error);
                });
        }
    }, [userId, isLoggedIn]);


    return (
        <>
            <header className="bg-white_A701 font-montserrat inline-flex items-center justify-center shadow-bs h-40 w-full visible lg:invisible lg:hidden">

                {/*mobile menu */}
                {/*overlay */}
                {nav ? <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div> : ''}

                {/*side drawer menu */}
                {/* <div className={nav ? 'fixed left-0 top-0 w-[800px] h-screen bg-white/95 z-10 duration-200' : 'fixed left-[-100%] top-0 w-[800px] h-screen bg-white/95 z-10 duration-200'}> */}
                <div className={nav ? 'fixed left-0 top-0 w-[800px] h-screen bg-gradient-to-b from-[#00A19A] to-[#2A3075] z-10 duration-200' : 'hidden'}>
                    <AiOutlineClose onClick={() => setNav(!nav)} size={50} className="absolute right-4 top-4 cursor-pointer text-[#FFFFFF]" />

                    <Img
                        src={`/images/${GlobalConstant.LOGO}`}
                        className="mt-6 ml-6 w-[60%]"
                        alt="frame"
                    />

                    <nav className="mt-40 h-screen">

                        {isLoggedIn ? (
                            <>
                                <ul className=" p-6 space-y-3 font-montserrat">
                                    <li onClick={handleNavigate1} className="text-xl px-3 py-5 flex items-center">
                                        <MdOutlineRocket size={38} className="text-[#FFFFFF] mr-4" />
                                        {/* <a href="#dashboard"> */}
                                            <span class="mx-2 text-[35px] text-[#FFFFFF] font-medium">Dashboard</span>
                                        {/* </a> */}
                                    </li>

                                    <li className="outline outline-1 outline-[#FFFFFF]"></li>

                                    <li onClick={handleNavigate2} className="text-xl px-3 py-5 flex items-center">
                                        <BsPeople size={38} className="text-[#FFFFFF] mr-4" />
                                        {/* <a href="#membermanagement"> */}
                                            <span class="mx-2 text-[35px] text-[#FFFFFF] font-medium">Member Management</span>
                                        {/* </a> */}
                                    </li>

                                    <li className="outline outline-1 outline-[#FFFFFF]"></li>
                                    
                                    {/* <li onClick={handleSignOut} className=" text-xl px-3 py-10 flex items-center">
                                            <span class="mx-2 text-[35px] text-[#FFFFFF] font-medium">Sign Out</span>
                                    </li> */}
                                </ul>
                            </>
                        ) : (
                            <div className="w-full p-6 flex gap-4 justify-center grid grid-cols-2 mt-10 absolute left-0">
                                {/* <div className="items-center align-center justify-center">
                                <button className="rounded-[10px] w-full border text-2xl border-1 border-[#00a19a] py-3 px-2.5">Create a tour</button>
                            </div> */}
                                <div className="items-center justify-center align-center">
                                    <button
                                        className="w-full font-bold bg-[#FFFFFF] text-[#00a19a] text-2xl rounded-[10px] py-5 px-5"
                                        onClick={openPopup1}
                                    >
                                        Sign In / Register
                                    </button>
                                </div>
                            </div>
                        )}

                    </nav>

                </div>

                <div className="flex justify-between items-center px-6 w-full">
                    <div onClick={() => setNav(!nav)} className="flex visible">
                        <AiOutlineMenu size={60} className="ml-26" />
                    </div>

                    {/* logo */}
                    <div className="flex w-[40%]">
                        <Img
                            src={`/images/${GlobalConstant.LOGO}`}
                            className="ml-2 sm:h-[130px] w-auto "
                            alt="frame"
                            onClick={() => navigate("/")}
                        />
                    </div>


                    {/* profile */}
                    {isLoggedIn ? (
                        <>
                            {/* <span>log in</span> */}
                            <div className="flex justify-end text-center items-center w-[50%] ">
                                {/* <div className="items-center justify-center">
                                    <IoIosNotificationsOutline size={70} className="" />
                                </div> */}
                                {/* <GoogleTranslateMobile /> */}
                                <div>
                                    <button
                                        className="dropdown-btn inline-flex border border-gray ml-7 mr-3 text-[#008D36] rounded-full items-center"
                                        // className="inline-flex ml-7 mr-2 text-[#008D36] rounded-full items-center"
                                        id="dropdownNavbarLink"
                                        data-dropdown-toggle="dropdownNavbar2"
                                        onClick={toggleDropdown2}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {/* <FiMenu className="mr-2" size={40}/> */}
                                        {/* {profileImage ? ( */}
                                        {profileImage ? (
                                            <img
                                                src={`${profileImage}`}
                                                alt=""
                                                className="w-20 h-20 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                                            />
                                        ) : (
                                            <img
                                                src={`${defaultProfileImageUrl}`}
                                                alt=""
                                                className="w-20 h-20 mx-auto rounded-full dark:bg-gray-500 aspect-square"
                                            />
                                        )}
                                    </button>
                                    {/* {showTooltip && (
                                        <div className="font-semibold text-gray-300 uppercase absolute top-10 tooltip justify-items-end right-4 mt-8 py-1.5 px-3 bg-black rounded text-xs shadow">
                                            {userName}
                                        </div>
                                    )} */}
                                    <div
                                        id="dropdownNavbar2"
                                        className={`dropdown-content z-10 mr-3 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-[500px] dark:bg-gray-700 dark:divide-gray-600 ${nav1 ? "" : "hidden"
                                            } absolute right-2`}
                                    >
                                        <ul
                                            class="py-5 px-2 mt-2 text-[38px] text-left text-gray-700 dark:text-gray-400 "
                                            aria-labelledby="dropdownLargeButton"
                                        >
                                            <li>
                                                {userName ? (
                                                    <>
                                                        <text class="block px-4 pt-z text-center font-semibold">
                                                            Hi, {userName}!
                                                        </text>
                                                        <text class="block px-4 pt-1 pb-3 text-center font-thin text-[30px]">
                                                            {email}
                                                        </text>
                                                    </>
                                                ) : (
                                                    <>
                                                        <text class="block px-4 pt-2 text-center font-semibold">
                                                            Hi, {email.split('@')[0]}!
                                                        </text>

                                                        <text class="block px-4 pt-1 pb-3 text-center font-thin text-[30px]">
                                                            {email}
                                                        </text>
                                                    </>
                                                )}
                                            </li>
                                            <hr className="my-4 bg-black" ></hr>
                                            {/* <li>
                                                <a
                                                    href="/profile"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Personal Info
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/my-travelplan"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Travel Plan
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/influencer-creator"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Storefront
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/manage-content"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Social Posting
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/edit-creator"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Edit Storefront
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/bus-ticket-info"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Bookings
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/report-dashboard"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    Report
                                                </a>
                                            </li>
                                            {commissionUserId && (
                                                <li>
                                                    <a
                                                        href={"https://affiliate.epictravel.ai/cmsadmin/jumpto_member_office.php?id=" + commissionUserId + "&token=" + token}
                                                        class="block px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Affiliate Commission
                                                    </a>
                                                </li>)} */}
                                            {/* <hr class="mt-4"></hr> */}
                                            <li>
                                                <a
                                                    href="/"
                                                    class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={handleSignOut}
                                                >
                                                    Sign Out
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>) : (
                        <>
                            {/* <span>not log in</span> */}
                            <div className="flex justify-end p-4 items-center w-[50%]">
                                {/* <IoIosNotificationsOutline size={70} className="ml-7 mr-3" />
                                <GoogleTranslateMobile /> */}
                                {/* <HiUserCircle
                                    size={75}
                                    className="text-[#ffb703]"
                                    onClick={openPopup1}
                                /> */}
                                <div className="items-center justify-center align-center">
                                    <button
                                        className="w-full font-bold bg-[#00a19a] text-[#FFFFFF] text-2xl rounded-[10px] py-5 px-5"
                                        onClick={openPopup1}
                                    >
                                        Sign In / Register
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>



            </header>
        </>

    )
}

export default HeaderOTAMobile;