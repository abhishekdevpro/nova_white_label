// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import { FaStore } from "react-icons/fa";
// import CustomNavbar from "./Navbar";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";

// const Jobslist = () => {
//   const [jobs, setJobs] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const authToken = localStorage.getItem("authToken");
//         if (!authToken) {
//           throw new Error("Auth token not found");
//         }

//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: authToken,
//         };

//         const jobsEndpoint = "https://apiwl.novajobs.us/api/admin/job-lists";

//         const response = await fetch(jobsEndpoint, { headers });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setJobs(data.data); // Assuming the data is in data.data
//       } catch (error) {
//         console.error("Error fetching job data:", error);
//       } finally {
//       }
//     };

//     fetchJobs();
//   }, []);

//   const handleStatusChange = async (jobId, status) => {
//     const authToken = localStorage.getItem("authToken");
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: authToken,
//     };

//     try {
//       if (status === "active") {
//         await fetch(
//           `https://apiwl.novajobs.us/api/admin/jobseeker-active/${jobId}`,
//           {
//             method: "PUT",
//             headers,
//             body: JSON.stringify({ status: 1 }), // Send 1 for active
//           }
//         );
//       } else if (status === "inactive") {
//         await fetch(
//           `https://apiwl.novajobs.us/api/admin/jobseeker-inactive/${jobId}`,
//           {
//             method: "PUT",
//             headers,
//             body: JSON.stringify({ status: 0 }), // Send 0 for inactive
//           }
//         );
//       }
//     } catch (error) {
//       console.error("Error updating job status:", error);
//     }
//   };

//   return (
//     <div>
//       <CustomNavbar />
//       <Container fluid>
//         <Row>
//           <Col md={2} className="p-0">
//             <Sidebar />
//           </Col>
//           <Col md={10}>
//             <p>
//               <FaStore className="mx-1" /> / Jobs
//             </p>
//             <Row>
//               <Col md={12}>
//                 <div
//                   style={{
//                     overflowX: "auto",
//                     overflowY: "auto",
//                     maxHeight: "500px",
//                   }}
//                 >
//                   <table className="table">
//                     <thead>
//                       <tr className="text-center">
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           No.
//                         </th>
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           Job Title
//                         </th>
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           Created Date
//                         </th>
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           Company
//                         </th>
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           Location
//                         </th>
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           Edit
//                         </th>
//                         <th
//                           style={{
//                             backgroundColor: "#1C2957",
//                             color: "white",
//                           }}
//                         >
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {jobs.map((job) => (
//                         <tr key={job.id} className="text-center">
//                           <td>{job.s_no}</td>
//                           <td>{job.job_detail.job_title}</td>
//                           <td>{job.job_detail.created_at}</td>
//                           <td>{job.companies.company_name}</td>
//                           <td>{job.countries.name}</td>
//                           <td>
//                             <button
//                               onClick={() => {
//                                 navigate(`/admin/addjob/${job.job_detail.id}`);
//                               }}
//                               className="px-3 py-2 site-button text-white border-0"
//                               style={{ cursor: "pointer" }}
//                             >
//                               Edit Job
//                             </button>
//                           </td>
//                           <td className="text-center">
//                             {job.is_published === 1 ? (
//                               <Button
//                                 variant="warning"
//                                 onClick={() =>
//                                   handleStatusChange(job.id, "inactive")
//                                 }
//                               >
//                                 Set Inactive
//                               </Button>
//                             ) : (
//                               <Button
//                                 variant="success"
//                                 onClick={() =>
//                                   handleStatusChange(job.id, "active")
//                                 }
//                               >
//                                 Set Active
//                               </Button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Jobslist;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Jobslist = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs(currentPage, perPage);
  }, [currentPage, perPage]);

  const fetchJobs = async (page, pageSize) => {
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

      // Get current domain URL for the API
      const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;
      
      const jobsEndpoint = `https://apiwl.novajobs.us/api/admin/job-lists?page_no=${page}&page_size=${pageSize}&is_publish=1&domain=${url}`;

      const response = await fetch(jobsEndpoint, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJobs(data.data || []); 
      
      // Set pagination info from API response
      if (data.pagination) {
        setTotalPages(data.pagination.total_records || 0);
        setTotalRecords(data.pagination.total_records || 0);
      } else if (data.meta) {
        // Alternative structure if pagination info is in meta
        setTotalPages(Math.ceil(data.meta.total / pageSize));
        setTotalRecords(data.meta.total || 0);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
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
      
      // Refresh the current page after status change
      fetchJobs(currentPage, perPage);
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );

    // Calculate start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // First page if not visible
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Page numbers
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    // Last page if not visible
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next 
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return items;
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
            
            {/* Page Size Selector and Info */}
            <Row className="mb-3">
              <Col md={6}>
                <div className="d-flex align-items-center">
                  <label className="me-2">Show:</label>
                  <select 
                    className="form-select" 
                    style={{ width: 'auto' }}
                    value={perPage}
                    onChange={handlePerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="ms-2">entries</span>
                </div>
              </Col>
              <Col md={6} className="text-end">
                <span className="text-muted">
                  Showing {jobs.length > 0 ? ((currentPage - 1) * perPage + 1) : 0} to{' '}
                  {Math.min(currentPage * perPage, totalRecords)} of {totalRecords} entries
                </span>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <div
                  style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "500px",
                  }}
                >
                  {loading ? (
                    <div className="text-center p-4">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr className="text-center">
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            No.
                          </th>
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            Job Title
                          </th>
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            Created Date
                          </th>
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            Company
                          </th>
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            Location
                          </th>
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            Edit
                          </th>
                          <th style={{ backgroundColor: "#1C2957", color: "white" }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobs.length > 0 ? (
                          jobs.map((job, index) => (
                            <tr key={job.id} className="text-center">
                              <td>{(currentPage - 1) * perPage + index + 1}</td>
                              <td>{job.job_detail?.job_title || 'N/A'}</td>
                              <td>{job.job_detail?.created_at || 'N/A'}</td>
                              <td>{job.companies?.company_name || 'N/A'}</td>
                              <td>{job.countries?.name || 'N/A'}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    navigate(`/admin/addjob/${job.job_detail?.id}`);
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
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center p-4">
                              No jobs found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-3">
                    <Pagination>
                      {renderPaginationItems()}
                    </Pagination>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobslist;