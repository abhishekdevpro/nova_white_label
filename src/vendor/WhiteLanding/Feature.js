// import React from 'react';

// import styled from 'styled-components';

// const FeaturesSection = styled.section`
//   padding: 6rem 2rem;
//   display: flex;
//   align-items: center;
//   gap: 4rem;
//   max-width: 1200px;
//   margin: 0 auto;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 4rem 1rem;
//   }
// `;

//  const IPadContainer = styled.div`
//   flex: 1;
//   position: relative;
//   background: #1a365d;
//   border-radius: 2rem;
//   padding: 3rem;
// `;

// const IPadFrame = styled.div`
//   position: relative;
//   padding-top: 133.33%; // 4:3 aspect ratio
//   background: #000;
//   border-radius: 1rem;
//   overflow: hidden;
// `;

// const ContentContainer = styled.div`
//   flex: 1;
//   padding: 2rem;
// `;

// const Title = styled.h2`
//   font-size: 2.5rem;
//   margin-bottom: 2rem;
//   color: #1a365d;
// `;

//  const FeatureList = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
// `;

// const FeatureItem = styled.li`
//   font-size: 1.25rem;
//   margin-bottom: 1rem;
//   padding-left: 2rem;
//   position: relative;

//   &:before {
//     content: "→";
//     position: absolute;
//     left: 0;
//     color: #1a365d;
//   }
// `;



// const Features = () => {
//   return (
//     <FeaturesSection>
//       <IPadContainer>
//         <IPadFrame>
//           <video
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             autoPlay
//             muted
//             loop
//             playsInline
//           >
//             <source src="https://youtu.be/DbHXRGdBhqo" type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </IPadFrame>
//       </IPadContainer>
//       <ContentContainer>
//         <Title>AI Job Portals now just a click away</Title>
//         <FeatureList>
//           <FeatureItem>Fill details</FeatureItem>
//           <FeatureItem>Choose services</FeatureItem>
//           <FeatureItem>Add Domain, & you're Live</FeatureItem>
//         </FeatureList>
//       </ContentContainer>
//     </FeaturesSection>
//   );
// };

// export default Features;

import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  display: flex;
  align-items: center;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 4rem 1rem;
  }
`;

const IPadContainer = styled.div`
  flex: 1;
  position: relative;
  background: #1a365d;
  border-radius: 2rem;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: 1rem;
  overflow: hidden;
  background: #000;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1a365d;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  text-align:left;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;

  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: #1a365d;
    font-size: 1.5rem;
  }
`;

const Features = () => {
  return (
    <FeaturesSection>
      <IPadContainer>
        <PlayerWrapper>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=DbHXRGdBhqo"
            playing
            muted
            loop
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </PlayerWrapper>
      </IPadContainer>
      <ContentContainer>
        <Title>AI Job Portals now just a click away</Title>
        <FeatureList>
          <FeatureItem>Fill details</FeatureItem>
          <FeatureItem>Choose services</FeatureItem>
          <FeatureItem>Add Domain, & you're Live</FeatureItem>
        </FeatureList>
      </ContentContainer>
    </FeaturesSection>
  );
};

export default Features;
