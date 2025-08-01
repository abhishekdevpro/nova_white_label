import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import noDataFound from "../../images/nodata.png";
import JobPageSkeleton from "../skeleton/jobPage";
import JobCard from "../Pages/JobPageV2/JobCard";
import { setJobApplicationData } from "../../store/reducers/jobApplicationSlice";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [skeleton, setSkeleton] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [sortBy, setSortBy] = useState("asc");
  const token = localStorage.getItem("jobSeekerLoginToken");

  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );

  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );

  const fetchJobApplicationData = async () => {
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/jobseeker/job-favorites?sort_order=${sortBy}`,
        {
          headers: { Authorization: token },
        }
      );
      dispatch(setJobApplicationData(response.data.data));
      setSkeleton(false);
    } catch (error) {
      console.error("Failed to fetch saved jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobApplicationData();
  }, []);

  const handleToggleFavorite = async (jobId) => {
    if (!token) {
      toast.error("Login required!");
      setTimeout(() => navigate("/user/login"), 2000);
      return;
    }

    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/jobseeker/job-favorites",
        { job_id: jobId },
        { headers: { Authorization: token } }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response.data.message || "Job added to favorites");
        fetchJobApplicationData();
      } else {
        toast.error(response.message || "Failed to update favorites");
      }
    } catch (error) {
      console.error("Favorite toggle failed:", error);
      toast.error("Failed to update favorites");
    }
  };

  const submitApplication = async () => {
    if (!selectedJob) return;

    if (selectedJob.job_apply_url) {
      window.location.href = selectedJob.job_apply_url;
    } else {
      try {
        await axios.post(
          "https://apiwl.novajobs.us/api/jobseeker/jobs-applied",
          {
            job_id: selectedJob.job_detail.id,
            screen_questions: screeningQuestion,
          },
          { headers: { Authorization: token } }
        );
        showToastSuccess("Job applied successfully");
      } catch (error) {
        console.error(error);
        showToastError(error?.response?.data?.message || "Application failed");
      }
    }
  };

  return (
    <div className="section-full bg-white">
      <div className="container">
        <div className="job-bx-title  clearfix">
          <h5 className="font-weight-700 pull-left text-uppercase">
            saved Jobs
          </h5>
          <div className="float-right">
            <select
              className="form-select form-select-sm w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="asc">Newest</option>
              <option value="desc">Oldest</option>
            </select>
          </div>
        </div>
        <div className="row" style={{maxHeight: 'calc(100vh)', overflowY: 'auto', scrollbarWidth:"none"}}>
          {skeleton ? (
            <div>
              Please wait or check if you have saved any jobs.
              <JobPageSkeleton />
            </div>
          ) : (
            <div className="col-lg-12">
              {jobApplicationData?.length ? (
                <ul className="post-job-bx browse-job">
                  {jobApplicationData.map((item) => (
                    <JobCard
                      key={item.s_no}
                      job={item}
                      onSelect={() => setSelectedJob(item)}
                      onToggleFavorite={fetchJobApplicationData}
                    />
                  ))}
                </ul>
              ) : (
                <div className="d-flex flex-column w-100 justify-content-center">
                  <img
                    src={noDataFound}
                    alt="No data found"
                    style={{ width: "400px", margin: "auto" }}
                  />
                  <p
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#f8d7da",
                      color: "#721c24",
                      border: "1px solid #f5c6cb",
                      borderRadius: "4px",
                      fontWeight: "600",
                      maxWidth: "100%",
                      margin: "20px auto",
                      textAlign: "center",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    No Saved Jobs Found.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
