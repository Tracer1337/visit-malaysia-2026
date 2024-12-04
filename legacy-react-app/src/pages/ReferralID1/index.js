import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ForgotPassword from 'components/ForgotPass/index';
import LoginPage from 'components/Login/index';
import SignupPage from 'components/SignUp/index';
import HeaderOTAMobileEpic from "components/Header/HeaderOTAMobileEpic/index";
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import HeaderOTA from 'components/Header/HeaderOTA/index';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import { FaCheckSquare } from "react-icons/fa";
import { CgCloseR } from "react-icons/cg";
import axios from "axios";
import { useAuth } from "AuthContext";
import { Alert } from "../../../node_modules/@mui/material/index";

const ReferralID = () => {
    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [isPopup3Open, setIsPopup3Open] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenValidNot, setTokenValidNot] = useState(false);
    const [referralId, setReferralId] = useState(""); // State for referral ID
    const [showReferralErrMsg, setShowReferralErrMsg] = useState(false); // State to show error message
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // To get the state passed from the previous page

    // Get the credential from the location state
    const credential = location.state?.credential;

    const handleInputChange = (e) => {

        console.log("sssss",credential)
        setReferralId(e.target.value);
    };

    const handleCheckReferralId = (value) => {       
        if(value == null || value.trim().length == 0){
            setShowReferralErrMsg(false);
            return;
        }

        const url = "https://halaltravel.ai/ht/api/auth/checkReferralId";
        const data = {
            referral_id: value      
        };

        return axios
            .post(url, data)
            .then((response) => {       
                console.log("Response1111:", response);

                if (!response.data) {
                    setShowReferralErrMsg(true);
                    return false;
                } else {
                    setShowReferralErrMsg(false);
                    return true;
                }
            })
            .catch((error) => {
                console.error("Error checking referral ID:", error);
                return false;
            });
    };

    const handleSubmit = async () => {
        // Check if referral ID needs validation

        console.log("sssss",)
        if (referralId) {
            const isValid = await handleCheckReferralId(referralId);
            if (!isValid) {
               // Alert.alert("the referral ID is invalid")
                return; // If the referral ID is invalid, don't proceed with the submission
            }
        }

        try {
            const response = await fetch('https://halaltravel.ai/ht/api/auth/socialLogin/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: credential,  // Use the credential passed from the previous page
                    referral_id: referralId,  // Pass the referral ID
                }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Received JWT Token", data);
            const { type, token, userId } = data;
            localStorage.setItem("tokenType", type);
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);

            setIsLoggedIn(true);
            navigate("/");

        } catch (error) {
            console.error('Error during login process:', error);
        }
    };

    const handleSkip = () => {
        // Call the API without the referral ID
        handleSubmit();
        
    };

    const handleSkip1 = async () => {
        // Ensure handleSkip is an async function to use await
        console.log("sssss");
    
        // if (referralId) {
        //     const isValid = await handleCheckReferralId(referralId);
        //     if (!isValid) {
        //         alert("The referral ID is invalid"); // Use alert for a simple browser alert
        //         return; // If the referral ID is invalid, don't proceed with the submission
        //     }
        // }
    
        // Call the API without the referral ID or proceed with the next step
       // await handleSubmit();
    };
    

    useEffect(() => {

        const c_id = location.state?.c_id;
        if(c_id){
           setReferralId(c_id);
        }
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
                        {}
                    );

                    if (response.status === 200) {
                        setTokenValid(true);
                        console.log("true");
                    } else {
                        setTokenValidNot(true);
                    }

                } catch (error) {
                    setTokenValidNot(true);
                    setIsPopup3Open(true);
                }
            }

            postActivation();
        }
    }, []);

    return (
        <div className='bg-[#F5F5F5] h-[2000px]'>
            <div className='fixed w-full' style={{ zIndex: 2 }}>
                <HeaderOTAAdmin openPopup1={() => setIsPopup1Open(true)} className="fixed invisible lg:visible" />
                <LoginPage isOpen={isPopup1Open} openPopup2={() => setIsPopup2Open(true)} closePopup1={() => setIsPopup1Open(false)} />
                <SignupPage isOpen={isPopup2Open} closePopup2={() => setIsPopup2Open(false)} />
                <HeaderOTAMobile openPopup1={() => setIsPopup1Open(true)} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
            </div>

            <div className="xs:pt-[160px] lg:pt-[92px] profile font-sans sm:mx-10 lg:mx-[25%] ">
                <div className="border bg-[#FFFFFF] rounded-lg mt-4 sm:my-10 p-5">
                    <form className="file-upload ">
                        <div className="row g-3 space-y-2">
                            <h3 className="mb-4 mt-0 sm:text-[35px] lg:text-[28px]">Referral Information</h3>
                            <p className='mt-1 sm:text-[28px] lg:text-sm'>Please enter referral information .</p>
                            <div className="pt-4 grid grid-cols-6 gap-6 w-[100%]">
                                <div className="sm:col-span-6 lg:col-span-3">
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        className="w-[100%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-[28px] lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:py-5 lg:py-2 lg:py-3"
                                        placeholder="Referral ID"
                                        value={referralId}
                                        onChange={handleInputChange}
                                    />
                                    {showReferralErrMsg && <p style={{ color: 'red' }}>Invalid Referral ID</p>}
                                </div>
                            </div>
                        </div>

                        <div className="gap-3 d-md-flex justify-content-md-end text-center">
                            <button type="button"
                                className="btn btn-primary btn-lg sm:text-[35px] lg:text-[14px] font-montserrat font-medium"
                                onClick={handleSubmit} // Handles referral submission
                            >
                                Enter
                            </button>
                            <button type="button"
                                className="btn btn-secondary btn-lg sm:text-[35px] lg:text-[14px] font-montserrat font-medium"
                                onClick={handleSkip} // Skips the referral step
                            >
                                Skip
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ReferralID;
