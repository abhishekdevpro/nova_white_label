"use client"

import { useState } from "react"
import { Modal, Tab, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setJobSeekerAnswer } from "../../store/reducers/jobApplicationScreeningQues"

function JobModal({ show, handleClose, job, onApply }) {
  const [activeTab, setActiveTab] = useState("contact-info")
  const dispatch = useDispatch()

  const handleNext = () => {
    if (activeTab === "contact-info") {
      setActiveTab("additional-info")
    } else if (activeTab === "additional-info") {
      setActiveTab("resume-info")
    } else if (activeTab === "resume-info") {
      setActiveTab("immediate-info")
    }
  }

  const handlePrev = () => {
    if (activeTab === "immediate-info") {
      setActiveTab("resume-info")
    } else if (activeTab === "resume-info") {
      setActiveTab("additional-info")
    } else if (activeTab === "additional-info") {
      setActiveTab("contact-info")
    }
  }

  if (!job) return null

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton style={{ backgroundColor: "#ffff" }} className="mt-4">
        <Modal.Title style={{ color: "#000" }}>
          <p>Apply to {job.companies?.company_name}</p>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Tab.Pane eventKey="contact-info">
          <form className="col-12 p-a0">
            {job?.screen_questions && job.screen_questions.screen_question_keywords ? (
              <div>
                <div style={{ fontSize: "20px", paddingBottom: "10px" }}>Screening questions</div>
                {job.screen_questions.screen_question_keywords.map((item, index) => (
                  <div key={index}>
                    <h4>{item.name}</h4>
                    {item.screen_questions ? (
                      <div>
                        {item.screen_questions.map((ques, questionIndex) => (
                          <div key={questionIndex} style={{ paddingBottom: "30px" }}>
                            <h5>{ques.name}</h5>
                            {ques.screen_questions_options
                              ? ques.screen_questions_options.map((option, optionIndex) => (
                                  <Form.Check
                                    key={optionIndex}
                                    type="radio"
                                    label={option.option}
                                    id={`${ques.id}-${optionIndex}`}
                                    className="site-button"
                                    name={ques.name}
                                    style={{
                                      marginRight: "30px",
                                      padding: "10px 30px",
                                    }}
                                    onClick={() => {
                                      dispatch(
                                        setJobSeekerAnswer({
                                          index: index,
                                          questionIndex: questionIndex,
                                          answer: option.option,
                                        }),
                                      )
                                    }}
                                  />
                                ))
                              : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </form>
        </Tab.Pane>
      </Modal.Body>

      <Modal.Footer>
        {activeTab !== "contact-info" && (
          <button className="site-button mr-2" onClick={handlePrev}>
            Previous
          </button>
        )}
        {activeTab === "contact-info" && (
          <button
            className="site-button"
            onClick={() => {
              handleClose()
              onApply()
            }}
          >
            Submit
          </button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default JobModal
