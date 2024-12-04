import React, { useEffect, useState } from "react";
import { Text, Input, Img, Button, Line, Row, Column } from "components";
import { FaTimes } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchData } from "redux/actions";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Compressor from "@xkeshi/image-compressor";
import { IoAdd } from "react-icons/io5";
import Result from "../../../../node_modules/postcss/lib/result";
import { fetchItineraryDetails, fetchItineraryDestination } from 'data/data';
import { useParams } from 'react-router-dom';
import "./Popup2.css";
import { useNavigate } from "react-router";


const AddtoContentOld = ({
  showAddtoContentOld,
  closePopup44,
  activityId,
  setActivityId,
  openPopup55,
}) => {
  // const [showContentSetting, setShowContentSetting] = React.useState(false);
  // const location = useLocation();
  // const receivedData = location.state;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const userId = localStorage.getItem("userId");
  const [cover_image, setCoverImage] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const chatgptId = useSelector((state) => state.data.itineraryId);
  const [mode, setMode] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [travelPlan, setTravelPlan] = useState([]);
  const [error, setError] = useState("");
  const { creatorId, itineraryId, itineraryTitle } = useParams();
  const [successMessageType, setSuccessMessageType] = useState("added");
  const navigate = useNavigate();
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [isLoadingTravelPlan, setIsLoadingTravelPlan] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlans, setFilteredPlans] = useState([]);
  
  //const [selectedActivityId, setSelectedActivityId] = useState(activityId);

  useEffect(() => {
    console.log('Activity ID in AddtoContentOld:', activityId);
  }, [activityId]);


  // console.log("activity_id1", activityId);


  const handleClick = () => {
    // Set activityId in parent component's state
    console.log("Button clicked with activityId:", activityId);
    setActivityId(activityId);
    // Open the popup
    openPopup55();
    closePopup44();
  };


  const handleExistItinerary = async (itinerary) => {

    setMode('exist');
    setSelectedItinerary(itinerary);
    const formData = new FormData();
    const request_itinerary = {
      mode: 'exist',
      activity_id: activityId,
      user_itinerary_id: itinerary.id,
      chatgpt_id: 0,
      user_id: userId,
    };
    console.log("user_itinerary_id", itinerary.id);
    console.log("user_id", userId);
    console.log("activity_id2", activityId);
    console.log("title", itinerary.title);

    const json = JSON.stringify(request_itinerary);
    const blob = new Blob([json], { type: 'application/json' });
    formData.append('request_itinerary', blob);
    formData.append('cover_image', coverImageFile);
    try {
      const response = await axios.post('https://halaltravel.ai/ht/api/planner/user/itinerary/activity/saveTemp', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Existing itinerary created:', response.data);
      // Handle success
      closePopup44();
      setShowSuccessMessage(true);
      setSuccessMessageType('added');
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };
  const handleNavigateTravelPlan = () => {
    if (selectedItinerary) {
      const encodedTitle = encodeURIComponent(selectedItinerary.title);
      window.location.href = `/itinerary/${userId}/${selectedItinerary.id}/${encodedTitle}`;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingTravelPlan(true);
      try {
        const response = await axios.get(`https://halaltravel.ai/hv/api/chatgpt/user/itinerary/listcover/${userId}`);
        // setTravelPlan(response.data);
        const filteredData = response.data.filter(item => item.status === "DRAFT" || item.status === "PUBLISHED");
        setTravelPlan(filteredData);
        console.log("List Travel Plan: ", filteredData);

        setIsLoadingTravelPlan(false);

      } catch (error) {
        setError(error);
        console.error('Error fetching travel plan:', error);

        setIsLoadingTravelPlan(false);
      }
    };

    fetchData();
  }, [userId]);

  // console.log("title", selectedItinerary.title);
  useEffect(() => {
    console.log('selectedItinerary:', selectedItinerary);
  }, [selectedItinerary]);


  // Filter Travel Plan based on title
  useEffect(() => {
    setIsLoadingTravelPlan(true);
    
    // Filter travel plans based on the search query
    const filtered = travelPlan.filter(plan =>
      plan.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlans(filtered);

    setIsLoadingTravelPlan(false);

  }, [searchQuery, travelPlan]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <>
      {showSuccessMessage && (
        <div className="success-message">
          <div className="message-line">
            Activity{" "}
            <strong>
              {successMessageType === "added" ? "added to" : ""}
            </strong>{" "}
            your{" "}
            <a onClick={handleNavigateTravelPlan} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              {selectedItinerary?.title}
            </a>.
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="close-button"
            >
              X
            </button>
          </div>
        </div>
      )}
      {showAddtoContentOld ? (
        <>

          <div className="font-montserrat bg-gray-50 xs:top-[10vh] xs:bottom-[10vh] lg:top-0 lg:bottom-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[20px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*Content title*/}
            <Column className="sm:py-[50px] sm:w-[100%] sm:h-[100%] lg:py-[10px] lg:w-[100%] lg:h-fit">
              <div className=" flex mr-8 items-center ml-8">
                <Text className="w-[100%] text-start py-[20px] sm:text-[37px] lg:text-xl text-[#00A19A] font-medium">
                  Select a itinerary to add to
                </Text>
                <button className="text-end items-end justify-end">
                  <FaTimes
                    className="sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                    // onClick={() => setShowContentSetting(false)}
                    onClick={closePopup44}
                  />
                </button>
              </div>

              <hr className="mb-3"></hr>
              {/*Content*/}
              <div className="h-[100%]">
                <div className="mt-4 mx-8">


                  <div className="relative flex items-center">

                    {/* <input
                      className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%] pl-5"
                      type="text"
                      size="smSrc"
                      required
                      placeholder="Search your itinerary"
                      title="Search"
                      name="search"
                    /> */}
                    <input
                      className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%] pl-5"
                      type="text"
                      required
                      placeholder="Search your itinerary"
                      title="Search"
                      name="search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />

                    <svg
                      className="absolute right-3 top-3 lg:w-4 lg:h-4 lg:mt-0 md:mt-5 md:w-10 md:h-10 text-[#00A19A] fill-current pointer-events-none"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>

                  </div>
                </div>


                <div className="mx-8 my-6 lg:space-y-3 md:space-y-6 overflow-y-auto lg:h-[50vh] xs:h-[60vh] ">
                  {isLoading ? (
                    <div className="flex justify-center mt-3">
                      {/* You can use a spinner or any other loading indicator */}
                      Loading...
                    </div>
                  ) : filteredPlans.length === 0 ? (
                    <div className="flex items-center text-center justify-center mt-3">
                      No itineraries found. <br /> Create a new one to get started!
                    </div>
                  ) : (
                    filteredPlans.map((result, index) => (
                      <div
                        key={result.id}
                        onClick={() => handleExistItinerary(result)}
                        className="bg-[#F5F5F5] lg:h-[25vh] md:h-[23vh] w-full">
                        <Row className="">
                          <img
                            src={`https://halaltravel.ai/hv/api/chatgpt/user/itinerary/coverimage/${result.coverImage}`}
                            className="lg:w-[20vh] lg:h-[25vh] md:w-[20vh] md:h-[23vh] object-cover"
                          ></img>
                          <div className="m-5">
                            <text className="text-[#00A19A] lg:text-[16px] md:text-[30px] font-medium">
                              {result.title}
                            </text>
                            <br></br>
                            <text className=" text-[#6E6E6E] lg:text-[14px] md:text-[28px] font-medium italic">
                              {result.description}
                            </text>
                          </div>
                        </Row>
                      </div>
                    ))
                  )}
                </div>



                <div className="absolute inset-x-0 bottom-0">
                  <hr className=""></hr>
                  <Row
                    className="common-pointer ml-8  my-[20px]"
                    onClick={handleClick}
                  >
                    <button className="rounded-full bg-[#00A19A] lg:w-7 lg:h-7 md:w-[50px] md:h-[50px] ">
                      <IoAdd className="text-center justify-center lg:h-7 lg:w-7 md:h-[50px] md:w-[50px] text-white font-medium" />
                    </button>
                    <text className="lg:text-sm md:text-[32px] ml-2 mt-1 text-[#00A19A]">
                      Create New Itinerary
                    </text>
                  </Row>
                </div>
              </div>
            </Column>
          </div>

          <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AddtoContentOld;
