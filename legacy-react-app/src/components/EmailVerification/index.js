import React, { useState, useEffect } from "react";
import { Row } from "components/Row/index";
import { Column } from 'components/Column/index';
import { Text } from 'components/index';
import { FaTimes, FaUserCheck } from "react-icons/fa";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiCheckCircle, mdiAlertCircle } from "@mdi/js";

const EmailVerification = ({ isOpen, closePopup3 }) => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [profileData, setProfileData] = useState('');
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object with the email
    const data = { email };

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "https://halaltravel.ai/ht/api/auth/activateAccount/{verificationTokenReceivedInEmail}",
        data
      );

      if (response.status === 200) {
        // Email sent successfully
        console.log("success");
        setSuccessMessage("Email has been sent successfully.");
        setErrorMessage(""); // Clear any previous error message
      }

      // Close the popup or perform other actions as needed
      // closePopup3();
    } catch (error) {
      // Handle any errors
      setErrorMessage("No user found with the given email.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

    // *Profile User Data*
    useEffect(() => {

      axios.get(`https://halaltravel.ai/ht/api/profile/${userId}`)
          .then(response => {

              const data = response.data;

              setProfileData(data);

          })
          .catch(error => {
              console.error('Error fetching profile data:', error);
          });
  }, [userId]);

  console.log("Profile user: ", profileData);

  return (
    <>
      {isOpen ? (
        <>
          <div
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-70"
          >
            <div
              data-te-modal-dialog-ref
              className="xs:w-[700px] lg:w-[500px] w-full mx-4 bg-white rounded-md shadow-lg"
            >
              {/* Modal Content */}
              <div className="text-center p-4 ">
                <div className='p-2 items-center'>
                  <FaUserCheck size={30} className="text-[#00A19A]" />
                </div>
                <h1 className="xs:text-[32px] lg:text-[22px] font-medium leading-normal text-gray-800">
                  Activate your account </h1>
                  <p className="text-gray-600 xs:text-[24px] lg:text-[14px]">
                  We have sent a verification email to {profileData.email}.<br />
                  Open the email and verify your account.
                </p>

              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-4 bg-gray-100 rounded-b-md">
                <button
                  type="button"
                  // onClick={toggleModal}
                  className="mr-2 inline-block bg-[#00A19A] px-6 py-2 xs:text-[18px] lg:text-[12px] font-medium uppercase leading-normal text-white hover:text-white bg-white-300 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default EmailVerification;
