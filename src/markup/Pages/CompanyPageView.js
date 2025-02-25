import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import "../../css/Profile.css";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "../Layout/Footer";
import parse from 'html-react-parser';

import { useNavigate, useParams } from "react-router-dom";
import CompanyDetails from "../Element/CompanyPage/ComapnyDetails";
import CompanyListing from "../Element/CompanyPage/CompanyListing";
import CompanyAbout from "../Element/CompanyPage/CompanyAbout";
import MapJobFinder from "../Element/CompanyPage/MapJobFinder";
import CompanyProfile from "../Element/CompanyPage/CompanyProfile";
import JobListing from "../Element/CompanyPage/JobListing";
import styled from "styled-components";



const randomLatitude = -15.812898768599155;
const randomLongitude = 104.14392380381247;





const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [companyData, setCompany] = useState(null);
  const [jobData, setJobData] = useState(null);
  const token = localStorage.getItem("employeeLoginToken")
  const domain = window.location.origin.includes("localhost")
  ? "https://novajobs.us"
  : window.location.origin;

 
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const { id } = useParams();

  const handleGetRequest = () => {
    axios({
      method: "GET",
      url: `https://apiwl.novajobs.us/api/jobseeker/companies/${id}/?domain=${domain}`,
      headers:{
        Authorization:token
      }
    })
      .then((response) => {
        console.log(response);
        setCompany(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate();

  const handleGetJobRequest = () => {
    const params = new URLSearchParams({
      company_id: id,
      domain: domain,
    });
    axios({
      method: "GET",
      url: `https://apiwl.novajobs.us/api/jobseeker/job-lists/?${params.toString()}`,
      headers:{
        Authorization:token
      }
    })
      .then((response) => {
        console.log(response);
        setJobData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetJobRequest();
    handleGetRequest();
  }, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams({
      page_size: 6,
      domain: domain,
    });
    axios({
      method: "GET",
      url: `https://apiwl.novajobs.us/api/jobseeker/companies/?${params.toString()}`,
      headers:{
        Authorization:token
      }
      
    })
      .then((res) => {
        console.log(res.data.data, "job seekers data");
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        showToastError(err?.response?.data?.message);
      });
  }, []);

  return (
    <>
      {/* {companyData ? (
        <div>
          <Header />
          <div
            className="  border-0  py-4  py-5"
            style={{ backgroundColor: "#F6F9FD" }}
          >
            <div className="c d-flex justify-content-between px-5">
              <div className="d-flex align-items-center">
                <img
                  src={companyData.logo}
                  alt="logo"
                  className="mr-3"
                  style={{ width: "200px", height: "100px" }}
                />
                <div className="ms-3">
                  <h4 className="d-flex float-left ">
                    {companyData?.company_name}
                  </h4>
                  <br />
                  <br />
                  <ul
                    className="list-inline font-fs font-bold"
                    style={{ fontWeight: "600" }}
                  >
                    <li className="list-inline-item">
                      <i className="bi bi-geo-alt"></i> {companyData.city.name},{" "}
                      {companyData.state.name} |
                    </li>
                    <li className="list-inline-item">
                      <i className="bi bi-briefcase"></i>{" "}
                      {companyData?.company_industry.name} |
                    </li>
                    <li className="list-inline-item">
                      <i className="bi bi-telephone"></i> {companyData?.phone} |
                    </li>
                    <li className="list-inline-item">
                      <i className="bi bi-envelope"></i> {companyData?.email}
                    </li>
                  </ul>
                  <ul className="list-inline d-flex float-left">
                    <li className="list-inline-item badge rounded-pill text-bg-info text-white p-2 px-4">
                      Open Jobs – {companyData.jobNumber}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="m-5 ">
                <a href={`mailto:${companyData?.email?.trim()}`}>
                  <button
                    className="btn btn-primary p-3 px-5 rounded-3 mx-2"
                    data-bs-toggle="modal"
                    data-bs-target="#privateMessage"
                  >
                    Message
                  </button>
                </a>
                <button className="btn btn-outline-primary ml-2 p-3 t">
                  <i className="bi bi-bookmark "></i>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 p">
            <div className="max-w-4xl mx-auto ">
              <ul
                className="list-inline font-fs bg-secondary-subtle text-secondary-emphasis font-bold d-flex justify-content-center gap-3 pt-2"
                id="myTab"
                role="tablist"
                style={{ fontWeight: "600" }}
              >
                <li
                  className="nav-item"
                  role="presentation"
                  style={{ fontWeight: "600" }}
                >
                  <a
                    className={`nav-link ${
                      activeTab === "about"
                        ? "active p-3 border-top-0 border-end-0 border-start-0 border-5"
                        : "p-3"
                    }`}
                    id="about-tab"
                    data-bs-toggle="tab"
                    href="#about"
                    role="tab"
                    aria-controls="about"
                    aria-selected={activeTab === "about"}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "jobs"
                        ? "active p-3 border-top-0 border-end-0 border-start-0 border-5"
                        : "p-3"
                    }`}
                    id="jobs-tab"
                    data-bs-toggle="tab"
                    href="#jobs"
                    role="tab"
                    aria-controls="jobs"
                    aria-selected={activeTab === "jobs"}
                    onClick={() => setActiveTab("jobs")}
                  >
                    Jobs
                  </a>
                </li>
              </ul>

              <div className="p-4">
                {activeTab === "about" && (
                  <>
                    <div className="row ">
                      <div className="col-lg-8 float-start">
                        <div className="text-start px-5">
                          <h4 className="text-start px-5">About Company</h4>
                          <p className="text-start px-5">
                            {parse(companyData?.about)}
                          </p>
                          <h5>
                            <strong className="text-start px-5 mt-3">
                              Our Services
                            </strong>
                          </h5>
                          <div className="row images-outer px-5 d-flex justify-content-center  gap-4 my-4"></div>

                          <ul className="px-5 mx-5 my-3">
                            <li> {companyData?.tagline}</li>
                          </ul>
                        </div>

                        <div className="m-5 "></div>
                        <h3 className="ms-5 ps-5 mt-5">Explore Companies</h3>

                        <div className="mt-5 col-lg-11 mx-5 mb-5">
                          <div className="">
                            <div
                              className="mt-4 profile-summary"
                              style={{ padding: "10px 30px" }}
                            >
                              <div className="">
                                <h6 className="mb-4 mt-2">
                                  Other similar Companies
                                </h6>
                                {data.map((item, index) => (
                                  <div
                                    className=" mb-4 border-0"
                                    key={index}
                                    onClick={() =>
                                      navigate(
                                        `/employer/profilepage/${item?.jobskkers_detail?.id}`
                                      )
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    <div className="card-body border rounded-4 d-flex">
                                      <div className="me-3 col-lg-2">
                                        <img
                                          src={
                                            item?.logo ||
                                            "path-to-default-image.jpg"
                                          }
                                          alt="company logo"
                                          className="img-fluid"
                                          style={{
                                            width: "100px",
                                            height: "100px",
                                          }}
                                          onError={(e) => {
                                            e.target.onerror = null;
                                          }}
                                        />
                                      </div>
                                      <div className="col-lg-9">
                                        <div className="d-flex justify-content-between">
                                          <h4
                                            className="mb-2"
                                            style={{ fontSize: "20px" }}
                                          >
                                            {item?.company_name}
                                          </h4>
                                          <button className="btn btn-outline-secondary">
                                            <i className="bi bi-bookmark"></i>
                                          </button>
                                        </div>
                                        <ul className="list-unstyled mb-2 d-flex gap-3">
                                          <li className="mb-1">
                                            <i className="bi bi-briefcase me-2"></i>
                                            {item?.company_industry?.name}
                                          </li>
                                          <li className="mb-1">
                                            <i className="bi bi-geo-alt me-2"></i>
                                            {item?.location || "N/A"}
                                          </li>
                                          <li className="mb-1">
                                            <i className="bi bi-clock me-2"></i>
                                            {item?.hours || "N/A"}
                                          </li>
                                          <li className="mb-1">
                                            <i className="bi bi-currency-dollar me-2"></i>
                                            {item?.salary_range || "N/A"}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div
                          className=" mb-4 p-2 border-0"
                          style={{
                            backgroundColor: "#F5F7FC",
                            fontSize: "14px",
                          }}
                        >
                          <div className="card-body">
                            <ul className="list-unstyled mb-4 ">
                              <li className="d-flex justify-content-between mb-3 ">
                                <strong>Primary industry:</strong>
                                <span>
                                  <i className="bi bi-briefcase me-2"></i>
                                  {companyData?.company_industry.name}
                                </span>
                              </li>

                              <li className="d-flex justify-content-between mb-3">
                                <strong>Phone:</strong>
                                <span>
                                  <i className="bi bi-telephone me-2"></i>
                                  {companyData?.phone}{" "}
                                </span>
                              </li>
                              <li className="d-flex justify-content-between mb-3">
                                <strong>Email:</strong>
                                <span style={{ fontSize: "14px" }}>
                                  <i className="bi bi-envelope me-3 "></i>
                                  {companyData?.email}
                                </span>
                              </li>
                              <li className="d-flex justify-content-between mb-3">
                                <strong>Location:</strong>
                                <span>
                                  <i className="bi bi-geo-alt me-3"></i>{" "}
                                  {companyData.state.name}
                                </span>
                              </li>
                              <li className="d-flex justify-content-between mb-3">
                                <strong>Founded Year:</strong>
                                <span>
                                  <i className="bi bi-clock me-3"></i>{" "}
                                  {companyData.founded_date}
                                </span>
                              </li>
                            </ul>
                            <a
                              href={companyData.website_link}
                              className="btn btn-primary p-2 px-5 rounded-3 border-0 mx-2 text-primary text-center"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ backgroundColor: "#A9C5ED" }}
                            >
                              {companyData.website_link}
                            </a>
                          </div>
                        </div>
                        <div
                          className=" border-0 "
                          style={{ backgroundColor: "#F5F7FC" }}
                        >
                          <div className="card-body">
                            <h4 className="card-title flaot-start">
                              Job Location
                            </h4>
                            <MapJobFinder
                              latitude={randomLatitude}
                              longitude={randomLongitude}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "jobs" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Jobs Section Content
                    </h3>
                    <div className="">
                      <div
                        className="mt-4 profile-summary"
                        style={{ padding: "10px 30px" }}
                      >
                        <div className="candidate-info company-info">
                          <h6 className="mb-4 mt-2">Other similar Companies</h6>
                          {data.map((item, index) => (
                            <div
                              className=" mb-4 border-0"
                              key={index}
                              onClick={() =>
                                navigate(`/user/company/${item?.id}`)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <div className="card-body border rounded-4 d-flex">
                                <div className="me-3 col-lg-2">
                                  <img
                                    src={
                                      item?.logo || "path-to-default-image.jpg"
                                    }
                                    alt="company logo"
                                    className="img-fluid"
                                    style={{ width: "100px", height: "100px" }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                    }}
                                  />
                                </div>
                                <div className="col-lg-9">
                                  <div className="d-flex justify-content-between">
                                    <h4
                                      className="mb-2"
                                      style={{ fontSize: "20px" }}
                                    >
                                      {item?.company_name}
                                    </h4>
                                    <button className="btn btn-outline-secondary">
                                      <i className="bi bi-bookmark"></i>
                                    </button>
                                  </div>
                                  <ul className="list-unstyled mb-2 d-flex gap-3">
                                    <li className="mb-1">
                                      <i className="bi bi-briefcase me-2"></i>
                                      {item?.company_industry?.name}
                                    </li>
                                    <li className="mb-1">
                                      <i className="bi bi-geo-alt me-2"></i>
                                      {item?.location || "N/A"}
                                    </li>
                                    <li className="mb-1">
                                      <i className="bi bi-clock me-2"></i>
                                      {item?.hours || "N/A"}
                                    </li>
                                    <li className="mb-1">
                                      <i className="bi bi-currency-dollar me-2"></i>
                                      {item?.salary_range || "N/A"}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "employees" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Employees Section Content
                    </h3>
                    {/* Add content for the Employees tab here 
                  </div>
                )}
                {activeTab === "offices" && (
                  <div>
                    <h3 className="text-xl font-semibold">
                      Offices Section Content
                    </h3>
                    {/* Add content for the Offices tab here 
                  </div>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      ) : null} */}
      {companyData ? (
   <Container>
   <Header />
   <TabContainer>
     <div className="container px-3 px-md-5">
       <CompanyProfile companyData={companyData} />
     </div>
   </TabContainer>
   <div className="bg-light">
     <div className="container mx-auto">
       <NavTabs>
         {[
           { id: "about", label: "About" },
           { id: "jobs", label: "Jobs" },
          //  { id: "employees", label: "Employees" },
          //  { id: "offices", label: "Offices" },
         ].map(({ id, label }) => (
           <li className="nav-item" role="presentation" key={id}>
             <NavLink
               className={activeTab === id ? "active" : ""}
               role="tab"
               aria-selected={activeTab === id}
               onClick={() => setActiveTab(id)}
             >
               {label}
             </NavLink>
           </li>
         ))}
       </NavTabs>
       <Content>
         {activeTab === "about" && (
           <div className="row gy-4">
             <div className="col-lg-8">
               <CompanyAbout companyData={companyData} />
             </div>
             <CompanyDetails companyData={companyData} />
             <CompanyListing data={data} />
             <MapJobFinder randomLatitude={randomLatitude} randomLongitude={randomLongitude} />
           </div>
         )}
         {activeTab === "jobs" && <JobListing data={data} />}
         {activeTab === "employees" && (
           <div className="p-4">
             <h3 className="fw-bold" style={{ color: "#0d47a1" }}>Employees Section Content</h3>
           </div>
         )}
         {activeTab === "offices" && (
           <div className="p-4">
             <h3 className="fw-bold" style={{ color: "#0d47a1" }}>Offices Section Content</h3>
           </div>
         )}
       </Content>
     </div>
   </div>
   <Footer />
 </Container>
) : null}
    </>
  );
};

export default CompanyPage;
const Container = styled.div`
  width: 100%;
`;

const TabContainer = styled.div`
  background: #f6f9fd;
  padding: 2rem 0;
`;

const NavTabs = styled.ul`
  display: flex;
  justify-content: center;
  border: none;
  gap: 1rem;
  padding-top: 0.5rem;
  background: #f8f9fa;
  font-weight: 600;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavLink = styled.a`
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease-in-out;
  color: #6c757d;
  border-bottom: 5px solid transparent;

  &.active {
    color: #0d47a1;
    border-color: #0d47a1;
  }
`;

const Content = styled.div`
  padding: 2rem;
`;