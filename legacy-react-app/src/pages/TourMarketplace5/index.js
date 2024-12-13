import React, { useEffect, useState } from "react";
import axios from "axios";
import "styles/tailwind.css";
import {
  ButtonMp,
  TextMp,
  Img,
  Input,
  Line,
  List,
  Row,
  Text,
} from "components";
import ButtonComponents from "components/ButtonComponents";
import { CheckBox } from "components/CheckBox/index";
import { RatingBar } from "components/RatingBar/index";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";
import SidebarMarketplace from "components/SidebarMarketplace/index";
import GlobalConstant from "constant/global";
import LoadingSpinner from 'components/LoadingSpinner/index';
import { useAuth } from "AuthContext";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { dataHotel, STATE_DATA, getStateName } from "./data";
import { dataHotelsAll } from "./data2";


const TourMarketplacePage5 = () => {
  const numberOfButtons = 1;

  const [productsTotal, setProductsTotal] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [productSort, setProductSort] = useState('DEFAULT');
  const [selectedTags, setSelectedTags] = useState([]);
  const [productSortValue, setProductSortValue] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productAll, setProductAll] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(true);
  const [selectedSourceCurrency, setSelectedSourceCurrency] = useState(["MYR"]);
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState(["USD"]);
  const [stcValue, setStcValue] = useState("");
  const [rate, setRate] = useState("");
  const { setIsLoggedIn } = useAuth();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [epicData, setEpicData] = useState([]);

  // Combine both data arrays
  const combinedData = [...dataHotelsAll, ...dataHotel];

  const [hotelData, setHotelData] = useState(combinedData);

  setIsLoggedIn(true);

  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);

  const openPopup1 = () => {
    setIsPopup1Open(true);
  };

  const openPopup2 = () => {
    setIsPopup2Open(true);
  };

  const closePopup1 = () => {
    setIsPopup1Open(false);
  };

  const closePopup2 = () => {
    setIsPopup2Open(false);
  };

  // *RESET WHEN SEARCHTEXT CHANGE*
  useEffect(() => {
    setMinPrice("");
    setMaxPrice("");
    setDurationFilter("");
  }, [searchText]);

  // useEffect(() => {
  //   setProductSort("FTD");
  //   setProductSortValue('Featured');
  // }, [selectedTags]);

  // *CLEAR FILTER*
  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedTags([]);
    setDurationFilter("");
    setRatingFilter("");
    setClassFilter("");
  };

  // *CLEAR INPUT*
  function clearInputMin() {
    setMinPrice("");
  }
  function clearInputMax() {
    setMaxPrice("");
  }


  // *SHOW SPINNER*
  useEffect(() => {
    // After 3 seconds (adjust the time as per your requirement)
    const delay = 10000;
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, delay);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);



  // *Function to handle changes to searchText
  const handleSearchTextChange = (newSearchText) => {
    setSearchText(newSearchText);

    // If searchText is not empty, clear selectedTags
    if (newSearchText !== '') {
      setSelectedTags([]);
    }
  };

  const [tempSearchText, setTempSearchText] = useState('');

  // *kalau nak buat click img baru dia search
  const handleSearchButtonClick = () => {
    setSearchText(tempSearchText);
  };


  // * Tag Change * //multiple tag selected
  const handleTagChange1 = (...tags) => {
    if (!searchText) {
      setSelectedTags((prevTags) => {
        return tags.reduce((updatedTags, tag) => {
          if (updatedTags.includes(tag)) {
            return updatedTags.filter((t) => t !== tag);
          } else {
            return [...updatedTags, tag];
          }
        }, prevTags);
      });
    }
  };

  const handleTagChange = (tag) => {
    if (!searchText) {
      setSelectedTags((prevTags) => {
        // Check if the clicked tag is already the selected one
        if (prevTags.includes(tag)) {
          return []; // If so, return an empty array to remove the tag
        } else {
          return [tag]; // Otherwise, update with the new tag
        }
      });
    }
  };



  const isButtonSelected = (tagId) => selectedTags.includes(tagId);


  function parseDurationToMinutes(durationString) {
    if (typeof durationString !== 'string') {
      return 0; // Not a valid duration string
    }

    const numericValue = parseInt(durationString, 10);

    if (durationString.includes('hour' || 'hours')) {
      return numericValue * 60; // Convert hours to minutes
    } else if (durationString.includes('day' || 'days')) {
      return numericValue * 24 * 60; // Convert days to minutes
    } else if (durationString.includes('night' || 'nights')) {
      return numericValue * 24 * 60; // Convert nights to minutes (assuming 1 night = 1 day)
    } else if (durationString.includes('minute' || 'minutes')) {
      return numericValue; // Already in minutes
    }
    return 0; // Unknown unit or missing duration
  }


  // *MAIN FETCH DATA FILTER*
  useEffect(() => {
    const filteredData = combinedData.filter(product => {
      const matchesSearchText =
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())

      const matchesPriceRange =
        (minPrice === '' || product.price * rate >= parseFloat(minPrice)) &&
        (maxPrice === '' || product.price * rate <= parseFloat(maxPrice));

      const matchesDuration =
        durationFilter === '' || // No filter selected
        (durationFilter === 'upTo1' && parseDurationToMinutes(product.duration) <= 60) || // up to 1 hour
        (durationFilter === '1To4' && parseDurationToMinutes(product.duration) >= 60 && parseDurationToMinutes(product.duration) <= 240) || // 1 to 4 hours
        (durationFilter === '4To1D' && parseDurationToMinutes(product.duration) >= 240 && parseDurationToMinutes(product.duration) <= 1440) || // 4 hurs to 1 days
        (durationFilter === '1DTo3D' && parseDurationToMinutes(product.duration) >= 1440 && parseDurationToMinutes(product.duration) <= 4320) || // 1 days to 3 days
        (durationFilter === '3DToP' && parseDurationToMinutes(product.duration) >= 4320); // 3+ days

      const matchesClass =
        classFilter === '' || // No filter selected
        (classFilter === '5hotelclass' && product.hotel_class === 5) ||
        (classFilter === '4hotelclass' && product.hotel_class === 4) ||
        (classFilter === '3hotelclass' && product.hotel_class === 3) ||
        (classFilter === '2hotelclass' && product.hotel_class === 2) ||
        (classFilter === '1hotelclass' && product.hotel_class === 1);

      const matchesRating =
        ratingFilter === '' || // No filter selected
        (ratingFilter === '+0star' && product.rating >= 0) ||
        (ratingFilter === '+6star' && product.rating >= 6) ||
        (ratingFilter === '+7star' && product.rating >= 7) ||
        (ratingFilter === '+8star' && product.rating >= 8) ||
        (ratingFilter === '+9star' && product.rating >= 9);

      console.log("selectedTags: ", selectedTags);

      const matchesTags =
        selectedTags.length === 0 || // No filter selected
        selectedTags.some(tag => product.tags.includes(tag));
      // selectedTags.every(tag => product.tags.includes(tag));

      return matchesSearchText && matchesPriceRange && matchesDuration && matchesClass && matchesRating && matchesTags;
    });

    setHotelData(filteredData);
  }, [searchText, minPrice, maxPrice, durationFilter, classFilter, ratingFilter, selectedTags]);

  console.log("hotelData", hotelData);


  // * PAGINATION *
  const productsPerPageDeals = 10; // Number of products to display per page
  // const totalPagesEpic = Math.ceil(epicData.length / productsPerPageEpic); // Calculate total pages
  const totalPagesDeals = Math.ceil(hotelData.length / productsPerPageDeals); // Calculate total pages

  const [currentPageDeals, setCurrentPageDeals] = useState(1); // State to track the current page

  // Calculate the index range for the products to display on the current page
  const startIndexDeals = (currentPageDeals - 1) * productsPerPageDeals;
  const endIndexDeals = startIndexDeals + productsPerPageDeals;


  const handleArrowClick = (direction) => {
    if (direction === 'left' && currentPageDeals > 1) {
      setCurrentPageDeals(currentPageDeals - 1);
    } else if (direction === 'right' && currentPageDeals < totalPagesDeals) {
      setCurrentPageDeals(currentPageDeals + 1);
    }
  };

  const getPageButtonsRange = () => {
    const buttonsRange = [];
    const startPage = Math.max(currentPageDeals - 1, 1);
    const endPage = Math.min(currentPageDeals + 1, Math.ceil(totalPagesDeals));

    for (let i = startPage; i <= endPage; i++) {
      buttonsRange.push(i);
    }

    return buttonsRange;
  };

  useEffect(() => {
    setCurrentPageDeals(1);
  }, [searchText, minPrice, maxPrice, selectedTags, durationFilter, classFilter, ratingFilter, productSort]);


  // * SORT PRODUCT *
  const handleSortProduct = (e) => {
    const selectedValue = e.target.value;
    console.log("selectedValue: ", selectedValue);
    if (selectedValue === 'FTD') {
      setProductSort('FTD');
      setProductSortValue('Featured');
    } else if (selectedValue === 'LTH') {
      setProductSort('LTH');
      setProductSortValue('Price (Low to High)');
    } else if (selectedValue === 'HTL') {
      setProductSort('HTL');
      setProductSortValue('Price (High to Low)');
    } else if (selectedValue === 'STL') {
      setProductSort('STL');
      setProductSortValue('Duration (Short to Long)');
    } else if (selectedValue === 'LTS') {
      setProductSort('LTS');
      setProductSortValue('Duration (Long to Short)');
    }
  };


  console.log("productSort: ", productSort);
  // Function to sort the data based on the selected option
  const sortData = () => {
    // Check if hotelData is an array
    // if (Array.isArray(hotelData)) {
    switch (productSort) {
      case 'LTH':
        return hotelData.slice().sort((a, b) => a.price - b.price);
      case 'HTL':
        return hotelData.slice().sort((a, b) => b.price - a.price);
      case 'STL':
        return hotelData.slice().sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration));
      case 'LTS':
        return hotelData.slice().sort((a, b) => parseDurationToMinutes(b.duration) - parseDurationToMinutes(a.duration));
      default:
        return hotelData.slice(); // Default case, no sorting
    }
    // } else {
    //   // If hotelData is not an array (object), return it as is
    //   return hotelData;
    // }
  };

  const sortedData = sortData();
  console.log("Sorted data: ", sortedData);

  let hotelDataDisplay = [];

  hotelDataDisplay = sortedData.slice(startIndexDeals, endIndexDeals);
  console.log("hotelDataDisplay", hotelDataDisplay);


  // * POST CURRENCY *
  useEffect(() => {
    console.log(
      " selectedTargetCurrency: ",
      selectedTargetCurrency,
      " selectedSourceCurrency: ",
      selectedSourceCurrency
    );

    const postData = {
      targetCurrencies:
        selectedTargetCurrency.length > 0 ? selectedTargetCurrency : [],
      sourceCurrencies:
        selectedSourceCurrency.length > 0 ? selectedSourceCurrency : [],
    };

    axios
      .post("https://halaltravel.ai/gpt/exchange-rates", postData)
      .then((response) => {
        // Assuming the response data is an array of items
        console.log("responserate: ", response);
        // Assuming the API response contains an array of products
        const rateValue = response.data.rates[0].rate;
        setRate(rateValue);
        // console.log("rates: ", rateValue);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedTargetCurrency]);


  // * Sorting Currency *
  const handleSortCurrency = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "ARS") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Argentine Peso - $");
    } else if (selectedValue === "AUD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Australian Dollar - $");
    } else if (selectedValue === "BRL") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Brazilian Real - R$");
    } else if (selectedValue === "CAD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Canadian Dollar - $");
    } else if (selectedValue === "CHF") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Swiss Franc - CHF");
    } else if (selectedValue === "CLP") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Chilean Peso - $");
    } else if (selectedValue === "CNY") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Chinese Yuan - ¥");
    } else if (selectedValue === "COP") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Colombian Peso - $");
    } else if (selectedValue === "DKK") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Danish Krone - kr");
    } else if (selectedValue === "EUR") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Euro - €");
    } else if (selectedValue === "FJD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Fijian Dollar - FJ$");
    } else if (selectedValue === "GBP") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("British Pound Sterling - £");
    } else if (selectedValue === "HHL") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("HHL - HHL");
    } else if (selectedValue === "HKD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Hong Kong Dollar - HK$");
    } else if (selectedValue === "IDR") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Indonesian Rupiah - Rp");
    } else if (selectedValue === "INR") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Indian Rupee - ₹");
    } else if (selectedValue === "ISK") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Icelandic Króna - kr");
    } else if (selectedValue === "JPY") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Japanese Yen - ¥");
    } else if (selectedValue === "KRW") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("South Korean Won - ₩");
    } else if (selectedValue === "MXN") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Mexican Peso - $");
    } else if (selectedValue === "MYR") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Malaysian Ringgit - RM");
    } else if (selectedValue === "NOK") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Norwegian Krone - kr");
    } else if (selectedValue === "NZD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("New Zealand Dollar - $");
    } else if (selectedValue === "PEN") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Peruvian Sol - S/");
    } else if (selectedValue === "PHP") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Philippine Peso - ₱");
    } else if (selectedValue === "PLN") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Polish Złoty - zł");
    } else if (selectedValue === "RUB") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Russian Ruble - ₽");
    } else if (selectedValue === "SEK") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Swedish Krona - kr");
    } else if (selectedValue === "SGD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Singapore Dollar - $");
    } else if (selectedValue === "THB") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Thai Baht - ฿");
    } else if (selectedValue === "TRY") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Turkish Lira - ₺");
    } else if (selectedValue === "TWD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("New Taiwan Dollar - NT$");
    } else if (selectedValue === "USD") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("United States Dollar - $");
    } else if (selectedValue === "VND") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("Vietnamese Dong - ₫");
    } else if (selectedValue === "ZAR") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("South African Rand - R");
    } else if (selectedValue === "AED") {
      setSelectedTargetCurrency([selectedValue]);
      setStcValue("United Arab Emirates Dirham - د.إ");
    }

    setMinPrice('');
    setMaxPrice('');
  };

  // *CURRENCY SYMBOL*
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    AUD: "$",
    AED: "د.إ",
    ARS: "$",
    BRL: "R$",
    CAD: "$",
    CHF: "CHF",
    CLP: "$",
    CNY: "¥",
    COP: "$",
    DKK: "kr",
    FJD: "FJ$",
    HHL: "HHL",
    HKD: "HK$",
    IDR: "Rp",
    ILS: "₪",
    INR: "₹",
    ISK: "kr",
    JPY: "¥",
    KRW: "₩",
    MXN: "$",
    MYR: "RM",
    NOK: "kr",
    NZD: "$",
    PEN: "S/",
    PHP: "₱",
    PLN: "zł",
    RUB: "₽",
    SEK: "kr",
    SGD: "$",
    THB: "฿",
    TRY: "₺",
    TWD: "NT$",
    VND: "₫",
    ZAR: "R",
  };



  // *TAG AND REMOVE PRODUCT SECTION*
  //we need token, user id
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const userId = localStorage.getItem("userId");

  // * TAG PRODUCT *
  async function postTagProduct(postData) {

    try {
      const response1 = await axios.post(`https://halaltravel.ai/ht/api/product/${userId}`, postData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
      console.log('response1: ', response1)

      const data = response1.data; // Get the data from the response

      const influencerProductsId = data.influencer_products_id;

      console.log('influencerProductsId: ', influencerProductsId)

      // setMessage("Product is successfully tagged.");
      toast.success('Product tagged successfully', {
        autoClose: 2000,
        className: 'xs:top-40 lg:top-20',
      });
    }
    catch (error) {
      console.log(error)

      // Check if the error is due to duplicate influencer product
      if (error.response && error.response.data && error.response.data.error_message === "INFLUENCER_PRODUCT_DUPLICATE") {
        // Set the error message for the specific error
        // setErrorMessage("Product is already tagged.");
        toast.error('This product has already been tagged.', {
          autoClose: 2000,
          className: 'xs:top-40 lg:top-20',
        });
      } else {
        // Set a generic error message for other errors
        // setErrorMessage('An error occurred while posting the data!');
        toast.error('An error occurred while tagging the product!', {
          autoClose: 2000,
          className: 'xs:top-40 lg:top-20',
        });
      }
    }
  }

  function handleTag(productAll) {
    // Reset the error message state before initiating the API call
    setErrorMessage('');
    setMessage('');

    console.log("in handleTag");

    console.log("productAll", productAll);

    const postData = {
      "code": productAll.code,
      "name": productAll.name,
      "link": productAll.link,
      "image": productAll.image,
      "price": productAll.price,
      "currency": productAll.currency,
      "description": productAll.description,
      // "rating": productAll.rating,
      // "totalReviews": productAll.total_review,
      // "hotelClass": productAll.hotel_class,
    }

    console.log(" postData handle tag: ", postData)

    postTagProduct(postData);
  }

  // * REMOVE PRODUCT *
  async function postRemove(productCode) {
    setProductCode(productCode);

    try {
      const response = await axios.delete(`https://halaltravel.ai/ht/api/product/${userId}/${productCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

      console.log('response: ', response)

      let data = response.data;

      // setMessage("Product '" + productCode + "' is succesfully removed.");
      toast.success('Product removed successfully.', {
        autoClose: 2000,
        className: 'xs:top-40 lg:top-20',
      });
    }
    catch (error) {
      console.log(error)
      // setErrorMessage("An error occurred while removing the data!");
      toast.error('An error occurred while removing the product!', {
        autoClose: 2000,
        className: 'xs:top-40 lg:top-20',
      });
    }
  }

  function handleRemove(productCode) {
    // Reset the error message state before initiating the API call
    setErrorMessage('');
    setMessage('');

    console.log("remove function");

    console.log('userId: ', userId, ' productCode: ', productCode)

    postRemove(productCode);
  }

  // *POPUP MESSAGE*
  useEffect(() => {
    // Use the effect to automatically clear the message after 3000 milliseconds (3 seconds)
    if (errorMessage || message) {
      const timeout = setTimeout(() => {
        handleCloseError();
      }, 3000);

      // Clear the timeout if the component unmounts or the message state changes
      return () => clearTimeout(timeout);
    }
  }, [errorMessage, message]);

  // Function to close the error message
  const handleCloseError = () => {
    setErrorMessage('');
    setMessage('');
  };

  //*Set the substring for the overview based on screen size* 
  const [maxLength, setMaxLength] = useState(150); // Default maxLength

  useEffect(() => {
    // Function to update maxLength based on screen width
    const updateMaxLength = () => {
      const screenWidth = window.innerWidth;
      setMaxLength(
        screenWidth >= 1536 ? 150 : // 2xl
          screenWidth >= 1280 ? 150 : // xl
            screenWidth >= 1024 ? 150 : // lg
              screenWidth >= 768 ? 80 :   // md
                screenWidth >= 640 ? 80 :   // sm
                  65 // xs or default
      );
    };

    // Add event listener for window resize
    window.addEventListener('resize', updateMaxLength);

    // Call updateMaxLength initially to set the correct maxLength
    updateMaxLength();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateMaxLength);
    };
  }, []);

  console.log("maxlength: ", maxLength)

  // *COPY LINK PRODUCT*
  // function addAdditionalParams(originalLink) {
  //   const additionalParams = `&enc_cid=${userId}`;

  //   // Create a URL object from the original URL
  //   const urlObject = new URL(originalLink);

  //   // Append the additional parameters
  //   urlObject.search += additionalParams;

  //   // Get the modified URL
  //   const modifiedUrl = urlObject.href;

  //   return modifiedUrl;
  // }

  function insertUserIdToLink(link) {
    // Split the link into two parts at the position where you want to insert the new parameter
    const [prefix, suffix] = link.split('&lc=');

    // Combine the parts with the new parameter
    const modifiedLink = `${prefix}&enc_cid=${userId}&lc=${suffix}`;

    return modifiedLink;
  }

  function insertUserIdToLink2(link) {
    // Split the link into two parts at the position where you want to insert the new parameter
    const [prefix, suffix] = link.split('&url=');

    // Combine the parts with the new parameter
    const modifiedLink = `${prefix}&enc_cid=${userId}&url=${suffix}`;

    return modifiedLink;
  }

  const generateLink = (productLink, productCode) => {
    if (productCode.startsWith('HOTELSALL')) {
      return insertUserIdToLink2(productLink, userId);
    } else {
      return insertUserIdToLink(productLink, userId);
    }
  };


  const handleCopyLink = async (link) => {
    try {
      const input = document.createElement('input');
      input.value = link;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);

      toast.success('Link successfully copied!', {
        autoClose: 1500,
        position: 'bottom-center',
        closeButton: false,
      });

    } catch (error) {
      console.error('Error copying link:', error);
      alert('Error!');
    }
  };


  const slideLeftGallery = () => {
    var slider = document.getElementById('slider2')
    slider.scrollLeft = slider.scrollLeft - 500
    // if (currentPageProd > 1) {
    //   setCurrentPageProd(currentPageProd - 1);
    // }
  }

  const slideRightGallery = () => {
    var slider = document.getElementById('slider2')
    slider.scrollLeft = slider.scrollLeft + 500
    // setCurrentPageProd(currentPageProd + 1);
  }

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const currentDate1 = new Date();
  currentDate1.setDate(currentDate1.getDate() + 1); // Set the date to one day ahead

  const year1 = currentDate1.getFullYear();
  const month1 = String(currentDate1.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  const day1 = String(currentDate1.getDate()).padStart(2, '0');

  const formattedDate1 = `${year1}-${month1}-${day1}`;


  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
  // const day = String(currentDate.getDate()).padStart(2, '0');

  // const formattedDate = `${year}-${month}-${day}`;

  function encodeSpaces(text) {
    return text.replace(/\s/g, '%20');
  }

  function ImgWithFallback({ src, fallback, alt, ...props }) {
    const handleError = (e) => {
      e.target.src = fallback;
    };

    return <img src={src} alt={alt} onError={handleError} {...props} />;
  }



  return (
    <>
      <div className="bg-gray-100 font-montserrat w-full">
        <div className='fixed w-full' style={{ zIndex: 2 }}>
          <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
          <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
          <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
          <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
        </div>


        <div className='xs:pt-[160px] lg:pt-[92px]'>

          <div className="flex flex-row">
            {/* <div className="">
              <SidebarMarketplace />
            </div> */}
            <div className="flex flex-col items-center justify-start w-full overflow-x-hidden">
              <div className="flex flex-col items-start justify-start max-w-[1388px] mt-[60px] mx-auto px-[40px] w-full">
                <div className="flex flex-row">
                  <TextMp
                    className="ml-[3px] text-[35px] text-cyan-700 tracking-[-0.48px]"
                    // className="ml-[3px] mt-[22px] text-[35px] text-cyan-700 tracking-[-0.48px]"
                    size="txtPoppinsBold32"
                  >
                    TRAVEL CREATOR MARKETPLACE - HOTELS
                  </TextMp>
                </div>
                <div>
                  {/* Display the error message element */}
                  {errorMessage !== '' ? (
                    <div className="fixed top-7 right-4 z-50 bg-red-400 text-white py-2 px-4 rounded shadow-md">
                      <span className="mr-2">{errorMessage}</span>
                      <button className="text-white font-bold" onClick={handleCloseError}>
                        &times;
                      </button>
                    </div>
                  ) : message !== '' ? (
                    <div className="fixed top-7 right-4 z-50 bg-green-400 text-white py-2 px-4 rounded shadow-md">
                      <span className="mr-2">{message}</span>
                      <button className="text-white font-bold" onClick={handleCloseError}>
                        &times;
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="w-[100%]">
                  <div className="relative items-center">
                    <button className="absolute cursor-pointer top-[45%] left-2 bg-black bg-opacity-30 rounded-full sm:w-11 sm:h-11 lg:w-6 lg:h-6 ">
                      <MdChevronLeft
                        className="text-white sm:w-11 sm:h-11 lg:w-6 lg:h-6"
                        onClick={slideLeftGallery}
                        size={40}
                      />
                    </button>

                    <div className="flex justify-center">
                      <div
                        id="slider2"
                        className=" items-center sm:w-[85%] sm:h-[170px] lg:w-[92%] lg:h-[150px] inline-flex overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
                      >
                        {STATE_DATA.map((item) => (
                          <div
                            key={item.id}
                            className="inline-block p-5 flex-shrink-0 relative hover:scale-105 duration-300"
                            style={{ cursor: "default" }}
                          >
                            <ButtonMp
                              className={`sm:rounded-2xl lg:rounded-lg shadow-lg sm:h-[80px] sm:w-[250px] lg:h-[85px] lg:w-[230px] 
                                hover:bg-[#D7EEEB] ${isButtonSelected(`${item.tag}`) ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                                } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[20px] tracking-[-0.27px]
                                ${searchText != '' ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                              onClick={() => handleTagChange(`${item.tag}`)}
                              disabled={searchText !== ''}
                            >
                              {item.name}
                            </ButtonMp>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="absolute cursor-pointer top-[45%] right-2 bg-black bg-opacity-30 rounded-full sm:w-11 sm:h-11 lg:w-6 lg:h-6">
                      <MdChevronRight
                        className="text-white sm:w-11 sm:h-11 lg:w-6 lg:h-6"
                        onClick={slideRightGallery}
                        size={40}
                      />
                    </button>
                  </div>
                </div>

                {/* <div className="flex flex-row font-poppins items-center justify-between mt-[40px] w-full">
                  <ButtonMp
                    className={`hover:bg-[#D7EEEB] ${isButtonSelected('kl') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                      } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                  ${searchText != '' ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    onClick={() => handleTagChange('kl')}
                    disabled={searchText !== ''}
                  >
                    Kuala Lumpur
                  </ButtonMp>
                  <ButtonMp
                    className={`hover:bg-[#D7EEEB] ${isButtonSelected('melaka') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                      } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                  ${searchText != '' ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    onClick={() => handleTagChange('melaka')}
                    disabled={searchText != ''}
                  >
                    Melaka
                  </ButtonMp>
                  <ButtonMp
                    className={`hover:bg-[#D7EEEB] ${isButtonSelected('penang') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                      } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                  ${searchText != '' ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    onClick={() => handleTagChange('penang')}
                    disabled={searchText != ''}
                  >
                    Penang
                  </ButtonMp>
                  <ButtonMp
                    //   className={`hover:bg-[#D7EEEB] ${isButtonSelected('tours') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                    //     } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                    // ${searchText != '' ? 'cursor-not-allowed opacity-50' : ''
                    //     }`}
                    className={`hover:bg-[#D7EEEB] ${isButtonSelected('sabah') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                      } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                  ${searchText != '' ? 'cursor-not-allowed opacity-50' : 'opacity-50'
                      }`}
                    onClick={() => handleTagChange('sabah')}
                    // disabled={searchText != ''}
                    disabled
                  >
                    Sabah
                  </ButtonMp>
                  <ButtonMp
                    //   className={`hover:bg-[#D7EEEB] ${isButtonSelected('transport') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                    //     } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                    // ${searchText != '' ? 'cursor-not-allowed opacity-50' : ''
                    //     }`}
                    className={`hover:bg-[#D7EEEB] ${isButtonSelected('sarawak') ? 'bg-cyan-700 text-white' : 'bg-white text-green-900'
                      } cursor-pointer font-semibold w-[18%] outline outline-[1px] outline-gray-400 py-8 rounded-[10px] shadow-bs1 text-center xl:text-[15px] xs:text-[10px] tracking-[-0.27px]
                  ${searchText != '' ? 'cursor-not-allowed opacity-50' : 'opacity-50'
                      }`}
                    onClick={() => handleTagChange('sarawak')}
                    // disabled={searchText != ''}
                    disabled
                  >
                    Sarawak
                  </ButtonMp>
                </div> */}

                <div className="flex flex-row font-montserrat gap-7 items-start justify-between mt-[23px] w-[98%] ">
                  {/* <div className="bg-white-A700_54 border border-gray-300 border-solid flex flex-col gap-[27px] items-center justify-start mb-[241px] mt-1 pb-[35px] w-[28%]"> */}
                  <div className="bg-white-A700_54 border border-gray-300 border-solid flex flex-col gap-[27px] items-center justify-start mb-[241px] mt-1 pb-[35px] w-[28%]">
                    <div className="bg-cyan-700 flex flex-col gap-3.5 items-start justify-center p-[18px] w-full">
                      <TextMp
                        className="mt-1 text-[13px] text-white tracking-[-0.22px]"
                        size="txtMontserratRomanMedium15"
                      >
                        Find Travel Products For Your Storefront
                      </TextMp>
                      {/* Button to trigger the search */}
                      {/* <button onClick={handleSearchButtonClick}>Search</button> */}
                      <Input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        // onChange={e => setSearchText(e.target.value)}
                        onChange={(e) => handleSearchTextChange(e.target.value)}
                        // value={tempSearchText}
                        // onChange={(e) => setTempSearchText(e.target.value)}
                        className="font-medium p-0 placeholder:text-gray-500 text-[12px] text-black text-left tracking-[-0.20px] w-full"
                        wrapClassName="bg-gray-50 border border-cyan-700 border-solid flex mb-3 pl-[7px] pr-[35px] py-1.5 w-[99%]"
                        prefix={
                          <Img
                            className="h-4 mr-2.5 my-auto "
                            src="images/search.svg"
                            alt="search"
                          />
                        }
                      ></Input>
                    </div>
                    <div className="flex flex-col items-center justify-start w-[90%] ">
                      <div className="flex flex-col items-start justify-start w-[96%]">
                        <button
                          className="mb-3 self-end text-[12px] font-blue underline"
                          style={{ color: 'blue', textDecorationColor: 'blue' }}
                          onClick={clearFilters}
                        >
                          Clear Filter
                        </button>
                        <TextMp
                          className="text-base text-black-900 tracking-[-0.24px]"
                          size="txtMontserratRomanSemiBold16"
                        >
                          Popular
                        </TextMp>
                        <List
                          className="flex flex-col gap-1.5 items-center mt-3 w-full"
                          orientation="vertical"
                        >
                          <div className="flex flex-1 flex-row items-start justify-between w-full">
                            <CheckBox
                              className="my-0.5 text-black-900 text-left text-sm tracking-[-0.21px] text:mt-1"
                              // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5 "
                              // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                              // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                              //   }`}
                              inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                }`}
                              // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 cursor-not-allowed opacity-50 bg-gray-300"
                              name="goodforavoiding_One"
                              id="goodforavoiding_One"
                              label="Good for avoiding crowds"
                              // checked={selectedTags.includes("21946")}
                              // onChange={() => handleTagChange("21946")}
                              checked={!searchText && selectedTags.includes('goodforavoidingcrowds')}
                              onChange={() => handleTagChange('goodforavoidingcrowds')}
                              // disabled={searchText !== ''}
                              disabled
                            ></CheckBox>
                            <Img
                              className="h-6 w-6"
                              src="images/img_info.svg"
                              alt="info"
                            />
                          </div>
                          <div className="flex flex-1 flex-row items-start justify-between w-full">
                            <CheckBox
                              className="my-0.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                              // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                              // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                              // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                              //   }`}
                              inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                }`}
                              // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 cursor-not-allowed opacity-50 bg-gray-300"
                              name="takingsafetymea_One"
                              id="takingsafetymea_One"
                              label="Taking safety measures"
                              checked={!searchText && selectedTags.includes("takingsafetymeasures")}
                              onChange={() => handleTagChange("takingsafetymeasures")}
                              // disabled={searchText !== ''}
                              disabled
                            ></CheckBox>
                            <Img
                              className="h-6 w-6"
                              src="images/img_info.svg"
                              alt="info"
                            />
                          </div>
                          <div className="flex flex-1 flex-row items-center justify-between w-full">
                            <CheckBox
                              className="text-black-900 text-left text-sm tracking-[-0.21px]"
                              // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                              // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                              // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                              //   }`}
                              inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                }`}
                              // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 cursor-not-allowed opacity-50 bg-gray-300"
                              name="virtualexperien_One"
                              id="virtualexperien_One"
                              label="Virtual experiences "
                              checked={!searchText && selectedTags.includes("virtualexperiences")}
                              onChange={() => handleTagChange("virtualexperiences")}
                              // disabled={searchText !== ''}
                              disabled
                            ></CheckBox>
                            <Img
                              className="h-6 w-6"
                              src="images/img_info.svg"
                              alt="info"
                            />
                          </div>
                        </List>
                        <CheckBox
                          className="mt-[7px] text-black-900 text-left text-sm tracking-[-0.21px]"
                          // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                          // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                          // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                          //   }`}
                          inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                            }`}
                          // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 cursor-not-allowed opacity-50 bg-gray-300"
                          name="kidfriendly"
                          id="kidfriendly"
                          label="Kid friendly"
                          checked={!searchText && selectedTags.includes("kidfriendly")}
                          onChange={() => handleTagChange("kidfriendly")}
                          // disabled={searchText !== ''}
                          disabled
                        ></CheckBox>
                      </div>
                      <Line className="bg-blue_gray-100 h-px mt-[19px] w-[96%]" />
                      <div className="flex flex-col gap-[11px] items-start justify-start mt-[19px] w-full">
                        <TextMp
                          className="text-base text-black-900 tracking-[-0.24px]"
                          size="txtMontserratRomanSemiBold16"
                        >
                          Price
                        </TextMp>
                        <div className="flex flex-col items-center justify-start w-full">
                          <div className="flex flex-col items-start justify-start w-full">
                            <div className="flex flex-row items-center justify-between w-[82%]">
                              <TextMp
                                className="text-black-900 text-sm"
                                size="txtMontserratRomanRegular14"
                              >
                                MIN
                              </TextMp>
                              <TextMp
                                className="text-black-900 text-sm"
                                size="txtMontserratRomanRegular14"
                              >
                                MAX
                              </TextMp>
                            </div>
                            <div className="flex flex-row items-center justify-evenly mt-[3px] w-full">
                              <div className="flex flex-row items-center justify-evenly w-[71%]">
                                <div className="bg-gray-50 flex flex-row items-center justify-between outline outline-[1px] outline-gray-600 p-1.5 rounded-sm w-[43%]">
                                  <TextMp
                                    className="text-black-900 text-sm"
                                    size="txtMontserratRomanRegular14"
                                  >
                                    {currencySymbols[selectedTargetCurrency]}
                                  </TextMp>
                                  <input
                                    className="text-black-900 text-center text-sm w-[51%] placeholder-gray-300"
                                    size="txtMontserratRomanRegular14"
                                    placeholder="0"
                                    min="0"
                                    value={minPrice}
                                    onChange={e => setMinPrice(e.target.value)}
                                    onClick={clearInputMin}
                                  />
                                </div>
                                <Line className="bg-black h-px my-[15px] w-[54%]" />
                              </div>
                              <div className="bg-gray-50 flex flex-row gap-3.5 items-center justify-start outline outline-[1px] outline-gray-600 p-[5px] rounded-sm w-[32%]">
                                <TextMp
                                  className="text-black-900 text-sm"
                                  size="txtMontserratRomanRegular14"
                                >
                                  {currencySymbols[selectedTargetCurrency]}
                                </TextMp>
                                <input
                                  className="text-black-900 text-center text-sm w-[55%] placeholder-gray-300"
                                  size="txtMontserratRomanRegular14"
                                  placeholder="5900"
                                  min="0"
                                  value={maxPrice}
                                  onChange={e => setMaxPrice(e.target.value)}
                                  onClick={clearInputMax}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Line className="bg-blue_gray-100 h-px mt-[19px] w-[96%]" />
                      <div className="h-[784px] mt-[19px] relative w-[97%]">
                        <div className="absolute flex flex-col gap-4 h-max inset-y-[0] items-start justify-start left-[0] my-auto w-full">
                          <TextMp
                            className="text-base text-black-900 tracking-[-0.24px]"
                            size="txtMontserratRomanSemiBold16"
                          >
                            Duration
                          </TextMp>
                          <div className="h-[718px] relative w-full">
                            <div className="absolute flex flex-col h-full inset-y-[0] items-start justify-start left-[0] my-auto w-[93%]">
                              <CheckBox
                                className="text-black-900 text-left text-sm tracking-[-0.21px]"
                                // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                inputClassName="opacity-50 bg-gray-300 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                name="upto1hour"
                                id="upto1hour"
                                label="Up to 1 hour"
                                value="upTo1"
                                checked={durationFilter === 'upTo1'}
                                onChange={() => {
                                  setDurationFilter(durationFilter === 'upTo1' ? '' : 'upTo1');
                                }}
                                disabled
                              ></CheckBox>
                              <CheckBox
                                className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px]"
                                // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                inputClassName="opacity-50 bg-gray-300 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                name="1to4hours"
                                id="1to4hours"
                                label="1 to 4 hours"
                                value="1To4"
                                checked={durationFilter === '1To4'}
                                onChange={() => {
                                  setDurationFilter(durationFilter === '1To4' ? '' : '1To4');
                                }}
                                disabled
                              ></CheckBox>
                              <CheckBox
                                className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.2px] w-[150px]"
                                // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                inputClassName="opacity-50 bg-gray-300 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                name="4hours1day"
                                id="4hours1day"
                                label="4 hours to 1 day"
                                value="4To1D"
                                checked={durationFilter === '4To1D'}
                                onChange={() => {
                                  setDurationFilter(durationFilter === '4To1D' ? '' : '4To1D')
                                }}
                                disabled
                              ></CheckBox>
                              <CheckBox
                                className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.2px] w-[150px]"
                                // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                inputClassName="opacity-50 bg-gray-300 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                name="1to3days"
                                id="1to3days"
                                label="1 to 3 days"
                                value="1DTo3D"
                                checked={durationFilter === '1DTo3D'}
                                onChange={() => {
                                  setDurationFilter(durationFilter === '1DTo3D' ? '' : '1DTo3D');
                                }}
                                disabled
                              ></CheckBox>
                              <CheckBox
                                className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.2px] w-[150px]"
                                // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                inputClassName="opacity-50 bg-gray-300 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                name="3days"
                                id="3days"
                                label="3+ days"
                                value="3DToP"
                                checked={durationFilter === '3DToP'}
                                onChange={() => {
                                  setDurationFilter(durationFilter === '3DToP' ? '' : '3DToP');
                                }}
                                disabled
                              ></CheckBox>

                              <Line className="bg-blue_gray-100 h-[0.5px] mt-[19px] w-[255px]" />

                              <div className="flex flex-col h-[200px] items-start justify-start mt-[30px] mb-[19px] w-[114px]">
                                <TextMp
                                  className="text-base text-black-900 tracking-[-0.24px]"
                                  size="txtMontserratRomanSemiBold16"
                                >
                                  Hotel Class
                                </TextMp>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="5hotelclass"
                                    id="5hotelclass"
                                    value="5hotelclass"
                                    checked={classFilter === '5hotelclass'}
                                    onChange={() => setClassFilter(classFilter === '5hotelclass' ? '' : '5hotelclass')}
                                  // disabled={true}
                                  />
                                  <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={5}
                                    starCount={5}
                                    size={22}
                                  />
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="4hotelclass"
                                    id="4hotelclass"
                                    value="4hotelclass"
                                    checked={classFilter === '4hotelclass'}
                                    onChange={() => setClassFilter(classFilter === '4hotelclass' ? '' : '4hotelclass')}
                                  // disabled={true}
                                  />
                                  <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={4}
                                    starCount={5}
                                    size={22}
                                  />
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="3hotelclass"
                                    id="3hotelclass"
                                    value="3hotelclass"
                                    checked={classFilter === '3hotelclass'}
                                    onChange={() => setClassFilter(classFilter === '3hotelclass' ? '' : '3hotelclass')}
                                  // disabled={true}
                                  />
                                  <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={3}
                                    starCount={5}
                                    size={22}
                                  />
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="2hotelclass"
                                    id="2hotelclass"
                                    value="2hotelclass"
                                    checked={classFilter === '2hotelclass'}
                                    onChange={() => setClassFilter(classFilter === '2hotelclass' ? '' : '2hotelclass')}
                                  // disabled={true}
                                  />
                                  <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={2}
                                    starCount={5}
                                    size={22}
                                  />
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="1hotelclass"
                                    id="1hotelclass"
                                    value="1hotelclass"
                                    checked={classFilter === '1hotelclass'}
                                    onChange={() => setClassFilter(classFilter === '1hotelclass' ? '' : '1hotelclass')}
                                  // disabled={true}
                                  />
                                  <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={1}
                                    starCount={5}
                                    size={22}
                                  />
                                </div>
                              </div>

                              <Line className="bg-blue_gray-100 h-[0.5px] mt-[19px] w-[255px]" />

                              <div className="flex flex-col h-[200px] items-start justify-start mt-[30px] mb-[19px] w-[114px]">
                                <TextMp
                                  className="text-base text-black-900 tracking-[-0.24px]"
                                  size="txtMontserratRomanSemiBold16"
                                >
                                  Rating
                                </TextMp>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="+0star"
                                    id="+0star"
                                    value="+0star"
                                    label="+0 star(s)"
                                    checked={ratingFilter === '+0star'}
                                    onChange={() => setRatingFilter(ratingFilter === '+0star' ? '' : '+0star')}
                                  // disabled={true}
                                  />
                                  {/* <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={5}
                                    starCount={5}
                                    size={22}
                                  /> */}
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="+6star"
                                    id="+6star"
                                    value="+6star"
                                    label="+6 stars"
                                    checked={ratingFilter === '+6star'}
                                    onChange={() => setRatingFilter(ratingFilter === '+6star' ? '' : '+6star')}
                                  // disabled={true}
                                  />
                                  {/* <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={4}
                                    starCount={5}
                                    size={22}
                                  /> */}
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="+7star"
                                    id="+7star"
                                    value="+7star"
                                    label="+7 stars"
                                    checked={ratingFilter === '+7star'}
                                    onChange={() => setRatingFilter(ratingFilter === '+7star' ? '' : '+7star')}
                                  // disabled={true}
                                  />
                                  {/* <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={3}
                                    starCount={5}
                                    size={22}
                                  /> */}
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="+8star"
                                    id="+8star"
                                    value="+8star"
                                    label="+8 stars"
                                    checked={ratingFilter === '+8star'}
                                    onChange={() => setRatingFilter(ratingFilter === '+8star' ? '' : '+8star')}
                                  // disabled={true}
                                  />
                                  {/* <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={2}
                                    starCount={5}
                                    size={22}
                                  /> */}
                                </div>
                                <div className="flex flex-row">
                                  <CheckBox
                                    className=" mt-3.5 text-black-900 text-left text-sm tracking-[-0.21px]"
                                    // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                    inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                    // inputClassName="h-5 mr-[5px] rounded-sm w-5 cursor-not-allowed opacity-50 bg-gray-300"
                                    // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${epicData.length != 0 ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                    //   }`}
                                    name="+9star"
                                    id="+9star"
                                    value="+9star"
                                    label="+9 stars"
                                    checked={ratingFilter === '+9star'}
                                    onChange={() => setRatingFilter(ratingFilter === '+9star' ? '' : '+9star')}
                                  // disabled={true}
                                  />
                                  {/* <RatingBar
                                    className="flex justify-between w-[108px] mt-[9px]"
                                    value={1}
                                    starCount={5}
                                    size={22}
                                  /> */}
                                </div>
                              </div>

                              {/* <Line className="bg-blue_gray-100 h-[0.5px] mt-[19px] w-[255px]" /> */}

                              {/* <div className="flex flex-col items-start justify-start mt-[35px] w-full">
                                <TextMp
                                  className="text-base text-black-900 tracking-[-0.24px]"
                                  size="txtMontserratRomanSemiBold16"
                                >
                                  Specials
                                </TextMp>
                                <CheckBox
                                  // className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[350px]"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                  //   }`}
                                  inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                    }`}
                                  className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[350px]"
                                  // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  name="freecancellatio_One"
                                  id="freecancellatio_One"
                                  label="Free Cancellation"
                                  checked={!searchText && selectedTags.includes("freecancellation")}
                                  onChange={() => handleTagChange("freecancellation")}
                                  // disabled={searchText !== ''}
                                  disabled
                                ></CheckBox>
                                <CheckBox
                                  // className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[250px]"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                  //   }`}
                                  inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                    }`}
                                  className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[350px]"
                                  // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  name="likelytosellout_One"
                                  id="likelytosellout_One"
                                  label="Likely to Sell Out"
                                  checked={!searchText && selectedTags.includes("likelytosellout")}
                                  onChange={() => handleTagChange("likelytosellout")}
                                  // disabled={searchText !== ''}
                                  disabled
                                ></CheckBox>
                                <CheckBox
                                  // className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[250px]"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                  //   }`}
                                  inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                    }`}
                                  className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[350px]"
                                  // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  name="skiptheline"
                                  id="skiptheline"
                                  label="Skip-The-Line"
                                  checked={!searchText && selectedTags.includes("skiptheline")}
                                  onChange={() => handleTagChange("skiptheline")}
                                  // disabled={searchText !== ''}
                                  disabled
                                ></CheckBox>
                                <CheckBox
                                  // className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px]"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] outline outline-[1px] outline-gray-500_01 rounded-sm w-5"
                                  // // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  // inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'bg-gray-50'
                                  //   }`}
                                  inputClassName={`h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500 ${searchText !== '' ? 'cursor-not-allowed opacity-50 bg-gray-300' : 'opacity-50 bg-gray-300'
                                    }`}
                                  className="mt-[9px] text-black-900 text-left text-sm tracking-[-0.21px] w-[350px]"
                                  // inputClassName="bg-gray-50 h-5 mr-[5px] border-gray-500 rounded-sm w-5 focus:border-gray-500"
                                  name="privatetour"
                                  id="privatetour"
                                  label="Private Tour"
                                  checked={!searchText && selectedTags.includes("privatetour")}
                                  onChange={() => handleTagChange("privatetour")}
                                  // disabled={searchText !== ''}
                                  disabled
                                ></CheckBox>
                              </div> */}

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[21px] items-center justify-start w-[73%]">
                    <div className="flex flex-row items-start justify-start w-full">
                      <TextMp
                        className="text-[13px] text-black-900 w-[20%] mt-1"
                        size="txtMontserratRomanRegular13"
                      >
                        {/* {productsTotal} results */}
                        {hotelData.length} results
                      </TextMp>

                      <Row className=" ml-[0px] text-[13px] justify-end text-black-900 w-[100%]">
                        <Row>
                          <TextMp className="mt-1 ml-[130px] mr-3">
                            {" "}
                            Currency:{" "}
                          </TextMp>
                          <select
                            className="truncate text-[13px] mb-[5px] text-black-900 text-left tracking-[-0.22px] w-[60%] border border:bg-gray-100 py-0"
                            placeholderClassName="text-black-900"
                            value={selectedTargetCurrency}
                            onChange={handleSortCurrency}
                          >
                            <option value="" hidden>
                              {stcValue === "" ? "Select Currency" : stcValue}
                            </option>
                            <option value="USD">United States Dollar - $</option>
                            <option value="AED">United Arab Emirates Dirham - د.إ</option>
                            <option value="ARS">Argentine Peso - $</option>
                            <option value="AUD">Australian Dollar - $</option>
                            <option value="BRL">Brazilian Real - R$</option>
                            <option value="CAD">Canadian Dollar - $</option>
                            <option value="CHF">Swiss Franc - CHF</option>
                            <option value="CLP">Chilean Peso - $</option>
                            <option value="CNY">Chinese Yuan - ¥</option>
                            <option value="COP">Colombian Peso - $</option>
                            <option value="DKK">Danish Krone - kr</option>
                            <option value="EUR">Euro - €</option>
                            <option value="FJD">Fijian Dollar - FJ$</option>
                            <option value="GBP">British Pound Sterling - £</option>
                            <option value="HHL">HHL - HHL</option>
                            <option value="HKD">Hong Kong Dollar - HK$</option>
                            <option value="IDR">Indonesian Rupiah - Rp</option>
                            <option value="INR">Indian Rupee - ₹</option>
                            <option value="ISK">Icelandic Króna - kr</option>
                            <option value="JPY">Japanese Yen - ¥</option>
                            <option value="KRW">South Korean Won - ₩</option>
                            <option value="MXN">Mexican Peso - $</option>
                            <option value="MYR">Malaysian Ringgit - RM</option>
                            <option value="NOK">Norwegian Krone - kr</option>
                            <option value="NZD">New Zealand Dollar - $</option>
                            <option value="PEN">Peruvian Sol - S/</option>
                            <option value="PHP">Philippine Peso - ₱</option>
                            <option value="PLN">Polish Złoty - zł</option>
                            <option value="RUB">Russian Ruble - ₽</option>
                            <option value="SEK">Swedish Krona - kr</option>
                            <option value="SGD">Singapore Dollar - $</option>
                            <option value="THB">Thai Baht - ฿</option>
                            <option value="TRY">Turkish Lira - ₺</option>
                            <option value="TWD">New Taiwan Dollar - NT$</option>
                            <option value="USD">United States Dollar - $</option>
                            <option value="VND">Vietnamese Dong - ₫</option>
                            <option value="ZAR">South African Rand - R</option>
                            {/* <option value="RAR">Review Average Rating</option> */}
                          </select>
                        </Row>
                        <Row>
                          <TextMp className="mt-1 text-right w-[30%] ml-4 mr-3">
                            {" "}
                            Sort By:
                          </TextMp>
                          <select
                            className="truncate border:bg-gray-100 mr-3 text-[13px] mb-[5px] text-black-900 text-left w-[50%] border py-0 "
                            placeholderClassName="text-black-900"
                            onChange={handleSortProduct}
                            value={productSort}
                          >
                            <option value="" hidden>
                              {productSortValue === ""
                                ? "Featured"
                                : `${productSortValue}`}
                            </option>
                            <option value="FTD">Featured</option>
                            <option value="LTH">Price (Low to High)</option>
                            <option value="HTL">Price (High to Low)</option>
                            <option value="STL">Duration (Short to Long)</option>
                            <option value="LTS">Duration (Long to Short)</option>
                            {/* <option value="RAR">Review Average Rating</option> */}
                          </select>
                        </Row>
                      </Row>
                      <Img
                        className="h-[23px] ml-0.5 w-[23px]"
                        src="images/img_info.svg"
                        alt="info"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-start w-full">
                      <List
                        className="flex flex-col gap-[11px] items-center w-full"
                        orientation="vertical"
                      >
                        {!hotelData ? (
                          <p>No products found.</p>
                        ) : hotelData.length === 0 && showSpinner ? (
                          <div className="flex justify-center">
                            <LoadingSpinner />
                          </div>
                        ) : hotelData.length === 0 ? (
                          <p>No products found.</p>
                        ) : (
                          <>
                            <div>
                              {hotelDataDisplay.map((product, index) => (
                                <div
                                  key={product.code}
                                  className="mb-5 bg-gray-50 h-[289px] hover:cursor-pointer flex flex-1 items-center justify-start my-0 rounded-[20px] shadow-lg hover:shadow-bs1 w-full"
                                >
                                  {/* Render the product components using the data from the API */}
                                  <div className="flex flex-row gap-[33px] items-center justify-between w-[100%] pr-[20px]">
                                    <div className="h-[289px] relative w-[37%]">
                                      <ImgWithFallback
                                        className="h-[289px] m-auto object-cover rounded-bl-[20px] rounded-tl-[20px] w-full"
                                        // src="images/img_image29.png"
                                        src={product.image || "/images/no-img.png"}
                                        fallback="/images/no-img.png"
                                      // src={
                                      //   epicDataDisplay[index] &&
                                      //     epicDataDisplay[index].media &&
                                      //     epicDataDisplay[index].media.image &&
                                      //     epicDataDisplay[index].media.image.length > 1
                                      //     ? epicDataDisplay[index].media.image[0].path
                                      //     : epicDataDisplay[index] && epicDataDisplay[index].media && epicDataDisplay[index].media.image
                                      //       ? epicDataDisplay[index].media.image.path
                                      //       : "/images/no_pic.png"
                                      // }
                                      // alt={`image-${index + 1}`}
                                      />
                                      {/* {product.flags.includes(
                                        "LIKELY_TO_SELL_OUT"
                                      ) ?
                                        <div className="absolute flex flex-row inset-x-[0] items-start justify-between mx-auto top-[4%] w-[93%]">
                                          <ButtonMp className="bg-red-800 cursor-pointer font-bold mb-3 w-[141px] py-1 rounded-sm text-center text-[13px] text-white tracking-[-0.21px]">
                                            Likely to Sell Out
                                          </ButtonMp>

                                        </div>
                                        : (<column className="absolute flex flex-row inset-x-[0] items-start justify-between mx-auto top-[4%] w-[93%]"></column>
                                        )} */}
                                      {/* <div className="ml-[270px] absolute flex flex-row inset-x-[0] items-start justify-between mx-auto top-[4%] w-[93%]">

                                        <ButtonMp className="bg-blue_gray-100 bg-opacity-20 flex h-[34px] items-center justify-center p-[7px] rounded-[50%] w-[34px]">
                                          <Img
                                            src="images/img_favorite.svg"
                                            alt="favorite"
                                          />
                                        </ButtonMp>
                                      </div> */}
                                      <div className="absolute flex flex-row items-start mx-auto top-3 right-3">
                                        <button className="bg-white bg-opacity-60 h-7 w-7 rounded-full shadow-xl flex items-center justify-center hover:scale-105"
                                          // onClick={() => handleCopyLink(insertUserIdToLink(product.link))}
                                          onClick={() => handleCopyLink(generateLink(product.link, product.code))}
                                        >
                                          {/* <img src="/images/copy_link.jpg" alt="Image" className="h-4 w-4" title={generateLink(product.link, product.code)} /> */}
                                          <img src="/images/copy_link.jpg" alt="Image" className="h-4 w-4" title='Copy link' />
                                        </button>
                                      </div>
                                    </div>

                                    <div className="flex flex-col items-start justify-start w-[61%] ">
                                      <div className="flex flex-row items-start justify-between py-5 w-full">
                                        <div className="flex flex-col gap-[9px] items-start justify-start 2xl:w-[80%] xl:w-[80%] md:w-[75%] sm:w-[70%] xs:w-[70%] ">
                                          <TextMp
                                            className="ml-0.5 text-black-900 2xl:text-lg xl:text-lg md:text-md sm:text-sm tracking-[-0.30px]"
                                            // className="ml-0.5 text-black-900 text-[20px] tracking-[-0.30px]"
                                            size="txtMontserratRomanBold20"
                                          >
                                            {/* {product.item} {product.option ? "(" + product.option + ")" : ""} */}
                                            {product.name}
                                          </TextMp>
                                          <div className="flex flex-row gap-[7px] items-center justify-start w-[51%]">
                                            <RatingBar
                                              // className="flex justify-between w-[108px]"
                                              className="flex justify-between 2xl:text-md xl:text-md md:text-sm sm:text-xs xs:text-xs"
                                              // value={4}
                                              // value={product.rating ?? 0}
                                              value={product.hotel_class ?? 0}
                                              starCount={5}
                                              size={20}
                                            ></RatingBar>
                                            <TextMp
                                              className="ml-1 bg-cyan-700 rounded-md py-1 px-2 2xl:text-md xl:text-md md:text-sm sm:text-xs xs:text-xs mt-1 text-white tracking-[-0.24px]"
                                              size="txtMontserratRomanRegular16"
                                            >
                                              <span>
                                                {product.rating ?? 0}
                                              </span>
                                            </TextMp>
                                            <TextMp
                                              className="2xl:text-md xl:text-md md:text-sm sm:text-xs xs:text-xs mt-1 text-black-900 tracking-[-0.24px]"
                                              size="txtMontserratRomanRegular16"
                                            >
                                              <span>
                                                {product.total_review ?? 0}
                                              </span>
                                            </TextMp>
                                          </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-start mt-0.5 w-[26%]">
                                          <TextMp
                                            className="text-black-900 2xl:text-md xl:text-md md:text-xs sm:text-[9px] xs:text-[9px] tracking-[0.21px]"
                                            size="txtMontserratRomanRegular14"
                                          >
                                            from
                                          </TextMp>
                                          <TextMp
                                            className="flex flex-row text-cyan-700 2xl:text-lg xl:text-lg md:text-sm sm:text-xs xs:text-xs tracking-[-0.30px]"
                                            size="txtMontserratRomanBold20Cyan700"
                                            style={{ marginTop: "-0.2rem" }}
                                          >
                                            <span>
                                              {selectedTargetCurrency && (
                                                <span>
                                                  {currencySymbols[selectedTargetCurrency]}{" "}
                                                  {(product.price * rate).toFixed(2)}
                                                </span>
                                              )}
                                            </span>
                                          </TextMp>
                                          {/* <Text className="mt-[3px] text-black-900 text-[12px]">
                                          Price varies by group size
                                        </Text> */}
                                        </div>
                                      </div>
                                      <TextMp
                                        className="leading-[21.00px] ml-0.5 text-black-900 2xl:text-sm xl:text-sm md:text-xs sm:text-xs xs:text-xs tracking-[-0.21px] w-[95%] "
                                        size="txtMontserratRomanLight14"
                                      >
                                        <span
                                          className="text-black-900 font-montserrat text-left font-light"
                                        // dangerouslySetInnerHTML={generateHTMLContent(product)}
                                        // dangerouslySetInnerHTML={{
                                        //   __html: replaceHtmlEntitiesWithCharacters(
                                        //     `${typeof product.details.overview === 'string' ?
                                        //       product.details.overview
                                        //       : `${product.item} ${product.option ? "(" + product.option + ")" : ""}`
                                        //     }`
                                        //   ).substring(0, maxLength)
                                        // }}
                                        />

                                        <span>{product.description.substring(0, 150)}...{" "}</span>

                                        <a
                                          // href={`https://izzhnis.rezgo.com/details/${product.com}/${convertToSlug(product.item)}`}
                                          // href={insertUserIdToLink(product.link)}
                                          href={generateLink(product.link, product.code)}
                                          target="_blank"  // This opens the link in a new tab
                                          rel="noopener noreferrer" // This is recommended for security to prevent reverse tabnabbing
                                          className="text-black-900 font-montserrat text-left font-light underline"
                                          style={{ color: 'blue', textDecorationColor: 'blue' }}
                                        >
                                          More
                                        </a>
                                      </TextMp>

                                      <div className=" flex flex-col w-[100%]">
                                        {/* <div className="flex flex-row gap-[7px] items-start justify-start ml-[5px] mt-[10px] w-[100%] ">
                                          <Img
                                            // className="h-[16px] mt-0.5 w-[16px]"
                                            className="mt-0.5 xs:h-3 xs:w-3 sm:h-3 sm:w-3 md:h-3 md:w-3 lg:h-3 lg:w-3 xl:h-4 xl:w-4 2xl:h-4 2xl:w-4"
                                            src="images/img_clockmp.svg"
                                            alt="clock"
                                          />
                                          <TextMp
                                            className="2xl:text-sm xl:text-sm md:text-xs sm:text-xs xs:text-xs text-teal-400 tracking-[-0.21px]"
                                            size="txtMontserratRomanMedium14"
                                          >
                                            <span>{product.duration ? product.duration : 'N/A'}</span>
                                          </TextMp>
                                        </div> */}
                                      </div>

                                      {/* <p>Tags:</p>
                                      <ul>
                                        {product.tags.map((tag, tagIndex) => (
                                          <li key={tagIndex}>{tag}</li>
                                        ))}
                                      </ul> */}

                                      <div className="flex flex-row items-start justify-between py-5 w-full">
                                        <div className="flex flex-col gap-[9px] items-start justify-start ml-[5px] w-[80%]">
                                          <TextMp
                                            className="text-[14px] text-teal-400 tracking-[-0.21px]"
                                            size="txtMontserratRomanMedium14"
                                          >
                                            {/* <span>
                                              {typeof product.tags === 'string' && product.tags.includes("freecancellation") ? (
                                                <>
                                                  <div className="flex flex-row">
                                                    <img
                                                      className="mt-1 xs:h-[9px] sm:h-[9px] md:h-[9px] lg:h-[9px] xl:h-[10px] 2xl:h-[10px] "
                                                      src="images/img_checkmarkmp.svg"
                                                      alt="checkmark"
                                                    />
                                                    <p className="2xl:text-sm xl:text-sm md:text-xs sm:text-xs xs:text-xs text-teal-400 ml-[10px] text-teal-400">
                                                      Free cancellation
                                                    </p>
                                                  </div>
                                                </>
                                              ) : (
                                                <div className="ml-[140px]"></div>
                                              )}
                                            </span> */}
                                          </TextMp>
                                        </div>

                                        {!product.code.startsWith('HOTELSALL') && (
                                          <div className="flex flex-col items-end justify-start mt-0.5">
                                            <div>
                                              {Array.from({
                                                length: numberOfButtons,
                                              }).map((_, index) => (
                                                <ButtonComponents
                                                  key={product.code}
                                                  productCode={product.code}
                                                  productAll={product}
                                                  onTag={handleTag}
                                                  onRemove={() => handleRemove(product.code)} />
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                      </div>


                                      {/* <row className="flex flex-row">
                                        <column className="mt-2 items-start justify-start ml-[7px] w-[100%]">
                                          {product.flags.includes(
                                            "FREE_CANCELLATION"
                                          ) ?
                                            // ||
                                            // product.flags.includes("FREE_RETURN") ? (
                                            <div className=" bg-black-900 flex flex-row">
                                              <img
                                                className="h-[10px] mt-1"
                                                src="images/img_checkmark.svg"
                                                alt="checkmark"
                                              />
                                              <p className="ml-[10px] text-[14px] text-teal-400">
                                                Free cancellation
                                              </p>
                                            </div>
                                            // ) 
                                            : (
                                              <column className=" ml-[125px] mb-5 text-right w-[100%]"></column>
                                            )}
                                        </column>

                                        <column className="ml-[200px] mb-5 text-right">
                                          <div>
                                            {Array.from({
                                              length: numberOfButtons,
                                            }).map((_, index) => (
                                              <ButtonComponents key={index} />
                                            ))}
                                          </div>
                                        </column>
                                      </row> */}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </List>
                    </div>

                  </div>
                </div>

                <span className="self-end mr-7 mt-3 text-[13px]">Page {currentPageDeals} of {Math.ceil(totalPagesDeals)}</span>
                <div className="flex flex-row font-poppins items-start common-pointer justify-center ml-[419px] mt-[46px] w-[40%]">
                  <Img
                    className={`h-[13px] mt-[25px] w-[15px] ${currentPageDeals > 1 ? 'common-pointer' : 'hidden'}`}
                    src="images/img_arrowleftmp.svg"
                    alt="arrowleft"
                    onClick={() => handleArrowClick('left')}
                  />
                  {getPageButtonsRange().map((pageNumber) => (
                    <ButtonMp
                      key={pageNumber}
                      className={`shadow-lg flex h-[57px] common-pointer items-center justify-center ml-5 rounded-full text-center text-shadow-ts text-xl tracking-[-0.30px] w-[57px]
                              ${currentPageDeals === pageNumber ? ' bg-cyan-700 text-white' : 'bg-white text-gray-700'}`}
                      size="txtPoppinsMedium20"
                      onClick={() => setCurrentPageDeals(pageNumber)}
                    >
                      {pageNumber}
                    </ButtonMp>
                  ))}
                  <Img
                    className={`h-[13px] ml-7 mt-[25px] w-5 ${currentPageDeals < totalPagesDeals ? 'common-pointer' : 'hidden'}`}
                    src="images/img_arrowright_gray_700_01.svg"
                    alt="arrowright_One"
                    onClick={() => handleArrowClick('right')}
                  />
                </div>
                {/* <div className="flex flex-row font-poppins items-start common-pointer justify-center ml-[419px] mt-[46px] w-[30%]">
              <Img
                className="h-[13px] mt-[25px] w-[15px]"
                src="images/img_arrowleft.svg"
                alt="arrowleft"
              />
              <Text
                className="bg-cyan-700 shadow-lg flex h-[57px] common-pointer items-center justify-center ml-7 rounded-full text-center text-shadow-ts text-white text-xl tracking-[-0.30px] w-[57px]"
                size="txtPoppinsMedium20"
              >
                1
              </Text>
              <Text
                className="bg-white shadow-lg hover:bg-[#D7EEEB] common-pointer flex h-[57px] items-center justify-center ml-[13px] rounded-full text-center text-gray-700_01 text-shadow-ts text-xl tracking-[-0.30px] w-[57px]"
                size="txtPoppinsMedium20Gray70001"
              >
                2
              </Text>
              <Text
                className="bg-white shadow-lg flex h-[57px] hover:bg-[#D7EEEB] common-pointer items-center justify-center ml-[13px] rounded-full text-center text-gray-700_01 text-shadow-ts text-xl tracking-[-0.30px] w-[57px]"
                size="txtPoppinsMedium20Gray70001"
              >
                3
              </Text>
              <Text
                className="bg-white shadow-lg flex h-[57px] hover:bg-[#D7EEEB] common-pointer items-center justify-center ml-[13px] rounded-full text-center text-gray-700_01 text-shadow-ts text-xl tracking-[-0.30px] w-[57px]"
                size="txtPoppinsMedium20Gray70001"
              >
                4
              </Text>
              <Img
                className="h-[13px] ml-7 mt-[25px] common-pointer w-5"
                src="images/img_arrowright_gray_700_01.svg"
                alt="arrowright_One"
              />
            </div> */}
              </div>
              <div className="h-[274px] w-[90%] mt-20 mx-auto relative">
                <div className="absolute flex flex-row gap-[37px] items-center justify-between left-[0] top-[0] w-[70%]">
                  <div className="bg-teal-300_01 flex flex-col items-center justify-start p-[29px]">
                    <TextMp
                      className="leading-[35.00px] text-[28px] text-white-A700_cc tracking-[-0.48px] w-[96%]"
                      size="txtMontserratRomanBold32"
                    >
                      BE A TRAVEL-ENTREPRENEUR YOURSELF through our 2hr ACADEMY
                      LESSON !
                    </TextMp>
                  </div>
                  <div className="flex flex-col gap-[17px] items-start justify-start w-[50%]">
                    <div className="flex flex-row items-center justify-between w-[78%]">
                      <TextMp
                        className="text-[12px] text-black-900 tracking-[-0.22px]"
                        size="txtMontserratBold15"
                      >
                        Mobile app
                      </TextMp>
                      <TextMp
                        className="text-[13px] text-black-900 tracking-[-0.22px]"
                        size="txtMontserratBold15"
                      >
                        Community
                      </TextMp>
                    </div>
                    <div className="flex flex-row gap-5 items-center justify-between w-full">
                      <TextMp
                        className="leading-[24.00px] text-[12px] text-black-900_cc tracking-[-0.22px]"
                        size="txtMontserratRegular15"
                      >
                        <>
                          Features
                          <br />
                          Live share
                          <br />
                          Video record
                        </>
                      </TextMp>
                      <TextMp
                        className="leading-[24.00px] text-[12px] text-black-900_cc tracking-[-0.22px]"
                        size="txtMontserratRegular15"
                      >
                        <>
                          Featured experience
                          <br />
                          Share with friends
                          <br />
                          Live feeds
                        </>
                      </TextMp>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-[0] flex flex-col gap-8 inset-x-[0] items-center justify-start mx-auto w-[99%]">
                  <Line className="bg-blue_gray-100 h-px w-full" />
                  <div className="flex flex-row items-center justify-start w-full">
                    <TextMp
                      className="text-[12px] text-black-900_cc tracking-[-0.22px] w-[100%]"
                      size="txtMontserratRegular15"
                    >
                      © HalalHolidays. 2023. We don’t just plan tours, we plan
                      adventures.
                    </TextMp>
                    <TextMp
                      className="ml-[650px] text-[12px] text-black-900_cc text-right tracking-[-0.22px] w-[15%]"
                      size="txtMontserratRegular15"
                    >
                      Follow us:
                    </TextMp>
                    <Img
                      className="h-11 ml-5 w-11"
                      src="images/img_contrast.svg"
                      alt="contrast"
                    />
                    <Img
                      className="h-11 ml-[21px] w-11"
                      src="images/img_contrast.svg"
                      alt="contrast_One"
                    />
                    <Img
                      className="h-11 ml-5 w-11"
                      src="images/img_contrast.svg"
                      alt="contrast_Two"
                    />
                    <Img
                      className="h-11 ml-5 w-11"
                      src="images/img_contrast.svg"
                      alt="contrast_Three"
                    />
                  </div>
                </div>
                <div className="absolute h-[138px] right-[0] top-[9%] w-[26%]">
                  <TextMp
                    className="mt-[3px] text-[13px] text-black-900 tracking-[-0.22px]"
                    size="txtMontserratBold15"
                  >
                    Company
                  </TextMp>
                  <div className="absolute h-[138px] inset-[0] justify-center m-auto w-full">
                    <TextMp
                      className="absolute bottom-[19%] leading-[24.00px] left-[0] text-[12px] text-black-900_cc tracking-[-0.22px]"
                      size="txtMontserratRegular15"
                    >
                      <>
                        About us
                        <br />
                        Contact us
                        <br />
                        History
                      </>
                    </TextMp>
                    <Img
                      className="absolute h-[138px] inset-y-[0] my-auto object-cover right-[0] w-[72%]"
                      src="images/img_getitonplay.png"
                      alt="getitonplay"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>





      </div>
    </>
  );
};

export default TourMarketplacePage5;

