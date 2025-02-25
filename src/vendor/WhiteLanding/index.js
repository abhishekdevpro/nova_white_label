
import React from "react";
import styled from "styled-components";
import UserHeader2 from "../../markup/Layout/Header2";
import Footer from "../../markup/Layout/Footer";
import Partners from "./Partners";
import Features from "./Feature";
import WebsiteMockupSlider from "./Slider";
import FeaturesComponent from "./FeatureSection";
import Hero from "./HeroSection ";
import VendorHeader from "../../markup/Layout/VendorHeader";
const Container = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  background-color: white;
  text-align: center;
`;

function WhiteLabelLanding() {
  const jobseekerToken = localStorage.getItem("jobSeekerLoginToken");
  console.log(jobseekerToken);

  return (
    <>
      {/* <UserHeader2 /> */}
      <VendorHeader />
      <Container>
        <Content>
          <Hero />
          <Partners />
          <Features />
          <WebsiteMockupSlider />
          <FeaturesComponent />
        </Content>
      </Container>
      <Footer />
    </>
  );
}

export default WhiteLabelLanding;