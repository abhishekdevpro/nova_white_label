import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserHeader from "../../Layout/Header";

function InterviewResult() {
  const { jobId } = useParams();
  const [interviewResult, setInterviewResult] = useState([]);
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [searchParams] = useSearchParams();
  const isOnDemand = searchParams.get("on_demand");
  useEffect(() => {
    const getInterviewResult = async () => {
        const API = isOnDemand ? `https://apiwl.novajobs.us/api/jobseeker/interview/ondemand/lists/${jobId}`:`https://apiwl.novajobs.us/api/jobseeker/interview/practice/lists/${jobId}`
      const res = await axios.get(
        API,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setInterviewResult(res.data.data);
    };
    getInterviewResult();
  }, [jobId]);

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h1 className="text-center mb-4">Practice Interview Result</h1>
        <div className="accordion" id="interviewAccordion">
          {interviewResult.length > 0 ? (
            interviewResult.map((item, index) => (
              <div className="accordion-item mb-3" key={item.id}>
                <div
                  className={`accordion-header d-flex align-items-center p-3 border rounded `}
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="flex-grow-1">
                    <h5 className="mb-0">
                      <span className="text-primary">#{index + 1}</span>{" "}
                      {item.question}
                    </h5>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {console.log(item.is_answer_correct, "is_answer_correct")}
                    <span
                      className={`badge ${
                        item.is_answer_correct ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {item.is_answer_correct ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-2 px-2 py-2 ">
                  <span className="fw-semibold">Your Answer:</span>
                  <p
                    className={`mb-2  ${
                      item.is_answer_correct ? "text-success" : "text-danger"
                    }`}
                  >
                    {item.user_transcript || "No answer submitted."}
                  </p>
                </div>

                <div
                  id={`collapse${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#interviewAccordion"
                >
                  <div className="accordion-body">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-subtitle mb-3 text-muted">
                          Your Response:
                        </h6>
                        <p className="card-text">{item.user_transcript}</p>
                        {/* {item.video_url && (
                      <div className="mt-3">
                        <a
                          href={item.video_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          Watch Video Response
                        </a>
                      </div>
                    )} */}
                        <small className="text-muted mt-2 d-block">
                          Submitted on:{" "}
                          {new Date(item.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p className="text-muted">No interview results found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default InterviewResult;
