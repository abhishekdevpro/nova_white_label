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
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import { FaSave, FaSearch, FaTimes } from "react-icons/fa";
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
      url: "https://api.novajobs.us/api/employeer/countries",
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
      url: `https://api.novajobs.us/api/employeer/stats/231`,
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
    axios({
      method: "GET",
      url: `https://api.novajobs.us/api/employeer/cities/${browseCandidateValues.state_id}`,
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
      url: "https://api.novajobs.us/api/employeer/experience-level",
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
      url: "https://api.novajobs.us/api/employeer/salary-range",
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
      url: "https://api.novajobs.us/api/employeer/educations",
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

  const baseUrl = "https://api.novajobs.us/api/employeer/job-seekers";

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

  const handleGetReq = () => {
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
          setTotalPages(response.data.totalPages); // Adjust based on API response
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
    handleGetReq(); // Re-fetch the data with the new page number
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

        {browseCandidateData ? (
          <div className="content-block ">
            <div className="section-full bg-white browse-job p-b50">
              {showSkeleton === true ? (
                <div className="bg-white w-100 ">
                  <TwoBoxWithLinesSkeleton />
                </div>
              ) : (
                <div className="container ">
                  <div className="row">
                    <div className="col-xl-10">
                      <div className="sticky-top">
                        {browseCandidateData ? (
                          <div className="company-info">
                            <ul className="post-job-bx browse-job ">
                              {browseCandidateData.map((item, index) => (
                                <li>
                                  <div key={index}>
                                    <li>
                                      {/* <Link
                                        to="#"
                                        // onClick={() => handleSelectJob(item)}
                                      > */}
                                      <div className="post-bx d-flex mb-3">
                                        <div className="job-post-company ">
                                          <span>
                                            <img
                                              src={require("./../../images/logo/icon1.png")}
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                        <div className="job-post-info ">
                                          <div
                                            className="text-black mb-2"
                                            style={{
                                              fontWeight: "700",
                                              fontSize: "25px",
                                              cursor: "pointer",
                                            }}
                                            key={index}
                                            // onClick={() =>
                                            //   navigate(
                                            //     `/employer/profilepage/${item?.jobskkers_detail?.id}`
                                            //   )
                                            // }
                                          >
                                            {/* {item.jobskkers_detail
                                                .proffesional_title ||
                                                (item.jobskkers_detail
                                                  .last_name && (
                                                  <p>
                                                    {
                                                      item.jobskkers_detail
                                                        .proffesional_title
                                                    }{" "}
                                                    {
                                                      item.jobskkers_detail
                                                        .last_name
                                                    }
                                                  </p>
                                                ))} */}
                                            {item.jobskkers_detail.first_name &&
                                              item.jobskkers_detail
                                                .last_name && (
                                                <p>
                                                  {
                                                    item.jobskkers_detail
                                                      .first_name
                                                  }{" "}
                                                  {
                                                    item.jobskkers_detail
                                                      .last_name
                                                  }
                                                </p>
                                              )}
                                          </div>

                                          <div
                                            className="gap-0 align-items-center joblist d-flex gap-4 text-black "
                                            style={{
                                              gap: "0px",
                                              height: "auto",
                                              fontSize: "15px",
                                            }}
                                          >
                                            <div
                                              className="d-flex"
                                              style={{
                                                justifyContent: "start",
                                                gap: "10px",
                                              }}
                                            >
                                              <div>
                                                <p>
                                                  <FontAwesomeIcon
                                                    icon={faBriefcase}
                                                    className="mr-2"
                                                    style={{
                                                      color: "#1c2957",
                                                    }}
                                                  />{" "}
                                                  {item.jobskkers_detail
                                                    .proffesional_title
                                                    ? item.jobskkers_detail
                                                        .proffesional_title
                                                    : "Data Coordination and Resilience Intern"}
                                                </p>
                                              </div>
                                              |
                                              <div>
                                                <Link
                                                  to={`${item?.jobskkers_detail?.company_linkedin_link}`}
                                                >
                                                  <p>
                                                    {" "}
                                                    <FontAwesomeIcon
                                                      icon={faIndustry}
                                                      className="mr-2"
                                                      style={{
                                                        color: "#1c2957",
                                                      }}
                                                    />
                                                    {item.jobskkers_detail
                                                      .industry_name
                                                      ? item.jobskkers_detail
                                                          .industry_name
                                                      : "Government Administration"}
                                                  </p>
                                                </Link>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="d-flex  joblist mb-4">
                                            <div>
                                              {item.jobskkers_detail.cities
                                                .id && (
                                                <p
                                                  style={{
                                                    margin: "0px",
                                                    color: "black",
                                                  }}
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faMapMarkerAlt}
                                                    className="mr-2"
                                                    style={{
                                                      color: "#1c2957",
                                                    }}
                                                  />
                                                  {
                                                    item?.jobskkers_detail
                                                      ?.cities?.name
                                                  }
                                                </p>
                                              )}
                                            </div>
                                            ,
                                            <div>
                                              {item.jobskkers_detail.states
                                                .id && (
                                                <p
                                                  style={{
                                                    margin: "0px",
                                                    color: "black",
                                                  }}
                                                >
                                                  {
                                                    item?.jobskkers_detail
                                                      ?.states?.name
                                                  }
                                                </p>
                                              )}
                                            </div>
                                            ,{" "}
                                            <div>
                                              {item.jobskkers_detail.countries
                                                .id && (
                                                <p
                                                  style={{
                                                    margin: "0px",
                                                    color: "black",
                                                  }}
                                                >
                                                  {
                                                    item?.jobskkers_detail
                                                      ?.countries?.name
                                                  }
                                                </p>
                                              )}
                                            </div>{" "}
                                          </div>
                                          <div
                                            className="gap-0 align-items-center joblist d-flex gap-4 text-black "
                                            style={{
                                              gap: "0px",
                                              height: "auto",
                                              fontSize: "15px",
                                            }}
                                          >
                                            <div
                                              className="d-flex"
                                              style={{
                                                justifyContent: "start",
                                                gap: "10px",
                                              }}
                                            >
                                              <div>
                                                <p>
                                                  {" "}
                                                  <FontAwesomeIcon
                                                    icon={faGraduationCap}
                                                    className="mr-2"
                                                    style={{
                                                      color: "#1c2957",
                                                    }}
                                                  />
                                                  {item.jobskkers_detail.degree
                                                    ? item.jobskkers_detail
                                                        .degree
                                                    : "Bachelor's degree"}
                                                </p>
                                              </div>
                                              |
                                              <div>
                                                <p>
                                                  {" "}
                                                  <FontAwesomeIcon
                                                    icon={faUniversity}
                                                    className="mr-2"
                                                    style={{
                                                      color: "#1c2957",
                                                    }}
                                                  />
                                                  {item.jobskkers_detail
                                                    .education
                                                    ? item.jobskkers_detail
                                                        .education
                                                    : "University of South Carolina"}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          {/* <div
                                              className="gap-0 align-items-center joblist d-flex gap-4 text-black mb-2"
                                              style={{
                                                gap: "0px",
                                                height: "auto",
                                                fontSize: "15px",
                                              }}
                                            >
                                              <div
                                                className="d-flex"
                                                style={{
                                                  justifyContent: "start",
                                                  gap: "10px",
                                                }}
                                              >
                                                <div className="d-flex">
                                                  <div>
                                                    {item.jobskkers_detail
                                                      .cities.id && (
                                                      <p
                                                        style={{
                                                          margin: "0px",
                                                          color: "black",
                                                        }}
                                                      >
                                                        <FontAwesomeIcon
                                                          icon={faMapMarkerAlt}
                                                          className="mr-2"
                                                          style={{
                                                            color: "#1c2957",
                                                          }}
                                                        />
                                                        {
                                                          item?.jobskkers_detail
                                                            ?.cities?.name
                                                        }
                                                      </p>
                                                    )}
                                                  </div>
                                                  ,
                                                  <div>
                                                    {item.jobskkers_detail
                                                      .states.id && (
                                                      <p
                                                        style={{
                                                          margin: "0px",
                                                          color: "black",
                                                        }}
                                                      >
                                                        {
                                                          item?.jobskkers_detail
                                                            ?.states?.name
                                                        }
                                                      </p>
                                                    )}
                                                  </div>
                                                  ,{" "}
                                                  <div>
                                                    {item.jobskkers_detail
                                                      .countries.id && (
                                                      <p
                                                        style={{
                                                          margin: "0px",
                                                          color: "black",
                                                        }}
                                                      >
                                                        {
                                                          item?.jobskkers_detail
                                                            ?.countries?.name
                                                        }
                                                      </p>
                                                    )}
                                                  </div>{" "}
                                                </div>
                                                |
                                                <div className="salary-bx">
                                                  <p
                                                    style={{
                                                      margin: "0px",
                                                      color: "black",
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faMoneyBill}
                                                      className="mr-2"
                                                      style={{
                                                        color: "#1c2957",
                                                      }}
                                                    />

                                                    {item.jobskkers_detail
                                                      .expected_salary
                                                      ? item.jobskkers_detail
                                                          .expected_salary
                                                      : "$99 / hour"}
                                                  </p>
                                                </div>
                                              </div>

                                              <div>
                                                {item.jobskkers_detail
                                                  .ai_resume_parse_data
                                                  .jobsMyResumeData
                                                  .desiredCareerProfile
                                                  .employmentType && (
                                                  <p
                                                    style={{
                                                      margin: "0px",
                                                      color: "black",
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      icon={faEnvelope}
                                                      className="mr-2 "
                                                      style={{
                                                        color: "#1c2957",
                                                      }}
                                                    />
                                                    {
                                                      item.jobskkers_detail
                                                        .ai_resume_parse_data
                                                        .jobsMyResumeData
                                                        .desiredCareerProfile
                                                        .employmentType
                                                    }
                                                  </p>
                                                )}
                                              </div>
                                            </div> */}
                                          <div className="mb-4">
                                            {item.jobskkers_detail
                                              .created_at && (
                                              <p
                                                style={{
                                                  margin: "0px",
                                                  fontWeight: "600",
                                                  color: "black",
                                                }}
                                              >
                                                <FontAwesomeIcon
                                                  icon={faCalendarAlt}
                                                  className="mr-2"
                                                  style={{ color: "#1c2957" }}
                                                />
                                                Published{" "}
                                                {moment(
                                                  item.jobskkers_detail
                                                    .created_at
                                                ).fromNow()}
                                              </p>
                                            )}
                                          </div>
                                          <div className="">
                                            {item.jobskkers_detail
                                              .skills_arr ? (
                                              <div className="row mt-3 ">
                                                {item.jobskkers_detail.skills_arr.map(
                                                  (skill, index) => (
                                                    <div
                                                      className="col-3 col-md-3 mb-1 text-break "
                                                      key={index}
                                                    >
                                                      <span
                                                        className="badge badge-info p-2"
                                                        style={{
                                                          backgroundColor:
                                                            "#f0f5f7",
                                                          borderRadius: "100px",
                                                          padding: "5px 15px",
                                                          color: "dimgray",
                                                        }}
                                                      >
                                                        {skill}
                                                      </span>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            ) : null}
                                          </div>
                                          <label className="like-btn">
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                          </label>
                                          <Link
                                            to={`${item?.jobskkers_detail?.linkedin_link}`}
                                          >
                                            <div
                                              style={{
                                                position: "absolute",
                                                right: "20px",
                                                top: "70px",
                                              }}
                                            >
                                              <button
                                                className="site-button btn btn-primary"
                                                // onClick={handleShow}
                                              >
                                                View
                                              </button>
                                            </div>
                                          </Link>

                                          <div className="d-flex mt-3">
                                            <div
                                              className="d-flex align-items-center "
                                              style={{ gap: "7px" }}
                                            >
                                              <div className="salary-bx">
                                                {/* <span>
                                                  {
                                                    item?.jobskkers_detail
                                                      ?.expected_salary
                                                  }
                                                </span> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* </Link> */}
                                    </li>
                                  </div>{" "}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
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
