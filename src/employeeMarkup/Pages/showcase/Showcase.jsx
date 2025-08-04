

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdEdit, MdLocationOn, MdBusiness, MdPeople, MdOutlineHealthAndSafety, MdLocalCafe } from "react-icons/md";
import { FaPlay, FaGlobe, FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import PDFViewer from "./components/PdfVeiwer";
import TeamSection from "./components/TeamsSection";
import GallerySection from "./components/ImageGallerySection";
import JobsSection from "./components/JobSection";

const url = window.location.origin.includes("localhost") 
  ? "https://novajobs.us" 
  : window.location.origin;

const BASE_IMAGE_URL = "https://apiwl.novajobs.us";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f7ff",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#1e40af",
    background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    padding: window.innerWidth <= 768 ? "2rem 1rem" : "4rem 2rem",
    textAlign: "center",
    position: "relative",
    color: "#ffffff",
    overflow: "hidden",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
    position: "relative",
    zIndex: 2,
  },
  logo: {
    width: window.innerWidth <= 768 ? "80px" : "100px",
    height: window.innerWidth <= 768 ? "80px" : "100px",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    border: "4px solid rgba(255, 255, 255, 0.9)",
    transition: "all 0.3s ease",
  },
  headerText: {
    textAlign: "center",
    maxWidth: "900px",
    position: "relative",
  },
  companyName: {
    fontSize: window.innerWidth <= 768 ? "2.5rem" : "4rem",
    fontWeight: "800",
    color: "#ffffff",
    margin: "0 0 1.5rem 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  tagline: {
    fontSize: window.innerWidth <= 768 ? "1.25rem" : "1.75rem",
    color: "#e2e8f0",
    margin: "0 0 3rem 0",
    lineHeight: "1.6",
  },
  companyInfo: {
    display: "flex",
    gap: window.innerWidth <= 768 ? "1rem" : "2rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "1rem 2rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    backdropFilter: "blur(8px)",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1000,
    padding: "1rem 0",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "0 2rem",
  },
  navLink: {
    color: "#1e40af",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  activeNavLink: {
    color: "#ffffff",
    backgroundColor: "#1e40af",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: window.innerWidth <= 768 ? "2rem 1rem" : "4rem 2rem",
  },
  section: {
    marginBottom: "4rem",
    padding: "3rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    position: "relative",
  },
  sectionTitle: {
    fontSize: window.innerWidth <= 768 ? "1.75rem" : "2.5rem",
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: "3rem",
    textAlign: "center",
  },
  editButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#1e40af",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  // Additional styles...
};

const FALLBACK_IMAGES = {
  logo: "https://placehold.co/150x150/1e40af/ffffff?text=Logo",
  cover: "https://placehold.co/1200x600/1e40af/ffffff?text=Cover+Image",
  gallery: [
    "https://placehold.co/400x300/1e40af/ffffff?text=Gallery+1",
    "https://placehold.co/400x300/1e40af/ffffff?text=Gallery+2",
    "https://placehold.co/400x300/1e40af/ffffff?text=Gallery+3",
  ]
};

const ShowcaseComponent = () => {
  const [companyData, setCompanyData] = useState(null);
  const [activeSection, setActiveSection] = useState("about");
  const [loading, setLoading] = useState(true);
  const [teamsData, setTeamsData] = useState([]);
  const [wtsData, setWtsData] = useState([]);
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();
  const { companyId } = useParams();
  const token = localStorage.getItem("employeeLoginToken") || localStorage.getItem("vendorToken");
  const isEdit = token && !companyId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch company data
        const API = companyId
          ? `${BASE_IMAGE_URL}/api/jobseeker/company/${companyId}?domain=${url}`
          : `${BASE_IMAGE_URL}/api/employeer/company?domain=${url}`;
        
        const companyResponse = await axios.get(API, {
          headers: { Authorization: token }
        });
        setCompanyData(companyResponse.data.data);

        // Fetch teams data
        const teamsResponse = await axios.get(
          companyId
            ? `${BASE_IMAGE_URL}/api/jobseeker/company-teams/${companyId}?domain=${url}`
            : `${BASE_IMAGE_URL}/api/employeer/company-teams?domain=${url}`,
          { headers: { Authorization: token }}
        );
        setTeamsData(teamsResponse.data.data || []);

        // Fetch WTS data
        const wtsResponse = await axios.get(
          companyId
            ? `${BASE_IMAGE_URL}/api/jobseeker/company-wts/${companyId}?domain=${url}`
            : `${BASE_IMAGE_URL}/api/employeer/company-wts?domain=${url}`,
          { headers: { Authorization: token }}
        );
        setWtsData(wtsResponse.data.data || []);

        // Fetch jobs data
        const jobsResponse = await axios.get(
          companyId
            ? `${BASE_IMAGE_URL}/api/jobseeker/job-lists?page_no=1&page_size=10&is_publish=1&company_id=${companyId}&domain=${url}`
            : `${BASE_IMAGE_URL}/api/employeer/job-lists`,
          { headers: { Authorization: token }}
        );
        setJobs(jobsResponse.data.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId, token, url]);

  const handleEditClick = (section) => {
    const sectionToTab = {
      hero: "company-info",
      about: "about-company",
      benefits: "benefits",
      gallery: "gallery",
      teams: "leadership-team",
      wts: "testimonials",
      social: "social-links",
      jobs: "jobs"
    };

    const path = window.location.pathname;
    const isEmployeePath = path.includes("/employer");
    
    const tab = sectionToTab[section] || "company-info";
    navigate(`${isEmployeePath ? "/employer" : "/vendor"}/${isEmployeePath ? "branding-company" : "branding"}?tab=${tab}`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5 text-secondary">Loading company info...</p>
        </div>
      </div>
    );
  }

  // Define benefit items and renderedBenefits before return
  const benefitItems = [
    {
      key: "health_insurance",
      title: "Health Insurance",
      icon: <MdOutlineHealthAndSafety />,
      valueKey: "health_insurance_value",
    },
    {
      key: "cafeteria",
      title: "Cafeteria",
      icon: <MdLocalCafe />,
      valueKey: "cafeteria_value",
    },
    {
      key: "recreational_area",
      title: "Recreational Area",
      icon: <MdOutlineHealthAndSafety />,
      valueKey: "recreational_area_value",
    },
    {
      key: "personal_accident_insurance",
      title: "Personal Accident Insurance",
      icon: <MdOutlineHealthAndSafety />,
      valueKey: "personal_accident_insurance_value",
    },
    {
      key: "life_insurance",
      title: "Life Insurance",
      icon: <MdOutlineHealthAndSafety />,
      valueKey: "life_insurance_value",
    },
    {
      key: "wellness_center",
      title: "Wellness Center",
      icon: <MdOutlineHealthAndSafety />,
      valueKey: "wellness_center_value",
    },
  ];
  const renderedBenefits = benefitItems.filter(
    (item) => companyData?.[item.key]
  );

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          {isEdit && (
            <button style={styles.editButton} onClick={() => handleEditClick("hero")}>
              <MdEdit size={18} />
              Edit Hero
            </button>
          )}
          
          <img
            src={companyData?.logo || FALLBACK_IMAGES.logo}
            alt="Company Logo"
            style={styles.logo}
          />
          
          <div style={styles.headerText}>
            <h1 style={styles.companyName}>
              {companyData?.company_name || "Company Name"}
            </h1>
            <p style={styles.tagline}>
              {companyData?.title || "Company Title"}
            </p>
            
            <div style={styles.companyInfo}>
              <div style={styles.infoItem}>
                <MdLocationOn size={28} />
                <span>{companyData?.city?.name || "Location"}</span>
              </div>
              <div style={styles.infoItem}>
                <MdBusiness size={28} />
                <span>{companyData?.company_industry?.name || "Industry"}</span>
              </div>
              <div style={styles.infoItem}>
                <MdPeople size={28} />
                <span>{companyData?.company_size?.name || "Company Size"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={styles.stickyNav} className="d-none d-md-block">
        <div style={styles.navContainer}>
          {["about", "benefits", "jobs", "gallery", "teams"].map((section) => (
            <a
              key={section}
              style={{
                ...styles.navLink,
                ...(activeSection === section ? styles.activeNavLink : {})
              }}
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* About Section */}
        <section id="about" style={styles.section}>
          {isEdit && (
            <button style={styles.editButton} onClick={() => handleEditClick("about")}>
              <MdEdit size={18} />
              Edit About
            </button>
          )}
          <h2 style={styles.sectionTitle}>About Us</h2>
          {companyData?.about ? (
            <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(companyData.about)
            }} />
          ) : (
            <div>No company description available.</div>
          )}
        </section>

        {/* Company Video Section */}
        {companyData?.video_urls?.[0] && (
          <section style={styles.section}>
            <ReactPlayer
              url={companyData.video_urls[0]}
              controls
              width="100%"
              height={window.innerWidth <= 768 ? "250px" : "500px"}
              style={{ borderRadius: "8px", overflow: "hidden" }}
            />
          </section>
        )}

        {/* PDF Section */}
        {companyData?.pdf_urls?.[0] && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Company Documents</h2>
            <PDFViewer fileUrl={`${BASE_IMAGE_URL}${companyData.pdf_urls[0]}`} />
          </section>
        )}

        {/* Benefits Section */}
        <section id="benefits" style={styles.section}>
          {isEdit && (
            <button style={styles.editButton} onClick={() => handleEditClick("benefits")}>
              <MdEdit size={18} />
              Edit Benefits
            </button>
          )}
          <h2 style={styles.sectionTitle}>Benefits & Perks</h2>
          <div style={styles.benefitsContainer}>
            {renderedBenefits.length > 0 ? (
              renderedBenefits.map((item) => (
                <div key={item.key} style={styles.benefitItem}>
                  <div style={styles.benefitIcon}>{item.icon}</div>
                  <div style={styles.benefitContent}>
                    <h3 style={styles.benefitTitle}>{item.title}</h3>
                    <p style={styles.benefitDescription}>
                      {companyData?.[item.valueKey]}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>No unique benefits added yet.</div>
            )}
          </div>
         
        </section>

        {/* Jobs Section */}
        <JobsSection 
          jobs={jobs}
          isEdit={isEdit}
          handleEditClick={handleEditClick}
          companyData={companyData}
          navigate={navigate}
        />

        {/* Gallery Section */}
        <GallerySection
          companyData={companyData}
          isEdit={isEdit}
          handleEditClick={handleEditClick}
          FALLBACK_IMAGES={FALLBACK_IMAGES}
          BASE_IMAGE_URL={BASE_IMAGE_URL}
        />

        {/* Team Section */}
        {teamsData.length > 0 && (
          <TeamSection
            teamsData={teamsData}
            isEdit={isEdit}
            handleEditClick={handleEditClick}
            BASE_IMAGE_URL={BASE_IMAGE_URL}
            FALLBACK_IMAGES={FALLBACK_IMAGES}
          />
        )}

        {/* Social Links Section */}
        <section style={{...styles.section, backgroundColor: "#1e40af", color: "#ffffff"}}>
          <h2 style={{...styles.sectionTitle, color: "#ffffff"}}>Connect With Us</h2>
          <div style={{display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap"}}>
            {[
              { icon: FaGlobe, link: companyData?.website_link, label: "Website" },
              { icon: FaLinkedin, link: companyData?.linkedin_link, label: "LinkedIn" },
              { icon: FaTwitter, link: companyData?.twitter_link, label: "Twitter" },
              { icon: FaFacebook, link: companyData?.facebook_link, label: "Facebook" },
              { icon: FaYoutube, link: companyData?.youtube_link, label: "YouTube" },
              { icon: FaInstagram, link: companyData?.instagram_link, label: "Instagram" }
            ].map((social, index) => (
              social.link && (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    textDecoration: "none"
                  }}
                >
                  <social.icon size={24} />
                  <span>{social.label}</span>
                </a>
              )
            ))}
          </div>
        </section>
      </div>
    </div>
  );
  
};

export default ShowcaseComponent;