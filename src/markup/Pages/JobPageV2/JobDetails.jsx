import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBuilding,
  FaClock,
  FaBriefcase,
  FaDollarSign,
  FaHeart,
  FaShare,
  FaBookmark,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import "./JobDetails.css";
import UserHeader from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import ShareJobModal from "./ShareModal";
import RecommendedJobs from "./RecommendedJobs";
function JobDetailsPage() {
  const [jobData, setJobData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  //   const jobId = "27790";
  const token = localStorage.getItem("jobSeekerLoginToken");
  useEffect(() => {
    setIsLoggedIn(true);
  }, [token]);
  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    const API = token
      ? `https://apiwl.novajobs.us/api/jobseeker/pro/job-lists/${jobId}`
      : `https://apiwl.novajobs.us/api/jobseeker/job-lists/${jobId}`;
    try {
      setLoading(true);
      const response = await fetch(API, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        setJobData(data.data);
      } else {
        setError("Failed to fetch job details");
      }
    } catch (err) {
      setError("Error fetching job details");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    console.log(token, jobData);
    if (!token) {
      toast.error("Please login to apply for this job");
      navigate("/user/login");
      return;
    }
    if(jobData.job_detail.is_on_demand === true) navigate(`/user/practice-interview/${jobData.job_detail.id}?on_demand=true`);
     else navigate(`/user/apply/${jobData.job_detail.id}`);
   
  };

  const handleToggleFavorite = async () => {
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
          job_id: jobData.job_detail.id,
        },
      });
      // console.log(response.message,"meassg");
      if (response) {
        toast.success(response.data.message || "job added to favorites");
        setIsSaved((prev) => !prev);
      } else toast.error(response.message);
    } catch (error) {
      console.log(error);
      // toast.error(error.message || "Failed to add job to favorites. Try again! ")
    }
  };

 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <>
        <div className="job-details-container">
          <div className="main-wrapper">
            <div className="loading-container">
              <div className="spinner"></div>
              <p style={{ color: "white", fontSize: "1.1rem" }}>
                Loading job details...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="job-details-container">
          <div className="main-wrapper">
            <div className="error-container">
              <h2>Error Loading Job Details</h2>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={fetchJobDetails}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!jobData) return null;

  const job = jobData;
  console.log(job, `https://api.novajobs.us${job.companies?.logo}`, "job");
  const shareUrl = `https://novajobs.us/user/jobs/${job.job_detail.id}`;
  return (
    <>
      <UserHeader />
      <div className="job-details-container">
        <div className="main-wrapper">
          <div className="job-header">
            <div className="header-content">
              <div className="job-info">
                <img
                  src={
                    `https://apiwl.novajobs.us${job.companies?.logo}` ||
                    "https://via.placeholder.com/80"
                  }
                  alt={job.companies?.company_name}
                  className="company-logo"
                />
                <div>
                  <h1 className="job-title">{job.job_detail?.job_title}</h1>
                  <Link
                    to={`/company-details/${job.companies?.id}`}
                    className="company-name"
                  >
                    {job.companies?.company_name}
                  </Link>
                  <div className="job-meta">
                    <FaMapMarkerAlt />
                    <span>
                      {job.cities?.name}, {job.states?.name},{" "}
                      {job.countries?.name}
                    </span>
                  </div>
                  <div className="job-meta">
                    <FaCalendarAlt />
                    <span>Posted {formatDate(job.job_detail?.created_at)}</span>
                  </div>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  className="site-button "
                  style={{ backgroundColor: '#3B82F6'}}
                  onClick={() => setShowModal(true)}
                >
                  Share
                </button>
                <button
                  onClick={handleToggleFavorite}
                  className={`site-button flex-grow-1 fw-medium text-white ${
                    isSaved || job.job_detail?.is_job_favorite
                      ? "bg-danger opacity-75"
                      : "bg-secondary"
                  }`}
                  
                >
                  {isSaved || job.job_detail?.is_job_favorite
                    ? "Saved"
                    : "Save Job"}
                </button>

                <button
                  disabled={isApplied || job.job_detail.is_job_applied}
                  onClick={() => handleApply(job.job_detail.id)}
                  className={`site-button flex-grow-1 fw-medium text-white ${
                    isApplied || job.job_detail.is_job_applied
                      ? "bg-success opacity-75"
                      : "bg-danger"
                  }`}
                  style={{
                    cursor:
                      isApplied || job.job_detail.is_job_applied
                        ? "not-allowed"
                        : "pointer",
                    pointerEvents:
                      isApplied || job.job_detail.is_job_applied
                        ? "none"
                        : "auto",
                  }}
                >
                  {isApplied || job.job_detail.is_job_applied
                    ? "Applied"
                    : "Quick Apply"}
                </button>

              { token && <button className="site-button"
                 onClick={()=>navigate(`/user/practice-interview/${job.job_detail.id}`)}
                >
                  Practice Interview
                </button>}

              </div>
            </div>
          </div>
          <div className="content-grid">
            {/* Sidebar */}
            <div className="sidebar">
              <div className="sidebar-section">
                <h6 className="sidebar-title">About this role</h6>
                <div className="sidebar-content">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <FaCalendarAlt
                      style={{ fontSize: "0.8rem", color: "#64748b" }}
                    />
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      Job Posted On
                    </span>
                  </div>
                  <div className="job-posted-date">
                    {formatDate(job.job_detail?.created_at)}
                  </div>
                </div>
              </div>

              {job?.job_detail?.skills_arr?.length > 0 &&
                job.job_detail.skills_arr[0] !== "" && (
                  <div className="sidebar-section">
                    <h6 className="sidebar-title">Required Skills</h6>
                    <div className="skills-grid">
                      {job.job_detail.skills_arr.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="sidebar-section">
                <h6 className="sidebar-title">Location</h6>
                <div className="sidebar-content">
                  {job.cities?.name}, {job.states?.name}, {job.countries?.name}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
              {/* Job Header */}

              {/* Job Highlights */}
              <div className="w-100 ">
                <div className="highlights-grid">
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <FaBriefcase />
                    </div>
                    <div className="highlight-info">
                      <h4>Job Type</h4>
                      <p>{job.job_type?.name || "Full-Time"}</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <FaBuilding />
                    </div>
                    <div className="highlight-info">
                      <h4>Work Mode</h4>
                      <p>{job.job_workplace_types?.name || "Hybrid"}</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <FaClock />
                    </div>
                    <div className="highlight-info">
                      <h4>Experience</h4>
                      <p>{job.experience_level?.name || "Not-Mentioned"}</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon">
                      <FaDollarSign />
                    </div>
                    <div className="highlight-info">
                      <h4>Salary</h4>
                      <p>{job.job_detail?.Salary || "Not-Mentioned"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="content-section">
                <div className="tab-navigation">
                  <button
                    className={`tab-button ${
                      activeTab === "description" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Job Description
                  </button>
                  <button
                    className={`tab-button ${
                      activeTab === "company" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("company")}
                  >
                    About the company
                  </button>
                </div>

                {activeTab === "description" && (
                  <div>
                    <h2 className="section-title">Job Description</h2>
                    <div
                      className="job-description"
                      dangerouslySetInnerHTML={{
                        __html:
                          job.job_detail?.job_description ||
                          "No description available",
                      }}
                    />
                  </div>
                )}

                {activeTab === "company" && (
                  <div className="company-section">
                    <div className="company-card">
                      <img
                        src={
                          `https://apiwl.novajobs.us${job.companies?.logo}` ||
                          "https://via.placeholder.com/60"
                        }
                        alt={job.companies?.company_name}
                        className="company-logo-large"
                      />
                      <div className="company-info">
                        <h3>{job.companies?.company_name}</h3>
                        <p>
                          <FaUsers style={{ marginRight: "0.5rem" }} />
                          {job.company_size?.range || "N.A"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/company-details/${job.companies.id}`)
                        }
                        className="site-button explore-btn"
                      >
                        Explore More
                      </button>
                    </div>

                    <div className="job-description">
                      {job.companies?.about && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: job.companies.about,
                          }}
                        />
                      )}
                    </div>

                    {job.companies?.founded_date && (
                      <div style={{ marginTop: "1.5rem", fontWeight: "600" }}>
                        <strong>Founded:</strong> {job.companies.founded_date}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="bottom-actions">
                <button
                  disabled={isApplied || job.job_detail.is_job_applied}
                  onClick={() => handleApply(job.job_detail.id)}
                  className={`site-button flex-grow-1 fw-medium text-white ${
                    isApplied || job.job_detail.is_job_applied
                      ? "bg-success opacity-75"
                      : "bg-danger"
                  }`}
                  style={{
                    cursor:
                      isApplied || job.job_detail.is_job_applied
                        ? "not-allowed"
                        : "pointer",
                    pointerEvents:
                      isApplied || job.job_detail.is_job_applied
                        ? "none"
                        : "auto",
                  }}
                >
                  {isApplied || job.job_detail.is_job_applied
                    ? "Applied"
                    : "Quick Apply"}
                </button>
                {/* <button
                  onClick={handleToggleFavorite}
                  className={`flex-grow-1 fw-medium text-white ${
                    isSaved || job.job_detail?.is_job_favorite
                      ? "bg-danger opacity-75"
                      : "btn-secondary"
                  }`}
                   style={{
                    cursor:
                     isSaved || job.job_detail?.is_job_favorite
                        ? "not-allowed"
                        : "pointer",
                    pointerEvents:
                      isSaved || job.job_detail?.is_job_favorite
                        ? "none"
                        : "auto",
                  }}
                >
                  {isSaved || job.job_detail?.is_job_favorite
                    ? "Saved"
                    : "Save Job"}
                </button> */}
                <button
                  onClick={handleToggleFavorite}
                  className={`site-button fw-medium flex-grow-1 ${
                    isSaved || job.job_detail?.is_job_favorite
                      ? "bg--danger disabled"
                      : "bg-secondary"
                  }`}
                  disabled={isSaved || job.job_detail?.is_job_favorite}
                >
                  {isSaved || job.job_detail?.is_job_favorite
                    ? "Saved"
                    : "Save Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendedJobs />
      <ShareJobModal
        show={showModal}
        onClose={() => setShowModal(false)}
        shareUrl={shareUrl}
      />
      <Footer />
    </>
  );
}

export default JobDetailsPage;
