import Modal from "react-modal";
import ReactDOM from "react-dom";
import LabledInput from "./LabledInput";
import { useFormik } from "formik";
import crossSvg from "./cross.svg";
import backSvg from "./ep_back.svg";
import EventsApi from "./api/events";
import ModalLoader from "./ModalLoader";
import { toast } from "react-toastify";
import "./editableView2.css";
import { useState } from "react";
import { activitySchema, changeDateSchema } from "./validationSchems";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
function ChangeDateDialog({
  open,
  setOpen,  
  useritineraryid, 
  loading,  
  days,
  calendarStartDate,
  getActivities
}) {
  Modal.setAppElement("#root");

  const {
    extendDaysForItinerary
  } = EventsApi;

  const initialValues = {    
    start: calendarStartDate,   
    day: days
  };
  const [startDate, setStartDate] = useState(calendarStartDate?new Date(calendarStartDate): new Date());
  
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: changeDateSchema,
    onSubmit: async (values) => {
      
      var startDt = DateTime.fromISO(startDate.toISOString());
      
      const formattedStartDate = startDt.toFormat('dd MMMM yyyy');
    
     const itineraryRequest = {
      user_itinerary_id: useritineraryid,     
      date: formattedStartDate,
      day: values.day      
    };

     const response = await extendDaysForItinerary(itineraryRequest);
     
     if (response?.data?.status === 0) {
       toast("Changed Start Date and Days Successfully", {
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
       });
     }
     getActivities(useritineraryid);
       
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
        <div className="sm:bg-white bg-[#F5F5F5] w-full h-full sm:p-0 pl-9 pr-[46px]">
          {/* Modal Header */}
          <div className="w-full sm:flex hidden justify-between mb-[18px] pb-2">
            <h1 className="text-lg text-[#000000DE]">
              Change Date
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
            <p className="text-base leading-5 font-medium text-black ">Change Date</p>
            <button className="w-12 h-5 border-[0.5px] border-[#00a194] rounded-xl text-[10px] leading-3 font-bold text-[#00a194]" onClick={handleSubmit}>Save</button>
          </div>

          {/* Modal body */}

          <div className="w-full flex flex-col">       
            <div className="w-full flex sm:flex-nowrap flex-wrap justify-between  sm:mb-3 mb-6 sm:mt-0 mt-3 sm:gap-4 gap-6">
            <div>
              <div>
                <label class="text-[13px] text-[RGBA(0, 0, 0, 0.87)] relative top-1 sm:text-[RGBA(0, 0, 0, 0.87)] text-black  ">Start</label>
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
              }}/>
            </div>

              <LabledInput
                onChange={handleChange}
                value={values.day}
                name={"day"}
                type={"text"}
                lable={"Day (1-60)"}
                isError = {errors.day}
              />
            </div>

          </div>

          {/* modal footer */}

          <div className=" w-full sm:flex hidden mt-[200px]">
            <div className="w-[50%] ">
             
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
ReactDOM.render(<ChangeDateDialog />, document.getElementById("root"));
export default ChangeDateDialog;
