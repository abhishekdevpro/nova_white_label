import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 2rem 1rem;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
    gap: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 4rem 2rem;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  color: #09213c;

  @media (min-width: 768px) {
    font-size: 2rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: ${props => props.isFullWidth ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'};
    gap: 2rem;
  }
`;

const Card = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
  }

  @media (max-width: 639px) {
    padding: 1.25rem;
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  color: #1e40af;
  margin-bottom: 1rem;

  @media (max-width: 639px) {
    font-size: 1.75rem;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;

  @media (max-width: 639px) {
    font-size: 1.1rem;
  }
`;

const CardDescription = styled.p`
  color: #2563eb;
  font-size: 0.9rem;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`;

const WhyChooseUs = ({
  title,
  subtitle,
  cards,
  isFullWidth = false
}) => {
  const renderCard = (card) => {
    const cardContent = (
      <>
        <CardIcon>{card.icon}</CardIcon>
        <CardTitle>{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </>
    );

    if (card.link) {
      return (
        <Card key={card.id}>
          <StyledLink to={card.link}>
            {cardContent}
          </StyledLink>
        </Card>
      );
    }

    return (
      <Card key={card.id} onClick={card.onClick}>
        {cardContent}
      </Card>
    );
  };

  return (
    <Section>
      <Title>
        {title}
        {subtitle && <br />}
        {subtitle}
      </Title>
      <CardContainer isFullWidth={isFullWidth}>
        {cards.map(renderCard)}
      </CardContainer>
    </Section>
  );
};

export default WhyChooseUs;