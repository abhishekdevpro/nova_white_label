// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import Logout from "./Logout";
// import "../Layout/Headerjobseeker.css";

// import logo2 from "./../../images/logo.png";
// var bnr3 = require("./../../images/background/bg3.jpg");

// class UserHeader extends Component {
//   state = {
//     // initial state
//     show: false,
//   };

//   handleClose = () => {
//     this.setState({ show: false });
//   };
//   handleShow = () => {
//     this.setState({ show: true });
//   };
//   componentDidMount() {
//     // sidebar open/close

//     var Navicon = document.querySelector(".navicon");
//     var sidebarmenu = document.querySelector(".myNavbar ");

//     function toggleFunc() {
//       sidebarmenu.classList.toggle("show");
//       //   Navicon.classList.toggle('open');
//     }
//     Navicon.addEventListener("click", toggleFunc);

//     // Sidenav li open close
//     var navUl = [].slice.call(
//       document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a")
//     );
//     for (var y = 0; y < navUl.length; y++) {
//       navUl[y].addEventListener("click", function () {
//         checkLi(this);
//       });
//     }

//     function checkLi(current) {
//       current.parentElement.parentElement
//         .querySelectorAll("li")
//         .forEach((el) =>
//           current.parentElement !== el ? el.classList.remove("open") : ""
//         );
//       setTimeout(() => {
//         current.parentElement.classList.toggle("open");
//       }, 100);
//     }
//   }
//   render() {
//     return (
//       <>
//         <header className="site-header mo-left header fullwidth">
//           <div className="sticky-header main-bar-wraper navbar-expand-lg">
//             <div className="main-bar clearfix">
//               <div className="container clearfix">
//                 <div className="logo-header mostion">
//                   {/* <Link to={"/"}><img src={logo2} className="logo" alt="img" /></Link> */}
//                   <Link to={"/"}>
//                     <img
//                       // src={require("./../../images/logo/NovaUS.png")}
//                       src="https://abhishekdevpro-nova-home-care-fe.vercel.app/assets/logo-B4gdw3fA.png"
//                       className="logo"
//                       alt="img"
//                     />
//                   </Link>
//                 </div>

//                 <button
//                   className="navbar-toggler collapsed navicon  justify-content-end"
//                   type="button"
//                   data-toggle="collapse"
//                   data-target="#navbarNavDropdown"
//                   aria-controls="navbarNavDropdown"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </button>
//                 {/* <div>
//                       {localStorage.getItem("jobSeekerLoginToken") ? null : (
//                         <div className="extra-nav">
//                   <button
//                     style={{ color: "white" }}
//                     className="site-button"
//                   >
//                     Partner With Us
//                   </button>
//                 </div>
//                       )}
//                     </div> */}

//                 <div
//                   className="header-nav navbar-collapse collapse myNavbar justify-content-start"
//                   id="navbarNavDropdown"
//                 >
//                   <div className="logo-header mostion d-md-block d-lg-none">
//                     <Link to={"/"} className="dez-page">
//                       <img
//                         src={require("./../../images/logo/NovaUS.png")}
//                         className="logo"
//                         alt="img"
//                       />
//                     </Link>
//                   </div>
//                   <ul className="nav navbar-nav align-items-center ">
//                     <li className="">
//                       <Link to={"/"}>Home </Link>
//                       {/* <ul className="sub-menu">
//                         <li>
//                           <Link to={"./"} className="dez-page">
//                             Home 1
//                           </Link>
//                         </li>
//                         <li>
//                           <Link to={"/index-2"} className="dez-page">
//                             Home 2
//                           </Link>
//                         </li>
//                       </ul> */}
//                     </li>

//                     <li
//                       className="nav-item jobseeker-hover"
//                       style={{ position: "relative" }}
//                     >
//                       <Link
//                         // style={{ color: "white" }}
//                         // to="/services"
//                         className="nav-link "
//                       >
//                         services
//                       </Link>

//                       {!localStorage.getItem("jobSeekerLoginToken") && (
//                         <div className="popup rounded-4 m-2 ">
//                           <div className="d-flex gap-2 m-3 ">
//                             <Link
//                               // to="/about-us"
//                               className="btn btn-primary "
//                               style={{ backgroundColor: "#1C2957" }}
//                             >
//                               AI-Resume Builder
//                             </Link>
//                             <br />
//                           </div>
//                         </div>
//                       )}
//                     </li>

//                     <li className="">
//                       <Link
//                       // to={"/aboutus"}
//                       >About Us </Link>
//                     </li>

//                     <li
//                       onClick={() => {
//                         localStorage.removeItem("selectedLocation");
//                         localStorage.removeItem("title_keyword");
//                       }}
//                       className=""
//                     >
//                       <Link
//                       // to={"/user/job/1"}
//                       >Job Page</Link>
//                       <ul className="sub-menu">
//                         <li>
//                           <Link to={"/Profilepagehome"} className="dez-page">
//                             Company Page
//                           </Link>
//                         </li>
//                       </ul>
//                     </li>
//                     {localStorage.getItem("jobSeekerLoginToken") ? (
//                       <li>
//                         <Link
//                         // to={"/user/jobs-profile"}
//                         >Dashboard</Link>

//                       </li>
//                     ) : null}

//                     <li
//                       className="nav-item jobseeker-hover"
//                       style={{ position: "relative" }}
//                     >
//                       {localStorage.getItem("jobSeekerLoginToken") ? (
//                         <Logout />
//                       ) : (
//                         <Link
//                           style={{ color: "white" }}
//                           to="#"
//                           className="nav-link site-button"
//                         >
//                           Jobseeker
//                         </Link>
//                       )}

//                       {!localStorage.getItem("jobSeekerLoginToken") && (
//                         <div className="popup rounded-4 m-2 ">
//                           <div className="d-flex gap-2 m-3 ">
//                             <Link
//                               to="/user/register-2"
//                               className="btn btn-primary "
//                               style={{ backgroundColor: "#1C2957" }}
//                             >
//                               Sign Up
//                             </Link>
//                             <br />
//                             <Link
//                               to="/user/login"
//                               className="btn btn-secondary "
//                             >
//                               Sign In
//                             </Link>
//                           </div>
//                         </div>
//                       )}
//                     </li>
//                     <li>
//                       {localStorage.getItem("jobSeekerLoginToken") ? null : (
//                         <Link
//                           to={"/white-label"}
//                           style={{ color: "white" }}
//                           className="site-button "
//                         >
//                           Partner With Us
//                         </Link>
//                       )}
//                     </li>
//                     <li>
//                       {localStorage.getItem("jobSeekerLoginToken") ? (
//                         ""
//                       ) : (
//                         <Link
//                           style={{ color: "white" }}
//                           to={"/employer"}
//                           className="site-button"
//                         >
//                           Employers/Post Job
//                         </Link>
//                       )}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//         {/*  Model Start */}
//         <Modal
//           className=" lead-form-modal"
//           show={this.state.show}
//           onHide={this.handleClose}
//           centered
//         >
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <button
//                 type="button"
//                 className="close"
//                 onClick={this.handleClose}
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//               <div className="modal-body row m-a0 clearfix">
//                 <div
//                   className="col-lg-6 col-md-6 overlay-primary-dark d-flex p-a0"
//                   style={{
//                     backgroundImage: "url(" + bnr3 + ")",
//                     backgroundPosition: "center",
//                     backgroundSize: "cover",
//                   }}
//                 >
//                   <div className="form-info text-white align-self-center">
//                     <h3 className="m-b15">Login To You Now</h3>
//                     <p className="m-b15">
//                       Lorem Ipsum is simply dummy text of the printing and
//                       typesetting industry has been the industry.
//                     </p>
//                     <ul className="list-inline m-a0">
//                       <li>
//                         <Link to={"#"} className="m-r10 text-white">
//                           <i className="fa fa-facebook"></i>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to={"#"} className="m-r10 text-white">
//                           <i className="fa fa-google-plus"></i>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to={"#"} className="m-r10 text-white">
//                           <i className="fa fa-linkedin"></i>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to={"#"} className="m-r10 text-white">
//                           <i className="fa fa-instagram"></i>
//                         </Link>
//                       </li>
//                       <li>
//                         <Link to={"#"} className="m-r10 text-white">
//                           <i className="fa fa-twitter"></i>
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 p-a0">
//                   <div className="lead-form browse-job text-left">
//                     <form>
//                       <h3 className="m-t0">Personal Details</h3>
//                       <div className="form-group">
//                         <input className="form-control" placeholder="Name" />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           className="form-control"
//                           placeholder="Mobile Number"
//                         />
//                       </div>
//                       <div className="clearfix">
//                         <button
//                           type="button"
//                           className="btn-primary site-button btn-block"
//                         >
//                           Submit{" "}
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal>
//         {/*  Model END */}
//       </>
//     );
//   }
// }
// export default UserHeader;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Logout from "./Logout";
import "../Layout/Headerjobseeker.css";

const defaultLogo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s";

const UserHeader = () => {
  const [show, setShow] = useState(false);
  const [logo, setLogo] = useState(defaultLogo);
  const [isPartner, setIsPartner] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = window.location.origin;
  useEffect(() => {
    // Fetch logo from API
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/acount-info?domain=${url}`
        );
        if (response.data?.data.logo) {
          setLogo(response.data.data.logo);
          setIsPartner(response.data.data.is_partner_with_us);
        }
      } catch (error) {
        console.error("Error fetching logo:", error);
        // Keep using default logo in case of error
      }
    };

    fetchLogo();
  }, []);

  useEffect(() => {
    // Sidebar open/close
    const navicon = document.querySelector(".navicon");
    const sidebarmenu = document.querySelector(".myNavbar");

    const toggleFunc = () => {
      sidebarmenu?.classList.toggle("show");
    };

    navicon?.addEventListener("click", toggleFunc);

    // Sidenav li open close
    const navUl = [].slice.call(
      document.querySelectorAll(".navbar-nav > li > a, .sub-menu > li > a")
    );

    const checkLi = (current) => {
      const parentEl = current.parentElement;
      const parentUl = parentEl.parentElement;

      parentUl
        .querySelectorAll("li")
        .forEach((el) => (parentEl !== el ? el.classList.remove("open") : ""));

      setTimeout(() => {
        parentEl.classList.toggle("open");
      }, 100);
    };

    navUl.forEach((el) => {
      el.addEventListener("click", () => checkLi(el));
    });

    // Cleanup
    return () => {
      navicon?.removeEventListener("click", toggleFunc);
      navUl.forEach((el) => {
        el.removeEventListener("click", () => checkLi(el));
      });
    };
  }, []);
  console.log(isPartner, "LLLL");
  return (
    <>
      <header className="site-header mo-left header fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link to="/">
                  <img src={logo} className="logo" alt="company logo" />
                </Link>
              </div>

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

              <div
                className="header-nav navbar-collapse collapse myNavbar justify-content-start"
                id="navbarNavDropdown"
              >
                <div className="logo-header mostion d-md-block d-lg-none">
                  <Link to="/" className="dez-page">
                    <img src={logo} className="logo" alt="mobile logo" />
                  </Link>
                </div>
                <ul className="nav navbar-nav align-items-center">
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  <li
                    className="nav-item jobseeker-hover"
                    style={{ position: "relative" }}
                  >
                    <Link className="nav-link">Services</Link>
                    {!localStorage.getItem("jobSeekerLoginToken") && (
                      <div className="popup rounded-4 m-2">
                        <div className="d-flex gap-2 m-3">
                          <Link
                            className="btn btn-primary"
                            style={{ backgroundColor: "#1C2957" }}
                          >
                            AI-Resume Builder
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>

                  <li>
                    <Link>About Us</Link>
                  </li>

                  <li
                    onClick={() => {
                      localStorage.removeItem("selectedLocation");
                      localStorage.removeItem("title_keyword");
                    }}
                  >
                    <Link>Job Page</Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/Profilepagehome" className="dez-page">
                          Company Page
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {localStorage.getItem("jobSeekerLoginToken") && (
                    <li>
                      <Link>Dashboard</Link>
                    </li>
                  )}

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
                      <div className="popup rounded-4 m-2">
                        <div className="d-flex gap-2 m-3">
                          <Link
                            to="/user/register-2"
                            className="btn btn-primary"
                            style={{ backgroundColor: "#1C2957" }}
                          >
                            Sign Up
                          </Link>
                          <Link to="/user/login" className="btn btn-secondary">
                            Sign In
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>

                  {/* <li>
                    {!localStorage.getItem("jobSeekerLoginToken") &&  (
                      <Link
                        to="/white-label"
                        style={{ color: "white" }}
                        className="site-button"
                      >
                        Partner With Us
                      </Link>
                    )}
                  </li> */}
                  {isPartner && !localStorage.getItem("jobSeekerLoginToken") && (
                    <Link
                      to="/white-label"
                      style={{ color: "white" }}
                      className="site-button"
                    >
                      Partner With Us
                    </Link>
                  )}

                  <li>
                    {!localStorage.getItem("jobSeekerLoginToken") && (
                      <Link
                        style={{ color: "white" }}
                        to="/employer"
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
