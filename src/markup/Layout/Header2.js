import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";
import axios from "axios";
import LogoWrapper from "./LogoWrapper";
import { Home } from "lucide-react";

var bnr3 = require("./../../images/background/bg3.jpg");

const UserHeader2 = () => {
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState(null);
  const [logo, setLogo] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s"
  );
  const [isPartner, setIsPartner] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  // useEffect(() => {
  //   // Fetch logo from API
  //   const fetchLogo = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://apiwl.novajobs.us/api/jobseeker/acount-info?domain=${url}`
  //       );
  //       if (response.data?.data.logo) {
  //         setLogo(response.data.data.logo);
  //         setIsPartner(response.data.data.is_partner_with_us);
  //         localStorage.setItem("IsPartner", response.data.data.is_partner_with_us);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching logo:", error);
  //       // Keep using default logo in case of error
  //     }
  //   };

  //   fetchLogo();
  // }, [url]);

  useEffect(() => {
    // sidebar open/close
    const Navicon = document.querySelector(".navicon");
    const sidebarmenu = document.querySelector(".myNavbar");

    function toggleFunc() {
      sidebarmenu.classList.toggle("show");
    }
    Navicon.addEventListener("click", toggleFunc);

    // Sidenav li open close
    const navUl = [].slice.call(
      document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a")
    );

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

    for (let y = 0; y < navUl.length; y++) {
      navUl[y].addEventListener("click", function () {
        checkLi(this);
      });
    }

    // Cleanup function
    return () => {
      Navicon.removeEventListener("click", toggleFunc);
      navUl.forEach((item) => {
        item.removeEventListener("click", function () {
          checkLi(this);
        });
      });
    };
  }, []);

  return (
    <>
      <header className="site-header mo-left header border-bottom fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              {/* <div className="logo-header mostion">
                <Link to={"/"}>
                  <img
                    src={logo}
                    className="logo"
                    alt=""
                  />
                </Link>
              </div> */}
              <LogoWrapper />

              <button
                className="navbar-toggler collapsed navicon justify-content-end"
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
                id="navbarNavDropdown"
              >
                <ul className="nav navbar-nav">
                  <li className="">
                    <Link to={"/"}>
                      {" "}
                      <Home />{" "}
                    </Link>
                  </li>
                  <li className="">
                    <Link>services </Link>
                  </li>
                  <li
                    onClick={() => {
                      localStorage.removeItem("selectedLocation");
                      localStorage.removeItem("title_keyword");
                    }}
                    className=""
                  >
                    <Link to="/user/job/1">Job Page</Link>
                  </li>

                  {localStorage.getItem("jobSeekerLoginToken") ? (
                    <li>
                      <Link to={"/user/dashboard"}>Dashboard</Link>
                    </li>
                  ) : (
                    ""
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
                    <h3 className="m-t0">Personal Details </h3>
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
    </>
  );
};

export default UserHeader2;
