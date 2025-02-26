import React from "react";
import styled from "styled-components";
import parse from "html-react-parser";

// Styled Components
const AboutContainer = styled.div`

  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 576px) {
    padding: 1.5rem;
    width:100%;
  }
`;

const AboutTitle = styled.h2`
  font-size: 1.25rem;
  color: #0d47a1;
  margin-bottom: 1rem;
  font-weight: 600;
  
  @media (min-width: 576px) {
    font-size: 1.5rem;
  }
`;

const AboutText = styled.div`
  font-size: 0.9375rem;
  color: #333;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  @media (min-width: 576px) {
    font-size: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    padding-left: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const ServicesTitle = styled.h3`
  font-size: 1.125rem;
  color: #0d47a1;
  margin: 1.5rem 0 1rem;
  font-weight: 600;
  
  @media (min-width: 576px) {
    font-size: 1.25rem;
  }
`;

const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1.25rem;
  }
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;

const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 0.75rem;
  
  @media (min-width: 576px) {
    width: 100px;
    height: 100px;
  }
`;

const ServiceName = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  
  @media (min-width: 576px) {
    font-size: 0.9375rem;
  }
`;

const EmptyServices = styled.p`
  font-style: italic;
  color: #666;
  text-align: center;
  padding: 1rem;
  border: 1px dashed #ccc;
  border-radius: 8px;
`;

const CompanyAbout = ({ companyData }) => {
  // Safely parse services, defaulting to empty array if parsing fails
  let services = [];
  try {
    services = JSON.parse(companyData?.company_services || "[]");
  } catch (error) {
    console.error("Error parsing company services:", error);
  }

  return (
    <AboutContainer>
      <AboutTitle>About Company</AboutTitle>
      <AboutText>
        {companyData?.about ? parse(companyData.about) : "No company description provided."}
      </AboutText>
      
      <ServicesTitle>Our Services</ServicesTitle>
      {services.length > 0 ? (
        <ServiceList>
          {services.map((service, index) => (
            <ServiceItem key={index}>
              <ServiceImage 
                src={`https://apiwl.novajobs.us${service.service_photo}`} 
                alt={service.service_name || "Service"} 
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/100x100?text=Service";
                }}
              />
              <ServiceName>{service.service_name || "Unnamed Service"}</ServiceName>
            </ServiceItem>
          ))}
        </ServiceList>
      ) : (
        <EmptyServices>No services listed.</EmptyServices>
      )}
    </AboutContainer>
  );
};

export default CompanyAbout;