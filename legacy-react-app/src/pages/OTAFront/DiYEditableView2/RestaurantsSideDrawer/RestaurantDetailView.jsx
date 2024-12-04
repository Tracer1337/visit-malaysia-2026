import React, { useState, useRef } from "react";
import { FaPhone } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RatingBar } from "components/RatingBar/index";
import crossSvg from "../cross.svg";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const RestaurantDetailView = ({ restaurant, onClose1, onClick }) => {
  const {
    name,
    photos,
    rating,
    userRatingCount,
    displayTypes,
    distanceText,
    address,
    nationalPhoneNumber,
    closedAt,
    reviews = [],
    currentOpeningHours: openingHoursString,
  } = restaurant;

  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    onClick(restaurant);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Parse the opening hours JSON string
  let openingHours;
  try {
    openingHours = JSON.parse(openingHoursString);
  } catch (e) {
    console.error("Failed to parse opening hours:", e);
    openingHours = null;
  }

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Navigation Button */}
      <div className="flex justify-between w-full p-[10px] bg-[#00A19A]">
        <button
          className="text-black"
          onClick={onClose1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        {/* <img
          src={crossSvg}
          alt="Cross Icon"
          className="w-5 cursor-pointer"
          onClick={onClose1}
        /> */}
      </div>



      {/* Main Content - Make this section scrollable */}
      <div className="flex-1 overflow-y-auto mb-[70px]">
        <div className="p-[40px]">
          {/* Restaurant Image */}
          <img
            className="w-[800px] h-[250px] object-cover"
            src={
              photos?.length > 0
                ? photos[0]?.photoUrl
                : "https://via.placeholder.com/1000x250?text=No+Image+Available"
            }
            alt={name || "Restaurant Image"}
          />

          {/* Restaurant Info */}
          <div className="p-[20px]">
            <div className="flex justify-between">
              <div className="">
                <div>
                  <p className="text-[#008009] text-xl font-bold font-montserrat">
                    {name}
                  </p>
                </div>
                <div className="">
                  <p className="text-[#00A19A] text-sm font-medium">
                    {distanceText || "Unknown distance"}
                  </p>
                </div>
              </div>

              <div className="  ">
                <p className="text-[#45B9B4] font-italic text-[12px] py-1 px-3 bg-[#F4F4F4] border-[#45B9B4] border-[0.5px] rounded-[5px]">
                  {restaurant.priceLevel || "$$"}
                </p>
              </div>
            </div>

            {/* Web View (retained) */}
            <div className="mt-8 flex justify-between items-start">
              <div>

                <div className="flex items-center">
                  <div className="w-[100px]">
                    <p className="text-[#000000] text-sm font-medium">Hours:</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="">
                        <p className="text-[#008009] text-sm">
                          {restaurant.openNow ? "Open" : "Closed"}
                        </p>
                      </div>
                      {closedAt && (
                        <div className="ml-8 cursor-pointer flex" onClick={toggleDetails}>
                          <p className="text-[#000000] text-sm">
                            Closes {closedAt}
                          </p>
                          <MdOutlineArrowDropDown
                            size={20}
                            className={`ml-1 text-[#485035] ${showDetails ? "rotate-180" : ""
                              }`}
                          />
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {showDetails && openingHours && (
                  <>
                    {/* Additional Details */}
                    <div className="mt-5 mb-10 ml-[100px]">
                      <p className="text-[#000000] text-sm">
                        <strong>Opening Hours:</strong>
                      </p>
                      {openingHours.weekdayDescriptions.map((day, index) => (
                        <p key={index} className="text-[#000000] text-sm mt-2">
                          {day}
                        </p>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex items-start mt-5">
                  <p className="text-[#000000] text-sm w-[100px] font-medium">Address:</p>
                  <span className="text-[#000000] text-sm w-[250px]">
                    {address || "No address available"}
                  </span>
                </div>

                <div className="flex mt-5 items-center">
                  <p className="text-[#000000] text-sm w-[100px] font-medium">Phone:</p>
                  <div className="flex items-center">
                    <span className="text-[#000000] text-sm">
                      {nationalPhoneNumber || "No phone available"}
                    </span>
                    <div className="p-2 rounded-[5px] bg-[#FFFFFF] shadow-md ml-5 hover:bg-[#F5F5F5] cursor-pointer">
                      <FaPhone size={13} className="text-[#494949]" />
                    </div>
                  </div>
                </div>

              </div>


              <div className="gap-1 flex">
                {displayTypes?.map((type, index) => (
                  <div
                    key={index}
                    className="py-1 px-2 bg-[#F4F4F4] border-[#45B9B4] border-[0.5px] rounded-[5px]"
                  >
                    <p className="text-[#45B9B4] font-italic text-sm">{type}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* Ratings and Reviews */}
            <div className="mt-[60px]">
              <div className="flex items-center">
                <div>
                  <p className="text-[#00A19A] font-bold text-xl">
                    {rating}
                  </p>
                </div>
                <RatingBar
                  className="flex justify-between w-[80px] ml-2"
                  value={rating || 0}
                  starCount={4}
                  size={25}
                />
                <div>
                  <p className="text-[#00A19A] font-bold text-l ml-2 mt-1">
                    ({userRatingCount || 0})
                  </p>
                </div>
              </div>

              <div className="relative w-full mt-5">
                {/* Left Scroll Button */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full shadow-md opacity-50 hover:bg-gray-300 hover:opacity-100"
                  style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
                >
                  <MdChevronLeft size={24} />
                </button>

                {/* Right Scroll Button */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full shadow-md opacity-50 hover:bg-gray-300 hover:opacity-100"
                  style={{ top: '50%', transform: 'translateY(-50%)' }} // Center vertically
                >
                  <MdChevronRight size={24} />
                </button>

                {/* Scrollable Review Container */}
                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-hidden scroll-smooth ml-3 mr-3"
                >
                  <div className="flex flex-nowrap space-x-4">
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-[300px]"
                      >
                        <div className="p-[15px] bg-[#FAFAFA] border-[#C6E3D9] border-[0.5px] rounded-[5px]">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-[#008009] font-bold text-lg">
                                {review.title || "Review"}
                              </p>
                            </div>
                            <div>
                              <p className="text-[#00A19A] font-italic text-sm">
                                {review.author || "Anonymous"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-[20px]">
                            <p className="text-[#000000] text-sm">
                              {review.text || "No review text available."}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className="flex gap-4 overflow-x-auto w-full mt-5 space-x-4 scroll overflow">
                <div className="flex flex-nowrap space-x-5">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[300px] "
                    >
                      <div className="p-[15px] bg-[#FAFAFA] border-[#C6E3D9] border-[0.5px] rounded-[5px]">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-[#008009] font-bold text-lg">
                              {review.title || "Review"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#00A19A] font-italic text-sm">
                              {review.author || "Anonymous"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-[20px]">
                          <p className="text-[#000000] text-sm">
                            {review.text || "No review text available."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Add to Plan Button */}
            <div className="flex justify-start mt-[50px]">
              <div
                className="py-[10px] px-[20px] bg-[#00A19A] rounded-lg cursor-pointer"
                onClick={handleClick}
                style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
              >
                <p className="font-montserrat text-[#FFFFFF] font-bold text-l">
                  Add to plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailView;
