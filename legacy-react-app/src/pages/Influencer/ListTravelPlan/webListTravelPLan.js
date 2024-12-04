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
import { FaTimes } from 'react-icons/fa';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import CreateYourOwn from 'components/CreateYourOwn/index';

const WebListTravelPLan = (page) => {
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
  // const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);

  const [showBlogSuccessMessage, setShowBlogSuccessMessage] = useState(false);
  const [blogSuccessMessageType, setBlogSuccessMessageType] = useState("");
  const [blogTitle, setBlogTitle] = useState('');

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

  //console.log("xxx",bookmarkedItineraries)
  // Correctly use useEffect to call fetchBookmarkedItineraries
  // useEffect(() => {
  //   fetchBookmarkedItineraries();
  //   fetchBookmarkedBlogs();
  // }, [userId, itineraryId, blogId, pageNumber]);

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
    // scrollToTop();
    // Define your API endpoint
    const apiUrl =
      `https://halaltravel.ai/ht/api/blog/srp?pageNumber=${pageNumber}&pageSize=5`;

    // Create the request payload
    const requestData = {
      location: destination,
      ...(state && { state: state }),
      country: country,
      // attractions: (dataSelected && dataSelected.attractions) || [],
      // interests: (dataSelected && dataSelected.interests) || [],
      // page: currentPage,
    };

    // console.log("req pageee:", requestData);

    const fetchData = async () => {
      try {
        // Make the API request
        const response = await axios.post(apiUrl, requestData);
        // Handle the API response here
        const data = response.data;
        console.log("data blogsss: ", data);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements);
        // Assuming the array of items is under the 'data' property
        const items = data.content || [];
        const itemsAll = data || [];
        // Use the 'items' array as needed
        setResultsAll(itemsAll);

        setResults(items);
        setIsLoadingg(false);
        // console.log("API responsess:", items);
        // console.log("API responsess:", itemsAll);
        console.log("all", items)
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
    if (pageNumber > 1) {
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

  const isBlogBookmarked = (blogId) => {
    return bookmarkedBlogs.some(
      (item) => Number(item.blogId) === Number(blogId)
    );
  };


  // const isBlogBookmarked = (blogId) => {
  //   return bookmarkedBlogs.some(
  //     (item) => Number(item.blogId) === Number(blogId)
  //   );
  // };

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

  const closeContentSetting = () => {
    setIsShowContentSetting(false);
  }

  const backContentSetting = () => {
    setIsShowContentSetting(false);
    setshowModalItinerary(true);
  }

  const backShowAI = () => {
    setIsShowAI(false);
    setshowModalItinerary(true);
  }


  // * Navigation *
  function handleNavigate() {
    if (isLoggedIn) {
      // navigate("/ota2");
      setshowModalItinerary(false);
      setIsShowContentSetting(true);
    } else {
      setIsPopup1Open(true);
    }
  }

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

      {showBlogSuccessMessage && (
        <div className="success-message">
          <div className="message-line">
            Blog{" "}
            <strong>
              {blogSuccessMessageType === "saved" ? "saved to" : "unsaved from"}
            </strong>{" "}
            your bookmark
            <button
              onClick={() => setShowBlogSuccessMessage(false)}
              className="close-button"
            >
              X
            </button>
          </div>
          <div className="message-line">
            {blogTitle} has been{" "}
            <strong>
              {blogSuccessMessageType === "saved" ? "saved to" : "unsaved from"}
            </strong>{" "}
          </div>
          <div className="message-line">
            <a href="/my-travelplan">My Bookmarked Blogs</a>.
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
                <span onClick={() => setshowModalItinerary(true)} className="tooltip-message common-pointer">
                  Click Here to Discover More 
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

          {showModalItinerary ? (
            <>
              <div className="fixed bg-gray-50 xs:top-[10vh] lg:top-0 rounded-3xl cursor-pointer text-center justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px] flex-nowrap overflow-x-hidden overflow-y-auto scrollbar-hide inset-0 z-50 outline-none focus:outline-none" >
                {/*Content*/}

                <Column className="sm:w-[100%] sm:h-[100%] lg:w-[100%] lg:h-fit">
                  <Row className="text-end items-end justify-end">
                    <FaTimes
                      className="mr-4 mt-6 sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                      onClick={() => setshowModalItinerary(false)}
                    />
                  </Row>
                  <Row className="w-[100%] items-start justify-start ">
                    <Text className="text-start py-[70px] pl-[130px] sm:text-[37px] lg:text-xl text-black font-light">
                      Create Travel Plan
                    </Text>
                  </Row>
                  <p className="py-1 px-4 text-center">
                    <button
                      className="sm:w-[600px] lg:w-[300px] hover:bg-[#4eb6b1f8] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
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
                  {/* <p className="px-4 text-center py-1">
                    <button
                      className="sm:w-[600px] lg:w-[300px] hover:bg-[#4eb6b1f8] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                      onClick={() => {
                        setShowYT(true);
                        setshowModalItinerary(false);
                      }
                      }
                    >
                      <span>Generate from youtube</span>
                      <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                    </button>
                  </p> */}
                  <p className="px-4 text-center py-1">
                    <button className="sm:w-[600px] lg:w-[300px] hover:bg-[#4eb6b1f8] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
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
            showCreateYourOwn={isShowContentSetting}
            closeCreateYourOwn={closeContentSetting}
            backCreateYourOwn={backContentSetting}
          />

          {isShowAI && <ShowAI openPopup1={openPopup1} closePopup1={closePopup1} closeShowAI={closeShowAI} showAI={isShowAI} backShowAI={backShowAI}/>}

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
              {results.map((result, index) => (
                <div className="bg-white md:w-full md:h-[630px] lg:w-full lg:h-[360px] 2xl:h-[420px] border shadow-lg rounded-lg hover:scale-105 duration-300" key={index}>
                  <div className="relative">
                    <button
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() =>
                        loginStatus(
                          result.id,
                          result.type === 'Blog'
                            ? isBlogBookmarked(result.id)
                              ? handleBlogUnsaveClick(result.id)
                              : handleBlogBookmarkClick(result.id)
                            : isItineraryBookmarked(result.id)
                              ? handleUnsaveClick(result.id)
                              : handleBookmarkClick(result.id)
                        )
                      }
                    >
                      <Icon
                        path={mdiBookmarkOutline}
                        className={`sm:w-[60px] sm:h-[60px] lg:w-[30px] lg:h-[30px]
                          ${result.type === 'Blog'
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
                      className="w-full sm:h-[350px] lg:h-[200px] 2xl:h-[220px] object-cover sm:rounded-t-lg lg:rounded-t-lg"
                    />
                    <span className={`absolute top-2.5 left-0 ${result.type === 'Blog' ? 'bg-[#192579] lg:w-[22%]' : 'bg-teal-700 lg:w-[30%]'}  lg:h-[15%] shadow-lg sm:rounded-tl-2xl sm:rounded-tr-3xl sm:rounded-br-3xl lg:rounded-tl-none lg:rounded-tr-xl lg:rounded-br-xl cursor-pointer`}>
                      <div className="flex flex-col justify-center items-center h-full">
                        <span className="sm:text-[25px] lg:text-[12px] text-white">
                          {result.type === 'Blog' ? 'Blog' : 'Travel Plan'}
                        </span>
                      </div>
                    </span>
                  </div>

                  <div
                    className="items-center sm:p-6 lg:p-3 common-pointer"
                    onClick={() =>
                      result.type === 'Blog'
                        ? handleReadMore(result.id, result.title, result.userId)
                        : handleTravelPlanClick(result.userId, result.id, result.title)
                    }
                  >
                    <Row>
                      <p
                        className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:block md:hidden"
                        title={result.title}
                      >
                        {result.title.length > 28
                          ? `${result.title.substring(0, 28)}...`
                          : result.title}
                      </p>
                      <p
                        className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:hidden md:block"
                        title={result.title}
                      >
                        {result.title.length > 23
                          ? `${result.title.substring(0, 23)}...`
                          : result.title}
                      </p>
                    </Row>
                    <p
                      className="ml-3 mt-1 w-fit md:text-[25px] lg:text-[12px] lg:h-[40px] 2xl:h-[75px] md:h-[20px] lg:block md:hidden"
                    >
                      {result.description.length > 65
                        ? `${result.description.substring(0, 65)}...`
                        : result.description}
                    </p>
                    <p
                      className="ml-3 mt-1 w-fit md:text-[23px] lg:text-[12px] lg:h-[40px] md:h-[70px] lg:hidden md:block"
                    >
                      {result.description.length > 60
                        ? `${result.description.substring(0, 60)}...`
                        : result.description}
                    </p>

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
