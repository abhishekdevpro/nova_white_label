import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import FixedHeader from "../Layout/fixedHeader";
import moment from "moment";
import JobPageSkeleton from "../skeleton/jobPage";
import noDataFound from "../../images/nodata.png";
import Profilesidebar from "../Element/Profilesidebar";
import noDataFoundImg from "../../images/nodata.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setJobSeekerAnswer,
  setScreeningQuestion,
} from "../../store/reducers/jobApplicationScreeningQues";
import { Form, Modal, Tab } from "react-bootstrap";
import JobCard from "./JobPageV2/JobCard";
const postBlog = [
  { title: "PHP Web Developer" },
  { title: "Software Developer" },
  { title: "Branch Credit Manager" },
];
function Jobsappliedjob() {
  const [skeleton, setSkeleton] = useState(true);
  const [sortBy, setSortBy] = useState("desc");

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );
  const token = localStorage.getItem("jobSeekerLoginToken");
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/jobseeker/jobs-applied?sort_order=${sortBy}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setSkeleton(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, [sortBy]);

  const [selectedJob, setSelectedJob] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSelectJob = (job) => {
    console.log(job, "selected job");
    setSelectedJob(job);
  };

  useEffect(() => {
    if (selectedJob && selectedJob.screen_questions) {
      dispatch(setScreeningQuestion(selectedJob.screen_questions));
    }
  }, [selectedJob]);

  useEffect(() => {
    if (jobApplicationData && jobApplicationData.length > 0) {
      setSelectedJob(jobApplicationData[0]);
    } else {
      console.log("No job application data available");
    }
    console.log(jobApplicationData, "error");
  }, [jobApplicationData]);

  return (
    <>
      <Header2 />
      {/* <FixedHeader /> */}

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar data={"applied-jobs"} />
                <div className="col-xl-9 m-b30 browse-job">
                  <div className="job-bx-title  clearfix">
                    <h5 className="font-weight-700 pull-left text-uppercase">
                      Applied Jobs
                    </h5>
                    <div className="float-right">
                      <select
                        className="custom-btn"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="desc">Newest</option>
                        <option value="asc">Oldest</option>
                      </select>
                    </div>
                  </div>
                  {skeleton === true ? (
                    <JobPageSkeleton />
                  ) : (
                    <div
                      className="py-2"
                      style={{
                        maxHeight: "calc(100vh)",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                        overflowX: "hidden",
                      }}
                    >
                      {data ? (
                        <ul className="post-job-bx browse-job px-2">
                          {data.length === 0 ? (
                            <>
                              <div className="d-flex flex-column w-100 justify-content-center">
                                <img
                                  src={noDataFoundImg}
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
                                  Not Applied to any job
                                </p>
                              </div>
                            </>
                          ) : (
                            data?.map((item) => (
                              <JobCard
                                key={item.s_no}
                                job={item}
                                onSelect={() => setSelectedJob(item)}
                                onToggleFavorite={fetchAppliedJobs}
                              />
                            ))
                          )}
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
export default Jobsappliedjob;
