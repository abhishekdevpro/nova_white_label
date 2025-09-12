import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // if you’re using react-router-dom
import InterviewStep from "./InterviewStep";
import VoiceInterview from "./VoiceInterview";

const PracticeVoiceInterviewPage = () => {
  const navigate = useNavigate(); // react-router-dom replacement for next/router
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(null);

  const handleNext = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="w-100"
        style={{ maxWidth: step === 1 ? "600px" : "900px" }}
      >
        {step === 1 && (
          <div className="p-4 bg-white rounded shadow-sm">
            <InterviewStep
              onNext={handleNext}
              onBack={() => navigate("/user/jobs-profile")} // go back in history
            />
          </div>
        )}

        {step === 2 && (
          <div className="p-4 bg-white rounded shadow-sm">
            <VoiceInterview formData={formData} onBack={handleBack} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeVoiceInterviewPage;
