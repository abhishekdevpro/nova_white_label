import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, Badge } from 'react-bootstrap';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import VendorCompanySideBar from "./Vendorsidebar";
import { showToastError, showToastSuccess } from "../utils/toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import Footer from "../markup/Layout/Footer";

function VendorChangepasswordpage() {
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

  const token = localStorage.getItem("vendorToken");
  const requestBody = {
    old_password: changePassword.old_password,
    new_password: changePassword.new_password,
    confirm_password: changePassword.confirm_password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://api.novajobs.us/api/admin/vendor/change-password",
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
      <ToastContainer />
      <div className="page-content bg-white">
        <Navbar bg="white" variant="white" className="py-3 border-bottom">
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "110px" }}
              src={require("../images/logo/NovaUS.png")}
              className="logo"
              alt="img"
            />
          </Navbar.Brand>

          <Nav className="ml-auto align-items-center"></Nav>
        </Navbar>
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <VendorCompanySideBar active="jobs-change-password" />
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

export default VendorChangepasswordpage;
