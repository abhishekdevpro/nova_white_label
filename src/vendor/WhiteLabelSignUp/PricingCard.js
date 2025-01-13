import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  padding: 30px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  
  span {
    font-size: 16px;
    color: #666;
  }
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 20px;
  min-height: 60px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0066FF;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background: #0052CC;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  padding: 8px 0;
  color: #444;
  
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const PricingCard = ({ title, price, description, features }) => {
  return (
    <Card>
      <PlanTitle>{title}</PlanTitle>
      <Price>
        ${price} <span>per month</span>
      </Price>
      <Description>{description}</Description>
      <Link to={'/vendor/login'}>
      <Button>Start 14-Day Free Trial</Button>
      </Link>
      <FeatureList>
        {features.map((feature, index) => (
          <Feature key={index}>{feature}</Feature>
        ))}
      </FeatureList>
    </Card>
  );
};

export default PricingCard;