// // import { MdEdit } from "react-icons/md"


// // const TeamSection = ({
// //   teamsData,
// //   isEdit,
// //   handleEditClick,
// //   handleImageError,
// //   BASE_IMAGE_URL,
// //   FALLBACK_IMAGES,
// // }) => {
// //   return (
// //     <section id="teams" className="section">
// //       {isEdit && (
// //         <button className="edit-button" onClick={() => handleEditClick("teams")}>
// //           <MdEdit size={18} />
// //           Edit Team
// //         </button>
// //       )}
// //       <h2 className="section-title">Our Leadership Team</h2>
// //       <div className="teams-container">
// //         {(teamsData.length > 0 ? teamsData : FALLBACK_IMAGES.team).map((team, index) => (
// //           <div key={index} className="team-member">
// //             <img
// //               src={`${BASE_IMAGE_URL}${team.image}`}
// //               alt={team.name}
// //               className="team-image"
// //               onError={handleImageError}
// //             />
// //             <h3 className="team-name">{team.name}</h3>
// //             <p className="team-position">{team.position}</p>
// //             <p className="team-bio">{team.bio}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   )
// // }

// // export default TeamSection


// import React from 'react';
// import { MdEdit } from "react-icons/md";
// import parse from 'html-react-parser';
// const TeamSection = ({
//   teamsData,
//   isEdit,
//   handleEditClick,
//   handleImageError,
//   BASE_IMAGE_URL,
//   FALLBACK_IMAGES,
// }) => {
  
//   const styles = {
//     section: {
//       marginBottom: "8rem",
//       padding: "3rem",
//       backgroundColor: "#ffffff",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//       position: "relative",
//       '@media (max-width: 768px)': {
//         padding: "2rem 1rem",
//         marginBottom: "4rem",
//       },
//     },
//     sectionTitle: {
//       fontSize: "2.5rem",
//       fontWeight: "bold",
//       color: "#1e40af",
//       marginBottom: "3rem",
//       textAlign: "center",
//       position: "relative",
//       '&::after': {
//         content: '""',
//         position: "absolute",
//         bottom: "-1rem",
//         left: "50%",
//         transform: "translateX(-50%)",
//         width: "80px",
//         height: "4px",
//         backgroundColor: "#1e40af",
//         borderRadius: "2px",
//       },
//       '@media (max-width: 768px)': {
//         fontSize: "2rem",
//         marginBottom: "2rem",
//       },
//       '@media (max-width: 480px)': {
//         fontSize: "1.75rem",
//       },
//     },
//     editButton: {
//       position: "absolute",
//       top: "1rem",
//       right: "1rem",
//       display: "flex",
//       alignItems: "center",
//       gap: "0.5rem",
//       padding: "0.5rem 1rem",
//       backgroundColor: "#1e40af",
//       color: "#ffffff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       transition: "all 0.2s ease",
//       fontSize: "0.875rem",
//       fontWeight: "500",
//       '&:hover': {
//         backgroundColor: "#1e3a8a",
//         transform: "translateY(-2px)",
//       },
//       '@media (max-width: 480px)': {
//         fontSize: "0.75rem",
//         padding: "0.4rem 0.8rem",
//         gap: "0.3rem",
//       },
//     },
//     teamsContainer: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//       gap: "2rem",
//       margin: "0 auto",
//       '@media (max-width: 768px)': {
//         gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//         gap: "1.5rem",
//       },
//       '@media (max-width: 480px)': {
//         gridTemplateColumns: "1fr",
//         gap: "1rem",
//       },
//     },
//     teamMember: {
//       textAlign: "center",
//       padding: "2rem",
//       backgroundColor: "#f8fafc",
//       borderRadius: "12px",
//       transition: "all 0.3s ease",
//       '&:hover': {
//         backgroundColor: "#f0f7ff",
//         transform: "translateY(-4px)",
//       },
//       '@media (max-width: 768px)': {
//         padding: "1.5rem",
//       },
//       '@media (max-width: 480px)': {
//         padding: "1rem",
//       },
//     },
//     teamImage: {
//       width: "150px",
//       height: "150px",
//       borderRadius: "50%",
//       objectFit: "cover",
//       marginBottom: "1.5rem",
//       border: "4px solid #ffffff",
//       boxShadow: "0 4px 6px rgba(30, 64, 175, 0.1)",
//       '@media (max-width: 768px)': {
//         width: "150px",
//         height: "150px",
//         marginBottom: "1rem",
//       },
//       '@media (max-width: 480px)': {
//         width: "80px",
//         height: "80px",
//         border: "3px solid #ffffff",
//       },
//     },
//     teamName: {
//       fontSize: "1.5rem",
//       fontWeight: 600,
//       color: "#1e40af",
//       marginBottom: "0.5rem",
//       '@media (max-width: 768px)': {
//         fontSize: "1.25rem",
//       },
//       '@media (max-width: 480px)': {
//         fontSize: "1.1rem",
//       },
//     },
//     teamPosition: {
//       color: "#6b7280",
//       fontSize: "1rem",
//       marginBottom: "1rem",
//       '@media (max-width: 768px)': {
//         fontSize: "0.9rem",
//         marginBottom: "0.75rem",
//       },
//       '@media (max-width: 480px)': {
//         fontSize: "0.85rem",
//       },
//     },
//     teamBio: {
//       color: "#4b5563",
//       fontSize: "1rem",
//       lineHeight: "1.6",
//       '@media (max-width: 768px)': {
//         fontSize: "0.9rem",
//         lineHeight: "1.5",
//       },
//       '@media (max-width: 480px)': {
//         fontSize: "0.85rem",
//         lineHeight: "1.4",
//       },
//     },
//   };

//   return (
//     <section id="teams" style={styles.section}>
//       {isEdit && (
//         <button style={styles.editButton} onClick={() => handleEditClick("teams")}>
//           <MdEdit size={18} />
//           Edit Team
//         </button>
//       )}
//       <h2 style={styles.sectionTitle}>Our Leadership Team</h2>
//       <div style={styles.teamsContainer}>
//         {(teamsData.length > 0 ? teamsData : FALLBACK_IMAGES.team).map((team, index) => (
//           <div key={index} style={styles.teamMember}>
//             <img
//               src={`${BASE_IMAGE_URL}${team.media}`}
//               alt={team.name}
//               style={styles.teamImage}
//               onError={handleImageError}
//             />
//             <h3 style={styles.teamName}>{team.name}</h3>
//             <p style={styles.teamPosition}>{parse(team.description)}</p>
//             {/* <p style={styles.teamBio}>{team.bio}</p> */}
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default TeamSection;


import React from 'react';
import { MdEdit } from "react-icons/md";
import parse from 'html-react-parser';
import styled from 'styled-components';

// Styled Components
const Section = styled.section`
  margin-bottom: 8rem;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: #1e40af;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #1e40af;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background-color: #1e3a8a;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    gap: 0.3rem;
  }
`;

const TeamsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const TeamMember = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f7ff;
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TeamImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 6px rgba(30, 64, 175, 0.1);

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    border: 3px solid #ffffff;
  }
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const TeamPosition = styled.div`
  color: #6b7280;
  font-size: 1rem;
  margin-bottom: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const TeamSection = ({
  teamsData,
  isEdit,
  handleEditClick,
  handleImageError,
  BASE_IMAGE_URL,
  FALLBACK_IMAGES,
}) => {
  return (
    <Section id="teams">
      {isEdit && (
        <EditButton onClick={() => handleEditClick("teams")}>
          <MdEdit size={18} />
          Edit Team
        </EditButton>
      )}
      <SectionTitle>Our Leadership Team</SectionTitle>
      <TeamsContainer>
        {(teamsData.length > 0 ? teamsData : FALLBACK_IMAGES.team).map((team, index) => (
          <TeamMember key={index}>
            <TeamImage
              src={`${BASE_IMAGE_URL}${team.media}`}
              alt={team.name}
              onError={handleImageError}
            />
            <TeamName>{team.name}</TeamName>
            <TeamPosition>{parse(team.description)}</TeamPosition>
          </TeamMember>
        ))}
      </TeamsContainer>
    </Section>
  );
};

export default TeamSection;