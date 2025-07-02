import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonalInfoForm from "./PersonalForm";
import EmployeeQuestionsForm from "./EmployeeQuestions";
import ReviewForm from "./ReviewFrom";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";
import styled from "styled-components";
import { CheckCircle, HelpCircle, User } from "lucide-react";

const FormContainer = styled.div`
  background: white;
  min-height: 100vh;
  padding: 2rem 0;
`;

const FormCard = styled.div`
  background: #fff;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(28, 41, 87, 0.08);
  margin: 0 auto;
  overflow: hidden;
  transition: box-shadow 0.2s;
`;

const FormHeader = styled.div`
  background: #1c2957;
  padding: 1.5rem 2rem;
  text-align: center;
`;

const FormTitle = styled.h2`
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  margin: 0;
`;

const FormSubtitle = styled.p`
  color: #fff;
  font-size: 1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.85;
`;

const FormBody = styled.div`
  padding: 2rem;
`;

const StepIndicator = styled.div`
  background: #1c2957;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
`;

const StyledButton = styled.button`
  padding: 10px 28px;
  border: none;
  border-radius: 22px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  background: #1c2957;
  color: #fff;
  transition: background 0.2s, transform 0.1s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #16204a;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PreviousButton = styled(StyledButton)`
  background: #fff;
  color: #1c2957;
  border: 1px solid #1c2957;

  &:hover {
    background: #f5f7fa;
    color: #1c2957;
  }
`;

const NextButton = styled(StyledButton)`
  background: #1c2957;
  color: #fff;

  &:hover {
    background: #16204a;
  }
`;

const SubmitButton = styled(StyledButton)`
  background: #1c2957;
  color: #fff;

  &:hover {
    background: #16204a;
  }
`;

const ApplyForm = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    resumeOption: "",
    coverLetterOption: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    workExperience: [],
    education: [],
    certifications: [],
    skills: "",
  });
  const [errors, setErrors] = useState({});
  const [questions, setQuestions] = useState([]); // State to store questions

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const token = localStorage.getItem("jobSeekerLoginToken");

  const handleSubmit = async () => {
    if(!formData.resume){
      toast.error("Please upload your resume");
      return;
    }
    const screeningQuestions = questions?.map((question, index) => ({
      question: question.question,
      description: question.description,
      options: question.options,
      answer: formData[`question${index + 1}`] || "",
    }));

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_no", formData.phone);

    // Append resume file if uploaded
    // if (formData.resumeOption === "select" && existingResume) {
    //   formData.resume = existingResume;
    // }
    if (formData.resumeOption === "upload" && formData.resume) {
      formDataToSend.append("resume_upload", formData.resume);
    } else {
      formDataToSend.append("resume_upload", "");
    }

    // Append cover letter file if uploaded
    if (formData.coverLetterOption === "upload" && formData.coverLetter) {
      formDataToSend.append("cover_letter_upload", formData.coverLetter);
    } else {
      formDataToSend.append("cover_letter_upload", "");
    }

    if(formData.screening_questions_answer){formDataToSend.append(
      "screening_questions",
      JSON.stringify(screeningQuestions)
    )
  }
    console.log("FormData before submission:");
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await fetch(
        `https://apiwl.novajobs.us/api/jobseeker/jobs-applied/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: token, // Token is still passed in the headers
          },
          body: formDataToSend, // Use FormData as the request body
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success(
          responseData.data.message || "Application submitted successfully!"
        );
        console.log("API Response:", responseData); // Log the full response for debugging

        // Redirect to /id on success
        navigate(`/user/jobs/${id}`);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting the application.");
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Personal Information";
      case 2:
        return "Screening Questions";
      case 3:
        return "Review & Submit";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Please provide your basic information and contact details";
      case 2:
        return "Answer the following questions to complete your application";
      case 3:
        return "Review your information before submitting your application";
      default:
        return "";
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <EmployeeQuestionsForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            questions={questions} // Pass questions to EmployeeQuestionsForm
            setQuestions={setQuestions} // Pass setQuestions to update questions state
          />
        );
      case 3:
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 ">
            <FormCard className="shadow-lg">
              {/* <FormHeader>
                <FormTitle>Job Application</FormTitle>
                <FormSubtitle>{getStepDescription()}</FormSubtitle>
              </FormHeader> */}

              <FormBody>
                {/* <div className="mb-4 ">
                  <ProgressBar currentStep={step} totalSteps={3} />
                </div> */}

                <StepIndicator>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="me-2">
                      <span className="me-2 d-flex align-items-center">
                        {step === 1 && <User size={20} />}
                        {step === 2 && <HelpCircle size={20} />}
                        {step === 3 && <CheckCircle size={20} />}
                      </span>
                    </span>
                    Step {step} of 3: {getStepTitle()}
                  </div>
                </StepIndicator>

                <div className="">{renderForm()}</div>

                <ButtonGroup>
                  <div>
                    {step > 1 && (
                      <PreviousButton onClick={prevStep} className="me-3">
                        {/* <i className="fas fa-arrow-left me-2"></i> */}
                        Previous
                      </PreviousButton>
                    )}
                  </div>

                  <div>
                    {step < 3 ? (
                      <NextButton onClick={nextStep}>Next</NextButton>
                    ) : (
                      <SubmitButton onClick={handleSubmit}>
                        {/* <i className="fas fa-paper-plane me-2"></i> */}
                        Submit Application
                      </SubmitButton>
                    )}
                  </div>
                </ButtonGroup>
              </FormBody>
            </FormCard>
          </div>
        </div>
      </div>
    </FormContainer>
  );
};

export default ApplyForm;
