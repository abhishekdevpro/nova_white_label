import styled from "styled-components";
import parse from "html-react-parser";

const CompanyAbout = ({ companyData }) => {
  const services = JSON.parse(companyData?.company_services || "[]"); // Ensure parsing doesn't break
  // console.log(services, "ser");

  return (
    <AboutContainer>
      <AboutTitle>About Company</AboutTitle>
      <AboutText>{parse(companyData?.about || "")}</AboutText>

      <ServicesTitle>Our Services</ServicesTitle>
      <ServiceList>
        {services.map((service, index) => (
          <ServiceItem key={index}>
            {/* {console.log(`https://apiwl.novajobs.us${service.service_photo}`)} */}
            <ServiceImage src={`https://apiwl.novajobs.us${service.service_photo}`} alt={service.service_name} />
            <ServiceName>{service.service_name}</ServiceName>

          </ServiceItem>
        ))}
      </ServiceList>
    </AboutContainer>
  );
};

export default CompanyAbout;

// Styled Components
const AboutContainer = styled.div`
  padding: 20px;
`;

const AboutTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const AboutText = styled.p`
  font-size: 16px;
  color: #333;
`;

const ServicesTitle = styled.h3`
  font-size: 20px;
  margin-top: 20px;
`;

const ServiceList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const ServiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 150px;
  text-align: center;
`;

const ServiceImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ServiceName = styled.p`
  font-size: 14px;
  font-weight: bold;
`;
