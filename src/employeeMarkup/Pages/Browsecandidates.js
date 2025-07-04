import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faCheckCircle,
  faMoneyBill,
  faIndustry,
  faGraduationCap,
  faUniversity,
  faBriefcase,
  faClockRotateLeft,
  faDollarSign,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "../../markup/Layout/Footer";
import { FaLanguage, FaSave, FaSearch, FaTimes, FaTools } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { showToastError } from "../../utils/toastify";

import moment from "moment";
import "react-quill/dist/quill.snow.css";

import TwoBoxWithLinesSkeleton from "../../markup/skeleton/twoBoxLines";

import PageTitle from "../Layout/PageTitle";
import SkeletonImg from "../../images/jobpage/No data-pana.png";
import {
  setBrowseCandidateData,
  setBrowseCandidateValues,
} from "../../store/reducers/browseCandidateSlice";
import { Globe } from "lucide-react";
import { toast } from "react-toastify";
var bnr = require("./../../images/banner/bnr1.jpg");
const postBox = [
  { image: require("./../../images/testimonials/pic1.jpg") },
  { image: require("./../../images/testimonials/pic2.jpg") },
  { image: require("./../../images/testimonials/pic3.jpg") },
  { image: require("./../../images/testimonials/pic1.jpg") },
  { image: require("./../../images/testimonials/pic2.jpg") },
  { image: require("./../../images/testimonials/pic3.jpg") },
];

function EmployeeBrowsecandidates() {
  const [selectedJob, setSelectedJob] = useState(null);
  console.log(selectedJob, "selectedJob");
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("contact-info"); // Initial active tab
  const dispatch = useDispatch();
  const [showPhone, setShowPhone] = useState(null);
  const [visibleEmailId, setVisibleEmailId] = useState(null);

  const handleToggleEmail = (id) => {
    setVisibleEmailId((prevId) => (prevId === id ? null : id));
  };

  const handleTogglePhone =(id)=>{
    setShowPhone((prevId)=>(prevId===id ? null : id))
  }
  const [countries, setCountries] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const [states, setStates] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const [cities, setCities] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const [experience, setExperience] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const [selectedState, setSelectedState] = useState("");
  const token = localStorage.getItem("employeeLoginToken");
  const [hasDataFetched, setHasDataFetched] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const browseCandidateValues = useSelector(
    (state) => state.browseCandidateSlice.browseCandidateValues
  );
  const browseCandidateData = useSelector(
    (state) => state.browseCandidateSlice.browseCandidateData
  );
  console.log(hasDataFetched, "data fetched");

  useEffect(() => {
    setSelectedJob(browseCandidateData[0]);
  }, [browseCandidateData]);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const getCountry = () => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/employeer/countries",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        let country = response.data.data;
        setCountries(country);
      })
      .catch((err) => {
        console.log(err);
        setCities([]);
      });
  };

  const getState = () => {
    axios({
      method: "GET",
      url: `https://apiwl.novajobs.us/api/employeer/stats/231`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // console.log(response.data.data, "STATE");
        setStates(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        setStates([]);
        setCities([]);
      });
  };

  const getCities = () => {
    if (!browseCandidateValues.state_id) {
      return;
    }
    axios({
      method: "GET",
      url: `https://apiwl.novajobs.us/api/employeer/cities/${browseCandidateValues.state_id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        // console.log(response, "CITY");
        setCities(response.data.data);
      })
      .catch((err) => {
        console.log(err, "CITY");
        setCities([]);
      });
  };

  useEffect(() => {
    getCountry();
  }, []);

  useEffect(() => {
    dispatch(
      setBrowseCandidateValues({
        ...browseCandidateValues,
        state_id: 0,
        city_id: 0,
      })
    );
    getState();
  }, [browseCandidateValues.country_id]);

  useEffect(() => {
    dispatch(
      setBrowseCandidateValues({
        ...browseCandidateValues,
        city_id: 0,
      })
    );
    getCities();
  }, [browseCandidateValues.state_id]);

  const [experienceValue, setExperienceValue] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [salaryValue, setSalaryValue] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/employeer/experience-level",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setExperienceValue(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/employeer/salary-range",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setSalaryValue(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setBrowseCandidateValues({ ...browseCandidateValues, [name]: value })
    );
  };

  const [educations, setEducations] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/employeer/educations",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setEducations(res.data.data || []);
        setShowSkeleton(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  }, []);

  const baseUrl = "https://apiwl.novajobs.us/api/employeer/job-seekers";

  const params = new URLSearchParams();

  if (browseCandidateValues.experience) {
    params.append("experience_in_month", browseCandidateValues.experience);
  }

  if (browseCandidateValues.salary) {
    params.append("salary_range", browseCandidateValues.salary);
  }

  if (localStorage.getItem("profession_title")) {
    params.append("title_keywords", localStorage.getItem("profession_title"));
  } else if (browseCandidateValues.search_input) {
    params.append("title_keywords", browseCandidateValues.search_input);
  }

  if (selectedState) {
    params.append("location", selectedState);
  }

  if (browseCandidateValues.education) {
    params.append("education", browseCandidateValues.education);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // or use total candidates instead
  const itemsPerPage = 5;

  const url = `${baseUrl}?${params.toString()}&page=${currentPage}&limit=${itemsPerPage}`;
  console.log(url, "this is the url");

  const handleGetReq = (page = currentPage) => {
    const params = new URLSearchParams();

    if (browseCandidateValues.experience) {
      params.append("experience_in_month", browseCandidateValues.experience);
    }

    if (browseCandidateValues.salary) {
      params.append("salary_range", browseCandidateValues.salary);
    }

    if (localStorage.getItem("profession_title")) {
      params.append("title_keywords", localStorage.getItem("profession_title"));
    } else if (browseCandidateValues.search_input) {
      params.append("title_keywords", browseCandidateValues.search_input);
    }

    if (selectedState) {
      params.append("location", selectedState);
    }

    if (browseCandidateValues.education) {
      params.append("education", browseCandidateValues.education);
    }

    const url = `${baseUrl}?${params.toString()}&page_no=${page}&page_size=${itemsPerPage}`;
    console.log(url, "this is the url");

    axios({
      method: "GET",
      url: url,
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.data.data) {
          dispatch(setBrowseCandidateData(response.data.data));
          setTotalPages(Math.ceil(response.data.total_records / 5));
          setShowSkeleton(false);
        } else {
          dispatch(setBrowseCandidateData([]));
        }
      })
      .catch((err) => {
        console.log(err, "custom err");
      });
  };

  useEffect(() => {
    // if (localStorage.getItem("profession_title") !== null) {
    handleGetReq();
    // }
    return () => {
      localStorage.removeItem("profession_title");
    };
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleGetReq(page); // Re-fetch the data with the new page number
  };

  const getSingleCountry = (countryId) => {
    return countries.find((country) => country.id === countryId)?.name || "";
  };

  const getSingleState = (stateId) => {
    return states.find((state) => state.id === stateId)?.name || "";
  };
  const getSingleCity = (cityId) => {
    return cities.find((city) => city.id === cityId)?.name || "";
  };
  const navigate = useNavigate();
  console.log(browseCandidateData, "browsedata");
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div
          className="dez-bnr-inr overlay-black-middle"
          style={{ backgroundImage: "url(" + bnr + ")" }}
        >
          <PageTitle motherName="Home" activeName="Browse Candidates" />
        </div>
        <div className="section-full browse-job-find ">
          <div className="container ">
            <div className="find-job-bx">
              <div className="dezPlaceAni p-t50 p-b20 border shadow rounded-3">
                <div className="d-flex justify-content-center ">
                  <div className="col-lg-8 col-md-2 ">
                    <div className="  w-full p-2  shadow rounded-2" style={{}}>
                      <input
                        type="text"
                        name="search_input"
                        id="search_input"
                        onChange={handleChange}
                        value={browseCandidateValues.search_input}
                        autoComplete="false"
                        className="w-100 p-2 h-100 bg-transparent border-0 "
                        placeholder="search here..."
                        style={{ outline: "none" }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-5">
                    <div className="form-group">
                      <label htmlFor="state_id"></label>
                      <div className="input-group">
                        <select
                          type="text"
                          className="form-control"
                          id="state_id"
                          name="state_id"
                          onChange={handleStateChange}
                          autoComplete="false"
                        >
                          <option value="">Location</option>
                          {states.map((item, index) => {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-2 col-md-5">
                    <div className="form-group">
                      <label htmlFor="salary"></label>
                      <div className="input-group">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleGetReq();
                          }}
                          className="border-0 site-button d-flex align-items-center "
                          style={{
                            cursor: "pointer",
                            outline: "none",
                            gap: "7px",
                          }}
                        >
                          <FaSearch />
                          Find Talent
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {browseCandidateData.length !== 0 ? (
          <div className="content-block ">
            <div className="section-full bg-white browse-job p-b50">
              {showSkeleton === true ? (
                <div className="bg-white w-100 ">
                  <TwoBoxWithLinesSkeleton />
                </div>
              ) : (
                <div className="container ">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="sticky-top">
                        {browseCandidateData ? (
                          <div className="company-info">
                            <ul className="post-job-bx browse-job">
                              {browseCandidateData.map((item, index) => (
                                <li key={index} className="candidate-card">
                                  <div className="post-bx d-flex mb-3 position-relative">
                                    {/* Profile Image */}
                                    <div className="job-post-company">
                                      <span>
                                        <img
                                          src={
                                            item?.jobskkers_detail.photo &&
                                            item?.jobskkers_detail.photo !==
                                              "https://apiwl.novajobs.us"
                                              ? item?.jobskkers_detail.photo
                                              : "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"
                                          }
                                          alt="jobseeker_image"
                                          className="rounded-circle"
                                          style={{
                                            width: "70px",
                                            height: "70px",
                                            objectFit: "cover",
                                            border: "2px solid #eaeaea",
                                          }}
                                        />
                                      </span>
                                    </div>

                                    {/* Candidate Info */}
                                    <div
                                      className="job-post-info ps-3 w-100"
                                      style={{
                                        fontFamily: "'Poppins', sans-serif",
                                      }}
                                    >
                                      {/* Candidate Name/ID */}
                                      <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                          <h4
                                            className="candidate-name mb-0"
                                            style={{
                                              fontWeight: "600",
                                              fontSize: "18px",
                                              color: "#1c2957",
                                              fontFamily:
                                                "'Poppins', sans-serif",
                                            }}
                                          >
                                            {item?.jobskkers_detail
                                              ?.first_name &&
                                            item?.jobskkers_detail?.last_name
                                              ? `${item?.jobskkers_detail?.first_name} ${item?.jobskkers_detail?.last_name}`
                                              : item?.jobskkers_detail
                                                  ?.job_seeker_uuid}
                                          </h4>
                                          {/* <div className="d-flex align-items-center mt-1">
                                            <span
                                              className="text-muted"
                                              style={{
                                                fontSize: "13px",
                                                fontFamily:
                                                  "'Poppins', sans-serif",
                                              }}
                                            >
                                              {item?.jobskkers_detail?.email}
                                            </span>
                                          </div> */}
                                        </div>
                                        <div>
                                          <Link
                                            to={`${
                                              item?.jobskkers_detail
                                                ?.linkedin_link || "#"
                                            }`}
                                          >
                                            <button
                                              className="site-button btn-sm"
                                              
                                            >
                                              View Profile
                                            </button>
                                          </Link>
                                        </div>
                                      </div>

                                      {/* Current Role Info */}
                                      <div className="d-flex flex-wrap mb-3">
                                        <div className="candidate-role-info d-flex align-items-center me-4">
                                          <FontAwesomeIcon
                                            icon={faBriefcase}
                                            className="me-2"
                                            style={{
                                              color: "#6c757d",
                                              fontSize: "14px",
                                            }}
                                          />
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#444",
                                              fontFamily:
                                                "'Poppins', sans-serif",
                                              fontWeight: "400",
                                            }}
                                          >
                                            {item?.jobskkers_detail
                                              ?.job_title || "N/A"}
                                          </span>
                                        </div>

                                        {/* <div className="candidate-experience d-flex align-items-center me-4">
                                          <FontAwesomeIcon
                                            icon={faCalendarAlt}
                                            className="me-2"
                                            style={{
                                              color: "#6c757d",
                                              fontSize: "14px",
                                            }}
                                          />
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#444",
                                              fontFamily:
                                                "'Poppins', sans-serif",
                                              fontWeight: "400",
                                            }}
                                          >
                                            {item?.jobskkers_detail
                                              ?.experience_in_month || "N/A"}
                                          </span>
                                        </div>
                                        <div className="candidate-experience d-flex align-items-center me-4">
                                          <FontAwesomeIcon
                                            icon={faDollarSign}
                                            className="me-2"
                                            style={{
                                              color: "#6c757d",
                                              fontSize: "14px",
                                            }}
                                          />
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#444",
                                              fontFamily:
                                                "'Poppins', sans-serif",
                                              fontWeight: "400",
                                            }}
                                          >
                                            {item?.jobskkers_detail
                                              ?.current_salary || "N/A"}
                                          </span>
                                        </div> */}

                                        <div className="candidate-location d-flex align-items-center">
                                          <FontAwesomeIcon
                                            icon={faMapMarkerAlt}
                                            className="me-2"
                                            style={{
                                              color: "#6c757d",
                                              fontSize: "14px",
                                            }}
                                          />
                                          <span
                                            style={{
                                              fontSize: "14px",
                                              color: "#444",
                                              fontFamily:
                                                "'Poppins', sans-serif",
                                              fontWeight: "400",
                                            }}
                                          >
                                            {item?.jobskkers_detail
                                              ?.current_location
                                              ? item?.jobskkers_detail
                                                  ?.current_location
                                              : "Location N/A"}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Education */}
                                      <div className="candidate-education mb-3">
                                        {item?.jobskkers_detail?.education && (
                                          <div className="education-details">
                                            {JSON.parse(
                                              item.jobskkers_detail.education
                                            )
                                              .slice(0, 1)
                                              .map((edu, eduIndex) => (
                                                <div
                                                  key={eduIndex}
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "#444",
                                                    fontFamily:
                                                      "'Poppins', sans-serif",
                                                  }}
                                                >
                                                  <div className="d-flex align-items-center mb-2">
                                                    <FontAwesomeIcon
                                                      icon={faGraduationCap}
                                                      className="me-2"
                                                      style={{
                                                        fontSize: "16px",
                                                        color: "#6c757d",
                                                      }}
                                                    />
                                                    <span
                                                      style={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                        color: "#1c2957",
                                                        fontFamily:
                                                          "'Poppins', sans-serif",
                                                      }}
                                                    >
                                                      {edu.degree ||
                                                        "BE/B.Tech"}
                                                    </span>
                                                  </div>
                                                  <div
                                                    className="fw-semibold"
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "#444",
                                                      fontFamily:
                                                        "'Poppins', sans-serif",
                                                      fontWeight: "500",
                                                    }}
                                                  >
                                                    {edu.school}
                                                  </div>
                                                  {edu.city1 && (
                                                    <div
                                                      className="text-muted"
                                                      style={{
                                                        fontSize: "13px",
                                                        color: "#6c757d",
                                                        fontFamily:
                                                          "'Poppins', sans-serif",
                                                        fontWeight: "400",
                                                      }}
                                                    >
                                                      {edu.city1}
                                                    </div>
                                                  )}
                                                  {(edu.startYear ||
                                                    edu.endYear) && (
                                                    <div
                                                      className="text-muted"
                                                      style={{
                                                        fontSize: "13px",
                                                        color: "#6c757d",
                                                        fontFamily:
                                                          "'Poppins', sans-serif",
                                                        fontWeight: "400",
                                                      }}
                                                    >
                                                      {edu.startYear} –{" "}
                                                      {edu.endYear || "Present"}
                                                    </div>
                                                  )}
                                                </div>
                                              ))}
                                          </div>
                                        )}
                                      </div>
                                      {/* Langiuage section */}

                                      <div className="candidate-languages mb-3">
                                        <div className="d-flex flex-wrap gap-2">
                                          {(() => {
                                            // Safely parse the JSON string
                                            let parsedLanguages = [];
                                            try {
                                              parsedLanguages = JSON.parse(
                                                item?.jobskkers_detail
                                                  ?.languages || "[]"
                                              );
                                            } catch (e) {
                                              console.error(
                                                "Invalid languages JSON:",
                                                e
                                              );
                                            }

                                            // Get first 5 languages
                                            const displayedLanguages =
                                              parsedLanguages.slice(0);
                                            const remainingCount =
                                              parsedLanguages.length -
                                              displayedLanguages.length;

                                            return (
                                              <>
                                                <p
                                                  style={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    color: "#1c2957",
                                                    fontFamily:
                                                      "'Poppins', sans-serif",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                  }}
                                                >
                                                  <FaLanguage size={16} />
                                                  Language :
                                                </p>

                                                {displayedLanguages.map(
                                                  (lang, index) => (
                                                    <span
                                                      key={index}
                                                      className="language-badge"
                                                      style={{
                                                        backgroundColor:
                                                          "#f0f5f7",
                                                        color: "#1c2957",
                                                        padding: "4px 12px",
                                                        borderRadius: "20px",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        display: "inline-block",
                                                        marginBottom: "6px",
                                                        fontFamily:
                                                          "'Poppins', sans-serif",
                                                      }}
                                                    >
                                                      {lang.language}
                                                      {lang.proficiency
                                                        ? ` (${lang.proficiency})`
                                                        : ""}
                                                    </span>
                                                  )
                                                )}
                                                {remainingCount > 0 && (
                                                  <span
                                                    className="language-badge"
                                                    style={{
                                                      backgroundColor:
                                                        "#e9ecef",
                                                      color: "#495057",
                                                      padding: "4px 12px",
                                                      borderRadius: "20px",
                                                      fontSize: "12px",
                                                      fontWeight: "500",
                                                      display: "inline-block",
                                                      fontFamily:
                                                        "'Poppins', sans-serif",
                                                    }}
                                                  >
                                                    +{remainingCount} more
                                                  </span>
                                                )}
                                              </>
                                            );
                                          })()}
                                        </div>
                                      </div>

                                      {/* Skills Section */}

                                      <div className="candidate-skills">
                                        <div className="d-flex flex-wrap gap-2">
                                          {(() => {
                                            // Safely parse the JSON string
                                            let parsedSkills = [];
                                            try {
                                              parsedSkills = JSON.parse(
                                                item?.jobskkers_detail
                                                  ?.skills || "[]"
                                              );
                                            } catch (e) {
                                              console.error(
                                                "Invalid skills_arr JSON:",
                                                e
                                              );
                                            }

                                            // Flatten all skills into one array
                                            const allSkills =
                                              parsedSkills.flatMap(
                                                (group) => group.skills || []
                                              );

                                            // Show first 5 skills
                                            const displayedSkills =
                                              allSkills.slice(0, 5);
                                            const remainingCount =
                                              allSkills.length -
                                              displayedSkills.length;

                                            return (
                                              <>
                                                <p
                                                  style={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                    color: "#1c2957",
                                                    fontFamily:
                                                      "'Poppins', sans-serif",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                  }}
                                                >
                                                  <FaTools size={16} />
                                                  Skills :
                                                </p>

                                                {displayedSkills.map(
                                                  (skill, index) => (
                                                    <span
                                                      key={index}
                                                      className="skill-badge"
                                                      style={{
                                                        backgroundColor:
                                                          "#f0f5f7",
                                                        color: "#1c2957",
                                                        padding: "4px 12px",
                                                        borderRadius: "20px",
                                                        fontSize: "12px",
                                                        fontWeight: "500",
                                                        display: "inline-block",
                                                        marginBottom: "6px",
                                                        fontFamily:
                                                          "'Poppins', sans-serif",
                                                      }}
                                                    >
                                                      {skill}
                                                    </span>
                                                  )
                                                )}
                                                {remainingCount > 0 && (
                                                  <span
                                                    className="skill-badge"
                                                    style={{
                                                      backgroundColor:
                                                        "#e9ecef",
                                                      color: "#495057",
                                                      padding: "4px 12px",
                                                      borderRadius: "20px",
                                                      fontSize: "12px",
                                                      fontWeight: "500",
                                                      display: "inline-block",
                                                      fontFamily:
                                                        "'Poppins', sans-serif",
                                                    }}
                                                  >
                                                    +{remainingCount} more
                                                  </span>
                                                )}
                                              </>
                                            );
                                          })()}
                                        </div>
                                      </div>

                                      <div className="d-flex gap-3">
                                        {/* View Phone Button */}
                                        <button
                                        key={item?.jobskkers_detail.id}
                                          onClick={() =>
                                            toast.warn("Upgrade your plan,to view this")
                                            // handleTogglePhone(item?.jobskkers_detail.id)
                                          }
                                          className="site-button btn-sm"
                                          
                                        >
                                          {showPhone === item?.jobskkers_detail.id
                                            ? item?.jobskkers_detail?.phone
                                            : "View Phone Number"}
                                        </button>

                                        {/* View Email Button */}
                                        <button
                                          key={item?.jobskkers_detail.id}
                                          onClick={() =>
                                            toast.warn("Upgrade your plan,to view this")
                                            // handleToggleEmail(item?.jobskkers_detail.id)
                                          }
                                          className="site-button btn-sm"
                                          
                                        >
                                          {visibleEmailId === item?.jobskkers_detail.id
                                            ? item?.jobskkers_detail?.email
                                            : "View Email"}
                                        </button>
                                      </div>

                                      {/* Activity Status */}
                                      <div className="candidate-activity mt-3">
                                        <div className="d-flex align-items-center">
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              color: "#777",
                                              fontFamily:
                                                "'Poppins', sans-serif",
                                              fontWeight: "400",
                                            }}
                                          >
                                            <FontAwesomeIcon
                                              icon={faClockRotateLeft}
                                              className="me-1"
                                              style={{
                                                color: "#6c757d",
                                                fontSize: "12px",
                                              }}
                                            />
                                            Active{" "}
                                            {moment(
                                              item?.jobskkers_detail?.created_at
                                            ).fromNow()}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="company-info">
                            <p>No data found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
      <div className="pagination d-flex justify-content-center align-items-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Page {currentPage} of {totalPages}
            </span>
          </li>
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>

      <Footer />
    </>
  );
}
export default EmployeeBrowsecandidates;
