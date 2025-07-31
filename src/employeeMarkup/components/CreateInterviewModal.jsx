import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateInterviewModal({ show, onHide, jobId }) {
  const [isAIMode, setIsAIMode] = useState(true);
  const [questionCount, setQuestionCount] = useState(10);
  const [customQuestions, setCustomQuestions] = useState([""]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("employeeLoginToken");

  const handleQuestionChange = (index, value) => {
    const updated = [...customQuestions];
    updated[index] = value;
    setCustomQuestions(updated);
  };

  const addQuestion = () => setCustomQuestions([...customQuestions, ""]);
  const removeQuestion = (index) => {
    const updated = [...customQuestions];
    updated.splice(index, 1);
    setCustomQuestions(updated);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = isAIMode
      ? {
          is_ai_generated: true,
          ai_generated_question_count: questionCount,
        }
      : {
          is_ai_generated: false,
          custom_questions: customQuestions.filter((q) => q.trim() !== ""),
        };

    try {
      const res = await axios.post(
        `https://apiwl.novajobs.us/api/employeer/interview/ondemand/${jobId}`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data.status === "success") {
        toast.success("Interview created successfully!");
        onHide();
      } else {
        toast.error(res.data.message || "Failed to create interview.");
      }
    } catch (error) {
      console.error("Create Interview Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered >
      <div closeButton>
        <Modal.Title>Create Interview</Modal.Title>
      </div>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Interview Type</Form.Label>
            <div>
              <Form.Check
                inline
                label="AI Generated"
                name="mode"
                type="radio"
                checked={isAIMode}
                onChange={() => setIsAIMode(true)}
              />
              <Form.Check
                inline
                label="Custom Questions"
                name="mode"
                type="radio"
                checked={!isAIMode}
                onChange={() => setIsAIMode(false)}
              />
            </div>
          </Form.Group>

          {isAIMode ? (
            <Form.Group className="mb-3">
              <Form.Label>Number of AI Generated Questions</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={50}
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              />
            </Form.Group>
          ) : (
            <div>
              <Form.Label>Custom Questions</Form.Label>
              {customQuestions.map((q, idx) => (
                <Row key={idx} className="mb-2 align-items-center">
                  <Col xs={10}>
                    <Form.Control
                      type="text"
                      placeholder={`Question ${idx + 1}`}
                      value={q}
                      onChange={(e) => handleQuestionChange(idx, e.target.value)}
                    />
                  </Col>
                  <Col xs={2}>
                    {idx > 0 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeQuestion(idx)}
                      >
                        Remove
                      </Button>
                    )}
                  </Col>
                </Row>
              ))}
              <Button variant="secondary" size="sm" onClick={addQuestion}>
                + Add Question
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Interview"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
