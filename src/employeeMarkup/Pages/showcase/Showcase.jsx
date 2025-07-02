import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineHealthAndSafety,
  MdPhoto,
  MdLocalCafe,
  MdEdit,
  MdLocationOn,
  MdBusiness,
  MdPeople,
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
  FaPlay,
} from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaCarBurst } from "react-icons/fa6";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import PDFViewer from "./components/PdfVeiwer";
import TeamSection from "./components/TeamsSection";
import GallerySection from "./components/ImageGallerySection";
const url = window.location.origin.includes("localhost")
  ? "https://novajobs.us"
  : window.location.origin;

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f7ff", // Light blue background
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#1e40af",
    background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
    padding: "4rem 2rem",
    textAlign: "center",
    position: "relative",
    color: "#ffffff",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
      zIndex: 1,
    },
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
  stickyNav: {
    position: "sticky",
    top: 0,
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 1000,
    padding: "1rem 0",
    marginTop: "-1rem",
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
    transition: "all 0.2s",
    cursor: "pointer",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#1e40af",
    },
  },
  activeNavLink: {
    color: "#ffffff",
    backgroundColor: "#1e40af",
  },
  logo: {
    width: "100px",
    height: "100px",
    borderRadius: "20px",
    objectFit: "cover",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
    border: "4px solid rgba(255, 255, 255, 0.9)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 12px 20px rgba(0,0,0,0.3)",
    },
  },
  headerText: {
    textAlign: "center",
    maxWidth: "900px",
    position: "relative",
  },
  companyName: {
    fontSize: "4rem",
    fontWeight: "800",
    color: "#ffffff",
    margin: 0,
    marginBottom: "1.5rem",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    letterSpacing: "-0.02em",
    background: "linear-gradient(to right, #ffffff, #e2e8f0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  tagline: {
    fontSize: "1.75rem",
    color: "#e2e8f0",
    margin: 0,
    marginBottom: "3rem",
    lineHeight: "1.6",
    fontWeight: "400",
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  companyInfo: {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "1rem",
    padding: "0 1rem",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    fontSize: "1.25rem",
    color: "#ffffff",
    padding: "1rem 2rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },
  section: {
    marginBottom: "8rem",
    padding: "3rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    position: "relative",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: "3rem",
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-1rem",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      backgroundColor: "#1e40af",
      borderRadius: "2px",
    },
  },
  aboutContent: {
    fontSize: "1.125rem",
    lineHeight: "1.8",
    color: "#4b5563",
    maxWidth: "800px",
    margin: "0 auto",
  },
  // benefitsContainer: {
  //   display: "grid",
  //   gridTemplateColumns: "repeat(2, 1fr)",
  //   gap: "3rem",
  //   maxWidth: "1000px",
  //   margin: "0 auto",
  // },
  // benefitItem: {
  //   display: "flex",
  //   gap: "1.5rem",
  //   alignItems: "flex-start",
  //   padding: "2rem",
  //   backgroundColor: "#f8fafc",
  //   borderRadius: "12px",
  //   transition: "all 0.3s",
  //   "&:hover": {
  //     backgroundColor: "#f0f7ff",
  //     transform: "translateY(-4px)",
  //   },
  // },
  // benefitIcon: {
  //   fontSize: "2rem",
  //   color: "#1e40af",
  //   flexShrink: 0,
  // },
  // benefitContent: {
  //   flex: 1,
  // },
  // benefitTitle: {
  //   fontSize: "1.5rem",
  //   fontWeight: 600,
  //   color: "#1e40af",
  //   marginBottom: "0.5rem",
  // },
  // benefitDescription: {
  //   color: "#6b7280",
  //   fontSize: "1rem",
  //   lineHeight: "1.6",
  // },
  benefitsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  benefitItem: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "flex-start",
    padding: "2rem",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    transition: "all 0.3s ease",
  },
  benefitIcon: {
    fontSize: "2rem",
    color: "#1e40af",
    flexShrink: 0,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1e40af",
    marginBottom: "0.5rem",
  },
  benefitDescription: {
    color: "#6b7280",
    fontSize: "1rem",
    lineHeight: "1.6",
  },

  // Responsive styles with media queries
  "@media(min-width: 600px)": {
    benefitsContainer: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  "@media(min-width: 992px)": {
    benefitsContainer: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  galleryContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  galleryImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "12px",
    transition: "all 0.3s",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 8px 12px rgba(30, 64, 175, 0.1)",
    },
  },
  teamsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
    // maxWidth: "1200px",
    margin: "0 auto",
  },
  teamMember: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#f0f7ff",
      transform: "translateY(-4px)",
    },
  },
  teamImage: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1.5rem",
    border: "4px solid #ffffff",
    boxShadow: "0 4px 6px rgba(30, 64, 175, 0.1)",
  },
  teamName: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1e40af",
    marginBottom: "0.5rem",
  },
  teamPosition: {
    color: "#6b7280",
    fontSize: "1rem",
    marginBottom: "1rem",
  },
  teamBio: {
    color: "#4b5563",
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  wtsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "3rem",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  wtsItem: {
    position: "relative",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "#f0f7ff",
      transform: "translateY(-4px)",
    },
  },
  wtsImage: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
  },
  wtsPlayButton: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    backgroundColor: "#1e40af",
    color: "white",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "#1e3a8a",
      transform: "scale(1.1)",
    },
  },
  wtsContent: {
    padding: "2rem",
  },
  wtsTitle: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#1e40af",
    marginBottom: "1rem",
  },
  wtsDescription: {
    color: "#4b5563",
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  socialSection: {
    backgroundColor: "#1e40af",
    padding: "4rem 2rem",
    marginTop: "2rem",
    borderRadius: "12px",
    color: "#ffffff",
  },
  socialContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  socialTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "1rem",
  },
  socialSubtitle: {
    fontSize: "1.125rem",
    color: "#e2e8f0",
    marginBottom: "3rem",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  socialLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textDecoration: "none",
    color: "#ffffff",
    transition: "all 0.2s",
    padding: "1.5rem",
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transform: "translateY(-4px)",
    },
  },
  socialIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#ffffff",
  },
  socialLabel: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "#ffffff",
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
    transition: "all 0.2s ease",
    fontSize: "0.875rem",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#1e3a8a",
      transform: "translateY(-2px)",
    },
  },
  jobOpeningsSection: {
    marginBottom: "8rem",
    padding: "3rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    position: "relative",
  },
  jobCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "1.5rem",
    transition: "all 0.3s ease",
    border: "1px solid #e2e8f0",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 16px rgba(30, 64, 175, 0.1)",
    },
  },
  jobTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e40af",
    marginBottom: "1rem",
  },
  jobDetails: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    marginBottom: "1rem",
  },
  jobDetail: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#4b5563",
    fontSize: "0.875rem",
  },
  jobDescription: {
    color: "#6b7280",
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
  },
  jobLocation: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#4b5563",
    fontSize: "0.875rem",
  },
  jobType: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: "#1e40af",
    color: "#ffffff",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  jobSalary: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: "#e2e8f0",
    color: "#1e40af",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    marginLeft: "0.5rem",
  },
  noJobs: {
    textAlign: "center",
    padding: "3rem",
    color: "#6b7280",
    fontSize: "1.125rem",
  },
};

const FALLBACK_IMAGES = {
  logo: "https://placehold.co/150x150/1e40af/ffffff?text=Logo",
  cover: "https://placehold.co/1200x600/1e40af/ffffff?text=Cover+Image",
  gallery: [
    "https://placehold.co/400x300/1e40af/ffffff?text=Gallery+1",
    "https://placehold.co/400x300/1e40af/ffffff?text=Gallery+2",
    "https://placehold.co/400x300/1e40af/ffffff?text=Gallery+3",
  ],
  team: [
    {
      image: "https://placehold.co/200x200/1e40af/ffffff?text=Team+1",
      name: "John Doe",
      position: "CEO & Founder",
      bio: "Visionary leader with 20+ years of industry experience",
    },
    {
      image: "https://placehold.co/200x200/1e40af/ffffff?text=Team+2",
      name: "Jane Smith",
      position: "CTO",
      bio: "Technology innovator driving digital transformation",
    },
    {
      image: "https://placehold.co/200x200/1e40af/ffffff?text=Team+3",
      name: "Sarah Johnson",
      position: "COO",
      bio: "Operations expert with a passion for efficiency",
    },
  ],
  testimonials: [
    {
      image: "https://placehold.co/400x300/1e40af/ffffff?text=Testimonial+1",
      title: "Amazing Company Culture",
      description:
        "Working here has been an incredible experience. The team is supportive and the work environment is fantastic.",
    },
    {
      image: "https://placehold.co/400x300/1e40af/ffffff?text=Testimonial+2",
      title: "Great Growth Opportunities",
      description:
        "The company provides excellent opportunities for professional development and career growth.",
    },
  ],
};

const ShowcaseComponent = () => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openImageGallery, setOpenImageGallery] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [loading, setLoading] = useState(true);
  const [teamsData, setTeamsData] = useState([]);
  const [wtsData, setWtsData] = useState([]);
  const token =
    localStorage.getItem("employeeLoginToken") ||
    localStorage.getItem("vendorToken");
  const BASE_IMAGE_URL = "https://apiwl.novajobs.us";
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { companyId } = useParams();
  const isEdit = token && !companyId ? true : false;

  // console.log(userInfo,"user hu main");

  // Add dummy image constants
  const DUMMY_COVER_IMAGE =
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=500&fit=crop";
  const DUMMY_LOGO =
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=150&h=150&fit=crop";
  const DUMMY_ABOUT_IMAGES = [
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=400&h=250&fit=crop",
  ];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: DUMMY_ABOUT_IMAGES,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    about:
      "We are a forward-thinking company dedicated to innovation and excellence. Our mission is to create meaningful solutions that make a difference in people's lives.",
    summery:
      "Join us in our journey to transform the future of work. We offer exciting opportunities for growth, learning, and making an impact.",
    benefits: [
      {
        title: "Competitive Benefits",
        description:
          "Comprehensive health coverage, retirement plans, and wellness programs",
      },
      {
        title: "Work-Life Balance",
        description:
          "Flexible work arrangements and generous time-off policies",
      },
      {
        title: "Career Growth",
        description:
          "Continuous learning opportunities and clear career progression paths",
      },
    ],
    leadership: [
      {
        name: "John Doe",
        position: "CEO & Founder",
        image: DUMMY_LOGO,
        bio: "Visionary leader with 20+ years of industry experience",
      },
      {
        name: "Jane Smith",
        position: "CTO",
        image: DUMMY_LOGO,
        bio: "Technology innovator driving digital transformation",
      },
    ],
  };

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const API = companyId
        ? `${BASE_IMAGE_URL}/api/jobseeker/company/${companyId}?domain=${url}`
        : `${BASE_IMAGE_URL}/api/employeer/company?domain=${url}`;
      try {
        // Fetch company data
        const companyResponse = await axios.get(API, {
          headers: {
            Authorization: token,
          },
        });
        setCompanyData(companyResponse.data.data);

        // Fetch teams data
        const TEAMAPI = companyId
          ? `${BASE_IMAGE_URL}/api/jobseeker/company-teams/${companyId}?domain=${url}`
          : `${BASE_IMAGE_URL}/api/employeer/company-teams?domain=${url}`;
        const teamsResponse = await axios.get(TEAMAPI, {
          headers: {
            Authorization: token,
          },
        });
        setTeamsData(teamsResponse.data.data || []);

        // Fetch WTS data
        const WTSAPI = companyId
          ? `${BASE_IMAGE_URL}/api/jobseeker/company-wts/${companyId}?domain=${url}`
          : `${BASE_IMAGE_URL}/api/employeer/company-wts?domain=${url}`;
        const wtsResponse = await axios.get(WTSAPI, {
          headers: {
            Authorization: token,
          },
        });
        setWtsData(wtsResponse.data.data || []);

        // Fetch jobs
        const JOBAPI = companyId
          ? `https://apiwl.novajobs.us/api/jobseeker/job-lists?page_no=1&page_size=10&is_publish=1&company_id=${companyId}&domain=${url}`
          : `https://apiwl.novajobs.us/api/employeer/job-lists`;
        const jobsResponse = await axios.get(JOBAPI, {
          headers: {
            Authorization: token,
          },
        });
        setJobs(jobsResponse.data.data || []);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (section) => {
    // Map showcase sections to BrandingCompany tabs
    const sectionToTab = {
      hero: "company-info",
      about: "about-company",
      benefits: "benefits",
      gallery: "gallery",
      join: "join-us",
      teams: "leadership-team",
      wts: "testimonials",
      social: "social-links",
      jobs: "jobs",
    };
    const Employeetoken = localStorage.getItem("employeeLoginToken");
    const vendorToken = localStorage.getItem("vendorToken");

    const path = window.location.pathname;

    // const showVendorHeader = path.includes("/vendor") && vendorToken;
    const showEmployee = Employeetoken && path.includes("/employer");

    const tab = sectionToTab[section] || "company-info";
    {
      showEmployee
        ? navigate(`/employer/branding-company?tab=${tab}`)
        : navigate(`/vendor/branding?tab=${tab}`);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // Approximate height of the sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Add scroll event listener to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "benefits", "gallery", "teams", "wts", "jobs"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add error handling for images
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src =
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop";
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5 text-secondary">Loading companies info...</p>
        </div>
      </div>
    );
  }
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
            <button
              style={styles.editButton}
              onClick={() => handleEditClick("hero")}
            >
              <MdEdit size={18} />
              Edit Hero
            </button>
          )}
          <img
            src={companyData?.logo || FALLBACK_IMAGES.logo}
            alt="Company Logo"
            style={styles.logo}
            onError={handleImageError}
          />
          <div style={styles.headerText}>
            <h1 style={styles.companyName}>
              {companyData?.company_name || "Company Name"}
            </h1>
            <p style={styles.tagline}>
              {companyData?.tagline || "Company Tagline"}
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

      {/* Sticky Navigation - Moved below header */}
      <div style={styles.stickyNav} className=" d-none d-md-block">
        <div style={styles.navContainer}>
          <a
            style={{
              ...styles.navLink,
              ...(activeSection === "about" ? styles.activeNavLink : {}),
            }}
            onClick={() => scrollToSection("about")}
          >
            About
          </a>
          <a
            style={{
              ...styles.navLink,
              ...(activeSection === "benefits" ? styles.activeNavLink : {}),
            }}
            onClick={() => scrollToSection("benefits")}
          >
            Benefits
          </a>
          <a
            style={{
              ...styles.navLink,
              ...(activeSection === "jobs" ? styles.activeNavLink : {}),
            }}
            onClick={() => scrollToSection("jobs")}
          >
            Jobs
          </a>
          <a
            style={{
              ...styles.navLink,
              ...(activeSection === "gallery" ? styles.activeNavLink : {}),
            }}
            onClick={() => scrollToSection("gallery")}
          >
            Gallery
          </a>
          <a
            style={{
              ...styles.navLink,
              ...(activeSection === "teams" ? styles.activeNavLink : {}),
            }}
            onClick={() => scrollToSection("teams")}
          >
            Team
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* About Section */}
        <section id="about" style={styles.section}>
          {isEdit && (
            <button
              style={styles.editButton}
              onClick={() => handleEditClick("about")}
            >
              <MdEdit size={18} />
              Edit About
            </button>
          )}
          <h2 style={styles.sectionTitle}>About Us</h2>
          {companyData?.about ? (
            <div
              style={styles.aboutContent}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(companyData?.about || ""),
              }}
            />
          ) : (
            <div>No Summary at the moment. Please check back later.</div>
          )}
        </section>
        {/* video section */}
        <section id="about" style={styles.section}>
          {isEdit && (
            <button
              style={styles.editButton}
              onClick={() => handleEditClick("about")}
            >
              <MdEdit size={18} />
              Edit About
            </button>
          )}
          {/* <h2 style={styles.sectionTitle}>Company Video</h2> */}
          {companyData?.video_urls?.[0]?.trim() ? (
            <div style={{ marginBottom: "20px" }}>
              <ReactPlayer
                url={companyData.video_urls[0]}
                controls
                width="100%"
                height="500px"
              />
            </div>
          ) : (
            <div>No video at the moment. Please check back later.</div>
          )}
        </section>
        {/* Pdf Section.. */}
        {companyData?.pdf_urls ? (
          <section id="about" style={styles.section}>
            <PDFViewer fileUrl={companyData?.pdf_urls} />
          </section>
        ) : (
          ""
        )}

        <section id="benefits" style={styles.section}>
          {isEdit && (
            <button
              style={styles.editButton}
              onClick={() => handleEditClick("benefits")}
            >
              <MdEdit size={18} />
              Edit Benefits
            </button>
          )}
          <h2 style={styles.sectionTitle}>What Makes Us Unique</h2>
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

        {/* Job Openings Section */}
        <section id="jobs" style={styles.jobOpeningsSection}>
          {isEdit && (
            <button
              style={styles.editButton}
              onClick={() => handleEditClick("jobs")}
            >
              <MdEdit size={18} />
              Edit Jobs
            </button>
          )}
          <h2 style={styles.sectionTitle}>Open Positions</h2>
          <p
            style={styles.sectionTitle}
            className="text-muted text-center fs-3"
          >
            {parse(companyData?.join_us)}
          </p>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div key={index} style={styles.jobCard}>
                <div className="w-100 d-flex justify-content-between align-items-center flex-wrap mb-3">
                  <h3 className="mb-0 me-3 text-dark fw-semibold">
                    {job.job_detail.job_title}
                  </h3>
                  <button
                    className="site-button text-white btn-outline-primary btn-md"
                    onClick={() => navigate(`/user/jobs/${job.job_detail.id}`)}
                  >
                    View
                  </button>
                </div>

                <div style={styles.jobDetails}>
                  <div style={styles.jobDetail}>
                    <MdBusiness size={20} />
                    <span>{job.job_type.name}</span>
                  </div>
                  <div style={styles.jobDetail}>
                    <MdLocationOn size={20} />
                    <span>{`${job.cities.name}, ${job.states.name}, ${job.countries.name}`}</span>
                  </div>
                  <div style={styles.jobDetail}>
                    <MdOutlineHealthAndSafety size={20} />
                    <span>{job.experience_level.name}</span>
                  </div>
                </div>
                {/* <div
                  style={styles.jobDescription}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(job.job_detail.job_description),
                  }}
                />
                <div style={styles.jobDetails}>
                  <span style={styles.jobType}>
                    {job.job_workplace_types.name}
                  </span>
                  {job.job_detail.salary && (
                    <span style={styles.jobSalary}>
                      {job.job_detail.salary}
                    </span>
                  )}
                </div> */}
              </div>
            ))
          ) : (
            <div style={styles.noJobs}>
              No open positions at the moment. Please check back later.
            </div>
          )}
        </section>

        <GallerySection
          companyData={companyData}
          isEdit={isEdit}
          handleEditClick={(section) =>
            console.log("Edit clicked for", section)
          }
          FALLBACK_IMAGES={{
            DUMMY_ABOUT_IMAGES
          }}
          BASE_IMAGE_URL="https://apiwl.novajobs.us"
          handleImageError={(e) => {
            e.target.src = "/default-image.jpg"; // fallback
          }}
        />

        {/* Gallery Section */}
        {/* <section id="gallery" style={styles.section}>
          {isEdit && (
            <button
              style={styles.editButton}
              ad
              onClick={() => handleEditClick("gallery")}
            >
              <MdEdit size={18} />
              Edit Gallery
            </button>
          )}

          <h2 style={styles.sectionTitle}>
            Life at {companyData?.company_name}
          </h2>
          <div style={styles.galleryContainer}>
            {(companyData?.inside_culture_images?.length > 0
              ? companyData.inside_culture_images
              : FALLBACK_IMAGES.gallery
            ).map((image, index) => (
              <img
                key={index}
                src={
                  typeof image === "string"
                    ? `${BASE_IMAGE_URL}${image}`
                    : image
                }
                alt={`Company Culture ${index + 1}`}
                style={styles.galleryImage}
                onError={handleImageError}
              />
            ))}
          </div>
        </section> */}

        {/* Teams Section */}
        {/* {teamsData.length > 0 && (
          <section id="teams" style={styles.section}>
            {isEdit && (
              <button
                style={styles.editButton}
                onClick={() => handleEditClick("teams")}
              >
                <MdEdit size={18} />
                Edit Team
              </button>
            )}
            <h2 style={styles.sectionTitle}>Our Leadership Team</h2>
            <div style={styles.teamsContainer}>
              {(teamsData.length > 0 ? teamsData : FALLBACK_IMAGES.team).map(
                (team, index) => (
                  <div key={index} style={styles.teamMember}>
                    <img
                      src={`${BASE_IMAGE_URL}${team.image}`}
                      alt={team.name}
                      style={styles.teamImage}
                      onError={handleImageError}
                    />
                    <h3 style={styles.teamName}>{team.name}</h3>
                    <p style={styles.teamPosition}>{team.position}</p>
                    <p style={styles.teamBio}>{team.bio}</p>
                  </div>
                )
              )}
            </div>
          </section>
        )} */}
        {teamsData.length > 0 && (
          <TeamSection
            teamsData={teamsData}
            isEdit={isEdit}
            handleEditClick={handleEditClick}
            handleImageError={handleImageError}
            BASE_IMAGE_URL={BASE_IMAGE_URL}
            FALLBACK_IMAGES={FALLBACK_IMAGES}
          />
        )}

        {/* WTS Section */}
        {wtsData.length > 0 && (
          <section id="wts" style={styles.section}>
            {isEdit && (
              <button
                style={styles.editButton}
                onClick={() => handleEditClick("wts")}
              >
                <MdEdit size={18} />
                Edit Testimonials
              </button>
            )}
            <h2 style={styles.sectionTitle}>What They Say</h2>
            <div style={styles.wtsContainer}>
              {(wtsData.length > 0
                ? wtsData
                : FALLBACK_IMAGES.testimonials
              ).map((wts, index) => (
                <div key={index} style={styles.wtsItem}>
                  <img
                    src={
                      typeof wts.image === "string"
                        ? `${BASE_IMAGE_URL}${wts.image}`
                        : wts.image
                    }
                    alt={wts.title}
                    style={styles.wtsImage}
                    onError={handleImageError}
                  />
                  <div style={styles.wtsPlayButton}>
                    <FaPlay />
                  </div>
                  <div style={styles.wtsContent}>
                    <h3 style={styles.wtsTitle}>{wts.title}</h3>
                    <p style={styles.wtsDescription}>{wts.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Social Links Section */}
        <section style={styles.socialSection}>
          <div style={styles.socialContainer}>
            <h2 style={styles.socialTitle}>Connect With Us</h2>
            <p style={styles.socialSubtitle}>
              Follow us on social media to stay updated with our latest news and
              opportunities
            </p>
            <div style={styles.socialLinks}>
              {companyData?.website_link && (
                <a
                  href={companyData.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaGlobe style={styles.socialIcon} />
                  <span style={styles.socialLabel}>Website</span>
                </a>
              )}
              {companyData?.linkedin_link && (
                <a
                  href={companyData.linkedin_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaLinkedin style={styles.socialIcon} />
                  <span style={styles.socialLabel}>LinkedIn</span>
                </a>
              )}
              {companyData?.twitter_link && (
                <a
                  href={companyData.twitter_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaTwitter style={styles.socialIcon} />
                  <span style={styles.socialLabel}>Twitter</span>
                </a>
              )}
              {companyData?.facebook_link && (
                <a
                  href={companyData.facebook_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaFacebook style={styles.socialIcon} />
                  <span style={styles.socialLabel}>Facebook</span>
                </a>
              )}
              {companyData?.youtube_link && (
                <a
                  href={companyData.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaYoutube style={styles.socialIcon} />
                  <span style={styles.socialLabel}>YouTube</span>
                </a>
              )}
              {companyData?.instagram_link && (
                <a
                  href={companyData.instagram_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.socialLink}
                >
                  <FaInstagram style={styles.socialIcon} />
                  <span style={styles.socialLabel}>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShowcaseComponent;
