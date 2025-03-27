import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navbar, Nav, Badge } from "react-bootstrap";
import Footer from "../markup/Layout/Footer";
import VendorHeader from "../markup/Layout/VendorHeader";
import LogoWrapper from "../markup/Layout/LogoWrapper";
import { toast } from "react-toastify";

const Vendorlogin = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  // const [logo, setLogo] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s"); // Default logo

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/admin/auth/vendor/login",
        {
          email,
          password,
        }
      );

      if (response.data.data.token) {
        localStorage.setItem("vendorToken", response.data.data.token);
        toast.success(response.data.message || "User Logged In Successfully!")
        navigate("/white-label");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message || "Login Failed")
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <VendorHeader />
      <Container className="d-flex justify-content-center align-items-center vh-50">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <Link
              to={"/"}
              className="dez-page d-flex justify-content-center mt-5"
            >
              {/* <img
                style={{ width: "210px" }}
                src={logo}
                // src={require("../images/logo/NovaUS.png")}
                className="logo"
                alt="img"
              /> */}
              <LogoWrapper />
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
              <Form.Group controlId="formBasicCheckbox" className="mt-3">
                <Form.Check
                  type="checkbox"
                  label={
                    <span>
                      I agree to the{" "}
                      <Link to="/privacy-policy">Privacy Policy</Link> and{" "}
                      <Link to="/terms-and-conditions">Terms & Conditions</Link>
                      .
                    </span>
                  }
                  required
                />
              </Form.Group>

              {error && <p className="text-danger mt-3">{error}</p>}
              <Button
                variant="primary"
                type="submit"
                className="my-1 w-100"
                style={{ backgroundColor: "#1C2957" }}
              >
                Login
              </Button>
            </Form>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/vendor/vendorregistration" className="text-primary fw-bold">
                Sign up
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Vendorlogin;
