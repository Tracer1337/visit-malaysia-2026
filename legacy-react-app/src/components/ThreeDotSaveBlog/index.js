import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import { Text } from 'components';
import { fetchBlogBookmark } from 'data/data';
import ReactDOM from "react-dom";
import LinkBtnSave from 'components/linkBtnSave/index';
import LinkBtnSaveBlog from 'components/linkBtnSaveBlog/index';

const ThreeDotSaveBlog = ({
  userId,
  title,
  blogId,
  setBlogContent,
  fetchBookmark,
  showSuccess,
  setShowSuccessMessage,
  blogLink
}) => {
  const threedotButtonRef = useRef(null);
  const [menuActive, setMenuActive] = useState(false);
  const modalRef = useRef(null);
  const [isLinkBtnSave, setIsLinkBtnSave] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !threedotButtonRef.current.contains(event.target)
      ) {
        setMenuActive(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (event) => {
    event.preventDefault();
    // event.stopPropagation(); 
  };
  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuActive(!menuActive);
  };

  const handleShare = () => {
    setIsLinkBtnSave(true);
  };
  const closePopup3 = () => {
    setIsLinkBtnSave(false);
  };

  const handleUnsave = async () => {
    try {

      // console.log('userItineraryBookmarkId', userItineraryBookmarkId);
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://halaltravel.ai/ht/api/blog/bookmark/${userId}/${blogId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log('Successful delete saved blog');

      await fetchBlogBookmark(userId);
      setBlogContent((prevBlogContent) => prevBlogContent.filter((blog) => blog.id !== blogId));

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      showSuccess(title);

      // const updatedData = await fetchItineraryBookmark(userId);
      // if (updatedData) {
      //   // Handle the updated data as needed
      //   showSuccess(itineraryTitle);
      // }


    } catch (error) {
      console.error('Error  delete saved blog:', error);

    }
  };


  return (
    <div className="relative inline-block">
      <button
        className={`absolute top-0 right-2 cursor-pointer bg-black bg-opacity-40 lg:w-6 lg:h-6 md:w-[55px] md:h-[55px] p-1 rounded-full shadow-md transition duration-300 hover:bg-opacity-60 ${menuActive ? '' : ''
          }`}
        onClick={toggleMenu}
        ref={threedotButtonRef}
      >
        <div className="flex items-center justify-center">
          {/* <span className="text-white text-xl">&#8226;&#8226;&#8226;</span> */}
          <img className="lg:w-[15px] lg:h-[15px] md:w-[30px] md:h-[30px" src="/images/three_dots.svg" alt="three_dots" />
        </div>

      </button>
      <div
        className={`absolute lg:top-7 md:top-16 right-2 bg-white text-black border border-gray-300 shadow-md rounded-lg ${menuActive ? 'block ' : 'hidden'
          }`}
        onClick={handleOptionClick}
        ref={modalRef}
      >
        <ul className="lg:w-[150px] md:w-[200px] ">
          <li className="pl-4 py-1 lg:text-[14px] md:text-[24px] whitespace-nowrap flex items-center hover:bg-gray-100 transition duration-300" onClick={handleUnsave}>
            {/* <img src="/images/copy_link.jpg" alt="Icon 2" className="mr-2 h-3 w-3" /> */}
            Unsave
          </li>
          <hr></hr>
          <li className="pl-4 py-1 lg:text-[14px] md:text-[24px] whitespace-nowrap flex items-center hover:bg-gray-100 transition duration-300"
            onClick={handleShare}
          >
            Share
          </li>
          <hr></hr>
          {/* <li className="pl-4 py-1 whitespace-nowrap flex items-center hover:bg-gray-100 transition duration-300" >
            Duplicate
          </li>
          <hr></hr>
          <li className="pl-4 py-1 whitespace-nowrap flex items-center hover:bg-gray-100 transition duration-300" >
            Delete
          </li> */}
        </ul>


      </div>
      {isLinkBtnSave &&
        ReactDOM.createPortal(
          <LinkBtnSaveBlog
            closePopup3={closePopup3}
            creatorId={userId}
            blogId={blogId}
            title={title}
            blogLink={blogLink}
            modalVisible={isLinkBtnSave}
          />,
          document.body
        )}

    </div>
  );
};

export default ThreeDotSaveBlog;

