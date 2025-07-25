import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import EmployeeHeader from "../../Layout/Header";

// Styled Components
const Container = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 0;
  }
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(28, 41, 87, 0.1);
  overflow: hidden;
  margin: 0 auto;
  max-width: 1200px;
`;

const ProfileHeader = styled.div`
  background: #1c2957;
  padding: 2rem;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileName = styled.h3`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color:white;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ProfileTitle = styled.p`
  margin-bottom: 1rem;
  opacity: 0.9;
  font-size: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.5rem;
  border: 2px solid white;
  background: transparent;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #1c2957;
  }

  &.primary {
    background: white;
    color: #1c2957;

    &:hover {
      background: transparent;
      color: white;
    }
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const TabContainer = styled.div`
  border-bottom: 1px solid #e9ecef;
`;

const TabNav = styled.div`
  display: flex;
  background: white;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: ${props => props.active ? '#1c2957' : 'white'};
  color: ${props => props.active ? 'white' : '#1c2957'};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 3px solid ${props => props.active ? '#1c2957' : 'transparent'};

  &:hover {
    background: ${props => props.active ? '#1c2957' : '#f8f9fa'};
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    text-align: left;
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  min-height: 500px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h5`
  color: #1c2957;
  margin-bottom: 1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InfoLabel = styled.div`
  font-weight: 600;
  color: #1c2957;
  min-width: 150px;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const InfoValue = styled.div`
  color: #333;
  word-break: break-word;
`;

const ResumeContainer = styled.div`
  width: 100%;
  height: 600px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 500px;
  }
`;

const ResumeIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const NoResumeMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 1.1rem;
  background: #f8f9fa;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #1c2957;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc3545;
  font-size: 1.1rem;
`;

const JobSeekerDetails = () => {
  const { id } = useParams();
  const [jobSeeker, setJobSeeker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  const fetchJobSeekerDetails = async () => {
    try {
      const res = await axios.get(`https://apiwl.novajobs.us/api/employeer/job-seekers/${id}`);
      setJobSeeker(res.data.data?.jobskkers_detail);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job seeker details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobSeekerDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <LoadingSpinner>
          <div className="spinner"></div>
        </LoadingSpinner>
      </Container>
    );
  }

  if (!jobSeeker) {
    return (
      <Container>
        <div className="container">
          <ProfileCard>
            <ErrorMessage>
              Job seeker not found
            </ErrorMessage>
          </ProfileCard>
        </div>
      </Container>
    );
  }

  const renderProfileTab = () => (
    <div>
      <InfoSection>
        <SectionTitle>Personal Information</SectionTitle>
        <InfoRow>
          <InfoLabel>Full Name:</InfoLabel>
          <InfoValue>{jobSeeker.first_name || "N/A"} {jobSeeker.last_name || ""}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Email:</InfoLabel>
          <InfoValue>{jobSeeker.email || "N/A"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Phone:</InfoLabel>
          <InfoValue>{jobSeeker.phone || "N/A"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Current Location:</InfoLabel>
          <InfoValue>{jobSeeker.current_location || "N/A"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Languages:</InfoLabel>
          <InfoValue>{jobSeeker.languages || "N/A"}</InfoValue>
        </InfoRow>
      </InfoSection>

      <InfoSection>
        <SectionTitle>Professional Information</SectionTitle>
        <InfoRow>
          <InfoLabel>Professional Title:</InfoLabel>
          <InfoValue>{jobSeeker.proffesional_title || "N/A"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Work Experience:</InfoLabel>
          <InfoValue>
            {jobSeeker.experience_in_month 
              ? `${Math.floor(jobSeeker.experience_in_month / 12)} Years ${jobSeeker.experience_in_month % 12} Months`
              : "N/A"
            }
          </InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Resume Status:</InfoLabel>
          <InfoValue>
            {jobSeeker.resume_file_path ? "✓ Resume Uploaded" : "✗ No Resume"}
          </InfoValue>
        </InfoRow>
      </InfoSection>
    </div>
  );

  const renderResumeTab = () => (
    <div>
      <SectionTitle>Resume Preview</SectionTitle>
      <ResumeContainer>
        {jobSeeker.resume_file_path ? (
          <ResumeIframe
            src={`https://apiwl.novajobs.us${jobSeeker.resume_file_path}`}
            title="Resume Preview"
          />
        ) : (
          <NoResumeMessage>
            No resume uploaded by this job seeker
          </NoResumeMessage>
        )}
      </ResumeContainer>
    </div>
  );

  return (
    <>
    <EmployeeHeader />
       <Container>
      <div className="container">
        <ProfileCard>
          <ProfileHeader>
            <ProfileImage
              src={jobSeeker.photo || "https://via.placeholder.com/100"}
              alt="Profile"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100/cccccc/666666?text=No+Image";
              }}
            />
            <ProfileName>
              {jobSeeker.first_name || "N/A"} {jobSeeker.last_name || ""}
            </ProfileName>
            <ProfileTitle>
              {jobSeeker.proffesional_title || "Job Seeker"}
            </ProfileTitle>
            
            {/* <ActionButtons>
              <ActionButton className="primary">
                Call Now
              </ActionButton>
              <ActionButton>
                Share Profile
              </ActionButton>
            </ActionButtons> */}
          </ProfileHeader>

          <TabContainer>
            <TabNav>
              <TabButton 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </TabButton>
              <TabButton 
                active={activeTab === 'resume'} 
                onClick={() => setActiveTab('resume')}
              >
                Resume
              </TabButton>
            </TabNav>
          </TabContainer>

          <TabContent>
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'resume' && renderResumeTab()}
          </TabContent>
        </ProfileCard>
      </div>
    </Container>
    </>
  );
};

export default JobSeekerDetails;