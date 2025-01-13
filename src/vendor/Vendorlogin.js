import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navbar, Nav, Badge } from "react-bootstrap";
import Footer from "../markup/Layout/Footer";

const Vendorlogin = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.novajobs.us/api/admin/auth/vendor/login",
        {
          email,
          password,
        }
      );

      if (response.data.data.token) {
        localStorage.setItem("vendorToken", response.data.data.token);
        navigate("/white-label");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar bg="white" variant="white" className="py-3 border-bottom">
        <Navbar.Brand as={Link} to="/">
          <img
            style={{ width: "110px" }}
            src={require("../images/logo/NovaUS.png")}
            className="logo"
            alt="img"
          />
        </Navbar.Brand>

        <Nav className="ml-auto align-items-center">
          <Nav.Link href="/vendor/vendorregistration" className="mr-4">
            <Button
              variant="primary"
              type="submit"
              className="  "
              style={{ backgroundColor: "#1C2957" }}
            >
              Sign Up
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container className="d-flex justify-content-center align-items-center vh-50">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Link
              to={"/"}
              className="dez-page d-flex justify-content-center mt-5"
            >
              <img
                style={{ width: "210px" }}
                src={require("../images/logo/NovaUS.png")}
                className="logo"
                alt="img"
              />
            </Link>
            <h3 className="text-center m-4">Vendor Login</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  className="p-4 h-25 rounded-3 "
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password*</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    className="p-4 h-25 rounded-3"
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </span>
                </div>
              </Form.Group>

              {error && <p className="text-danger mt-3">{error}</p>}
              <Button
                variant="primary"
                type="submit"
                className="my-5 w-100"
                style={{ backgroundColor: "#1C2957" }}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Vendorlogin;
