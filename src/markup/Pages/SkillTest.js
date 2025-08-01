import React, { useEffect, useState } from "react";
import Header2 from "./../Layout/Header2";
import Footer from "./../Layout/Footer";
import Profilesidebar from "./../Element/Profilesidebar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import FixedHeader from "../Layout/fixedHeader";
import axios from "axios";

import { setSkillTestQuestions } from "../../store/reducers/skillTestQuestionsSlice";
import "./skilltest.css";
import { useDispatch } from "react-redux";
import LoadingBox from "../skeleton/skillTestSkeleton";
import Preloader from "../Layout/preloader";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function SkillTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [skeleton, setSkeleton] = useState(true);
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [popupText, setPopupText] = useState(""); // State for popup text
  const [showLimitModal, setShowLimitModal] = useState(false);

  const [userPercentage, setUserPercentage] = useState(0);
  const getSkillTestQuestion = async (id, name) => {
    await axios({
      method: "get",
      url: `https://apiwl.novajobs.us/api/user/skill-assessment?skill_id=${id}&skill_name=${name}`,
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data.data, "sktQ");
        setLoader(false);
        navigate("/user/education-page");
        dispatch(setSkillTestQuestions(response.data.data));
      })
      .catch((err) => {
        console.log(err.response.data.data);
        setLoader(false);

        // Check if error status is 403
        if (err.response && err.response.status === 403) {
          // Show the limit exhausted modal
          toast.error(
            err.response.message || "Limit Exhausted Upgared Your plan!"
          );
          setShowLimitModal(true);
          // showLimitExhaustedModal();
        }
      });
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/user/user-skills",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data.data, "resume data");
        setCardData(response.data.data);

        setSkeleton(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleViewDetails = (card) => {
    setSelectedCard(card);
  };
  const [loader, setLoader] = useState(false);

  const handleButtonClick = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
    // You can set the popup text here based on your requirement
    setPopupText(`${card.name}`);
  };
  const handleTakeTest = (card) => {
    setShowPopup(false);
    setLoader(true);
    getSkillTestQuestion(card.id, card.name);
  };

  return (
    <>
      {loader === true ? (
        <h1>
          {/* Please Wait for While... */}
          <LoadingBox />
          {/*   <Preloader /> */}
        </h1>
      ) : (
        <div>
          <Header2 />
          <FixedHeader />

          <div className="page-content bg-white">
            <div className="content-block">
              <div className="section-full bg-white browse-job p-t50 p-b20">
                <div className="container">
                  <div className="row">
                    <Profilesidebar data={"skill-test"} />
                    <div className="col-xl-9 col-12 m-b30">
                      <div
                        className="job-bx job-profile"
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        {skeleton === true ? (
                          <h1>
                            Please upload the Resume then check back...
                            {/*   <Preloader /> */}
                            <Loader2 className="w-5 h-5 animate-spin" />
                          </h1>
                        ) : (
                          <div className="row">
                            <div className="job-bx-title  clearfix">
                              <h5 className="font-weight-800 pull-left text-uppercase ms-3">
                                Skill Test
                              </h5>
                            </div>
                           <div className="row" style={{maxHeight: 'calc(100vh)', overflowY: 'auto', scrollbarWidth:"none"}}>
                             {cardData.map((card, index) => (
                              <div
                                key={index}
                                 className="col-xl-6 col-12 mb-4"
                              >
                                <div
                                  className=" card border rounded-4"
                                  style={{
                                    boxShadow: "0 4px 8px rgba(1,1,1,0.1)",
                                    height: "250px",
                                    width:"100%",
                                    // maxWidth: "350px",
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                    alignItem: "centre",
                                  }}
                                >
                                  <div
                                    className="card-body text-center"
                                    style={{ transition: "box-shadow 0.3s" }}
                                  >
                                    {/* <h5 className="btn site-button border bg-primary-subtle fw-bold mb-3">
                                      {card.name}
                                    </h5> */}
                                    <h5 className="btn site-button border bg-primary-subtle fw-bold mb-3">
                                      {card.name.length > 20
                                        ? card.name.slice(0, 20) + "..."
                                        : card.name}
                                    </h5>

                                    <p className="card-text">{card.text}</p>

                                    <div
                                      className="d-flex flex-wrap  align-items-center justify-content-center "
                                      style={{ gap: "3px" }}
                                    >
                                      <h3
                                        style={{
                                          fontWeight: "400",
                                          fontSize: "16px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        Total Questions :{" "}
                                        <span style={{ fontWeight: "200" }}>
                                          {
                                            card.skill_assessment.results
                                              .total_question
                                          }
                                        </span>
                                      </h3>
                                      <h3
                                        style={{
                                          fontWeight: "400",
                                          fontSize: "16px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        Right Answers :{" "}
                                        <span style={{ fontWeight: "400" }}>
                                          {
                                            card.skill_assessment.results
                                              .right_answer
                                          }
                                        </span>
                                      </h3>
                                      <h3
                                        style={{
                                          fontWeight: "400",
                                          fontSize: "16px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        Wrong Answers :{" "}
                                        <span style={{ fontWeight: "400" }}>
                                          {
                                            card.skill_assessment.results
                                              .wrong_answer
                                          }
                                        </span>
                                      </h3>
                                      <br />
                                      <h3
                                        style={{
                                          fontWeight: "400",
                                          fontSize: "16px",
                                          marginBottom: "0px",
                                        }}
                                      >
                                        Percentage :{" "}
                                        <span style={{ fontWeight: "400" }}>
                                          {Math.floor(
                                            card.skill_assessment.results
                                              .Percentage
                                          ) || "0"}
                                        </span>
                                      </h3>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-center align-items-center gap-4">
                                      <button
                                        onClick={() => handleButtonClick(card)}
                                        className="btn site-button border bg-primary-subtle"
                                      >
                                        Take Test
                                      </button>
                                      {userPercentage > 65 ? (
                                        <button
                                          onClick={() =>
                                            handleButtonClick(card)
                                          }
                                          className="btn site-button border bg-primary-subtle"
                                        >
                                          Badge
                                        </button>
                                      ) : (
                                        <button
                                          className="btn site-button border bg-primary-subtle"
                                          disabled
                                          style={{ opacity: 0.6 }}
                                        >
                                          Get Badge
                                        </button>
                                      )}

                                      {/* <button
                                  className="btn site-button ml-2"
                                  onClick={() => handleViewDetails(card)}>
                                  View Details
                                </button> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
          {showPopup && (
            <div
              className="modal d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                overflow: "auto", // allow scrolling in case modal height exceeds viewport
              }}
            >
              <div
                className="modal-content bg-white rounded shadow"
                style={{
                  width: "90%",
                  maxWidth: "600px",
                  margin: "40px auto", // spacing from top on mobile
                  maxHeight: "90vh", // don't exceed screen height
                  overflowY: "auto", // scroll only the content
                  padding: "1.5rem",
                }}
              >
                {/* Modal Title */}
                <h5 className="text-center fw-bold mb-3">
                  Test Instructions for <strong>{popupText}</strong>
                  <br />
                  <small className="fw-normal d-block mt-2 text-muted">
                    Following instructions are common for all job seekers.
                  </small>
                </h5>

                {/* Instructions */}
                <p
                  className="text-start text-muted"
                  style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                >
                  1. The duration of the test is 10 minutes*. Your answer gets
                  automatically submitted after 20 minutes*.
                  <br />
                  2. This test consists of 15* multiple-choice questions.
                  <br />
                  3. You may attempt the questions in any order.
                  <br />
                  4. Please select the correct answer and click the "Save and
                  next" button.
                  <br />
                  5. Please click "Skip" if you wish to skip a question. You may
                  come back and answer the question later.
                  <br />
                  6. Please click on the "Submit Assessment" button after
                  answering all the questions.
                  <br />
                  7. Do not close the window before submitting the test.
                  <br />
                  8. Tests will be automatically submitted after the given time
                  limit.
                </p>

                {/* Action Buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-4">
                  <button
                    onClick={() => handleTakeTest(selectedCard)}
                    className="site-button w-100"
                  >
                    Take Test
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="site-button bg-danger w-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {showLimitModal && (
            <div
              className="modal d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1050,
              }}
            >
              <div
                className="modal-content text-center bg-white rounded shadow p-4"
                style={{
                  width: "90%",
                  maxWidth: "400px", // Responsive max-width for small to large screens
                }}
              >
                {/* Header Icon and Title */}
                <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                  <AlertCircleIcon
                    className="text-danger"
                    style={{ width: "24px", height: "24px" }}
                  />
                  <h5 className="fw-bold mb-0">Limit Exhausted</h5>
                </div>

                {/* Message */}
                <p className="text-muted mb-4">
                  You have reached your skill assessment limit. Please upgrade
                  your plan to continue taking skill tests.
                </p>

                {/* Buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                  <button
                    className="site-button"
                    onClick={() => setShowLimitModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="site-button"
                    onClick={() => navigate("/user/payment-plans")}
                  >
                    <i className="fas fa-crown me-2"></i>
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {selectedCard && (
            <div
              className="modal"
              style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div
                className="modal-content text-center"
                style={{
                  width: "25%",
                  margin: "auto",
                  marginTop: "100px",
                  background: "#fff",
                  padding: "30px",
                }}
              >
                <h5 className="mb-2">
                  Are you sure you want to close?{selectedCard.title}
                </h5>
                <p>{selectedCard.text}</p>
                <button
                  className="btn site-button"
                  onClick={() => setSelectedCard(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )} */}
        </div>
      )}
    </>
  );
}

export default SkillTest;
