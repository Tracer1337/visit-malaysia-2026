import React, { useState, useRef, useEffect } from "react";
import { Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import EventDialog from "./EventDialog";
import ChangeDateDialog from "./ChangeDateDialog";
import EventsApi from "./api/events";
import "./editableView2.css";
import { DateTime } from "luxon";
import HeaderOTA from "components/Header/HeaderOTA/index";
import SaveSvg from "./Save.svg";
import { useNavigate } from "../../../../node_modules/react-router-dom/index";
import { useLocation, useParams } from "react-router-dom";
import DoubleDownArrow from "./DoubleDown.svg";
import { fetchItineraryDetails } from "data/data";
import RestaurantsSideDrawer from "./RestaurantsSideDrawer";
import { Row, Text, Button, Img } from "components";
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import CreateNewItinerary from "components/Addto/CreateNewtravel/index";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import EventDialogTransportPick from "./EventDialogTransportPick";
import EventDialogTransportFlight from "./EventDialogTransportFlight";
import EventDialogTransportBus from "./EventDialogTransportBus";
import EventDialogTransportCarRental from "./EventDialogTransportCarRental";
import EventDialogOther from "./EventDialogOther";

const externalEvents = [
  {
    id: "111111111",
    title: "Mid Valley Megamall",
    start: "2024-06-06T02:30:00+05:00",
    end: "2024-06-06T06:30:00+05:00",
    duration: "01:00",
    location: "Mid Valley",
    comments:
      "Mid Valley Mega Mall which is huge and good for grabbing souviners for your family and friends such as kurry paste from Madam Kwan's ",
    imageUrl:
      "https://www.shutterstock.com/image-photo/lahore-pakistan-september-11-2022-260nw-2208187361.jpg",
    backgroundColor: "#C6E3D9",
    textColor: "#000000",
    borderColor: "#C6E3D9",
  },
];

// const test = {
//   activity: "Visit Gomantong Caves",
//   comment:
//     "Explore the largest limestone cave system in Sabah and witness the unique ecosystem inside.",
//   date: "13 April 2024",
//   day: "Day 3",
//   id: 5131,
//   image: null,
//   period: "morning activity",
//   place: "Sandakan, Sabah",
//   time: "09:00 am",
// };

const DIYEditableViewPage2 = () => {
  const [calendarActivities, setCalendarActivities] = useState([]);
  const [itineraryActivities, setitineraryActivities] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showChangeDateModal, setShowChangeDateModal] = useState(false);
  const eventRef = useRef(null);
  const externalEventsRef = useRef(null);
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const { creatorId, itineraryId, itineraryTitle } = useParams();
  const {
    getSavedActivitiesForItinerary,
    assignActivityByDragging,
    getCalendarActivities,
    getAllRestaurantsForLocation,
  } = EventsApi;
  const location = useLocation();
  const receivedData = location.state;
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sideBarLoading, setSideBarLoading] = useState(false);

  const [openRestaurantDrawer, setOpenRestaurantDrawer] = useState(false);
  const [isDragged, setIsDragged] = useState(false);
  const [weekRange, setWeekRange] = useState("");

  const [calendarStartDate, setCalendarStartDate] = useState("");

  const dateInputRef = useRef(null);
  const [restaurantsLoading, setRestaurantsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [days, setDays] = useState(0);
  const [firstDay, setFirstDay] = useState(0);
  const [minDate, setMinDate] = useState("1970-01-01");
  const [maxDate, setMaxDate] = useState("3970-01-01");
  const [showAddtoContentNew, setShowAddtoContentNew] = useState(false);
  const [showAddtoContentOld, setShowAddtoContentOld] = useState(false);
  const [token, setToken] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [myid, setmyid] = useState('');
  const [showEventTransport, setShowEventTransport] = useState(false);
  const [showCreateNewItinerary, setShowCreateNewItinerary] = useState(false)
  const [showEventFlight, setShowEventFlight] = useState(false);
  const [showEventBus, setShowEventBus] = useState(false);
  const [showEventCar, setShowEventCar] = useState(false);
  const [showEventOthers, setShowEventOthers] = useState(false);;

  // *LOGIN POPUP SETUP*
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isShowContentSetting, setIsShowContentSetting] = React.useState(false);

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


  // Other state variables and logic...

  const openPopup44 = () => {
    setShowCreateNewItinerary(true);
  };

  const closePopup44 = () => {
    setShowCreateNewItinerary(false);
  };
  const handleSetActivityId = (id) => {
    // setActivityId(id);
  };


  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    color: '#45B9B4',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  };

  const textStyles = {
    color: isHovered ? 'black' : '#45B9B4',
    transition: 'color 0.3s ease'
  };


  const buttonStyles1 = {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    color: '#45B9B4',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  };

  const textStyles1 = {
    color: isHovered1 ? 'black' : '#45B9B4',
    transition: 'color 0.3s ease'
  };
  // Other functions and logic...

  const SaveButton = ({ setActivityId, activityId, openPopup44, openPopup1 }) => {
    const handleClick = () => {
      //alert("o'clock");
      // Add any additional logic you need here
      setActivityId(activityId);
      openPopup44();
      openPopup1();
    };

    return (
      <div

        style={buttonStyles}

        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center ml-3" onClick={handleClick}>
        <p className="font-montserrat mr-2 text-[20px] sm:text-[18px] md:text-[20px] xl:text-[18px]"
          style={textStyles}
        >
          Save as
        </p>
        <img className="w-5 h-5 mt-1" src={SaveSvg} alt="save"></img>
      </div>
    );
  };

  const handleEventClick = (eventClick) => {
    setIsDragged(false);
    eventRef.current = eventClick.event;
    setIsEdit(true);
    console.log(eventRef)
    setShowEventModal(true);
  };

  const handleChangeDateClick = (eventClick) => {

    setShowChangeDateModal(true);
  };

  const handleDateClick = (dateClick) => {
    setIsEdit(false);
    setIsDragged(false);
    const startStr = dateClick.dateStr;
    const startDate = DateTime.fromISO(startStr);

    const endDate = startDate.plus({ minutes: 30 });
    const endStr = endDate.toISO({
      suppressMilliseconds: true,
      includeOffset: true,
    });

    const event = { startStr, endStr };

    eventRef.current = event;
    setShowEventModal(true);
  };




  const handleEventReceive = async (info) => {
    console.log("event received", info.event);

    setIsDragged(true);
    const user_itinerary_id = itineraryId;
    const id = info.event.id;

    const eventToAssign = {
      user_itinerary_id: parseInt(user_itinerary_id),
      id: parseInt(id),
    };

    const response = await assignActivityByDragging(eventToAssign);

    if (response?.data?.status === 0) {

      const id = response?.data?.id
      info.event.setExtendedProp("draggedId", id)

      eventRef.current = info.event;
      setIsEdit(true);
      setShowEventModal(true);
    }

    const duration = info.event.extendedProps.duration || "01:00";
    const [hours, minutes] = duration.split(":").map(Number);

    const end = new Date(info.event.start);
    end.setHours(end.getHours() + hours);
    end.setMinutes(end.getMinutes() + minutes);

    info.event.setEnd(end);
  };








  const convertToISO = (date, timet) => {
    const dateFormat = "d MMMM yyyy"; // Format for '13 April 2024'
    const timeFormat = "hh:mm a"; // Format for '09:00 am'

    try {
      let [time, period] = timet.split(" ");
      let [hours, minutes] = time.split(":");
      if (hours.length === 1) {
        hours = "0" + hours;
      }

      const updatedTime = `${hours}:${minutes} ${period}`;
      //console.log(updatedTime, "timehere");
      const parsedDate = DateTime.fromFormat(date, dateFormat);
      const parsedTime = DateTime.fromFormat(updatedTime, timeFormat);

      const combinedDateTime = parsedDate.set({
        hour: parsedTime.hour,
        minute: parsedTime.minute,
      });

      return combinedDateTime.toISO();
    } catch (error) {
      console.log(error);
    }
  };

  const getSidebarActivities = async () => {
    setSideBarLoading(true);
    try {
      // const data = await fetchItineraryDetails(itineraryId);
      const response = await getSavedActivitiesForItinerary(itineraryId);
      //console.log("datahere", response);
      setitineraryActivities(response.data);
      console.log(itineraryActivities);
    } catch (error) {
      console.error("Error fetching itinerary details:", error);
    } finally {
      setSideBarLoading(false);
    }
  };

  const getActivities = async (id) => {
    const response = await getCalendarActivities(id);

    if (response?.data?.userItineraryActivity?.length > 0) {
      const activitiesToShow = response.data.userItineraryActivity.map(
        (singleActivity) => {
          const start = convertToISO(singleActivity.date, singleActivity.time);
          return {
            id: singleActivity.id,
            title: singleActivity.activity,
            comments: singleActivity.comment,
            location: singleActivity.place,
            day: singleActivity.day,
            start: start,
            end: "",
            imageUrl: singleActivity.image,
            backgroundColor: "#C6E3D9",
            textColor: "#000000",
            borderColor: "#C6E3D9",
            duration: "01:00",
            period: singleActivity.period,
          };
        }
      );

      const flightsToShow = response.data.userItineraryFlight.map(
        (singleFlight) => {
          const start = convertToISO(singleFlight.date, singleFlight.time);
          return {
            id: singleFlight.id,
            type: singleFlight.type,
            title: singleFlight.title,
            terminalLocation: singleFlight.terminalLocation,
            details: singleFlight.details,
            bookedThrough: singleFlight.bookedThrough,
            confirmationNo: singleFlight.confirmationNo,
            airline: singleFlight.airline,
            flightNo: singleFlight.flightNo,
            terminal: singleFlight.terminal,
            gate: singleFlight.gate,
            start: start,
            seatNo: singleFlight.seatNo,
            timezone: singleFlight.timezone,
            duration: singleFlight.duration, 
            imageUrl: "",  // Assuming there's no image for flights
            backgroundColor: "#D3E4F1",  // You can change this color if needed
            textColor: "#000000",
            borderColor: "#D3E4F1",
            isFlight:true,
          };
          
        }
      );

      const busesToShow = response.data.userItineraryBus.map(
        (singleBus) => {
          const start = convertToISO(singleBus.date, singleBus.time);
          return {
            id: singleBus.id,
            type: singleBus.type,
            title: singleBus.title,
            note: singleBus.note,
            terminalLocation: singleBus.terminalLocation,
            start: start,
            bookedThrough: singleBus.bookedThrough,
            confirmationNo: singleBus.confirmationNo,
            busName: singleBus.busName,
            seatNo: singleBus.seatNo,
            plateNo: singleBus.plateNo,
            imageUrl: "",  // Assuming there's no image for buses
            backgroundColor: "#D3E4F1",  // You can change this color if needed
            textColor: "#000000",
            borderColor: "#D3E4F1",
            isBus: true,
          };
        }
      );

      const carsToShow = response.data.userItineraryCarRental.map(
        (singleCar) => {
          
          const start = convertToISO(singleCar.date, singleCar.time);
          
          return {
            id: singleCar.id,
            type: singleCar.type,
            title: singleCar.title,
            note: singleCar.note,
            location: singleCar.location,
            start: start,
            bookedThrough: singleCar.bookedThrough,
            confirmationNo: singleCar.confirmationNo,
            carrier: singleCar.carrier, // Assuming this is the car rental or car model
            duration: singleCar.duration,
            timezone: singleCar.timezone,
            // gps: singleCar.gps,
            // distance: singleCar.distance,
            image: singleCar.image,  // Assuming there's no image for cars
            backgroundColor: "#D3E4F1",  // You can change this color if needed
            textColor: "#000000",
            borderColor: "#D3E4F1",
            isCar: true,  // Flag to indicate this is a car itinerary
          };
        }
      );

      const othersTransportToShow = response.data.userItineraryOtherTransport.map(
        (singleTransport) => {
          
          const start = convertToISO(singleTransport.date, singleTransport.time);
      
          return {
            id: singleTransport.id,
            type: singleTransport.type,
            title: singleTransport.title,
            note: singleTransport.note,
            location: singleTransport.location,
            start: start,
            bookedThrough: singleTransport.bookedThrough,
            confirmationNo: singleTransport.confirmationNo,
            carrier: singleTransport.carrier,
            duration: singleTransport.duration,
            timezone: singleTransport.timezone,
            // gps: singleTransport.gps,
            // distance: singleTransport.distance,
            image: singleTransport.image || null,  // Assuming there's no image, default to null
            backgroundColor: "#D3E4F1",  // You can change this color if needed
            textColor: "#000000",
            borderColor: "#D3E4F1",
            isOther: true,  // Flag to indicate this is a transport itinerary
          };
        }
      );
      
      
      
      
      const combinedActivities = [...activitiesToShow, ...flightsToShow, ...busesToShow, ...carsToShow, ...othersTransportToShow];
      let timeZone = "Asia/Kuala_Lumpur";
      var startDateISO = new Date(response.data.startDate).toLocaleString("en-US", {
        timeZone,
      });
      startDateISO = DateTime.fromFormat(startDateISO.toString().split(",")[0], 'M/d/yyyy')

      setCalendarStartDate(startDateISO.toFormat("d MMMM yyyy"));


      setCalendarActivities(combinedActivities);

      setDays(response.data.day);

      localStorage.setItem("INTINERARY_" + itineraryId + "_STARTDATE", response.data.startDate);
      localStorage.setItem("INTINERARY_" + itineraryId + "_DAY", response.data.day);

      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.gotoDate(startDateISO.toFormat("yyyy-MM-dd")); // Navigate to the week containing the selected date

        setFirstDay(startDateISO.weekday);

        const dateToShow = DateTime.fromISO(startDateISO.toFormat("yyyy-MM-dd"));
        const startDate = dateToShow; // Adjusting to Sunday
        const endDate = startDate.plus({ days: 6 });

        const formattedStartDate = startDate.toFormat("LLL d");
        const formattedEndDate = endDate.toFormat("LLL d, yyyy");

        setMinDate(startDateISO.toFormat("yyyy-MM-dd"));
        setMaxDate(startDateISO.plus({ days: response.data.day }).toFormat("yyyy-MM-dd"));

        setWeekRange(`${formattedStartDate} - ${formattedEndDate}`);
      }

    }

    return response;

  };
  //get activities to show on the calander
  useEffect(() => {
    getActivities(itineraryId);
  }, [itineraryId]);

  // get activities to show on the sidebar
  useEffect(() => {
    const storedToken = localStorage?.getItem("token");
    const userId = localStorage.getItem("userId");
    setToken(storedToken);
    setmyid(userId);
    getSidebarActivities();
  }, []);


  // set current week range
  useEffect(() => {
    if (localStorage.getItem("INTINERARY_" + itineraryId + "_STARTDATE")) {
      receivedData.startDate = localStorage.getItem("INTINERARY_" + itineraryId + "_STARTDATE");
    }
    if (localStorage.getItem("INTINERARY_" + itineraryId + "_DAY")) {
      receivedData.day = localStorage.getItem("INTINERARY_" + itineraryId + "_DAY");
    }
    let timeZone = "Asia/Kuala_Lumpur";
    var startDateISO = new Date(receivedData.startDate).toLocaleString("en-US", {
      timeZone,
    });
    startDateISO = DateTime.fromFormat(startDateISO.toString().split(",")[0], 'M/d/yyyy')

    setCalendarStartDate(startDateISO.toFormat("d MMMM yyyy"));

    setDays(receivedData.day);

    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(startDateISO.toFormat("yyyy-MM-dd")); // Navigate to the week containing the selected date

      setFirstDay(startDateISO.weekday);


      const dateToShow = DateTime.fromISO(startDateISO.toFormat("yyyy-MM-dd"));
      const startDate = dateToShow; // Adjusting to Sunday
      const endDate = startDate.plus({ days: 6 });

      const formattedStartDate = startDate.toFormat("LLL d");
      const formattedEndDate = endDate.toFormat("LLL d, yyyy");

      setMinDate(startDateISO.toFormat("yyyy-MM-dd"));
      setMaxDate(startDateISO.plus({ days: receivedData.day }).toFormat("yyyy-MM-dd"));

      setWeekRange(`${formattedStartDate} - ${formattedEndDate}`);

    }

    /*
    const today = DateTime.now();
    
    const startDate = today.startOf("week").minus({ days: 1 }).startOf("day"); // Adjusting to Sunday
    const endDate = startDate.plus({ days: 6 }).endOf("day"); // Adjusting to the end of the week (Saturday)

    const formattedStartDate = startDate.toFormat("LLL d");
    const formattedEndDate = endDate.toFormat("LLL d, yyyy");
 

    setWeekRange(`${formattedStartDate} - ${formattedEndDate}`);
    */

  }, []);

  useEffect(() => {
    let draggableEl = externalEventsRef.current;
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          const id = eventEl.getAttribute("data-id");
          const title = eventEl.getAttribute("data-title");
          const location = eventEl.getAttribute("data-location");
          const comments = eventEl.getAttribute("data-comments");
          const start = eventEl.getAttribute("data-start");
          const end = eventEl.getAttribute("data-end");
          const imageUrl = eventEl.getAttribute("data-imageurl");
          const backgroundColor = eventEl.getAttribute("data-backgroundColor");
          const textColor = eventEl.getAttribute("data-textColor");
          const borderColor = eventEl.getAttribute("data-borderColor");
          const duration = eventEl.getAttribute("data-duration");
          const period = eventEl.getAttribute("data-period");
          const day = eventEl.getAttribute("data-day");

          return {
            id,
            title,
            location,
            comments,
            start,
            end,
            imageUrl,
            backgroundColor,
            textColor,
            borderColor,
            duration,
            period,
            day,
          };
        },
      });
    }
  }, []);

  function getTimeDifference(startHours, startMinutes, endHours, endMinutes) {
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;
    const differenceInMinutes = endTimeInMinutes - startTimeInMinutes;

    return differenceInMinutes;
  }

  const renderEvent = (eventInfo) => {
    //console.log(eventInfo);
    const startString = eventInfo.event.startStr;
    const endString = eventInfo.event.endStr;

    const startDate = new Date(startString);

    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();

    const endDate = new Date(endString);

    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    const difference = getTimeDifference(
      startHours,
      startMinutes,
      endHours,
      endMinutes
    );
    const thresholdInMinutes = 150;

    const showImage = difference >= thresholdInMinutes;

    return (
      <div className="xl:p-3 sm:p-1.5 py-2 px-[3px] absolute top-0 left-0 bottom-0 right-0 w-full h-full">
        <p className="xl:text-sm sm:text-xs text-[6px] leading-3 sm:font-medium font-semibold text-black truncate">
          {eventInfo.event.title}
        </p>
        <p className="xl:text-xs sm:text-[10px] text-[6px] sm:leading-none leading-3 font-medium text-black xl:mt-2 mt-1 truncate">
          {startHours}:{startMinutes ? startMinutes : "00"} -{" "}
          {endHours ? endHours : "00"}:{endMinutes ? endMinutes : "00"}
        </p>
        {showImage ? (
          <div className="mt-3 max-w-[90px] w-full max-h-[63px] h-full sm:block hidden">
            <img
              className="border rounded-lg"
              src={eventInfo.event.extendedProps.imageUrl}
              alt="event"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  function isSameDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const renderHeader = (args) => {
    const date = new Date(args.date);
    const today = new Date();

    const isToday = isSameDate(date, today);
    var isStartDate = false;
    if (calendarStartDate != "") {
      var tmp = DateTime.fromFormat(calendarStartDate, 'd MMMM yyyy');
      isStartDate = isSameDate(date, tmp.toJSDate());
    }

    const options = { weekday: "short", day: "numeric" };

    const formattedDate = date.toLocaleDateString("en-us", options);

    const dateArray = formattedDate.split(" ");
    const mDate = dateArray[0];
    const mDay = dateArray[1];

    return (
      <div className="cursor-pointer flex flex-col justify-center items-center">
        <p
          className={`xl:text-[40px] lg:text-[32px] md:text-2xl text-xs md:leading-none leading-[15px] ${isToday ? "text-[#E32626]" : (isStartDate ? "text-[#008000]" : "text-black")
            } font-bold`}
        >
          {mDate}
        </p>
        <p
          className={`lg:text-sm md:text-xs text-[9px] md:leading-none leading-[11px] md:mt-auto mt-1 ${isToday ? "text-[#E32626]" : (isStartDate ? "text-[#008000]" : "text-black")
            } lg:font-normal font-light`}
        >
          {mDay}
        </p>
        <p className="w-[1px] xl:h-6 h-4 bg-black md:block hidden"></p>
      </div>
    );
  };



  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const dateToShow = DateTime.fromISO(event.target.value);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate); // Navigate to the week containing the selected date
      setFirstDay(dateToShow.weekday);
    }


    const startDate = dateToShow; // Adjusting to Sunday
    const endDate = startDate.plus({ days: 6 });

    const formattedStartDate = startDate.toFormat("LLL d");
    const formattedEndDate = endDate.toFormat("LLL d, yyyy");

    setWeekRange(`${formattedStartDate} - ${formattedEndDate}`);
  };

  const handleAddMeal = async () => {
    setOpenRestaurantDrawer(true);

    setRestaurantsLoading(true);

    const response = await getAllRestaurantsForLocation(receivedData.location, { halal: false }, "Rating");
    if (response.status === 200) {
      setRestaurants(response.data);
    }
    setRestaurantsLoading(false);
  };

  //console.log(eventRef.current);

  var startDateStr = "";
  if (calendarStartDate != "") {
    startDateStr = DateTime.fromFormat(calendarStartDate, "d MMMM yyyy");
    startDateStr = startDateStr.toFormat("MM/dd/yyyy hh:mm a")

  }

// Parse the start date string into a DateTime object
const startDate = DateTime.fromFormat(calendarStartDate, 'd MMMM yyyy');

// Add the specified number of days to the start date
const endDate = startDate.plus({ days: days - 1 });

// Format dates for display
const formattedStartDate = startDate.toFormat('d MMMM yyyy');
const formattedEndDate = endDate.toFormat('d MMMM yyyy');

  return (
    <>
      <RestaurantsSideDrawer
        loading={restaurantsLoading}
        open={openRestaurantDrawer}
        setOpen={setOpenRestaurantDrawer}
        restaurants={restaurants}
        location={receivedData.location}
        eventRef={eventRef}
        setShowEventModal={setShowEventModal}
        setShowEventTransport = {setShowEventTransport}

      />

{showEventTransport && (
        <EventDialogTransportPick
          event={eventRef.current}
          open={showEventTransport}
          setOpen={setShowEventTransport}
          useritineraryid={itineraryId}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={getSidebarActivities}
          getActivities={getActivities}
          days={days}
          calendarStartDate={startDateStr}
          
        />
      )}
       {showEventFlight && (
        <EventDialogTransportFlight
          event={eventRef.current}
          open={showEventFlight}
          setOpen={setShowEventFlight}
          useritineraryid={itineraryId}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={getSidebarActivities}
          getActivities={getActivities}
          days={days}
          calendarStartDate={startDateStr}
          
        />
      )}
         {showEventBus && (
        <EventDialogTransportBus
          event={eventRef.current}
          open={showEventBus}
          setOpen={setShowEventBus}
          useritineraryid={itineraryId}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={getSidebarActivities}
          getActivities={getActivities}
          days={days}
          calendarStartDate={startDateStr}
          
        />
      )}
      {showEventCar && (
        <EventDialogTransportCarRental
          event={eventRef.current}
          open={showEventCar}
          setOpen={setShowEventCar}
          useritineraryid={itineraryId}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={getSidebarActivities}
          getActivities={getActivities}
          days={days}
          calendarStartDate={startDateStr}
          
        />
      )}
      {showEventOthers && (
        <EventDialogOther
          event={eventRef.current}
          open={showEventOthers}
          setOpen={setShowEventOthers}
          useritineraryid={itineraryId}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={getSidebarActivities}
          getActivities={getActivities}
          days={days}
          calendarStartDate={startDateStr}
          
        />
      )}

      {showEventModal && (
        <EventDialog
          event={eventRef.current}
          open={showEventModal}
          setOpen={setShowEventModal}
          useritineraryid={itineraryId}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={getSidebarActivities}
          getActivities={getActivities}
          days={days}
          calendarStartDate={startDateStr}
        />
      )}
      {showChangeDateModal && (
        <ChangeDateDialog
          open={showChangeDateModal}
          setOpen={setShowChangeDateModal}
          useritineraryid={itineraryId}
          loading={loading}
          days={days}
          calendarStartDate={startDateStr}
          getActivities={getActivities}
        />
      )}
      <div className="row">
        <div className="fixed w-full z-10">
          {/* <HeaderOTA className="fixed invisible lg:visible bs8" /> */}
          <HeaderOTA openPopup1={openPopup1} className="relative hidden lg:visible" />
          <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
          <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
          <HeaderOTAMobileEpic openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
          {/* <HeaderOTAMobileEpic className="visible fixed overflow-hidden lg:invisible lg:hidden" /> */}
        </div>

        {/* <div className="col-xl-9 col-xxl-8 sm:pt-1" > */}
        <div className="card dashboard-calendar bg-[#f5f5f5] xs:pt-[160px] lg:pt-[92px]">


          <div
            className="flex bg-white p-4 w-[100%] justify-between items-center"
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <p className="font-montserrat ml-2 text-[20px] sm:text-[18px] md:text-[20px] xl:text-[20px]"
              style={{ color: "#45B9B4" }}>
              {itineraryTitle}

            </p>

            <div className="flex">
              <div

                style={buttonStyles1}

                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
                className="flex items-center mr-4 ml-3">
                <p className="font-montserrat mr-2 text-[20px] sm:text-[18px] md:text-[20px] xl:text-[18px]"
                  style={textStyles1}>
                  Save
                </p>
                {/* <img className="w-5 h-5 mt-1" src={SaveSvg} alt="save"></img> */}
              </div>
              <SaveButton
                setActivityId={handleSetActivityId}
                activityId={111}
                openPopup44={openPopup44}
                openPopup1={openPopup1}
              />
            </div>
            {showCreateNewItinerary && (
              <CreateNewItinerary
                showCreateNewItinerary={showCreateNewItinerary}
                activityId={'222'}
                title1={'222'}
                user_itinerary_id1={itineraryId}
                token1={token}
                userid1={myid}
                closePopup55={closePopup44}
                closePopup44={closePopup44}
              />
            )}


          </div>
          <div className="">
            <div className=" bg-white shadow-inner p-4 w-full text-center p-4 shadow-inner" style={{ backgroundColor: '#F5F5F5' }} >
              <text
                className="font-montserrat common-pointer sm:ml-4 md:ml-6 hover:border-b hover:border-b-2 hover:border-b-[#6392F9] hover:text-[#6392F9] p-3"
                onClick={() => {
                  const cyo = receivedData.cyo;

                  if (cyo === true) {
                    navigate(`/itinerary/${creatorId}/${itineraryId}/${itineraryTitle}`);
                  }
                  else {
                    navigate(-1);
                  }
                }}
              >
                Overview
              </text>
              <text
                href="#/"
                className={`font-montserrat ml-10 common-pointer font-bold border-b border-b-2 border-b-[#6392F9] text-[#6392F9] p-3 ${location.pathname.includes("editableView")
                  ? ""
                  : ""
                  } `}
              >
                Editable View
              </text>
            </div>
          </div>
          <div className="flex xs:ml-[310px] lg:ml-[450px] mt-8">
            <div className="font-montserrat flex items-center space-x-4 text-[13px]">
              {/* <span>Start Date: <b>{calendarStartDate}</b> - No of days: <b>{days}</b></span> */}
              <span>
                Date: &nbsp;<b>{calendarStartDate}</b>&nbsp; - &nbsp;
                <b>
                  {formattedEndDate}
                </b>&nbsp;&nbsp;|&nbsp;
                No of days: &nbsp;<b>{days}</b>
              </span>
              <button
                className="font-montserrat cursor-pointer bg-[#00a19a] text-[13px] text-white items-center justify-center px-3 py-1 rounded-lg shadow-md"
                onClick={handleChangeDateClick}
              >
                Change
              </button>
            </div>
          </div>

          <Card.Body className="w-full">
            <div className="flex md:flex-nowrap flex-wrap 2xl:gap-7 md:gap-5 gap-[14px] md:px-5 pl-2 pr-3 lg:py-2 py-8">
              <div
                className="xl:max-w-[400px] xl:w-full md:w-2/5 w-full md:h-[980px] lg:p-5 md:p-3 md:border border-[#cccccc] md:shadow-bs7 overflow-hidden bg-white"
                id="external-events"
                ref={externalEventsRef}
              >
                <p className="font-montserrat md:mb-2.5 lg:text-base md:text-sm text-[9px] md:leading-5  md:text-[#45B9B4] text-black font-medium">
                  Drag and Drop your activities to the planner
                </p>

                {/* <div className="mt-2.5 w-full md:block hidden">
                    <select className="h-7 w-full !py-1 border-[0.5px] focus:border-[0.5px] focus:border-[#D3D3D3] border-[#D3D3D3] rounded-[5px] bg-white text-xs leading-[14px] text-[#9A9A9A]">
                      <option selected>Categories</option>
                    </select>
                  </div> */}

                <div className="md:max-h-[770px] xl:max-h-[840px] md:h-full overflow-auto md:mt-[34px] mt-0 md:pb-2.5 xl:px-4 lg:px-4 md:px-2 md:whitespace-normal whitespace-nowrap scrollbar">
                  <>
                    {sideBarLoading ? (
                      <></>
                    ) : (
                      <>
                        {itineraryActivities.map((event) => (
                          <div
                            key={event.id}
                            className="fc-event bg-gray-50 md:w-full w-[106px] md:h-auto h-[51px] lg:pl-5 md:pl-3 md:pr-2 md:py-4 p-1.5 md:border-none border-[0.2px] border-[#00A19A] cursor-pointer lg:rounded-[20px] md:rounded-xl rounded-[5px] overflow-hidden md:mt-[18px] mt-0 md:mr-0 mr-[5px] inline-block"
                            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                            data-id={event.id}
                            data-title={event.activity}
                            data-location={event.place}
                            data-comments={event.comment}
                            data-start={event.date}
                            data-end={event.end || ""}
                            data-imageurl={event.image || ""}
                            data-backgroundColor={"#C6E3D9"}
                            data-textColor={"#000000"}
                            data-borderColor={"#C6E3D9"}
                            data-duration={"01:00"}
                            data-period={event.period}
                            data-day={event.day}
                          >
                            <p className="font-montserrat lg:text-sm md:text-xs   leading-[11px] md:font-semibold font-medium md:text-[#012E40] text-[#00A19A]">
                              {event.activity}
                            </p>
                            <p className="font-montserrat lg:text-sm md:text-[10px] text-[8px] lg:font-medium font-light md:pt-[3px] pt-0.5  mt-0 secondLine-ellipses">
                              - {event.comment}
                            </p>

                            {/* <button className = "bg-red-500 w-[60px] h-[30px] text-white" onClick={()=>handleDeleteActivity(event.id)}> Delete</button> */}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                </div>
                {/* <div className="md:flex hidden justify-center items-center mt-2.5">
                    <img
                      src={DoubleDownArrow}
                      alt="DoubleDown"
                      className="cursor-pointer"
                    />
                  </div> */}
              </div>
              <div
                className="app-fullcalendar w-full md:border border-[#D9D9D9] md:shadow-bs8 relative"
                id="calendar"
              >
                <div className="w-fit absolute left-24 top-[11px] lg:block hidden">
                  <input
                    type="date"
                    ref={dateInputRef}
                    id="date-input"
                    onChange={handleDateChange}
                    className="h-0"
                  />
                  <input
                    type="text"
                    value={weekRange}
                    readOnly
                    onClick={() => dateInputRef.current.showPicker()}
                    className="cursor-pointer lg:w-[130px] w-[108px] h-3 mt-1 absolute left-0 top-0 border-none p-0 text-xs leading-3 bg-[#f5f5f5] calendar-arrow"
                  />
                </div>
                <div className="relative z-0 bg-white">
                  <FullCalendar
                    ref={calendarRef}
                    initialView="timeGridWeek"
                    headerToolbar={{
                      start: "prev,next addActivity addMeal addTransport",
                      center: "",
                      end: "today , timeGridWeek , timeGridDay",
                    }}
                    firstDay={firstDay}
                    rerenderDelay={10}
                    eventDurationEditable={true}
                    editable={true}
                    droppable={true}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    events={calendarActivities}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    eventReceive={handleEventReceive}
                    eventDrop={handleEventClick} // <- Trigger handleEventClick after drop
                    nowIndicator={true}
                    allDaySlot={false}
                    eventContent={renderEvent}
                    dayHeaderContent={renderHeader}
                    slotEventOverlap={false}
                    eventDisplay="block"
                    validRange={{ start: minDate, end: maxDate }}
                    dayCellDidMount={(info) => {
                      const date = info.date;

                      // Check if the date is before minDate or after maxDate
                      if (date < minDate || date > maxDate) {
                        info.el.classList.add('fc-day-disabled');  // Apply your custom class
                      }
                    }}
                    customButtons={{
                      addActivity: {
                        text: "Add Activity",
                        click: function () {
                          eventRef.current = undefined;
                          setShowEventModal(true);
                        },
                      },
                      addMeal: {
                        text: "Add Meal",
                        click: handleAddMeal,
                      },
                      addTransport: {
                        text: "Add Transport",
                        click: function () {
                          eventRef.current = undefined;
                          setShowEventTransport(true);
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </Card.Body>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default DIYEditableViewPage2;
