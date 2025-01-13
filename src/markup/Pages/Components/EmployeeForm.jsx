
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background-color: #f7fafc;
`;

const Card = styled.div`
  width: 100%;
  max-width: 32rem;
  text-align: center;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2d3748;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: #718096;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 640px) {
    padding: 0.875rem;
    font-size: 0.9375rem;
  }
`;

const BackButton = styled.button`
  margin-top: 1.5rem;
  color: #4299e1;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2b6cb0;
    text-decoration: underline;
  }
`;

const EmployeeForm = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const mainOptions = [
    { label: '🔍 Hiring: Find the perfect candidates', value: 'hiring' },
    { label: '📝 Job Posting: Post a new job listing', value: 'jobPosting' },
    { label: '📊 Track Applications: View and manage applications', value: 'trackApplications' },
    { label: '❓ Help & Support: Get assistance', value: 'helpSupport' }
  ];

  const hiringOptions = [
    { label: '💼 Search Candidates', value: 'searchCandidates' },
    { label: '📂 View Job Listings', value: 'viewJobListings' },
    { label: '🤖 AI Recommendations', value: 'aiRecommendations' }
  ];

  const jobPostingOptions = [
    { label: '✍️ Create a Job Post', value: 'createJobPost' },
    { label: '🛠 Optimize Your Job Listing', value: 'optimizeListing' },
    { label: '📈 View Job Post Performance', value: 'postPerformance' }
  ];

  const helpSupportOptions = [
    { label: '💬 Chat with Support', value: 'chatSupport' },
    { label: '📚 FAQs', value: 'faqs' },
    { label: '📞 Contact Us', value: 'contactUs' }
  ];

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
    setStep(2);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setSelectedOption('');
    } else {
      navigate('/');
    }
  };

  const handleBack2 = () => {
    navigate('/');
    window.location.reload();
  };
  
  const handleClick = () => {
    navigate("/employer/login");
  };

  return (
    <FormWrapper>
      <Card>
        {step === 1 && (
          <>
            <Title>Welcome to NovaJobs.us!</Title>
            <Description>How can I assist you today?</Description>
            <ButtonGroup>
              {mainOptions.map((option, index) => (
                <OptionButton
                  key={index}
                  bgColor="#4299e1"
                  hoverColor="#3182ce"
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </OptionButton>
              ))}
            </ButtonGroup>
            <BackButton onClick={handleBack2}>Back</BackButton>
          </>
        )}

        {step === 2 && selectedOption === 'hiring' && (
          <>
            <Subtitle>Great! Let's help you find the right candidates.</Subtitle>
            <Description>Would you like to:</Description>
            <ButtonGroup>
              {hiringOptions.map((option, index) => (
                <OptionButton
                  key={index}
                  bgColor="#48bb78"
                  hoverColor="#38a169"
                  onClick={handleClick}
                >
                  {option.label}
                </OptionButton>
              ))}
            </ButtonGroup>
            <BackButton onClick={handleBack}>Back</BackButton>
          </>
        )}

        {step === 2 && selectedOption === 'jobPosting' && (
          <>
            <Subtitle>Ready to post a job?</Subtitle>
            <Description>Here's what you can do:</Description>
            <ButtonGroup>
              {jobPostingOptions.map((option, index) => (
                <OptionButton
                  key={index}
                  bgColor="#ecc94b"
                  hoverColor="#d69e2e"
                  onClick={handleClick}
                >
                  {option.label}
                </OptionButton>
              ))}
            </ButtonGroup>
            <BackButton onClick={handleBack}>Back</BackButton>
          </>
        )}

        {step === 2 && selectedOption === 'helpSupport' && (
          <>
            <Subtitle>Need help?</Subtitle>
            <Description>Here are some common topics:</Description>
            <ButtonGroup>
              {helpSupportOptions.map((option, index) => (
                <OptionButton
                  key={index}
                  bgColor="#9f7aea"
                  hoverColor="#805ad5"
                  onClick={handleClick}
                >
                  {option.label}
                </OptionButton>
              ))}
            </ButtonGroup>
            <BackButton onClick={handleBack}>Back</BackButton>
          </>
        )}

        {step === 2 && selectedOption === 'trackApplications' && (
          <>
            <Subtitle>Track Applications</Subtitle>
            <Description>You can view and manage your applications here.</Description>
            <OptionButton
              bgColor="#ed64a6"
              hoverColor="#d53f8c"
              onClick={handleClick}
            >
              View Applications Dashboard
            </OptionButton>
            <BackButton onClick={handleBack}>Back</BackButton>
          </>
        )}
      </Card>
    </FormWrapper>
  );
};

export default EmployeeForm;