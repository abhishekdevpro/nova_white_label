import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./../Layout/Footer";
// import CountUp from "react-countup";
// import IndexBanner from "./../Element/IndexBanner";
// import Jobcategories from "./../Element/Jobcategories";
// import Featureblog from "./../Element/Featureblog";
import Jobsection from "./../Element/Jobsection";
import Owltestimonial from "./../Element/Owlblog1";
import "../../css/indexBanner.css";
import HeroSection from "./Components/Herosection";
import {
  FaRegEdit,
  FaRegFileAlt,
  FaRegFilePdf,
  FaRegUser,
  FaStar,
} from "react-icons/fa";
import PricingSection from "./Payments/PricingSection";
import UserHeader from "../Layout/Header";
import SubHeader from "../Layout/Sub-header";

// Images
var bnr2 = require("./../../images/background/bg4.jpg");

function Homepage() {
  // State to manage hover effects
  const [hoveredBox, setHoveredBox] = useState(null);
  const token = localStorage.getItem("jobSeekerLoginToken");
  const Navigate = useNavigate();

  // URL detection logic
  const isLocalhostOrNovajobs = () => {
    const currentUrl = window.location.origin;
    console.log(currentUrl, ">>>>>current url");
    return (
      currentUrl.includes("localhost") ||
      (currentUrl.includes("novajobs.us") &&
        !currentUrl.includes("hallandalebeach"))
    );
  };

  // const handleScroll = () => {
  //   window.location.href = `/employer/register-2`;
  //   window.scrollTo(0, 0);
  // };
  const handleBuilder = () => {
    if (token) {
      window.location.href = `/airesume?tokenbyurl=${token}`;
    } else {
      window.location.href = "/user/login";
    }
  };
  const handleSkillTest = () => {
    Navigate("/novajobs#tab3");
    window.scrollTo(0, 0);
  };

  const handleClick = () => {
    Navigate("/user/jobs");
    window.scrollTo(0, 0);
  };
  // console.log(<UserHeader/>,<HeroSection />,<Jobsection />
  //       , <PricingSection />);

  return (
    <div className="page-wraper">
      <UserHeader />
      <SubHeader />
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

                    <button
                      type="button"
                      onClick={handleClick}
                      className="btn text-white hoverlogo-3d"
                      style={{ backgroundColor: "#080F3A" }}
                    >
                      Apply Now
                    </button>
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
                    <Link to={"/employer/login"} style={{ color: "white" }}>
                      <button
                        type="button"
                        onClick={() => window.scrollTo(0, 0)} // Scroll to top on click
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
          <div
            className="two-box-container"
            style={{
              display: "flex",
              justifyContent: isLocalhostOrNovajobs()
                ? "space-between"
                : "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {/* Show first 3 cards for localhost or novajobs.us */}
            {isLocalhostOrNovajobs() ? (
              <>
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
                  <Link to={``}>
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
                  <div style={{ cursor: "pointer" }} onClick={handleSkillTest}>
                    <h3 className="d-flex justify-content-center">
                      <b>Give skill test</b>
                    </h3>
                    <p className="text-primary">
                      Our AI Skill test can be taken just by uploading resume.
                    </p>
                  </div>
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
                      <b>Upgrade skills</b>
                    </h3>
                    <p className="text-primary">
                      Upgrade skills with our Edtech platform.
                    </p>{" "}
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Show last 2 cards for other domains */}
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
                  <div style={{ cursor: "pointer" }} onClick={handleSkillTest}>
                    <h3 className="d-flex justify-content-center">
                      <b>SKILL TRAINING</b>
                    </h3>
                    <p className="text-primary">
                      Upgrade skills with our Edtech platform.
                    </p>
                  </div>
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
                  <div style={{ cursor: "pointer" }} onClick={handleBuilder}>
                    <h3 className="d-flex justify-content-center">
                      <b>AI RESUME BUILDER</b>
                    </h3>
                    <p className="text-primary">
                      Make your AI Resume or get it done from our Experts.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {/* <Featureblog /> */}
        <Jobsection />
        <PricingSection />

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
