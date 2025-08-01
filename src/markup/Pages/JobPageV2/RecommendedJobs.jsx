// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const RecommendedJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("jobSeekerLoginToken");
//   const url = window.location.origin.includes("localhost")
//     ? "https://novajobs.us"
//     : window.location.origin;

//   const API = token
//     ? "https://apiwl.novajobs.us/api/jobseeker/pro/job-lists"
//     : "https://apiwl.novajobs.us/api/jobseeker/job-lists";

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const headers = token ? { Authorization: `${token}` } : {};
//         const response = await axios.get(`${API}?page_no=1&page_size=10&is_publish=1&domain=${url}`, { headers });
//         // Use the first 5 jobs
//         setJobs(response.data?.data?.slice(0, 5) || []);
//       } catch (error) {
//         console.error("Failed to fetch jobs", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, [API, token]);

//   if (loading) {
//     return <p>Loading recommended jobs...</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h4 style={{ marginBottom: "20px", fontWeight: "bold" }}>
//         Recommended Jobs
//       </h4>
//       <div
//         className="w-100 d-flex flex-wrap justify-content-start"
//         style={{ gap: "20px" }}
//       >
//         {jobs.map((job) => (
//           <div
//             key={job.id}
//             className="p-3"
//             style={{
//               maxWidth:"100%",
//               width: "250px",
//               border: "1px solid #dee2e6",
//               borderRadius: "8px",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               backgroundColor: "#fff",
//             }}
//           >
//             <h5
//               style={{
//                 fontSize: "16px",
//                 fontWeight: "600",
//                 marginBottom: "12px",
//                 color: "#333",
//               }}
//             >
//               {job.job_detail?.job_title || "Untitled Job"}
//             </h5>
//             <a
//               href={`/user/jobs/${job.job_detail.id}`}
//               className="site-button btn-sm w-100 btn-primary mt-auto"
              
//             >
//               View Job
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>

//   );
// };

// export default RecommendedJobs;

import React, { useEffect, useState } from "react";
import axios from "axios";

const RecommendedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("jobSeekerLoginToken");

  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

  const API = token
    ? "https://apiwl.novajobs.us/api/jobseeker/pro/job-lists"
    : "https://apiwl.novajobs.us/api/jobseeker/job-lists";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const headers = token ? { Authorization: `${token}` } : {};
        const response = await axios.get(
          `${API}?page_no=1&page_size=10&is_publish=1&domain=${url}`,
          { headers }
        );
        setJobs(response.data?.data?.slice(0, 5) || []);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API, token]);

  if (loading) {
    return <p className="text-center mt-4">Loading recommended jobs...</p>;
  }

  return (
    <div className="container mt-4">
      <h4 className="mb-4 fw-bold">Recommended Jobs</h4>
      <div className="row">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
          >
            <div
              className="p-3 h-100 d-flex flex-column justify-content-between"
              style={{
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                backgroundColor: "#fff",
              }}
            >
              <h5
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginBottom: "12px",
                  color: "#333",
                }}
              >
                {job.job_detail?.job_title || "Untitled Job"}
              </h5>
              <a
                href={`/user/jobs/${job.job_detail.id}`}
                className="site-button btn-sm w-100 btn-primary mt-auto"
              >
                View Job
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
