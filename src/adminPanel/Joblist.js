import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Dropdown, Form } from "react-bootstrap";
import { FaStore, FaEllipsisV } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Pagination from "./utils/Pagination";
import { formatDate } from "./utils/DateUtils";
import AddApplicantModal from "./utils/AddApplicantModal";

const Jobslist = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const Page_size = 10;
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addApplicantModal, setApplicantModal] = useState(false);
  const [applicantJob, setApplicantJob] = useState(null);

  // const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const navigate = useNavigate();
  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

  // Modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalJobId, setModalJobId] = useState(null);
  const [contactForm, setContactForm] = useState({
    recruiter_name: "",
    recruiter_email: "",
    recruiter_phone: "",
    recruiter_linkdin: "",
    remark: "",
  });
  const [viewData, setViewData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");
  const fetchJobs = async (page = 1) => {
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error("Auth token not found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      let jobsEndpoint = `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${page}&page_size=${Page_size}&is_publish=1&domain=${url}`;
      const queryParams = [];

      if (selectedDomain) queryParams.push(`domain_filter=${selectedDomain}`);
      if (jobTitle) queryParams.push(`title_keywords=${jobTitle}`);
      if (companyName) queryParams.push(`company_name=${companyName}`);

      if (queryParams.length > 0) {
        jobsEndpoint += `&${queryParams.join("&")}`;
      }

      const response = await fetch(jobsEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data?.data || []);
      setTotalPages(Math.ceil(data?.total_records / Page_size || 0));
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(currentPage);
    fetchDomains();
  }, [currentPage, selectedDomain, jobTitle, companyName]);

  const AddApplicant = (jobDetails) => {
    setApplicantModal(true);
    setApplicantJob(jobDetails);
  };

  const handleStatusChange = async (jobId, status) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("Auth token not found");
      return;
    }

    const url =
      status === "active"
        ? `https://apiwl.novajobs.us/api/admin/job-inactive/${jobId}`
        : `https://apiwl.novajobs.us/api/admin/job-active/${jobId}`;

    const payload = {
      status: status === "active" ? 0 : 1, // 📝 Flip because you're hitting the opposite API
    };

    try {
      const response = await axios.put(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      });

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(
          response.data.message || "Job status updated successfully"
        );

        // ✅ Update local jobs state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.job_detail?.id === jobId
              ? {
                  ...job,
                  job_detail: {
                    ...job.job_detail,
                    is_active: status === "active" ? 0 : 1,
                  },
                }
              : job
          )
        );
      } else {
        console.warn("Unexpected response:", response.data);
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error(error?.response?.data?.message || "Failed to update status");
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
      recruiter_name: job.job_detail.recruiter_name || "",
      recruiter_email: job.job_detail.recruiter_email || "",
      recruiter_phone: job.job_detail.recruiter_phone || "",
      recruiter_linkdin: job.job_detail.recruiter_linkdin || "",
      remark: job.job_detail.remark || "",
    });
    setShowContactModal(true);
  };

  // Open View Modal
  const handleOpenView = (job) => {
    setModalJobId(job.job_detail.id);
    setViewData({
      recruiter_name: job.job_detail.recruiter_name || "",
      recruiter_email: job.job_detail.recruiter_email || "",
      recruiter_phone: job.job_detail.recruiter_phone || "",
      recruiter_linkdin: job.job_detail.recruiter_linkdin || "",
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

      const response = await axios.put(
        `https://apiwl.novajobs.us/api/admin/jobs-recruiter/${modalJobId}`,
        contactForm,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        }
      );
      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(
          response.data.message || "Contact extracted Successfully"
        );
        setShowContactModal(false);
        fetchJobs(currentPage);
      }
      // const response = await fetch(
      //   `https://apiwl.novajobs.us/api/admin/additional-jobs-info/${modalJobId}`,
      //   {
      //     method: "PATCH",
      //     headers,
      //     body: JSON.stringify(contactForm),
      //   }
      // );
      // if (!response.ok) throw new Error("Failed to submit info");
      // setShowContactModal(false);
      // alert("Contact info updated successfully!");
      // fetchJobs(currentPage);
    } catch (e) {
      console.log("error", e);
      toast.error(
        e.response.data.message ||
          "Failed to update contact info. Please try again."
      );
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
            <Container fluid className="p-4">
              <Row className="gap-3">
                <div className="job-bx-title clearfix">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className=" font-weight-700 pull-left text-uppercase">
                      Job List{" "}
                    </h5>
                    <button
                      className="site-button btn-sm"
                      disabled
                      onClick={() => navigate("")}
                    >
                      Add Job
                    </button>
                  </div>
                </div>
                <div className="">
                  {/* <Col > */}
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
                  {/* </Col> */}
                </div>
                <div>
                  {/* <Col md={12}> */}
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
                    <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                      <table className="table table-bordered table-hover">
                        <thead className="text-center align-middle">
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
                            <th>Recruiter Info</th> {/* ✅ NEW COLUMN */}
                            <th>Job Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                          {jobs && jobs?.length > 0 ? (
                            jobs.map((job) => (
                              <tr key={job.job_detail.id}>
                                {/* Checkbox */}
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

                                {/* Job Title + Location */}
                                <td className="text-start">
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

                                {/* Applicants */}
                                <td className="d-flex flex-column gap-1">
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
                                    ({job.job_detail?.applicant_count || 0})
                                    View All
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => AddApplicant(job.job_detail)}
                                    className="ms-2"
                                  >
                                    + Add
                                  </Button>
                                </td>

                                {/* Date Posted */}
                                <td>
                                  <small className="">
                                    {formatDate(job?.job_detail?.created_at)}
                                  </small>
                                </td>

                                {/* Company */}
                                <td>{job?.companies?.company_name || "N/A"}</td>

                                {/* ✅ Recruiter Info */}
                                <td className="text-start">
                                  <div className="d-flex flex-column small">
                                    <span>
                                      <strong className="text-muted">
                                        Name:
                                      </strong>{" "}
                                      {job?.job_detail?.recruiter_name || "N/A"}
                                    </span>
                                    <span>
                                      <strong className="text-muted">
                                        Email:
                                      </strong>{" "}
                                      {job?.job_detail?.recruiter_email || "N/A"}
                                    </span>
                                    <span>
                                      <strong className="text-muted">
                                        Phone:
                                      </strong>{" "}
                                      {job?.job_detail?.recruiter_phone || "N/A"}
                                    </span>
                                    <span>
                                      <strong className="text-muted">
                                        LinkedIn:
                                      </strong>{" "}
                                      {job?.job_detail?.recruiter_linkdin ? (
                                        <a
                                          href={job.recruiter_linkdin}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-primary underline"
                                        >
                                          Link
                                        </a>
                                      ) : (
                                        "N/A"
                                      )}
                                    </span>
                                  </div>
                                </td>

                                {/* Job Status */}
                                <td>
                                  <span
                                    className={`badge ${
                                      job?.job_detail?.is_publish === 1
                                        ? "bg-success px-3 py-2"
                                        : "bg-warning px-3 py-2 text-dark"
                                    }`}
                                  >
                                    {job?.job_detail?.is_publish === 1
                                      ? "Open"
                                      : "Pause"}
                                  </span>
                                </td>

                                {/* Actions */}
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

                  {jobs.length > 0 && (
                    <div className="mt-4">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                      />
                      <div className="text-center mt-2">
                        <small className="text-muted">
                          Page {currentPage} of {totalPages}
                        </small>
                      </div>
                    </div>
                  )}
                  {/* </Col> */}
                </div>
              </Row>
            </Container>
          </Col>
        </div>
      </div>
      <div></div>

      {/* Contact Modal */}
      <Modal show={showContactModal} onHide={handleCloseContact}>
        <div closeButton>
          <div className="modal-title">Update Contact Info</div>
        </div>
        <Form onSubmit={handleContactSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="recruiter_name"
                value={contactForm.recruiter_name}
                onChange={handleContactChange}
                required
                maxLength={50}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="recruiter_email"
                value={contactForm.recruiter_email}
                onChange={handleContactChange}
                required
                maxLength={50}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="recruiter_phone"
                value={contactForm.recruiter_phone}
                onChange={handleContactChange}
                required
                maxLength={10}
                pattern="^\d{10}$"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="url"
                name="recruiter_linkdin"
                value={contactForm.recruiter_linkdin}
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
                maxLength={100}
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
        <div closeButton>
          <div className="modal-title">Additional Job Info</div>
        </div>
        <Modal.Body>
          {viewData ? (
            <div>
              <p>
                <strong>Name:</strong> {viewData.recruiter_name || "-"}
              </p>
              <p>
                <strong>Email:</strong> {viewData.recruiter_email || "-"}
              </p>
              <p>
                <strong>Phone:</strong> {viewData.recruiter_phone || "-"}
              </p>
              <p>
                <strong>Link:</strong> {viewData.recruiter_linkdin || "-"}
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

      {addApplicantModal && (
        <AddApplicantModal
          isOpen={addApplicantModal}
          onClose={() => setApplicantModal(false)}
          job={applicantJob}
          token={authToken}
          fetchJobs={fetchJobs}
        />
      )}
    </div>
  );
};

export default Jobslist;
