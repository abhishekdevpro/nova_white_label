import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";
import axios from 'axios';

var bnr3 = require("./../../images/background/bg3.jpg");

class UserHeader2 extends Component {
  state = {
    show: false,
    resume: null,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleResumeChange = (event) => {
    const resume = event.target.files[0];
    if (resume) {
      const formData = new FormData();
      formData.append("resume", resume);

      // Use your API endpoint here
      axios.post("/api/upload-resumess", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Resume uploaded successfully");
      })
      .catch((error) => {
        console.error("There was an error uploading the resume!", error);
      });
    }
  };
  

  componentDidMount() {
    // sidebar open/close
    var Navicon = document.querySelector(".navicon");
    var sidebarmenu = document.querySelector(".myNavbar ");

    function toggleFunc() {
      sidebarmenu.classList.toggle("show");
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
        <header className="site-header mo-left header border-bottom fullwidth">
          <div className="sticky-header main-bar-wraper navbar-expand-lg">
            <div className="main-bar clearfix">
              <div className="container clearfix">
                <div className="logo-header mostion">
                  <Link to={"/"}>
                    <img
                      src={require("./../../images/logo/NovaUS.png")}
                      className="logo"
                      alt=""
                    />
                  </Link>
                </div>

                <button
                  className="navbar-toggler collapsed navicon justify-content-end"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>

                <div className="extra-nav">
                  <div className="extra-cell">
                    {localStorage.getItem("jobSeekerLoginToken") ? null : (
                      <Link to={"/user/register-2"} className="site-button">
                        <i className="fa fa-user"></i> Sign Up
                      </Link>
                    )}
                    {localStorage.getItem("jobSeekerLoginToken") ? (
                      <>
                       
                        <Logout />
                      </>
                    ) : (
                      <Link to={"/user/login"} className="site-button">
                        <i className="fa fa-user"></i> Log in
                      </Link>
                    )}
                  </div>
                </div>

                <div
                  className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                  id="navbarNavDropdown">
                  <ul className="nav navbar-nav">
                    <li className="">
                      <Link to={"/user"}>Home </Link>
                    </li>
                    <li className="">
                      <Link to={"/services"}>services </Link>
                    </li>
                    <li
                      onClick={() => {
                        localStorage.removeItem("selectedLocation");
                        localStorage.removeItem("title_keyword");
                      }}
                      className="">
                      <Link to={"/user/job/1"}>Job Page</Link>
                    </li>
                   

                    {localStorage.getItem('jobSeekerLoginToken') ? (
                    <li>
                      
                      <Link to={`/user/jobs-profile`}>
                        Dashboard
                      </Link>
                      {/* <ul className="sub-menu">
                        <li>
                          <Link to={"/user/jobs-profile"} className="dez-page">
                            My Profile<span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/jobs-my-resume"}
                            className="dez-page">
                            My Resume <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/jobs-applied-job"}
                            className="dez-page">
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
                            className="dez-page">
                            Saved Job <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/jobs-cv-manager"}
                            className="dez-page">
                            Resume Manager <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/jobs-change-password"}
                            className="dez-page">
                            Change Password{" "}
                            <span className="new-page">New</span>
                          </Link>
                        </li>
                         <li>
                      <Link to={"#"}>
                        For Employers <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link
                            to={"/user/company-profile"}
                            className="dez-page">
                            Company Profile{" "}
                            <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/company-resume"}
                            className="dez-page">
                            Employer Resume{" "}
                            <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/company-post-jobs"}
                            className="dez-page">
                            Post A Jobs <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/company-manage-job"}
                            className="dez-page">
                            Manage jobs <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/company-transactions"}
                            className="dez-page">
                            Transactions <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/browse-candidates"}
                            className="dez-page">
                            Browse Candidates
                          </Link>
                        </li>
                      </ul> */}
                    {/* </li> */}
                    {/* <li>
                      <Link to={"#"}>
                        Pages <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/user/about-us"} className="dez-page">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/job"} className="dez-page">
                            Job Detail
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/companies"} className="dez-page">
                            companies
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/free-job-alerts"}
                            className="dez-page"
                          >
                            free job alerts{" "}
                            <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/#"} className="dez-page">
                            Browse Job <i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link
                                to={"/user/browse-job-list"}
                                className="dez-page"
                              >
                                browse job list
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/browse-job-grid"}
                                className="dez-page"
                              >
                                browse job grid{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/browse-job-filter-list"}
                                className="dez-page"
                              >
                                browse filter list{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/browse-job-filter-grid"}
                                className="dez-page"
                              >
                                browse filter grid{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to={"#"} className="dez-page">
                            Jobs<i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link
                                to={"/user/category-all-jobs"}
                                className="dez-page"
                              >
                                all jobs <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/category-company-jobs"}
                                className="dez-page"
                              >
                                company jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/category-designations-jobs"}
                                className="dez-page"
                              >
                                designations jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/category-jobs"}
                                className="dez-page"
                              >
                                category jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/category-location-jobs"}
                                className="dez-page"
                              >
                                location jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/user/category-skill-jobs"}
                                className="dez-page"
                              >
                                skill jobs <span className="new-page">New</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to={"#"} className="dez-page">
                            Portfolio <i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link
                                to={"/user/portfolio-grid-2"}
                                className="dez-page"
                              >
                                Portfolio Grid 2{" "}
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to={"#"} className="dez-page">
                            Login <i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link to={"/user/login"} className="dez-page">
                                login 1
                              </Link>
                            </li>
                            <li>
                              <Link to={"/user/login-2"} className="dez-page">
                                login 2 <span className="new-page">New</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to={"#"} className="dez-page">
                            register <i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link to={"/userregister"} className="dez-page">
                                register 1
                              </Link>
                            </li>
                            <li>
                              <Link to={"/userregister-2"} className="dez-page">
                                register 2 <span className="new-page">New</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to={"/user/error-404"} className="dez-page">
                            Error 404
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/contact"} className="dez-page">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </li> */}
                    {/* <li>
                      <Link to={"#"}>
                        Blog <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/user/blog-classic"} className="dez-page">
                            Classic
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/blog-classic-sidebar"}
                            className="dez-page">
                            Classic Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/blog-detailed-grid"}
                            className="dez-page">
                            Detailed Grid
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/user/blog-detailed-grid-sidebar"}
                            className="dez-page">
                            Detailed Grid Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/blog-left-img"} className="dez-page">
                            Left Image Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link to={"/user/blog-details"} className="dez-page">
                            Blog Details
                          </Link>
                        </li>
                      </ul>
                    </li> 
                      </ul>*/}
                    </li> ) : ("")}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/*  Model Start */}
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          className=" lead-form-modal"
          centered>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                onClick={this.handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="modal-body row m-a0 clearfix">
                <div
                  className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                  style={{
                    backgroundImage: "url(" + bnr3 + ")",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}>
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
                      <h3 className="m-t0">
                        Personal Details{" "}
                      </h3>
                      <div className="form-group">
                        <input
                          value=""
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          value=""
                          className="form-control"
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div className="clearfix">
                        <button
                          type="button"
                          className="btn-primary site-button btn-block">
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
        {/*  Model End */}
      </>
    );
  }
}

export default UserHeader2;
