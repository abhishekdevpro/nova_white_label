import {
  FaMapMarkerAlt,
  FaRegClock,
  FaRupeeSign,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { formatDaysAgo } from "../../../adminPanel/utils/DateUtils";

function JobCard({ job, onSelect, onToggleFavorite }) {
  const [isApplied, setIsApplied] = useState(job.job_detail?.is_job_applied);
  const [isSaved, setIsSaved] = useState(job.job_detail?.is_job_favorite);

  const defaultLogo =
    "https://www.shutterstock.com/image-vector/circle-business-logo-company-name-260nw-1922534714.jpg";
  const navigate = useNavigate();
  const token = localStorage.getItem("jobSeekerLoginToken");
  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );
  const handleApply = async (jobId) => {
    if (!token) {
      toast.error("Please login to apply for this job");
      navigate("/user/login");
      return;
    }
    else navigate(`/user/apply/${jobId}`);
    
  };

  const handleToggleFavorite = async (JobId) => {
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
          job_id: JobId,
        },
      });
      // console.log(response.message,"meassg");
      if (response) {
        toast.success(response.data.message || "job added to favorites");
        setIsSaved((prev) => !prev);
        if (typeof onToggleFavorite === "function") {
          onToggleFavorite();
        }
      } else toast.error(response.message);
    } catch (error) {
      console.log(error);
      // toast.error(error.message || "Failed to add job to favorites. Try again! ")
    }
  };
  return (
    <div
      className="job-card mb-3 rounded-3 shadow-sm position-relative transition"
      style={{
        padding: "20px",
        backgroundColor: "#f4f9ff",
        borderRadius: "16px !important",
      }}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-start">
          {/* Company Logo */}
          <div className="company-logo me-3 flex-shrink-0">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "auto",
                height: "auto",
                // backgroundColor: '#ff4757',
                overflow: "hidden",
              }}
            >
              <img
                src={
                  `https://apiwl.novajobs.us${job.companies?.logo}` ||
                  defaultLogo
                }
                alt={job.companies?.company_name}
                className="w-100 h-100 rounded-circle"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Company Info */}
          <div
            className="company-info"
            onClick={() => window.scrollTo(0, 0)} // Scroll to top on click
          >
            <Link
              to={`/company-details/${job.companies?.id}`}
              className="company-name mb-1 fw-medium"
              style={{
                fontSize: "14px",
                color: "#333",
                fontWeight: "500",
              }}
            >
              {job.companies?.company_name}
            </Link>
            <p
              className="posted-time mb-0"
              style={{
                fontSize: "12px",
                color: "#999",
                margin: "0",
              }}
            >
              {/* {moment(job.job_detail?.created_at).fromNow()} */}
              Posted {formatDaysAgo(job.job_detail?.created_at)}
            </p>
          </div>
        </div>

        {/* Favorite Icon */}
        <div className="">
          <button
            onClick={() => handleToggleFavorite(job.job_detail?.id)}
            className="btn btn-link p-0 border-0"
            style={{
              color: "#ccc",
              fontSize: "18px",
              border: "none",
            }}
          >
            {isSaved || job.job_detail?.is_job_favorite ? (
              <FaHeart color="#ff4757" />
            ) : (
              <FaRegHeart color="#ccc" />
            )}
          </button>
        </div>
      </div>

      {/* Job Title */}
      <div className="mb-3">
        <h4
          className="job-title mb-0 fw-bold"
          style={{
            fontSize: "20px",
            color: "#333",
            fontWeight: "600",
            lineHeight: "1.3",
          }}
        >
          {job.job_detail?.job_title}
        </h4>
      </div>

      {/* Location */}
      <div className="mb-3">
        <div
          className="d-flex align-items-center"
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          <FaMapMarkerAlt
            className="me-2"
            size={14}
            style={{ color: "#999" }}
          />
          <span>
            {job.cities?.name}, {job.states?.name},{" "}
            {job.companies?.countries?.name}
          </span>
        </div>
      </div>

      {/* Experience and Salary */}
      <div className="mb-4">
        <div className="d-flex align-items-center flex-wrap">
          {job.job_detail?.experience_level && (
            <div
              className="d-flex align-items-center me-4"
              style={{ fontSize: "14px", color: "#666" }}
            >
              <FaRegClock
                className="me-2"
                size={14}
                style={{ color: "#999" }}
              />
              <span>{job.job_detail?.experience_level}</span>
            </div>
          )}

          {job.job_detail?.salary_range && (
            <div
              className="d-flex align-items-center"
              style={{ fontSize: "14px", color: "#666" }}
            >
              <FaRupeeSign
                className="me-1"
                size={14}
                style={{ color: "#999" }}
              />
              <span>{job.job_detail?.salary_range} / month</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills/Tags */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {/* Job Category */}
          {job.job_category?.name && (
            <span
              className="badge"
              style={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontSize: "12px",
                fontWeight: "400",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "none",
              }}
            >
              {job.job_category?.name}
            </span>
          )}

          {/* Job Type */}
          {job.job_type?.name && (
            <span
              className="badge"
              style={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontSize: "12px",
                fontWeight: "400",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "none",
              }}
            >
              {job.job_type?.name}
            </span>
          )}

          {/* Skills */}
          {job.job_detail?.skills_arr &&
            job.job_detail?.skills_arr.slice(0, 2).map((skill, index) => (
              <span
                key={index}
                className="badge"
                style={{
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                  fontSize: "12px",
                  fontWeight: "400",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  border: "none",
                }}
              >
                {skill}
              </span>
            ))}

          {/* More indicator */}
          {(job.job_detail?.skills_arr?.length || 0) > 2 && (
            <span
              className="badge"
              style={{
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
                fontSize: "12px",
                fontWeight: "400",
                padding: "6px 12px",
                borderRadius: "20px",
                border: "none",
              }}
            >
              +{(job.job_detail?.skills_arr?.length || 0) - 2} More
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3">
        <button
          className="site-button flex-grow-1 fw-medium"
          onClick={() => navigate(`/user/jobs/${job.job_detail.id}`)}
        >
          View Job
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
              isApplied || job.job_detail.is_job_applied ? "none" : "auto",
          }}
        >
          {isApplied || job.job_detail.is_job_applied
            ? "Applied"
            : "Quick Apply"}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
