import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Input, Img, Button, Line, Row, Column } from "components";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import './App1.css';
import HeaderOTA from 'components/Header/HeaderOTA/index';
import HeaderOTAMobile from "components/Header/HeaderOTAMobile/index";
import { FaTimes } from 'react-icons/fa';
import { fetchData2 } from "redux/actions2";
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import { useAuth } from "AuthContext";
import Icon from "@mdi/react";
import { mdiBookmarkOutline } from "@mdi/js";
import ManageContent from 'pages/Influencer/ManageContent/index';
import ContentSetting from 'components/ContentSetting/index';
import { mdiTaxi, mdiAirplane, mdiBus, mdiTrain, mdiHeartOutline, mdiTrainCar } from '@mdi/js';
import { IoIosArrowBack, IoIosArrowForward, IoIosPartlySunny, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { useParams } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { WiMoonAltNew } from "react-icons/wi";
import CreateYourOwn from 'components/CreateYourOwn/index';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { LiaEdit } from "react-icons/lia";
import ShowAI from "components/ShowAI/index";
import { Icon as IconifyIcon } from '@iconify/react';
import axios from "axios";
import { BiSave } from "react-icons/bi";
import { FaHotel } from "react-icons/fa6";


const DIYOverviewNewPage = () => {
  const items = Array.from({ length: 20 }, (_, index) => index + 1);
  const location = useLocation();
  const receivedData = location.state;
  console.log("location.state", location.state);
  // const itineraryId = useSelector((state) => state.data.itineraryId);
  const itineraryId = useSelector((state) => state.data.itineraryId);
  const generalData = useSelector((state) => state.data);
  const [isPublished, setIsPublished] = useState(false);
  const userId = localStorage.getItem("userId");
  const days = receivedData.days;
  const message = receivedData.message;
  const attractions = receivedData.attractions;
  const interests = receivedData.interests;
  const date = receivedData.date;
  const include = receivedData.include;
  const language = receivedData.language;
  console.log("RECEIVED DATA", receivedData);
  const [activeText, setActiveText] = useState('Itinerary Plan');
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImagePath] = useState("");
  const [userName, setUserName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const { creatorId, itineraryTitle } = useParams();
  const [showAddtoContentNew, setShowAddtoContentNew] = useState(false);
  const [showAddtoContentOld, setShowAddtoContentOld] = useState(false);
  const [showCreateNewItinerary, setShowCreateNewItinerary] = useState(false);
  const [description, setDescription] = useState(''); //string
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);
  const [isShowAI, setIsShowAI] = useState(false);
  const [showModalItinerary, setshowModalItinerary] = React.useState(false);
  const [createTPButtonClicked, setCreateTPButtonClicked] = useState(false);
  const startDay = 1;
  // Function to handle clicking the Create Travel Plan button
  const handleCreateTPClick = () => {
    setCreateTPButtonClicked(true);
    setshowModalItinerary(true);
  };


  // Sort by day in ascending order

  const [showAllDays, setShowAllDays] = useState(false); // State to handle button click

  const handleToggleDays = () => {
    setShowAllDays(prevState => !prevState); // Toggle between true and false
  };

  // * Navigation *
  function handleNavigate() {
    if (isLoggedIn) {
      // navigate("/ota2");
      setshowModalItinerary(false);
      setIsShowCreateNew(true);
    } else {
      setshowModalItinerary(false);
      setIsPopup1Open(true);
    }
  }

  const openPopup44 = () => {
    setShowAddtoContentOld(true);
    setShowAddtoContentNew(false);

  };

  // const handleSetActivityId = (id) => {
  //   setActivityId(id);
  // };




  // Function to handle text click and set active text.
  const handleTextClick = (text) => {
    setActiveText(text);
  };



  const closeContentSetting = () => {
    setIsShowContentSetting(false);
    setCreateTPButtonClicked(false);
  }

  const backContentSetting = () => {
    setIsShowContentSetting(false);
    setshowModalItinerary(true);
  }

  const backShowAI = () => {
    setIsShowAI(false);
    setshowModalItinerary(true);
  }

  const closeShowAI = () => {
    setIsShowAI(false);
    setCreateTPButtonClicked(false);
  };

  const baseURL = window.location.origin;
  console.log("baseUrl: ", baseURL);

  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  };

  // Assuming receivedData.message contains the string "Perak, Perak, Malaysia"
  if (receivedData.message === 'Perak, Perak, Malaysia') {
    receivedData.message = 'Perak, Malaysia';
  }

  // Log the message being sent
  console.log(`Sending: ${receivedData.message}`);



  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { setIsLoggedIn } = useAuth();
  // setIsLoggedIn(true);
  const [ltext, setltext] = useState('Hold on, generating your itenaries');

  const [myArray1, setMyArray1] = useState([]);
  const [datam, setDatam] = useState([]);

  var myArray = [];

  const isMobileView = window.matchMedia('(max-width: 768px)').matches;

  const messages = [
    "Hold up, we're putting together your travel plan...",
    "Figuring out the cities you'll hit...",
    "Sorting out the attractions for you to check out...",
    "Grabbing the travel routes for your journey...",
    "Fine-tuning your itinerary to make it even better...",
    "Hang tight while we make sure your trip is top-notch"
  ];

  const [hasError, setHasError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [text, setText] = useState(messages[0]);
  const [index, setIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [grid, setGrid] = useState('grid-cols-1');

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];


  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isShowContentSetting, setIsShowContentSetting] = React.useState(false);
  const [isShowCreateNew, setIsShowCreateNew] = React.useState(false);

  const openPopup1 = () => {
    setIsPopup1Open(true);
  };

  const openPopup2 = () => {
    setIsPopup2Open(true);
  };

  const openPopup3 = () => {
    setIsShowContentSetting(true);
  }

  const closePopup1 = () => {
    setIsPopup1Open(false);
  };

  const closePopup2 = () => {
    setIsPopup2Open(false);
  };

  const closePopup3 = () => {
    setIsShowContentSetting(false);
  }

  const closePopupCreateNew = () => {
    setIsShowCreateNew(false);
  }

  useEffect(() => {
    axios
      .get(`https://halaltravel.ai/ht/api/profile/${userId}`)
      .then((response) => {
        const data = response.data;
        const profileImage = data.profileImage;
        const userName = data.userName;

        //setIsLoading(true);
        setProfileImagePath(profileImage);
        setUserName(userName);

      })
      .catch((error) => {
        // setError(error);
        // setLoading(false);
        console.error("Error fetching profile data:", error);
      });


  }, [userId]);

  console.log("username", userName)
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  console.log("Full State: ", state);

  const data = useSelector((state) => state.data.data);
  console.log("data Overview: ", data);
  const data1 = useSelector((state) => state.data.data1);
  const data3 = useSelector((state) => state.data.data3);
  console.log("data3", data3)
  console.log("user", creatorId)

  const loading = useSelector((state) => state.data.loading);

  const error = useSelector((state) => state.data.error);

  const itineraryDetails = location.state?.itineraryDetails || null;
  // console.log("TESTETETET", itineraryDetails)

  function findThumbnailURLIndex(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }

    return -1; // If title is not found
  }

  function findThumbnailURLIndex1(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }

    return -1; // If title is not found
  }


  function findThumbnailURLIndex2(data3, title) {
    for (let i = 0; i < data3.length; i++) {
      if (data3[i].title === title) {
        return i;
      }
    }

    return -1; // If title is not found
  }

  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);
  const [showModal5, setShowModal5] = React.useState(false);
  const [showModal6, setShowModal6] = React.useState(false);

  const data22 = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 2, name: 'Jane' },

  ];

  let gridClass = "";

  function handleNavigate689() {

    const receivedData1 = {
      theme: receivedData.theme,
      message: receivedData.message,
      days: receivedData.days,
      date: receivedData.date,
      attractions: receivedData.attractions,
      interests: receivedData.interests,
      include: receivedData.include,
      exclude: receivedData.exclude,
      language: receivedData.language
    };


    try {

      const simulatedResponse = {
        status: 200,
        data: {
          error_code: 'Error on OpenAI',
          error_message: 'ERROR_OPENAI',
          date: '03:47AM 54-12-2023'
        }
      };

      if (loading) {
        //  alert("aaa")
      }
      // else if (simulatedResponse.status === 200) {
      //   // Check if the response contains an error_code of 'Error on OpenAI'
      //   if (simulatedResponse.data.error_code === 'Error on OpenAI') {
      //     setErrorMessage(simulatedResponse.data.error_message); // Set the "error_message" field
      //   }
      // }
      else {
        dispatch(fetchData2(receivedData1));
        // throw new Error(`Error: HTTP status code ${simulatedResponse.status}`);

      }
    } catch (error) {
      // setHasError(error.message);
      console.error('An error occurred:', error);
    }

    console.log("Received Location: " + receivedData.message);
    console.log("Received userId: " + userId);
    console.log("Received Itinerary id: ", itineraryId);
    console.log("Received include: ", receivedData.include);
    console.log("Received exclude: ", receivedData.exclude);
    console.log("Received date: ", receivedData.date);
    console.log('Received General: ', generalData)
    console.log('Received day: ', receivedData.days)



  }
  useEffect(() => {

    handleNavigate689();
    const timer = setInterval(() => {
      // const newIndex = (prevIndex + 1) % messages.length;
      // setText(messages[newIndex]);
      setIndex(prevIndex => {
        const newIndex = (prevIndex + 1) % messages.length;
        setText(messages[newIndex]);


      });
    }, 1000);

    // Clean up the interval on component unmount

    return () => {
      clearInterval(timer);

    };

  }, []);

  const formatDate = (receivedDate, day) => {
    const currentDate = new Date(receivedDate);
    const updatedDate = new Date(currentDate.getTime());
    const year = updatedDate.getFullYear();

    updatedDate.setDate(updatedDate.getDate() + day - 1);

    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    const dayOfMonth = updatedDate.getDate();
    const startMonthString = monthNames[updatedDate.getMonth()];

    return `${dayOfMonth} ${startMonthString} ${year}`;
  };

  const formatDate1 = (receivedDate, day) => {
    const currentDate = new Date(receivedDate);
    const updatedDate = new Date(currentDate.getTime());
    const year = updatedDate.getFullYear();

    updatedDate.setDate(updatedDate.getDate() + day - 1);

    // Ensure month and day are two digits
    const month = String(updatedDate.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(updatedDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${dayOfMonth}`;
  };

  const getNextDayDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${dayOfMonth}`;
  };

  const destination = receivedData.message;

  const { isLoggedIn } = useAuth();

  const handleButtonClick = (date) => {
    if (isLoggedIn) {
      navigate("/bus-landing-page", { state: { destination, date } });
    } else {
      setIsPopup1Open(true);
    }
  };


  const [currentPage, setCurrentPage] = useState(0); // Start at the first set of days
  const itemsPerPage = 3; // Show 3 items per page

  // Calculate the current slice of data to show
  const currentItems = data ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < data.length) {
      setCurrentPage(prevPage => prevPage + 1); // Move to the next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1); // Move to the previous page
    }
  };
  const scrollToDay = (day) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateSave = () => {
    if (isLoggedIn) {
      // navigate("/ota2");
      setIsShowContentSetting(true);
    } else {
      setIsPopup1Open(true);
    }
  };

  console.log("datass", data)

  const [isVisible, setIsVisible] = useState(true);
  // Hide component on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // // Filter and sort data by day and combine activities and transport
  // const filteredData = data
  //   .filter((item) => item.day >= startDay) // Filter starting from startDay
  //   .sort((a, b) => a.day - b.day); 



  return (
    <>

      <div id="myElement" className="bg-gray-60 flex flex-col font-ptsans items-center justify-start mx-[auto] w-[100%]">

        {/* ${receivedData.days} */}

        {/*mobile View*/}
        <div className="lg:hidden lg:max-h-0 lg:overflow-hidden  absolute visible lg:invisible lg:hidden bg-[#EAEBEF] flex flex-col items-center justify-start mx-[auto] w-[100%]">
          <HeaderOTA openPopup1={openPopup1} className="relative hidden lg:visible" />
          <HeaderOTAMobileEpic openPopup1={openPopup1} className="relative hidden md:visible" />
          <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
          <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
          {/* <hr></hr> */}

          <div className="mt-[1px] bg-white  w-[100%]  ">
            <div className=' mx-[30px] my-4'>
              <text className='w-[100%] font-sans text-[#000000] text-[55px] font-bold leading-9	'>{receivedData.days} Days Trip To {receivedData.message}</text>
            </div>

            <Row className="mt-[40px] mx-[30px] my-1 space-x-12 font-sans text-[40px] font-semibold overflow-y-auto max-h-96 md:max-h-none">
              {/* <text>Information</text> */}
              <text
                className={`cursor-pointer ${activeText === 'Itinerary Plan' ? 'text-[#00A19A] border-b-2 border-[#00A19A] ' : ''}`}
                onClick={() => {
                  const dataToPass = {
                    message: receivedData.message,
                    days: receivedData.days,
                    theme: receivedData.theme,
                    date: receivedData.date
                  };

                  // Call handleTextClick before navigation
                  handleTextClick('Itinerary Plan');

                  // Navigate with the data
                  navigate('/ota1', { state: dataToPass });
                }}
              >Itinerary Plan</text>

              {/* <text>Explore Plan</text> */}
            </Row>


          </div>

          {!loading ? (
            data && Array.isArray(data) && data.length === 0 ? (
              // Message when the data array is empty
              <div className="flex w-full h-[500px] justify-center items-start text-center py-20">
                <span className="text-gray-500 font-medium py-20">
                  No activities found. <br />
                </span>
              </div>
            ) : (

              <div className='mx-[30px] '>
                <div className=" bg-white w-[100%] text-[#1F1F1F] mt-[30px] px-12 py-10 font-sans">

                  <div>
                    <div className='text-[50px] font-bold  mt-4'>Activity Box</div>
                    <div className="relative my-3">
                      {/* Scrollable Row */}
                      <Row className="mt-6 flex overflow-x-auto ml-[80px]" id="activityRow">
                        {currentItems.map((item) => (
                          <div className='w-[100%] ' key={item.day}>
                            <div className='flex'>
                              {/* <LiaEdit className="w-16 h-16 mt-2" /> */}
                              <div
                                key={item.day}
                                onClick={() => scrollToDay(item.day)}
                                className='text-[40px] font-bold mt-3'>Day {item.day}
                              </div>
                            </div>
                            {/* <div className='w-[50%] mt-3 text-[30px]'>{item.activities.length} Activity</div> */}
                          </div>
                        ))}
                      </Row>

                      {/* Left (Previous) Button */}
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0} // Disable if on the first page
                        className={`absolute left-0 top-[60%] bg-white rounded-full p-2 transform -translate-y-1/2 ${currentPage === 0 ? 'opacity-100 cursor-not-allowed' : ''}`}
                      >
                        <IoIosArrowBack className="w-6 h-6" />
                      </button>

                      {/* Right (Next) Button */}
                      <button
                        onClick={handleNextPage}
                        disabled={!data || (currentPage + 1) * itemsPerPage >= data.length}
                        className={`absolute right-0 top-[60%] bg-white rounded-full p-2 transform -translate-y-1/2 ${!data || (currentPage + 1) * itemsPerPage >= data.length ? 'opacity-100 cursor-not-allowed' : ''}`}
                      >
                        <IoIosArrowForward className="w-6 h-6" />
                      </button>
                    </div>
                  </div>





                </div>

                <Row>

                  <Button
                    class="mt-[30px] items-center text-center justify-center w-[100%] bg-[#00A19A] hover:bg-blue-700 text-white font-normal py-6 px-4 font-sans mt-2 text-[38px]"
                    onClick={handleCreateTPClick}
                  >
                    <div className='flex w-[100%] items-center text-center justify-center'>
                      <IconifyIcon icon="mingcute:ai-fill" style={{ color: 'white', fontSize: '54px' }} />
                      <text className='ml-3'>
                        Create New With AI
                      </text>
                    </div>

                  </Button>
                </Row>


                {showModalItinerary ? (
                  <>
                    <div className="font-sans fixed bg-gray-50 xs:top-[10vh] lg:top-0 rounded-3xl cursor-pointer text-center justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px]  flex-nowrap overflow-x-hidden overflow-y-auto scrollbar-hide inset-0 z-50 outline-none focus:outline-none" >
                      {/*Content*/}

                      <Column className="sm:w-[100%] sm:h-[100%] lg:w-[100%] lg:h-fit">
                        <Row className="text-end items-end justify-end">
                          <FaTimes
                            className="mr-4 mt-6 sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                            onClick={() => {
                              setshowModalItinerary(false);
                              setCreateTPButtonClicked(false);
                            }
                            }
                          />
                        </Row>
                        <Row className="w-[100%] items-start justify-start ">
                          <Text className="text-start py-[70px] pl-[130px] sm:text-[37px] lg:text-xl text-black font-semibold">
                            Create Travel Plan
                          </Text>
                        </Row>
                        <p className="py-1 px-4 text-center">
                          <button
                            className="sm:w-[600px] lg:w-[300px] hover:bg-[#00A19A] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                            onClick={() => {
                              setIsShowAI(true);
                              setshowModalItinerary(false);
                            }
                            }
                          >
                            <div>Generate with AI</div>
                            <div className="items-end justify-between text-end ">
                              <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                            </div>
                          </button>
                        </p>
                        <p className="px-4 text-center py-1">
                          <button className="sm:w-[600px] lg:w-[300px] hover:bg-[#00A19A] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                            onClick={handleNavigate}>
                            Create my own
                            <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                          </button>
                        </p>
                      </Column>
                    </div>

                    <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}

                <CreateYourOwn
                  showCreateYourOwn={isShowCreateNew}
                  closeCreateYourOwn={closeContentSetting}
                  backCreateYourOwn={backContentSetting}
                />
                <ContentSetting showContentSetting={isShowContentSetting}
                  closePopup3={closePopup3}
                  days={days}
                  date={date}
                  message={message}
                  attractions={attractions}
                  itineraryId={itineraryId}
                  interests={interests} />

                {isShowAI && <ShowAI openPopup1={openPopup1} closePopup1={closePopup1} closeShowAI={closeShowAI} showAI={isShowAI} backShowAI={backShowAI} />}

                <Row className="w-[100%] mt-[30px]">

                  <div className=" bg-white w-[100%] h-[fit]">
                    <Row className="">
                      <Row className="w-[100%]">
                        <div className='mx-6 my-4 flex'>
                          <img class="w-24 h-24 rounded-full" src={profileImage} alt="Rounded avatar" />
                          <text className='ml-7 mt-1 font-bold text-[30px] font-sans'>{userName}</text>

                        </div>




                      </Row>



                      <button class="w-[20%] mr-6 bg-[#00A19A] border py-1 px-2 inline-flex items-center my-8"
                        onClick={handleNavigateSave}
                      >
                        {/* <Icon
                    path={mdiBookmarkOutline}
                    size={0.8}
                    className="mr-1 text-[#45B9B4]"
                  /> */}
                        <BiSave class="w-10 h-10 text-white " />

                        <span className="ml-1 text-white font-sans text-[32px]">Save</span>
                      </button>
                    </Row>

                    <hr></hr>
                    <Row className="mx-6 my-4 flex overflow-x-auto whitespace-nowrap">
                      <div className='flex text-[#7C7C7C] space-x-2'>
                        <a href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fflights`} target="_blank" rel="noopener noreferrer">
                          <Row>
                            <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full">
                              <Icon path={mdiAirplane} size={2.5} />
                            </div>
                            <span className='font-bold text-[36px] font-sans ml-4 mt-3 mr-6'>
                              Flight
                            </span>
                          </Row>
                        </a>
                        <a href="https://online.ktmb.com.my" target="_blank" rel="noopener noreferrer">
                          <Row>
                            <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full">
                              <Icon path={mdiTrain} size={2.5} />
                            </div>
                            <span className='font-bold text-[36px] font-sans ml-4 mt-3 mr-6'>
                              Train
                            </span>
                          </Row>
                        </a>
                        {baseURL === 'https://vm.epictravel.ai' || baseURL === 'http://localhost:3000' ? (
                          <a>
                            <Row>
                              <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full common-pointer">
                                <Icon path={mdiBus} size={2.5} />
                              </div>
                              <span className='font-bold text-[36px] font-sans ml-4 mt-3 mr-6'>
                                Bus
                              </span>
                            </Row>
                          </a>
                        ) : (
                          <a href="https://gohub.com.my" target="_blank" rel="noopener noreferrer">
                            <Row>
                              <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full common-pointer">
                                <Icon path={mdiBus} size={2.5} />
                              </div>
                              <span className='font-bold text-[36px] font-sans ml-4 mt-3 mr-6'>
                                Bus
                              </span>
                            </Row>
                          </a>
                        )}
                        <a href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fcars`} target="_blank" rel="noopener noreferrer">
                          <Row>
                            <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full">
                              <Icon path={mdiTaxi} size={2.5} />
                            </div>
                            <span className='font-bold text-[36px] font-sans ml-4 mt-3'>
                              Car
                            </span>
                          </Row>
                        </a>
                      </div>
                    </Row>



                    {Array.isArray(data) && data.map((item, index) => (
                      <React.Fragment key={index}>

                        <div className="flex items-center" id={`day-${item.day}`} key={item.day}>
                          <span className="flex-grow-[0.03] h-px bg-gray-400"></span>
                          <span className="px-4  font-sans text-[46px] font-semibold">Day {item.day}: {formatDate(receivedData.date, item.day)} </span>
                          <span className="flex-grow h-px bg-gray-400"></span>
                        </div>
                        {/* Morning Section */}

                        <>
                          <div className='w-[60%] h-[6vh] bg-[#F5F5F5] my-10 flex px-6 pt-6 '>
                            <IoIosPartlySunny class="text-[#00A19A] w-14 h-14 mr-2" />
                            <text className='font-bold text-[#00A19A] text-[46px] font-sans'> Morning Activity</text>
                          </div>


                          <div >
                            {/* Check if item is an activity */}

                            <div class="w-[95%] flex mx-6">

                              <div className='w-[100%] '>
                                <text className='font-bold text-[#111111BF] text-[46px] font-sans'>
                                  09.00 am - {item.morningactivity ? item.morningactivity.charAt(0).toUpperCase() + item.morningactivity.slice(1).replace(item.morningplace || "", "") : ""}
                                  {' '}
                                  {item.morningplace ?
                                    (item.morningplace.length > 30 ? item.morningplace.substring(0, 30) + "..." : item.morningplace)
                                    : ""
                                  }
                                </text>

                                <br />
                                <div className='my-3'>
                                  <text className='font-bold text-[#000000] text-[46px] font-sans'>
                                    {item.morningplace ?
                                      (item.morningplace.length > 30 ? item.morningplace.substring(0, 30) + "..." : item.morningplace)
                                      : ""}
                                  </text>
                                </div>
                                <text className='text-[#000000] text-[36px] font-sans'>
                                  {item.morningactivity ? item.morningactivity.replace(item.morningplace || "", "") : ""}
                                  {' '}
                                  <span className="text-[#008009] underline" style={{ fontStyle: 'italic' }}>
                                    <Link to={{
                                      pathname: `/travelplan/blog/display/${creatorId}/${item.morningplace || ""}/${itineraryId}`,
                                      state: { itineraryId }
                                    }}
                                      target="_blank"
                                      rel="noopener noreferrer">
                                      {item.morningplace || ""}
                                    </Link>
                                  </span>
                                  . {item.mcomment || ""}
                                </text>

                                {data3 && Array.isArray(data3) && data3.length > 0 ? (
                                  <div className="text-center w-[60%] mt-4">
                                    {(() => {
                                      const thumbnailIndex = findThumbnailURLIndex(data3, item.morningplace);
                                      const thumbnailURL = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.thumbnailURL : '';
                                      const thumbnailURL1 = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.webURL : '';

                                      if (thumbnailURL) {
                                        return (
                                          <>
                                            <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
                                              <img
                                                className="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]  drop-shadow-2xl"
                                                src={thumbnailURL}
                                                alt="Display"
                                              />
                                            </a>
                                            <p className="text-[#000000] text-[24px] font-sans mt-2">Recommendation</p>
                                            <a
                                              href={thumbnailURL1}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-[#000000] text-[24px] font-sans underline"
                                            >
                                              See Image
                                            </a>
                                          </>
                                        );
                                      } else {
                                        return null;
                                      }
                                    })()}
                                  </div>
                                ) : (
                                  // Optionally, you can add a fallback message or an empty element here
                                  <div></div>
                                )}

                                <hr className='my-6'></hr>
                              </div>
                            </div>


                          </div>

                        </>


                        {/* afternoon Section */}

                        <>
                          <div className='w-[60%] h-[6vh] bg-[#F5F5F5] my-10 flex px-6 pt-6 '>
                            <IoSunny class="text-[#00A19A] w-14 h-14 mr-2 mt-2" />
                            <text className='font-bold text-[#00A19A] text-[46px] font-sans'> Afternoon Activity</text>
                          </div>


                          <div >
                            {/* Check if item is an activity */}

                            <div class="w-[95%] flex mx-6">

                              <div className='w-[100%] '>
                                <text className='font-bold text-[#111111BF] text-[46px] font-sans '>
                                  03.00 pm - {item.afternoonactivity ? item.afternoonactivity.charAt(0).toUpperCase() + item.afternoonactivity.slice(1).replace(item.afternoonplace || "", "") : ""}
                                  {' '}{item.afternoonplace ?
                                    (item.afternoonplace.length > 30 ? item.afternoonplace.substring(0, 30) + "..." : item.afternoonplace)
                                    : ""}
                                </text>
                                <br />
                                <div className='my-3'>
                                  <text className='font-bold text-[#000000] text-[46px] font-sans'>
                                    {item.afternoonplace ?
                                      (item.afternoonplace.length > 30 ? item.afternoonplace.substring(0, 30) + "..." : item.afternoonplace)
                                      : ""}
                                  </text>
                                </div>
                                <text className='text-[#000000] text-[36px] font-sans'>
                                  {item.afternoonactivity ? item.afternoonactivity.replace(item.afternoonplace || "", "") : ""}
                                  {' '}
                                  <span className="text-[#008009] underline" style={{ fontStyle: 'italic' }}>
                                    <Link to={{
                                      pathname: `/travelplan/blog/display/${creatorId}/${item.place || ""}/${itineraryId}`,
                                      state: { itineraryId }
                                    }}
                                      target="_blank"
                                      rel="noopener noreferrer">
                                      {item.afternoonplace || ""}
                                    </Link>
                                  </span>
                                  . {item.acomment || ""}
                                </text>

                                {data3 && Array.isArray(data3) && data3.length > 0 ? (
                                  <div className="text-center w-[60%] mt-4">
                                    {(() => {
                                      const thumbnailIndex = findThumbnailURLIndex(data3, item.afternoonplace);
                                      const thumbnailURL = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.thumbnailURL : '';
                                      const thumbnailURL1 = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.webURL : '';

                                      if (thumbnailURL) {
                                        return (
                                          <>
                                            <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
                                              <img
                                                className="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]  drop-shadow-2xl"
                                                src={thumbnailURL}
                                                alt="Display"
                                              />
                                            </a>
                                            <p className="text-[#000000] text-[24px] font-sans mt-2">Recommendation</p>
                                            <a
                                              href={thumbnailURL1}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-[#000000] text-[24px] font-sans underline"
                                            >
                                              See Image
                                            </a>
                                          </>
                                        );
                                      } else {
                                        return null;
                                      }
                                    })()}
                                  </div>
                                ) : (
                                  // Optionally, you can add a fallback message or an empty element here
                                  <div></div>
                                )}

                                <hr className='my-6'></hr>
                              </div>
                            </div>



                          </div>

                        </>


                        {/* evening Section */}

                        <>
                          <div className='w-[60%] h-[6vh] bg-[#F5F5F5] my-10 flex px-6 pt-6'>
                            <WiMoonAltNew class="text-[#00A19A] w-14 h-14 mr-2 mt-2" />
                            <text className='font-bold text-[#00A19A] text-[46px] font-sans'> Evening Activity</text>
                          </div>


                          <div>
                            {/* Check if item is an activity */}

                            <div class="w-[95%] flex mx-6">

                              <div className='w-[100%] '>
                                <text className='font-bold text-[#111111BF] text-[46px] font-sans'>
                                  09.00 pm - {item.eveningactivity ? item.eveningactivity.charAt(0).toUpperCase() + item.eveningactivity.slice(1).replace(item.eveningplace || "", "") : ""}
                                  {' '}{item.place ?
                                    (item.eveningplace.length > 30 ? item.eveningplace.substring(0, 30) + "..." : item.eveningplace)
                                    : ""}
                                </text>
                                <br />
                                <div className='my-3'>
                                  <text className='font-bold text-[#000000] text-[46px] font-sans'>
                                    {item.eveningplace ?
                                      (item.eveningplace.length > 30 ? item.eveningplace.substring(0, 30) + "..." : item.eveningplace)
                                      : ""}
                                  </text>
                                </div>
                                <text className='text-[#000000] text-[36px] font-sans'>
                                  {item.eveningactivity ? item.eveningactivity.replace(item.eveningplace || "", "") : ""}
                                  {' '}
                                  <span className="text-[#008009] underline" style={{ fontStyle: 'italic' }}>
                                    <Link to={{
                                      pathname: `/travelplan/blog/display/${creatorId}/${item.eveningplace || ""}/${itineraryId}`,
                                      state: { itineraryId }
                                    }}
                                      target="_blank"
                                      rel="noopener noreferrer">
                                      {item.eveningplace || ""}
                                    </Link>
                                  </span>
                                  . {item.ecomment || ""}
                                </text>

                                {data3 && Array.isArray(data3) && data3.length > 0 ? (
                                  <>
                                    <div className="text-center w-[60%] mt-4">
                                      {(() => {
                                        const thumbnailIndex = findThumbnailURLIndex(data3, item.eveningplace);
                                        const thumbnailURL = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.thumbnailURL : '';
                                        const thumbnailURL1 = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.webURL : '';

                                        if (thumbnailURL) {
                                          return (
                                            <>
                                              <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
                                                <img
                                                  className="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]  drop-shadow-2xl"
                                                  src={thumbnailURL}
                                                  alt="Display"
                                                />
                                              </a>
                                              <p className="text-[#000000] text-[24px] font-sans mt-2">Recommendation</p>
                                              <a
                                                href={thumbnailURL1}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#000000] text-[24px] font-sans underline"
                                              >
                                                See Image
                                              </a>
                                            </>
                                          );
                                        } else {
                                          return null;
                                        }
                                      })()}
                                    </div>
                                    
                                  </>
                                ) : (
                                  // Optionally, you can add a fallback message or an empty element here
                                  <div></div>
                                )}

                                <hr className='my-6'></hr>
                              </div>
                            </div>
                            <div className="">
                                      {(() => {
                                        const currentDate = new Date(receivedData.date);
                                        const updatedDate = new Date(currentDate.getTime());
                                        updatedDate.setDate(updatedDate.getDate() + item.day - 1);

                                        // Format the date as "YYYY-MM-DD"
                                        const formattedDate1 = formatDate1(receivedData.date, item.day);
                                        const formattedDate2 = getNextDayDate(formatDate1(receivedData.date, item.day));

                                        return (
                                          <div className="my-4 w-[100%] mx-6">
                                            <div className="w-[5%]">
                                              <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                                <FaHotel color="#00A19A" size={40} alt="route" />
                                              </div>
                                            </div>

                                            <div className="w-[100%]">
                                              <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                                Bedtime
                                              </text>
                                              <br />
                                              <div className="my-3">
                                                <text className="text-[#000000] text-[36px] font-sans">
                                                  Hotels Deals in&nbsp;
                                                </text>
                                                <text className="underline text-[#00A19A] text-[36px] font-sans">
                                                  {(() => {
                                                    let urlmain;
                                                    if (receivedData.message === 'Forest City') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Forest-City-Marina-Hotel,Gelang-Patah,Malaysia-p2664154-h2767708/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Perak') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Perak,Malaysia-p21085/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Sabah') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sabah,Malaysia-p21083/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Pahang') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Pahang,Malaysia-p21086/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Penang') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Penang,Malaysia-p247880/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Sarawak') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sarawak,Malaysia-p21082/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Kedah') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kedah,Malaysia-p21092/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Selangor') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Selangor,Malaysia-p21081/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Negeri Sembilan') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Negeri-Sembilan,Malaysia-p21087/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Kelantan') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kelantan-p21088/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else {
                                                      let encodedCityName = encodeURIComponent(receivedData.message);
                                                      urlmain = `http://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/${encodedCityName}/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    }

                                                    return (
                                                      <a href={urlmain} target="_blank" rel="noopener noreferrer">
                                                        {receivedData.message}
                                                      </a>
                                                    );
                                                  })()}
                                                </text>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })()}
                                    </div>

                          </div>

                        </>





                      </React.Fragment>
                    ))}











                  </div>




                </Row>
              </div>
            )
          ) : (

            <div className="h-[100%] w-[100%] mt-30 flex items-center justify-center flex-col py-5"  >
              <span style={{ fontSize: '20px', fontWeight: 'normal' }} className="mb-5">{text}</span>
              <CircularProgress size={20} sx={{ color: 'black' }} />
            </div>

          )}






        </div>


        {/*Web View*/}
        <div className='fixed w-full' style={{ zIndex: 2 }}>
          <HeaderOTA openPopup1={openPopup1} className=" invisible lg:visible" />
          <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
          <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
          <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
        </div>
        {/* <hr></hr> */}


        <div className="absolute invisible lg:visible bg-[#EAEBEF] items-center justify-start mx-[auto] w-[100%] xs:pt-[160px] lg:pt-[92px]">
          <div className={`mt-[1px] bg-white w-full ${isVisible ? 'block' : 'hidden'}`}>
            <div className=' mx-[70px] py-4'>
              <text className='w-[100%] font-sans text-[#000000] text-[28px] font-semibold leading-9	'>{receivedData.days} Days Trip To {receivedData.message}</text>
            </div>

            <Row className="mx-[70px] my-1 space-x-10 font-sans text-[16px] font-semibold">
              {/* <div
                            className={`cursor-pointer ${activeText === 'Information' ? 'text-[#00398D] border-b-2 border-[#00398D]' : ''}`}
                            onClick={() => handleTextClick('Information')}
                        >
                            Information
                        </div> */}
              <div
                className={`cursor-pointer ${activeText === 'Itinerary Plan' ? 'text-[#00A19A] border-b-2 border-[#00A19A] ' : ''}`}
                onClick={() => {
                  const dataToPass = {
                    message: receivedData.message,
                    days: receivedData.days,
                    theme: receivedData.theme,
                    date: receivedData.date
                  };

                  // Call handleTextClick before navigation
                  handleTextClick('Itinerary Plan');

                  // Navigate with the data
                  navigate('/ota1', { state: dataToPass });
                }}

              >
                Itinerary Plan
              </div>

              {/* <div
                            className={`cursor-pointer ${activeText === 'Explore Plan' ? 'text-[#00398D] border-b-2 border-[#00398D]' : ''}`}
                            onClick={() => handleTextClick('Explore Plan')}
                        >
                            Explore Plan
                        </div> */}
            </Row>


          </div>

          <Row className="w-[100%] mt-[25px] z-0" style={{ zIndex: 0 }} >
            {!loading ? (
              data && Array.isArray(data) && data.length === 0 ? (
                // Message when the data array is empty
                <div className="flex w-full h-[500px] justify-center items-start text-center py-20">
                  <span className="text-gray-500 font-medium py-20">
                    No activities found. <br />
                  </span>
                </div>
              ) : (
                <>

                  <div className=" bg-white w-[64%] ml-[70px] mr-[0px] h-[fit] ">
                    <Row className="">
                      <Row className="w-[50%]">
                        <div className='mx-6 my-4 flex'>
                          <img class="w-12 h-12 rounded-full object-cover object-center brightness-75" src={profileImage} alt="Rounded avatar" />
                          <text className='ml-3 mt-1 font-bold text-[16px] font-sans'>{userName}</text>

                        </div>


                      </Row>


                      <div className=" w-[50%] text-right mr-6 mt-[25px]">
                        <button class="mr-1 bg-[#00A19A]  border py-1 px-2 inline-flex items-center"
                          onClick={handleNavigateSave}
                        >
                          {/* <Icon
                    path={mdiBookmarkOutline}
                    size={0.8}
                    className="mr-1 text-[#45B9B4]"
                  /> */}
                          <BiSave class="w-5 h-5 text-white " />

                          <span className="ml-1 text-white font-sans text-[16px]">Save</span>
                        </button>
                      </div>


                    </Row>


                    {/* <div>
                      <img class="object-cover object-center w-[100%] h-[35vh] brightness-75 " src={coverImage} alt="Cover image" />
                    </div> */}

                    <hr></hr>

                    <Row class="mx-6 my-4 flex">
                      <div className='flex text-[#7C7C7C] space-x-2'>
                        <a href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fflights`} target="_blank" rel="noopener noreferrer">
                          <Row>
                            <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                              <Icon path={mdiAirplane} size={1} />
                            </div>
                            <text className='font-bold text-[16px] font-sans ml-2 mt-1 mr-3'>
                              Flight
                            </text>
                          </Row>
                        </a>
                        <a href="https://online.ktmb.com.my" target="_blank" rel="noopener noreferrer">
                          <Row>
                            <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                              <Icon path={mdiTrain} size={1} />
                            </div>
                            <text className='font-bold text-[16px] font-sans ml-2 mt-1 mr-3'>
                              Train
                            </text>
                          </Row>
                        </a>
                        {baseURL === 'https://vm.epictravel.ai' || 'http://localhost:3000' ? (
                          <a>
                            <Row>
                              <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full common-pointer">

                                <Icon path={mdiBus} size={1} />
                              </div>
                              <text className='font-bold text-[16px] font-sans ml-2 mt-1 mr-3'>
                                Bus
                              </text>
                            </Row>

                          </a>
                        ) : (

                          <a href="https://gohub.com.my" target="_blank" rel="noopener noreferrer">
                            <Row>
                              <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full common-pointer">

                                <Icon path={mdiBus} size={1} />
                              </div>
                              <text className='font-bold text-[16px] font-sans ml-2 mt-1 mr-3'>
                                Bus
                              </text>
                            </Row>
                          </a>
                        )}
                        <a href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fcars`} target="_blank" rel="noopener noreferrer">
                          <Row>
                            <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                              <Icon path={mdiTaxi} size={1} />
                            </div>
                            <text className='font-bold text-[16px] font-sans ml-2 mt-1'>
                              Car
                            </text>
                          </Row>
                        </a>


                      </div>
                    </Row>

                    <div className='mx-6 my-4 font-sans text-[16px] mb-6'>
                      {/* <text className=' '>Overview : {description} </text> */}
                      {/* <text className='font-bold text-[#2A3075]'> See More</text> */}
                    </div>


                    {Array.isArray(data) && data.length > 0 ? (
                      data.map((item, index) => (
                        <React.Fragment key={index} >
                          <div className="flex items-center mt-4" id={`day-${item.day}`} key={item.day}>
                            <span className="flex-grow-[0.03] h-px bg-gray-400"></span>
                            <span className="px-4 font-sans text-[18px] font-semibold">Day {item.day}: {formatDate(receivedData.date, item.day)} </span>
                            <span className="flex-grow h-px bg-gray-400"></span>
                          </div>

                          {/* Morning Section */}

                          <>
                            <div className='w-[30%] h-[8vh] bg-[#F5F5F5] my-6 flex px-6 pt-3'>
                              <IoIosPartlySunny class="text-[#00A19A] w-7 h-7 mr-2" />
                              <text className='font-bold text-[#00A19A] text-[20px] font-sans '> Morning Activity</text>
                            </div>


                            <div>
                              {/* Check if item is an activity */}

                              <>
                                <div class=" w-[100%] flex px-6">
                                  <div className='w-[5%]'></div>
                                  <div className='w-[95%] pl-6'>
                                    <text className='font-bold text-[#111111BF] text-[18px] font-sans'>
                                      09.00 am -
                                      {' '}
                                      {item.morningactivity ? item.morningactivity.charAt(0).toUpperCase() + item.morningactivity.slice(1).replace(item.morningplace || "", "") : ""}
                                      {' '}
                                      {item.morningplace || ""}
                                    </text>
                                    <br />
                                    <div className='my-3 flex'>
                                      <text className='font-bold text-[#000000] text-[18px] font-sans mr-3'>
                                        {item.morningplace || ""}
                                      </text>

                                    </div>
                                    <text className='text-[#000000] text-[16px] font-sans'>
                                      {item.morningactivity ? item.morningactivity.replace(item.morningplace || "", "") : ""}
                                      {' '}
                                      <span className="text-[#008009] underline" style={{ fontStyle: 'italic' }}>
                                        <Link
                                          to={{
                                            pathname: `/travelplan/blog/display/${creatorId}/${item.morningplace || ""}/${itineraryId}`,
                                            state: { itineraryId }
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.morningplace || ""}
                                        </Link>
                                      </span>
                                      . {item.mcomment || ""}
                                    </text>

                                    {data3 && Array.isArray(data3) && data3.length > 0 ? (
                                      <div className='text-center w-[20%] mt-4'>
                                        {(() => {
                                          const thumbnailIndex = findThumbnailURLIndex(data3, item.morningplace);
                                          const thumbnailURL = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.thumbnailURL : '';
                                          const thumbnailURL1 = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.webURL : '';

                                          if (thumbnailURL) {
                                            return (
                                              <>
                                                <div className='bg-black'>
                                                  <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                      className="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh] drop-shadow-2xl"
                                                      src={thumbnailURL}
                                                      alt="Display"
                                                    />
                                                  </a>
                                                </div>
                                                <p className='text-[#000000] text-[14px] font-sans'>Recommendation</p>
                                                <a
                                                  href={thumbnailURL1}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className='text-[#000000] text-[14px] font-sans underline'
                                                >
                                                  See Image
                                                </a>
                                              </>
                                            );
                                          } else {
                                            return null;
                                          }
                                        })()}
                                      </div>
                                    ) : (
                                      // Optionally, you can add a fallback message or an empty element here
                                      <div></div>
                                    )}

                                    {/* <div className='text-center w-[20%] mt-4'>
                                          {item.image ? (
                                            <>
                                              <div className='bg-black'>
                                                <img class=" bg-black object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]" src={getProcessedImageUrl(item.image)} alt="image" />
                                              </div>
                                              <text className='text-[#000000] text-[14px] font-sans'>Recommendation</text>
                                              <br />
                                              <a href={getProcessedImageUrl(item.image)} target="_blank" rel="noopener noreferrer" className='text-[#000000] text-[14px] font-sans underline'>
                                                See Image
                                              </a>
                                            </>
                                          ) : null}
                                        </div> */}
                                    <hr className='my-6'></hr>
                                  </div>
                                </div>

                              </>





                              {/* Repeat similar structure for other transport types */}
                            </div>

                          </>


                          {/* Afternoon Section */}

                          <>
                            <div className='w-[30%] h-[8vh] bg-[#F5F5F5] mt-2 mb-6 flex px-6 pt-3'>
                              <IoSunny class="text-[#00A19A] w-7 h-7 mr-2 mt-0.5" />
                              <text className='font-bold text-[#00A19A] text-[20px] font-sans '> Afternoon Activity</text>
                            </div>


                            <div>
                              {/* Check if item is an activity */}

                              <>
                                <div class=" w-[100%] flex px-6">
                                  <div className='w-[5%]'></div>
                                  <div className='w-[95%] pl-6'>
                                    <text className='font-bold text-[#111111BF] text-[18px] font-sans'>
                                      03.00 pm -
                                      {item.afternoonactivity ? item.afternoonactivity.charAt(0).toUpperCase() + item.afternoonactivity.slice(1).replace(item.afternoonplace || "", "") : ""}
                                      {' '}
                                      {item.afternoonplace || ""}
                                    </text>
                                    <br />
                                    <div className='my-3 flex'>
                                      <text className='font-bold text-[#000000] text-[18px] font-sans mr-3'>
                                        {item.afternoonplace || ""}
                                      </text>

                                    </div>
                                    <text className='text-[#000000] text-[16px] font-sans'>
                                      {item.afternoonactivity ? item.afternoonactivity.replace(item.place || "", "") : ""}
                                      {' '}
                                      <span className="text-[#008009] underline" style={{ fontStyle: 'italic' }}>
                                        <Link
                                          to={{
                                            pathname: `/travelplan/blog/display/${creatorId}/${item.afternoonplace || ""}/${itineraryId}`,
                                            state: { itineraryId }
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.afternoonactivity || ""}
                                        </Link>
                                      </span>
                                      . {item.acomment || ""}
                                    </text>

                                    {data3 && Array.isArray(data3) && data3.length > 0 ? (
                                      <div className='text-center w-[20%] mt-4'>
                                        {(() => {
                                          const thumbnailIndex = findThumbnailURLIndex(data3, item.afternoonplace);
                                          const thumbnailURL = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.thumbnailURL : '';
                                          const thumbnailURL1 = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.webURL : '';

                                          if (thumbnailURL) {
                                            return (
                                              <>
                                                <div className='bg-black'>
                                                  <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
                                                    <img
                                                      className="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh] drop-shadow-2xl"
                                                      src={thumbnailURL}
                                                      alt="Display"
                                                    />
                                                  </a>
                                                </div>
                                                <p className='text-[#000000] text-[14px] font-sans'>Recommendation</p>
                                                <a
                                                  href={thumbnailURL1}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className='text-[#000000] text-[14px] font-sans underline'
                                                >
                                                  See Image
                                                </a>
                                              </>
                                            );
                                          } else {
                                            return null;
                                          }
                                        })()}
                                      </div>
                                    ) : (
                                      // Optionally, you can add a fallback message or an empty element here
                                      <div></div>
                                    )}
                                    {/* <div className='text-center w-[20%] mt-4'>
                                          {item.image ? (
                                            <>
                                              <div className='bg-black'>
                                                <img class=" bg-black object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]" src={getProcessedImageUrl(item.image)} alt="image" />
                                              </div>
                                              <text className='text-[#000000] text-[14px] font-sans'>Recommendation</text>
                                              <br />
                                              <a href={getProcessedImageUrl(item.image)} target="_blank" rel="noopener noreferrer" className='text-[#000000] text-[14px] font-sans underline'>
                                                See Imagee
                                              </a>
                                            </>
                                          ) : null}
                                        </div> */}
                                    <hr className='my-6'></hr>
                                  </div>
                                </div>

                              </>



                              {/* Repeat similar structure for other transport types */}
                            </div>

                          </>



                          {/* Evening Section */}

                          <>
                            <div className='w-[30%] h-[8vh] bg-[#F5F5F5] mt-2 mb-6 flex px-6 pt-3'>
                              <WiMoonAltNew class="text-[#00A19A] w-7 h-7 mr-2 mt-0.5" />
                              <text className='font-bold text-[#00A19A] text-[20px] font-sans '> Evening Activity</text>
                            </div>


                            <div>
                              {/* Check if item is an activity */}

                              <>
                                <div class=" w-[100%] flex px-6">
                                  <div className='w-[5%]'></div>
                                  <div className='w-[95%] pl-6'>
                                    <text className='font-bold text-[#111111BF] text-[18px] font-sans'>
                                      09.00 pm -
                                      {item.eveningactivity ? item.eveningactivity.charAt(0).toUpperCase() + item.eveningactivity.slice(1).replace(item.place || "", "") : ""}
                                      {' '}
                                      {item.place || ""}
                                    </text>
                                    <br />
                                    <div className='my-3 flex'>
                                      <text className='font-bold text-[#000000] text-[18px] font-sans mr-3'>
                                        {item.eveningplace || ""}
                                      </text>
                                    </div>
                                    <text className='text-[#000000] text-[16px] font-sans'>
                                      {item.eveningactivity ? item.eveningactivity.replace(item.eveningplace || "", "") : ""}
                                      {' '}
                                      <span className="text-[#008009] underline" style={{ fontStyle: 'italic' }}>
                                        <Link
                                          to={{
                                            pathname: `/travelplan/blog/display/${creatorId}/${item.eveningplace || ""}/${itineraryId}`,
                                            state: { itineraryId }
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.eveningplace || ""}
                                        </Link>
                                      </span>
                                      . {item.ecomment || ""}
                                    </text>


                                    {/* <div className='text-center w-[20%] mt-4'>
                                          {item.image ? (
                                            <>
                                              <div className='bg-black'>
                                                <img class=" bg-black object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]" src={getProcessedImageUrl(item.image)} alt="image" />
                                              </div>
                                              <text className='text-[#000000] text-[14px] font-sans'>Recommendation</text>
                                              <br />
                                              <a href={getProcessedImageUrl(item.image)} target="_blank" rel="noopener noreferrer" className='text-[#000000] text-[14px] font-sans underline'>
                                                See Imagee
                                              </a>
                                            </>
                                          ) : null}
                                        </div> */}
                                    {data3 && Array.isArray(data3) && data3.length > 0 ? (
                                      <>
                                        <div className='text-center w-[20%] mt-4'>
                                          {(() => {
                                            const thumbnailIndex = findThumbnailURLIndex(data3, item.eveningplace);
                                            const thumbnailURL = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.thumbnailURL : '';
                                            const thumbnailURL1 = thumbnailIndex >= 0 ? data3[thumbnailIndex]?.webURL : '';

                                            if (thumbnailURL) {
                                              return (
                                                <>
                                                  <div className='bg-black'>
                                                    <a href={thumbnailURL1} target="_blank" rel="noopener noreferrer">
                                                      <img
                                                        className="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh] drop-shadow-2xl"
                                                        src={thumbnailURL}
                                                        alt="Display"
                                                      />
                                                    </a>
                                                  </div>
                                                  <p className='text-[#000000] text-[14px] font-sans'>Recommendation</p>
                                                  <a
                                                    href={thumbnailURL1}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className='text-[#000000] text-[14px] font-sans underline'
                                                  >
                                                    See Image
                                                  </a>
                                                </>
                                              );
                                            } else {
                                              return null;
                                            }
                                          })()}
                                        </div>


                                      </>
                                    ) : (
                                      // Optionally, you can add a fallback message or an empty element here
                                      <div></div>
                                    )}
                                    <hr className='my-6'></hr>

                                    
                                  </div>
                                  
                                </div>
                                <div >
                                      {(() => {
                                        const currentDate = new Date(receivedData.date);
                                        const updatedDate = new Date(currentDate.getTime());
                                        const updatedDate1 = new Date(currentDate.getTime());
                                        updatedDate.setDate(updatedDate.getDate() + item.day - 1);

                                        // Format the date as "YYYY-MM-DD"
                                        const year = updatedDate1.getFullYear();
                                        const month = String(updatedDate1.getMonth() + 1).padStart(2, '0');
                                        const day = String(updatedDate1.getDate()).padStart(2, '0');

                                        const year1 = updatedDate.getFullYear();
                                        const month1 = String(updatedDate.getMonth() + 1).padStart(2, '0');
                                        const day1 = String(updatedDate.getDate()).padStart(2, '0');

                                        const formattedDate1 = formatDate1(receivedData.date, item.day);
                                        const formattedDate2 = getNextDayDate(formatDate1(receivedData.date, item.day));

                                        return (
                                          <div className="w-[100%] flex px-6">
                                            <div className="w-[5%]">
                                              <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                                <FaHotel color="#00A19A" size={18} alt="route" />
                                              </div>
                                            </div>

                                            <div className="w-[95%] pl-6">
                                              <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                                Bedtime
                                              </text>
                                              <br />
                                              <div className="my-3 flex">
                                                <text className="text-[#000000] text-[16px] font-sans">
                                                  Hotels Deals in&nbsp;
                                                </text>
                                                <text className="underline text-[#00A19A] text-[18px] font-sans">
                                                  {(() => {
                                                    let urlmain;
                                                    if (receivedData.message === 'Forest City') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Forest-City-Marina-Hotel,Gelang-Patah,Malaysia-p2664154-h2767708/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Perak') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Perak,Malaysia-p21085/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Sabah') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sabah,Malaysia-p21083/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Pahang') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Pahang,Malaysia-p21086/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Penang') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Penang,Malaysia-p247880/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Sarawak') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sarawak,Malaysia-p21082/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Kedah') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kedah,Malaysia-p21092/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Selangor') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Selangor,Malaysia-p21081/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Negeri Sembilan') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Negeri-Sembilan,Malaysia-p21087/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else if (receivedData.message === 'Kelantan') {
                                                      urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kelantan-p21088/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    } else {
                                                      let encodedCityName = encodeURIComponent(receivedData.message);
                                                      urlmain = `http://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/${encodedCityName}/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                    }

                                                    return (
                                                      <a href={urlmain} target="_blank" rel="noopener noreferrer">
                                                        {receivedData.message}
                                                      </a>
                                                    );
                                                  })()}
                                                </text>
                                              </div>
                                            </div>
                                          </div>

                                        );
                                      })()}
                                    </div>

                              </>




                              {/* Repeat similar structure for other transport types */}
                            </div>

                          </>







                        </React.Fragment>
                      ))
                    ) : (
                      <div className="text-center text-gray-600 font-sans" >
                        <p>No data available to display.</p>
                      </div>
                    )}







                  </div>


                  <div className="  w-[25%] text-[#1F1F1F] h-[fit] fixed right-[70px] ">
                    <div className='bg-white px-8  grid grid-cols-1 divide-y divide-dashed font-sans z-0'>
                      <div className='text-[22px] font-bold leading-9 my-4'>Activity Box </div>

                      <div style={{ maxHeight: Array.isArray(data) && data.length > 7 ? '250px' : 'auto', overflowY: Array.isArray(data) && data.length > 7 ? 'scroll' : 'visible' }}>
                        {Array.isArray(data) && data.map((item) => (
                          // Conditionally render if item.day <= 3 or if "showAllDays" is true
                          (item.day <= 3 || showAllDays) && (
                            <Row key={item.day} className="my-1 common-pointer">
                              {/* <LiaEdit className="w-6 h-6 mt-2" /> */}
                              <div
                                key={item.day}
                                className='text-[16px] font-bold leading-9 w-[50%] mt-1'
                                onClick={() => scrollToDay(item.day)}
                              >
                                Day {item.day}
                              </div>
                            </Row>
                          )
                        ))}
                      </div>


                    </div>

                    {/* Conditionally show the toggle button if any item.day is greater than or equal to 3 */}
                    {Array.isArray(data) && data.some(item => item.day >= 3) && (
                      <div className='items-center justify-center text-center bg-white w-[100%]'>
                        <button onClick={handleToggleDays} className=''>
                          {showAllDays ? (
                            // If all days are shown, provide an option to collapse back to showing only 3 days
                            <IoIosArrowUp className="w-10 h-5" />
                          ) : (
                            // If only 3 days are shown, provide an option to expand the list and show all days
                            <IoIosArrowDown className="w-10 h-5" />
                          )}
                        </button>


                      </div>
                    )}


                    <Button
                      class="mt-[30px] items-center text-center justify-center w-[100%] bg-[#00A19A] hover:bg-[#00A19A] text-white font-normal py-2 px-4 font-sans mt-4 text-[16px]"
                      onClick={handleCreateTPClick}
                    >
                      <div className='flex w-[100%] items-center text-center justify-center'>
                        <IconifyIcon icon="mingcute:ai-fill" style={{ color: 'white', fontSize: '24px' }} />
                        <text className='ml-2'>
                          Create New With AI
                        </text>
                      </div>

                    </Button>



                  </div>


                </>
              )
            ) : (

              <div className="font-sans h-[100%] w-[100%] mt-30 flex items-center justify-center flex-col py-5"  >
                <span style={{ fontSize: '20px', fontWeight: 'normal' }} className="mb-5">{text}</span>
                <CircularProgress size={20} sx={{ color: 'black' }} />
              </div>

            )}


          </Row>


          {showModalItinerary ? (
            <>
              <div className="font-sans fixed bg-gray-50 xs:top-[10vh] lg:top-0 rounded-3xl cursor-pointer text-center justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px]  flex-nowrap overflow-x-hidden overflow-y-auto scrollbar-hide inset-0 z-50 outline-none focus:outline-none" >
                {/*Content*/}

                <Column className="sm:w-[100%] sm:h-[100%] lg:w-[100%] lg:h-fit">
                  <Row className="text-end items-end justify-end">
                    <FaTimes
                      className="mr-4 mt-6 sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                      onClick={() => {
                        setshowModalItinerary(false);
                        setCreateTPButtonClicked(false);
                      }
                      }
                    />
                  </Row>
                  <Row className="w-[100%] items-start justify-start ">
                    <Text className="text-start py-[70px] pl-[130px] sm:text-[37px] lg:text-xl text-black font-semibold">
                      Create Travel Plan
                    </Text>
                  </Row>
                  <p className="py-1 px-4 text-center">
                    <button
                      className="sm:w-[600px] lg:w-[300px] hover:bg-[#00A19A] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                      onClick={() => {
                        setIsShowAI(true);
                        setshowModalItinerary(false);
                      }
                      }
                    >
                      <div>Generate with AI</div>
                      <div className="items-end justify-between text-end ">
                        <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                      </div>
                    </button>
                  </p>
                  <p className="px-4 text-center py-1">
                    <button className="sm:w-[600px] lg:w-[300px] hover:bg-[#00A19A] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                      onClick={handleNavigate}>
                      Create my own
                      <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                    </button>
                  </p>
                </Column>
              </div>

              <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

          <CreateYourOwn
            showCreateYourOwn={isShowCreateNew}
            closeCreateYourOwn={closePopupCreateNew}
            backCreateYourOwn={closePopupCreateNew}
          />
          <ContentSetting showContentSetting={isShowContentSetting}
            closePopup3={closePopup3}
            days={days}
            date={date}
            message={message}
            attractions={attractions}
            itineraryId={itineraryId}
            interests={interests} />

          {isShowAI && <ShowAI openPopup1={openPopup1} closePopup1={closePopup1} closeShowAI={closeShowAI} showAI={isShowAI} backShowAI={backShowAI} />}




        </div>
      </div>

    </>
  );
};

export default DIYOverviewNewPage;
