// "use client"
// import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRegHeart, FaHeart } from "react-icons/fa"
// import moment from "moment"

// function JobCard({ job, onSelect }) {
//   const defaultLogo = "https://www.shutterstock.com/image-vector/circle-business-logo-company-name-260nw-1922534714.jpg"
// console.log(`https://apiwl.novajobs.us${job.companies?.logo}`,job,"job hu")
//   return (
//     <div className="job-card bg-white p-3 mb-3 rounded shadow-sm">
//       <div className="d-flex justify-content-between">
//         <div className="d-flex">
//           <div className="company-logo me-3">
//             <img
//               src={`https://apiwl.novajobs.us${job.companies?.logo}` || defaultLogo}
//               alt={job.companies?.company_name}
//               className="rounded"
//               style={{ width: "50px", height: "50px", objectFit: "contain" }}
//             />
//           </div>
//           <div className="job-info">
//             <h5 className="job-title mb-1" style={{ fontSize: "16px", fontWeight: "500" }}>
//               {job.job_detail?.job_title}
//             </h5>
//             <p className="company-name mb-1" style={{ fontSize: "14px", color: "#666" }}>
//               {job.companies?.company_name}
//             </p>
//             <div className="job-location d-flex align-items-center mb-1" style={{ fontSize: "13px", color: "#666" }}>
//               <FaMapMarkerAlt className="me-1" size={12} />
//               <span>
//                 {job.cities?.name}, {job.states?.name}, {job.companies?.countries?.name}
//               </span>
//             </div>
//             <div className="job-meta d-flex flex-wrap" style={{ fontSize: "13px" }}>
//               {job.job_detail?.experience_level && (
//                 <div className="me-3 d-flex align-items-center">
//                   <FaRegClock className="me-1" size={12} />
//                   <span>{job.job_detail?.experience_level}</span>
//                 </div>
//               )}
//               {job.job_detail?.salary_range && (
//                 <div className="me-3 d-flex align-items-center">
//                   <FaRupeeSign className="me-1" size={12} />
//                   <span>{job.job_detail?.salary_range}</span>
//                 </div>
//               )}
//               <div className="posted-time ms-auto text-muted">{moment(job.job_detail?.created_at).fromNow()}</div>
//             </div>
//           </div>
//         </div>
//         <div className="favorite-icon">
//           {job.job_detail?.is_job_favorite ? <FaHeart color="#dc3545" /> : <FaRegHeart />}
//         </div>
//       </div>

//       <div className="job-tags mt-2">
//         {job.job_workplace_types?.name && (
//           <span className="badge bg-light text-dark me-2">{job.job_workplace_types?.name}</span>
//         )}
//         {job.job_type?.name && <span className="badge bg-light text-dark me-2">{job.job_type?.name}</span>}
//         {job.job_category?.name && <span className="badge bg-light text-dark me-2">{job.job_category?.name}</span>}
//       </div>

//       <div className="job-skills mt-2">
//         {job.job_detail?.skills_arr &&
//           job.job_detail?.skills_arr.slice(0, 3).map((skill, index) => (
//             <span key={index} className="badge bg-primary me-1">
//               {skill}
//             </span>
//           ))}
//         {job.job_detail?.skills_arr && job.job_detail?.skills_arr.length > 3 && (
//           <span className="badge bg-secondary">+{job.job_detail?.skills_arr.length - 3}</span>
//         )}
//       </div>

//       <div className="job-actions d-flex justify-content-between mt-3">
//         <button className="btn btn-outline-primary btn-sm" onClick={() => onSelect(job)}>
//           View Job
//         </button>
//         <button className="btn btn-danger btn-sm">Quick Apply</button>
//       </div>
//     </div>
//   )
// }

// export default JobCard


"use client"
import { FaMapMarkerAlt, FaRegClock, FaRupeeSign, FaRegHeart, FaHeart } from "react-icons/fa"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"
import { useSelector } from "react-redux"

function JobCard({ job, onSelect }) {
  const defaultLogo = "https://www.shutterstock.com/image-vector/circle-business-logo-company-name-260nw-1922534714.jpg"
  const navigate = useNavigate()
  const token = localStorage.getItem("jobSeekerLoginToken")
  const screeningQuestion = useSelector(
        (state) => state.jobApplicationScreeningQues.selectedScreeningQuestions
      );
  const handleApply = async (jobId) => {
    
    if (!token) {
      toast.error("Please login to apply for this job");
      navigate("/user/login");
      return;
    }

    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/jobseeker/jobs-applied",
        {
          job_id: jobId,
          screen_questions: screeningQuestion,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response?.data) {
        console.log(response, "appli");
        toast.success("Application submitted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit application. Please try again.");
    }
  };
  return (
   <div className="job-card mb-3 rounded-3 shadow-sm position-relative transition"
      style={{ 
        padding: '20px',
        backgroundColor: '#f4f9ff',
        borderRadius: '16px !important'
      }}
    >
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="d-flex align-items-start">
          {/* Company Logo */}
          <div className="company-logo me-3 flex-shrink-0">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: "40px", 
                height: "40px",
                backgroundColor: '#ff4757',
                overflow: 'hidden'
              }}
            >
              <img
                src={`https://apiwl.novajobs.us${job.companies?.logo}` || defaultLogo}
                alt={job.companies?.company_name}
                className="w-100 h-100 rounded-circle"
                style={{ 
                  objectFit: "cover"
                }}
              />
            </div>
          </div>

          {/* Company Info */}
          <div className="company-info">
            <h6 
              className="company-name mb-1 fw-medium"
              style={{ 
                fontSize: '14px',
                color: '#333',
                fontWeight: '500'
              }}
            >
              {job.companies?.company_name}
            </h6>
            <p 
              className="posted-time mb-0"
              style={{ 
                fontSize: '12px',
                color: '#999',
                margin: '0'
              }}
            >
              {moment(job.job_detail?.created_at).fromNow()}
            </p>
          </div>
        </div>

        {/* Favorite Icon */}
        <div className="favorite-icon">
          <button 
            className="btn btn-link p-0 border-0"
            style={{ 
              color: '#ccc',
              fontSize: '18px'
            }}
          >
            {job.job_detail?.is_job_favorite ? 
              <FaHeart color="#ff4757" /> : 
              <FaRegHeart color="#ccc" />
            }
          </button>
        </div>
      </div>

      {/* Job Title */}
      <div className="mb-3">
        <h4 
          className="job-title mb-0 fw-bold"
          style={{ 
            fontSize: '20px',
            color: '#333',
            fontWeight: '600',
            lineHeight: '1.3'
          }}
        >
          {job.job_detail?.job_title}
        </h4>
      </div>

      {/* Location */}
      <div className="mb-3">
        <div 
          className="d-flex align-items-center"
          style={{ 
            fontSize: '14px',
            color: '#666'
          }}
        >
          <FaMapMarkerAlt className="me-2" size={14} style={{ color: '#999' }} />
          <span>
            {job.cities?.name}, {job.states?.name}, {job.companies?.countries?.name}
          </span>
        </div>
      </div>

      {/* Experience and Salary */}
      <div className="mb-4">
        <div className="d-flex align-items-center flex-wrap">
          {job.job_detail?.experience_level && (
            <div 
              className="d-flex align-items-center me-4"
              style={{ fontSize: '14px', color: '#666' }}
            >
              <FaRegClock className="me-2" size={14} style={{ color: '#999' }} />
              <span>{job.job_detail?.experience_level}</span>
            </div>
          )}
          
          {job.job_detail?.salary_range && (
            <div 
              className="d-flex align-items-center"
              style={{ fontSize: '14px', color: '#666' }}
            >
              <FaRupeeSign className="me-1" size={14} style={{ color: '#999' }} />
              <span>{job.job_detail?.salary_range} / month</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills/Tags */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2">
          {/* Job Category */}
          {job.job_category?.name && (
            <span 
              className="badge"
              style={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontSize: '12px',
                fontWeight: '400',
                padding: '6px 12px',
                borderRadius: '20px',
                border: 'none'
              }}
            >
              {job.job_category?.name}
            </span>
          )}

          {/* Job Type */}
          {job.job_type?.name && (
            <span 
              className="badge"
              style={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontSize: '12px',
                fontWeight: '400',
                padding: '6px 12px',
                borderRadius: '20px',
                border: 'none'
              }}
            >
              {job.job_type?.name}
            </span>
          )}

          {/* Skills */}
          {job.job_detail?.skills_arr &&
            job.job_detail?.skills_arr.slice(0, 2).map((skill, index) => (
              <span 
                key={index}
                className="badge"
                style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  fontSize: '12px',
                  fontWeight: '400',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: 'none'
                }}
              >
                {skill}
              </span>
            ))}

          {/* More indicator */}
          {((job.job_detail?.skills_arr?.length || 0) > 2) && (
            <span 
              className="badge"
              style={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontSize: '12px',
                fontWeight: '400',
                padding: '6px 12px',
                borderRadius: '20px',
                border: 'none'
              }}
            >
              +{(job.job_detail?.skills_arr?.length || 0) - 2} More
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3">
        <button 
          className="site-button flex-grow-1 fw-medium"
          onClick={() => navigate(`/user/jobs/${job.job_detail.id}`)}
        >
          View Job
        </button>
        
        <button
        onClick={()=>handleApply(job.job_detail.id)} 
          className="site-button bg-danger flex-grow-1 fw-medium"
          
        >
         {job.job_detail.is_job_applied ?" Applied"  :" Quick Apply"}
        </button>
      </div>
    </div>
  )
}

export default JobCard