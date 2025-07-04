import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";
import "../Layout/Headerjobseeker.css";

import logo2 from "./../../images/logo.png";
var bnr3 = require("./../../images/background/bg3.jpg");

class Headerforlogin extends Component {
  state = {
    // initial state
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };
  componentDidMount() {
    // sidebar open/close

    var Navicon = document.querySelector(".navicon");
    var sidebarmenu = document.querySelector(".myNavbar ");

    function toggleFunc() {
      sidebarmenu.classList.toggle("show");
      //   Navicon.classList.toggle('open');
    }
    Navicon.addEventListener("click", toggleFunc);

    // Sidenav li open close
    var navUl = [].slice.call(
      document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a")
    );
    for (var y = 0; y < navUl.length; y++) {
      navUl[y].addEventListener("click", function () {
        checkLi(this);
      });
    }

    function checkLi(current) {
      current.parentElement.parentElement
        .querySelectorAll("li")
        .forEach((el) =>
          current.parentElement !== el ? el.classList.remove("open") : ""
        );
      setTimeout(() => {
        current.parentElement.classList.toggle("open");
      }, 100);
    }
  }
  render() {
    return (
      <>
        <header className="site-header mo-left header fullwidth">
          <div className="sticky-header main-bar-wraper navbar-expand-lg">
            <div className="main-bar clearfix">
              <div className="container clearfix">
                <div className="logo-header mostion">
                  {/* <Link to={"/"}><img src={logo2} className="logo" alt="img" /></Link> */}
                  <Link to={"/"}>
                    <img
                      src={require("./../../images/logo/NovaUS.png")}
                      className="logo"
                      alt="img"
                    />
                  </Link>
                </div>

                <button
                  className="navbar-toggler collapsed navicon  justify-content-end"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                {/* <div>
                      {localStorage.getItem("jobSeekerLoginToken") ? null : (
                        <div className="extra-nav">
                  <button
                    style={{ color: "white" }}
                    className="site-button"
                  >
                    Partner With Us
                  </button>
                </div>
                      )}
                    </div> */}

                <div
                  className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                  id="navbarNavDropdown"
                >
                  <div className="logo-header mostion d-md-block d-lg-none">
                    <Link to={"/"} className="dez-page">
                      <img
                        src={require("./../../images/logo/NovaUS.png")}
                        className="logo"
                        alt="img"
                      />
                    </Link>
                  </div>
                  <ul className="nav navbar-nav align-items-center ">
                    <li className="">
                      <Link to={"/user"}>Home </Link>
                      {/* <ul className="sub-menu">
                        <li>
                          <Link to={"./"} className="dez-page">
                            Home 1
                          </Link>
                        </li>
                        <li>
                          <Link to={"/index-2"} className="dez-page">
                            Home 2
                          </Link>
                        </li>
                      </ul> */}
                    </li>

                    <li className="">
                      <Link to={"/services"}>services </Link>
                    </li>
                    <li className="">
                      <Link to={"/aboutus"}>About Us </Link>
                    </li>
                    <li
                      onClick={() => {
                        localStorage.removeItem("selectedLocation");
                        localStorage.removeItem("title_keyword");
                      }}
                      className=""
                    >
                      <Link to={"/user/job/2"}>Jobs</Link>
                    </li>
                    {localStorage.getItem("jobSeekerLoginToken") ? (
                      <li>
                        <Link to={"/user/jobs-profile"}>Dashboard</Link>
                        {/*<ul className="sub-menu">
                          <li>
                            <Link
                              to={"/user/jobs-profile"}
                              className="dez-page"
                            >
                              My Profile<span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/user/jobs-my-resume"}
                              className="dez-page"
                            >
                              My Resume <span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/user/jobs-applied-job"}
                              className="dez-page"
                            >
                              Applied Job <span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={"/user/jobs-alerts"} className="dez-page">
                              Jobs Alerts <span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/user/jobs-saved-jobs"}
                              className="dez-page"
                            >
                              Saved Job <span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/user/jobs-cv-manager"}
                              className="dez-page"
                            >
                              CV Manager <span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/user/jobs-change-password"}
                              className="dez-page"
                            >
                              Change Password{" "}
                              <span className="new-page">New</span>
                            </Link>
                          </li>
                          <li>
                            <Link to={"/user/messages"} className="dez-page">
                              Messages <span className="new-page">New</span>
                            </Link>
                          </li>
                        </ul> */}
                      </li>
                    ) : null}
                    {/* <li>
                      {localStorage.getItem("jobSeekerLoginToken") ? null : (
                        <Link
                          style={{ color: "white" }}
                          to={"/user/register-2"}
                          className="site-button"
                        >
                          Sign Up
                        </Link>
                      )}
                    </li> */}
                    <li
                      className="nav-item jobseeker-hover"
                      style={{ position: "relative" }}
                    >
                      {localStorage.getItem("jobSeekerLoginToken") ? (
                        <Logout />
                      ) : (
                        <Link
                          style={{ color: "white" }}
                          to="#"
                          className="nav-link site-button"
                        >
                          Jobseeker
                        </Link>
                      )}

                      {!localStorage.getItem("jobSeekerLoginToken") && (
                        <div className="popup rounded-4 m-2 ">
                          <div className="d-flex gap-2 m-3 ">
                            <Link
                              to="/user/register-2"
                              className="btn btn-primary "
                              style={{ backgroundColor: "#1C2957" }}
                            >
                              Sign Up
                            </Link>
                            <br />
                            <Link
                              to="/user/login"
                              className="btn btn-secondary "
                            >
                              Sign In
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                    <li>
                      {localStorage.getItem("jobSeekerLoginToken") ? null : (
                        <Link
                          to={"/vendor/login"}
                          style={{ color: "white" }}
                          className="site-button "
                        >
                          Partner With Us
                        </Link>
                      )}
                    </li>
                    <li>
                      {localStorage.getItem("jobSeekerLoginToken") ? (
                        ""
                      ) : (
                        <Link
                          style={{ color: "white" }}
                          to={"/employer"}
                          className="site-button"
                        >
                          Employers/Post Job
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/*  Model Start */}
        <Modal
          className=" lead-form-modal"
          show={this.state.show}
          onHide={this.handleClose}
          centered
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                onClick={this.handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="modal-body row m-a0 clearfix">
                <div
                  className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                  style={{
                    backgroundImage: "url(" + bnr3 + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="form-info text-white align-self-center">
                    <h3 className="m-b15">Login To You Now</h3>
                    <p className="m-b15">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry has been the industry.
                    </p>
                    <ul className="list-inline m-a0">
                      <li>
                        <Link to={"#"} className="m-r10 text-white">
                          <i className="fa fa-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className="m-r10 text-white">
                          <i className="fa fa-google-plus"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className="m-r10 text-white">
                          <i className="fa fa-linkedin"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className="m-r10 text-white">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={"#"} className="m-r10 text-white">
                          <i className="fa fa-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 p-a0">
                  <div className="lead-form browse-job text-left">
                    <form>
                      <h3 className="m-t0">Personal Details</h3>
                      <div className="form-group">
                        <input className="form-control" placeholder="Name" />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div className="clearfix">
                        <button
                          type="button"
                          className="btn-primary site-button btn-block"
                        >
                          Submit{" "}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        {/*  Model END */}
      </>
    );
  }
}
export default Headerforlogin;
