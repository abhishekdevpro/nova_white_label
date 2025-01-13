import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import loginbg from "../../images/login/loginbg.jpeg";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";

function ForgotPasswordemployee(props) {
  const [email, setEmail] = useState("demo@example.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const navigate = useNavigate();
  const token = localStorage.getItem("employeeLoginToken");
  const handlePostRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    await axios({
      method: "POST",
      url: "https://api.novajobs.us/api/employeer/forgot-password",
      headers: {
        "Content-Type": "Application/json",
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        showToastSuccess(response?.data?.message);
        navigate("/employer/forgot-password");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  return (
    <div className="page-wraper">
      <div
        className="page-content bg-white login-style2"
        style={{
          backgroundImage: "url(" + loginbg + ")",
          backgroundSize: "cover",
        }}
      >
        <ToastContainer />
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="text-white max-w400 align-self-center">
                  <div className="logo">
                    <Link to={"/"}>
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        alt=""
                      />
                    </Link>
                  </div>
                  <h2 className="m-b10">Verify Your Email To Get Link</h2>
                  <p className="m-b30">
                    Welcome To One Stop AI Powered Staffing Solution
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="nav">
                    <form className="col-12 p-a0 ">
                      <p className="font-weight-600">
                        Please Check Your email to set new password
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

                      <div className="mt-4 ">
                        <button
                          onClick={handlePostRequest}
                          className="site-button float-left"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className="form-group text-center">
                      <Link
                        to="/employer/login"
                        className="site-button-link  m-t15 "
                      >
                        Back to Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="login-footer">
          <div className="container">
            <div className="row text-white">
              <div className="col-lg-12 text-center">
                <span className="float-left">
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
                  <Link to={"#"}>
                    <strong className="text-white" style={{ fontSize: "20px" }}>
                      Nova Jobs{" "}
                    </strong>
                  </Link>{" "}
                </span>
                <span className="float-right">
                  <strong className="text-white" style={{ fontWeight: "bold" }}>
                    Hyper V Solutions
                  </strong>{" "}
                  | All Rights Reserved
                </span>
              </div>
            </div>
          </div>
        </footer>
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
export default connect(mapStateToProps)(ForgotPasswordemployee);
