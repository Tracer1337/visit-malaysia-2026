import React, { useEffect, useState } from 'react'
import { Text, Input, Img, Button, Line, Row, Column } from "components";
import { FaTimes } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchData } from "redux/actions";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoadingSpinner7.css";
import Compressor from '@xkeshi/image-compressor';
import { IoAdd } from "react-icons/io5";

const AddtoContentNew = ({ showAddtoContentNew, closePopup33, openPopup55 }) => {

  // const [showContentSetting, setShowContentSetting] = React.useState(false);
  // const location = useLocation();
  // const receivedData = location.state;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingg, setIsLoadingg] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const userId = localStorage.getItem("userId");
  const [cover_image, setCoverImage] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const chatgptId = useSelector((state) => state.data.itineraryId);
  const [mode, setMode] = useState('');

  const handleCreateNewItinerary = async () => {
    setMode('new');
    const requestBody = {
      mode: 'new',
      activity_id: 2,
      chatgpt_id: 1,
      user_id: 1,
      title: 'test',
      description: 'description',
      day: 5
    };

    try {
      const response = await fetch('https://halaltravel.ai/ht/api/planner/user/itinerary/activity/saveTemp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('New itinerary created:', result);
        // Handle success
      } else {
        console.error('Failed to create new itinerary');
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  return (
    <>
      {showAddtoContentNew ? (
        <>
          <div className="font-montserrat bg-gray-50 xs:top-[10vh] xs:bottom-[10vh] lg:top-0 lg:bottom-0 rounded-3xl cursor-pointer justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[20px] flex-nowrap overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            {/*Content title*/}

            <Column className="sm:py-[50px] sm:w-[100%] sm:h-[100%] lg:py-[10px] lg:w-[100%] lg:h-fit">
              <div className=' flex mr-8 items-center ml-8'>
                <Text className="w-[100%] text-start py-[20px] sm:text-[37px] lg:text-xl text-[#00A19A] font-medium">
                  Select a itinerary to add to
                </Text>
                <button className="text-end items-end justify-end">
                  <FaTimes
                    className="sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                    // onClick={() => setShowContentSetting(false)}
                    onClick={closePopup33}
                  />
                </button>
              </div>

              <hr className='mb-3'></hr>
              {/*Content*/}
              <div className='h-[100%]'>
                <div className="mt-4 mx-8">
                <div className="relative flex items-center">
     
<input
    className="placeholder-[#9A9A9A] rounded bg-white border border-[#D3D3D3] text-gray-900 sm:text-[26px] lg:text-xs block sm:h-24 lg:h-9 w-[100%] pl-5"
    type="text"
    size="smSrc"
    required
    placeholder="Search your itinerary"
    title="Search"
    name="search"
  />
  
  <svg
    className="absolute right-3 top-3 lg:w-4 lg:h-4 lg:mt-0 md:mt-5 md:w-10 md:h-10 text-[#00A19A] fill-current pointer-events-none"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>

    </div>
                </div>


<div className='absolute inset-x-0 bottom-0'>
<hr className=' '></hr>
<Row className="common-pointer ml-8 my-[20px]"
onClick={handleCreateNewItinerary}>
        <button className="rounded-full bg-[#00A19A] lg:w-7 lg:h-7 md:w-[50px] md:h-[50px] ">
            <IoAdd className="text-center justify-center lg:h-7 lg:w-7 md:h-[50px] md:w-[50px] text-white font-medium" />
        </button>
        <text className="lg:text-sm md:text-[32px] ml-2 mt-1 text-[#00A19A]">Create New Itineraryyy</text>
        </Row>
        </div>              
              </div>

            </Column>
          </div>

          <div className="opacity-0 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AddtoContentNew;