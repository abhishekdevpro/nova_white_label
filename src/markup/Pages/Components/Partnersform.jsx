
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PartnerFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f4f8;
  padding: 1rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #2d3748;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #4a5568;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.bgColor || '#3498db'};
  color: white;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#2980b9'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 0.9375rem;
  }
`;

const BackButton = styled.button`
  margin-top: 1rem;
  color: #3498db;
  cursor: pointer;
  font-size: 1rem;
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #2980b9;
    text-decoration: underline;
  }
`;

const PartnerForm = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const mainOptions = [
    { label: '🤝 Candidate Sourcing: Find candidates for your clients', value: 'candidateSourcing', bgColor: '#3498db', hoverColor: '#2980b9' },
    { label: '📝 Post Jobs for Clients: List job openings', value: 'postJobsForClients', bgColor: '#f39c12', hoverColor: '#e67e22' },
    { label: '📊 Track Client Applications: Manage applications for client positions', value: 'trackClientApplications', bgColor: '#2ecc71', hoverColor: '#27ae60' },
    { label: '❓ Help & Support: Get assistance', value: 'helpSupport', bgColor: '#9b59b6', hoverColor: '#8e44ad' }
  ];

  const optionsMap = {
    candidateSourcing: [
      { label: '💼 Search Candidates', value: 'searchCandidates', bgColor: '#3498db', hoverColor: '#2980b9', route: '/search-candidates' },
      { label: '📂 View Client Job Listings', value: 'viewClientJobListings', bgColor: '#3498db', hoverColor: '#2980b9', route: '/view-client-jobs' },
      { label: '🤖 AI-Suggested Candidates', value: 'aiSuggestedCandidates', bgColor: '#3498db', hoverColor: '#2980b9', route: '/ai-suggested-candidates' }
    ],
    postJobsForClients: [
      { label: '✍️ Create a Job Post for a client', value: 'createJobPostForClient', bgColor: '#f39c12', hoverColor: '#e67e22', route: '/create-job-post' },
      { label: '🛠 Optimize Client Job Listings', value: 'optimizeClientListings', bgColor: '#f39c12', hoverColor: '#e67e22', route: '/optimize-listings' },
      { label: '📈 View Job Post Performance', value: 'viewJobPostPerformance', bgColor: '#f39c12', hoverColor: '#e67e22', route: '/view-performance' }
    ],
    trackClientApplications: [
      { label: '📊 View Applications', value: 'viewApplications', bgColor: '#2ecc71', hoverColor: '#27ae60', route: '/view-applications' },
      { label: '🔍 Track Progress', value: 'trackProgress', bgColor: '#2ecc71', hoverColor: '#27ae60', route: '/track-progress' },
      { label: '📅 Schedule Interviews', value: 'scheduleInterviews', bgColor: '#2ecc71', hoverColor: '#27ae60', route: '/schedule-interviews' }
    ],
    helpSupport: [
      { label: '💬 Chat with Support', value: 'chatSupport', bgColor: '#9b59b6', hoverColor: '#8e44ad', route: '/chat-support' },
      { label: '📚 FAQs', value: 'faqs', bgColor: '#9b59b6', hoverColor: '#8e44ad', route: '/faqs' },
      { label: '📞 Contact Us', value: 'contactUs', bgColor: '#9b59b6', hoverColor: '#8e44ad', route: '/contact' }
    ]
  };

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

  const handleSubOptionClick = () => {
    navigate('/vendor/login');
  };

  return (
    <PartnerFormContainer>
      <Card>
        {step === 1 && (
          <>
            <Title>Welcome to NovaJobs.us, partner!</Title>
            <Subtitle>How can we assist your staffing needs today?</Subtitle>
            {mainOptions.map((option, index) => (
              <OptionButton
                key={index}
                bgColor={option.bgColor}
                hoverColor={option.hoverColor}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </OptionButton>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <Title>Choose an option:</Title>
            {optionsMap[selectedOption].map((option, index) => (
              <OptionButton
                key={index}
                bgColor={option.bgColor}
                hoverColor={option.hoverColor}
                onClick={handleSubOptionClick}
              >
                {option.label}
              </OptionButton>
            ))}
          </>
        )}

        <BackButton onClick={handleBack}>
          {step === 1 ? 'Back to Home' : 'Back'}
        </BackButton>
      </Card>
    </PartnerFormContainer>
  );
};

export default PartnerForm;