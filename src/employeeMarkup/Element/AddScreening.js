import React, { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { Form } from "react-bootstrap";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setScreeningQuestion,
  setSelctedScreeningQuestion,
} from "../../store/reducers/postAJobSlice";
import { login } from "../../services/AuthService";

const AddScreening = () => {
  const token = localStorage.getItem("employeeLoginToken");
  const [screeningQuestions, setScreeningQuestions] = useState([]);
  const selelctedQuestions = useSelector(
    (state) =>
      state.postAJobSlice.selectedScreeningQuestions.screen_question_keywords
  );
  const dispatch = useDispatch();
  const screeningQuestion = async () => {
    await axios({
      url: "https://apiwl.novajobs.us/api/employeer/screen-questions",
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data.screen_question_keywords, "ques");
        setScreeningQuestions(res.data.data.screen_question_keywords);
        dispatch(setScreeningQuestion(res.data.data.screen_question_keywords));
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  useEffect(() => {
    screeningQuestion();
  }, []);

  const [expanded, setExpanded] = useState({});
  useEffect(() => {
    console.log(expanded, "ofggg");
    if (Object.keys(expanded).length === 0) {
      console.log(Object.keys(expanded).length, "expanded");
      selelctedQuestions.map((item) => toggleExpansion(item.name));
    }
  }, [selelctedQuestions]);
  const toggleExpansion = (name) => {
    console.log(name, "ofggg");
    setExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  useEffect(() => {
    console.log(expanded, "expanded");
  }, [expanded]);
  return (
    <div>
      <div>
        {screeningQuestions.map(
          (category, index) => (
            console.log(category),
            (
              <div key={index}>
                {expanded[category.name] && (
                  <div>
                    {category.screen_questions.map((question, qIndex) => (
                      <div key={qIndex}>
                        <label className="mt-2">{question.name}</label>

                        {question.screen_questions_options.map((item) => (
                          <div className="custom-control custom-checkbox">
                            <label className="custom-control-label ps-4">
                              {item.option}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        {screeningQuestions.map((category, index) => (
          <div
            key={index}
            style={{ display: "inline-block", marginRight: "10px" }}>
            <button
              className="d-flex justify-content-center align-items-center"
              onClick={() => {
                console.log(expanded, "ques");
                dispatch(
                  setSelctedScreeningQuestion({
                    index: index,
                    category: category,
                  })
                );
                toggleExpansion(category.name);
              }}
              style={{
                borderRadius: "10px",
                padding: "8px 15px",
                margin: "5px",
                backgroundColor: expanded[category.name]
                  ? "#1c2957"
                  : "transparent",
                color: expanded[category.name] ? "#ffffff" : "#9d9d9d",
                border: "1px solid",
                borderColor: "#9d9d9d",
                cursor: "pointer",
                outline: "none",
              }}>
              {expanded[category.name] ? <FaCheck /> : <FaPlus />}{" "}
              <span className="ml-2">{category.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddScreening;
