import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { showToastError, showToastSuccess } from "../utils/toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = queryParams.get("token");

      // console.log("Token:", token);

      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/admin/verify-account/${token}`
        );
        console.log(response);
        if (response) {
          showToastSuccess("Email verified successfully");
          navigate("/user/login");
        } else {
          showToastError("Email verification failed");
          navigate("/vendor/login");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        showToastError("Invalid token or email");
        navigate("/vendor/login");
      }
    };

    verifyEmail();
  }, [queryParams, navigate]);

  return (
    <div>
      Verifying...
      
    </div>
  );
};

export default VerifyEmail;
