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
import LoadingBox from "../skeleton/skillTest";
import Preloader from "../Layout/preloader";

function SkillTest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [skeleton, setSkeleton] = useState(true);
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [popupText, setPopupText] = useState(""); // State for popup text

  const [userPercentage, setUserPercentage] = useState(0);
  const getSkillTestQuestion = async (id, name) => {
    await axios({
      method: "get",
      url: `https://api.novajobs.us/api/user/skill-assessment?skill_id=${id}&skill_name=${name}`,
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
      .catch((err) => console.log(err));
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.novajobs.us/api/user/user-skills",
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
          Please Wait for While...
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
                    <div className="col-xl-9 col-lg-9 m-b30 mx-2">
                      <div className="job-bx job-profile">
                        {skeleton === true ? (
                          <h1>
                            Please upload the Resume then check back...
                            {/*   <Preloader /> */}
                          </h1>
                        ) : (
                          <div className="row">
                            <div className="job-bx-title  clearfix">
                              <h5 className="font-weight-800 pull-left text-uppercase ms-3">
                                Skill Test
                              </h5>
                            </div>
                            {cardData.map((card, index) => (
                              <div
                                key={index}
                                className="col-lg-6 col-sm-12 col-md-6 col-12 mb-4"
                              >
                                <div
                                  className=" card border rounded-4"
                                  style={{
                                    boxShadow: "0 4px 8px rgba(1,1,1,0.1)",
                                    height: "250px",
                                    width: "350px",
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
                                    <h5 className="btn site-button border bg-primary-subtle fw-bold mb-3">
                                      {card.name}
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
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
              }}
            >
              <div
                className="modal-content "
                style={{
                  width: "50%",
                  margin: "auto",
                  marginTop: "100px",
                  background: "#fff",
                  padding: "50px",
                  borderRadius: "8px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                }}
              >
                <h5 className="text-center">
                  {" "}
                  Test Instructions for<strong> {popupText}</strong>
                  <br />
                  Following instructions are common for all job seekers. <br />
                </h5>
                <p className="fs-semibold">
                  1. The duration of the test is 10 minutes*.
                  <br /> Your answer gets automatically submitted after 20
                  minutes*. <br />
                  2. This test consists of 15* multiple - choice questions.{" "}
                  <br />
                  3.You may attempt the questions in any order. <br />
                  4. Please select the correct answer and click the "Save and
                  next" button. <br />
                  5. Please click "skip" if you wish to skip a question. <br />
                  You may come back and answer the question later. <br />
                  6. Please click on the "Submit Assessment" button after
                  answering all the questions. <br />
                  7. Do not close the window before submitting the test. <br />
                  8. Tests will be automatically submitted after the given time
                  limit. <br />
                </p>

                <div className="mt-3 text-center">
                  <button
                    onClick={() => handleTakeTest(selectedCard)}
                    className="btn site-button btn btn-secondary me-2"
                  >
                    Take Test
                  </button>
                  <button
                    onClick={() => setShowPopup(false)}
                    className="btn site-button btn-danger"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {selectedCard && (
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
          )}
        </div>
      )}
    </>
  );
}

export default SkillTest;
