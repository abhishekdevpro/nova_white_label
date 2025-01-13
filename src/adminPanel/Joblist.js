import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Jobslist = () => {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Auth token not found");
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: authToken,
        };

        const jobsEndpoint = "https://api.novajobs.us/api/admin/job-lists";

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data.data); // Assuming the data is in data.data
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
      }
    };

    fetchJobs();
  }, []);

  const handleStatusChange = async (jobId, status) => {
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    try {
      if (status === "active") {
        await fetch(
          `https://api.novajobs.us/api/admin/jobseeker-active/${jobId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 1 }), // Send 1 for active
          }
        );
      } else if (status === "inactive") {
        await fetch(
          `https://api.novajobs.us/api/admin/jobseeker-inactive/${jobId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 0 }), // Send 0 for inactive
          }
        );
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <p>
              <FaStore className="mx-1" /> / Jobs
            </p>
            <Row>
              <Col md={12}>
                <div
                  style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "500px",
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          No.
                        </th>
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          Job Title
                        </th>
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          Created Date
                        </th>
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          Company
                        </th>
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          Location
                        </th>
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          Edit
                        </th>
                        <th
                          style={{
                            backgroundColor: "#1C2957",
                            color: "white",
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((job) => (
                        <tr key={job.id} className="text-center">
                          <td>{job.s_no}</td>
                          <td>{job.job_detail.job_title}</td>
                          <td>{job.job_detail.created_at}</td>
                          <td>{job.companies.company_name}</td>
                          <td>{job.countries.name}</td>
                          <td>
                            <button
                              onClick={() => {
                                navigate(`/admin/addjob/${job.job_detail.id}`);
                              }}
                              className="px-3 py-2 site-button text-white border-0"
                              style={{ cursor: "pointer" }}
                            >
                              Edit Job
                            </button>
                          </td>
                          <td className="text-center">
                            {job.is_published === 1 ? (
                              <Button
                                variant="warning"
                                onClick={() =>
                                  handleStatusChange(job.id, "inactive")
                                }
                              >
                                Set Inactive
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                onClick={() =>
                                  handleStatusChange(job.id, "active")
                                }
                              >
                                Set Active
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobslist;
