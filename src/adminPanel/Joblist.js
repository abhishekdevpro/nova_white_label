import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Dropdown, Form } from "react-bootstrap";
import { FaStore, FaEllipsisV } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const Jobslist = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const navigate = useNavigate();
  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

  // Modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalJobId, setModalJobId] = useState(null);
  const [contactForm, setContactForm] = useState({
    email: "",
    phone: "",
    link: "",
    remark: "",
  });
  const [viewData, setViewData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchJobs = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Auth token not found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      let jobsEndpoint = `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${page}&page_size=${size}&is_publish=1&domain=${url}`;
      const queryParams = [];

      if (selectedDomain) queryParams.push(`domain_filter=${selectedDomain}`);
      if (jobTitle) queryParams.push(`job_title=${jobTitle}`);
      if (companyName) queryParams.push(`company_name=${companyName}`);

      if (queryParams.length > 0) {
        jobsEndpoint += `&${queryParams.join("&")}`;
      }

      const response = await fetch(jobsEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.data);
      setTotalRecords(data.total_records);
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage, itemsPerPage);
    fetchDomains();
  }, [currentPage, itemsPerPage, selectedDomain, jobTitle, companyName]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const generatePagination = () => {
    const pageNumbers = [];
    const pageRange = 5;
    const halfRange = Math.floor(pageRange / 2);

    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    if (currentPage <= halfRange) {
      startPage = 1;
      endPage = Math.min(pageRange, totalPages);
    } else if (currentPage > totalPages - halfRange) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - pageRange + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handleStatusChange = async (jobId, status) => {
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    try {
      if (status === "active") {
        await fetch(
          `https://apiwl.novajobs.us/api/admin/job-inactive/${jobId}`,
          {
            method: "PUT",
            headers,
          }
        );
      } else if (status === "inactive") {
        await fetch(`https://apiwl.novajobs.us/api/admin/job-active/${jobId}`, {
          method: "PUT",
          headers,
        });
      }
    } catch (error) {
      console.error("Error updating job status:", error);
    }
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
      }
    } catch (error) {
      console.log(error, "Error while fetching domains");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedJobs(jobs.map((job) => job.job_detail.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId, checked) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    }
  };

  // Open Contact Modal
  const handleOpenContact = (job) => {
    setModalJobId(job.job_detail.id);
    setContactForm({
      email: job.job_detail.email || "",
      phone: job.job_detail.phone || "",
      link: job.job_detail.link || "",
      remark: job.job_detail.remark || "",
    });
    setShowContactModal(true);
  };

  // Open View Modal
  const handleOpenView = (job) => {
    setModalJobId(job.job_detail.id);
    setViewData({
      email: job.job_detail.email || "",
      phone: job.job_detail.phone || "",
      link: job.job_detail.link || "",
      remark: job.job_detail.remark || "",
    });
    setShowViewModal(true);
  };

  // Close modals
  const handleCloseContact = () => setShowContactModal(false);
  const handleCloseView = () => setShowViewModal(false);

  // Handle form change
  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  // Submit contact info
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };
      const response = await fetch(
        `https://apiwl.novajobs.us/api/admin/additional-jobs-info/${modalJobId}`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(contactForm),
        }
      );
      if (!response.ok) throw new Error("Failed to submit info");
      setShowContactModal(false);
      alert("Contact info updated successfully!");
      fetchJobs(currentPage, itemsPerPage);
    } catch (e) {
      alert("Failed to update contact info. Please try again.");
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          <Sidebar />

          <Col>
            <Container fluid className="">
              <Row className="gap-3">
                <Row className="align-items-center my-3">
                  <Col xs={12} md={2}>
                    <h4 className="text-dark fw-semibold mb-0">Jobs List</h4>
                  </Col>
                  <Col xs={12} md={10}>
                    <div className=" d-flex flex-row gap-3 justify-content-md-end flex-wrap">
                      <input
                        type="text"
                        placeholder="Search by Company Name"
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />

                      <input
                        type="text"
                        placeholder="Search by Job Title"
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
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
                          setJobTitle("");
                          setCompanyName("");
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
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{ overflowX: "auto" }}>
                        <table className="table table-bordered table-hover">
                          <thead className="text-center">
                            <tr>
                              <th>
                                <Form.Check
                                  type="checkbox"
                                  checked={
                                    selectedJobs.length === jobs.length &&
                                    jobs.length > 0
                                  }
                                  onChange={(e) =>
                                    handleSelectAll(e.target.checked)
                                  }
                                />
                              </th>
                              <th>Job Title</th>

                              <th>Applicants</th>
                              <th>Date Posted</th>
                              <th>Company</th>
                              <th>Job Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody className="text-center align-middle">
                            {jobs && jobs?.length > 0 ? (
                              jobs.map((job, index) => (
                                <tr key={job.id}>
                                  <td>
                                    <Form.Check
                                      type="checkbox"
                                      checked={selectedJobs.includes(
                                        job.job_detail.id
                                      )}
                                      onChange={(e) =>
                                        handleSelectJob(
                                          job.job_detail.id,
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <div className="d-flex flex-column">
                                      <Link
                                        to={`/user/jobs/${job.job_detail.id}`}
                                      >
                                        <strong className="mb-1">
                                          {job?.job_detail?.job_title || "N/A"}
                                        </strong>
                                      </Link>
                                      <small className="text-muted">
                                        {[
                                          job?.cities?.name,
                                          job?.states?.name,
                                          job?.countries?.name,
                                        ]
                                          .filter(Boolean)
                                          .join(", ") || "N/A"}
                                      </small>
                                    </div>
                                  </td>

                                  <td>
                                    <Button
                                      variant="link"
                                      className="p-0 text-decoration-none"
                                      onClick={() =>
                                        navigate(
                                          `/admin/listalljobseeker?jobID=${job.job_detail?.id}`
                                        )
                                      }
                                      disabled={
                                        job.job_detail?.applicant_count === 0
                                      }
                                    >
                                      {job.job_detail?.applicant_count || 0}{" "}
                                      View All
                                    </Button>
                                  </td>
                                  <td>
                                    {formatDate(job?.job_detail?.created_at)}
                                  </td>
                                  <td>
                                    {job?.companies?.company_name || "N/A"}
                                  </td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        job?.job_detail?.is_publish === 1
                                          ? "bg-success px-2 py-2"
                                          : "bg-warning px-2 py-2 text-dark"
                                      }`}
                                    >
                                      {job?.job_detail?.is_publish === 1
                                        ? "Open"
                                        : "Pause"}
                                    </span>
                                  </td>
                                  <td>
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        variant="light"
                                        id={`dropdown-${job.job_detail.id}`}
                                        className="btn-sm"
                                      >
                                        <FaEllipsisV />
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          onClick={() =>
                                            navigate(
                                              `/admin/addjob/${job?.job_detail?.id}`
                                            )
                                          }
                                        >
                                          Edit Job
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handleStatusChange(
                                              job?.job_detail?.id,
                                              job?.job_detail?.is_active === 1
                                                ? "active"
                                                : "inactive"
                                            )
                                          }
                                        >
                                          {job?.job_detail?.is_active === 1
                                            ? "Deactivate"
                                            : "Activate"}
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            navigate(
                                              `/admin/listalljobseeker?jobID=${job.job_detail?.id}`
                                            )
                                          }
                                          disabled={
                                            job.job_detail?.applicant_count ===
                                            0
                                          }
                                        >
                                          View Applicants (
                                          {job.job_detail?.applicant_count || 0}
                                          )
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item
                                          onClick={() => handleOpenContact(job)}
                                        >
                                          Contact
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => handleOpenView(job)}
                                        >
                                          View Info
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan="8"
                                  className="text-center py-4 text-muted"
                                >
                                  No jobs found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div className="pagination d-flex flex-wrap justify-content-center mt-4">
                      <button
                        className="btn btn-outline-primary me-2 mb-2"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      {generatePagination().map((page, index) =>
                        page === "..." ? (
                          <span key={index} className="btn btn-light disabled">
                            ...
                          </span>
                        ) : (
                          <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`btn ${
                              currentPage === page
                                ? "btn-primary"
                                : "btn-outline-secondary"
                            } me-2 mb-2`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        className="btn btn-outline-primary mb-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </Col>
                </Row>
              </Row>
            </Container>
          </Col>
        </div>
      </div>
      <div></div>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={handleCloseContact}>
        <Modal.Header closeButton>
          <Modal.Title>Update Contact Info</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleContactSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={contactForm.email}
                onChange={handleContactChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={contactForm.phone}
                onChange={handleContactChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={contactForm.link}
                onChange={handleContactChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Remark</Form.Label>
              <Form.Control
                as="textarea"
                name="remark"
                value={contactForm.remark}
                onChange={handleContactChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseContact}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={modalLoading}>
              {modalLoading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>Additional Job Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewData ? (
            <div>
              <p>
                <strong>Email:</strong> {viewData.email || "-"}
              </p>
              <p>
                <strong>Phone:</strong> {viewData.phone || "-"}
              </p>
              <p>
                <strong>Link:</strong> {viewData.link || "-"}
              </p>
              <p>
                <strong>Remark:</strong> {viewData.remark || "-"}
              </p>
            </div>
          ) : (
            <div className="text-muted">No additional info found.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Jobslist;
