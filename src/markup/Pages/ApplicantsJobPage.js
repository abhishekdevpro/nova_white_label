// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Header2 from "./../Layout/Header2";
// import Footer from "./../Layout/Footer";
// import { FaTimes } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";import { showToastError } from "../../utils/toastify";
// import { setJobsData } from "../../store/reducers/jobDataSlice";
// import moment from "moment";
// import FixedHeader from "../../employeeMarkup/Layout/fixedHeader";

// function ApplicantsJobPage() {
//   const jobsData = useSelector((state) => state.jobDataSlice.jobsData);
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("jobSeekerLoginToken");
//   // useEffect(() => {
//   //   const jobData = async () => {
//   //     await axios({
//   //       method: "get",
//   //       url: "https://apiwl.novajobs.us/api/employeer/jobs-applicants",
//   //       headers: {
//   //         Authorization: token,
//   //       },
//   //     })
//   //       .then((response) => {
//   //         console.log(response.data.data);
//   //         dispatch(setJobsData(response.data.data));
//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       });
//   //   };
//   //   jobData();
//   // }, []);
//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://apiwl.novajobs.us/api/jobseeker/job-lists",
//       headers: {
//         Authorization: token,
//         "Content-Type": "application/json"
//       }
//     }).then((response) => {
//       console.log(response.data.data);
//       // setData(response.data.data)
//       dispatch(setJobsData(response.data.data))
//     }).catch((err) => console.log(err))
//   }, [])
//   // const id = jobsData[0].jobskkers_detail?.id;

//   const [selectedJob, setSelectedJob] = useState(null);
//   const [jobData, setJobData] = useState([
//     {
//       id: 1,
//       title: "Ajay Kumar Balwa",
//       company: "Workforce Managment Analyst at Jumko India pvt ltd",
//       location: "New York",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     {
//       id: 2,
//       title: "Neelu Mehta",
//       company: "Salesforce Developers | Content Writer",
//       location: "San Francisco",
//       description:
//         "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
//     },
//     {
//       id: 3,
//       title: "Om Prakash",
//       company: "Account Executive - Cyntexa",
//       location: "Seattle",
//       description: "Aenean euismod bibendum laoreet.",
//     },
//     {
//       id: 4,
//       title: "Manoj Dubey",
//       company: "Salesforce Developers | Content Writer",
//       location: "Chicago",
//       description:
//         "Fusce interdum velit eu urna vehicula, nec pulvinar nulla dignissim.",
//     },
//     {
//       id: 5,
//       title: "Aman Sharma",
//       company: "Account Executive - Cyntexa",
//       location: "Los Angeles",
//       description:
//         "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.",
//     },
//     {
//       id: 6,
//       title: "Ajay Kumar Balwa",
//       company: "Account Executive - Cyntexa",
//       location: "Boston",
//       description:
//         "Suspendisse vel mauris id mi pulvinar ultrices nec sit amet quam.",
//     },
//     {
//       id: 7,
//       title: "Neelu Mehta",
//       company: "HR Solutions",
//       location: "Houston",
//       description: "Sed eget eros fringilla, vehicula urna nec, dictum libero.",
//     },
//     {
//       id: 8,
//       title: "Om Prakash",
//       company: "SalesGenius",
//       location: "Atlanta",
//       description:
//         "Nulla facilisi. Duis sit amet lacus at ligula tincidunt vestibulum.",
//     },
//     {
//       id: 9,
//       title: "Aman Sharma",
//       company: "SupportPro",
//       location: "Miami",
//       description: "Nam eget est quis mi mattis accumsan.",
//     },
//     {
//       id: 10,
//       title: "Manoj Dubey",
//       company: "ProductVision",
//       location: "Austin",
//       description:
//         "Integer aliquam velit non libero lobortis, nec fermentum ligula sodales.",
//     },
//   ]);

//   useEffect(() => {
//     setSelectedJob(jobData[0]);
//   }, []);

//   const handleSelectJob = (job) => {
//     setSelectedJob(job);
//   };

//   const handleClose = () => {
//     const index = jobData.findIndex((job) => job.s_no === selectedJob.s_no);
//     if (index !== -1) {
//       setJobData((prevData) => prevData.filter((_, i) => i !== index));
//       setSelectedJob(null);
//     }
//   };

//   return (
//     <>
//       <Header2 />


//       <div className="page-content bg-white">
//         <div className="content-block">
//           <div className="section-full bg-white p-t50 p-b20">
//             <div className="container">
//               <div className="row">
//                 <div className="col-xl-4 col-lg-5 m-b30">
//                   <div className="sticky-top">
//                     <div className="candidate-info company-info">
//                       <div className="candidate-detail text-center">
//                         <div className="candidate-title">
//                           <h4 className="m-b5">
//                             <Link to={"#"}>Applicants</Link>
//                           </h4>
//                         </div>
//                       </div>
//                       <ul className="job-list-container">
//                         {jobsData.map((job) => {

//                           const formattedCreatedDate =
//                             moment(job.job_detail.created_at).format("YYYY-MM-DD");
//                           return (
//                             <li key={job.s_no}>
//                               <Link
//                                 to={"#"}
//                                 onClick={() => handleSelectJob(job.s_no)}>
//                                 <h6 className="mb-0 d-flex justify-content-between align-items-center">

//                                   {/* <div>
//                                     {job?.jobskkers_detail?.photo ? (
//                                       <img
//                                         src={job?.jobskkers_detail?.photo}
//                                         alt="image"
//                                         style={{
//                                           width: "70px",
//                                           height: "70px",
//                                         }}
//                                       />
//                                     ) : null}
//                                   </div> */}
//                                   <p className="m-0 ">
//                                     {job.s_no}
//                                   </p>
//                                   <span>
//                                     {" "}
//                                     <FaTimes
//                                       className="close-btn"
//                                       onClick={handleClose}
//                                     />
//                                   </span>
//                                 </h6>

//                                 {job.job_detail.job_title ? (
//                                   <p
//                                     className="mb-0"
//                                     style={{ color: "#1c2957" }}>
//                                     {job.job_detail.job_title}{" "}
//                                   </p>
//                                 ) : null}
//                                 {job.job_detail.job_description ? (
//                                   <p
//                                     className="mb-0"
//                                     style={{ color: "#1c2957" }}>
//                                     {job.job_detail.job_description}
//                                   </p>
//                                 ) : null}
//                                 <div className="d-flex flex-row mb-0 " style={{ gap: "7px" }}>

//                                   {job.job_detail.skills_arr.map((item, index) => {
//                                     return (
//                                       <p className="mb-0 " key={index}>{item}</p>
//                                     )
//                                   })}
//                                 </div>
//                                 <div className="d-flex flex-row gap-2 align-items-center " style={{ gap: "7px" }}>
//                                   {job.job_category ?
//                                     <p>{job.job_category.name}</p>
//                                     : null} {" "}
//                                   {job.job_type ?
//                                     <p>{job.job_type.name}</p>
//                                     : null} {" "}
//                                   {job.job_workplace_types.name ?
//                                     <p>{job.job_workplace_types.name}</p>
//                                     : null} {" "}
//                                 </div>

//                                 {/* {job?.jobskkers_detail?.email ? (
//                                   <p
//                                     className="mb-2"
//                                     style={{ color: "#1c2957" }}>
//                                     {" "}
//                                     {job?.jobskkers_detail?.email}
//                                   </p>
//                                 ) : null} */}
//                                 {formattedCreatedDate ? (
//                                   <p>Posted {formattedCreatedDate} ago</p>
//                                 ) : null}
//                               </Link>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-xl-8 col-lg-7 m-b30">
//                   <div className="job-bx submit-resume">
//                     <h4 className="m-b5 d-flex justify-content-between align-items-center">
//                       Job Details
//                       <FaTimes className="close-btn" onClick={handleClose} />
//                     </h4>
//                     {jobsData.map((item, index) => {
//                       const formattedCreatedDate =
//                         moment(item.job_detail.created_at).format("YYYY-MM-DD");
//                       return (
//                         <div key={index}>
//                           <div className="d-flex flex-column align-items-start justify-content-between align-align-items-md-center  gap-2 flex-md-row ">
//                             {/* {item?.jobskkers_detail?.photo ? (
//                               <img
//                                 src={item?.jobskkers_detail?.photo}
//                                 alt="image"
//                                 style={{ width: "150px", height: "150px" }}
//                               />
//                             ) : null} */}
//                             <div className="candidate-title">
//                               {/* {item?.jobskkers_detail?.first_name ||
//                               item?.jobskkers_detail?.last_name ? (
//                                 <Link to={"#"}>
//                                   <h3 className="mb-1">
//                                     {item?.jobskkers_detail?.first_name}{" "}
//                                     {item?.jobskkers_detail?.last_name}{" "}
//                                   </h3>
//                                 </Link>
//                               ) : null} */}

//                               {/* {item?.jobskkers_detail?.email ? (
//                                 <p className="mb-1">
//                                   {" "}
//                                   {item?.jobskkers_detail?.email}
//                                 </p>
//                               ) : null} */}

//                             </div>
//                           </div>

//                           <div className="candidate-title">
//                             {item.s_no ||
//                               item?.job_detail?.job_title ? (
//                               <Link to={"#"}>
//                                 <h3 className="mb-1">
//                                   {item.s_no}
//                                   {". "}
//                                   {item?.job_detail?.job_title}
//                                 </h3>
//                               </Link>
//                             ) : null}
//                             {item?.job_detail?.job_description ? (
//                               <p className="mb-1">
//                                 {item?.job_detail?.job_description}
//                               </p>
//                             ) : null}


//                           </div>
//                           <div className="job-details-content">
//                             {item?.job_workplace_types?.name ||
//                               item?.job_type?.name ||
//                               item?.job_category?.name ? (
//                               <p className="mb-0">
//                                 {item?.job_workplace_types?.name}
//                                 {" | "}
//                                 {item?.job_type?.name} {" | "}{" "}
//                                 {item?.job_category?.name}
//                               </p>
//                             ) : null}
//                             <div className="d-flex" style={{ gap: "7px" }}>
//                               {item.job_detail.skills_arr.map((item, index) => {
//                                 return <p key={index} className="mb-5">{item}</p>
//                               })}
//                             </div>
//                             {/* <p>
//                               10,001+ employees · Business Consulting and
//                               Services
//                             </p> */}
//                             {item?.job_detail?.skills ? (
//                               <p>Skills: {item?.job_detail?.skills}</p>
//                             ) : null}
//                             {formattedCreatedDate ? (
//                               <p>Posted {formattedCreatedDate} ago</p>
//                             ) : null}
//                           </div>
//                           <div className="d-flex justify-content-start align-items-center">
//                             <button className="radius-xl site-button">
//                               View Applicant
//                             </button>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                   {/* {selectedJob && (
//                     <div className="job-bx submit-resume mt-4">
//                       <div className="candidate-title">
//                         <Link to={"#"}>
//                           <h3 className="mb-0">{selectedJob.title}</h3>
//                         </Link>
//                         <Link to={"#"}>
//                           <p className="mb-0">
//                             <strong>Company:</strong> {selectedJob.company}
//                           </p>
//                         </Link>
//                         <Link to={"#"}>
//                           <p>
//                             <strong>Location:</strong> {selectedJob.location}
//                           </p>
//                         </Link>
//                       </div>
//                       <div className="job-details-content">
//                         <p>On-site Full-time Entry level</p>
//                         <p>
//                           10,001+ employees · Business Consulting and Services
//                         </p>
//                         <p>
//                           Skills: Order to Cash, Accounts Receivable (AR), +8
//                           more{" "}
//                         </p>
//                         <p>
//                           See recent hiring trends for GENPACT. Try Premium for
//                           ₹0
//                         </p>
//                       </div>
//                       <div className="d-flex justify-content-start align-items-center">
//                         <button className="radius-xl site-button">Apply</button>
//                         <button
//                           className="radius-xl  ml-2"
//                           style={{
//                             padding: "8px 20px",
//                             margin: "5px",
//                             backgroundColor: "transparent",
//                             color: "#9d9d9d",
//                             border: "1px solid",
//                             borderColor: "#9d9d9d",
//                             cursor: "pointer",
//                             outline: "none",
//                           }}
//                         >
//                           Save
//                         </button>
//                       </div>
//                     </div>
//                   )} */}
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

// export default ApplicantsJobPage;






import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";import { showToastError } from "../../utils/toastify";
import { setJobsData } from "../../store/reducers/jobDataSlice";
import moment from "moment";
import FixedHeader from "../Layout/fixedHeader";

function ApplicantsJobPage() {
  const jobsData = useSelector((state) => state.jobDataSlice.jobsData);
  const dispatch = useDispatch();
  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/job-lists",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data.data);
        dispatch(setJobsData(response.data.data));
      })
      .catch((err) => console.log(err));
  }, []);

  // Initialize selectedJob state with the first job from jobsData array
  useEffect(() => {
    if (jobsData.length > 0) {
      setSelectedJob(jobsData[0]);
    }
  }, [jobsData]);

  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 m-b30">
                  <div className="sticky-top">
                    <div className="candidate-info company-info">
                      <div className="candidate-detail text-center">
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to="#">Applicants</Link>
                          </h4>
                        </div>
                      </div>
                      <ul className="job-list-container">
                        {jobsData.map((job) => (
                          <li key={job.s_no}>
                            <Link
                              to="#"
                              onClick={() => handleSelectJob(job)}
                            >
                              <h6 className="mb-0 d-flex justify-content-between align-items-center">
                                <p className="m-0">{job.s_no}</p>
                                <span>
                                  <FaTimes
                                    className="close-btn"
                                    onClick={handleClose}
                                  />
                                </span>
                              </h6>
                              {job.job_detail.job_title && (
                                <p className="mb-0" style={{ color: "#1c2957" }}>
                                  {job.job_detail.job_title}
                                </p>
                              )}
                              {job.job_detail.job_description && (
                                <p className="mb-0" style={{ color: "#1c2957" }}>
                                  {job.job_detail.job_description}
                                </p>
                              )}
                              <div
                                className="d-flex flex-row mb-0"
                                style={{ gap: "7px" }}
                              >
                                {job.job_detail.skills_arr.map((item, index) => (
                                  <p className="mb-0" key={index}>
                                    {item}
                                  </p>
                                ))}
                              </div>
                              <div
                                className="d-flex flex-row gap-2 align-items-center"
                                style={{ gap: "7px" }}
                              >
                                {job.job_category && (
                                  <p>{job.job_category.name}</p>
                                )}
                                {job.job_type && <p>{job.job_type.name}</p>}
                                {job.job_workplace_types.name && (
                                  <p>{job.job_workplace_types.name}</p>
                                )}
                              </div>
                              {job.job_detail.created_at && (
                                <p>
                                  Posted {moment(job.job_detail.created_at).fromNow()}
                                </p>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-7 m-b30">
                  <div className="job-bx submit-resume">
                    <h4 className="m-b5 d-flex justify-content-between align-items-center">
                      Job Details
                      <FaTimes className="close-btn" onClick={handleClose} />
                    </h4>
                    {selectedJob && (
                      <div>
                        <div className="d-flex flex-column align-items-start justify-content-between align-align-items-md-center gap-2 flex-md-row">
                          <div className="candidate-title"></div>
                        </div>
                        <div className="candidate-title">
                          {selectedJob.s_no && selectedJob.job_detail.job_title && (
                            <Link to="#">
                              <h3 className="mb-1">
                                {selectedJob.s_no}. {selectedJob.job_detail.job_title}
                              </h3>
                            </Link>
                          )}
                          {selectedJob.job_detail.job_description && (
                            <p className="mb-1">
                              {selectedJob.job_detail.job_description}
                            </p>
                          )}
                        </div>
                        <div className="job-details-content">
                          {selectedJob.job_workplace_types.name && selectedJob.job_type.name && selectedJob.job_category.name && (
                            <p className="mb-0">
                              {selectedJob.job_workplace_types.name} | {selectedJob.job_type.name} | {selectedJob.job_category.name}
                            </p>
                          )}
                          <div className="d-flex" style={{ gap: "7px" }}>
                            {selectedJob.job_detail.skills_arr.map((item, index) => (
                              <p key={index} className="mb-5">{item}</p>
                            ))}
                          </div>
                          {selectedJob.job_detail.skills && (
                            <p>Skills: {selectedJob.job_detail.skills}</p>
                          )}
                          {selectedJob.job_detail.created_at && (
                            <p>Posted {moment(selectedJob.job_detail.created_at).fromNow()}</p>
                          )}
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                          <button className="radius-xl site-button">
                            View Applicant
                          </button>
                        </div>
                      </div>
                    )}
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

export default ApplicantsJobPage;
