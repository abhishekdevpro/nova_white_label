import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, Redirect, useNavigate, useParams } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthActions";

import loginbg from "../../images/login/loginbg.jpeg";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { ToastContainer } from "react-toastify";

function ResetPassword(props) {
   const { token } = useParams();
  console.log("Extracted token from URL params:", token); 
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("123456");
  const [confirmPassword, setConfirmPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePostRequest = async (e) => {
    e.preventDefault();
    console.log("Token:", token); // Log the token
  
    const formData = new FormData();
    formData.append("token", token);
    formData.append("new_password", password);
  
    await axios({
      method: "POST",
      url: "https://api.novajobs.us/api/jobseeker/reset-password",
      data: formData,
    })
      .then((response) => {
        console.log(response, "login");
        localStorage.setItem(
          "jobSeekerLoginToken",
          response?.data?.data?.token
        );
        showToastSuccess( response?.data?.data?.token)
        navigate("/user/login");
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
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to={""} className="m-r10 text-white ">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <div className="nav">
                    <form className="col-12 p-a0 ">
                      <p className="font-weight-600">
                        Reset Your Password Here
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
                        <label>Password*</label>
                        <div className="input-group">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Type Your Confirm Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.email && (
                            <div className="text-danger fs-12">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Confirm Password *</label>
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
                            value={confirmPassword}
                            placeholder="Type Your Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        {errors.password && (
                          <div className="text-danger fs-12">
                            {errors.password}
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <button
                          onClick={handlePostRequest}
                          className="site-button float-left"
                        >
                          Reset Password
                        </button>
                        <Link
                          to="/user/login"
                          className="site-button-link forget-pass m-t15 float-right"
                        >
                          <i className="fa fa-unlock-alt"></i> Back To Login
                        </Link>
                      </div>
                    </form>
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
export default connect(mapStateToProps)(ResetPassword);
