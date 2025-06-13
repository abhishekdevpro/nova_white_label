// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import nova3 from "./assets/nova3.png"
// import nova4 from "./assets/nova4.png"
// // Styled Components
// const SidebarContainer = styled.div`
//   padding-right: 16px; /* Adjust padding as needed */
// `;

// const FilterOuter = styled.div`
//   text-align: center;
//   margin-bottom: 24px; /* Space between filter sections */
//   background-color: #ffffff; /* White background */
//   border-radius: 8px; /* Rounded corners */
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
//   padding: 16px; /* Padding inside the filter section */
// `;

// const ProfileImage = styled.img`
//   width: '100px',
//     height: '100px',
//     borderRadius: '50%',
//     border: '3px solid #dc3545',
//     objectFit: 'cover',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
// `;

// const Title = styled.h4`
//   margin: 12px 0; /* Margin above and below the title */
//   font-size: 1.5rem; /* Font size for the title */
// `;

// const Subtitle = styled.h6`
//   margin: 12px 0; /* Margin above and below the subtitle */
//   font-size: 1rem; /* Font size for the subtitle */
// `;

// const Description = styled.p`
//   font-size: 0.875rem; /* Smaller font size for description */
//   margin: 8px 0; /* Margin above and below the description */
//   color: #6b7280; /* Gray color for the description text */
// `;

// const ActionButton = styled.button`
//   margin: 8px 0; /* Margin above and below the button */
//   color: #ffffff; /* White text */
//   background-color: #1e3a8a; /* Dark blue background */
//   border: none; /* No border */
//   border-radius: 6px; /* Rounded corners */
//   padding: 8px 16px; /* Padding inside the button */
//   cursor: pointer; /* Pointer cursor on hover */
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #1e40af; /* Darker blue on hover */
//   }
// `;

// // Main Component
// const FilterLeftSidebar = () => {
//   const navigate = useNavigate();
//   return (
//     <SidebarContainer>
//       <FilterOuter>
//         <Title>Explore Verified Job</Title>
//         <ProfileImage
//           src={nova3}
//           alt="Personalize Jobs"
//         />
//         <Description>
//           Find real, recruiter-reviewed jobs in your domain
//         </Description>
//         <button
//           className="site-button w-100"
//           onClick={() => navigate(" https://novajobs.us/user/job/1")}
//         >
//           {" "}
//           Check Jobs
//         </button>
//       </FilterOuter>

//       <FilterOuter>
//         <ProfileImage
//           src={nova4}
//           alt="Your Groups"
//         />
//         <Subtitle>Join the Community</Subtitle>
//         <Description>
//           Ask questions, share ideas, and grow together with job seekers &
//           mentors{" "}
//         </Description>
//         <button className="site-button w-100"
//          onClick={()=>navigate("https://novajobs.us/user/login")}
//         > Join now</button>
//       </FilterOuter>

//       <FilterOuter>
//         <ProfileImage
//           src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
//           alt="Companies You Follow"
//         />
//         <Subtitle>COMPANIES YOU FOLLOW</Subtitle>
//         <Description>
//           Get alerted when there are new employee reviews.
//         </Description>
//         <button className="site-button w-100"
//          onClick={()=>navigate("https://novajobs.us/user/login")}
//         >Explore Now</button>
//       </FilterOuter>
//     </SidebarContainer>
//   );
// };

// export default FilterLeftSidebar;

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import nova3 from "./assets/nova3.png";
import nova4 from "./assets/nova4.png";

// Styled Components
const SidebarContainer = styled.div`
  padding-left: 16px;
`;

const FilterOuter = styled.div`
  text-align: center;
  margin-bottom: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
`;

const Title = styled.h4`
  margin: 12px 0;
  font-size: 1.25rem;
  color: #1f2937;
  font-weight: 600;
`;

const Subtitle = styled.h6`
  margin: 12px 0;
  font-size: 1rem;
  color: #1f2937;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 0.875rem;
  margin: 8px 0 16px 0;
  color: #6b7280;
  line-height: 1.4;
`;

const ActionButton = styled.button`
  width: 100%;
  margin: 8px 0;
  color: #ffffff;
  background-color: #1e3a8a;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e40af;
  }
`;

// Main Component
const FilterLeftSidebar = () => {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <FilterOuter>
        
        <ProfileImage
          src={nova3}
          alt="Verified Jobs"
        />
        <Subtitle>Explore Verified Jobs</Subtitle>
        <Description>
          Find real, recruiter-reviewed jobs in your domain
        </Description>
        <button
        className="site-button w-100"
          onClick={() => window.open("https://novajobs.us/user/job/1")}
        >
          Check Jobs
        </button>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage
          src={nova4}
          alt="Community"
        />
        <Subtitle>Join the Community</Subtitle>
        <Description>
          Ask questions, share ideas, and grow together with job seekers & mentors
        </Description>
        <button
        className="site-button w-100"
          onClick={() => window.open("https://novajobs.us/user/login")}
        >
          Join Now
        </button>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage
          src="https://www.shutterstock.com/image-vector/3d-illustration-abstract-modern-urban-600nw-2345134001.jpg"
          alt="Companies"
        />
        <Subtitle>Companies You Follow</Subtitle>
        <Description>
          Get alerted when there are new employee reviews
        </Description>
        <button
        className="site-button w-100"
          onClick={() => navigate("/company-list")}
        >
          Explore Now
        </button>
      </FilterOuter>
    </SidebarContainer>
  );
};

export default FilterLeftSidebar;