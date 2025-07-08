import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { X, Megaphone, Link } from "lucide-react";

// Scroll animation
const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

// Container with glassmorphism effect
const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #e3f2fd, #fff);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
  position: relative;
  overflow: hidden;
  z-index: 10;
`;

// Modern pill-style update tag
const NewsButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #00695c;
  color: white;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-right: 20px;
  white-space: nowrap;

  svg {
    width: 18px;
    height: 18px;
  }
`;

// Wrapper to contain the animated text
const ScrollWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

// The scrolling content
const ScrollText = styled.div`
  display: inline-block;
  white-space: nowrap;
  font-size: 16px;
  color: #333;
  animation: ${scroll} 40s linear infinite;

  ${({ isPaused }) =>
    isPaused &&
    css`
      animation-play-state: paused;
    `}
`;

// Dismiss button
const CloseButton = styled.button`
  background: #ef5350;
  border: none;
  color: white;
  padding: 8px;
  border-radius: 50%;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #d32f2f;
    transform: translateY(-50%) scale(1.05);
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const content = `
 🎓 ultraaura.education now open for upskilling! | 🆓 Free course credits for NovaJobs users | 🚀 Build in-demand tech skills & boost your job chances! 
`;

const SubHeader = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <SubHeaderContainer>
      <NewsButton>
        <Megaphone />
        Updates
      </NewsButton>
      <ScrollWrapper>
        <ScrollText
          isPaused={isPaused}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {content}
          <Link href="www.UltraAura.education">Explore Now</Link>
        </ScrollText>
      </ScrollWrapper>
      <CloseButton onClick={() => setIsVisible(false)}>
        <X size={18} />
      </CloseButton>
    </SubHeaderContainer>
  );
};

export default SubHeader;
