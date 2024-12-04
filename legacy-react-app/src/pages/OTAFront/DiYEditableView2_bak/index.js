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
  const { itineraryId, itineraryTitle } = useParams();
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
    //console.log("event received", info.event);
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
    info.event.setExtendedProp( "draggedId", id )

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

    try{
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
  }catch (error){
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
     
      let timeZone = "Asia/Kuala_Lumpur";
      var startDateISO = new Date(response.data.startDate).toLocaleString("en-US", {
        timeZone,
      });      
      startDateISO = DateTime.fromFormat(startDateISO.toString().split(",")[0], 'M/d/yyyy')
   
      setCalendarStartDate(startDateISO.toFormat("d MMMM yyyy"));
      

      setCalendarActivities(activitiesToShow);
      
      setDays(response.data.day);
      
      localStorage.setItem("INTINERARY_"+itineraryId+"_STARTDATE", response.data.startDate);
      localStorage.setItem("INTINERARY_"+itineraryId+"_DAY", response.data.day);

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
    getSidebarActivities();
  }, []);

 
  // set current week range
  useEffect(() => { 
    if(localStorage.getItem("INTINERARY_"+itineraryId+"_STARTDATE")){
      receivedData.startDate = localStorage.getItem("INTINERARY_"+itineraryId+"_STARTDATE");
    }
    if(localStorage.getItem("INTINERARY_"+itineraryId+"_DAY")){
      receivedData.day = localStorage.getItem("INTINERARY_"+itineraryId+"_DAY");
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
    if(calendarStartDate!=""){
      var tmp =  DateTime.fromFormat(calendarStartDate, 'd MMMM yyyy');     
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
          className={`xl:text-[40px] lg:text-[32px] md:text-2xl text-xs md:leading-none leading-[15px] ${
            isToday ? "text-[#E32626]" :(isStartDate?"text-[#008000]":"text-black")
          } font-bold`}
        >
          {mDate}
        </p>
        <p
          className={`lg:text-sm md:text-xs text-[9px] md:leading-none leading-[11px] md:mt-auto mt-1 ${
            isToday ? "text-[#E32626]" :(isStartDate?"text-[#008000]":"text-black")
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
    const response = await getAllRestaurantsForLocation(receivedData.location);
    
    if (response.status === 200) {
      setRestaurants(response.data);
    }
    setRestaurantsLoading(false);
  };

  //console.log(eventRef.current);

  var startDateStr = "";
  if(calendarStartDate!=""){   
    startDateStr =  DateTime.fromFormat(calendarStartDate,"d MMMM yyyy");   
    startDateStr = startDateStr.toFormat("MM/dd/yyyy hh:mm a")
  
  }
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
      />

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
        <HeaderOTA className="fixed invisible lg:visible bs8" />
        <div className="col-xl-3 col-xxl-4 "></div>

        <div className="col-xl-9 col-xxl-8 sm:pt-1">
          <div className="card dashboard-calendar bg-[#f5f5f5]">
            <div className="flex md:flex-nowrap flex-wrap gap-4 justify-between items-center px-5 pt-11 pb-1">
              <p className="lg:max-w-[400px] md:max-w-xs w-full lg:text-[25px] sm:text-xl text-lg lg:leading-[30px] font-normal text-[#45B9B4]">
                {itineraryTitle}  
                 
              </p>
              <div>
           
              <>Start Date: <b>{calendarStartDate}</b> - No of days: {
                <b>{days}</b>}&nbsp;&nbsp;<Button
                className="cursor-pointer bg-[#00a19a] text-white_A700   items-center justify-center "
                shape="RoundedBorder6"
                size="sm"
                onClick={handleChangeDateClick}
              >
                Change
              </Button></>
                  
              </div>
              <div className="lg:max-w-[300px] sm:max-w-[228px] max-w-fit w-full flex lg:gap-14 sm:gap-4 gap-2 justify-center items-center">
                <text
                  className="lg:text-lg sm:text-base text-sm sm:leading-[22px] text-[#45B9B4] font-normal hover:text-[#45B9B4] active:text-[#45B9B4] focus:text-[#45B9B4] active:underline hover:underline underline-offset-8 !decoration-4 sm:p-2 cursor-pointer"
                  onClick={() => {
                    //console.log("clicking");

                    navigate(-1);
                  }}
                >
                  Overview
                </text>
                <a
                  href="#/"
                  className={`lg:text-lg sm:text-base text-sm sm:leading-[22px] text-[#45B9B4] font-normal hover:text-[#45B9B4] active:text-[#45B9B4] focus:text-[#45B9B4] active:underline hover:underline underline-offset-8 !decoration-4 sm:p-2 ${
                    location.pathname.includes("editableView")
                      ? "underline"
                      : ""
                  } `}
                >
                  Editable View
                </a>
              </div>

              <div className="flex items-center">
                <p className="lg:text-lg text-base leading-[22px] font-normal text-[#45B9B4]">
                  Save
                </p>
                <img src={SaveSvg} alt="save"></img>
              </div>
            </div>
            <div> </div>
            <Card.Body className="w-full">
              <div className="flex md:flex-nowrap flex-wrap 2xl:gap-7 md:gap-5 gap-[14px] md:px-5 pl-2 pr-3 lg:py-10 py-8">
                <div
                  className="xl:max-w-[400px] xl:w-full md:w-2/5 w-full md:h-[980px] lg:p-5 md:p-3 md:border border-[#cccccc] md:shadow-bs7 overflow-hidden"
                  id="external-events"
                  ref={externalEventsRef}
                >
                  <p className="md:mb-2.5 lg:text-base md:text-sm text-[9px] md:leading-5 leading-[11px] md:text-[#45B9B4] text-black font-medium tracking-[0.5px]">
                    Drag and Drop your activities to the planner
                  </p>

                  <div className="mt-2.5 w-full md:block hidden">
                    <select className="h-7 w-full !py-1 border-[0.5px] focus:border-[0.5px] focus:border-[#D3D3D3] border-[#D3D3D3] rounded-[5px] bg-white text-xs leading-[14px] text-[#9A9A9A]">
                      <option selected>Categories</option>
                    </select>
                  </div>

                  <div className="md:max-h-[770px] md:h-full overflow-auto md:mt-[34px] mt-1.5 md:pb-2.5 xl:px-8 lg:px-4 md:px-2 md:whitespace-normal whitespace-nowrap scrollbar-hide">
                    <>
                      {sideBarLoading ? (
                        <></>
                      ) : (
                        <>
                          {itineraryActivities.map((event) => (                            
                            <div
                              key={event.id}
                              className="fc-event bg-[#fafafa] md:w-full w-[106px] md:h-auto h-[51px] lg:pl-5 md:pl-3 md:pr-2 md:py-4 p-1.5 md:border-none border-[0.2px] border-[#00A19A] cursor-pointer lg:rounded-[20px] md:rounded-xl rounded-[5px] md:shadow-bs7 overflow-hidden md:mt-[18px] mt-0 md:mr-0 mr-[5px] inline-block"
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
                              <p className="lg:text-base md:text-xs text-[9px] lg:leading-5 md:leading-none leading-[11px] md:font-semibold font-medium md:text-[#012E40] text-[#00A19A]">
                                {event.activity}
                              </p>
                              <p className="lg:text-sm md:text-[10px] lg:leading-none md:leading-4 leading-3 text-[8px] lg:font-medium font-light md:pt-[3px] pt-0.5 -tracking-[1.5%] mt-0 secondLine-ellipses">
                                - {event.comment}
                              </p>

                              {/* <button className = "bg-red-500 w-[60px] h-[30px] text-white" onClick={()=>handleDeleteActivity(event.id)}> Delete</button> */}
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  </div>
                  <div className="md:flex hidden justify-center items-center mt-2.5">
                    <img
                      src={DoubleDownArrow}
                      alt="DoubleDown"
                      className="cursor-pointer"
                    />
                  </div>
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
                  <FullCalendar
                    ref={calendarRef}
                    initialView="timeGridWeek"
                    headerToolbar={{
                      start: "prev,next addActivity addMeal",
                      center: "",
                      end: "today , timeGridWeek , timeGridDay",
                    }}           
                    firstDay ={firstDay}         
                    rerenderDelay={10}
                    eventDurationEditable={true}
                    editable={true}
                    droppable={true}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    events={calendarActivities}
                    eventClick={handleEventClick}
                    dateClick={handleDateClick}
                    eventReceive={handleEventReceive}
                    nowIndicator={true}
                    allDaySlot={false}
                    eventContent={renderEvent}
                    dayHeaderContent={renderHeader}
                    slotEventOverlap={false}
                    eventDisplay="block"
                    validRange ={{start:minDate,end: maxDate}}
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
                    }}
                  />
                </div>
              </div>
            </Card.Body>
          </div>
        </div>
      </div>
    </>
  );
};

export default DIYEditableViewPage2;
