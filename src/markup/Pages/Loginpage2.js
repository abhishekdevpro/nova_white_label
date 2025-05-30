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
import { toast} from "react-toastify";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { Modal } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
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
  const [termsChecked, setTermsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (data) => toast.warning(data);
  const domain = window.location.origin.includes("localhost")
  ? "https://novajobs.us"
  : window.location.origin;
  const handlePostRequest = async (e) => {
    e.preventDefault();

    if (!termsChecked) {
      toast.error("You must agree to the Privacy Policy and Terms & Conditions before continuing.");
      return;
    }

    if (email === "") {
      notify("Email is required");
      return;
    }

    e.preventDefault();
    const reqBody = {
      email: email,
      domain:domain,
      // password: password,
    };
    await axios({
      method: "POST",
      url: "https://apiwl.novajobs.us/api/jobseeker/auth/send-loginotp",
      headers: {
        "Content-Type": "Application/json",
      },
      data: reqBody,
    })
      .then((response) => {
        if (response.status === 200 || response.data.code === 200) {
          console.log(response);
          toast.success(response.data.message || " Otp sent to your email.");
          localStorage.setItem("userEmail", email);
          navigate("/user/login-code");
        } else {
          toast.error("Failed to sent otp");
        }
        
      })
      .catch((err) => {
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };
  const [html, setHtml] = useState("");
  

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
        "https://apiwl.novajobs.us/api/jobseeker/auth/send-loginotp",
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
        "https://apiwl.novajobs.us/api/jobseeker/auth/login-otp",
        { email, otp }
      );
      toast.success("Login successful!");
      localStorage.setItem("jobSeekerLoginToken", response?.data?.data?.token);
      setShowOtpModal(false);
      navigate("/user/dashboard");
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
        "https://apiwl.novajobs.us/api/jobseeker/auth/send-loginotp",
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
  const handleGoogleSignin = async () => {
    const url = `https://apiwl.novajobs.us/api/jobseeker/auth/google?domain=${domain}`;

    try {
      const response = await axios.get(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // console.log("Google sign-in token: ", response.data.data);
        window.open(response.data.data);
      } else {
        toast.error("Google sign-in failed.");
      }
    } catch (err) {
      console.log(err);
      toast.error(`${err.response?.data?.message || "Google sign-in failed"}`);
    }
  };
  return (
    <div className="page-wraper">
      <Header />

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
                    
                  </div>
                  <h2 className="m-b10 text-white"> Login To Dashboard</h2>
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
                    {/* <li>
                      <Link
                        to={"https://www.linkedin.com/company/nova-us-jobs/"}
                        className="m-r10 text-white "
                      >
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li> */}
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
                      <div>
                        <button
                          onClick={handleGoogleSignin}
                          type="button"
                          className="w-100 mb-4 flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md mt-4 shadow-sm hover:bg-gray-100 focus:outline-none"
                        >
                          <FcGoogle className="h-6 w-6 mr-2" />
                          Continue with Google
                        </button>
                      </div>
                      <div className=" d-flex justify-content-center align-items-center">
                        <p> OR</p>
                      </div>
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
                      <div className="dz-social clearfix">
                        
                      </div>
                      <div className="form-group text-left ">
                        <span className="custom-control custom-checkbox mt-3">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="terms"
                            name="terms"
                            required
                            checked={termsChecked}
                            onChange={e => setTermsChecked(e.target.checked)}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="terms"
                          >
                            {" "}
                            I agree to the{" "}
                            {
                              <Link to={"privacy-policy"}>
                                Privacy Policy
                              </Link>
                            }{" "}
                            and{" "}
                            <Link to={"/terms-and-conditions"}>
                              Terms & conditions{" "}
                            </Link>
                          </label>
                        </span>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handlePostRequest}
                          className="site-button float-center"
                        >
                          Send Otp
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
        
      </div>
      <Footer />
     
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
