import React, { useEffect, useState } from "react";
import axios from "axios";
import { showToastError } from "../../utils/toastify";
import "../../css/Profile.css";
import { Link } from "react-router-dom";
import Header from "./../Layout/Header";
import Footer from "../Layout/Footer";
import parse from "html-react-parser";

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
  const token = localStorage.getItem("employeeLoginToken");
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
      headers: {
        Authorization: token,
      },
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
      headers: {
        Authorization: token,
      },
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
      headers: {
        Authorization: token,
      },
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
     
      {companyData ? (
        <Container>
          <Header />
          <TabContainer>
            <div className="container px-3 px-md-5">
              <CompanyProfile setActiveTab={setActiveTab} companyData={companyData} />
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
                  <div className="row">
                    {/* <div className="col-lg-8">
               <CompanyAbout companyData={companyData} />
               <CompanyDetails companyData={companyData} />
             </div> */}
                    <div className="row">
                      {/* About Section (80%) */}
                      <div className="col-12 col-lg-8">
                        <CompanyAbout companyData={companyData} />
                      </div>

                      {/* Details Section (20%) */}
                      <div className="col-12 col-lg-4">
                        <CompanyDetails companyData={companyData} />
                      </div>
                    </div>

                    <CompanyListing data={data} />
                    <MapJobFinder
                      randomLatitude={randomLatitude}
                      randomLongitude={randomLongitude}
                    />
                  </div>
                )}
                {activeTab === "jobs" && <JobListing data={data} />}
                {activeTab === "employees" && (
                  <div className="p-4">
                    <h3 className="fw-bold" style={{ color: "#0d47a1" }}>
                      Employees Section Content
                    </h3>
                  </div>
                )}
                {activeTab === "offices" && (
                  <div className="p-4">
                    <h3 className="fw-bold" style={{ color: "#0d47a1" }}>
                      Offices Section Content
                    </h3>
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
