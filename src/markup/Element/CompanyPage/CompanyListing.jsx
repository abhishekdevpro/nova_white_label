import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CompanyListing = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>Explore Companies</Title>
      <SubTitle>Other similar Companies</SubTitle>
      {data.map((item, index) => (
        <CompanyCard key={index} onClick={() => navigate(`/employer/profilepage/${item?.jobskkers_detail?.id}`)}>
          <CardBody>
            <LogoWrapper>
              <CompanyLogo
                src={item?.logo || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"}
                alt="company logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";
                }}
              />
            </LogoWrapper>
            <CompanyInfo>
              <Header>
                <CompanyName>{item?.company_name}</CompanyName>
                <BookmarkButton>
                  <i className="bi bi-bookmark"></i>
                </BookmarkButton>
              </Header>
              <InfoList>
                <InfoItem>
                  <i className="bi bi-briefcase"></i> {item?.company_industry?.name || "N/A"}
                </InfoItem>
                <InfoItem>
                  <i className="bi bi-geo-alt"></i> {item?.location || "N/A"}
                </InfoItem>
                <InfoItem>
                  <i className="bi bi-clock"></i> {item?.hours || "N/A"}
                </InfoItem>
                <InfoItem>
                  <i className="bi bi-currency-dollar"></i> {item?.salary_range || "N/A"}
                </InfoItem>
              </InfoList>
            </CompanyInfo>
          </CardBody>
        </CompanyCard>
      ))}
    </Container>
  );
};

export default CompanyListing;

// Styled Components
const Container = styled.div`
  margin-top: 20px;
  padding: 0 16px;
  @media (min-width: 768px) {
    padding: 0 40px;
  }
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 16px;
  color: #0d47a1;
`;

const SubTitle = styled.h6`
  font-weight: bold;
  margin-bottom: 16px;
`;

const CompanyCard = styled.div`
  margin-bottom: 16px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
`;

const LogoWrapper = styled.div`
  flex: 0 0 80px;
  text-align: center;
`;

const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
`;

const CompanyInfo = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyName = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  color: #0d47a1;
`;

const BookmarkButton = styled.button`
  background: transparent;
  border: 1px solid #0d47a1;
  color: #0d47a1;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #0d47a1;
    color: #fff;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
`;

const InfoItem = styled.li`
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;

  i {
    color: #0d47a1;
  }
`;

// Responsive styling ensures it adapts well on all screen sizes
