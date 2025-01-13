import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import VendorCompanySideBar from "./Vendorsidebar";
import Footer from "../markup/Layout/Footer";
import { Navbar, Nav, Badge } from 'react-bootstrap';

function Vendorapplicant() {
  const [resumes, setResumes] = useState([]);
  const [selectedJobTitle, setSelectedJobTitle] = useState("All");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [shortlisted, setShortlisted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [scheduled, setScheduled] = useState([]);
  const [view, setView] = useState("all");
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const { id } = useParams();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        let endpoint = `https://api.novajobs.us/api/admin/jobs-applicants/${id}`;
        
        if (view === "shortlisted") {
          endpoint += `?job_applied_status_id=1`;
        } else if (view === "rejected") {
          endpoint += `?job_applied_status_id=2`;
        } else if (view === "scheduled") {
          endpoint += `?job_applied_status_id=3`;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.status === "success") {
          const formattedResumes = response.data.data.job_applicants_info.map(item => ({
            id: item.jobskkers_detail.id,
            first_name: item.jobskkers_detail.first_name,
            last_name: item.jobskkers_detail.last_name,
            job_title: item.job_detail.job_title,
            address: item.jobskkers_detail.country_id, // Example field, adjust based on actual data
            time: item.jobskkers_detail.created_at,
            created_at: item.jobskkers_detail.created_at,
            resume_link: item.jobskkers_detail.resume_file_path,
            skills: item.jobskkers_detail.ai_resume_parse_data.jobsMyResumeData.skillsValue.skills || "", // Adjusted field
          }));
          setResumes(formattedResumes);
        } else {
          setResumes([]);
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        setResumes([]);
      }
    };

    fetchData();
  }, [id, view]);

  const handleJobTitleChange = (event) => {
    setSelectedJobTitle(event.target.value);
  };

  const handleSkillsChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSkills((prevSelectedSkills) =>
      checked ? [...prevSelectedSkills, value] : prevSelectedSkills.filter((skill) => skill !== value)
    );
  };

  const takeAction = async (jobId, jobSeekerId, job_applied_status_id, createdAt) => {
    try {
      const token = localStorage.getItem("vendorToken");
      await axios.put(
        `https://api.novajobs.us/api/admin/action-applicants-job/${jobId}/${jobSeekerId}`,
        { job_applied_status_id, createdAt },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.error(`Error taking action (${job_applied_status_id}) on job seeker ${jobSeekerId}:`, error);
    }
  };

  const handleShortlist = (id) => {
    const jobId = id; // Replace with the correct job ID
    const jobSeekerId = id; // Replace with the correct job seeker ID
    const createdAt = new Date().toISOString(); // Add the current date and time
    const job_applied_status_id = 1; // Shortlisted status

    takeAction(jobId, jobSeekerId, job_applied_status_id, createdAt);

    if (shortlisted.includes(id)) {
      setShortlisted(shortlisted.filter((shortlistId) => shortlistId !== id));
    } else {
      setShortlisted([...shortlisted, id]);
      if (rejected.includes(id)) {
        setRejected(rejected.filter((rejectId) => rejectId !== id));
      }
      if (scheduled.includes(id)) {
        setScheduled(scheduled.filter((scheduleId) => scheduleId !== id));
      }
    }
  };

  const handleReject = (id) => {
    const jobId = id; // Replace with the correct job ID
    const jobSeekerId = id; // Replace with the correct job seeker ID
    const createdAt = new Date().toISOString(); // Add the current date and time
    const job_applied_status_id = 2; // Rejected status

    takeAction(jobId, jobSeekerId, job_applied_status_id, createdAt);

    if (rejected.includes(id)) {
      setRejected(rejected.filter((rejectId) => rejectId !== id));
    } else {
      setRejected([...rejected, id]);
      if (shortlisted.includes(id)) {
        setShortlisted(shortlisted.filter((shortlistId) => shortlistId !== id));
      }
      if (scheduled.includes(id)) {
        setScheduled(scheduled.filter((scheduleId) => scheduleId !== id));
      }
    }
  };

  const handleSchedule = (id) => {
    const jobId = id; // Replace with the correct job ID
    const jobSeekerId = id; // Replace with the correct job seeker ID
    const createdAt = new Date().toISOString(); // Add the current date and time
    const job_applied_status_id = 3; // Scheduled status

    takeAction(jobId, jobSeekerId, job_applied_status_id, createdAt);

    if (scheduled.includes(id)) {
      setScheduled(scheduled.filter((scheduleId) => scheduleId !== id));
    } else {
      setScheduled([...scheduled, id]);
      if (shortlisted.includes(id)) {
        setShortlisted(shortlisted.filter((shortlistId) => shortlistId !== id));
      }
      if (rejected.includes(id)) {
        setRejected(rejected.filter((rejectId) => rejectId !== id));
      }
    }
  };

  const jobTitles = ["All", ...new Set(resumes.map((item) => item.job_title))];
  const skills = [
    ...new Set(resumes.flatMap((item) => item.skills.split(', '))),
  ];

  const filteredResumes =
    selectedJobTitle === "All"
      ? resumes
      : resumes.filter((item) => item.job_title === selectedJobTitle);

  const skillFilteredResumes = selectedSkills.length
    ? filteredResumes.filter((item) =>
        selectedSkills.every((skill) => item.skills.includes(skill))
      )
    : filteredResumes;

  const allCount = resumes.length;
  const shortlistedCount = shortlisted.length;
  const rejectedCount = rejected.length;
  const scheduledCount = scheduled.length;

  let displayedResumes = [];
  if (view === "all") {
    displayedResumes = skillFilteredResumes;
  } else if (view === "shortlisted") {
    displayedResumes = resumes.filter((item) => shortlisted.includes(item.id));
  } else if (view === "rejected") {
    displayedResumes = resumes.filter((item) => rejected.includes(item.id));
  } else if (view === "scheduled") {
    displayedResumes = resumes.filter((item) => scheduled.includes(item.id));
  }

  return (
    <>
      <div className="page-content bg-white">
        <Navbar bg="white" variant="white" className="py-3 border-bottom">
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "110px" }}
              src={require("../images/logo/NovaUS.png")}
              className="logo"
              alt="img"
            />
          </Navbar.Brand>

          <Nav className="ml-auto align-items-center"></Nav>
        </Navbar>
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <VendorCompanySideBar active="company-resume" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Applicants
                      </h5>
                      <Link
                        to={"/employer/company-manage-job/jobs"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>

                    <div className="d-flex justify-content-between my-3 ">
                      <div className="filter-container">
                        <div className="dropdown">
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="skillsDropdownButton"
                            aria-haspopup="true"
                            aria-expanded={skillsDropdownOpen}
                            onClick={() =>
                              setSkillsDropdownOpen(!skillsDropdownOpen)
                            }
                          >
                            {selectedSkills.length
                              ? selectedSkills.join(", ")
                              : "Select Skills"}
                          </button>
                          <div
                            className={`dropdown-menu ${
                              skillsDropdownOpen ? "show" : ""
                            }`}
                            aria-labelledby="skillsDropdownButton"
                          >
                            {skills.map((skill, index) => (
                              <div key={index} className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`skill${index}`}
                                  value={skill}
                                  checked={selectedSkills.includes(skill)}
                                  onChange={handleSkillsChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`skill${index}`}
                                >
                                  {skill}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`btn btn-primary ${
                          view === "all" ? "active" : ""
                        }`}
                        onClick={() => setView("all")}
                      >
                        All ({allCount})
                      </button>
                      <button
                        className={`btn btn-success ${
                          view === "shortlisted" ? "active" : ""
                        }`}
                        onClick={() => setView("shortlisted")}
                      >
                        Shortlisted ({shortlistedCount})
                      </button>
                      <button
                        className={`btn btn-danger ${
                          view === "rejected" ? "active" : ""
                        }`}
                        onClick={() => setView("rejected")}
                      >
                        Rejected ({rejectedCount})
                      </button>
                      <button
                        className={`btn btn-info ${
                          view === "scheduled" ? "active" : ""
                        }`}
                        onClick={() => setView("scheduled")}
                      >
                        Scheduled ({scheduledCount})
                      </button>
                    </div>

                    <div className="clearfix">
                      {displayedResumes.map((item) => (
                        <div
                          key={item.id}
                          className="job-bx bg-light clearfix border rounded p-4 mb-3"
                        >
                          <div className="job-info">
                            <p
                              className="font-weight-700"
                              style={{ fontSize: "25px", fontWeight: "600" }}
                            >
                              {item.job_title}
                            </p>
                            <h5>
                              {item.first_name} {item.last_name}
                            </h5>
                            <p>Skills: {item.skills}</p>
                            <p>
                              Resume Link:{" "}
                              <a
                                href={item.resume_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Resume
                              </a>
                            </p>
                            <p>
                              Applied on:{" "}
                              {new Date(item.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="job-actions mt-3">
                            <button
                              className="btn btn-success"
                              onClick={() => handleShortlist(item.id)}
                            >
                              {shortlisted.includes(item.id)
                                ? "Unshortlist"
                                : "Shortlist"}
                            </button>
                            <button
                              className="btn btn-danger ml-2"
                              onClick={() => handleReject(item.id)}
                            >
                              {rejected.includes(item.id)
                                ? "Unreject"
                                : "Reject"}
                            </button>
                            <button
                              className="btn btn-primary ml-2"
                              onClick={() => handleSchedule(item.id)}
                            >
                              {scheduled.includes(item.id)
                                ? "Unschedule"
                                : "Schedule"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default Vendorapplicant;
