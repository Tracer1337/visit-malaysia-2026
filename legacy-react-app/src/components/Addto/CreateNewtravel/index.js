import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useParams } from 'react-router-dom';

const CreateNewtravel = ({ showCreateNewItinerary, closePopup55, closePopup44, token1, userid1, user_itinerary_id1 }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const saveTravelPlan = async () => {
    if (title.trim() === '') {
      setErrorMessage('Title cannot be empty.');
      return;
    }

    setIsLoading(true);
    const url = 'https://halaltravel.ai/ht/api/planner/user/itinerary/saveAs';
    const token = token1; // Replace with your actual Bearer token
    const body = {
      user_id: userid1,
      user_itinerary_id: user_itinerary_id1,
      title: title
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (response.ok) {
        closePopup55();
        closePopup44();
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      } else {
        console.error('Failed to save travel plan:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (event.target.value.trim() !== '') {
      setErrorMessage(''); // Clear error message if title is not empty
    }
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="success-message">
          <div className="message-line">
            Travel Plan <strong>added to</strong> your <a href="/my-travelplan"> Travel Plan</a>.
            <button onClick={() => setShowSuccessMessage(false)} className="close-button">X</button>
          </div>
        </div>
      )}
      {showCreateNewItinerary ? (
        <>
          <div className="font-montserrat bg-gray-50 xs:top-[10vh] xs:bottom-[10vh] lg:top-0 lg:bottom-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[20px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="sm:py-[20px] sm:w-[100%] sm:h-auto lg:py-[10px] lg:w-[100%]" style={{ height: '200px' }}>
              <div className="flex mx-8 items-center">
                <h2 className="w-[100%] text-start py-[20px] sm:text-[37px] lg:text-xl text-[#00A19A] font-medium">
                  Create a New Itinerary
                </h2>
                <button className="text-end items-end justify-end">
                  <FaTimes className="sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer" onClick={closePopup55} />
                </button>
              </div>
              <hr className="mb-3"></hr>
              <div className="">
                <div className="mt-4 mx-8">
                  <label htmlFor="title" className="text-[#00A19A] font-medium sm:text-[28px] lg:text-[14px]">
                    Title
                  </label>
                  <input
                    className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%]"
                    type="text"
                    required
                    placeholder="Name your itinerary"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  {errorMessage && (
                    <p className="text-red-500 sm:text-[26px] lg:text-xs mt-2">{errorMessage}</p>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0">
                  <hr className=""></hr>
                  <div className="flex justify-end mx-8 space-x-3 my-[20px]">
                    <button
                      className="rounded-lg px-2 py-2 bg-white sm:h-20 lg:h-9 text-[#00A19A] sm:text-[28px] lg:text-[14px]"
                      onClick={closePopup55}
                    >
                      Cancel
                    </button>
                    <button
                      className="rounded-lg px-2 py-2 bg-[#00A19A] sm:h-20 lg:h-9 text-white sm:text-[28px] lg:text-[14px]"
                      onClick={saveTravelPlan}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="loader-container7">
                          <div className="loader"></div>
                          <p className="loading-text">Loading...</p>
                        </div>
                      ) : (
                        "Create itinerary"
                      )}
                    </button>
                  </div>
                </div>
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

export default CreateNewtravel;
