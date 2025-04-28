import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CookiesBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <BannerContainer>
      <BannerContent>
        <BannerText>
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
          <PolicyLinks>
            <Link target="_blank" to="/terms-and-conditions">Terms of Use</Link> & 
            <Link target="_blank" to="/privacy-policy">Privacy Policy</Link>
          </PolicyLinks>
        </BannerText>
        <ButtonGroup>
          <AcceptButton onClick={handleAccept}>Accept All</AcceptButton>
          <SettingsButton onClick={() => window.open('/cookies-policy', '_blank')}>
            Cookie Settings
          </SettingsButton>
        </ButtonGroup>
      </BannerContent>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const BannerText = styled.p`
  margin: 0;
  color: #333;
  font-size: 0.9rem;
  flex: 1;
`;

const PolicyLinks = styled.span`
  margin-left: 5px;
  
  a {
    color: #1C2957;
    text-decoration: none;
    font-weight: bold;
    margin: 0 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const AcceptButton = styled(Button)`
  background-color: #1C2957;
  color: white;
  border: none;

  &:hover {
    background-color: #161f3f;
  }
`;

const SettingsButton = styled(Button)`
  background-color: transparent;
  color: #1C2957;
  border: 1px solid #1C2957;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default CookiesBanner; 