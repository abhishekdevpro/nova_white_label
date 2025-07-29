
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

// ✅ Fixed progress bar with inline styles via attrs
const ProgressBar = styled.div.attrs(props => ({
  style: {
    width: `${props.strength}%`,
    backgroundColor:
      props.strength < 40
        ? "#dc3545" // red
        : props.strength < 70
        ? "#ffc107" // yellow
        : "#198754", // green
  },
}))`
  height: 100%;
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

// Label below bar
const ProgressLabel = styled.p`
  font-size: 12px;
  margin-top: 6px;
  margin-bottom: 0;
  color: white;
`;

// Wrapper for label and percent text
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
        <PercentText>{(strength)}</PercentText>

      </ProgressWrapper>
      <ProgressLabel>Profile Strength</ProgressLabel>
    </ProgressBox>
  );
};

export default ProfileStrengthBar;
