import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";
import LogoWrapper from "./LogoWrapper";

const VendorHeader = () => {
  const [show, setShow] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for navbar toggle

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <header className="site-header mo-left header border-bottom fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              <LogoWrapper />

              <button
                className={`navbar-toggler navicon justify-content-end ${
                  isNavbarOpen ? "collapsed" : ""
                }`}
                type="button"
                onClick={toggleNavbar}
                aria-expanded={isNavbarOpen}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className="extra-nav">
                <div className="extra-cell">
                  {!localStorage.getItem("vendorToken") && (
                    <Link
                      to={"/vendor/vendorregistration"}
                      className="site-button"
                    >
                      <i className="fa fa-user"></i> Sign Up
                    </Link>
                  )}
                  {localStorage.getItem("vendorToken") ? (
                    <Logout />
                  ) : (
                    <Link to={"/vendor/login"} className="site-button">
                      <i className="fa fa-user"></i> Log in
                    </Link>
                  )}
                </div>
              </div>

              <div
                className={`header-nav navbar-collapse myNavbar justify-content-start ${
                  isNavbarOpen ? "show" : ""
                }`}
              >
                <ul className="nav navbar-nav">
                  <li>
                    <Link to={"/white-label"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/services"}>Services</Link>
                  </li>
                  <li>
                    <Link to={"/aboutus"}>About Us</Link>
                  </li>
                  <li
                    onClick={() => {
                      localStorage.removeItem("selectedLocation");
                      localStorage.removeItem("title_keyword");
                    }}
                  >
                    <Link to={"/user/jobs"}>Jobs</Link>
                  </li>
                  {localStorage.getItem("vendorToken") && (
                    <li>
                      <Link to={`/vendor/vendorprofile`}>Dashboard</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Modal
        show={show}
        onHide={handleClose}
        className="lead-form-modal"
        centered
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            <div className="modal-body row m-a0 clearfix">
              <div
                className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
                style={{
                  backgroundImage: "url(./../../images/background/bg3.jpg)",
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
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VendorHeader;
