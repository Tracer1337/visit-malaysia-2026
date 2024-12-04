import React, { useState, useRef } from 'react';
import HeaderOTA from 'components/Header/HeaderOTA/index';
import axios from 'axios';
import { Text, Img, Button } from "components";
import { useNavigate } from "react-router-dom";
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import Footerepic from 'components/Footer/Footerepic/index';
import { useAuth } from 'AuthContext';
import LoginPage from "components/Login/index";
import { MdOutlineSwapVert, MdSearch } from "react-icons/md";
import SignupPage from "components/SignUp/index";
import { AiOutlineClose } from "react-icons/ai";
import PlacesAutocomplete from "react-places-autocomplete";
import {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const NavigatePage = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);

    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [fromDestination, setFromDest] = useState("");
    const [toDestination, setToDest] = useState("");
    const [fromDestinationFull, setFromDestinationFull] = useState(''); 
    const [toDestinationFull, setToDestinationFull] = useState(''); 

    const [travelOptions, setTravelOptions] = useState([]);
    const [navFrom, setNavFrom] = useState(false);
    const [navTo, setNavTo] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeFrom = (value) => {
        setFromDestinationFull(value);
    };

    const handleChangeTo = (value) => {
        setToDestinationFull(value);
    };

    // const handleSelectFrom = async (selectedDestination) => {
    //     // Split the selected destination into parts
    //     const rows = selectedDestination.split(",");
    //     // Use only the first part (city) of the selected destination
    //     let selectedCity = rows[0].trim();
    //     setFromDest(selectedCity);

    //     // Use react-places-autocomplete getLatLng to get latitude and longitude
    //     geocodeByAddress(selectedCity)
    //         .then((results) => {
    //             console.log("Results:", results);
    //             for (let i = 0; i < results[0].address_components.length; i++) {
    //                 if (results[0].address_components[i].types.includes("locality")) {
    //                     selectedCity = results[0].address_components[i].long_name;
    //                 }
    //             }
    //             return getLatLng(results[0]);
    //         })
    //         .then((latLng) => console.log("Success", latLng))
    //         .catch((error) => console.error("Error", error));

    //     setNavFrom(false);
    //     setDisabled(false);
    // };

    const handleSelectFrom = async (selectedDestination) => {
        const firstPart = selectedDestination.split(",")[0].trim();
        setFromDest(firstPart);
        setFromDestinationFull(selectedDestination);

        geocodeByAddress(selectedDestination)
            .then((results) => {
                console.log("Results:", results);
                return getLatLng(results[0]);
            })
            .then((latLng) => console.log("Success", latLng))
            .catch((error) => console.error("Error", error));

        setNavFrom(false);
        setDisabled(false);
    };

    const handleSelectTo = async (selectedDestination) => {
        
        const firstPart = selectedDestination.split(",")[0].trim();
        setToDest(firstPart);
        setToDestinationFull(selectedDestination);
        
        geocodeByAddress(selectedDestination)
            .then((results) => {
                console.log("Results:", results);
                return getLatLng(results[0]);
            })
            .then((latLng) => console.log("Success", latLng))
            .catch((error) => console.error("Error", error));

        setNavTo(false);
        setDisabled(false);
    };

    const openPopup1 = () => {
        setIsPopup1Open(true);
    };

    const openPopup2 = () => {
        setIsPopup2Open(true);
    };

    const closePopup1 = () => {
        setIsPopup1Open(false);
    };

    const closePopup2 = () => {
        setIsPopup2Open(false);
    };

    const handleSearchOption = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://halaltravel.ai/ht/api/route/travelOptions', {
                params: {
                    from: fromDestinationFull,
                    to: toDestinationFull 
                }
            });
            setTravelOptions(response.data);
            setIsLoading(false);
            navigate("/listnav", {
                state: {
                    fromDestination,
                    toDestination,
                    fromDestinationFull,
                    toDestinationFull ,
                    travelOptions: response.data
                }
            });
        } catch (error) {
            console.error("Error fetching travel options:", error);
            setIsLoading(false);
        }
    };

    const handleSwap = () => {
        const tempFull = fromDestinationFull;
        setFromDestinationFull(toDestinationFull);
        setToDestinationFull(tempFull);

        const tempShort = fromDestination;
        setFromDest(toDestination);
        setToDest(tempShort);
    };

    return (
        <>
            <div className='fixed w-full'>
                <HeaderOTA openPopup1={openPopup1} className="fixed invisible lg:visible" />
                <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
                <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
                <HeaderOTAMobileEpic openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
            </div>

            <div className="w-full font-montserrat bg-[#F5F5F5] h-fit xs:pt-[160px] lg:pt-[92px] md:hidden lg:block">
                <Text className="text-[15px]">
                    Only available on mobile for now
                </Text>
            </div>

            {/* mobile view */}
            <div className="w-full font-montserrat bg-[#F5F5F5] h-fit xs:pt-[160px] lg:pt-[92px] md:block lg:hidden">
                <div>
                    <Img
                        src="images/navbg.jpg"
                        className="h-[1700px] object-cover brightness-50"
                        alt="navbg"
                    />
                    <div className="absolute top-[15%] px-[50px]">
                        <div className="w-[80%]">
                            <Text className="text-[74px] text-[#FFFFFF] font-semibold">
                                Discover the routes to anywhere
                            </Text>
                        </div>
                        <div className="pt-[100px]">
                            <div className="bg-[#FAFAFA] p-[70px] rounded-[30px]">
                                <div>
                                    <div>
                                        <Text className="text-[#B0ADAD] text-[31px] font-semibold">
                                            TRAVEL FROM
                                        </Text>
                                    </div>
                                    <div className="text-[10px] col-span-2 items-center text-center justify-start outline-[#00a19a] rounded-[20px] ">
                                        <input
                                            placeholder="Enter place"
                                            className="items-center placeholder:required h-[100px] w-full text-[#555555] text-[31px] p-[20px] bg-[#F4F4F4] rounded-[10px] border-[#B0ADAD] border-[0.5px]"
                                            onClick={() => {
                                                setNavFrom(true);
                                                setDisabled(true);
                                                fromInputRef.current.focus();
                                            }}
                                            disabled={isDisabled}
                                            value={fromDestinationFull}
                                            ref={fromInputRef}
                                        />
                                        {navFrom ? (
                                            <div className="bg-black/80 fixed w-screen h-screen z-10 bottom-0 left-0"></div>
                                        ) : (
                                            ""
                                        )}
                                        <div
                                            className={
                                                navFrom
                                                    ? "fixed bottom-0 rounded-t-[90px] left-0 w-screen h-[150em] p-4 bg-white z-10 duration-300"
                                                    : "fixed bottom-[-200%] left-0 w-screen h-[150em] p-4 bg-white z-10 duration-300"
                                            }
                                        >
                                            <Text className="font-montserrat absolute top-40 left-11 text-[40px] font-medium">
                                                Enter Place
                                            </Text>

                                            <AiOutlineClose
                                                onClick={() => {
                                                    setNavFrom(false);
                                                    setDisabled(false);
                                                }}
                                                size={60}
                                                className="absolute right-10 top-14 cursor-pointer"
                                            />

                                            <nav className="h-fit m-8 snap-y">
                                                <div className="snap-end grid mt-60 grid-cols-2 w-[100%]">
                                                    <div className="col-span-2 w-[100%] inline-flex h-[10em] items-center rounded-[20px] text-center bg-white/80 p-6 gap-4 justify-start outline outline-[0.5px] outline-blue-500/75">
                                                        <CiSearch size={50} className="ml-2 text-gray_700 " />
                                                        <PlacesAutocomplete
                                                            apiKey="AIzaSyB40jqFnXxo_4ZX7WezdrlR4NicJsseyu8"
                                                            value={fromDestinationFull}
                                                            onChange={handleChangeFrom}
                                                            onSelect={handleSelectFrom}
                                                        >
                                                            {({
                                                                getInputProps,
                                                                suggestions,
                                                                getSuggestionItemProps,
                                                                loading,
                                                            }) => {
                                                                const suggestionsToDisable = [
                                                                    "Kuala Lumpur, Malaysia",
                                                                    "Pulau Pinang, Malaysia"
                                                                ];

                                                                const filteredSuggestions = suggestions.filter((suggestion) => {
                                                                    const words = suggestion.description.split(',').map((word) => word.trim().toLowerCase());
                                                                    const includesMalaysia = words.includes("malaysia") && words[words.length - 1] === "malaysia";
                                                                    const isDisabled = suggestionsToDisable.includes(suggestion.description);
                                                                    return (includesMalaysia || suggestion.description.toLowerCase().includes("malaysia")) && !isDisabled;
                                                                });

                                                                return (
                                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                                        <input
                                                                            {...getInputProps({
                                                                                placeholder: "Enter Place",
                                                                                // className:
                                                                                //     "custom-input font-medium font-montserrat items-center justify-start not-italic p-[0] sm:text-[35px] md:text-[35px] placeholder:required placeholder-gray-300 text-gray-400 w-[160%] outline-none border-none",
                                                                                className: "custom-input font-medium font-montserrat items-center justify-start not-italic p-[0] sm:text-[35px] md:text-[35px] placeholder:required placeholder-gray-300 text-gray-400 w-[100%] outline-none border-none",
                                                                            })}
                                                                            style={{
                                                                                width: '100%',
                                                                                padding: '15px 20px',
                                                                                fontSize: '30px',
                                                                                // borderRadius: '8px',
                                                                                // border: '1px solid #ccc',
                                                                                // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                                outline: 'none',
                                                                                transition: 'all 0.2s ease-in-out',
                                                                            }}

                                                                        />

                                                                        <div
                                                                            className="autocomplete-dropdown-container"
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: '100%',
                                                                                left: 0,
                                                                                right: 0,
                                                                                zIndex: 1000,
                                                                                backgroundColor: '#fff',
                                                                                marginTop: 22,
                                                                                marginLeft: -50,
                                                                                // border: '1px solid #ccc',
                                                                                borderRadius: '8px',
                                                                                // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                                padding: '10px 0',
                                                                                maxWidth: '100%', // Ensures the dropdown is full-width on mobile
                                                                                overflowY: 'auto', // Added for handling long lists
                                                                                maxHeight: '50vh', // Limits height for better usability on mobile
                                                                            }}
                                                                        // style={{
                                                                        //     position: "absolute",
                                                                        //     zIndex: 1000,
                                                                        //     padding: 10,
                                                                        //     marginLeft: -130,
                                                                        //     marginTop: 80,
                                                                        //     width: "96%",
                                                                        //     height: "100%",
                                                                        // }}
                                                                        >
                                                                            {loading
                                                                                ? null
                                                                                : filteredSuggestions.map((suggestion) => {
                                                                                    const className = suggestion.active
                                                                                        ? "suggestion-item--active"
                                                                                        : "suggestion-item";
                                                                                    const style = suggestion.active
                                                                                        ? {
                                                                                            backgroundColor: "#f0f0f0",
                                                                                            cursor: "pointer",
                                                                                            padding: '10px 20px',
                                                                                            textAlign: 'center',
                                                                                        }
                                                                                        : {
                                                                                            backgroundColor: "#fff",
                                                                                            cursor: "pointer",
                                                                                            padding: '10px 20px',
                                                                                            textAlign: 'center',
                                                                                        };

                                                                                    // const style = suggestion.active
                                                                                    //     ? {
                                                                                    //         backgroundColor: "#bee3e2",
                                                                                    //         font: "Montserrat",
                                                                                    //         cursor: "pointer",
                                                                                    //         color: "#000",
                                                                                    //         paddingTop: "40px",
                                                                                    //         fontSize: "32px",
                                                                                    //         paddingRight: "20px",
                                                                                    //         height: "4em",
                                                                                    //         width: "600px",
                                                                                    //         fontWeight: "normal",
                                                                                    //         textAlign: "left",
                                                                                    //     }
                                                                                    //     : {
                                                                                    //         backgroundColor: "#ffffff",
                                                                                    //         paddingLeft: "30px",
                                                                                    //         font: "Montserrat",
                                                                                    //         cursor: "pointer",
                                                                                    //         color: "#000",
                                                                                    //         fontSize: "35px",
                                                                                    //         paddingTop: "40px",
                                                                                    //         height: "5em",
                                                                                    //         fontWeight: "normal",
                                                                                    //         textAlign: "left",
                                                                                    //     };
                                                                                    // const descriptionParts = suggestion.description.split(',').map(part => part.trim());
                                                                                    // const displayDescription = descriptionParts.slice(-3, -2).join(', ');
                                                                                    // const location = descriptionParts.slice(0, -1).join(', ');

                                                                                    return (
                                                                                        <div
                                                                                            {...getSuggestionItemProps(suggestion, { className, style })}
                                                                                            key={suggestion.placeId}
                                                                                            style={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                borderBottom: '1px solid #eee',
                                                                                                fontSize: '24px', // Increased font size for better readability on mobile
                                                                                                padding: '15px 20px', // Increased padding for better touch targets on mobile
                                                                                            }}
                                                                                        >
                                                                                            <FaMapMarkerAlt style={{ marginRight: '15px', color: '#666', fontSize: '38px', minWidth: '38px', minHeight: '36px' }} />
                                                                                            <div>
                                                                                                <strong style={{ fontSize: '32px', color: '#333', display: 'block' }}>
                                                                                                    {suggestion.description.split(",")[0]}
                                                                                                </strong>
                                                                                                <div style={{ fontSize: '30px', color: '#777', display: 'block' }}>
                                                                                                    {suggestion.description}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    );

                                                                                })}
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
                                <div className="mt-[50px] flex justify-end">
                                    <button className="bg-[#FAFAFA] border-[#B0ADAD] border-[0.5px] rounded-full p-[20px]"
                                        onClick={handleSwap}>
                                        <MdOutlineSwapVert size={54} />
                                    </button>
                                </div>
                                <div className="mt-[50px]">
                                    <div>
                                        <Text className="text-[#B0ADAD] text-[31px] font-semibold">
                                            TRAVEL TO
                                        </Text>
                                    </div>
                                    <div className="text-[10px] col-span-2 items-center text-center justify-start outline-[#00a19a] rounded-[20px] ">
                                        <input
                                            placeholder="Enter place"
                                            className="items-center placeholder:required h-[100px] w-full text-[#555555] text-[31px] p-[20px] bg-[#F4F4F4] rounded-[10px] border-[#B0ADAD] border-[0.5px]"
                                            onClick={() => {
                                                setNavTo(true);
                                                setDisabled(true);
                                                toInputRef.current.focus();
                                            }}
                                            disabled={isDisabled}
                                            value={toDestinationFull}
                                            ref={toInputRef}
                                        />
                                        {navTo ? (
                                            <div className="bg-black/80 fixed w-screen h-screen z-10 bottom-0 left-0"></div>
                                        ) : (
                                            ""
                                        )}
                                        <div
                                            className={
                                                navTo
                                                    ? "fixed bottom-0 rounded-t-[90px] left-0 w-screen h-[150em] p-4 bg-white z-10 duration-300"
                                                    : "fixed bottom-[-200%] left-0 w-screen h-[150em] p-4 bg-white z-10 duration-300"
                                            }
                                        >
                                            <Text className="font-montserrat absolute top-40 left-11 text-[40px] font-medium">
                                                Enter Place
                                            </Text>

                                            <AiOutlineClose
                                                onClick={() => {
                                                    setNavTo(false);
                                                    setDisabled(false);
                                                }}
                                                size={60}
                                                className="absolute right-10 top-14 cursor-pointer"
                                            />

                                            <nav className="h-fit m-8 snap-y">
                                                <div className="snap-end grid mt-60 grid-cols-2 w-[100%]">
                                                    <div className="col-span-2 w-[100%] inline-flex h-[10em] items-center rounded-[20px] text-center bg-white/80 p-6 gap-4 justify-start outline outline-[0.5px] outline-blue-500/75">
                                                        <CiSearch size={50} className="ml-2 text-gray_700 " />
                                                        <PlacesAutocomplete
                                                            apiKey="AIzaSyB40jqFnXxo_4ZX7WezdrlR4NicJsseyu8"
                                                            value={toDestinationFull}
                                                            onChange={handleChangeTo}
                                                            onSelect={handleSelectTo}
                                                        >
                                                            {({
                                                                getInputProps,
                                                                suggestions,
                                                                getSuggestionItemProps,
                                                                loading,
                                                            }) => {
                                                                const suggestionsToDisable = [
                                                                    "Kuala Lumpur, Malaysia",
                                                                    "Pulau Pinang, Malaysia"
                                                                ];

                                                                const filteredSuggestions = suggestions.filter((suggestion) => {
                                                                    const words = suggestion.description.split(',').map((word) => word.trim().toLowerCase());
                                                                    const includesMalaysia = words.includes("malaysia") && words[words.length - 1] === "malaysia";
                                                                    const isDisabled = suggestionsToDisable.includes(suggestion.description);
                                                                    return (includesMalaysia || suggestion.description.toLowerCase().includes("malaysia")) && !isDisabled;
                                                                });

                                                                return (
                                                                    <div style={{ position: 'relative', width: '100%' }}>
                                                                        <input
                                                                            {...getInputProps({
                                                                                placeholder: "Enter Place",
                                                                                className: "custom-input font-medium font-montserrat items-center justify-start not-italic p-[0] sm:text-[35px] md:text-[35px] placeholder:required placeholder-gray-300 text-gray-400 w-[100%] outline-none border-none",

                                                                            })}
                                                                            style={{
                                                                                width: '100%',
                                                                                padding: '15px 20px',
                                                                                fontSize: '30px',
                                                                                // borderRadius: '8px',
                                                                                // border: '1px solid #ccc',
                                                                                // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                                outline: 'none',
                                                                                transition: 'all 0.2s ease-in-out',
                                                                            }}
                                                                        />

                                                                        <div
                                                                            className="autocomplete-dropdown-container"
                                                                            style={{
                                                                                position: "absolute",
                                                                                top: '100%',
                                                                                left: 0,
                                                                                right: 0,
                                                                                zIndex: 1000,
                                                                                backgroundColor: '#fff',
                                                                                marginTop: 22,
                                                                                marginLeft: -50,
                                                                                // border: '1px solid #ccc',
                                                                                borderRadius: '8px',
                                                                                // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                                                padding: '10px 0',
                                                                                maxWidth: '100%', // Ensures the dropdown is full-width on mobile
                                                                                overflowY: 'auto', // Added for handling long lists
                                                                                maxHeight: '50vh', // Limits height for better usability on mobile
                                                                            }}
                                                                        // style={{
                                                                        //     position: "absolute",
                                                                        //     zIndex: 1000,
                                                                        //     padding: 10,
                                                                        //     marginLeft: -130,
                                                                        //     marginTop: 80,
                                                                        //     width: "96%",
                                                                        //     height: "100%",
                                                                        // }}
                                                                        >
                                                                            {loading
                                                                                ? null
                                                                                : filteredSuggestions.map((suggestion) => {
                                                                                    const className = suggestion.active
                                                                                        ? "suggestion-item--active"
                                                                                        : "suggestion-item";

                                                                                    const style = suggestion.active
                                                                                        ? {
                                                                                            backgroundColor: "#f0f0f0",
                                                                                            cursor: "pointer",
                                                                                            padding: '10px 20px',
                                                                                            textAlign: 'center',
                                                                                        }
                                                                                        : {
                                                                                            backgroundColor: "#fff",
                                                                                            cursor: "pointer",
                                                                                            padding: '10px 20px',
                                                                                            textAlign: 'center',
                                                                                        };

                                                                                    // const style = suggestion.active
                                                                                    //     ? {
                                                                                    //         backgroundColor: "#bee3e2",
                                                                                    //         font: "Montserrat",
                                                                                    //         cursor: "pointer",
                                                                                    //         color: "#000",
                                                                                    //         paddingTop: "40px",
                                                                                    //         fontSize: "32px",
                                                                                    //         paddingRight: "20px",
                                                                                    //         height: "4em",
                                                                                    //         width: "600px",
                                                                                    //         fontWeight: "normal",
                                                                                    //         textAlign: "left",
                                                                                    //     }
                                                                                    //     : {
                                                                                    //         backgroundColor: "#ffffff",
                                                                                    //         paddingLeft: "30px",
                                                                                    //         font: "Montserrat",
                                                                                    //         cursor: "pointer",
                                                                                    //         color: "#000",
                                                                                    //         fontSize: "35px",
                                                                                    //         paddingTop: "40px",
                                                                                    //         height: "5em",
                                                                                    //         fontWeight: "normal",
                                                                                    //         textAlign: "left",
                                                                                    //     };
                                                                                    // const descriptionParts = suggestion.description.split(',').map(part => part.trim());
                                                                                    // const displayDescription = descriptionParts.slice(-3, -2).join(', ');
                                                                                    // const location = descriptionParts.slice(0, -1).join(', ');

                                                                                    return (
                                                                                        <div
                                                                                            {...getSuggestionItemProps(suggestion, { className, style })}
                                                                                            key={suggestion.placeId}
                                                                                            style={{
                                                                                                display: 'flex',
                                                                                                alignItems: 'center',
                                                                                                justifyContent: 'center',
                                                                                                borderBottom: '1px solid #eee',
                                                                                                fontSize: '24px', // Increased font size for better readability on mobile
                                                                                                padding: '15px 20px', // Increased padding for better touch targets on mobile
                                                                                            }}
                                                                                        >
                                                                                            <FaMapMarkerAlt style={{ marginRight: '15px', color: '#666', fontSize: '38px', minWidth: '38px', minHeight: '36px' }} />
                                                                                            <div>
                                                                                                <strong style={{ fontSize: '32px', color: '#333', display: 'block' }}>
                                                                                                    {suggestion.description.split(",")[0]}
                                                                                                </strong>
                                                                                                <div style={{ fontSize: '30px', color: '#777', display: 'block' }}>
                                                                                                    {suggestion.description}
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
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
                                <div className="mt-[200px]">
                                    <button className="h-[100px] bg-[#2A3075] hover:bg-[#15194B] rounded-[10px] p-[20px] w-full"
                                        onClick={handleSearchOption}
                                        disabled={isLoading}>
                                        {isLoading ? (
                                            <CircularProgress size={30} className="text-white" />
                                        ) : (
                                            <div className="flex justify-center gap-[20px]">
                                                <MdSearch size={54} className="text-[#FFFFFF]" />
                                                <Text className="text-[31px] text-[#FFFFFF]">
                                                    SEE ALL OPTIONS
                                                </Text>
                                            </div>
                                        )}
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div >

                </div >
            </div >

            <div className="md:mt-[10px] lg:mt-[500px]">
                <Footerepic />
            </div>
        </>
    );
};

export default NavigatePage;
