"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios"; // Import Axios
import logo from "../../images/login/loginbg.jpeg";
import loginbg from "../../images/login/loginbg.jpeg";
import LogoWrapper from "../Layout/LogoWrapper";
import { setJobProfileValues } from "../../store/reducers/jobProfileSlice";
import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
const LoginCode = () => {
  //   const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const BASE_URL = "https://apiwl.novajobs.us";
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  const handleSignIn = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    const url = window.location.origin.includes("localhost")
      ? "https://novajobs.us"
      : window.location.origin;
    try {
      const response = await axios.post(
        `${BASE_URL}/api/jobseeker/auth/login-otp`,

        { email, otp, domain: url }
      );

      if (response.data?.success === "success" || response.data?.code === 200) {
        const token = response.data?.data?.token;
        toast.success(response.data?.message || "Login successful!");
        localStorage.setItem("jobSeekerLoginToken", token);
        localStorage.removeItem("employeeLoginToken");
        // dispatch(setJobProfileValues(response.data.data))
        console.log(
          response.data.data,
          "from logincode"
        );
        if (
          !response.data.data.first_name ||
          !response.data.data.last_name
          // !response.data.data.rb_job_seeker_resumes.file_path
        ) {
          navigate(`/user/profile`);
        } else navigate(`/user/jobs-profile`);
      } else {
        navigate("/user/login");
        toast.error(response.data?.message || "Invalid OTP!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
      console.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );

      navigate("/user/login"); // Redirect to the login page on error
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center bg-light px-3">
      <div
        className="bg-white p-4 rounded shadow-sm w-100"
        style={{ maxWidth: "400px" }}
      >
        {/* Back Button */}
        <Link
          to="/user/login"
          className="text-primary d-flex align-items-center mb-3 text-decoration-none"
        >
          <span className="me-2">&larr;</span> Back
        </Link>

        {/* Logo */}
        {/* <div className="text-center mb-3">
          <img
            src={require("./../../images/logo/NovaUS.png")}
            alt=""
            width={100}
            height={100}
          />
        </div> */}
        {/* <LogoWrapper />
        <h2 className="text-center">Sign in with login code</h2> */}
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <div className="p-4 ">
            <LogoWrapper />
          </div>
          <h2 className="mt-3 fw-light">Sign in with Login Code</h2>
        </div>

        <p className="text-center text-muted">
          We have sent your one-time passcode to <br />
          <strong className="text-primary">{email}</strong>. This passcode will
          expire after 5 minutes.
        </p>

        {/* OTP Input */}
        <div className="mb-3">
          <label className="form-label fw-medium">
            Enter 6-digit code <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            className="form-control text-center fs-4"
            placeholder="______"
          />
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="site-button w-100 d-flex justify-content-center align-items-center"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>

        {/* Resend Code */}
        {/* <p className="text-center mt-3">
          <button className="btn btn-link text-primary fw-semibold p-0">
            Don&apos;t have access to this email?
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default LoginCode;
