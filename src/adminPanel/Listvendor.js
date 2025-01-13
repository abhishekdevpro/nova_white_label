import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Button,
} from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const Listvendor = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Auth token not found");
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: authToken,
        };

        const jobsEndpoint = "https://api.novajobs.us/api/admin/vendor-lists";

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const jobsWithStatus = data.data.map((job) => ({
          ...job,
          status: "pending", // Initialize status to pending or get from data if available
        }));

        // Prepend new jobs to the existing list
        setJobs((prevJobs) => [...jobsWithStatus, ...prevJobs]);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleStatusChange = (vendorId, status) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.vendors_detail.id === vendorId ? { ...job, status } : job
      )
    );
  };

  const handleMoreInfoFilter = (infoType) => {
    // Implement the filtering logic here
    console.log(`Filtering by more info type: ${infoType}`);
  };

  const getDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Customize as needed
  };

  const handleStatusChange1 = async (id, status) => {
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    try {
      if (status === "active") {
        await fetch(`https://api.novajobs.us/api/admin/vendor-active/${id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ status: 1 }), // Sending 1 for active
        });
      } else if (status === "inactive") {
        await fetch(`https://api.novajobs.us/api/admin/vendor-inactive/${id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ status: 0 }), // Sending 0 for inactive
        });
      }
      // Optionally refetch the jobs to update the list after status change
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
            <div className="d-flex">
              <p className="my-2">
                <FaStore className="mx-1" /> / Vendor List
              </p>
            </div>
            <Row>
              <Col md={12}>
                <div
                  style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "500px",
                  }}
                >
                  <table className="table">
                    <thead>
                      <tr className="text-center">
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Created On
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Company Name
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Website
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Authorized Person
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Contact Number
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Email ID
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Status
                        </th>
                        <th
                          style={{ backgroundColor: "#1C2957", color: "white" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.map((vendor) => (
                        <tr
                          key={vendor.vendors_detail.id}
                          className="text-center"
                        >
                          <td>{getDate(vendor.vendors_detail.created_at)}</td>
                          <td>{vendor.company_detail.company_name}</td>
                          <td>{vendor.vendors_detail.website_link}</td>
                          <td>Coming soon</td>
                          <td>{vendor.vendors_detail.phone}</td>
                          <td>{vendor.vendors_detail.email}</td>
                          <td>
                            {vendor.vendors_detail.is_verified === 1
                              ? "Active"
                              : "Inactive"}
                          </td>
                          <td>
                            {vendor.vendors_detail.is_active === 1 ? (
                              <Button
                                variant="warning"
                                onClick={() =>
                                  handleStatusChange1(
                                    vendor.vendors_detail.id,
                                    "inactive"
                                  )
                                }
                              >
                                Set Inactive
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                onClick={() =>
                                  handleStatusChange1(
                                    vendor.vendors_detail.id,
                                    "active"
                                  )
                                }
                              >
                                Set Active
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Listvendor;
