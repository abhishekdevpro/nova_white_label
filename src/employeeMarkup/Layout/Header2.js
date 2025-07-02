// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Modal } from "react-bootstrap";
// import Logout from "./Logout";
// import LogoWrapper from "../../markup/Layout/LogoWrapper";

// var bnr3 = require("./../../images/background/bg3.jpg");

// class EmployeeHeader2 extends Component {
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
//         <header className="site-header mo-left header border-bottom fullwidth">
//           <div className="sticky-header main-bar-wraper navbar-expand-lg">
//             <div className="main-bar clearfix">
//               <div className="container clearfix">
//                 {/* <div className="logo-header mostion">
//                   <Link to={"/employer"}>
//                     <img
//                       src={require("./../../images/logo/NovaUS.png")}
//                       className="logo"
//                       alt=""
//                     />
//                   </Link>
//                 </div> */}
//                 <LogoWrapper />

//                 <button
//                   className="navbar-toggler collapsed navicon justify-content-end"
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

//                 <div className="extra-nav">
//                   <div className="extra-cell">
//                     {localStorage.getItem("employeeLoginToken") ? null : (
//                       <Link to={"/user/register-2"} className="site-button">
//                         <i className="fa fa-user"></i> Sign Up
//                       </Link>
//                     )}
//                     {/* <Link to={'#'} title="READ MORE" onClick={this.handleShow} className="site-button"><i className="fa fa-lock"></i> login </Link> */}
//                     {localStorage.getItem("employeeLoginToken") ? (
//                       <Logout />
//                     ) : (
//                       <Link to={"/employer/login"} className="site-button">
//                         <i className="fa fa-user"></i> Log in
//                       </Link>
//                     )}
//                   </div>
//                 </div>

//                 <div
//                   className="header-nav navbar-collapse collapse myNavbar justify-content-start"
//                   id="navbarNavDropdown"
//                 >
//                   <ul className="nav navbar-nav">
//                     <li className="">
//                       {/* <Link to={"/employer"}>Home </Link> */}
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
//                     <li className="">
//                       <Link to={"/services"}>services </Link>
//                     </li>
                   
//                     <li>
//                       <Link to={`/employer/company-profile`}>Dashboard</Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>
//         {/*  Model Start */}
//         <Modal
//           show={this.state.show}
//           onHide={this.handleClose}
//           className=" lead-form-modal"
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
//                         <input
//                           value=""
//                           className="form-control"
//                           placeholder="Name"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           value=""
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

// export default EmployeeHeader2;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Logout from "./Logout";
import LogoWrapper from "../../markup/Layout/LogoWrapper";
import { Home } from "lucide-react";

var bnr3 = require("./../../images/background/bg3.jpg");

const EmployeeHeader2 = () => {
  const [show, setShow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const naviconRef = useRef(null);
  const sidebarRef = useRef(null);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on menu items
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
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

  return (
    <>
      <header className="site-header mo-left header border-bottom fullwidth">
        <div className="sticky-header main-bar-wraper navbar-expand-lg">
          <div className="main-bar clearfix">
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

              <div className="extra-nav">
                <div className="extra-cell">
                  {localStorage.getItem("employeeLoginToken") ? null : (
                    <Link to={"/user/register-2"} className="site-button">
                      <i className="fa fa-user"></i> Sign Up
                    </Link>
                  )}
                  {localStorage.getItem("employeeLoginToken") ? (
                    <Logout />
                  ) : (
                    <Link to={"/employer/login"} className="site-button">
                      <i className="fa fa-user"></i> Log in
                    </Link>
                  )}
                </div>
              </div>

              <div
                ref={sidebarRef}
                className={`header-nav navbar-collapse myNavbar justify-content-start ${isMobileMenuOpen ? 'show' : 'collapse'}`}
                id="navbarNavDropdown"
              >
                <ul className="nav navbar-nav">
                  <li className="">
                    <Link to={"/employer/company-profile"} onClick={handleMenuItemClick}>
                      <Home className="me-2" size={20} />
                      Home
                    </Link>
                  </li>
                  
                  <li className="">
                    <Link to={"/services"} onClick={handleMenuItemClick}>
                      Services
                    </Link>
                  </li>
                   
                  <li>
                    <Link to={`/employer/company-profile`} onClick={handleMenuItemClick}>
                      Dashboard
                    </Link>
                  </li>

                  {/* Mobile-only login/signup links */}
                  <li className="d-lg-none">
                    {localStorage.getItem("employeeLoginToken") ? (
                      <div onClick={handleMenuItemClick}>
                        <Logout />
                      </div>
                    ) : (
                      <Link to={"/employer/login"} className="nav-link" onClick={handleMenuItemClick}>
                        <i className="fa fa-user me-2"></i>
                        Log in
                      </Link>
                    )}
                  </li>
                  
                  {!localStorage.getItem("employeeLoginToken") && (
                    <li className="d-lg-none">
                      <Link to={"/user/register-2"} className="nav-link" onClick={handleMenuItemClick}>
                        <i className="fa fa-user me-2"></i>
                        Sign Up
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modal Start */}
      <Modal
        show={show}
        onHide={handleClose}
        className="lead-form-modal"
        centered
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={handleClose}
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
                      <input
                        className="form-control"
                        placeholder="Name"
                        defaultValue=""
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Mobile Number"
                        defaultValue=""
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
      {/* Modal END */}
    </>
  );
};

export default EmployeeHeader2;