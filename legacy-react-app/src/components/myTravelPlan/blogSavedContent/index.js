import React, { useState, useEffect, useRef } from "react";
import { RatingBar } from "components/RatingBar/index";
import { Row, Text, Button, Img, ButtonMp } from "components";
import { mdiBookmark, mdiDotsHorizontal, mdiCircleSmall } from "@mdi/js";
import {
  data,
  fetchItineraryBookmark,
  fetchBlogData,
  fetchProductData,
  fetchItineraryDestination,
  fetchItineraryDetails,
  fetchTravelPlan,
} from "data/data";
import Icon from "@mdi/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import ThreeDotSaveBlog from "components/ThreeDotSaveBlog/index";
import { useNavigate } from "react-router";
import "./message.css";
import "./LoadingSpinner3.css";
import axios from "axios";
import { AiOutlineDoubleRight } from "react-icons/ai";

const BlogSavedContent = () => {
  const [nav3, setNav3] = useState(false);
  const [blogContent, setBlogContent] = useState([]);
  const [travelPlanAll, setTravelPlanAll] = useState([]);
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const userId = localStorage.getItem("userId");
  const [isBlog, setIsBlog] = useState(false);
  const [title, setTitle] = useState("");
  const [blogId, setBlogId] = useState("");
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const baseURL = window.location.origin;
  console.log("baseUrl: ", baseURL);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' for instant scrolling
    });
  };

  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const loadingTexts = [
    "Hold tight as our system assembles your blog...",
    "Relax while we organize your blog...",
    "Grabbing the blog for your journey...",
    "Fine-tuning your blog to make it even better...",
    "Ready to unveil a carefully curated blog just for you...",
    "Hang tight, while we ensuring your blog unfolds flawlessly...",
    // Add more loading texts as needed
  ];
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
      } catch (error) {
        console.error("Error during loading:", error);
        setIsLoadingg(true);
      }
    };

    fetchData();
  }, []);

  const simulateAsyncAction = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 6000); // Simulate a delay (replace with your actual async action)
    });
  };
  // * PAGINATION *

  const [totalElements, setTotalElements] = useState(0);
  const [numberOfElements, setNumberOfElements] = useState(0);
  const [number, setNumber] = useState(0);
  const [last, setLast] = useState("");
  const isLastPage = last;
  const currentTotal = isLastPage
    ? totalElements
    : numberOfElements * (number + 1);

  const getPageButtonsRange = () => {
    const buttonsRange = [];
    const startPage = Math.max(currentPage - 1, 0);
    const endPage = Math.min(currentPage + 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttonsRange.push(i);
    }

    return buttonsRange;
  };

  function handleReadMore(blogId, blogTitle, userId) {
    navigate(`/blog-display/${userId}/${blogId}/${blogTitle}`);
    // navigate('/blog-display');
  }

  const handleArrowClick = (direction) => {
    if (direction === "left" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "right" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    const fetchBlogBookmark = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          `https://halaltravel.ai/ht/api/blog/bookmark/${userId}?pageNumber=1&pageSize=5&sortBy=Id&sortDir=asc`,
        );
        console.log("Data fetched successfully:", response.data);
        const blogBookmark = response.data.content.map((element) => ({
          id: element.id,
          title: element.title,
          blog: element.blog,
          summary: element.summary,
          status: element.status, // Assuming 'blog' contains the description
          coverImage: element.headerImage,
          pinStatus: element.pinStatus, // Assuming 'headerImage' contains the cover image URL
          createdDate: element.dtCreated, // Assuming 'dtCreated' contains the created date
          originalBy: element.originalBy, // Assuming 'createdBy' contains the original creator ID
          userItineraryId: element.id, // Assuming 'id' contains the user itinerary ID
          savedCount: element.savedCount,
          attractions: element.attractions,
          interests: element.interests,
          state: element.locations[0].state, // Assuming 'locations' is an array and we're accessing the first element
          userId: element.createdBy,
          // Assuming 'createdBy' contains the user ID
        }));

        scrollToTop();
        setBlogContent(blogBookmark);
        setTotalPages(response.data.totalPages);
        setNumber(response.data.number);
        setLast(response.data.last);
        setNumberOfElements(response.data.numberOfElements);
        setTotalElements(response.data.totalElements);
        setIsBlog(true);
        setTitle(blogBookmark.map((item) => item.title));
        setIsLoadingg(false);
        console.log("Data processing completed.");
      } catch (error) {
        console.error("Error fetching data:", error);
        // Log specific error details
        if (error.response) {
          // Server responded with a status code outside of 2xx range
          console.error(
            "Server responded with error status:",
            error.response.status,
          );
          console.error("Error data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error setting up request:", error.message);
        }
        setIsLoadingg(false);
      }
    };

    fetchBlogBookmark();
  }, [currentPage, userId]);

  const fetchAndRenderItineraryDetails = async (itineraryId, userId) => {
    try {
      setIsLoadingg(true);
      scrollToTop();
      // console.log("CLICK - ITINERARY ID: ", itineraryId);

      const data = await fetchItineraryDetails(itineraryId);
      const data2 = await fetchItineraryDestination(itineraryId);

      let itineraryDetails = data;
      let userItineraryActivity = data.itineraryDetails.userItineraryActivity;
      let travelPlanId = data.itineraryDetails.itineraryId;
      let day = data.itineraryDetails.day;
      let title = data.itineraryDetails.itineraryTitle;
      let location = data.itineraryDetails.location;
      let itineraryDestination = data2;
      let destination = data2.itineraryDestination.destination;

      // console.log("itineraryDetailsPC: ", itineraryDetails);
      // console.log("userItineraryActivityPC: ", userItineraryActivity);
      // console.log("itineraryIdPC: ", travelPlanId);
      // console.log("Title : ", title);

      navigate("/obs", {
        state: {
          location,
          title,
          itineraryDestination,
          destination,
          day,
          itineraryDetails,
          userItineraryActivity,
          travelPlanId,
          userId,
        },
      });
      setIsLoadingg(false);
      // console.log('Combined Data:', combinedData);
    } catch (error) {
      console.error("Error fetching itinerary details:", error);
    }
  };

  const showSuccess = (unsavedTitle) => {
    setTitle(unsavedTitle);
    setShowSuccessMessage(true);
  };

  // Function to hide the success message
  const hideSuccess = () => {
    setShowSuccessMessage(false);
  };

  const handleTravelPlanClick = (creatorId, itineraryId, title) => {
    const encodedTitle = encodeURIComponent(title);
    navigate(`/itinerary-save/${creatorId}/${itineraryId}/` + encodedTitle);
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="success-message">
          <div className="message-line">
            Blog unsaved from your bookmark
            <button onClick={hideSuccess} className="close-button">
              X
            </button>
          </div>
          <div className="message-line">{title} have been unsaved from </div>
          <div className="message-line">
            <a href="/legacy/my-travelplan">My Travel Plan</a>.
          </div>
        </div>
      )}
      <div>
        <Row className="lg:mb-0 md:mb-3 ">
          <text className="mt-10 md:text-[28px] lg:text-[14px] sm:pl-6 lg:pl-[60px] font-semibold">
            {currentTotal}
          </text>
          <text className="mt-10 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px]">
            of
          </text>
          <text className="mt-10 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px] font-semibold">
            {totalElements}
          </text>
          <text className="mt-10 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px] ">
            Blogs
          </text>
        </Row>
      </div>
      <div className="bg-[#F5F5F5] sm:p-5 lg:p-0 sm:px-5 lg:px-[55px] sm:py-5 lg:py-10 grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 md:gap-[30px] lg:gap-9">
        {isLoadingg ? (
          <>
            <div
              id="loading-container"
              className="loader-container3 md:block lg:hidden "
            >
              <div className="loader md:block lg:hidden"></div>
              <p className="loading-text md:block lg:hidden text-center ">
                {loadingTexts[loadingTextIndex]}
              </p>
            </div>
            <div
              id="loading-container"
              className="loader-container3 lg:block md:hidden"
            >
              <div className="loader lg:block md:hidden"></div>
              <p className="loading-text lg:block md:hidden text-center">
                {loadingTexts[loadingTextIndex]}
              </p>
            </div>
          </>
        ) : (
          <>
            {isBlog && (
              <>
                {blogContent.map((data, index) => (
                  <div className="bg-white md:w-full md:h-[630px] lg:w-full lg:h-[360px] 2xl:h-[420px] border shadow-lg rounded-lg hover:scale-105 duration-300">
                    <div className="relative" key={index}>
                      <button className="absolute right-1 cursor-pointer">
                        <ThreeDotSaveBlog
                          blogId={data.id}
                          userId={userId}
                          showSuccess={showSuccess}
                          title={data.title}
                          setBlogContent={setBlogContent}
                          setShowSuccessMessage={setShowSuccessMessage}
                          blogLink={
                            baseURL +
                            `/blog-display/${data.userId}/${data.id}/${encodeURIComponent(data.title)}`
                          }
                        />
                      </button>
                      <img
                        src={data.coverImage}
                        alt={data.alt}
                        className="w-full sm:h-[350px] lg:h-[200px] 2xl:h-[220px] object-cover sm:rounded-t-lg lg:rounded-t-lg"
                      />
                    </div>

                    <div
                      className="items-center sm:p-6 lg:p-3 common-pointer"
                      onClick={() =>
                        handleReadMore(data.id, data.title, userId)
                      }
                    >
                      <Row>
                        <p
                          className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:block md:hidden"
                          title={data.title}
                        >
                          {data.title.length > 28
                            ? `${data.title.substring(0, 28)}...`
                            : data.title}
                        </p>
                        <p
                          className="ml-3 justify-center font-bold w-fit md:text-[28px] lg:text-[14px] lg:hidden md:block"
                          title={data.title}
                        >
                          {data.title.length > 23
                            ? `${data.title.substring(0, 23)}...`
                            : data.title}
                        </p>
                      </Row>

                      <p className="ml-3 mt-1 w-fit md:text-[25px] lg:text-[12px] lg:h-[40px] 2xl:h-[75px] md:h-[20px] lg:block md:hidden">
                        {data.summary.length > 65
                          ? `${data.summary.substring(0, 65)}...`
                          : data.summary}
                      </p>
                      <p className="ml-3 mt-1 w-fit md:text-[23px] lg:text-[12px] lg:h-[40px] md:h-[70px] lg:hidden md:block">
                        {data.summary.length > 60
                          ? `${data.summary.substring(0, 60)}...`
                          : data.summary}
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
                          {data.interests && data.interests.length > 0 ? (
                            <>
                              {data.interests
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
                              {data.interests.length > 1 && (
                                <span
                                  className="tag sm:text-[22px] lg:h-[30px] xl:text-[11px] lg:text-[11px] font-medium"
                                  style={{ maxWidth: "100px" }} // Set the maximum width for tags
                                >
                                  <div className="interests-tooltip">
                                    {data.interests
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
                                  {"      "} +{data.interests.length - 2}
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
                          {data.state && data.state.length > 0 && data.state ? (
                            <span className="flex items-center sm:text-[22px] xl:text-[11px] lg:text-[11px] font-medium">
                              <FaMapMarkerAlt className="inline-block mr-1" />
                              {data.state.replace("Federal Territory of ", "")
                                .length > 9
                                ? `${data.state.replace("Federal Territory of ", "").substring(0, 9)}...`
                                : data.state.replace(
                                    "Federal Territory of ",
                                    "",
                                  )}
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
                              {data.savedCount} Saves
                            </text>
                          </Row>
                        </div>

                        <div className="">
                          {/* Render if originalBy is not null */}
                          {(() => {
                            console.log("originalBy:", data.originalBy);
                            return data.originalBy ? (
                              <>
                                <span className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden">
                                  {data.originalBy.length > 20
                                    ? data.originalBy.substring(0, 20) + "..." // Display first 20 characters and add ellipsis
                                    : data.originalBy}
                                </span>
                                <span className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden">
                                  {data.originalBy.length > 18
                                    ? data.originalBy.substring(0, 18) + "..." // Display first 18 characters and add ellipsis
                                    : data.originalBy}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="lg:text-[12px] md:text-[24px] italic text-[#000000] lg:block md:hidden">
                                  {" "}
                                </span>
                                <span className="lg:text-[12px] md:text-[24px] italic text-[#000000] md:block lg:hidden">
                                  {" "}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
      {isLoadingg ? null : (
        <>
          <Row className="justify-end w-[100%]">
            <text className="mt-6 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px]">
              Page
            </text>
            <text className="mt-6 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px]">
              {currentPage + 1}
            </text>
            <text className="mt-6 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px]">
              of
            </text>
            <text className="mt-6 md:text-[28px] lg:text-[14px] sm:pl-2 lg:pl-[5px] sm:pr-6 lg:pr-[60px] ">
              {totalPages}
            </text>
          </Row>

          <div className=" lg:mb-[100px] md:mb-[230px] md:hidden lg:block flex flex-row font-poppins items-start cursor-pointer justify-center ml-[0px] mt-[46px] w-[100%] h-[fit]">
            <Img
              className={`lg:mr-2 md:mr-6 lg:h-[13px] md:h-[35px] lg:mt-[20px] md:mt-[46px] lg:w-[15px] md:w-[35px]${
                currentPage > 0 ? "common-pointer" : "hidden"
              }`}
              src="https://vm.epictravel.ai/images/img_arrowleftmp.svg"
              onClick={() => handleArrowClick("left")}
            />
            {getPageButtonsRange().map((pageNumber) => (
              <ButtonMp
                key={pageNumber}
                className={` shadow-lg flex lg:h-[50px] lg:w-[50px] md:h-[120px] md:w-[120px] common-pointer items-center justify-center ml-5 rounded-full text-center text-shadow-ts lg:text-[16px] md:text-[35px] tracking-[-0.30px] 
                              ${
                                currentPage === pageNumber
                                  ? " bg-cyan-700 text-white"
                                  : "bg-white text-gray-700"
                              }`}
                size="txtPoppinsMedium20"
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber + 1}
              </ButtonMp>
            ))}
            <Img
              className={` lg:ml-7 md:ml-11 lg:h-[13px] md:h-[35px] lg:mt-[20px] md:mt-[46px] lg:w-[15px] md:w-[35px]${
                currentPage < totalPages ? "common-pointer" : "hidden"
              }`}
              src="https://vm.epictravel.ai/images/img_arrowright_gray_700_01.svg"
              alt="arrowright_One"
              onClick={() => handleArrowClick("right")}
            />
          </div>
        </>
      )}
    </>
  );
};

export default BlogSavedContent;
