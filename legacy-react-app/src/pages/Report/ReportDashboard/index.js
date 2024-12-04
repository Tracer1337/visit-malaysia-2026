import HeaderOTA from 'components/Header/HeaderOTA/index';
import { Input } from 'components/Input/index';
import { Text, Img, Line, Button } from "components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import SignupPage from 'components/SignUp/index';
import LoginPage from 'components/Login/index';
import { BsQuestionCircle, BsCalendar } from 'react-icons/bs';
import { MdCalendarToday } from 'react-icons/md';
import Footerepic from 'components/Footer/Footerepic/index';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-datalabels';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import './styles.css';
import { fontColor, fontFamily } from '../../../../node_modules/@syncfusion/ej2-richtexteditor/src/rich-text-editor/models/items';


const ReportDashboard = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("tokenType");
    const userId = localStorage.getItem("userId");

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



    const [userData, setUserData] = useState('');

    // *Profile User Data*
    useEffect(() => {
        axios.get(`https://halaltravel.ai/ht/api/profile/${userId}`)
            .then(response => {

                const data = response.data;

                console.log("response user data: ", data);

                setUserData(data);
            })
            .catch(error => {
                console.error('Error fetching profile data:', error);
            });
    }, [userId]);


    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(`https://halaltravel.ai/ht/api/admin/dashboard/summary/${userId}?range=Past7`);
                setSummaryData(response.data);
                console.log("Summary Data: ", response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchSummary();
    }, []);


    const chartRefVP = useRef(null);
    const chartRefMO = useRef(null);
    const [chartInstanceVP, setChartInstanceVP] = useState(null);
    const [chartInstanceMO, setChartInstanceMO] = useState(null);

    const [selectedVPOption, setSelectedVPOption] = useState('Lead');
    const [selectedMOOption, setSelectedMOOption] = useState('Lead');

    const [selectedRange, setSelectedRange] = useState('Past7');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [MOLead, setMOLead] = useState([]);
    const [MOBooking, setMOBooking] = useState([]);
    const [MOCommission, setMOCommission] = useState([]);
    const [VPLead, setVPLead] = useState([]);
    const [VPBooking, setVPBooking] = useState([]);
    const [VPCommission, setVPCommission] = useState([]);

    function formatDateUsingLocale(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    // Handler for changes in the date range
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const [isVisible, setIsVisible] = useState(false);

    const handleRangeChange = (range) => {
        setSelectedRange(range);

        if (range !== 'Custom') {
            setStartDate('');
            setEndDate('');

            setIsVisible(false);
        }
        else {
            setIsVisible(true);

        }
    };


    const fetchMOData = async () => {
        let queryParamsLead = {
            range: selectedRange,
            chartName: 'Lead'
        };

        let queryParamsBooking = {
            range: selectedRange,
            chartName: 'Booking'
        };

        let queryParamsCommission = {
            range: selectedRange,
            chartName: 'Commission'
        };

        // Function to check if a date is valid
        const isValidDate = (date) => {
            return date && !isNaN(new Date(date).getTime());
        };

        if (selectedRange === 'Custom') {
            // Check if both startDate and endDate are valid
            if (!isValidDate(startDate) || !isValidDate(endDate)) {
                // If either date is invalid, log a message and exit the function early.
                // console.log("Please fill in the start date and end date first.");
                // toast.error("Please select start date and end date.", {
                //     autoClose: 2000,
                //     position: 'top-right',
                //     closeButton: true,
                //     className: "xs:top-40 lg:top-20 toast-message",
                // });
                // setLoadingReport(false);
                return; // Exit the function to avoid making the API call
            } else {
                // If both dates are valid, format them and add to queryParams
                queryParamsLead.startDate = formatDateUsingLocale(startDate);
                queryParamsLead.endDate = formatDateUsingLocale(endDate);
                queryParamsBooking.startDate = formatDateUsingLocale(startDate);
                queryParamsBooking.endDate = formatDateUsingLocale(endDate);
                queryParamsCommission.startDate = formatDateUsingLocale(startDate);
                queryParamsCommission.endDate = formatDateUsingLocale(endDate);
            }
        }

        console.log("Query Params MO Lead: ", queryParamsLead);
        console.log("Query Params MO Booking: ", queryParamsBooking);
        console.log("Query Params MO Commission: ", queryParamsCommission);

        try {
            const responseLead = await axios.get(
                `https://halaltravel.ai/ht/api/admin/dashboard/chart/${userId}`,
                {
                    params: queryParamsLead,
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                }
            );

            const dataMOLead = responseLead.data;
            setMOLead(dataMOLead);


            const responseBooking = await axios.get(
                `https://halaltravel.ai/ht/api/admin/dashboard/chart/${userId}`,
                {
                    params: queryParamsBooking
                }
            );

            const dataMOBooking = responseBooking.data;
            setMOBooking(dataMOBooking);


            const responseCommission = await axios.get(
                `https://halaltravel.ai/ht/api/admin/dashboard/chart/${userId}`,
                {
                    params: queryParamsCommission
                }
            );

            const dataMOCommission = responseCommission.data;
            setMOCommission(dataMOCommission);

            console.log("Data MO Lead: ", dataMOLead);
            console.log("Data MO Booking: ", dataMOBooking);
            console.log("Data MO Commission: ", dataMOCommission);

            setSelectedMOOption('Lead');
            setSelectedVPOption('Lead');
        } catch (error) {

        }
    }


    const fetchVPData = async () => {
        let queryParamsLead = {
            range: selectedRange,
            chartName: 'Lead'
        };

        let queryParamsBooking = {
            range: selectedRange,
            chartName: 'Booking'
        };

        let queryParamsCommission = {
            range: selectedRange,
            chartName: 'Commission'
        };

        // Function to check if a date is valid
        const isValidDate = (date) => {
            return date && !isNaN(new Date(date).getTime());
        };

        if (selectedRange === 'Custom') {
            // Check if both startDate and endDate are valid
            if (!isValidDate(startDate) || !isValidDate(endDate)) {
                // If either date is invalid, log a message and exit the function early.
                // console.log("Please fill in the start date and end date first.");
                // toast.error("Please select start date and end date.", {
                //     autoClose: 2000,
                //     position: 'top-right',
                //     closeButton: true,
                //     className: "xs:top-40 lg:top-20 toast-message",
                // });
                // setLoadingReport(false);
                return; // Exit the function to avoid making the API call
            } else {
                // If both dates are valid, format them and add to queryParams
                queryParamsLead.startDate = formatDateUsingLocale(startDate);
                queryParamsLead.endDate = formatDateUsingLocale(endDate);
                queryParamsBooking.startDate = formatDateUsingLocale(startDate);
                queryParamsBooking.endDate = formatDateUsingLocale(endDate);
                queryParamsCommission.startDate = formatDateUsingLocale(startDate);
                queryParamsCommission.endDate = formatDateUsingLocale(endDate);
            }
        }

        console.log("Query Params VP Lead: ", queryParamsLead);
        console.log("Query Params VP Booking: ", queryParamsBooking);
        console.log("Query Params VP Commission: ", queryParamsCommission);

        try {
            const responseLead = await axios.get(
                `https://halaltravel.ai/ht/api/admin/dashboard/vertical/${userId}`,
                {
                    params: queryParamsLead,
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                }
            );

            const dataVPLead = responseLead.data;
            setVPLead(dataVPLead);


            const responseBooking = await axios.get(
                `https://halaltravel.ai/ht/api/admin/dashboard/vertical/${userId}`,
                {
                    params: queryParamsBooking
                }
            );

            const dataVPBooking = responseBooking.data;
            setVPBooking(dataVPBooking);


            const responseCommission = await axios.get(
                `https://halaltravel.ai/ht/api/admin/dashboard/vertical/${userId}`,
                {
                    params: queryParamsCommission
                }
            );

            const dataVPCommission = responseCommission.data;
            setVPCommission(dataVPCommission);

            console.log("Data VP Lead: ", dataVPLead);
            console.log("Data VP Booking: ", dataVPBooking);
            console.log("Data VP Commission: ", dataVPCommission);

            setSelectedMOOption('Lead');
            setSelectedVPOption('Lead');
        } catch (error) {

        }
    }


    useEffect(() => {
        if (selectedRange !== 'Custom') {
            fetchMOData();
            fetchVPData();
        }
    }, [selectedRange]);


    useEffect(() => {
        if (selectedRange == 'Custom') {
            fetchMOData();
            fetchVPData();
        }
    }, [startDate, endDate]);


    const calculateTotalValue = (data) => {
        return data.reduce((total, item) => total + parseFloat(item.value), 0);
    };

    const handleMOOption = (event) => {
        setSelectedMOOption(event);
    };

    const handleVPOption = (event) => {
        setSelectedVPOption(event.target.value);
    };



    // Chart for selectedMOOption
    useEffect(() => {
        if (chartInstanceMO) {
            chartInstanceMO.destroy(); // Destroy the existing chart instance for selectedMOOption
        }

        const ctxMO = chartRefMO.current.getContext('2d');

        // Function to get the appropriate data array based on selectedMOOption
        const getDataForMOOption = (selectedMOOption) => {
            switch (selectedMOOption) {
                case 'Lead':
                    return MOLead;
                case 'Booking':
                    return MOBooking;
                case 'Commission':
                    return MOCommission;
                default:
                    return []; // Return an empty array if the option is not recognized
            }
        };

        const newChartInstanceMO = new Chart(ctxMO, {
            type: 'line', // Adjust chart type as needed for selectedMOOption
            data: {
                labels: getDataForMOOption(selectedMOOption).map(item => item.date),
                datasets: [{
                    label: 'Value',
                    // data: getDataForMOOption(selectedMOOption).map(item => parseFloat(item.value)),
                    data: getDataForMOOption(selectedMOOption).map(item => {
                        const value = parseFloat(item.value);
                        return selectedMOOption === 'Commission' ? value / 2 : value;
                    }),
                    backgroundColor: [
                        '#1E9A4D',
                        // '#29cf68',
                        // 'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // Add more colors as needed
                    ],
                    borderColor: [
                        '#1E9A4D',
                        // '#29cf68',
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // Add more colors as needed
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false, // Hide x-axis grid lines
                        },
                    },
                    y: {
                        grid: {
                            display: true, // Show y-axis grid lines
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                        position: 'bottom', // Adjust position as needed
                    },
                    tooltip: {
                        enabled: true, // Enable tooltips
                        mode: 'index', // Show tooltips for all data points
                    },
                    datalabels: {
                        formatter: (value, ctx) => {
                            const label = ctx.chart.data.labels[ctx.dataIndex];
                            return `${label}: ${value}`;
                        },
                        color: '#000', // Label color
                        font: {
                            size: 12, // Label font size
                        },
                    },
                },
            },
        });

        setChartInstanceMO(newChartInstanceMO); // Set the new chart instance for selectedMOOption
    }, [MOLead, selectedMOOption]);


    // Chart for selectedVPOption
    useEffect(() => {
        if (chartInstanceVP) {
            chartInstanceVP.destroy(); // Destroy the existing chart instance for selectedVPOption
        }

        const ctxVP = chartRefVP.current.getContext('2d');

        // Function to get the appropriate data array based on selectedVPOption
        const getDataForVPOption = (selectedVPOption) => {
            switch (selectedVPOption) {
                case 'Lead':
                    return VPLead;
                case 'Booking':
                    return VPBooking;
                case 'Commission':
                    return VPCommission;
                default:
                    return []; // Return an empty array if the option is not recognized
            }
        };

        const newChartInstanceVP = new Chart(ctxVP, {
            type: 'doughnut',
            data: {
                labels: getDataForVPOption(selectedVPOption).map(item => item.category),
                datasets: [{
                    label: 'Value',
                    // data: getDataForVPOption(selectedVPOption).map(item => parseFloat(item.value)),
                    data: getDataForVPOption(selectedVPOption).map(item => {
                        const value = parseFloat(item.value);
                        return selectedVPOption === 'Commission' ? value / 2 : value;
                    }),
                    backgroundColor: [
                        '#1E9A4D',
                        '#29cf68',
                        // 'rgba(255, 99, 132, 0.2)',
                        // 'rgba(54, 162, 235, 0.2)',
                        // Add more colors as needed
                    ],
                    borderColor: [
                        '#1E9A4D',
                        '#29cf68',
                        // 'rgba(255, 99, 132, 1)',
                        // 'rgba(54, 162, 235, 1)',
                        // Add more colors as needed
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            padding: 40, // Adjust the padding between legend items if needed
                            font: {
                                // weight: 'bold' // Set the font weight to bold
                                size: 13
                            }
                        } // Adjust position as needed
                    },
                    tooltip: {
                        enabled: true, // Enable tooltips
                    },
                    datalabels: {
                        display: true,
                        formatter: (value, ctx) => {
                            // You can customize the format of the data label here
                            // const label = ctx.chart.data.labels[ctx.dataIndex];
                            // return `${label}: ${value}`; // Format the label as desired
                            return value;
                        },
                        color: 'black', // Label color
                        font: {
                            size: 20, // Label font size
                            weight: 'bold'
                        }
                    }
                },
                hover: {
                    mode: null, // Disable hover effect
                },
            },
        });

        setChartInstanceVP(newChartInstanceVP); // Set the new chart instance for selectedVPOption
    }, [VPLead, selectedVPOption]);



    function handleNavigate12() {
        navigate("/report-details");
    }



    return (
        <>
            <div className='fixed w-full' style={{ zIndex: 2 }}>
                <HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
                <LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
                <SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
                <HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
            </div>

            <div className="w-full font-montserrat bg-[#F5F5F5] p-[50px] xs:pt-[200px] lg:pt-[132px]">

                {/* welcome user */}
                <div className="flex items-center">
                    <div>
                        <text className="text-[#1E9A4D] font-medium md:text-[37px] xl:text-[25px]">
                            Welcome, {userData.userName} !
                        </text>
                    </div>

                    <div className="common-pointer font-medium md:rounded-[10px] xl:rounded-[5px] md:text-[20px] xl:text-[13px] ml-4 md:px-[50px] xl:px-[30px] py-[5px] bg-[#1E9A4D] text-[#FFFFFF] hover:bg-[#0E7535]"
                        onClick={handleNavigate12}>
                        <text>
                            View Report
                        </text>
                    </div>
                </div>

                {/* top box */}
                <div className="grid md:grid-cols-1 xl:grid-cols-3 w-full mt-[30px] gap-[15px]">


                    <div className="bg-[#FFFFFF] p-[35px] border-[#D8D8D8] border border-[0.3px] shadow-md">
                        <div className="flex items-center">
                            <text className="text-[#1E9A4D] font-semibold md:text-[22px] xl:text-[15px]">
                                Total earnings
                            </text>
                            <BsQuestionCircle size={17} className="md:hidden xl:block ml-4 text-[#1E9A4D]" />
                            <BsQuestionCircle size={25} className="md:block xl:hidden ml-4 text-[#1E9A4D]" />
                        </div>
                        <div className="">
                            <text className="text-[#1E9A4D] font-medium md:text-[20px] xl:text-[13px]">
                                ${(summaryData.totalEarnings) / 2}
                            </text>
                        </div>
                    </div>
                    {/* <div className="bg-[#FFFFFF] p-[35px] border-[#D8D8D8] border border-[0.3px] shadow-md">
                        <div className="flex items-center">
                            <text className="text-[#1E9A4D] font-semibold md:text-[22px] xl:text-[15px]">
                                Unpaid earnings
                            </text>
                            <BsQuestionCircle size={17} className="md:hidden xl:block ml-4 text-[#1E9A4D]" />
                            <BsQuestionCircle size={25} className="md:block xl:hidden ml-4 text-[#1E9A4D]" />
                        </div>
                        <div className="">
                            <text className="text-[#1E9A4D] font-medium md:text-[20px] xl:text-[13px]">
                                $0.00
                            </text>
                        </div>
                    </div> */}

                    <div className="bg-[#FFFFFF] p-[35px] border-[#D8D8D8] border border-[0.3px] shadow-md">
                        <div className="flex items-center">
                            <text className="text-[#1E9A4D] font-semibold md:text-[22px] xl:text-[15px]">
                                Paid earnings
                            </text>
                            <BsQuestionCircle size={17} className="md:hidden xl:block ml-4 text-[#1E9A4D]" />
                            <BsQuestionCircle size={25} className="md:block xl:hidden ml-4 text-[#1E9A4D]" />
                        </div>
                        <div className="">
                            <text className="text-[#1E9A4D] font-medium md:text-[20px] xl:text-[13px]">
                                $0.00
                            </text>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] p-[35px] border-[#D8D8D8] border border-[0.3px] shadow-md">
                        <div className="flex items-center">
                            <text className="text-[#1E9A4D] font-semibold md:text-[22px] xl:text-[15px]">
                                Next Payment Round
                            </text>
                            <BsQuestionCircle size={17} className="md:hidden xl:block ml-4 text-[#1E9A4D]" />
                            <BsQuestionCircle size={25} className="md:block xl:hidden ml-4 text-[#1E9A4D]" />
                        </div>
                        <div className="">
                            <text className="text-[#1E9A4D] font-medium md:text-[20px] xl:text-[13px]">
                                $0.00
                            </text>
                        </div>
                    </div>

                </div>

                {/* tabs/web */}
                <div className="md:hidden xl:block">
                    <div className=" bg-[#FFFFFF] w-full shadow-inner mt-[50px] grid grid-cols-4 gap-[15px]">

                        <div className="grid justify-items-center common-pointer" onClick={() => handleRangeChange('Past7')}>
                            <text className={`font-medium text-[18px] my-[15px] ${selectedRange === 'Past7' ? 'text-[#1E9A4D]' : 'text-[#949494]'}`}>
                                Past 7 Days
                            </text>
                            <Line className={`w-[300px] ${selectedRange === 'Past7' ? 'h-[2.5px] bg-[#1E9A4D]' : 'h-[1px] bg-[#949494]'}`} />
                        </div>

                        <div className="grid justify-items-center common-pointer" onClick={() => handleRangeChange('Past30')}>
                            <text className={`font-medium text-[18px] my-[15px] ${selectedRange === 'Past30' ? 'text-[#1E9A4D]' : 'text-[#949494]'}`}>
                                Past 30 Days
                            </text>
                            <Line className={`w-[300px] ${selectedRange === 'Past30' ? 'h-[2.5px] bg-[#1E9A4D]' : 'h-[1px] bg-[#949494]'}`} />
                        </div>

                        <div className="grid justify-items-center common-pointer" onClick={() => handleRangeChange('CurrentM')}>
                            <text className={`font-medium text-[18px] my-[15px] ${selectedRange === 'CurrentM' ? 'text-[#1E9A4D]' : 'text-[#949494]'}`}>
                                This Month
                            </text>
                            <Line className={`w-[300px] ${selectedRange === 'CurrentM' ? 'h-[2.5px] bg-[#1E9A4D]' : 'h-[1px] bg-[#949494]'}`} />
                        </div>

                        <div className="grid justify-items-center common-pointer" onClick={() => handleRangeChange('Custom')}>
                            <div className="flex items-center my-[15px]">
                                {selectedRange != 'Custom' &&
                                    // <text className={`font-medium  text-[18px] ${selectedRange === 'Custom' ? 'text-[#1E9A4D]' : ' text-[#949494]'}`}>
                                    <text className={`font-medium  text-[18px] text-[#949494]`}>
                                        Specific Dates
                                    </text>
                                }
                                <BsCalendar size={16} className={`${selectedRange === 'Custom' ? 'text-[#1E9A4D] mr-3' : 'text-[#949494] ml-4'}`} />
                                {selectedRange === 'Custom' &&
                                    <div className="flex items-center border-[1px] border border-[#1E9A4D] rounded-[5px] bg-[#FFFFFF]">
                                        <DatePicker
                                            className="font-medium md:text-[22px] lg:text-[13px] not-italic text-[#1E9A4D] placeholder:required text-slate_700 w-full mx-7"
                                            placeholderText="Select dates"
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                        />
                                    </div>
                                }
                            </div>
                            <Line className={`w-[300px] ${selectedRange === 'Custom' ? 'h-[2.5px] bg-[#1E9A4D]' : 'h-[1px] bg-[#949494]'}`} />

                        </div>
                    </div>
                </div>

                {/* mobile */}
                <div className="md:block xl:hidden mt-[15px] flex w-full">
                    <div className="md:block xl:hidden w-[100%]">
                        <div className="flex items-center">
                            <select
                                className="w-[50%] p-[20px] rounded-[10px] text-[22px] text-[#000000] w-full border border-[#D3D2D2] border-[0.5px]"
                                onChange={(e) => handleRangeChange(e.target.value)}
                            >
                                <option value="Past7">Past 7 Days</option>
                                <option value="Past30">Past 30 Days</option>
                                <option value="CurrentM">This Month</option>
                                <option value="Custom">Specific Date</option>
                            </select>

                            {isVisible && (
                                <div className="w-[50%] ml-[20px] p-[20px] bg-[#FFFFFF] rounded-[10px] text-[#000000] border border-[#D3D2D2] border-[0.5px] flex items-center">
                                    <MdCalendarToday size={25} className="text-[#000000] mr-2" />
                                    <div className="flex items-center pr-[15px] ml-[10px]">
                                        <DatePicker
                                            className="font-normal md:text-[22px] lg:text-[13px] not-italic text-black placeholder:required text-slate_700 w-full"
                                            placeholderText="Select dates"
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                        />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>



                {/* content */}
                <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-[15px] md:mt-[20px] xl:mt-[10px]">

                    <div className="bg-[#FFFFFF] p-[35px] border-[#D8D8D8] border border-[0.3px] shadow-md h-[600px]">
                        <div className="flex items-center">
                            <text className="text-[#1E9A4D] font-semibold md:text-[22px] xl:text-[15px]">
                                Metrics Overview
                            </text>
                            <BsQuestionCircle size={17} className="md:hidden xl:block ml-4 text-[#1E9A4D]" />
                            <BsQuestionCircle size={25} className="md:block xl:hidden ml-4 text-[#1E9A4D]" />
                        </div>
                        <div className="mt-[20px] grid grid-cols-3">
                            <div
                                className={`items-start common-pointer border-t-[2px] ${selectedMOOption === 'Lead' ? 'border-t-[#1E9A4D] bg-[#1E9A4D] bg-opacity-10' : 'border-t-[#949494]'}  py-[15px] px-[15px]`}
                                onClick={() => handleMOOption('Lead')}
                            >
                                <text className="text-[#7D7B7B] font-medium md:text-[22px] xl:text-[15px]">
                                    Leads
                                </text>
                                <div>
                                    <text className="text-[#000000] md:text-[22px] xl:text-[15px]">
                                        {calculateTotalValue(MOLead)}
                                    </text>
                                </div>
                            </div>
                            <div
                                // className="items-start border-t-[2px] border-t-[#949494] py-[15px] px-[15px]"
                                className={`items-start common-pointer border-t-[2px] ${selectedMOOption === 'Booking' ? 'border-t-[#1E9A4D] bg-[#1E9A4D] bg-opacity-10' : 'border-t-[#949494]'}  py-[15px] px-[15px]`}
                                onClick={() => handleMOOption('Booking')}
                            >
                                <text className="text-[#7D7B7B] font-medium md:text-[22px] xl:text-[15px]">
                                    Bookings
                                </text>
                                <div>
                                    <text className="text-[#000000] md:text-[22px] xl:text-[15px]">
                                        {calculateTotalValue(MOBooking)}
                                    </text>
                                </div>
                            </div>
                            <div
                                // className="items-start border-t-[2px] border-t-[#949494] py-[15px] px-[15px]"
                                className={`items-start common-pointer border-t-[2px] ${selectedMOOption === 'Commission' ? 'border-t-[#1E9A4D] bg-[#1E9A4D] bg-opacity-10' : 'border-t-[#949494]'}  py-[15px] px-[15px]`}
                                onClick={() => handleMOOption('Commission')}
                            >
                                <text className="text-[#7D7B7B] font-medium md:text-[22px] xl:text-[15px]">
                                    Commission
                                </text>
                                <div>
                                    <text className="text-[#000000] md:text-[22px] xl:text-[15px]">
                                        ${((calculateTotalValue(MOCommission)) / 2).toFixed(2)}
                                    </text>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
                            <canvas ref={chartRefMO} className='chartMO-canvas' />
                        </div>

                    </div>

                    <div className="bg-[#FFFFFF] p-[35px] border-[#D8D8D8] border border-[0.3px] shadow-md h-[600px]">
                        <div className="flex items-center">
                            <text className="text-[#1E9A4D] font-semibold md:text-[22px] xl:text-[15px]">
                                Vertical Performance by
                            </text>
                            <BsQuestionCircle size={17} className="md:hidden xl:block ml-4 text-[#1E9A4D]" />
                            <BsQuestionCircle size={25} className="md:block xl:hidden ml-4 text-[#1E9A4D]" />
                        </div>
                        <div className="mt-[20px]">
                            <select
                                className="p-[15px] rounded-[10px] md:text-[22px] xl:text-[15px] text-[#000000] w-[50%] border border-[#D3D2D2] border-[0.5px]"
                                value={selectedVPOption}
                                onChange={handleVPOption}
                            >
                                {/* <option value="Lead"> Leads {calculateTotalValue(VPLead)}</option>
                                <option value="Booking"> Bookings {calculateTotalValue(VPBooking)}</option>
                                <option value="Commission"> Commision {(calculateTotalValue(VPCommission)) / 2}</option> */}
                                <option value="Lead"> Leads </option>
                                <option value="Booking"> Bookings </option>
                                <option value="Commission"> Commision </option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                            <canvas ref={chartRefVP} className='chartVP-canvas' />
                        </div>

                    </div>
                </div>

            </div>

            <div className="">
                <Footerepic />
            </div>


        </>
    );

};

export default ReportDashboard;