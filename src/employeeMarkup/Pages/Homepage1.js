import React, { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import CountUp from "react-countup";
import IndexBanner from "./../Element/IndexBanner";
import Jobcategories from "./../Element/Jobcategories";
import Featureblog from "./../Element/Featureblog";
import Jobsection from "./../Element/Jobsection";
import Owltestimonial from "./../Element/Owlblog1";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import {
  FaRegEdit,
  FaRegFileAlt,
  FaRegFilePdf,
  FaRegUser,
  FaStar,
} from "react-icons/fa";

//Images
var bnr2 = require("./../../images/background/bg4.jpg");
var bnr3 = require("./../../images/lines.png");
function EmployeeHomepage() {

  const navigate =useNavigate();
  useEffect (()=>{

const token = localStorage.getItem('employeeLoginToken')

if(!token){
  navigate("/login");
}
  },[navigate])

  return (
    <div className="page-wraper">
      <Header />
      <div className="page-content">
        <IndexBanner />

        <div
          className="section-full p-tb70 overlay-black-dark text-white text-center bg-img-fix"
          style={{ backgroundImage: "url(" + bnr2 + ")" }}
        >
          <div className="container">
            <div className="section-head text-center text-white">
              <div className="two-box-container " style={{ color: "white" }}>
                <div className="bg-danger red-box">
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
                      List your profile, check your resume score, search jobs
                      with advance filters and power of AI
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
                      to={"/employer/register-2"}
                      style={{ color: "white" }}
                    >
                      <button type="button" class="btn btn-danger hoverlogo-3d">
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
            className="m-0 "
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
              <Link to={"/novajobs#tab1"}>
                <h3 className="d-flex justify-content-center">
                  Build AI Resume
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
              <Link to={"https://airesume.novajobs.us/form"}>
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
              <Link to={"/novajobs#tab3"}>
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
      </div>
      <Footer />
    </div>
  );
}
export default EmployeeHomepage;
