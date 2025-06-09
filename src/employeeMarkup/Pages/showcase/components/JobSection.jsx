
import { MdEdit, MdBusiness, MdLocationOn, MdOutlineHealthAndSafety } from "react-icons/md"



const JobsSection= ({ jobs, isEdit, handleEditClick, navigate }) => {
  return (
    <section id="jobs" className="section">
      {isEdit && (
        <button className="edit-button" onClick={() => handleEditClick("jobs")}>
          <MdEdit size={18} />
          Edit Jobs
        </button>
      )}
      <h2 className="section-title">Open Positions</h2>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-header">
              <h3 className="job-title">{job.job_detail.job_title}</h3>
              <button className="job-view-button" onClick={() => navigate(`/user/jobs/${job.job_detail.id}`)}>
                View
              </button>
            </div>

            <div className="job-details">
              <div className="job-detail">
                <MdBusiness size={20} />
                <span>{job.job_type.name}</span>
              </div>
              <div className="job-detail">
                <MdLocationOn size={20} />
                <span>{`${job.cities.name}, ${job.states.name}, ${job.countries.name}`}</span>
              </div>
              <div className="job-detail">
                <MdOutlineHealthAndSafety size={20} />
                <span>{job.experience_level.name}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-jobs">No open positions at the moment. Please check back later.</div>
      )}
    </section>
  )
}

export default JobsSection
