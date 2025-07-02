
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { HelpCircle, AlertCircle, AlertTriangle } from "lucide-react";


const EmployeeQuestionsForm = ({
  formData,
  setFormData,
  errors,
  questions,
  setQuestions,
}) => {
  const { id } = useParams();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("jobSeekerLoginToken");
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/pro/job-lists/${id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setQuestions(response.data.data.screening_question_output);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      }
    };

    if (id) {
      fetchQuestions();
    }
  }, [id, setQuestions]);

  const handleChange = (e, question, index) => {
    const { value } = e.target;
    const key = `question${index + 1}`;

    setFormData((prev) => ({
      ...prev,
      [key]: {
        question: question.question,
        answer: value,
      },
    }));
  };

  return (
    <div className="container bg-white p-4 rounded shadow-sm mt-4">
      <h4 className="text-primary border-bottom pb-2 mb-4" style={{ color: "#1c2957" }}>
        Screening Questions
      </h4>

      {questions && questions.length > 0 ? (
        <div className="row">
          <div className="col-12">
            {questions.map((question, index) => (
              <div className="mb-4 p-4 bg-light border rounded" key={index}>
                <label className="form-label fw-semibold text-dark">
                  {question.question}
                </label>

                {question.description && (
                  <p className="text-muted small d-flex align-items-center">
                    <HelpCircle className="me-2" size={16} />
                    {question.description}
                  </p>
                )}

                {question.options && question.options.length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {question.options.map((option, optIndex) => (
                      <div className="form-check" key={optIndex}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question${index + 1}`}
                          id={`option-${index}-${optIndex}`}
                          value={option}
                          checked={
                            formData[`question${index + 1}`]?.answer === option
                          }
                          onChange={(e) => handleChange(e, question, index)}
                        />
                        <label
                          className="form-check-label text-secondary"
                          htmlFor={`option-${index}-${optIndex}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Type your answer here..."
                      id={`question${index + 1}`}
                      name={`question${index + 1}`}
                      value={formData[`question${index + 1}`]?.answer || ""}
                      onChange={(e) => handleChange(e, question, index)}
                    ></textarea>
                  </div>
                )}

                {errors[`question${index + 1}`] && (
                  <div className="text-danger mt-2 d-flex align-items-center">
                    <AlertCircle className="me-1" size={16} />
                    {errors[`question${index + 1}`]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="alert alert-info d-flex align-items-center">
          <AlertTriangle className="me-2" size={18} />
          No screening questions available for this position.
        </div>
      )}
    </div>
  );
};

export default EmployeeQuestionsForm;
