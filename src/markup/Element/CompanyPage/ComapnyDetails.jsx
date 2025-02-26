import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height:100%;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 576px) {
    padding: 1rem;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-wrap:wrap;
  
  @media (min-width: 576px) {
    padding: 1.25rem;
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h5`
  color: #0d47a1;
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  @media (min-width: 576px) {
    font-size: 1.2rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.25rem;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
  font-size: 0.875rem;
  gap: 0.5rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 0.75rem;
    font-size: 0.9375rem;
  }
`;

const Label = styled.strong`
  color: #444;
`;

const Value = styled.span`
  display: flex;
  align-items: center;
  
  i {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0d47a1;
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  gap: 0.5rem;
  
  i {
    font-size: 1.1rem;
  }
  
  &:hover {
    background-color: #0a356e;
    color: white;
    text-decoration: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(13, 71, 161, 0.3);
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
              <Label>Primary industry:</Label>
              <Value>
                <i className="bi bi-briefcase text-primary"></i>
                {companyData?.company_industry?.name || 'Not provided'}
              </Value>
            </ListItem>
            <ListItem>
              <Label>Phone:</Label>
              <Value>
                <i className="bi bi-telephone text-primary"></i>
                {companyData?.phone || 'Not provided'}
              </Value>
            </ListItem>
            <ListItem>
              <Label>Email:</Label>
              <Value>
                <i className="bi bi-envelope text-primary"></i>
                {companyData?.email || 'Not provided'}
              </Value>
            </ListItem>
            <ListItem>
              <Label>Location:</Label>
              <Value>
                <i className="bi bi-geo-alt text-primary"></i>
                {companyData?.state?.name || 'Not provided'}
              </Value>
            </ListItem>
            <ListItem>
              <Label>Founded Year:</Label>
              <Value>
                <i className="bi bi-clock text-primary"></i>
                {companyData?.founded_date || 'Not provided'}
              </Value>
            </ListItem>
          </List>
          <Button 
            href={companyData?.website_link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="bi bi-globe"></i> Visit Website
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default CompanyDetails;