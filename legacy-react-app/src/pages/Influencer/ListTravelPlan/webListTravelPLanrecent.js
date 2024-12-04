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
  fetchBlogContent
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
import { FaTimes } from 'react-icons/fa';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import CreateYourOwn from 'components/CreateYourOwn/index';

const WebListTravelPlan = (page) => {
  const [isShowAI, setIsShowAI] = useState(false);
  const [showModalItinerary, setshowModalItinerary] = React.useState(false);
  const [isShowContentSetting, setIsShowContentSetting] = React.useState(false);
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
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const [pageNumber, setPageNumber] = useState(1);
  const { destination, state, country } = useParams();
  const [dataBlogAI, setDataBlogAI] = useState([]);
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { creatorId, blogId, itineraryId, itineraryTitle } = useParams();
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
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);

  const [showBlogSuccessMessage, setShowBlogSuccessMessage] = useState(false);
  const [blogSuccessMessageType, setBlogSuccessMessageType] = useState("");
  const [blogTitle, setBlogTitle] = useState('');

  const toggleTooltip = () => {
    setShowTooltip(prevState => !prevState);
  };
  const openPopup1 = () => {
    setIsPopup1Open(true);
    setIsPopup2Open(false);
    setIsShowAI(false); // Close Popup2 when Popup1 is opened
  };
  const isItineraryBookmarked = (userItineraryId) => {
    return bookmarkedItineraries.some(
      (item) => Number(item.itineraryId) === Number(userItineraryId)
    );
  };

  const isBlogBookmarked = (blogId) => {
    return bookmarkedBlogs.some(
      (item) => Number(item.blogId) === Number(blogId)
    );
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
  const handleBlogUnsaveClick = async (blogId) => {
    const bookmark = bookmarkedBlogs.find(
      (item) => Number(item.blogId) === Number(blogId)
    );

    if (!bookmark) {
      console.error("Bookmark entry not found");
      return;
    }

    try {
      const response = await axios.delete(
        `https://halaltravel.ai/ht/api/blog/bookmark/${userId}/${bookmark.bookmarkId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        setBookmarkedBlogs((current) =>
          current.filter((item) => item.bookmarkId !== bookmark.bookmarkId)
        );
        setShowBlogSuccessMessage(true);
        setBlogSuccessMessageType("unsaved");
        fetchBookmarkedBlogs();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        console.error("Failed to delete blog bookmark with status:", response.status);
      }
    } catch (error) {
      console.error("Error while deleting blog bookmark:", error);
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

  const handleBlogBookmarkClick = async (blogId) => {
    try {

      const data = await fetchBlogContent(blogId);
      setBlogTitle(data.blogContent.blogTitle);

      console.log("TITLE 3:", blogTitle);
      const response = await axios.post(
        `https://halaltravel.ai/ht/api/blog/bookmark/${userId}/${blogId}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(" bookmarking blog");
        // setBookmarkedBlogs([...bookmarkedBlogs, { blogId, bookmarkId: response.data.id, title: blogTitle }]);
        setBlogSuccessMessageType("saved");
        // setBlogTitle((prevTitles) => ({
        //   ...prevTitles,
        //   [blogId]: blogTitle
        // }));
        setShowBlogSuccessMessage(true);
        fetchBookmarkedBlogs();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        console.error("Error bookmarking blog");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTravelPlanClick = (creatorId, itineraryId, title) => {
    const encodedTitle = encodeURIComponent(title);
    navigate(`/itinerary-save/${creatorId}/${itineraryId}/` + encodedTitle);
  };

 
  function handleReadMore(blogId, blogTitle, userId) {
    navigate(`/blog-display/${userId}/${blogId}/${blogTitle}`);
  }
  const loginStatus = (id, action) => {
    if (isLoggedIn) {
      action(id); // Perform the action (bookmark or unbookmark) if logged in
    } else {
      openPopup1(); // Show login prompt if not logged in
      localStorage.setItem("customPath", `list-travelplan/${destination}/${state}/${country}`); // Save intended action path
    }
  };

  const fetchBookmarkedItineraries = async () => {
    try {
      const response = await axios.get(
        `https://halaltravel.ai/hv/api/chatgpt/user/itinerary-bookmark/${userId}`
      );
      const data = response.data;
      setBookmarkedItineraries(
        data.map((bookmark) => ({
          itineraryId: bookmark.userItineraryId,
          bookmarkId: bookmark.id,
        }))
      );

      const isCurrentlyBookmarked = data.some(
        (bookmark) => Number(bookmark.userItineraryId) === Number(itineraryId)
      );
      setIsBookmarked(isCurrentlyBookmarked);
    } catch (error) {
      console.error("Failed to fetch bookmarked itineraries:", error);
    }
  };

  const fetchBookmarkedBlogs = async () => {
    try {
      const response = await axios.get(
        `https://halaltravel.ai/ht/api/blog/bookmark/${userId}`
      );
      const data = response.data.content;
      setBookmarkedBlogs(
        data.map((bookmark) => ({
          blogId: bookmark.id,
          bookmarkId: bookmark.id,
          title: bookmark.title,
        }))
      );

      const isCurrentlyBookmarked = data.some(
        (bookmark) => Number(bookmark.id) === Number(blogId)
      );
      setIsBookmarked(isCurrentlyBookmarked);
      console.log("fetch bookmarked blogs:", response);
    } catch (error) {
      console.error("Failed to fetch bookmarked blogs:", error);
    }
  };

  useEffect(() => {
    fetchBookmarkedItineraries();
    fetchBookmarkedBlogs();

    return () => {
      setBookmarkedItineraries([]);
      setBookmarkedBlogs([]);
    };
  }, [userId, itineraryId, blogId, pageNumber]);

  useEffect(() => {
    setIsLoadingg(true);
    const apiUrl = `https://halaltravel.ai/ht/api/blog/srp-recent?pageNumber=${pageNumber}&pageSize=10`;

    const requestData = {
      location: destination,
      ...(state && { state: state }),
      country: country,
    };

    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, requestData);
        const data = response.data;
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements);
        const items = data.content || [];
        const itemsAll = data || [];
        setResultsAll(itemsAll);
        setResults(items);
        setIsLoadingg(false);
      } catch (error) {
        console.error("API error:", error);
      }
    };
    const calculatedProgress = (pageNumber / totalPages) * 100;
    setProgress(calculatedProgress);

    fetchData();
  }, [destination, state, country, dataSelected, pageNumber]);

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
    if (pageNumber > 1) {
      setPageNumber(prevPage => prevPage - 1);
      setNoMoreResults(false);
      // if (targetDivRef.current) {
      //   targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      // }
    }
  };

  const handleNextPage = () => {
    if (pageNumber < (totalPages - 1) && !isLoadingg) {
      setPageNumber(prevPage => prevPage + 1);
      // if (targetDivRef.current) {
      //   targetDivRef.current.scrollIntoView({ behavior: "smooth" });
      // }
    } else if (pageNumber >= (totalPages - 1)) {
      setNoMoreResults(true);
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Adjusted for Horizontal Layout */}
      <div  className="flex flex-row justify-between items-center sm:p-5 lg:p-0 sm:px-5 sm:py-4 lg:py-0 gap-6">
         <button
        className={`bg-white p-2 rounded-full shadow-md ${
          pageNumber > 1 ? "visible" : "visible"
        }`}
        onClick={handlePreviousPage}
      >
        <Icon path={mdiArrowLeft} size={1} />
      </button>
      <div className="flex flex-row gap-6 overflow-x-auto w-full scrollbar-hide">
        {results.map((result, index) => (
          <div key={index} className="bg-white flex-shrink-0 w-[300px] h-[360px] border shadow-lg rounded-lg hover:scale-105 duration-300">
            <div className="relative"
              onClick={() =>
                result.type === 'Blog'
                  ? handleReadMore(result.id, result.title, result.userId)
                  : handleTravelPlanClick(result.userId, result.id, result.title)
              }>
              <button
                className="absolute top-2 right-2 cursor-pointer"
               
              >
                <Icon
                  path={mdiBookmarkOutline}
                  className={`sm:w-[60px] sm:h-[60px] lg:w-[30px] lg:h-[30px] ${result.type === 'Blog'
                    ? isBlogBookmarked(result.id)
                      ? "text-[#FFFFFF] bg-teal-700"
                      : "text-[#00A19A] bg-[#FFFFFF]"
                    : isItineraryBookmarked(result.id)
                      ? "text-[#FFFFFF] bg-teal-700"
                      : "text-[#00A19A] bg-[#FFFFFF]"
                    } w-fit h-fit p-1 rounded-full common-pointer`}
                />
              </button>
              <img
                src={result.type === 'Blog' ? `${result.coverImage}` : `https://halaltravel.ai/hv/api/chatgpt/user/itinerary/coverimage/${result.coverImage}`}
                alt={result.alt}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <span className={`absolute top-2.5 left-0 ${result.type === 'Blog' ? 'bg-[#192579]' : 'bg-teal-700'} w-[30%] h-[15%] shadow-lg rounded-br-xl`}>
                <div className="flex flex-col justify-center items-center h-full">
                  <span className="text-[12px] text-white">{result.type === 'Blog' ? 'Blog' : 'Travel Plan'}</span>
                </div>
              </span>
            </div>
            <div className="p-3 common-pointer">
              <Row>
                <p className="font-bold text-[14px]" title={result.title}>
                  {result.title.length > 28 ? `${result.title.substring(0, 28)}...` : result.title}
                </p>
              </Row>
              <p className="mt-1 text-[12px] h-[40px]">{result.description.length > 60 ? `${result.description.substring(0, 60)}...` : result.description}</p>
            </div>
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
                        {result.interests && result.interests.length > 0 ? (
                          <>
                            {result.interests
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
                            {result.interests.length > 1 && (
                              <span
                                className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium"
                                style={{ maxWidth: "100px" }} // Set the maximum width for tags
                              >
                                <div className="interests-tooltip">
                                  {result.interests
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
                                {"      "} +{result.interests.length - 2}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium">
                            No interests.
                          </span>
                        )}
                      </div>

                      <div className="state truncate items-center">
                        {result.destination && result.destination.length > 0 && result.destination[0].state ? (
                          <span className="flex items-center sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium">
                            <FaMapMarkerAlt className="inline-block mr-1" />
                            {result.destination[0].state.replace("Federal Territory of ", "").length > 9
                              ? `${result.destination[0].state.replace("Federal Territory of ", "").substring(0, 9)}...`
                              : result.destination[0].state.replace("Federal Territory of ", "")}
                          </span>
                        ) : (
                          <>
                            <text className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden">
                              {" "}
                            </text>
                            <text className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden">
                              {" "}
                            </text>
                          </>
                        )}
                      </div>
                      

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
                            {result.savedCount} Saves
                          </text>
                        </Row>
                      </div>
                      <div className="">
                        {result.username !== null && (
                          <>
                            <text
                              username={result.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden"
                            >
                              {result.username.length > 20
                                ? result.username.substring(0, 20) + "..."
                                : result.username}
                            </text>
                            <text
                              username={result.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden"
                            >
                              {result.username.length > 18
                                ? result.username.substring(0, 18) + "..."
                                : result.username}
                            </text>
                          </>
                        )}
                        {result.username === null && (
                          <>
                            <text
                              username={result.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden"
                            >
                              {" "}
                            </text>
                            <text
                              username={result.username}
                              className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden"
                            >
                              {" "}
                            </text>
                          </>
                        )}
                      </div>
                    </div>
          </div>
        ))}
        </div>
  <button
        className={`bg-white p-2 rounded-full shadow-md ${
          pageNumber < totalPages - 1 && !isLoadingg ? "visible" : "invisible"
        }`}
        onClick={handleNextPage}
      >
        <Icon path={mdiArrowRight} size={1} />
      </button>
      </div>

      
    </div>
  );
};

export default WebListTravelPlan;

