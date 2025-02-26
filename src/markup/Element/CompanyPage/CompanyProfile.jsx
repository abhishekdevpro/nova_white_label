import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  
  @media (min-width: 768px) {
    width: 75%;
  }
`;

const CompanyInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 576px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  
  @media (min-width: 576px) {
    text-align: left;
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`;

const Logo = styled.img`
  width: 120px;
  height: 60px;
  max-width: 100%;
  object-fit: contain;
  
  @media (min-width: 576px) {
    width: 150px;
    height: 75px;
  }
`;

const CompanyDetails = styled.div`
  text-align: center;
  
  @media (min-width: 576px) {
    text-align: left;
  }
`;

const CompanyName = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  
  @media (min-width: 576px) {
    font-size: 1.4rem;
  }
`;

const CompanyInfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding-left: 0;
  list-style: none;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.8rem;
  
  @media (min-width: 576px) {
    justify-content: flex-start;
    font-size: 0.9rem;
  }
  
  li {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    
    @media (min-width: 768px) {
      margin-right: 1rem;
    }
    
    i {
      margin-right: 0.25rem;
    }
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  
  @media (min-width: 576px) {
    justify-content: flex-start;
  }
`;

const Badge = styled.span`
  background-color: #007bff;
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  
  @media (min-width: 576px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const ActionsWrapper = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: center;
  }
  
  @media (min-width: 768px) {
    margin-top: 0;
    width: 25%;
    justify-content: flex-end;
  }
`;

const MessageButton = styled.button`
  background-color: #0d47a1;
  border: 1px solid #0d47a1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 200px;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #083378;
  }
  
  @media (min-width: 576px) {
    width: auto;
    margin-right: 0.75rem;
    margin-bottom: 0;
  }
`;

const BookmarkButton = styled.button`
  border: 1px solid #0d47a1;
  background-color: transparent;
  color: #0d47a1;
  padding: 0.5rem;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e8f0fe;
  }
`;

const CompanyProfile = ({ companyData }) => {
  return (
    <Container>
      <ContentWrapper>
        <CompanyInfoWrapper>
          <LogoWrapper>
            <Logo src={companyData.logo} alt={`${companyData?.company_name} logo`} />
          </LogoWrapper>
          <CompanyDetails>
            <CompanyName>{companyData?.company_name}</CompanyName>
            <CompanyInfoList>
              <li>
                <i className="bi bi-geo-alt text-primary"></i> 
                {companyData.city.name}, {companyData.state.name}
              </li>
              <li>
                <i className="bi bi-briefcase text-primary"></i> 
                {companyData?.company_industry.name}
              </li>
              <li>
                <i className="bi bi-telephone text-primary"></i> 
                {companyData?.phone}
              </li>
              <li>
                <i className="bi bi-envelope text-primary"></i> 
                {companyData?.email}
              </li>
            </CompanyInfoList>
            <BadgeWrapper>
              <Badge>Open Jobs – {companyData.jobNumber}</Badge>
            </BadgeWrapper>
          </CompanyDetails>
        </CompanyInfoWrapper>
      </ContentWrapper>
      
      <ActionsWrapper>
        <a href={`mailto:${companyData?.email?.trim()}`}>
          <MessageButton>
            Message
          </MessageButton>
        </a>
        <BookmarkButton>
          <i className="bi bi-bookmark"></i>
        </BookmarkButton>
      </ActionsWrapper>
    </Container>
  );
};

export default CompanyProfile;