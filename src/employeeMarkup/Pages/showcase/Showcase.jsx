import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineHealthAndSafety,
  MdPhoto,
  MdLocalCafe,
  MdEdit,
} from "react-icons/md";
import {
  FaHospital,
  FaHeart,
  FaCalendarAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGlobe,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaCarBurst } from "react-icons/fa6";
import DOMPurify from "dompurify";
import InsideCognizant from "./InsideCognizant ";
import { Constant } from "../../../utils/constant/constant";
import ReactQuill from "react-quill";
import CompanyWTSSection from "./WtsSection";
import LeadershipTeam from "./LeaderShipTeams";
import AboutSection from "./AboutSection";
import WhyChooseUsSection from "./WhyCompanySection";
import CompanyBenefits from "./CompanyBenefits";
import JobListings from "./HiringSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    position: "relative",
    height: "500px",
    width: "100%",
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
    padding: "3rem 2rem",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "flex-end",
    gap: "2rem",
  },
  logo: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "4px solid white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  headerText: {
    color: "white",
    flex: 1,
  },
  companyName: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: 0,
    marginBottom: "0.5rem",
  },
  tagline: {
    fontSize: "1.25rem",
    margin: 0,
    opacity: 0.9,
  },
  companyInfo: {
    display: "flex",
    gap: "2rem",
    marginTop: "1rem",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1rem",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e5e7eb",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  navContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
  },
  navTabs: {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  },
  navTab: {
    color: "#4b5563",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
    padding: "0.5rem 0",
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s",
    "&:hover": {
      color: "#2563eb",
    },
  },
  activeTab: {
    color: "#2563eb",
    borderBottom: "2px solid #2563eb",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  websiteLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 500,
  },
  followButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
    transition: "background-color 0.2s",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 2rem",
  },
  section: {
    marginBottom: "6rem",
    paddingTop: "2rem",
    borderTop: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "2rem",
    textAlign: "center",
  },
  footer: {
    backgroundColor: "#1f2937",
    color: "white",
    padding: "4rem 0",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 2rem",
  },
  footerTitle: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  socialLinks: {
    display: "flex",
    gap: "2rem",
    marginBottom: "3rem",
  },
  socialIcon: {
    width: "2.5rem",
    height: "2.5rem",
    color: "white",
    transition: "color 0.2s",
  },
  copyright: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    textAlign: "center",
  },
  jobSection: {
    backgroundColor: "#f3f4f6",
    padding: "4rem 0",
    marginTop: "2rem",
  },
  jobContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    textAlign: "center",
  },
  jobTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  jobSubtitle: {
    fontSize: "1.25rem",
    color: "#4b5563",
    marginBottom: "2rem",
    maxWidth: "800px",
    margin: "0 auto 2rem",
  },
  jobButton: {
    backgroundColor: "#2563eb",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.125rem",
    fontWeight: 500,
    transition: "background-color 0.2s",
  },
};

const ShowcaseComponent = () => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openImageGallery, setOpenImageGallery] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Add dummy image constants
  const DUMMY_COVER_IMAGE = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop";
  const DUMMY_LOGO = "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=150&h=150&fit=crop";
  const DUMMY_ABOUT_IMAGES = [
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=250&fit=crop"
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: DUMMY_ABOUT_IMAGES,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("employeeLoginToken");
  const BASE_IMAGE_URL = "https://apiwl.novajobs.us";
  const navigate = useNavigate();
  const {userInfo} = useSelector((state)=>state.auth);
  
  // console.log(userInfo,"user hu main");

  // Add fallback data
  const FALLBACK_DATA = {
    company_name: "Your Company Name",
    tagline: "Building the future of work",
    location: "Global",
    employee_count: "1000+ Employees",
    industry: "Technology",
    website_link: "#",
    linkedin_link: "#",
    twitter_link: "#",
    facebook_link: "#",
    youtube_link: "#",
    instagram_link: "#",
    about: "We are a forward-thinking company dedicated to innovation and excellence. Our mission is to create meaningful solutions that make a difference in people's lives.",
    summery: "Join us in our journey to transform the future of work. We offer exciting opportunities for growth, learning, and making an impact.",
    benefits: [
      {
        title: "Competitive Benefits",
        description: "Comprehensive health coverage, retirement plans, and wellness programs"
      },
      {
        title: "Work-Life Balance",
        description: "Flexible work arrangements and generous time-off policies"
      },
      {
        title: "Career Growth",
        description: "Continuous learning opportunities and clear career progression paths"
      }
    ],
    leadership: [
      {
        name: "John Doe",
        position: "CEO & Founder",
        image: DUMMY_LOGO,
        bio: "Visionary leader with 20+ years of industry experience"
      },
      {
        name: "Jane Smith",
        position: "CTO",
        image: DUMMY_LOGO,
        bio: "Technology innovator driving digital transformation"
      }
    ]
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          "https://apiwl.novajobs.us/api/employeer/company",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        
        // Merge API data with fallback data
        const apiData = response.data.data || {};
        const mergedData = {
          ...FALLBACK_DATA,
          ...apiData,
          // Ensure images have fallbacks
          cover_image: apiData.cover_image || DUMMY_COVER_IMAGE,
          logo: apiData.logo || DUMMY_LOGO,
          about_images: apiData.about_images?.length ? apiData.about_images : DUMMY_ABOUT_IMAGES,
          // Ensure social links have fallbacks
          website_link: apiData.website_link || FALLBACK_DATA.website_link,
          linkedin_link: apiData.linkedin_link || FALLBACK_DATA.linkedin_link,
          twitter_link: apiData.twitter_link || FALLBACK_DATA.twitter_link,
          facebook_link: apiData.facebook_link || FALLBACK_DATA.facebook_link,
          youtube_link: apiData.youtube_link || FALLBACK_DATA.youtube_link,
          instagram_link: apiData.instagram_link || FALLBACK_DATA.instagram_link,
          // Ensure text content has fallbacks
          company_name: apiData.company_name || FALLBACK_DATA.company_name,
          tagline: apiData.tagline || FALLBACK_DATA.tagline,
          location: apiData.location || FALLBACK_DATA.location,
          employee_count: apiData.employee_count || FALLBACK_DATA.employee_count,
          industry: apiData.industry || FALLBACK_DATA.industry,
          about: apiData.about || FALLBACK_DATA.about,
          summery: apiData.summery || FALLBACK_DATA.summery,
          benefits: apiData.benefits?.length ? apiData.benefits : FALLBACK_DATA.benefits,
          leadership: apiData.leadership?.length ? apiData.leadership : FALLBACK_DATA.leadership
        };

        setCompanyData(mergedData);
        setFormData({
          title: mergedData.title || FALLBACK_DATA.tagline,
          description: mergedData.about || FALLBACK_DATA.about,
          image: [
            mergedData.cover_image || DUMMY_COVER_IMAGE,
            ...(mergedData.about_images || DUMMY_ABOUT_IMAGES)
          ],
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        // Use fallback data if API call fails
        setCompanyData(FALLBACK_DATA);
        setFormData({
          title: FALLBACK_DATA.tagline,
          description: FALLBACK_DATA.about,
          image: [DUMMY_COVER_IMAGE, ...DUMMY_ABOUT_IMAGES],
        });
      }
    };

    fetchCompanyData();
  }, []);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("employeeLoginToken");
      const response = await axios.put(
        "https://apiwl.novajobs.us/api/employeer/company",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Update Successful", response.data);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const handleImageChange2 = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("You can upload a maximum of 3 images.");
    } else {
      setSelectedImages(files);
    }
  };

  const handleSave2 = async () => {
    if (selectedImages.length > 3) {
      alert("Please ensure only 3 images are selected.");
      return;
    }

    const formData = new FormData();

    formData.append("title", companyData.title);
    formData.append("about", companyData.about);
    selectedImages.forEach((image) =>
      formData.append("about_images_upload", image)
    );

    try {
      const response = await axios.patch(
        "https://apiwl.novajobs.us/api/employeer/company-about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Content updated successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to update content. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleSave3 = async () => {
    const formData = new FormData();

    // formData.append("title", companyData.title)
    formData.append("summery", companyData.summery);

    try {
      const response = await axios.patch(
        "https://apiwl.novajobs.us/api/employeer/company-about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Content updated successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to update content. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Approximate height of the fixed nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Add scroll event listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "why-join", "life-at", "positions"];
      const scrollPosition = window.scrollY + 100; // Add offset for nav height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!companyData) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#f3f4f6", border: "1px solid #d1d5db", padding: "1.5rem", borderRadius: "0.5rem", width: "24rem", textAlign: "center" }}>
          <p style={{ fontSize: "1.125rem", fontWeight: 600 }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <img
          src={companyData.cover_image || DUMMY_COVER_IMAGE}
          alt="Company Cover"
          style={styles.coverImage}
        />
        <div style={styles.headerOverlay}>
          <div style={styles.headerContent}>
            <img
              src={companyData.logo || DUMMY_LOGO}
              alt="Company Logo"
              style={styles.logo}
            />
            <div style={styles.headerText}>
              <h1 style={styles.companyName}>{companyData.company_name}</h1>
              <p style={styles.tagline}>{companyData.tagline}</p>
              <div style={styles.companyInfo}>
                <div style={styles.infoItem}>
                  <CiLocationOn size={20} />
                  <span>{companyData.location || "Location not specified"}</span>
                </div>
                <div style={styles.infoItem}>
                  <IoBagHandleOutline size={20} />
                  <span>{companyData.employee_count || "Employee count not specified"}</span>
                </div>
                <div style={styles.infoItem}>
                  <MdOutlineHealthAndSafety size={20} />
                  <span>{companyData.industry || "Industry not specified"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation */}
      <div style={styles.nav}>
        <div style={styles.navContainer}>
          <nav style={styles.navContent}>
            <div style={styles.navTabs}>
              <a
                onClick={() => scrollToSection("about")}
                style={{
                  ...styles.navTab,
                  ...(activeSection === "about" ? styles.activeTab : {})
                }}
              >
                About Us
              </a>
              <a
                onClick={() => scrollToSection("why-join")}
                style={{
                  ...styles.navTab,
                  ...(activeSection === "why-join" ? styles.activeTab : {})
                }}
              >
                Why Join Us
              </a>
              <a
                onClick={() => scrollToSection("life-at")}
                style={{
                  ...styles.navTab,
                  ...(activeSection === "life-at" ? styles.activeTab : {})
                }}
              >
                Life at {companyData.company_name}
              </a>
              <a
                onClick={() => scrollToSection("positions")}
                style={{
                  ...styles.navTab,
                  ...(activeSection === "positions" ? styles.activeTab : {})
                }}
              >
                Open Positions
              </a>
            </div>
            <div style={styles.navActions}>
              <a
                href={companyData.website_link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.websiteLink}
              >
                Visit Website
              </a>
              <button style={styles.followButton}>
                Follow
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* About Section */}
        <div id="about" style={styles.section}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <AboutSection companyData={companyData} userInfo={userInfo} />
        </div>

        {/* Why Join Us Section */}
        <div id="why-join" style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Join Us</h2>
          <WhyChooseUsSection companyData={companyData} userInfo={userInfo} />
        </div>

        {/* Inside Section */}
        <div id="life-at" style={styles.section}>
          <h2 style={styles.sectionTitle}>Life at {companyData.company_name}</h2>
          <InsideCognizant companyData={companyData} userInfo={userInfo} />
        </div>

        {/* Jobs Section */}
        <div id="positions" style={styles.section}>
          <h2 style={styles.sectionTitle}>Open Positions</h2>
          <JobListings companyData={companyData} userInfo={userInfo} />
        </div>
      </div>

      {/* Job Section */}
      <div style={styles.jobSection}>
        <div style={styles.jobContent}>
          <h2 style={styles.jobTitle}>Come, join us! We're hiring.</h2>
          <p style={styles.jobSubtitle}>
            We believe that each one of us should be able to find our dream job, and we constantly strive hard to make that possible.
          </p>
          <button style={styles.jobButton}>View Jobs</button>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h3 style={styles.footerTitle}>Follow Us</h3>
          <div style={styles.socialLinks}>
            <a
              href={companyData.linkedin_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaLinkedin style={styles.socialIcon} />
            </a>
            <a
              href={companyData.twitter_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaTwitter style={styles.socialIcon} />
            </a>
            <a
              href={companyData.facebook_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaFacebook style={styles.socialIcon} />
            </a>
            <a
              href={companyData.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaYoutube style={styles.socialIcon} />
            </a>
            <a
              href={companyData.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "white" }}
            >
              <FaInstagram style={styles.socialIcon} />
            </a>
          </div>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} {companyData.company_name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ShowcaseComponent;
