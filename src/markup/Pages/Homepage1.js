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
                    <Link to={"/user/job/2"} style={{ color: "white" }}>
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
                        gap: "12px",
                      }}
                    >
                      <FaRegEdit />

                      <h3
                        style={{
                          fontSize: "17px",
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
                        fontSize: "14px",
                      }}
                    >
                      List your company, post jobs, search talent with advanced
                      filters and power of AI{" "}
                    </p>
                    <Link
                      // to={"/employee/register-2"}
                      style={{ color: "white" }}
                    >
                      <button
                        type="button"
                        class="btn btn-danger hoverlogo-3d"
                        onClick={handleScroll}
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
              // to={`https://airesume.novajobs.us/?tokenbyurl=${token}`}
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
              <Link to={"https://novajobs.us/novajobs#tab3"}>
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
              <Link to={"https://ultraaura.education/"}>
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
        <Featureblog />
        <Jobsection />
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

        <div
          className="d-flex flex-column bg-white align-items-center my-5"
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
            Our Partners
          </h2>
          <div className="two-box-container my-3">
            <div
              className="card"
              style={{
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                height: "220px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-icon">
                <img src="https://ultraaura.education/static/media/scope.e082ae7a0491759feb4b.jpg" />
              </div>
              <h3>Scope </h3>
              <p className="" style={{ fontWeight: "800" }}>
                Empowering Citizens of South Florida… Innovative education and
                employment program for a stronger Hallandale Beach  community.
              </p>
              <button class="btn btn-primary " type="button">
                Learn More
              </button>
            </div>
            <div
              className="card"
              style={{
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                height: "220px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-icon">
                <img src="https://ultraaura.education/static/media/Agi.34685fda483584baba04.jpg" />
              </div>
              <h3>AGI Tax Experts</h3>
              <p className="" style={{ fontWeight: "800" }}>
                Launch your career with AGI Tax Experts! Comprehensive training
                and placement opportunities available through our portal
              </p>
              <Link to="https://ultraaura.education/course-info/226">
                <button class="btn btn-primary " type="button">
                  Learn More
                </button>
              </Link>
            </div>

            <div
              className="card"
              style={{
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                height: "220px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-icon">
                <img src="https://idfy-eia3.vercel.app/assets/logo5-DddCxhI1.jpg" />
              </div>
              <h3>NOVA Home Care</h3>
              <p className="" style={{ fontWeight: "800" }}>
                Elevate your career with top-notch training and placement.
                Transform lives and secure your future with us.
              </p>

              <Link to="https://novahome.care/">
                <button class="btn btn-primary " type="button">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
