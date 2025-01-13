// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Header from "./../Layout/Header";
// import Footer from "./../Layout/Footer";
// import { FaSave, FaSearch, FaTimes } from "react-icons/fa";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Tab, Nav, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";import { showToastError } from "../../utils/toastify";
// import FixedHeader from "../Layout/fixedHeader";
// import {
//   setJobApplicationData,
//   setJobApplicationValues,
// } from "../../store/reducers/jobApplicationSlice";
// import moment from "moment";
// import testImg from "../../images/team/pic1.jpg";
// import "react-quill/dist/quill.snow.css";

// import { submit } from "redux-form";
// import JobPageSkeleton from "../../markup/skeleton/jobPage";
// import TwoBoxWithLinesSkeleton from "../../markup/skeleton/twoBoxLines";
// import { useParams } from "react-router-dom";
// import { setBrowseCandidateData } from "../../store/reducers/browseCandidateSlice";
// function EmployeeJobPage() {
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [show, setShow] = useState(false);
//   const [activeTab, setActiveTab] = useState("contact-info"); // Initial active tab

//   const dispatch = useDispatch();
//   const jobApplicationData = useSelector(
//     (state) => state.jobApplicationSlice.jobApplicationData
//   );
//   const token = localStorage.getItem("employeeLoginToken");

//   const [showSkeleton, setShowSkeleton] = useState(true);

//   const toggleFabJobs = async () => {
//     try {
//       await axios({
//         url: "https://api.novajobs.us/api/jobseeker/job-favorites",
//         method: "POST",
//         headers: { Authorization: token },
//         data: {
//           job_id: selectedJob.job_detail.id,
//         },
//       })
//         .then((res) => {
//           console.log(res);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const browseCandidateData = useSelector(
//     (state) => state.browseCandidateSlice.browseCandidateData
//   );
//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://api.novajobs.us/api/employeer/job-seekers",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         dispatch(setBrowseCandidateData(res.data.data));
//         setShowSkeleton(false);
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   console.log(browseCandidateData, "CANDIDATE");
//   console.log(selectedJob, "selectedJob");

//   // const convertToPlainText = (htmlContent) => {
//   //   const div = document.createElement("div");
//   //   div.innerHTML = htmlContent;
//   //   let plainText = div.innerText || div.textContent || "";
//   //   // Reduce length to 50 words
//   //   plainText = plainText.split(/\s+/).slice(0, 30).join(" ");
//   //   return plainText;
//   // };

//   useEffect(() => {
//     setSelectedJob(browseCandidateData[0]);
//   }, [browseCandidateData]);

//   const handleSelectJob = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleNext = () => {
//     // Update activeTab state based on the current active tab
//     if (activeTab === "contact-info") {
//       setActiveTab("additional-info");
//     } else if (activeTab === "additional-info") {
//       setActiveTab("resume-info");
//     } else if (activeTab === "resume-info") {
//       setActiveTab("immediate-info");
//     }
//   };

//   const handlePrev = () => {
//     // Update activeTab state based on the current active tab
//     if (activeTab === "immediate-info") {
//       setActiveTab("resume-info");
//     } else if (activeTab === "resume-info") {
//       setActiveTab("additional-info");
//     } else if (activeTab === "additional-info") {
//       setActiveTab("contact-info");
//     }
//   };

//   const jobApplicationValues = useSelector(
//     (state) => state.jobApplicationSlice.jobApplicationValues
//   );

//   // console.table(jobApplicationValues, "values");
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "country_id") {
//       const selectedIndex = e.target.selectedIndex;
//       const text = e.target.options[selectedIndex].text;
//       // console.log(text);
//       dispatch(
//         setJobApplicationValues({
//           ...jobApplicationValues,
//           country: text,
//           [name]: value,
//         })
//       );
//       return;
//     }

//     if (name === "city_id") {
//       const selectedIndex = e.target.selectedIndex;
//       const text = e.target.options[selectedIndex].text;
//       // console.log(text);
//       dispatch(
//         setJobApplicationValues({
//           ...jobApplicationValues,
//           city: text,
//           [name]: value,
//         })
//       );
//       return;
//     }

//     if (name === "state_id") {
//       const selectedIndex = e.target.selectedIndex;
//       const text = e.target.options[selectedIndex].text;
//       // console.log(text);
//       dispatch(
//         setJobApplicationValues({
//           ...jobApplicationValues,
//           state: text,
//           [name]: value,
//         })
//       );
//       return;
//     }
//     dispatch(
//       setJobApplicationValues({ ...jobApplicationValues, [name]: value })
//     );
//   };
//   const [countries, setCountries] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const [states, setStates] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const [cities, setCities] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const [workplace_type, setWorkplace_type] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const [experience, setExperience] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const [job_type, setJobType] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const [jobCategories, setJobCategories] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const getJobTyes = async () => {
//     await axios({
//       method: "GET",
//       url: "https://api.novajobs.us/api/jobseeker/job-types",

//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         // console.log(res.data.data, "JOBTYPE");
//         setJobType(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err, "joy");
//       });
//   };

//   const getWorkplaceType = () => {
//     axios({
//       method: "GET",
//       url: "https://api.novajobs.us/api/jobseeker/workplace-types",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         // console.log(response.data.data);
//         setWorkplace_type(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getCountry = () => {
//     axios({
//       method: "GET",
//       url: "https://api.novajobs.us/api/jobseeker/countries",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         let country = response.data.data;
//         setCountries(country);
//       })
//       .catch((err) => {
//         console.log(err);
//         setCities([]);
//       });
//   };

//   const getState = () => {
//     axios({
//       method: "GET",
//       url: `https://api.novajobs.us/api/jobseeker/stats/231`,
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         // console.log(response.data.data, "STATE");
//         setStates(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err, "STATE");
//         setStates([]);
//         setCities([]);
//       });
//   };

//   const getCities = () => {
//     axios({
//       method: "GET",
//       url: `https://api.novajobs.us/api/jobseeker/cities/${jobApplicationValues.state_id}`,
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         // console.log(response, "CITY");
//         setCities(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err, "CITY");
//         setCities([]);
//       });
//   };

//   const getExperience = () => {
//     axios({
//       method: "GET",
//       url: "https://api.novajobs.us/api/jobseeker/experience-level",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         // console.log(response.data.data);
//         setExperience(response.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getCountry();
//     getExperience();
//     getWorkplaceType();
//     getJobTyes();
//   }, []);

//   useEffect(() => {
//     dispatch(
//       setJobApplicationValues({
//         ...jobApplicationValues,
//         state_id: 0,
//         city_id: 0,
//       })
//     );
//     getState();
//   }, [jobApplicationValues.country_id]);

//   useEffect(() => {
//     dispatch(
//       setJobApplicationValues({
//         ...jobApplicationValues,
//         city_id: 0,
//       })
//     );
//     getCities();
//   }, [jobApplicationValues.state_id]);

//   const getSingleCountry = (countryId) => {
//     return countries.find((country) => country.id === countryId)?.name || "";
//   };

//   const getSingleState = (stateId) => {
//     return states.find((state) => state.id === stateId)?.name || "";
//   };
//   const getSingleCity = (cityId) => {
//     return cities.find((city) => city.id === cityId)?.name || "";
//   };
//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://api.novajobs.us/api/jobseeker/job-categories",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         console.log(response.data.data, "jobCategory");
//         setJobCategories(response.data.data);
//       })
//       .catch((err) => console.log(err, "jobCategory"));
//   }, []);

//   const submitApplication = async () => {
//     await axios({
//       url: "https://api.novajobs.us/api/jobseeker/jobs-applied",
//       method: "POST",
//       headers: {
//         Authorization: token,
//       },
//       data: {
//         job_id: selectedJob.job_detail.id,
//       },
//     })
//       .then((res) => {
//         // console.log(res);
//         // fetchJobApplicationData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const selectedLocation = localStorage.getItem("selectedLocation");
//   const title_keyword = localStorage.getItem("title_keyword");
//   const baseUrl = "https://api.novajobs.us/api/jobseeker/job-lists";

//   const params = new URLSearchParams();

//   if (jobApplicationValues.search_input) {
//     params.append("title_keywords", jobApplicationValues.search_input);
//   } else if (title_keyword) {
//     params.append("title_keywords", title_keyword);
//   }

//   if (jobApplicationValues.country_id) {
//     params.append("location", jobApplicationValues.country_id);
//   } else if (selectedLocation) {
//     params.append("location", selectedLocation);
//   }

//   if (jobApplicationValues.workplace_type) {
//     params.append("workplace_type", jobApplicationValues.workplace_type);
//   }

//   if (jobApplicationValues.job_type) {
//     params.append("job_type", jobApplicationValues.job_type);
//   }
//   if (jobApplicationValues.experience_level) {
//     params.append("experience_level", jobApplicationValues.experience_level);
//   }
//   if (jobApplicationValues.jobCategory) {
//     params.append("job_category_id", jobApplicationValues.jobCategory);
//   } else if (localStorage.getItem("jobCategory")) {
//     params.append("job_category_id", localStorage.getItem("jobCategory"));
//   }

//   const url = `${baseUrl}?${params.toString()}`;
//   console.log(url, "this is the url");
//   const handleGetReq = () => {
//     axios({
//       method: "GET",
//       url: url,
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         dispatch(setJobApplicationData(response.data.data));
//         // setShowSkeleton(false);
//         console.log(response, "custom data");
//       })
//       .catch((err) => {
//         console.log(err, "custom err");
//       });
//   };
//   useEffect(() => {
//     if (selectedLocation || title_keyword !== null) {
//       handleGetReq();
//     }
//     return () => {
//       localStorage.removeItem("selectedLocation");
//       localStorage.removeItem("title_keyword");
//     };
//   }, []);

//   return (
//     <>
//       <Header />
//       <FixedHeader />
//       {showSkeleton === true ? (
//         <div className="bg-white w-100 ">
//           <TwoBoxWithLinesSkeleton />
//         </div>
//       ) : (
//         <div className="page-content bg-white">
//           <div className="content-block">
//             <div className="section-full bg-white p-t50 p-b20">
//               <div className="container">
//                 <div className="d-flex justify-content-center align-items-center  ">
//                   <div className="col-lg-2  col-md-5 col-12  ">
//                     <div className="form-group">
//                       {/* <label htmlFor="country_id">Country:</label>
//                       {countries ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           id="country_id"
//                           name="country_id"
//                           onChange={(e) => {
//                             handleChange(e);
//                           }}
//                           value={jobApplicationValues.country_id}
//                         >
//                           <option value="">Select a country</option>
//                           {countries.map((item, index) => {
//                             return (
//                               <option
//                                 key={index}
//                                 value={item.id}
//                                 country={item.name}
//                               >
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null} */}
//                       <label htmlFor="jobCategory">Choose Category</label>
//                       {jobCategories ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           id="jobCategory"
//                           name="jobCategory"
//                           onChange={(e) => {
//                             handleChange(e);
//                           }}
//                           value={jobApplicationValues.jobCategory}
//                         >
//                           <option value="">Select a Category</option>
//                           {jobCategories.map((item, index) => {
//                             return (
//                               <option
//                                 key={index}
//                                 value={item.id}
//                                 country={item.name}
//                               >
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null}
//                     </div>
//                   </div>

//                   <div className="col-lg-2  col-md-5 col-12 ">
//                     <div className="form-group">
//                       <label htmlFor="state_id">State:</label>
//                       {states ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           id="state_id"
//                           name="state_id"
//                           onChange={handleChange}
//                           value={jobApplicationValues.state_id}
//                         >
//                           <option value="">Select a State</option>
//                           {states.map((item, index) => {
//                             return (
//                               <option key={index} value={item.id}>
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null}
//                     </div>
//                   </div>

//                   <div className="col-lg-2  col-md-5 col-12  ">
//                     <div className="form-group">
//                       <label htmlFor="city_id">City:</label>
//                       {cities ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           // placeholder="London"
//                           id="city_id"
//                           name="city_id"
//                           onChange={handleChange}
//                           value={jobApplicationValues.city_id}
//                         >
//                           <option value="">Select A City</option>

//                           {cities.map((item, index) => {
//                             return (
//                               <option key={index} value={item.id}>
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null}
//                     </div>
//                   </div>

//                   <div className="col-lg-2  col-md-5 col-12 ">
//                     <div className="form-group">
//                       <label htmlFor="workplace_type">WorkPlace Type:</label>
//                       {workplace_type ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           // placeholder="London"
//                           id="workplace_type"
//                           name="workplace_type"
//                           onChange={handleChange}
//                           value={jobApplicationValues.workplace_type}
//                         >
//                           <option value="">Select WorkPlace Type</option>
//                           {workplace_type.map((item, index) => {
//                             return (
//                               <option key={index} value={item.id}>
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-lg-2  col-md-5 col-12 ">
//                     <div className="form-group">
//                       <label htmlFor="job_type">Job Type:</label>
//                       {job_type ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           // placeholder="London"
//                           id="job_type"
//                           name="job_type"
//                           onChange={handleChange}
//                           value={jobApplicationValues.job_type}
//                         >
//                           <option value="">Select Job Type</option>
//                           {job_type.map((item, index) => {
//                             return (
//                               <option key={index} value={item.id}>
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-lg-2  col-md-5 col-12  ">
//                     <div className="form-group">
//                       <label htmlFor="experience_level">
//                         Experience Level:
//                       </label>
//                       {experience ? (
//                         <select
//                           type="text"
//                           className="form-control"
//                           // placeholder="London"
//                           id="experience_level"
//                           name="experience_level"
//                           onChange={handleChange}
//                           value={jobApplicationValues.experience_level}
//                         >
//                           <option value="">Select Experience Level</option>
//                           {experience.map((item, index) => {
//                             return (
//                               <option key={index} value={item.id}>
//                                 {item.name}
//                               </option>
//                             );
//                           })}
//                         </select>
//                       ) : null}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="container">
//                 <div
//                   className="row d-flex justify-content-center "
//                   style={{ gap: "12px" }}
//                 >
//                   <div
//                     className=" w-75 d-flex flex-column   p-2 "
//                     style={{
//                       backgroundColor: "#f5f5f5",
//                       alignItems: "center",
//                     }}
//                   >
//                     <input
//                       type="text"
//                       name="search_input"
//                       id="search_input"
//                       onChange={handleChange}
//                       value={jobApplicationValues.search_input}
//                       autoComplete="false"
//                       className="w-100 p-2 h-100 bg-transparent border-0 "
//                       placeholder="search here..."
//                       style={{ outline: "none" }}
//                     />
//                   </div>
//                   <button
//                     onClick={handleGetReq}
//                     className="border-0 site-button d-flex align-items-center "
//                     style={{ cursor: "pointer", outline: "none", gap: "7px" }}
//                   >
//                     <FaSearch />
//                     Search
//                   </button>
//                 </div>
//               </div>
//               <div className="container">
//                 <div className="row">
//                   <div className="col-xl-4 col-lg-5 m-b30">
//                     <div className="sticky-top">
//                       {jobApplicationData ? (
//                         <div className="candidate-info company-info">
//                           <ul
//                             className="job-list-container"
//                             style={{
//                               maxHeight: "calc(100vh - 200px)",
//                               overflowY: "auto",
//                               boxShadow: "0 0 10px 0 rgba(0, 24, 128, 0.1)",
//                             }}
//                           >
//                             {browseCandidateData.map((item, index) => (
//                               <div key={index}>
//                                 <li>
//                                   <Link
//                                     to="#"
//                                     onClick={() => handleSelectJob(item)}
//                                   >
//                                     <div
//                                       style={{
//                                         display: "flex",
//                                         width: "100%",
//                                         position: "relative",
//                                       }}
//                                     >
//                                       <div
//                                         style={{
//                                           width: "30%",
//                                         }}
//                                       >
//                                         <img
//                                           src={testImg}
//                                           alt=""
//                                           style={{
//                                             width: "80px",
//                                             height: "80px",
//                                           }}
//                                         />
//                                       </div>
//                                       <div
//                                         style={{
//                                           width: "80%",
//                                           overflow: "hidden",
//                                         }}
//                                       >
//                                         {item.jobskkers_detail.first_name ||
//                                           (item.jobskkers_detail.last_name && (
//                                             <p
//                                               className="mb-0"
//                                               style={{
//                                                 color: "#1c2957",
//                                                 fontSize: "20px",
//                                               }}
//                                             >
//                                               {item.jobskkers_detail.first_name}{" "}
//                                               {item.jobskkers_detail.last_name}
//                                             </p>
//                                           ))}
//                                         {item.jobskkers_detail.skills_arr ? (
//                                           <div
//                                             className="d-flex flex-row mb-0 "
//                                             style={{ gap: "7px" }}
//                                           >
//                                             {item.jobskkers_detail.skills_arr.map(
//                                               (item, index) => (
//                                                 <p
//                                                   className="mb-0 "
//                                                   key={index}
//                                                 >
//                                                   {item}
//                                                 </p>
//                                               )
//                                             )}
//                                           </div>
//                                         ) : null}
//                                         <div
//                                           className=" gap-0 align-items-center joblist"
//                                           style={{
//                                             gap: "0px",
//                                             height: "auto",
//                                           }}
//                                         >
//                                           {item.jobskkers_detail.email && (
//                                             <p
//                                               style={{
//                                                 margin: "0px",
//                                               }}
//                                             >
//                                               {item.jobskkers_detail.email}
//                                             </p>
//                                           )}
//                                           {item.jobskkers_detail.phone && (
//                                             <p
//                                               style={{
//                                                 margin: "0px",
//                                               }}
//                                             >
//                                               {item.jobskkers_detail.phone}
//                                             </p>
//                                           )}
//                                           <div
//                                             className="d-flex "
//                                             style={{
//                                               justifyContent: "space-between",
//                                             }}
//                                           >
//                                             <div>
//                                               {item.jobskkers_detail
//                                                 .country_id && (
//                                                 <p
//                                                   style={{
//                                                     margin: "0px",
//                                                   }}
//                                                 >
//                                                   {getSingleCountry(
//                                                     item.jobskkers_detail
//                                                       .country_id
//                                                   )}
//                                                 </p>
//                                               )}
//                                             </div>
//                                             <div>
//                                               {item.jobskkers_detail
//                                                 .state_id && (
//                                                 <p
//                                                   style={{
//                                                     margin: "0px",
//                                                   }}
//                                                 >
//                                                   {getSingleState(
//                                                     item.jobskkers_detail
//                                                       .state_id
//                                                   )}
//                                                 </p>
//                                               )}
//                                             </div>
//                                             <div>
//                                               {item.jobskkers_detail
//                                                 .city_id && (
//                                                 <p
//                                                   style={{
//                                                     margin: "0px",
//                                                   }}
//                                                 >
//                                                   {getSingleCity(
//                                                     item.jobskkers_detail
//                                                       .city_id
//                                                   )}
//                                                 </p>
//                                               )}
//                                             </div>
//                                           </div>
//                                           <div>
//                                             {item.jobskkers_detail
//                                               .created_at && (
//                                               <p
//                                                 style={{
//                                                   margin: "0px",
//                                                   fontWeight: "600",
//                                                 }}
//                                               >
//                                                 {moment(
//                                                   item.jobskkers_detail
//                                                     .created_at
//                                                 ).format("YYYY-MM-DD")}
//                                               </p>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 </li>
//                               </div>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div className="col-xl-8 col-lg-7 m-b30 job-bx ">
//                     {selectedJob && (
//                       <div>
//                         <div className="candidate-title">
//                           <Link to="#">
//                             <h3 className="mb-1">
//                               {selectedJob.jobskkers_detail.first_name}{" "}
//                               {selectedJob.jobskkers_detail.last_name}
//                             </h3>
//                           </Link>
//                           <div className="job-details-content">
//                             {selectedJob.jobskkers_detail.email &&
//                               selectedJob.jobskkers_detail.phone && (
//                                 <p className="mb-0">
//                                   {selectedJob.jobskkers_detail.email} |{" "}
//                                   {selectedJob.jobskkers_detail.phone}
//                                 </p>
//                               )}
//                             {selectedJob.jobskkers_detail.skills_arr ? (
//                               <div className="d-flex" style={{ gap: "7px" }}>
//                                 {selectedJob.jobskkers_detail.skills_arr.map(
//                                   (item, index) => (
//                                     <p key={index} className="mb-5">
//                                       {item}
//                                     </p>
//                                   )
//                                 )}
//                               </div>
//                             ) : null}
//                             {selectedJob.jobskkers_detail.city_id ||
//                             selectedJob.jobskkers_detail.state_id ||
//                             selectedJob.jobskkers_detail.country_id ? (
//                               <p className="mb-0 ">
//                                 {getSingleCity(
//                                   selectedJob.jobskkers_detail.city_id
//                                 )}{" "}
//                                 {getSingleState(
//                                   selectedJob.jobskkers_detail.state_id
//                                 )}{" "}
//                                 {getSingleCountry(
//                                   selectedJob.jobskkers_detail.country_id
//                                 )}
//                               </p>
//                             ) : null}
//                           </div>
//                           {selectedJob.jobskkers_detail.profileSummaryValue && (
//                             <p className="mb-1">
//                               <div
//                                 className="ql-editor"
//                                 style={{
//                                   fontSize: "13px",
//                                 }}
//                                 dangerouslySetInnerHTML={{
//                                   __html:
//                                     selectedJob.jobskkers_detail
//                                       .profileSummaryValue,
//                                 }}
//                               />
//                             </p>
//                           )}
//                         </div>
//                         {selectedJob.jobskkers_detail.created_at && (
//                           <p className="mb-0 ">
//                             Posted{" "}
//                             {moment(
//                               selectedJob.jobskkers_detail.created_at
//                             ).fromNow()}
//                           </p>
//                         )}

//                         {selectedJob.jobskkers_detail
//                           .resume_score_percentage ? (
//                           <p>
//                             {
//                               selectedJob.jobskkers_detail
//                                 .resume_score_percentage
//                             }
//                           </p>
//                         ) : null}
//                         {/* <div className="d-flex justify-content-start align-items-center">
//                           {selectedJob.job_detail.is_job_applied ? (
//                             <button
//                               className="radius-xl site-button"
//                               // onClick={handleShow}
//                             >
//                               View Status
//                             </button>
//                           ) : (
//                             <button
//                               className="radius-xl site-button"
//                               onClick={handleShow}
//                             >
//                               Apply
//                             </button>
//                           )}
//                           <Modal
//                             show={show}
//                             onHide={handleClose}
//                             backdrop="static"
//                             keyboard={false}
//                           >
//                             <Modal.Header
//                               closeButton
//                               style={{ backgroundColor: "#ffff" }}
//                               className="mt-4"
//                             >
//                               <Modal.Title style={{ color: "#000" }}>
//                                 <p> Apply to {selectedJob.company}</p>
//                               </Modal.Title>
//                             </Modal.Header>

//                             <Modal.Footer>
//                               {activeTab !== "contact-info" && (
//                                 <button
//                                   className="site-button mr-2"
//                                   onClick={handlePrev}
//                                 >
//                                   Previous
//                                 </button>
//                               )}
//                               {activeTab === "contact-info" && (
//                                 <button
//                                   className="site-button"
//                                   onClick={() => {
//                                     handleClose();
//                                     submitApplication();
//                                   }}
//                                   // onClick={handleClose}
//                                 >
//                                   Submit
//                                 </button>
//                               )}
//                             </Modal.Footer>
//                           </Modal>

//                           <label className="like-btn">
//                             <input
//                               type="checkbox"
//                               defaultChecked={
//                                 selectedJob.job_detail.is_job_favorite
//                               }
//                               name={selectedJob.job_detail.id}
//                               onClick={() => {
//                                 toggleFabJobs();
//                               }}
//                             />
//                             <span className="checkmark"></span>
//                           </label>
//                         </div> */}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </>
//   );
// }

// export default EmployeeJobPage;

import React from "react";

const EmployeeJobPage = () => {
  return <div>EmployeeJobPage</div>;
};

export default EmployeeJobPage;
