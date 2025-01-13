
// import React from "react";
// import styled from "styled-components";
// import UserHeader2 from "../../markup/Layout/Header2";
// import Footer from "../../markup/Layout/Footer";
// import Partners from "./Partners";
// import Features from "./Feature";

// import WebsiteMockupSlider from "./Slider";
// import FeaturesComponent from "./FeatureSection";

// const PageWrapper = styled.div`
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   // padding: 20px;

// `;

// const ContentBlock = styled.div`
//   width: 100%;
//   // max-width: 1200px;
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
//   // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
// `;

// const Section = styled.section`
//   width: 100%;
//   margin-bottom: 40px;

// `;

// const HeroSection = styled(Section)`
//   text-align: center;
// `;

// const PartnersSection = styled(Section)`
//   text-align: center;
// `;

// const FeaturesSection = styled(Section)`
//   text-align: center;
// `;

// const jobseekerToken = localStorage.getItem("jobSeekerLoginToken");
// console.log(jobseekerToken);

// function WhiteLabelLanding() {
//   return (
//     <>
//       <UserHeader2 />
//       <PageWrapper>
//         <ContentBlock>
//           <HeroSection>
//             <Hero />
//           </HeroSection>
//           <PartnersSection>
//             <Partners />
//           </PartnersSection>
//           <FeaturesSection>
//             <Features />
//           </FeaturesSection>
//           <WebsiteMockupSlider />
//           <FeaturesComponent />
//         </ContentBlock>
//       </PageWrapper>
//       <Footer />
//     </>
//   );
// }

// export default WhiteLabelLanding;
import React from "react";
import styled from "styled-components";
import UserHeader2 from "../../markup/Layout/Header2";
import Footer from "../../markup/Layout/Footer";
import Partners from "./Partners";
import Features from "./Feature";
import WebsiteMockupSlider from "./Slider";
import FeaturesComponent from "./FeatureSection";
import Hero from "./HeroSection ";
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
      <UserHeader2 />
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