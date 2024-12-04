import Modal from "react-modal";
import ReactDOM from "react-dom";
import LabledInput from "./LabledInput";
import { useFormik } from "formik";
import crossSvg from "./cross.svg";
import backSvg from "./ep_back.svg";
import EventsApi from "./api/events";
import ModalLoader from "./ModalLoader";
import { ToastContainer, toast } from "react-toastify";
import "./editableView2.css";
import { useState } from "react";
import { activitySchema } from "./validationSchems";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import axios from 'axios';
import httpMethods from "./api/index";
import Compressor from '@xkeshi/image-compressor';
import { AiOutlinePlus } from 'react-icons/ai';


function EventDialogTransportCarRental({
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
  var baseURL = httpMethods.baseURL;

  let imageUrl;
  var baseURL = httpMethods.baseURL;

  if(event?.extendedProps?.image){  
    if(event?.extendedProps?.image.indexOf("/")>-1){
      imageUrl = baseURL + `/api/chatgpt/user/itinerary/coverimage`+event?.extendedProps?.image;             
    }else{      
      imageUrl= baseURL+ `/api/restaurant/images/`+  event?.extendedProps?.image;  
    }    
  }else if(event?.image){
       imageUrl=  event?.image;  
  }
  const [selectedImage, setSelectedImage] = useState(imageUrl);
  const [coverImagePath, setCoverImagePath] = useState(''); // For existing images

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const compressedFile = await compressImage(selectedFile);
        console.log('Compressed Image:', compressedFile);
        setSelectedImage(compressedFile); // Update the state with the compressed file
        setCoverImagePath(''); // Clear existing image path when a new image is selected
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    setCoverImagePath(''); // Clear both the selected and existing images
  };

  const compressImage = async (file) => {
    return new Promise((resolve, reject) => {
      const originalSize = file.size / 1024; // Convert size to kilobytes

      if (originalSize > 1000) {
        try {
          new Compressor(file, {
            quality: 0.6, // Adjust quality to ensure the image is below 1000 KB
            success(result) {
              resolve(result);
            },
            error(err) {
              reject(err);
            },
          });
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(file);
      }
    });
  };

  const {
    addActivityToItinerary,
    deleteExistingActivity,
    deleteSavedActivity,
    editActivityForItinerary,
  } = EventsApi;

  var startDateTmp = new Date();
  var startTimeTmp = "10:00";

  if (event?.startStr) {
    var tmp = event?.startStr.split("+")[0];
    tmp = DateTime.fromISO(tmp);
    startDateTmp = tmp.toFormat("MM/dd/yyyy");
    startDateTmp = new Date(startDateTmp);

    startTimeTmp = tmp.toFormat("HH:mm");

  } else {
    if (calendarStartDate != "") {
      startDateTmp = new Date(calendarStartDate);
    }
  }

  const [selection, setSelection] = useState(
    event?.extendedProps?.type === "" || event?.extendedProps?.type === null || event?.extendedProps?.type === undefined
      ? "0"
      : String(event.extendedProps.type)
  );

  const handleSelectionChange = (event) => {
    const { value } = event.target;
    setSelection(value);
  
    // if (value === "true") {
    //   // Clear the peopleNames field if "Everybody" is selected
    //   handleChange({ target: { name: "peopleNames", value: "" } });
    // }
  };

  const [startDate, setStartDate] = useState(startDateTmp);
  const [startTime, setStartTime] = useState(startTimeTmp);

  function handleChangeDate(e) {
    setStartTime(e.target.value);
  }
  const initialValues = {
    id: event?.id || "",
    type: event?.type || "",
    title: event?.title || "",
    note: event?.extendedProps?.note || "",
    location: event?.extendedProps?.location || "",
    time: event?.extendedProps?.time || "",
    date: event?.extendedProps?.date || "",
    bookedThrough: event?.extendedProps?.bookedThrough || "",
    confirmationNo: event?.extendedProps?.confirmationNo || "",
    carrier: event?.extendedProps?.carrier || "",
    duration: event?.extendedProps?.duration || "",
    timezone: event?.extendedProps?.timezone || "",
    gps: event?.extendedProps?.gps || "",
    distance: event?.extendedProps?.distance || "",
};



console.log("event",event)
console.log("initial value",initialValues)
console.log("eventimage", event?.extendedProps?.image)


  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: null, // Replace with your validation schema if needed
    onSubmit: async (values) => {
      // Format the date and time
      const startDateISO = DateTime.fromISO(startDate.toISOString());
      const startDt = DateTime.fromFormat(
        startDateISO.toFormat("dd/MM/yyyy") + " " + startTime,
        "dd/MM/yyyy HH:mm"
      );

      const formattedStartDate = startDt.toFormat("dd MMMM yyyy");
      const formattedStartTime = startDt.toFormat("h:mm a").toLocaleLowerCase();

      const request_car = {
        user_itinerary_id: useritineraryid,
        type: selection,
        title: values.title,
        note: values.note,
        location: values.location,
        time: formattedStartTime,
        date: formattedStartDate,
        booked_through: values.bookedThrough,
        confirmation_no: values.confirmationNo,
        carrier: values.carrier,
        duration: values.duration,
        timezone: values.timezone,
        // gps: values.gps,
        // distance: values.distance,
      };
      console.log("req_car",request_car)

      const formData = new FormData();

      if(selectedImage && selectedImage.toString().indexOf("api") >0){     
        request_car.image = selectedImage;        
      }

      // Append the compressed image if available
      if (selectedImage) {
        formData.append('cover_image', selectedImage);
        console.log("image",selectedImage)

      }
      
      const apiUrl = baseURL + "/api/planner/user/itinerary/transport/car/save";

      if (isEdit) {
        // Add the id for editing
        const carToEdit = { ...request_car, id: values.draggedID ? values.draggedID : values.id };

        const json = JSON.stringify(carToEdit);
        const blob = new Blob([json], {
          type: "application/json",
        });

        formData.append("request_car", blob);
        
        try {
          const response = await axios.post(apiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
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

          } else {
            toast.error("Failed to update car itinerary", {
              autoClose: 4000,
              position: "top-right",
              closeButton: false,
            });
          }
        } catch (error) {
          console.error("Error updating car itinerary:", error);
          toast.error("Failed to update car itinerary", {
            autoClose: 4000,
            position: "top-right",
            closeButton: false,
          });
        }
      } else {
        const carToAdd = {...request_car, user_itinerary_id:parseInt(request_car.user_itinerary_id)}
        const json = JSON.stringify(carToAdd);
        const blob = new Blob([json], {
          type: "application/json",
        });

        formData.append("request_car", blob);
        
        

        try {
          const response = await axios.post(apiUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
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
            console.log(request_car, "save");
          } else {
            toast.error("Failed to add car itinerary", {
              autoClose: 4000,
              position: "top-right",
              closeButton: false,
            });
          }
        } catch (error) {
          console.error("Error adding car itinerary:", error);
          toast.error("Failed to add car itinerary", {
            autoClose: 4000,
            position: "top-right",
            closeButton: false,
          });
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
              {event?.title ? "Edit Car" : event?.location && !event?.title ? "Add Meal" : "Add Car"}
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
            <p className="text-base leading-5 font-medium text-black ">{event?.title ? "Edit Car" : "Add Car"}</p>
            <button className="w-12 h-5 border-[0.5px] border-[#00a194] rounded-xl text-[10px] leading-3 font-bold text-[#00a194]" onClick={handleSubmit}>Save</button>
          </div>

          {/* Modal body */}
          <div className="mt-3 mb-3 flex">
            <div>
              <input
                id="radio-1"
                type="radio"
                value="0"
                name="radio"
                class="w-4 h-4"
                onChange={handleSelectionChange}
                checked={selection === '0'}
              />
              <label for="radio-1" class="text-xs text-[#000000]"> Pick-up </label>
            </div>
            <div className="ml-3">
              <input
                id="radio-2"
                type="radio"
                value="1"
                name="radio"
                class="w-4 h-4"
                onChange={handleSelectionChange}
                checked={selection === '1'}
              />
              <label for="radio-2" class="text-xs text-[#000000]"> Drop-off </label>
            </div>
          </div>
          <div className="w-full flex justify-between sm:flex-nowrap flex-wrap mb-3 gap-4">
            <div className=" w-[500px] h-[150px]  sm:mt-3 mt-[85px] mb-[15px] border-[0.5px] border-[#5c5c5f] rounded-sm flex justify-between items-center gap-4">
            <div className="overflow-hidden relative w-full h-full">
                  {selectedImage ? (
                    <>
                      <button
                        className="absolute top-2 right-2 p-1 bg-[#808080] rounded-full text-white"
                        style={{
                          padding: 0,
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onClick={() => {
                          setSelectedImage(null); // Clear the selectedImage state
                        }}
                      >
                        X
                      </button>
                      <img
                        src={
                          typeof selectedImage === "string"
                            ? selectedImage
                            : URL.createObjectURL(selectedImage)
                        }
                        alt="Selected"
                        className="w-full h-full object-cover"
                      />
                    </>
                  ) : (
                    <label className="flex flex-col cursor-pointer mt-16 text-[#00a19a] font-bold items-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="20px"
                        width="20px"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <span className="font-normal mt-1">Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>

                  )}
                </div>
              
            </div>

            <div className="w-full mb-3 gap-4">
              <div>
                <div>
                  <label for="title" class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Title</label>
                </div>
                <input
                  onChange={handleChange}
                  value={values.title}
                  name={"title"}
                  type={"text"}
                  lable={"Title"}
                  isError={errors.title}
                  className="text-[13px] border-0 border-b-[2px] border-[#6F6F6F] w-full mt-1 p-0"
                />
              </div>
              <div>
                <div>
                  <label for="location" class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Location</label>
                </div>
                <input
                  id="location"
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                  className="text-[13px] border-0 border-b-[2px] border-[#6F6F6F] w-full mt-1 p-0"
                />
              </div>
              <div className="w-full">
                <div>
                  <label for="date" class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Date</label>
                </div>
                <DatePicker
                  toggleCalendarOnIconClick
                  showIcon
                  selected={startDate}
                  dateFormat={"dd/MM/yyyy"}
                  onChange={(date) => setStartDate(date)}
                  autoClose
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }} />
              </div>
            </div>
          </div>
          {/* <div className="w-full flex justify-between mt-1 items-center">
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
          </div> */}
          <div className="w-full flex justify-between sm:flex-nowrap flex-wrap mb-3 gap-4">
            <div className="w-full">
              <div>
                <label for="time" className="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black"> Time </label>
              </div>
              <input
                id="time"
                name="time"
                type="time"
                className="text-[13px] border-0 border-b-[2px] border-[#6F6F6F] w-full mt-1 p-0"
                value={startTime}
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                onChange={handleChangeDate}
              />
            </div>
          </div>
          <div className="w-full flex justify-between gap-4 mt-3">
            <LabledInput
              isComment={true}
              onChange={handleChange}
              value={values.note}
              name={"note"}
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
              value={values.bookedThrough}
              name="bookedThrough"
              type="text"
              lable="Booked Through"
            />
            <LabledInput
              onChange={handleChange}
              value={values.confirmationNo}
              name="confirmationNo"
              type="text"
              lable="Confirmation No."
            />
            <LabledInput
              onChange={handleChange}
              value={values.carrier}
              name={"carrier"}
              type={"text"}
              lable={"Carrier"}
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
ReactDOM.render(<EventDialogTransportCarRental />, document.getElementById("root"));
export default EventDialogTransportCarRental;
