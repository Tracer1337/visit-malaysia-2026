// import { useNavigate } from "react-router-dom";
// import HeaderOTAAdmin from 'components/Header/HeaderOTAAdmin/index';
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import { useState } from "react";
// import axios from "axios";

// const SignupPage = () => {
//     const navigate = useNavigate();

//   // `value` will be the parsed phone number in E.164 format.
//   // Example: "+12133734253".
//   const [value, setValue] = useState();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   // const [phoneNumber, setPhoneNumber] = useState('');
//   const [dateBirth, setDateBirth] = useState('');
//   const [gender, setGender] = useState('');

//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     password: "",
//     email: "",
//     phoneNumber: "",
//     gender: "",
//   });

//   const handleSubmit = (event) => {
//     event.preventDefault();

//   const localPhoneNumber = value ? value.replace("+60", "") : null;

//   const url = "https://halaltravel.ai/ht/api/auth/signup";
//   const data = {
//     firstName: firstName,
//     lastName: lastName,
//     password: password,
//     email: email,
//     phoneNumber: {
//       countryCode: "+60",
//       phoneNumber: localPhoneNumber,
//     },
//     dtOfBirth: dateBirth,
//     gender: gender,
//   };
//       console.log('--------------',  data);
//       console.log(JSON.stringify(data, null, 2));

//     axios.post(url, data)
//       .then((response) => {
//         // Handle the response from the backend (success)
//         console.log('Response:', response.data);

//         if (response.status === 201) {
//           // Successful signup
//           console.log('Account created successfully!', response.data.message);
//           // You can show a success message to the user or redirect to another page
//           // Example: navigate('/success');
//         }
//       })
//       .catch((error) => {
//         // Handle the error response from the backend (failure)
//         if (error.response) {
//           console.error('Error Response:', error.response.data);

//           if (error.response.status === 400) {
//             if (error.response.data.message === 'Error: email address is already taken') {
//               // Show error message for existing email address
//               console.error('Email address is already taken.');
//               // You can show an error message to the user or handle it accordingly
//               // Example: setError('email', 'Email address is already taken');
//             } else if (error.response.data.message === 'Fields validation failed') {
//               // Show error messages for invalid fields
//               console.error('Fields validation failed:', error.response.data.invalidFields);

//               // Check if there is a validation error for 'phoneNumber'
//               const phoneNumberError = error.response.data.invalidFields.find(
//                 (field) => field.fieldName === 'phoneNumber'
//               );

//               if (phoneNumberError && phoneNumberError.validationError === 'Invalid phone number') {
//                 console.error('Invalid phone number:', phoneNumberError.validationError);
//                 // You can show an error message for 'phoneNumber' field or handle it accordingly
//                 // Example: setError('phoneNumber', 'Invalid phone number');
//               } else {
//                 // Handle other validation errors if needed
//                 console.error('Other validation errors:', error.response.data.invalidFields);
//               }
//             }
//           }
//         } else {
//           console.error('Error:', error.message);
//         }
//       });
//     };

//     return (
//         <>
//             <HeaderOTAAdmin/>
//             <section class="bg-gray-50 dark:bg-gray-900">
//         <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//             {/* <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
//                 <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
//                 Flowbite
//             </a> */}
//       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl h-fit xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//           <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                   Create your account
//               </h1>
//               <form class="" action="#" onSubmit={handleSubmit} >
//                 <div className="grid gap-6 mb-6 md:grid-cols-2 sm:grid-cols-1">
//                 <div>
//                   <label htmlFor="first_name">First Name</label>
//                   <input
//                     type="text"
//                     name="first_name"
//                     id="first_name"
//                     placeholder="First Name"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                   {errors.firstName && <div>{errors.firstName}</div>}
//                 </div>

//                   <div>
//                       <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
//                       <input type="text" name="last_name" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" value={lastName}
//                         onChange={(e) => setLastName(e.target.value)} required="" />
//                   </div>
//                   <div>
//                       <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                       <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password}
//                         onChange={(e) => setPassword(e.target.value)} required="" />
//                   </div>
//                   <div>
//                       <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                       <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                   </div>
//                   <div>
//                       <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
//                       <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email}
//                        onChange={(e) => setEmail(e.target.value)} required=""/>
//                   </div>
//                   <div>
//                     <label for="tel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
//                     <PhoneInput
//                     type="tel"
//                     international
//                     countryCallingCodeEditable={false}
//                     defaultCountry="MY"
//                     value={value}
//                     onChange={setValue}/>
//                   </div>
//                 <div>
//                     <label for="dtOfBirth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Date of Birth</label>
//                     <input type="date" name="dtOfBirth" id="dtOfBirth" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={dateBirth}
//                     onChange={(e) => setDateBirth(e.target.value)} required=""/>
//                 </div>
//                 <div>
//                     <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
//                     <select type="dropdown" name="gender" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
//                     value={gender} // Bind the 'gender' state to the value attribute
//                     onChange={(e) => setGender(e.target.value)} // Update 'gender' state on change
//                     >

//                         <option value=" ">Select</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>
//                 </div>
//                 </div>

//                   <div class="flex items-start mb-4">
//                       <div class="flex items-center h-5">
//                         <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
//                       </div>
//                       <div class="ml-3 text-sm">
//                         <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
//                       </div>
//                   </div>
//                   <button type="submit" class=" mb-3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
//                   <p class="text-sm font-light text-gray-500 dark:text-gray-400">
//                       Already have an account? <a href="/legacy/" class="font-medium text-blue-600 hover:underline dark:text-primary-500">Login here</a>
//                   </p>
//               </form>
//           </div>
//       </div>
//   </div>
// </section>
//         </>
//     );

// };

// export default SignupPage;

import { useNavigate } from "react-router-dom";
import HeaderOTAAdmin from "components/Header/HeaderOTAAdmin/index";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    dtOfBirth: "",
    gender: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const localPhoneNumber = value ? value.replace("+60", "") : null;

    const data = {
      firstName: firstName,
      lastName: lastName,
      password: password.trim(),
      email: email,
      phoneNumber: {
        countryCode: "+60",
        phoneNumber: localPhoneNumber,
      },
      dtOfBirth: dateBirth,
      gender: gender,
    };

    console.log("--------------", data);
    console.log(JSON.stringify(data, null, 2));

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Password does not match" });
      return;
    }

    // Perform form validation before submitting
    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    // // Check if there are any validation errors
    if (Object.keys(validationErrors).length === 0) {
      // If no errors, submit the form
      submitForm(data);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Validate first name
    if (data.firstName.trim() === "") {
      errors.firstName = "First name is required";
    }

    // Validate last name
    if (data.lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    // Validate password
    if (password === "") {
      errors.password = "Password is required";
    } else {
      // Check each condition using regular expressions
      if (!/[a-z]/.test(password)) {
        errors.password = "Password must contain at least one lowercase letter";
      } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one digit";
      } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      }
    }

    // Validate email
    if (data.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email)) {
      errors.email = "Invalid email address";
    }

    // Validate phone number
    if (!data.phoneNumber || data.phoneNumber.phoneNumber === "") {
      errors.phoneNumber = "Phone number is required";
    }

    // Validate dtOfBirth
    if (data.dtOfBirth === "") {
      errors.dtOfBirth = "Date of birth is required";
    }

    // Validate gender
    if (data.gender === "") {
      errors.gender = "Gender is required";
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // Simple email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const submitForm = (data) => {
    // Your authentication token obtained from the API provider
    const authToken =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbm1oZzFAZ21haWwuY29tIiwiaWF0IjoxNjg5OTExNTM2LCJleHAiOjE2OTA1MTYzMzYsInJvbGVzIjpbXX0.rOYKMSwsz7ikJK9fFOBb7wFCEwhTd87JPhRDaQ5BsiGptBAssREEDyWVI-YFfd31daRRWwbMt1T5olOcKhj0rQ";

    // Replace 'backend-url' with the actual URL of your backend API endpoint
    const url = "https://halaltravel.ai/ht/api/auth/signup";

    // Submit the form data to the server using axios or any other HTTP library
    axios
      .post(url, data)
      .then((response) => {
        // Handle the response from the backend (success)
        console.log("Response:", response.data);

        if (response.status === 201) {
          // Successful signup
          console.log("Account created successfully!", response.data.message);
          toast.success("Account created successfully!");
          // You can show a success message to the user or redirect to another page
          // Example: navigate('/success');
        }
      })
      .catch((error) => {
        // Handle the error response from the backend (failure)
        if (error.response) {
          console.error("Error Response:", error.response.data);

          if (error.response.status === 400) {
            if (
              error.response.data.message ===
              "Error: email address is already taken"
            ) {
              // Show error message for existing email address
              const errorMessage = "Email address is already taken";
              setErrors({ ...errors, email: errorMessage });
            } else if (
              error.response.data.message === "Fields validation failed"
            ) {
              // Show error messages for invalid fields
              console.error(
                "Fields validation failed:",
                error.response.data.invalidFields,
              );

              // Check if there is a validation error for 'phoneNumber'
              const phoneNumberError = error.response.data.invalidFields.find(
                (field) => field.fieldName === "phoneNumber",
              );

              if (
                phoneNumberError &&
                phoneNumberError.validationError === "Invalid phone number"
              ) {
                const errorMessage = "Invalid phone number.";
                setErrors({ ...errors, phoneNumber: errorMessage });
              }

              // Check if there is a validation error for 'firstName'
              const firstNameError = error.response.data.invalidFields.find(
                (field) => field.fieldName === "firstName",
              );

              if (
                firstNameError &&
                firstNameError.validationError === "Field is required"
              ) {
                const errorMessage = "First name is required.!!!!!";
                setErrors({ ...errors, firstName: errorMessage });
              }

              // Check if there is a validation error for 'lastName'
              const lastNameError = error.response.data.invalidFields.find(
                (field) => field.fieldName === "lastName",
              );

              if (
                lastNameError &&
                lastNameError.validationError === "Field is required"
              ) {
                const errorMessage = "Last name is required.";
                setErrors({ ...errors, lastName: errorMessage });
              }

              // Check if there is a validation error for 'password'
              const passwordError = error.response.data.invalidFields.find(
                (field) => field.fieldName === "password",
              );

              if (
                passwordError &&
                passwordError.validationError === "Field is required"
              ) {
                const errorMessage = "Password is required.";
                setErrors({ ...errors, password: errorMessage });
              }

              // Check if there is a validation error for 'gender'
              const genderError = error.response.data.invalidFields.find(
                (field) => field.fieldName === "gender",
              );

              if (
                genderError &&
                genderError.validationError === "Field is required"
              ) {
                const errorMessage = "Gender is required.";
                setErrors({ ...errors, gender: errorMessage });
              }
            }
          }
        } else {
          console.error("Error:", error.message);
        }
      });

    // Redirect to the home page after successful do acc
    // navigate("/login");
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <HeaderOTAAdmin />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl h-fit xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {" "}
                Create your account
              </h1>
              <form className="space-y-2" action="#" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errors.firstName && (
                    <div className="text-[#e63946]">{errors.firstName}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {errors.lastName && (
                    <div className="text-[#e63946]">{errors.lastName}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Au@123456"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <div className="text-[#e63946]">{errors.password}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {errors.confirmPassword && (
                    <div className="text-[#e63946]">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div className="text-[#e63946]">{errors.email}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    type="tel"
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="MY"
                    value={value}
                    className="rounded-lg"
                    onChange={setValue}
                  />
                  {errors.phoneNumber && (
                    <div className="text-[#e63946]">{errors.phoneNumber}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="dtOfBirth"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dtOfBirth"
                    id="dtOfBirth"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={dateBirth}
                    onChange={(e) => setDateBirth(e.target.value)}
                  />
                  {errors.dtOfBirth && (
                    <div className="text-[#e63946]">{errors.dtOfBirth}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select
                    type="dropdown"
                    name="gender"
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    value={gender} // Bind the 'gender' state to the value attribute
                    onChange={(e) => setGender(e.target.value)} // Update 'gender' state on change
                  >
                    <option value=" ">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="text-[#e63946]">{errors.gender}</div>
                  )}
                </div>

                {/* Rest of your form fields */}
                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      onChange={handleCheckboxChange}
                      checked={isChecked}
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      for="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        class="font-medium text-blue-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className=" mb-3 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={!isChecked}
                  //  onClick={handleNavigate1}
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/legacy/login"
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </a>
                </p>
                {/* <button type="submit">Submit</button> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupPage;
