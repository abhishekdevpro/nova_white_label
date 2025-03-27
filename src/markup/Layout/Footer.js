import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SBELogo from "../../assests/SBE-Logo.png";
import NewDBELogo from "../../assests/New-dbe-logo.png";
import india from "../../images/WhatsApp_Image_2024-05-11_at_19.51.05-removebg-preview.png";
import axios from "axios";
import { showToastError, showToastSuccess } from "../../utils/toastify";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import LogoWrapper from "./LogoWrapper";
function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [logo, setLogo] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUhQJ-44yDYIuo8Hj-L1ezQSKAkkK4CqlecQ&s"
  ); // Default logo

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      !emailPattern.test(value) ? "Please enter a valid email address." : ""
    );
  };

  const token = localStorage.getItem("jobSeekerLoginToken");
  const handleBuilder = () => {
    if (token) {
      window.location.href = `https://airesume.novajobs.us/?tokenbyurl=${token}`;
    } else {
      window.location.href = "/user/login";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) return;

    axios({
      method: "POST",
      url: "https://apiwl.novajobs.us/api/jobseeker/user-subscribe",
      data: { email },
    })
      .then((res) => {
        showToastSuccess(res?.data?.message);
        setEmail("");
      })
      .catch((err) => {
        showToastError(err?.response?.data?.message);
      });
  };

  return (
    <footer className="site-footer text-break">
      <div className="footer-top py-5">
        <div className="container">
          <div className="widget border-0">
            <div className="row row-cols-1 row-cols-md-5">
              <div className="col mb-4 mb-md-0 col-md-4">
                <div className="text-start">
                  <div className="mb-4 d-flex flex-column align-items-center text-center">
                    <LogoWrapper />
                    <b className="fw-bold mt-2">An AI-enabled Job Portal</b>
                  </div>

                  {/* <ul className="list-3 d-flex flex-column gap-2 text-break mt-4">
                    <li className="flex d-flex align-items-center justify-content-start gap-2">
                      <p>
                        <FaMapMarkerAlt className="" />
                      </p>
                      <p> P O Box 1084, Columbia, SC 29202</p>
                    </li>
                    <li className="flex d-flex align-items-center justify-content-start gap-2">
                      <p>
                        <FaEnvelope className="" />
                      </p>
                      {/* <Link to="mailto:contact@novajobs.us">Email us</Link> 
                      <p>info@novajobs.us</p>
                    </li>
                    <li className="flex d-flex align-items-center justify-content-start gap-2">
                      <p>
                        <FaEnvelope className="" />
                      </p>
                      <p>hr@novajobs.us</p>
                    </li>
                  </ul> */}
                </div>
              </div>
              <div className="col mb-4 mb-md-0 col-md-2">
                <div className="text-start">
                  <h5 className="mb-4 F-heading fw-bold text-[18px]">
                    For Job Seekers
                  </h5>
                  <ul className="list-3 d-flex flex-column gap-2 text-break">
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                       to={"/user/job/1"}
                      >
                        Search Jobs
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      to={"/user/login"}
                      >
                        Create Free account
                      </Link>
                    </li>
                    {/* <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      to={"/user/register-2"}
                      >
                        List profile
                      </Link>
                    </li> */}
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      // onClick={handleBuilder}
                      to={`/novajobs#tab2`}

                      // to={`https://airesume.novajobs.us/?tokenbyurl=${token}`}
                      >
                        Build AI resume
                      </Link>
                    </li>

                    <li>
                      <Link
                      to={"/novajobs#tab3"}
                      >
                        Skill Test
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col mb-4 mb-md-0 col-md-2">
                <div className="text-start">
                  <h5 className="mb-4 F-heading fw-bold  text-[18px]">
                    For Employers
                  </h5>
                  <ul className="list-3 d-flex flex-column gap-2 text-break">
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      to={localStorage.getItem("employeeLoginToken")?"employer/company-profile":"/employer/login"}
                      >
                        Post Jobs
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                       to={localStorage.getItem("employeeLoginToken")?"/employer/browse-candidates":"/employer/login"}
                      >
                        Browse Applicants
                      </Link>
                    </li>
                    {/* <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      //  to={"/employer/login"}
                      >
                        Schedule Interviews
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="col mb-4 mb-md-0 col-md-2">
                <div className="text-start">
                  <h5 className="mb-4 F-heading fw-bold  text-[18px]">
                    Others
                  </h5>
                  <ul className="list-3 d-flex flex-column gap-2 text-break">
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      to={"/cookies-policy"}
                      >
                        Cookies Policy
                      </Link>
                    </li>
                    <li
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <Link
                      to={"/privacy-policy"}
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col mb-4 mb-md-0 col-md-2">
                <div className="text-start">
                  <h5 className="mb-4 F-heading fw-bold  text-[18px]">
                    Company
                  </h5>
                  <ul className="list-3 d-flex flex-column gap-2 text-break">
                    <li>
                      <Link
                        to={"/aboutus"}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/services"}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/terms-and-conditions"}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                      >
                        Terms of use
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-md-end mt-4 mt-md-0">
            <ul className="list-inline d-flex text">
              <li>
                <Link
                  to={"https://www.facebook.com/Novausjobs"}
                  className="site-button white facebook circle text-white bg-primary"
                >
                  <i className="fa fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link
                  to={"https://www.linkedin.com/company/nova-us-jobs/"}
                  className="site-button white linkedin circle text-white bg-primary"
                >
                  <i className="fa fa-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span>
                © Powered by{" "}
                <img
                  src={india}
                  alt="India flag"
                  style={{ width: "40px", marginRight: "5px" }}
                />{" "}
                <strong style={{ color: "white", fontWeight: "bold" }}>
                  NovaJobs.us
                </strong>{" "}
                | All Rights Reserved
              </span>
            </div>
            {/* <div className="col-md-6 text-center text-md-end">
              <img
                src={SBELogo}
                alt="SBE Logo"
                style={{ height: "50px", marginRight: "10px" }}
              />
              <img src={NewDBELogo} alt="DBE Logo" style={{ height: "50px" }} />
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
// comment
export default Footer;
