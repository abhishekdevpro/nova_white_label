import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import PageTitle from "./../Layout/PageTitle";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { useState, useEffect } from "react";
import { Tab, Nav, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setJobSeekerAnswer,
  setScreeningQuestion,
} from "../../store/reducers/jobApplicationScreeningQues";

var bnr = require("./../../images/banner/bnr1.jpg");
const blogGrid = [
  {
    image: require("./../../images/blog/grid/pic1.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic2.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic3.jpg"),
  },
  {
    image: require("./../../images/blog/grid/pic4.jpg"),
  },
];

const token = localStorage.getItem("jobSeekerLoginToken");

function Jobdetail() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("contact-info"); // Initial active tab
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );

  const navigate = useNavigate();

  const getJobData = async () => {
    try {
      const res = await axios({
        url: `https://api.novajobs.us/api/jobseeker/job-lists/${id}`,
        method: "get",
        headers: {
          Authorization: token,
        },
      });

      if (res.data && res.data.data) {
        setJobData(res.data.data);
        console.log(res.data.data);
      } else {
        console.log("No job data found.");
      }
    } catch (err) {
      console.log(err);
      showToastError(err?.response?.data?.message);
    }
  };

  const handlePrev = () => {
    // Update activeTab state based on the current active tab
    if (activeTab === "immediate-info") {
      setActiveTab("resume-info");
    } else if (activeTab === "resume-info") {
      setActiveTab("additional-info");
    } else if (activeTab === "additional-info") {
      setActiveTab("contact-info");
    }
  };

  const submitApplication = async () => {
    await axios({
      url: "https://api.novajobs.us/api/jobseeker/jobs-applied",
      method: "POST",
      headers: {
        Authorization: token,
      },
      data: {
        job_id: jobData.job_detail.id,
        screen_questions: screeningQuestion,
      },
    })
      .then((res) => {
        console.log(res);
        getJobData();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (!jobData) return;
    if (jobData.screen_questions && jobData.screen_questions.screen_question_keywords) {
      dispatch(setScreeningQuestion(jobData.screen_questions));
    }
  }, [jobData]);
  

  const convertDate = (date) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  useEffect(() => {
    getJobData();
  }, []);

  return (
    <>
      <Header />
      {jobData === null ? null : (
        <div className="page-content bg-white">
          <div
            className="dez-bnr-inr overlay-black-middle"
            style={{ backgroundImage: "url(" + bnr + ")" }}
          >
            <PageTitle activeName="Job Detail" motherName="Home" />
          </div>
          <div className="content-block">
            <div className="section-full content-inner-1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="sticky-top">
                      <div className="row">
                        <div className="col-lg-12 col-md-6">
                          <div className="m-b30">
                            <img
                              src={require("./../../images/blog/grid/pic1.jpg")}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-6">
                          <div className="widget bg-white p-lr20 p-t20 widget_getintuch radius-sm">
                            { jobData.job_detail.job_title ? (
                              <h4 className="text-black font-weight-700 p-t10 m-b15">
                                {jobData.job_detail.job_title}
                              </h4>
                            ) : null}
                            <ul>
                              {jobData.countries?.name ||
                              jobData.states?.name ||
                              jobData.cities?.name ? (
                                <li>
                                  <i className="ti-location-pin"></i>
                                  <strong className="font-weight-700 text-black">
                                    Address
                                  </strong>
                                  <span className="text-black-light">
                                    {jobData.countries?.name},{" "}
                                    {jobData.states?.name},{" "}
                                    {jobData.cities?.name}
                                  </span>
                                </li>
                              ) : null}
                              <li>
                                <i className="ti-money"></i>
                                <strong className="font-weight-700 text-black">
                                  Salary
                                </strong>{" "}
                                $800 Monthy
                              </li>
                              <li>
                                <i className="ti-shield"></i>
                                <strong className="font-weight-700 text-black">
                                  Experience
                                </strong>
                                6 Year Experience
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="job-info-box">
                      <h3 className="m-t0 m-b10 font-weight-700 title-head">
                        <Link to={"#"} className="text-secondry m-r30">
                          {jobData.job_detail.job_title}
                        </Link>
                      </h3>
                      <ul className="job-info">
                        {jobData.job_detail?.skills_arr ? (
                          <div className="mx-1">
                            <strong>Skills: </strong>{" "}
                            {jobData.job_detail.skills_arr.map(
                              (skill, index) => (
                                <span
                                  key={index}
                                  className="badge badge-primary mr-1 mb-1"
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        ) : null}
                        {jobData.job_detail?.created_at ? (
                          <li>
                            <strong>Posted on:</strong>{" "}
                            {convertDate(jobData.job_detail.created_at)}
                          </li>
                        ) : null}
                        {jobData.cities?.name ? (
                          <li>
                            <i className="ti-location-pin text-black m-r5"></i>
                            {jobData.cities.name}
                          </li>
                        ) : null}
                      </ul>
                      {jobData.job_detail?.job_description ? (
                        <p className="p-t20">
                          <div
                            className="ql-editor mb-1 "
                            style={{
                              fontSize: "13px",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: jobData.job_detail.job_description,
                            }}
                          />
                        </p>
                      ) : null}

<div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0"></div>
                      {localStorage.getItem("jobSeekerLoginToken") ? (
                        <>
                          {jobData.job_detail.is_job_applied ? (
                            <button
                              className="radius-xl site-button"
                              // onClick={handleShow}
                            >
                              View Status
                            </button>
                          ) : (
                            <button
                              className="radius-xl site-button"
                              onClick={handleShow}
                            >
                              Apply
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            className="radius-xl site-button"
                            onClick={() => navigate("/user/login")}
                          >
                            Apply
                          </button>
                        </>
                      )}
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
                            <p> Apply to {jobData.company}</p>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Tab.Container
                            id="tabs-example"
                            activeKey={activeTab}
                          >
                            {/* Tab Content */}

                            <Tab.Content>
                            <Tab.Pane eventKey="contact-info">
  <form className="col-12 p-a0">
    {jobData.screen_questions && jobData.screen_questions.screen_question_keywords ? (
      jobData.screen_questions.screen_question_keywords.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <div>
            {item.screen_questions.map((ques, questionIndex) => (
              <div key={questionIndex}>
                <h4>{ques.name}</h4>
                {ques.screen_questions_options.map((option, optionIndex) => (
                  <Form.Check
                    key={optionIndex}
                    type="radio"
                    label={option.option}
                    className="p-10"
                    name={ques.name}
                    onClick={() => {
                      dispatch(
                        setJobSeekerAnswer({
                          index: index,
                          questionIndex: questionIndex,
                          answer: option.option,
                        })
                      );
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No screening questions found.</p>
    )}
  </form>
</Tab.Pane>

                              <Tab.Pane eventKey="additional-info">
                                {/* Additional Info Form */}
                                <form className="col-12 p-a0">
                                  <h6 className="font-weight-600">
                                    Additional info
                                  </h6>
                                  <div class="form-group">
                                    <label for="englishProficiency">
                                      What is your level of proficiency in
                                      English?
                                    </label>
                                    <select
                                      class="form-control"
                                      id="englishProficiency"
                                      required
                                    >
                                      <option value="">Select an option</option>
                                      <option>Beginner</option>
                                      <option>Intermediate</option>
                                      <option>Advanced</option>
                                      <option>Fluent</option>
                                    </select>
                                  </div>
                                  <div class="form-group">
                                    <label for="salaryRange">
                                      Are you okay with the salary range between
                                      30k - 35K?
                                    </label>
                                    <select
                                      class="form-control"
                                      id="salaryRange"
                                      required
                                    >
                                      <option value="">Select an option</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                    </select>
                                  </div>
                                  <div class="form-group">
                                    <label for="customerServiceExperience">
                                      How many years of Customer Service
                                      experience do you currently have?
                                    </label>
                                    <input
                                      type="number"
                                      class="form-control"
                                      id="customerServiceExperience"
                                      placeholder="Enter years of experience"
                                      min="0"
                                      max="99"
                                      required
                                    />
                                  </div>
                                  <div class="form-group">
                                    <label for="workLocation">
                                      Are you comfortable to work on both
                                      Gurgaon and Delhi branches?
                                    </label>
                                    <select
                                      class="form-control"
                                      id="workLocation"
                                      required
                                    >
                                      <option value="">Select an option</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                    </select>
                                  </div>
                                </form>
                              </Tab.Pane>
                              <Tab.Pane eventKey="resume-info">
                                {/* Additional Info Form */}
                                <form className="col-12 p-a0">
                                  <h6 className="font-weight-600">
                                    Resume info
                                  </h6>
                                  <div class="form-group">
                                    <label for="resume">
                                      Upload resume (DOC, DOCX, PDF, up to 2 MB)
                                    </label>
                                    <input
                                      type="file"
                                      class="form-control-file"
                                      id="resume"
                                      name="resume"
                                      accept=".doc, .docx, .pdf"
                                      required
                                    />
                                    <small class="form-text text-muted">
                                      Accepted file types: DOC, DOCX, PDF.
                                      Maximum file size: 2 MB.
                                    </small>
                                  </div>
                                </form>
                              </Tab.Pane>
                              <Tab.Pane eventKey="immediate-info">
                                <form className="col-12 p-a0">
                                  <h6 className="font-weight-600">
                                    immediate info
                                  </h6>

                                  <div class="form-group">
                                    <label for="immediateStart">
                                      We must fill this position urgently. Can
                                      you start immediately?
                                    </label>
                                    <select
                                      class="form-control"
                                      id="immediateStart"
                                      required
                                    >
                                      <option value="">Select an option</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                    </select>
                                  </div>
                                </form>
                              </Tab.Pane>
                            </Tab.Content>
                          </Tab.Container>
                        </Modal.Body>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-full content-inner">
              <div className="container">
                <div className="row">
                  {blogGrid.map((item, index) => (
                    <div className="col-xl-3 col-lg-6 col-md-6" key={index}>
                      <div className="m-b30 blog-grid">
                        <div className="dez-post-media dez-img-effect ">
                          {" "}
                          <Link to={"/blog-details"}>
                            <img src={item.image} alt="" />
                          </Link>{" "}
                        </div>
                        <div className="dez-info p-a20 border-1">
                          <div className="dez-post-title ">
                            <h5 className="post-title">
                              <Link to={"/blog-details"}>
                                Title of blog post
                              </Link>
                            </h5>
                          </div>
                          <div className="dez-post-meta ">
                            <ul>
                              <li className="post-date">
                                {" "}
                                <i className="ti-location-pin"></i> London{" "}
                              </li>
                              <li className="post-author">
                                <i className="ti-user"></i>By{" "}
                                <Link to={"#"}>Jone</Link>{" "}
                              </li>
                            </ul>
                          </div>
                          <div className="dez-post-text">
                            <p>
                              All the Lorem Ipsum generators on the Internet
                              tend to repeat predefined chunks.
                            </p>
                          </div>
                          <div className="dez-post-readmore">
                            <Link
                              to={"/blog-details"}
                              title="READ MORE"
                              rel="bookmark"
                              className="site-button-link"
                            >
                              <span className="fw6">READ MORE</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Jobdetail;
