import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import FixedHeader from "../Layout/fixedHeader";
import axios from "axios";
import TwoBoxWithLinesSkeleton from "../skeleton/twoBoxLines";

const API_URL = 'https://data.usajobs.gov/api/search?Keyword=Software&LocationName=Atlanta,%20Georgia';
const API_HEADERS = {
  'Authorization-Key': 'U+A91PHlMgNjHv1rrwyG5CcJLb9eUiVpFWiUMRqmlO8=',
  'Host': 'data.usajobs.gov',
  'User-Agent': 'Hr@hypervsolutions.net'
};

function JobPagethirdparty() {
  const [jobs, setJobs] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, { headers: API_HEADERS });
        setJobs(response.data.SearchResult.SearchResultItems);
        setShowSkeleton(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setShowSkeleton(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      <Header />
      {localStorage.getItem("jobSeekerLoginToken") && <FixedHeader />}

      <div>
  {showSkeleton ? (
    <div className="bg-white w-100">
      <TwoBoxWithLinesSkeleton />
    </div>
  ) : (
    <div className="flex flex-wrap gap-4 p-4">
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <div key={index} className="border p-4 rounded-md shadow-md w-96 rounded-5 m-3" style={{backgroundColor: "#f5f5f5" }}>
            <h2 className="text-lg font-semibold">{job.MatchedObjectDescriptor.PositionTitle}</h2>
            <p>{job.MatchedObjectDescriptor.OrganizationName}</p>
            <p>{job.MatchedObjectDescriptor.DepartmentName}</p>
            <p>{job.MatchedObjectDescriptor.PositionLocationDisplay}</p>
            <p>{job.MatchedObjectDescriptor.OrganizationName}</p>
            {/* Check if PositionLocation is an array or object and render accordingly */}
            {Array.isArray(job.MatchedObjectDescriptor.PositionLocation) ? (
              job.MatchedObjectDescriptor.PositionLocation.slice(0, 1).map((location, locIndex) => (
                <div key={locIndex}>
                  <p>{location.LocationName}</p>
                  <p>{location.CityName}, {location.CountryCode}</p>
                </div>
              ))
            ) : (
              <p>{job.MatchedObjectDescriptor.PositionLocation}</p>
            )}
            <a href={job.MatchedObjectDescriptor.ApplyURI[0]} className="text-blue-600 hover:underline site-button">Apply Now</a>
          </div>
        ))
      ) : (
        <div>No jobs found.</div>
      )}
    </div>
  )}
</div>


      <Footer />
    </>
  );
}

export default JobPagethirdparty;
