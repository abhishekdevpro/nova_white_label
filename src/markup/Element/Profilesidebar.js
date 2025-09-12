import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/profilesidebar.css";
import axios from "axios";
import {
  FaComment,
  FaExternalLinkAlt,
  FaHistory,
  FaLightbulb,
  FaUserFriends,
} from "react-icons/fa";
import {
  BadgeDollarSign,
  Bell,
  Briefcase,
  DockIcon,
  File,
  FileTextIcon,
  Heart,
  IdCard,
  LogOut,
  User,
  Video,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import styled from "styled-components";
// import { FaStar } from "react-icons/fa6";

function Profilesidebar({ data }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [servicesPermissions, setServicesPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const planName = {
    1: "Free",
    2: "Explore",
    3: "Elevate",
    4: "Excel",
    5: "Elite",
  };

  const getReq = () => {
    const token = localStorage.getItem("jobSeekerLoginToken");
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const data = response.data.data;
        setUserData(data);
      })
      .catch((err) => {

        if(err?.response?.data?.code === 401){
          onLogout()
        }
        else toast.error(
          err?.response?.data?.message || "Failed to load user profile."
        );
      });
  };

  useEffect(() => {
    getReq();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("jobSeekerLoginToken");
    if (storedToken) {
      setToken(storedToken);
    }

    // Fetch services permissions
    const fetchServicesPermissions = async () => {
      try {
        const url = window.location.origin.includes("localhost")
          ? "https://novajobs.us"
          : window.location.origin;

        const response = await axios.get(
          `https://apiwl.novajobs.us/api/jobseeker/acount-info?domain=${url}`
        );

        if (response.data?.data?.services_permissions) {
          setServicesPermissions(response.data.data.services_permissions);
        }
      } catch (error) {
        console.error("Error fetching services permissions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServicesPermissions();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("jobSeekerLoginToken");
    navigate("/user/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Helper function to check if a service is active
  const isServiceActive = (moduleName) => {
    const service = servicesPermissions.find(
      (service) => service.module_name === moduleName
    );
    return service?.is_active || false;
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar-2 ${sidebarOpen ? "open" : ""} overflow-y`}>
        <div className="sticky-top overflow-y ">
          <div className="candidate-info overflow-y" style={{maxHeight: 'calc(100vh)', overflowY: 'auto', scrollbarWidth:"none"}}>
            <ul>
              
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  padding: "1rem",
                  borderBottom: "1px solid #ddd",
                  backgroundColor: "#f8f9fa",
                  color: "#1C2957",
                }}
              >
                <span>Menus</span>
                <X
                  onClick={toggleSidebar}
                  style={{ cursor: "pointer", color: "#1C2957" }}
                  size={24}
                  className="close-icon"
                />
              </li>
              <li>
                <Link
                  to={"/user/dashboard"}
                  className={data === "dashboard" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <User className="me-2" />
                  <span>Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/user/jobs-profile"}
                  className={data === "profile" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <User className="me-2" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  // href={`/airesume/payment?tokenbyurl=${token}`
                  to="/user/current-plan"
                  className={data === "currentplan" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <BadgeDollarSign className="me-2" />
                  <span>
                    Current Plan{" "}
                    <FreeBadge>
                      {userData?.plan_id ? planName[userData.plan_id] : "Free"}
                    </FreeBadge>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/upload-documents"}
                  className={data === "upload-documents" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "14px" }}
                >
                  <DockIcon className="me-2" />
                  <span>Upload Documents</span>
                </Link>
              </li>
              {isServiceActive("Resume Builder") && (
                <>
                  <li>
                    <a
                      href={`/airesume?tokenbyurl=${token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={data === "resume" ? "active" : null}
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontSize: "15px" }}
                    >
                      <FileTextIcon className="me-2" />
                      <span>AI Resume Builder</span>
                    </a>
                  </li>

                  <li>
                    <a
                      href={`/airesume/dashboard/resumelist?tokenbyurl=${token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={data === "resume-list" ? "active" : null}
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontSize: "15px" }}
                    >
                      <File className="me-2" />
                      <span>My Resumes</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`/airesume/dashboard/cvletterlist?tokenbyurl=${token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={data === "resume-list" ? "active" : null}
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontSize: "15px" }}
                    >
                      <File className="me-2" />
                      <span>My Cover Letters</span>
                    </a>
                  </li>
                </>
              )}
               <li>
                <Link
                  to={"/user/interview-list"}
                  className={data === "interview" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <Video className="me-2" />
                  <span>My Interviews</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/voice-interview"}
                  className={data === "interview" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <Video className="me-2" />
                  <span>Voice Interviews</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-saved-jobs"}
                  className={data === "saved-jobs" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <Heart className="me-2" />
                  <span>Saved Jobs</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-applied-job"}
                  className={data === "applied-jobs" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <Briefcase className="me-2" />
                  <span>Applied Jobs</span>
                </Link>
              </li>

              {isServiceActive("Skill Test ") && (
                <>
                  <li>
                    <Link
                      to={"/user/skill-test"}
                      className={data === "skill-test" ? "active" : null}
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontSize: "15px" }}
                    >
                      <FaLightbulb className="me-2" />
                      <span>Skill Test</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/user/skill-test-history"}
                      className={
                        data === "skill-test-history" ? "active" : null
                      }
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontSize: "15px" }}
                    >
                      <FaHistory className="me-2" />
                      <span>Skill Test History</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to={"/user/community"}
                  className={data === "community" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <FaUserFriends className="me-2" />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/messages"}
                  className={data === "messages" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <FaComment className="me-2" />
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/ultraaura-courses"}
                  className={data === "ultra-aura" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <FaExternalLinkAlt className="me-2" />
                  <span>Ultra Aura</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-referral"}
                  className={data === "jobs-referral" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <IdCard className="me-2" />
                  <span>Add Referral </span>
                </Link>
              </li>

              <li>
                <a
                  href="/user/payment-plans"
                  className={data === "plan" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                  style={{ fontSize: "15px" }}
                >
                  <BadgeDollarSign className="me-2" />
                  <span>Plans </span>
                </a>
              </li>
              {/* <li>
                <Link
                  to={"/user/jobs-alerts"}
                  className={data === "jobs-alerts" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Bell className="me-2" />
                  <span>Notifications</span>
                </Link>
              </li> */}
              {/* <li>
                <Link
                  to={"/user/jobs-change-password"}
                  className={data === "password" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-key" aria-hidden="true"></i>
                  <span>Change Password</span>
                </Link>
              </li> */}
              <li>
                <Link
                  to={"/user/login"}
                  onClick={() => {
                    onLogout();
                    setSidebarOpen(false);
                  }}
                  style={{ fontSize: "15px" }}
                >
                  <LogOut className="me-2" />
                  <span>Log Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
const FreeBadge = styled.span`
  background-color: #28a745;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
  font-weight: bold;
`;

export default Profilesidebar;
