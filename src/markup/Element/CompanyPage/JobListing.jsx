// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// // Styled-components
// const JobCard = styled.div`
//   cursor: pointer;
//   border-radius: 0.5rem;
//   border: 1px solid #ddd;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 1rem;
//   margin-bottom: 1.5rem;
//   transition: box-shadow 0.2s ease;

//   &:hover {
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   }
// `;

// const JobImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: contain;
//   border-radius: 50%;
// `;

// const CompanyName = styled.h4`
//   font-size: 1.25rem;
//   font-weight: bold;
//   color: #0d47a1;
// `;

// const JobInfo = styled.ul`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   padding-left: 0;
//   list-style: none;
//   margin-top: 0.5rem;

//   li {
//     font-size: 0.875rem;
//     color: #555;
//   }
// `;

// const BookmarkButton = styled.button`
//   border-color: #0d47a1;
//   color: #0d47a1;
//   font-size: 1rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 0.375rem;
//   background-color: transparent;
// `;

// const JobListing = ({ data }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="similar-companies">
//       <h6 className="mb-4 mt-2 fw-bold">Other Similar Companies</h6>
//       <div className="row">
//         {data.map((item, index) => (
//           <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
//             <JobCard onClick={() => navigate(`/user/company/${item?.id}`)}>
//               <div className="row align-items-center">
//                 <div className="col-3 col-md-2 mb-3 mb-md-0 text-center">
//                   <JobImage
//                     src={item?.logo || "path-to-default-image.jpg"}
//                     alt="company logo"
//                     onError={(e) => e.target.onerror = null}
//                   />
//                 </div>
//                 <div className="col-9 col-md-10">
//                   <div className="d-flex justify-content-between align-items-start mb-2">
//                     <CompanyName>{item?.company_name}</CompanyName>
//                     <BookmarkButton>
//                       <i className="bi bi-bookmark"></i>
//                     </BookmarkButton>
//                   </div>
//                   <JobInfo>
//                     <li>
//                       <i className="bi bi-briefcase me-2 text-primary"></i>
//                       {item?.company_industry?.name}
//                     </li>
//                     <li>
//                       <i className="bi bi-geo-alt me-2 text-primary"></i>
//                       {item?.location || "N/A"}
//                     </li>
//                     <li>
//                       <i className="bi bi-clock me-2 text-primary"></i>
//                       {item?.hours || "N/A"}
//                     </li>
//                     <li>
//                       <i className="bi bi-currency-dollar me-2 text-primary"></i>
//                       {item?.salary_range || "N/A"}
//                     </li>
//                   </JobInfo>
//                 </div>
//               </div>
//             </JobCard>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default JobListing;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// // Styled-components
// const JobCard = styled.div`
//   cursor: pointer;
//   width:100%;
//   border-radius: 0.5rem;
//   border: 1px solid #ddd;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 1rem;
//   margin-bottom: 1.5rem;
//   transition: box-shadow 0.2s ease;

//   &:hover {
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   }
// `;

// const JobImage = styled.img`
//   width: 80px;
//   height: 80px;
//   object-fit: contain;
//   border-radius: 50%;
// `;

// const CompanyName = styled.h4`
//   font-size: 1.25rem;
//   font-weight: bold;
//   color: #0d47a1;
// `;

// const JobInfo = styled.ul`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   padding-left: 0;
//   list-style: none;
//   margin-top: 0.5rem;

//   li {
//     font-size: 0.875rem;
//     color: #555;
//   }
// `;

// const BookmarkButton = styled.button`
//   border-color: #0d47a1;
//   color: #0d47a1;
//   font-size: 1rem;
//   padding: 0.25rem 0.5rem;
//   border-radius: 0.375rem;
//   background-color: transparent;
// `;

// const JobListing = () => {
//   const [data, setData] = useState([]);
//   const [recordsAvailable, setRecordsAvailable] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("employeeLoginToken"); // Replace with your actual token

//   const fetchPublishedJobs = () => {
//     axios({
//       method: "GET",
//       url: "https://apiwl.novajobs.us/api/employeer/job-lists?is_publish=1",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         const jobData = response.data.data;
//         console.log(jobData, "published");
//         if (jobData && jobData.length > 0) {
//           setData(jobData);
//           setRecordsAvailable(true);
//         } else {
//           setRecordsAvailable(false);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setRecordsAvailable(false);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchPublishedJobs();
//   }, []);
// console.log(data,"joblist");
//   return (
//     <div className="similar-companies">
//       <h6 className="mb-4 mt-2 fw-bold">Other Similar Companies</h6>
//       {loading ? (
//         <p>Loading...</p>
//       ) : recordsAvailable ? (
//         <div className="column">
//           {data.map((item, index) => (
//             <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
//               <JobCard onClick={() => navigate(`/user/company/${item?.companies?.id}`)}>
//                 <div className="row align-items-center">
//                   <div className="col-3 col-md-2 mb-3 mb-md-0 text-center">
//                     <JobImage
//                       src={item?.logo || "path-to-default-image.jpg"}
//                       alt="company logo"
//                       onError={(e) => (e.target.onerror = null)}
//                     />
//                   </div>
//                   <div className="col-9 col-md-10">
//                     <div className="d-flex justify-content-between align-items-start mb-2">
//                       <CompanyName>{item?.job_detail?.job_title}</CompanyName>
//                       <BookmarkButton>
//                         <i className="bi bi-bookmark"></i>
//                       </BookmarkButton>
//                     </div>
//                     <JobInfo>
//                       <li>
//                         <i className="bi bi-briefcase me-2 text-primary"></i>
//                         {item?.companies?.company_industry?.name || "N/A"}
//                       </li>
//                       <li>
//                         <i className="bi bi-geo-alt me-2 text-primary"></i>
//                         {item?.countries?.name || "N/A"}{","}{item?.states?.name}
//                       </li>
//                       <li>
//                         <i className="bi bi-geo-alt me-2 text-primary"></i>
//                         {item?.job_category?.name || "N/A"}
//                       </li>
//                       <li>
//                         <i className="bi bi-clock me-2 text-primary"></i>
//                         {item?.experience_level?.name || "N/A"}
//                       </li>
//                       <li>
//                         <i className="bi bi-currency-dollar me-2 text-primary"></i>
//                         {item?.job_detail?.salary || "N/A"}
//                       </li>
//                     </JobInfo>
//                   </div>
//                 </div>
//               </JobCard>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No records available.</p>
//       )}
//     </div>
//   );
// };

// export default JobListing;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

// Styled Components
const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
`;

const JobListColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const JobCard = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: contain;
  margin-right: 1rem;
`;

const JobDetails = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #0d47a1;
  margin: 0;
`;

const BookmarkBtn = styled.button`
  background: transparent;
  border: 2px solid #0d47a1;
  color: #0d47a1;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JobDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
`;

const JobDetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #555;

  i {
    margin-right: 0.5rem;
    color: #0d47a1;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #777;
  padding: 2rem;
  width: 100%;
`;

const JobListing = () => {
  const [data, setData] = useState([]);
  const [recordsAvailable, setRecordsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("employeeLoginToken");

  const fetchPublishedJobs = () => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/employeer/job-lists?is_publish=1",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const jobData = response.data.data || [];
        setData(jobData);
        setRecordsAvailable(jobData.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setData([]);
        setRecordsAvailable(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchPublishedJobs();

    // Cleanup function to prevent memory leaks
    return () => {
      controller.abort();
    };
  }, [token]);

  if (loading) {
    return (
      <Container>
        <SectionTitle>Other Similar Companies</SectionTitle>
        <LoadingContainer>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <SectionTitle>Job Posted</SectionTitle>
      {recordsAvailable ? (
        <JobListColumn>
          {data.map((item) => (
            <JobCard
              key={item?.id || Math.random()}
              onClick={() => navigate(`/user/job/${item.job_detail.id}`)}
            >
              <CompanyLogo
                src={
                  item?.companies?.logo ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s"
                }
                alt="Company Logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLXn84m0ldNEy4b-doui_GKkeziMRUfEl71g&s";
                }}
              />

              <JobDetails>
                <JobHeader>
                  <JobTitle>{item?.job_detail?.job_title}</JobTitle>
                  {/* <BookmarkBtn>
                    <i className="bi bi-bookmark"></i>
                  </BookmarkBtn> */}
                </JobHeader>

                <JobDetailsGrid>
                  <JobDetailItem>
                    <i className="bi bi-briefcase"></i>
                    {item?.companies?.company_industry?.name || "N/A"}
                  </JobDetailItem>
                  <JobDetailItem>
                    <i className="bi bi-geo-alt"></i>
                    {`${item?.countries?.name}, ${item?.states?.name}`}
                  </JobDetailItem>
                  <JobDetailItem>
                    <i className="bi bi-clock"></i>
                    {item?.experience_level?.name || "N/A"}
                  </JobDetailItem>
                  <JobDetailItem>
                    <i className="bi bi-currency-dollar"></i>
                    {item?.job_detail?.salary || "N/A"}
                  </JobDetailItem>
                  <JobDetailItem>
                    <i className="bi bi-currency-dollar"></i>
                    {item.job_workplace_types.name || "N/A"}
                  </JobDetailItem>
                  <JobDetailItem>
                    <i className="bi bi-currency-dollar"></i>
                    {moment(item.job_detail.reposted_at).format(
                      "MMMM DD, YYYY"
                    )}
                  </JobDetailItem>
                </JobDetailsGrid>
              </JobDetails>
            </JobCard>
          ))}
        </JobListColumn>
      ) : (
        <EmptyState>No job listings available</EmptyState>
      )}
    </Container>
  );
};

export default JobListing;
