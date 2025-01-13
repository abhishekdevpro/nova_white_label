import React, { useEffect, useState } from "react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import { Modal } from "react-bootstrap";
import CompanySideBar from "../Layout/companySideBar";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import JobPageSkeleton from "../../markup/skeleton/jobPage";
import moment from "moment";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaX } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function EmployeeCompanymanage() {

  
  const [skeleton, setSkeleton] = useState(true);
  const [company, setCompany] = useState(false);
  const token = localStorage.getItem("employeeLoginToken");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [btn, setBtn] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [tabs, setTabs] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState("8am - 12pm");
  const [shortNoteValue, setShortNoteValue] = useState("");
  const [rejectWithNote, setRejectWithNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [recordsAvailable, setRecordsAvailable] = useState(true);

  const fetchPublishedJobs = () => {
    axios({
      method: "GET",
      url: "https://api.novajobs.us/api/employeer/job-lists?is_publish=1",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const jobData = response.data.data;
        console.log(jobData, "published");
        
        if (jobData && jobData.length > 0) {
          setData(jobData);
          setRecordsAvailable(true);
        } else {
          setRecordsAvailable(false);
        }

        setBtn(" ");
        setSkeleton(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response?.data?.message);
        setRecordsAvailable(false);
      });
  };

  useEffect(() => {
    fetchPublishedJobs();
  }, []);
  
  
  const handleRepostJob = (id) => {
    const currentDate = new Date().toISOString();
  
    axios({
      method: "PUT",
      url: `https://api.novajobs.us/api/employeer/job-post/${id}`,
      headers: {
        Authorization: token,
      },
      data: {
        is_publish: 1,
        reposted_at: currentDate,
      },
    })
      .then((response) => {
        const updatedData = data.map((job) =>
          job.job_detail.id === id
            ? { ...job, job_detail: { ...job.job_detail, reposted_at: currentDate } }
            : job
        );
  
        // Move the reposted job to the top of the list
        const repostedJobIndex = updatedData.findIndex((job) => job.job_detail.id === id);
        if (repostedJobIndex !== -1) {
          const repostedJob = updatedData.splice(repostedJobIndex, 1)[0];
          updatedData.unshift(repostedJob);
        }
  
        setData(updatedData);
  
        // Show success toast notification
        toast.success("Job reposted successfully!");
      })
      .catch((err) => {
        console.error("Error reposting job:", err);
  
        // Show error toast notification
        toast.error("Failed to repost the job. Please try again.");
      });
  };
  
  const handleShowOptions = (index) => {
    setShowOptions(index === showOptions ? null : index);
  };

  const handleTabs = (index) => {
    setTabs(index === tabs ? null : index);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toLocaleDateString("en-CA");
    setSelectedDate(formattedDate);
  };

  const handleTimeSlotChange = (slot) => {
    setTimeSlot(slot);
  };

  const handleShortNoteValue = (e) => {
    setShortNoteValue(e.target.value);
  };

  const handleRejectWithNote = (e) => {
    setRejectWithNote(e.target.value);
  };

  const handleShareClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };



  return (
    <div className="position-relative">
      <Header2 />
      <ToastContainer/>
      <div className="page-content bg-white ">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySideBar active="company-manage-job" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title  clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Manage jobs
                      </h5>
                      <div className="float-right">
                        <div
                          style={{ gap: "7px" }}
                          className="d-flex align-items-center justify-content-center "
                        >
                        {/*<button
                          onClick={fetchDraftJobs}
                          className="site-button"
                          style={{ fontSize: "14px" }}
                        >
                          Draft
                        </button>*/}
                          <button
                            onClick={fetchPublishedJobs}
                            className="site-button"
                            style={{ fontSize: "14px" }}
                          >
                            Published
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
      {skeleton ? (
        <JobPageSkeleton />
      ) : recordsAvailable ? (
        <ul className="post-job-bx browse-job">
          {data.map((item, index) => {
            const formattedDate = moment(item.job_detail.created_at).format("MMMM-DD-YYYY");
            return (
              <li key={index} className="position-relative">
                <div className="post-bx d-flex w-100 justify-content-between">
                  <div className="job-post-info m-a0">
                    {console.log("yehi h console", item.job_detail)}
                    {item.job_detail.job_title && (
                      <h4 className="mb-0">
                        <Link to={`/user/job/${item.job_detail.id}`}>
                          {item.job_detail.job_title}
                        </Link>
                      </h4>
                    )}
                    {(item.job_category.name ||
                      item.job_type.name ||
                      item.job_workplace_types.name) && (
                      <div className="d-flex">
                        {item.job_category.name && (
                          <p>
                            {item.job_category.name}
                            {" | "}
                          </p>
                        )}
                        {item.job_type.name && (
                          <p>
                            {item.job_type.name}
                            {" | "}
                          </p>
                        )}
                        {item.job_detail.skills_arr && (
                          <div className="mx-1">
                            {item.job_detail.skills_arr.map((skill, index) => (
                              <span
                                key={index}
                                className="badge badge-primary mr-1 mb-1"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        {item.job_workplace_types.name && (
                          <p>{item.job_workplace_types.name}</p>
                        )}
                      </div>
                    )}
                    {item.experience_level.name && (
                      <p className="mb-2">
                        Experience: {item.experience_level.name}
                      </p>
                    )}
                    {(item.cities.name ||
                      item.states.name ||
                      item.countries.name) && (
                      <p style={{ color: "#232323" }} className="mb-2">
                        <i className="fa fa-map-marker"></i>{" "}
                        {item.cities.name && (
                          <span>
                            {item.cities.name}
                            {" | "}
                          </span>
                        )}
                        {item.states.name && (
                          <span>
                            {item.states.name}
                            {" | "}
                          </span>
                        )}
                        {item.countries.name && (
                          <span>{item.countries.name}</span>
                        )}
                      </p>
                    )}
                    {item.job_detail.reposted_at ? (
                      <p className="mb-0">
                        <span className="text-black mr-2">Posted on* </span>
                        {moment(item.job_detail.reposted_at).format(
                          "MMMM DD, YYYY"
                        )}
                      </p>
                    ) : (
                      <p className="mb-0">
                        <span className="text-black mr-2">Posted on* </span>
                        {moment(item.job_detail.created_at).format(
                          "MMMM DD, YYYY"
                        )}
                      </p>
                    )}
                  </div>
                  <div
                    className="d-flex flex-row justify-content-center align-items-center"
                    style={{ gap: "12px" }}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/employer/company-post-jobs/${item.job_detail.id}`
                        )
                      }
                      className="px-3 py-2 site-button text-white border-0"
                      style={{ cursor: "pointer" }}
                    >
                      Edit Jobs
                      {btn}
                    </button>
                    <button
                      onClick={() =>
                        navigate(
                          `/employer/company-resume/${item.job_detail.id}`
                        )
                      }
                      className="px-3 py-2 site-button text-white border-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="fa fa-id-card-o mr-1"
                        aria-hidden="true"
                      ></i>
                      <span>Applicants</span>
                      {btn}
                    </button>
                    <button
                      className="px-3 py-2 site-button text-white border-0 bg-danger"
                      style={{ cursor: "pointer", backgroundColor: "red" }}
                      onClick={() => handleRepostJob(item.job_detail.id)}
                    >
                      Refresh
                    </button>
                  </div>
                </div>
                <button
                  className="px-3 py-2 site-button text-white border-0 float-right mb-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleShareClick(item.job_detail.id)}
                >
                  Share
                </button>
                {showModal && selectedJobId === item.job_detail.id && (
                  <Modal show={showModal} onHide={closeModal} centered>
                    <Modal.Body
                      style={{ backgroundColor: "#00B4D8", color: "white" }}
                    >
                      <div className="d-flex justify-content-between">
                        <h5 className="text-white">Share on</h5>
                        <FaX
                          style={{ cursor: "pointer" }}
                          onClick={closeModal}
                        />
                      </div>
                      <div className="d-flex justify-content-evenly my-4">
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                            `${window.location.origin}/user/job/${item.job_detail.id}`
                          )}`}
                          className="text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaLinkedin size={40} />
                          LinkedIn
                        </a>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            `${window.location.origin}/user/job/${item.job_detail.id}`
                          )}`}
                          className="text-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp size={40} />
                          WhatsApp
                        </a>
                      </div>
                      <div className="text-center">
                        <input
                          style={{ width: "300px" }}
                          className="py-2 rounded-2 p-1"
                          type="text"
                          value={`${window.location.origin}/user/job/${item.job_detail.id}`}
                          readOnly
                        />
                        <button
                          className="p-2 rounded-2 site-button text-white border-0 float-right "
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/user/job/${item.job_detail.id}`
                            );
                            alert("Link copied!");
                          }}
                        >
                          Copy Link
                        </button>
                      </div>
                    </Modal.Body>
                  </Modal>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Records not available</p>
      )}
    </div>

                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link to={"#"}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        <li className="active">
                          <Link to={"#"}>1</Link>
                        </li>
                        <li>
                          <Link to={"#"}>2</Link>
                        </li>
                        <li>
                          <Link to={"#"}>3</Link>
                        </li>
                        <li className="next">
                          <Link to={"#"}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <Modal
                      show={company}
                      onHide={setCompany}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/logo/icon2.png")}
                              />
                            </div>
                            <h5 className="modal-title">Company Name</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul>
                              <li>
                                <strong>Job Title :</strong>
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Deseription :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry has been the
                                  industry's standard dummy text ever since.
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setCompany(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {tabs === "scheduleInterview" ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
            display: "flex",
            flexDirection: "column",
            padding: "150px 20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "1.25rem",
              borderWidth: "1px",
              width: "100%",
              maxWidth: "70%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                marginTop: "0.75rem",
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "1.3em",
                  fontWeight: "medium",
                  color: "#333",
                }}
              >
                Schedule Interview
              </h3>
              <div style={{ width: "100%" }}>
                <DatePicker
                  inline
                  selected={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "@media (min-width: 640px)": { flexDirection: "row" },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "7px",
                      backgroundColor:
                        timeSlot === "8am - 12pm" ? "#3182ce" : "transparent",
                      color: timeSlot === "8am - 12pm" ? "white" : "#333",
                      border:
                        timeSlot === "8am - 12pm" ? "none" : "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTimeSlotChange("8am - 12pm")}
                  >
                    8am - 12pm
                  </button>
                  <button
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "7px",
                      backgroundColor:
                        timeSlot === "12pm - 5pm" ? "#3182ce" : "transparent",
                      color: timeSlot === "12pm - 5pm" ? "white" : "#333",
                      border:
                        timeSlot === "12pm - 5pm" ? "none" : "1px solid #ccc",
                      cursor: "pointer",
                    }}
                    onClick={() => handleTimeSlotChange("12pm - 5pm")}
                  >
                    12pm - 5pm
                  </button>
                </div>
                <button className="site-button" type="button">
                  Schedule
                </button>
              </div>
            </div>
            <button
              onClick={() => handleTabs(false)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                padding: "0.5rem",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <FaX />
            </button>
          </div>
        </div>
      ) : null}

      {tabs === "shortNote" ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
            display: "flex",
            flexDirection: "column",
            padding: "150px 20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "1.25rem",
              borderWidth: "1px",
              width: "100%",
              maxWidth: "50%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                marginTop: "0.75rem",
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <label
                htmlFor="shortNoteValue"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.3em",
                  fontWeight: "medium",
                  color: "#333",
                }}
              >
                Short Note
              </label>
              <textarea
                type="text"
                name="shortNoteValue"
                id="shortNoteValue"
                onChange={handleShortNoteValue}
                value={shortNoteValue}
                className="form-control"
                style={{ height: "150px" }}
              />
              <button className="site-button">Submit</button>
            </div>
            <button
              onClick={() => handleTabs(false)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                padding: "0.5rem",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <FaX />
            </button>
          </div>
        </div>
      ) : null}

      {tabs === "rejectWithNote" ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            top: "0px",
            left: "0px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "99",
            display: "flex",
            flexDirection: "column",
            padding: "150px 20px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "1.25rem",
              borderWidth: "1px",
              width: "100%",
              maxWidth: "50%",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                marginTop: "0.75rem",
                textAlign: "center",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <label
                htmlFor="rejectWithNote"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.3em",
                  fontWeight: "medium",
                  color: "#333",
                }}
              >
                Reject with Note
              </label>
              <textarea
                type="text"
                name="rejectWithNote"
                id="rejectWithNote"
                onChange={handleRejectWithNote}
                value={rejectWithNote}
                className="form-control"
                style={{ height: "150px" }}
              />
              <button className="site-button">Submit</button>
            </div>
            <button
              onClick={() => handleTabs(false)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                padding: "0.5rem",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <FaX />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default EmployeeCompanymanage;
