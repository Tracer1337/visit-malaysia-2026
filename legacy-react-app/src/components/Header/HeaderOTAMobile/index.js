import React from "react";
import { Row, Text, Button, Img } from "components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsFillJournalBookmarkFill, BsPersonFill } from "react-icons/bs";
import { MdTravelExplore, MdOutlineDiscount } from "react-icons/md";
import { FaKaaba, FaCrown } from "react-icons/fa";
import { HiUserCircle } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GrResources } from "react-icons/gr";
import Icon from "@mdi/react";
import { mdiSemanticWeb } from "@mdi/js";
import GlobalConstant from "constant/global";
import { useAuth } from "AuthContext";
import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import axios from "axios";
// import { setCookie } from "components/useGoogleTranslateScript/index";
// import useGoogleTranslateScript from "components/useGoogleTranslateScript/index2";
import GoogleTranslate from "../GT/GoogleTranslate";
import GoogleTranslateMobile from "../GT/GoogleTranslateMobile";

const HeaderOTAMobile = ({ openPopup1 }) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  function handleNavigate1() {
    navigate("/login");
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
    navigate("/");
  };

  const toggleDropdown2 = () => {
    setNav1((prevState) => !prevState); // Toggles the state between true and false
  };

  const [userName, setUserName] = useState("");
  const [commissionUserId, setCommissionUserId] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  // localStorage.setItem("showLogin", showLogin);
  // if (showLogin) {
  //   console.log("showLogin is true");
  // } else {
  //   console.log("showLogin is false");
  // }

  useEffect(() => {
    console.log("logo: ", GlobalConstant.LOGO);
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
          setToken(localStorage.getItem("token"));
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
          console.error("Error fetching profile data:", error);
        });
    }
  }, [userId, isLoggedIn]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isDropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };

  useEffect(() => {
    // Function to check if click is outside of dropdowns
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".dropdown-btn") &&
        !event.target.closest(".dropdown-content") &&
        !event.target.closest(".dropdown-link")
      ) {
        setDropdownOpen(false);
        setDropdownOpen1(false);
        setNav1(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const [selectedLanguage, setSelectedLanguage] = useState("en");

  // useEffect(() => {
  //     // Retrieve the selected language from local storage, if available
  //     const storedLanguage = localStorage.getItem("selectedLanguage");
  //     if (storedLanguage) {
  //         setSelectedLanguage(storedLanguage);
  //     }
  // }, []);
  // useGoogleTranslateScript();
  // const handleLanguageChange = (event) => {
  //     const newLanguage = event.target.value;

  //     console.log(`Selected language: ${`newLanguage`}`);

  //     // Set the selected language in local storage
  //     localStorage.setItem("selectedLanguage", newLanguage);

  //     // Set the googtrans cookie with the selected language
  //     setCookie("googtrans", `/${newLanguage}`, "Session");

  //     console.log("Cookie set:", document.cookie);

  //     // Reload the page to apply the language change
  //     console.log("Reloading page...");
  //     window.location.reload();
  // };

  return (
    <>
      <header className="bg-white_A701 font-montserrat inline-flex items-center justify-center shadow-bs h-40 w-full visible lg:invisible lg:hidden">
        {/*mobile menu */}
        {/*overlay */}
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}

        {/*side drawer menu */}
        {/* <div className={nav ? 'fixed left-0 top-0 w-[800px] h-screen bg-white/95 z-10 duration-200' : 'fixed left-[-100%] top-0 w-[800px] h-screen bg-white/95 z-10 duration-200'}> */}
        <div
          className={
            nav
              ? "fixed left-0 top-0 w-[800px] h-screen bg-white/95 z-10 duration-200"
              : "hidden"
          }
        >
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={50}
            className="absolute right-4 top-4 cursor-pointer"
          />
          <Img
            src={`/images/${GlobalConstant.LOGO}`}
            className="mt-6 w-[60%]"
            alt="frame"
            onClick={() => navigate("/")}
          />
          <nav className="mt-40 h-screen">
            {isLoggedIn ? (
              <ul className="flex flex-col p-6 space-y-3 font-montserrat">
                <>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <BsPersonFill size={35} className="mr-4" />
                    <a href="/legacy/profile">
                      <span className="mx-2 text-[35px] font-medium">
                        Personal Info
                      </span>
                    </a>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaKaaba size={35} className="mr-4" />
                    <a href="/legacy/my-travelplan">
                      <span className="mx-2 text-[35px] font-medium">
                        Travel Plan
                      </span>
                    </a>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaCrown size={35} className="mr-4" />
                    <a href={`/legacy/influencer-creator/${userId}`}>
                      <span className="mx-2 text-[35px] font-medium">
                        Storefront
                      </span>
                    </a>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaCrown size={35} className="mr-4" />
                    <a href="/legacy/manage-content">
                      <span className="mx-2 text-[35px] font-medium">
                        Social Posting
                      </span>
                    </a>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaCrown size={35} className="mr-4" />
                    <a href="/legacy/edit-creator">
                      <span className="mx-2 text-[35px] font-medium">
                        Edit Storefront
                      </span>
                    </a>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaCrown size={35} className="mr-4" />
                    <a href="/legacy/bus-ticket-info">
                      <span className="mx-2 text-[35px] font-medium">
                        Bookings
                      </span>
                    </a>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaCrown size={35} className="mr-4" />
                    <a href="/legacy/report-dashboard">
                      <span className="mx-2 text-[35px] font-medium">
                        Report
                      </span>
                    </a>
                  </li>
                  {commissionUserId && (
                    <>
                      <li className="outline outline-1 outline-[#00a19a]"></li>
                      <li className="text-xl px-3 py-5 flex items-center">
                        <FaCrown size={35} className="mr-4" />
                        <a
                          href={
                            "https://affiliate.epictravel.ai/cmsadmin/jumpto_member_office.php?id=" +
                            commissionUserId +
                            "&token=" +
                            token
                          }
                        >
                          <span className="mx-2 text-[35px] font-medium">
                            Affiliate Commission
                          </span>
                        </a>
                      </li>
                    </>
                  )}
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <a href="/legacy/" onClick={handleSignOut}>
                      <span className="mx-2 text-[35px] font-medium">
                        Sign Out
                      </span>
                    </a>
                  </li>
                </>
              </ul>
            ) : (
              <>
                <ul className="flex flex-col p-6 space-y-3 font-montserrat">
                  <li className="text-xl px-3 py-5 flex items-center">
                    <BsFillJournalBookmarkFill size={35} className="mr-4" />
                    <span class="mx-2 text-[35px] font-medium">
                      Plan a Holiday
                    </span>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <MdTravelExplore size={35} className="mr-4" />
                    <span class="mx-2 text-[35px] font-medium">
                      Travel Ideas
                    </span>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <MdOutlineDiscount size={35} className="mr-4" />
                    <span class="mx-2 text-[35px] font-medium">Promos</span>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <FaCrown size={35} className="mr-4" />
                    <span class="mx-2 text-[35px] font-medium">
                      Creator Program
                    </span>
                  </li>
                  <li className="outline outline-1 outline-[#00a19a]"></li>
                  <li className="text-xl px-3 py-5 flex items-center">
                    <GrResources size={35} className="mr-4" />
                    <span class="mx-2 text-[35px] font-medium">Resources</span>
                  </li>
                </ul>

                <div className="w-full p-6 flex gap-4 justify-center grid grid-cols-2 mt-10 absolute left-0">
                  {/* <div className="items-center align-center justify-center">
                                        <button className="rounded-[10px] w-full border text-2xl border-1 border-[#00a19a] py-3 px-2.5">Create a tour</button>
                                    </div> */}
                  <div className="items-center justify-center align-center">
                    <button
                      className="w-full font-bold text-white text-2xl rounded-[10px] bg-[#00a19a] py-5 px-5"
                      onClick={openPopup1}
                    >
                      Sign In / Register
                    </button>
                  </div>
                </div>
              </>
            )}
          </nav>
        </div>

        <div className="flex justify-between items-center px-6 w-full">
          <div onClick={() => setNav(!nav)} className="visible">
            <AiOutlineMenu size={60} className="ml-26" />
          </div>
          {/* logo */}
          <div className="">
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
                <div className="items-center justify-center">
                  <IoIosNotificationsOutline size={70} className="" />
                </div>
                <GoogleTranslateMobile />
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
                    className={`dropdown-content z-10 mr-3 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-[500px] dark:bg-gray-700 dark:divide-gray-600 ${
                      nav1 ? "" : "hidden"
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
                              Hi, {email.split("@")[0]}!
                            </text>

                            <text class="block px-4 pt-1 pb-3 text-center font-thin text-[30px]">
                              {email}
                            </text>
                          </>
                        )}
                      </li>
                      <hr className="my-4 bg-black"></hr>
                      <li>
                        <a
                          href="/legacy/profile"
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Personal Info
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legacy/my-travelplan"
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Travel Plan
                        </a>
                      </li>
                      <li>
                        <a
                          href={`/legacy/influencer-creator/${userId}`}
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Storefront
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legacy/manage-content"
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Social Posting
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legacy/edit-creator"
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit Storefront
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legacy/bus-ticket-info"
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Bookings
                        </a>
                      </li>
                      <li>
                        <a
                          href="/legacy/report-dashboard"
                          class="block px-8 py-5 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Report
                        </a>
                      </li>
                      {commissionUserId && (
                        <li>
                          <a
                            href={
                              "https://affiliate.epictravel.ai/cmsadmin/jumpto_member_office.php?id=" +
                              commissionUserId +
                              "&token=" +
                              token
                            }
                            class="block px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Affiliate Commission
                          </a>
                        </li>
                      )}
                      <hr class="mt-4"></hr>
                      <li>
                        <a
                          href="/legacy/"
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
            </>
          ) : (
            <>
              {/* <span>not log in</span> */}
              <div className="flex p-4 items-center">
                <IoIosNotificationsOutline size={70} className="ml-7 mr-3" />
                <GoogleTranslateMobile />
                {/* <HiUserCircle
                                    size={75}
                                    className="text-[#ffb703]"
                                    onClick={openPopup1}
                                /> */}
              </div>
            </>
          )}

          {/* <div className="flex p-4">
                        <IoIosNotificationsOutline size={60} className="" />
                        <HiUserCircle size={60} className="text-[#ffb703]" />
                    </div> */}
        </div>
      </header>
    </>
  );
};

export default HeaderOTAMobile;
