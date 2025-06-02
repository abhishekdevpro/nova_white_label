// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import nova1 from "./assets/nova1.png"
// import nova2 from "./assets/nova2.png"
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

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
//   font-size: 1.25rem; /* Font size for the title */
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

// // Main Component
// const FilterSidebar = () => {
//   const [userData, setUserData] = useState({
//     first_name: "",
//     last_name: "",
//     photo: "",
//   });
//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const jobSeekerToken = localStorage.getItem("jobSeekerLoginToken");
//         const employerToken = localStorage.getItem("employeeLoginToken");

//         let apiUrl = "";
//         let token = "";

//         if (jobSeekerToken) {
//           apiUrl = "https://apiwl.novajobs.us/api/jobseeker/user-profile";
//           token = jobSeekerToken;
//         } else if (employerToken) {
//           apiUrl = "https://apiwl.novajobs.us/api/employeer/employeer-profile";
//           token = employerToken;
//         } else {
//           console.error("No valid token found.");
//           return;
//         }

//         const response = await axios({
//           method: "GET",
//           url: apiUrl,
//           headers: {
//             Authorization: token,
//           },
//         });

//         const data = response.data.data;

//         if (data.employeer_detail) {
//           setUserData({
//             first_name: data.employeer_detail.first_name,
//             last_name: data.employeer_detail.last_name,
//             photo: data.employeer_detail.photo || "", // Ensure photo fallback if missing
//           });
//         } else {
//           setUserData({
//             first_name: data.first_name,
//             last_name: data.last_name,
//             photo: data.photo || "", // Ensure photo fallback if missing
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);
// console.log(userData,"ududdud");
//   return (
//     <SidebarContainer>
//       <FilterOuter>
//         <ProfileImage
//           src={
//             userData.photo ||
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
//           }
//           alt={`${userData.first_name} ${userData.last_name}`}
//         />
//         <Title>{`${userData.first_name} ${userData.last_name}`}</Title>
//       </FilterOuter>

//       <FilterOuter>
//         <ProfileImage
//           src={nova1}
//           alt="Your Groups"
//         />
//         <Subtitle>AI Edtech Platform</Subtitle>
//         <Description>
//           Learn job-ready skills & earn certificates
//         </Description>
//         <button className="site-button w-100 "
//          onClick={()=>navigate("https://ultraaura.education/home")}
//         > Start Learning</button>
//       </FilterOuter>

//       <FilterOuter>
//         <ProfileImage
//           src={nova2}
//           alt="Companies You Follow"
//         />
//         <Subtitle>AI Resume Builder</Subtitle>
//         <Description>
//           Instantly create job-winning resumes tailored by AI
//         </Description>
//         <button className="site-button w-100"
//          onClick={()=>navigate("https://novajobs.us/user/login")}
//         > Build Resume</button>
//       </FilterOuter>
//     </SidebarContainer>
//   );
// };

// export default FilterSidebar;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import nova1 from "./assets/nova1.png";
import nova2 from "./assets/nova2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Styled Components
const SidebarContainer = styled.div`
  padding-right: 16px;
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
const FilterSidebar = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    photo: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const jobSeekerToken = localStorage.getItem("jobSeekerLoginToken");
        const employerToken = localStorage.getItem("employeeLoginToken");

        let apiUrl = "";
        let token = "";

        if (jobSeekerToken) {
          apiUrl = "https://apiwl.novajobs.us/api/jobseeker/user-profile";
          token = jobSeekerToken;
        } else if (employerToken) {
          apiUrl = "https://apiwl.novajobs.us/api/employeer/employeer-profile";
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

        if (data.company_detail) {
          setUserData({
            first_name: data.company_detail.company_name,
            last_name: data.company_detail.last_name,
            photo: data.company_detail?.logo || "",
          });
        } else {
          setUserData({
            first_name: data.first_name,
            last_name: data.last_name,
            photo: data.photo || "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log(userData, "ududdud");

  return (
    <SidebarContainer>
      <FilterOuter>
        <ProfileImage
          src={
            userData.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
          }
          alt={`${userData.first_name} ${userData?.last_name}`}
        />
        <Title>{`${userData.first_name} ${userData?.last_name === undefined?"" :<span>{userData.last_name}</span>}`}</Title>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage src={nova1} alt="AI Edtech Platform" />
        <Subtitle>AI Edtech Platform</Subtitle>
        <Description>Learn job-ready skills & earn certificates</Description>
        <button
          className="site-button w-100"
          onClick={() => navigate("https://ultraaura.education/home")}
        >
          Start Learning
        </button>
      </FilterOuter>

      <FilterOuter>
        <ProfileImage src={nova2} alt="AI Resume Builder" />
        <Subtitle>AI Resume Builder</Subtitle>
        <Description>
          Instantly create job-winning resumes tailored by AI
        </Description>
        <button
          className="site-button w-100"
          onClick={() => navigate("https://novajobs.us/user/login")}
        >
          Build Resume
        </button>
      </FilterOuter>
    </SidebarContainer>
  );
};

export default FilterSidebar;
