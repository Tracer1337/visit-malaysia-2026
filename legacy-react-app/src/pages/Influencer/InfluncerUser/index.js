import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import HeaderOTA from 'components/Header/HeaderOTA/index';
import { ImFacebook2 } from 'react-icons/im';
import { FaTwitterSquare, FaInstagram, FaTiktok } from 'react-icons/fa';
import { TfiYoutube } from 'react-icons/tfi';
import { IoShare } from 'react-icons/io5';
import App from 'pages/Influencer/App/index';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import LinkBtn2 from 'components/linkBtn2/index';
import { useAuth } from "AuthContext";
import axios from 'axios';
import { Line } from 'components/Line/index';

import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import AppBlank from '../AppBlank/index';
import { useParams } from 'react-router-dom';
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import Cookies from 'js-cookie';

const InfluencerUser = () => {
  const navigate = useNavigate();
  const [openTab, setOpenTab] = React.useState(1);
  const { setIsLoggedIn } = useAuth();

  const [headerImage, setHeaderImagePath] = useState('');
  const [profileImage, setProfileImagePath] = useState('');
  const [userName, setUsername] = useState('');
  const [instagram, setInstagram] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState("");
  const [commissionUserId,setCommissionUserId] = useState("");

  const defaultHeaderImageUrl = 'images/default_header.jpg';
  const defaultProfileImageUrl = 'images/default_profile.jpg';

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

  const changeHandler = e => {
    const getshow = e.target.value;
    setIsVisible(getshow);
  }

  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const userId = localStorage.getItem("userId");
  let { id } = useParams();

  useEffect(() => {
    
    console.log('user: ',id)    

    axios.get(`https://halaltravel.ai/ht/api/profile/${id}`)
      .then(response => {

        const data = response.data;
        const headerImage = data.headerImage;
        const profileImage = data.profileImage;
        const userName = data.userName;
        const bio = data.bio;
        const instagram = data.instagram;
        const tiktok = data.tiktok;
        const facebook = data.facebook;
        const twitter = data.twitter;
        const youtube = data.youtube;
      
        setCommissionUserId(data.commissionUserId);
        try {
          // Attempt to set the cookie with a 30-day expiration
          Cookies.set('commissionUserId', data.commissionUserId, { expires: 30 });
          console.log('Cookie set successfully');
        } catch (error) {
          // Handle any error that occurs during setting the cookie
          console.error('Failed to set cookie:', error);
        }

        setHeaderImagePath(headerImage);
        setProfileImagePath(profileImage);
        setUsername(userName);
        setBio(bio);
        setInstagram(instagram);
        setTiktok(tiktok);
        setFacebook(facebook);
        setTwitter(twitter);
        setYoutube(youtube);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        
        console.error('Error fetching profile data:', error);
      });
  }, [userId, id]);

  const navigateToSocialAccount = (url) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleEditProfileClick = () => {
    navigate('/edit-creator');
  };

  // setIsLoggedIn(true); 

  return (
    <div className='bg-[#E9EDED] flex flex-col font-montserrat mx-auto w-full '>
      <div className='fixed w-full' style={{ zIndex: 2 }}>
        <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
        <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} c_id={commissionUserId}/>
        <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} c_id={commissionUserId} />
        <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
      </div>
      <div className='w-full px-32 xs:px-0 lg:px-20 xs:pt-[160px] lg:pt-[92px]' style={{ zIndex: 1 }}>
        {headerImage ? (
          <img
            src={`${headerImage}`}
            className='object-cover h-10  lg:w-[1822px] xs:w-[1822px] lg:h-[320px] xs:h-[550px]'
            alt="Header"
          />
        ) : (
          <div>
            <img
              src={defaultHeaderImageUrl}
              className='object-cover h-10  lg:w-[1822px] xs:w-[1822px] lg:h-[320px] xs:h-[550px]'
              alt="Default Header"
            />
            <Line className='w-[100%] bg-black absolute' />
            <hr />
          </div>

        )}
        <div className='bg-white h-fit rounded-b-lg p-2 px-6'>
          <div className='image-container px-4 absolute xs:top-[360px] xs:left-[] sm:top-[400px] sm:left-[30px] lg:top-[291px] lg:left-[90px]'>
            {profileImage ? (
              <img
                src={`${profileImage}`}
                alt="Profile"
                height='300px' width='300px'
                style={{
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire container
                }}
                className='rounded-full lg:items-start z-10 drop-shadow-lg lg:w-[250px] xs:w-[600px] lg:h-[250px] xs:h-[600px] xs:items-center xs:ml-[140px] lg:ml-0' />
            ) : (
              <img
                src={defaultProfileImageUrl}
                alt="Profile"
                height='300px' width='300px'
                style={{
                   // Set the height to 200 pixels
                  objectFit: 'cover', // Maintain aspect ratio and cover the entire container
                }}
                className='rounded-full lg:items-start z-10 drop-shadow-lg lg:w-[250px] xs:w-[600px] lg:h-[250px] xs:h-[600px] xs:items-center xs:ml-[140px] lg:ml-0' />
            )}
          </div>
          <div className='profile-description lg:pl-[300px] lg:text-left xs:text-center lg:pr-[45px] xs:px-6 py-2 w-[100%] text-gray-800 lg:mt-0 xs:mt-[240px]'>
            <p className='font-bold lg:text-[20px] xs:text-[70px] text-gray lg:mt-0 xs:mt-8'>
              {userName ? userName : 'username'}</p>
            <p className='font-[450] lg:text-[14px] xs:text-[45px] text-justify xs:mt-5 lg:mt-2'>
              {bio ? bio : 'Tell your audience about yourself'}

            </p>
            <div style={{ marginBottom: '60px' }}></div>
            <div className='mt-4 social-media justify-between flex py-2 w-[100%]'>
              <div className='flex space-x-2 xs:mb-8 lg:mb-0'>
                {instagram && (
                  <button
                    // className='bg-[#00A19A] text-white font-medium px-5 py-1 rounded-lg text-[10px] items-center'
                    onClick={() => navigateToSocialAccount(instagram)}
                  >
                    <FaInstagram className="text-[#00A19A] lg:h-[26px] lg:w-[26px] xs:h-[55px] xs:w-[55px]" />

                  </button>
                )}

                {tiktok && (
                  <button
                    // className='bg-[#00A19A] text-white font-medium px-5 py-1 rounded-lg text-[10px] items-center'
                    onClick={() => navigateToSocialAccount(tiktok)}
                  >
                    <FaTiktok className="text-[#00A19A] lg:h-[26px] lg:w-[26px] xs:h-[55px] xs:w-[55px]" />

                  </button>
                )}

                {twitter && (
                  <button
                    // className='bg-[#00A19A] text-black font-medium px-5 py-1 rounded-lg text-[10px] items-center'
                    onClick={() => navigateToSocialAccount(twitter)}
                  >
                    <FaTwitterSquare className="text-[#00A19A] lg:h-[26px] lg:w-[26px] xs:h-[55px] xs:w-[55px]" />
                  </button>
                )}

                {facebook && (
                  <button
                    // className='bg-[#00A19A] text-white font-medium px-5 py-1 rounded-lg text-[10px] items-center'
                    onClick={() => navigateToSocialAccount(facebook)}
                  >
                    <ImFacebook2 className="text-[#00A19A] lg:h-[26px] lg:w-[26px] xs:h-[55px] xs:w-[55px]" />

                  </button>
                )}

                {youtube && (
                  <button
                    // className='bg-[#00A19A] text-white font-medium px-5 py-1 rounded-lg text-[10px] items-center'
                    onClick={() => navigateToSocialAccount(youtube)}
                  >
                    <TfiYoutube className="text-[#00A19A] lg:h-[26px] lg:w-[26px] xs:h-[55px] xs:w-[55px]" />

                  </button>
                )}
              </div>

              <div className='space-x-2 flex items-center xs:mb-8 lg:mb-0'>
                {/* <button className='bg-[#00A19A] text-white font-medium lg:px-4 lg:py-1.5 xs:px-7 xs:py-3 lg:rounded-lg xs:rounded-xl xs:text-[35px] lg:text-[12px]'
                  onClick={handleEditProfileClick}
                >Edit Profile</button> */}
                <LinkBtn2  id={id} className="text-[#00A19A]" />
              </div>

            </div>
          </div>

        </div>

        <div className='bg-white mt-3 w-full h-fit rounded-lg max-w-[1640px] m-auto'>
          <AppBlank id={id}/>
        </div>

      </div>
    </div>

  )
}

export default InfluencerUser;