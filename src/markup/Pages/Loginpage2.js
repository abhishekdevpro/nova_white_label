import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, useNavigate } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

import loginbg from "../../images/login/loginbg.jpeg";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header"
import { Modal } from "react-bootstrap";
const bnr3 = require("./../../images/background/bg3.jpg");
function Login(props) {
  const [email, setEmail] = useState("demo@example.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showOtpModal, setShowOtpModal] = useState(false); // State for OTP modal
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (data) => toast.warning(data);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    if (password === "") {
      notify("Password is required");
      if (email === "") {
        notify("Email is required");
      }
      return;
    }

    e.preventDefault();
    const reqBody = {
      email: email,
      password: password,
    };
    await axios({
      method: "POST",
      url: "https://api.novajobs.us/api/jobseeker/auth/login",
      headers: {
        "Content-Type": "Application/json",
      },
      data: reqBody,
    })
      .then((response) => {
        console.log(response, "login");
        localStorage.setItem(
          "jobSeekerLoginToken",
          response?.data?.data?.token
        );
        navigate("/user/jobs-profile");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };
  const [html, setHtml] = useState("");
  const handleGoogleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "GET",
      url: "https://api.novajobs.us/api/jobseeker/auth/google",
      headers: {
        "Content-Type": "application/json",
      },

      maxRedirects: 5,
    })
      .then((res) => {
        console.log("Response Data:", res.data);
        console.log("Response Headers:", res.headers);
      })
      .catch((error, res) => {
        console.error("Error during API request:", error);
        showToastError(error?.response?.data?.message);
      });
  };
  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://api.novajobs.us/api/jobseeker/auth/send-loginotp",
        { email }
      );
      setStep(2);
      startTimer();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to send OTP. Please register first.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.novajobs.us/api/jobseeker/auth/login-otp",
        { email, otp }
      );
      toast.success("Login successful!");
      localStorage.setItem("jobSeekerLoginToken", response?.data?.data?.token);
      setShowOtpModal(false);
      navigate("/user/jobs-profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(
        "https://api.novajobs.us/api/jobseeker/auth/send-loginotp",
        { email }
      );
      toast.success("OTP has been resent!");
      startTimer();
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-wraper">
      <Header />
      <ToastContainer />

      <div
        className="page-content bg-white login-style2"
        style={{
          backgroundImage: "url(" + loginbg + ")",
          // backgroundSize: "100%",
          backgroundRepeat: "no-repeat",

          backgroundSize: "cover",
        }}
      >
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className=" max-w400 align-self-center">
                  <div className="logo">
                    {/* <Link to={"/"}>
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        alt=""
                      />
                    </Link> */}
                  </div>
                  <h2 className="m-b10 text-white">
                    {" "}
                    Sign up or Login To Dashboard
                  </h2>
                  <p
                    className="m-b30"
                    style={{
                      fontWeight: "bolder",
                      color: "white",
                      fontSize: "20px",
                    }}
                  >
                    Welcome To One Stop AI Powered Staffing Solution
                  </p>
                  <ul
                    className="list-inline m-r10 text-white "
                    style={{
                      fontWeight: "bolder",
                      fontSize: "30px",
                    }}
                  >
                    <li>
                      <Link
                        to={"https://www.linkedin.com/company/nova-us-jobs/"}
                        className="m-r10 text-white "
                      >
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="d-flex justify-content-center align-items-center">
                    <h2 className="text-center">JobSeeker Login</h2>
                  </div>
                  <div className="nav">
                    <form className="col-12 p-a0 ">
                      <p className="font-weight-600">
                        If you have an account with us, please log in.
                      </p>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <div className="form-group ">
                        <label>E-Mail Address*</label>
                        <div className="input-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Type Your Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <div className="text-danger fs-12">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Password *</label>
                        <div className="input-group d-flex align-items-center">
                          <span
                            className="input-group-addon position-absolute"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              cursor: "pointer",
                              right: "0px",
                              zIndex: "11",
                              position: "absolute",
                            }}
                          >
                            <i
                              className={
                                showPassword ? "fa fa-eye-slash " : "fa fa-eye"
                              }
                            ></i>
                          </span>
                          <input
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            className="form-control position-relative"
                            value={password}
                            placeholder="Type Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        {errors.password && (
                          <div className="text-danger fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div className="form-group text-center">
                        <Link
                          to={"/user/forgot-password"}
                          className="forget-pass m-l5"
                        >
                          <i className="fa fa-unlock-alt"></i> Forgot Password
                        </Link>
                      </div>
                      <div className="dz-social clearfix">
                        <h5 className="form-title m-t5 pull-left">
                          Sign In With
                        </h5>
                        {/*<ul className="dez-social-icon dez-border pull-right dez-social-icon-lg text-white">
                          <li>
                            <Link
                              to={""}
                              className="fa fa-linkedin link-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                          <li onClick={handleGoogleLogin}>
                            <Link
                              to={""}
                              className="fa fa-google link-btn mr-1"
                              target="bank"
                            ></Link>
                          </li>
                        </ul> */}
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handlePostRequest}
                          className="site-button float-left"
                        >
                          login
                        </button>
                        <Link
                          to="/user/register-2"
                          className="site-button-link forget-pass m-t15 float-right"
                        >
                          <i className="fa fa-unlock-alt"></i> Sign up
                        </Link>
                      </div>
                      <div className="form-group text-center">
                        <button
                          type="button"
                          className="site-button "
                          onClick={() => setShowOtpModal(true)}
                        >
                          Sign in with OTP
                        </button>
                      </div>
                    </form>
                    <div className="form-group text-center">
                      <Link to="/" className="site-button-link  m-t15 ">
                        Back to Home
                      </Link>
                    </div>
                    <div className="form-group text-center">
                      <Link
                        to="mailto:mailto:contact@novajobs.us"
                        className="site-button-link  m-t15 "
                      >
                        Need help click here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <footer className="login-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <span className="float-left text-white">
                  © Copyright by{" "}
                  <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  />{" "}
                  <img
                    src="../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png"
                    alt=""
                    style={{
                      width: "40px",
                    }}
                  />
                  <span className="">Nova Jobs </span>
                  <Link style={{ color: "white" }} to={"#"}>
                    Powered By Hyper V Solutions
                  </Link>
                </span>
                <span className="float-right text-white">
                  “Hyper V Solutions” | All Rights Reserved
                </span>
              </div>
            </div>
          </div>
          {html && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
        </footer> */}
      </div>
      <Footer />
      {/* OTP Modal */}
      <Modal
        className="lead-form-modal"
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        centered
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={() => setShowOtpModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body row m-a0 clearfix">
              <div
                className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                style={{
                  backgroundImage: "url(" + bnr3 + ")",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="form-info text-white align-self-center">
                  <h3 className="m-b15">Login To Your Account</h3>
                  <p className="m-b15">
                    Access your account and explore new opportunities!
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 p-a0">
                <div className="lead-form browse-job text-left">
                  {step === 1 && (
                    <>
                      <h6 className="m-t0">Enter Your Email</h6>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn-primary site-button btn-block"
                        onClick={sendEmail}
                        disabled={loading}
                      >
                        {loading ? "Checking Email..." : "Next"}
                      </button>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h6 className="m-t0">Enter OTP</h6>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      <button
                        className="btn-primary site-button btn-block"
                        onClick={verifyOtp}
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "Submit"}
                      </button>
                      <p>
                        Resend OTP in: <strong>{timer}</strong> seconds
                      </p>
                      <button
                        onClick={resendOtp}
                        disabled={timer > 0} // Disable the button while timer is active
                        className="btn btn-primary"
                        style={{
                          backgroundColor: timer > 0 ? "#ccc" : "#1C2957",
                          color: timer > 0 ? "#666" : "#fff",
                        }}
                      >
                        Resend OTP
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);

