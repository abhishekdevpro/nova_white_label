import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserHeader from "../../Layout/Header";

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 0;
`;

const CardContainer = styled.div`
  max-width: 700px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(28, 41, 87, 0.1);
`;

const Title = styled.h2`
  color: #1c2957;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-align: center;
`;

const StartButton = styled.button`
  background: #1c2957;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    background: #161f40;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const QuestionCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background: #fdfdfd;
`;

const QuestionText = styled.h5`
  font-weight: 600;
  color: #1c2957;
  margin-bottom: 0.8rem;
`;

const AnswerText = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
`;

const MockInterviewPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const token = localStorage.getItem("jobSeekerLoginToken");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const practiceInterview = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://apiwl.novajobs.us/api/jobseeker/interview/practice-questions/${jobId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res, "practice Interview");
      if (res.data.code === 200 || res.data.status === "success") {
        setQuestions(res.data?.data.questions || []);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <UserHeader />
      <PageContainer>
        <div className="container">
          <CardContainer>
            {questions.length === 0 ? (
              <>
                <Title>Practice Interview</Title>
                <Description>
                  Ready to enhance your interview skills? Start a mock interview
                  session to practice common interview questions and improve your
                  confidence.
                </Description>
                <button className="site-button" onClick={practiceInterview} disabled={loading}>
                  {loading ? "Loading..." : "Start Mock Interview"}
                </button>
              </>
            ) : (
              <>
                <Title>Practice Interview Questions</Title>
                {questions.map((q, index) => (
                  <QuestionCard key={index}>
                    <QuestionText>Q{index + 1}. {q.question}</QuestionText>
                    {/* <AnswerText><strong>Expected Answer:</strong> {q.expected_answer}</AnswerText> */}
                  </QuestionCard>
                ))}
              </>
            )}
          </CardContainer>
        </div>
      </PageContainer>
    </>
  );
};

export default MockInterviewPage;
