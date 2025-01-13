import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import CompanySideBar from "../Layout/companySideBar";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function Changepasswordpage() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, setChangePassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePassword({ ...changePassword, [name]: value });
  };

  const token = localStorage.getItem("employeeLoginToken");
  const requestBody = {
    old_password: changePassword.old_password,
    new_password: changePassword.new_password,
    confirm_password: changePassword.confirm_password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://api.novajobs.us/api/employeer/change-password",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      data: requestBody,
    })
      .then((response) => {
        console.log(response);
        showToastSuccess("Password updated successfully.");
        setChangePassword({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      })
      .catch((err) => {
        console.log(err);
        showToastError("Failed to update password.");
      });
  };

  return (
    <>
      <Header2 />
      <ToastContainer />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <CompanySideBar active="jobs-change-password" />
                <div className="col-xl-9 col-lg-9 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                      <Link
                        to={"/employer/company-resume"}
                        className="site-button right-arrow button-sm float-right"
                      >
                        Back
                      </Link>
                    </div>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="old_password">Old Password</label>
                            <div className="input-group d-flex align-items-center">
                              <span
                                className="input-group-addon position-absolute"
                                onClick={() =>
                                  setShowOldPassword(!showOldPassword)
                                }
                                style={{
                                  cursor: "pointer",
                                  right: "0px",
                                  zIndex: "11",
                                  position: "absolute",
                                }}
                              >
                                <i
                                  className={
                                    showOldPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }
                                ></i>
                              </span>
                              <input
                                type={showOldPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="old_password"
                                name="old_password"
                                autoComplete="false"
                                value={changePassword.old_password}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label htmlFor="new_password">New Password </label>
                            <div className="input-group d-flex align-items-center">
                              <span
                                className="input-group-addon position-absolute"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                style={{
                                  cursor: "pointer",
                                  right: "0px",
                                  zIndex: "11",
                                  position: "absolute",
                                }}
                              >
                                <i
                                  className={
                                    showNewPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }
                                ></i>
                              </span>
                              <input
                                type={showNewPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="new_password"
                                name="new_password"
                                autoComplete="false"
                                value={changePassword.new_password}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group ">
                            <label htmlFor="confirm_password">
                              Confirm New Password
                            </label>
                            <div className="input-group d-flex align-items-center">
                              <span
                                className="input-group-addon position-absolute"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                style={{
                                  cursor: "pointer",
                                  right: "0px",
                                  zIndex: "11",
                                  position: "absolute",
                                }}
                              >
                                <i
                                  className={
                                    showConfirmPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }
                                ></i>
                              </span>
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="confirm_password"
                                name="confirm_password"
                                autoComplete="false"
                                value={changePassword.confirm_password}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button
                            onClick={handleSubmit}
                            className="site-button"
                          >
                            Update Password
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Changepasswordpage;
