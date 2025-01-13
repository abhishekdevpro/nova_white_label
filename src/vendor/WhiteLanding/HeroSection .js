
// import React from "react";
// import styled from "styled-components";
// import hero from "./home.png"; // Your hero image
// import VendorPartnershipForm from "../WhiteLabel/Form";

// const HeroSection = styled.section`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 2rem;
//   height: 100vh;
//   background-color: #f9fbfc;
// `;

// const HeroContent = styled.div`
//   max-width: 50%;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const Heading = styled.h1`
//   text-align: left;
//   font-size: 3rem;
//   font-weight: bold;
//   color: #0a0a0a;
// `;

// const SubHeading = styled.p`
//   text-align: left;
//   font-size: 1.2rem;
//   color: #5f6368;
//   line-height: 1.6;
// `;

// const ButtonsContainer = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const Button = styled.a`
//   padding: 0.75rem 1.5rem;
//   font-size: 1rem;
//   color: white;
//   text-align: center;
//   background-color: ${(props) => (props.primary ? "#007bff" : "#007bff")};
//   border-radius: 5px;
//   text-decoration: none;
//   cursor: pointer;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const TrustLogos = styled.div`
//   margin-top: 1rem;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const Logo = styled.img`
//   height: 40px;
// `;

// const HeroImageContainer = styled.div`
//   max-width: 50%;
// `;

// const HeroImage = styled.img`
//   max-width: 80%;
//   height: auto;
//   object-fit: contain;
// `;

// const Hero = () => {
//   return (
//     <HeroSection>
//       {/* Content Section */}
//       <HeroContent>
//         <Heading>Effortless Recruitment Websites for Your Business</Heading>
//         <SubHeading>
//           Empower your recruitment agency with the ultimate solution for
//           creating professional, feature-rich websites at an affordable monthly
//           cost.
//         </SubHeading>
//         <ButtonsContainer>
//           <Button
//           href="#"
//           >
//             Get Started Now
//           </Button>
//           <VendorPartnershipForm />
//           <Button href="#">Book A Call</Button>
//         </ButtonsContainer>
//         <TrustLogos>
//           <span>Trusted by</span>
//           <Logo
//             src="https://novajobs.us/static/media/SBE-Logo.389eda415d6bcfb730cb.png"
//             alt="SBE Logo"
//           />{" "}
//           {/* Add your logo paths */}
//           <Logo
//             src="https://novajobs.us/static/media/New-dbe-logo.520f3752c7088c8b133c.png"
//             alt="DBE Logo"
//           />
//         </TrustLogos>
//       </HeroContent>

//       {/* Image Section */}
//       <HeroImageContainer>
//         <HeroImage src={hero} alt="AI Job Portal Platform" />
//       </HeroImageContainer>
//     </HeroSection>
//   );
// };

// export default Hero;
import React from "react";
import styled from "styled-components";
import hero from "./home.png";
import VendorPartnershipForm from "../WhiteLabel/Form";

// Media query breakpoints
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px'
};

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f9fbfc;
  
  @media (max-width: ${breakpoints.laptop}) {
    flex-direction: column;
    padding: 1.5rem;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: ${breakpoints.laptop}) {
    max-width: 100%;
    text-align: center;
    order: 2;
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 1rem;
  }
`;

const Heading = styled.h1`
  text-align: left;
  font-size: 3rem;
  font-weight: bold;
  color: #0a0a0a;
  
  @media (max-width: ${breakpoints.laptop}) {
    text-align: center;
    font-size: 2.5rem;
  }
  
  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.75rem;
  }
`;

const SubHeading = styled.p`
  text-align: left;
  font-size: 1.2rem;
  color: #5f6368;
  line-height: 1.6;
  
  @media (max-width: ${breakpoints.laptop}) {
    text-align: center;
    font-size: 1.1rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: ${breakpoints.laptop}) {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Button = styled.a`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  text-align: center;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    opacity: 0.9;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0.75rem 1rem;
    width: 100%;
  }
`;

const TrustLogos = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: ${breakpoints.laptop}) {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
        justify-content: center;
    gap: 0.75rem;
  }
`;

const Logo = styled.img`
  height: 40px;
  
  @media (max-width: ${breakpoints.mobile}) {
    height: 32px;
  }
`;

const HeroImageContainer = styled.div`
  max-width: 50%;
  
  @media (max-width: ${breakpoints.laptop}) {
    max-width: 100%;
    order: 1;
  }
`;

const HeroImage = styled.img`
  max-width: 80%;
  height: auto;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  
  @media (max-width: ${breakpoints.laptop}) {
    max-width: 100%;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <Heading>Effortless Recruitment Websites for Your Business</Heading>
        <SubHeading>
          Empower your recruitment agency with the ultimate solution for
          creating professional, feature-rich websites at an affordable monthly
          cost.
        </SubHeading>
        <ButtonsContainer>
          <Button href="/white-label-started">Get Started Now</Button>
          <VendorPartnershipForm />
          <Button href="#">Book A Call</Button>
        </ButtonsContainer>
        <TrustLogos>
          <span>Trusted by</span>
          <Logo
            src="https://novajobs.us/static/media/SBE-Logo.389eda415d6bcfb730cb.png"
            alt="SBE Logo"
          />
          <Logo
            src="https://novajobs.us/static/media/New-dbe-logo.520f3752c7088c8b133c.png"
            alt="DBE Logo"
          />
        </TrustLogos>
      </HeroContent>
      
      <HeroImageContainer>
        <HeroImage src={hero} alt="AI Job Portal Platform" />
      </HeroImageContainer>
    </HeroSection>
  );
};

export default Hero;