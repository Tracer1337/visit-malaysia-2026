import React, { useState } from 'react';
import './app.css';
import {
    FaBars,
    FaUserGear,
}from "react-icons/fa";
import {  GiHouse } from "react-icons/gi";
import { BsHouseAddFill } from 'react-icons/bs';
import {AiFillSchedule } from 'react-icons/ai';
import { TbBrandBooking } from 'react-icons/tb'
import { MdFlightLand, MdFlightTakeoff, MdManageAccounts } from 'react-icons/md';
import { NavLink } from 'react-router-dom';


const SidebarFlight = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/manage-user",
            name:"Itinerary",
            icon:<AiFillSchedule/>
        },
        {
            path:"/manage-role",
            name:"Departure",
            icon:<MdFlightTakeoff/>
        },
        {
          path:"/manage-role",
          name:"Return Flight",
          icon:< MdFlightLand/>
      },

    ]
    return (
        <div className="container font-montserrat">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo font-bold text-lg">Marketplace</h1> */}
                   <div style={{marginLeft: isOpen ? "140px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text font-medium text-sm">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default SidebarFlight;