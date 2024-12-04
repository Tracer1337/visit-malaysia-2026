import React from "react";
import { RatingBar } from "components/RatingBar/index";

const SingleRestaurant = ({ restaurant, onClick }) => {
  const { photos, name, rating, userRatingCount, displayTypes } = restaurant;

  const handleClick = () => {
    // Pass the entire restaurant object to the onClick function
    onClick(restaurant);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col cursor-pointer md:w-[500px] lg:w-[500px] xl:w-[280px] 2xl:w-[220px] h-[300px] bg-white rounded-lg hover:scale-105 duration-300 relative"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
      title="Click to View Details"
    >
      <div className="relative h-2/4">
        <img
          className="h-full md:w-[500px] lg:w-[500px] xl:w-[300px] 2xl:w-[220px] rounded-t-lg object-cover"
          src={photos?.length > 0 ? photos[0]?.photoUrl : "/images/no_img_avail.jpg"}
          alt={name || "Restaurant"}
        />
      </div>
      <div className="w-full p-3">
        <div className="w-full flex justify-between items-center">
          <p className="md:w-full lg:w-full xl:w-[120px] text-[#008D36] text-xs sm:text-sm font-bold lg:truncate"
            title={name}>
            {name || "No name available"}
          </p>
          <div className="bg-[#F4F4F4] border-[0.5px] border-[#45B9B4] rounded-[10px] px-[12px] py-[2px]">
            <text className="text-xs text-[#00A19A]" style={{ fontStyle: 'italic' }}>
              $$
            </text>
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-[#00A19A] font-bold text-xs">
            {rating || 0}
          </span>
          <RatingBar
            className="flex justify-between w-[60px] ml-1"
            value={rating || 0}
            starCount={4}
            size={18}
          />
          <span className="text-[#00A19A] font-bold ml-1 text-xs">
            ({userRatingCount || 0})
          </span>
        </div>
        <div>
          <text className="text-[#00A19A] font-medium text-xs">
            {restaurant?.distanceText ? `${restaurant.distanceText?.toUpperCase()} away` : ''}
          </text>
        </div>
        <div className="flex gap-2 mt-4 justify-between ">
          <div className="bg-[#F4F4F4] flex justify-center border-[0.5px] border-[#45B9B4] rounded-lg md:w-[130px] lg:w-[140px] xl:w-[100px] py-[3px]">
            <text className="text-xs text-[#00A19A]" style={{ fontStyle: 'italic' }}>
              European
            </text>
          </div>
          <div className="bg-[#F4F4F4] flex justify-center border-[0.5px] border-[#45B9B4] rounded-lg md:w-[130px] lg:w-[140px] xl:w-[100px] py-[3px]">
            <text className="text-xs text-[#00A19A]" style={{ fontStyle: 'italic' }}>
              Cafe
            </text>
          </div>
          <div className="bg-[#F4F4F4] flex justify-center border-[0.5px] border-[#45B9B4] rounded-lg md:w-[130px] lg:w-[140px] xl:w-[100px] py-[3px]">
            <text className="text-xs text-[#00A19A]" style={{ fontStyle: 'italic' }}>
              Halal
            </text>
          </div>
        </div>
        {/* <div className="my-1">
          <span className="text-[#00A19A] text-xs">
            {restaurant.distanceText || "Unknown distance"}
          </span>
        </div> */}
        {/* <div className="flex gap-2">
          {displayTypes?.split(",").map((type, index) => (
            <div
              key={index}
              className="py-1 px-2 bg-[#F4F4F4] border-[#45B9B4] border-[0.5px] rounded-[5px]"
            >
              <span className="text-[#45B9B4] font-italic text-xs">
                {type.trim()}
              </span>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default SingleRestaurant;
