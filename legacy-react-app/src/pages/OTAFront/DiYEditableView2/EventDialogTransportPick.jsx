import Modal from "react-modal";
import ReactDOM from "react-dom";
import LabledInput from "./LabledInput";
import { useFormik } from "formik";
import crossSvg from "./cross.svg";
import backSvg from "./ep_back.svg";
import EventsApi from "./api/events";
import ModalLoader from "./ModalLoader";
import {ToastContainer, toast } from "react-toastify";
import "./editableView2.css";
import { useState } from "react";
import { activitySchema } from "./validationSchems";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import axios from 'axios';
import httpMethods from "./api/index";
import Compressor from '@xkeshi/image-compressor';
import EventDialogTrain from './EventDialogTrain';
import EventDialogTransportBus from "./EventDialogTransportBus";
import EventDialogOther from "./EventDialogOther";
import EventDialogTransportFlight from "./EventDialogTransportFlight";
import EventDialogTransportCarRental from "./EventDialogTransportCarRental";

function EventDialogTransportPick({
  open,
  setOpen,
  event,
  useritineraryid,
  isEdit,
  setIsEdit,
  loading,
  isDragged,
  setIsDragged,
  fetchData,
  getActivities,
  calendarStartDate,
}) {
  Modal.setAppElement("#root");

  
  var imageUrl= "";
  var baseURL = httpMethods.baseURL;

  if(event?.extendedProps?.imageUrl){  
    if(event?.extendedProps?.imageUrl.indexOf("/")>-1){
      imageUrl = baseURL + `/api/chatgpt/user/itinerary/coverimage`+event?.extendedProps?.imageUrl;             
    }else{      
      imageUrl= baseURL+ `/api/restaurant/images/`+  event?.extendedProps?.imageUrl;  
    }    
  }else if(event?.imageUrl){
       imageUrl=  event?.imageUrl;  
  }
  const [selectedImage, setSelectedImage] = useState(imageUrl);

  const {
    addActivityToItinerary,
    deleteExistingActivity,
    deleteSavedActivity,
    editActivityForItinerary,
  } = EventsApi;
 
  var startDateTmp  = new Date();  
  var startTimeTmp = "10:00";
  
  if(event?.startStr){  
    var tmp = event?.startStr.split("+")[0]; 
    tmp =  DateTime.fromISO(tmp);       
    startDateTmp = tmp.toFormat("MM/dd/yyyy");   
    startDateTmp = new Date(startDateTmp);  

    startTimeTmp = tmp.toFormat("HH:mm");   

  }else{    
    if(calendarStartDate!=""){
       startDateTmp = new Date(calendarStartDate); 
    }    
  }
 
  const [startDate, setStartDate] = useState(startDateTmp);
  const [startTime, setStartTime] = useState(startTimeTmp);
  const [transportType, setTransportType] = useState(""); // State to manage selected transport type

  const handleTransportChange = (e) => {
    setTransportType(e.target.value);
  };

  const handleClose = () => {
    setTransportType(""); // Reset the transport type when closing the modal
    setOpen(false);
  };
  const closeModal = () => {
    setOpen(false);
  };

 
  const initialValues = {
    id: event?.id || "",
    draggedID: event?.extendedProps?.draggedId || "",
    title: event?.title || "",
    location: event?.extendedProps?.location || event?.location || "",
    start: event?.startStr || startDate,   
    end: event?.endStr || "",
    comments: event?.extendedProps?.comments || "",
    day: event?.extendedProps?.day || "",
    period: event?.extendedProps?.period || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: activitySchema,
    onSubmit: async (values) => {

     var startDateISO= DateTime.fromISO(startDate.toISOString());
      
     const startDt = DateTime.fromFormat(startDateISO.toFormat("dd/MM/yyyy") + " " + startTime,"dd/MM/yyyy HH:mm");
    
     const formattedStartDate = startDt.toFormat('dd MMMM yyyy');
     const formattedStartTime = startDt.toFormat('h:mm a').toLocaleLowerCase();
      
      const activityToSave = {
        user_itinerary_id: useritineraryid,
        activity: values?.title,
        place: values?.location,
        time: formattedStartTime,
        date: formattedStartDate,
        day: values.day,
        period: values.period,
        comment: values?.comments ? values.comments : "",
      };
     
      const formData = new FormData();    

      if(selectedImage && selectedImage.toString().indexOf("api") >0){     
        activityToSave.image = selectedImage;        
      }

      if (selectedImage) {
        formData.append('cover_image', selectedImage);
      }     
    
     
      if (isEdit) {        
        const apiUrl =  baseURL+ '/api/planner/user/itinerary/activity/editAndUpload';
     
        const activityToEdit = {...activityToSave, id: values.draggedID? values.draggedID : values.id}
        const json = JSON.stringify(activityToEdit);
     
        const blob = new Blob([json], {
          type: 'application/json'
        });
    
        formData.append('request_activity', blob);
        //console.log("blob:", blob);
        const token = localStorage.getItem("token");
        //console.log("Token:", token);
       
        try {
          const response = await axios.put(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
          if (response?.data?.status === 0) {            
            toast("Updated Successfully", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setIsEdit(false);
            getActivities(useritineraryid);

          } else if (response?.data?.status === 2) {     
            toast.error("Can not set Activity date before Start Date", {
              autoClose: 4000,
              position: 'top-right',
              closeButton: false,
              className: "xs:top-40 lg:top-20 toast-message",
            });
          }else{
            toast.error("Failed to update Activity", {
              autoClose: 4000,
              position: 'top-right',
              closeButton: false,
              className: "xs:top-40 lg:top-20 toast-message",
            });
          }
    
        } catch (error) {         
           
        }

      } else {
        const apiUrl =  baseURL+ '/api/planner/user/itinerary/activity/addAndUpload';
     
        const activityToAdd = {...activityToSave, user_itinerary_id:parseInt(activityToSave.user_itinerary_id)}
        
        const json = JSON.stringify(activityToAdd);
     
        const blob = new Blob([json], {
          type: 'application/json'
        });
    
        formData.append('request_activity', blob);
        console.log("activityToAdd:", activityToAdd);
        const token = localStorage.getItem("token");
        console.log("Token:", token); 
        try {
          const response = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response?.data?.status === 0) {            
            toast("Added Successfully", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
                
            fetchData();
            getActivities(useritineraryid);

          
            setIsDragged(false);
            console.log(activityToSave,"save");
          
          } else if (response?.data?.status === 2) {     
            toast.error("Can not set Activity date before Start Date", {
              autoClose: 4000,
              position: 'top-right',
              closeButton: false,
              className: "xs:top-40 lg:top-20 toast-message",
            });
          }else{
            toast.error("Failed to add Activity", {
              autoClose: 4000,
              position: 'top-right',
              closeButton: false,
              className: "xs:top-40 lg:top-20 toast-message",
            });
          }
    
        } catch (error) {         
         
        }

      }

      setOpen(false);
    },
  });
  const { values, handleChange, handleSubmit, errors, } = formik;



  const customStyles = {
    overlay: {
      zIndex: 99999,
      backgroundColor: "rgb(25 25 25 / 45%)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      // paddingBottom: "8px",
      // padding: "18px",
      border: "none",
      borderRadius: "0px",
      width: "100%",
      maxWidth: "500px",
      boxShadow:
        "0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12)",
    },
  };



  return (
    <div>
    <Modal
    isOpen={open && !transportType}
    onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {loading ? (
        <ModalLoader />
      ) : (
        <div className="sm:bg-white bg-[#F5F5F5] w-full h-full sm:p-0">
          {/* Modal Header */}
          <div className="w-full sm:flex hidden justify-between mb-[18px] pb-2">
            <h1 className="text-lg text-[#000000DE]">
              {event?.title ? "Edit Activity" : event?.location && !event?.title ? "Add Meal" :  "Add Transport"}
            </h1>
            <div className=" flex items-center justify-center w-[30px] h-[30px] cursor-pointer hover:bg-[#e0e0e0] rounded-full">
              <img
                src={crossSvg}
                alt="Cross Icon"
                className="w-5"
                onClick={handleClose}
              />
            </div>
          </div>

          <div className="hidden justify-between items-center py-7 px-5 w-full absolute top-0 left-0 bg-white shadow-bs8 mobile-modal-header">
            <img
              src={backSvg}
              alt="back Icon"
              className="w-5"
              onClick={handleClose}
            />
            <p className="text-base leading-5 font-medium text-black ">{event?.title ? "Edit Activity" : "Add Transport"}</p>
            <button className="w-12 h-5 border-[0.5px] border-[#00a194] rounded-xl text-[10px] leading-3 font-bold text-[#00a194]" onClick={handleSubmit}>Save</button>
          </div>

          {/* Modal body */}
          <div className="mt-3 w-full">
            <div>
              <label for="transport" > Transportation type </label>
              
              <select
                id="transport"
                className="p-[10px] text-[14px] border-0 border-b-2 border-[#000000] w-full"
                onChange={handleTransportChange}
                value={transportType}
              >
                <option value="">Select</option>
                <option value="Flight">Flight</option>
                <option value="CarRental">Car Rental</option>
                <option value="Bus">Bus</option>
                {/* <option value="Train">Train</option> */}
                <option value="Other">Other</option>
              </select>
            </div> 
          </div>

          {/* modal footer */}
          

          <div className=" w-full sm:flex hidden mt-[30px]">
            <div className="w-[50%] ">
           
            </div>
            <div className="w-[50%] flex justify-end ">
             
              <button
                className="px-3 pt-1.5 pb-1 ml-1.5 text-sm font-medium uppercase transition-all duration-300 hover:bg-[#00000009]"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
    {transportType === "Train" && (
        <EventDialogTrain
          open={transportType === "Train"}
          setOpen={handleClose}
          event={event}
          useritineraryid={useritineraryid}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={fetchData}
          getActivities={getActivities}
          calendarStartDate={calendarStartDate}
        />
      )}
      {transportType === "Bus" && (
        <EventDialogTransportBus
          open={transportType === "Bus"}
          setOpen={handleClose}
          event={event}
          useritineraryid={useritineraryid}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={fetchData}
          getActivities={getActivities}
          calendarStartDate={calendarStartDate}
        />
      )}
       {transportType === "Other" && (
        <EventDialogOther
          open={transportType === "Other"}
          setOpen={handleClose}
          event={event}
          useritineraryid={useritineraryid}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={fetchData}
          getActivities={getActivities}
          calendarStartDate={calendarStartDate}
        />
      )}
       {transportType === "Flight" && (
        <EventDialogTransportFlight
          open={transportType === "Flight"}
          setOpen={handleClose}
          event={event}
          useritineraryid={useritineraryid}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={fetchData}
          getActivities={getActivities}
          calendarStartDate={calendarStartDate}
        />
      )}
      {transportType === "CarRental" && (
        <EventDialogTransportCarRental
          open={transportType === "CarRental"}
          setOpen={handleClose}
          event={event}
          useritineraryid={useritineraryid}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          loading={loading}
          isDragged={isDragged}
          setIsDragged={setIsDragged}
          fetchData={fetchData}
          getActivities={getActivities}
          calendarStartDate={calendarStartDate}
        />
      )}
    </div>
  );
}
ReactDOM.render(<EventDialogTransportPick />, document.getElementById("root"));
export default EventDialogTransportPick;
