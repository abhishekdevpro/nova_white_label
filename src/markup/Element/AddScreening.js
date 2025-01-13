import React, { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { Form } from "react-bootstrap";

const AddScreening = () => {
  const screeningQuestions = [
    {
      name: "Education",
      questions: [
        { question: "What is your highest level of education?", type: "input" },
        {
          question:
            "Did you attend any specialized training or certification programs?",
          type: "checkbox",
        },
      ],
    },
    {
      name: "Employment History",
      questions: [
        { question: "What is your current job title?", type: "input" },
        { question: "List your previous employers.", type: "input" },
        {
          question: "What was your job role in your previous employment?",
          type: "input",
        },
      ],
    },
    {
      name: "Skills",
      questions: [
        {
          question: "What programming languages are you proficient in?",
          type: "checkbox",
        },
      ],
    },
    {
      name: "References",
      questions: [
        {
          question:
            "Please provide the contact information for your references.",
          type: "input",
        },
        {
          question: "How long have you known your primary reference?",
          type: "input",
        },
        {
          question: "Can you provide a reference from your previous employer?",
          type: "checkbox",
        },
      ],
    },
    {
      name: "Personal Information",
      questions: [
        { question: "What is your date of birth?", type: "input" },
        {
          question: "Are you legally eligible to work in this country?",
          type: "checkbox",
        },
      ],
    },
  ];

  const [expanded, setExpanded] = useState({});

  const toggleExpansion = (name) => {
    setExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div>
      <div>
        {screeningQuestions.map((category, index) => (
          <div key={index}>
            {expanded[category.name] && (
              <div>
                {category.questions.map((question, qIndex) => (
                  <div key={qIndex}>
                    <label className="mt-4">{question.question}</label>
                    {question.type === "input" ? (
                      <Form.Control type="text" />
                    ) : question.type === "checkbox" ? (
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          id={`${category.name}-${qIndex}`}
                          className="custom-control-input selectAllCheckBox"
                          name="example1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={`${category.name}-${qIndex}`}
                        ></label>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        {screeningQuestions.map((category, index) => (
          <div
            key={index}
            style={{ display: "inline-block", marginRight: "10px" }}
          >
            <button
              className="d-flex justify-content-center align-items-center"
              onClick={() => toggleExpansion(category.name)}
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
              }}
            >
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
