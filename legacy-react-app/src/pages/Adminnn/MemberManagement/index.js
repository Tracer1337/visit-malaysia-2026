import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import HeaderAdmin from 'components/Header/HeaderAdmin/index';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import './App.css';
import { MdOutlineRocket, MdWarning } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { BsFillTrash3Fill } from "react-icons/bs";
import { MemberData } from "./data";
import HeaderAdminMobile from "components/Header/HeaderAdminMobile/index";
import LoadingSpinner from 'components/LoadingSpinner/index';
import { FiMenu } from 'react-icons/fi';
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import ForgotPassword from "components/ForgotPass/index";
import axios from '../../../../node_modules/axios/index';
import { useHistory } from 'react-router-dom';
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhoneInput } from "react-international-phone";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { BsPersonFillLock, BsFileEarmarkLock2Fill } from "react-icons/bs";


const MemberManagementPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("tokenType");
    // const userId = localStorage.getItem("userId");
    const userId = parseInt(localStorage.getItem('userId'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasAccess, setHasAccess] = useState(false); // Track if the user has access
    const allowedUserIds = [9, 7, 43]; // List of allowed user IDs

    useEffect(() => {
        if (token && userId) {
            setIsAuthenticated(true);
            // Check if the user's ID is in the allowed list
            if (allowedUserIds.includes(userId)) {
                setHasAccess(true);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [userId]);


    const [isPopup1Open, setIsPopup1Open] = useState(false);
    const [isPopup2Open, setIsPopup2Open] = useState(false);
    const [isPopup3Open, setIsPopup3Open] = useState(false);

    const openPopup1 = () => {
        setIsPopup1Open(true);
    };

    const openPopup2 = () => {
        setIsPopup2Open(true);
    };

    const openPopup3 = () => {
        setIsPopup3Open(true);
        setIsPopup1Open(false);
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

    const [userProfile, setUserProfile] = useState('');
    const [isEditOpen, setIsEditOpen] = useState(false);

    const openEdit = (data) => {
        // setUserProfile(data); // Set the selected member data only once
        // console.log("ProfileUser1: ", data);

        // Destructure and select only the properties you want from data
        const userProfileData = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            userName: data.userName,
            // countryCallingCode: data.countryCallingCode,
            // phoneNumber: data.phoneNumber,
            phoneNumber: {
                countryCode: data.countryCallingCode?.callingCode || null, // Use the calling code if available, otherwise an empty string
                phoneNumber: data.phoneNumber // Use the existing phone number
            },
            dtOfBirth: data.dtOfBirth,
            gender: data.gender,
            status: data.status,
            role: data.role
        };

        setUserProfile(userProfileData);

        console.log("ProfileUser: ", userProfileData); // Log only the selected fields
        setIsEditOpen(true); // Open the popup
    };

    const closeEdit = () => {
        setIsEditOpen(false); // Close the popup
        setUserProfile(null); // Clear the selected member data
    };

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [deleteUser, setDeleteUser] = useState(null);

    const openDelete = (id) => {
        setIsDeleteOpen(true);
        setDeleteUser(id);
        console.log("userIdDelete: ", id);
    };

    const closeDelete = () => {
        setIsDeleteOpen(false);
        setDeleteUser(null);
    };

    console.log("DeleteUser: ", deleteUser);

    const [memberList, setMemberList] = useState('');
    const [pageSize, setPageSize] = useState('10');
    const [totalElements, setTotalElements] = useState('');
    const [totalPages, setTotalPages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState(''); // For search input
    const [loading, setLoading] = useState(false); // For loading indicator
    const [loadingUpdate, setLoadingUpdate] = useState(false); // For loading indicator
    const [error, setError] = useState(null); // For error handling
    const [searchClicked, setSearchClicked] = useState(false); // To track if the search button was clicked


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const fetchMemberList = async (searchQuery, currentPage) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://halaltravel.ai/ht/api/admin/users/list?search=${searchQuery}&pageSize=${pageSize}&pageNumber=${currentPage}`); // Construct the API URL with the search query
            if (!response.ok) {
                throw new Error('Failed to fetch data'); // Throw error if response is not OK
            }
            const data = await response.json();
            setMemberList(data.elements || []);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
            setCurrentPage(data.pageNumber);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching member profile:', error);
        } finally {
            setLoading(false); // Stop loading after fetching
        }
    };

    // FETCH DATA (1)
    // Fetch data when the component mounts and when the search query changes
    // useEffect(() => {
    //     if (searchQuery !== '') {
    //         fetchMemberList(searchQuery); // Fetch data only if search query is not empty
    //     }
    // }, [searchQuery]); 

    useEffect(() => {
        fetchMemberList(searchQuery, 1); // This will fetch all members initially
        console.log("Member List: ", memberList);
    }, [searchQuery]);

    // FETCH DATA (2)
    const handleSearch = () => {
        setSearchClicked(true); // Indicate that the search button has been clicked
        fetchMemberList(searchQuery); // Trigger the API request to fetch data
        console.log("Member List: ", memberList);
    };

    useEffect(() => {
        fetchMemberList(searchQuery, currentPage);
        console.log("Member List: ", memberList);
    }, [currentPage]);

    const goToFirstPage = () => setCurrentPage(1);
    const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToLastPage = () => setCurrentPage(totalPages);


    function formatReadableDate(dateString) {
        if (!dateString) return "";

        const date = new Date(dateString);

        // Extract parts of the date
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();

        // Extract parts of the time
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0)

        // Format the date and time
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

        return `${formattedDate}, ${formattedTime}`;
    }


    const [profileImage, setProfileImage] = useState(null);
    const [headerImage, setHeaderImage] = useState(null);

    const handleFileChangeProfile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserProfile({ ...userProfile, profileImage: file });
        }
    };

    const removeProfileImage = () => {
        setUserProfile({ ...userProfile, profileImage: null });
    };

    const handleFileChangeHeader = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserProfile({ ...userProfile, headerImage: file });
        }
    };

    const removeHeaderImage = () => {
        setUserProfile({ ...userProfile, headerImage: null });
    };

    const updateMemberProfile = async (userProfile) => {
        console.log("zzUserProfile: ", userProfile);
        const memberId = userProfile.id;
        console.log("zzMemberId: ", memberId);

        try {
            setLoadingUpdate(true);
            const response = await axios.put(`https://halaltravel.ai/ht/api/profile/update/${memberId}`, userProfile, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Full Response:', response);

            closeEdit();

            if (response.status === 200) {
                toast.success("Member profile updated successfully!", {
                    autoClose: 2000,
                    position: 'top-right',
                    closeButton: true,
                    className: "xs:top-40 lg:top-20 toast-message",
                });
            }

            fetchMemberList(searchQuery, currentPage);

        } catch (error) {
            console.error('Error updating profile:', error);

            // Check if the error is 400 and display the message
            if (error.response && error.response.status === 400) {
                let errorMessage = error.response.data.message;
                // Replace \n with <br> for line breaks in HTML
                errorMessage = errorMessage.replace(/\n/g, "<br/>");

                toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessage }} />,
                    {
                        position: 'top-right',
                        closeButton: true,
                        className: "xs:top-40 lg:top-20 toast-message",
                    }
                );

                // toast.error(`Error: ${errorMessage}`, {
                //     autoClose: 5000,
                //     position: 'top-right',
                //     closeButton: true,
                //     className: "xs:top-40 lg:top-20 toast-message",
                // });
            } else {
                toast.error('Something went wrong. Please try again.');
            }

        } finally {
            setLoadingUpdate(false); // Stop loading after fetching
        }
    };


    const handlePhoneInputChange = (value) => {

        const phoneNumber = parsePhoneNumberFromString(value);

        console.log("PhoneNumber: ", phoneNumber);

        if (phoneNumber) {
            setUserProfile({
                ...userProfile,
                phoneNumber: {
                    countryCode: `+${phoneNumber.countryCallingCode}`,
                    phoneNumber: phoneNumber.nationalNumber,
                }
            });
        } else {
            setUserProfile({
                ...userProfile,
                phoneNumber: {
                    countryCode: '',
                    phoneNumber: '',
                }
            });
        }
    };


    function handleNavigateDashboard() {
        navigate("/admin-dashboard");
    }

    console.log("UserProfile: ", userProfile);


    return (
        <>
            <div className='fixed w-full' style={{ zIndex: 2 }}>
                {/* <HeaderAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" /> */}
                <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
                {/* <HeaderAdminMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" /> */}
                <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
                <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
                <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
                {/* <ForgotPassword isOpen={isPopup3Open} closePopup3={closePopup3} /> */}
            </div>

            {/* <div className="bg-[#F5F5F5] min-h-screen"> */}
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                {!isAuthenticated ? (
                    <div className="flex items-center text-center p-6">
                        <BsPersonFillLock size={50} className="text-red-500 mr-1" />
                        <p className="text-red-500 text-xl font-semibold">
                            Unauthorized user. Please log in.
                        </p>
                    </div>
                ) : !hasAccess ? (
                    <div className="flex flex-col justify-center items-center text-center p-6">
                        <BsFileEarmarkLock2Fill size={40} className="text-red-500 mr-1 mb-6" />
                        <p className="text-red-500 text-xl font-semibold">
                            Access Denied.
                        </p>
                        <p className="text-red-500 text-lg font-semibold">
                            You do not have permission to view this page.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="w-full font-montserrat bg-gray-50 xs:pt-[160px] lg:pt-[92px]">
                            {/* <HeaderOTAAdmin className="fixed invisible lg:visible" /> */}
                            <div className="flex min-h-screen items-start">
                                {/* Hamburger Icon */}
                                {!isSidebarOpen && (
                                    // <div className="hidden lg:flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col">
                                    <div className="flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col">
                                        <button onClick={toggleSidebar} className="p-5">
                                            <FiMenu size={30} className="text-[#FFFFFF]" />
                                        </button>
                                    </div>
                                )}

                                {/* Sidebar */}
                                {isSidebarOpen && (
                                    // <div className="hidden lg:flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col ">
                                    <div className="flex fixed bg-gradient-to-b from-[#00A19A] to-[#2A3075] xs:min-h-screen lg:min-h-[1000px] flex-col ">
                                        {/* Toggle Button */}
                                        <button onClick={toggleSidebar} className="p-5">
                                            <FiMenu size={30} className="text-[#FFFFFF]" />
                                        </button>

                                        {/* Options at the bottom */}
                                        <div
                                            className="mt-[5px] py-[15px] pl-[15px] flex w-[250px] cursor-pointer  hover:bg-[#FFFFFF] hover:bg-opacity-10 items-center"
                                            onClick={handleNavigateDashboard}
                                        >
                                            <MdOutlineRocket size={35} className="text-[#FFFFFF]" />
                                            <div className="ml-[20px]">
                                                <span className="font-montserrat font-semibold text-sm text-[#FFFFFF]">
                                                    Dashboard
                                                </span>
                                            </div>
                                        </div>
                                        <div className="py-[15px] pl-[15px] bg-[#FFFFFF] bg-opacity-30 flex w-[250px] cursor-pointer items-center">
                                            <BsPeople size={35} className="text-[#FFFFFF]" />
                                            <div className="ml-[20px]">
                                                <span className="font-montserrat font-semibold text-sm text-[#FFFFFF]">
                                                    Member Management
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}


                                <div
                                    className={`p-[30px] min-h-screen overflow-x-auto transition-all duration-300 
                                    ${isSidebarOpen ? 'ml-[250px]' : 'ml-[70px]'}`}
                                >
                                    <div className="flex items-center">
                                        <BsPeople size={40} className="text-[#2A3075]" />
                                        <div className="ml-[20px]">
                                            <text className="font-montserrat font-semibold md:text-3xl lg:text-xl text-[#2A3075]">
                                                Member Management
                                            </text>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-[40px] w-full gap-2">
                                        <div className="w-full flex justify-cenyter items-center border-[#AEAEAE] border-[1px] bg-[#FFFFFF] p-[10px] rounded-[15px] shadow-sm flex">
                                            <IoMdSearch size={25} className="text-[#747373]" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as user types
                                                placeholder="Search by name, email..."
                                                // className="border px-4 py-2 rounded w-full"
                                                className="border-none w-full p-0 bg-transparent ml-5 font-montserrat text-sm placeholder:text-[#AEAEAE] text-[#747373]"
                                            />
                                            {/* Search button */}
                                            {/* <button
                                                onClick={handleSearch}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Search
                                            </button> */}
                                        </div>
                                    </div>

                                    <div className="pt-[30px] pb-[15px] flex justify-between items-center">
                                        <text className="text-sm text-[#747373] font-medium font-montserrat pl-1">
                                            {totalElements} results{searchQuery && ` for '${searchQuery}'`}
                                        </text>

                                        {/* Pagination Controls */}
                                        <div className="flex justify-center font-medium">
                                            <button
                                                type="button"
                                                onClick={goToFirstPage}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                First
                                            </button>
                                            <button
                                                type="button"
                                                onClick={goToPreviousPage}
                                                disabled={currentPage === 1}
                                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Previous
                                            </button>
                                            <span className="px-4 py-2 bg-gray-200">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={goToNextPage}
                                                disabled={currentPage === totalPages}
                                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                            <button
                                                type="button"
                                                onClick={goToLastPage}
                                                disabled={currentPage === totalPages}
                                                className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Last
                                            </button>
                                        </div>
                                    </div>


                                    {/* table */}
                                    <div className="overflow-x-scroll scrollbar w-full h-auto mb-5">
                                        <div className="">
                                            <table className="min-w-full table-auto border-collapse">
                                                <thead className='bg-gray-200 md:text-[22px] lg:text-[14px]'>
                                                    <tr>
                                                        {/* 1 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>User Id</div>
                                                        </th>
                                                        {/* 2 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>Referral Id</div>
                                                        </th>
                                                        {/* 3 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>First Name</div>
                                                        </th>
                                                        {/* 4 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>Last Name</div>
                                                        </th>
                                                        {/* 5 */}
                                                        <th className="border min-w-[150px]">
                                                            <div className='p-3'>Email</div>
                                                        </th>
                                                        {/* 6 */}
                                                        <th className="border min-w-[150px]">
                                                            <div className='p-3'>Username</div>
                                                        </th>
                                                        {/* 7 */}
                                                        <th className="border min-w-[150px]">
                                                            <div className='p-3'>Phone No.</div>
                                                        </th>
                                                        {/* 8 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>Date of Birth</div>
                                                        </th>
                                                        {/* 9 */}
                                                        <th className="border min-w-[200px]">
                                                            <div className='p-3'>Gender</div>
                                                        </th>
                                                        {/* 10 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>Status</div>
                                                        </th>
                                                        {/* 11 */}
                                                        <th className="border min-w-[120px]">
                                                            <div className='p-3'>Role</div>
                                                        </th>
                                                        {/* 12 */}
                                                        <th className="border min-w-[210px]">
                                                            <div className='p-3'>Register Date</div>
                                                        </th>
                                                        {/* 13 */}
                                                        <th className="border min-w-[210px]">
                                                            <div className='p-3'>Profile Update Date</div>
                                                        </th>
                                                        {/* 14 */}
                                                        <th className="border min-w-[210px]">
                                                            <div className='p-3'>Verification Date</div>
                                                        </th>
                                                        {/* 15 */}
                                                        <th className="border min-w-[210px]">
                                                            <div className='p-3'>Password Reset Date</div>
                                                        </th>
                                                        {/* 16 */}
                                                        <th className="border min-w-[210px]">
                                                            <div className='p-3'>Sign Up Channel</div>
                                                        </th>
                                                        {/* 17 */}
                                                        <th className="border min-w-[150px]">
                                                            <div className='p-3'>Edit Profile</div>
                                                        </th>
                                                        {/* 18 */}
                                                        <th className="border min-w-[150px]">
                                                            <div className='p-3'>Delete User</div>
                                                        </th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {loading ? (
                                                        <tr className="bg-white">
                                                            <td colSpan="100%" className="text-center p-5"><LoadingSpinner /></td>
                                                        </tr>
                                                    ) : memberList.length > 0 ? (
                                                        memberList.map((data, index) => (
                                                            <tr key={index} className='text-center md:text-[20px] lg:text-[13px]  bg-white'>
                                                                {/* 1 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.id}</div>
                                                                </td>
                                                                {/* 2 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.referralId}</div>
                                                                </td>
                                                                {/* 3 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.firstName}</div>
                                                                </td>
                                                                {/* 4 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.lastName}</div>
                                                                </td>
                                                                {/* 5 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.email}</div>
                                                                </td>
                                                                {/* 6 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.userName}</div>
                                                                </td>
                                                                {/* 7 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.countryCallingCode?.callingCode ? data.countryCallingCode?.callingCode : ''} {data.phoneNumber ? data.phoneNumber : ''}</div>
                                                                </td>
                                                                {/* 8 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.dtOfBirth}</div>
                                                                </td>
                                                                {/* 9 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.gender}</div>
                                                                </td>
                                                                {/* 10 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.status}</div>
                                                                </td>
                                                                {/* 11 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.role}</div>
                                                                </td>
                                                                {/* 12 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{formatReadableDate(data.dtCreated)}</div>
                                                                </td>
                                                                {/* 13 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{formatReadableDate(data.dtUpdated)}</div>
                                                                </td>
                                                                {/* 14 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{formatReadableDate(data.verificationDate)}</div>
                                                                </td>
                                                                {/* 15 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{formatReadableDate(data.passwordResetDate)}</div>
                                                                </td>
                                                                {/* 16 */}
                                                                <td className="border">
                                                                    <div className='p-3'>{data.signUpChannel}</div>
                                                                </td>
                                                                {/* 17 */}
                                                                <td className="border">
                                                                    <div className='p-3 flex justify-center items-center'>
                                                                        <div onClick={() => openEdit(data)} className="common-pointer px-[10px] py-[5px] bg-[#FFFFFF] hover:bg-gray-100 border-[0.5px] border-[#AEAEAE] rounded-[5px] w-fit">
                                                                            <text className="text-sm text-[#747373] font-bold font-montserrat">
                                                                                Edit
                                                                            </text>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {/* 18 */}
                                                                <td className="border">
                                                                    <div className='p-3 flex justify-center items-center'>
                                                                        <div
                                                                            // onClick={() => openDelete(data.id)}
                                                                            // className="common-pointer px-[10px] py-[5px] bg-[#FFFFFF] hover:bg-[#AEAEAE] border-[0.5px] border-[#AEAEAE] rounded-[5px] w-fit"
                                                                            className="common-pointer px-[10px] py-[5px] bg-[#AEAEAE] border-[0.5px] border-[#AEAEAE] rounded-[5px] w-fit hover:cursor-not-allowed"
                                                                        >
                                                                            {/* <BsFillTrash3Fill size={20} className="text-[#ED4C5C]" /> */}
                                                                            <BsFillTrash3Fill size={20} className="text-gray-100" />
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr className='md:text-[20px] lg:text-[13px] bg-white'>
                                                            <td colSpan="100%" className="text-start border p-5 italic">Not Found</td>
                                                            {/* Ensure colSpan covers all columns */}
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {isEditOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center xs:pt-[200px] lg:pt-[135px] xs:pb-0 lg:pb-10 xs:px-5 lg:px-0 z-1">
                                    <div className="bg-white rounded-[10px] max-w-[1100px] w-full max-h-[80vh] overflow-hidden flex flex-col">
                                        {/* Header */}
                                        <div className="px-8 py-6 border-b border-gray-200">
                                            <span className="text-lg font-montserrat font-semibold">
                                                Edit Member Profile
                                            </span>
                                        </div>

                                        {/* Scrollable Content */}
                                        <div className="overflow-y-auto p-8 flex-1">
                                            <div className="flex mt-[0px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        First Name
                                                    </text>
                                                </div>
                                                <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                                                    <input
                                                        type="text"
                                                        className="border-none p-0 bg-transparent w-full font-montserrat text-sm placeholder:text-[#AEAEAE] text-black"
                                                        value={userProfile.firstName || ''}
                                                        onChange={(e) => setUserProfile({ ...userProfile, firstName: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Last Name
                                                    </text>
                                                </div>
                                                <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                                                    <input
                                                        type="text"
                                                        className="border-none p-0 bg-transparent w-full font-montserrat text-sm placeholder:text-[#AEAEAE] text-black"
                                                        value={userProfile.lastName || ''}
                                                        onChange={(e) => setUserProfile({ ...userProfile, lastName: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Email
                                                    </text>
                                                </div>
                                                <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                                                    <input
                                                        type="text"
                                                        className="border-none p-0 bg-transparent w-full font-montserrat text-sm placeholder:text-[#AEAEAE] text-black"
                                                        value={userProfile.email || ''}
                                                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Username
                                                    </text>
                                                </div>
                                                <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                                                    <input
                                                        type="text"
                                                        className="border-none p-0 bg-transparent w-full font-montserrat text-sm placeholder:text-[#AEAEAE] text-black"
                                                        value={userProfile.userName || ''}
                                                        onChange={(e) => setUserProfile({ ...userProfile, userName: e.target.value })}
                                                    // disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Phone No.
                                                    </text>
                                                </div>
                                                {/* <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]"> */}
                                                {/* <text className="text-sm font-montserrat font-medium">
                                                        {userProfile.phoneNumber?.countryCode ? `(${userProfile.phoneNumber.countryCode})` : ''}
                                                    </text>
                                                    <input
                                                        type="text"
                                                        className="border-none p-0 bg-transparent w-[700px] font-montserrat text-sm placeholder:text-[#AEAEAE] text-black"
                                                        value={userProfile.phoneNumber?.phoneNumber || ''}
                                                        onChange={(e) =>
                                                            setUserProfile({
                                                                ...userProfile,
                                                                phoneNumber: {
                                                                    ...userProfile.phoneNumber, // Retain other properties of phoneNumber
                                                                    phoneNumber: e.target.value // Update only the phoneNumber field
                                                                }
                                                            })
                                                        }
                                                    /> */}
                                                {/* Phone Input Component */}
                                                <PhoneInput
                                                    type="tel"
                                                    name="phoneNumber"
                                                    international
                                                    defaultCountry="my"  // Default to Malaysia ("MY")
                                                    className="rounded-lg w-full phone-input text-base sm:text-[28px] lg:text-sm"
                                                    value={`${userProfile.phoneNumber?.countryCode || ''}${userProfile.phoneNumber?.phoneNumber || ''}`}
                                                    onChange={handlePhoneInputChange}
                                                />
                                                {/* </div> */}
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex flex-col">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Date of Birth
                                                    </text>
                                                    <text className="text-[12px] font-montserrat font-medium">
                                                        (mm/dd/yyy)
                                                    </text>
                                                </div>
                                                <div className="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px]">
                                                    <input
                                                        type="date"
                                                        className="border-none p-0 bg-transparent w-full font-montserrat text-sm placeholder:text-[#AEAEAE] text-black"
                                                        value={userProfile.dtOfBirth || ''}
                                                        onChange={(e) => setUserProfile({ ...userProfile, dtOfBirth: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Gender
                                                    </text>
                                                </div>
                                                <select
                                                    id="Gender"
                                                    class="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px] text-sm font-montserrat text-black"
                                                    value={userProfile.gender || ''}
                                                    onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value })}
                                                >
                                                    <option value="" disabled>Select Gender</option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                </select>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Status
                                                    </text>
                                                </div>
                                                <select
                                                    id="Status"
                                                    class="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px] text-sm font-montserrat text-black"
                                                    value={userProfile.status || ''}
                                                    onChange={(e) => setUserProfile({ ...userProfile, status: e.target.value })}
                                                >
                                                    <option value="" disabled>Select Status</option>
                                                    <option value="A">Active</option>
                                                    <option value="I">Incomplete</option>
                                                    <option value="B" disabled>Blacklisted</option>
                                                </select>
                                            </div>
                                            <div className="flex mt-[20px] w-full">
                                                <div className="w-[200px] flex items-center">
                                                    <text className="text-sm font-montserrat font-medium">
                                                        Role
                                                    </text>
                                                </div>
                                                <select
                                                    id="Role"
                                                    class="bg-[#F9FAFB] border-[0.5px] border-[#AEAEAE] w-full flex p-[12px] rounded-[5px] text-sm font-montserrat text-black"
                                                    value={userProfile.role || ''}
                                                    onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
                                                    disabled
                                                >
                                                    {/* <option value="" disabled>Select Role</option> */}
                                                    <option value="">Select Role</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </div>
                                        </div>


                                        {/* Footer */}
                                        <div className="px-8 py-5 border-t border-gray-200 flex justify-between gap-4">
                                            <button
                                                onClick={closeEdit} className="flex justify-center bg-[#747373] p-3 rounded-[5px] w-full text-white text-md font-medium font-montserrat"
                                                disabled={loadingUpdate}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="flex justify-center bg-[#2A3075] p-3 rounded-[5px] w-full text-white text-md font-medium font-montserrat"
                                                // onClick={updateMemberProfile}
                                                onClick={() => updateMemberProfile(userProfile)}
                                                disabled={loadingUpdate}
                                            >
                                                {/* Apply Changes */}
                                                {loadingUpdate ? 'Applying Changes...' : 'Apply Changes'}
                                            </button>
                                        </div>

                                        {/* Conditional rendering for loading spinner */}
                                        {loadingUpdate && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                                <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                                            </div>
                                        )}

                                    </div>
                                </div>


                            )}

                            {isDeleteOpen && (
                                <div className="fixed top-[40px] left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                                    <div className="bg-white p-0 rounded-[10px] max-w-[600px] w-full shadow-lg">
                                        <div className="w-full bg-[#ED4C5C] flex justify-center p-[10px] rounded-t-[10px]">
                                            <MdWarning size={130} className="text-[#FFFFFF]" />
                                        </div>

                                        <div className="pt-[50px] flex justify-center w-full">
                                            <text className="text-2xl font-montserrat font-semibold text-[#000000]">
                                                WARNING
                                            </text>
                                        </div>

                                        <div className="pt-[20px] flex justify-center w-full">
                                            <text className="text-lg font-montserrat font-semibold text-[#000000] text-center">
                                                Are you sure you want to remove this user? <br /> This action cannot be undone
                                            </text>
                                        </div>


                                        {/* Footer */}
                                        <div className=" w-full justify-between flex gap-4 p-[50px]">
                                            <div className="flex justify-center bg-[#ED4C5C] p-[10px] rounded-[5px] w-full common-pointer">
                                                <text className="text-[#FFFFFF] text-md font-medium font-montserrat">
                                                    Yes
                                                </text>
                                            </div>
                                            <div onClick={closeDelete} className="flex justify-center bg-[#747373] p-[10px] rounded-[5px] w-full common-pointer">
                                                <text className="text-[#FFFFFF] text-md font-medium font-montserrat">
                                                    Cancel
                                                </text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}



                        </div>
                    </>
                )}
            </div>
        </>
    );

};

export default MemberManagementPage;