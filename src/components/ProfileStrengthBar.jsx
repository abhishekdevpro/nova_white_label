// import React from "react";
// import styled from "styled-components";

// // Styled wrapper for outer box
// const ProgressBox = styled.div`
//   margin-top: 1rem;
// `;

// // Styled progress container
// const StyledProgress = styled.div`
//   height: 20px;
//   background-color: #e9ecef;
//   border-radius: 4px;
//   overflow: hidden;
// `;

// // Styled progress bar with dynamic width and color
// const ProgressBar = styled.div`
//   width: ${({ strength }) => strength}%;
//   transition: width 0.4s ease-in-out;
//   color: white;
//   font-size: 12px;
//   text-align: center;
//   line-height: 20px;
//   background-color: ${({ strength }) => {
//     if (strength < 40) return "#dc3545"; // red
//     else if (strength < 70) return "#ffc107"; // yellow
//     else return "#28a745"; // green
//   }};
// `;

// const ProgressLabel = styled.p`
//   font-size: 12px;
//   margin-bottom: 0;
//   color: white;
//   margin-top: 0.25rem;
// `;

// const ProfileStrengthBar = ({ strength }) => {
//   return (
//     <ProgressBox className="progress-bx">
//       <StyledProgress className="progress">
//         <ProgressBar
//           className="progress-bar"
//           role="progressbar"
//           strength={strength}
//           aria-valuenow={strength}
//           aria-valuemin="0"
//           aria-valuemax="100"
//         >
//           {strength}%
//         </ProgressBar>
//       </StyledProgress>
//       <ProgressLabel>Profile Strength</ProgressLabel>
//     </ProgressBox>
//   );
// };

// export default ProfileStrengthBar;

import React from "react";
import styled from "styled-components";

// Container
const ProgressBox = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

// Bootstrap-style progress wrapper
const StyledProgress = styled.div`
  height: 16px;
  background-color: #e9ecef;
  border-radius: 5px;
  overflow: hidden;
`;

// Actual bar
const ProgressBar = styled.div`
  height: 100%;
  width: ${({ strength }) => strength}%;
  background-color: ${({ strength }) => {
    if (strength < 40) return "#dc3545"; // red
    if (strength < 70) return "#ffc107"; // yellow
    return "#198754"; // green
  }};
  transition: width 0.4s ease;
`;

// Optional percent text
const PercentText = styled.span`
  position: absolute;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
`;

const ProgressLabel = styled.p`
  font-size: 12px;
  margin-top: 6px;
  margin-bottom: 0;
  color: white;
`;

const ProgressWrapper = styled.div`
  position: relative;
`;

const ProfileStrengthBar = ({ strength = 0 }) => {
  return (
    <ProgressBox>
      <ProgressWrapper>
        <StyledProgress>
          <ProgressBar strength={strength} />
        </StyledProgress>
         <PercentText>{strength}</PercentText> 
      </ProgressWrapper>
      <ProgressLabel>Profile Strength</ProgressLabel>
    </ProgressBox>
  );
};

export default ProfileStrengthBar;

