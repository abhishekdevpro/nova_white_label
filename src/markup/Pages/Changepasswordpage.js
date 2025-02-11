import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import FixedHeader from "../Layout/fixedHeader";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import Profilesidebar from "../Element/Profilesidebar";
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
  const token = localStorage.getItem("jobSeekerLoginToken");
  const requestBody = {
    old_password: changePassword.old_password,
    new_password: changePassword.new_password,
    confirm_password: changePassword.confirm_password,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://apiwl.novajobs.us/api/jobseeker/change-password",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      data: requestBody,
    })
      .then((response) => {
        console.log(response);
        showToastSuccess("Password has been changed successfully")
      })
      .catch((err) => console.log(err));
      showToastError("Something went wrong please try again")
  };

  return (
    <>
      <Header2 />
      <FixedHeader />

      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar data={"password"} />
                {/* <div className="col-xl-3 col-lg-4 m-b30">

                  <div className="sticky-top">
                    <div className="candidate-info">
                      <ul>
                        <li>
                          <Link to={"/user/jobs-profile"}>
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-my-resume"}>
                            <i
                              className="fa fa-file-text-o"
                              aria-hidden="true"
                            ></i>
                            <span>My Resume</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-saved-jobs"}>
                            <i className="fa fa-heart-o"></i>
                            <span>Saved Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-applied-job"}>
                            <i className="fa fa-briefcase"></i>
                            <span>Applied Jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-alerts"}>
                            <i className="fa fa-bell-o"></i>
                            <span>Job Alerts</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/jobs-cv-manager"}>
                            <i className="fa fa-id-card-o"></i>
                            <span>CV Manager</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/skill-test"}>
                            <i
                              className="fa fa-id-card-o"
                              aria-hidden="true"
                            ></i>
                            <span>Skill Test</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/jobs-change-password"}
                            className="active"
                          >
                            <i className="fa fa-key"></i>
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"./"}>
                            <i className="fa fa-sign-out"></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx job-profile">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Change Password
                      </h5>
                      <Link
                        to={"/user/jobs-cv-manager"}
                        className="site-button right-arrow button-sm float-right">
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
                                }}>
                                <i
                                  className={
                                    showOldPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }></i>
                              </span>
                              <input
                                type={showOldPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="old_password"
                                name="old_password"
                                autoComplete="false"
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
                                }}>
                                <i
                                  className={
                                    showNewPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }></i>
                              </span>
                              <input
                                type={showNewPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="new_password"
                                name="new_password"
                                autoComplete="false"
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
                                }}>
                                <i
                                  className={
                                    showConfirmPassword
                                      ? "fa fa-eye-slash"
                                      : "fa fa-eye"
                                  }></i>
                              </span>
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                style={{ marginRight: "0px" }}
                                className="form-control position-relative "
                                onChange={handleChange}
                                id="confirm_password"
                                name="confirm_password"
                                autoComplete="false"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 m-b10">
                          <button
                            onClick={handleSubmit}
                            className="site-button">
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
