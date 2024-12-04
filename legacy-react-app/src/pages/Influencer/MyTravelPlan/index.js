import React, { useState, useEffect } from "react";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import ForgotPassword from "components/ForgotPass/index";
import { Column, Row, Text, Button, Img } from "components";
import HeaderOTAMobile from "components/Header/HeaderOTAMobile/index";
import SavedContent from "components/myTravelPlan/savedContent/index";
import BlogSavedContent from "components/myTravelPlan/blogSavedContent/index";
import PrivateContent from "components/myTravelPlan/privateContent/index";
import PublishContent from "components/myTravelPlan/publishContent/index";
import { FaTimes } from 'react-icons/fa';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import CreateYourOwn from 'components/CreateYourOwn/index';
import ShowAI from "components/ShowAI/index";
import { useAuth } from "AuthContext";

const MyTravelPlan = () => {
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isPopup2Open, setIsPopup2Open] = useState(false);
  const [isPopup3Open, setIsPopup3Open] = useState(false);
  const { isLoggedIn } = useAuth();
  // const { setIsLoggedIn } = useAuth();
  //   Filter Type blog/photos/etc

  // setIsLoggedIn(true);
  const openPopup1 = () => {
    setIsPopup1Open(true);
    setIsPopup2Open(false); // Close Popup2 when Popup1 is opened
  };

  const openPopup2 = () => {
    setIsPopup2Open(true);
    setIsPopup1Open(false); // Close Popup1 when Popup2 is opened
  };
  const openPopup3 = () => {
    setIsPopup3Open(true);
    setIsPopup1Open(false); // Close Popup1 when Popup3 is opened
  };

  const closePopup1 = () => {
    setIsPopup1Open(false);
  };

  const closePopup2 = () => {
    setIsPopup2Open(false);
  };
  const closePopup3 = () => {
    setIsPopup3Open(false);
  };

  const [selectedButton, setSelectedButton] = useState("Created by me");
  const [isCreatedByMeSelected, setIsCreatedByMeSelected] = useState(false);
  const [showPrivateContent, setShowPrivateContent] = useState(true);
  const [showTPBookmark, setShowTPBookmark] = useState(true);
  const [showBlogBookmark, setShowBlogBookmark] = useState(false);
  const [showPublishContent, setShowPublishContent] = useState(false);

  // State variables to track button click status
  const [privateButtonClicked, setPrivateButtonClicked] = useState(true);
  const [publishButtonClicked, setPublishButtonClicked] = useState(false);
  const [createTPButtonClicked, setCreateTPButtonClicked] = useState(false);
  const [TPBookmarkButtonClicked, setTPBookmarkButtonClicked] = useState(true);
  const [BlogBookmarkButtonClicked, setBlogBookmarkButtonClicked] = useState(false);

  const [showModalItinerary, setshowModalItinerary] = React.useState(false);
  const [isShowContentSetting, setIsShowContentSetting] = React.useState(false);
  const [isShowAI, setIsShowAI] = useState(false);

  // Function to handle button clicks and update the selected button
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);

    if (buttonName === "Created by me") {
      setPrivateButtonClicked(true);
      setPublishButtonClicked(false);
      setShowPrivateContent(true);
      setShowPublishContent(false);

      setTPBookmarkButtonClicked(false);
      setBlogBookmarkButtonClicked(false);
      setShowTPBookmark(false);
      setShowBlogBookmark(false);
    } else if (buttonName === "Bookmark") {
      setPrivateButtonClicked(true);
      setPublishButtonClicked(true);
      setShowPrivateContent(false);
      setShowPublishContent(false);

      setTPBookmarkButtonClicked(true);
      setBlogBookmarkButtonClicked(false);
      setShowTPBookmark(true);
      setShowBlogBookmark(false);
    } else {

    }
  };

  // Function to handle clicking the Private button
  const handlePrivateClick = () => {
    setPrivateButtonClicked(true);
    setPublishButtonClicked(false);
    setCreateTPButtonClicked(false);
    setShowPrivateContent(true);
    setShowPublishContent(false);
  };

  // Function to handle clicking the Publish Travel Plan button
  const handlePublishClick = () => {
    setPrivateButtonClicked(false);
    setPublishButtonClicked(true);
    setCreateTPButtonClicked(false);
    setShowPrivateContent(false);
    setShowPublishContent(true);
  };

  // Function to handle clicking the Create Travel Plan button
  const handleCreateTPClick = () => {
    setCreateTPButtonClicked(true);
    setshowModalItinerary(true);
  };

  const handleBookmarkTPClick = () => {
    setTPBookmarkButtonClicked(true);
    setBlogBookmarkButtonClicked(false);
    setShowTPBookmark(true);
    setShowBlogBookmark(false);
  };

  const handleBookmarkBlogClick = () => {
    setTPBookmarkButtonClicked(false);
    setBlogBookmarkButtonClicked(true);
    setShowTPBookmark(false);
    setShowBlogBookmark(true);
  };


  const closeContentSetting = () => {
    setIsShowContentSetting(false);
    setCreateTPButtonClicked(false);
  }

  const backContentSetting = () => {
    setIsShowContentSetting(false);
    setshowModalItinerary(true);
  }

  const backShowAI = () => {
    setIsShowAI(false);
    setshowModalItinerary(true);
  }

  const closeShowAI = () => {
    setIsShowAI(false);
    setCreateTPButtonClicked(false);
  };


  // * Navigation *
  function handleNavigate() {
    if (isLoggedIn) {
      // navigate("/ota2");
      setshowModalItinerary(false);
      setIsShowContentSetting(true);
    } else {
      setshowModalItinerary(false);
      setIsPopup1Open(true);
    }
  }


  return (
    <div className="bg-[#F5F5F5] flex flex-col font-montserrat h-[1000px]">
      <div className='fixed w-full' style={{ zIndex: 2 }}>
        <HeaderOTAAdmin
          openPopup1={openPopup1}
          className="fixed invisible lg:visible"
        />
        <LoginPage
          isOpen={isPopup1Open}
          openPopup2={openPopup2}
          openPopup3={openPopup3}
          closePopup1={closePopup1}
        />
        <SignupPage
          isOpen={isPopup2Open}
          closePopup2={closePopup2}
          openPopup1={openPopup1}
        />
        <ForgotPassword isOpen={isPopup3Open} closePopup3={closePopup3} />
        <HeaderOTAMobile
          openPopup1={openPopup1}
          className="visible fixed overflow-hidden lg:invisible lg:hidden"
        />
      </div>
      <Row className="bg-[#F5F5F5] xs:pt-[160px] lg:pt-[92px] flex items-center">
        <div className="ml-[40px] mr-[40px] mt-8">
          <p className="font-montserrat text-[#008D36] lg:text-[20px] sm:text-[35px] font-semibold">
            My Travel Plan
          </p>
        </div>
        <div className="sm:w-[100%] lg:w-[50%] mt-8 space-x-2 bg-[#F5F5F5]">
          <button
            className={`lg:w-[20%] md:w-[40%] md:ml-4 lg:ml-0 rounded-t-lg bg-white h-8 rounded-t-lg bg-white sm:text-[28px] lg:text-sm sm:h-14 lg:h-8 ${selectedButton === "Created by me"
              ? "bg-teal-500 text-white"
              : "bg-white text-teal-500"
              }`}
            onClick={() => handleButtonClick("Created by me")}
          >
            Created by me
          </button>

          <button
            className={`sm:w-[30%] lg:w-[15%] rounded-t-lg bg-white sm:text-[28px] lg:text-sm sm:h-14 lg:h-8 ${selectedButton === "Bookmark"
              ? "bg-teal-500 text-white"
              : "bg-white text-teal-500"
              }`}
            onClick={() => handleButtonClick("Bookmark")}
          >
            Bookmark
          </button>
        </div>
      </Row>

      <hr></hr>

      {/* To display hidden button */}
      <div className="mt-4 bg-[#F5F5F5]">
        {/* {selectedButton === "All" && (
          <>
       <AllContent/>
    
       </>
        )} */}
        {selectedButton === "Created by me" && (
          <div>
            <div className="space-x-3">
              <button
                className={`ml-[40px] sm:w-[20%] lg:w-[10%] shadow-sm rounded-lg sm:h-14 lg:h-8 sm:text-[28px] lg:text-sm ${privateButtonClicked
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
                  }`}
                onClick={handlePrivateClick}
              >
                Private
              </button>
              <button
                className={`sm:w-[20%] lg:w-[10%] shadow-sm rounded-lg sm:h-14 lg:h-8 sm:text-[28px] lg:text-sm ${publishButtonClicked
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
                  }`}
                onClick={handlePublishClick}
              >
                Published
              </button>
              <button
                className={`px-4 shadow-sm rounded-lg sm:h-14 lg:h-8 sm:text-[28px] lg:text-sm ${createTPButtonClicked
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
                  }`}
                onClick={handleCreateTPClick}
              >
                + Create Travel Plan
              </button>

              {showPrivateContent && (
                <PrivateContent />
              )}
              {showPublishContent &&
                <PublishContent />}

            </div>

            {showModalItinerary ? (
              <>
                <div className="fixed bg-gray-50 xs:top-[10vh] lg:top-0 rounded-3xl cursor-pointer text-center justify-center shadow-3xl items-center lg:mx-[400px] lg:my-[50px] flex-nowrap overflow-x-hidden overflow-y-auto scrollbar-hide inset-0 z-50 outline-none focus:outline-none" >
                  {/*Content*/}

                  <Column className="sm:w-[100%] sm:h-[100%] lg:w-[100%] lg:h-fit">
                    <Row className="text-end items-end justify-end">
                      <FaTimes
                        className="mr-4 mt-6 sm:h-10 sm:w-10 lg:h-5 lg:w-5 text-black common-pointer"
                        onClick={() => {
                          setshowModalItinerary(false);
                          setCreateTPButtonClicked(false);
                        }
                        }
                      />
                    </Row>
                    <Row className="w-[100%] items-start justify-start ">
                      <Text className="text-start py-[70px] pl-[130px] sm:text-[37px] lg:text-xl text-black font-light">
                        Create Travel Plan
                      </Text>
                    </Row>
                    <p className="py-1 px-4 text-center">
                      <button
                        className="sm:w-[600px] lg:w-[300px] hover:bg-[#4eb6b1f8] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                        onClick={() => {
                          setIsShowAI(true);
                          setshowModalItinerary(false);
                        }
                        }
                      >
                        <div>Generate with AI</div>
                        <div className="items-end justify-between text-end ">
                          <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                        </div>
                      </button>
                    </p>
                    <p className="px-4 text-center py-1">
                      <button className="sm:w-[600px] lg:w-[300px] hover:bg-[#4eb6b1f8] inline-flex gap-1 items-center justify-between sm:text-[28px] lg:text-xs border border-[#00A19A] bg-[#00A19A] text-white rounded-lg px-3 py-3"
                        onClick={handleNavigate}>
                        Create on your own
                        <AiOutlineDoubleRight className="sm:w-10 sm:h-10 lg:w-5 lg:h-5" />
                      </button>
                    </p>
                  </Column>
                </div>

                <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}

            <CreateYourOwn
              showCreateYourOwn={isShowContentSetting}
              closeCreateYourOwn={closeContentSetting}
              backCreateYourOwn={backContentSetting}
            />

            {isShowAI && <ShowAI openPopup1={openPopup1} closePopup1={closePopup1} closeShowAI={closeShowAI} showAI={isShowAI} backShowAI={backShowAI} />}

          </div>
        )}
        {selectedButton === "Bookmark" && (
          <div>
            <div className="space-x-3">
              <button
                className={`ml-[40px] sm:w-[20%] lg:w-[10%] rounded-lg sm:h-14 lg:h-8 sm:text-[28px] lg:text-sm ${TPBookmarkButtonClicked
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
                  }`}
                onClick={handleBookmarkTPClick}
              >
                Travel Plan
              </button>
              <button
                className={`sm:w-[20%] lg:w-[10%] rounded-lg sm:h-14 lg:h-8 sm:text-[28px] lg:text-sm ${BlogBookmarkButtonClicked
                  ? "bg-teal-500 text-white"
                  : "bg-white text-teal-500"
                  }`}
                onClick={handleBookmarkBlogClick}
              >
                Blog
              </button>

              {showTPBookmark && (
                <SavedContent />
              )}
              {showBlogBookmark &&
                <BlogSavedContent />}
            </div>
          </div>

          // <SavedContent />
        )}
      </div>

    </div>
  );
};

export default MyTravelPlan;
