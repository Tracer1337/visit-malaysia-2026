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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

const CreateNewItinerary = ({
  showCreateNewItinerary,
  closePopup55,
  activityId,
  image,
  closePopup44,
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
  const [mode, setMode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState("");
  const [successMessageType, setSuccessMessageType] = useState("added");
  const [newItinerary, setNewItinerary] = useState(null);
  const navigate = useNavigate();
  const { creatorId, itineraryId, itineraryTitle } = useParams();

  console.log("COVER IMAGE:", cover_image);

  const handleCoverImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const compressedFile = await compressImage(selectedFile);
        console.log("Compressed File:", compressedFile);
        setCoverImage(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
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
        console.log(
          "Image size is not greater than 1000 KB. No compression needed.",
        );
        resolve(file);
      }
    });
  };

  const handleImageRemove = (imageTypes) => {
    imageTypes.forEach((imageType) => {
      switch (imageType) {
        case "cover_image":
          console.log("Removing Cover Image");
          setCoverImage(null);
          break;
        default:
          break;
      }
    });
  };

  useEffect(() => {
    console.log("cover_image state:", cover_image);
  }, [cover_image]);

  useEffect(() => {
    console.log("Activity ID in AddtoContentNew:", activityId);

    setTitle("");
    setDays("");
    setDescription("");
  }, [showCreateNewItinerary]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCreateNewItinerary = async () => {
    const formData = new FormData();

    const requestItinerary = {
      mode: "new",
      activity_id: activityId,
      chatgpt_id: 0,
      user_id: userId,
      title: title,
      description: description,
      day: days,
    };

    console.log("requestItinerary: ", requestItinerary);
    const json = JSON.stringify(requestItinerary);
    const blob = new Blob([json], { type: "application/json" });

    formData.append("request_itinerary", blob);
    // formData.append('cover_image', cover_image);

    if (cover_image) {
      formData.append("cover_image", cover_image);
    } else {
      formData.append("cover_image", new File([], "empty.jpg"));
    }

    try {
      const response = await axios.post(
        "https://halaltravel.ai/ht/api/planner/user/itinerary/activity/saveTemp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("New itinerary created:", response.data);
      setNewItinerary(response.data);

      // Handle success
      closePopup55();
      // closePopup44();
      setShowSuccessMessage(true);
      setSuccessMessageType("added");
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
    }
  };

  const handleIconClick = () => {
    console.log("AiOutlinePlus icon clicked");
    console.log("cover_image", cover_image);
    document.getElementById("coverImg").click();
  };
  const handleNavigateTravelPlan = () => {
    if (newItinerary) {
      const encodedTitle = encodeURIComponent(title);
      window.location.href = `/legacy/itinerary-save/${userId}/${newItinerary.id}/${encodedTitle}`;
    }
  };

  useEffect(() => {
    console.log("newItinerary:", newItinerary);
  }, [newItinerary]);

  return (
    <>
      {showSuccessMessage && (
        <div className="success-message">
          <div className="message-line">
            Activity{" "}
            <strong>{successMessageType === "added" ? "added to" : ""}</strong>{" "}
            your new itinerary in{" "}
            <a href="/legacy/my-travelplan">Travel Plan</a>.
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="close-button"
            >
              X
            </button>
          </div>
        </div>
      )}
      {showCreateNewItinerary ? (
        <>
          <div className="font-montserrat bg-gray-50 xs:top-[10vh] xs:bottom-[10vh] lg:top-0 lg:bottom-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[20px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*Content title*/}

            <Column className="sm:py-[50px] sm:w-[100%] sm:h-[100%] lg:py-[10px] lg:w-[100%] lg:h-fit">
              <div className=" flex mx-8 items-center">
                <Text className="w-[100%] text-start py-[20px] sm:text-[37px] lg:text-xl text-[#00A19A] font-medium">
                  Create a Itinerary
                </Text>
                <button className="text-end items-end justify-end">
                  <FaTimes
                    className="sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                    // onClick={() => setShowContentSetting(false)}
                    onClick={closePopup55}
                  />
                </button>
              </div>

              <hr className="mb-3"></hr>
              {/*Content*/}
              <div className="">
                <Row class="">
                  <div className="mt-4 mx-8">
                    <label
                      for="title"
                      className="text-[#00A19A] font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      Title
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
                      className="text-[#00A19A] font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      No. of days:
                    </label>
                    {/* <select
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
                    </select> */}
                    <select
                      id="days"
                      className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%]"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      required
                    >
                      <option value=" ">Select</option>
                      {[...Array(60)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </Row>

                <div className="mt-4 mx-8 ">
                  <label
                    for="desc"
                    className="text-[#00A19A] font-medium sm:text-[28px] lg:text-[14px]"
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

                {/* <div className="mt-4 mx-8">
                  <label
                    htmlFor="dropzone_cover_img"
                    className="text-[#00A19A] font-medium sm:text-[28px] lg:text-[14px]"
                  >
                    Insert Cover Image
                    <span className="lg:text-[12px]"> (optional)</span>
                    <div className="w-full border border-[#D3D3D3] rounded-sm border-dashed text-center justify-center items-center h-35">
                      <div className="relative flex items-center justify-center">
                        <div className="overflow-hidden relative">
                          {cover_image && (
                            <button
                              className="absolute top-3 right-5 p-1 bg-[#808080] rounded-full text-white"
                              style={{
                                padding: 0,
                                borderRadius: '50%',
                                width: '25px',
                                height: '25px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              onClick={() => handleImageRemove(['cover_image'])}
                            >
                              X
                            </button>
                          )}
                          {!cover_image ? (
                            <div>
                              <p className="text-center text-[#9A9A9A] sm:text-[28px] lg:text-[14px] font-normal mt-5">Add cover image</p>
                              <label
                                htmlFor="coverImg"
                                className="bg-[#EDEDED] inline-flex items-center justify-center font-medium sm:w-[40px] sm:h-[40px] lg:w-[22px] lg:h-[22px] rounded-full mb-3"
                              // onClick={handleIconClick}
                              >
                                <AiOutlinePlus className="lg:h-[22px] lg:w-[22px] sm:h-[38px] sm:w-[38px] text-center text-[#00A19A]" />
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
                              className="w-569 h-379"
                              name="cover_image"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </div> */}

                <div className="absolute inset-x-0 bottom-0">
                  <hr className=""></hr>
                  <Row className=" justify-end mx-8 space-x-3 my-[20px]">
                    <div className=" text-right">
                      <button
                        className="rounded-lg px-2 py-2 bg-white sm:h-20 lg:h-9 text-[#00A19A] sm:text-[28px] lg:text-[14px]"
                        //onClick={handleSaveButtonClick}
                        disabled={isLoading}
                        onClick={closePopup55}
                      >
                        {isLoadingg && (
                          <div className="loader-container7">
                            <div className="loader"></div>
                            <p className="loading-text">loading...</p>
                          </div>
                        )}
                        Cancel
                      </button>
                    </div>
                    <div className=" text-right">
                      <button
                        className="rounded-lg px-2 py-2 bg-[#00A19A] sm:h-20 lg:h-9 text-white sm:text-[28px] lg:text-[14px]"
                        onClick={handleCreateNewItinerary}
                        disabled={isLoading}
                      >
                        {isLoadingg && (
                          <div className="loader-container7">
                            <div className="loader"></div>
                            <p className="loading-text">loading...</p>
                          </div>
                        )}
                        Create itinerary
                      </button>
                    </div>
                  </Row>
                </div>
              </div>
            </Column>
          </div>

          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CreateNewItinerary;
