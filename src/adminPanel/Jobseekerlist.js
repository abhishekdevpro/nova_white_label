import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import PDFPopupViewer from "../components/ui/PdfPopUp";
import axios from "axios";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import DocumentListModal from "./utils/DocumentListModal";

const Jobseekerlist = () => {
  const [jobs, setJobs] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobseekerId, setSelectedJobseekerId] = useState(null);

  const queryParams = new URLSearchParams(window.location.search);
  const jobID = queryParams.get("jobID");

  const fetchJobs = async () => {
    setLoading(true);
    let finalEndpoint = `https://apiwl.novajobs.us/api/admin/job-seekers`;

    const query = [];
    if (selectedDomain) query.push(`domain_filter=${selectedDomain}`);
    if (name) query.push(`name=${name}`);
    if (email) query.push(`email=${email}`);

    if (query.length > 0) {
      finalEndpoint += `?${query.join("&")}`;
    }

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Auth token not found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      const jobsEndpoint = jobID
        ? `https://apiwl.novajobs.us/api/admin/job-applicants/${jobID}`
        : finalEndpoint;

      const response = await fetch(jobsEndpoint, { headers });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (jobID) {
        setJobs(data.data.job_applicants_info);
      } else {
        setJobs(data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchJobs = useCallback(debounce(fetchJobs, 500), [
    selectedDomain,
    name,
    email,
    jobID,
  ]);

  useEffect(() => {
    debouncedFetchJobs();
    return () => debouncedFetchJobs.cancel(); // cancel on cleanup
  }, [selectedDomain, name, email, jobID, debouncedFetchJobs]);

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
      }
    } catch (error) {
      console.log(error, "Error while fetching domains");
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const handleViewDocument = (job, type) => {
    // console.log(job,"jon bange don");
    setSelectedJobseekerId(job?.jobskkers_detail?.id);
    setIsModalOpen(true);
  };
  const handleViewResume = (job) => {
    const file = job.jobskkers_detail?.resume_file_path;

    if (file) {
      setSelectedPDF({
        url: `https://apiwl.novajobs.us${file}`,
        name: `${job.jobskkers_detail.first_name} ${job.jobskkers_detail.last_name}-Resume`,
      });
    }
  };

  // const handleStatusChange = async (jobId, status) => {
  //   const authToken = localStorage.getItem("authToken");

  //   if (!authToken) {
  //     console.error("Auth token not found");
  //     return;
  //   }

  //   // Define API URL based on status
  //   const url =
  //     status === "active"
  //       ? `https://apiwl.novajobs.us/api/admin/jobseeker-active/${jobId}`
  //       : `https://apiwl.novajobs.us/api/admin/jobseeker-inactive/${jobId}`;

  //   const payload = {
  //     status: status === "active" ? 1 : 0,
  //   };

  //   try {
  //     const response = await axios.put(url, payload, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: authToken,
  //       },
  //     });

  //     if (response.data.status === "success" || response.data.code === 200) {
  //       console.log("Status updated successfully");
  //       toast.success(response.data.message || "Status updated successfully");
  //       await fetchJobs()
  //       // Optionally: show a toast or refresh job list
  //     } else {
  //       console.warn("Unexpected response:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error updating job status:", error);
  //     toast.error(error?.response?.data?.message || "Failed to update status");
  //   }
  // };
  const handleStatusChange = async (jobId, status) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("Auth token not found");
      return;
    }

    const url =
      status === "active"
        ? `https://apiwl.novajobs.us/api/admin/jobseeker-active/${jobId}`
        : `https://apiwl.novajobs.us/api/admin/jobseeker-inactive/${jobId}`;

    const payload = {
      status: status === "active" ? 1 : 0,
    };

    try {
      const response = await axios.put(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response.data.message || "Status updated successfully");

        // ✅ Update local jobs state instead of calling fetch again
        setJobs((prev) =>
          prev.map((job) =>
            job.jobskkers_detail?.id === jobId
              ? {
                  ...job,
                  jobskkers_detail: {
                    ...job.jobskkers_detail,
                    is_verified: status === "active" ? 1 : 0,
                  },
                }
              : job
          )
        );
      } else {
        console.warn("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const handleClosePDF = () => {
    setSelectedPDF(null);
  };

  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="pl-2">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Row className="align-items-center my-3">
              <Col xs={12} md={2}>
                <h4 className="text-dark fw-semibold mb-0">Jobseeker List</h4>
              </Col>
              <Col xs={12} md={10}>
                <div className=" d-flex flex-row gap-3 justify-content-md-end flex-wrap">
                  <input
                    type="text"
                    placeholder="Search by email"
                    className="form-control"
                    style={{ maxWidth: "250px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Search by name"
                    className="form-control"
                    style={{ maxWidth: "250px" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <select
                    className="form-select"
                    style={{ width: "250px", maxWidth: "100%" }}
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                  >
                    <option value="">Search by vendor domain</option>
                    {domainList.map((domain, i) => (
                      <option key={i} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>

                  <Button
                    className="site-button btn-sm"
                    variant="danger"
                    onClick={() => {
                      setName("");
                      setEmail("");
                      setSelectedDomain("");
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {loading ? (
                  <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : jobs.length > 0 ? (
                  <table className="w-full table table-bordered table-hover table-responsive">
                    <thead className="text-center bg-light">
                      <tr>
                        <th>S.No.</th>
                        <th>Jobseeker Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Account Status</th>
                        <th>Documents</th>
                        <th>Resume</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {jobs.map((job, index) => {
                        const detail = job.jobskkers_detail || {};
                        return (
                          <tr key={job.id || index}>
                            <td>{index + 1}</td>
                            <td>
                              {`${detail.first_name || ""} ${
                                detail.last_name || ""
                              }`.trim() || "N/A"}
                            </td>

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
                                onClick={() => handleViewResume(job)}
                              >
                                View Resume
                              </Button>
                            </td>
                            <td>
                              {detail.is_verified === 0 ? (
                                <Button
                                  variant="warning"
                                  size="sm"
                                  className="site-button"
                                  onClick={() =>
                                    handleStatusChange(detail.id, "active")
                                  }
                                >
                                  Active
                                </Button>
                              ) : (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  className="site-button"
                                  onClick={() =>
                                    handleStatusChange(detail.id, "inactive")
                                  }
                                >
                                  Deactive
                                </Button>
                              )}
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
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <PDFPopupViewer
        show={selectedPDF !== null}
        onClose={handleClosePDF}
        fileUrl={selectedPDF?.url}
        fileName={selectedPDF?.name}
      />
      <DocumentListModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobseekerId={selectedJobseekerId}
      />
    </div>
  );
};

export default Jobseekerlist;
