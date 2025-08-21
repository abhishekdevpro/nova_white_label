import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Employeelist = () => {
  const [companies, setCompanies] = useState([]);
  const [domainList, setDomainList] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [companyName, setCompanyName] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Auth token not found");

        const headers = {
          "Content-Type": "application/json",
          Authorization: authToken,
        };

        let API = "https://apiwl.novajobs.us/api/admin/employeer-lists";
        const queryParams = [];

        if (selectedDomain) queryParams.push(`domain_filter=${selectedDomain}`);
        if (companyName) queryParams.push(`company_name=${companyName}`);

        if (email) queryParams.push(`email=${email}`);

        if (queryParams.length > 0) {
          API += `?${queryParams.join("&")}`;
        }

        const response = await fetch(API, { headers });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCompanies(data.data || []);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompany();
    fetchDomains();
  }, [selectedDomain, companyName, email]);

  const handleStatusChange = async (companyId, status) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      const url =
        status === "active"
          ? `https://apiwl.novajobs.us/api/admin/employeer-active/${companyId}`
          : `https://apiwl.novajobs.us/api/admin/employeer-inactive/${companyId}`;

      await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status: status === "active" ? 1 : 0 }),
      });

      // Re-fetch companies
      const updated = await fetch(
        "https://apiwl.novajobs.us/api/admin/employeer-lists",
        { headers }
      );
      const updatedData = await updated.json();
      setCompanies(updatedData.data || []);
    } catch (error) {
      console.error("Error updating company status:", error);
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

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          <Sidebar />

          <Col>
            <Container className="">
              <Row className="gap-3">
                <Row className="align-items-center my-3">
                  <div className="job-bx-title clearfix">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className=" font-weight-700 pull-left text-uppercase">
                        Employer List{" "}
                      </h5>
                      <button
                        className="site-button btn-sm"
                        disabled
                        // onClick={() => navigate("")}
                      >
                        Add Employer
                      </button>
                    </div>
                  </div>
                  <div xs={12} md={10}>
                    <div className=" d-flex flex-row gap-3 w-100 flex-wrap">
                      <input
                        type="text"
                        placeholder="Search by company name"
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />

                      <input
                        type="text"
                        placeholder="Search by email"
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        className="site-button btn-sm align-end"
                        variant="danger"
                        onClick={() => {
                          setCompanyName("");
                          setEmail("");
                          setSelectedDomain("");
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col md={12}>
                    {companies.length > 0 ? (
                      <div style={{ overflowX: "auto" }}>
                        <table className="table table-bordered table-hover">
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
                            {companies.map((company) => (
                              <tr key={company.company_detail.id}>
                                <td>{company.company_detail.company_name}</td>
                                <td>
                                  {company.company_detail.state?.name || "N/A"}
                                </td>
                                <td>{company.company_detail.email || "N/A"}</td>
                                <td>
                                  {company.company_detail.is_active === 1
                                    ? "Active"
                                    : "Inactive"}
                                </td>
                                <td>
                                  {company.company_detail.is_active === 1 ? (
                                    <Button
                                      variant="warning"
                                      className="site-button"
                                      onClick={() =>
                                        handleStatusChange(
                                          company.company_detail.id,
                                          "inactive"
                                        )
                                      }
                                    >
                                      Set Inactive
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="success"
                                      className="site-button"
                                      onClick={() =>
                                        handleStatusChange(
                                          company.company_detail.id,
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
                    ) : (
                      <p>Loading or no companies found...</p>
                    )}
                  </Col>
                </Row>
              </Row>
            </Container>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Employeelist;
