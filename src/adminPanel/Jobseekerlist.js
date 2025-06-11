import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import PDFPopupViewer from "../components/ui/PdfPopUp";
import axios from "axios";
import { toast } from "react-toastify";

const Jobseekerlist = () => {
  const [jobs, setJobs] = useState([]);
  // Changed to store the selected PDF info instead of just boolean
  const [isVerified, setIsVerified] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const jobID = queryParams.get("jobID");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Auth token not found");

        const headers = {
          "Content-Type": "application/json",
          Authorization: authToken,
        };

        const jobsEndpoint = jobID
          ? `https://apiwl.novajobs.us/api/admin/job-applicants/${jobID}`
          : selectedDomain ? `https://apiwl.novajobs.us/api/admin/job-seekers?domain_filter=${selectedDomain}` :`https://apiwl.novajobs.us/api/admin/job-seekers`;

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (jobID) {
          setJobs(data.data.job_applicants_info);
        } else {
          setJobs(data.data);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    fetchDomains();
  }, [jobID, selectedDomain]);

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
            body: JSON.stringify({ status: 1 }),
          }
        );
      } else if (status === "inactive") {
        await fetch(
          `https://apiwl.novajobs.us/api/admin/jobseeker-inactive/${jobId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 0 }),
          }
        );
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const verifyDocument = async (jobId) => {
    const authToken = localStorage.getItem("authToken");
    if (!jobId) return;

    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/admin/verfiy-document",
        { job_seekerid: jobId },
        {
          headers: {
            Authorization: `${authToken}`,
          },
        }
      );
      if (response.data.status === "success" || response.data.code === 200) {
        setIsVerified(true);
        toast.success(
          response.data.message || "Document verified successfully"
        );
      }
    } catch (error) {
      toast.error("Error verifying document");
    }
  };

  // Function to handle opening PDF viewer
  const handleViewDocument = (job, status) => {
    const file =
      status === "document"
        ? job.jobskkers_detail?.document_type
        : job.jobskkers_detail?.resume_file_path;
    if (file) {
      const fileUrl = `https://apiwl.novajobs.us${file}`;
      setSelectedPDF({
        url: fileUrl,
        name: `${job.jobskkers_detail.first_name} ${job.jobskkers_detail.last_name} - ${status}`,
      });
    }
  };

  // Function to close PDF viewer
  const handleClosePDF = () => {
    setSelectedPDF(null);
  };

  const fetchDomains = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/admin/domain-list`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        setDomainList(response?.data?.data);
        //  console.log(response);
      }
    } catch (error) {
      console.log(error, "Error while fetching domains");
    }
  };

  // console.log(selectedDomain,"lllllshdhbd");
  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
          
            <Row className="align-items-center my-3">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <h4 className="text-dark fw-semibold mb-0">
                  Jobseeker List
                </h4>
              </Col>
              <Col xs={12} md={6}>
                <div className="d-flex gap-2 justify-content-md-end">
                  <select
                  // size={5}
                    className="form-select"
                    style={{
                      width: "250px",
                      maxWidth: "100%",
                    }}
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                  >
                    <option value=""
                   
                    >Search by vendor domain</option>
                    {domainList.map((domain, index) => (
                      <option key={index} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>

                  <Button
                   className="site-button btn-sm "
                   variant="danger"
                   onClick={()=>setSelectedDomain("")}
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <div>
                  {loading ? (
                    <div className="text-center my-5">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : jobs && jobs?.length > 0 ? (
                    <table className="w-full table table-bordered table-hover table-responsive">
                      <thead className="text-center bg-light">
                        <tr>
                          <th>S.No.</th>
                          {/* <th>Profile Image</th> */}
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Account Status</th>
                          <th>Documents</th>
                          <th>Resume</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center align-middle">
                        {jobs?.map((job, index) => {
                          const detail = job.jobskkers_detail || {};
                          return (
                            <tr key={job.id || index}>
                              <td>{index + 1}</td>
                              {/* <td>
                                {detail.image ? (
                                  <img
                                    src={`https://apiwl.novajobs.us${detail.image}`}
                                    alt="Profile"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <span className="text-muted">N/A</span>
                                )}
                              </td> */}
                              <td>{detail.first_name || "N/A"}</td>
                              <td>{detail.last_name || "N/A"}</td>
                              <td>{detail.email || "N/A"}</td>
                              <td>{detail.phone || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    detail.is_verified === 1
                                      ? "bg-success p-2"
                                      : "bg-danger p-2"
                                  }`}
                                >
                                  {detail.is_verified === 1
                                    ? "Active"
                                    : "Deactive"}
                                </span>
                              </td>
                              <td>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  disabled={!detail.document_type}
                                  className="site-button"
                                  onClick={() =>
                                    handleViewDocument(job, "document")
                                  }
                                >
                                  View Documents
                                </Button>
                              </td>
                              <td>
                                <Button
                                  variant="dark"
                                  size="sm"
                                  disabled={!detail.resume_file_path}
                                  className="site-button"
                                  onClick={() =>
                                    handleViewDocument(job, "resume")
                                  }
                                >
                                  View Resume
                                </Button>
                              </td>
                              <td>
                                <div className="d-flex flex-column gap-2">
                                  {/* {detail.is_verified === 1 ? (
                                    <Button
                                      variant="warning"
                                      size="sm"
                                      onClick={() =>
                                        handleStatusChange(
                                          detail.id,
                                          "inactive"
                                        )
                                      }
                                    >
                                      Set Inactive
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="success"
                                      size="sm"
                                      onClick={() =>
                                        handleStatusChange(detail.id, "active")
                                      }
                                    >
                                      Set Active
                                    </Button>
                                  )} */}

                                  {!detail.is_document_verified ? (
                                    <Button
                                      variant="info"
                                      size="sm"
                                      disabled={!detail.document_type}
                                      onClick={() => verifyDocument(detail.id)}
                                    >
                                      Verify Document
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="success"
                                      size="sm"
                                      disabled
                                      style={{
                                        opacity: 1,
                                        pointerEvents: "none",
                                        cursor: "not-allowed",
                                      }}
                                    >
                                      Verified
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center my-5">
                      <h5 className="text-muted">No Applicants Found</h5>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* PDF Popup Viewer - moved outside the table */}
      <PDFPopupViewer
        show={selectedPDF !== null}
        onClose={handleClosePDF}
        fileUrl={selectedPDF?.url}
        fileName={selectedPDF?.name}
      />
    </div>
  );
};

export default Jobseekerlist;
