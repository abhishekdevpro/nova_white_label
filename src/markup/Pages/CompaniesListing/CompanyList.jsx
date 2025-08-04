import React, { useState, useEffect } from "react";
import UserHeader from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../adminPanel/utils/Pagination";
import { debounce } from "lodash";

const CompanyList = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const itemsPerPage = 12; // Number of companies per page

  const url = window.location.origin.includes("localhost")
    ? "https://novajobs.us"
    : window.location.origin;

 useEffect(() => {
  const debouncedFetch = debounce(() => {
    fetchCompanies();
  }, 500); // delay in ms

  debouncedFetch();

  // Cleanup the debounce on unmount or before next call
  return () => {
    debouncedFetch.cancel();
  };
}, [searchTerm]);
 // Only fetch when search term changes, not on page change

  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      // Fetch all companies without pagination parameters since API doesn't support it
      const response = await fetch(
        `https://apiwl.novajobs.us/api/jobseeker/companies?domain=${url}&title_keywords=${searchTerm}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const allCompaniesData = data.data || data || [];
      setAllCompanies(allCompaniesData);
      setTotalRecords(allCompaniesData.length); // Use actual data length
      setTotalPages(Math.ceil(allCompaniesData.length / itemsPerPage));
      setError(null);
    } catch (err) {
      setError("Failed to fetch companies");
      console.error("Error fetching companies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Don't trigger API call on typing - only on button click
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1); // Reset to first page when searching
   
  };

  // Client-side search and pagination logic
  const filteredCompanies = allCompanies

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayCompanies = filteredCompanies.slice(startIndex, endIndex);

const containerStyle = {
  backgroundColor: "#f8f9fa",
  minHeight: "100vh",
  maxWidth:"1200px",
  padding: "20px 0",
  margin:"0 auto",
};

 const searchBarStyle = {
  backgroundColor: "white",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  width: "100%",
};

const searchInputStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px 15px",
  fontSize: "14px",
  width: "100%",
};

  const searchButtonStyle = {
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "25px",
    color: "white",
    padding: "10px 25px",
    fontSize: "14px",
    fontWeight: "500",
  };

  const headerStyle = {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

 const companyCardStyle = {
  backgroundColor: "white",
  border: "1px solid #e9ecef",
  borderRadius: "8px",
  padding: "15px",
  marginBottom: "15px",
  textAlign: "center",
  transition: "all 0.3s ease",
  height: "auto",
  minHeight: "200px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
};

  const companyLogoStyle = {
  width: "50px",
  height: "50px",
  margin: "0 auto 15px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#6c757d",
  "@media (min-width: 768px)": {
    width: "60px",
    height: "60px",
  },
};

  const companyNameStyle = {
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
    lineHeight: "1.4",
  };

  const viewJobsButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "#1C2957",
    fontSize: "14px",
    fontWeight: "500",
    textDecoration: "none",
    cursor: "pointer",
    padding: "5px 0",
    marginBottom: "2px",
  };

  const loadingStyle = {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#1C2957",
  };

  const errorStyle = {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
    color: "#dc3545",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div className="container">
          <div style={loadingStyle}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading companies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div className="container">
          <div style={errorStyle}>
            <p>{error}</p>
            <button className="btn btn-danger" onClick={fetchCompanies}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <>
  //     <div style={containerStyle}>
  //       <div className="container">
  //         {/* Search Bar */}
  //         <div style={searchBarStyle}>
  //           <div className="row align-items-center">
  //             <div className="col-md-10 ">
  //               <input
  //                 type="text"
  //                 placeholder="Search Company Name"
  //                 style={searchInputStyle}
  //                 value={searchTerm}
  //                 onChange={handleSearch}
  //               />
  //             </div>
  //             {/* <div className="col-md-2">
  //               <button
  //                 className="site-button w-100"
  //                 onClick={handleSearchSubmit}
  //               >
  //                 Search
  //               </button>
  //             </div> */}
  //           </div>
  //         </div>

  //         {/* Header */}
  //         <div style={headerStyle}>
  //           <h4 className="mb-1" style={{ color: "#333", fontWeight: "600" }}>
  //             Companies
  //           </h4>
  //           <p className="mb-0" style={{ color: "#6c757d", fontSize: "14px" }}>
  //             {filteredCompanies.length} Companies found
  //             {searchTerm && ` matching "${searchTerm}"`}
  //           </p>
  //         </div>

  //         {/* Companies Grid */}
  //         <div className="row">
  //           {displayCompanies.map((company, index) => (
  //             <div
  //               key={company.id || index}
  //               className="col-6 col-sm-4 col-md-3 col-lg-3 mb-4"
  //             >
  //               <div
  //                 style={companyCardStyle}
  //                 onMouseEnter={(e) => {
  //                   e.currentTarget.style.transform = "translateY(-2px)";
  //                   e.currentTarget.style.boxShadow =
  //                     "0 4px 8px rgba(0,0,0,0.1)";
  //                 }}
  //                 onMouseLeave={(e) => {
  //                   e.currentTarget.style.transform = "translateY(0)";
  //                   e.currentTarget.style.boxShadow =
  //                     "0 2px 4px rgba(0,0,0,0.05)";
  //                 }}
  //               >
  //                 <div>
  //                   <div style={companyLogoStyle}>
  //                     {company.logo ? (
  //                       <img
  //                         src={company.logo}
  //                         alt={company.company_name}
  //                         style={{
  //                           width: "100%",
  //                           height: "100%",
  //                           objectFit: "contain",
  //                           borderRadius: "8px",
  //                         }}
  //                         onError={(e) => {
  //                           e.target.style.display = "none";
  //                           e.target.nextSibling.style.display = "block";
  //                         }}
  //                       />
  //                     ) : null}
  //                   </div>
  //                   <h6 style={companyNameStyle}>
  //                     {company.company_name || "Company Name"}
  //                   </h6>
  //                 </div>
  //                 <button
  //                   style={viewJobsButtonStyle}
  //                   onMouseEnter={(e) => {
  //                     e.target.style.textDecoration = "underline";
  //                   }}
  //                   onMouseLeave={(e) => {
  //                     e.target.style.textDecoration = "none";
  //                   }}
  //                   onClick={() => {
  //                     navigate(`/user/jobs?company_id=${company.id}`);
  //                   }}
  //                 >
  //                   View Jobs
  //                 </button>
  //                 <button
  //                   className="site-button w-100"
  //                   onClick={() => navigate(`/company-details/${company.id}`)}
  //                 >
  //                   Explore Now
  //                 </button>
  //               </div>
  //             </div>
  //           ))}
  //         </div>

  //         {displayCompanies.length === 0 && !loading && (
  //           <div style={{ textAlign: "center", padding: "50px" }}>
  //             <p style={{ color: "#6c757d", fontSize: "18px" }}>
  //               No companies found matching your search.
  //             </p>
  //           </div>
  //         )}

  //         {/* Pagination */}
  //         {Math.ceil(filteredCompanies.length / itemsPerPage) > 1 && (
  //           <div style={{ marginTop: "30px" }}>
  //             <div
  //               style={{
  //                 textAlign: "center",
  //                 marginBottom: "20px",
  //                 color: "#6c757d",
  //                 fontSize: "14px",
  //               }}
  //             >
  //               Showing page {currentPage} of{" "}
  //               {Math.ceil(filteredCompanies.length / itemsPerPage)} (
  //               {filteredCompanies.length} total companies)
  //             </div>
  //             <Pagination
  //               currentPage={currentPage}
  //               totalPages={Math.ceil(filteredCompanies.length / itemsPerPage)}
  //               onPageChange={handlePageChange}
  //             />
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </>
  // );

  return (
  <>
    <div style={containerStyle}>
      <div className="container-fluid px-3 px-md-4">
        {/* Search Bar */}
        <div style={searchBarStyle}>
          <div className="row g-2 align-items-center">
            <div className="col-12">
              <input
                type="text"
                placeholder="Search Company Name"
                style={searchInputStyle}
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="p-3 p-md-4 bg-white rounded shadow-sm mb-4">
          <h4 className="mb-1 h5">Companies</h4>
          <p className="mb-0 small text-muted">
            {filteredCompanies.length} Companies found
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Companies Grid */}
        <div className="row g-3">
          {displayCompanies.map((company, index) => (
            <div
              key={company.id || index}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
            >
              <div
                style={companyCardStyle}
                className="h-100"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                }}
              >
                <div>
                  <div style={companyLogoStyle}>
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.company_name}
                        className="img-fluid"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    ) : null}
                  </div>
                  <h6 className="mb-3 text-truncate">
                    {company.company_name || "Company Name"}
                  </h6>
                </div>
                <div className="d-flex flex-column gap-2">
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => navigate(`/user/jobs?company_id=${company.id}`)}
                  >
                    View Jobs
                  </button>
                  <button
                    className="site-button w-100"
                    onClick={() => navigate(`/company-details/${company.id}`)}
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {displayCompanies.length === 0 && !loading && (
          <div className="text-center py-5">
            <p className="text-muted fs-6">
              No companies found matching your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        {Math.ceil(filteredCompanies.length / itemsPerPage) > 1 && (
          <div className="mt-4 mt-md-5">
            <div className="text-center mb-3 text-muted small">
              Showing page {currentPage} of{" "}
              {Math.ceil(filteredCompanies.length / itemsPerPage)} (
              {filteredCompanies.length} total companies)
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCompanies.length / itemsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  </>
);
};

export default CompanyList;
