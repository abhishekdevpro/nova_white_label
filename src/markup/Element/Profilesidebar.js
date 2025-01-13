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
// import { FaStar } from "react-icons/fa6";

function Profilesidebar({ data }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jobSeekerLoginToken");
    if (storedToken) {
      console.log("Stored token:", storedToken); // Log the stored token when component mounts
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
        <div className="sticky-top overflow-y">
          <div className="candidate-info overflow-y">
            <ul>
              <li>
                <Link
                  to={"/user/jobs-profile"}
                  className={data === "profile" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-user-o" aria-hidden="true"></i>
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  // ${token}
                  to={`https://airesume.novajobs.us/?tokenbyurl=${token}`}
                  // to={`http://localhost:3000/?tokenbyurl=${token}`}
                  className={data === "resume" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  <span>AI Resume Builder</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/resume-list"}
                  className={data === "resume-list" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-file-text-o" aria-hidden="true"></i>
                  <span>My Resumes</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-saved-jobs"}
                  className={data === "saved-jobs" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                  <span>Saved Jobs</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-applied-job"}
                  className={data === "applied-jobs" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-briefcase" aria-hidden="true"></i>
                  <span>Applied Jobs</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"/user/skill-test"}
                  className={data === "skill-test" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaLightbulb />
                  <span>Skill Test</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/skill-test-history"}
                  className={data === "skill-test-history" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHistory />
                  <span>Skill Test History</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/community"}
                  className={data === "community" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserFriends />
                  <span>Community</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/messages"}
                  className={data === "messages" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaComment />
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className={data === "ultra-aura" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaExternalLinkAlt />
                  <span>Ultra Aura</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-referral"}
                  className={data === "jobs-referral" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-id-card-o" aria-hidden="true"></i>
                  <span>Add Referral </span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-alerts"}
                  className={data === "jobs-alerts" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-bell-o" aria-hidden="true"></i>
                  <span>Notifications</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/jobs-change-password"}
                  className={data === "password" ? "active" : null}
                  onClick={() => setSidebarOpen(false)}
                >
                  <i className="fa fa-key" aria-hidden="true"></i>
                  <span>Change Password</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/user/login"}
                  onClick={() => {
                    onLogout();
                    setSidebarOpen(false);
                  }}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
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
