// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import Header2 from "../markup/Layout/Header2";
// // import { Form } from "react-bootstrap";
// // import axios from "axios";
// // import { showToastError, showToastSuccess } from "../utils/toastify";
// // import { fetchCompanyInfo } from "../store/thunkFunctions/companyFunction";
// // import { useDispatch, useSelector } from "react-redux";
// // import "react-toastify/dist/ReactToastify.css";
// // import ReactQuill from "react-quill";
// // import Footer from "../markup/Layout/Footer";
// // import VendorHeader from "../markup/Layout/VendorHeader";
// // import VendorCompanySideBar from "./Vendorsidebar";
// // import TextEditor from "../common/TextEditor";

// // function Vendorprofile() {
// //   const companyData = useSelector(
// //     (state) => state.companyDataSlice.companyData
// //   );

// //   // console.log(companyData,"company");
// //   let companyDetail = companyData?.company_detail;
// //   let vendorDetail =  companyData?.vendors_detail;
// //   let employeerDetail = companyData?.employeer_detail;

// //   const [countries, setCountries] = useState([]);
// //   const [states, setStates] = useState([]);
// //   const [cities, setCities] = useState([]);
// //   const [selectedCountry, setSelectedCountry] = useState(null);
// //   const [selectedStates, setSelectedStates] = useState(null);
// //   const [selectedCities, setSelectedCities] = useState(null);
// //   const [companyName, setCompanyName] = useState("");
// //   const [tagline, setTagline] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [website, setWebsite] = useState("");
// //   const [foundedYear, setFoundedYear] = useState("");
// //   const [industry, setIndustry] = useState(""); // State variable to hold selected industry ID
// //   const [description, setDescription] = useState("");
// //   const [number, setNumber] = useState("");
// //   const [phoneError, setPhoneError] = useState("");
// //   const [address, setAddress] = useState("");
// //   const [linkdin, setlinkdin] = useState("");
// //   const [twitter, setTwitter] = useState("");
// //   const [googleBusiness, setGoogleBusiness] = useState("");
// //   const [glassdoor, setGlassdor] = useState("");
// //   const [services, setServices] = useState([{ title: "", image: null }]);
// //   const [industries, setIndustries] = useState([]);
// //   const [file, setFile] = useState(null);

// //   const token = localStorage.getItem("vendorToken");

// //   // const handleChange = (content, delta, source, editor) => {
// //   //   const plainText = editor.getText();

// //   //   // Extract plain text from the editor
// //   //   setDescription(plainText); // Set the plain text in the state
// //   // };

// //   const handleChange = (content) => {
// //     // Extract plain text from the editor
// //     setDescription(content); // Set the plain text in the state
// //   };
// //   useEffect(() => {
// //     // Fetch industries from API
// //     axios({
// //       method: "GET",
// //       url: "https://apiwl.novajobs.us/api/admin/company-industry",
// //       headers: {
// //         Authorization: token, // Assuming you have token stored
// //       },
// //     })
// //       .then((res) => {
// //         setIndustries(res.data.data); // Set fetched industries to state
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //         showToastError(err?.response?.data?.message);
// //       });
// //   }, [token]); // Added token as dependency to ensure useEffect runs on token change
// // const validatePhone = (number) => {
// //     const phoneRegex = /^[0-9]{10}$/;
// //     return phoneRegex.test(number);
// //   };
// //   // Function to update company data
// //   const handlePhoneChange = (e) => {
// //     const value = e.target.value;
// //     setNumber(value);
// //     if (!validatePhone(value)) {
// //       setPhoneError("Phone number must be 10 digits.");
// //     } else {
// //       setPhoneError("");
// //     }
// //   };

// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(fetchCompanyInfo());
// //   }, [dispatch]);

// //   useEffect(() => {
// //     setCompanyName(companyDetail?.company_name || "");
// //     setTagline(companyDetail?.tagline || "");
// //     setEmail(employeerDetail?.email || vendorDetail?.email);
// //     setWebsite(companyDetail?.website_link || "");
// //     setFoundedYear(companyDetail?.founded_date || "");
// //     setDescription(companyDetail?.about || "");
// //     setSelectedCountry(companyDetail?.country_id || 231);
// //     setSelectedStates(companyDetail?.state_id || "");
// //     setSelectedCities(companyDetail?.city_id || "");
// //     setNumber(companyDetail?.phone || "");
// //     setAddress(companyDetail?.address || "");
// //     setlinkdin(companyDetail?.linkedin_link || "");
// //     setTwitter(companyDetail?.twitter_link || "");
// //     setGoogleBusiness(companyDetail?.google_link || "");
// //     setGlassdor(companyDetail?.facebook_link || "");
// //     setIndustry(companyDetail?.company_industry?.id || "");
// //     const companyServices = companyDetail?.company_services;

// //     // Check if companyServices is a valid JSON string
// //     if (
// //       companyServices &&
// //       typeof companyServices === "string" &&
// //       companyServices.trim() !== ""
// //     ) {
// //       try {
// //         const parsedServices = JSON.parse(companyServices);
// //         const formattedServices = parsedServices.map((service) => ({
// //           title: service.service_name,
// //           image: service.service_photo,
// //         }));
// //         setServices(formattedServices);
// //       } catch (error) {
// //         console.error("Failed to parse company services:", error);
// //         // Optionally set services to an empty array or handle the error as needed
// //         setServices([]);
// //       }
// //     } else {
// //       // If companyServices is not valid, set services to an empty array
// //       setServices([]);
// //     }
// //   }, [companyData]);

// //   const getCountry = async () => {
// //     axios({
// //       method: "get",
// //       url: "https://apiwl.novajobs.us/api/admin/countries",
// //       headers: {
// //         Authorization: token,
// //       },
// //     })
// //       .then((res) => {
// //         setCountries(res.data.data);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };

// //   const getState = async () => {
// //     if (!selectedCountry) {
// //       return;
// //     }
// //     axios({
// //       method: "get",
// //       url: `https://apiwl.novajobs.us/api/admin/stats/${selectedCountry}`,
// //       headers: {
// //         Authorization: token,
// //       },
// //     })
// //       .then((res) => {
// //         setStates(res.data.data);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };

// //   const getCities = async () => {
// //     if (!selectedStates) {
// //       return;
// //     }
// //     axios({
// //       method: "get",
// //       url: `https://apiwl.novajobs.us/api/admin/cities/${selectedStates}`,
// //       headers: {
// //         Authorization: token,
// //       },
// //     })
// //       .then((res) => {
// //         setCities(res.data.data);
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       });
// //   };

// //   useEffect(() => {
// //     getCountry();
// //   }, []);

// //   useEffect(() => {
// //     // console.log(selectedCountry);

// //     getState();
// //   }, [selectedCountry]);

// //   useEffect(() => {
// //     // console.log(selectedStates);
// //     getCities();
// //   }, [selectedStates]);

// //   // ... (previous useEffect hooks and functions)

// //   const addService = () => {
// //     setServices([...services, { title: "", image: "" }]);
// //   };

// //   const removeService = (index) => {
// //     const updatedServices = services.filter((_, i) => i !== index);
// //     setServices(updatedServices);
// //   };

// //   const handleServiceChange = (index, field, value) => {
// //     const updatedServices = services.map((service, i) => {
// //       if (i === index) {
// //         return { ...service, [field]: value };
// //       }
// //       return service;
// //     });
// //     setServices(updatedServices);
// //   };

// //   const handleImageChange = (index, e) => {
// //     const img = e.target.files[0];
// //     const url = URL.createObjectURL(img);

// //     const updatedServices = services.map((service, i) => {
// //       if (i === index) {
// //         return { ...service, image: img, url: url }; // Store the file and its URL
// //       }
// //       return service;
// //     });
// //     setServices(updatedServices);
// //   };

// //   const updateCompanyData = async () => {
// //     if (
// //       !companyName ||
// //       !email ||
// //       !industry ||
// //       !selectedCountry ||
// //       !selectedStates ||
// //       !selectedCities
// //     ) {
// //       console.log(
// //         companyName,
// //         email,
// //         industry,
// //         selectedCountry,
// //         selectedStates,
// //         selectedCities,
// //         "copmany detail"
// //       );
// //       showToastError("Please fill out all required fields.");
// //       return;
// //     }

// //     try {
// //       const servicesName = services.map((service) => service.title);
// //       const formData = new FormData();
// //       const serviceFiles = []; // Array to hold service images
// //       const serviceNames = []; // Array to hold service names

// //       // Function to convert a URL or string to a Blob/File
// //       const convertImageToBinary = async (image) => {
// //         if (typeof image === "string") {
// //           // If the image is a URL, fetch it as a Blob
// //           const response = await fetch(image);
// //           const blob = await response.blob();
// //           return new File([blob], "image.png"); // You can adjust the file name and type if necessary
// //         }
// //         return image; // If it's already a File or Blob, return as is
// //       };

// //       // Process each service to prepare the data
// //       for (const service of services) {
// //         serviceNames.push(service.title); // Collect service titles
// //         if (service.image) {
// //           const binaryImage = await convertImageToBinary(service.image); // Convert image to binary if needed
// //           serviceFiles.push(binaryImage); // Collect service images
// //         }
// //       }

// //       // Append each service image and its corresponding name to formData
// //       for (let i = 0; i < serviceFiles.length; i++) {
// //         formData.append("images", serviceFiles[i]);
// //         formData.append("services_name", serviceNames[i] || `file-${i}`); // Use a default name if none provided
// //       }
// //       const token = localStorage.getItem("vendorToken");
// //       // First request to update company data
// //       await axios({
// //         method: "put",
// //         url: `https://apiwl.novajobs.us/api/admin/company`,
// //         headers: {
// //           Authorization: token,
// //         },
// //         data: {
// //           company_name: companyName,
// //           about: description.trim(),
// //           email: email,
// //           tagline: tagline,
// //           website_link: website,
// //           founded_date: foundedYear,
// //           phone: number,
// //           country_id: Number(selectedCountry),
// //           state_id: Number(selectedStates),
// //           city_id: Number(selectedCities),
// //           address: address,
// //           facebook_link: glassdoor,
// //           twitter_link: twitter,
// //           google_link: googleBusiness,
// //           linkedin_link: linkdin,
// //           company_industry_id: Number(industry),
// //         },
// //       });

// //       showToastSuccess("Company data updated successfully.");

// //       // Second request to update company services
// //       await axios({
// //         method: "put",
// //         url: `https://apiwl.novajobs.us/api/admin/company-services`,
// //         headers: {
// //           Authorization: token,
// //           // No need to set 'Content-Type' when sending FormData; the browser sets it automatically
// //         },
// //         data: formData, // This is the FormData containing images and names
// //       });

// //       showToastSuccess("Services updated successfully.");
// //     } catch (error) {
// //       console.error("Error updating company data or services:", error);
// //       showToastError("Failed to update company data or services.");
// //     }
// //   };
// //   // console.log(companyDetail,"companyDetail");
// //   return (
// //     <>
// //       <VendorHeader />
// //       <div className="page-content bg-white">
// //         <div className="content-block">
// //           <div className="section-full bg-white p-t50 p-b20">
// //             <div className="container">
// //               <div className="d-flex">
// //                 <VendorCompanySideBar active="company" />
// //                 <div className="col-xl-9 col-lg-9 m-b30">
// //                   <div className="job-bx submit-resume">
// //                     <div className="job-bx-title clearfix">
// //                       <h5 className="font-weight-700 pull-left text-uppercase">
// //                         Company Profile
// //                       </h5>
// //                       {/* <Link
// //                         to={
// //                           companyDetail?.id
// //                             ? `/user/company/${companyDetail.id}`
// //                             : "#"
// //                         }
// //                         className={`site-button right-arrow button-sm float-right ${
// //                           !companyDetail?.id
// //                             ? "opacity-50 cursor-not-allowed pointer-events-none"
// //                             : ""
// //                         }`}
// //                         disabled={!companyDetail?.id}
// //                       >
// //                         View Company Page
// //                       </Link> */}
// //                     </div>
// //                     <form
// //                       onSubmit={(e) => {
// //                         e.preventDefault();
// //                         updateCompanyData();
// //                       }}
// //                     >
// //                       <div className="row m-b30">
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label htmlFor="companyName">Company Name</label>
// //                             <input
// //                               type="text"
// //                               id="companyName"
// //                               name="companyName"
// //                               className="form-control"
// //                               placeholder="Enter Company Name"
// //                               onChange={(e) => setCompanyName(e.target.value)}
// //                               value={companyName}
// //                               maxLength={50}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Tagline</label>
// //                             <input
// //                               type="text"
// //                               name="tagline"
// //                               className="form-control"
// //                               placeholder="Enter Company Tagline"
// //                               onChange={(e) => setTagline(e.target.value)}
// //                               value={tagline}
// //                               maxLength={50}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Email ID</label>
// //                             <input
// //                               type="email"
// //                               name="email"
// //                               className="form-control"
// //                               placeholder="info@gmail.com"
// //                               onChange={(e) => setEmail(e.target.value)}
// //                               value={email}
// //                               required
// //                               readOnly
// //                             />
// //                           </div>
// //                           {/* <div
// //                             className="form-group  "
// //                             style={{ position: "relative" }}
// //                           >
// //                             <label>Email ID</label>
// //                             <input
// //                               type="email"
// //                               className="form-control"
// //                               placeholder="info@gmail.com"
// //                               value={email}
// //                               disabled
// //                               style={{
// //                                 paddingRight: "2.5rem", // Leave space for the icon
// //                               }}
// //                             />
// //                             <span
// //                               style={{
// //                                 position: "absolute",
// //                                 top: "50%",
// //                                 right: "10px", // Adjust spacing from the right
// //                                 transform: "translateY(-50%)",
// //                                 color: "green",
// //                                 fontSize: "1.2rem",
// //                                 cursor: "pointer",
// //                               }}
// //                               title="Verified"
// //                             >
// //                               ✅
// //                             </span>
// //                           </div> */}
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Website</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="Website Link"
// //                               onChange={(e) => setWebsite(e.target.value)}
// //                               value={website}
// //                               maxLength={50}
// //                               required
// //                             />
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Founded Year</label>
// //                             <input
// //                               type="number" // Allows the user to select year and month
// //                               className="form-control"
// //                               placeholder="Founded Year"
// //                               onChange={(e) => setFoundedYear(e.target.value)}
// //                               value={foundedYear}
// //                             />
// //                           </div>
// //                         </div>

// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Industry</label>
// //                             <Form.Control
// //                               as="select"
// //                               custom
// //                               className="custom-select"
// //                               onChange={(e) => setIndustry(e.target.value)}
// //                               value={industry}
// //                               required
// //                             >
// //                               <option value="">Select Industry</option>
// //                               {industries.map((industry) => (
// //                                 <option key={industry.id} value={industry.id}>
// //                                   {industry.name}
// //                                 </option>
// //                               ))}
// //                             </Form.Control>
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-12 col-md-6">
// //                           <div className="form-group">
// //                             <label>Company Description</label>

// //                             <TextEditor
// //                              value={description}
// //                               onChange={handleChange}
// //                             />
// //                           </div>
// //                         </div>
// //                         {/* <div className="col-lg-12 col-md-12">
// //                           <div className="form-group">
// //                             <label>Services</label>
// //                             {services.map((service, index) => (
// //                               <div key={index} className="row mb-3">
// //                                 <div className="col-lg-6 col-md-6">
// //                                   <div className="form-group">
// //                                     <input
// //                                       type="text"
// //                                       className="form-control"
// //                                       placeholder="Service Title"
// //                                       value={service.title}
// //                                       onChange={(e) =>
// //                                         handleServiceChange(
// //                                           index,
// //                                           "title",
// //                                           e.target.value
// //                                         )
// //                                       }
// //                                     />
// //                                   </div>
// //                                 </div>
// //                                 <div className="col-lg-5 col-md-5">
// //                                   <div className="form-group">
// //                                     <input
// //                                       type="file"
// //                                       className="form-control-file"
// //                                       onChange={(e) =>
// //                                         handleImageChange(index, e)
// //                                       }
// //                                     />
// //                                   </div>
// //                                 </div>
// //                                 <div className="col-lg-1 col-md-1">
// //                                   <button
// //                                     type="button"
// //                                     className="site-button button-sm red"
// //                                     onClick={() => removeService(index)}
// //                                   >
// //                                     <i className="fa fa-trash"></i>
// //                                   </button>
// //                                 </div>
// //                                 {/* {service.image && (
// //                                   <div className="col-lg-12 col-md-12 mt-2">
// //                                     <img
// //                                       src={`https://apiwl.novajobs.us${service.image}`}
// //                                       alt="Service"
// //                                       className="img-fluid"
// //                                       style={{ maxHeight: "100px" }}
// //                                     />
// //                                   </div>
// //                                 )}
// //                                 {(service.url ||
// //                                   typeof service.image === "string") && (
// //                                   <div className="col-lg-12 col-md-12 mt-2">
// //                                     <img
// //                                       src={
// //                                         service.url
// //                                           ? service.url
// //                                           : `https://apiwl.novajobs.us${service.image}`
// //                                       }
// //                                       alt="Service"
// //                                       className="img-fluid"
// //                                       style={{ maxHeight: "100px" }}
// //                                     />
// //                                   </div>
// //                                 )}
// //                               </div>
// //                             ))}
// //                             <button
// //                               type="button"
// //                               className="site-button button-sm"
// //                               onClick={addService}
// //                             >
// //                               Add Service
// //                             </button>
// //                           </div>
// //                         </div> */}
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Phone Number</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="Phone Number"
// //                               // onChange={(e) => setNumber(e.target.value)}
// //                               onChange={(e) => handlePhoneChange(e)}
// //                               value={number}
// //                               required
// //                               pattern="[0-9]{10}"
// //                               maxLength={10}
// //                             />
// //                             {phoneError && (
// //                           <div className="invalid-feedback d-block">
// //                             {phoneError}
// //                           </div>
// //                         )}
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Country</label>
// //                             <Form.Control
// //                               as="select"
// //                               custom
// //                               onChange={(e) =>
// //                                 setSelectedCountry(e.target.value)
// //                               }
// //                               value={selectedCountry}
// //                               required
// //                             >
// //                               <option value="">Select Country</option>
// //                               {countries.map((country) => (
// //                                 <option key={country.id} value={country.id}>
// //                                   {country.name}
// //                                 </option>
// //                               ))}
// //                             </Form.Control>
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>State</label>
// //                             <Form.Control
// //                               as="select"
// //                               custom
// //                               onChange={(e) =>
// //                                 setSelectedStates(e.target.value)
// //                               }
// //                               value={selectedStates}
// //                               required
// //                             >
// //                               <option value="">Select State</option>
// //                               {states.map((state) => (
// //                                 <option key={state.id} value={state.id}>
// //                                   {state.name}
// //                                 </option>
// //                               ))}
// //                             </Form.Control>
// //                           </div>
// //                         </div>
// //                         <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>City</label>
// //                             <Form.Control
// //                               as="select"
// //                               custom
// //                               onChange={(e) =>
// //                                 setSelectedCities(e.target.value)
// //                               }
// //                               value={selectedCities}
// //                               required
// //                             >
// //                               <option value="">Select City</option>
// //                               {cities.map((city) => (
// //                                 <option key={city.id} value={city.id}>
// //                                   {city.name}
// //                                 </option>
// //                               ))}
// //                             </Form.Control>
// //                           </div>
// //                         </div>
// //                         {/* <div className="col-lg-12 col-md-12">
// //                           <div className="form-group">
// //                             <label>Address</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="Enter Address"
// //                               onChange={(e) => setAddress(e.target.value)}
// //                               value={address}
// //                               required
// //                             />
// //                           </div>
// //                         </div> */}

// //                         <div className="col-lg-12 col-md-6">
// //                           <div className="form-group">
// //                             <label>LinkedIn Link</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="LinkedIn Link"
// //                               onChange={(e) => setlinkdin(e.target.value)}
// //                               value={linkdin}
// //                             />
// //                           </div>
// //                         </div>
// //                         {/* <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Twitter Link</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="Twitter Link"
// //                               onChange={(e) => setTwitter(e.target.value)}
// //                               value={twitter}
// //                             />
// //                           </div>
// //                         </div> */}
// //                         {/* <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Google Business Link</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="Google Business Link"
// //                               onChange={(e) =>
// //                                 setGoogleBusiness(e.target.value)
// //                               }
// //                               value={googleBusiness}
// //                             />
// //                           </div>
// //                         </div> */}
// //                         {/* <div className="col-lg-6 col-md-6">
// //                           <div className="form-group">
// //                             <label>Glassdoor Link</label>
// //                             <input
// //                               type="text"
// //                               className="form-control"
// //                               placeholder="Glassdoor Link"
// //                               onChange={(e) => setGlassdor(e.target.value)}
// //                               value={glassdoor}
// //                             />
// //                           </div>
// //                         </div> */}

// //                         <div className="col-lg-12 col-md-12 mt-4">
// //                           <div className="clearfix font-bold">
// //                             <button
// //                               type="submit"
// //                               className="site-button w-100 text-bolder"
// //                             >
// //                               Save
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </form>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // }

// // export default Vendorprofile;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Header2 from "../markup/Layout/Header2";
// import { Form } from "react-bootstrap";
// import axios from "axios";
// import { showToastError, showToastSuccess } from "../utils/toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ReactQuill from "react-quill";
// import Footer from "../markup/Layout/Footer";
// import VendorHeader from "../markup/Layout/VendorHeader";
// import VendorCompanySideBar from "./Vendorsidebar";
// import TextEditor from "../common/TextEditor";

// function Vendorprofile() {
//   const [profileData, setProfileData] = useState(null);

//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedStates, setSelectedStates] = useState(null);
//   const [selectedCities, setSelectedCities] = useState(null);
//   const [companyName, setCompanyName] = useState("");
//   const [tagline, setTagline] = useState("");
//   const [email, setEmail] = useState("");
//   const [website, setWebsite] = useState("");
//   const [foundedYear, setFoundedYear] = useState("");
//   const [industry, setIndustry] = useState(""); // State variable to hold selected industry ID
//   const [description, setDescription] = useState("");
//   const [number, setNumber] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [address, setAddress] = useState("");
//   const [linkdin, setlinkdin] = useState("");
//   const [twitter, setTwitter] = useState("");
//   const [googleBusiness, setGoogleBusiness] = useState("");
//   const [glassdoor, setGlassdor] = useState("");
//   const [services, setServices] = useState([{ title: "", image: null }]);
//   const [industries, setIndustries] = useState([]);
//   const [file, setFile] = useState(null);

//   const token = localStorage.getItem("vendorToken");

//   const handleChange = (content) => {
//     // Extract plain text from the editor
//     setDescription(content); // Set the plain text in the state
//   };

//   useEffect(() => {
//     // Fetch profile data from /vendor/user-profile
//     if (token) {
//       axios({
//         method: "GET",
//         url: "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
//         headers: {
//           Authorization: token,
//         },
//       })
//         .then((res) => {
//           setProfileData(res.data.data);
//         })
//         .catch((err) => {
//           console.log(err);
//           showToastError(
//             err?.response?.data?.message || "Failed to fetch profile data"
//           );
//         });
//     }
//   }, [token]);

//   useEffect(() => {
//     // Fetch industries from API
//     if (token) {
//       axios({
//         method: "GET",
//         url: "https://apiwl.novajobs.us/api/admin/company-industry",
//         headers: {
//           Authorization: token, // Assuming you have token stored
//         },
//       })
//         .then((res) => {
//           setIndustries(res.data.data); // Set fetched industries to state
//         })
//         .catch((err) => {
//           console.log(err);
//           showToastError(err?.response?.data?.message);
//         });
//     }
//   }, [token]); // Added token as dependency to ensure useEffect runs on token change

//   const validatePhone = (number) => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(number);
//   };

//   // Function to update company data
//   const handlePhoneChange = (e) => {
//     const value = e.target.value;
//     setNumber(value);
//     if (!validatePhone(value)) {
//       setPhoneError("Phone number must be 10 digits.");
//     } else {
//       setPhoneError("");
//     }
//   };

//   useEffect(() => {
//     if (!profileData) return;

//     let companyDetail = profileData?.company_detail;
//     let vendorDetail = profileData?.vendors_detail;
//     let employeerDetail = profileData?.vendor_Detail; // Assuming employer details are in vendor_Detail

//     setCompanyName(companyDetail?.company_name || "");
//     setTagline(companyDetail?.tagline || "");
//     setEmail(employeerDetail?.email || vendorDetail?.email || "abc@mail.com");
//     setWebsite(companyDetail?.website_link || "");
//     setFoundedYear(companyDetail?.founded_date || "");
//     setDescription(companyDetail?.about || "");
//     setSelectedCountry(companyDetail?.country_id || 231);
//     setSelectedStates(companyDetail?.state_id || "");
//     setSelectedCities(companyDetail?.city_id || "");
//     setNumber(vendorDetail?.phone);
//     setAddress(companyDetail?.address || "");
//     setlinkdin(companyDetail?.linkedin_link || "");
//     setTwitter(companyDetail?.twitter_link || "");
//     setGoogleBusiness(companyDetail?.google_link || "");
//     setGlassdor(companyDetail?.facebook_link || "");
//     setIndustry(companyDetail?.company_industry?.id || "");
//     const companyServices = companyDetail?.company_services;

//     // Check if companyServices is a valid JSON string
//     if (
//       companyServices &&
//       typeof companyServices === "string" &&
//       companyServices.trim() !== ""
//     ) {
//       try {
//         const parsedServices = JSON.parse(companyServices);
//         const formattedServices = parsedServices.map((service) => ({
//           title: service.service_name,
//           image: service.service_photo,
//         }));
//         setServices(formattedServices);
//       } catch (error) {
//         console.error("Failed to parse company services:", error);
//         // Optionally set services to an empty array or handle the error as needed
//         setServices([]);
//       }
//     } else {
//       // If companyServices is not valid, set services to an empty array
//       setServices([]);
//     }
//   }, [profileData]);

//   const getCountry = async () => {
//     if (!token) return;
//     axios({
//       method: "get",
//       url: "https://apiwl.novajobs.us/api/admin/countries",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         setCountries(res.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const getState = async () => {
//     if (!selectedCountry || !token) {
//       return;
//     }
//     axios({
//       method: "get",
//       url: `https://apiwl.novajobs.us/api/admin/stats/${selectedCountry}`,
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         setStates(res.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const getCities = async () => {
//     if (!selectedStates || !token) {
//       return;
//     }
//     axios({
//       method: "get",
//       url: `https://apiwl.novajobs.us/api/admin/cities/${selectedStates}`,
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         setCities(res.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     getCountry();
//   }, [token]);

//   useEffect(() => {
//     // console.log(selectedCountry);

//     getState();
//   }, [selectedCountry, token]);

//   useEffect(() => {
//     // console.log(selectedStates);
//     getCities();
//   }, [selectedStates, token]);

//   // ... (previous useEffect hooks and functions)

//   const addService = () => {
//     setServices([...services, { title: "", image: "" }]);
//   };

//   const removeService = (index) => {
//     const updatedServices = services.filter((_, i) => i !== index);
//     setServices(updatedServices);
//   };

//   const handleServiceChange = (index, field, value) => {
//     const updatedServices = services.map((service, i) => {
//       if (i === index) {
//         return { ...service, [field]: value };
//       }
//       return service;
//     });
//     setServices(updatedServices);
//   };

//   const handleImageChange = (index, e) => {
//     const img = e.target.files[0];
//     const url = URL.createObjectURL(img);

//     const updatedServices = services.map((service, i) => {
//       if (i === index) {
//         return { ...service, image: img, url: url }; // Store the file and its URL
//       }
//       return service;
//     });
//     setServices(updatedServices);
//   };

//   const updateCompanyData = async () => {
//     if (
//       !companyName ||
//       !email ||
//       !industry ||
//       !selectedCountry ||
//       !selectedStates ||
//       !selectedCities
//     ) {
//       console.log(
//         companyName,
//         email,
//         industry,
//         selectedCountry,
//         selectedStates,
//         selectedCities,
//         "copmany detail"
//       );
//       showToastError("Please fill out all required fields.");
//       return;
//     }

//     try {
//       const servicesName = services.map((service) => service.title);
//       const formData = new FormData();
//       const serviceFiles = []; // Array to hold service images
//       const serviceNames = []; // Array to hold service names

//       // Function to convert a URL or string to a Blob/File
//       const convertImageToBinary = async (image) => {
//         if (typeof image === "string") {
//           // If the image is a URL, fetch it as a Blob
//           const response = await fetch(image);
//           const blob = await response.blob();
//           return new File([blob], "image.png"); // You can adjust the file name and type if necessary
//         }
//         return image; // If it's already a File or Blob, return as is
//       };

//       // Process each service to prepare the data
//       for (const service of services) {
//         serviceNames.push(service.title); // Collect service titles
//         if (service.image) {
//           const binaryImage = await convertImageToBinary(service.image); // Convert image to binary if needed
//           serviceFiles.push(binaryImage); // Collect service images
//         }
//       }

//       // Append each service image and its corresponding name to formData
//       for (let i = 0; i < serviceFiles.length; i++) {
//         formData.append("images", serviceFiles[i]);
//         formData.append("services_name", serviceNames[i] || `file-${i}`); // Use a default name if none provided
//       }
//       const token = localStorage.getItem("vendorToken");
//       // First request to update company data
//       await axios({
//         method: "put",
//         url: `https://apiwl.novajobs.us/api/admin/company`,
//         headers: {
//           Authorization: token,
//         },
//         data: {
//           company_name: companyName,
//           about: description.trim(),
//           email: email,
//           tagline: tagline,
//           website_link: website,
//           founded_date: foundedYear,
//           phone: number,
//           country_id: Number(selectedCountry),
//           state_id: Number(selectedStates),
//           city_id: Number(selectedCities),
//           address: address,
//           facebook_link: glassdoor,
//           twitter_link: twitter,
//           google_link: googleBusiness,
//           linkedin_link: linkdin,
//           company_industry_id: Number(industry),
//         },
//       });

//       showToastSuccess("Company data updated successfully.");

//       // Second request to update company services
//       await axios({
//         method: "put",
//         url: `https://apiwl.novajobs.us/api/admin/company-services`,
//         headers: {
//           Authorization: token,
//           // No need to set 'Content-Type' when sending FormData; the browser sets it automatically
//         },
//         data: formData, // This is the FormData containing images and names
//       });

//       showToastSuccess("Services updated successfully.");
//     } catch (error) {
//       console.error("Error updating company data or services:", error);
//       showToastError("Failed to update company data or services.");
//     }
//   };
//   // console.log(companyDetail,"companyDetail");
//   return (
   
//     <>
//       <VendorHeader />
//       <div className="page-content bg-white">
//         <div className="content-block">
//           <div className="section-full bg-white p-t50 p-b20">
//             <div className="container">
//               <div className="d-flex">
//                 <VendorCompanySideBar active="company" />
//                 <div className="col-xl-9 col-lg-9 m-b30">
//                   <div className="job-bx submit-resume">
//                     <div className="job-bx-title clearfix mb-4">
//                       <h5 className="font-weight-700 text-uppercase">
//                         Company Profile
//                       </h5>
//                     </div>

//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         updateCompanyData();
//                       }}
//                     >
//                       <div className="row">
//                         {/* Company Name */}
//                         <div className="col-lg-6 col-md-6 mb-3">
//                           <div className="form-group">
//                             <label htmlFor="companyName">Company Name</label>
//                             <input
//                               type="text"
//                               id="companyName"
//                               name="companyName"
//                               className="form-control"
//                               placeholder="Enter your company name"
//                               onChange={(e) => setCompanyName(e.target.value)}
//                               value={companyName}
//                               maxLength={50}
//                               required
//                             />
//                           </div>
//                         </div>

//                         {/* Tagline */}
//                         <div className="col-lg-6 col-md-6 mb-3">
//                           <div className="form-group">
//                             <label>Tagline</label>
//                             <input
//                               type="text"
//                               name="tagline"
//                               className="form-control"
//                               placeholder="Short tagline or motto"
//                               onChange={(e) => setTagline(e.target.value)}
//                               value={tagline}
//                               maxLength={50}
//                               required
//                             />
//                           </div>
//                         </div>

//                         {/* Email & Phone */}
//                         <div className="col-lg-6 col-md-6 mb-3">
//                           <div className="form-group position-relative">
//                             <label>Email ID</label>
//                             <input
//                               type="email"
//                               name="email"
//                               className="form-control"
//                               placeholder="info@company.com"
//                               onChange={(e) => setEmail(e.target.value)}
//                               value={email}
//                               required
//                               readOnly
//                             />
                            
//                           </div>
//                         </div>

//                         <div className="col-lg-6 col-md-6 mb-3">
//                           <div className="form-group">
//                             <label>Phone Number</label>
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter 10-digit phone number"
//                               onChange={(e) => handlePhoneChange(e)}
//                               value={number}
//                               required
//                               pattern="[0-9]{10}"
//                               maxLength={10}
//                             />
//                             {phoneError && (
//                               <div className="invalid-feedback d-block">
//                                 {phoneError}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Website & Founded Year */}
//                         <div className="col-lg-6 col-md-6 mb-3">
//                           <div className="form-group">
//                             <label>Website</label>
//                             <div className="input-group">
//                               <div className="input-group-prepend">
//                                 <span className="input-group-text">
//                                   https://
//                                 </span>
//                               </div>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="www.company.com"
//                                 onChange={(e) => setWebsite(e.target.value)}
//                                 value={website}
//                                 maxLength={100}
//                                 required
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="col-lg-6 col-md-6 mb-3">
//                           <div className="form-group">
//                             <label>Founded Year</label>
//                             <input
//                               type="number"
//                               className="form-control"
//                               placeholder="e.g. 2012"
//                               onChange={(e) => setFoundedYear(e.target.value)}
//                               value={foundedYear}
//                               min="1900"
//                               max={new Date().getFullYear()}
//                             />
//                           </div>
//                         </div>

//                         {/* Industry */}
//                         <div className="col-lg-12 col-md-12 mb-3">
//                           <div className="form-group">
//                             <label>Industry</label>
//                             <Form.Control
//                               as="select"
//                               className="custom-select"
//                               onChange={(e) => setIndustry(e.target.value)}
//                               value={industry}
//                               required
//                             >
//                               <option value="">Select Industry</option>
//                               {industries.map((industry) => (
//                                 <option key={industry.id} value={industry.id}>
//                                   {industry.name}
//                                 </option>
//                               ))}
//                             </Form.Control>
//                           </div>
//                         </div>

//                         {/* Description */}
//                         <div className="col-lg-12 col-md-12 mb-3">
//                           <div className="form-group">
//                             <label>Company Description</label>
//                             <TextEditor
//                               value={description}
//                               onChange={handleChange}
//                             />
//                           </div>
//                         </div>

//                         {/* Country, State, City */}
//                         <div className="col-lg-4 col-md-4 mb-3">
//                           <div className="form-group">
//                             <label>Country</label>
//                             <Form.Control
//                               as="select"
//                               onChange={(e) =>
//                                 setSelectedCountry(e.target.value)
//                               }
//                               value={selectedCountry}
//                               required
//                             >
//                               <option value="">Select Country</option>
//                               {countries.map((country) => (
//                                 <option key={country.id} value={country.id}>
//                                   {country.name}
//                                 </option>
//                               ))}
//                             </Form.Control>
//                           </div>
//                         </div>

//                         <div className="col-lg-4 col-md-4 mb-3">
//                           <div className="form-group">
//                             <label>State</label>
//                             <Form.Control
//                               as="select"
//                               onChange={(e) =>
//                                 setSelectedStates(e.target.value)
//                               }
//                               value={selectedStates}
//                               required
//                             >
//                               <option value="">Select State</option>
//                               {states.map((state) => (
//                                 <option key={state.id} value={state.id}>
//                                   {state.name}
//                                 </option>
//                               ))}
//                             </Form.Control>
//                           </div>
//                         </div>

//                         <div className="col-lg-4 col-md-4 mb-3">
//                           <div className="form-group">
//                             <label>City</label>
//                             <Form.Control
//                               as="select"
//                               onChange={(e) =>
//                                 setSelectedCities(e.target.value)
//                               }
//                               value={selectedCities}
//                               required
//                             >
//                               <option value="">Select City</option>
//                               {cities.map((city) => (
//                                 <option key={city.id} value={city.id}>
//                                   {city.name}
//                                 </option>
//                               ))}
//                             </Form.Control>
//                           </div>
//                         </div>

//                         {/* LinkedIn */}
//                         <div className="col-lg-12 col-md-12 mb-4">
//                           <div className="form-group">
//                             <label>LinkedIn Profile</label>
//                             <div className="input-group">
//                               {/* <div className="input-group-prepend">
//                                 <span className="input-group-text">
//                                   https://
//                                 </span>
//                               </div> */}
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="www.linkedin.com/company/your-company"
//                                 onChange={(e) => setlinkdin(e.target.value)}
//                                 value={linkdin}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Submit Button */}
//                         <div className="col-lg-12">
//                           <div className="text-center mt-4">
//                             <button
//                               type="submit"
//                               className="site-button w-50 font-weight-bold"
//                             >
//                               Save Company Profile
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Vendorprofile;


//   /* <div className="col-lg-12 col-md-12">
//                           <div className="form-group">
//                             <label>Services</label>
//                             {services.map((service, index) => (
//                               <div key={index} className="row mb-3">
//                                 <div className="col-lg-6 col-md-6">
//                                   <div className="form-group">
//                                     <input
//                                       type="text"
//                                       className="form-control"
//                                       placeholder="Service Title"
//                                       value={service.title}
//                                       onChange={(e) =>
//                                         handleServiceChange(
//                                           index,
//                                           "title",
//                                           e.target.value
//                                         )
//                                       }
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="col-lg-5 col-md-5">
//                                   <div className="form-group">
//                                     <input
//                                       type="file"
//                                       className="form-control-file"
//                                       onChange={(e) =>
//                                         handleImageChange(index, e)
//                                       }
//                                     />
//                                   </div>
//                                 </div>
//                                 <div className="col-lg-1 col-md-1">
//                                   <button
//                                     type="button"
//                                     className="site-button button-sm red"
//                                     onClick={() => removeService(index)}
//                                   >
//                                     <i className="fa fa-trash"></i>
//                                   </button>
//                                 </div>
//                                 {/* {service.image && (
//                                   <div className="col-lg-12 col-md-12 mt-2">
//                                     <img
//                                       src={`https://apiwl.novajobs.us${service.image}`}
//                                       alt="Service"
//                                       className="img-fluid"
//                                       style={{ maxHeight: "100px" }}
//                                     />
//                                   </div>
//                                 )}
//                                 {(service.url ||
//                                   typeof service.image === "string") && (
//                                   <div className="col-lg-12 col-md-12 mt-2">
//                                     <img
//                                       src={
//                                         service.url
//                                           ? service.url
//                                           : `https://apiwl.novajobs.us${service.image}`
//                                       }
//                                       alt="Service"
//                                       className="img-fluid"
//                                       style={{ maxHeight: "100px" }}
//                                     />
//                                   </div>
//                                 )}
//                               </div>
//                             ))}
//                             <button
//                               type="button"
//                               className="site-button button-sm"
//                               onClick={addService}
//                             >
//                               Add Service
//                             </button>
//                           </div>
//                         </div> */
// }



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
// import { fetchVendorProfile, updateVendorData } from "@/redux/slices/vendorSlice";
import { showToastError, showToastSuccess } from "../utils/toastify";
import VendorHeader from "../markup/Layout/VendorHeader";
import VendorCompanySideBar from "./Vendorsidebar";
import TextEditor from "../common/TextEditor";
import Footer from "../markup/Layout/Footer";
import { fetchVendorProfile, updateVendorData } from "../store/slice/VendorAuthSlice";

function Vendorprofile() {
  const dispatch = useDispatch();
  const { vendorDetail, companyDetail, loading, error } = useSelector(
    (state) => state.vendor
  );

  const token = localStorage.getItem("vendorToken");

  // Local form states
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [linkdin, setlinkdin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [googleBusiness, setGoogleBusiness] = useState("");
  const [glassdoor, setGlassdor] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCities, setSelectedCities] = useState("");
  const [industries, setIndustries] = useState([]);

  // 🟢 Fetch Vendor Profile on mount
  useEffect(() => {
    if (token) {
      dispatch(fetchVendorProfile(token));
    }
  }, [dispatch, token]);

  // 🟢 When vendor/company details change, update form fields
  useEffect(() => {
    if (vendorDetail || companyDetail) {
      setCompanyName(companyDetail?.company_name || "");
      setTagline(companyDetail?.tagline || "");
      setEmail(vendorDetail?.email || "");
      setNumber(vendorDetail?.phone || "");
      setWebsite(companyDetail?.website_link || "");
      setFoundedYear(companyDetail?.founded_date || "");
      setDescription(companyDetail?.about || "");
      setSelectedCountry(companyDetail?.country_id || "");
      setSelectedStates(companyDetail?.state_id || "");
      setSelectedCities(companyDetail?.city_id || "");
      setAddress(companyDetail?.address || "");
      setlinkdin(companyDetail?.linkedin_link || "");
      setTwitter(companyDetail?.twitter_link || "");
      setGoogleBusiness(companyDetail?.google_link || "");
      setGlassdor(companyDetail?.facebook_link || "");
      setIndustry(companyDetail?.company_industry_id || "");
    }
  }, [vendorDetail, companyDetail]);

  // 🟢 Fetch supporting data (countries, industries)
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [countriesRes, industryRes] = await Promise.all([
          fetch("https://apiwl.novajobs.us/api/admin/countries", {
            headers: { Authorization: token },
          }),
          fetch("https://apiwl.novajobs.us/api/admin/company-industry", {
            headers: { Authorization: token },
          }),
        ]);

        const countriesData = await countriesRes.json();
        const industryData = await industryRes.json();
        setCountries(countriesData.data || []);
        setIndustries(industryData.data || []);
      } catch (err) {
        console.log(err);
        showToastError("Failed to load dropdown data");
      }
    };

    if (token) fetchDropdownData();
  }, [token]);

  // 🟢 Fetch states and cities dynamically
  useEffect(() => {
    if (!selectedCountry) return;
    fetch(`https://apiwl.novajobs.us/api/admin/stats/${selectedCountry}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => setStates(res.data || []))
      .catch(() => showToastError("Failed to load states"));
  }, [selectedCountry, token]);

  useEffect(() => {
    if (!selectedStates) return;
    fetch(`https://apiwl.novajobs.us/api/admin/cities/${selectedStates}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((res) => setCities(res.data || []))
      .catch(() => showToastError("Failed to load cities"));
  }, [selectedStates, token]);

  // 🟢 Update Company Data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !companyName ||
      !email ||
      !industry ||
      !selectedCountry ||
      !selectedStates ||
      !selectedCities
    ) {
      showToastError("Please fill out all required fields.");
      return;
    }

    const payload = {
      company_name: companyName,
      about: description.trim(),
      email,
      tagline,
      website_link: website,
      founded_date: foundedYear,
      phone: number,
      country_id: Number(selectedCountry),
      state_id: Number(selectedStates),
      city_id: Number(selectedCities),
      address,
      facebook_link: glassdoor,
      twitter_link: twitter,
      google_link: googleBusiness,
      linkedin_link: linkdin,
      company_industry_id: Number(industry),
    };

    dispatch(updateVendorData({ token, payload }))
      .unwrap()
      .then(() => {
        showToastSuccess("Company profile updated successfully!");
      })
      .catch((err) => {
        showToastError(err || "Update failed");
      });
  };

  return (
    <>
      <VendorHeader />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="d-flex">
                <VendorCompanySideBar active="company" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx submit-resume">
                    <div className="job-bx-title clearfix mb-4">
                      <h5 className="font-weight-700 text-uppercase">
                        Company Profile
                      </h5>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {/* Company Name */}
                        <div className="col-lg-6 mb-3">
                          <label>Company Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                          />
                        </div>

                        {/* Tagline */}
                        <div className="col-lg-6 mb-3">
                          <label>Tagline</label>
                          <input
                            type="text"
                            className="form-control"
                            value={tagline}
                            onChange={(e) => setTagline(e.target.value)}
                          />
                        </div>

                        {/* Email */}
                        <div className="col-lg-6 mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            readOnly
                          />
                        </div>

                        {/* Phone (non-editable) */}
                        <div className="col-lg-6 mb-3">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            className="form-control"
                            value={number}
                            readOnly
                          />
                        </div>

                        {/* Website */}
                        <div className="col-lg-6 mb-3">
                          <label>Website</label>
                          <input
                            type="text"
                            className="form-control"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>

                        {/* Founded Year */}
                        <div className="col-lg-6 mb-3">
                          <label>Founded Year</label>
                          <input
                            type="number"
                            className="form-control"
                            value={foundedYear}
                            onChange={(e) => setFoundedYear(e.target.value)}
                          />
                        </div>

                        {/* Industry */}
                        <div className="col-lg-12 mb-3">
                          <label>Industry</label>
                          <Form.Control
                            as="select"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            required
                          >
                            <option value="">Select Industry</option>
                            {industries.map((ind) => (
                              <option key={ind.id} value={ind.id}>
                                {ind.name}
                              </option>
                            ))}
                          </Form.Control>
                        </div>

                        {/* Description */}
                        <div className="col-lg-12 mb-3">
                          <label>Company Description</label>
                          <TextEditor value={description} onChange={setDescription} />
                        </div>

                        {/* Country */}
                        <div className="col-lg-4 mb-3">
                          <label>Country</label>
                          <Form.Control
                            as="select"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            required
                          >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </Form.Control>
                        </div>

                        {/* State */}
                        <div className="col-lg-4 mb-3">
                          <label>State</label>
                          <Form.Control
                            as="select"
                            value={selectedStates}
                            onChange={(e) => setSelectedStates(e.target.value)}
                            required
                          >
                            <option value="">Select State</option>
                            {states.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </Form.Control>
                        </div>

                        {/* City */}
                        <div className="col-lg-4 mb-3">
                          <label>City</label>
                          <Form.Control
                            as="select"
                            value={selectedCities}
                            onChange={(e) => setSelectedCities(e.target.value)}
                            required
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                          </Form.Control>
                        </div>

                        {/* LinkedIn */}
                        <div className="col-lg-12 mb-3">
                          <label>LinkedIn Profile</label>
                          <input
                            type="text"
                            className="form-control"
                            value={linkdin}
                            onChange={(e) => setlinkdin(e.target.value)}
                          />
                        </div>

                        {/* Submit */}
                        <div className="col-lg-12 text-center mt-4">
                          <button
                            type="submit"
                            disabled={loading}
                            className="site-button w-50 font-weight-bold"
                          >
                            {loading ? "Saving..." : "Save Company Profile"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Vendorprofile;
