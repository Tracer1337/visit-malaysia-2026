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

function EventDialog({
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

  console.log("event: ", event);

  var imageUrl = "";
  var baseURL = httpMethods.baseURL;
  console.log('EVENT: ', event);

  if (event?.extendedProps?.imageUrl) {
    if (event?.extendedProps?.imageUrl.indexOf("/") > -1) {
      imageUrl = baseURL + `/api/chatgpt/user/itinerary/coverimage` + event?.extendedProps?.imageUrl;
    } else {
      imageUrl = baseURL + `/api/restaurant/images/` + event?.extendedProps?.imageUrl;
    }
  } else if (event?.imageUrl) {
    imageUrl = event?.imageUrl;
  }
  const [selectedImage, setSelectedImage] = useState(imageUrl);

  const {
    addActivityToItinerary,
    deleteExistingActivity,
    deleteSavedActivity,
    editActivityForItinerary,
  } = EventsApi;

  var startDateTmp = new Date();
  var startTimeTmp = "10:00";

  // Get the itinerary day from localStorage
  var itineraryDays = localStorage.getItem("INTINERARY_DAY") || 2;
  var itineraryStartDate = new Date(localStorage.getItem("INTINERARY_STARTDATE")) || new Date();

  // Parse the days as an integer
  var days = parseInt(itineraryDays, 10);

  // Calculate the end date by adding the number of days
  var endDateTmp = new Date(itineraryStartDate);
  endDateTmp.setDate(endDateTmp.getDate() + days - 1);

  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  var formattedEndDate = new Date(endDateTmp.toLocaleDateString('en-GB', options));

  console.log("End Date:", formattedEndDate);



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
    bookedThrough: event?.extendedProps?.bookedThrough || "",
    confirmationNo: event?.extendedProps?.confirmationNo || "",
    bookingName: event?.extendedProps?.bookingName || "",
    everybody: event?.extendedProps?.everybody || "",
    peopleNames: event?.extendedProps?.peopleNames || "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: activitySchema,
    onSubmit: async (values) => {

      var startDateISO = DateTime.fromISO(startDate.toISOString());

      const startDt = DateTime.fromFormat(startDateISO.toFormat("dd/MM/yyyy") + " " + startTime, "dd/MM/yyyy HH:mm");

      const formattedStartDate = startDt.toFormat('dd MMMM yyyy');
      const formattedStartTime = startDt.toFormat('h:mm a').toLocaleLowerCase();

      // Extract the hour
      const hour = startDt.hour;

      // Determine the period
      let period = '';

      if (hour >= 0 && hour < 12) {
        period = 'morning activity';
      } else if (hour >= 12 && hour < 18) {
        period = 'afternoon activity';
      } else if (hour >= 18 && hour <= 23) {
        period = 'evening activity';
      }

      const activityToSave = {
        user_itinerary_id: useritineraryid,
        activity: values?.title,
        place: values?.location,
        time: formattedStartTime,
        date: formattedStartDate,
        day: values.day,
        // period: values.period,
        period: period,
        comment: values?.comments ? values.comments : "",
        booked_through: values?.bookedThrough ? values.bookedThrough : "",
        confirmation_no: values?.confirmationNo ? values.confirmationNo : "",
        booking_name: values?.bookingName ? values.bookingName : "",
        everybody: selection,
        people_names: values?.peopleNames ? values.peopleNames : "",
      };

      console.log("ActivityToSave: ", activityToSave, hour);

      const formData = new FormData();

      if (selectedImage && selectedImage.toString().indexOf("api") > 0) {
        activityToSave.image = selectedImage;
      }

      if (selectedImage) {
        formData.append('cover_image', selectedImage);
      }


      if (isEdit) {
        const apiUrl = baseURL + '/api/planner/user/itinerary/activity/editAndUpload';

        const activityToEdit = { ...activityToSave, id: values.draggedID ? values.draggedID : values.id }
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
          } else {
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
        const apiUrl = baseURL + '/api/planner/user/itinerary/activity/addAndUpload';

        const activityToAdd = { ...activityToSave, user_itinerary_id: parseInt(activityToSave.user_itinerary_id) }

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
            console.log(activityToSave, "save");

          } else if (response?.data?.status === 2) {
            toast.error("Can not set Activity date before Start Date", {
              autoClose: 4000,
              position: 'top-right',
              closeButton: false,
              className: "xs:top-40 lg:top-20 toast-message",
            });
          } else {
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


  const [selection, setSelection] = useState(
    event?.extendedProps?.everybody === "" || event?.extendedProps?.everybody === null || event?.extendedProps?.everybody === undefined
      ? "true"
      : String(event.extendedProps.everybody)
  );

  const handleSelectionChange = (event) => {
    const { value } = event.target;
    setSelection(value);
  
    if (value === "true") {
      // Clear the peopleNames field if "Everybody" is selected
      handleChange({ target: { name: "peopleNames", value: "" } });
    }
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
        <div className="font-montserrat sm:bg-white bg-[#F5F5F5] w-full h-full sm:p-0 pl-9 pr-[46px]">
          {/* Modal Header */}
          <div className="w-full sm:flex hidden justify-between items-center mt-[5px] mb-[15px] pb-2">
            <h1 className="text-lg text-[#000000DE] font-bold">
              {event?.title
                ? "Edit Activity"
                : event?.isAddMeal
                  ? "Add Meal"
                  : event?.location && !event?.title
                    ? "Add Meal"
                    : "Add Activity"}
            </h1>

            <div className="flex items-center justify-center w-[30px] h-[30px] cursor-pointer hover:bg-[#e0e0e0] rounded-full">
              <img
                src={crossSvg}
                alt="Cross Icon"
                className="w-5 "
                onClick={closeModal}
              />
            </div>
          </div>


          <div className="flex justify-between gap-5">
            {/* UPLOAD IMAGE */}
            <div className="w-1/2 h-[180px] px-0 py-0 mb-2 border-[0.5px] border-[#5c5c5f] rounded-sm flex items-center">
              <div className="relative w-full h-full">
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
            </div>

            <div className="w-1/2 flex flex-col">
              <div className="flex-wrap w-full mb-3 ">
                <LabledInput
                  onChange={handleChange}
                  value={values.title}
                  name={"title"}
                  type={"text"}
                  lable={"Title"}
                  isError={errors.title}
                />
              </div>
              <div className="flex-wrap w-full mb-3">
                <LabledInput
                  onChange={handleChange}
                  value={values.location}
                  name={"location"}
                  type={"text"}
                  lable={"Location"}
                  isError={errors.location}
                />
              </div>

              <div className="flex justify-between gap-5">
                <div class="flex flex-col w-full">
                  <div>
                    <label class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Start Date</label>
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
                    }}
                    minDate={itineraryStartDate}
                    maxDate={formattedEndDate}
                  />
                </div>
                <div class="flex flex-col w-full">
                  <div>
                    <label class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Time</label>
                  </div>
                  <input type="time" id="startTime" name="startTime"
                    value={startTime}
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                    onChange={handleChangeDate}
                    className={`sm:border-b-[#050505a8] border-[#5C5C5F] border-b-[0.5px] border-t-0 border-x-0 focus:border-[#e3165b]  py-1 px-0 sm:h-[30px] h-5 sm:border-b focus:border-b-[2px] text-[13px] text-[#000] opacity-80 placeholder:text-[13px] placeholder:text-[#000] sm:mt-0 mt-1 sm:bg-transparent bg-[#f5f5f5]}`} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex justify-between sm:flex-nowrap flex-wrap mb-1 ">
            <div className="flex justify-start items-center">
              <span className="text-[#00A19A] font-medium text-[12px]">
                {event?.distance ? `${event.distance?.toUpperCase()} away` : ''}
              </span>
            </div>
            <div className="flex justify-end mr-2">
              <button
                className="bg-[#00A19A] text-white font-bold py-1 px-4 rounded text-[12px] font-normal"
                onClick={() => console.log('Button clicked')}
              >
                Direction
              </button>
            </div>
          </div>

          {/* <div className="hidden justify-between items-center py-7 px-5 w-full absolute top-0 left-0 bg-white shadow-bs8 mobile-modal-header">
            <img
              src={backSvg}
              alt="back Icon"
              className="w-5"
              onClick={closeModal}
            />
            <p className="text-base leading-5 font-medium text-black ">{event?.title ? "Edit Activity" : "Add Activity"}</p>
            <button className="w-12 h-5 border-[0.5px] border-[#00a194] rounded-xl text-[10px] leading-3 font-bold text-[#00a194]" onClick={handleSubmit}>Save</button>
          </div> */}

          {/* Modal body */}

          <div className="w-full flex flex-col mb-3">
            <div className="w-full flex-wrap mb-3">
              <LabledInput
                isComment={true}
                onChange={handleChange}
                value={values.comments}
                name={"comments"}
                type={"text"}
                lable={"Note"}
              />
            </div>

            <div className="mb-1">
              <label class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Details</label>
            </div>
            <div className="w-full flex justify-between sm:flex-nowrap flex-wrap mb-3 gap-4">
              <LabledInput
                isDetails={true}
                onChange={handleChange}
                value={values.bookedThrough}
                name={"bookedThrough"}
                type={"text"}
                lable={"Booked Through"}
                isError={errors.bookedThrough}
              />
              <LabledInput
                isDetails={true}
                onChange={handleChange}
                value={values.confirmationNo}
                name={"confirmationNo"}
                type={"text"}
                lable={"Confirmation No."}
                isError={errors.confirmationNo}
              />
              <LabledInput
                isDetails={true}
                onChange={handleChange}
                value={values.bookingName}
                name={"bookingName"}
                type={"text"}
                lable={"Name on Booking"}
                isError={errors.bookingName}
              />
            </div>

            {/* <div className="w-full flex sm:flex-nowrap flex-wrap justify-between  sm:mb-3 mb-6 sm:mt-0 mt-3 sm:gap-4 gap-6">
              <div class="flex flex-col sm:w-1/2 w-full">
                <div>
                  <label class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Start Date</label>
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
              <div class="flex flex-col sm:w-1/2 w-full">
                <div>
                  <label class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Time</label>
                </div>
                <input type="time" id="startTime" name="startTime"
                  value={startTime}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  onChange={handleChangeDate}
                  className={`sm:border-b-[#050505a8] border-[#5C5C5F] border-b-[0.5px] border-t-0 border-x-0 focus:border-[#e3165b]  py-1 px-0 sm:h-[30px] h-5 sm:border-b focus:border-b-[2px] text-[13px] text-[#000] opacity-80 placeholder:text-[13px] placeholder:text-[#000] sm:mt-0 mt-1 sm:bg-transparent bg-[#f5f5f5]}`} />
              </div>
            </div> */}
          </div>

          {/* <div className="w-full flex justify-between sm:flex-nowrap flex-wrap mb-3 gap-4">
            <LabledInput
              onChange={handleChange}
              value={values.period}
              name={"period"}
              type={"text"}
              isPeriod={true}
              lable={"Activity Period"}
              isError={errors.period}
            />
            <LabledInput
              onChange={handleChange}
              value={values.day}
              name={"day"}
              type={"text"}
              lable={"Activity Day"}
              isDay={true}
              isError={errors.false}
            />
          </div> */}
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row">
              <label className="text-sm font-medium text-gray-700 mr-5">People:</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="option1"
                    name="selection"
                    type="radio"
                    value="true"  // Set value to "true" for Everybody
                    checked={selection === "true"}
                    onChange={handleSelectionChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="option1" className="ml-2 block text-sm text-gray-700">
                    Everybody
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="option2"
                    name="selection"
                    type="radio"
                    value="false"  // Set value to "false" for Specific People
                    checked={selection === "false"}
                    onChange={handleSelectionChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="option2" className="ml-2 block text-sm text-gray-700">
                    Specific People
                  </label>
                </div>
              </div>
            </div>
            <div>
              <LabledInput
                isDetails={true}
                onChange={handleChange}
                value={selection === "true" ? "" : values.peopleNames}
                name={"peopleNames"}
                type={"text"}
                // lable={"Location"}
                isError={errors.peopleNames}
                placeholder={"Type their name"}
                disabled={selection === "true"}
                style={selection === "true" ? { cursor: 'default' } : {}}
              />
            </div>
          </div>


          {/* modal footer */}
          <div className=" w-full sm:flex hidden mt-[20px]">
            <div className="w-[50%] ">
              {event?.title && !isDragged ? (
                <button
                  className="px-0 pt-1.5 pb-1 ml-1.5 text-sm font-medium uppercase transition-all duration-300 hover:bg-[#00000009]"
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
ReactDOM.render(<EventDialog />, document.getElementById("root"));
export default EventDialog;
