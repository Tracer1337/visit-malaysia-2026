import { Row } from "components/Row/index";
import { IoAdd } from "react-icons/io5";
import AddtoContentNew from "components/Addto/AddtoContentNew/index";
import { useAuth } from "AuthContext";
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { mdiTaxi, mdiAirplane, mdiBus, mdiTrain, mdiHeartOutline, mdiHeart } from '@mdi/js';
import Icon from '@mdi/react';


const AddtoBtn2 = ({openPopup33, openPopup44, activityId, setActivityId, openPopup1}) => {
  const { isLoggedIn } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClick = () => {
    if (isLoggedIn) {
      
      // User is logged in, perform the current activity
      console.log("Button clicked with activityId:", activityId);
      setActivityId(activityId);
      openPopup44();
    } else {
      // User is not logged in, show the login popup
      openPopup1();

    }
  };
  
  return (
    <>
      
      <div 
      className="mt-1 common-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <Icon
       path={isHovered ? mdiHeart : mdiHeartOutline} // Toggle between filled and outline icon
       size={0.8}
       color={isHovered ? 'red' : 'black'} // Change color on hover
      />
      {isHovered && (
        <span style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          color: 'black',
          padding: '5px',
          borderRadius: '4px',
          fontSize: '0.8rem',
          marginTop: '5px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          width: '250px', // Set a fixed width for the tooltip
          textAlign: 'center', // Center-align the text
          whiteSpace: 'nowrap', // Prevent text wrapping
          overflow: 'hidden', // Hide any overflow
          textOverflow: 'ellipsis'
        }}>
          Click to Saved Activity to Another Itinerary
        </span>
      )}
    </div>   
    </>
  );
};

export default AddtoBtn2;
