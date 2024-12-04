import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, Input, Img, Button, Line, Row, Column } from "components";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./App1.css";
import HeaderOTA from "components/Header/HeaderOTA/index";
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import HeaderOTAMobile from "components/Header/HeaderOTAMobile/index";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import "./boomarkButton.css";
import { LiaEdit } from "react-icons/lia";
import { PiBookmarkSimpleLight, PiBookmarkSimpleFill } from "react-icons/pi";
import { BiSolidFilePdf } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import {
  mdiTaxi,
  mdiAirplane,
  mdiBus,
  mdiTrain,
  mdiHeartOutline,
  mdiTrainCar,
} from "@mdi/js";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosPartlySunny,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import { FaTimes, FaSun } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import CreateYourOwn from "components/CreateYourOwn/index";
import ShowAI from "components/ShowAI/index";
import { useAuth } from "AuthContext";
import LinkBtnPrivate from "components/linkBtnPrivate/index";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { fetchItineraryDetails, fetchItineraryDestination } from "data/data";
import axios from "axios";
import { IoSunny } from "react-icons/io5";
import AddtoBtn2 from "./AddtoBtn2";
import AddtoContentNew from "components/Addto/AddtoContentNew/index";
import CreateNewItinerary from "components/Addto/CreateNewItinerary/index";
import AddtoContentOld from "components/Addto/AddtoContentOld/index";
import { WiMoonAltNew } from "react-icons/wi";
import { Icon as IconifyIcon } from "@iconify/react";
import Icon from "@mdi/react";
// import aiFillIcon from '@iconify-icons/mingcute/ai-fill';
import { FaHotel } from "react-icons/fa6";

const OverviewSave = () => {
  // *LOGIN POPUP SETUP*
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const baseURL = window.location.origin;
  const [title, setTitle] = useState(""); //string
  const [description, setDescription] = useState(""); //string
  const [coverImage, setCoverImage] = useState("");
  const userId = localStorage.getItem("userId");
  const [isShowAI, setIsShowAI] = useState(false);
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const { creatorId, itineraryId, itineraryTitle } = useParams();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLinkBtnPrivate, setIsLinkBtnPrivate] = React.useState(false);
  const [createTPButtonClicked, setCreateTPButtonClicked] = useState(false);
  const [showModalItinerary, setshowModalItinerary] = React.useState(false);
  const [isShowContentSetting, setIsShowContentSetting] = React.useState(false);
  const [successMessageType, setSuccessMessageType] = useState("saved");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [bookmarkedItineraries, setBookmarkedItineraries] = useState([]);
  const [activeText, setActiveText] = useState("Itinerary Plan");
  const [userItineraryActivity, setUserItineraryActivity] = useState([]); //[] array 25
  const [day, setDay] = useState(""); //int
  const [destination, setDestination] = useState([]); //follow locationImage
  const [itineraryDetails, setItineraryDetails] = useState(""); //{}
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [data3, setData3] = useState([]); //locationImage []
  const [itineraryDestination, setItineraryDestination] = useState([]); //follow locationImage
  const [profileImage, setProfileImagePath] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userItineraryFlight, setUserItineraryFlight] = useState([]);
  const [userItineraryBus, setUserItineraryBus] = useState([]);
  const [userItineraryCarRental, setUserItineraryCarRental] = useState([]);
  const [userItineraryOtherTransport, setUserItineraryOtherTransport] =
    useState([]);
  const [showAddtoContentNew, setShowAddtoContentNew] = useState(false);
  const [showAddtoContentOld, setShowAddtoContentOld] = useState(false);
  const [showCreateNewItinerary, setShowCreateNewItinerary] = useState(false);

  const openPopup1 = () => {
    setIsPopup1Open(true);
  };

  const openPopup2 = () => {
    setIsPopup2Open(true);
  };

  const openPopup3 = () => {
    setIsShowContentSetting(true);
  };

  const closePopup1 = () => {
    setIsPopup1Open(false);
  };

  const closePopup2 = () => {
    setIsPopup2Open(false);
  };

  const closePopup3 = () => {
    setIsShowContentSetting(false);
    setIsLinkBtnPrivate(false);
  };

  const openPopup33 = () => {
    setShowAddtoContentNew(true);
  };

  const closePopup33 = () => {
    setShowAddtoContentNew(false);
  };

  const openPopup44 = () => {
    setShowAddtoContentOld(true);
    setShowAddtoContentNew(false);
  };

  const closePopup44 = () => {
    setShowAddtoContentOld(false);
    // setActivityId(null); // Reset activityId when closing the popup
  };

  const handleSetActivityId = (id) => {
    setActivityId(id);
  };

  const openPopup55 = () => {
    setShowCreateNewItinerary(true);
  };

  const closePopup55 = () => {
    setShowCreateNewItinerary(false);
  };
  // Function to handle text click and set active text.
  const handleTextClick = (text) => {
    setActiveText(text);
  };
  // Function to handle clicking the Create Travel Plan button
  const handleCreateTPClick = () => {
    setCreateTPButtonClicked(true);
    setshowModalItinerary(true);
  };

  // * Navigation *
  function handleNavigate() {
    if (isLoggedIn) {
      // navigate("/ota2");
      setshowModalItinerary(false);
      setIsShowContentSetting(true);
    } else {
      setshowModalItinerary(false);
      setIsPopup1Open(true);
    }
  }

  const closeContentSetting = () => {
    setIsShowContentSetting(false);
    setCreateTPButtonClicked(false);
  };

  const backContentSetting = () => {
    setIsShowContentSetting(false);
    setshowModalItinerary(true);
  };

  const backShowAI = () => {
    setIsShowAI(false);
    setshowModalItinerary(true);
  };

  const closeShowAI = () => {
    setIsShowAI(false);
    setCreateTPButtonClicked(false);
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
    setIsLinkBtnPrivate(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchItineraryDetails(itineraryId);
        const data2 = await fetchItineraryDestination(itineraryId);

        // console.log("ZZDATA: ", data);
        // console.log("ZZDATA2: ", data2);
        // Set transport data to state

        setItineraryDetails(data);
        setUserItineraryActivity(data.itineraryDetails.userItineraryActivity);
        setUserItineraryFlight(data.itineraryDetails.userItineraryFlight);
        setUserItineraryBus(data.itineraryDetails.userItineraryBus);
        setUserItineraryCarRental(data.itineraryDetails.userItineraryCarRental);
        setUserItineraryOtherTransport(
          data.itineraryDetails.userItineraryOtherTransport,
        );
        // setItineraryId(data.itineraryDetails.itineraryId);
        setDay(data.itineraryDetails.day);
        setStartDate(data.itineraryDetails.startDate);
        setDescription(data.itineraryDetails.itineraryDescription);
        setTitle(data.itineraryDetails.itineraryTitle);
        setData3(data.itineraryDetails.location); //locationImage
        setCoverImage(
          "https://halaltravel.ai/hv/api/chatgpt/user/itinerary/coverimage//" +
            data.itineraryDetails.itineraryImage,
        );
        setItineraryDestination(data2);
        setDestination(data2.itineraryDestination.destination);

        const encodedCorrectTitle = encodeURIComponent(
          data.itineraryDetails.itineraryTitle,
        );

        try {
          // Check if the URL title matches the correct title, if not, update the URL
          if (itineraryTitle !== encodedCorrectTitle) {
            navigate(
              `/itinerary-save/${creatorId}/${itineraryId}/${encodedCorrectTitle}`,
              { replace: true },
            );
          }
        } catch (error) {
          console.error("Error fetching itinerary details:", error);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching itinerary details:", error);

        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchBookmarkedItineraries = async () => {
    try {
      const response = await axios.get(
        `https://halaltravel.ai/hv/api/chatgpt/user/itinerary-bookmark/${userId}`,
      );
      const data = response.data;
      setBookmarkedItineraries(
        data.map((bookmark) => ({
          itineraryId: bookmark.userItineraryId, // Ensure this matches your data structure
          bookmarkId: bookmark.id,
        })),
      );

      const isCurrentlyBookmarked = data.some(
        (bookmark) => Number(bookmark.userItineraryId) === Number(itineraryId),
      );
      setIsBookmarked(isCurrentlyBookmarked);
    } catch (error) {
      console.error("Failed to fetch bookmarked itineraries:", error);
    }
  };

  // Correctly use useEffect to call fetchBookmarkedItineraries
  useEffect(() => {
    fetchBookmarkedItineraries();
  }, [userId, itineraryId]);

  const handleBookmarkClick = async () => {
    // console.log("clikkkk", itineraryId);
    try {
      //console.log("clikkkk");
      // Fetch the itinerary details, including userItineraryId
      const data = await fetchItineraryDetails(itineraryId);
      // console.log("xxxdata: ", data);

      if (data) {
        const userItineraryId = itineraryId;

        // Update the requestBody with the obtained userItineraryId
        const requestBody = {
          user_id: userId,
          user_itinerary_id: userItineraryId,
        };

        setTitle(data.itineraryDetails.itineraryTitle);
        //console.log("PRINTT", requestBody);

        const response = await axios.post(
          "https://halaltravel.ai/hv/api/chatgpt/user/itinerary-bookmark",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          setSuccessMessageType("saved");
          setShowSuccessMessage(true);
          fetchBookmarkedItineraries();
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 5000);
          console.log("success bookmark");
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
  console.log("Bookmarked Itineraries:", bookmarkedItineraries);
  // console.log("Current Itinerary ID:", itineraryId);
  const handleUnsaveClick = async () => {
    // Find the bookmark entry for the current itinerary to get its bookmarkId
    const bookmark = bookmarkedItineraries.find(
      (item) => Number(item.itineraryId) === Number(itineraryId),
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
            // "Authorization": "Bearer <YourTokenHere>", // Include this if needed
          },
        },
      );
      // console.log("Current bookmark ID:", bookmark.bookmarkId);

      if (response.status === 200 || response.status === 204) {
        console.log("Bookmark successfully deleted");
        // Update state to reflect deletion
        setBookmarkedItineraries((current) =>
          current.filter((item) => item.bookmarkId !== bookmark.bookmarkId),
        );
        setSuccessMessageType("unsaved");
        setShowSuccessMessage(true);
        fetchBookmarkedItineraries();
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        console.error(
          "Failed to delete bookmark with status:",
          response.status,
        );
      }
    } catch (error) {
      console.error("Error while deleting bookmark:", error);
    }
  };

  const loginStatus = (isBookmarked) => {
    if (isLoggedIn) {
      if (isBookmarked) {
        handleUnsaveClick();
      } else {
        handleBookmarkClick();
      }
      // handleBookmarkClick(id);
    } else {
      setIsPopup1Open(true);
      localStorage.setItem(
        "customPath",
        `itinerary-save/${creatorId}/${itineraryId}/${itineraryTitle}`,
      );
    }
  };

  // bila dah ada data destination, days, date : tukar
  const receivedData = {
    message: destination,
    days: day,
    date: new Date(),
    itineraryId: itineraryId,
  };

  const periodPropertyNames = {
    morning: {
      id: "morningid",
      activity: "morningactivity",
      place: "morningplace",
      comment: "mcomment",
      date: "date",
      image: "morningimage",
    },
    lunch: {
      id: "lunchid",
      place: "lunch",
      date: "date",
      image: "lunchimage",
    },
    afternoon: {
      id: "afternoonid",
      activity: "afternoonactivity",
      place: "afternoonplace",
      comment: "acomment",
      date: "date",
      image: "afternoonimage",
    },
    evening: {
      id: "eveningid",
      activity: "eveningactivity",
      place: "eveningplace",
      comment: "ecomment",
      date: "date",
      image: "eveningimage",
    },
    dinner: {
      id: "dinnerid",
      place: "dinner",
      date: "date",
      image: "dinnerimage",
    },
  };

  // Define the order of periods
  const periodOrder = ["morning", "lunch", "afternoon", "evening", "dinner"];

  // Define time ranges for morning, afternoon, and evening
  const getTimePeriod = (timeStr) => {
    const timeInMinutes = parseTime(timeStr);

    if (
      timeInMinutes >= parseTime("12:00 am") &&
      timeInMinutes < parseTime("12:00 pm")
    ) {
      return "morning";
    } else if (
      timeInMinutes >= parseTime("12:00 pm") &&
      timeInMinutes < parseTime("6:00 pm")
    ) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier === "pm" && hours !== 12) hours += 12;
    if (modifier === "am" && hours === 12) hours = 0;

    return hours * 60 + minutes; // Convert to total minutes for easy comparison
  };

  // Function to convert date string to Date object (adjust format as needed)
  const parseDate = (dateStr) => {
    return new Date(dateStr); // Assumes 'dateStr' is in a parseable date format
  };
  const startDay = 1;
  // Group and merge activities and transports by date and categorize by time period
  const groupAndMergeByDateAndPeriod = () => {
    // Combine all transport data
    const allTransport = [
      ...userItineraryFlight.map((transport) => ({
        ...transport,
        types: "flight",
      })),
      ...userItineraryBus.map((transport) => ({ ...transport, types: "bus" })),
      ...userItineraryCarRental.map((transport) => ({
        ...transport,
        types: "car rental",
      })),
      ...userItineraryOtherTransport.map((transport) => ({
        ...transport,
        types: "other transport",
      })),
    ];

    // Add type for activities
    const allActivities = userItineraryActivity.map((activity) => ({
      ...activity,
      types: "activity",
    }));

    // Merge activities and transports
    const mergedData = [...allActivities, ...allTransport];

    // Group by date and time period (morning, afternoon, evening)
    let groupedByDateAndPeriod = mergedData.reduce((acc, item) => {
      const date = item.date;
      const day = item.day; // Assuming day is available on the item object
      const period = getTimePeriod(item.time);

      // Skip the item if it's "Day 0"
      if (day === "Day 0") {
        return acc; // Skip this item
      }

      // Initialize the day and period objects if not already present
      if (!acc[date]) {
        acc[date] = { day, morning: [], afternoon: [], evening: [] };
      }

      acc[date][period].push(item); // Push the item into the respective period (morning, afternoon, evening)

      return acc;
    }, {});

    // Convert the grouped data's keys to an array of sorted dates
    const sortedDates = Object.keys(groupedByDateAndPeriod).sort((a, b) => {
      return parseDate(a) - parseDate(b);
    });

    // Create a sorted grouped data object
    const sortedGroupedData = {};
    sortedDates.forEach((date) => {
      sortedGroupedData[date] = groupedByDateAndPeriod[date];

      // Sort each group by time within its period
      ["morning", "afternoon", "evening"].forEach((period) => {
        sortedGroupedData[date][period].sort(
          (a, b) => parseTime(a.time) - parseTime(b.time),
        );
      });
    });

    return sortedGroupedData;
  };

  const groupedData = groupAndMergeByDateAndPeriod();
  console.log("group ", groupedData);

  // Group the items by day
  const groupedByDay = userItineraryActivity.reduce((acc, activity) => {
    const day = parseInt(activity.day.replace("Day ", ""), 10);
    const period = activity.period
      ? activity.period.toLowerCase().split(" ")[0]
      : "";

    // Initialize the day and activities array if not already present
    acc[day] = acc[day] || { day: day, activities: [] };

    // Handle custom property names, assigning defaults for missing periods
    const customNames = periodPropertyNames[period] || {
      id: "genericid",
      activity: "genericactivity",
      place: "genericplace",
      comment: "genericcomment",
      date: "date",
    };
    const customActivity = {};

    // Map custom property names to activity data
    Object.entries(customNames).forEach(([key, customName]) => {
      customActivity[customName] = activity[key];
    });

    customActivity.time = activity.time; // Add time to sort later
    customActivity.period = period; // Add period to sort by period

    acc[day].activities.push(customActivity);

    return acc;
  }, {});

  // Sort the activities within each day by period and then by time
  Object.values(groupedByDay).forEach((dayObj) => {
    dayObj.activities.sort((a, b) => {
      // Sort by period
      const periodComparison =
        periodOrder.indexOf(a.period) - periodOrder.indexOf(b.period);

      if (periodComparison !== 0) {
        return periodComparison;
      }

      // If periods are the same, sort by time
      return parseTime(a.time) - parseTime(b.time);
    });
  });
  // Convert the keys to an array, sort them, and create a new array with sorted keys and data
  const sortedKeys = Object.keys(groupedByDay)
    .map(Number)
    .sort((a, b) => a - b);
  const sortedGroupedByDay = sortedKeys.map((key) => groupedByDay[key]);
  const data = sortedGroupedByDay;
  console.log("ZZData Overview: ", data);

  // Filter and sort data by day and combine activities and transport
  const filteredData = data
    .filter((item) => item.day >= startDay) // Filter starting from startDay
    .sort((a, b) => a.day - b.day); // Sort by day in ascending order

  const messages = [
    "Hold up, we're putting together your travel plan...",
    "Figuring out the cities you'll hit...",
    "Sorting out the attractions for you to check out...",
    "Grabbing the travel routes for your journey...",
    "Fine-tuning your itinerary to make it even better...",
    "Hang tight while we make sure your trip is top-notch",
  ];

  const [text, setText] = useState(messages[0]);

  const getProcessedImageUrl = (image) => {
    let imageUrl = "";
    let url = "https://halaltravel.ai/ht";

    if (image) {
      if (image.indexOf("/") > -1) {
        // If the image path contains a "/", use the coverimage API endpoint
        imageUrl = url + `/api/chatgpt/user/itinerary/coverimage` + image;
      } else {
        // Otherwise, use the restaurant images API endpoint
        imageUrl = url + `/api/restaurant/images/` + image;
      }
    }

    return imageUrl;
  };

  useEffect(() => {
    axios
      .get(`https://halaltravel.ai/ht/api/profile/${creatorId}`)
      .then((response) => {
        const data = response.data;
        const profileImage = data.profileImage;
        const userName = data.userName;

        setProfileImagePath(profileImage);
        setUserName(userName);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching profile data:", error);
      });
  }, [userId]);

  const [showAllDays, setShowAllDays] = useState(false); // State to handle button click

  // Function to toggle the visibility of all days
  const handleShowAllDays = () => {
    setShowAllDays(true);
  }; // Function to toggle between showing all days and showing only the first 3 days
  const handleToggleDays = () => {
    setShowAllDays((prevState) => !prevState); // Toggle between true and false
  };

  console.log("itineraryyy", userItineraryBus);

  // Utility function to group by date
  const groupByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const [groupedItinerary, setGroupedItinerary] = useState({}); // Initialize groupedItinerary

  const [activityId, setActivityId] = useState(null);

  const [activeFlightId, setActiveFlightId] = useState(null);
  const [activeCarId, setActiveCarId] = useState(null);
  const [activeBusId, setActiveBusId] = useState(null);
  const [activeOtherId, setActiveOtherId] = useState(null);

  // Function to toggle visibility of a specific flight by its id
  const toggleDetailsFlight = (id) => {
    setActiveFlightId((prevId) => (prevId === id ? null : id)); // If clicked again, close it; otherwise, open
  };

  const toggleDetailsCar = (id) => {
    setActiveCarId((prevId) => (prevId === id ? null : id)); // If clicked again, close it; otherwise, open
  };

  const toggleDetailsBus = (id) => {
    setActiveBusId((prevId) => (prevId === id ? null : id)); // If clicked again, close it; otherwise, open
  };

  const toggleDetailsOther = (id) => {
    setActiveOtherId((prevId) => (prevId === id ? null : id)); // If clicked again, close it; otherwise, open
  };

  const [currentPage, setCurrentPage] = useState(0); // Start at the first set of days
  const itemsPerPage = 3; // Show 3 items per page

  // Calculate the current slice of data to show
  const currentItems = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredData.length) {
      setCurrentPage((prevPage) => prevPage + 1); // Move to the next page
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1); // Move to the previous page
    }
  };

  const scrollToDay = (day) => {
    const element = document.getElementById(`day-${day}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatDate = (receivedDate, day) => {
    const currentDate = new Date(receivedDate);
    const updatedDate = new Date(currentDate.getTime());
    const year = updatedDate.getFullYear();

    updatedDate.setDate(updatedDate.getDate() + day - 1);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
    const month = String(updatedDate.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(updatedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${dayOfMonth}`;
  };

  const getNextDayDate = (dateString) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dayOfMonth = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${dayOfMonth}`;
  };

  return (
    <>
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
            <a href="/legacy/my-travelplan">My Travel Plan</a>.
          </div>
        </div>
      )}

      {/*Mobile View*/}
      <div className="lg:hidden lg:max-h-0 lg:overflow-hidden absolute visible lg:invisible lg:hidden bg-[#EAEBEF] flex flex-col items-center justify-start mx-[auto] w-[100%]">
        <HeaderOTA
          openPopup1={openPopup1}
          className="relative hidden lg:visible"
        />
        <HeaderOTAMobileEpic
          openPopup1={openPopup1}
          className="relative hidden md:visible"
        />
        <LoginPage
          isOpen={isPopup1Open}
          openPopup2={openPopup2}
          closePopup1={closePopup1}
        />
        <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
        {/* <hr></hr> */}

        <div className="mt-[1px] bg-white  w-[100%]  ">
          <div className=" mx-[30px] my-4">
            <text className="w-[100%] font-sans text-[#000000] text-[55px] font-bold leading-9	">
              {title}
            </text>
          </div>

          <Row className="mt-[40px] mx-[30px] my-1 space-x-12 font-sans text-[40px] font-semibold overflow-y-auto max-h-96 md:max-h-none">
            {/* <text>Information</text> */}
            <text
              className={`cursor-pointer ${activeText === "Itinerary Plan" ? "text-[#00A19A] border-b-2 border-[#00A19A] " : ""}`}
              onClick={() => handleTextClick("Itinerary Plan")}
            >
              Itinerary Plan
            </text>
            {/* <text
                            onClick={() => {
                                //  setIsPopup1Open(true);

                                const dataToPass = {
                                    location: destination,
                                    startDate: startDate,
                                    day: day
                                };

                                //clear
                                localStorage.removeItem("INTINERARY_" + itineraryId + "_STARTDATE");
                                localStorage.removeItem("INTINERARY_" + itineraryId + "_DAY");

                                navigate(`/itinerary-save/${creatorId}/${itineraryId}/${itineraryTitle}/editableView`, { state: dataToPass });

                                ;
                            }}
                        >Adjust Itinerary
                        </text> */}
            {/* <text>Explore Plan</text> */}
          </Row>
        </div>

        {!isLoading ? (
          Object.keys(groupedData).length === 0 ? (
            // Message when the data array is empty
            <div className="flex w-full h-[500px] justify-center items-start text-center py-20">
              <span className="text-gray-500 font-medium py-20">
                No activities found. <br /> Start adding your activities in the
                Editable View.
              </span>
            </div>
          ) : (
            <div className="mx-[30px] ">
              <div className=" bg-white w-[100%] text-[#1F1F1F] mt-[30px] px-12 py-10 font-sans">
                <div>
                  <div className="text-[50px] font-bold  mt-4">
                    Activity Box
                  </div>
                  <div className="relative my-3">
                    {/* Scrollable Row */}
                    <Row
                      className="mt-6 flex overflow-x-auto ml-[80px]"
                      id="activityRow"
                    >
                      {currentItems.map((item) => (
                        <div className="w-[100%] " key={item.day}>
                          <div className="flex">
                            <LiaEdit className="w-16 h-16 mt-2" />
                            <div
                              key={item.day}
                              onClick={() => scrollToDay(item.day)}
                              className="text-[40px] font-bold mt-3"
                            >
                              Day {item.day}
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
                      className={`absolute left-0 top-[60%] bg-white rounded-full p-2 transform -translate-y-1/2 ${currentPage === 0 ? "opacity-100 cursor-not-allowed" : ""}`}
                    >
                      <IoIosArrowBack className="w-6 h-6" />
                    </button>

                    {/* Right (Next) Button */}
                    <button
                      onClick={handleNextPage}
                      disabled={
                        !data || (currentPage + 1) * itemsPerPage >= data.length
                      }
                      className={`absolute right-0 top-[60%] bg-white rounded-full p-2 transform -translate-y-1/2 ${!data || (currentPage + 1) * itemsPerPage >= data.length ? "opacity-100 cursor-not-allowed" : ""}`}
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
                  <div className="flex w-[100%] items-center text-center justify-center">
                    <IconifyIcon
                      icon="mingcute:ai-fill"
                      style={{ color: "white", fontSize: "54px" }}
                    />
                    <text className="ml-3">Create New With AI</text>
                  </div>
                </Button>
              </Row>

              {showModalItinerary ? (
                <>
                  <div className="font-sans fixed bg-gray-50 xs:top-[10vh] lg:top-0 rounded-3xl cursor-pointer text-center justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px]  flex-nowrap overflow-x-hidden overflow-y-auto scrollbar-hide inset-0 z-50 outline-none focus:outline-none">
                    {/*Content*/}

                    <Column className="sm:w-[100%] sm:h-[100%] lg:w-[100%] lg:h-fit">
                      <Row className="text-end items-end justify-end">
                        <FaTimes
                          className="mr-4 mt-6 sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                          onClick={() => {
                            setshowModalItinerary(false);
                            setCreateTPButtonClicked(false);
                          }}
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
                          }}
                        >
                          <div>Generate with AI</div>
                          <div className="items-end justify-between text-end ">
                            <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                          </div>
                        </button>
                      </p>
                      <p className="px-4 text-center py-1">
                        <button
                          className="sm:w-[600px] lg:w-[300px] hover:bg-[#00A19A] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                          onClick={handleNavigate}
                        >
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

              {isShowAI && (
                <ShowAI
                  openPopup1={openPopup1}
                  closePopup1={closePopup1}
                  closeShowAI={closeShowAI}
                  showAI={isShowAI}
                  backShowAI={backShowAI}
                />
              )}

              <Row className="w-[100%] mt-[30px]">
                <div className=" bg-white w-[100%] h-[fit]">
                  <Row className="">
                    <Row className="w-[50%]">
                      <div className="mx-6 my-4 flex">
                        <img
                          class="w-24 h-24 rounded-full"
                          src={profileImage}
                          alt="Rounded avatar"
                        />
                        <text className="ml-7 mt-1 font-bold text-[30px] font-sans">
                          {userName}
                        </text>
                      </div>
                    </Row>
                    <Row className="justify-end w-[50%] mx-6 my-6  space-x-5">
                      <button onClick={() => loginStatus(isBookmarked)}>
                        {isBookmarked ? (
                          <PiBookmarkSimpleFill class="w-16 h-16" />
                        ) : (
                          <PiBookmarkSimpleLight class="w-16 h-16" />
                        )}
                      </button>
                      {/* <BiSolidFilePdf class="w-16 h-16" /> */}
                      <IoMdShare class="w-16 h-16" onClick={handleShareClick} />
                    </Row>
                  </Row>

                  <div>
                    <img
                      class="object-cover object-center w-[100%] h-[35vh] brightness-75 "
                      src={coverImage}
                      alt="Rounded avatar"
                    />
                  </div>

                  <Row className="mx-6 my-4 flex overflow-x-auto whitespace-nowrap">
                    <div className="flex text-[#7C7C7C] space-x-2">
                      <a
                        href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fflights`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Row>
                          <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full">
                            <Icon path={mdiAirplane} size={2.5} />
                          </div>
                          <span className="font-bold text-[36px] font-sans ml-4 mt-3 mr-6">
                            Flight
                          </span>
                        </Row>
                      </a>
                      <a
                        href="https://online.ktmb.com.my"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Row>
                          <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full">
                            <Icon path={mdiTrain} size={2.5} />
                          </div>
                          <span className="font-bold text-[36px] font-sans ml-4 mt-3 mr-6">
                            Train
                          </span>
                        </Row>
                      </a>
                      {baseURL === "https://vm.epictravel.ai" ||
                      baseURL === "http://localhost:3000" ? (
                        <a>
                          <Row>
                            <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full common-pointer">
                              <Icon path={mdiBus} size={2.5} />
                            </div>
                            <span className="font-bold text-[36px] font-sans ml-4 mt-3 mr-6">
                              Bus
                            </span>
                          </Row>
                        </a>
                      ) : (
                        <a
                          href="https://gohub.com.my"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Row>
                            <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full common-pointer">
                              <Icon path={mdiBus} size={2.5} />
                            </div>
                            <span className="font-bold text-[36px] font-sans ml-4 mt-3 mr-6">
                              Bus
                            </span>
                          </Row>
                        </a>
                      )}
                      <a
                        href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fcars`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Row>
                          <div className="bg-[#E8E8E8] w-20 h-20 flex items-center justify-center rounded-full">
                            <Icon path={mdiTaxi} size={2.5} />
                          </div>
                          <span className="font-bold text-[36px] font-sans ml-4 mt-3">
                            Car
                          </span>
                        </Row>
                      </a>
                    </div>
                  </Row>

                  <div className="mx-6 my-6 font-sans text-[36px] mb-6">
                    <text className=" ">Overview : {description}</text>
                    {/* <text className='font-bold text-[#2A3075]'> See More</text> */}
                  </div>

                  {Object.entries(groupedData).map(([date, data], index) => (
                    <React.Fragment key={index}>
                      <div
                        className="flex items-center"
                        id={`day-${data.day}`}
                        key={data.day}
                      >
                        <span className="flex-grow-[0.03] h-px bg-gray-400"></span>
                        <span className="px-4  font-sans text-[46px] font-semibold">
                          {data.day} : {date}
                        </span>
                        <span className="flex-grow h-px bg-gray-400"></span>
                      </div>
                      {/* Morning Section */}
                      {groupedData[date].morning.length > 0 && (
                        <>
                          <div className="w-[60%] h-[6vh] bg-[#F5F5F5] my-10 flex px-6 pt-6 ">
                            <IoIosPartlySunny class="text-[#00A19A] w-14 h-14 mr-2" />
                            <text className="font-bold text-[#00A19A] text-[46px] font-sans">
                              {" "}
                              Morning Activity
                            </text>
                          </div>

                          {groupedData[date].morning.map((item, idx) => (
                            <div key={idx}>
                              {/* Check if item is an activity */}
                              {item.types === "activity" && (
                                <div class="w-[95%] flex mx-6">
                                  <div className="w-[100%] ">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.activity
                                        ? item.activity
                                            .charAt(0)
                                            .toUpperCase() +
                                          item.activity
                                            .slice(1)
                                            .replace(item.place || "", "")
                                        : ""}{" "}
                                      {item.place
                                        ? item.place.length > 30
                                          ? item.place.substring(0, 30) + "..."
                                          : item.place
                                        : ""}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.place
                                          ? item.place.length > 30
                                            ? item.place.substring(0, 30) +
                                              "..."
                                            : item.place
                                          : ""}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.activity
                                        ? item.activity.replace(
                                            item.place || "",
                                            "",
                                          )
                                        : ""}{" "}
                                      <span
                                        className="text-[#008009] underline"
                                        style={{ fontStyle: "italic" }}
                                      >
                                        <Link
                                          to={{
                                            pathname: `/travelplan/blog/display/${creatorId}/${item.place}/${itineraryId}`,
                                            state: { itineraryId },
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.place}
                                        </Link>
                                      </span>
                                      . {item.comment}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a bus */}
                              {item.types === "bus" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiBus}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a flight */}
                              {item.types === "flight" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiAirplane}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <br></br>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a car rental */}
                              {item.types === "car rental" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTaxi}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0 ? "Pickup" : "Drop-off"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is another transport type */}
                              {item.types === "other transport" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTrainCar}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      )}

                      {/* afternoon Section */}
                      {groupedData[date].afternoon.length > 0 && (
                        <>
                          <div className="w-[60%] h-[6vh] bg-[#F5F5F5] my-10 flex px-6 pt-6 ">
                            <IoSunny class="text-[#00A19A] w-14 h-14 mr-2 mt-2" />
                            <text className="font-bold text-[#00A19A] text-[46px] font-sans">
                              {" "}
                              Afternoon Activity
                            </text>
                          </div>

                          {groupedData[date].afternoon.map((item, idx) => (
                            <div key={idx}>
                              {/* Check if item is an activity */}
                              {item.types === "activity" && (
                                <div class="w-[95%] flex mx-6">
                                  <div className="w-[100%] ">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans ">
                                      {item.time} -{" "}
                                      {item.activity
                                        ? item.activity
                                            .charAt(0)
                                            .toUpperCase() +
                                          item.activity
                                            .slice(1)
                                            .replace(item.place || "", "")
                                        : ""}{" "}
                                      {item.place
                                        ? item.place.length > 30
                                          ? item.place.substring(0, 30) + "..."
                                          : item.place
                                        : ""}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.place
                                          ? item.place.length > 30
                                            ? item.place.substring(0, 30) +
                                              "..."
                                            : item.place
                                          : ""}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.activity
                                        ? item.activity.replace(
                                            item.place || "",
                                            "",
                                          )
                                        : ""}{" "}
                                      <span
                                        className="text-[#008009] underline"
                                        style={{ fontStyle: "italic" }}
                                      >
                                        <Link
                                          to={{
                                            pathname: `/travelplan/blog/display/${creatorId}/${item.place}/${itineraryId}`,
                                            state: { itineraryId },
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.place}
                                        </Link>
                                      </span>
                                      . {item.comment}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a bus */}
                              {item.types === "bus" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiBus}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a flight */}
                              {item.types === "flight" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiAirplane}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <br></br>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a car rental */}
                              {item.types === "car rental" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTaxi}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0 ? "Pickup" : "Drop-off"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is another transport type */}
                              {item.types === "other transport" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTrainCar}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      )}

                      {/* evening Section */}
                      {groupedData[date].evening.length > 0 && (
                        <>
                          <div className="w-[60%] h-[6vh] bg-[#F5F5F5] my-10 flex px-6 pt-6">
                            <WiMoonAltNew class="text-[#00A19A] w-14 h-14 mr-2 mt-2" />
                            <text className="font-bold text-[#00A19A] text-[46px] font-sans">
                              {" "}
                              Evening Activity
                            </text>
                          </div>

                          {groupedData[date].evening.map((item, idx) => (
                            <div key={idx}>
                              {/* Check if item is an activity */}
                              {item.types === "activity" && (
                                <div class="w-[95%] flex mx-6">
                                  <div className="w-[100%] ">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.activity
                                        ? item.activity
                                            .charAt(0)
                                            .toUpperCase() +
                                          item.activity
                                            .slice(1)
                                            .replace(item.place || "", "")
                                        : ""}{" "}
                                      {item.place
                                        ? item.place.length > 30
                                          ? item.place.substring(0, 30) + "..."
                                          : item.place
                                        : ""}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.place
                                          ? item.place.length > 30
                                            ? item.place.substring(0, 30) +
                                              "..."
                                            : item.place
                                          : ""}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.activity
                                        ? item.activity.replace(
                                            item.place || "",
                                            "",
                                          )
                                        : ""}{" "}
                                      <span
                                        className="text-[#008009] underline"
                                        style={{ fontStyle: "italic" }}
                                      >
                                        <Link
                                          to={{
                                            pathname: `/travelplan/blog/display/${creatorId}/${item.place}/${itineraryId}`,
                                            state: { itineraryId },
                                          }}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {item.place}
                                        </Link>
                                      </span>
                                      . {item.comment}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a bus */}
                              {item.types === "bus" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiBus}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a flight */}
                              {item.types === "flight" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiAirplane}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <br></br>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is a car rental */}
                              {item.types === "car rental" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTaxi}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0 ? "Pickup" : "Drop-off"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Check if item is another transport type */}
                              {item.types === "other transport" && (
                                <div class="my-4 w-[100%] mx-6">
                                  <div className="w-[5%]">
                                    <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTrainCar}
                                        size={2.5}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[100%]">
                                    <text className="font-bold text-[#111111BF] text-[46px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3">
                                      <text className="font-bold text-[#000000] text-[46px] font-sans">
                                        {item.title}
                                      </text>
                                    </div>
                                    <text className="text-[#000000] text-[36px] font-sans">
                                      {item.note ||
                                        "No additional notes available."}
                                    </text>

                                    <div className="text-center w-[60%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[24px] font-sans">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[24px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>
                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          {filteredData.map(
                            (item, index) =>
                              index === 0 && (
                                <div className="">
                                  {(() => {
                                    const currentDate = new Date(
                                      receivedData.date,
                                    );
                                    const updatedDate = new Date(
                                      currentDate.getTime(),
                                    );
                                    updatedDate.setDate(
                                      updatedDate.getDate() + item.day - 1,
                                    );

                                    // Format the date as "YYYY-MM-DD"
                                    const formattedDate1 = formatDate1(
                                      receivedData.date,
                                      item.day,
                                    );
                                    const formattedDate2 = getNextDayDate(
                                      formatDate1(receivedData.date, item.day),
                                    );

                                    return (
                                      <div className="my-4 w-[100%] mx-6">
                                        <div className="w-[5%]">
                                          <div className="bg-[#D2D2D2] w-20 h-20 flex items-center justify-center rounded-full">
                                            <FaHotel
                                              color="#00A19A"
                                              size={40}
                                              alt="route"
                                            />
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
                                                if (
                                                  receivedData.message ===
                                                  "Forest City"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Forest-City-Marina-Hotel,Gelang-Patah,Malaysia-p2664154-h2767708/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Perak"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Perak,Malaysia-p21085/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Sabah"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sabah,Malaysia-p21083/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Pahang"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Pahang,Malaysia-p21086/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Penang"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Penang,Malaysia-p247880/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Sarawak"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sarawak,Malaysia-p21082/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Kedah"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kedah,Malaysia-p21092/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Selangor"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Selangor,Malaysia-p21081/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Negeri Sembilan"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Negeri-Sembilan,Malaysia-p21087/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Kelantan"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kelantan-p21088/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else {
                                                  let encodedCityName =
                                                    encodeURIComponent(
                                                      receivedData.message,
                                                    );
                                                  urlmain = `http://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/${encodedCityName}/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                }

                                                return (
                                                  <a
                                                    href={urlmain}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
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
                              ),
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </Row>
            </div>
          )
        ) : (
          <div className="h-[100%] w-[100%] mt-30 flex items-center justify-center flex-col py-5">
            <span
              style={{ fontSize: "20px", fontWeight: "normal" }}
              className="mb-5"
            >
              {text}
            </span>
            <CircularProgress size={20} sx={{ color: "black" }} />
          </div>
        )}
      </div>

      {/*Web View*/}
      {/* <div className="absolute invisible lg:visible bg-[#EAEBEF] flex flex-col items-center justify-start mx-[auto] w-[100%]">
                <HeaderOTA openPopup1={openPopup1} className=" hidden lg:visible" />
                <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
                <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} /> */}
      {/* <hr></hr> */}
      <div className="fixed w-full" style={{ zIndex: 2 }}>
        <HeaderOTA openPopup1={openPopup1} className=" invisible lg:visible" />
        <LoginPage
          isOpen={isPopup1Open}
          openPopup2={openPopup2}
          closePopup1={closePopup1}
        />
        <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
        <HeaderOTAMobile
          openPopup1={openPopup1}
          className="visible fixed overflow-hidden lg:invisible lg:hidden"
        />
      </div>
      {/* try */}

      <div className="absolute invisible lg:visible bg-gray-60 h-[fit] items-center justify-start mx-[auto] w-[100%] xs:pt-[160px] lg:pt-[92px]">
        <div
          className={`mt-[1px] bg-white w-full ${isVisible ? "block" : "hidden"}`}
        >
          <div className=" mx-[70px] py-4">
            <text className="w-[100%] font-sans text-[#000000] text-[28px] font-semibold leading-9	">
              {title}
            </text>
          </div>

          <Row className="mx-[70px] my-1 space-x-10 font-sans text-[16px] font-semibold">
            {/* <div
                            className={`cursor-pointer ${activeText === 'Information' ? 'text-[#00398D] border-b-2 border-[#00398D]' : ''}`}
                            onClick={() => handleTextClick('Information')}
                        >
                            Information
                        </div> */}
            <div
              className={`cursor-pointer ${activeText === "Itinerary Plan" ? "text-[#00A19A] border-b-2 border-[#00A19A] " : ""}`}
              onClick={() => handleTextClick("Itinerary Plan")}
            >
              Itinerary Plan
            </div>
            {/* <div
                            className={`cursor-pointer ${activeText === 'Adjust Itinerary' ? 'text-[#00398D] border-b-2 border-[#00398D]' : ''}`}
                            //onClick={() => handleTextClick('Adjust Itinerary')}
                            onClick={() => {
                                //  setIsPopup1Open(true);

                                const dataToPass = {
                                    location: destination,
                                    startDate: startDate,
                                    day: day
                                };

                                //clear
                                localStorage.removeItem("INTINERARY_" + itineraryId + "_STARTDATE");
                                localStorage.removeItem("INTINERARY_" + itineraryId + "_DAY");

                                navigate(`/itinerary-save/${creatorId}/${itineraryId}/${itineraryTitle}/editableView`, { state: dataToPass });

                                ;
                            }}
                        >
                            Adjust Itinerary
                        </div> */}
            {/* <div
                            className={`cursor-pointer ${activeText === 'Explore Plan' ? 'text-[#00398D] border-b-2 border-[#00398D]' : ''}`}
                            onClick={() => handleTextClick('Explore Plan')}
                        >
                            Explore Plan
                        </div> */}
          </Row>
        </div>

        <Row className="w-[100%] mt-[25px] h-[fit]">
          {!isLoading ? (
            Object.keys(groupedData).length === 0 ? (
              // Message when the data array is empty
              <div className="flex w-full h-[500px] justify-center items-start text-center py-20">
                <span className="text-gray-500 font-medium py-20">
                  No activities found. <br /> Start adding your activities in
                  the Editable View.
                </span>
              </div>
            ) : (
              <>
                <div className=" bg-white w-[64%] ml-[70px] mr-[0px] h-[fit] ">
                  <Row className="">
                    <Row className="w-[50%]">
                      <div>
                        <a
                          href={`/legacy/influencer-creator/${creatorId}`}
                          className="mx-6 my-4 flex cursor-pointer"
                        >
                          <img
                            className="w-12 h-12 rounded-full object-cover object-center brightness-75"
                            src={profileImage}
                            alt="Rounded avatar"
                          />
                          <span className="ml-3 mt-1 font-bold text-[16px] font-sans">
                            {userName}
                          </span>
                        </a>
                      </div>
                    </Row>
                    <Row className="justify-end w-[50%] mx-6 my-6  space-x-3">
                      <button onClick={() => loginStatus(isBookmarked)}>
                        {isBookmarked ? (
                          <PiBookmarkSimpleFill class="w-8 h-8" />
                        ) : (
                          <PiBookmarkSimpleLight class="w-8 h-8" />
                        )}
                      </button>
                      {/* <BiSolidFilePdf class="w-7 h-7" /> */}
                      <IoMdShare
                        class="w-7 h-7 common-pointer"
                        onClick={handleShareClick}
                      />
                    </Row>

                    {isLinkBtnPrivate &&
                      ReactDOM.createPortal(
                        <LinkBtnPrivate
                          closePopup3={closePopup3}
                          creatorId={userId}
                          itineraryId={itineraryId}
                          title={title}
                          //itineraryLink={itineraryLink}
                          itineraryLink={
                            baseURL +
                            `/itinerary/${userId}/${itineraryId}/${encodeURIComponent(title)}`
                          }
                          modalVisible={isLinkBtnPrivate}
                        />,
                        document.body,
                      )}
                  </Row>

                  <div>
                    <img
                      class="object-cover object-center w-[100%] h-[35vh] brightness-75 "
                      src={coverImage}
                      alt="Cover image"
                    />
                  </div>

                  <Row class="mx-6 my-4 flex">
                    <div className="flex text-[#7C7C7C] space-x-2">
                      {/* <a href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fflights`} target="_blank" rel="noopener noreferrer">
                                                <Row>
                                                    <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                                                        <FaHotel size={18} />
                                                    </div>
                                                    <text className='font-bold text-[16px] font-sans ml-2 mt-1 mr-3'>
                                                        Hotel
                                                    </text>
                                                </Row>
                                            </a> */}
                      <a
                        href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fflights`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Row>
                          <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                            <Icon path={mdiAirplane} size={1} />
                          </div>
                          <text className="font-bold text-[16px] font-sans ml-2 mt-1 mr-3">
                            Flight
                          </text>
                        </Row>
                      </a>
                      <a
                        href="https://online.ktmb.com.my"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Row>
                          <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                            <Icon path={mdiTrain} size={1} />
                          </div>
                          <text className="font-bold text-[16px] font-sans ml-2 mt-1 mr-3">
                            Train
                          </text>
                        </Row>
                      </a>
                      {baseURL === "https://vm.epictravel.ai" ||
                      "http://localhost:3000" ? (
                        <a>
                          <Row>
                            <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full common-pointer">
                              <Icon path={mdiBus} size={1} />
                            </div>
                            <text className="font-bold text-[16px] font-sans ml-2 mt-1 mr-3">
                              Bus
                            </text>
                          </Row>
                        </a>
                      ) : (
                        <a
                          href="https://gohub.com.my"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Row>
                            <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full common-pointer">
                              <Icon path={mdiBus} size={1} />
                            </div>
                            <text className="font-bold text-[16px] font-sans ml-2 mt-1 mr-3">
                              Bus
                            </text>
                          </Row>
                        </a>
                      )}
                      <a
                        href={`https://kayak.com.my/in?a=kan_262812_573418&encoder=27_1&enc_cid=${creatorId}&lc=en&url=%2Fcars`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Row>
                          <div className="bg-[#E8E8E8] w-8 h-8 flex items-center justify-center rounded-full">
                            <Icon path={mdiTaxi} size={1} />
                          </div>
                          <text className="font-bold text-[16px] font-sans ml-2 mt-1">
                            Car
                          </text>
                        </Row>
                      </a>
                    </div>
                  </Row>

                  <div className="mx-6 my-4 font-sans text-[16px] mb-6">
                    <text className=" ">Overview : {description} </text>
                    {/* <text className='font-bold text-[#2A3075]'> See More</text> */}
                  </div>

                  {Object.entries(groupedData).map(([date, data], index) => (
                    <React.Fragment key={index}>
                      <div
                        className="flex items-center mt-4"
                        id={`day-${data.day}`}
                        key={data.day}
                      >
                        <span className="flex-grow-[0.03] h-px bg-gray-400"></span>
                        <span className="px-4 font-sans text-[18px] font-semibold">
                          {data.day}: {date}{" "}
                        </span>
                        <span className="flex-grow h-px bg-gray-400"></span>
                      </div>

                      {/* Morning Section */}
                      {groupedData[date].morning.length > 0 && (
                        <>
                          <div className="w-[30%] h-[8vh] bg-[#F5F5F5] my-6 flex px-6 pt-3">
                            <IoIosPartlySunny class="text-[#00A19A] w-7 h-7 mr-2" />
                            <text className="font-bold text-[#00A19A] text-[20px] font-sans ">
                              {" "}
                              Morning Activity
                            </text>
                          </div>

                          {groupedData[date].morning.map((item, idx) => (
                            <div key={idx}>
                              {/* Check if item is an activity */}
                              {item.types === "activity" && (
                                <>
                                  <div class=" w-[100%] flex px-6">
                                    <div className="w-[5%]"></div>
                                    <div className="w-[95%] pl-6">
                                      <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                        {item.time} -{" "}
                                        {item.activity
                                          ? item.activity
                                              .charAt(0)
                                              .toUpperCase() +
                                            item.activity
                                              .slice(1)
                                              .replace(item.place || "", "")
                                          : ""}{" "}
                                        {item.place || ""}
                                      </text>
                                      <br />
                                      <div className="my-3 flex">
                                        <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                          {item.place || ""}
                                        </text>
                                        <AddtoBtn2
                                          setActivityId={handleSetActivityId}
                                          activityId={item.id}
                                          openPopup44={openPopup44}
                                          openPopup1={openPopup1}
                                          className="ml-3 "
                                        />

                                        <AddtoContentOld
                                          setActivityId={handleSetActivityId}
                                          activityId={activityId}
                                          showAddtoContentOld={
                                            showAddtoContentOld
                                          }
                                          openPopup55={openPopup55}
                                          closePopup55={closePopup55}
                                          closePopup44={closePopup44}
                                        />

                                        <CreateNewItinerary
                                          showCreateNewItinerary={
                                            showCreateNewItinerary
                                          }
                                          activityId={activityId}
                                          closePopup55={closePopup55}
                                          closePopup44={closePopup44}
                                        />

                                        <AddtoContentNew
                                          showAddtoContentNew={
                                            showAddtoContentNew
                                          }
                                          openPopup55={openPopup55}
                                          closePopup55={closePopup55}
                                          closePopup33={closePopup33}
                                        />
                                      </div>
                                      <text className="text-[#000000] text-[16px] font-sans">
                                        {item.activity
                                          ? item.activity.replace(
                                              item.place || "",
                                              "",
                                            )
                                          : ""}{" "}
                                        <span
                                          className="text-[#008009] underline"
                                          style={{ fontStyle: "italic" }}
                                        >
                                          <Link
                                            to={{
                                              pathname: `/travelplan/blog/display/${creatorId}/${item.place}/${itineraryId}`,
                                              state: { itineraryId },
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {item.place}
                                          </Link>
                                        </span>
                                        . {item.comment}
                                      </text>

                                      <div className="text-center w-[20%] mt-4">
                                        {item.image ? (
                                          <>
                                            <div className="bg-black">
                                              <img
                                                class=" bg-black object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                                src={getProcessedImageUrl(
                                                  item.image,
                                                )}
                                                alt="image"
                                              />
                                            </div>
                                            <text className="text-[#000000] text-[14px] font-sans">
                                              Recommendation
                                            </text>
                                            <br />
                                            <a
                                              href={getProcessedImageUrl(
                                                item.image,
                                              )}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-[#000000] text-[14px] font-sans underline"
                                            >
                                              See Image
                                            </a>
                                          </>
                                        ) : null}
                                      </div>
                                      <hr className="my-6"></hr>
                                    </div>
                                  </div>
                                </>
                              )}

                              {item.types === "bus" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiBus}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() => toggleDetailsBus(item.id)} // Toggle on click, passing the bus id
                                    >
                                      {activeBusId === item.id
                                        ? "Hide Bus Details"
                                        : "Show Bus Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeBusId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal Location:{" "}
                                          {item.terminalLocation || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Bus Name: {item.busName || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Plate No: {item.plateNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Seat No: {item.seatNo || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {item.types === "flight" && (
                                <div class="  w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiAirplane}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className=" my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() =>
                                        toggleDetailsFlight(item.id)
                                      } // Toggle on click, passing the flight id
                                    >
                                      {activeFlightId === item.id
                                        ? "Hide Flight Details"
                                        : "Show Flight Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeFlightId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.details || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal Location:{" "}
                                          {item.terminalLocation || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Airline: {item.airline || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Flight No: {item.flightNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal: {item.terminal || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Gate: {item.gate || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Seat No: {item.seatNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center  h-[16vh] brightness-75 bg-[#E0E0E0]  w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                              {item.types === "car rental" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTaxi}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0 ? "Pickup" : "Drop-off"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() => toggleDetailsCar(item.id)} // Toggle on click, passing the car rental id
                                    >
                                      {activeCarId === item.id
                                        ? "Hide Car Rental Details"
                                        : "Show Car Rental Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeCarId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Location: {item.location || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Carrier: {item.carrier || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                              {item.types === "other transport" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTrainCar}
                                        size={1}
                                      />{" "}
                                      {/* You can choose a more relevant icon */}
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() =>
                                        toggleDetailsOther(item.id)
                                      } // Toggle on click, passing the id for "other" type
                                    >
                                      {activeOtherId === item.id
                                        ? "Hide Other Transport Details"
                                        : "Show Other Transport Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeOtherId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Location: {item.location || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Carrier: {item.carrier || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Repeat similar structure for other transport types */}
                            </div>
                          ))}
                        </>
                      )}

                      {/* Afternoon Section */}
                      {groupedData[date].afternoon.length > 0 && (
                        <>
                          <div className="w-[30%] h-[8vh] bg-[#F5F5F5] mt-2 mb-6 flex px-6 pt-3">
                            <IoSunny class="text-[#00A19A] w-7 h-7 mr-2 mt-0.5" />
                            <text className="font-bold text-[#00A19A] text-[20px] font-sans ">
                              {" "}
                              Afternoon Activity
                            </text>
                          </div>

                          {groupedData[date].afternoon.map((item, idx) => (
                            <div key={idx}>
                              {/* Check if item is an activity */}
                              {item.types === "activity" && (
                                <>
                                  <div class=" w-[100%] flex px-6">
                                    <div className="w-[5%]"></div>
                                    <div className="w-[95%] pl-6">
                                      <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                        {item.time} -
                                        {item.activity
                                          ? item.activity
                                              .charAt(0)
                                              .toUpperCase() +
                                            item.activity
                                              .slice(1)
                                              .replace(item.place || "", "")
                                          : ""}{" "}
                                        {item.place || ""}
                                      </text>
                                      <br />
                                      <div className="my-3 flex">
                                        <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                          {item.place || ""}
                                        </text>
                                        <AddtoBtn2
                                          setActivityId={handleSetActivityId}
                                          activityId={item.id}
                                          openPopup44={openPopup44}
                                          openPopup1={openPopup1}
                                          className="ml-3 "
                                        />

                                        <AddtoContentOld
                                          setActivityId={handleSetActivityId}
                                          activityId={activityId}
                                          showAddtoContentOld={
                                            showAddtoContentOld
                                          }
                                          openPopup55={openPopup55}
                                          closePopup55={closePopup55}
                                          closePopup44={closePopup44}
                                        />

                                        <CreateNewItinerary
                                          showCreateNewItinerary={
                                            showCreateNewItinerary
                                          }
                                          activityId={activityId}
                                          closePopup55={closePopup55}
                                          closePopup44={closePopup44}
                                        />

                                        <AddtoContentNew
                                          showAddtoContentNew={
                                            showAddtoContentNew
                                          }
                                          openPopup55={openPopup55}
                                          closePopup55={closePopup55}
                                          closePopup33={closePopup33}
                                        />
                                      </div>
                                      <text className="text-[#000000] text-[16px] font-sans">
                                        {item.activity
                                          ? item.activity.replace(
                                              item.place || "",
                                              "",
                                            )
                                          : ""}{" "}
                                        <span
                                          className="text-[#008009] underline"
                                          style={{ fontStyle: "italic" }}
                                        >
                                          <Link
                                            to={{
                                              pathname: `/travelplan/blog/display/${creatorId}/${item.place}/${itineraryId}`,
                                              state: { itineraryId },
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {item.place}
                                          </Link>
                                        </span>
                                        . {item.comment}
                                      </text>

                                      <div className="text-center w-[20%] mt-4">
                                        {item.image ? (
                                          <>
                                            <div className="bg-black">
                                              <img
                                                class=" bg-black object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                                src={getProcessedImageUrl(
                                                  item.image,
                                                )}
                                                alt="image"
                                              />
                                            </div>
                                            <text className="text-[#000000] text-[14px] font-sans">
                                              Recommendation
                                            </text>
                                            <br />
                                            <a
                                              href={getProcessedImageUrl(
                                                item.image,
                                              )}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-[#000000] text-[14px] font-sans underline"
                                            >
                                              See Imagee
                                            </a>
                                          </>
                                        ) : null}
                                      </div>
                                      <hr className="my-6"></hr>
                                    </div>
                                  </div>
                                </>
                              )}

                              {item.types === "bus" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiBus}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() => toggleDetailsBus(item.id)} // Toggle on click, passing the bus id
                                    >
                                      {activeBusId === item.id
                                        ? "Hide Bus Details"
                                        : "Show Bus Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeBusId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal Location:{" "}
                                          {item.terminalLocation || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Bus Name: {item.busName || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Plate No: {item.plateNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Seat No: {item.seatNo || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {item.types === "flight" && (
                                <div class="  w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiAirplane}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className=" my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() =>
                                        toggleDetailsFlight(item.id)
                                      } // Toggle on click, passing the flight id
                                    >
                                      {activeFlightId === item.id
                                        ? "Hide Flight Details"
                                        : "Show Flight Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeFlightId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.details || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal Location:{" "}
                                          {item.terminalLocation || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Airline: {item.airline || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Flight No: {item.flightNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal: {item.terminal || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Gate: {item.gate || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Seat No: {item.seatNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center  h-[16vh] brightness-75 bg-[#E0E0E0]  w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                              {item.types === "car rental" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTaxi}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0 ? "Pickup" : "Drop-off"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() => toggleDetailsCar(item.id)} // Toggle on click, passing the car rental id
                                    >
                                      {activeCarId === item.id
                                        ? "Hide Car Rental Details"
                                        : "Show Car Rental Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeCarId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Location: {item.location || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Carrier: {item.carrier || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                              {item.types === "other transport" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTrainCar}
                                        size={1}
                                      />{" "}
                                      {/* You can choose a more relevant icon */}
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() =>
                                        toggleDetailsOther(item.id)
                                      } // Toggle on click, passing the id for "other" type
                                    >
                                      {activeOtherId === item.id
                                        ? "Hide Other Transport Details"
                                        : "Show Other Transport Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeOtherId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Location: {item.location || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Carrier: {item.carrier || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Repeat similar structure for other transport types */}
                            </div>
                          ))}
                        </>
                      )}

                      {/* Evening Section */}
                      {groupedData[date].evening.length > 0 && (
                        <>
                          <div className="w-[30%] h-[8vh] bg-[#F5F5F5] mt-2 mb-6 flex px-6 pt-3">
                            <WiMoonAltNew class="text-[#00A19A] w-7 h-7 mr-2 mt-0.5" />
                            <text className="font-bold text-[#00A19A] text-[20px] font-sans ">
                              {" "}
                              Evening Activity
                            </text>
                          </div>

                          {groupedData[date].evening.map((item, idx) => (
                            <div key={idx}>
                              {/* Check if item is an activity */}
                              {item.types === "activity" && (
                                <>
                                  <div class=" w-[100%] flex px-6">
                                    <div className="w-[5%]"></div>
                                    <div className="w-[95%] pl-6">
                                      <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                        {item.time} -
                                        {item.activity
                                          ? item.activity
                                              .charAt(0)
                                              .toUpperCase() +
                                            item.activity
                                              .slice(1)
                                              .replace(item.place || "", "")
                                          : ""}{" "}
                                        {item.place || ""}
                                      </text>
                                      <br />
                                      <div className="my-3 flex">
                                        <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                          {item.place || ""}
                                        </text>
                                        <AddtoBtn2
                                          setActivityId={handleSetActivityId}
                                          activityId={item.id}
                                          openPopup44={openPopup44}
                                          openPopup1={openPopup1}
                                          className="ml-3 "
                                        />

                                        <AddtoContentOld
                                          setActivityId={handleSetActivityId}
                                          activityId={activityId}
                                          showAddtoContentOld={
                                            showAddtoContentOld
                                          }
                                          openPopup55={openPopup55}
                                          closePopup55={closePopup55}
                                          closePopup44={closePopup44}
                                        />

                                        <CreateNewItinerary
                                          showCreateNewItinerary={
                                            showCreateNewItinerary
                                          }
                                          activityId={activityId}
                                          closePopup55={closePopup55}
                                          closePopup44={closePopup44}
                                        />

                                        <AddtoContentNew
                                          showAddtoContentNew={
                                            showAddtoContentNew
                                          }
                                          openPopup55={openPopup55}
                                          closePopup55={closePopup55}
                                          closePopup33={closePopup33}
                                        />
                                      </div>
                                      <text className="text-[#000000] text-[16px] font-sans">
                                        {item.activity
                                          ? item.activity.replace(
                                              item.place || "",
                                              "",
                                            )
                                          : ""}{" "}
                                        <span
                                          className="text-[#008009] underline"
                                          style={{ fontStyle: "italic" }}
                                        >
                                          <Link
                                            to={{
                                              pathname: `/travelplan/blog/display/${creatorId}/${item.place}/${itineraryId}`,
                                              state: { itineraryId },
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            {item.place}
                                          </Link>
                                        </span>
                                        . {item.comment}
                                      </text>

                                      <div className="text-center w-[20%] mt-4">
                                        {item.image ? (
                                          <>
                                            <div className="bg-black">
                                              <img
                                                class=" bg-black object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                                src={getProcessedImageUrl(
                                                  item.image,
                                                )}
                                                alt="image"
                                              />
                                            </div>
                                            <text className="text-[#000000] text-[14px] font-sans">
                                              Recommendation
                                            </text>
                                            <br />
                                            <a
                                              href={getProcessedImageUrl(
                                                item.image,
                                              )}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-[#000000] text-[14px] font-sans underline"
                                            >
                                              See Image
                                            </a>
                                          </>
                                        ) : null}
                                      </div>
                                      <hr className="my-6"></hr>
                                    </div>
                                  </div>
                                </>
                              )}

                              {item.types === "bus" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiBus}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() => toggleDetailsBus(item.id)} // Toggle on click, passing the bus id
                                    >
                                      {activeBusId === item.id
                                        ? "Hide Bus Details"
                                        : "Show Bus Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeBusId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal Location:{" "}
                                          {item.terminalLocation || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Bus Name: {item.busName || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Plate No: {item.plateNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Seat No: {item.seatNo || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {item.types === "flight" && (
                                <div class="  w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiAirplane}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.terminalLocation
                                        .charAt(0)
                                        .toUpperCase() +
                                        item.terminalLocation.slice(1)}
                                    </text>
                                    <br />
                                    <div className=" my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() =>
                                        toggleDetailsFlight(item.id)
                                      } // Toggle on click, passing the flight id
                                    >
                                      {activeFlightId === item.id
                                        ? "Hide Flight Details"
                                        : "Show Flight Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeFlightId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.details || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal Location:{" "}
                                          {item.terminalLocation || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Airline: {item.airline || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Flight No: {item.flightNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Terminal: {item.terminal || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Gate: {item.gate || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Seat No: {item.seatNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center  h-[16vh] brightness-75 bg-[#E0E0E0]  w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}
                              {item.types === "car rental" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTaxi}
                                        size={1}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0 ? "Pickup" : "Drop-off"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() => toggleDetailsCar(item.id)} // Toggle on click, passing the car rental id
                                    >
                                      {activeCarId === item.id
                                        ? "Hide Car Rental Details"
                                        : "Show Car Rental Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeCarId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Location: {item.location || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Carrier: {item.carrier || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {item.types === "other transport" && (
                                <div class="w-[100%] flex px-6 ">
                                  <div className="w-[5%] ">
                                    <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                      <Icon
                                        class="text-[#00A19A]"
                                        path={mdiTrainCar}
                                        size={1}
                                      />{" "}
                                      {/* You can choose a more relevant icon */}
                                    </div>
                                  </div>
                                  <div className="w-[95%] pl-6 ">
                                    <text className="font-bold text-[#111111BF] text-[18px] font-sans">
                                      {item.time} -{" "}
                                      {item.type === 0
                                        ? "Departure"
                                        : "Arrival"}{" "}
                                      -{" "}
                                      {item.location.charAt(0).toUpperCase() +
                                        item.location.slice(1)}
                                    </text>
                                    <br />
                                    <div className="my-3 flex ">
                                      <text className="font-bold text-[#000000] text-[18px] font-sans mr-3">
                                        {" "}
                                        {item.title}
                                      </text>
                                    </div>

                                    <text
                                      className="common-pointer text-[#000000] text-[16px] font-sans underline "
                                      onClick={() =>
                                        toggleDetailsOther(item.id)
                                      } // Toggle on click, passing the id for "other" type
                                    >
                                      {activeOtherId === item.id
                                        ? "Hide Other Transport Details"
                                        : "Show Other Transport Details"}{" "}
                                      {/* Toggle text */}
                                    </text>

                                    {activeOtherId === item.id && ( // Conditionally render details if the id matches the active one
                                      <div className="mt-3">
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Note: {item.note || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Location: {item.location || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Booked Through:{" "}
                                          {item.bookedThrough || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Confirmation No:{" "}
                                          {item.confirmationNo || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Carrier: {item.carrier || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Duration: {item.duration || "N/A"}{" "}
                                        </text>
                                        <br />
                                        <text className="text-[#000000] text-[16px] font-sans ">
                                          Timezone: {item.timezone || "N/A"}{" "}
                                        </text>
                                      </div>
                                    )}

                                    <div className="text-center w-[20%] mt-4">
                                      {item.image ? (
                                        <>
                                          <img
                                            class="object-cover object-center h-[16vh] brightness-75 bg-[#E0E0E0] w-[30vh]"
                                            src={getProcessedImageUrl(
                                              item.image,
                                            )}
                                            alt="image"
                                          />
                                          <text className="text-[#000000] text-[14px] font-sans ">
                                            Recommendation
                                          </text>
                                          <br />
                                          <a
                                            href={getProcessedImageUrl(
                                              item.image,
                                            )} // Make sure this is a full URL or a valid path
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#000000] text-[14px] font-sans underline"
                                          >
                                            See Image
                                          </a>
                                        </>
                                      ) : null}
                                    </div>

                                    <hr className="my-6"></hr>
                                  </div>
                                </div>
                              )}

                              {/* Repeat similar structure for other transport types */}
                            </div>
                          ))}
                          {filteredData.map(
                            (item, index) =>
                              index === 0 && ( // Only display for the first item
                                <div>
                                  {(() => {
                                    const currentDate = new Date(
                                      receivedData.date,
                                    );
                                    const updatedDate = new Date(
                                      currentDate.getTime(),
                                    );
                                    const updatedDate1 = new Date(
                                      currentDate.getTime(),
                                    );
                                    updatedDate.setDate(
                                      updatedDate.getDate() + item.day - 1,
                                    );

                                    // Format the date as "YYYY-MM-DD"
                                    const year = updatedDate1.getFullYear();
                                    const month = String(
                                      updatedDate1.getMonth() + 1,
                                    ).padStart(2, "0");
                                    const day = String(
                                      updatedDate1.getDate(),
                                    ).padStart(2, "0");

                                    const year1 = updatedDate.getFullYear();
                                    const month1 = String(
                                      updatedDate.getMonth() + 1,
                                    ).padStart(2, "0");
                                    const day1 = String(
                                      updatedDate.getDate(),
                                    ).padStart(2, "0");

                                    const formattedDate1 = formatDate1(
                                      receivedData.date,
                                      item.day,
                                    );
                                    const formattedDate2 = getNextDayDate(
                                      formatDate1(receivedData.date, item.day),
                                    );

                                    return (
                                      <div className="w-[100%] flex px-6">
                                        <div className="w-[5%]">
                                          <div className="bg-[#D2D2D2] w-10 h-10 flex items-center justify-center rounded-full">
                                            <FaHotel
                                              color="#00A19A"
                                              size={18}
                                              alt="route"
                                            />
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
                                                if (
                                                  receivedData.message ===
                                                  "Forest City"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Forest-City-Marina-Hotel,Gelang-Patah,Malaysia-p2664154-h2767708/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Perak"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Perak,Malaysia-p21085/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Sabah"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sabah,Malaysia-p21083/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Pahang"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Pahang,Malaysia-p21086/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Penang"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Penang,Malaysia-p247880/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Sarawak"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Sarawak,Malaysia-p21082/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Kedah"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kedah,Malaysia-p21092/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Selangor"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Selangor,Malaysia-p21081/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Negeri Sembilan"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Negeri-Sembilan,Malaysia-p21087/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else if (
                                                  receivedData.message ===
                                                  "Kelantan"
                                                ) {
                                                  urlmain = `https://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/Kelantan-p21088/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                } else {
                                                  let encodedCityName =
                                                    encodeURIComponent(
                                                      receivedData.message,
                                                    );
                                                  urlmain = `http://kayak.com.my/in?a=kan_262812_573418&enc_cid=${userId}&lc=en&url=%2Fhotels/${encodedCityName}/${formattedDate1}/${formattedDate2}?sort=distance_a`;
                                                }

                                                return (
                                                  <a
                                                    href={urlmain}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
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
                              ),
                          )}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="  w-[25%] text-[#1F1F1F] h-[fit] fixed right-[70px] ">
                  <div className="bg-white px-8  grid grid-cols-1 divide-y divide-dashed font-sans">
                    <div className="text-[22px] font-bold leading-9 my-4">
                      Activity Box{" "}
                    </div>

                    <div
                      style={{
                        maxHeight: data.length > 7 ? "250px" : "auto",
                        overflowY: data.length > 7 ? "scroll" : "visible",
                      }}
                    >
                      {filteredData.map(
                        (item) =>
                          // Conditionally render if item.day <= 3 or if "showAllDays" is true
                          (item.day <= 3 || showAllDays) && (
                            <Row key={item.day} className="my-1 common-pointer">
                              <LiaEdit className="w-6 h-6 mt-2" />
                              <div
                                key={item.day}
                                className="text-[16px] font-bold leading-9 w-[50%] mt-1"
                                onClick={() => scrollToDay(item.day)}
                              >
                                Day {item.day}
                              </div>
                            </Row>
                          ),
                      )}
                    </div>
                  </div>

                  {/* Conditionally show the toggle button if any item.day is greater than or equal to 3 */}
                  {filteredData.some((item) => item.day >= 3) && (
                    <div className="items-center justify-center text-center bg-white w-[100%]">
                      <button onClick={handleToggleDays} className="">
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
                    <div className="flex w-[100%] items-center text-center justify-center">
                      <IconifyIcon
                        icon="mingcute:ai-fill"
                        style={{ color: "white", fontSize: "24px" }}
                      />
                      <text className="ml-2">Create New With AI</text>
                    </div>
                  </Button>
                </div>
              </>
            )
          ) : (
            <div className="h-[100%] w-[100%] mt-30 flex items-center justify-center flex-col py-5">
              <span
                style={{ fontSize: "20px", fontWeight: "normal" }}
                className="mb-5"
              >
                {text}
              </span>
              <CircularProgress size={20} sx={{ color: "black" }} />
            </div>
          )}
        </Row>

        {showModalItinerary ? (
          <>
            <div className="font-sans fixed bg-gray-50 xs:top-[10vh] lg:top-0 rounded-3xl cursor-pointer text-center justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px]  flex-nowrap overflow-x-hidden overflow-y-auto scrollbar-hide inset-0 z-50 outline-none focus:outline-none">
              {/*Content*/}

              <Column className="sm:w-[100%] sm:h-[100%] lg:w-[100%] lg:h-fit">
                <Row className="text-end items-end justify-end">
                  <FaTimes
                    className="mr-4 mt-6 sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                    onClick={() => {
                      setshowModalItinerary(false);
                      setCreateTPButtonClicked(false);
                    }}
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
                    }}
                  >
                    <div>Generate with AI</div>
                    <div className="items-end justify-between text-end ">
                      <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                    </div>
                  </button>
                </p>
                <p className="px-4 text-center py-1">
                  <button
                    className="sm:w-[600px] lg:w-[300px] hover:bg-[#00A19A] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                    onClick={handleNavigate}
                  >
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

        {isShowAI && (
          <ShowAI
            openPopup1={openPopup1}
            closePopup1={closePopup1}
            closeShowAI={closeShowAI}
            showAI={isShowAI}
            backShowAI={backShowAI}
          />
        )}
      </div>

      {/* end */}
    </>
  );
};

export default OverviewSave;
