import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component
import { FaFileAlt } from "react-icons/fa";
import CustomNavbar from "./Navbar";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resumesPerPage = 10; // Number of resumes per page

  // Filter states
  const [sortBy, setSortBy] = useState("asc");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [vendorId, setVendorId] = useState("");

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
            sort_by: sortBy,
            location: location || undefined,
            position: position || undefined,
            vendor_id: vendorId || undefined,
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
        // Extract vendors from the API response
        const vendorList = response.data.data.map((vendor) => ({
          id: vendor.company_detail.id,
          name: vendor.company_detail.company_name || "Unknown Company",
        }));
        setVendors(vendorList);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [sortBy, location, position, vendorId]);

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
    setCurrentPage(1); // Reset to the first page when filters are applied
    fetchResumes();
  };

  const handleResetFilters = () => {
    setSortBy("asc");
    setLocation("");
    setPosition("");
    setVendorId("");
    setCurrentPage(1); // Reset to the first page
    fetchResumes(); // Reload resumes with default filters
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
                <Form onSubmit={handleFilterSubmit} className="mb-4 p-4 border rounded shadow bg-white">
                  <Row className="gy-4">
                    <Col md={3}>
                      <Form.Group controlId="sortBy">
                        <Form.Label className="fw-semibold text-secondary">Sort By</Form.Label>
                        <Form.Control
                          as="select"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="form-select shadow-sm"
                        >
                          <option value="asc">Ascending</option>
                          <option value="desc">Descending</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="location">
                        <Form.Label className="fw-semibold text-secondary">Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="form-control shadow-sm"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="position">
                        <Form.Label className="fw-semibold text-secondary">Position</Form.Label>
                        <Form.Control
                          as="select"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="form-select shadow-sm"
                        >
                          <option value="">Select Position</option>
                          {jobTitles.map((jobTitle, index) => (
                            <option key={index} value={jobTitle}>
                              {jobTitle}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="vendorId">
                        <Form.Label className="fw-semibold text-secondary">Vendor</Form.Label>
                        <Form.Control
                          as="select"
                          value={vendorId}
                          onChange={(e) => setVendorId(e.target.value)}
                          className="form-select shadow-sm"
                        >
                          <option value="">Select Vendor</option>
                          {vendors.map((vendor) => (
                            <option key={vendor.id} value={vendor.id}>
                              {vendor.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col className="d-flex justify-content-end">
                      <Button variant="primary" type="submit" className="me-2 shadow-sm">
                        Apply Filters
                      </Button>
                      <Button variant="outline-secondary" onClick={handleResetFilters} className="shadow-sm">
                        Reset Filters
                      </Button>
                    </Col>
                  </Row>
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