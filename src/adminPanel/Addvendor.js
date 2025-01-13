import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";

const Addvendor = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    description: "",
    company_name: "",
    access: [], // Initialize access property
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedAccess = checked
        ? [...formData.access, name]
        : formData.access.filter((item) => item !== name);

      setFormData({ ...formData, access: updatedAccess });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://api.novajobs.us/api/admin/create-vendor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Include the token without 'Bearer' prefix
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success(
          "Vendor registered successfully! Please check your email for verification."
        );
      } else {
        toast.error("Vendor registration failed. Please try again later.");
      }
    } catch (error) {
      toast.error("Error registering vendor.");
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
          <Col className="w-full">
            <div className="page-content bg-white">
              <div className="content-block">
                <div className="section-full bg-white p-t50 p-b20">
                  <div className="container">
                    <div className="row">
                      <div className="col-xl-9 col-lg-9 m-b30">
                        <div className="job-bx submit-resume">
                          <div className="job-bx-title clearfix">
                            <h5 className=" font-weight-700 pull-left text-uppercase">
                              Add Vendor{" "}
                            </h5>
                          </div>
                          <Form onSubmit={handleSubmit} className="ms-5 ps-5">
                            <Row className="mb-3">
                              <Col lg={6}>
                                <Form.Group controlId="formFirstName">
                                  <Form.Label>First Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col lg={6}>
                                <Form.Group controlId="formLastName">
                                  <Form.Label>Last Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col lg={6}>
                                <Form.Group controlId="formEmail">
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col lg={6}>
                                <Form.Group controlId="formPhone">
                                  <Form.Label>Phone</Form.Label>
                                  <Form.Control
                                    type="tel"
                                    placeholder="Enter phone number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col lg={6}>
                                <Form.Group controlId="formPassword">
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                              <Col lg={6}>
                                <Form.Group controlId="formCompanyName">
                                  <Form.Label>Company Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter company name"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row className="mb-3">
                              <Col lg={12}>
                                <Form.Group controlId="formdescription">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  className="mb-3"
                                >
                                  ADD
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Addvendor;
