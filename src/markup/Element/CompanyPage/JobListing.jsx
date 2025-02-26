import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled-components
const JobCard = styled.div`
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const JobImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
`;

const CompanyName = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  color: #0d47a1;
`;

const JobInfo = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding-left: 0;
  list-style: none;
  margin-top: 0.5rem;

  li {
    font-size: 0.875rem;
    color: #555;
  }
`;

const BookmarkButton = styled.button`
  border-color: #0d47a1;
  color: #0d47a1;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  background-color: transparent;
`;

const JobListing = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="similar-companies">
      <h6 className="mb-4 mt-2 fw-bold">Other Similar Companies</h6>
      <div className="row">
        {data.map((item, index) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
            <JobCard onClick={() => navigate(`/user/company/${item?.id}`)}>
              <div className="row align-items-center">
                <div className="col-3 col-md-2 mb-3 mb-md-0 text-center">
                  <JobImage
                    src={item?.logo || "path-to-default-image.jpg"}
                    alt="company logo"
                    onError={(e) => e.target.onerror = null}
                  />
                </div>
                <div className="col-9 col-md-10">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <CompanyName>{item?.company_name}</CompanyName>
                    <BookmarkButton>
                      <i className="bi bi-bookmark"></i>
                    </BookmarkButton>
                  </div>
                  <JobInfo>
                    <li>
                      <i className="bi bi-briefcase me-2 text-primary"></i>
                      {item?.company_industry?.name}
                    </li>
                    <li>
                      <i className="bi bi-geo-alt me-2 text-primary"></i>
                      {item?.location || "N/A"}
                    </li>
                    <li>
                      <i className="bi bi-clock me-2 text-primary"></i>
                      {item?.hours || "N/A"}
                    </li>
                    <li>
                      <i className="bi bi-currency-dollar me-2 text-primary"></i>
                      {item?.salary_range || "N/A"}
                    </li>
                  </JobInfo>
                </div>
              </div>
            </JobCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;
