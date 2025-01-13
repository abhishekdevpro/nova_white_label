import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";

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
  width: 112px; /* Equivalent to w-28 */
  height: 112px; /* Equivalent to h-28 */
  border-radius: 50%; /* Circular image */
  margin: 0 auto; /* Center the image */
`;

const Title = styled.h4`
  margin: 12px 0; /* Margin above and below the title */
  font-size: 1.25rem; /* Font size for the title */
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

const ExploreButton = styled.button`
  margin: 8px 0; /* Margin above and below the button */
  color: #1e3a8a; /* Dark blue color */
  background: none; /* No background */
  border: none; /* No border */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 1rem; /* Font size for the button */
  transition: color 0.2s;

  &:hover {
    color: #1e40af; /* Darker blue on hover */
  }
`;

// Main Component
const FilterSidebar = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    photo: "",
  });
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const jobSeekerToken = localStorage.getItem("jobSeekerLoginToken");
        const employerToken = localStorage.getItem("employeeLoginToken");

        let apiUrl = "";
        let token = "";

        if (jobSeekerToken) {
          apiUrl = "https://api.novajobs.us/api/jobseeker/user-profile";
          token = jobSeekerToken;
        } else if (employerToken) {
          apiUrl = "https://api.novajobs.us/api/employeer/employeer-profile";
          token = employerToken;
        } else {
          console.error("No valid token found.");
          return;
        }

        const response = await axios({
          method: "GET",
          url: apiUrl,
          headers: {
            Authorization: token,
          },
        });

        const data = response.data.data;

        if (data.employeer_detail) {
          setUserData({
            first_name: data.employeer_detail.first_name,
            last_name: data.employeer_detail.last_name,
            photo: data.employeer_detail.photo || "", // Ensure photo fallback if missing
          });
        } else {
          setUserData({
            first_name: data.first_name,
            last_name: data.last_name,
            photo: data.photo || "", // Ensure photo fallback if missing
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <SidebarContainer>
      <FilterOuter>
        <ProfileImage
          src={
            userData.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
          }
          alt={`${userData.first_name} ${userData.last_name}`}
        />
        <Title>{`${userData.first_name} ${userData.last_name}`}</Title>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage
          src="https://w7.pngwing.com/pngs/352/661/png-transparent-flowers-bouquet-watercolor-flowers-flower-clip-art-thumbnail.png"
          alt="Your Groups"
        />
        <Subtitle>YOUR GROUPS</Subtitle>
        <Description>
          Discover and join groups with like-minded women who share your
          interests, profession, and lifestyle.
        </Description>
        <ExploreButton>Explore</ExploreButton>
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
        <ExploreButton>Explore</ExploreButton>
      </FilterOuter>
    </SidebarContainer>
  );
};

export default FilterSidebar;
