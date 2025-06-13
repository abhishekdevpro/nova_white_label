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
  Bell,
  Briefcase,
  File,
  FileTextIcon,
  Heart,
  IdCard,
  LogOut,
  User,
  X,
} from "lucide-react";
// import { FaStar } from "react-icons/fa6";

function Profilesidebar({ data }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jobSeekerLoginToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("jobSeekerLoginToken");
    navigate("/user/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""} overflow-y`}>
        <div className="sticky-top overflow-y ">
          <div className="candidate-info overflow-y">
            <ul>
              {/* <li
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  padding: "1rem 0",
                  borderBottom: "1px solid #ddd",
                  backgroundColor: "#f8f9fa",
                  color: "#1C2957",
                }}
              >
                <span>Sidebar</span>
              </li> */}
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
                >
                  <User className="me-2" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  // ${token}
                  to={`/airesume/?tokenbyurl=${token}`}
                  // to={`http://localhost:3001/?tokenbyurl=${token}`}
                  className={data === "resume" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FileTextIcon className="me-2" />
                  <span>AI Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/resume-list"}
                  className={data === "resume-list" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <File className="me-2" />
                  <span>My Resumes</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-saved-jobs"}
                  className={data === "saved-jobs" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
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
                >
                  <Briefcase className="me-2" />
                  <span>Applied Jobs</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/user/skill-test"}
                  className={data === "skill-test" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaLightbulb className="me-2" />
                  <span>Skill Test</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/skill-test-history"}
                  className={data === "skill-test-history" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHistory className="me-2" />
                  <span>Skill Test History</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/community"}
                  className={data === "community" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
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
                >
                  <IdCard className="me-2" />
                  <span>Add Referral </span>
                </Link>
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

export default Profilesidebar;
