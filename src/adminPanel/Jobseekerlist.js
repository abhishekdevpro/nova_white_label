import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import PDFPopupViewer from "../components/ui/PdfPopUp";
import axios from "axios";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import DocumentListModal from "./utils/DocumentListModal";
import Pagination from "./utils/Pagination";
import { formatDate, formatDaysAgo } from "./utils/DateUtils";
import { FaEllipsisV } from "react-icons/fa";
import { Calendar, CheckCircle2, MessageCircle, Trash2 } from "lucide-react";

const Jobseekerlist = () => {
  const [jobs, setJobs] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [loading, setLoading] = useState(false);
  const [domainList, setDomainList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobId, setJobId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobseekerId, setSelectedJobseekerId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [jobCounts, setJobCounts] = useState(null);
  const [appliedStatusId, setAppliedStatusId] = useState(null);
  const statusMap = {
    all: "",
    review: 1,
    hold: 2,
    reject: 3,
    shortlist: 4,
    interview: 5,
    hired: 6,
  };

  const countBadges = [
    { label: "All", key: "all" },
    { label: "Reviewing", key: "review" },
    { label: "Hold", key: "hold" },
    { label: "Rejected", key: "reject" },
    { label: "Shortlisted", key: "shortlist", icon: "✔️" },
    { label: "Interviewing", key: "interview" },
    { label: "Hired", key: "hired" },
  ];

  const getStatusLabelById = (id) => {
    // console.log(id, "iddddd");
    const match = countBadges.find((badge) => statusMap[badge.key] === id);
    return match ? match.label : "Unknown";
  };

  const handleStatusClick = (key) => {
    const statusId = statusMap[key];

    setAppliedStatusId(statusId); // Set the state for fetchJobs
    setCurrentPage(1); // Reset to page 1 on filter change
    console.log(`Status clicked: ${key}, ID: ${statusId}`);
    // const params = new URLSearchParams(window.location.search);
    if (statusId) {
      setAppliedStatusId(statusId);
      // params.set("jobseeker_applied_status_id", statusId);
    }
    // const newUrl = `${window.location.pathname}?${params.toString()}`;
    // window.history.replaceState({}, "", newUrl);
  };

  const Page_size = 10;
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const jobID = queryParams.get("jobID");
    if (jobID) {
      setJobId(jobID);
      fetchJobCounts(jobID);
    }
  }, []);

  const fetchJobs = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      page_no: currentPage,
      page_size: Page_size,
    });

    if (selectedDomain) params.append("domain_filter", selectedDomain);
    if (name) params.append("name", name);
    if (email) params.append("email", email);
    if (jobId) {
      params.append("job_id", jobId);
      params.append("is_all_applicant", "1"); // Send as string
    }
    if (appliedStatusId) {
      params.append("jobseeker_applied_status_id", appliedStatusId);
    }

    const finalEndpoint = `https://apiwl.novajobs.us/api/admin/job-seekers?${params.toString()}`;

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("Auth token not found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      const response = await fetch(finalEndpoint, { headers });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      setJobs(data?.data || []);
      console.log(data.data, "jobbbbbb");

      setTotalPages(Math.ceil(Number(data?.total_records) / Page_size) || 1);
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
    jobId,
    currentPage,
    appliedStatusId,
  ]);

  useEffect(() => {
    debouncedFetchJobs();
    return () => debouncedFetchJobs.cancel(); // cancel on cleanup
  }, [selectedDomain, name, email, jobId, debouncedFetchJobs, currentPage]);

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
  const fetchJobCounts = async (jobId) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken || !jobId) return;

    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/admin/jobs-applied-counts/${jobId}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        // console.log(response.data, "job counts");
        setJobCounts(response.data?.data);
      } else {
        console.warn("Unexpected response for job counts:", response.data);
      }
    } catch (error) {
      console.error("Error fetching job counts:", error);
    }
  };

  const fetchJobTitles = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `https://apiwl.novajobs.us/api/admin/job-title`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        // console.log(response.data, "job title");
        setTitleList(response?.data?.data);
      }
    } catch (error) {
      console.log(error, "Error while fetching domains");
    }
  };

  useEffect(() => {
    fetchDomains();
    fetchJobTitles();
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

  const handleJobseekerStatusChange = async (jobseekerId, statusId) => {
    const authToken = localStorage.getItem("authToken");
    console.log(jobseekerId, "kokokok");
    try {
      const res = await axios.patch(
        `https://apiwl.novajobs.us/api/admin/jobseeker/applied-status`,
        {
          job_id: Number(jobId),
          job_seeker_id: jobseekerId,
          jobseeker_applied_status_id: statusId,
        },
        {
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.code === 200 || res.data.status === "success") {
        toast.success(
          res.data.message || "Jobseeker status updated successfully"
        );
        fetchJobCounts(jobId);
        fetchJobs();
      }
      console.log(res.data, "shortlist jobseeker");
    } catch (error) {
      console.error("Error shortlisting jobseeker:", error);
    }
  };

  const handleSetUpInetview = async () => {
    try {
      const res = await axios.get(
        `https://apiwl.novajobs.us/api/admin/schedule-interview?meeting-time=15`,
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      console.log(res.data.data.calendly_link, "schedule interview");
      if (res.data.data.calendly_link) {
        window.open(
          res.data.data.calendly_link,
          "_blank",
          "noopener,noreferrer"
        );
      }
      //  console.log(res,"schedule interview");
    } catch (error) {
      console.log(error, "Error while scheduling interview");
    }
  };

  const handleClosePDF = () => {
    setSelectedPDF(null);
  };
  // console.log(jobCounts, "selected counts");

  return (
    <div>
      <div>
        <CustomNavbar />
        <div>
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>

            <Col md={10}>
              <Container className="">
                <Row className="">
                  <Col md={12} className="mx-auto">
                    <Row className="align-items-center my-3 gap-2">
                      <Col xs={12} md={12}>
                        <h4 className="text-dark fw-semibold mb-0">
                          Jobseeker List
                        </h4>
                      </Col>
                      <Col md={12}>
                        {jobCounts && (
                          <div className="d-flex flex-wrap gap-2 my-3">
                            {countBadges.map((badge, i) => {
                              const isActive =
                                appliedStatusId ===
                                String(statusMap[badge.key]);

                              return (
                                <div
                                  key={i}
                                  onClick={() => handleStatusClick(badge.key)}
                                  className={`d-flex align-items-center px-3 py-1 rounded border shadow-sm transition-all ${
                                    isActive
                                      ? "bg-dark text-white border-dark"
                                      : "bg-light text-dark border-light hover-shadow"
                                  }`}
                                  role="button"
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                  }}
                                >
                                  {badge.icon && (
                                    <span
                                      className="me-1"
                                      style={{ fontSize: "16px" }}
                                    >
                                      {badge.icon}
                                    </span>
                                  )}
                                  <span>{badge.label}</span>
                                  <span
                                    className={`ms-2 fw-bold ${
                                      isActive ? "text-white" : "text-secondary"
                                    }`}
                                  >
                                    {jobCounts?.[badge.key] ?? 0}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </Col>
                      <Col md={12}>
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
                          <select
                            className="form-select"
                            style={{ width: "250px", maxWidth: "100%" }}
                            value={jobId}
                            onChange={(e) => setJobId(e.target.value)}
                          >
                            <option value="">Search by job title</option>
                            {titleList.map((title, i) => (
                              <option key={i} value={title.id}>
                                {title.job_title}
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
                              setJobId("");
                            }}
                          >
                            Clear
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <Row className="">
                      <Col md={12} className=" ">
                        {loading ? (
                          <div className="text-center my-5">
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : jobs.length > 0 ? (
                          <table className="table table-bordered table-hover table-responsive mx-auto">
                            <thead className="text-start bg-light">
                              <tr>
                                <th>S.No.</th>
                                <th>Jobseeker</th>
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
                                const job_applied = job.jobs_applied || {};
                                // console.log(job_applied, "job_applied");
                                return (
                                  <tr key={job.id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <>
                                        <div className="d-flex flex-column ">
                                          <p className="mb-0 text-start text-wrap-balanced text-dark fw-bold">
                                            {`${detail.first_name || ""} ${
                                              detail.last_name || ""
                                            }`.trim() || "N/A"}
                                          </p>
                                          <p className="mb-0 text-start text-wrap-balanced">
                                            {detail?.job_title ||
                                              detail?.proffesional_title}
                                          </p>
                                          {jobId && (
                                            <>
                                              <p className="mb-0 text-start text-wrap-balanced">
                                                {formatDaysAgo(
                                                  detail.created_at
                                                ) || "N/A"}
                                              </p>
                                              {job_applied?.jobseeker_applied_status_id !==
                                                0 && (
                                                <p className="mb-0 text-start">
                                                  <span
                                                    className={`badge ${
                                                      job_applied?.jobseeker_applied_status_id ===
                                                      3
                                                        ? "bg-danger"
                                                        : job_applied?.jobseeker_applied_status_id ===
                                                          4
                                                        ? "bg-success"
                                                        : "bg-primary"
                                                    }`}
                                                  >
                                                    {getStatusLabelById(
                                                      job_applied?.jobseeker_applied_status_id
                                                    )}
                                                  </span>
                                                </p>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </>
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
                                        disabled={!detail.has_document}
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
                                            handleStatusChange(
                                              detail.id,
                                              "active"
                                            )
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
                                            handleStatusChange(
                                              detail.id,
                                              "inactive"
                                            )
                                          }
                                        >
                                          Deactive
                                        </Button>
                                      )}
                                    </td>
                                    <td>
                                      <Dropdown className="text-end ">
                                        <Dropdown.Toggle
                                          variant="light"
                                          id={`dropdown-${detail.id}`}
                                          className="btn-sm border-0 shadow-none text-muted bg-transparent"
                                          style={{
                                            fontSize: "1rem",
                                            padding: "0.25rem 0.5rem",
                                          }}
                                        >
                                          <FaEllipsisV />
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu
                                          className="shadow-sm rounded-2 py-2"
                                          align="end"
                                        >
                                          <Dropdown.Item className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light">
                                            <MessageCircle size={16} /> Message
                                          </Dropdown.Item>
                                          <Dropdown.Item
                                            className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light"
                                            onClick={() =>
                                              handleSetUpInetview()
                                            }
                                          >
                                            <Calendar size={16} /> Set up
                                            Interview
                                          </Dropdown.Item>
                                          {/* <Dropdown.Item className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light">
                                            <Trash2 size={16} /> Delete
                                            Jobseeker
                                          </Dropdown.Item> */}
                                          {jobId && jobCounts && (
                                            <>
                                              <Dropdown.Item
                                                className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light"
                                                onClick={() =>
                                                  handleJobseekerStatusChange(
                                                    detail.id,
                                                    4
                                                  )
                                                }
                                              >
                                                <CheckCircle2 size={16} />
                                                Mark as Shortlist
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light"
                                                onClick={() =>
                                                  handleJobseekerStatusChange(
                                                    detail.id,
                                                    1
                                                  )
                                                }
                                              >
                                                <CheckCircle2 size={16} />
                                                Mark as Review
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light"
                                                onClick={() =>
                                                  handleJobseekerStatusChange(
                                                    detail.id,
                                                    6
                                                  )
                                                }
                                              >
                                                <CheckCircle2 size={16} />
                                                Mark as Hired
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                className="py-2 px-3 text-sm text-dark fw-medium hover-bg-light"
                                                onClick={() =>
                                                  handleJobseekerStatusChange(
                                                    detail.id,
                                                    3
                                                  )
                                                }
                                              >
                                                <CheckCircle2 size={16} />
                                                Mark as Rejected
                                              </Dropdown.Item>
                                            </>
                                          )}
                                        </Dropdown.Menu>
                                      </Dropdown>
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
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </div>
      </div>
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
