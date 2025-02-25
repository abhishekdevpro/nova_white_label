import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 75px;
  max-width: 100%;
  object-fit: contain;
`;

const CompanyDetails = styled.div`
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
    margin-left: 1.5rem;
  }
`;

const CompanyName = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CompanyInfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-left: 0;
  list-style: none;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 0.9rem;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  li {
    margin-right: 1rem;
  }
`;

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Badge = styled.span`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
`;

const ActionsWrapper = styled.div`
  margin-top: 1rem;
  text-align: center;
  @media (min-width: 768px) {
    text-align: right;
    margin-top: 0;
  }
`;

const MessageButton = styled.button`
  background-color: #0d47a1;
  border-color: #0d47a1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const BookmarkButton = styled.button`
  border-color: #0d47a1;
  color: #0d47a1;
  padding: 0.5rem;
  border-radius: 50%;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const CompanyProfile = ({ companyData }) => {
  return (
    <Container>
      <div className="col-md-9">
        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
          <LogoWrapper>
            <Logo src={companyData.logo} alt="logo" />
          </LogoWrapper>
          <CompanyDetails>
            <CompanyName>{companyData?.company_name}</CompanyName>
            <CompanyInfoList>
              <li>
                <i className="bi bi-geo-alt text-primary"></i> {companyData.city.name}, {companyData.state.name} |
              </li>
              <li>
                <i className="bi bi-briefcase text-primary"></i> {companyData?.company_industry.name} |
              </li>
              <li>
                <i className="bi bi-telephone text-primary"></i> {companyData?.phone} |
              </li>
              <li>
                <i className="bi bi-envelope text-primary"></i> {companyData?.email}
              </li>
            </CompanyInfoList>
            <BadgeWrapper>
              <Badge>Open Jobs – {companyData.jobNumber}</Badge>
            </BadgeWrapper>
          </CompanyDetails>
        </div>
      </div>
      <div className="col-md-3 mt-3 mt-md-0 text-center text-md-end">
        <ActionsWrapper>
          <a href={`mailto:${companyData?.email?.trim()}`}>
            <MessageButton
              data-bs-toggle="modal"
              data-bs-target="#privateMessage"
            >
              Message
            </MessageButton>
          </a>
          <BookmarkButton>
            <i className="bi bi-bookmark"></i>
          </BookmarkButton>
        </ActionsWrapper>
      </div>
    </Container>
  );
};

export default CompanyProfile;
