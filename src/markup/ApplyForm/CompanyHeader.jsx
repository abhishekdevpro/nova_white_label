import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CompanyJobHeader = ({ companyId }) => {
  const [companyData, setCompanyData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const navigate = useNavigate()
  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    const fetchData = async () => {
      const API = token
        ? `https://apiwl.novajobs.us/api/jobseeker/pro/job-lists/${companyId}`
        : `https://apiwl.novajobs.us/api/jobseeker/job-lists/${companyId}`;
      try {
        const headers = token ? { Authorization: token } : {};
        const jobResponse = await axios.get(API, { headers });
        const fetchedJobData = jobResponse.data.data || {};
        // console.log(fetchedJobData?.job_detail,"fetchedJobData");
        setJobData(fetchedJobData?.job_detail);

        const companyId = fetchedJobData.companies?.id;
        if (companyId) {
          const companyResponse = await axios.get(
            `https://apiwl.novajobs.us/api/jobseeker/company/${companyId}`
          );
          setCompanyData(companyResponse?.data?.data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [token, companyId]);

  const truncateDescription = (description, maxWords) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > maxWords
      ? words.slice(0, maxWords).join(' ') + '...'
      : description;
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger mx-3">Error loading data: {error}</div>
    );
  }
//  console.log(companyData,jobData,"data of company an djob");
  if (!companyData || !jobData) return null;

  const jobDescription = jobData?.job_description || '';
  const maxWords = 30;
  const truncatedDescription = truncateDescription(jobDescription, maxWords);

  return (
    <div className="container my-4">
      <div className="row bg-white rounded shadow p-4 align-items-center">
        <div className="mb-3">
          <button
            className="site-button text-light btn-outline-secondary btn-sm"
            onClick={() => navigate(-1)}
          > 
          <ArrowLeft size={20}/>
            Back
          </button>
        </div>
        <div className="col-md-2 col-12 text-center mb-3 mb-md-0">
          {companyData.logo ? (
            <img
              src={companyData.logo}
              alt="Company Logo"
              className="img-fluid rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/resource/company-logo/1-1.png';
              }}
            />
          ) : (
            <div className="bg-light d-flex align-items-center justify-content-center rounded-circle" style={{ width: 64, height: 64 }}>
              <span className="text-secondary fs-4">
                {companyData.company_name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>

        <div className="col-md-10 col-12">
          <p className="text-muted mb-1">Applying for</p>
          <h4 className="fw-bold mb-1">{jobData.job_title || 'Position Title'}</h4>
          <Link to ={`/company-details/${companyData.id}`} className="text-primary mb-2">{companyData.company_name}</Link>

          <div className="my-4">
           
             
              <button
                className="site-button btn-sm "
                onClick={()=>navigate(`/company-details/${companyData.id}`)}
              >
                Know More
              </button>
            
          </div>

          <div className="row">
            {jobData.salary_range && (
              <div className="col-6 text-muted">
                <strong>Salary:</strong> {jobData.salary_range}
              </div>
            )}
            {jobData.job_type && (
              <div className="col-6 text-muted">
                <strong>Job Type:</strong> {jobData.job_type}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyJobHeader;
