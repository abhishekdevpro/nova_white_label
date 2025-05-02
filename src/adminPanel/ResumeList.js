import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { 
  faFilter, 
  faUndoAlt, 
  faCheck, 
  faSortAmountDown, 
  faMapMarkerAlt, 
  faBriefcase, 
  faBuilding, 
  faChevronDown, 
  faSearch 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component
import { FaFileAlt } from "react-icons/fa";
import CustomNavbar from "./Navbar";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resumesPerPage = 10; // Number of resumes per page

  // Active filters (these will be used for API calls)
  const [activeFilters, setActiveFilters] = useState({
    sortBy: "asc",
    location: "",
    position: "",
    vendorId: ""
  });

  // Temporary filter states (for form inputs)
  const [tempFilters, setTempFilters] = useState({
    sortBy: "asc",
    location: "",
    position: "",
    vendorId: ""
  });

  // Job titles for the position dropdown
  const [jobTitles, setJobTitles] = useState([]);

  // Add a new state for vendors
  const [vendors, setVendors] = useState([]);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.get(
        "https://apiwl.novajobs.us/api/admin/all-bulk-resume",
        {
          headers: { Authorization: token },
          params: {
            sort_by: activeFilters.sortBy,
            location: activeFilters.location || undefined,
            position: activeFilters.position || undefined,
            vendor_id: activeFilters.vendorId || undefined,
          },
        }
      );

      if (response.data?.status === "success") {
        setResumes(response.data.data);
      } else {
        console.error(response.data?.message || "Error fetching resumes");
        setResumes([]); // Set resumes to an empty array if there's an error
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setResumes([]); // Set resumes to an empty array in case of an error
    }
  };

  const fetchJobTitles = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.get("https://apiwl.novajobs.us/api/user/job-title", {
        headers: { Authorization: token },
      });

      if (response.data?.status === "success") {
        // Extract job titles from the API response
        const titles = response.data.data.map((job) => job.name);
        setJobTitles(titles);
      }
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
  };

  // Fetch vendors from the API
  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.get("https://apiwl.novajobs.us/api/admin/vendor-lists", {
        headers: { Authorization: token },
      });

      if (response.data?.status === "success") {
        // Extract vendors from the API response using vendors_detail.id
        const vendorList = response.data.data.map((vendor) => ({
          id: vendor.vendors_detail.id,
          name: vendor.company_detail.company_name || vendor.vendors_detail.first_name + " " + vendor.vendors_detail.last_name || "Unknown Vendor",
        }));
        setVendors(vendorList);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [activeFilters]); // Only re-fetch when activeFilters change

  useEffect(() => {
    fetchJobTitles();
  }, []);

  // Call fetchVendors in useEffect
  useEffect(() => {
    fetchVendors();
  }, []);

  // Pagination logic
  const indexOfLastResume = currentPage * resumesPerPage;
  const indexOfFirstResume = indexOfLastResume - resumesPerPage;
  const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);

  const totalPages = Math.ceil(resumes.length / resumesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page
    setActiveFilters({ ...tempFilters }); // Update active filters with temporary values
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      sortBy: "asc",
      location: "",
      position: "",
      vendorId: ""
    };
    setTempFilters(defaultFilters);
    setActiveFilters(defaultFilters);
    setCurrentPage(1);
  };

  // Update temporary filter values
  const handleFilterChange = (field, value) => {
    setTempFilters(prev => ({
      ...prev,
      [field]: value
    }));
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
              <FaFileAlt className="mx-1" /> / Resume List
            </p>
            <Row className="mt-4">
              <Col>
                <h2 className="mb-3">Resume List</h2>

                {/* Filter Form */}
                <Form 
                  onSubmit={handleFilterSubmit} 
                  className="mb-4 p-0 border-0"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                  }}
                >
                  <div className="px-4 py-3 border-bottom" style={{ background: 'rgba(255,255,255,0.5)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px' }}>
                    <div className="d-flex align-items-center">
                      <div>
                        <h5 className="fw-bold m-0" style={{ color: '#2563eb' }}>
                          <FontAwesomeIcon icon={faFilter} className="me-2" />
                          Filter Resumes
                        </h5>
                        <p className="text-muted small m-0 mt-1">Customize your search criteria</p>
                      </div>
                      <div className="ms-auto d-flex gap-2">
                        <Button 
                          variant="link" 
                          onClick={handleResetFilters} 
                          className="text-muted px-3 py-2 d-flex align-items-center"
                          style={{ 
                            transition: 'all 0.2s',
                            textDecoration: 'none',
                            fontSize: '0.9rem'
                          }}
                        >
                          <FontAwesomeIcon icon={faUndoAlt} className="me-2" />
                          Reset
                        </Button>
                        <Button 
                          variant="primary" 
                          type="submit" 
                          className="px-4 py-2 d-flex align-items-center"
                          style={{ 
                            background: 'linear-gradient(145deg, #2563eb, #1d4ed8)',
                            border: 'none',
                            borderRadius: '12px',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                          }}
                        >
                          <FontAwesomeIcon icon={faCheck} className="me-2" />
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <Row className="g-4">
                      <Col md={3}>
                        <Form.Group controlId="sortBy">
                          <Form.Label className="d-flex align-items-center mb-2">
                            <FontAwesomeIcon icon={faSortAmountDown} className="me-2" style={{ color: '#2563eb' }} />
                            <span className="text-secondary small fw-medium">Sort By</span>
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              as="select"
                              value={tempFilters.sortBy}
                              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                              className="form-select border-0 py-2 ps-3 pe-5"
                              style={{
                                borderRadius: '12px',
                                backgroundColor: 'rgba(243, 244, 246, 0.8)',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                              }}
                            >
                              <option value="asc">Ascending</option>
                              <option value="desc">Descending</option>
                            </Form.Control>
                            <FontAwesomeIcon 
                              icon={faChevronDown} 
                              className="position-absolute" 
                              style={{ 
                                right: '15px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#6b7280', 
                                pointerEvents: 'none' 
                              }} 
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="location">
                          <Form.Label className="d-flex align-items-center mb-2">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" style={{ color: '#2563eb' }} />
                            <span className="text-secondary small fw-medium">Location</span>
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type="text"
                              placeholder="Enter location"
                              value={tempFilters.location}
                              onChange={(e) => handleFilterChange('location', e.target.value)}
                              className="border-0 py-2 ps-3"
                              style={{
                                borderRadius: '12px',
                                backgroundColor: 'rgba(243, 244, 246, 0.8)',
                                transition: 'all 0.2s',
                                fontSize: '0.9rem'
                              }}
                            />
                            <FontAwesomeIcon 
                              icon={faSearch} 
                              className="position-absolute" 
                              style={{ 
                                right: '15px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#6b7280', 
                                pointerEvents: 'none' 
                              }} 
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="position">
                          <Form.Label className="d-flex align-items-center mb-2">
                            <FontAwesomeIcon icon={faBriefcase} className="me-2" style={{ color: '#2563eb' }} />
                            <span className="text-secondary small fw-medium">Position</span>
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              as="select"
                              value={tempFilters.position}
                              onChange={(e) => handleFilterChange('position', e.target.value)}
                              className="form-select border-0 py-2 ps-3 pe-5"
                              style={{
                                borderRadius: '12px',
                                backgroundColor: 'rgba(243, 244, 246, 0.8)',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                              }}
                            >
                              <option value="">Select Position</option>
                              {jobTitles.map((jobTitle, index) => (
                                <option key={index} value={jobTitle}>
                                  {jobTitle}
                                </option>
                              ))}
                            </Form.Control>
                            <FontAwesomeIcon 
                              icon={faChevronDown} 
                              className="position-absolute" 
                              style={{ 
                                right: '15px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#6b7280', 
                                pointerEvents: 'none' 
                              }} 
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group controlId="vendorId">
                          <Form.Label className="d-flex align-items-center mb-2">
                            <FontAwesomeIcon icon={faBuilding} className="me-2" style={{ color: '#2563eb' }} />
                            <span className="text-secondary small fw-medium">Vendor</span>
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              as="select"
                              value={tempFilters.vendorId}
                              onChange={(e) => handleFilterChange('vendorId', e.target.value)}
                              className="form-select border-0 py-2 ps-3 pe-5"
                              style={{
                                borderRadius: '12px',
                                backgroundColor: 'rgba(243, 244, 246, 0.8)',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                              }}
                            >
                              <option value="">Select Vendor</option>
                              {vendors.map((vendor) => (
                                <option key={vendor.id} value={vendor.id}>
                                  {vendor.name}
                                </option>
                              ))}
                            </Form.Control>
                            <FontAwesomeIcon 
                              icon={faChevronDown} 
                              className="position-absolute" 
                              style={{ 
                                right: '15px', 
                                top: '50%', 
                                transform: 'translateY(-50%)', 
                                color: '#6b7280', 
                                pointerEvents: 'none' 
                              }} 
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                </Form>

                <Table striped bordered hover responsive className="shadow-sm bg-white">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact Number</th>
                      <th>Address</th>
                      <th>Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentResumes.length > 0 ? (
                      currentResumes.map((resume, index) => (
                        <tr key={index}>
                          <td>{indexOfFirstResume + index + 1}</td>
                          <td>{resume.name || "N/A"}</td>
                          <td>{resume.email || "N/A"}</td>
                          <td>{resume.contact_number || "N/A"}</td>
                          <td>{resume.address || "N/A"}</td>
                          <td>
                            <Button
                              variant="primary"
                              href={`https://apiwl.novajobs.us${resume.resume_path || ""}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shadow-sm"
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                {/* Pagination */}
                <Pagination className="justify-content-center">
                  {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item
                      key={page + 1}
                      active={page + 1 === currentPage}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      {page + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ResumeList;