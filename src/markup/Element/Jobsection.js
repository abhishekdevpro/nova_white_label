import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// Import Redux action to set job application data
import { setJobApplicationData } from "../../store/reducers/jobApplicationSlice";
import { useNavigate, useLocation } from "react-router-dom";
// Import skeleton loader component
import TwoBoxWithLinesSkeleton from "../skeleton/twoBoxLines";
import { Tab, Nav, Form } from "react-bootstrap";
import { setJobSeekerAnswer } from "../../store/reducers/jobApplicationScreeningQues";
import { showToastError, showToastSuccess } from "../../utils/toastify";
function Jobsection() {
  // Initialize Redux dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get login token from local storage
  const token = localStorage.getItem("jobSeekerLoginToken");

  // Select job application data from Redux store
  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );

  // State variables
  const [skeleton, setSkeleton] = useState(true); // Controls skeleton loader
  const [logo, setLogo] = useState(""); // Stores company logo
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [itemsPerPage] = useState(5); // Number of items per page
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("contact-info");
  // Calculate total pages based on total records and items per page
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
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
  // Function to fetch job application data
  const fetchJobApplicationData = async (page = 1, perPage = 5) => {
    try {
      // Make API call to get job listings
      const response = await axios.get(
        `https://api.novajobs.us/api/jobseeker/job-lists?page_no=${page}&page_size=${perPage}&is_publish=1`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Sort data by most recent update
      const sortedData = response.data.data.sort(
        (a, b) =>
          new Date(b.job_detail.updated_at) - new Date(a.job_detail.updated_at)
      );

      // Update Redux store with sorted data
      dispatch(setJobApplicationData(sortedData));

      // Set total records
      setTotalRecords(response.data.total_records);

      // Hide skeleton loader
      setSkeleton(false);
    } catch (error) {
      // Log error and reset data
      console.error("Error fetching job data:", error);
      dispatch(setJobApplicationData([]));
      setSkeleton(false);
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
  // Function to fetch company logo
  // const getLogo = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.novajobs.us/api/employeer/employeer-profile",
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     setLogo(`${response.data.data.company_detail.logo}`);
  //   } catch (error) {
  //     console.error("Error fetching logo:", error);
  //   }
  // };

  // Fetch logo and job data on component mount and page change
  useEffect(() => {
    // getLogo();
    fetchJobApplicationData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // Toast message for unauthorized actions
  const showToastMessage = () => {
    toast("Login To Continue");
  };

  // Toggle favorite jobs
  const toggleFabJobs = async (id) => {
    try {
      await axios.post(
        "https://api.novajobs.us/api/jobseeker/job-favorites",
        { job_id: id },
        { headers: { Authorization: token } }
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setSkeleton(true); // Show skeleton while loading
    }
  };

  // Generate pagination numbers
  const generatePagination = () => {
    const pageNumbers = [];
    const pageRange = 5; // Number of pages to display at a time
    const halfRange = Math.floor(pageRange / 2);

    // Calculate start and end pages dynamically
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    // Adjust the range if we're near the beginning or end
    if (currentPage <= halfRange) {
      startPage = 1;
      endPage = Math.min(pageRange, totalPages);
    } else if (currentPage > totalPages - halfRange) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - pageRange + 1);
    }

    // Add first page if not already included
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    // Add page numbers in the range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add last page if not already included
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  // Render the component
  return (
    <div className="section-full bg-white content-inner-2">
      <ToastContainer />
      {skeleton ? (
        <TwoBoxWithLinesSkeleton />
      ) : (
        <div className="container">
          {/* Job section header */}
          <div className="d-flex job-title-bx section-head">
            <div className="mr-auto">
              <h2 className="m-b5">Recent Jobs</h2>
              <h6 className="fw4 m-b0">{totalRecords} Recently Added Jobs</h6>
            </div>
          </div>

          <div className="row">
            {/* desktop */}
            <div className="col-lg-9  d-none d-md-block">
              {/* Job listings */}
              <ul className="post-job-bx browse-job">
                {jobApplicationData.map((item, index) => (
                  <li key={index}>
                    <div className="post-bx">
                      <div className="d-flex m-b30">
                        <div className="job-post-company">
                          <span>
                            <img
                              src={require("./../../images/logo/icon1.png")}
                              alt="Company Logo"
                            />
                          </span>
                        </div>

                        <div className="job-post-info">
                          <h4>
                            <Link
                              to={`/user/job/${item.job_detail.id}`}
                              onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                              }
                            >
                              {item.job_detail.job_title}
                            </Link>
                          </h4>
                          <h6>{item.companies.company_name}</h6>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>{" "}
                              {item.cities.name}, {item.states.name},{" "}
                              {item.countries.name}
                            </li>
                            {item.job_category.name && (
                              <li>
                                <i className="fa fa-bookmark-o"></i>{" "}
                                {item.job_category.name}
                              </li>
                            )}
                            <li>
                              <i className="fa fa-clock-o"></i>{" "}
                              {moment(item.job_detail.created_at).fromNow()}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="d-flex">
                        <div className="job-time mr-auto">
                          <span>{item.job_type.name}</span>
                        </div>
                        <div className="salary-bx">
                          <span>{item.job_workplace_types.name}</span>
                        </div>
                      </div>

                      {localStorage.getItem("jobSeekerLoginToken") ? (
                        <label className="like-btn">
                          <input
                            type="checkbox"
                            defaultChecked={item.job_detail.is_job_favorite}
                            onClick={() => toggleFabJobs(item.job_detail.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      ) : (
                        <label className="like-btn" onClick={showToastMessage}>
                          <input type="checkbox" disabled />
                          <span className="checkmark"></span>
                        </label>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="pagination d-flex flex-wrap justify-content-center">
                {/* Previous button */}
                <button
                  className="btn btn-outline-primary me-2 mb-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {/* Page number buttons */}
                {generatePagination().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="btn btn-light disabled">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`btn ${
                        currentPage === page
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      } me-2 mb-2`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next button */}
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
            {/* mobile view start */}
            <div className="col-lg-9   d-md-none">
              {/* Job listings */}
              <ul className="post-job-bx browse-job">
                {jobApplicationData.map((item, index) => (
                  <li key={index}>
                    <div className="post-bx">
                      <div className="d-flex m-b30">
                        <div className="job-post-company">
                          <span>
                            <img
                              src={require("./../../images/logo/icon1.png")}
                              alt="Company Logo"
                            />
                          </span>
                        </div>

                        <div className="job-post-info">
                          <h4 onClick={() => handleShowModal(item)}>
                            {item.job_detail.job_title}
                          </h4>
                          <h6>{item.companies.company_name}</h6>
                          <ul>
                            <li>
                              <i className="fa fa-map-marker"></i>{" "}
                              {item.cities.name}, {item.states.name},{" "}
                              {item.countries.name}
                            </li>
                            {item.job_category.name && (
                              <li>
                                <i className="fa fa-bookmark-o"></i>{" "}
                                {item.job_category.name}
                              </li>
                            )}
                            <li>
                              <i className="fa fa-clock-o"></i>{" "}
                              {moment(item.job_detail.created_at).fromNow()}
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="d-flex">
                        <div className="job-time mr-auto">
                          <span>{item.job_type.name}</span>
                        </div>
                        <div className="salary-bx">
                          <span>{item.job_workplace_types.name}</span>
                        </div>
                      </div>

                      {localStorage.getItem("jobSeekerLoginToken") ? (
                        <label className="like-btn">
                          <input
                            type="checkbox"
                            defaultChecked={item.job_detail.is_job_favorite}
                            onClick={() => toggleFabJobs(item.job_detail.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      ) : (
                        <label className="like-btn" onClick={showToastMessage}>
                          <input type="checkbox" disabled />
                          <span className="checkmark"></span>
                        </label>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <div className="pagination d-flex flex-wrap justify-content-center">
                {/* Previous button */}
                <button
                  className="btn btn-outline-primary me-2 mb-2"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {/* Page number buttons */}
                {generatePagination().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="btn btn-light disabled">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handlePageChange(page)}
                      className={`btn ${
                        currentPage === page
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      } me-2 mb-2`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next button */}
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
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
                            <p>Skills: {selectedJob.job_detail.skills}</p>
                          )}
                          <p>
                            You must create an nova account before continuing to
                            the company website to apply
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
                                                        (
                                                          option,
                                                          optionIndex
                                                        ) => (
                                                          <Form.Check
                                                            key={optionIndex}
                                                            type="radio"
                                                            label={
                                                              option.option
                                                            }
                                                            id={`${ques.id}-${optionIndex}`}
                                                            className="site-button"
                                                            name={ques.name}
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
            {/* mobileview end */}
            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="sticky-top">
                {/* Testimonial section */}
                <div className="candidates-are-sys m-b30">
                  <div className="candidates-bx">
                    <div className="testimonial-pic radius">
                      <img
                        src={require("./../../images/testimonials/pic3.jpg")}
                        alt=""
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="testimonial-text">
                      <p>
                        I just got my resume Ai screened for free, improved it
                        and landed my dream Job. Thank you NovaJobs...
                      </p>
                    </div>
                    <div className="testimonial-detail">
                      <strong className="testimonial-name">Amanda V.</strong>{" "}
                      <span className="testimonial-position">Florida, USA</span>{" "}
                    </div>
                  </div>
                </div>

                {/* Quote section */}
                <div className="quote-bx">
                  <div className="quote-info">
                    <h4>Recruiter's Quote</h4>
                    <p>
                      "Believe in yourself. Employers want you to succeed as
                      much as you do. Confidence is your best suit."
                    </p>
                  </div>
                  <div className="quote-bx-footer">
                    <h6>Reach the best employers</h6>
                    {/* <Link to="/register">Sign Up</Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobsection;
