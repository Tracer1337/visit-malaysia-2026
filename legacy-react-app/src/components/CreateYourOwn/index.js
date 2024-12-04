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
// import "./Popup2.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import { FiCalendar } from "react-icons/fi";
import LoadingSpinner from "components/LoadingSpinner/index";

const CreateYourOwn = ({ showCreateYourOwn, closeCreateYourOwn, backCreateYourOwn, activityId, image, closePopup44 }) => {
  // const [showContentSetting, setShowContentSetting] = React.useState(false);
  // const location = useLocation();
  // const receivedData = location.state;

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingg, setIsLoadingg] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const userId = localStorage.getItem("userId");
  const [cover_image, setCoverImage] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const chatgptId = useSelector((state) => state.data.itineraryId);
  const [mode, setMode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const minDate = new Date();
  const [destination, setDestination] = useState('');
  const [successMessageType, setSuccessMessageType] = useState("added");
  const [newItinerary, setNewItinerary] = useState(null);
  const navigate = useNavigate();
  const { creatorId, itineraryId, itineraryTitle } = useParams();


  const resetForm = () => {
    setTitle('');
    setDays('');
    setDate(new Date()); // Reset to current date or specific default date
    setDescription('');
    setCoverImage('');
    setIsLoading(false);
  };

  console.log('COVER IMAGE:', cover_image);

  const handleCoverImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const compressedFile = await compressImage(selectedFile);
        console.log('Compressed File:', compressedFile);
        setCoverImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };


  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const originalSize = file.size / 1024; // Convert size to kilobytes

      if (originalSize > 1000) {
        let quality = 0.8; // Starting quality
        let compressedFile;
        let compressedSize;

        const compress = () => {
          new Compressor(file, {
            quality: quality,
            success(result) {
              compressedFile = result;
              compressedSize = compressedFile.size / 1024; // Convert size to kilobytes

              if (compressedSize <= 1000 || quality <= 0.1) {
                console.log(`Original Size: ${originalSize.toFixed(2)} KB`);
                console.log(`Compressed Size: ${compressedSize.toFixed(2)} KB`);
                resolve(compressedFile);
              } else {
                quality -= 0.1;
                compress(); // Retry compression with lower quality
              }
            },
            error(error) {
              reject(error);
            },
          });
        };

        compress();
      } else {
        console.log('Image size is not greater than 1000 KB. No compression needed.');
        resolve(file);
      }
    });
  };


  const handleImageRemove = (imageTypes) => {
    imageTypes.forEach((imageType) => {
      switch (imageType) {
        case 'cover_image':
          console.log('Removing Cover Image');
          setCoverImage(null);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    console.log('cover_image state:', cover_image);
  }, [cover_image]);


  useEffect(() => {
    console.log('Activity ID in AddtoContentNew:', activityId);
  }, [activityId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);  // Convert string to Date object
    const day = ('0' + date.getDate()).slice(-2);  // Get day and pad with zero if needed
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Get month, add 1 as months are zero-indexed, and pad
    const year = date.getFullYear();  // Get full year
    return `${day}/${month}/${year}`;  // Format date in DD/MM/YYYY format
  }

  const handleCreateYourOwn1 = async () => {

    // Validation - Check if title, days, or date are null/empty
    if (!title || !days || !date) {
      // Show an error message to the user
      alert('Please fill in all required fields: Title, Number of Days, and Date.');
      return; // Stop the function execution if validation fails
    }

    const requestItinerary = {
      title: title,
      description: description,
      day: days,
      user_id: userId,
      date: formatDate(date),
    };

    function convertToISO(dateStr) {
      // Parse the input date string to a Date object
      const date = new Date(dateStr);

      // Convert the date object to the ISO string and adjust to UTC
      const isoDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toISOString();

      return isoDate;
    }

    function encodeTitle(title) {
      return encodeURIComponent(title);
    }

    const dataToPass = {
      location: destination,
      startDate: convertToISO(date),
      day: days,
      cyo: true
    };

    console.log("ZZData to pass: ", dataToPass, requestItinerary);
    // Store data
    // localStorage.setItem('cyo', 'true');
    navigate(`/itinerary-save/${userId}/712/${encodeTitle(title)}/editableView`, { state: dataToPass });
    // navigate(`/itinerary-save/9/712/Title%20of%20Itinerary%208/editableView/cyo`, { state: dataToPass });

    console.log("REQUESTTT: ", requestItinerary, " image: ", cover_image);
  };

  const handleCreateYourOwn = async () => {

    // Validation - Check if title, days, or date are null/empty
    if (!title || !days || !date) {
      // Show an error message to the user
      alert('Please fill in all required fields: Title, Number of Days, and Date.');
      return; // Stop the function execution if validation fails
    }

    setIsLoading(true);

    const formData = new FormData();

    const requestItinerary = {
      title: title,
      description: description,
      day: days,
      user_id: userId,
      date: formatDate(date),
    };

    console.log("XXREQUESTTT: ", requestItinerary, " image: ", cover_image);


    const json = JSON.stringify(requestItinerary);
    const blob = new Blob([json], { type: 'application/json' });

    formData.append('request_itinerary', blob);

    if (cover_image) {
      formData.append('cover_image', cover_image);
    }
    else {
      formData.append('cover_image', new File([], 'empty.jpg'));
    }


    try {
      const response = await axios.post('https://halaltravel.ai/ht/api/chatgpt/user/itinerary-noai/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('XXformData:', formData);
      console.log('XXNew itinerary created:', response.data);
      // setNewItinerary(response.data);

      if (response.status === 200) {
        console.log('XXItinerary created successfully:', formData);

        // Extract the itineraryId from the response
        const itineraryId = response.data.user_itinerary_id;

        // Second API call to update status
        const updateStatusResponse = await axios.post(`https://halaltravel.ai/hv/api/chatgpt/user/itinerary/updatestatus`, {
          userId: userId,
          itineraryId,
          status: 'DRAFT',
        });

        if (updateStatusResponse.status === 200) {
          console.log('API call to update status successful');
          closeCreateYourOwn();
          toast.success('Travel plan successfully created', {
            autoClose: 1500,
            position: 'bottom-center',
            closeButton: false,
            className: 'toast-message'
          });


          function convertToISO(dateStr) {
            // Parse the input date string to a Date object
            const date = new Date(dateStr);

            // Convert the date object to the ISO string and adjust to UTC
            const isoDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toISOString();

            return isoDate;
          }

          function encodeTitle(title) {
            return encodeURIComponent(title);
          }

          const dataToPass = {
            location: destination,
            startDate: convertToISO(date),
            day: days,
            cyo: true
          };

          console.log("ZZData to pass: ", dataToPass, requestItinerary);

          navigate(`/itinerary-save/${userId}/${itineraryId}/${encodeTitle(title)}/editableView`, { state: dataToPass });

          // const dataToPass = {
          //   location: destination
          // };
          // // navigate(`/itinerary-save/${userId}/${itineraryId}/${itineraryTitle}/editableView`, { state: dataToPass });
          // navigate(`/itinerary-save/9/711/Title%20of%20Itinerary/editableView`, { state: dataToPass });
        } else {
          console.error('Error: API call to update status failed');
        }

      } else {
        console.error('Error saving itinerary:', response.data.message);
      }

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

      toast.error("Unexpected error occurred while creating itinerary. Please try again.", {
        autoClose: 2000,
        position: 'top-right',
        closeButton: true,
        className: "xs:top-40 lg:top-20 toast-message",
      });
    } finally {
      setIsLoading(false);  // Ensure loading state is reset after all operations
    }
  };

  const handleIconClick = () => {
    console.log('AiOutlinePlus icon clicked');
    console.log('cover_image', cover_image);
    document.getElementById('coverImg').click();
  };
  const handleNavigateTravelPlan = () => {
    if (newItinerary) {
      const encodedTitle = encodeURIComponent(title);
      window.location.href = `/itinerary-save/${userId}/${newItinerary.id}/${encodedTitle}`;
    }
  };

  useEffect(() => {
    console.log('newItinerary:', newItinerary);
  }, [newItinerary]);

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
            <a href="/my-travelplan"> Travel Plan</a>.
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="close-button"
            >
              X
            </button>
          </div>
        </div>
      )}

      {showCreateYourOwn ? (
        <>
          {/* <div className="font-montserrat bg-gray-50 xs:top-[10vh] xs:bottom-[10vh] lg:top-0 lg:bottom-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[20px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
          <div className="font-sans bg-gray-50 xs:top-40 lg:top-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

            <Column className="sm:py-[50px] sm:w-[100%] sm:h-[100%] lg:py-[10px] lg:w-[100%] lg:h-[100%] bg-gray-50">

              <div className="bg-gray-50 w-[full] lg:mx-[0px] lg:my-[0px] max-h-[80vh] flex flex-col ">
                {/*Content title*/}
                <div className=" flex mx-8 items-center">
                  <Text className="w-[100%] text-start py-[15px] sm:text-[37px] lg:text-xl text-black font-normal">
                    Create an Itinerary
                  </Text>
                  <button
                    className="text-end items-end justify-end"
                    disabled={isLoading}
                  >
                    <FaTimes
                      className="sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                      // onClick={() => setShowContentSetting(false)}
                      // onClick={closeCreateYourOwn}
                      onClick={() => {
                        resetForm();        // First, reset the form
                        closeCreateYourOwn();  // Then, close the form or perform other closing actions
                      }}
                    />
                  </button>
                </div>

                <hr className=""></hr>

                {/*Content section*/}
                <div className="flex-1 overflow-x-hidden overflow-y-auto">
                  <Row class="">
                    <div className="mt-4 mx-8">
                      <label
                        for="title"
                        className="text-[#111928] font-semibold sm:text-[28px] lg:text-[14px]"
                      >
                        Title *
                      </label>
                      <input
                        className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%]"
                        type="text"
                        size="smSrc"
                        required
                        placeholder="Name your itinerary"
                        title="E.g. 2 Days to Manila"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                      ></input>
                    </div>

                    <div className="mt-4 mx-8">
                      <label
                        for="days"
                        className="text-[#111928] font-semibold sm:text-[28px] lg:text-[14px]"
                      >
                        No. of Days: *
                      </label>
                      <select
                        id="days"
                        className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%]"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        required
                      >
                        <option value=" ">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    {/* <div className="m-2 mt-2 grid grid-cols-2 gap-4 mx-[60px]"> */}
                    <div className="mt-4 mx-8">
                      {/* mobile view */}
                      <div className="sm:block lg:hidden">
                        <label
                          for="date"
                          className="font-semibold text-[#111928] sm:text-[28px] lg:text-[14px]"
                        >
                          Date: *
                        </label>
                        <div className="sm:block lg:hidden items-center flex justify-start p-4 gap-4 border border-[#D3D3D3] bg-white_A700 rounded-[5px] sm:h-24 lg:h-9 hover:outline-blue-500/75">
                          <FiCalendar size={30} className="ml-2 text-[#111928]" />
                          <input
                            type="date"
                            id="myDate"
                            name="myDate"
                            min={minDate.toISOString().split("T")[0]}
                            className="border-none text-black text-[28px] pt-6 bg-transparent"
                            defaultValue={startDate.toISOString().split("T")[0]}
                            // onChange={(date) => setStartDate(date)}
                            onChange={(event) =>
                              setStartDate(new Date(event.target.value))
                            }
                          ></input>
                        </div>
                      </div>

                      {/* web view */}
                      <div className="sm:hidden lg:block xl:block 2xl:block">
                        <label
                          for="date"
                          className="font-semibold text-[#111928] sm:text-[28px] lg:text-[14px]"
                        >
                          Date: *
                        </label>
                        <div className="sm:hidden md:hidden lg:block xl:block 2xl:block bg-white_A700 flex flex-row gap-[5px] items-center border border-[#D3D3D3] rounded-[5px] w-[100%] lg:h-9">
                          <FiCalendar size={20} className="ml-2 text-[#111928]" />
                          <DatePicker
                            className="font-normal font-montserrat not-italic p-[0] lg:text-xs text-black placeholder:required text-slate_700 w-[100%]"
                            wrapClassName="w-[100%] "
                            placeholder="Date"
                            name="date"
                            shape="RoundedBorder3"
                            size="sm"
                            type="date"
                            minDate={minDate}
                            value={date}
                            selected={date}
                            onChange={(date) => setDate(date)}
                          />
                        </div>
                      </div>
                    </div>

                  </Row>

                  <div className="mt-4 mx-8 ">
                    <label
                      for="desc"
                      className="text-[#111928] font-semibold sm:text-[28px] lg:text-[14px]"
                    >
                      Description
                      <span className="lg:text-[12px]"> (optional)</span>
                    </label>
                    <textarea
                      className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-40 lg:h-20 w-[100%]"
                      type="text"
                      size="smSrc"
                      required
                      placeholder="What’s this itinerary guide? (optional)"
                      name="description"
                      value={description}
                      onChange={handleDescriptionChange}

                    // title="E.g. "
                    ></textarea>
                    <div className="">
                      <text className="flex justify-end sm:text-[26px] lg:text-xs">
                        {/* {characterCount}/200 max characters */}
                      </text>
                    </div>
                  </div>

                  <div className="mt-4 mx-8">
                    <label
                      htmlFor="dropzone_cover_img"
                      className="text-[#111928] font-semibold sm:text-[28px] lg:text-[14px]"
                    >
                      Insert Cover Image
                      <span className="lg:text-[12px]"> (optional)</span>
                      <div className="w-full border border-[#D3D3D3] rounded-sm border-dashed text-center justify-center items-center h-35 mb-5">
                        <div className="relative flex items-center justify-center bg-white_A700">
                          <div className="overflow-hidden relative">
                            {cover_image && (
                              <button
                                className="absolute top-3 right-5 p-1 xs:w-[65px] xs:h-[65px] lg:w-[25px] lg:h-[25px] bg-[#808080] rounded-full text-white shadow-md"
                                style={{
                                  padding: 0,
                                  borderRadius: '50%',
                                  // width: '25px',
                                  // height: '25px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                onClick={() => handleImageRemove(['cover_image'])}
                                title="Remove image"
                              >
                                X
                              </button>
                            )}
                            {!cover_image ? (
                              <div>
                                <p className="text-center text-[#9A9A9A] sm:text-[28px] lg:text-[14px] font-normal mt-5">Add cover image</p>
                                <label
                                  htmlFor="coverImg"
                                  className="bg-[#EDEDED] inline-flex items-center justify-center font-medium sm:w-[40px] sm:h-[40px] lg:w-[22px] lg:h-[22px] rounded-full mb-5"
                                // onClick={handleIconClick}
                                >
                                  <AiOutlinePlus className="lg:h-[22px] lg:w-[22px] sm:h-[38px] sm:w-[38px] text-center text-black " />
                                  <input
                                    id="coverImg"
                                    type="file"
                                    className="hidden"
                                    name="cover_image"
                                    onChange={handleCoverImageChange}
                                  />
                                </label>
                              </div>
                            ) : (
                              <img
                                src={URL.createObjectURL(cover_image)}
                                alt="Selected Cover"
                                className="w-569 h-379 "
                                name="cover_image"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <hr className="mb-3"></hr>

                {/* Footer */}
                <div className="flex justify-between xs:bottom-20 lg:bottom-0 ">
                  
                  <Row className="flex-1 justify-end mx-8 xs:space-x-5 lg:space-x-3 ">
                    <div className=" text-right">
                      <button
                        className="xs:rounded-xl lg:rounded-lg xs:px-6 lg:px-2 py-2 bg-white sm:h-20 lg:h-9 text-[#00A19A] sm:text-[28px] lg:text-[14px] shadow-md"
                        //onClick={handleSaveButtonClick}
                        disabled={isLoading}
                        onClick={() => {
                          resetForm();        // First, reset the form
                          backCreateYourOwn();  // Then, close the form or perform other closing actions
                        }}
                      >
                        {/* {isLoadingg && (
                          <div className="loader-container7">
                            <div className="loader"></div>
                            <p className="loading-text">loading...</p>
                          </div>
                        )} */}
                        Cancel
                      </button>
                    </div>
                    <div className=" text-right">
                      <button
                        className="xs:rounded-xl lg:rounded-lg xs:px-6 lg:px-2 py-2 bg-[#00A19A] sm:h-20 lg:h-9 text-white sm:text-[28px] lg:text-[14px] shadow-md"
                        onClick={handleCreateYourOwn}
                        disabled={isLoading}
                      >
                        {/* Create itinerary */}
                        {/* {isLoading ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} spin />
                            {" Loading..."}
                          </>
                        ) : "Create Itinerary"} */}
                        {isLoading ? "Loading..." : "Create Itinerary"}
                      </button>
                    </div>
                  </Row>
                </div>

              </div>

            </Column>
          </div >

          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CreateYourOwn;
