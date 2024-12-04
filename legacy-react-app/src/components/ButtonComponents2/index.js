import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalConstant from 'constant/global';

const ButtonComponents2 = ({ productCode, productAll, onTag, onRemove, onClick }) => {
  const [buttonText, setButtonText] = useState("Tag Product");
  const [isClicked, setIsClicked] = useState(false);

  //we need token, user id
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const userId = localStorage.getItem("userId");

  console.log("PRODUCT CODE:", productCode);
  console.log("PRODUCTALL: ", productAll);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://halaltravel.ai/ht/api/product/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            pageSize: 1000,
          }
        })
        const apiData = response.data;
        const userProducts = apiData.elements.map((userProducts) => ({
          productCode: userProducts.product.code,
        }));

        // console.log('productCode:', productCode);
        // console.log('TAG productsData:', userProducts);

        // Make the productCode string to compare with item.productCode
        const cleanedProductCode = String(productCode).trim();

        if (userProducts.some((item) => String(item.productCode).trim() === cleanedProductCode)) {
          setIsClicked(true);
          setButtonText("Remove Product");
        } else {
          setIsClicked(false);
          setButtonText("Tag Product");
        }
      } catch (error) {
        console.error('Error fetching creator data:', error);
      }
    };

    fetchData();
  }, [productCode, userId]);


  // *TAG PRODUCTS*
  const handleButtonClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
    setButtonText((prevButtonText) =>
      prevButtonText === "Tag Product" ? "Remove Product" : "Tag Product"
    );

    // Call the appropriate API function based on the button's state
    if (buttonText === "Tag Product") {
      onTag(productAll);
    } else {
      onRemove(productCode);
    }
  };


  return (
    <button 
    className={`px-1 py-1 ${isClicked ? 'bg-teal-500 text-white' : 'bg-gray-300 text-black'} rounded cursor-pointer 2xl:w-32 xl:w-32 lg:w-32 md:w-32 sm:w-22 xs:w-22 2xl:text-sm xl:text-sm lg:text-sm md:text-xs sm:text-xs xs:text-xs`}
    // style={buttonStyles} 
    onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  );
};

export default ButtonComponents2;