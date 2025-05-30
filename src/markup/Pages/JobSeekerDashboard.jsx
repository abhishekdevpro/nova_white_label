// // import React from 'react';
// // import styled from 'styled-components';
// // import UserHeader2 from '../Layout/Header2';
// // import Profilesidebar from '../Element/Profilesidebar';

// // // Color scheme based on the image
// // const colors = {
// //   primary: '#1a237e', // Dark blue from NOVA logo
// //   secondary: '#e4e7ff', // Light blue for highlights
// //   accent: '#c5103a', // Red from the logo star
// //   white: '#ffffff',
// //   lightGray: '#f5f6fa',
// //   darkGray: '#4a4a4a',
// // };

// // // Styled Components
// // const DashboardContainer = styled.div`

// //   max-width: 1200px;
// //   margin: 0 auto;
// //   padding: 20px;
// //   font-family: 'Segoe UI', 'Roboto', sans-serif;
// // `;

// // const Title = styled.h1`
// //   color: ${colors.primary};
// //   margin-bottom: 30px;
// //   font-size: 28px;
// //   border-bottom: 2px solid ${colors.lightGray};
// //   padding-bottom: 15px;
// // `;

// // const CardsContainer = styled.div`
// //   display: grid;
// //   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
// //   gap: 20px;
// //   margin-top: 20px;

// //   @media (max-width: 768px) {
// //     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// //   }

// //   @media (max-width: 480px) {
// //     grid-template-columns: 1fr;
// //   }
// // `;

// // const Card = styled.div`
// //   background-color: ${colors.white};
// //   border-radius: 8px;
// //   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
// //   padding: 20px;
// //   text-align: center;
// //   transition: transform 0.3s, box-shadow 0.3s;
// //   cursor: pointer;
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   min-height: 180px;

// //   &:hover {
// //     transform: translateY(-5px);
// //     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
// //   }
// // `;

// // const CardIcon = styled.div`
// //   font-size: 36px;
// //   margin-bottom: 15px;
// //   color: ${colors.primary};
// // `;

// // const CardTitle = styled.h3`
// //   color: ${colors.primary};
// //   margin-bottom: 10px;
// //   font-size: 18px;
// // `;

// // const CardDescription = styled.p`
// //   color: ${colors.darkGray};
// //   font-size: 14px;
// //   line-height: 1.4;
// // `;

// // const WelcomeSection = styled.div`
// //   background-color: ${colors.secondary};
// //   padding: 20px;
// //   border-radius: 8px;
// //   margin-bottom: 30px;
// // `;

// // const WelcomeTitle = styled.h2`
// //   color: ${colors.primary};
// //   margin-bottom: 10px;
// // `;

// // const WelcomeText = styled.p`
// //   color: ${colors.darkGray};
// //   line-height: 1.5;
// // `;

// // const ActionButton = styled.button`
// //   background-color: ${colors.primary};
// //   color: ${colors.white};
// //   border: none;
// //   padding: 10px 15px;
// //   border-radius:.25rem;
// //   font-weight: bold;
// //   cursor: pointer;
// //   transition: background-color 0.2s;
// //   margin-top: 12px;

// //   &:hover {
// //     background-color: #0e1451;
// //   }
// // `;

// // const StatusBar = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   background-color: ${colors.lightGray};
// //   padding: 15px 20px;
// //   border-radius: 8px;
// //   margin-bottom: 20px;

// //   @media (max-width: 640px) {
// //     flex-direction: column;
// //     align-items: flex-start;
// //   }
// // `;

// // const StatusItem = styled.div`
// //   display: flex;
// //   align-items: center;

// //   @media (max-width: 640px) {
// //     margin-bottom: 10px;
// //   }
// // `;

// // const StatusLabel = styled.span`
// //   color: ${colors.darkGray};
// //   margin-right: 5px;
// // `;

// // const StatusValue = styled.span`
// //   color: ${colors.primary};
// //   font-weight: bold;
// // `;

// // // Main Component
// // const JobSeekerDashboard = () => {
// //   return (
// //     <>
// //     <UserHeader2 />
// //        <DashboardContainer>
// //        <Profilesidebar data={"dashboard"} />
// //       <Title>My Dashboard</Title>

// //       <WelcomeSection>
// //         <WelcomeTitle>Welcome back!</WelcomeTitle>
// //         <WelcomeText>
// //           Here you can manage your job search activities, create and update your resumes,
// //           and improve your skills to stand out to employers.
// //         </WelcomeText>
// //       </WelcomeSection>

// //       <StatusBar>
// //         <StatusItem>
// //           <StatusLabel>Resume Completion:</StatusLabel>
// //           <StatusValue>75%</StatusValue>
// //         </StatusItem>
// //         <StatusItem>
// //           <StatusLabel>Applications Submitted:</StatusLabel>
// //           <StatusValue>12</StatusValue>
// //         </StatusItem>
// //         <StatusItem>
// //           <StatusLabel>Skill Test Completed:</StatusLabel>
// //           <StatusValue>3</StatusValue>
// //         </StatusItem>
// //       </StatusBar>

// //       <CardsContainer>
// //         <Card>
// //           <CardIcon>📝</CardIcon>
// //           <CardTitle>Create Resume</CardTitle>
// //           <CardDescription>Build a professional resume with our AI-powered resume builder.</CardDescription>
// //           <ActionButton>Create Now</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>📋</CardIcon>
// //           <CardTitle>Cover Letters</CardTitle>
// //           <CardDescription>Craft compelling cover letters tailored to specific positions.</CardDescription>
// //           <ActionButton>Get Started</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>🧠</CardIcon>
// //           <CardTitle>Skill Tests</CardTitle>
// //           <CardDescription>Take skill assessments to showcase your abilities to employers.</CardDescription>
// //           <ActionButton>Start Test</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>📈</CardIcon>
// //           <CardTitle>Upgrade Skills</CardTitle>
// //           <CardDescription>Explore courses and resources to enhance your professional skills.</CardDescription>
// //           <ActionButton>Explore</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>❤️</CardIcon>
// //           <CardTitle>Saved Jobs</CardTitle>
// //           <CardDescription>View and manage your saved job listings.</CardDescription>
// //           <ActionButton>View List</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>📊</CardIcon>
// //           <CardTitle>Application Status</CardTitle>
// //           <CardDescription>Track the status of your job applications.</CardDescription>
// //           <ActionButton>Track Now</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>👥</CardIcon>
// //           <CardTitle>Community</CardTitle>
// //           <CardDescription>Connect with other job seekers and professionals.</CardDescription>
// //           <ActionButton>Join Now</ActionButton>
// //         </Card>

// //         <Card>
// //           <CardIcon>💬</CardIcon>
// //           <CardTitle>Messages</CardTitle>
// //           <CardDescription>Check your inbox for messages from employers and recruiters.</CardDescription>
// //           <ActionButton>Open Inbox</ActionButton>
// //         </Card>
// //       </CardsContainer>
// //     </DashboardContainer>
// //     </>
// //   );
// // };

// // export default JobSeekerDashboard;

// import React from 'react';
// import styled from 'styled-components';
// import {
//   FileText,
//   FileSignature,
//   Brain,
//   TrendingUp,
//   Heart,
//   BarChart2,
//   Users,
//   MessageSquare
// } from 'lucide-react';
// import Profilesidebar from '../Element/Profilesidebar';
// import UserHeader2 from '../Layout/Header2';
// import { useSelector } from 'react-redux';

// // Assuming these components are already defined elsewhere in your project

// // Color scheme based on the image
// const colors = {
//   primary: '#1a237e', // Dark blue from NOVA logo
//   secondary: '#e4e7ff', // Light blue for highlights
//   accent: '#c5103a', // Red from the logo star
//   white: '#ffffff',
//   lightGray: '#f5f6fa',
//   darkGray: '#4a4a4a',
// };

// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   width: 100%;
//   max-width:1140px;
//   margin:auto;
//   justify-content:center;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const ContentContainer = styled.div`
//   flex: 1;
//   padding: 20px;
//   font-family: 'Segoe UI', 'Roboto', sans-serif;
//   margin-left: 20px;

//   @media (max-width: 768px) {
//     margin-left: 0;
//     margin-top: 20px;
//   }
// `;

// const Title = styled.h1`
//   color: ${colors.primary};
//   margin-bottom: 30px;
//   font-size: 28px;
//   border-bottom: 2px solid ${colors.lightGray};
//   padding-bottom: 15px;
// `;

// const CardsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//   gap: 20px;
//   margin-top: 20px;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//   }

//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const Card = styled.div`
//   background-color: ${colors.white};
//   border-radius: 8px;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//   padding: 20px;
//   text-align: center;
//   transition: transform 0.3s, box-shadow 0.3s;
//   cursor: pointer;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 180px;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
//   }
// `;

// const CardIcon = styled.div`
//   margin-bottom: 15px;
//   color: ${colors.primary};
// `;

// const CardTitle = styled.h3`
//   color: ${colors.primary};
//   margin-bottom: 10px;
//   font-size: 18px;
// `;

// const CardDescription = styled.p`
//   color: ${colors.darkGray};
//   font-size: 14px;
//   line-height: 1.4;
// `;

// const WelcomeSection = styled.div`
//   background-color: ${colors.secondary};
//   padding: 20px;
//   border-radius: 8px;
//   margin-bottom: 30px;
// `;

// const WelcomeTitle = styled.h2`
//   color: ${colors.primary};
//   margin-bottom: 10px;
// `;

// const WelcomeText = styled.p`
//   color: ${colors.darkGray};
//   line-height: 1.5;
// `;

// const ActionButton = styled.button`
//   background-color: ${colors.primary};
//   color: ${colors.white};
//   border: none;
//   padding: 10px 15px;
//   border-radius: .25rem;
//   font-weight: bold;
//   cursor: pointer;
//   transition: background-color 0.2s;
//   margin-top: 12px;

//   &:hover {
//     background-color: #0e1451;
//   }
// `;

// const StatusBar = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   background-color: ${colors.lightGray};
//   padding: 15px 20px;
//   border-radius: 8px;
//   margin-bottom: 20px;

//   @media (max-width: 640px) {
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

// const StatusItem = styled.div`
//   display: flex;
//   align-items: center;

//   @media (max-width: 640px) {
//     margin-bottom: 10px;
//   }
// `;

// const StatusLabel = styled.span`
//   color: ${colors.darkGray};
//   margin-right: 5px;
// `;

// const StatusValue = styled.span`
//   color: ${colors.primary};
//   font-weight: bold;
// `;

// // Main Component
// const JobSeekerDashboard = () => {
//     const cardData = [
//         {
//           icon: <FileText size={36} color={colors.primary} />,
//           title: "Create Resume",
//           description: "Build a professional resume with our AI-powered resume builder.",
//           buttonText: "Create Now",
//           route: "/resume/builder"
//         },
//         {
//           icon: <FileSignature size={36} color={colors.primary} />,
//           title: "Cover Letters",
//           description: "Craft compelling cover letters tailored to specific positions.",
//           buttonText: "Get Started",
//           route: "/cover-letters"
//         },
//         {
//           icon: <Brain size={36} color={colors.primary} />,
//           title: "Skill Tests",
//           description: "Take skill assessments to showcase your abilities to employers.",
//           buttonText: "Start Test",
//           route: "/skill-tests"
//         },
//         {
//           icon: <TrendingUp size={36} color={colors.primary} />,
//           title: "Upgrade Skills",
//           description: "Explore courses and resources to enhance your professional skills.",
//           buttonText: "Explore",
//           route: "/skill-upgrade"
//         },
//         {
//           icon: <Heart size={36} color={colors.primary} />,
//           title: "Saved Jobs",
//           description: "View and manage your saved job listings.",
//           buttonText: "View List",
//           route: "/saved-jobs"
//         },
//         {
//           icon: <BarChart2 size={36} color={colors.primary} />,
//           title: "Application Status",
//           description: "Track the status of your job applications.",
//           buttonText: "Track Now",
//           route: "/applications"
//         },
//         {
//           icon: <Users size={36} color={colors.primary} />,
//           title: "Community",
//           description: "Connect with other job seekers and professionals.",
//           buttonText: "Join Now",
//           route: "/community"
//         },
//         {
//           icon: <MessageSquare size={36} color={colors.primary} />,
//           title: "Messages",
//           description: "Check your inbox for messages from employers and recruiters.",
//           buttonText: "Open Inbox",
//           route: "/messages"
//         }
//       ];
//   return (
//     <>
//       <UserHeader2 />
//       <DashboardContainer>
//         <Profilesidebar data={"dashboard"} />
//         <ContentContainer>
//           {/* <Title>My Dashboard</Title> */}

//           <WelcomeSection>
//             <WelcomeTitle>Welcome back!</WelcomeTitle>
//             <WelcomeText>
//               Here you can manage your job search activities, create and update your resumes,
//               and improve your skills to stand out to employers.
//             </WelcomeText>
//           </WelcomeSection>

//           {/* <StatusBar>
//             <StatusItem>
//               <StatusLabel>Resume Completion:</StatusLabel>
//               <StatusValue>75%</StatusValue>
//             </StatusItem>
//             <StatusItem>
//               <StatusLabel>Applications Submitted:</StatusLabel>
//               <StatusValue>12</StatusValue>
//             </StatusItem>
//             <StatusItem>
//               <StatusLabel>Skill Test Completed:</StatusLabel>
//               <StatusValue>3</StatusValue>
//             </StatusItem>
//           </StatusBar> */}

//           {/* <CardsContainer>
//             <Card>
//               <CardIcon>
//                 <FileText size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Create Resume</CardTitle>
//               <CardDescription>Build a professional resume with our AI-powered resume builder.</CardDescription>
//               <ActionButton>Create Now</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <FileSignature size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Cover Letters</CardTitle>
//               <CardDescription>Craft compelling cover letters tailored to specific positions.</CardDescription>
//               <ActionButton>Get Started</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <Brain size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Skill Tests</CardTitle>
//               <CardDescription>Take skill assessments to showcase your abilities to employers.</CardDescription>
//               <ActionButton>Start Test</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <TrendingUp size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Upgrade Skills</CardTitle>
//               <CardDescription>Explore courses and resources to enhance your professional skills.</CardDescription>
//               <ActionButton>Explore</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <Heart size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Saved Jobs</CardTitle>
//               <CardDescription>View and manage your saved job listings.</CardDescription>
//               <ActionButton>View List</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <BarChart2 size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Application Status</CardTitle>
//               <CardDescription>Track the status of your job applications.</CardDescription>
//               <ActionButton>Track Now</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <Users size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Community</CardTitle>
//               <CardDescription>Connect with other job seekers and professionals.</CardDescription>
//               <ActionButton>Join Now</ActionButton>
//             </Card>

//             <Card>
//               <CardIcon>
//                 <MessageSquare size={36} color={colors.primary} />
//               </CardIcon>
//               <CardTitle>Messages</CardTitle>
//               <CardDescription>Check your inbox for messages from employers and recruiters.</CardDescription>
//               <ActionButton>Open Inbox</ActionButton>
//             </Card>
//           </CardsContainer> */}
//           <CardsContainer>
//             {cardData.map((card, index) => (
//               <CardLink to={card.route} key={index}>
//                 <Card>
//                   <CardIcon>
//                     {card.icon}
//                   </CardIcon>
//                   <CardTitle>{card.title}</CardTitle>
//                   <CardDescription>{card.description}</CardDescription>
//                   <ActionButton>{card.buttonText}</ActionButton>
//                 </Card>
//               </CardLink>
//             ))}
//           </CardsContainer>
//         </ContentContainer>
//       </DashboardContainer>
//     </>
//   );
// };

// export default JobSeekerDashboard;

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FileText,
  FileSignature,
  Brain,
  TrendingUp,
  Heart,
  BarChart2,
  Users,
  MessageSquare,
} from "lucide-react";
import UserHeader2 from "../Layout/Header2";
import Profilesidebar from "../Element/Profilesidebar";

// Assuming these components are already defined elsewhere in your project

// Color scheme based on the image
const colors = {
  primary: "#1a237e", // Dark blue from NOVA logo
  secondary: "#e4e7ff", // Light blue for highlights
  accent: "#c5103a", // Red from the logo star
  white: "#ffffff",
  lightGray: "#f5f6fa",
  darkGray: "#4a4a4a",
};

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1140px;
  margin: auto;
  padding-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  font-family: "Segoe UI", "Roboto", sans-serif;
  margin-left: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

const Title = styled.h1`
  color: ${colors.primary};
  margin-bottom: 30px;
  font-size: 28px;
  border-bottom: 2px solid ${colors.lightGray};
  padding-bottom: 15px;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

const Card = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled.div`
  margin-bottom: 15px;
  color: ${colors.primary};
`;

const CardTitle = styled.h3`
  color: ${colors.primary};
  margin-bottom: 10px;
  font-size: 18px;
`;

const CardDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 1.4;
`;

const WelcomeSection = styled.div`
  background-color: ${colors.secondary};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
`;

const WelcomeTitle = styled.h2`
  color: ${colors.primary};
  margin-bottom: 10px;
`;

const WelcomeText = styled.p`
  color: ${colors.darkGray};
  line-height: 1.5;
`;

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 10px 15px;
  border-radius: 0.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 12px;

  &:hover {
    background-color: #0e1451;
  }
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.lightGray};
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 640px) {
    margin-bottom: 10px;
  }
`;

const StatusLabel = styled.span`
  color: ${colors.darkGray};
  margin-right: 5px;
`;

const StatusValue = styled.span`
  color: ${colors.primary};
  font-weight: bold;
`;

// Main Component
const JobSeekerDashboard = () => {
  // Define card data with routes
  const token = localStorage.getItem("jobSeekerLoginToken");
  const cardData = [
    {
      icon: <FileText size={36} color={colors.primary} />,
      title: "Create Resume",
      description:
        "Build a professional resume with our AI-powered resume builder.",
      buttonText: "Create Now",
      route: `https://airesume.novajobs.us/?tokenbyurl=${token}`,
    },
    {
      icon: <FileSignature size={36} color={colors.primary} />,
      title: "Cover Letters",
      description:
        "Craft compelling cover letters tailored to specific positions.",
      buttonText: "Get Started",
      route: `https://airesume.novajobs.us/?tokenbyurl=${token}`,
    },
    {
      icon: <Brain size={36} color={colors.primary} />,
      title: "Skill Tests",
      description:
        "Take skill assessments to showcase your abilities to employers.",
      buttonText: "Start Test",
      route: "/user/skill-test",
    },
    // {
    //   icon: <TrendingUp size={36} color={colors.primary} />,
    //   title: "Upgrade Skills",
    //   description: "Explore courses and resources to enhance your professional skills.",
    //   buttonText: "Explore",
    //   route: "/skill-upgrade"
    // },
    {
      icon: <Heart size={36} color={colors.primary} />,
      title: "Saved Jobs",
      description: "View and manage your saved job listings.",
      buttonText: "View List",
      route: "/user/jobs-saved-jobs",
    },
    // {
    //   icon: <BarChart2 size={36} color={colors.primary} />,
    //   title: "Application Status",
    //   description: "Track the status of your job applications.",
    //   buttonText: "Track Now",
    //   route: "/applications"
    // },
    {
      icon: <Users size={36} color={colors.primary} />,
      title: "Community",
      description: "Connect with other job seekers and professionals.",
      buttonText: "Join Now",
      route: "/user/community",
    },
    {
      icon: <MessageSquare size={36} color={colors.primary} />,
      title: "Messages",
      description:
        "Check your inbox for messages from employers and recruiters.",
      buttonText: "Open Inbox",
      route: "/user/messages",
    },
  ];

  return (
    <>
      <UserHeader2 />
      <DashboardContainer>
        <Profilesidebar data={"dashboard"} />
        <ContentContainer>
          {/* <Title>My Dashboard</Title> */}

          <WelcomeSection>
            <WelcomeTitle>Welcome back!</WelcomeTitle>
            <WelcomeText>
              Here you can manage your job search activities, create and update
              your resumes, and improve your skills to stand out to employers.
            </WelcomeText>
          </WelcomeSection>

          {/* <StatusBar>
            <StatusItem>
              <StatusLabel>Resume Completion:</StatusLabel>
              <StatusValue>75%</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>Applications Submitted:</StatusLabel>
              <StatusValue>12</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>Skill Test Completed:</StatusLabel>
              <StatusValue>3</StatusValue>
            </StatusItem>
          </StatusBar> */}

          <CardsContainer>
            {cardData.map((card, index) => (
              <CardLink to={card.route} key={index}>
                <Card>
                  <CardIcon>{card.icon}</CardIcon>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                  <ActionButton>{card.buttonText}</ActionButton>
                </Card>
              </CardLink>
            ))}
          </CardsContainer>
        </ContentContainer>
      </DashboardContainer>
    </>
  );
};

export default JobSeekerDashboard;
