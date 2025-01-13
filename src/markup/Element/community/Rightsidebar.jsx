import React from 'react';
import styled from 'styled-components';

// Styled Components
const SidebarContainer = styled.div`
  padding-right: 16px; /* Adjust padding as needed */
`;

const FilterOuter = styled.div`
  text-align: center;
  margin-bottom: 24px; /* Space between filter sections */
  background-color: #ffffff; /* White background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  padding: 16px; /* Padding inside the filter section */
`;

const ProfileImage = styled.img`
  width: 144px; /* Equivalent to w-36 */
  height: 160px; /* Equivalent to h-40 */
  border-radius: 50%; /* Circular image */
  margin: 0 auto; /* Center the image */
`;

const Title = styled.h4`
  margin: 12px 0; /* Margin above and below the title */
  font-size: 1.5rem; /* Font size for the title */
`;

const Subtitle = styled.h6`
  margin: 12px 0; /* Margin above and below the subtitle */
  font-size: 1rem; /* Font size for the subtitle */
`;

const Description = styled.p`
  font-size: 0.875rem; /* Smaller font size for description */
  margin: 8px 0; /* Margin above and below the description */
  color: #6b7280; /* Gray color for the description text */
`;

const ActionButton = styled.button`
  margin: 8px 0; /* Margin above and below the button */
  color: #ffffff; /* White text */
  background-color: #1e3a8a; /* Dark blue background */
  border: none; /* No border */
  border-radius: 6px; /* Rounded corners */
  padding: 8px 16px; /* Padding inside the button */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af; /* Darker blue on hover */
  }
`;

// Main Component
const FilterLeftSidebar = () => {
  return (
    <SidebarContainer>
      <FilterOuter>
        <Title>Personalize your jobs</Title>
        <ProfileImage
          src="https://img.freepik.com/premium-vector/people-talking-discussing-together-vector-young-man-woman-people-talking-have-funny-discussion-planning-togetherness-characters-boy-girl-communication-flat-cartoon-illustration_87720-5022.jpg"
          alt="Personalize Jobs"
        />
        <Description>
          Get recommendations for recent and relevant jobs.
        </Description>
        <ActionButton>Get Started</ActionButton>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage
          src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
          alt="Your Groups"
        />
        <Subtitle>YOUR GROUPS</Subtitle>
        <Description>
          Discover and join groups with like-minded women who share your interests, profession, and lifestyle.
        </Description>
        <ActionButton>Explore</ActionButton>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage
          src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
          alt="Companies You Follow"
        />
        <Subtitle>COMPANIES YOU FOLLOW</Subtitle>
        <Description>
          Get alerted when there are new employee reviews.
        </Description>
        <ActionButton>Explore</ActionButton>
      </FilterOuter>
    </SidebarContainer>
  );
};

export default FilterLeftSidebar;