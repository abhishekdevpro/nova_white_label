import { MdEdit } from "react-icons/md"



const TeamSection = ({
  teamsData,
  isEdit,
  handleEditClick,
  handleImageError,
  BASE_IMAGE_URL,
  FALLBACK_IMAGES,
}) => {
  return (
    <section id="teams" className="section">
      {isEdit && (
        <button className="edit-button" onClick={() => handleEditClick("teams")}>
          <MdEdit size={18} />
          Edit Team
        </button>
      )}
      <h2 className="section-title">Our Leadership Team</h2>
      <div className="teams-container">
        {(teamsData.length > 0 ? teamsData : FALLBACK_IMAGES.team).map((team, index) => (
          <div key={index} className="team-member">
            <img
              src={`${BASE_IMAGE_URL}${team.image}`}
              alt={team.name}
              className="team-image"
              onError={handleImageError}
            />
            <h3 className="team-name">{team.name}</h3>
            <p className="team-position">{team.position}</p>
            <p className="team-bio">{team.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamSection
