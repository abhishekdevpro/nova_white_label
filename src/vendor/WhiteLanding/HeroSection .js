// import React from 'react';
// // import { HeroSection, HeroImage } from '../styles/Hero.styled';
// import styled from 'styled-components';
// import hero from "./home.png"

// const Hero = () => {

//  const HeroSection = styled.section`
//   height: 100vh;
//   width: 100%;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
// `;
//  const HeroImage = styled.img`
//   max-width: 100%;
//   max-height: 80%;
//   object-fit: fit;
// `;

//   return (
//     <HeroSection>
//       <HeroImage
//         src={hero}
//         alt="AI Job Portal Platform"
//       />
//     </HeroSection>
//   );
// };

// export default Hero;

import React from "react";
import styled from "styled-components";
import hero from "./home.png"; // Your hero image
import VendorPartnershipForm from "../WhiteLabel/Form";

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  height: 100vh;
  background-color: #f9fbfc;
`;

const HeroContent = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Heading = styled.h1`
  text-align: left;
  font-size: 3rem;
  font-weight: bold;
  color: #0a0a0a;
`;

const SubHeading = styled.p`
  text-align: left;
  font-size: 1.2rem;
  color: #5f6368;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.a`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  text-align: center;
  background-color: ${(props) => (props.primary ? "#007bff" : "#007bff")};
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const TrustLogos = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  height: 40px;
`;

const HeroImageContainer = styled.div`
  max-width: 50%;
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const Hero = () => {
  return (
    <HeroSection>
      {/* Content Section */}
      <HeroContent>
        <Heading>Effortless Recruitment Websites for Your Business</Heading>
        <SubHeading>
          Empower your recruitment agency with the ultimate solution for
          creating professional, feature-rich websites at an affordable monthly
          cost.
        </SubHeading>
        <ButtonsContainer>
          <Button
            primary
            href=""
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#vendorFormModal"
          >
            Get Started Now
          </Button>
          <VendorPartnershipForm />
          <Button href="#">Book A Call</Button>
        </ButtonsContainer>
        <TrustLogos>
          <span>Trusted by</span>
          <Logo
            src="https://novajobs.us/static/media/SBE-Logo.389eda415d6bcfb730cb.png"
            alt="SBE Logo"
          />{" "}
          {/* Add your logo paths */}
          <Logo
            src="https://novajobs.us/static/media/New-dbe-logo.520f3752c7088c8b133c.png"
            alt="DBE Logo"
          />
        </TrustLogos>
      </HeroContent>

      {/* Image Section */}
      <HeroImageContainer>
        <HeroImage src={hero} alt="AI Job Portal Platform" />
      </HeroImageContainer>
    </HeroSection>
  );
};

export default Hero;
