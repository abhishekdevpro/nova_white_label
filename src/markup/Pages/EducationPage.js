import React, { useEffect, useState } from "react";
import Header from "./../Layout/Header";
import Footer from "../Layout/Footer";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { setUserAnswer } from "../../store/reducers/skillTestQuestionsSlice";
import { useDispatch } from "react-redux";
import { useTimer } from "react-timer-hook";
import { submit } from "redux-form";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import resultImage from "../../images/result/result.avif";
function EducationPage() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(600);

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          submitTest();
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  const token = localStorage.getItem("jobSeekerLoginToken");

  const conversations = useSelector(
    (state) => state.skillTestQuestionSlice.skillTestQuestions.questions
  );
  const skill_assessment_id = useSelector(
    (state) =>
      state.skillTestQuestionSlice.skillTestQuestions.skill_assessment_id
  );
  const body = useSelector(
    (state) => state.skillTestQuestionSlice.skillTestQuestions
  );

  const conversationsLen = conversations.length;

  const submitTest = async () => {
    await axios({
      url: `https://api.novajobs.us/api/user/skill-assessment/${skill_assessment_id}`,
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      },
      data: body,
    })
      .then((res) => {
        console.log(res.data.data.results, "submit test");
        setResults(res.data.data.results || []);
        setShowResults(true);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  };

  const [currentConversation, setCurrentConversation] = useState(1);

  const currentConversationObj = conversations[currentConversation];
  const currentConversationName = currentConversationObj?.question;
  console.log(currentConversationObj);
  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              {showResults ? (
                <div className="w-100 bg-white d-flex justify-content-center align-items-center ">
                  <div
                    className="w-75 d-flex flex-column align-items-center "
                    style={{ gap: "12px" }}
                  >
                    <img
                      src={resultImage}
                      alt="resultimage"
                      style={{ width: "350px" }}
                    />
                    <div
                      className="row align-items-center justify-content-center "
                      style={{ gap: "12px" }}
                    >
                      <h3 style={{ fontWeight: "600" }}>
                        Total Questions :{" "}
                        <span style={{ fontWeight: "400" }}>
                          {results.total_question}
                        </span>
                      </h3>
                      <h3 style={{ fontWeight: "600" }}>
                        Right Answer :{" "}
                        <span style={{ fontWeight: "400" }}>
                          {results.right_answer}
                        </span>
                      </h3>
                      <h3 style={{ fontWeight: "600" }}>
                        Wrong Answer :{" "}
                        <span style={{ fontWeight: "400" }}>
                          {results.wrong_answer}
                        </span>
                      </h3>
                      <h3 style={{ fontWeight: "600" }}>
                        Percentage :{" "}
                        <span style={{ fontWeight: "400" }}>
                          {Math.floor(results.Percentage)}%
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-xl-4 col-lg-5 m-b30">
                    <div className="sticky-top">
                      <div className="candidate-info company-info">
                        <div className="candidate-detail text-center">
                          <div className="candidate-title">
                            <h4 className="m-b5">
                              <div style={{ textAlign: "center" }}>
                                {`${Math.floor(time / 60)}`.padStart(2, 0)}:
                                {`${time % 60}`.padStart(2, 0)}
                              </div>
                            </h4>
                          </div>
                        </div>

                        <ul
                          className="job-list-container"
                          style={{
                            maxHeight: "calc(100vh - 200px)",
                            overflowY: "auto",
                          }}
                        >
                          {conversations.map(
                            (item, index) => (
                              console.log(conversations),
                              (
                                <li key={index}>
                                  <Link
                                    to={"#"}
                                    className={`conversation-item ${
                                      index === currentConversation
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() =>
                                      setCurrentConversation(index)
                                    }
                                  >
                                    <h6 className="mb-0">
                                      {index + 1}: {item.question}
                                    </h6>
                                  </Link>
                                </li>
                              )
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-7 m-b30">
                    <div
                      className="job-bx submit-resume "
                      style={{ padding: "100px 35px" }}
                    >
                      <h4>
                        {currentConversation + 1}: {currentConversationName}
                      </h4>
                      <Form>
                        <Form.Group>
                          <div className="align-items-center">
                            {currentConversationObj.options.map(
                              (item, index) => (
                                <div
                                  className="bg-light p-3"
                                  style={{
                                    display: "block",
                                    marginTop: "10px",
                                  }}
                                >
                                  <Form.Check
                                    type="radio"
                                    key={index}
                                    label={item}
                                    checked={
                                      conversations[currentConversation]
                                        .user_answer === item
                                    }
                                    className="p-10"
                                    name={`question-${currentConversation}`}
                                    onClick={() => {
                                      console.log(
                                        `Selected item ${item} for question ${currentConversation}`
                                      );
                                      dispatch(
                                        setUserAnswer({
                                          index: currentConversation,
                                          answer: item,
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </Form.Group>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {currentConversation !== 0 ? (
                            <button
                              className="site-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentConversation(currentConversation - 1);
                              }}
                            >
                              {" "}
                              Previous
                            </button>
                          ) : null}

                          {conversationsLen - 1 !==
                          currentConversation ? null : (
                            <button
                              className="site-button"
                              onClick={(e) => {
                                e.preventDefault();
                                submitTest();
                              }}
                            >
                              {" "}
                              Submit
                            </button>
                          )}
                          {conversationsLen - 1 !== currentConversation ? (
                            <button
                              className="site-button"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentConversation(currentConversation + 1);
                              }}
                            >
                              {" "}
                              Next
                            </button>
                          ) : null}
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EducationPage;
