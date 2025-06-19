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
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const jobApplicationData = useSelector(
    (state) => state.jobApplicationSlice.jobApplicationData
  );
  const token = localStorage.getItem("jobSeekerLoginToken");
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(
        "https://apiwl.novajobs.us/api/jobseeker/jobs-applied",
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
  }, []);

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

  const screeningQuestion = useSelector(
    (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
  );
  const [activeTab, setActiveTab] = useState("contact-info");
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
  console.log(selectedJob?.job_detail?.id, "job id");
  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://93.188.167.106:3001/api/jobseeker/jobs-applied",
      headers: {
        Authorization: token,
      },
      data: {
        job_id: selectedJob.job_detail.id,
        screen_questions: screeningQuestion,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

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
                      <span className="select-title">Sort by freshness</span>
                      <select className="custom-btn">
                        <option>Last 2 Months</option>
                        <option>Last Months</option>
                        <option>Last Weeks</option>
                        <option>Last 3 Days</option>
                      </select>
                    </div>
                  </div>
                  {skeleton === true ? (
                    <JobPageSkeleton />
                  ) : (
                    <div>
                      {data ? (
                        <ul className="post-job-bx browse-job">
                          {/*  */}
                          {data?.map((item, index) => (
                            <JobCard
                              key={item.s_no}
                              job={item}
                              onSelect={() => setSelectedJob(item)}
                              onToggleFavorite={fetchAppliedJobs}
                            />
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

                  {/* <div className="pagination-bx m-t30">
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
                  </div> */}
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
