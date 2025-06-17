import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setJobApplicationData } from "../../store/reducers/jobApplicationSlice";
import moment from "moment";
import noDataFound from "../../images/nodata.png";
import JobPageSkeleton from "../skeleton/jobPage";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// Import skeleton loader component
import TwoBoxWithLinesSkeleton from "../skeleton/twoBoxLines";
import { Tab, Nav, Form } from "react-bootstrap";
import { setJobSeekerAnswer } from "../../store/reducers/jobApplicationScreeningQues";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const postBlog = [
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
  {
    image: require("./../../images/logo/icon1.png"),
  },
];

const SavedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [skeleton, setSkeleton] = useState(true); // Controls skeleton loader
  const [logo, setLogo] = useState(""); // Stores company logo
  const [isSaved, setIsSaved] = useState();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("contact-info");

  const token = localStorage.getItem("jobSeekerLoginToken");
  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );

  const handleShowModal = (item) => {
    setSelectedJob(item);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };
  // Toggle favorite jobs for mobile view
  const toggleFabJobsmobile = async () => {
    try {
      await axios({
        url: "https://apiwl.novajobs.us/api/jobseeker/job-favorites",
        method: "POST",
        headers: { Authorization: token },
        data: {
          job_id: selectedJob.job_detail.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobApplicationData = async () => {
    try {
      const response = await axios.get(
        "https://apiwl.novajobs.us/api/jobseeker/job-favorites",
        // "https://apiwl.novajobs.us/api/jobseeker/job-lists?page_size=7&is_publish=1",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(setJobApplicationData(response.data.data));
      setSkeleton(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobApplicationData();
  }, []);

  const toggleFabJobs = async (id) => {
    try {
      await axios({
        url: "https://apiwl.novajobs.us/api/jobseeker/job-favorites",
        method: "POST",
        headers: { Authorization: token },
        data: {
          job_id: id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleToggleFavorite = async (JobId) => {
    if (!token) {
      toast.error("Login required!");
      setTimeout(() => {
        navigate("/user/login");
      }, 2000);
    }
    try {
      const response = await axios({
        url: "https://apiwl.novajobs.us/api/jobseeker/job-favorites",
        method: "POST",
        headers: { Authorization: token },
        data: {
          job_id: JobId,
        },
      });
      // console.log(response.message,"meassg");
      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response.data.message || "job added to favorites");
        fetchJobApplicationData();
        // setIsSaved((prev) => !prev);
      } else toast.error(response.message);
    } catch (error) {
      console.log(error);
      // toast.error(error.message || "Failed to add job to favorites. Try again! ")
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNext = () => {
    if (activeTab === "contact-info") {
      setActiveTab("additional-info");
    } else if (activeTab === "additional-info") {
      setActiveTab("resume-info");
    } else if (activeTab === "resume-info") {
      setActiveTab("immediate-info");
    }
  };

  const handlePrev = () => {
    if (activeTab === "immediate-info") {
      setActiveTab("resume-info");
    } else if (activeTab === "resume-info") {
      setActiveTab("additional-info");
    } else if (activeTab === "additional-info") {
      setActiveTab("contact-info");
    }
  };
  const submitApplication = async () => {
    if (selectedJob && selectedJob.job_apply_url) {
      // Redirect to the job_apply_url
      window.location.href = selectedJob.job_apply_url;
    } else {
      try {
        await axios({
          url: "https://apiwl.novajobs.us/api/jobseeker/jobs-applied",
          method: "POST",
          headers: {
            Authorization: token,
          },
          data: {
            job_id: selectedJob.job_detail.id,
            screen_questions: screeningQuestion,
          },
        });
        showToastSuccess("Job applied successfully");
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      }
    }
  };

  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );

  const jobApplicationValues = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationValues
  );
  return (
    <div className="section-full bg-white c">
      <div className="container">
        <div className="d-flex ">
          <div className=""></div>
        </div>
        {/* desktop view */}
        <div className="row d-none d-md-block">
          {skeleton === true ? (
            <div>
              Please wait Or Check have saved any job?
              <JobPageSkeleton />{" "}
            </div>
          ) : (
            <div className="col-lg-12">
              {jobApplicationData ? (
                <ul className="post-job-bx browse-job">
                  {jobApplicationData?.map((item, index) => (
                    <li key={index}>
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-company">
                            <span>
                              <img alt="" src={postBlog[0].image} />
                            </span>
                          </div>
                          <div className="job-post-info">
                            <h4>
                              <Link to={`/user/jobs/${item.job_detail.id}`}>
                                {item.job_detail.job_title}
                              </Link>
                            </h4>
                            <ul>
                              <li>
                                <i className="fa fa-map-marker"></i>{" "}
                                {item.countries.name}, {item.states.name},
                                {item.cities.name}
                              </li>
                              {item.job_category.name ? (
                                <li>
                                  <i className="fa fa-bookmark-o"></i>{" "}
                                  {item.job_category.name}
                                </li>
                              ) : null}
                              <li>
                                <i className="fa fa-clock-o"></i>{" "}
                                {moment(item.job_detail.created_at).fromNow()}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="job-time mr-auto">
                            <Link to={"#"}>
                              <span>{item.job_type.name}</span>
                            </Link>
                          </div>
                          <div className="salary-bx">
                            <span> {item.job_workplace_types.name}</span>
                          </div>
                        </div>
                        <div className="">
                          <button
                            onClick={() =>
                              handleToggleFavorite(item.job_detail?.id)
                            }
                            className="btn btn-link p-0 border-0"
                            style={{
                              color: "#ccc",
                              fontSize: "18px",
                              border: "none",
                            }}
                          >
                            {isSaved || item.job_detail?.is_job_favorite ? (
                              <FaHeart color="#ff4757" />
                            ) : (
                              <FaRegHeart color="#ccc" />
                            )}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="d-flex flex-column w-100  justify-content-center ">
                  <img
                    src={noDataFound}
                    alt="no data found"
                    style={{ width: "400px", margin: "auto" }}
                  />
                  <p
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      border: "1px solid #f5c6cb",
                      borderRadius: "4px",
                      fontWeight: "600",
                      maxWidth: "100%",
                      margin: "20px auto",
                      textAlign: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    No Saved jobs Found.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="col-lg-3"></div>
        </div>
        {/* desktop view end */}
        {/* mobileview */}
        <div className="row  d-md-none">
          {skeleton === true ? (
            <div>
              Please wait Or Check have saved any job?
              <JobPageSkeleton />{" "}
            </div>
          ) : (
            <div className="col-lg-12">
              {jobApplicationData ? (
                <ul className="post-job-bx browse-job">
                  {jobApplicationData.map((item, index) => (
                    <li key={index}>
                      <div className="post-bx">
                        <div className="d-flex m-b30">
                          <div className="job-post-company">
                            <span>
                              <img alt="" src={postBlog[0].image} />
                            </span>
                          </div>
                          <div className="job-post-info">
                            <h4 onClick={() => handleShowModal(item)}>
                              {item.job_detail.job_title}
                            </h4>
                            <ul>
                              <li>
                                <i className="fa fa-map-marker"></i>{" "}
                                {item.countries.name}, {item.states.name},
                                {item.cities.name}
                              </li>
                              {item.job_category.name ? (
                                <li>
                                  <i className="fa fa-bookmark-o"></i>{" "}
                                  {item.job_category.name}
                                </li>
                              ) : null}
                              <li>
                                <i className="fa fa-clock-o"></i>{" "}
                                {moment(item.job_detail.created_at).fromNow()}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="job-time mr-auto">
                            <Link to={"#"}>
                              <span>{item.job_type.name}</span>
                            </Link>
                          </div>
                          <div className="salary-bx">
                            <span> {item.job_workplace_types.name}</span>
                          </div>
                        </div>
                        {/* <label
                          className="like-btn"
                          labl
                          onClick={() => {
                            handleToggleFavorite(item.job_detail.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            defaultChecked={item.job_detail.is_job_favorite}
                            name={item.job_detail.id}
                          />
                          <span className="checkmark"></span>
                        </label> */}
                        <div className="">
                          <button
                            onClick={() =>
                              handleToggleFavorite(item.job_detail?.id)
                            }
                            className="btn btn-link p-0 border-0"
                            style={{
                              color: "#ccc",
                              fontSize: "18px",
                              border: "none",
                            }}
                          >
                            {item.job_detail?.is_job_favorite ? (
                              <FaHeart color="#ff4757" />
                            ) : (
                              <FaRegHeart color="#ccc" />
                            )}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  className="d-flex flex-column align-items-center justify-content-center w-100"
                  style={{
                    border: "2px solid red",
                    width: "100%", // you can remove this if using 'w-100'
                  }}
                >
                  <img
                    src={noDataFound}
                    alt="no data found"
                    style={{ width: "150px", margin: "auto" }}
                  />
                  <p
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      border: "1px solid #f5c6cb",
                      borderRadius: "4px",
                      fontWeight: "600",
                      margin: "20px auto",
                      textAlign: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    No Saved jobs Found.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};
export default SavedJobs;
