import React from 'react';
import { RatingBar } from 'components/RatingBar';
import { MdOutlineArrowDropDown, MdClose } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa';

const RestaurantDetailView = ({ restaurant, onClose, loading }) => {
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a more sophisticated loading indicator
  }

  const {
    name,
    photos,
    rating,
    userRatingCount,
    displayTypes,
    distanceText,
    address,
    nationalPhoneNumber,
    priceLevel,
    openNow,
    closedAt,
    reviews,
  } = restaurant;

  const photoUrl = photos?.length > 0 ? photos[0]?.photoUrl : '/images/no_img_avail.jpg';

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-end p-2">
        <MdClose size={24} className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="p-4">
        {/* Restaurant Image */}
        <div>
          <img
            className="w-full h-64 object-cover rounded"
            src={photoUrl}
            alt={name || 'Restaurant'}
          />
        </div>

        {/* Restaurant Details */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-green-800 text-2xl font-bold">{name || 'No name available'}</h2>
              <span className="ml-3 text-teal-600">{distanceText || 'Unknown distance'}</span>
            </div>
            <div className="py-1 px-2 bg-gray-100 border border-teal-400 rounded">
              <span className="text-teal-400 italic">{priceLevel || '$$'}</span>
            </div>
          </div>

          {/* Hours, Address, Phone */}
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex mb-4 md:mb-0">
              <div>
                <p className="font-semibold">Hours:</p>
                <p className="font-semibold mt-2">Address:</p>
                <p className="font-semibold mt-2">Phone:</p>
              </div>
              <div className="ml-6">
                <div className="flex items-center">
                  <span className={`text-${openNow ? 'green' : 'red'}-600`}>
                    {openNow ? 'Open' : 'Closed'}
                  </span>
                  {closedAt && (
                    <span className="ml-2 text-gray-600">
                      Closes at {closedAt}
                    </span>
                  )}
                  <MdOutlineArrowDropDown size={20} className="ml-1 text-gray-600" />
                </div>
                <p className="mt-2">{address || 'No address available'}</p>
                <div className="flex items-center mt-2">
                  <span>{nationalPhoneNumber || 'No phone available'}</span>
                  {nationalPhoneNumber && (
                    <a href={`tel:${nationalPhoneNumber}`} className="ml-2 text-gray-600">
                      <FaPhone size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Display Types */}
            <div className="flex flex-wrap">
              {displayTypes?.split(',').map((type, index) => (
                <div
                  key={index}
                  className="py-1 px-2 bg-gray-100 border border-teal-400 rounded mr-2 mb-2"
                >
                  <span className="text-teal-400 italic">{type.trim()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings and Reviews */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <span className="text-teal-600 font-bold text-xl">{rating || 0}</span>
              <RatingBar
                className="flex ml-2"
                value={rating || 0}
                starCount={5}
                size={24}
              />
              <span className="text-teal-600 font-bold ml-2">
                ({userRatingCount || 0})
              </span>
            </div>

            {/* Reviews */}
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {reviews?.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="min-w-[300px] bg-gray-50 border border-gray-200 rounded p-4"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="text-green-800 font-bold">{review.title || 'Review'}</h3>
                      <span className="text-teal-600 italic">{review.author || 'Anonymous'}</span>
                    </div>
                    <p>{review.reviewText || 'No review text available.'}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>

            {/* Add to Plan Button */}
            <div className="flex justify-end mt-4">
              <button className="py-2 px-4 bg-teal-600 text-white rounded hover:bg-teal-700">
                Add to Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailView;
