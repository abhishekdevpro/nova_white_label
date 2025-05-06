import React, { useState, useEffect } from "react";
import { IoBagHandleOutline } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobListings = ({ companyData }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`https://apiwl.novajobs.us/api/employer/company-jobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("employerToken")}`,
          },
        });
        setJobs(response.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section className="job-categories ui-job-categories border-none" id="hiring">
      <div className="auto-container w-[90%]">
        <div className="sec-title text-center">
          <p className="font-bold text-xl sm:text-3xl text-black">
            We're Hiring
          </p>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="w-full">
            <div className="w-full border-t">
              {loading ? (
                <div className="flex justify-center p-8">
                  <p className="text-gray-500">Loading job listings...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center p-8">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <div className="w-full">
                  {jobs?.map((job, index) => (
                    <div 
                      key={job.job_detail.id || index} 
                      className="border-b last:border-b-0 w-full flex justify-center py-5 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="w-11/12 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex flex-col gap-3">
                          <p className="text-md sm:text-lg font-semibold text-black">
                            {job.job_detail.job_title}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                            <span className="flex gap-2 items-center text-gray-600">
                              <span className="text-gray-500">
                                <IoBagHandleOutline />
                              </span>
                              <span>{job.job_detail.experience || `${companyData.founded_date} years`}</span>
                            </span>
                            <span className="flex gap-2 items-center text-gray-600">
                              <span className="text-gray-500">
                                <CiLocationOn />
                              </span>
                              <span>{job.job_detail.location || `${companyData.city?.name || 'City'}, ${companyData.state?.name || 'State'}`}</span>
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                          <button 
                            className="border border-amber-300 bg-amber-50 p-1 px-4 font-medium text-amber-800 rounded-md text-md hover:bg-amber-100 transition-colors"
                            onClick={() => navigate(`/jobs/${job.job_detail.id || index}`)}
                          >
                            View Job
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListings;