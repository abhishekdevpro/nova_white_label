import React from "react";
import { Card, Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import PDFPopupViewer from "../components/ui/PdfPopUp";
import axios from "axios";
import { toast } from "react-toastify";

const Jobseekerlist = () => {
  const [jobs, setJobs] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const jobID = queryParams.get("jobID");

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Auth token not found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      const jobsEndpoint = jobID
        ? `https://apiwl.novajobs.us/api/admin/job-applicants/${jobID}`
        : "https://apiwl.novajobs.us/api/admin/job-seekers";

      const response = await fetch(jobsEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (jobID) {
        setJobs(data.data.job_applicants_info); // ✅ when jobID is present
      } else {
        setJobs(data.data); // ✅ when jobID is NOT present
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  fetchJobs();
}, [jobID]); // ✅ Add jobID to dependency array


  console.log(jobs,"lll");

  const handleStatusChange = async (jobId, status) => {
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    try {
      if (status === "active") {
        await fetch(
          `https://apiwl.novajobs.us/api/admin/jobseeker-active/${jobId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 1 }), // Sending 1 for active
          }
        );
      } else if (status === "inactive") {
        await fetch(
          `https://apiwl.novajobs.us/api/admin/jobseeker-inactive/${jobId}`,
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
  const verifyDocument = async (jobId) => {
    const authToken = localStorage.getItem("authToken");
    console.log(jobId, "llll");
    if (!jobId) return;

    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/admin/verfiy-document",
        { job_seekerid: jobId },
        {
          headers: {
            Authorization: `${authToken}`, // 🛡️ Add "Bearer" if required
          },
        }
      );
      toast.success(response.data.message || "Document verified successfully");
      // console.log("Document verified successfully:", response.data);
      // Optionally: show success toast, update UI state, etc.
    } catch (error) {
      toast.error("Error verifying document");
      // Optionally: show error toast
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
                        <th>Documents</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {jobs?.map((job) => (
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
                            <Button
                              variant="primary"
                              disabled={!job.jobskkers_detail.document_type}
                              className="site-button"
                              onClick={() => setIsViewerOpen(true)}
                            >
                              View Documents
                            </Button>
                            <PDFPopupViewer
                              show={isViewerOpen}
                              onClose={() => setIsViewerOpen(false)}
                              fileUrl={`https://apiwl.novajobs.us${job.jobskkers_detail?.document_type}`}
                            />
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              {job.jobskkers_detail.is_verified === 1 ? (
                                <Button
                                  variant="warning"
                                  className="site-button"
                                  onClick={() =>
                                    handleStatusChange(job.id, "inactive")
                                  }
                                >
                                  Set Inactive
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  className="site-button"
                                  onClick={() =>
                                    handleStatusChange(job.id, "active")
                                  }
                                >
                                  Set Active
                                </Button>
                              )}
                              {job.jobskkers_detail.is_document_verified ===
                              false ? (
                                <Button
                                  variant="info"
                                  className="site-button"
                                  disabled={
                                    !job.jobskkers_detail?.document_type
                                  }
                                  onClick={() =>
                                    verifyDocument(job.jobskkers_detail.id)
                                  }
                                >
                                  Verify
                                </Button>
                              ) : (
                                <Button
                                  variant="primary"
                                  className="site-button"
                                  // onClick={() =>
                                  //   verifyDocument(job.id, "verify")
                                  // }
                                >
                                  Verified
                                </Button>
                              )}
                            </div>
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
