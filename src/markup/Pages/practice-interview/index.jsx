import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import UserHeader from "../../Layout/Header";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "./QuestionsSideBar";
import VideoRecorder from "./VideoRecorder";
import QuestionPanel from "./QuestionPanel";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

export default function PracticeInterviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordingFile, setRecordingFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [showInterview, setShowInterview] = useState(false);

  const token = localStorage.getItem("jobSeekerLoginToken");
  const { jobId } = useParams();
  const [searchParams] = useSearchParams();
  const isOnDemand = searchParams.get("on_demand");

  // ✅ Fetch questions from API
  const practiceInterview = async () => {
    setIsLoading(true);
    try {
      const API = isOnDemand ?`https://apiwl.novajobs.us/api/jobseeker/interview/ondemand/${jobId}`:`https://apiwl.novajobs.us/api/jobseeker/interview/practice/${jobId}`
      const res = await axios.get(
        API,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("Practice Questions Response:", res);
      if (res.data.code === 200 || res.data.status === "success") {
        setQuestions(res.data?.data?.questions || []);
        setInterviewId(res.data.data?.id);
        setShowInterview(true); // 👈 Show interview layout
      } else {
        toast.error("Failed to load questions.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch interview questions."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Submit current answer
  const handleSubmit = async () => {
    if (!recordingFile) return toast.warning("No recording found!");

    setIsLoading(true);
    const formData = new FormData();
    formData.append("question", questions[currentIndex].question);
    formData.append("video_file_upload", recordingFile);

    try {
      const API = isOnDemand? `https://apiwl.novajobs.us/api/jobseeker/interview/ondemand/${jobId}/${interviewId}` :`https://apiwl.novajobs.us/api/jobseeker/interview/practice/${jobId}/${interviewId}`
      const res = await axios.post(
        API,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (res.data.status === "success" && res.data.code === 200) {
        // console.log("Upload Success:", res);
        toast.success(res.data.message || "Answer submitted successfully!");
      } else {
        toast.error(res.data.message);
      }

      setRecordingFile(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        toast.success("Interview completed!");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <UserHeader />
      <Container fluid className="py-4" style={{ maxWidth: "1200px" }}>
        {!showInterview ? (
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="p-4 text-center shadow">
                <Title>{isOnDemand ? "Interview" :"Practice Interview"}</Title>
                <Description>
                  Ready to enhance your interview skills? Start a mock interview
                  session to practice common interview questions and improve
                  your confidence.
                </Description>
                <button
                  onClick={practiceInterview}
                  disabled={isLoading}
                  className="site-button"
                >
                  {isLoading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Loading...
                    </>
                  ) : (
                    isOnDemand ?"Start Interview"  :"Start Mock Interview"
                  )}
                </button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={3} className="p-3 bg-light d-none d-md-block">
              <Sidebar questions={questions} currentIndex={currentIndex} />
            </Col>
            <Col md={9} className="p-4">
              <VideoRecorder
                onRecordingComplete={setRecordingFile}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                autoStartCamera={true} // 👈 optionally auto-start camera
              />
              <QuestionPanel
                question={questions[currentIndex]}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
