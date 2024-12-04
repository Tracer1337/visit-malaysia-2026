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

function EventDialogTrain({
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
  
  function handleChangeDate(e) {
    setStartTime(e.target.value);
 }
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

  const handleDelete = async () => {
    const existingActivityToDelete = {
      itinerary_id: parseInt(useritineraryid),
      activity_id: parseInt(values.id),
    };

    const res = await deleteExistingActivity(existingActivityToDelete);
    if (res?.data?.status === 0) {
      toast("Activity Deleted Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsEdit(false);
      getActivities(useritineraryid);
    }
    console.log(res);
    setOpen(false);
  };

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

  const closeModal = () => {
    setOpen(false);
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const compressedFile = await compressImage(selectedFile);
        setSelectedImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }

  };

  const compressImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      const originalSize = file.size / 1024; // Convert size to kilobytes

      // Check if the original image size is greater than 1000 KB
      if (originalSize > 1000) {
        try {
          let compressedFile;
          let compressedSize;

          // Iterate with different quality settings until the size is below 1000 KB
          for (let quality = 0.8; quality >= 0.1; quality -= 0.1) {
            compressedFile = await new Promise((resolve, reject) => {
              new Compressor(file, {
                quality: quality,
                success(result) {
                  resolve(result);
                },
                error(error) {
                  reject(error);
                },
              });
            });

            compressedSize = compressedFile.size / 1024; // Convert size to kilobytes

            if (compressedSize <= 1000) {
              break; // Exit the loop if the size is below or equal to 1000 KB
            }
          }

          console.log(`Original Size: ${originalSize.toFixed(2)} KB`);
          console.log(`Compressed Size: ${compressedSize.toFixed(2)} KB`);

          resolve(compressedFile);
        } catch (error) {
          reject(error);
        }
      } else {
        console.log(`Image size is not greater than 1000 KB. No compression needed.`);
        resolve(file);
      }
    });
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={closeModal}
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
              {event?.title ? "Edit Activity" : event?.location && !event?.title ? "Add Meal" :  "Add Train"}
            </h1>
            <div className=" flex items-center justify-center w-[30px] h-[30px] cursor-pointer hover:bg-[#e0e0e0] rounded-full">
              <img
                src={crossSvg}
                alt="Cross Icon"
                className="w-5"
                onClick={closeModal}
              />
            </div>
          </div>

          <div className="hidden justify-between items-center py-7 px-5 w-full absolute top-0 left-0 bg-white shadow-bs8 mobile-modal-header">
            <img
              src={backSvg}
              alt="back Icon"
              className="w-5"
              onClick={closeModal}
            />
            <p className="text-base leading-5 font-medium text-black ">{event?.title ? "Edit Activity" : "Add Train"}</p>
            <button className="w-12 h-5 border-[0.5px] border-[#00a194] rounded-xl text-[10px] leading-3 font-bold text-[#00a194]" onClick={handleSubmit}>Save</button>
          </div>

          {/* Modal body */}
          <div className="mt-3 mb-3 flex">
            <div>
              <input checked id="radio-1" type="radio" value="" name="radio" class="w-4 h-4"/>
              <label for="radio-1" class="text-xs text-[#000000]"> Departure </label>
            </div>
            <div className="ml-3">
              <input id="radio-2" type="radio" value="" name="radio" class="w-4 h-4"/>
              <label for="radio-2" class="text-xs text-[#000000]"> Arrival </label>
            </div>
          </div>
          <div className="w-full mb-3 gap-4">
            <LabledInput
              onChange={handleChange}
              value={values.title}
              name={"title"}
              type={"text"}
              lable={"Title"}
              isError = {errors.title}
            />
            <div className="mt-3">
              <div>
                <label for="location" class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  "> Station Location</label>
              </div>
              <input id="location" type="text" className="text-[13px] border-0 border-b-[2px] border-[#6F6F6F] w-full mt-1 p-0"/>
            </div>
            <div className="w-full flex justify-between mt-1 items-center">
            <div>
              <text className="text-[#008009] text-l">
                ? KM away
              </text>
            </div>
            <div>
              <div className="py-2 px-4 rounded-[5px] bg-[#00A19A]">
                <text className="text-m text-[#FFFFFF]">
                  Direction
                </text>
              </div>
            </div>
          </div>
            <div className="w-full">
              <div>
                <label for="date" class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Date</label>
              </div>
              <input id="date" type="date" className="text-[13px] border-0 border-b-[2px] border-[#6F6F6F] w-full mt-1 p-0"/>
            </div>
          </div>
          <div className="w-full flex justify-between sm:flex-nowrap flex-wrap mb-3 gap-4">
            <div className="w-full">
              <div>
                <label for="time" className="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black"> Time </label>
              </div>
              <input id="time" type="time" className="text-[13px] border-0 border-b-[2px] border-[#6F6F6F] w-full mt-1 p-0"/>
            </div>
          </div>
          <div className="w-full flex justify-between gap-4 mt-3">
            <LabledInput
              isComment={true}
              onChange={handleChange}
              value={values.comments}
              name={"comments"}
              type={"text"}
              lable={"Note"}
            />
          </div>
          <div className="mt-3">
            <text className="text-s text-[#000000]">
              Details
            </text>
          </div>
          <div className=" flex justify-between gap-4 items-end">
            <LabledInput
              onChange={handleChange}
              name={"platformno"}
              type={"text"}
              lable={"Platform No."}
              />
          </div>
          
          {/* modal footer */}
          

          <div className=" w-full sm:flex hidden mt-[30px]">
            <div className="w-[50%] ">
              {event?.title && !isDragged ? (
                <button
                  className="px-3 pt-1.5 pb-1 ml-1.5 text-sm font-medium uppercase transition-all duration-300 hover:bg-[#00000009]"
                  onClick={handleDelete}
                >
                  DELETE
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="w-[50%] flex justify-end ">
              <button
                className="px-3 pt-1.5 pb-1 ml-1.5 text-sm font-medium text-[#e3165b] uppercase bg-transparent transition-all duration-300 hover:bg-[#e3165b0A]"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="px-3 pt-1.5 pb-1 ml-1.5 text-sm font-medium uppercase transition-all duration-300 hover:bg-[#00000009]"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
ReactDOM.render(<EventDialogTrain />, document.getElementById("root"));
export default EventDialogTrain;
