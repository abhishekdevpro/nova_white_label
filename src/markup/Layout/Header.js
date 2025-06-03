
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Logout from "./Logout";
import "../Layout/Headerjobseeker.css";
import { Home, User } from "lucide-react";
import LogoWrapper from "./LogoWrapper";
import { useLogo } from "../../Context/LogoContext";
import GoogleTranslate from "../../GoogleTranslate";

const UserHeader = () => {
  const [show, setShow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isPartner, logo } = useLogo();
  const naviconRef = useRef(null);
  const sidebarRef = useRef(null);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Apply/remove the 'show' class based on state
    if (sidebarRef.current) {
      if (isMobileMenuOpen) {
        sidebarRef.current.classList.add("show");
      } else {
        sidebarRef.current.classList.remove("show");
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Handle submenu toggles
    const navUl = document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a");

    const handleNavClick = (event) => {
      const current = event.currentTarget;
      const parentEl = current.parentElement;
      const parentUl = parentEl.parentElement;

      // Close other open items
      parentUl.querySelectorAll("li").forEach((el) => {
        if (parentEl !== el) {
          el.classList.remove("open");
        }
      });

      // Toggle current item
      setTimeout(() => {
        parentEl.classList.toggle("open");
      }, 100);
    };

    navUl.forEach((el) => {
      el.addEventListener("click", handleNavClick);
    });

    // Cleanup event listeners
    return () => {
      navUl.forEach((el) => {
        el.removeEventListener("click", handleNavClick);
      });
    };
  }, []);

  // Close mobile menu when clicking on menu items
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  const token =
    localStorage.getItem("jobSeekerLoginToken") ||
    localStorage.getItem("employeeLoginToken");

  return (
    <>
      <header className="site-header mo-left header fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar">
            <div className="container clearfix">
              <LogoWrapper />

              <button
                ref={naviconRef}
                className={`navbar-toggler navicon justify-content-end ${isMobileMenuOpen ? '' : 'collapsed'}`}
                type="button"
                onClick={toggleMobileMenu}
                aria-controls="navbarNavDropdown"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div
                ref={sidebarRef}
                className={`header-nav navbar-collapse justify-content-start myNavbar ${isMobileMenuOpen ? 'show' : 'collapse'}`}
                id="navbarNavDropdown"
              >
                <div className="logo-header mostion d-md-block d-lg-none">
                  <Link to="/" className="dez-page" onClick={handleMenuItemClick}>
                    <img src={logo} className="logo" alt="mobile logo" />
                  </Link>
                </div>
                
                <ul className="nav navbar-nav align-items-center">
                  <li>
                    <Link to="/" onClick={handleMenuItemClick}>
                      <Home className="me-2" size={20} />
                      Home
                    </Link>
                  </li>

                  <li className="nav-item jobseeker-hover" style={{ position: "relative" }}>
                    <Link to="/services" className="nav-link" onClick={handleMenuItemClick}>
                      Services
                    </Link>
                  </li>

                  <li>
                    <Link to="/aboutus" onClick={handleMenuItemClick}>
                      About Us
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/user/jobs" 
                      onClick={() => {
                        localStorage.removeItem("selectedLocation");
                        localStorage.removeItem("title_keyword");
                        handleMenuItemClick();
                      }}
                    >
                      Job Page
                    </Link>
                  </li>

                  {token && (
                    <li>
                      <Link
                        to={
                          localStorage.getItem("jobSeekerLoginToken")
                            ? "/user/jobs-profile"
                            : "/employer/company-profile"
                        }
                        onClick={handleMenuItemClick}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <li className="nav-item jobseeker-hover" style={{ position: "relative" }}>
                    {token ? (
                      <div onClick={handleMenuItemClick}>
                        <Logout />
                      </div>
                    ) : (
                      <Link
                        to="/user/login"
                        style={{ color: "white" }}
                        className="nav-link site-button"
                        onClick={handleMenuItemClick}
                      >
                        <User className="me-2" size={20} />
                        Jobseeker Login
                      </Link>
                    )}
                  </li>

                  <li>
                    {!token && (
                      <Link
                        style={{ color: "white" }}
                        to="/employer/login"
                        className="site-button"
                        onClick={handleMenuItemClick}
                      >
                        <User className="me-2" size={20} />
                        Employers Login
                      </Link>
                    )}
                  </li>

                  <li>
                    {isPartner && !token && (
                      <Link
                        to="/white-label"
                        style={{ color: "white" }}
                        className="site-button"
                        onClick={handleMenuItemClick}
                      >
                        Partner With Us
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Modal
        className="lead-form-modal"
        show={show}
        onHide={handleClose}
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
                  backgroundImage:
                    "url(" + require("./../../images/background/bg3.jpg") + ")",
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
                      <Link to="#" className="m-r10 text-white">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="m-r10 text-white">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="m-r10 text-white">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="m-r10 text-white">
                        <i className="fa fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="m-r10 text-white">
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

export default UserHeader;