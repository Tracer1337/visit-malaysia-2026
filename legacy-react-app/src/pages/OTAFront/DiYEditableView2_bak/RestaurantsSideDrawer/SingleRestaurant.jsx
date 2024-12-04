// import React from "react";
// import { RatingBar } from "components/RatingBar/index";

// const SingleRestaurant = ({ restaurant, onClick }) => {
//   console.log('Restaurant Object:', restaurant);
//   const { photos, name, rating, userRatingCount, displayTypes } = restaurant;

//   const handleClick = () => {
//     onClick(name, photos?.length > 0 ? photos[0]?.photoUrl : "");
//   };

//   return (
//     <div
//       onClick={handleClick}
//       className="flex flex-col cursor-pointer md:w-[500px] lg:w-[220px] h-[300px] bg-white shadow-xl rounded-lg hover:scale-105 duration-300 relative"
//     >
//       <div className="relative h-2/4">
//         <img
//           className="w-full h-full rounded-t-lg object-cover"
//           src={photos?.length > 0 ? photos[0]?.photoUrl : "/images/no_img_avail.jpg"}
//           alt={name || "Restaurant"}
//         />
//       </div>
//       <div className="w-full p-3">
//         <div className="w-full flex justify-between items-center">
//           <p className="w-[120px] text-[#008D36] text-xs sm:text-sm font-medium truncate">
//             {name || "No name available"}
//           </p>
//         </div>
//         <div className="flex items-center">
//           <span className="text-[#00A19A] font-bold text-xs">
//             {rating || 0}
//           </span>
//           <RatingBar
//             className="flex justify-between w-[50px] ml-1"
//             value={rating || 0}
//             starCount={5}
//             size={18}
//           />
//           <span className="text-[#00A19A] font-bold ml-1 text-xs">
//             ({userRatingCount || 0})
//           </span>
//         </div>
//         <div className="my-1">
//           <span className="text-[#00A19A] text-xs">
//             {restaurant.distanceText || "Unknown distance"}
//           </span>
//         </div>
//         <div className="flex gap-2">
//           {displayTypes?.split(",").map((type, index) => (
//             <div
//               key={index}
//               className="py-1 px-2 bg-[#F4F4F4] border-[#45B9B4] border-[0.5px] rounded-[5px]"
//             >
//               <span className="text-[#45B9B4] font-italic text-xs">
//                 {type.trim()}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleRestaurant;

import React from "react";

const SingleRestaurant = ({ restaurant, onClick }) => {
  // Log the entire restaurant object to the console
  console.log('Restaurant Object:', restaurant);

  const { name, photos } = restaurant;

  const handleClick = () => {
    onClick(name, photos?.[0]?.photoUrl || "");
  };

  return (
    <div onClick={handleClick} className="flex flex-col cursor-pointer">
      <h3>{name || "No name available"}</h3>
      <img
        className="w-full h-full rounded-t-lg object-cover"
        src={photos?.length > 0 ? photos[0]?.photoUrl : "/images/no_img_avail.jpg"}
        alt={name || "Restaurant"}
      />
    </div>
  );
};

export default SingleRestaurant;
