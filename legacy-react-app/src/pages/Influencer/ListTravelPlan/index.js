import React, { useRef, useState, useEffect } from "react";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import ForgotPassword from "components/ForgotPass/index";
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import FilterPage from "components/Filter/index";
import { ButtonMp, Row, Column, Text, Button, Img } from "components";
import { FaTimes } from "react-icons/fa";

import { useLocation } from "react-router-dom";
import axios from "axios";
import loadGoogleMapsApi from "load-google-maps-api";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

import { useParams } from "react-router-dom";

import "./LoadingSpinner.css";
import "./Popup.css";
import "./Loading2.css";

import "./tooltip.css";
import { useAuth } from "AuthContext";
// import LoadingBar from "./LoadingBar";
import "styles/tailwind.css";
// import InfiniteScroll from "react-infinite-scroll-component";
import ShowAI from "components/ShowAI/index";
import MobileListTravelPlan from "./mobileListTravelPlan";
import WebListTravelPLan from "./webListTravelPLan";

const ListTravelPlan = () => {
  const [isPopupFilterOpen, setIsPopupFilterOpen] = useState(false);
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);
  const [isShowAI, setIsShowAI] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const userId = localStorage.getItem("userId");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [title, setTitle] = useState();
  const { isLoggedIn } = useAuth();
  const [isLoading2, setIsLoading2] = useState(false);
  const { creatorId, itineraryId, itineraryTitle } = useParams();
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState([]);
  const [successMessageType, setSuccessMessageType] = useState("saved");
  const location = useLocation();
  // console.log("stste:", location.state);
  const receivedData = location.state;
  const dataSelected = location.state;
  // console.log("data selected", dataSelected);
  const [results, setResults] = useState([]);
  const [resultsApply, setResultsApply] = useState([]);
  const [resultsAll, setResultsAll] = useState([]);
  const { destination, state, country } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  //loading bar
  const [progress, setProgress] = useState(0);
  const isLastPage = resultsAll.last;
  const [currentTotal, setCurrentTotal] = useState(0);
  // Autocomplete
  const [isApiLoaded, setApiLoaded] = useState(false);
  const [cursorColor, setCursorColor] = useState("black");
  //show more button
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [hasDestination, setHasDestination] = useState(false);

  // Set the minimum date to the current date
  const [dataBlog, setDataBlog] = useState([]);
  const [dataBlogAI, setDataBlogAI] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [showInterests, setShowInterests] = useState(false);
  const loadingTexts = [
    "Hold tight as our system assembles your travel plan...",
    "Relax while we organize your travel plan...",
    "Grabbing the travel routes for your journey...",
    "Fine-tuning your travel plan to make it even better...",
    "Ready to unveil a carefully curated travel plan just for you...",
    "Hang tight, while we ensuring your travel itinerary unfolds flawlessly...",
    // Add more loading texts as needed
  ];

  // setIsLoggedIn(true);
  const openPopup1 = () => {
    setIsPopup1Open(true);
    setIsPopup2Open(false); // Close Popup2 when Popup1 is opened
  };
  const openFilter = () => {
    setIsPopupFilterOpen(true);
  };

  const openPopup2 = () => {
    setIsPopup2Open(true);
    setIsPopup1Open(false); // Close Popup1 when Popup2 is opened
  };
  const openPopup3 = () => {
    setIsPopup3Open(true);
    setIsPopup1Open(false); // Close Popup1 when Popup3 is opened
  };
  const closeFilter = () => {
    setIsPopupFilterOpen(false);
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
  const closeShowAI = () => {
    setIsShowAI(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  };

  useEffect(() => {
    // Simulate asynchronous actions with delays
    const fetchData = async () => {
      try {
        for (let i = 0; i < loadingTexts.length; i++) {
          setLoadingTextIndex(i);
          await simulateAsyncAction(); // Replace this with your actual asynchronous action
        }

        // All steps completed successfully
        setIsLoadingg(false);
        setIsLoading2(false);
      } catch (error) {
        console.error("Error during loading:", error);
        setIsLoadingg(true);
        setIsLoading2(true);
      }
    };

    fetchData();
  }, []);

  const simulateAsyncAction = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 6000); // Simulate a delay (replace with your actual async action)
    });
  };

  // Function to show the success message
  // const showSuccess = () => {
  //   setShowSuccessMessage(true);
  // };

  // Function to hide the success message
  const hideSuccess = () => {
    setShowSuccessMessage(false);
  };

  const fetchBookmarkedItineraries = async () => {
    try {
      const response = await axios.get(
        `https://halaltravel.ai/hv/api/chatgpt/user/itinerary-bookmark/${userId}`
      );
      const data = response.data;
      setBookmarkedItineraries(
        data.map((bookmark) => ({
          itineraryId: bookmark.userItineraryId, // Ensure this matches your data structure
          bookmarkId: bookmark.id,
        }))
      );

      // Fetch logic...
      const isCurrentlyBookmarked = data.some(
        (bookmark) => Number(bookmark.userItineraryId) === Number(itineraryId)
      );
      setIsBookmarked(isCurrentlyBookmarked); // Make sure this logic correctly reflects the bookmark status
    } catch (error) {
      console.error("Failed to fetch bookmarked itineraries:", error);
    }
  };
  //console.log("xxx",bookmarkedItineraries)
  // Correctly use useEffect to call fetchBookmarkedItineraries
  useEffect(() => {
    fetchBookmarkedItineraries();
  }, [userId, itineraryId]);
  // Re-fetch when userId or itineraryId changes

  // const handleArrowClick = (direction) => {
  //   if (direction === "left" && currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //   } else if (direction === "right" && currentPage < totalPages - 1) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const getPageButtonsRange = () => {
  //   const buttonsRange = [];
  //   const startPage = Math.max(currentPage - 1, 0);
  //   const endPage = Math.min(currentPage + 1, totalPages - 1);

  //   for (let i = startPage; i <= endPage; i++) {
  //     buttonsRange.push(i);
  //   }

  //   return buttonsRange;
  // };



  useEffect(() => {
    // Log the values to debug the issue
    console.log(
      "numberOfElements:",
      resultsAll.numberOfElements,
      "number:",
      resultsAll.number,
      "totalElements:",
      resultsAll.totalElements
    );

    // Calculate currentTotal only if all values are present and numeric
    if (
      !isNaN(resultsAll.numberOfElements) &&
      !isNaN(resultsAll.number) &&
      !isNaN(resultsAll.totalElements)
    ) {
      const calculatedTotal = isLastPage
        ? resultsAll.totalElements
        : resultsAll.numberOfElements * (resultsAll.number + 1);
      setCurrentTotal(calculatedTotal);
    } else {
      // Handle the case where values are missing or not numeric
      console.error("Invalid values for calculation");
      // Consider setting currentTotal to a default or error value
      setCurrentTotal(0); // or another appropriate value indicating an error
    }
  }, [isLastPage, resultsAll]);

  useEffect(() => {
    loadGoogleMapsApi({
      key: "AIzaSyB40jqFnXxo_4ZX7WezdrlR4NicJsseyu8",
      libraries: ["places"], // this line ensures the Places library is loaded
    }).then(() => {
      setApiLoaded(true);
    });

    const interval = setInterval(() => {
      setCursorColor((prevColor) =>
        prevColor === "black" ? "transparent" : "black"
      );
    }, 500); // Toggle cursor color every 500ms

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Travelplan
  // const [destination1, setDestination1] = useState('');

  // Assuming date is a Date object

  useEffect(() => {
    // Fetch initial attractions when the component mounts
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const response = await axios.get(
        "https://halaltravel.ai/hu/api/chatgpt/attraction"
      );
      setAttractions(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const fetchInterests = async (selectedAttractions) => {
    // Send a POST request with the selected attractions
    try {
      const response = await axios.post(
        "https://halaltravel.ai/hu/api/chatgpt/interests",
        selectedAttractions
      );

      if (response.status === 200) {
        setInterests(response.data);
      } else {
        console.error("Error fetching interests:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };

  useEffect(() => {
    // Fetch interests based on the selected attractions whenever selectedAttractions change
    fetchInterests(selectedAttraction);
  }, [selectedAttraction]);

  const handleFetchInterests = () => {
    // Fetch interests based on the selected attractions
    fetchInterests();
  };

  // const loginStatus = (id) => {
  //   if (isLoggedIn) {
  //     // navigate("/ota2");
  //     handleBookmarkClick(id);
  //   } else {
  //     setIsPopup1Open(true);
  //     localStorage.setItem("customPath", "my-travelplan");
  //   }
  // };

  // const toggleShowMore = () => {
  //   setShowMore(!showMore);
  // };
  const fetchDataBlog = async () => {
    setIsLoadingg(true);
    scrollToTop();

    // Determine the location to use in the API request
    let loc1 = "";
    if (destination === "Kuala Lumpur") {
      loc1 = "Kuala Lumpur"

    }
    else {
      loc1 = state || "Malaysia";
    }

    try {
      const response = await axios.get(
        `https://halaltravel.ai/ht/api/blog/location?loc=${loc1}`
      );
      setDataBlog(response.data);
      console.log("blog: ", response.data.blog);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    } finally {
      setIsLoadingg(false);
    }
  };


  const isDestinationSameAsState =
    destination === state || destination === "Kuala Lumpur" || destination === "Malaysia";
  const maxHeight1 = showMore1
    ? "none"
    : isDestinationSameAsState
      ? "317vh"
      : "260vh";
  const maxHeight2 = showMore2
    ? "none"
    : isDestinationSameAsState
      ? "none"
      : "110vh";
  const maxHeight3 = showMore1
    ? "none"
    : isDestinationSameAsState
      ? "50vh"
      : "50vh";
  const maxHeight4 = showMore2
    ? "none"
    : isDestinationSameAsState
      ? "50vh"
      : "50vh";

  // console.log("maxHeight1: ", maxHeight1);
  // console.log("maxHeight2: ", maxHeight2);
  // console.log("maxHeight3: ", maxHeight3);
  // console.log("maxHeight4: ", maxHeight4);
  // console.log("hasDestination: ", destination);
  const fetchDataBlogAI = async () => {
    setIsLoadingg(true);
    scrollToTop();
    try {
      // Check if location is different from state
      setDataBlogAI("");
      console.log("sama" + destination + "-" + state);

      if (destination !== state) {
        console.log("xxx");
        if (destination === "Kuala Lumpur" || destination === "Malaysia") {
          setDataBlogAI("");
          console.log("xxx2");
        } else {
          console.log("xxx3");
          const requestData = {
            location: destination,
            state: state,
            country: country,
          };
          const response = await axios.post(
            `https://halaltravel.ai/gpt/location`,
            requestData
          );
          setIsLoadingg(false);
          setDataBlogAI(response.data);
          // console.log("blog: ", response.data.blog);
          // console.log("loc", destination);
          // console.log("tak sama" + destination + "-" + state);
        }
      } else {
        // console.log("xxx4");
        // // Set the state data to blank or null
        // // setDataBlogAI("");
        // console.log("sama2");
      }
    } catch (error) {
      setDataBlogAI(null);
      setIsLoadingg(true);
      console.error("Error fetching attractions:", error);
    }
  };

  useEffect(() => {
    // Fetch initial attractions when the component mounts
    fetchDataBlog();
    fetchDataBlogAI();
  }, []);
  const targetRef1 = useRef(null);
  const targetRef2 = useRef(null);

  const scrollToTarget = () => {
    targetRef1.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTarget2 = () => {
    targetRef2.current.scrollIntoView({ behavior: "smooth" });
  };

  //to control the text size and text font
  const sanitizeHTML = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Remove font-family styles
    doc.querySelectorAll('[style*="font-family"]').forEach((element) => {
      element.style.fontFamily = "unset";
    });

    // Overwrite font-size style or set if missing
    doc.querySelectorAll("*").forEach((element) => {
      const currentFontSize = element.style.fontSize;
      if (!currentFontSize || currentFontSize !== "16px") {
        // Set default font size for all elements
        element.style.fontSize = "16px";
      }
      // Add additional conditions for different screen sizes
      if (window.innerWidth >= 1024) {
        // Large screens (lg)
        element.style.fontSize = "16px";
      } else if (window.innerWidth >= 640) {
        // Medium screens (md)
        element.style.fontSize = "36px";
      } else {
        // Small screens (sm)
        element.style.fontSize = "36px";
      }
    });

    return doc.documentElement.innerHTML;
  };

  return (
    <>

      <div className="lg:h-[850px] md:h-[190vh] bg-[#F5F5F5]">
        <div className="bg-[#F5F5F5] flex flex-col font-montserrat lg:h-[fit] md:h-[fit]">
          <div className="fixed w-full" style={{ zIndex: 2 }}>
            <HeaderOTAAdmin openPopup1={openPopup1} className="absolute" />
            <LoginPage
              isOpen={isPopup1Open}
              openPopup2={openPopup2}
              openPopup3={openPopup3}
              closePopup1={closePopup1}
            />
            <SignupPage
              isOpen={isPopup2Open}
              closePopup2={closePopup2}
              openPopup1={openPopup1}
            />
            <ForgotPassword isOpen={isPopup3Open} closePopup3={closePopup3} />
            <FilterPage
              openFilter={openFilter}
              isOpenFilter={isPopupFilterOpen}
              closeFilter={closeFilter}
              address={destination}
              state={state}
              country={country}
            />
            <HeaderOTAMobileEpic
              openPopup1={openPopup1}
              className="visible fixed overflow-hidden lg:invisible lg:hidden"
            />
          </div>

          {isLoadingg ? (
            <>
              {/* Loading Indicator for both mobile and web */}
              <div id="loading-container" className="loader-container21">
                <div className="loader"></div>
                <p className="loading-text text-center">
                  {loadingTexts[loadingTextIndex]}
                </p>
              </div>
            </>
          ) : (
            <>

              <div className="relative w-full h-[70vh]"> {/* Main container with image height set to 70% of viewport */}
                <div className="w-full h-full"> {/* Image container with full height */}
                  <img
                    className="w-full h-full object-cover brightness-75"
                    src={dataBlog.headerImage}
                  />
                </div>

                <div className="w-[90%] absolute bottom-0 left-0 mx-[60px] h-full flex items-end pb-10"> {/* Adjusted bottom padding */}
                  <span className="lg:text-[22px] sm:text-[48px] lg:font-medium sm:font-medium text-[#FFFFFF]">
                    {dataBlog.title}
                  </span>
                </div>
              </div>



              <Row className="w-[100%] ">
                <column className="ml-[60px] lg:w-[75%] sm:w-[90%] sm:mr-[60px] lg:mr-[0px]">
                  <div className="mt-[60px]  ">
                    <text className="text-[#031151] font-bold lg:text-[14px] sm:text-[26px]">
                      WONDERS IN WORLDS
                    </text>

                    <div className=" mt-3 ">
                      <text className="text-[#031151] font-normal lg:text-[30px] sm:text-[48px]  ">
                        {dataBlog.title}
                      </text>

                      <br />
                      <div className="lg:mt-6 sm:mt-8">
                        {/* Content for web */}
                        <div
                          className="text-black font-normal w-[100%] leading-relaxed sm:hidden lg:block"
                          style={{
                            maxHeight: maxHeight1,
                            overflow: "hidden",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: dataBlog ? sanitizeHTML(dataBlog.blog) : '',
                          }}
                          ref={targetRef1}
                        />
                        {/* Content for mobile */}
                        <div
                          className="text-black font-normal w-[100%] leading-normal sm:block lg:hidden"
                          style={{
                            maxHeight: maxHeight3,
                            overflow: "hidden",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: dataBlog ? sanitizeHTML(dataBlog.blog) : '',
                          }}
                          ref={targetRef1}
                        />
                      </div>
                      {/* Toggle between "Show More" and "Show Less" buttons */}
                      <div className="justify-center items-center text-center mt-[20px]">
                        <button
                          className="lg:text-[14px] sm:text-[38px] rounded-[15px] lg:w-[20%] sm:w-[35%] lg:h-10 sm:h-[70px] border border-black font-normal"
                          onClick={() => {
                            setShowMore1(!showMore1);
                            scrollToTarget();
                          }}
                        >
                          {showMore1 ? 'Show Less' : 'Show More'}
                        </button>
                      </div>
                    </div>
                  </div>
                  {dataBlogAI && (
                    <>
                      <div className="mt-[40px]">
                        <text className="text-[#031151] font-bold text-[14px]">
                          WONDERS IN MALAYSIA
                        </text>
                      </div>
                      <div className="mt-3">
                        <text className="text-[#031151] font-normal lg:text-[30px] sm:text-[48px]">
                          {dataBlogAI.title}
                        </text>
                        <br />
                        <div className="mt-3">
                          <div
                            className="text-black font-normal w-[100%] text-[16px] leading-normal sm:hidden lg:block"
                            style={{
                              maxHeight: maxHeight2,
                              overflow: "hidden",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHTML(dataBlogAI.blog),
                            }}
                            ref={targetRef2}
                          />
                          <div
                            className="text-black font-normal w-[100%] text-[36px] leading-normal sm:block lg:hidden"
                            style={{
                              maxHeight: maxHeight4,
                              overflow: "hidden",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: sanitizeHTML(dataBlogAI.blog),
                            }}
                            ref={targetRef2}
                          />
                        </div>
                      </div>

                      {/* <div className="justify-center items-center text-center mt-[20px]">
                        <button
                          className="lg:text-[14px] sm:text-[38px] rounded-[15px] lg:w-[20%] sm:w-[35%] lg:h-10 sm:h-[70px] border border-black font-normal"
                          onClick={() => {
                            setShowMore2(!showMore2);
                            scrollToTarget2();
                          }}
                        >
                          {showMore2 ? 'Show Less' : 'Show More'}
                        </button>
                      </div> */}
                    </>
                  )}
                  {/* <div className="justify-center items-center text-center w-full mt-4 mb-8 text-[#00A19A] text-[16px]">
                    <text onClick={() => setIsShowAI(true)} className="common-pointer">
                      Click Here to Discover More With AI
                    </text>
                  </div> */}
                  {isShowAI && <ShowAI openPopup1={openPopup1} closeShowAI={closeShowAI} showAI={isShowAI} />}
                </column>

                <WebListTravelPLan />
              </Row>

              <MobileListTravelPlan />
            </>
          )}
        </div>
      </div>
    </>
  );

};

export default ListTravelPlan;
