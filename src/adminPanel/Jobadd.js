import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';


import { Form, Button } from "react-bootstrap";
import { FaX } from "react-icons/fa6";
import TextEditor from "../employeeMarkup/Element/Editor";
import AddSkills from "../employeeMarkup/Element/AddSkills";
import AddScreening from "../employeeMarkup/Element/AddScreening";
import { FaCircleQuestion } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  setPostAJobData,
  setSelctedScreeningQuestionGet,
  setSkillsData,
} from "../store/reducers/postAJobSlice";


import ReactQuill from "react-quill";
import QualificationSetting from "../employeeMarkup/Element/qualificationSettingsEditor";
import axios from "axios";
import { showToastSuccess , showToastError } from "../utils/toastify";

import { useEffect } from "react";
import CustomNavbar from "./Navbar";



function Jobadd() {


  
  const postAJobData = useSelector((state) => state.postAJobSlice.postAJobData);

  const postAJobSkills = useSelector((state) => state.postAJobSlice.skillsData);
  const [jobCategories, setJobCategories] = useState([]);
  const [experience_level_id, setexperience_level_id] = useState([]);
  const [description, setDescription] = useState(false);
  const selelctedQuestions = useSelector(
    (state) =>
      state.postAJobSlice.selectedScreeningQuestions.screen_question_keywords
  );
  const [suggestions, setSuggestions] = useState(true);
  const [showAiButton, setShowAiButton] = useState(true);
  const handleSuggestions = () => {
    setSuggestions(false);
  };
  const [jobPostingStatus, setJobPostingStatus] = useState("pending");

  function renderSection(text) {
    const htmlText = text
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.startsWith("**")) {
          const parts = paragraph.replace(/\*\*/g, "").split(":");
          const title = parts[0].trim();
          const content = parts.slice(1).join(":").trim();
          return `<h2>${title}</h2><p>${content}</p>`;
        } else if (paragraph.startsWith("*")) {
          const items = paragraph
            .split("\n")
            .map((item) => `<li>${item.replace("*", "").trim()}</li>`);
          return `<ul>${items.join("")}</ul>`;
        }
        return `<p>${paragraph.trim()}</p>`;
      })
      .join("");
    dispatch(
      setPostAJobData({
        ...postAJobData,

        description: htmlText,
      })
    );
    setDescription(false);
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
  
  const token = localStorage.getItem("authToken");
  const [jobType, setJobType] = useState([]);
  const [workplaceType, setWorkplaceType] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.novajobs.us/api/admin/job-categories",
      headers: {
        Authorization: token,
      },
    })
     .then((res) => {
        setJobCategories(res.data.data); 
        console.log('console h',res.data.data)// Update jobCategories state here
      })
      .catch((err) => {
        console.log("Error fetching job categories:", err);
      });
  }, [token]);
  
  
  // Function to render job categories as dropdown options
  const renderJobCategories = () => {
    return jobCategories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };
  
  useEffect(() => {
    axios({
      method: "get",
      url: "https://api.novajobs.us/api/admin/experience-level",
      headers: {
        Authorization: token,
      },
    })
     .then((res) => {
        setexperience_level_id(res.data.data); 
        console.log('console h',res.data.data)// Update jobCategories state here
      })
      .catch((err) => {
        console.log("Error fetching job categories:", err);
      });
  }, [token]);
  
  
  // Function to render job categories as dropdown options
  const renderexperience_level_id = () => {
    return experience_level_id.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  };
  

  const getJob = async () => {
    await axios({
      url: `https://api.novajobs.us/api/admin/job-lists/${id}`,
      method: "get",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data.companies.company_name, "joy");
        dispatch(
          setPostAJobData({
            jobTitle: res.data.data.job_detail.job_title,
            company: res.data.data.companies.company_name,
            workplaceType: res.data.data.job_detail.workplace_type_id,
            jobType: res.data.data.job_detail.job_type_id,
            description: res.data.data.job_detail.job_description,
            selectedCity: res.data.data.job_detail.city_id,
            selectedState: res.data.data.job_detail.state_id,
            selectedCountry: res.data.data.job_detail.country_id,
            job_title: res.data.data.job_detail.job_title,
            salary: res.data.data.job_detail.salary
          })
        );
        dispatch(setSkillsData(res.data.data.job_detail.skills_arr));
        if (res.data.data.screen_questions.screen_question_keywords !== null) {
          dispatch(
            setSelctedScreeningQuestionGet(res.data.data.screen_questions)
          );
        }
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const aiJobDescription = async () => {
    setDescription(true);
    await axios({
      url: `https://api.novajobs.us/api/admin/ai-job-description`,
      method: "post",
      headers: {
        Authorization: token,
      },
      data: {
        keyword: postAJobData.jobTitle,
        title: postAJobData.jobTitle,
        workplace_type:Number(postAJobData.workplaceType)|| 0,
        job_type: Number(postAJobData.jobType)||0,
        company: postAJobData.company,
      },
    }).then((res) => {
      console.log(res.data.data.description);
      renderSection(res.data.data.description);
    });
  };

  const postCompleted = async () => {
    await axios({
      url: `https://api.novajobs.us/api/admin/job-post/${id}`,
      method: "PUT",
      headers: {
        Authorization: token,
      },
      data: {
        job_category_id: Number(postAJobData.jobCategory),
        job_title: postAJobData.jobTitle,
        job_description: postAJobData.description,
        workplace_type_id: Number(postAJobData.workplaceType),
        country_id: Number(postAJobData.selectedCountry),
        state_id: Number(postAJobData.selectedState),
        city_id: Number(postAJobData.selectedCity),
        experience_level_id: Number(postAJobData.experience_level_id),
        is_publish: 1,
        salary:postAJobData.salary,
       
        
        
        screen_questions: {
          screen_question_keywords: selelctedQuestions,
        },
        skills: postAJobSkills,
        
      },
    }).then((res) => {
      console.log(res);
    });
  };

  
  const getJobTyes = async () => {
    await axios({
      url: "https://api.novajobs.us/api/admin/job-types",

      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setJobType(res.data.data);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const getWorkplaceType = async () => {
    await axios({
      url: "https://api.novajobs.us/api/admin/workplace-types",

      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setWorkplaceType(res.data.data);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  const getCountry = async () => {
    await axios({
      method: "get",
      url: "https://api.novajobs.us/api/admin/countries",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setCountries(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        setCities([]);
      });
  };

  const getState = async () => {
    await axios({
      method: "get",
      url: `https://api.novajobs.us/api/admin/stats/231`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.data.data) {
          setStates([]);

          setCities([]);
          return;
        }
        setStates(res.data.data);
        console.log(res.data.data);
      })

      .catch((error) => {
        console.log(error);
        setStates([]);
        setCities([]);
      });
  };
  const getCities = async () => {
    await axios({
      method: "get",
      url: `https://api.novajobs.us/api/admin/cities/${postAJobData.selectedState}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.data.data) {
          setStates([]);

          setCities([]);
          return;
        }
        setCities(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        setCities([]);
        console.log(error);
      });
  };

  useEffect(() => {
    getJob();
    getJobTyes();
    getWorkplaceType();
    getCountry();
  }, []);

  

  
  
  useEffect(() => {
    // console.log(selectedCountry);
    dispatch(
      setPostAJobData({
        ...postAJobData,
        selectedCity: 0,
        selectedState: 0,
      })
    );

    getState();
  }, [postAJobData.selectedCountry]);



  useEffect(() => {
    dispatch(
      setPostAJobData({
        ...postAJobData,
        selectedCity: 0,
      })
    );
    getCities();
  }, [postAJobData.selectedState]);


  useEffect(() => {
    dispatch(
      setPostAJobData({
        ...postAJobData,
        selectedCity: 0,
      })
    );
    getCities();
  }, [postAJobData.selectedState]);

  

  useEffect(() => {
    if (postAJobData.jobTitle !== "") {
      setShowAiButton(false);
    }
  }, [postAJobData]);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let updatedErrors = { ...errors };
  
    if (name === "jobTitle") {
      // Validate allow only characters
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        updatedErrors = { ...errors, jobTitle: "Please add only characters." };
      } else {
        updatedErrors = { ...errors, jobTitle: "" };
      }
    } else if (name === "company") {
      // Validate allow only characters
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        updatedErrors = { ...errors, company: "Please add only characters." };
      } else {
        updatedErrors = { ...errors, company: "" };
      }
    } else if (name === "jobCategory") {
      // Validate job category (assuming it should not be empty)
      if (value.trim() === "") {
        updatedErrors = { ...errors, jobCategory: "Job category is required." };
      } else {
        updatedErrors = { ...errors, jobCategory: "" };
      }
    } else if (name === "experience_level_id") {
      // Validate job category (assuming it should not be empty)
      if (value.trim() === "") {
        updatedErrors = { ...errors, experience_level_id: "experience_level_id is required." };
      } else {
        updatedErrors = { ...errors, experience_level_id: "" };
      }
    }
    
  
    setErrors(updatedErrors); // Update errors state first
  
    dispatch(setPostAJobData({ ...postAJobData, [name]: value })); // Then update postAJobData state
  };
  
  const [errors, setErrors] = useState({
    jobTitle: "",
    company: "",
  });
  console.log(countries, "ciosda");

  const handlePostJob = async () => {
    // Step 2: Update job posting status and perform necessary actions
    setJobPostingStatus("under_review");
    // Call your API to post the job here
    try {
      await postCompleted();
      showToastSuccess("Your Job post is under review");
    } catch (error) {
      showToastError("Failed to post job");
    }
  };
  return (
    <>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col className="w-full">
            <div className="page-content bg-white">
              <div className="content-block">
                <div className="section-full bg-white p-t50 p-b20">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-9 col-lg-9 m-b30">
                        <div className="job-bx submit-resume">
                          <div className="job-bx-title clearfix">
                            <h5 className="font-weight-700 pull-left text-uppercase">
                              Add A Job
                            </h5>
                          </div>
                          <form>
                            <div className="row">
                              <div className="col-12 ">
                                <div className="form-group">
                                  <label htmlFor="jobTitle">Job Title</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Job Title"
                                    id="jobTitle"
                                    name="jobTitle"
                                    value={postAJobData.jobTitle}
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.jobTitle && (
                                  <p className="text-danger">
                                    {errors.jobTitle}
                                  </p>
                                )}
                              </div>
                              <div className="col-6 ">
                                <div className="form-group">
                                  <label htmlFor="salary">Salary</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Salary"
                                    id="salary"
                                    name="salary"
                                    value={postAJobData.salary}
                                    onChange={handleChange}
                                  />
                                </div>
                                {errors.jobTitle && (
                                  <p className="text-danger">
                                    {errors.jobTitle}
                                  </p>
                                )}
                              </div>
                              <div className="col-6">
                                <div className="form-group">
                                  <label htmlFor="experience_level_id">
                                    Experience
                                  </label>
                                  <Form.Control
                                    as="select"
                                    custom
                                    name="experience_level_id"
                                    id="experience_level_id"
                                    value={postAJobData.experience_level_id}
                                    onChange={handleChange}
                                  >
                                    {renderexperience_level_id()}
                                  </Form.Control>
                                </div>
                              </div>
                              <div className="col-12 ">
                                <div className="form-group">
                                  <label htmlFor="company">Company</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Company"
                                    id="company"
                                    name="company"
                                    value={postAJobData.company}
                                    disabled
                                  />
                                </div>
                                {errors.company && (
                                  <p className="text-danger">
                                    {errors.company}
                                  </p>
                                )}
                              </div>
                              {/* <div className="col-12">
                          <div className="form-group">
                            <label>Your email</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="info@gmail.com"
                            />
                          </div>
                        </div> */}
                              {/* <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Job Tags</label>
                            <input
                              type="text"
                              className="form-control tags_input"
                            />
                          </div>
                        </div> */}
                              <div className="ccol-lg-6 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="workplaceType">
                                    Workplace type
                                  </label>
                                  {workplaceType ? (
                                    <Form.Control
                                      as="select"
                                      custom
                                      value={postAJobData.workplaceType}
                                      onChange={handleChange}
                                      name="workplaceType"
                                    >
                                      {workplaceType.map((item) => (
                                        <option key={item.id} value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label htmlFor="jobCategory">
                                    Job Category
                                  </label>
                                  <Form.Control
                                    as="select"
                                    custom
                                    name="jobCategory"
                                    id="jobCategory"
                                    value={postAJobData.jobCategory}
                                    onChange={handleChange}
                                  >
                                    {renderJobCategories()}
                                  </Form.Control>
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>Country</label>
                                  {countries ? (
                                    <Form.Control
                                      as="select"
                                      custom
                                      className="custom-select"
                                      name="selectedCountry"
                                      value={postAJobData.selectedCountry}
                                      onChange={handleChange}
                                    >
                                      {countries.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>State</label>
                                  {states ? (
                                    <Form.Control
                                      as="select"
                                      custom
                                      className="custom-select"
                                      name="selectedState"
                                      value={postAJobData.selectedState}
                                      onChange={handleChange}
                                    >
                                      {/* <option value=""></option> */}
                                      {states.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                  <label>City</label>
                                  {cities ? (
                                    <Form.Control
                                      as="select"
                                      custom
                                      name="selectedCity"
                                      className="custom-select"
                                      value={postAJobData.selectedCity}
                                      onChange={handleChange}
                                    >
                                      {/* <option value=""></option> */}

                                      {cities.map((item) => (
                                        <option value={item.id}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </Form.Control>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col-6">
                                <div className="form-group">
                                  <label htmlFor="jobType">Job Type</label>
                                  {jobType ? (
                                    <Form.Control
                                      as="select"
                                      custom
                                      className="custom-select"
                                      name="jobType"
                                      id="jobType"
                                      value={postAJobData.jobType}
                                      onChange={handleChange}
                                    >
                                      {jobType.map(
                                        (item) => (
                                          console.log(item),
                                          (
                                            <option value={item.id}>
                                              {item.name}
                                            </option>
                                          )
                                        )
                                      )}
                                    </Form.Control>
                                  ) : null}
                                </div>
                              </div>
                              {/* <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Experience</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>1 Years</option>
                              <option>2 Years</option>
                              <option>3 Years</option>
                              <option>4 Years</option>
                              <option>5 Years</option>
                            </Form.Control>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Minimum Salary ($):</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="e.g. 10000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Maximum Salary ($):</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. 20000"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>Region</label>
                            <Form.Control
                              as="select"
                              custom
                              className="custom-select"
                            >
                              <option>New York</option>
                              <option>London</option>
                              <option>Los Angeles</option>
                            </Form.Control>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>Upload File</label>
                            <div className="custom-file">
                              <p className="m-a0">
                                <i className="fa fa-upload"></i>
                                Upload File
                              </p>
                              <input
                                type="file"
                                className="site-button form-control"
                                id="customFile"
                              />
                            </div>
                          </div>
                        </div> */}
                            </div>
                            {/* <button type="button" className="site-button m-b30">
                        Upload
                      </button> */}
                          </form>
                          {suggestions === false ? null : (
                            <div
                              className="d-flex flex-column  flex-row  p-4"
                              style={{
                                backgroundColor: "#edf3f8",
                                borderRadius: "7px",
                              }}
                            >
                              <div className="d-flex justify-content-end ">
                                <FaX
                                  className="outline-none p-0 border-0 f"
                                  onClick={handleSuggestions}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>
                              <p>
                                987 members with titles similar to Business
                                Development Specialist are actively seeking jobs
                                in USA.
                              </p>
                            </div>
                          )}
                          {showAiButton ? null : (
                            <div>
                              <div className="d-flex my-3 flex-column gap-3 ">
                                <Button
                                  onClick={() => {
                                    aiJobDescription();
                                  }}
                                  className="py-3 "
                                  style={{
                                    borderRadius: "50px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Write With AI
                                </Button>
                              </div>
                              <p className="text-center ">
                                If You want help with your job description, we
                                will use the information above and AI to suggest
                                One. <br />{" "}
                                {/*<span style={{ color: "#0a66c2", fontWeight: "600" }}>
                            Learn More
                          </span>*/}
                              </p>
                              <p className="text-center ">
                                Limits may apply to free job posts.
                                <Link to={"/employer/term-of-use-nova-jobs"}>
                                  <span
                                    style={{
                                      color: "#0a66c2",
                                      fontWeight: "600",
                                    }}
                                  >
                                    View Our Policy
                                  </span>
                                </Link>
                              </p>
                            </div>
                          )}
                          <div>
                            {" "}
                            <br />
                            <h4>Description</h4>
                            {description ? (
                              <div>
                                <Skeleton width={718} />
                                <Skeleton width={726} />
                                <Skeleton width={732} />
                                <Skeleton width={740} />
                              </div>
                            ) : (
                              <TextEditor value={postAJobData.description} />
                            )}
                          </div>
                          <div>
                            <h4>Skills</h4>
                            <p className="mb-2">
                              Add Skill Keywords (max 10) to make your job more
                              visible to the right candidates.
                            </p>
                            <AddSkills />
                          </div>
                          <div className="mt-4">
                            <h4>Screening Questions</h4>
                            <AddScreening />
                          </div>
                          <div className="mt-4">
                            <h4>Qualification setting</h4>
                            <div className="d-flex justify-content-start align-items-center">
                              <div class="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  id="check1"
                                  class="custom-control-input selectAllCheckBox"
                                  name="example1"
                                  disabled
                                />
                                <label
                                  class="custom-control-label"
                                  for="check1"
                                ></label>
                              </div>
                              <div
                                style={{ color: "#9d9d9d" }}
                                className="ms-4"
                              >
                                Filter out and send rejections to applicants who
                                don't meet any must-have qualifications.{" "}
                                <FaCircleQuestion />
                              </div>
                            </div>
                            <p className="mb-0 mt-2">Preview*</p>
                            <QualificationSetting />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 10,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: 10,
                              }}
                            >
                              {/* Step 3: Update UI based on job posting status */}
                              {jobPostingStatus === "pending" ? (
                                <button
                                  onClick={handlePostJob}
                                  className="site-button d-flex justify-content-center align-items-center"
                                >
                                  Post job
                                </button>
                              ) : (
                                <button
                                  // onClick={handleAddSkill}
                                  className="site-button d-flex justify-content-center align-items-center"
                                >
                                  Add Another Job
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Jobadd;
