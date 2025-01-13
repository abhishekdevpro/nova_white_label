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
  const fetchJobApplicationData = async () => {
    try {
      const response = await axios.get(
        "https://api.novajobs.us/api/jobseeker/job-favorites",
        // "https://api.novajobs.us/api/jobseeker/job-lists?page_size=7&is_publish=1",
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
        url: "https://api.novajobs.us/api/jobseeker/job-favorites",
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
                            <h4>
                              <Link to={`/user/job/${item.job_detail.id}`}>
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
                        <label
                          className="like-btn"
                          labl
                          onClick={() => {
                            toggleFabJobs(item.job_detail.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            defaultChecked={item.job_detail.is_job_favorite}
                            name={item.job_detail.id}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="d-flex w-100  justify-content-center ">
                  <img
                    src={noDataFound}
                    alt="no data found"
                    style={{ width: "400px" }}
                  />
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
                        <label
                          className="like-btn"
                          labl
                          onClick={() => {
                            toggleFabJobs(item.job_detail.id);
                          }}
                        >
                          <input
                            type="checkbox"
                            defaultChecked={item.job_detail.is_job_favorite}
                            name={item.job_detail.id}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="d-flex w-100  justify-content-center ">
                  <img
                    src={noDataFound}
                    alt="no data found"
                    style={{ width: "400px" }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="col-lg-3"></div>
        </div>
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
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
                        {localStorage.getItem("jobSeekerLoginToken") ? (
                          <>
                            {selectedJob.job_detail.is_job_applied ? (
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
                              onClick={() => navigate("/user/login")}
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
                      {selectedJob?.job_detail?.skills_arr && (
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
                      )}
                      {selectedJob.job_detail.skills && (
                        <p>Skills: {selectedJob.job_detail.skills}</p>
                      )}
                      <p>
                        You must create an nova account before continuing to the
                        company website to apply
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
                            <i class="fa fa-briefcase" aria-hidden="true"></i>
                            {"  "}
                            {selectedJob.companies.company_name}
                          </p>
                          <p>
                            <i class="fa fa-registered" aria-hidden="true"></i>

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
                    <h6>Full job description</h6>
                    {selectedJob.job_detail.job_description && (
                      <p className="mb-1">
                        <div
                          className="ql-editor"
                          style={{
                            fontSize: "13px",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: selectedJob.job_detail.job_description,
                          }}
                        />
                      </p>
                    )}
                  </div>
                  {selectedJob.job_detail.created_at && (
                    <p>
                      Posted{" "}
                      {moment(selectedJob.job_detail.created_at).fromNow()}
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
                                                paddingBottom: "30px",
                                              }}
                                            >
                                              <h5>{ques.name}</h5>
                                              {ques.screen_questions_options
                                                ? ques.screen_questions_options.map(
                                                    (option, optionIndex) => (
                                                      <Form.Check
                                                        key={optionIndex}
                                                        type="radio"
                                                        label={option.option}
                                                        id={`${ques.id}-${optionIndex}`}
                                                        className="site-button"
                                                        name={ques.name}
                                                        style={{
                                                          marginRight: "30px",
                                                          padding: "10px 30px",
                                                        }}
                                                        onClick={() => {
                                                          dispatch(
                                                            setJobSeekerAnswer({
                                                              index: index,
                                                              questionIndex:
                                                                questionIndex,
                                                              answer:
                                                                option.option,
                                                            })
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
                        defaultChecked={selectedJob.job_detail.is_job_favorite}
                        name={selectedJob.job_detail.id}
                        onClick={() => {
                          toggleFabJobsmobile();
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
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default SavedJobs;
