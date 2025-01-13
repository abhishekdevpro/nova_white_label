import React from "react";
import styled from "styled-components";
import { HandHelping, Infinity, Sparkles } from "lucide-react";

const FeaturesSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
    margin: 2rem auto;
  }
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props => props.$bgColor || '#f0f4ff'};
  color: ${props => props.$iconColor || '#4169e1'};
  margin-bottom: 0.5rem;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const CustomIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${props => props.$iconUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const FeaturesComponent = () => {
  const features = [
    {
      icon: "cms",
      title: "Easy to use CMS",
      description: "Easily manage all content and jobs, with no limits to your creation.",
      bgColor: "#e8f5ff",
      iconColor: "#0066cc"
    },
    {
      icon: "support",
      title: "Unlimited Support",
      description: "We're here to help you with ongoing support for any help you need.",
      bgColor: "#f0f4ff",
      iconColor: "#4169e1"
    },
    {
      icon: "ai",
      title: "Integrated AI",
      description: "Use Recsites AI™ to help craft the perfect website content and master SEO.",
      bgColor: "#f5f0ff",
      iconColor: "#6b46c1"
    }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "cms":
        return <HandHelping $iconUrl="/path-to-cms-icon.svg" />;
      case "support":
        return <Infinity />;
      case "ai":
        return <Sparkles />;
      default:
        return null;
    }
  };

  return (
    <FeaturesSection>
      {features.map((feature, index) => (
        <FeatureCard key={index}>
          <IconWrapper $bgColor={feature.bgColor} $iconColor={feature.iconColor}>
            {getIcon(feature.icon)}
          </IconWrapper>
          <Title>{feature.title}</Title>
          <Description>{feature.description}</Description>
        </FeatureCard>
      ))}
    </FeaturesSection>
  );
};

export default FeaturesComponent;