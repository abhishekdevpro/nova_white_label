import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";


function VerifyEmailemployee() {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`https://api.novajobs.us/api/employeer/verify-account/${token}`);
        console.log(response)
        if (response.data) { 
          showToastSuccess("Email verified successfully");
          navigate("/employer");
        } else {
          showToastError("Email verification failed");
          navigate("/employer/login");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        showToastError("Invalid Email");
        navigate("/employer/register-2");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <>
    <div>Verifying...</div>
    <ToastContainer /></>
  );
}



export default VerifyEmailemployee;
