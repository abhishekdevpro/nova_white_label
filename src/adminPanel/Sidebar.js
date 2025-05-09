import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaStore,
  FaUsers,
  FaUserTie,
  FaBriefcase,
  FaBell,
  FaUserPlus,
  FaTasks,
  FaWallet,
  FaUserGraduate,
  FaFileAlt,
} from "react-icons/fa";
import "../css/profilesidebar.css";
const Sidebar = () => {
  const location = useLocation();
  const [showTeamSubmenu, setShowTeamSubmenu] = useState(false);
  const [showTeamSubmenu1, setShowTeamSubmenu1] = useState(false);
  const [showTeamSubmenu2, setShowTeamSubmenu2] = useState(false);
  const [showTeamSubmenu3, setShowTeamSubmenu3] = useState(false);
  const [showTeamSubmenu4, setShowTeamSubmenu4] = useState(false);
  const [showTeamSubmenu5, setShowTeamSubmenu5] = useState(false);
  const [showTeamSubmenu6, setShowTeamSubmenu6] = useState(false);
  const [showTeamSubmenu7, setShowTeamSubmenu7] = useState(false);
  const [showTeamSubmenu8, setShowTeamSubmenu8] = useState(false);
  const [showTeamSubmenu9, setShowTeamSubmenu9] = useState(false);
  const [showTeamSubmenu9A, setShowTeamSubmenu9A] = useState(false);
  const [showTeamSubmenu9A1, setShowTeamSubmenu9A1] = useState(false);
  const [showTeamSubmenu9A2, setShowTeamSubmenu9A2] = useState(false);
  const [showTeamSubmenu9B, setShowTeamSubmenu9B] = useState(false);
  const [showTeamSubmenu9B1, setShowTeamSubmenu9B1] = useState(false);
  const [showTeamSubmenu9C, setShowTeamSubmenu9C] = useState(false);
  const [showTeamSubmenu9C1, setShowTeamSubmenu9C1] = useState(false);
  const [showTeamSubmenu9D, setShowTeamSubmenu9D] = useState(false);
  const [showTeamSubmenu9D1, setShowTeamSubmenu9D1] = useState(false);
  const [showTeamSubmenu9E, setShowTeamSubmenu9E] = useState(false);
  const [showTeamSubmenu9E1, setShowTeamSubmenu9E1] = useState(false);
  const [showTeamSubmenu10, setShowTeamSubmenu10] = useState(false);
  const [showTeamSubmenu10A, setShowTeamSubmenu10A] = useState(false);
  const [showTeamSubmenu10B, setShowTeamSubmenu10B] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navLinkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    backgroundColor: location.pathname === path ? "#1C2957" : "transparent",
    color: location.pathname === path ? "white" : "black",
    padding: "",
    textDecoration: "none",
  });

  const iconStyle = {
    marginRight: "10px",
  };

  useEffect(() => {
    if (location.pathname.startsWith("/admin/vendor"))
      setShowTeamSubmenu5(true);
    if (location.pathname.startsWith("/admin/team")) setShowTeamSubmenu(true);
    if (location.pathname.startsWith("/admin/jobs")) setShowTeamSubmenu3(true);
    if (location.pathname.startsWith("/admin/notifications"))
      setShowTeamSubmenu4(true);
    if (location.pathname.startsWith("/admin/jobseekers"))
      setShowTeamSubmenu1(true);
    if (location.pathname.startsWith("/admin/employer"))
      setShowTeamSubmenu2(true);
    if (location.pathname.startsWith("/admin/wallet"))
      setShowTeamSubmenu6(true);
    if (location.pathname.startsWith("/admin/CompanyNameAdmin"))
      setShowTeamSubmenu6(true);
    if (location.pathname.startsWith("/admin/cms")) setShowTeamSubmenu8(true);
    if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9(true);
    if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9A(true);
    if (location.pathname.startsWith("/admin/apps"))
      setShowTeamSubmenu9A1(true);
    if (location.pathname.startsWith("/admin/apps"))
      setShowTeamSubmenu9A2(true);
    if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9B(true);
    if (location.pathname.startsWith("/admin/apps"))
      setShowTeamSubmenu9B1(true);
    if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9C(true);
    if (location.pathname.startsWith("/admin/apps"))
      setShowTeamSubmenu9C1(true);
    if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9D(true);
    if (location.pathname.startsWith("/admin/apps"))
      setShowTeamSubmenu9D1(true);
    if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9E(true);
    if (location.pathname.startsWith("/admin/apps"))
      setShowTeamSubmenu9E1(true);
    if (location.pathname.startsWith("/admin/server"))
      setShowTeamSubmenu10(true);
    if (location.pathname.startsWith("/admin/server"))
      setShowTeamSubmenu10A(true);
    if (location.pathname.startsWith("/admin/server"))
      setShowTeamSubmenu10B(true);
  }, [location.pathname]);

  const handleTeamClick = () => {
    setShowTeamSubmenu(!showTeamSubmenu);
  };
  const handleTeamClick1 = () => {
    setShowTeamSubmenu1(!showTeamSubmenu1);
  };
  const handleTeamClick2 = () => {
    setShowTeamSubmenu2(!showTeamSubmenu2);
  };
  const handleTeamClick3 = () => {
    setShowTeamSubmenu3(!showTeamSubmenu3);
  };
  const handleTeamClick4 = () => {
    setShowTeamSubmenu4(!showTeamSubmenu4);
  };
  const handleTeamClick5 = () => {
    setShowTeamSubmenu5(!showTeamSubmenu5);
  };
  const handleTeamClick6 = () => {
    setShowTeamSubmenu6(!showTeamSubmenu6);
  };
  const handleTeamClick7 = () => {
    setShowTeamSubmenu7(!showTeamSubmenu7);
  };
  const handleTeamClick8 = () => {
    setShowTeamSubmenu8(!showTeamSubmenu8);
  };
  const handleTeamClick9 = () => {
    setShowTeamSubmenu9(!showTeamSubmenu9);
  };

  const handleTeamClick9A = () => {
    setShowTeamSubmenu9A(!showTeamSubmenu9A);
  };
  const handleTeamClick9A1 = () => {
    setShowTeamSubmenu9A1(!showTeamSubmenu9A1);
  };
  const handleTeamClick9A2 = () => {
    setShowTeamSubmenu9A2(!showTeamSubmenu9A2);
  };
  const handleTeamClick9B = () => {
    setShowTeamSubmenu9B(!showTeamSubmenu9B);
  };
  const handleTeamClick9B1 = () => {
    setShowTeamSubmenu9B1(!showTeamSubmenu9B1);
  };
  const handleTeamClick9C = () => {
    setShowTeamSubmenu9C(!showTeamSubmenu9C);
  };
  const handleTeamClick9C1 = () => {
    setShowTeamSubmenu9C1(!showTeamSubmenu9C1);
  };
  const handleTeamClick9D = () => {
    setShowTeamSubmenu9D(!showTeamSubmenu9D);
  };
  const handleTeamClick9D1 = () => {
    setShowTeamSubmenu9D1(!showTeamSubmenu9D1);
  };
  const handleTeamClick9E = () => {
    setShowTeamSubmenu9E(!showTeamSubmenu9E);
  };
  const handleTeamClick9E1 = () => {
    setShowTeamSubmenu9E1(!showTeamSubmenu9E1);
  };
  const handleTeamClick10 = () => {
    setShowTeamSubmenu10(!showTeamSubmenu10);
  };
  const handleTeamClick10A = () => {
    setShowTeamSubmenu10A(!showTeamSubmenu10A);
  };
  const handleTeamClick10B = () => {
    setShowTeamSubmenu10B(!showTeamSubmenu10B);
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} style={{
        position: 'fixed',
        top: 82,
        left: -15,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 1000,
     
      }}>
        <Nav className="flex-column bg-light h-screen gap-3">
          <Nav.Link
            as={NavLink}
            to="/admin/dashboard"
            style={navLinkStyle("/admin/dashboard")}
            className="ps-4"
          >
            <FaTachometerAlt style={iconStyle} /> Dashboard
          </Nav.Link>

          <div>
            <Nav.Link
              onClick={handleTeamClick5}
              as={NavLink}
              to="/admin/vendor"
              style={navLinkStyle("/admin/vendor")}
              className="ps-4"
            >
              <FaStore style={iconStyle} /> Vendor
            </Nav.Link>
            {showTeamSubmenu5 && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/admin/listvendor"
                  style={navLinkStyle("/admin/listvendor")}
                  className="ps-5"
                >
                  <FaStore style={iconStyle} /> List Vendor
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/addvendor"
                  style={navLinkStyle("/admin/addvendor")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} /> Add Vendor
                </Nav.Link>
              </>
            )}
          </div>

          <div>
            <Nav.Link
              onClick={handleTeamClick3}
              as={NavLink}
              to="/admin/jobs"
              style={navLinkStyle("/admin/jobs")}
              className="ps-4"
            >
              <FaBriefcase style={iconStyle} /> Jobs
            </Nav.Link>
            {showTeamSubmenu3 && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/admin/listalljobs"
                  style={navLinkStyle("/admin/listalljobs")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} /> List All
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/addjobs"
                  style={navLinkStyle("/admin/addjobs")}
                  className="ps-5"
                >
                  <FaBriefcase style={iconStyle} /> Add Jobs
                </Nav.Link>
                {/* <Nav.Link as={NavLink} to="/admin/bulkUploadjobs" style={navLinkStyle("/admin/bulkUploadjobs")} className='ps-5'>
              <FaUsers style={iconStyle} /> Bulk Upload
            </Nav.Link> */}
              </>
            )}
          </div>

          {/* <div>
        <Nav.Link
          onClick={handleTeamClick4}
          as={NavLink} to="/admin/notifications"
          style={navLinkStyle("/admin/notifications")}
          className='ps-4'
        >
          <FaBell style={iconStyle} /> Notifications
        </Nav.Link>
        {showTeamSubmenu4 && (
          <>
            <Nav.Link as={NavLink} to="/admin/team/listallnotificationss" style={navLinkStyle("/admin/team/listallnotificationss")} className='ps-5'>
              <FaUsers style={iconStyle} /> List notifications
            </Nav.Link>
          </>
        )}
      </div> */}

          <div>
            <Nav.Link
              onClick={handleTeamClick1}
              as={NavLink}
              to="/admin/jobseekers"
              style={navLinkStyle("/admin/jobseekers")}
              className="ps-4"
            >
              <FaUserGraduate style={iconStyle} /> JobSeekers
            </Nav.Link>
            {showTeamSubmenu1 && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/admin/listalljobseeker"
                  style={navLinkStyle("/admin/listalljobseeker")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} /> List All
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/Addjobseeker"
                  style={navLinkStyle("/admin/Addjobseeker")}
                  className="ps-5"
                >
                  <FaUserGraduate style={iconStyle} /> Add Job Seeker
                </Nav.Link>
                {/*  <Nav.Link as={NavLink} to="/admin/bulkUpload" style={navLinkStyle("/admin/bulkUpload")} className='ps-5'>
              <FaUsers style={iconStyle} /> Bulk Upload
            </Nav.Link> */}
              </>
            )}
          </div>

          <div>
            <Nav.Link
              onClick={handleTeamClick2}
              as={NavLink}
              to="/admin/employer"
              style={navLinkStyle("/admin/employer")}
              className="ps-4"
            >
              <FaUserTie style={iconStyle} /> Employer
            </Nav.Link>
            {showTeamSubmenu2 && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/admin/employeelist"
                  style={navLinkStyle("/admin/employeelist")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} /> List All
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/team/addemployers"
                  style={navLinkStyle("/admin/team/addemployers")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} /> Add Employers
                </Nav.Link>
                {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
              <FaUsers style={iconStyle} /> Bulk Upload
            </Nav.Link> */}
              </>
            )}
          </div>
          <div>
            <Nav.Link
              onClick={handleTeamClick8}
              as={NavLink}
              to=""
              style={navLinkStyle("/admin/cms")}
              className="ps-4"
            >
              <FaUserTie style={iconStyle} /> CMS
            </Nav.Link>
            {showTeamSubmenu8 && (
              <>
                <Nav.Link
                  as={NavLink}
                  to=""
                  style={navLinkStyle("")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} /> Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/admin/aboutus"
                  style={navLinkStyle("/admin/aboutus")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  About Us
                </Nav.Link>
                {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
              <FaUsers style={iconStyle} /> Bulk Upload
            </Nav.Link> */}
              </>
            )}
          </div>

          <div>
            <Nav.Link
              onClick={handleTeamClick9}
              as={NavLink}
              to=""
              style={navLinkStyle("/admin/apps")}
              className="ps-4"
            >
              <FaUserTie style={iconStyle} /> Apps
            </Nav.Link>
            {showTeamSubmenu9 && (
              <>
                <Nav.Link
                  onClick={handleTeamClick9A}
                  as={NavLink}
                  to=""
                  style={navLinkStyle("")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  UltraAura
                </Nav.Link>
                {showTeamSubmenu9A && (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="https://ultraaura.education/"
                      style={navLinkStyle("/")}
                      className="ps-6 mr-2"
                    >
                      <FaUsers style={iconStyle} />
                      View
                    </Nav.Link>
                    <Nav.Link
                      onClick={handleTeamClick9A1}
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      CMS
                    </Nav.Link>
                    {showTeamSubmenu9A1 && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to=""
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Home
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to=""
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          About Us
                        </Nav.Link>
                      </>
                    )}
                    <Nav.Link
                      as={NavLink}
                      to="https://ultraaura.education/admin/login"
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      Admin
                    </Nav.Link>
                    <Nav.Link
                      onClick={handleTeamClick9A2}
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      Tutorial
                    </Nav.Link>
                    {showTeamSubmenu9A2 && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to="https://docs.google.com/document/d/14r0mNIGruj3Kcm-BdaQOUHQRhk0AaM_ABKDDTPV17tA/edit?tab=t.0"
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          UA - Docs
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="https://docs.google.com/document/d/1vIzNtR56pxjc79N9ID_lN-36fJ6TDWGXZmkUOsLdDIo/edit?tab=t.0#heading=h.m1e3b1xed0k9"
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Nova - Docs
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="https://www.youtube.com/@HyperVSolutions"
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Video
                        </Nav.Link>
                      </>
                    )}
                  </>
                )}
                <Nav.Link
                  as={NavLink}
                  onClick={handleTeamClick9B}
                  to=""
                  style={navLinkStyle("/")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  HomeCare
                </Nav.Link>
                {showTeamSubmenu9B && (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="https://novahome.care/"
                      style={navLinkStyle("/")}
                      className="ps-6 mr-2"
                    >
                      <FaUsers style={iconStyle} />
                      View
                    </Nav.Link>
                    <Nav.Link
                      onClick={handleTeamClick9B1}
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      CMS
                    </Nav.Link>
                    {showTeamSubmenu9B1 && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to=""
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Home
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="/admin/homecare/aboutus"
                          style={navLinkStyle("/admin/homecare/aboutus")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          About Us
                        </Nav.Link>
                      </>
                    )}
                    <Nav.Link
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      Admin
                    </Nav.Link>
                  </>
                )}
                <Nav.Link
                  as={NavLink}
                  onClick={handleTeamClick9C}
                  to=""
                  style={navLinkStyle("/")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  ParadigmShift
                </Nav.Link>
                {showTeamSubmenu9C && (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="https://paradigmshifts.life/"
                      style={navLinkStyle("/")}
                      className="ps-6 mr-2"
                    >
                      <FaUsers style={iconStyle} />
                      View
                    </Nav.Link>
                    <Nav.Link
                      onClick={handleTeamClick9C1}
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      CMS
                    </Nav.Link>
                    {showTeamSubmenu9C1 && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to=""
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Home
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="/admin/paradigmshift/aboutus"
                          style={navLinkStyle("/admin/paradigmshift/aboutus")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          About Us
                        </Nav.Link>
                      </>
                    )}
                    <Nav.Link
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      Admin
                    </Nav.Link>
                  </>
                )}
                {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
              <FaUsers style={iconStyle} /> Bulk Upload
            </Nav.Link> */}
                <Nav.Link
                  as={NavLink}
                  onClick={handleTeamClick9D}
                  to=""
                  style={navLinkStyle("/")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  Freevance
                </Nav.Link>
                {showTeamSubmenu9D && (
                  <>
                    <Nav.Link
                      onClick={handleTeamClick9D1}
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      CMS
                    </Nav.Link>
                    {showTeamSubmenu9D1 && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to=""
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Home
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="/admin/freevance/aboutus"
                          style={navLinkStyle("/admin/freevance/aboutus")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          About Us
                        </Nav.Link>
                      </>
                    )}
                  </>
                )}

                <Nav.Link
                  as={NavLink}
                  onClick={handleTeamClick9E}
                  to=""
                  style={navLinkStyle("/")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  Legitzone
                </Nav.Link>
                {showTeamSubmenu9E && (
                  <>
                    <Nav.Link
                      onClick={handleTeamClick9E1}
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      CMS
                    </Nav.Link>
                    {showTeamSubmenu9E1 && (
                      <>
                        <Nav.Link
                          as={NavLink}
                          to=""
                          style={navLinkStyle("/")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          Home
                        </Nav.Link>
                        <Nav.Link
                          as={NavLink}
                          to="/admin/legitzone/aboutus"
                          style={navLinkStyle("/admin/legitzone/aboutus")}
                          className="ps-7"
                        >
                          <FaUsers style={iconStyle} />
                          About Us
                        </Nav.Link>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div>
            <Nav.Link
              onClick={handleTeamClick10}
              as={NavLink}
              to=""
              style={navLinkStyle("/admin/apps")}
              className="ps-4"
            >
              <FaUserTie style={iconStyle} /> Server
            </Nav.Link>
            {showTeamSubmenu10 && (
              <>
                <Nav.Link
                  onClick={handleTeamClick10A}
                  as={NavLink}
                  to=""
                  style={navLinkStyle("")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  Hostinger
                </Nav.Link>
                {showTeamSubmenu10A && (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="https://auth.hostinger.com/login"
                      style={navLinkStyle("/")}
                      className="ps-6 mr-2"
                    >
                      <FaUsers style={iconStyle} />
                      Hostinger Login
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to=""
                      style={navLinkStyle("/")}
                      className="ps-6 mr-2"
                    >
                      <FaUsers style={iconStyle} />
                      Docs
                    </Nav.Link>
                  </>
                )}
                <Nav.Link
                  as={NavLink}
                  onClick={handleTeamClick10B}
                  to=""
                  style={navLinkStyle("/")}
                  className="ps-5"
                >
                  <FaUsers style={iconStyle} />
                  AWS
                </Nav.Link>
                {showTeamSubmenu10B && (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="https://signin.aws.amazon.com/signup?request_type=register"
                      style={navLinkStyle("/")}
                      className="ps-6"
                    >
                      <FaUsers style={iconStyle} />
                      AWS Login
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="https://docs.google.com/document/d/122uV91vvjYjTybxWaKXqWG6GP40oFAc6/edit"
                      style={navLinkStyle("/")}
                      className="ps-6 mr-2"
                    >
                      <FaUsers style={iconStyle} />
                      Docs
                    </Nav.Link>
                  </>
                )}

                {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
              <FaUsers style={iconStyle} /> Bulk Upload
            </Nav.Link> */}
              </>
            )}
          </div>
          <Nav.Link
            as={NavLink}
            to="/admin/resumelist"
            style={navLinkStyle("/admin/resumelist")}
            className="ps-4"
          >
            <FaFileAlt style={iconStyle} /> Resume List
          </Nav.Link>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
