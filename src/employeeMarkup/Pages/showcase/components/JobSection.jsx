import React from 'react';
import styled from 'styled-components';
import { MdEdit, MdBusiness, MdLocationOn, MdOutlineHealthAndSafety } from 'react-icons/md';
import parse from 'html-react-parser';

const JobSection = styled.section`
  margin: 2rem auto 4rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;
  max-width: 1200px;

  @media (min-width: 768px) {
    margin: 3rem auto 6rem;
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    margin: 4rem auto 8rem;
    padding: 3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #1e40af;
    border-radius: 2px;
  }

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
`;

const JobCard = styled.div`
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(30, 64, 175, 0.1);
  }

  @media (min-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
    margin-bottom: 2rem;
  }
`;

const JobHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const JobTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ViewButton = styled.button`
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: #1e3a8a;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

const JobDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

const JobDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  font-size: 0.875rem;

  svg {
    color: #1e40af;
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NoJobs = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 2px dashed #e2e8f0;

  @media (min-width: 768px) {
    padding: 3rem;
    font-size: 1.125rem;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  background-color: #1e40af;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1e3a8a;
    transform: translateY(-2px);
  }

  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    gap: 0.5rem;
  }
`;

const JobsSection = ({ jobs, isEdit, handleEditClick, companyData, navigate }) => {
  return (
    <JobSection id="jobs">
      {isEdit && (
        <EditButton onClick={() => handleEditClick("jobs")}>
          <MdEdit size={18} />
          Edit Jobs
        </EditButton>
      )}
      
      <SectionTitle>Open Positions</SectionTitle>
      {companyData?.join_us && (
        <SectionTitle className="text-muted text-center fs-3">
          {parse(companyData.join_us)}
        </SectionTitle>
      )}

      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <JobCard key={index}>
            <JobHeader>
              <JobTitle>{job.job_detail.job_title}</JobTitle>
              <ViewButton onClick={() => navigate(`/user/jobs/${job.job_detail.id}`)}>
                View
              </ViewButton>
            </JobHeader>

            <JobDetails>
              <JobDetail>
                <MdBusiness size={20} />
                <span>{job.job_type.name}</span>
              </JobDetail>
              <JobDetail>
                <MdLocationOn size={20} />
                <span>{`${job.cities.name}, ${job.states.name}, ${job.countries.name}`}</span>
              </JobDetail>
              <JobDetail>
                <MdOutlineHealthAndSafety size={20} />
                <span>{job.experience_level.name}</span>
              </JobDetail>
            </JobDetails>
          </JobCard>
        ))
      ) : (
        <NoJobs>
          No open positions at the moment. Please check back later.
        </NoJobs>
      )}
    </JobSection>
  );
};

export default JobsSection;