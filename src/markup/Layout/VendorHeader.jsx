import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";
import axios from 'axios';

var bnr3 = require("./../../images/background/bg3.jpg");

class VendorHeader extends Component {
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
                      // src={require("./../../images/logo/NovaUS.png")}
                      src="https://abhishekdevpro-nova-home-care-fe.vercel.app/assets/logo-B4gdw3fA.png"
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
                      <Link to={"/vendor/vendorregistration"} className="site-button">
                        <i className="fa fa-user"></i> Sign Up
                      </Link>
                    )}
                    {localStorage.getItem("jobSeekerLoginToken") ? (
                      <>
                       
                        <Logout />
                      </>
                    ) : (
                      <Link to={"/vendor/login"} className="site-button">
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
                      <Link to={"/"}>Home </Link>
                    </li>
                    <li className="">
                      <Link 
                      // to={"/services"}
                      >services </Link>
                    </li>
                    <li
                      onClick={() => {
                        localStorage.removeItem("selectedLocation");
                        localStorage.removeItem("title_keyword");
                      }}
                      className="">
                      <Link 
                      // to={"/user/job/1"}
                      >Job Page</Link>

                    </li>
                   

                    {localStorage.getItem('jobSeekerLoginToken') ? (
                    <li>
                      
                      <Link 
                      // to={`/user/jobs-profile`}
                      >
                        Dashboard
                      </Link>
                     
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

export default VendorHeader;
