import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";

import logo2 from "./../../images/logo.png";
var bnr3 = require("./../../images/background/bg3.jpg");

class EmployeeHeader extends Component {
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
                <div className="extra-nav">
                  <div className="extra-cell">
                    {localStorage.getItem("employeeLoginToken") ? null : (
                      <Link to={"/user/register-2"} className="site-button">
                        <i className="fa fa-user"></i> Sign Up
                      </Link>
                    )}
                    {/* <Link to ={'#'} title="READ MORE" onClick={this.handleShow}  className="site-button"><i className="fa fa-lock"></i> login </Link> */}
                    {localStorage.getItem("employeeLoginToken") ? (
                      <Logout />
                    ) : null}
                  </div>
                </div>

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
                  <ul className="nav navbar-nav">
                    <li className="">
                      <Link to={"/"}>Home </Link>
                    </li>
                    <li className="">
                      <Link to={"/services"}>services </Link>
                    </li>
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

                    {/* <li>
                      <Link to={"#"}>
                        For Candidates <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/employer/jobs-profile"} className="dez-page">
                            My Profile<span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/jobs-my-resume"}
                            className="dez-page"
                          >
                            My Resume <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/jobs-applied-job"}
                            className="dez-page"
                          >
                            Applied Job <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"/employer/jobs-alerts"} className="dez-page">
                            Jobs Alerts <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/jobs-saved-jobs"}
                            className="dez-page"
                          >
                            Saved Job <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/jobs-cv-manager"}
                            className="dez-page"
                          >
                            CV Manager <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/jobs-change-password"}
                            className="dez-page"
                          >
                            Change Password{" "}
                            <span className="new-page">New</span>
                          </Link>
                        </li>
                      </ul>
                    </li> */}
                    {localStorage.getItem("employeeLoginToken") ? (
                      <li>
                        <Link to={"/employer/company-profile"}>Dashboard</Link>
                        {/* <ul className="sub-menu">
                         <li>
                           <Link
                             to={"/employer/company-profile"}
                             className="dez-page"
                           >
                             Company Profile{" "}
                             <span className="new-page">New</span>
                           </Link>
                         </li>
                         <li>
                           <Link
                             to={"/employer/company-resume"}
                             className="dez-page"
                           >
                             Employer Resume{" "}
                             <span className="new-page">New</span>
                           </Link>
                         </li>
 
                         <li>
                           <Link
                             to={"/employer/company-manage-job"}
                             className="dez-page">
                             Manage jobs <span className="new-page">New</span>
                           </Link>
                         </li> 
                         <li>
                           <Link
                             to={"/employer/company-transactions"}
                             className="dez-page"
                           >
                             Transactions <span className="new-page">New</span>
                           </Link>
                         </li>
                         <li>
                           <Link
                             to={"/employer/browse-candidates"}
                             className="dez-page"
                             onClick={() => {
                               localStorage.removeItem("profession_title");
                             }}
                           >
                             Browse Candidates
                           </Link>
                         </li>
                         <li>
                           <Link to={"/employer/messages"} className="dez-page">
                             Messages
                           </Link>
                         </li>
                       </ul> */}
                      </li>
                    ) : (
                      ""
                    )}

                    {/* <li>
                      <Link to={"#"}>
                        Pages <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link to={"/employer/about-us"} className="dez-page">
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/job-detail"}
                            className="dez-page"
                          >
                            Job Detail
                          </Link>
                        </li>
                        <li>
                          <Link to={"/employer/companies"} className="dez-page">
                            companies
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/free-job-alerts"}
                            className="dez-page"
                          >
                            free job alerts{" "}
                            <span className="new-page">New</span>
                          </Link>
                        </li>
                        <li>
                          <Link to={"#"} className="dez-page">
                            Browse Job <i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link
                                to={"/employer/browse-job-list"}
                                className="dez-page"
                              >
                                browse job list
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/browse-job-grid"}
                                className="dez-page"
                              >
                                browse job grid{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/browse-job-filter-list"}
                                className="dez-page"
                              >
                                browse filter list{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/browse-job-filter-grid"}
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
                                to={"/employer/category-all-jobs"}
                                className="dez-page"
                              >
                                all jobs <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/category-company-jobs"}
                                className="dez-page"
                              >
                                company jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/category-designations-jobs"}
                                className="dez-page"
                              >
                                designations jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/category-jobs"}
                                className="dez-page"
                              >
                                category jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/category-location-jobs"}
                                className="dez-page"
                              >
                                location jobs{" "}
                                <span className="new-page">New</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/category-skill-jobs"}
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
                                to={"/employer/portfolio-grid-2"}
                                className="dez-page"
                              >
                                Portfolio Grid 2{" "}
                              </Link>
                            </li>
                          </ul>
                        </li>
                        {/* <li><Link to={'#'} className="dez-page">Login <i className="fa fa-angle-right"></i></Link>
													<ul className="sub-menu">
														<li><Link to={"/login"} className="dez-page">login 1</Link></li>
														<li><Link to={"/login-2"} className="dez-page">login 2 <span className="new-page">New</span></Link></li>
														<li><Link to={"/login-3"} className="dez-page">login 3 <span className="new-page">New</span></Link></li>
													</ul>
												</li> */}
                    {/* <li>
                          <Link to={"#"} className="dez-page">
                            register <i className="fa fa-angle-right"></i>
                          </Link>
                          <ul className="sub-menu">
                            <li>
                              <Link
                                to={"/employer/register"}
                                className="dez-page"
                              >
                                register 1
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/employer/register-2"}
                                className="dez-page"
                              >
                                register 2 <span className="new-page">New</span>
                              </Link>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link to={"/employer/error-404"} className="dez-page">
                            Error 404
                          </Link>
                        </li>

                        <li>
                          <Link to={"/employer/contact"} className="dez-page">
                            Contact Us
                          </Link>
                        </li>
                      </ul>
                    </li>  */}
                    {/* <li>
                      <Link to={"#"}>
                        Blog <i className="fa fa-chevron-down"></i>
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link
                            to={"/employer/blog-classic"}
                            className="dez-page">
                            Classic
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/blog-classic-sidebar"}
                            className="dez-page">
                            Classic Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/blog-detailed-grid"}
                            className="dez-page">
                            Detailed Grid
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/blog-detailed-grid-sidebar"}
                            className="dez-page">
                            Detailed Grid Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/blog-left-img"}
                            className="dez-page">
                            Left Image Sidebar
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/employer/blog-details"}
                            className="dez-page">
                            Blog Details
                          </Link>
                        </li>
                      </ul>
                    </li> */}
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
export default EmployeeHeader;
