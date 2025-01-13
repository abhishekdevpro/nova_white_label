import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Tab, Nav, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import FixedHeader from "../Layout/fixedHeader";
import {
  setJobApplicationData,
  setJobApplicationValues,
} from "../../store/reducers/jobApplicationSlice";
import moment from "moment";
import testImg from "../../images/jobpageicon.png";
import "react-quill/dist/quill.snow.css";
import {
  setJobSeekerAnswer,
  setScreeningQuestion,
  setUserAnswer,
} from "../../store/reducers/jobApplicationScreeningQues";
import { submit } from "redux-form";
import JobPageSkeleton from "../skeleton/jobPage";
import TwoBoxWithLinesSkeleton from "../skeleton/twoBoxLines";
import { useParams } from "react-router-dom";
import SkeletonImg from "../../images/jobpage/No data-pana.png";
import { FaSearch, FaBars } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

function JobPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedJob, setSelectedJob] = useState(null);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("contact-info");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );
  const token = localStorage.getItem("jobSeekerLoginToken");
  const jobFromState = location.state?.job || null;

  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );

  const jobApplicationValues = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationValues
  );
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [countries, setCountries] = useState([{ id: 0, name: "" }]);
  const [states, setStates] = useState([{ id: 0, name: "" }]);
  const [cities, setCities] = useState([{ id: 0, name: "" }]);
  const [workplace_type, setWorkplace_type] = useState([{ id: 0, name: "" }]);
  const [experience, setExperience] = useState([{ id: 0, name: "" }]);
  const [job_type, setJobType] = useState([{ id: 0, name: "" }]);
  const [jobCategories, setJobCategories] = useState([{ id: 0, name: "" }]);
  const [activeDropDown, setActiveDropDown] = useState("");
  const [loading, setLoading] = useState(false); // Controls skeleton loading
  const [category, Setcategory] = useState("");

  // Extract search params from the URL
  const queryParams = new URLSearchParams(location.search);
  const initialSearchParams = {
    category: queryParams.get("category") || "",
    state_id: queryParams.get("state_id") || "",
    city_id: queryParams.get("city_id") || "",
    workplace_type: queryParams.get("workplace_type") || "",
    job_type: queryParams.get("job_type") || "",
    experience_level: queryParams.get("experience_level") || "",
    title_keywords: queryParams.get("title_keywords") || "",
  };

  const [searchParams, setSearchParams] = useState(initialSearchParams);

  useEffect(() => {
    const fetchJobApplicationData = async () => {
      console.log(page);
      try {
        const response = await axios.get(
          // "https://api.novajobs.us/api/jobseeker/job-lists?page_no=1&page_size=7&is_publish=1",
          `https://api.novajobs.us/api/jobseeker/job-lists?page_no=${page}&page_size=${perPage}&is_publish=1`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(setJobApplicationData(response.data.data));
        setShowSkeleton(false);

        // If we have an ID from params, find and set the matching job
        if (id) {
          const response = await axios.get(
            `https://api.novajobs.us/api/jobseeker/job-lists/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          if (response.data.data) {
            setSelectedJob(response.data.data);
          } else {
            console.log(`No job found with id: ${id}`);
          }
        } else if (jobFromState) {
          setSelectedJob(jobFromState);
        } else if (response.data.data.length > 0) {
          setSelectedJob(response.data.data[0]);
        }

        // Perform search based on initial search params
        handleSearch();
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobApplicationData();
  }, [id, jobFromState, dispatch, token, page]);

  useEffect(() => {
    if (jobApplicationValues.jobCategory !== "") {
      setActiveDropDown("active_dropDown");
    }
  }, [jobApplicationValues.jobCategory]);

  useEffect(() => {
    getCountry();
    getExperience();
    getWorkplaceType();
    getJobTypes();
    getCategory();
  }, []);

  useEffect(() => {
    dispatch(
      setJobApplicationValues({
        ...jobApplicationValues,
        state_id: 0,
        city_id: 0,
      })
    );
    getState();
  }, [jobApplicationValues.country_id]);

  useEffect(() => {
    dispatch(
      setJobApplicationValues({
        ...jobApplicationValues,
        city_id: 0,
      })
    );
    getCities();
  }, [jobApplicationValues.state_id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleFabJobs = async () => {
    try {
      await axios({
        url: "https://api.novajobs.us/api/jobseeker/job-favorites",
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

  const handleSelectJob = (job) => {
    setSelectedJob(job);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country_id" || name === "city_id" || name === "state_id") {
      const selectedIndex = e.target.selectedIndex;
      const text = e.target.options[selectedIndex].text;
      dispatch(
        setJobApplicationValues({
          ...jobApplicationValues,
          [name === "country_id"
            ? "country"
            : name === "city_id"
            ? "city"
            : "state"]: text,
          [name]: value,
        })
      );
    } else {
      dispatch(
        setJobApplicationValues({ ...jobApplicationValues, [name]: value })
      );
    }
  };

  const getJobTypes = async () => {
    try {
      const res = await axios.get(
        "https://api.novajobs.us/api/jobseeker/job-types",
        {
          headers: { Authorization: token },
        }
      );
      setJobType(res.data.data);
    } catch (err) {
      console.log(err, "job type error");
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://api.novajobs.us/api/jobseeker/job-categories",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      Setcategory(res.data.data);
    } catch (err) {
      console.log(err, "error");
    }
  };

  const getWorkplaceType = async () => {
    try {
      const response = await axios.get(
        "https://api.novajobs.us/api/jobseeker/workplace-types",
        {
          headers: { Authorization: token },
        }
      );
      setWorkplace_type(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getExperience = async () => {
    try {
      const response = await axios.get(
        "https://api.novajobs.us/api/jobseeker/experience-level",
        {
          headers: { Authorization: token },
        }
      );
      setExperience(response.data.data);
    } catch (err) {
      console.log(err);
      showToastError(err?.response?.data?.message);
    }
  };

  const getCountry = async () => {
    try {
      const response = await axios.get(
        "https://api.novajobs.us/api/jobseeker/countries",
        {
          headers: { Authorization: token },
        }
      );
      setCountries(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getState = async () => {
    try {
      const response = await axios.get(
        `https://api.novajobs.us/api/jobseeker/stats/231`,
        {
          headers: { Authorization: token },
        }
      );
      setStates(response.data.data);
    } catch (err) {
      console.log(err, "STATE");
      setStates([]);
      setCities([]);
    }
  };

  const getCities = async () => {
    try {
      const response = await axios.get(
        `https://api.novajobs.us/api/jobseeker/cities/${jobApplicationValues.state_id}`,
        {
          headers: { Authorization: token },
        }
      );
      setCities(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const baseUrl =
    // "https://api.novajobs.us/api/jobseeker/job-lists/?page_size=7&is_publish=1";
    // "https://api.novajobs.us/api/jobseeker/job-lists?page_size=7&is_publish=1";
    `https://api.novajobs.us/api/jobseeker/job-lists?page_no=${page}&page_size=${perPage}&is_publish=1`;
  const params = new URLSearchParams();
  // Handle Search Based on Params
  const handleSearch = () => {
    const {
      category,
      state_id,
      city_id,
      workplace_type,
      job_type,
      experience_level,
      title_keywords,
    } = jobApplicationValues;
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (state_id) params.append("state_id", state_id);
    if (city_id) params.append("city_id", city_id);
    if (workplace_type) params.append("workplace_type", workplace_type);
    if (job_type) params.append("job_type", job_type);
    if (experience_level) params.append("experience_level", experience_level);
    if (title_keywords) params.append("title_keywords", title_keywords);

    const url = `${baseUrl}&${params.toString()}`;
    handleGetReq(url);
  };

  // Perform GET request to fetch filtered job listings
  const handleGetReq = (url) => {
    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        dispatch(setJobApplicationData(response.data.data || []));
      })
      .catch((err) => {
        console.error("Error fetching filtered jobs:", err);
      });
  };

  const submitApplication = async () => {
    if (selectedJob && selectedJob.job_apply_url) {
      // Redirect to the job_apply_url
      window.location.href = selectedJob.job_apply_url;
    } else {
      try {
        await axios({
          url: "https://api.novajobs.us/api/jobseeker/jobs-applied",
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
  //load more button
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    // fetchJobApplicationData(nextPage);
  };
  console.log("pagevalue", page);
  return (
    <>
      <Header />
      {localStorage.getItem("jobSeekerLoginToken") ? <FixedHeader /> : null}
      <ToastContainer />
      <div>
        {showSkeleton === true ? (
          <div className="bg-white w-100 ">
            <TwoBoxWithLinesSkeleton />
          </div>
        ) : (
          <div className="page-content bg-white">
            <div className="content-block">
              <div className="section-full bg-white p-t50 p-b20">
                <div>
                  {/* Toggler Button (only visible on mobile view) */}
                  <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="d-lg-none btn btn-primary"
                    style={{
                      marginBottom: "10px",
                      width: "100%",
                    }}
                  >
                    {isVisible ? "Hide Filters" : "Show Filters"}
                  </button>

                  {/* Job Filters Container (visible on mobile only when toggled) */}
                  <div
                    className={`container ${
                      isVisible ? "d-block" : "d-none"
                    } d-lg-block`}
                    style={{ transition: "all 0.3s ease-in-out" }}
                  >
                    <div className="row justify-content-center align-items-center">
                      <div className="col-lg-2 col-md-4 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="jobCategory">Choose Category</label>
                          {category ? (
                            <select
                              type="text"
                              className={`form-control dropdown-menu-job_page ${
                                jobApplicationValues.category === ""
                                  ? null
                                  : "active_dropDown"
                              }`}
                              id="jobCategory"
                              name="jobCategory"
                              onChange={handleChange}
                              value={jobApplicationValues.category}
                            >
                              <option value="">Select a Category</option>
                              {category.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-5 col-12">
                        <div className="form-group">
                          <label htmlFor="state_id">State:</label>
                          {states ? (
                            <select
                              type="text"
                              className={`form-control dropdown-menu-job_page ${
                                jobApplicationValues.state_id === ""
                                  ? null
                                  : "active_dropDown"
                              }`}
                              id="state_id"
                              name="state_id"
                              onChange={handleChange}
                              value={jobApplicationValues.state_id}
                            >
                              <option value="">Select a State</option>
                              {states.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-5 col-12">
                        <div className="form-group">
                          <label htmlFor="city_id">City:</label>
                          {cities && cities.length > 0 ? (
                            <select
                              type="text"
                              className={`form-control dropdown-menu-job_page ${
                                jobApplicationValues.city_id === 0
                                  ? null
                                  : "active_dropDown"
                              }`}
                              id="city_id"
                              name="city_id"
                              onChange={handleChange}
                              value={jobApplicationValues.city_id}
                            >
                              <option value="">Select A City</option>
                              {cities.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <p className="border border-black p-2 rounded-1 fw-light text-black">
                              Select the State first
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-5 col-12">
                        <div className="form-group">
                          <label htmlFor="workplace_type">
                            WorkPlace Type:
                          </label>
                          {workplace_type ? (
                            <select
                              type="text"
                              className={`form-control dropdown-menu-job_page ${
                                jobApplicationValues.workplace_type === ""
                                  ? null
                                  : "active_dropDown"
                              }`}
                              id="workplace_type"
                              name="workplace_type"
                              onChange={handleChange}
                              value={jobApplicationValues.workplace_type}
                            >
                              <option value="">Select WorkPlace</option>
                              {workplace_type.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-5 col-12">
                        <div className="form-group">
                          <label htmlFor="job_type">Job Type:</label>
                          {job_type ? (
                            <select
                              type="text"
                              className={`form-control dropdown-menu-job_page ${
                                jobApplicationValues.job_type === ""
                                  ? null
                                  : "active_dropDown"
                              }`}
                              id="job_type"
                              name="job_type"
                              onChange={handleChange}
                              value={jobApplicationValues.job_type}
                            >
                              <option value="">Select Job Type</option>
                              {job_type.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-2 col-md-5 col-12">
                        <div className="form-group">
                          <label htmlFor="experience_level">
                            Experience Level:
                          </label>
                          {experience ? (
                            <select
                              type="text"
                              className={`form-control dropdown-menu-job_page ${
                                jobApplicationValues.experience_level === ""
                                  ? null
                                  : "active_dropDown"
                              }`}
                              id="experience_level"
                              name="experience_level"
                              onChange={handleChange}
                              value={jobApplicationValues.experience_level}
                            >
                              <option value="">Select Experience</option>
                              {experience.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div
                    className="d-flex justify-content-center "
                    style={{ gap: "12px" }}
                  >
                    <div
                      className=" w-75 d-flex flex-column   p-2 "
                      style={{
                        backgroundColor: "#f5f5f5",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        className="form-control"
                        id="title_keywords"
                        name="title_keywords"
                        onChange={handleChange}
                        value={jobApplicationValues.title_keywords || ""}
                        placeholder="Enter job title keywords"
                      />
                    </div>
                    <button
                      onClick={handleSearch}
                      className="border-0 site-button d-flex align-items-center "
                      style={{
                        cursor: "pointer",
                        outline: "none",
                        gap: "7px",
                      }}
                    >
                      <FaSearch />
                      Search
                    </button>
                  </div>
                </div>
                {jobApplicationData.length !== 0 ? (
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-4 col-lg-5 m-b30 rounded-5  d-none d-md-block">
                        <div className="sticky-top ">
                          {jobApplicationData ? (
                            <div className="candidate-info company-info rounded-5">
                              <ul
                                className="job-list-container rounded-4 overflow-auto max-height-100"
                                style={{
                                  maxHeight: "calc(100vh - 200px)",
                                  overflowY: "auto",
                                  boxShadow: "0 0 10px 0 rgba(0, 24, 128, 0.1)",
                                }}
                                // className="overflow-auto max-height-100"
                              >
                                {jobApplicationData.map((job) => (
                                  <div key={job.s_no}>
                                    <li>
                                      <Link
                                        to="#"
                                        onClick={() => setSelectedJob(job)}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            width: "100%",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: "80%",
                                              overflow: "hidden",
                                            }}
                                          >
                                            {job.job_detail.job_title && (
                                              <p
                                                className="mb-0"
                                                style={{
                                                  color: "black",
                                                  fontWeight: "500",
                                                  fontSize: "20px",
                                                }}
                                              >
                                                {job.job_detail.job_title}
                                              </p>
                                            )}
                                            <div
                                              className="d-flex flex-row mt-2"
                                              style={{
                                                gap: "7px",
                                                fontWeight: "500",
                                              }}
                                            >
                                              {job.companies.company_name}
                                            </div>
                                            <div
                                              className="d-flex flex-row mb-0"
                                              style={{
                                                gap: "3px",
                                                fontSize: "12px",
                                              }}
                                            >
                                              {job.companies.cities.name},{" "}
                                              {job.companies.states.name}
                                            </div>

                                            <div
                                              className="gap-0 align-items-center joblist"
                                              style={{
                                                gap: "0px",
                                                fontSize: "13px",
                                                height: "auto",
                                              }}
                                            >
                                              <div
                                                className="d-flex"
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <div>
                                                  {job.job_workplace_types
                                                    .name && (
                                                    <p
                                                      style={{ margin: "0px" }}
                                                    >
                                                      Workplace:{" "}
                                                      {
                                                        job.job_workplace_types
                                                          .name
                                                      }
                                                    </p>
                                                  )}
                                                </div>
                                                <div className="float-end">
                                                  {job.job_detail
                                                    .updated_at && (
                                                    <p
                                                      style={{
                                                        margin: "0px",
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {moment(
                                                        job.job_detail
                                                          .created_at
                                                      ).fromNow()}
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                          <div className="text-center mt-3">
                            <button
                              className="btn btn-primary"
                              onClick={handleLoadMore}
                              disabled={loading}
                            >
                              {loading ? "Loading..." : "Load More Jobs"}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-7 m-b30 d-none d-md-block">
                        {selectedJob && (
                          <div className="m-b20 job-bx rounded-4 ">
                            <div>
                              <div className="candidate-title ">
                                <div className="d-flex gap-4 justify-content-between align-items-center mt-6 p-2">
                                  <div>
                                    <Link to="#">
                                      <h3 className="mb-1">
                                        {selectedJob.job_detail.job_title}
                                      </h3>
                                    </Link>
                                  </div>
                                  <div className="">
                                    {localStorage.getItem(
                                      "jobSeekerLoginToken"
                                    ) ? (
                                      <>
                                        {selectedJob.job_detail
                                          .is_job_applied ? (
                                          <button
                                            className="site-button btn btn-primary"
                                            // onClick={handleShow}
                                          >
                                            View Status
                                          </button>
                                        ) : (
                                          <button
                                            className=" site-button btn btn-primary "
                                            onClick={() => {
                                              handleClose();
                                              submitApplication();
                                            }}
                                            // onClick={handleClose} yehi h formal submit
                                          >
                                            Apply
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <button
                                          className=" site-button btn btn-primary justify-end "
                                          onClick={() =>
                                            navigate("/user/login")
                                          }
                                        >
                                          Apply now
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="job-details-content">
                                  {selectedJob.job_workplace_types.name &&
                                    selectedJob.job_type.name &&
                                    selectedJob.job_category.name && (
                                      <p className="p-2">
                                        {selectedJob.job_workplace_types.name} |{" "}
                                        {selectedJob.job_type.name} |{" "}
                                        {selectedJob.job_category.name}
                                      </p>
                                    )}
                                  <div
                                    className="d-flex"
                                    style={{ gap: "4px" }}
                                  >
                                    {selectedJob.job_detail.skills_arr.map(
                                      (item, index) => (
                                        <p
                                          key={index}
                                          className="btn btn-primary mr-1 mb-1"
                                        >
                                          {item}
                                        </p>
                                      )
                                    )}
                                  </div>
                                  {selectedJob.job_detail.skills && (
                                    <p>
                                      Skills: {selectedJob.job_detail.skills}
                                    </p>
                                  )}
                                  <p>
                                    You must create an nova account before
                                    continuing to the company website to apply
                                  </p>
                                  <div className="d-inline-block border-end border-1 border-btn btn-outline-secondary w-100 mb-4"></div>
                                  <h5>Job details</h5>
                                  {selectedJob.companies.id && (
                                    <div
                                      className="d-flex "
                                      style={{
                                        gap: "50px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          navigate(
                                            `/user/company/${selectedJob.companies.id}`
                                          );
                                        }}
                                      >
                                        <i
                                          class="fa fa-briefcase"
                                          aria-hidden="true"
                                        ></i>
                                        {"  "}
                                        {selectedJob.companies.company_name}
                                      </p>
                                      <p>
                                        <i
                                          class="fa fa-registered"
                                          aria-hidden="true"
                                        ></i>

                                        {"  "}
                                        {selectedJob.companies.founded_date}
                                      </p>
                                    </div>
                                  )}
                                  {selectedJob.companies.id && (
                                    <div
                                      className="d-flex"
                                      style={{
                                        gap: "100px",
                                      }}
                                    >
                                      <p>
                                        <i className="fa fa-map-marker mr-2"></i>
                                        {selectedJob.companies.cities.name},{" "}
                                        {selectedJob.companies.states.name},{" "}
                                        {selectedJob.companies.countries.name}
                                      </p>
                                    </div>
                                  )}{" "}
                                </div>

                                <div className="d-inline-block border-end border-1 border-btn btn-outline-secondary w-100 my-3"></div>
                                <h5>Full job description</h5>
                                {selectedJob.job_detail.job_description && (
                                  <p className="mb-1">
                                    <div
                                      className="ql-editor"
                                      style={{
                                        fontSize: "13px",
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          selectedJob.job_detail
                                            .job_description,
                                      }}
                                    />
                                  </p>
                                )}
                              </div>
                              {selectedJob.job_detail.created_at && (
                                <p>
                                  Posted{" "}
                                  {moment(
                                    selectedJob.job_detail.created_at
                                  ).fromNow()}
                                </p>
                              )}
                              <div className="d-flex justify-content-start align-items-center">
                                <Modal
                                  show={show}
                                  onHide={handleClose}
                                  backdrop="static"
                                  keyboard={false}
                                >
                                  <Modal.Header
                                    closeButton
                                    style={{ backgroundColor: "#ffff" }}
                                    className="mt-4"
                                  >
                                    <Modal.Title style={{ color: "#000" }}>
                                      <p> Apply to {selectedJob.company}</p>
                                    </Modal.Title>
                                  </Modal.Header>

                                  <Tab.Pane eventKey="contact-info">
                                    <form className="col-12 p-a0">
                                      {selectedJob.screen_questions &&
                                      selectedJob.screen_questions
                                        .screen_question_keywords ? (
                                        <div>
                                          <div
                                            style={{
                                              fontSize: "20px",
                                              paddingBottom: "10px",
                                            }}
                                          >
                                            Screening questions
                                          </div>
                                          {selectedJob.screen_questions.screen_question_keywords.map(
                                            (item, index) => (
                                              <div key={index}>
                                                <h4>{item.name}</h4>
                                                {item.screen_questions ? (
                                                  <div>
                                                    {item.screen_questions.map(
                                                      (ques, questionIndex) => (
                                                        <div
                                                          key={questionIndex}
                                                          style={{
                                                            paddingBottom:
                                                              "30px",
                                                          }}
                                                        >
                                                          <h5>{ques.name}</h5>
                                                          {ques.screen_questions_options
                                                            ? ques.screen_questions_options.map(
                                                                (
                                                                  option,
                                                                  optionIndex
                                                                ) => (
                                                                  <Form.Check
                                                                    key={
                                                                      optionIndex
                                                                    }
                                                                    type="radio"
                                                                    label={
                                                                      option.option
                                                                    }
                                                                    id={`${ques.id}-${optionIndex}`}
                                                                    className="site-button"
                                                                    name={
                                                                      ques.name
                                                                    }
                                                                    style={{
                                                                      marginRight:
                                                                        "30px",
                                                                      padding:
                                                                        "10px 30px",
                                                                    }}
                                                                    onClick={() => {
                                                                      dispatch(
                                                                        setJobSeekerAnswer(
                                                                          {
                                                                            index:
                                                                              index,
                                                                            questionIndex:
                                                                              questionIndex,
                                                                            answer:
                                                                              option.option,
                                                                          }
                                                                        )
                                                                      );
                                                                    }}
                                                                  />
                                                                )
                                                              )
                                                            : null}
                                                        </div>
                                                      )
                                                    )}
                                                  </div>
                                                ) : null}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      ) : null}
                                    </form>
                                  </Tab.Pane>

                                  <Modal.Footer>
                                    {activeTab !== "contact-info" && (
                                      <button
                                        className="site-button mr-2"
                                        onClick={handlePrev}
                                      >
                                        Previous
                                      </button>
                                    )}
                                    {activeTab === "contact-info" && (
                                      <button
                                        className="site-button"
                                        onClick={() => {
                                          handleClose();
                                          submitApplication();
                                        }}
                                        // onClick={handleClose}
                                      >
                                        Submit
                                      </button>
                                    )}
                                  </Modal.Footer>
                                </Modal>

                                <label className="like-btn" labl>
                                  <input
                                    type="checkbox"
                                    defaultChecked={
                                      selectedJob.job_detail.is_job_favorite
                                    }
                                    name={selectedJob.job_detail.id}
                                    onClick={() => {
                                      toggleFabJobs(selectedJob.job_detail.id);
                                    }}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        )}
                        {selectedJob ? (
                          <div className="job-bx rounded-5 ">
                            <h3>About Company</h3>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: selectedJob.companies.about,
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                      {/* for mobile view  */}
                      {/* <div className="col-xl-4 col-lg-5 m-b30 rounded-5 d-md-none">
                        <div className="sticky-top ">
                          {jobApplicationData ? (
                            <div className="candidate-info company-info rounded-5">
                              <ul
                                className="job-list-container rounded-4 overflow-auto max-height-100"
                                style={{
                                  maxHeight: "calc(100vh - 200px)",
                                  overflowY: "auto",
                                  boxShadow: "0 0 10px 0 rgba(0, 24, 128, 0.1)",
                                }}
                                // className="overflow-auto max-height-100"
                              >
                                {jobApplicationData.map((job) => (
                                  <div key={job.s_no}>
                                    <li>
                                      <Link
                                        to="#"
                                        // onClick={() => setSelectedJob(job)}
                                        onClick={() => handleShowModal(job)}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            width: "100%",
                                            position: "relative",
                                          }}
                                        >
                                          <div
                                            style={{
                                              width: "80%",
                                              overflow: "hidden",
                                            }}
                                          >
                                            {job.job_detail.job_title && (
                                              <p
                                                className="mb-0"
                                                style={{
                                                  color: "black",
                                                  fontWeight: "500",
                                                  fontSize: "20px",
                                                }}
                                              >
                                                {job.job_detail.job_title}
                                              </p>
                                            )}
                                            <div
                                              className="d-flex flex-row mt-2"
                                              style={{
                                                gap: "7px",
                                                fontWeight: "500",
                                              }}
                                            >
                                              {job.companies.company_name}
                                            </div>
                                            <div
                                              className="d-flex flex-row mb-0"
                                              style={{
                                                gap: "3px",
                                                fontSize: "12px",
                                              }}
                                            >
                                              {job.companies.cities.name},{" "}
                                              {job.companies.states.name}
                                            </div>

                                            <div
                                              className="gap-0 align-items-center joblist"
                                              style={{
                                                gap: "0px",
                                                fontSize: "13px",
                                                height: "auto",
                                              }}
                                            >
                                              <div
                                                className="d-flex"
                                                style={{
                                                  justifyContent:
                                                    "space-between",
                                                }}
                                              >
                                                <div>
                                                  {job.job_workplace_types
                                                    .name && (
                                                    <p
                                                      style={{ margin: "0px" }}
                                                    >
                                                      Workplace:{" "}
                                                      {
                                                        job.job_workplace_types
                                                          .name
                                                      }
                                                    </p>
                                                  )}
                                                </div>
                                                <div className="float-end">
                                                  {job.job_detail
                                                    .updated_at && (
                                                    <p
                                                      style={{
                                                        margin: "0px",
                                                        fontWeight: "600",
                                                      }}
                                                    >
                                                      {moment(
                                                        job.job_detail
                                                          .created_at
                                                      ).fromNow()}
                                                    </p>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-7 m-b30 d-md-none ">
                        <Modal
                          show={showModal}
                          onHide={handleCloseModal}
                          centered
                          size="lg"
                        >
                          <Modal.Header closeButton></Modal.Header>
                          <Modal.Body className="p-0">
                            {selectedJob && (
                              <div className="m-b20   ">
                                <div>
                                  <div className="candidate-title ">
                                    <div className=" align-items-center mt-6 p-2">
                                      <div>
                                        <Link to="#">
                                          <h5 className="mb-1">
                                            {selectedJob.job_detail.job_title}
                                          </h5>
                                        </Link>
                                      </div>
                                      <div className="">
                                        {localStorage.getItem(
                                          "jobSeekerLoginToken"
                                        ) ? (
                                          <>
                                            {selectedJob.job_detail
                                              .is_job_applied ? (
                                              <button
                                                className="site-button btn btn-primary "
                                                // onClick={handleShow}
                                              >
                                                View Status
                                              </button>
                                            ) : (
                                              <button
                                                className=" site-button btn btn-primary  "
                                                onClick={() => {
                                                  handleClose();
                                                  submitApplication();
                                                }}
                                                // onClick={handleClose} yehi h formal submit
                                              >
                                                Apply
                                              </button>
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              className=" site-button btn btn-primary justify-end "
                                              onClick={() =>
                                                navigate("/user/login")
                                              }
                                            >
                                              Apply now
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="job-details-content">
                                      {selectedJob.job_workplace_types.name &&
                                        selectedJob.job_type.name &&
                                        selectedJob.job_category.name && (
                                          <p className="p-2">
                                            {
                                              selectedJob.job_workplace_types
                                                .name
                                            }{" "}
                                            | {selectedJob.job_type.name} |{" "}
                                            {selectedJob.job_category.name}
                                          </p>
                                        )}
                                      <div
                                        className="d-flex"
                                        style={{
                                          gap: "4px",
                                          overflowX: "auto", // Enable horizontal scrolling
                                          whiteSpace: "nowrap", // Prevent items from wrapping
                                          maxWidth: "100%",
                                        }}
                                      >
                                        {selectedJob.job_detail.skills_arr.map(
                                          (item, index) => (
                                            <p
                                              key={index}
                                              className="btn btn-primary mr-1 mb-1 badge"
                                            >
                                              {item}
                                            </p>
                                          )
                                        )}
                                      </div>
                                      {selectedJob.job_detail.skills && (
                                        <p>
                                          Skills:{" "}
                                          {selectedJob.job_detail.skills}
                                        </p>
                                      )}
                                      <p>
                                        You must create an nova account before
                                        continuing to the company website to
                                        apply
                                      </p>
                                      <div className="d-inline-block border-end border-1 border-btn btn-outline-secondary w-100 mb-4"></div>
                                      <h6>job details</h6>
                                      {selectedJob.companies.id && (
                                        <div
                                          className="d-flex "
                                          style={{
                                            gap: "50px",
                                          }}
                                        >
                                          <p
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              navigate(
                                                `/user/company/${selectedJob.companies.id}`
                                              );
                                            }}
                                          >
                                            <i
                                              class="fa fa-briefcase"
                                              aria-hidden="true"
                                            ></i>
                                            {"  "}
                                            {selectedJob.companies.company_name}
                                          </p>
                                          <p>
                                            <i
                                              class="fa fa-registered"
                                              aria-hidden="true"
                                            ></i>

                                            {"  "}
                                            {selectedJob.companies.founded_date}
                                          </p>
                                        </div>
                                      )}
                                      {selectedJob.companies.id && (
                                        <div
                                          className="d-flex"
                                          style={{
                                            gap: "100px",
                                          }}
                                        >
                                          <p>
                                            <i className="fa fa-map-marker mr-2"></i>
                                            {selectedJob.companies.cities.name},{" "}
                                            {selectedJob.companies.states.name},{" "}
                                            {
                                              selectedJob.companies.countries
                                                .name
                                            }
                                          </p>
                                        </div>
                                      )}{" "}
                                    </div>

                                    <div className="d-inline-block border-end border-1 border-btn btn-outline-secondary w-100 my-3"></div>
                                    <h6>Full job description</h6>
                                    {selectedJob.job_detail.job_description && (
                                      <p className="mb-1">
                                        <div
                                          className="ql-editor"
                                          style={{
                                            fontSize: "13px",
                                          }}
                                          dangerouslySetInnerHTML={{
                                            __html:
                                              selectedJob.job_detail
                                                .job_description,
                                          }}
                                        />
                                      </p>
                                    )}
                                  </div>
                                  {selectedJob.job_detail.created_at && (
                                    <p>
                                      Posted{" "}
                                      {moment(
                                        selectedJob.job_detail.created_at
                                      ).fromNow()}
                                    </p>
                                  )}

                                  <div className="d-flex justify-content-start align-items-center">
                                    <Modal
                                      show={show}
                                      onHide={handleClose}
                                      backdrop="static"
                                      keyboard={false}
                                    >
                                      <Modal.Header
                                        closeButton
                                        style={{ backgroundColor: "#ffff" }}
                                        className="mt-4"
                                      >
                                        <Modal.Title style={{ color: "#000" }}>
                                          <p> Apply to {selectedJob.company}</p>
                                        </Modal.Title>
                                      </Modal.Header>

                                      <Tab.Pane eventKey="contact-info">
                                        <form className="col-12 p-a0">
                                          {selectedJob.screen_questions &&
                                          selectedJob.screen_questions
                                            .screen_question_keywords ? (
                                            <div>
                                              <div
                                                style={{
                                                  fontSize: "20px",
                                                  paddingBottom: "10px",
                                                }}
                                              >
                                                Screening questions
                                              </div>
                                              {selectedJob.screen_questions.screen_question_keywords.map(
                                                (item, index) => (
                                                  <div key={index}>
                                                    <h4>{item.name}</h4>
                                                    {item.screen_questions ? (
                                                      <div>
                                                        {item.screen_questions.map(
                                                          (
                                                            ques,
                                                            questionIndex
                                                          ) => (
                                                            <div
                                                              key={
                                                                questionIndex
                                                              }
                                                              style={{
                                                                paddingBottom:
                                                                  "30px",
                                                              }}
                                                            >
                                                              <h5>
                                                                {ques.name}
                                                              </h5>
                                                              {ques.screen_questions_options
                                                                ? ques.screen_questions_options.map(
                                                                    (
                                                                      option,
                                                                      optionIndex
                                                                    ) => (
                                                                      <Form.Check
                                                                        key={
                                                                          optionIndex
                                                                        }
                                                                        type="radio"
                                                                        label={
                                                                          option.option
                                                                        }
                                                                        id={`${ques.id}-${optionIndex}`}
                                                                        className="site-button"
                                                                        name={
                                                                          ques.name
                                                                        }
                                                                        style={{
                                                                          marginRight:
                                                                            "30px",
                                                                          padding:
                                                                            "10px 30px",
                                                                        }}
                                                                        onClick={() => {
                                                                          dispatch(
                                                                            setJobSeekerAnswer(
                                                                              {
                                                                                index:
                                                                                  index,
                                                                                questionIndex:
                                                                                  questionIndex,
                                                                                answer:
                                                                                  option.option,
                                                                              }
                                                                            )
                                                                          );
                                                                        }}
                                                                      />
                                                                    )
                                                                  )
                                                                : null}
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          ) : null}
                                        </form>
                                      </Tab.Pane>

                                      <Modal.Footer>
                                        {activeTab !== "contact-info" && (
                                          <button
                                            className="site-button mr-2"
                                            onClick={handlePrev}
                                          >
                                            Previous
                                          </button>
                                        )}
                                        {activeTab === "contact-info" && (
                                          <button
                                            className="site-button"
                                            onClick={() => {
                                              handleClose();
                                              submitApplication();
                                            }}
                                            // onClick={handleClose}
                                          >
                                            Submit
                                          </button>
                                        )}
                                      </Modal.Footer>
                                    </Modal>

                                    <label className="like-btn" labl>
                                      {console.log(selectedJob, "selected job")}
                                      <input
                                        type="checkbox"
                                        defaultChecked={
                                          selectedJob.job_detail.is_job_favorite
                                        }
                                        name={selectedJob.job_detail.id}
                                        onClick={() => {
                                          toggleFabJobs();
                                        }}
                                      />
                                      <span className="checkmark"></span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}
                            {selectedJob ? (
                              <div className="  ">
                                <h5>About Company</h5>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: selectedJob.companies.about,
                                  }}
                                />
                              </div>
                            ) : null}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              onClick={handleCloseModal}
                            >
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div> */}
                    </div>
                  </div>
                ) : (
                  <div className="w-100 d-flex align-items-center justify-content-center ">
                    <img
                      src={SkeletonImg}
                      alt="no data there"
                      style={{ width: "40%" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default JobPage;
