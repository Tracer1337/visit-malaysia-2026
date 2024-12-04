
import HeaderOTA from 'components/Header/HeaderOTA/index';
import React, { useState } from 'react'
import { MdOutlineDone } from 'react-icons/md';
// import './cke.css';
import { useNavigate } from '../../../../node_modules/react-router-dom/index';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/index';
import { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import GlobalConstant from "constant/global";
import { CAlert } from '@coreui/react';
import axios from "axios";
import { useAuth } from 'AuthContext';
import LoginPage from "components/Login/index";
import SignupPage from "components/SignUp/index";
import HeaderOTAMobile from 'components/Header/HeaderOTAMobile/index';
import BlogTitle from '../BlogTitle/index';

const BlogPreview = () => {
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	const { search } = location;
	const searchParams = new URLSearchParams(search);
	// Retrieve the coverImage as a File object
	const coverImageUrl = searchParams.get('coverImageUrl');
	const [coverImage, setCoverImage] = useState('');
	const [blogData, setBlogData] = useState({ title: '', blog: '', coverImageUrl: null, editorText: '', blogTitle: '' });
	// const { generatedBlogData, title } = queryString.parse(
	// 	location.search
	// ); // Parse the query parameters
	//  const { generatedBlogData: generatedBlogData} = location.state || {};
	const [generatedBlogDataa, setGeneratedBlogDataa] = useState(localStorage.getItem('blogContent') || '');
	const [blogContent, setBlogContent] = useState('');
	// const [blogTitle, setBlogTitle] = useState(title || '');
	// Get the current date

	const [title, setTitle] = useState('');
	const currentDate = new Date();
	const formattedDate = currentDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});


	// console.log('Generated Blog Data:', generatedBlogDataa);
	console.log('Title:', blogData.title);
	// console.log('Cover Image:', coverImage);
	// console.log('Cover ImageURL:', coverImageUrl);

	useEffect(() => {
		const handleMessage = (event) => {
			if (event.origin !== window.location.origin) {
				return;
			}
			setBlogData(event.data);
		};

		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, []);

	const handleMessage = (event) => {
		const { data } = event;

		// Ensure that data is not undefined before updating state
		if (data.editorText !== undefined) {
			setGeneratedBlogDataa(data.editorText);
		}

		if (data.Btitle !== undefined) {
			setTitle(data.Btitle);
		}

		if (data.coverImage !== undefined) {
			setCoverImage(data.coverImage);
		}
	};

	//navigate button
	const navigate = useNavigate();
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

	//for dropdown list
	const [isVisible, setIsVisible] = useState("");
	const [isModalVisible, setModalVisible] = useState(false);

	const resetModel = () => {
		setModalVisible(true);
	};

	//select
	const [selectedOption, setSelectedOption] = useState(null);

	const handleOptionSelect = (option) => {
		setSelectedOption(option);
	};

	const changeHandler = e => {
		const getshow = e.target.value;
		setIsVisible(getshow);
	}

	useEffect(() => {
		// Simulate loading delay with setTimeout (replace with your actual data fetching logic)
		const loadingDelay = setTimeout(() => {
			setIsLoading(false); // Set isLoading to false after the data is fetched (or simulated delay)
		}, 2000); // Adjust the delay as needed

		return () => clearTimeout(loadingDelay); // Clean up the timeout on component unmount
	}, []);

	const { setIsLoggedIn } = useAuth();
	setIsLoggedIn(true);

	const fetchInProgressBlog = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.post('https://halaltravel.ai/ht/api/blog/inProgress', {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (response.status === 200 || response.status === 201) {
				const blog = response.data;
				setTitle(blog.title || '');
				setBlogContent(blog.blog || '');
				setIsLoading(false); // Data has been fetched, stop loading
				console.error('Fetched Blog',  response.status);
				console.log('Title Blog: ',  title);
				console.log('Blog: ', blogContent);
			} else {
				console.error('Unexpected response status:', response.status);
				setIsLoading(false); // Stop loading on error
			}
		} catch (error) {
			console.error('Error fetching in-progress blog:', error);
			setIsLoading(false); // Stop loading on error
		}
	};

	useEffect(() => {
		fetchInProgressBlog();
	}, []);

	return (
		<div className=' flex flex-col mx-auto w-full h-auto '>
			<div className='fixed w-full' style={{ zIndex: 2 }}>
				<HeaderOTAAdmin openPopup1={openPopup1} className="fixed invisible lg:visible" />
				<LoginPage isOpen={isPopup1Open} openPopup2={openPopup2} closePopup1={closePopup1} />
				<SignupPage isOpen={isPopup2Open} closePopup2={closePopup2} />
				<HeaderOTAMobile openPopup1={openPopup1} className="visible fixed overflow-hidden lg:invisible lg:hidden" />
			</div>
			<div className='lg:mx-72 xs:mx-5 xs:pt-[160px] lg:pt-[92px] mb-8'>
				{/* <div className='mt-8 flex justify-between'>
					{isModalVisible && (
						<div className='alert alert-primary alert-dismissible fade show rounded' role='alert' style={{ backgroundColor: '#D9D9D9', padding: '1rem', borderRadius: 'var(--cut)' }}>
							<CAlert color='primary' dismissible >
								Blog has been created successfully
							</CAlert>
						</div>
					)}
					
				</div> */}
				<div className='mt-8 border border-2 border-[] rounded-sm shadow p-10 px-20 py-10 h-[fit]'>
					<div id="previewContent" className='pt-4 py-2 w-[100%] text-justify'>
						<p style={{
							color: '#031DA8'
						}} className='lg:text-[40px] sm:text-[65px]'>{title}
						</p>
						<br></br>
						<p className='sm:text-[30px] lg:text-[14px]'>{formattedDate}</p>

						<br></br>
						{/* <img src={coverImageUrl}
							alt="Cover Image"
							width={351}
							height="auto"
							className="mx-auto"
						/> */}
						{/* {coverImage &&
							<img src={coverImageUrl}
								alt="Cover Image"
								width={351}
								height="auto"
								className="mx-auto" />} */}
						<br></br>

						<div className='sm:text-[30px] lg:text-[14px] styled-content' dangerouslySetInnerHTML={{ __html: blogContent }} />

					</div>
				</div>
			</div>

		</div>

	)
}

export default BlogPreview;