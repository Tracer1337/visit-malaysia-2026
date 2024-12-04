import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from 'components/ForgotPass/index';
import LoginPage from 'components/Login/index';
import SignupPage from 'components/SignUp/index';
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import HeaderOTA from 'components/Header/HeaderOTA/index';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import { FaCheckSquare } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import axios from "../../../node_modules/axios/index";

const ReferralID = () => {
    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [isPopup3Open, setIsPopup3Open] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenValidNot, setTokenValidNot] = useState(false);


    
    const navigate = useNavigate();
    function handleNavigate() {
        navigate("/");
    }

    const openPopup1 = () => {
        setIsPopup1Open(true);
        setIsPopup2Open(false); // Close Popup2 when Popup1 is opened
    };

    const openPopup2 = () => {
        setIsPopup2Open(true);
        setIsPopup1Open(false); // Close Popup1 when Popup2 is opened
    };
    const openPopup3 = () => {
        setIsPopup3Open(true);
        setIsPopup1Open(false); // Close Popup1 when Popup3 is opened
    };
    const openPopup4 = () => {
        // setIsPopup4Open(true);
        setIsPopup2Open(false);
    }

    const closePopup1 = () => {
        setIsPopup1Open(false);
    };

    const closePopup2 = () => {
        setIsPopup2Open(false);
    };
    const closePopup3 = () => {
        setIsPopup3Open(false);
    };
    const closePopup4 = () => {
        // setIsPopup4Open(false);
    };

    const success = () => {
        setTokenValid(true);
    };
    const notsuccess = () => {
        setTokenValid(true);
    };

    useEffect(() => {
        // Get the current URL
        const url = new URL(window.location.href);

        // Extract the token from the URL
        const verificationToken = url.searchParams.get("verificationToken");
        console.log("Token:", verificationToken);
        if (verificationToken) {
            async function postActivation() {
                try {
                    const response = await axios.post(
                        `https://halaltravel.ai/ht/api/auth/activateAccount/${verificationToken}`,
                        {
                        }
                    );

                    if (response.status === 200) {
                        // Token is valid
                        setTokenValid(true);
                        
                        //success();
                        console.log("true");
                        // alert(
                        //     "successful"
                        // );
                        // navigate('/tour-marketplace');
                    } else {

                    }

                } catch (error) {
                    // setTokenValid(false);
                    setTokenValidNot(true);
                    // Open the login popup
                    setIsPopup3Open(true);
                    // Show the invalid token message
                    //setShowInvalidTokenMessage(true);
                    // alert(
                    //     "Reset password token is not valid or has expired. Please request a new token."
                    // );
                }
            }

            postActivation();
        }
    }, []);

    useEffect(() => {

    }, [tokenValid]);

    console.log("tokenvalis", tokenValid)

    return (
        <div className='bg-[#F5F5F5] h-[2000px]'>
        <div className='fixed w-full' style={{ zIndex: 2 }}>
            <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
            <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
            <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
            <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
        </div>

        <div class="xs:pt-[160px] lg:pt-[92px] profile font-sans sm:mx-10 lg:mx-[25%] ">
            <div class="border bg-[#FFFFFF] rounded-lg mt-4 sm:my-10 p-5">
                <form class="file-upload ">
                    <div class="row g-3 space-y-2">
                        <h3 class="mb-4 mt-0 sm:text-[35px] lg:text-[28px]">Referral Information</h3>
                        <p className='mt-1 sm:text-[28px] lg:text-sm'>Please enter referral information .</p>
                        <div className="pt-4 grid grid-cols-6 gap-6 w-[100%]">
                            <div className="sm:col-span-6 lg:col-span-3">
                                {/* <label
                                    htmlFor="first_name"
                                    className="block mb-2 sm:text-[25px] lg:text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Referral ID
                                </label> */}
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-[28px] lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:py-5 lg:py-2 lg:py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Referral ID"
                                    // value={firstName}
                                    // onChange={handleInputChange}
                                />
                                {/* {errors.firstName && (
                  <div className="text-[#e63946]">{errors.firstName}</div>
                )} */}
                            </div>







                        </div>
                    </div>




                    {/* <!-- button --> */}
                    <div class="gap-3 d-md-flex justify-content-md-end text-center">
                        <button type="button"
                            class="btn btn-primary btn-lg sm:text-[35px] lg:text-[14px] font-montserrat font-medium"
                            // onClick={handleUpdate}
                            >
                            Enter
                        </button>
                    </div>




                </form>
            </div>
        </div >
    </div >
    )
}

export default ReferralID