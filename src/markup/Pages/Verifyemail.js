import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";

function VerifyEmail() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://api.novajobs.us/api/jobseeker/verify-account/${token}`);
        console.log(response)
        if (response) { 
          showToastSuccess("Email verified successfully");
          navigate("/user/login");
        } else {
          showToastError("Email verification failed");
          navigate("/user/register-2");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        showToastError("Invalid token or email");
        navigate("/user/register-2");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>Verifying...
      <ToastContainer/>
    </div>
  );
}

export default VerifyEmail;
