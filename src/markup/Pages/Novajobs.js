import React, { useState, useEffect } from "react";
import Header from "./../Layout/Header";

import "./aboutus.css";
import { Link } from "react-router-dom";
import Footer from "../Layout/Footer";

function Novajobs() {
  const [activeTab, setActiveTab] = useState("tab1");

  // Set the active tab based on the URL hash when the component mounts
  useEffect(() => {
    const hash = window.location.hash.replace("#", ""); // Get the hash without the #
    if (hash && ["tab1", "tab2", "tab3"].includes(hash)) {
      setActiveTab(hash); // Set active tab based on hash
    }
  }, []);

  // Update the URL hash when the user changes the tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab; // Update the hash in the URL
  };

  // Function to render content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div className="p-4">
            <h4 className="mb-4">
              Follow these simple steps to check your resume score on
              NovaJobs.us:
            </h4>
            <ol>
              <li>
                Upload Existing Resume: Upload your existing resume on the
                platform and click on the "Resume Score" option to instantly
                receive a percentage score that evaluates your resume.
              </li>
              <li className="py-4">
                Build Resume from Scratch: If you don't have a resume, use our
                resume builder to create one. Once completed, go to the Download
                section and click on "Resume Score" to get your evaluation.
              </li>
              <li>
                Download Your Resume: After checking the score, make
                improvements if necessary and download your resume for job
                applications.
              </li>
            </ol>
          </div>
        );
      case "tab2":
        return (
          <div className="p-4">
            <h4 className="mb-4">
              Follow these simple steps to check your resume score on
              NovaJobs.us:
            </h4>
            <ol>
              <li>
                Upload Existing Resume: Upload your existing resume on the
                platform and click on the "Resume Score" option to instantly
                receive a percentage score that evaluates your resume.
              </li>
              <li className="py-4">
                Build Resume from Scratch: If you don't have a resume, use our
                resume builder to create one. Once completed, go to the Download
                section and click on "Resume Score" to get your evaluation.
              </li>
              <li>
                Download Your Resume: After checking the score, make
                improvements if necessary and download your resume for job
                applications.
              </li>
            </ol>
            <Link to={"/user/login"}>
              <button className="nav-link site-button">
                Create Your Account to Get Started Now
              </button>
            </Link>
          </div>
        );
      case "tab3":
        return (
          <div className="p-4">
            <h4 className="mb-4">
              Follow these steps to use the AI Skill Testing Tool on
              NovaJobs.us:
            </h4>
            <ol>
              <li>
                Upload Your Resume: First, upload your resume to the platform.
                Our AI will automatically extract the skills listed in your
                resume.
              </li>
              <li className="py-4">
                Start Skill Test: Once the skills are fetched, you'll be given
                the option to start a test based on your skills.
              </li>
              <li>
                Complete the Test: Take the AI-driven skill test to evaluate
                your proficiency in the skills listed.
              </li>
              <li className="py-4">
                Receive Your Score: After completing the test, you will receive
                a percentage score reflecting your performance, which you can
                use to improve your profile.
              </li>
            </ol>

            <Link to={"/user/login"}>
              <button className="nav-link site-button">
                Create Your Account to Get Started Now
              </button>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="page-content bg-light">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="m-b30">
                <div className="job-bx shadow-lg p-4 bg-white rounded">
                  <div className="">
                    {/* Tabs */}
                    <ul className="nav nav-tabs justify-content-center mb-4">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "tab1" ? "active" : ""
                          }`}
                          style={{ fontWeight: "600", fontSize: "18px" }}
                          onClick={() => handleTabChange("tab1")}
                        >
                          Check Resume Score
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "tab2" ? "active" : ""
                          }`}
                          style={{ fontWeight: "600", fontSize: "18px" }}
                          onClick={() => handleTabChange("tab2")}
                        >
                          Build Your AI Resume
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            activeTab === "tab3" ? "active" : ""
                          }`}
                          style={{ fontWeight: "600", fontSize: "18px" }}
                          onClick={() => handleTabChange("tab3")}
                        >
                          Check AI Skill Testing Tool
                        </button>
                      </li>
                    </ul>

                    {/* Tab content */}
                    <div className="tab-content p-4 border rounded shadow-sm">
                      {renderTabContent()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Novajobs;
