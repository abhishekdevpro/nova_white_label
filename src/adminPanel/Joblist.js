import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Jobslist = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalRecords / itemsPerPage);
  const navigate = useNavigate();
  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;
  // useEffect(() => {
  //   const fetchJobs = async (currentPage=1,itemsPerPage=10) => {
  //     try {
  //       const authToken = localStorage.getItem("authToken");
  //       if (!authToken) {
  //         throw new Error("Auth token not found");
  //       }

  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: authToken,
  //       };

  //       const jobsEndpoint = `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${currentPage}&page_size=${itemsPerPage}&is_publish=1&domain=${url}`;

  //       const response = await fetch(jobsEndpoint, { headers });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setJobs(data.data); // Assuming the data is in data.data
  //       setTotalRecords(response.data.total_records);
  //     } catch (error) {
  //       console.error("Error fetching job data:", error);
  //     } finally {
  //     }
  //   };

  //   fetchJobs();
  // }, []);

  useEffect(() => {
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

        const jobsEndpoint = `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${page}&page_size=${size}&is_publish=1&domain=${url}`;

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

    fetchJobs(currentPage, itemsPerPage); // Use current page
  }, [currentPage, itemsPerPage]); // <- Listen for currentPage or itemsPerPage change

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
        await fetch(
          `https://apiwl.novajobs.us/api/admin/job-active/${jobId}`,
          {
            method: "PUT",
            headers,
            // body: JSON.stringify({ status: 0 }), // Send 0 for inactive
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
              <FaStore className="mx-1" /> Jobs List
            </p>
            <Row>
              <Col md={12}>
                <div
                // style={{
                //   overflowX: "auto",
                //   overflowY: "auto",
                //   maxHeight: "500px",
                // }}
                >
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
                    <table className="table table-bordered table-hover table-responsive">
                      <thead>
                        <tr className="text-center">
                          {[
                            "S.No.",
                            "Job Title",
                            "Created Date",
                            "Company",
                            "Location",
                            "Status",
                            "Edit",
                            "Action",
                            "Applicants",
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
                        {jobs.length > 0 ? (
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
                              <td> <span
                                  className={`badge ${
                                    job?.job_detail?.is_publish=== 1
                                      ? "bg-success p-2"
                                      : "bg-secondary p-2"
                                  }`}
                                >
                                  {job?.job_detail?.is_publish=== 1
                                    ? "Published"
                                    : "UnPublished"}
                                </span></td>
                              <td>
                                <button
                                  onClick={() =>
                                    navigate(
                                      `/admin/addjob/${job?.job_detail?.id}`
                                    )
                                  }
                                  className="site-button text-white border-0"
                                  style={{
                                    backgroundColor: "#0d6efd",
                                    cursor: "pointer",
                                    borderRadius: "5px",
                                  }}
                                >
                                  Edit Job
                                </button>
                              </td>
                              <td>
                                {job?.job_detail?.is_active === 1 ? (
                                  <Button
                                  className="site-button"
                                    variant="success"
                                    // size="sm"
                                    onClick={() =>
                                      handleStatusChange(job?.job_detail?.id, "active")
                                    }
                                  >
                                   Deactivate
                                  </Button>
                                ) : (
                                  <Button
                                   className="site-button"
                                    variant="danger"
                                    // size="sm"
                                    onClick={() =>
                                      handleStatusChange(job?.job_detail?.id, "inactive")
                                    }
                                  >
                                    Activate
                                  </Button>
                                )}
                              </td>
                              <td>
                                <Button
                                  variant="info"
                                  // size="sm"
                                   className="site-button"
                                  onClick={() =>
                                    navigate(
                                      `/admin/listalljobseeker?jobID=${job.job_detail?.id}`
                                    )
                                  }
                                >
                                  View Applicants
                                </Button>
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
    </div>
  );
};

export default Jobslist;
