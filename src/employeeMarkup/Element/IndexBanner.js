import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import "../../css/indexBanner.css";

var bnr1 = require("./../../images/main-slider/slide2.jpg");

function IndexBanner() {
  const [professionTitle, setProfessionTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const focusHandler = function () {
      this.parentElement.parentElement.classList.add("focused");
    };
    const blurHandler = function () {
      if (this.value === "") {
        this.parentElement.parentElement.classList.remove("filled");
        this.parentElement.parentElement.classList.remove("focused");
      } else {
        this.parentElement.parentElement.classList.add("filled");
      }
    };

    let inputSelector = document.querySelectorAll("input, textarea");
    inputSelector.forEach((input) => {
      input.addEventListener("focus", focusHandler);
      input.addEventListener("blur", blurHandler);
    });

    // Cleanup function similar to componentWillUnmount
    return () => {
      inputSelector.forEach((input) => {
        input.removeEventListener("focus", focusHandler);
        input.removeEventListener("blur", blurHandler);
      });
    };
  }, []);

  const handleChange = (e) => {
    localStorage.setItem("profession_title", e.target.value);
    setProfessionTitle(e.target.value);
  };

  const handleFindCandidateClick = (e) => {
    e.preventDefault();
    navigate("/employer/browse-candidates");
  };

  return (
    <div
      className="dez-bnr-inr dez-bnr-inr-md"
      style={{ backgroundImage: `url(${bnr1})` }}
    >
      <div className="container">
        <div className="dez-bnr-inr-entry align-m">
          <div className="find-job-bx ">
            <div className="d-flex align-items-center " style={{ gap: "7px" }}>
              
              <div className="hover-3d">
                <h2> An AI-Enabled 360 Degree Job Portal</h2>
              </div>
            </div>

            <h2>
              <TypeAnimation
                sequence={[
                  " Find Candidates",
                  1000,
                  "Write JD with AI",
                  1000,
                  "Post Free Jobs",
                  1000,
                  "Hire Candidates With Ease",
                  1000,
                  
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
            <form className="dezPlaceAni">
              <div className="row">
                <div className="col-lg-10 col-12 ">
                  <div className="form-group">
                    <label htmlFor="profession_title">Profession Title</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name="profession_title"
                        id="profession_title"
                        onChange={handleChange}
                        value={professionTitle}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <button
                    type="submit"
                    onClick={handleFindCandidateClick}
                    className="site-button btn-block"
                  >
                    Find Candidate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndexBanner;
