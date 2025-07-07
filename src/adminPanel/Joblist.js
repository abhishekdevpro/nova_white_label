import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { FaStore, FaEllipsisV } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Jobslist = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
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

      const jobsEndpoint = selectedDomain
        ? `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${page}&page_size=${size}&is_publish=1&domain=${url}&domain_filter=${selectedDomain}`
        : `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${page}&page_size=${size}&is_publish=1&domain=${url}`;

      const response = await fetch(jobsEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.data);
      setTotalRecords(data.total_records); // Fix: data.total_records, not response.data.total_records
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage, itemsPerPage); // Use current page
    fetchDomains();
  }, [currentPage, itemsPerPage, selectedDomain]); // <- Listen for currentPage or itemsPerPage change

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const generatePagination = () => {
    const pageNumbers = [];
    const pageRange = 5; // Number of pages to display at a time
    const halfRange = Math.floor(pageRange / 2);

    // Calculate start and end pages dynamically
    let startPage = Math.max(1, currentPage - halfRange);
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    // Adjust the range if we're near the beginning or end
    if (currentPage <= halfRange) {
      startPage = 1;
      endPage = Math.min(pageRange, totalPages);
    } else if (currentPage > totalPages - halfRange) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - pageRange + 1);
    }

    // Add first page if not already included
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    // Add page numbers in the range
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add last page if not already included
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
            // body: JSON.stringify({ status: 1 }), // Send 1 for active
          }
        );
      } else if (status === "inactive") {
        await fetch(`https://apiwl.novajobs.us/api/admin/job-active/${jobId}`, {
          method: "PUT",
          headers,
          // body: JSON.stringify({ status: 0 }), // Send 0 for inactive
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
        //  console.log(response);
      }
    } catch (error) {
      console.log(error, "Error while fetching domains");
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
      // Refresh the jobs list to get updated data
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
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Row className="align-items-center my-3">
              <Col xs={12} md={6} className="mb-2 mb-md-0">
                <h4 className="text-dark fw-semibold mb-0">Jobs List</h4>
              </Col>
              <Col xs={12} md={6}>
                <div className="d-flex gap-2 justify-content-md-end">
                  <select
                    className="form-select"
                    style={{
                      width: "250px",
                      maxWidth: "100%",
                    }}
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                  >
                    <option
                      value=""
                      style={{
                        height: "250px",
                      }}
                    >
                      Search by vendor domain
                    </option>
                    {domainList.map((domain, index) => (
                      <option key={index} value={domain}>
                        {domain}
                      </option>
                    ))}
                  </select>

                  <Button
                    className="site-button btn-sm "
                    variant="danger"
                    onClick={() => setSelectedDomain("")}
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
                  ) : (
                    <table className="table table-bordered table-hover table-responsive ">
                      <thead>
                        <tr className="text-center">
                          {[
                            "S.No.",
                            "Job Title",
                            "Created Date",
                            "Company",
                            "Location",
                            "Status",
                            "Actions",
                          ].map((heading, index) => (
                            <th
                              key={index}
                              style={{
                                backgroundColor: "#1C2957",
                                color: "white",
                                verticalAlign: "middle",
                              }}
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {jobs && jobs?.length > 0 ? (
                          jobs.map((job, index) => (
                            <tr
                              key={job.id}
                              className="text-center align-middle"
                            >
                              <td>{index + 1}</td>
                              <td>{job?.job_detail?.job_title || "N/A"}</td>
                              <td>{job?.job_detail?.created_at || "N/A"}</td>
                              <td>{job?.companies?.company_name || "N/A"}</td>
                              <td>{job?.countries?.name || "N/A"}</td>
                              <td>
                                {" "}
                                <span
                                  className={`badge ${
                                    job?.job_detail?.is_publish === 1
                                      ? "bg-success px-2 py-2 "
                                      : "bg-secondary px-2 py-2 "
                                  }`}
                                >
                                  {job?.job_detail?.is_publish === 1
                                    ? "Published"
                                    : "UnPublished"}
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
                                        job.job_detail?.applicant_count === 0
                                      }
                                    >
                                      View Applicants (
                                      {job.job_detail?.applicant_count || 0})
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
                              colSpan="7"
                              className="text-center py-4 text-muted"
                            >
                              No jobs found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                  <div className="pagination d-flex flex-wrap justify-content-center">
                    {/* Previous button */}
                    <button
                      className="btn btn-outline-primary me-2 mb-2"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>

                    {/* Page number buttons */}
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

                    {/* Next button */}
                    <button
                      className="btn btn-outline-primary mb-2"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
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
