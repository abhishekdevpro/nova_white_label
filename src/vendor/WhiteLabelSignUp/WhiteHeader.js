import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 50px;
  font:bold;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SubText = styled.p`
  width:50%;
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;

   @media (max-width: 768px) {
    width:100%;
  }
`;

const CountrySelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Sign Up For Your </Title>
      <Title>Free Trial</Title>
      <SubText>
       Start your Novajobs trial today, by choosing the subscription best for your needs.
        Click on 'Start Free Trial' below... 
      </SubText>
      {/* <CountrySelector>
        Country Selector —
        <span>🇺🇸 USA</span>
      </CountrySelector> */}
    </HeaderContainer>
  );
};

export default Header;
