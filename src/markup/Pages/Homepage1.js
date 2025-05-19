import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import CountUp from "react-countup";
import IndexBanner from "./../Element/IndexBanner";
import Jobcategories from "./../Element/Jobcategories";
import Featureblog from "./../Element/Featureblog";
import Jobsection from "./../Element/Jobsection";
import Owltestimonial from "./../Element/Owlblog1";
import "../../css/indexBanner.css";
import HeroSection from "./Components/Herosection";
import {
  FaEdit,
  FaFileAlt,
  FaPen,
  FaRegEdit,
  FaRegFile,
  FaRegFileAlt,
  FaRegFileArchive,
  FaRegFilePdf,
  FaRegUser,
  FaStar,
} from "react-icons/fa";
import PricingSection from "./Payments/PricingSection";

// Images
var bnr2 = require("./../../images/background/bg4.jpg");

function Homepage() {
  // State to manage hover effects
  const [hoveredBox, setHoveredBox] = useState(null);
  const token = localStorage.getItem("jobSeekerLoginToken");
  const navigate = useNavigate();
  const handleScroll = () => {
    window.location.href = `/employer/register-2`;
    window.scrollTo(0, 0);
  };
  const handleBuilder = () => {
    if (token) {
      window.location.href = `https://airesume.novajobs.us/?tokenbyurl=${token}`;
    } else {
      window.location.href = "/user/login";
    }
  };
  return (
    <div className="page-wraper">
      <Header />
      <div className="page-content">
        <HeroSection />
        {/* <IndexBanner /> */}
        <div
          className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix"
          style={{ backgroundImage: "url(" + bnr2 + ")" }}
        >
          <div className="container">
            <div className="section-head text-center text-white">
              <div className="two-box-container" style={{ color: "white" }}>
                <div
                  className="bg-danger red-box"
                  onMouseEnter={() => setHoveredBox("red")}
                  onMouseLeave={() => setHoveredBox(null)}
                  style={{
                    backgroundColor:
                      hoveredBox === "red" ? "#ff6b6b" : "#d9534f", // Change color on hover
                    transition: "background-color 0.3s ease",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow:
                      hoveredBox === "red"
                        ? "0 4px 8px rgba(0,0,0,0.2)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <FaStar />
                      <h3
                        style={{
                          fontSize: "17px",
                          color: "white",
                          fontWeight: "600",
                          marginBottom: "0px",
                        }}
                      >
                        Looking For a Job
                      </h3>
                    </div>
                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontSize: "14px",
                      }}
                    >
                      Search Jobs with advanced filters and the power of AI
                    </p>
                    <Link
                       to={"/user/login"}
                      style={{ color: "white" }}
                    >
                      <button
                        type="button"
                        className="btn text-white hoverlogo-3d"
                        style={{ backgroundColor: "#080F3A" }}
                      >
                        Apply Now
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="blue-box">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <FaRegEdit />

                      <h3
                        style={{
                          fontSize: "15px",
                          color: "white",
                          fontWeight: "600",
                          marginBottom: "0px",
                        }}
                      >
                        Are you an Employer?
                      </h3>
                    </div>

                    <p
                      style={{
                        margin: "0px",
                        padding: "0px",
                        fontSize: "11px",
                      }}
                    >
                      List your company, post jobs, search talent with advanced
                      filters and power of AI{" "}
                    </p>
                    <Link
                      to={"/employer/login"}
                      style={{ color: "white" }}
                    >
                      <button
                        type="button"
                        class="btn btn-danger hoverlogo-3d"
                        // onClick={handleScroll}
                      >
                        Search Talent
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column bg-white align-items-center"
          style={{ gap: "20px", padding: "20px" }}
        >
          <h2
            className="m-0"
            style={{
              fontSize: "28px",
              fontWeight: "600",
              lineHeight: "1.3em",
              textAlign: "center",
              color: "#09213c",
            }}
          >
            Why choose us,
            <br />
            among other Job sites.
          </h2>
          <div className="two-box-container">
            <div
              className="card"
              style={{
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-icon">
                <FaRegFileAlt />
              </div>
              <Link
              to={`/novajobs#tab2`}
              >
                <h3
                  onClick={handleBuilder}
                  className="d-flex justify-content-center"
                >
                  <b>Build AI Resume</b>
                </h3>
                <p className="text-primary">
                  Make your AI Resume or get it done from our Experts.
                </p>
              </Link>
            </div>

            <div
              className="card"
              style={{
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-icon">
                <FaRegFilePdf />
              </div>
              <Link
              to={"/novajobs#tab3"}
              >
                <h3 className="d-flex justify-content-center">
                  <b>Give skill test</b>
                </h3>
                <p className="text-primary">
                  Our AI Skill test can be taken just by uploading resume.
                </p>
              </Link>
            </div>

            <div
              className="card"
              style={{
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-icon">
                <FaRegUser />
              </div>
              <Link
              to={"https://ultraaura.education/"}
              >
                <h3 className="d-flex justify-content-center">
                  <b>Enhance Skills</b>
                </h3>
                <p className="text-primary">
                  Enhance skills with our Edtech platform.
                </p>{" "}
              </Link>
            </div>
          </div>
        </div>
        {/* <Featureblog /> */}
        <Jobsection />
         <PricingSection />
        {/* Pricing Plans Section */}
        {/* <div className="section-full p-tb70 bg-white">
          <div className="container">
            <div className="section-head text-center">
              <h2 className="m-b5" style={{ 
                position: 'relative',
                display: 'inline-block',
                paddingBottom: '10px',
                color: '#09213c',
                fontWeight: '600'
              }}>
                Choose Your Perfect Plan
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '120px',
                  height: '4px',
                  backgroundColor: '#09213c',
                  borderRadius: '2px'
                }}></span>
              </h2>
              <p className="m-b0" style={{ color: '#09213c', fontSize: '16px' }}>Select the plan that best fits your needs</p>
            </div>
            <div className="row justify-content-center pricing-row" style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'flex-start', gap: '24px', paddingBottom: '10px', width: '100%', margin: '0 auto', overflowX: 'hidden' }}>
              {/* Freemium Plan 
              <div className="col-lg-4 col-md-6 col-sm-10 mb-4 d-flex align-items-stretch" style={{ flex: '1 1 22%', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'stretch' }}>
                <div className="pricing-box w-100" style={{
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(9,33,60,0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(9,33,60,0.1)',
                  width: '100%'
                }}>
                  <div className="pricing-header text-center">
                    <h3 className="m-b0" style={{ color: '#09213c', fontWeight: '600', fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>Freemium</h3>
                    <div className="price" style={{ margin: '20px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px' }}>
                      <h2 className="m-b0" style={{ color: '#09213c', fontWeight: '700', fontSize: 'clamp(2rem,5vw,2.5rem)', margin: 0 }}>$0</h2>
                      <span style={{ color: '#09213c', opacity: '0.7', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 500, marginBottom: '4px' }}>/mo</span>
                    </div>
                  </div>
                  <div className="pricing-features" style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Job Search
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Job Apply
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> AI Dashboard
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Limited AI Resume Builder
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Access to Free Courses
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Profile Listing
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer text-center mt-4">
                    <Link to="https://airesume.novajobs.us/settings/subscription" className="site-button button-sm w-100" style={{ backgroundColor: '#09213c', borderColor: '#09213c', fontSize: 'clamp(1rem,2vw,1.1rem)' }}>
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              {/* Elevate Plan 
              <div className="col-lg-4 col-md-6 col-sm-10 mb-4 d-flex align-items-stretch" style={{ flex: '1 1 22%', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'stretch' }}>
                <div className="pricing-box w-100" style={{
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(9,33,60,0.15)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '2px solid #09213c',
                  transform: 'scale(1.05)',
                  backgroundColor: 'rgba(9,33,60,0.02)',
                  width: '100%'
                }}>
                  <div className="pricing-header text-center">
                    <h3 className="m-b0" style={{ color: '#09213c', fontWeight: '600', fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>Elevate</h3>
                    <div className="price" style={{ margin: '20px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px' }}>
                      <h2 className="m-b0" style={{ color: '#09213c', fontWeight: '700', fontSize: 'clamp(2rem,5vw,2.5rem)', margin: 0 }}>$18.95</h2>
                      <span style={{ color: '#09213c', opacity: '0.7', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 500, marginBottom: '4px' }}>/mo</span>
                    </div>
                  </div>
                  <div className="pricing-features" style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Everything in Freemium
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Advanced Job Search
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Advanced AI Resume Builder
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Access to Advanced Courses
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> AI Skill Test
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer text-center mt-4">
                    <Link to="https://airesume.novajobs.us/settings/subscription" className="site-button button-sm w-100" style={{ backgroundColor: '#09213c', borderColor: '#09213c', fontSize: 'clamp(1rem,2vw,1.1rem)' }}>
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pro Max Plan 
              <div className="col-lg-4 col-md-6 col-sm-10 mb-4 d-flex align-items-stretch" style={{ flex: '1 1 22%', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'stretch' }}>
                <div className="pricing-box w-100" style={{
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(9,33,60,0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid rgba(9,33,60,0.1)',
                  width: '100%'
                }}>
                  <div className="pricing-header text-center">
                    <h3 className="m-b0" style={{ color: '#09213c', fontWeight: '600', fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>Pro Max</h3>
                    <div className="price" style={{ margin: '20px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px' }}>
                      <h2 className="m-b0" style={{ color: '#09213c', fontWeight: '700', fontSize: 'clamp(2rem,5vw,2.5rem)', margin: 0 }}>$48.95</h2>
                      <span style={{ color: '#09213c', opacity: '0.7', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 500, marginBottom: '4px' }}>/mo</span>
                    </div>
                  </div>
                  <div className="pricing-features" style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Everything in Elevate
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Career coach interactions 
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(9,33,60,0.1)' }}>
                        <i className="fa fa-check" style={{ color: '#09213c', marginRight: '10px' }}></i> Certification included
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer text-center mt-4">
                    <Link to="https://airesume.novajobs.us/settings/subscription" className="site-button button-sm w-100" style={{ backgroundColor: '#09213c', borderColor: '#09213c', fontSize: 'clamp(1rem,2vw,1.1rem)' }}>
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>

              {/* Ultra Elite Plan 
              <div className="col-lg-4 col-md-6 col-sm-10 mb-4 d-flex align-items-stretch" style={{ flex: '1 1 22%', minWidth: '260px', maxWidth: '300px', display: 'flex', alignItems: 'stretch' }}>
                <div className="pricing-box w-100" style={{
                  padding: '30px',
                  borderRadius: '10px',
                  boxShadow: '0 0 20px rgba(9,33,60,0.18)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '2px solid #183153',
                  backgroundColor: '#183153',
                  color: 'white',
                  width: '100%'
                }}>
                  <div className="pricing-header text-center">
                    <h3 className="m-b0" style={{ color: 'white', fontWeight: '700', fontSize: 'clamp(1.2rem,2vw,1.5rem)' }}>Ultra Elite</h3>
                    <div className="price" style={{ margin: '20px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '6px' }}>
                      <h2 className="m-b0" style={{ color: 'white', fontWeight: '700', fontSize: 'clamp(2rem,5vw,2.5rem)', margin: 0 }}>$98.95</h2>
                      <span style={{ color: 'white', opacity: '0.8', fontSize: 'clamp(1rem,2vw,1.3rem)', fontWeight: 500, marginBottom: '4px' }}>/mo</span>
                    </div>
                  </div>
                  <div className="pricing-features" style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                        <i className="fa fa-check" style={{ color: 'white', marginRight: '10px' }}></i> Everything in Pro Max
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                        <i className="fa fa-check" style={{ color: 'white', marginRight: '10px' }}></i> Trainer access (as needed)
                      </li>
                      <li style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                        <i className="fa fa-check" style={{ color: 'white', marginRight: '10px' }}></i> Certification included (after course request & eligibility)
                      </li>
                    </ul>
                  </div>
                  <div className="pricing-footer text-center mt-4">
                    <Link to="https://airesume.novajobs.us/settings/subscription" className="site-button button-sm w-100" style={{ backgroundColor: '#0a1a36', borderColor: '#0a1a36', fontSize: 'clamp(1rem,2vw,1.1rem)', color: 'white' }}>
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div
          className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix"
          style={{ backgroundImage: "url(" + bnr2 + ")" }}
        >
          <div className="container">
            <div className="section-head text-center text-white">
              <h2 className="m-b5">Testimonials</h2>
            </div>
            <Owltestimonial />
          </div>
        </div>

      
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
