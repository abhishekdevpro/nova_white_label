import React from "react";
import { Card, Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Jobseekerlist = () => {
  const [jobs, setJobs] = useState([]);

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

        const jobsEndpoint = "https://api.novajobs.us/api/admin/job-seekers";

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJobs(data.data); // Assuming the data is in data.data
      } catch (error) {
        console.error("Error fetching job data:", error);
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
            body: JSON.stringify({ status: 1 }), // Sending 1 for active
          }
        );
      } else if (status === "inactive") {
        await fetch(
          `https://api.novajobs.us/api/admin/jobseeker-inactive/${jobId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 0 }), // Sending 0 for inactive
          }
        );
      }
      // Optionally refetch the jobs to update the list after status change
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
                    <thead className="text-center">
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Account Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {jobs.map((job) => (
                        <tr key={job}>
                          <td>{job.jobskkers_detail.first_name}</td>
                          <td>{job.jobskkers_detail.last_name}</td>
                          <td>{job.jobskkers_detail.email}</td>
                          <td>{job.jobskkers_detail.phone}</td>
                          <td>
                            {job.jobskkers_detail.is_verified === 1
                              ? "Active"
                              : "Inactive"}
                          </td>
                          <td>
                            {job.jobskkers_detail.is_verified === 1 ? (
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

export default Jobseekerlist;
