// import React, { useEffect, useState } from "react";
// import { Form } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setBrowseCandidateData,
//   setBrowseCandidateValues,
// } from "../../store/reducers/browseCandidateSlice";
// import axios from "axios";import { showToastError } from "../../utils/toastify";
// import { FaSearch } from "react-icons/fa";

// const Jobfindbox = () => {
//   const [experienceValue, setExperienceValue] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);
//   const [salaryValue, setSalaryValue] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);

//   const token = localStorage.getItem("employeeLoginToken");

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://apiwl.novajobs.us/api/employeer/experience-level",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         console.log(response.data.data, "experience");
//         setExperienceValue(response.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://apiwl.novajobs.us/api/employeer/salary-range",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((res) => {
//         console.log(res.data.data, "salary");
//         setSalaryValue(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const dispatch = useDispatch();
//   const browseCandidateValues = useSelector(
//     (state) => state.browseCandidateSlice.browseCandidateValues
//   );
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(
//       setBrowseCandidateValues({ ...browseCandidateValues, [name]: value })
//     );
//   };
//   const baseUrl = "https://apiwl.novajobs.us/api/employeer/job-seekers";

//   const params = new URLSearchParams();

//   if (browseCandidateValues.experience) {
//     params.append("experience_in_month", browseCandidateValues.experience);
//   }

//   if (browseCandidateValues.salary) {
//     params.append("salary_range", browseCandidateValues.salary);
//   }

//   if (localStorage.getItem("profession_title")) {
//     params.append("title_keywords", localStorage.getItem("profession_title"));
//   } else if (browseCandidateValues.search_input) {
//     params.append("title_keywords", browseCandidateValues.search_input);
//   }

//   // if (browseCandidateValues.education) {
//   //   params.append("education", browseCandidateValues.education);
//   // }

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
//         dispatch(setBrowseCandidateData(response.data.data));
//         // setShowSkeleton(false);
//         console.log(response, "custom data");
//       })
//       .catch((err) => {
//         console.log(err, "custom err");
//       });
//   };

//   useEffect(() => {
//     if (localStorage.getItem("profession_title") !== null) {
//       handleGetReq();
//     }
//     return () => {
//       localStorage.removeItem("profession_title");
//     };
//   }, []);

//   return (
//     <div className="section-full browse-job-find">
//       <div className="container">
//         <div className="find-job-bx">
//           <div className="dezPlaceAni p-t50 p-b20">
//             <div className="d-flex justify-content-center ">
//               <div className="col-lg-4 col-md-6">
//                 <div className="form-group">
//                   <label htmlFor="education"></label>
//                   <div className="input-group">
//                     <select
//                       type="text"
//                       className="form-control"
//                       id="education"
//                       name="education"
//                       onChange={handleChange}
//                       value={browseCandidateValues.education}
//                       autoComplete="false"
//                     >
//                       <option value="">Choose Education</option>
//                     </select>
//                     {/* <div className="input-group-append">
//                       <span className="input-group-text">
//                         <i className="fa fa-search"></i>
//                       </span>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3 col-md-6">
//                 <div className="form-group">
//                   <label htmlFor="experience"></label>
//                   <div className="input-group">
//                     <select
//                       type="text"
//                       className="form-control"
//                       id="experience"
//                       name="experience"
//                       onChange={handleChange}
//                       value={browseCandidateValues.experience}
//                       autoComplete="false"
//                     >
//                       <option value="">Choose Experience</option>
//                       {experienceValue.map((item, index) => {
//                         return (
//                           <option
//                             className="form-control"
//                             key={index}
//                             value={item.id}
//                           >
//                             {item.name}
//                           </option>
//                         );
//                       })}
//                     </select>
//                     {/* <div className="input-group-append">
//                       <span className="input-group-text">
//                         <i className="fa fa-map-marker"></i>
//                       </span>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-6">
//                 <div className="form-group">
//                   <label htmlFor="salary"></label>
//                   <div className="input-group">
//                     <select
//                       type="text"
//                       className="form-control"
//                       id="salary"
//                       name="salary"
//                       onChange={handleChange}
//                       value={browseCandidateValues.salary}
//                       autoComplete="false"
//                     >
//                       <option value="">Choose Your Salary</option>
//                       {salaryValue.map((item, index) => {
//                         return (
//                           <option key={index} value={item.id}>
//                             {item.name}
//                           </option>
//                         );
//                       })}
//                     </select>
//                     {/* <div className="input-group-append">
//                       <span className="input-group-text">
//                         <i className="fa fa-dollar"></i>
//                       </span>
//                     </div> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="row d-flex justify-content-center mb-3 "
//               style={{ gap: "12px" }}
//             >
//               <div
//                 className=" w-75 d-flex flex-column   p-2 "
//                 style={{
//                   backgroundColor: "#f5f5f5",
//                   alignItems: "center",
//                 }}
//               >
//                 <input
//                   type="text"
//                   name="search_input"
//                   id="search_input"
//                   onChange={handleChange}
//                   value={browseCandidateValues.search_input}
//                   autoComplete="false"
//                   className="w-100 p-2 h-100 bg-transparent border-0 "
//                   placeholder="search here..."
//                   style={{ outline: "none" }}
//                 />
//               </div>
//               <button
//                 onClick={handleGetReq}
//                 className="border-0 site-button d-flex align-items-center "
//                 style={{ cursor: "pointer", outline: "none", gap: "7px" }}
//               >
//                 <FaSearch />
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Jobfindbox;
