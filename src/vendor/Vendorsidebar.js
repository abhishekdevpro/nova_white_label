// // import axios from "axios";
// // import { showToastError, showToastSuccess } from "../utils/toastify";
// // import React, { useEffect } from "react";
// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faCloudUploadAlt,
// //   faFileDownload,
// // } from "@fortawesome/free-solid-svg-icons"; // Import the specific icons you need
// // import {
// //   setPostAJobData,
// //   setSkillsData,
// // } from "../store/reducers/postAJobSlice";
// // import { fetchCompanyInfo } from "../store/thunkFunctions/companyFunction";
// // import "../css/profilesidebar.css";
// // import { Navigate } from "react-router-dom";
// // import { Settings } from "lucide-react";

// // const VendorCompanySideBar = ({ active }) => {
// //   const token = localStorage.getItem("vendorToken");
// //   //   const [res.data.data, setres.data.dataa] = useState({})

// //   const handleLogout = () => {
// //     // Clear authentication token or perform necessary logout actions
// //     localStorage.removeItem("vendorToken");
// //     // Redirect to admin login screen
// //     <Navigate to="/vendor/login" />;
// //     return;
// //   };

// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [logo, setLogo] = useState("");
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const postJob = async () => {
// //     await axios({
// //       url: "https://apiwl.novajobs.us/api/admin/job-post",
// //       method: "POST",
// //       headers: {
// //         Authorization: token,
// //       },
// //     })
// //       .then((res) => {
// //         console.log(res.data.data, "job");
// //         // setres.data.dataa(res.data.data);
// //         dispatch(
// //           setPostAJobData({
// //             jobTitle: res.data.data.job_title,
// //             company: res.data.data.country_id,
// //             workplaceType: res.data.data.workplace_type_id,
// //             // location: res.data.data.,
// //             jobType: res.data.data.job_type_id,
// //             description: res.data.data.job_description,
// //             // education: res.data.data.,
// //             // qualificationSetting: res.data.data.,
// //             selectedCity: res.data.data.city_id,
// //             selectedState: res.data.data.state_id,
// //             selectedCountry: res.data.data.country_id,
// //           })
// //         );
// //         // dispatch(setSkillsData(res.data.data.skills_arr))
// //         navigate(`/vendor/vendorcomponypostjobs/${res.data.data.id}`);
// //       })
// //       .catch((err) => {
// //         console.log(err, "joy");
// //       });
// //   };

// //   const getLogo = async () => {
// //     try {
// //       const response = await axios({
// //         method: "get",
// //         url: "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
// //         headers: {
// //           Authorization: token,
// //         },
// //       });
// //       setLogo(`${response.data.data.company_detail.logo}`);
// //     } catch (error) {
// //       console.error("Error fetching logo:", error);
// //       // Handle error if necessary
// //     }
// //   };

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   useEffect(() => {
// //     getLogo(); // Fetch logo on component mount
// //   }, []); // Empty dependency array ensures it runs only once

// //   const companyData = useSelector(
// //     (state) => state.companyDataSlice.companyData
// //   );
// //   let companyDetail = companyData?.company_detail;

// //   console.log("compaysidebardetail", companyDetail);

// //   const [file, setFile] = useState([]);
// //   const handleImageChange = (e) => {
// //     const img = e.target.files[0];
// //     const url = URL.createObjectURL(img);
// //     setFile({
// //       file: img,
// //       url: url,
// //     });
// //   };
// //   const formData = new FormData();
// //   formData.append("logo", file?.file);
// //   const handleUpdateCompanyLogo = (e) => {
// //     e.preventDefault();
// //     axios({
// //       method: "PUT",
// //       url: "https://apiwl.novajobs.us/api/admin/company-logo",
// //       headers: {
// //         Authorization: token,
// //       },
// //       data: formData,
// //     })
// //       .then((res) => {
// //         console.log(res);
// //         showToastSuccess(res?.data?.message);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   };
// //   return (
// //     <>
// //       <button className="sidebar-toggle" onClick={toggleSidebar}>
// //         ☰
// //       </button>
// //       <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
// //         <div className="">
// //
// //           <div className="sticky-top">
// //             <div className="candidate-info company-info">
// //               <div className="candidate-detail text-center">
// //                 <div className="canditate-des">
// //                   <Link to={"#"}>
// //                     {file?.url ? (
// //                       <img
// //                         className="img-fluid"
// //                         alt=""
// //                         src={file?.url}
// //                         style={{
// //                           width: "100%",
// //                           height: "100%",
// //                           aspectRatio: 1,
// //                           backgroundImage: "fit",
// //                         }}
// //                       />
// //                     ) : (
// //                       <img
// //                         className="img-fluid"
// //                         alt=""
// //                         src={`https://apiwl.novajobs.us${logo}`}
// //                         style={{
// //                           width: "100%",
// //                           height: "100%",
// //                           aspectRatio: 1,
// //                         }}
// //                       />
// //                     )}
// //                   </Link>
// //                   <div
// //                     className="upload-link"
// //                     title="update"
// //                     data-toggle="tooltip"
// //                     data-placement="right"
// //                   >
// //                     <input
// //                       type="file"
// //                       className="update-flie"
// //                       name="file"
// //                       id="file"
// //                       onChange={handleImageChange}
// //                     />
// //                     <i className="fa fa-pencil"></i>
// //                   </div>
// //                 </div>
// //               </div>
// //               {console.log(companyDetail?.company_name, "datahi")}
// //               <div className="candidate-title text-center candidate-detail text-break">
// //                 <h4 className="m-b5">
// //                   <Link to={"#"}>{companyDetail?.company_name}</Link>
// //                 </h4>
// //                 {file?.url ? (
// //                   <button
// //                     onClick={handleUpdateCompanyLogo}
// //                     className="site-button"
// //                   >
// //                     Update
// //                   </button>
// //                 ) : null}
// //               </div>
// //               <ul>
// //                 <li>
// //                   <Link
// //                     to={"/vendor/vendorplan"}
// //                     className={active === "vendorplan" ? "" : null}
// //                   >
// //                     <i className="fa fa-user-o" aria-hidden="true"></i>
// //                     <span>Plan</span>
// //                   </Link>
// //                 </li>
// //                 {/* <li>
// //                   <Link
// //                     className={active === "form" ? "active" : null}
// //                     to={"/vendor/form"}
// //                   >
// //                     <i className="fa fa-random" aria-hidden="true"></i>
// //                     <span>White Label Form</span>
// //                   </Link>
// //                 </li> */}
// //                 <li>
// //                   <Link
// //                     className={active === "lading" ? "active" : null}
// //                     to={"/white-label"}
// //                   >
// //                     <i className="fa fa-random" aria-hidden="true"></i>
// //                     <span>White Label Landing</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to={"/vendor/vendorprofile"}
// //                     className={active === "company" ? "active" : null}
// //                   >
// //                     <i className="fa fa-user-o" aria-hidden="true"></i>
// //                     <span>Company Profile</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     className={
// //                       active === "vendorcomponypostjobs" ? "active" : null
// //                     }
// //                     onClick={postJob}
// //                     // to={"/vendor/vendorcomponypostjobs"}
// //                   >
// //                     <i className="fa fa-file-text-o" aria-hidden="true"></i>
// //                     <span>Post A Job</span>
// //                   </Link>
// //                 </li>
// //                 {/* <li>
// //                   <Link
// //                     className={active === "transactions" ? "active" : null}
// //                     to={"/vendor/vendorwallet"}
// //                   >
// //                     <i className="fa fa-random" aria-hidden="true"></i>
// //                     <span>Wallet</span>
// //                   </Link>
// //                 </li> */}

// //                 <li>
// //                   <Link
// //                     to={"/vendor/vendorcompanymanage/jobs"}
// //                     className={
// //                       active === "company-manage-job" ? "active" : null
// //                     }
// //                   >
// //                     <i className="fa fa-briefcase" aria-hidden="true"></i>
// //                     <span>Manage jobs</span>
// //                   </Link>
// //                 </li>

// //                 <li>
// //                   <Link
// //                     to={"/vendor/vendorbulkuploadjobopeneing"}
// //                     className={
// //                       active === "vendorbulkuploadjobopeneing" ? "active" : null
// //                     }
// //                   >
// //                     <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
// //                     <span>upload bulk job opening</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to={"/vendor/vendorbulkuploadjobseeker"}
// //                     className={
// //                       active === "vendorbulkuploadjobseeker" ? "active" : null
// //                     }
// //                   >
// //                     <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
// //                     <span>upload bulk jobseeker</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to={"/vendor/editors"}
// //                     className={active === "editors" ? "active" : null}
// //                   >
// //                     <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
// //                     <span>Vendor Website</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to={"/vendor/vendorchangepasswordpage"}
// //                     className={
// //                       active === "jobs-change-password" ? "active" : null
// //                     }
// //                   >
// //                     <i className="fa fa-key" aria-hidden="true"></i>
// //                     <span>Change Password</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link
// //                     to={"/vendor/setting"}
// //                     className={
// //                       active === "setting" ? "active" : null
// //                     }
// //                   >
// //                     <Settings aria-hidden="true"/>
// //                     <span>Settings</span>
// //                   </Link>
// //                 </li>
// //                 <li>
// //                   <Link to={"/vendor/login"}>
// //                     <i className="fa fa-sign-out" aria-hidden="true"></i>
// //                     <span onClick={handleLogout}>Log Out</span>
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default VendorCompanySideBar;
// import { useState, useEffect } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import axios from "axios"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons"
// import { Settings } from "lucide-react"
// import { setPostAJobData } from "../store/reducers/postAJobSlice"
// // Assuming you have this action

// const VendorCompanySideBar = ({ active }) => {
//   const token = localStorage.getItem("vendorToken")
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [logo, setLogo] = useState("")
//   const [myPortalOpen, setMyPortalOpen] = useState(false)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const handleLogout = () => {
//     localStorage.removeItem("vendorToken")
//     navigate("/vendor/login")
//   }

//   const postJob = async () => {
//     try {
//       const res = await axios({
//         url: "https://apiwl.novajobs.us/api/admin/job-post",
//         method: "POST",
//         headers: {
//           Authorization: token,
//         },
//       })
//       console.log(res.data.data, "job")
//       dispatch(
//         setPostAJobData({
//           jobTitle: res.data.data.job_title,
//           company: res.data.data.country_id,
//           workplaceType: res.data.data.workplace_type_id,
//           jobType: res.data.data.job_type_id,
//           description: res.data.data.job_description,
//           selectedCity: res.data.data.city_id,
//           selectedState: res.data.data.state_id,
//           selectedCountry: res.data.data.country_id,
//         }),
//       )
//       navigate(`/vendor/vendorcomponypostjobs/${res.data.data.id}`)
//     } catch (err) {
//       console.log(err, "joy")
//     }
//   }

//   const getLogo = async () => {
//     try {
//       const response = await axios({
//         method: "get",
//         url: "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
//         headers: {
//           Authorization: token,
//         },
//       })
//       setLogo(`${response.data.data.company_detail.logo}`)
//     } catch (error) {
//       console.error("Error fetching logo:", error)
//     }
//   }

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen)
//   }

//   const toggleMyPortal = () => {
//     setMyPortalOpen(!myPortalOpen)
//   }

//   useEffect(() => {
//     getLogo()
//   }, [token]) // Added token as dependency

//   const companyData = useSelector((state) => state.companyDataSlice.companyData)
//   const companyDetail = companyData?.company_detail

//   const [file, setFile] = useState([])
//   const handleImageChange = (e) => {
//     const img = e.target.files[0]
//     const url = URL.createObjectURL(img)
//     setFile({
//       file: img,
//       url: url,
//     })
//   }

//   const handleUpdateCompanyLogo = (e) => {
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append("logo", file?.file)
//     axios({
//       method: "PUT",
//       url: "https://apiwl.novajobs.us/api/admin/company-logo",
//       headers: {
//         Authorization: token,
//       },
//       data: formData,
//     })
//       .then((res) => {
//         console.log(res)
//         showToastSuccess(res?.data?.message)
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }

//   const showToastSuccess = (message) => {
//     toast.success(message, {
//       position: "top-right",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     })
//   }

//   return (
//     <>
//       <button className="sidebar-toggle" onClick={toggleSidebar}>
//         ☰
//       </button>
//       <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//         <div className="">
//
//           <div className="sticky-top">
//             <div className="candidate-info company-info">
//               <div className="candidate-detail text-center">
//                 <div className="canditate-des">
//                   <Link to={"#"}>
//                     {file?.url ? (
//                       <img
//                         className="img-fluid"
//                         alt=""
//                         src={file?.url || "/placeholder.svg"}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           aspectRatio: 1,
//                           backgroundImage: "fit",
//                         }}
//                       />
//                     ) : (
//                       <img
//                         className="img-fluid"
//                         alt=""
//                         src={`https://apiwl.novajobs.us${logo}`}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           aspectRatio: 1,
//                         }}
//                       />
//                     )}
//                   </Link>
//                   <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
//                     <input type="file" className="update-flie" name="file" id="file" onChange={handleImageChange} />
//                     <i className="fa fa-pencil"></i>
//                   </div>
//                 </div>
//               </div>
//               <div className="candidate-title text-center candidate-detail text-break">
//                 <h4 className="m-b5">
//                   <Link to={"#"}>{companyDetail?.company_name}</Link>
//                 </h4>
//                 {file?.url ? (
//                   <button onClick={handleUpdateCompanyLogo} className="site-button">
//                     Update
//                   </button>
//                 ) : null}
//               </div>
//               <ul>
//                 <li>
//                   <Link to={"/vendor/vendorplan"} className={active === "vendorplan" ? "active" : null}>
//                     <i className="fa fa-user-o" aria-hidden="true"></i>
//                     <span>Plan</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link className={active === "lading" ? "active" : null} to={"/white-label"}>
//                     <i className="fa fa-random" aria-hidden="true"></i>
//                     <span>White Label Landing</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={"/vendor/vendorprofile"} className={active === "company" ? "active" : null}>
//                     <i className="fa fa-user-o" aria-hidden="true"></i>
//                     <span>Company Profile</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="#" onClick={toggleMyPortal}>
//                     <i className="fa fa-user-o" aria-hidden="true"></i>
//                     <span>My Portal</span>
//                     <i className={`fa fa-chevron-${myPortalOpen ? "up" : "down"} float-right`}></i>
//                   </Link>
//                   {myPortalOpen && (
//                     <ul className="sub-menu">
//                       <li>
//                         <Link className={active === "vendorcomponypostjobs" ? "active" : null} onClick={postJob}>
//                           <i className="fa fa-file-text-o" aria-hidden="true"></i>
//                           <span>Post A Job</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to={"/vendor/vendorcompanymanage/jobs"}
//                           className={active === "company-manage-job" ? "active" : null}
//                         >
//                           <i className="fa fa-briefcase" aria-hidden="true"></i>
//                           <span>Manage jobs</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to={"/vendor/vendorbulkuploadjobopeneing"}
//                           className={active === "vendorbulkuploadjobopeneing" ? "active" : null}
//                         >
//                           <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
//                           <span>Upload job opening</span>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to={"/vendor/vendorbulkuploadjobseeker"}
//                           className={active === "vendorbulkuploadjobseeker" ? "active" : null}
//                         >
//                           <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
//                           <span>Upload jobseeker</span>
//                         </Link>
//                       </li>
//                     </ul>
//                   )}
//                 </li>
//                 <li>
//                         <Link
//                           to={"/vendor/vendorbulkuploadjobseeker"}
//                           className={active === "vendorbulkuploadjobseeker" ? "active" : null}
//                         >
//                           <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
//                           <span>Services</span>
//                         </Link>
//                       </li>
//                 <li>
//                   <Link to={"/vendor/editors"} className={active === "editors" ? "active" : null}>
//                     <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
//                     <span>Vendor Website</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to={"/vendor/vendorchangepasswordpage"}
//                     className={active === "jobs-change-password" ? "active" : null}
//                   >
//                     <i className="fa fa-key" aria-hidden="true"></i>
//                     <span>Change Password</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={"/vendor/setting"} className={active === "setting" ? "active" : null}>
//                     <Settings aria-hidden="true" />
//                     <span>Settings</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to={"/vendor/login"} onClick={handleLogout}>
//                     <i className="fa fa-sign-out" aria-hidden="true"></i>
//                     <span>Log Out</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default VendorCompanySideBar

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { Settings } from "lucide-react";
import { toast } from "react-toastify";
import { setPostAJobData } from "../store/reducers/postAJobSlice";

const VendorCompanySideBar = ({ active }) => {
  const token = localStorage.getItem("vendorToken");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState("");
  const [myPortalOpen, setMyPortalOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor/login");
  };

  const postJob = async () => {
    try {
      const res = await axios({
        url: "https://apiwl.novajobs.us/api/admin/job-post",
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data.data, "job");
      dispatch(
        setPostAJobData({
          jobTitle: res.data.data.job_title,
          company: res.data.data.country_id,
          workplaceType: res.data.data.workplace_type_id,
          jobType: res.data.data.job_type_id,
          description: res.data.data.job_description,
          selectedCity: res.data.data.city_id,
          selectedState: res.data.data.state_id,
          selectedCountry: res.data.data.country_id,
        })
      );
      navigate(`/vendor/vendorcomponypostjobs/${res.data.data.id}`);
    } catch (err) {
      console.log(err, "joy");
    }
  };

  const getLogo = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
        headers: {
          Authorization: token,
        },
      });
      setLogo(`${response.data.data.company_detail.logo}`);
    } catch (error) {
      console.error("Error fetching logo:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMyPortal = () => {
    setMyPortalOpen(!myPortalOpen);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  useEffect(() => {
    getLogo();
  }, [token, getLogo]); // Added getLogo to dependencies

  const companyData = useSelector(
    (state) => state.companyDataSlice.companyData
  );
  const companyDetail = companyData?.company_detail;

  const [file, setFile] = useState([]);
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);
    setFile({
      file: img,
      url: url,
    });
  };

  const handleUpdateCompanyLogo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", file?.file);
    axios({
      method: "PUT",
      url: "https://apiwl.novajobs.us/api/admin/company-logo",
      headers: {
        Authorization: token,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
        showToastSuccess(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showToastSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="">
          <div className="sticky-top">
            <div className="candidate-info company-info">
              <div className="candidate-detail text-center">
                <div className="canditate-des">
                  <Link to={"#"}>
                    {file?.url ? (
                      <img
                        className="img-fluid"
                        alt=""
                        src={file?.url || "/placeholder.svg"}
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 1,
                          backgroundImage: "fit",
                        }}
                      />
                    ) : (
                      <img
                        className="img-fluid"
                        alt=""
                        src={`https://apiwl.novajobs.us${logo}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: 1,
                        }}
                      />
                    )}
                  </Link>
                  <div
                    className="upload-link"
                    title="update"
                    data-toggle="tooltip"
                    data-placement="right"
                  >
                    <input
                      type="file"
                      className="update-flie"
                      name="file"
                      id="file"
                      onChange={handleImageChange}
                    />
                    <i className="fa fa-pencil"></i>
                  </div>
                </div>
              </div>
              <div className="candidate-title text-center candidate-detail text-break">
                <h4 className="m-b5">
                  <Link to={"#"}>{companyDetail?.company_name}</Link>
                </h4>
                {file?.url ? (
                  <button
                    onClick={handleUpdateCompanyLogo}
                    className="site-button"
                  >
                    Update
                  </button>
                ) : null}
              </div>
              <ul>
                <li>
                  <Link
                    to={"/vendor/vendorplan"}
                    className={active === "vendorplan" ? "active" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Plan</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className={active === "lading" ? "active" : null}
                    to={"/white-label"}
                  >
                    <i className="fa fa-random" aria-hidden="true"></i>
                    <span>White Label Landing</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/vendorprofile"}
                    className={active === "company" ? "active" : null}
                  >
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>Company Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={toggleMyPortal}>
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                    <span>My Portal</span>
                    <i
                      className={`fa fa-chevron-${
                        myPortalOpen ? "up" : "down"
                      } float-right`}
                    ></i>
                  </Link>
                  {myPortalOpen && (
                    <ul className="sub-menu">
                      <li>
                        <Link
                          className={
                            active === "vendorcomponypostjobs" ? "active" : null
                          }
                          onClick={postJob}
                        >
                          <i
                            className="fa fa-file-text-o"
                            aria-hidden="true"
                          ></i>
                          <span>Post A Job</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/vendor/vendorcompanymanage/jobs"}
                          className={
                            active === "company-manage-job" ? "active" : null
                          }
                        >
                          <i className="fa fa-briefcase" aria-hidden="true"></i>
                          <span>Manage jobs</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/vendor/vendorbulkuploadjobopeneing"}
                          className={
                            active === "vendorbulkuploadjobopeneing"
                              ? "active"
                              : null
                          }
                        >
                          <FontAwesomeIcon
                            icon={faCloudUploadAlt}
                            className="me-2"
                          />
                          <span>Upload job opening</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={"/vendor/vendorbulkuploadjobseeker"}
                          className={
                            active === "vendorbulkuploadjobseeker"
                              ? "active"
                              : null
                          }
                        >
                          <FontAwesomeIcon
                            icon={faCloudUploadAlt}
                            className="me-2"
                          />
                          <span>Upload jobseeker</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link to="#" onClick={toggleServices}>
                    <i className="fa fa-cogs" aria-hidden="true"></i>
                    <span>Services</span>
                    <i
                      className={`fa fa-chevron-${
                        servicesOpen ? "up" : "down"
                      } float-right`}
                    ></i>
                  </Link>
                  {servicesOpen && (
                    <ul className="sub-menu">
                      <li>
                        <Link
                          to={"/vendor/ai-resume-builder"}
                          className={
                            active === "ai-resume-builder" ? "active" : null
                          }
                        >
                          <i className="fa fa-file-text" aria-hidden="true"></i>
                          <span>AI Resume Builder</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link
                    to={"/vendor/editors"}
                    className={active === "editors" ? "active" : null}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />
                    <span>Vendor Website</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/vendorchangepasswordpage"}
                    className={
                      active === "jobs-change-password" ? "active" : null
                    }
                  >
                    <i className="fa fa-key" aria-hidden="true"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/vendor/setting"}
                    className={active === "setting" ? "active" : null}
                  >
                    <Settings aria-hidden="true" />
                    <span>Settings</span>
                  </Link>
                </li>
                <li>
                  <Link to={"/vendor/login"} onClick={handleLogout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Log Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorCompanySideBar;
