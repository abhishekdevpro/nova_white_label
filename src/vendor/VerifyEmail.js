import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showToastError, showToastSuccess } from "../utils/toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");
      const isVendor = location.pathname.includes("vendor");

      if (!token) {
        showToastError("Token not found in URL");
        return;
      }

      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/admin/verify-account/${token}`
        );

        if (response?.status === 200) {
          showToastSuccess("Email verified successfully");
          navigate(isVendor ? "/vendor/login" : "/user/login");
        } else {
          showToastError("Email verification failed");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        showToastError("Invalid token or email");
        navigate(isVendor ? "/vendor/login" : "/user/login");
      }
    };

    verifyEmail();
  }, [location, navigate]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: "100vh" }}>
  <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
    <span className="visually-hidden">Loading...</span>
  </div>
  <p className="mt-3 fw-semibold text-secondary">Verifying...</p>
</div>

  );
};

export default VerifyEmail;
