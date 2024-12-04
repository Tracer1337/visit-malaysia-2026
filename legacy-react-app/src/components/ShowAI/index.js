import React, { useRef, useState, useEffect } from "react";
import { Row, Column, Text, Button, Img } from "components";
import { FaTimes } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import PlacesAutocomplete from "react-places-autocomplete";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchData2 } from "redux/actions2";
import { AiOutlineClose } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { useAuth } from "AuthContext";
import DatePicker from "react-datepicker";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

const ShowAI = ({ showAI, closeShowAI, openPopup1, backShowAI, closePopup1 }) => {
  //const [showAI, setShowAI] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [include, setInclude] = useState("");
  const [exclude, setExclude] = useState("");
  const [characterEx, setCharacterEx] = useState(0);
  const [characterIn, setCharacterIn] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [attractions, setAttractions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [date, setDate] = useState(new Date());
  const minDate = new Date();
  const dispatch = useDispatch();
  const { destination, state, country } = useParams();
  const [selectedooc, setselectedooc] = useState("");
  var updatedestination = "";
  const [newState, setNewState] = useState(state);
  const [newCountry, setNewCountry] = useState(country);
  const [selectedAttraction, setSelectedAttraction] = useState([]);
  const [selectedInterest, setSelectedInterest] = useState([]);
  const inputRef = useRef(null);
  const [language, setLanguage] = useState("");
  const [days, setDays] = useState("");
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [newDestination, setNewDestination] = useState(destination);
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "exclude") {
      setExclude(value); // Assuming exclude is a comma-separated string
    } else if (name === "include") {
      setInclude(value); // Assuming include is a comma-separated string
    } else if (name === "date") {
      setDate(value);
    }

    if (exclude.length <= 50) {
      setCharacterEx(exclude.length);
    }
  };


  const fetchAttractions = async () => {
    try {
      const response = await axios.get(
        "https://halaltravel.ai/hu/api/chatgpt/attraction"
      );
      setAttractions(response.data);
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  };

  const fetchInterests = async (selectedAttractions) => {
    // Send a POST request with the selected attractions
    try {
      const response = await axios.post(
        "https://halaltravel.ai/hu/api/chatgpt/interests",
        selectedAttractions
      );

      if (response.status === 200) {
        setInterests(response.data);
      } else {
        console.error("Error fetching interests:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };

  useEffect(() => {
    // Fetch interests based on the selected attractions whenever selectedAttractions change
    fetchInterests(selectedAttraction);
  }, [selectedAttraction]);

  const handleAttractionClick = (attraction) => {
    // Check if the attraction is already selected
    if (selectedAttraction.includes(attraction)) {
      // If it is selected, remove it from the selected attractions
      setSelectedAttraction(
        selectedAttraction.filter((item) => item !== attraction)
      );
    } else {
      // If it is not selected, check if the maximum limit (3) is reached
      if (selectedAttraction.length < 3) {
        // Add the attraction to the selected attractions
        setSelectedAttraction([...selectedAttraction, attraction]);
      } else {
        // Display an alert or message indicating that the maximum limit is reached
        alert("You can select up to three attractions.");
      }
    }
  };


  useEffect(() => {
    // Fetch initial attractions when the component mounts
    fetchInterests();
    fetchAttractions();
  }, []);

  const handleChange = async (newInput) => {
    setNewDestination(newInput);
    updatedestination = newInput;
    await setNewDestination(newInput);
    await setselectedooc("");
  };

  const handleInterestClick = (interest) => {
    // Check if the interest is already selected
    if (selectedInterest.includes(interest)) {
      // If it is selected, remove it from the selected interests
      setSelectedInterest(selectedInterest.filter((item) => item !== interest));
    } else {
      // If it is not selected, check if the maximum limit (7) is reached
      if (selectedInterest.length < 5) {
        // Add the interest to the selected interests
        setSelectedInterest([...selectedInterest, interest]);
      } else {
        // Display an alert or message indicating that the maximum limit is reached
        alert("You can select up to five interests.");
      }
    }
  };


  const handleGenerateClick = async () => {
    // console.log("GENERATE BUTTON CLICKED");

    try {
      // Prepare the query parameters
      if (
        !newDestination ||
        !language ||
        !days ||
        !formattedDate ||
        !selectedAttraction ||
        !selectedInterest
      ) {
        window.alert("Please fill in all the blanks before generating.");
        return;
      }

      const queryParams = {
        theme: 0,
        message: newDestination,
        state: newState,
        country: newCountry,
        days: days,
        date: formattedDate,
        language: language,
        attractions: selectedAttraction,
        interests: selectedInterest,
        include: include,
        exclude: exclude,
      };

      if (isLoggedIn) {
        try {
          dispatch(fetchData2(queryParams));
          navigate("/ota1", { state: queryParams });
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else {
        closeShowAI();
        openPopup1();
        localStorage.setItem("customPath", "ota1");
        localStorage.setItem("state", JSON.stringify(queryParams));
      }
    } catch (error) {
      console.error("Error generating data:", error);
    }
  };

  const handleSelect = async (selectedDestination) => {
    // Split the selected destination into parts
    const rows = selectedDestination.split(",");

    let selectedCity = "";
    let selectedState = "";
    let selectedCountry = "";

    if (rows.length > 0) {
      selectedCity = rows[0].trim();
      setNewDestination(selectedCity);
      updatedestination = selectedCity;
    } else {
      setNewDestination(selectedDestination);
      updatedestination = selectedDestination;
    }

    setNewDestination(selectedCity);
    updatedestination = selectedCity;
    // setNewState(state);
    // setNewCountry(country);
    await setselectedooc(selectedDestination);
    await setNewState(selectedState);
    await setNewCountry(selectedCountry);

    // Use react-places-autocomplete getLatLng to get latitude and longitude
    geocodeByAddress(selectedDestination)
      .then((results) => {
        // console.log("Results:", results);
        for (let i = 0; i < results[0].address_components.length; i++) {
          if (results[0].address_components[i].types.includes("locality")) {
            selectedCity = results[0].address_components[i].long_name;
          }
          if (
            results[0].address_components[i].types.includes(
              "administrative_area_level_1"
            )
          ) {
            setNewState(results[0].address_components[i].long_name);
          }
          if (results[0].address_components[i].types.includes("country")) {
            setNewCountry(results[0].address_components[i].long_name);
          }
        }

        return getLatLng(selectedCity + ", " + newCountry);
      })
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Errorrrrr", error));

    setNav(!nav);
    setDisabled(!isDisabled);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  function formatDateDisplay(date) {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      {showAI ? (
        <>
          <div className="font-sans bg-gray-50 xs:top-40 lg:top-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*Content*/}

            <Column className="sm:py-[50px] sm:w-[100%] sm:h-[100%] lg:py-[10px] lg:w-[100%] lg:h-[100%] bg-gray-50">
              <div className=" flex mx-8 items-center">
                <Text className="w-[100%] text-start py-[15px] sm:text-[37px] lg:text-xl text-black font-normal">
                  Tell us about your travel plan!
                </Text>
                <button
                  className="text-end items-end justify-end"
                  disabled={isLoading}
                >
                  <FaTimes
                    className="sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                    onClick={closeShowAI}
                  />
                </button>
              </div>

              <hr className=""></hr>
              <div className="flex-1 overflow-x-hidden overflow-y-auto">

                <div className="m-2 mt-6 grid grid-cols-2 gap-4 mx-8">
                  {/* web view */}
                  <div class="sm:hidden lg:block xl:block 2xl:block">
                    <span className="font-semibold sm:text-[28px] lg:text-[14px] ">
                      Destination:
                    </span>
                    <div className="mt-2 bg-white_A700 flex flex-row gap-[5px] items-center justify-start outline outline-[1px] outline-[#00A19A] rounded-[5px] sm:h-24 lg:h-9 w-[100%]">
                      <BiWorld
                        size={30}
                        fill="#00A19A"
                        className="lg:ml-2 md:ml-4 lg:h-[22px] lg:w-[22px] md:h-[38px] md:w-[38px]"
                      />
                      <PlacesAutocomplete
                        apiKey="AIzaSyB40jqFnXxo_4ZX7WezdrlR4NicJsseyu8"
                        value={newDestination}
                        onChange={handleChange}
                        onSelect={handleSelect}
                      >
                        {({
                          getInputProps,
                          suggestions,
                          getSuggestionItemProps,
                          loading,
                        }) => {
                          //to disable suggestion for epictravel

                          // const suggestionsToDisable = [
                          //   "Kuala Lumpur, Malaysia",
                          //   "Pulau Pinang, Malaysia"
                          // ];
                          // const filteredSuggestions = suggestions.filter(
                          //   (suggestion) => {
                          //     // Check if the suggestion is a big city or a country
                          //     // return suggestions;
                          //     const isDisabled = suggestionsToDisable.includes(suggestion.description);
                          //     return !isDisabled;
                          //   }
                          // );

                          //for vm
                          const suggestionsToDisable = [
                            "Kuala Lumpur, Malaysia",
                            "Pulau Pinang, Malaysia",
                          ];

                          const filteredSuggestions = suggestions.filter(
                            (suggestion) => {
                              // Check if the suggestion description includes "Malaysia" and is not in the disabled list
                              const includesMalaysia = suggestion.description
                                .toLowerCase()
                                .includes("malaysia");
                              const isDisabled = suggestionsToDisable.includes(
                                suggestion.description
                              );

                              return includesMalaysia && !isDisabled;
                            }
                          );

                          return (
                            <div>
                              <input
                                {...getInputProps({
                                  placeholder: "Destination",
                                  className:
                                    "font-normal not-italic font-sans p-[0] sm:text-[8px] md:text-[10px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] lg:text-[9px] text-black placeholder:required text-slate_700 w-[100%] outline-none border-none",
                                })}
                              />

                              <div
                                className="autocomplete-dropdown-container"
                                style={{
                                  position: "absolute",
                                  zIndex: 1000,
                                  marginTop: 10,
                                  marginLeft: -40,
                                  border: isLoading ? "none" : "none",
                                  boxShadow: isLoading
                                    ? "0 0px 0px 0 rgba(0, 0, 0, 0.2)"
                                    : "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                                  width: "18%",
                                }}
                              >
                                {isLoading ? (
                                  <div>
                                    <strong>Loading...</strong>
                                    <CircularProgress
                                      size={12}
                                      style={{ color: "black" }}
                                    />
                                  </div>
                                ) : (
                                  filteredSuggestions.map((suggestion) => {
                                    const className = suggestion.active
                                      ? "suggestion-item--active"
                                      : "suggestion-item";
                                    const style = suggestion.active
                                      ? {
                                        font: "Montserrat",
                                        backgroundColor: "#bee3e2",
                                        paddingLeft: "5px",
                                        paddingTop: "15px",
                                        paddingBottom: "10px",
                                        cursor: "pointer",
                                        color: "black",
                                        fontSize: "12px",
                                        fontWeight: "normal",
                                        outlineColor: "#00a19a",
                                        height: "5em",
                                        width: "300px",
                                        borderOutlineColor: "#00a19a",
                                        borderColor: "#00a19a",
                                      }
                                      : {
                                        font: "Montserrat",
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                        color: "black",
                                        fontSize: "12px",
                                        fontWeight: "normal",
                                        outlineColor: "#00a19a",
                                        height: "5em",
                                        width: "300px",
                                        borderOutlineColor: "#00a19a",
                                        paddingLeft: "5px",
                                        paddingTop: "15px",
                                        paddingBottom: "10px",
                                        borderColor: "#00a19a",
                                      };
                                    return (
                                      <div
                                        {...getSuggestionItemProps(suggestion, {
                                          className,
                                          style,
                                        })}
                                      >
                                        <span
                                          style={{
                                            display: "flex",
                                            flexDirection: "column",
                                          }}
                                        >
                                          <span
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <FaMapMarkerAlt
                                              style={{
                                                marginRight: "2px",
                                                fontSize: "20px",
                                              }}
                                            />
                                            <strong
                                              style={{
                                                marginLeft: "5px",
                                                marginTop: "-10px",
                                              }}
                                            >
                                              {
                                                suggestion.description.split(
                                                  ","
                                                )[0]
                                              }
                                            </strong>
                                          </span>
                                          <span
                                            style={{
                                              display: "block",
                                              marginLeft: "25px",
                                              marginTop: "-5px",
                                            }}
                                          >
                                            {/* {suggestion.description
                                      .split(",")
                                      .slice(-1)} */}
                                            {suggestion.description
                                              .split(",")
                                              .slice(-2)
                                              .join(", ")}
                                          </span>
                                        </span>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            </div>
                          );
                        }}
                      </PlacesAutocomplete>
                    </div>
                  </div>
                  {/* mobile view */}
                  <div className="sm:block lg:hidden">
                    <label
                      for="language"
                      className="font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      Destination:
                    </label>
                    <div className="mt-2 w-full inline-flex items-center text-center p-5 gap-4 justify-start border border-1 border-[#00A19A] rounded-xl hover:outline-blue-500/75">
                      <CiSearch
                        size={55}
                        fill="#00A19A"
                        className="ml-4 text-gray_700 "
                      />
                      {/* <BiWorld size={30} fill="#00a19a" className="lg:ml-2 md:ml-4 lg:h-[22px] lg:w-[22px] md:h-[38px] md:w-[38px]" /> */}

                      <input
                        placeholder="Destination"
                        className="bg-transparent font-sans items-center justify-start not-italic p-[0] sm:text-[30px] md:text-[30px] lg:text-[9px] placeholder:required text-slate_700 w-[160%] outline-none border-none"
                        onClick={() => {
                          setNav(!nav);
                          setDisabled(!isDisabled);
                          focusInput();
                        }}
                        disabled={isDisabled}
                        value={destination}
                      />
                      {nav ? (
                        <div className="bg-black/80 fixed w-screen h-screen z-10 bottom-0 left-0"></div>
                      ) : (
                        ""
                      )}
                      <div
                        className={
                          nav
                            ? "fixed bottom-0 rounded-t-[90px] left-0 w-screen h-[110em] p-4 bg-white z-10 duration-300"
                            : "fixed bottom-[-100%] left-0 w-screen h-[110em] p-4 bg-white z-10 duration-300"
                        }
                      >
                        <text className="font-montserrat absolute top-40 left-11 text-[40px] font-medium">
                          Enter Destination
                        </text>

                        <AiOutlineClose
                          onClick={() => setNav(!nav) & setDisabled(!isDisabled)}
                          size={60}
                          className="absolute right-10 top-14 cursor-pointer"
                        />

                        <nav className="h-fit m-8 snap-y">
                          <div className="snap-end grid mt-60 grid-cols-2 w-[100%]">
                            <div className="col-span-2 w-[100%] inline-flex h-[10em] items-center rounded-[20px] rounded-[20px] text-center bg-white/80 p-6 gap-4 justify-start outline outline-[1px] outline-blue-500/75">
                              <CiSearch
                                size={50}
                                className="ml-2 text-gray_700 "
                              />
                              <PlacesAutocomplete
                                apiKey="AIzaSyB40jqFnXxo_4ZX7WezdrlR4NicJsseyu8"
                                value={newDestination}
                                onChange={handleChange}
                                onSelect={handleSelect}
                              >
                                {({
                                  getInputProps,
                                  suggestions,
                                  getSuggestionItemProps,
                                  loading,
                                }) => {
                                  // const filteredSuggestions =
                                  //   suggestions.filter((suggestion) => {
                                  //     // Check if the suggestion description includes "Malaysia"
                                  //     return suggestion.description
                                  //       .toLowerCase()
                                  //       .includes("malaysia");
                                  //   });

                                  //to disable suggestion for epictravel

                                  // const suggestionsToDisable = [
                                  //   "Kuala Lumpur, Malaysia",
                                  //   "Pulau Pinang, Malaysia"
                                  // ];
                                  // const filteredSuggestions = suggestions.filter(
                                  //   (suggestion) => {
                                  //     // Check if the suggestion is a big city or a country
                                  //     // return suggestions;
                                  //     const isDisabled = suggestionsToDisable.includes(suggestion.description);
                                  //     return !isDisabled;
                                  //   }
                                  // );

                                  //for vm
                                  const suggestionsToDisable = [
                                    "Kuala Lumpur, Malaysia",
                                    "Pulau Pinang, Malaysia",
                                  ];

                                  const filteredSuggestions = suggestions.filter(
                                    (suggestion) => {
                                      // Check if the suggestion description includes "Malaysia" and is not in the disabled list
                                      const includesMalaysia =
                                        suggestion.description
                                          .toLowerCase()
                                          .includes("malaysia");
                                      const isDisabled =
                                        suggestionsToDisable.includes(
                                          suggestion.description
                                        );

                                      return includesMalaysia && !isDisabled;
                                    }
                                  );

                                  return (
                                    <div>
                                      <input
                                        ref={inputRef}
                                        {...getInputProps({
                                          placeholder: "Key in your destination",
                                          className:
                                            "custom-input font-medium font-montserrat items-center justify-start not-italic p-[0] sm:text-[35px] md:text-[35px] placeholder:required placeholder-gray-300 text-gray-400 w-[160%] outline-none border-none",
                                          style: {},
                                        })}
                                      />

                                      <div
                                        className="autocomplete-dropdown-container"
                                        style={{
                                          position: "absolute",
                                          zIndex: 1000,
                                          padding: 10,
                                          marginLeft: -130,
                                          marginTop: 80,
                                          width: "96%",
                                          height: "100%",
                                        }}
                                      >
                                        {loading
                                          ? null
                                          : filteredSuggestions.map(
                                            (suggestion) => {
                                              const className =
                                                suggestion.active
                                                  ? "suggestion-item--active"
                                                  : "suggestion-item";
                                              const style = suggestion.active
                                                ? {
                                                  backgroundColor: "#bee3e2",
                                                  font: "Montserrat",
                                                  cursor: "pointer",
                                                  color: "#000",
                                                  paddingTop: "40px",
                                                  fontSize: "32px",
                                                  paddingRight: "20px",
                                                  height: "4em",
                                                  width: "600px",
                                                  fontWeight: "normal",
                                                  textAlign: "left",
                                                }
                                                : {
                                                  backgroundColor: "#ffffff",
                                                  paddingLeft: "30px",
                                                  font: "Montserrat",
                                                  cursor: "pointer",
                                                  color: "#000",
                                                  fontSize: "35px",
                                                  paddingTop: "40px",
                                                  height: "5em",
                                                  fontWeight: "normal",
                                                  textAlign: "left",
                                                };
                                              return (
                                                <div
                                                  {...getSuggestionItemProps(
                                                    suggestion,
                                                    {
                                                      className,
                                                      style,
                                                    }
                                                  )}
                                                >
                                                  <span
                                                    style={{
                                                      display: "flex",
                                                      flexDirection: "column",
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                      }}
                                                    >
                                                      <FaMapMarkerAlt
                                                        style={{
                                                          marginRight: "4",
                                                          fontSize: "50px",
                                                          marginTop: "30px",
                                                        }}
                                                      />
                                                      <strong
                                                        style={{
                                                          marginLeft: "30px",
                                                          marginTop: "-20px",
                                                        }}
                                                      >
                                                        {
                                                          suggestion.description.split(
                                                            ","
                                                          )[0]
                                                        }
                                                      </strong>
                                                    </span>
                                                    <line className="w-full h-2 color-[#f5f5f5]"></line>
                                                    <span
                                                      style={{
                                                        display: "block",
                                                        fontStyle: "oblique",
                                                        marginLeft: "95px",
                                                        marginTop: "-20px",
                                                      }}
                                                    >
                                                      {/* {suggestion.description
                                                .split(",")
                                                .slice(-1)} */}
                                                      {suggestion.description
                                                        .split(",")
                                                        .slice(-2)
                                                        .join(", ")}
                                                    </span>
                                                  </span>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    </div>
                                  );
                                }}
                              </PlacesAutocomplete>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <label
                      for="language"
                      className="font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      Output language:
                    </label>
                    <select
                      id="languages"
                      className="mt-2 placeholder-[#d5d5d5] rounded-[5px] border border-[#00A19A] text-gray-900 sm:text-[26px] lg:text-xs focus:border-[#00398D] block sm:h-24 lg:h-9 sm:w-[100%] lg:w-[100%]"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      required
                    >
                      <option value="text-[#d5d5d5]">Select</option>
                      <option value="english">English</option>
                      <option value="malay">Malay</option>
                      <option value="chinese_simplified">
                        Chinese Simplified
                      </option>
                      <option value="chinese_traditional">
                        Chinese Traditional
                      </option>
                      <option value="indonesian">Indonesian</option>
                      <option value="thai">Thai</option>
                      <option value="japanese">Japanese</option>
                      <option value="korean">Korean</option>
                      <option value="filipino">Filipino</option>
                      <option value="hindi">Hindi</option>
                      <option value="spanish">Spanish</option>
                      <option value="arabic">Arabic</option>
                      <option value="french">French</option>
                      <option value="bengali">Bengali</option>
                      <option value="russian">Russian</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="vietnamese">Vietnamese</option>
                    </select>
                  </div>
                </div>

                <div className="m-2 mt-2 grid grid-cols-2 gap-4 mx-8">
                  <div className="">
                    <label
                      for="days"
                      className="font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      No. of days:
                    </label>
                    <select
                      id="days"
                      className=" mt-2 placeholder-[#d5d5d5] rounded-[5px] border border-[#00A19A] sm:text-[28px] lg:text-xs text-gray-900 focus:ring-blue-500 focus:border-blue-500 block sm:h-24 lg:h-9 sm:w-[100%] lg:w-full"
                      value={days}
                      onChange={(e) => setDays(e.target.value)}
                      required
                    >
                      {/* <option value=" ">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option> */}
                      <option value=" ">Select</option>
                      {[...Array(25)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* mobile view */}
                  <div className="sm:block lg:hidden">
                    <label
                      for="date"
                      className="font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      Date:
                    </label>
                    <div className="mt-2 sm:block lg:hidden items-center flex justify-start p-4 gap-4 outline outline-[1px] outline-[#00A19A] rounded-[5px] sm:h-24 lg:h-9 hover:outline-blue-500/75">
                      <FiCalendar size={30} className="ml-2 text-[#00A19A]" />
                      <DatePicker
                        className="font-normal font-sans not-italic p-[0] text-[38px] text-black placeholder:required text-slate_700 w-[100%]"
                        wrapClassName="w-[100%] "
                        placeholder="Date"
                        name="date"
                        shape="RoundedBorder3"
                        size="sm"
                        type="date"
                        minDate={minDate}
                        value={date ? formatDateDisplay(date) : ''}
                        selected={date}
                        onChange={(date) => setDate(date)}
                      />
                    </div>
                  </div>

                  {/* web view */}
                  <div className="sm:hidden lg:block xl:block 2xl:block">
                    <label
                      for="date"
                      className="font-medium sm:text-[28px] lg:text-[14px]"
                    >
                      Date:
                    </label>
                    <div className="mt-2 sm:hidden md:hidden lg:block xl:block 2xl:block bg-white_A700 flex flex-row gap-[5px] items-center outline outline-[1px] outline-[#00A19A] rounded-[5px] w-[100%] lg:h-9">
                      <FiCalendar size={22} className="ml-2 text-[#00A19A]" />
                      <DatePicker
                        className="font-normal font-sans not-italic p-[0] lg:text-xs text-black placeholder:required text-slate_700 w-[100%]"
                        wrapClassName="w-[100%] "
                        placeholder="Date"
                        name="date"
                        shape="RoundedBorder3"
                        size="sm"
                        type="date"
                        minDate={minDate}
                        value={date ? formatDateDisplay(date) : ''}
                        selected={date}
                        onChange={(date) => setDate(date)}
                      />
                      {/* </Input> */}
                    </div>
                  </div>
                </div>

                <div className="mx-8 mt-6">
                  <label
                    htmlFor="typeofattraction"
                    className="font-semibold sm:text-[28px] lg:text-[14px]"
                  >
                    Type of attractions: (Choose at least 2 Attractions)
                  </label>
                  <div className="font-sans tracking-tighter flex flex-wrap gap-2 items-center lg:mt-[13px] xl:mt-[16px] 2xl:mt-[19px] 3xl:mt-[22px] w-[100%]">
                    {attractions.map((attraction, index) => (
                      <button
                        key={index}
                        value={attraction}
                        className={`m-1 border sm:text-[28px] lg:text-[14px] ${selectedAttraction.includes(attraction)
                          ? "bg-[#00A19A] text-white"
                          : ""
                          } hover:bg-[#00A19A] hover:text-white rounded-[5px] px-5 py-1 sm:h-20 lg:h-9 ${selectedAttraction.length === 3 &&
                            !selectedAttraction.includes(attraction)
                            ? "bg-gray-300 text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-gray-500 hover:border-gray-300 cursor-not-allowed"
                            : "border-[#00A19A]"
                          }`}
                        onChange={(e) => setAttractions(e.target.value)}
                        onClick={() => handleAttractionClick(attraction)}
                        disabled={
                          selectedAttraction.length === 3 &&
                          !selectedAttraction.includes(attraction)
                        }
                      >
                        {attraction}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mx-8 mt-6">
                  <label
                    htmlFor="typeofattraction"
                    className="font-semibold sm:text-[28px] lg:text-[14px]"
                  >
                    Your Interests: (Choose at least 2 Interests)
                  </label>
                  <div className="font-sans tracking-tighter flex flex-wrap gap-2 items-center lg:mt-[13px] xl:mt-[16px] 2xl:mt-[14px] 3xl:mt-[22px] w-[100%]">
                    {/* <button
                        className="m-1 font-bold xl:text-[12px] 2xl:text-[14px] 3xl:text-[16px] lg:text-[9px] text-center px-5 py-1 rounded-xl
                        border border-teal-500 text-black"
                        // onClick={handleFetchInterests}
                      >
                        {/* {showInterests ? 'Interests: ' + interests.join(', ') : 'Fetch Interests'} */}
                    {/* {interests.length > 0 ? '' + interests.join(', ') : ''} */}
                    {/* </button> */}
                    {interests.map((interest, index) => (
                      <button
                        key={index}
                        value={interests}
                        className={`m-1 border sm:text-[28px] lg:text-[14px] ${selectedInterest.includes(interest)
                          ? "bg-[#00A19A] text-white"
                          : ""
                          } hover:bg-[#00A19A] hover:text-white rounded-[5px] px-5 py-1 sm:h-20 lg:h-9 ${selectedInterest.length === 5 &&
                            !selectedInterest.includes(interest)
                            ? "bg-gray-300 text-gray-500 border-gray-300 hover:bg-gray-300 hover:text-gray-500 hover:border-gray-300 cursor-not-allowed"
                            : "border-[#00A19A]"
                          }`}
                        onChange={(e) => setInterests(e.target.value)}
                        onClick={() => handleInterestClick(interest)}
                        disabled={
                          selectedInterest.length === 5 &&
                          !selectedInterest.includes(interest)
                        }
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 mx-8">
                  <label
                    for="exclusion"
                    className="font-semibold sm:text-[28px] lg:text-[14px]"
                  >
                    Exclude: (optional)
                  </label>
                  <input
                    className="placeholder-[#9A9A9A] bg-white border border-[#00A19A] text-gray-900 sm:text-[26px] lg:text-xs focus:border-[#00398D] rounded-[5px] block sm:h-24 lg:h-9 sm:w-[100%] lg:w-[100%]"
                    type="text"
                    name="exclude"
                    size="smSrc"
                    value={exclude.substring(0, 50)}
                    onChange={handleInputChange}
                    required
                    placeholder="Insert places that you want to exlude"
                    title="E.g. Batu Caves"
                  ></input>
                  <div className="flex justify-between">
                    <p className="sm:text-[26px] lg:text-xs">
                      Separate each entry with a comma
                    </p>
                    <text className="sm:text-[26px] lg:text-xs">
                      {characterEx}/50 max characters
                    </text>
                  </div>
                </div>

                <div className="mt-4 mx-8 mb-2">
                  <label
                    for="inclusion"
                    className="font-semibold sm:text-[28px] lg:text-[14px]"
                  >
                    Include: (optional)
                  </label>
                  <input
                    className="placeholder-[#9A9A9A] bg-white border border-[#00A19A] text-gray-900 sm:text-[26px] lg:text-xs focus:border-[#00398D] rounded-[5px] block sm:h-24 lg:h-9 sm:w-[100%] lg:w-[100%]"
                    name="include"
                    type="text"
                    size="smSrc"
                    required
                    value={include}
                    onChange={handleInputChange}
                    placeholder="Insert places that you want to include"
                    title="E.g. Pavillion Kuala Lumpur"
                  ></input>
                  <div className="flex justify-between">
                    <p className="sm:text-[26px] lg:text-xs">
                      Separate each entry with a comma
                    </p>
                    <text className="sm:text-[26px] lg:text-xs">
                      0/50 max characters
                    </text>
                  </div>
                </div>
              </div>
              <hr className="mb-3"></hr>

              <Row className="justify-end mx-8 text-end xs:space-x-5 lg:space-x-3">
                <button
                        className="xs:rounded-xl lg:rounded-lg xs:px-6 lg:px-2 py-2 bg-white sm:h-20 lg:h-9 text-teal-500 sm:text-[28px] lg:text-[14px] shadow-md"
                        onClick={backShowAI}
                >
                  Cancel
                </button>

                <button
                        className="xs:rounded-xl lg:rounded-lg xs:px-6 lg:px-2 py-2 bg-teal-500 sm:h-20 lg:h-9 text-white sm:text-[28px] lg:text-[14px] shadow-md "
                        onClick={handleGenerateClick}
                >
                  {isLoggedIn ? (
                    <>Generate</>
                  ) : (
                    <>
                      <Row>
                      <MdOutlineEmail className="lg:w-[20px] lg:h-[20px] md:w-[35px] md:h-[35px] mr-2" />
                      Sign in to Continue
                      </Row>
                    </>
                  )}
                </button>
              </Row>
            </Column>
          </div>

          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ShowAI;
