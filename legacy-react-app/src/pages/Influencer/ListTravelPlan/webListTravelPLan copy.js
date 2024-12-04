import Icon from "@mdi/react";
import {
  mdiBookmark,
  mdiDotsHorizontal,
  mdiCircleSmall,
  mdiBookmarkOutline,
  mdiPlusCircle,
  mdiArrowLeft,
  mdiArrowRight,
  mdiPlus,
} from "@mdi/js";
import { ButtonMp, Row, Column, Text, Button, Img } from "components";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  data,
  fetchAllTravelPlan,
  fetchTravelPlan,
  fetchItineraryDetails,
  fetchItineraryDestination,
  // dataDl,
} from "data/data";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import ShowAI from "components/ShowAI/index";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "AuthContext";
import { useLocation } from "react-router-dom";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import ForgotPassword from "components/ForgotPass/index";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";


const WebListTravelPLan = (page) => {
  const [isShowAI, setIsShowAI] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [results, setResults] = useState([]);
  const targetDivRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [noMoreResults, setNoMoreResults] = useState(false);

  const handleClose = () => {
    setShowTooltip(false);
  };
  const [title, setTitle] = useState();
  const [successMessageType, setSuccessMessageType] = useState("saved");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(true);
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState([]);
  const userId = localStorage.getItem("userId");
  const [pageNumber, setPageNumber] = useState(1); 
  const { destination, state, country } = useParams();
  const [dataBlogAI, setDataBlogAI] = useState([]);
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { creatorId, itineraryId, itineraryTitle } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoggedIn } = useAuth();
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [blogResults, setBlogResults] = useState([]);
  const [itineraryResults, setItineraryResults] = useState([]);
  const [isLoading3, setIsLoading3] = useState(false);
  const location = useLocation();
  const dataSelected = location.state;
  const [resultsAll, setResultsAll] = useState([]);
  const [isPopupFilterOpen, setIsPopupFilterOpen] = useState(false);
  // const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(prevState => !prevState);
  };

  function handleReadMore(blogId, blogTitle, userId) {
    navigate(`/blog-display/${userId}/${blogId}/${blogTitle}`);
    // navigate('/blog-display');
  }

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


  useEffect(() => {
    setIsLoadingg(true);
    // scrollToTop();
    // Define your API endpoint
    const apiUrl =
      `https://halaltravel.ai/ht/api/blog/srp?pageNumber=${pageNumber}&pageSize=5`;

    // Create the request payload
    const requestData = {
      destination: destination,
      ...(state && { state: state }),
      country: country,
      // attractions: (dataSelected && dataSelected.attractions) || [],
      // interests: (dataSelected && dataSelected.interests) || [],
      // page: currentPage,
    };

    console.log("req pageee:", requestData);

    const fetchData = async () => {
      try {
        // Make the API request
        const response = await axios.post(apiUrl, requestData);
        // Handle the API response here
        const data = response.data;
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements);
        // Assuming the array of items is under the 'data' property
        const items = data.content || [];
        const itemsAll = data || [];
        const blogItems = items.filter(item => item.type === 'Blog');
        const itineraryItems = items.filter(item => item.type === 'User Itinerary');

        setBlogResults(blogItems);
        setItineraryResults(itineraryItems);
        // Use the 'items' array as needed
        setResultsAll(itemsAll);

        setResults(items);
        setIsLoadingg(false);
        // console.log("API responsess:", items);
        // console.log("API responsess:", itemsAll);

        console.log("API response page:", data);
      } catch (error) {
        // Handle any errors
        console.error("API error:", error);
      }
    };
    const calculatedProgress = (pageNumber / totalPages) * 100;
    setProgress(calculatedProgress);

    // Call the fetchData function
    fetchData();
  }, [destination, state, country, dataSelected, pageNumber]);



  console.log("totalPages", totalPages)

  function loadMoreData() {
    if (results.length % 5 === 0) {
      // Check if the number of loaded results is a multiple of 4
      setPageNumber((prevPage) => prevPage + 1); // Increment the page number
    }
  }
  //pagination show more button
  const handleLoadMore = () => {
    if (pageNumber < (totalPages - 1) && !isLoadingg) {
      setPageNumber(prevPage => prevPage + 1);
      if (targetDivRef.current) {
        targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pageNumber >= (totalPages - 1)) {
      setNoMoreResults(true);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(prevPage => prevPage - 1);
      setNoMoreResults(false); // Reset noMoreResults when navigating back
      if (targetDivRef.current) {
        targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNextPage = () => {
    if (pageNumber < (totalPages - 1) && !isLoadingg) {
      setPageNumber(prevPage => prevPage + 1);
      if (targetDivRef.current) {
        targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pageNumber >= (totalPages - 1)) {
      setNoMoreResults(true);
    }
  };

  const loginStatus = (id, action) => {
    if (isLoggedIn) {
      action(id); // Perform the action (bookmark or unbookmark) if logged in
    } else {
      openPopup1(); // Show login prompt if not logged in
      localStorage.setItem("customPath", `list-travelplan/${destination}/${state}/${country}`); // Save intended action path
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  };
  const closeShowAI = () => {
    setIsShowAI(false);
  };
  const openPopup1 = () => {
    setIsPopup1Open(true);
    setIsPopup2Open(false);
    setIsShowAI(false); // Close Popup2 when Popup1 is opened
  };
  const closePopup1 = () => {
    setIsPopup1Open(false);
  };
  const fetchDataBlogAI = async () => {
    setIsLoadingg(true);
    //scrollToTop();
    try {
      // Check if location is different from state
      if (destination !== state) {
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
      } else {
        // Set the state data to blank or null
        setDataBlogAI("");
      }
    } catch (error) {
      setIsLoadingg(true);
      console.error("Error fetching attractions:", error);
    }
  };
  const loadingTexts = [
    "Hold tight as our system assembles your travel plan...",
    "Relax while we organize your travel plan...",
    "Grabbing the travel routes for your journey...",
    "Fine-tuning your travel plan to make it even better...",
    "Ready to unveil a carefully curated travel plan just for you...",
    "Hang tight, while we ensuring your travel itinerary unfolds flawlessly...",
    // Add more loading texts as needed
  ];

  const isItineraryBookmarked = (userItineraryId) => {
    return bookmarkedItineraries.some(
      (item) => Number(item.itineraryId) === Number(userItineraryId)
    );
  };

  const handleBookmarkClick = async (itineraryId) => {
    try {
      // Fetch the itinerary details, including userItineraryId
      const data = await fetchItineraryDetails(itineraryId);

      if (data) {
        const userItineraryId = data.userItineraryId;

        // Update the requestBody with the obtained userItineraryId
        const requestBody = {
          user_id: userId,
          user_itinerary_id: userItineraryId,
        };

        setTitle(data.itineraryDetails.itineraryTitle);
        // console.log("PRINTT", requestBody);

        const response = await axios.post(
          "https://halaltravel.ai/hv/api/chatgpt/user/itinerary-bookmark",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          //setIsBookmarked(true);
          setSuccessMessageType("saved");
          setShowSuccessMessage(true);
          fetchBookmarkedItineraries();
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
          //showSuccess();
          fetchDataBlogAI(userItineraryId);
          console.log("success")
        } else {
          console.error("Error bookmarking itinerary");
        }
      } else {
        // Handle the case where data is null or userItineraryId is not available
        console.error("Error: User bookmark are not available");
      }
    } catch (error) {
      // Handle network errors or other errors here
      console.error("Error:", error);
    }

  };
  const handleUnsaveClick = async (itineraryId) => {
    // Find the bookmark entry for the current itinerary to get its bookmarkId
    const bookmark = bookmarkedItineraries.find(
      (item) => Number(item.itineraryId) === Number(itineraryId)
    );

    if (!bookmark) {
      console.error("Bookmark entry not found");
      return;
    }

    try {
      const response = await axios.delete(
        `https://halaltravel.ai/hv/api/chatgpt/user/itinerary-bookmark/${userId}/${bookmark.bookmarkId}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Include authorization headers if required
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        console.log("Bookmark successfully deleted");
        // Update the state to reflect the deletion

        setBookmarkedItineraries((current) =>
          current.filter((item) => item.bookmarkId !== bookmark.bookmarkId)
        );
        setSuccessMessageType("unsaved");
        setShowSuccessMessage(true);
        fetchBookmarkedItineraries();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
        // Optionally: Update any other state that depends on the list of bookmarks
      } else {
        console.error(
          "Failed to delete bookmark with status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error while deleting bookmark:", error);
    }
  };


  const handleTravelPlanClick = (creatorId, itineraryId, title) => {
    const encodedTitle = encodeURIComponent(title);
    navigate(`/itinerary-save/${creatorId}/${itineraryId}/` + encodedTitle);
  };
  // setIsLoggedIn(true);
  // const openPopup1 = () => {
  //   setIsPopup1Open(true);
  //   setIsPopup2Open(false); // Close Popup2 when Popup1 is opened
  // };
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
  // const closePopup1 = () => {
  //   setIsPopup1Open(false);
  // };

  const closePopup2 = () => {
    setIsPopup2Open(false);
  };
  const closePopup3 = () => {
    setIsPopup3Open(false);
  };


  return (
    <>

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
      {showSuccessMessage && (
        <div className="success-message">
          <div className="message-line">
            Travel plan{" "}
            <strong>
              {successMessageType === "saved" ? "saved to" : "unsaved from"}
            </strong>{" "}
            your bookmark
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="close-button"
            >
              X
            </button>
          </div>
          <div className="message-line">
            {title} has been{" "}
            <strong>
              {successMessageType === "saved" ? "saved to" : "unsaved from"}
            </strong>{" "}
          </div>
          <div className="message-line">
            <a href="/my-travelplan">My Travel Plan</a>.
          </div>
        </div>
      )}

      <column className="mx-[60px]  w-[25%] sm:hidden lg:block mb-8">
        <div ref={targetDivRef} className="justify-end text-end items-end sm:p-5 lg:p-0 sm:px-5 sm:py-4 lg:py-0 grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 md:gap-[30px] lg:gap-6 ">
          {/* add ai */}
          <div className="mt-[60px] ">
            <text className="text-[#031151] font-bold text-[14px] ">
              GET INSPIRED
            </text>
            <div className="mt-4">
              <text className="text-black font-normal text-[14px] ">
                {totalElements} Recommended itineraries by experienced guides and fellow travelers
              </text>
            </div>
            <row>
              <div className={`tooltip ${showTooltip ? "show" : ""}`}>
                <span onClick={() => setIsShowAI(true)} className="tooltip-message common-pointer">
                  Click Here to Discover More With AI
                </span>
                <button className="close-btn" onClick={handleClose}>
                </button>
              </div>
              <div className="plus-float" onClick={toggleTooltip}>
                {showTooltip ? (
                  <span className="icon-text">✕</span>
                ) : (
                  <Icon path={mdiPlus} size={1.5} />
                )}
              </div>
            </row>

          </div>
          {/* <div
          ref={targetDivRef}
          className="bg-white sm:w-auto sm:h-[630px] lg:w-auto lg:h-[360px] 2xl:h-[420px] cursor-pointer border flex flex-col items-center justify-center shadow-lg border rounded-lg hover:scale-105 duration-300"
          onClick={() => setIsShowAI(true)}
        >
          <Icon
            path={mdiPlusCircle}
            className="text-[#00A19A] items-center text-center"
            size={1.5}
          />
          <p className="font-bold sm:text-[24px] lg:text-[14px]">
            Travel smarter with AI
          </p>
        </div> */}
          {isShowAI && <ShowAI openPopup1={openPopup1} closePopup1={closePopup1} closeShowAI={closeShowAI} showAI={isShowAI} />}

          {isLoading2 ? (
            <>
              <div
                className="md:hidden lg:block"
                style={{
                  position: "fixed",
                  top: "80px",
                  left: 0,
                  width: "100%",
                  zIndex: 999,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#eee",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#00A19A",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="md:block lg:hidden"
                style={{
                  position: "fixed",
                  top: "150px",
                  left: 0,
                  width: "100%",
                  zIndex: 999,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    backgroundColor: "#eee",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#00A19A",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
              </div>
              <div
                id="loading-container"
                className="loader-container md:block lg:hidden "
              >
                <div className="loader md:block lg:hidden"></div>
                <p className="loading-text md:block lg:hidden text-center">
                  {loadingTexts[loadingTextIndex]}
                </p>
              </div>
              <div
                id="loading-container"
                className="loader-container lg:block md:hidden"
              >
                <div className="loader lg:block md:hidden"></div>
                <p className="loading-text lg:block md:hidden text-center">
                  {loadingTexts[loadingTextIndex]}
                </p>
              </div>
            </>
          ) : (
            <>
                {blogResults.map((results, index) => (
                <div className="bg-white md:w-full md:h-[630px] lg:w-full lg:h-[360px] 2xl:h-[420px] border shadow-lg rounded-lg hover:scale-105 duration-300">
                  <div className="relative" key={index}>
                    <button
                      className="absolute top-2 right-2 cursor-pointer"
                    // onClick={() =>
                    //   loginStatus(
                    //     results.id,
                    //     isItineraryBookmarked(results.id)
                    //       ? handleUnsaveClick
                    //       : handleBookmarkClick
                    //   )
                    // }
                    >
                      <Icon
                        path={mdiBookmarkOutline}
                        className={`sm:w-[60px] sm:h-[60px] lg:w-[30px] lg:h-[30px] ${isItineraryBookmarked(results.id)
                            ? "text-[#FFFFFF] bg-[#00A19A]"
                            : "text-[#00A19A] bg-[#FFFFFF]"
                          } w-fit h-fit p-1 rounded-full common-pointer`}
                      />
                    </button>
                    <img
                      src={`${results.coverImage}`}
                      alt={results.alt}
                      className="w-full sm:h-[350px] lg:h-[200px] 2xl:h-[220px] object-cover sm:rounded-t-lg lg:rounded-t-lg"
                    />
                    <span class="absolute top-2.5 left-0 bg-[#192579] sm:w-[32%] sm:h-[15%] lg:w-[20%] lg:h-[15%] shadow-lg sm:rounded-tl-2xl sm:rounded-tr-3xl sm:rounded-br-3xl lg:rounded-tl-none lg:rounded-tr-xl lg:rounded-br-xl cursor-pointer">
                      <div class="flex flex-col justify-center items-center h-full">
                        <span class="sm:text-[25px] lg:text-[12px] text-white">
                          Blog
                        </span>
                      </div>
                    </span>
                  </div>

                  <div
                    className="items-center sm:p-6 lg:p-3 common-pointer"
                    onClick={() => handleReadMore(results.id, results.title, results.userId)}
                  >
                    <Row>
                      <p
                        className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:block md:hidden"
                        title={results.title}
                      >
                        {results.title.length > 28
                          ? `${results.title.substring(0, 28)}...`
                          : results.title}
                        {/* Private Tour Kuala Lumpur */}
                        {/* {filteredFood.name.length > 20 ? filteredFood.name.substring(0, 20) + '...' : filteredFood.name} */}
                      </p>
                      <p
                        className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:hidden md:block"
                        title={results.title}
                      >
                        {results.title.length > 23
                          ? `${results.title.substring(0, 23)}...`
                          : results.title}
                        {/* Private Tour Kuala Lumpur */}
                        {/* {filteredFood.name.length > 20 ? filteredFood.name.substring(0, 20) + '...' : filteredFood.name} */}
                      </p>
                    </Row>
                    <p
                      className="ml-3 mt-1 w-fit md:text-[25px] lg:text-[12px] lg:h-[40px] 2xl:h-[75px] md:h-[20px] lg:block md:hidden"
                    //   title={filteredFood.desc}
                    >
                      {results.description.length > 65
                        ? `${results.description.substring(0, 65)}...`
                        : results.description}
                      {/* Get a bird’s-eye view over Kuala Lumpur */}
                      {/* {filteredFood.desc.length > 40 ? filteredFood.desc.substring(0, 40) + '...' : filteredFood.desc} */}
                    </p>
                    <p
                      className="ml-3 mt-1 w-fit md:text-[23px] lg:text-[12px] lg:h-[40px] md:h-[70px] lg:hidden md:block"
                    //   title={filteredFood.desc}
                    >
                      {results.description.length > 60
                        ? `${results.description.substring(0, 60)}...`
                        : results.description}
                      {/* Get a bird’s-eye view over Kuala Lumpur */}
                      {/* {filteredFood.desc.length > 40 ? filteredFood.desc.substring(0, 40) + '...' : filteredFood.desc} */}
                    </p>

                    {/* <div className="ml-3 mt-3">
  <Row>
  <text className=" text-[12px] mt-0.5 ">
      Adventure
    </text>
    <Icon
      path={mdiCircleSmall } 
      size={1}
      className=" w-fit h-fit"
    />
    <text className=" text-[12px] mt-0.5 ">
      History
    </text>
  </Row>

</div> */}
                    <style>
                      {`
          .interests-tooltip {
            display: none;
            position: absolute;
            background-color: white;
            border: 0.5px solid black;
            padding: 8px;
            z-index: 1;
            right: 0; /* Align to the right */
            flex-direction: row;
          }

          .tag-container {
            position:;
            display: inline-block;
          }

          .tag:hover .interests-tooltip {
            display: block;
          }
        `}
                    </style>
                    <div className="flex justify-between mx-3 items-center lg:h-[30px] sm:h-[20px] md:mt-4 lg:mt-0 font-bold">
                      <div className="tags truncate w-[200px] items-center ">
                        {results.interests && results.interests.length > 0 ? (
                          <>
                            {results.interests
                              .slice(0, 2)
                              .map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="tag w-[210px] sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium"
                                  style={{ maxWidth: "0px" }} // Set the maximum width for tags
                                >
                                  {tagIndex > 0 && (
                                    <span className="dot lg:text-[20px] md:text-[20px] mx-2 font-medium">
                                      •
                                    </span>
                                  )}
                                  {tag.length > 15
                                    ? tag.substring(0, 15) + "..."
                                    : tag}
                                </span>
                              ))}
                            {results.interests.length > 1 && (
                              <span
                                className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium"
                                style={{ maxWidth: "100px" }} // Set the maximum width for tags
                              >
                                <div class="interests-tooltip">
                                  {results.interests
                                    .slice(2)
                                    .map((interest, index) => (
                                      <div
                                        key={index}
                                        style={{ maxWidth: "100px" }}
                                      >
                                        {interest.length > 15
                                          ? interest.substring(0, 15) + ".."
                                          : interest}
                                      </div>
                                    ))}
                                </div>
                                {"      "} +{results.interests.length - 2}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium">
                            No interests.
                          </span>
                        )}
                      </div>
                      {/* to display state */}

                      <div className="state truncate items-center ">
                        {results.destination && results.destination.length > 0 && (
                          <span className="flex items-center sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium">
                            <FaMapMarkerAlt className="inline-block mr-1" />
                            {results.destination[0].state.replace("Federal Territory of ", "").length > 9
                              ? `${results.destination[0].state.replace("Federal Territory of ", "").substring(0, 9)}...`
                              : results.destination[0].state.replace("Federal Territory of ", "")}
                          </span>
                        )}
                      </div>



                      {/* to display state and country */}

                      {/* <div>
{results.state && results.country && (
<span className="sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium">
<FaMapMarkerAlt className="inline-block mr-1" />
{results.state.length > 9
? `${results.state.substring(0, 9)}...`
: results.state}, {results.country}
</span>
)}
</div> */}
                    </div>

                    <div className="justify-between ml-2 mr-3 lg:mt-[0px] md:mt-[25px] flex lg:mb-0 md:mb-1">
                      <div className="">
                        <Row>
                          <Icon
                            path={mdiBookmark}
                            size={1}
                            className="text-[#00A19A]  w-fit h-fit lg:mt-0 md:mt-2"
                          />
                          <text className=" text-[#00A19A] lg:text-[12px] font-semibold md:text-[24px] mt-0.5">
                            {results.savedCount} Saves
                          </text>
                        </Row>
                      </div>

                      <div className="">
                        {/* Render if username is not null */}
                        {results.username !== null && (
                          <>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden"
                            >
                              {results.username.length > 20
                                ? results.username.substring(0, 20) + "..." // Display first 20 characters and add ellipsis
                                : results.username}
                            </text>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden"
                            >
                              {results.username.length > 18
                                ? results.username.substring(0, 18) + "..." // Display first 20 characters and add ellipsis
                                : results.username}
                            </text>
                          </>
                        )}
                        {/* Render a space character if username is null */}
                        {results.username === null && (
                          <>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden"
                            >
                              {" "}
                            </text>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden"
                            >
                              {" "}
                            </text>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


              ))}
            {itineraryResults.map((results, index) => (
                <div className="bg-white md:w-full md:h-[630px] lg:w-full lg:h-[360px] 2xl:h-[420px] border shadow-lg rounded-lg hover:scale-105 duration-300">
                  <div className="relative" key={index}>
                    <button
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() =>
                        loginStatus(
                          results.id,
                          isItineraryBookmarked(results.id)
                            ? handleUnsaveClick
                            : handleBookmarkClick
                        )
                      }
                    >
                      <Icon
                        path={mdiBookmarkOutline}
                        className={`sm:w-[60px] sm:h-[60px] lg:w-[30px] lg:h-[30px] ${isItineraryBookmarked(results.id)
                            ? "text-[#FFFFFF] bg-[#00A19A]"
                            : "text-[#00A19A] bg-[#FFFFFF]"
                          } w-fit h-fit p-1 rounded-full common-pointer`}
                      />
                    </button>
                    <img
                      src={`https://halaltravel.ai/hv/api/chatgpt/user/itinerary/coverimage/${results.coverImage}`}
                      alt={results.alt}
                      className="w-full sm:h-[350px] lg:h-[200px] 2xl:h-[220px] object-cover sm:rounded-t-lg lg:rounded-t-lg"
                    />
                    <span class="absolute top-2.5 left-0 bg-teal-700 sm:w-[32%] sm:h-[15%] lg:w-[30%] lg:h-[15%] shadow-lg sm:rounded-tl-2xl sm:rounded-tr-3xl sm:rounded-br-3xl lg:rounded-tl-none lg:rounded-tr-xl lg:rounded-br-xl cursor-pointer">
                      <div class="flex flex-col justify-center items-center h-full">
                        <span class="sm:text-[25px] lg:text-[12px] text-white">
                          Travel Plan
                        </span>
                      </div>
                    </span>
                  </div>

                  <div
                    className="items-center sm:p-6 lg:p-3 common-pointer"
                    onClick={() => {
                      handleTravelPlanClick(
                        results.userId,
                        results.id,
                        results.title
                      );
                    }}
                  >
                    <Row>
                      <p
                        className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:block md:hidden"
                        title={results.title}
                      >
                        {results.title.length > 28
                          ? `${results.title.substring(0, 28)}...`
                          : results.title}
                        {/* Private Tour Kuala Lumpur */}
                        {/* {filteredFood.name.length > 20 ? filteredFood.name.substring(0, 20) + '...' : filteredFood.name} */}
                      </p>
                      <p
                        className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:hidden md:block"
                        title={results.title}
                      >
                        {results.title.length > 23
                          ? `${results.title.substring(0, 23)}...`
                          : results.title}
                        {/* Private Tour Kuala Lumpur */}
                        {/* {filteredFood.name.length > 20 ? filteredFood.name.substring(0, 20) + '...' : filteredFood.name} */}
                      </p>
                    </Row>
                    <p
                      className="ml-3 mt-1 w-fit md:text-[25px] lg:text-[12px] lg:h-[40px] 2xl:h-[75px] md:h-[20px] lg:block md:hidden"
                    //   title={filteredFood.desc}
                    >
                      {results.description.length > 65
                        ? `${results.description.substring(0, 65)}...`
                        : results.description}
                      {/* Get a bird’s-eye view over Kuala Lumpur */}
                      {/* {filteredFood.desc.length > 40 ? filteredFood.desc.substring(0, 40) + '...' : filteredFood.desc} */}
                    </p>
                    <p
                      className="ml-3 mt-1 w-fit md:text-[23px] lg:text-[12px] lg:h-[40px] md:h-[70px] lg:hidden md:block"
                    //   title={filteredFood.desc}
                    >
                      {results.description.length > 60
                        ? `${results.description.substring(0, 60)}...`
                        : results.description}
                      {/* Get a bird’s-eye view over Kuala Lumpur */}
                      {/* {filteredFood.desc.length > 40 ? filteredFood.desc.substring(0, 40) + '...' : filteredFood.desc} */}
                    </p>

                    {/* <div className="ml-3 mt-3">
  <Row>
  <text className=" text-[12px] mt-0.5 ">
      Adventure
    </text>
    <Icon
      path={mdiCircleSmall } 
      size={1}
      className=" w-fit h-fit"
    />
    <text className=" text-[12px] mt-0.5 ">
      History
    </text>
  </Row>

</div> */}
                    <style>
                      {`
          .interests-tooltip {
            display: none;
            position: absolute;
            background-color: white;
            border: 0.5px solid black;
            padding: 8px;
            z-index: 1;
            right: 0; /* Align to the right */
            flex-direction: row;
          }

          .tag-container {
            position:;
            display: inline-block;
          }

          .tag:hover .interests-tooltip {
            display: block;
          }
        `}
                    </style>
                    <div className="flex justify-between mx-3 items-center lg:h-[30px] sm:h-[20px] md:mt-4 lg:mt-0 font-bold">
                      <div className="tags truncate w-[200px] items-center ">
                        {results.interests && results.interests.length > 0 ? (
                          <>
                            {results.interests
                              .slice(0, 2)
                              .map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="tag w-[210px] sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium"
                                  style={{ maxWidth: "0px" }} // Set the maximum width for tags
                                >
                                  {tagIndex > 0 && (
                                    <span className="dot lg:text-[20px] md:text-[20px] mx-2 font-medium">
                                      •
                                    </span>
                                  )}
                                  {tag.length > 15
                                    ? tag.substring(0, 15) + "..."
                                    : tag}
                                </span>
                              ))}
                            {results.interests.length > 1 && (
                              <span
                                className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium"
                                style={{ maxWidth: "100px" }} // Set the maximum width for tags
                              >
                                <div class="interests-tooltip">
                                  {results.interests
                                    .slice(2)
                                    .map((interest, index) => (
                                      <div
                                        key={index}
                                        style={{ maxWidth: "100px" }}
                                      >
                                        {interest.length > 15
                                          ? interest.substring(0, 15) + ".."
                                          : interest}
                                      </div>
                                    ))}
                                </div>
                                {"      "} +{results.interests.length - 2}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium">
                            No interests.
                          </span>
                        )}
                      </div>
                      {/* to display state */}

                      <div className="state truncate items-center">
                        {results.destination && results.destination.length > 0 && (
                          <span className="flex items-center sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium">
                            <FaMapMarkerAlt className="inline-block mr-1" />
                            {results.destination[0].state.replace("Federal Territory of ", "").length > 9
                              ? `${results.destination[0].state.replace("Federal Territory of ", "").substring(0, 9)}...`
                              : results.destination[0].state.replace("Federal Territory of ", "")}
                          </span>
                        )}
                      </div>

                      {/* to display state and country */}

                      {/* <div>
{results.state && results.country && (
<span className="sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium">
<FaMapMarkerAlt className="inline-block mr-1" />
{results.state.length > 9
? `${results.state.substring(0, 9)}...`
: results.state}, {results.country}
</span>
)}
</div> */}
                    </div>

                    <div className="justify-between ml-2 mr-3 lg:mt-[0px] md:mt-[25px] flex lg:mb-0 md:mb-1">
                      <div className="">
                        <Row>
                          <Icon
                            path={mdiBookmark}
                            size={1}
                            className="text-[#00A19A]  w-fit h-fit lg:mt-0 md:mt-2"
                          />
                          <text className=" text-[#00A19A] lg:text-[12px] font-semibold md:text-[24px] mt-0.5">
                            {results.savedCount} Saves
                          </text>
                        </Row>
                      </div>

                      <div className="">
                        {/* Render if username is not null */}
                        {results.username !== null && (
                          <>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden"
                            >
                              {results.username.length > 20
                                ? results.username.substring(0, 20) + "..." // Display first 20 characters and add ellipsis
                                : results.username}
                            </text>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden"
                            >
                              {results.username.length > 18
                                ? results.username.substring(0, 18) + "..." // Display first 20 characters and add ellipsis
                                : results.username}
                            </text>
                          </>
                        )}
                        {/* Render a space character if username is null */}
                        {results.username === null && (
                          <>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden"
                            >
                              {" "}
                            </text>
                            <text
                              username={results.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden"
                            >
                              {" "}
                            </text>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>


              ))}
          
              

              {results.length > 0 && (
                <>
                  <Row className="w-[100%] justify-between ">
                    <Icon className="ml-2 common-pointer w-[35%] h-10  font-normal"
                      path={mdiArrowLeft} size={1}
                      onClick={handlePreviousPage} />

                    <Icon className="mr-2 common-pointer w-[35%] h-10  font-normal "
                      path={mdiArrowRight} size={1}
                      onClick={handleNextPage} />
                  </Row>
                  <div className="justify-center items-center text-center mt-[10px]">
                    <button
                      className="rounded-[15px] w-[35%] h-10 border shadow-sm border-black font-normal"
                      onClick={handleLoadMore}
                    //disabled={currentPage >= totalPages || isLoadingg}
                    >
                      {isLoadingg ? "Loading..." : "Show More"}
                    </button>
                  </div>
                  {noMoreResults && (
                    <div className="text-center mt-[10px] text-red-500">
                      No more results
                    </div>
                  )}
                </>
              )}


            </>
          )}
        </div>
      </column>
    </>
  );

};

export default WebListTravelPLan;
