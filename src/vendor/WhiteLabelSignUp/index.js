import React from 'react';
import styled from 'styled-components';
import Header from './WhiteHeader';
import PricingPlans from './PricingPlans';
import UserHeader2 from '../../markup/Layout/Header2';
import Footer from '../../markup/Layout/Footer';


const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const WhiteStart = () => {
  return (
    <>
    <UserHeader2 />
    <AppContainer>
      <Header />
      <PricingPlans />
    </AppContainer>
    <Footer/>
    </>
  );
};

export default WhiteStart;