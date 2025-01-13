import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";

const Employeelist = () => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("Auth token not found");
        }

        const headers = {
          "Content-Type": "application/json",
          Authorization: authToken,
        };

        const companyEndpoint =
          "https://api.novajobs.us/api/admin/employeer-lists";

        const response = await fetch(companyEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCompany(data.data.employeer_detail);
        console.log(data.data.employeer_detail);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompany();
  }, []);

  const handleStatusChange = async (companyId, status) => {
    const authToken = localStorage.getItem("authToken");
    const headers = {
      "Content-Type": "application/json",
      Authorization: authToken,
    };

    try {
      if (status === "active") {
        await fetch(
          `https://api.novajobs.us/api/admin/employeer-active/${companyId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 1 }), // Sending 1 for active
          }
        );
      } else if (status === "inactive") {
        await fetch(
          `https://api.novajobs.us/api/admin/employeer-inactive/${companyId}`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify({ status: 0 }), // Sending 0 for inactive
          }
        );
      }
      // Optionally refetch the company data after status change
    } catch (error) {
      console.error("Error updating company status:", error);
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
              <FaStore className="mx-1" /> / Company
            </p>
            <Row>
              <Col md={12}>
                {company ? (
                  <div
                    style={{
                      overflowX: "auto",
                      overflowY: "auto",
                      maxHeight: "500px",
                    }}
                  >
                    <table className="table">
                      <thead className="text-center">
                        <tr>
                          <th>Company Name</th>
                          <th>State</th>
                          <th>Email</th>
                          <th>Account Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr key={company.id}>
                          <td>{company.first_name}</td>
                          <td>{company.states.name}</td>
                          <td>{company.email}</td>
                          <td>
                            {company.is_active === 1 ? "Active" : "Inactive"}
                          </td>
                          <td>
                            {company.is_active === 1 ? (
                              <Button
                                variant="warning"
                                onClick={() =>
                                  handleStatusChange(company.id, "inactive")
                                }
                              >
                                Set Inactive
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                onClick={() =>
                                  handleStatusChange(company.id, "active")
                                }
                              >
                                Set Active
                              </Button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employeelist;
