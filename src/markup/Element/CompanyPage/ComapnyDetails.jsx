import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  background-color: #f5f7fc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h5`
  color: #0d47a1;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
`;

const Button = styled.a`
  display: block;
  text-align: center;
  background-color: #0d47a1;
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  &:hover {
    background-color: #0a356e;
  }
`;




const CompanyDetails = ({ companyData }) => {
  return (
    <Container>
      <Card>
        <div>
          <Title>Company Details</Title>
          <List>
            <ListItem>
              <strong>Primary industry:</strong>
              <span>
                <i className="bi bi-briefcase me-2 text-primary"></i>
                {companyData?.company_industry?.name}
              </span>
            </ListItem>
            <ListItem>
              <strong>Phone:</strong>
              <span>
                <i className="bi bi-telephone me-2 text-primary"></i>
                {companyData?.phone}
              </span>
            </ListItem>
            <ListItem>
              <strong>Email:</strong>
              <span>
                <i className="bi bi-envelope me-2 text-primary"></i>
                {companyData?.email}
              </span>
            </ListItem>
            <ListItem>
              <strong>Location:</strong>
              <span>
                <i className="bi bi-geo-alt me-2 text-primary"></i>
                {companyData?.state?.name}
              </span>
            </ListItem>
            <ListItem>
              <strong>Founded Year:</strong>
              <span>
                <i className="bi bi-clock me-2 text-primary"></i>
                {companyData?.founded_date}
              </span>
            </ListItem>
          </List>
          <Button href={companyData?.website_link} target="_blank" rel="noopener noreferrer">
            <i className="bi bi-globe me-2"></i> Visit Website
          </Button>
        </div>
      </Card>
      
    </Container>
  );
};

export default CompanyDetails;
