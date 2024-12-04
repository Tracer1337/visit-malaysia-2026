
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { FcGoogle } from 'react-icons/fc';
import { useAuth } from "AuthContext";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';


const GoogleLoginComponent = ({ closePopup1, c_id }) => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();


  const onSuccess = async (response) => {
    console.log('Login Success:', response);


    try {
      // Step 1: Check if the user exists
      const checkUserResponse = await fetch(`https://halaltravel.ai/ht/api/auth/checkUser?idToken=${response.credential}`);

      if (!checkUserResponse.ok) {
        throw new Error(`CheckUser API responded with ${checkUserResponse.status}: ${checkUserResponse.statusText}`);
      }

      const userExists = await checkUserResponse.json();

      if (!userExists) {
        console.log('User does not exist, skipping socialLogin API call.');
        const cookieValue = Cookies.get('commissionUserId');
console.log("commissionUserId",cookieValue);

       // navigate("/page-referrals");
        navigate("/page-referrals", { state: { credential: response.credential, c_id:cookieValue } });

        return; // Exit the function if the user does not exist
      }
      
      console.log("User exists:", userExists);

      // Step 2: If user exists, call the socialLogin API
      const res = await fetch('https://halaltravel.ai/ht/api/auth/socialLogin/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken: response.credential,  // Forward the credential (JWT token) to your backend
          referral_id: ''  // Optional referral ID
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Received JWT Token", data);
      const { type, token, userId } = data;
      localStorage.setItem("tokenType", type);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setIsLoggedIn(true);
      closePopup1();
      navigate("/");

      // Optionally, store the JWT token in localStorage
      // localStorage.setItem('JWT', data.jwt);
    } catch (error) {
      console.error('Error during login process:', error);
      alert('Login failed. This user already exists with this email, please log in instead of signing up with Google again.');

    }
  };

  const onError = () => {
    console.log('Login Failed');
    alert('Login failed. This user already exists with this email, please log in instead of signing up with Google again.');

  };

  return (
    <GoogleOAuthProvider clientId="496040661388-l29iav9mh3itt4bi3ipdvk5p5hpihqig.apps.googleusercontent.com">
      <div>
        <h1>Sign in with Google</h1>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
