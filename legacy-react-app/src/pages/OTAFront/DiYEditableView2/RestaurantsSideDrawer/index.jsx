import React, { useRef, useState, useEffect } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SingleRestaurant from "./SingleRestaurant";
import RestaurantDetailView from "./RestaurantDetailView";
import LoadingSpinner from "components/LoadingSpinner/index";
import crossSvg from "../cross.svg";
import { MdSearch } from "react-icons/md";
import EventsApi from "../api/events";
import { FaTimes } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";

const Index = ({
  open,
  setOpen,
  loading,
  restaurants,
  location,
  eventRef,
  setShowEventModal,
}) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchText, setSearchText] = useState(location); // State to hold the input value
  const [filter, setFilter] = useState("None");
  const [sortby, setsort] = useState("Rating");

  const [restaurants1, setRestaurants1] = useState(restaurants);
  const [loadingSearch, setLoadingSearch] = useState(false); // New state for loading

  const [isLoading, setIsLoading] = useState(false);
  const [nav, setNav] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const { destination, state, country } = useParams();
  const [newDestination, setNewDestination] = useState(destination);
  const inputRef = useRef(null);
  var updatedestination = "";
  const [newState, setNewState] = useState(state);
  const [newCountry, setNewCountry] = useState(country);
  const [selectedooc, setselectedooc] = useState("");


  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const {
    getAllRestaurantsForLocation,
  } = EventsApi;

  const handleRestaurantClick1 = (restaurant) => {
    const event = {
      location: restaurant.name,
      imageUrl: restaurant.photos && restaurant.photos.length > 0
        ? restaurant.photos[0].photoUrl
        : "", // First image URL or empty if no images
      distance: restaurant.distanceText,
      isAddMeal: true,
    };
    eventRef.current = event;
    setSelectedRestaurant(null);
    setOpen(false);
    setShowEventModal(true);
  };

  const handleCloseDetailView = () => {
    setSelectedRestaurant(null);
    setShowEventModal(false);
  };

  const handleCloseDetailView1 = () => {
    setSelectedRestaurant(null);
    setShowEventModal(false);
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;

    setSearchText(value);
    setLoadingSearch(true); // Set loading to true before making the API call

    try {
      const response = await getAllRestaurantsForLocation(value, { halal: filter }, sortby);
      if (response.status === 200) {
        setRestaurants1(response.data);
      } else {
        console.error("Failed to fetch restaurants:", response.status);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoadingSearch(false); // Set loading to false after the API call is done
    }
  };

  const handleFilterChange = async (event) => {
    const value = event.target.value;
    const isHalal = value === "Halal" ? true : false;
    setFilter(isHalal);
    setLoadingSearch(true);

    try {
      const response = await getAllRestaurantsForLocation(searchText, { halal: isHalal }, sortby);
      if (response.status === 200) {
        setRestaurants1(response.data);
      } else {
        console.error("Failed to fetch restaurants:", response.status);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoadingSearch(false); // Set loading to false after the API call is done
    }
  };

  const handleFilterChangesortby = async (event) => {
    const value = event.target.value;
    setsort(value);
    setLoadingSearch(true);

    try {
      const response = await getAllRestaurantsForLocation(searchText, { halal: filter }, value);
      if (response.status === 200) {
        setRestaurants1(response.data);
      } else {
        console.error("Failed to fetch restaurants:", response.status);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoadingSearch(false); // Set loading to false after the API call is done
    }
  };

  // Call getAllRestaurantsForLocation when the component mounts
  useEffect(() => {
    const fetchInitialRestaurants = async () => {
      setLoadingSearch(true);
      try {
        const response = await getAllRestaurantsForLocation(searchText, { halal: filter }, sortby);
        if (response.status === 200) {
          setRestaurants1(response.data);
        } else {
          console.error("Failed to fetch restaurants:", response.status);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoadingSearch(false);
      }
    };

    fetchInitialRestaurants();
  }, [searchText, filter, sortby]); // Dependencies: run when these values change

  const [topValue, setTopValue] = useState('92px');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setTopValue('160px');  // For screens xs and smaller
      } else {
        setTopValue('92px');  // For screens lg and larger
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = async (newInput) => {
    setNewDestination(newInput);

    if (newInput === "") {
      setSearchText(""); // Set searchText to empty string
      setRestaurants1([]); // Clear the restaurants1 array
    } else {
      // Proceed with the regular flow if newInput is not empty
      updatedestination = newInput;
      await setNewDestination(newInput);
      await setselectedooc("");
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

        console.log("Selected Destination: ", selectedDestination);
        // Call handleInputChange with the selected city
        handleInputChange({ target: { value: selectedDestination } });

        return getLatLng(selectedCity + ", " + newCountry);
      })
      .then((latLng) => {
        console.log("Success", latLng);

      })
      .catch((error) => console.error("Error", error));
    setNav(!nav);
    setDisabled(!isDisabled);
  };

  return (
    <div className="font-montserrat custom-top-override">
      <Drawer
        open={open}
        direction="right"
        onClose={() => setOpen(false)}
        // style={{ overflowY: "scroll", scrollbarWidth: "8px", top: topValue }}
        style={{ top: topValue }}
        lockBackgroundScroll
        className="!w-[90%] md:!w-6/12"
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            {/* Close Button */}
            <div className="w-full flex justify-end p-[10px] absolute top-0 right-0">
              <img
                src={crossSvg}
                alt="Cross Icon"
                className="w-5 cursor-pointer"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
            <LoadingSpinner />
          </div>
        ) : (
          !selectedRestaurant && ( // Hide this section if RestaurantDetailView is active
            <div className="w-full h-full flex flex-col bg-white ">
              {/* Top section */}
              <div className="bg-[#00A19A]">
                {/* Close Button */}
                <div className="flex justify-end w-full px-[10px] pt-[10px] pb-[0px]">
                  <img
                    src={crossSvg}
                    alt="Cross Icon"
                    className="w-5 cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </div>

                <div className="bg-[#00A19A] w-full p-[30px] pt-[10px] items-center ">
                  {/* <div className="2xl:flex 2xl:justify-between"> */}
                  <div className="lg:flex lg:justify-between px-[10px] lg:gap-10">
                    <div className="flex items-center ">
                      {/* web view */}
                      {/* <div class="sm:hidden lg:block xl:block 2xl:block"> */}
                      <div className="xs:pr-3 lg:pr-2">
                        <span className="text-[#FFFFFF] text-[16px] text-medium whitespace-nowrap">Nearby Location</span>
                      </div>
                      <div className="bg-white_A700 flex flex-row gap-[5px] items-center justify-start outline outline-[1px] outline-[#00a19a] rounded-[5px] h-9 w-[100%]">
                        <BiWorld
                          size={30}
                          fill="#00a19a"
                          className="ml-2  h-[22px] w-[22px] "
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
                                      "font-normal not-italic font-montserrat p-[0] xs:text-[12px] xl:text-[14px] 2xl:text-[14px] 3xl:text-[16px] lg:text-[9px] text-black placeholder:required text-slate_700 xs:w-[150%] lg:w-[90%] outline-none border-none",
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

                    <div className="flex items-center xs:mt-[10px] lg:mt-[0px] lg:justify-end lg:pr-2">
                      <div className="xs:pr-20 lg:pr-2">
                        <span className="text-[#FFFFFF] text-[16px] whitespace-nowrap">Filter by</span>
                      </div>
                      <select
                        value={filter ? "Halal" : "None"}
                        onChange={handleFilterChange}
                        className="py-[6px] px-[10px] border-none rounded-[5px] text-[14px] w-[140px]"
                      >
                        <option value="None"> None </option>
                        <option value="Halal"> Halal </option>
                      </select>
                    </div>
                  </div>

                  {/* <div>
                  <img
                    src={crossSvg}
                    alt="Cross Icon"
                    className="w-5 cursor-pointer"
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </div> */}
                </div>
              </div>


              <div className="flex justify-between items-start mt-5 pl-[40px] xs:pr-[20px] lg:pr-[50px]">
                {/* <p className="text-[#008D36] sm:text-xl lg:text-lg font-bold tracking-[0.2px]">
                  {searchText}
                </p> */}
                <button
                  className="bg-[#00A19A] text-white text-[13px] font-medium px-4 py-2 rounded-lg shadow-md"
                  onClick={handleRestaurantClick1}
                >
                  + Add Meal
                </button>
                <div className="flex items-center">
                  <div className="pr-2">
                    <span className="text-[#000000] text-[14px] whitespace-nowrap">Sort by</span>
                  </div>
                  <select
                    value={sortby}
                    onChange={handleFilterChangesortby}
                    className="py-[3px] px-[10px] bg-gray-100 border-[#6B7280] border-[0.5px] rounded-[5px] text-[14px] xs:w-[150px] lg:w-[150px]"
                  >
                    <option value="Rating">Rating</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>

              {searchText && (
                <div className="flex items-start mt-6 pl-[40px] xs:pr-[20px] lg:pr-[50px]">
                  <p className="text-[#008D36] sm:text-xl lg:text-[12px] font-bold tracking-[0.2px]">
                    Results for "{newDestination}"
                  </p>
                </div>
              )}




              <div className="px-[40px] w-full overflow-y-auto xs:max-h-[1500px] lg:max-h-[400px]">
                {loadingSearch ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div>
                    {restaurants1.length === 0 ? (
                      // <div className="w-full h-full mt-[150px] flex justify-center items-center text-center text-gray-500">
                      //   No result.
                      // </div>
                      searchText ? (
                        <div className="w-full h-full mt-[150px] flex justify-center items-center text-center text-gray-500 px-4">
                          No restaurants found for "{searchText}". Try another location.
                        </div>
                      ) : (
                        <div className="w-full h-full mt-[150px] flex justify-center items-center text-center text-gray-500 px-4">
                          Enter a nearby location to start searching for restaurants.
                        </div>
                      )
                    ) : (
                      <div className="flex flex-wrap justify-between mt-5 mb-20 gap-x-1 gap-y-6">
                        {restaurants1.map((restaurant) => (
                          <SingleRestaurant
                            key={restaurant.id}
                            restaurant={restaurant}
                            onClick={handleRestaurantClick}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* Restaurant Detail View */}
        {selectedRestaurant && (
          <div
            style={{
              position: "fixed",
              top: 0,
              width: "100%", // Ensure it takes full width of the Drawer
              height: "100%", // Ensure it takes full height of the Drawer
              // left: "40%",
              backgroundColor: "#FFFFFF",
              zIndex: 1000,
            }}
          >
            <RestaurantDetailView
              restaurant={selectedRestaurant}
              onClose1={handleCloseDetailView1}
              onClick={handleRestaurantClick1}
            />
          </div>
        )}

      </Drawer>

    </div>
  );
};

export default Index;
