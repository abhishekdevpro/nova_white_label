// // // import React, { useState, useEffect } from "react";
// // // import { Nav } from "react-bootstrap";
// // // import { NavLink, useLocation } from "react-router-dom";
// // // import {
// // //   FaTachometerAlt,
// // //   FaStore,
// // //   FaUsers,
// // //   FaUserTie,
// // //   FaBriefcase,
// // //   FaBell,
// // //   FaUserPlus,
// // //   FaTasks,
// // //   FaWallet,
// // //   FaUserGraduate,
// // //   FaFileAlt,
// // //   FaPaintBrush,
// // // } from "react-icons/fa";
// // // import "../css/profilesidebar.css";
// // // const Sidebar = () => {
// // //   const location = useLocation();
// // //   const [showTeamSubmenu, setShowTeamSubmenu] = useState(false);
// // //   const [showTeamSubmenu1, setShowTeamSubmenu1] = useState(false);
// // //   const [showTeamSubmenu2, setShowTeamSubmenu2] = useState(false);
// // //   const [showTeamSubmenu3, setShowTeamSubmenu3] = useState(false);
// // //   const [showTeamSubmenu4, setShowTeamSubmenu4] = useState(false);
// // //   const [showTeamSubmenu5, setShowTeamSubmenu5] = useState(false);
// // //   const [showTeamSubmenu6, setShowTeamSubmenu6] = useState(false);
// // //   const [showTeamSubmenu7, setShowTeamSubmenu7] = useState(false);
// // //   const [showTeamSubmenu8, setShowTeamSubmenu8] = useState(false);
// // //   const [showTeamSubmenu9, setShowTeamSubmenu9] = useState(false);
// // //   const [showTeamSubmenu9A, setShowTeamSubmenu9A] = useState(false);
// // //   const [showTeamSubmenu9A1, setShowTeamSubmenu9A1] = useState(false);
// // //   const [showTeamSubmenu9A2, setShowTeamSubmenu9A2] = useState(false);
// // //   const [showTeamSubmenu9B, setShowTeamSubmenu9B] = useState(false);
// // //   const [showTeamSubmenu9B1, setShowTeamSubmenu9B1] = useState(false);
// // //   const [showTeamSubmenu9C, setShowTeamSubmenu9C] = useState(false);
// // //   const [showTeamSubmenu9C1, setShowTeamSubmenu9C1] = useState(false);
// // //   const [showTeamSubmenu9D, setShowTeamSubmenu9D] = useState(false);
// // //   const [showTeamSubmenu9D1, setShowTeamSubmenu9D1] = useState(false);
// // //   const [showTeamSubmenu9E, setShowTeamSubmenu9E] = useState(false);
// // //   const [showTeamSubmenu9E1, setShowTeamSubmenu9E1] = useState(false);
// // //   const [showTeamSubmenu10, setShowTeamSubmenu10] = useState(false);
// // //   const [showTeamSubmenu10A, setShowTeamSubmenu10A] = useState(false);
// // //   const [showTeamSubmenu10B, setShowTeamSubmenu10B] = useState(false);
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const navLinkStyle = (path) => ({
// // //     display: "flex",
// // //     alignItems: "center",
// // //     backgroundColor: location.pathname === path ? "#1C2957" : "transparent",
// // //     color: location.pathname === path ? "white" : "black",
// // //     padding: "",
// // //     textDecoration: "none",
// // //   });

// // //   const iconStyle = {
// // //     marginRight: "10px",
// // //   };

// // //   useEffect(() => {
// // //     if (location.pathname.startsWith("/admin/vendor"))
// // //       setShowTeamSubmenu5(true);
// // //     if (location.pathname.startsWith("/admin/team")) setShowTeamSubmenu(true);
// // //     if (location.pathname.startsWith("/admin/jobs")) setShowTeamSubmenu3(true);
// // //     if (location.pathname.startsWith("/admin/notifications"))
// // //       setShowTeamSubmenu4(true);
// // //     if (location.pathname.startsWith("/admin/jobseekers"))
// // //       setShowTeamSubmenu1(true);
// // //     if (location.pathname.startsWith("/admin/employer"))
// // //       setShowTeamSubmenu2(true);
// // //     if (location.pathname.startsWith("/admin/wallet"))
// // //       setShowTeamSubmenu6(true);
// // //     if (location.pathname.startsWith("/admin/CompanyNameAdmin"))
// // //       setShowTeamSubmenu6(true);
// // //     if (location.pathname.startsWith("/admin/cms")) setShowTeamSubmenu8(true);
// // //     if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9(true);
// // //     if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9A(true);
// // //     if (location.pathname.startsWith("/admin/apps"))
// // //       setShowTeamSubmenu9A1(true);
// // //     if (location.pathname.startsWith("/admin/apps"))
// // //       setShowTeamSubmenu9A2(true);
// // //     if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9B(true);
// // //     if (location.pathname.startsWith("/admin/apps"))
// // //       setShowTeamSubmenu9B1(true);
// // //     if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9C(true);
// // //     if (location.pathname.startsWith("/admin/apps"))
// // //       setShowTeamSubmenu9C1(true);
// // //     if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9D(true);
// // //     if (location.pathname.startsWith("/admin/apps"))
// // //       setShowTeamSubmenu9D1(true);
// // //     if (location.pathname.startsWith("/admin/apps")) setShowTeamSubmenu9E(true);
// // //     if (location.pathname.startsWith("/admin/apps"))
// // //       setShowTeamSubmenu9E1(true);
// // //     if (location.pathname.startsWith("/admin/server"))
// // //       setShowTeamSubmenu10(true);
// // //     if (location.pathname.startsWith("/admin/server"))
// // //       setShowTeamSubmenu10A(true);
// // //     if (location.pathname.startsWith("/admin/server"))
// // //       setShowTeamSubmenu10B(true);
// // //   }, [location.pathname]);

// // //   const handleTeamClick = () => {
// // //     setShowTeamSubmenu(!showTeamSubmenu);
// // //   };
// // //   const handleTeamClick1 = () => {
// // //     setShowTeamSubmenu1(!showTeamSubmenu1);
// // //   };
// // //   const handleTeamClick2 = () => {
// // //     setShowTeamSubmenu2(!showTeamSubmenu2);
// // //   };
// // //   const handleTeamClick3 = () => {
// // //     setShowTeamSubmenu3(!showTeamSubmenu3);
// // //   };
// // //   const handleTeamClick4 = () => {
// // //     setShowTeamSubmenu4(!showTeamSubmenu4);
// // //   };
// // //   const handleTeamClick5 = () => {
// // //     setShowTeamSubmenu5(!showTeamSubmenu5);
// // //   };
// // //   const handleTeamClick6 = () => {
// // //     setShowTeamSubmenu6(!showTeamSubmenu6);
// // //   };
// // //   const handleTeamClick7 = () => {
// // //     setShowTeamSubmenu7(!showTeamSubmenu7);
// // //   };
// // //   const handleTeamClick8 = () => {
// // //     setShowTeamSubmenu8(!showTeamSubmenu8);
// // //   };
// // //   const handleTeamClick9 = () => {
// // //     setShowTeamSubmenu9(!showTeamSubmenu9);
// // //   };

// // //   const handleTeamClick9A = () => {
// // //     setShowTeamSubmenu9A(!showTeamSubmenu9A);
// // //   };
// // //   const handleTeamClick9A1 = () => {
// // //     setShowTeamSubmenu9A1(!showTeamSubmenu9A1);
// // //   };
// // //   const handleTeamClick9A2 = () => {
// // //     setShowTeamSubmenu9A2(!showTeamSubmenu9A2);
// // //   };
// // //   const handleTeamClick9B = () => {
// // //     setShowTeamSubmenu9B(!showTeamSubmenu9B);
// // //   };
// // //   const handleTeamClick9B1 = () => {
// // //     setShowTeamSubmenu9B1(!showTeamSubmenu9B1);
// // //   };
// // //   const handleTeamClick9C = () => {
// // //     setShowTeamSubmenu9C(!showTeamSubmenu9C);
// // //   };
// // //   const handleTeamClick9C1 = () => {
// // //     setShowTeamSubmenu9C1(!showTeamSubmenu9C1);
// // //   };
// // //   const handleTeamClick9D = () => {
// // //     setShowTeamSubmenu9D(!showTeamSubmenu9D);
// // //   };
// // //   const handleTeamClick9D1 = () => {
// // //     setShowTeamSubmenu9D1(!showTeamSubmenu9D1);
// // //   };
// // //   const handleTeamClick9E = () => {
// // //     setShowTeamSubmenu9E(!showTeamSubmenu9E);
// // //   };
// // //   const handleTeamClick9E1 = () => {
// // //     setShowTeamSubmenu9E1(!showTeamSubmenu9E1);
// // //   };
// // //   const handleTeamClick10 = () => {
// // //     setShowTeamSubmenu10(!showTeamSubmenu10);
// // //   };
// // //   const handleTeamClick10A = () => {
// // //     setShowTeamSubmenu10A(!showTeamSubmenu10A);
// // //   };
// // //   const handleTeamClick10B = () => {
// // //     setShowTeamSubmenu10B(!showTeamSubmenu10B);
// // //   };
// // //   const toggleSidebar = () => {
// // //     setSidebarOpen(!sidebarOpen);
// // //   };

// // //   return (
// // //     <>
// // //       <button className="sidebar-toggle" onClick={toggleSidebar}>
// // //         ☰
// // //       </button>
// // //       <div
// // //         className={`sidebar ${sidebarOpen ? "open" : ""}`}
// // //         style={{
// // //           position: "fixed",
// // //           top: 82,
// // //           left: -15,
// // //           height: "100vh",
// // //           overflowY: "auto",
// // //           zIndex: 1000,
// // //         }}
// // //       >
// // //         <Nav className="flex-column bg-light h-screen gap-3">
// // //           <Nav.Link
// // //             as={NavLink}
// // //             to="/admin/dashboard"
// // //             style={navLinkStyle("/admin/dashboard")}
// // //             className="ps-4"
// // //           >
// // //             <FaTachometerAlt style={iconStyle} /> Dashboard
// // //           </Nav.Link>

// // //           <div>
// // //             <Nav.Link
// // //               as={NavLink}
// // //               to="/admin/branding"
// // //               style={navLinkStyle("/admin/branding")}
// // //               className="ps-4"
// // //             >
// // //               <FaPaintBrush style={iconStyle} /> Branding
// // //             </Nav.Link>
// // //           </div>
// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick5}
// // //               as={NavLink}
// // //               to="/admin/vendor"
// // //               style={navLinkStyle("/admin/vendor")}
// // //               className="ps-4"
// // //             >
// // //               <FaStore style={iconStyle} /> Vendor
// // //             </Nav.Link>
// // //             {showTeamSubmenu5 && (
// // //               <>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/listvendor"
// // //                   style={navLinkStyle("/admin/listvendor")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaStore style={iconStyle} /> List Vendor
// // //                 </Nav.Link>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/addvendor"
// // //                   style={navLinkStyle("/admin/addvendor")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} /> Add Vendor
// // //                 </Nav.Link>
// // //               </>
// // //             )}
// // //           </div>

// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick3}
// // //               as={NavLink}
// // //               to="/admin/jobs"
// // //               style={navLinkStyle("/admin/jobs")}
// // //               className="ps-4"
// // //             >
// // //               <FaBriefcase style={iconStyle} /> Jobs
// // //             </Nav.Link>
// // //             {showTeamSubmenu3 && (
// // //               <>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/listalljobs"
// // //                   style={navLinkStyle("/admin/listalljobs")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} /> List All
// // //                 </Nav.Link>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/addjobs"
// // //                   style={navLinkStyle("/admin/addjobs")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaBriefcase style={iconStyle} /> Add Jobs
// // //                 </Nav.Link>
// // //                 {/* <Nav.Link as={NavLink} to="/admin/bulkUploadjobs" style={navLinkStyle("/admin/bulkUploadjobs")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> Bulk Upload
// // //             </Nav.Link> */}
// // //               </>
// // //             )}
// // //           </div>

// // //           {/* <div>
// // //         <Nav.Link
// // //           onClick={handleTeamClick4}
// // //           as={NavLink} to="/admin/notifications"
// // //           style={navLinkStyle("/admin/notifications")}
// // //           className='ps-4'
// // //         >
// // //           <FaBell style={iconStyle} /> Notifications
// // //         </Nav.Link>
// // //         {showTeamSubmenu4 && (
// // //           <>
// // //             <Nav.Link as={NavLink} to="/admin/team/listallnotificationss" style={navLinkStyle("/admin/team/listallnotificationss")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> List notifications
// // //             </Nav.Link>
// // //           </>
// // //         )}
// // //       </div> */}

// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick1}
// // //               as={NavLink}
// // //               to="/admin/jobseekers"
// // //               style={navLinkStyle("/admin/jobseekers")}
// // //               className="ps-4"
// // //             >
// // //               <FaUserGraduate style={iconStyle} /> JobSeekers
// // //             </Nav.Link>
// // //             {showTeamSubmenu1 && (
// // //               <>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/listalljobseeker"
// // //                   style={navLinkStyle("/admin/listalljobseeker")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} /> List All
// // //                 </Nav.Link>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/Addjobseeker"
// // //                   style={navLinkStyle("/admin/Addjobseeker")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUserGraduate style={iconStyle} /> Add Job Seeker
// // //                 </Nav.Link>
// // //                 {/*  <Nav.Link as={NavLink} to="/admin/bulkUpload" style={navLinkStyle("/admin/bulkUpload")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> Bulk Upload
// // //             </Nav.Link> */}
// // //               </>
// // //             )}
// // //           </div>

// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick2}
// // //               as={NavLink}
// // //               to="/admin/employer"
// // //               style={navLinkStyle("/admin/employer")}
// // //               className="ps-4"
// // //             >
// // //               <FaUserTie style={iconStyle} /> Employer
// // //             </Nav.Link>
// // //             {showTeamSubmenu2 && (
// // //               <>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/employeelist"
// // //                   style={navLinkStyle("/admin/employeelist")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} /> List All
// // //                 </Nav.Link>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/team/addemployers"
// // //                   style={navLinkStyle("/admin/team/addemployers")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} /> Add Employers
// // //                 </Nav.Link>
// // //                 {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> Bulk Upload
// // //             </Nav.Link> */}
// // //               </>
// // //             )}
// // //           </div>
// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick8}
// // //               as={NavLink}
// // //               to=""
// // //               style={navLinkStyle("/admin/cms")}
// // //               className="ps-4"
// // //             >
// // //               <FaUserTie style={iconStyle} /> CMS
// // //             </Nav.Link>
// // //             {showTeamSubmenu8 && (
// // //               <>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to=""
// // //                   style={navLinkStyle("")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} /> Home
// // //                 </Nav.Link>
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   to="/admin/aboutus"
// // //                   style={navLinkStyle("/admin/aboutus")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   About Us
// // //                 </Nav.Link>
// // //                 {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> Bulk Upload
// // //             </Nav.Link> */}
// // //               </>
// // //             )}
// // //           </div>

// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick9}
// // //               as={NavLink}
// // //               to=""
// // //               style={navLinkStyle("/admin/apps")}
// // //               className="ps-4"
// // //             >
// // //               <FaUserTie style={iconStyle} /> Apps
// // //             </Nav.Link>
// // //             {showTeamSubmenu9 && (
// // //               <>
// // //                 <Nav.Link
// // //                   onClick={handleTeamClick9A}
// // //                   as={NavLink}
// // //                   to=""
// // //                   style={navLinkStyle("")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   UltraAura
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu9A && (
// // //                   <>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://ultraaura.education/"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6 mr-2"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       View
// // //                     </Nav.Link>
// // //                     <Nav.Link
// // //                       onClick={handleTeamClick9A1}
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       CMS
// // //                     </Nav.Link>
// // //                     {showTeamSubmenu9A1 && (
// // //                       <>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to=""
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Home
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to=""
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           About Us
// // //                         </Nav.Link>
// // //                       </>
// // //                     )}
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://ultraaura.education/admin/login"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Admin
// // //                     </Nav.Link>
// // //                     <Nav.Link
// // //                       onClick={handleTeamClick9A2}
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Tutorial
// // //                     </Nav.Link>
// // //                     {showTeamSubmenu9A2 && (
// // //                       <>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="https://docs.google.com/document/d/14r0mNIGruj3Kcm-BdaQOUHQRhk0AaM_ABKDDTPV17tA/edit?tab=t.0"
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           UA - Docs
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="https://docs.google.com/document/d/1vIzNtR56pxjc79N9ID_lN-36fJ6TDWGXZmkUOsLdDIo/edit?tab=t.0#heading=h.m1e3b1xed0k9"
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Nova - Docs
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="https://www.youtube.com/@HyperVSolutions"
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Video
// // //                         </Nav.Link>
// // //                       </>
// // //                     )}
// // //                   </>
// // //                 )}
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   onClick={handleTeamClick9B}
// // //                   to=""
// // //                   style={navLinkStyle("/")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   HomeCare
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu9B && (
// // //                   <>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://novahome.care/"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6 mr-2"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       View
// // //                     </Nav.Link>
// // //                     <Nav.Link
// // //                       onClick={handleTeamClick9B1}
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       CMS
// // //                     </Nav.Link>
// // //                     {showTeamSubmenu9B1 && (
// // //                       <>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to=""
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Home
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="/admin/homecare/aboutus"
// // //                           style={navLinkStyle("/admin/homecare/aboutus")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           About Us
// // //                         </Nav.Link>
// // //                       </>
// // //                     )}
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Admin
// // //                     </Nav.Link>
// // //                   </>
// // //                 )}
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   onClick={handleTeamClick9C}
// // //                   to=""
// // //                   style={navLinkStyle("/")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   ParadigmShift
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu9C && (
// // //                   <>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://paradigmshifts.life/"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6 mr-2"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       View
// // //                     </Nav.Link>
// // //                     <Nav.Link
// // //                       onClick={handleTeamClick9C1}
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       CMS
// // //                     </Nav.Link>
// // //                     {showTeamSubmenu9C1 && (
// // //                       <>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to=""
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Home
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="/admin/paradigmshift/aboutus"
// // //                           style={navLinkStyle("/admin/paradigmshift/aboutus")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           About Us
// // //                         </Nav.Link>
// // //                       </>
// // //                     )}
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Admin
// // //                     </Nav.Link>
// // //                   </>
// // //                 )}
// // //                 {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> Bulk Upload
// // //             </Nav.Link> */}
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   onClick={handleTeamClick9D}
// // //                   to=""
// // //                   style={navLinkStyle("/")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   Freevance
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu9D && (
// // //                   <>
// // //                     <Nav.Link
// // //                       onClick={handleTeamClick9D1}
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       CMS
// // //                     </Nav.Link>
// // //                     {showTeamSubmenu9D1 && (
// // //                       <>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to=""
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Home
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="/admin/freevance/aboutus"
// // //                           style={navLinkStyle("/admin/freevance/aboutus")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           About Us
// // //                         </Nav.Link>
// // //                       </>
// // //                     )}
// // //                   </>
// // //                 )}

// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   onClick={handleTeamClick9E}
// // //                   to=""
// // //                   style={navLinkStyle("/")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   Legitzone
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu9E && (
// // //                   <>
// // //                     <Nav.Link
// // //                       onClick={handleTeamClick9E1}
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       CMS
// // //                     </Nav.Link>
// // //                     {showTeamSubmenu9E1 && (
// // //                       <>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to=""
// // //                           style={navLinkStyle("/")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           Home
// // //                         </Nav.Link>
// // //                         <Nav.Link
// // //                           as={NavLink}
// // //                           to="/admin/legitzone/aboutus"
// // //                           style={navLinkStyle("/admin/legitzone/aboutus")}
// // //                           className="ps-7"
// // //                         >
// // //                           <FaUsers style={iconStyle} />
// // //                           About Us
// // //                         </Nav.Link>
// // //                       </>
// // //                     )}
// // //                   </>
// // //                 )}
// // //               </>
// // //             )}
// // //           </div>
// // //           <div>
// // //             <Nav.Link
// // //               onClick={handleTeamClick10}
// // //               as={NavLink}
// // //               to=""
// // //               style={navLinkStyle("/admin/apps")}
// // //               className="ps-4"
// // //             >
// // //               <FaUserTie style={iconStyle} /> Server
// // //             </Nav.Link>
// // //             {showTeamSubmenu10 && (
// // //               <>
// // //                 <Nav.Link
// // //                   onClick={handleTeamClick10A}
// // //                   as={NavLink}
// // //                   to=""
// // //                   style={navLinkStyle("")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   Hostinger
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu10A && (
// // //                   <>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://auth.hostinger.com/login"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6 mr-2"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Hostinger Login
// // //                     </Nav.Link>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to=""
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6 mr-2"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Docs
// // //                     </Nav.Link>
// // //                   </>
// // //                 )}
// // //                 <Nav.Link
// // //                   as={NavLink}
// // //                   onClick={handleTeamClick10B}
// // //                   to=""
// // //                   style={navLinkStyle("/")}
// // //                   className="ps-5"
// // //                 >
// // //                   <FaUsers style={iconStyle} />
// // //                   AWS
// // //                 </Nav.Link>
// // //                 {showTeamSubmenu10B && (
// // //                   <>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://signin.aws.amazon.com/signup?request_type=register"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       AWS Login
// // //                     </Nav.Link>
// // //                     <Nav.Link
// // //                       as={NavLink}
// // //                       to="https://docs.google.com/document/d/122uV91vvjYjTybxWaKXqWG6GP40oFAc6/edit"
// // //                       style={navLinkStyle("/")}
// // //                       className="ps-6 mr-2"
// // //                     >
// // //                       <FaUsers style={iconStyle} />
// // //                       Docs
// // //                     </Nav.Link>
// // //                   </>
// // //                 )}

// // //                 {/*<Nav.Link as={NavLink} to="/admin/team/bulkUploademployers" style={navLinkStyle("/admin/team/bulkUploademployers")} className='ps-5'>
// // //               <FaUsers style={iconStyle} /> Bulk Upload
// // //             </Nav.Link> */}
// // //               </>
// // //             )}
// // //           </div>
// // //           <Nav.Link
// // //             as={NavLink}
// // //             to="/admin/resumelist"
// // //             style={navLinkStyle("/admin/resumelist")}
// // //             className="ps-4"
// // //           >
// // //             <FaFileAlt style={iconStyle} /> Resume List
// // //           </Nav.Link>
// // //         </Nav>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Sidebar;

// // // import React, { useState, useEffect } from "react";
// // // import { Link, useLocation } from "react-router-dom";
// // // import { X } from "lucide-react";
// // // import "../css/profilesidebar.css";

// // // const AdminSidebar = () => {
// // //   const location = useLocation();
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);

// // //   // Submenu states
// // //   const [showTeamSubmenu, setShowTeamSubmenu] = useState(false);
// // //   const [showTeamSubmenu1, setShowTeamSubmenu1] = useState(false);
// // //   const [showTeamSubmenu2, setShowTeamSubmenu2] = useState(false);
// // //   const [showTeamSubmenu3, setShowTeamSubmenu3] = useState(false);
// // //   const [showTeamSubmenu4, setShowTeamSubmenu4] = useState(false);
// // //   const [showTeamSubmenu5, setShowTeamSubmenu5] = useState(false);
// // //   const [showTeamSubmenu6, setShowTeamSubmenu6] = useState(false);
// // //   const [showTeamSubmenu7, setShowTeamSubmenu7] = useState(false);
// // //   const [showTeamSubmenu8, setShowTeamSubmenu8] = useState(false);
// // //   const [showTeamSubmenu9, setShowTeamSubmenu9] = useState(false);
// // //   const [showTeamSubmenu9A, setShowTeamSubmenu9A] = useState(false);
// // //   const [showTeamSubmenu9A1, setShowTeamSubmenu9A1] = useState(false);
// // //   const [showTeamSubmenu9A2, setShowTeamSubmenu9A2] = useState(false);
// // //   const [showTeamSubmenu9B, setShowTeamSubmenu9B] = useState(false);
// // //   const [showTeamSubmenu9B1, setShowTeamSubmenu9B1] = useState(false);
// // //   const [showTeamSubmenu9C, setShowTeamSubmenu9C] = useState(false);
// // //   const [showTeamSubmenu9C1, setShowTeamSubmenu9C1] = useState(false);
// // //   const [showTeamSubmenu9D, setShowTeamSubmenu9D] = useState(false);
// // //   const [showTeamSubmenu9D1, setShowTeamSubmenu9D1] = useState(false);
// // //   const [showTeamSubmenu9E, setShowTeamSubmenu9E] = useState(false);
// // //   const [showTeamSubmenu9E1, setShowTeamSubmenu9E1] = useState(false);
// // //   const [showTeamSubmenu10, setShowTeamSubmenu10] = useState(false);
// // //   const [showTeamSubmenu10A, setShowTeamSubmenu10A] = useState(false);
// // //   const [showTeamSubmenu10B, setShowTeamSubmenu10B] = useState(false);

// // //   useEffect(() => {
// // //     if (location.pathname.startsWith("/admin/vendor"))
// // //       setShowTeamSubmenu5(true);
// // //     if (location.pathname.startsWith("/admin/team")) setShowTeamSubmenu(true);
// // //     if (location.pathname.startsWith("/admin/jobs")) setShowTeamSubmenu3(true);
// // //     if (location.pathname.startsWith("/admin/notifications"))
// // //       setShowTeamSubmenu4(true);
// // //     if (location.pathname.startsWith("/admin/jobseekers"))
// // //       setShowTeamSubmenu1(true);
// // //     if (location.pathname.startsWith("/admin/employer"))
// // //       setShowTeamSubmenu2(true);
// // //     if (location.pathname.startsWith("/admin/wallet"))
// // //       setShowTeamSubmenu6(true);
// // //     if (location.pathname.startsWith("/admin/CompanyNameAdmin"))
// // //       setShowTeamSubmenu6(true);
// // //     if (location.pathname.startsWith("/admin/cms")) setShowTeamSubmenu8(true);
// // //     if (location.pathname.startsWith("/admin/apps")) {
// // //       setShowTeamSubmenu9(true);
// // //       setShowTeamSubmenu9A(true);
// // //       setShowTeamSubmenu9A1(true);
// // //       setShowTeamSubmenu9A2(true);
// // //       setShowTeamSubmenu9B(true);
// // //       setShowTeamSubmenu9B1(true);
// // //       setShowTeamSubmenu9C(true);
// // //       setShowTeamSubmenu9C1(true);
// // //       setShowTeamSubmenu9D(true);
// // //       setShowTeamSubmenu9D1(true);
// // //       setShowTeamSubmenu9E(true);
// // //       setShowTeamSubmenu9E1(true);
// // //     }
// // //     if (location.pathname.startsWith("/admin/server")) {
// // //       setShowTeamSubmenu10(true);
// // //       setShowTeamSubmenu10A(true);
// // //       setShowTeamSubmenu10B(true);
// // //     }
// // //   }, [location.pathname]);

// // //   const toggleSidebar = () => {
// // //     setSidebarOpen(!sidebarOpen);
// // //   };

// // //   const isActive = (path) => location.pathname === path;

// // //   return (
// // //     <>
// // //       <button className="sidebar-toggle" onClick={toggleSidebar}>
// // //         ☰
// // //       </button>
// // //       <div className={`sidebar-2 ${sidebarOpen ? "open" : ""}`}>
// // //         <div
// // //           className=""
// // //           style={{
// // //             height: "100%",
// // //             overflowY: "auto",
// // //             overflowX: "hidden",
// // //             paddingRight: "10px",
// // //             scrollBehavior: "smooth",
// // //             scrollbarWidth: "none",
// // //           }}
// // //         >
// // //           <div className="sticky-top">
// // //             <div className="d-flex justify-content-start d-lg-none p-3 m-b30">
// // //               <X onClick={toggleSidebar} style={{ cursor: "pointer" }} />
// // //             </div>

// // //             <div className="candidate-info company-info">
// // //               {/* <div className="candidate-detail text-center">
// // //                 <div className="canditate-des">
// // //                   <div className="admin-logo-placeholder">
// // //                     <i className="fa fa-user-shield fa-3x text-primary"></i>
// // //                   </div>
// // //                 </div>
// // //               </div> */}
// // //               <div className="candidate-title text-center candidate-detail">
// // //                 <h4 className="m-b5">
// // //                   <Link to={"#"}>Admin Panel</Link>
// // //                 </h4>
// // //               </div>

// // //               <ul>
// // //                 <li>
// // //                   <Link
// // //                     to="/admin/dashboard"
// // //                     className={isActive("/admin/dashboard") ? "active" : ""}
// // //                   >
// // //                     <i className="fa fa-tachometer-alt" aria-hidden="true"></i>
// // //                     <span>Dashboard</span>
// // //                   </Link>
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="/admin/branding"
// // //                     className={isActive("/admin/branding") ? "active" : ""}
// // //                   >
// // //                     <i className="fa fa-paint-brush" aria-hidden="true"></i>
// // //                     <span>Branding</span>
// // //                   </Link>
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu5(!showTeamSubmenu5)}
// // //                   >
// // //                     <i className="fa fa-store" aria-hidden="true"></i>
// // //                     <span>Vendor</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu5 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu5 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/listvendor"
// // //                           className={
// // //                             isActive("/admin/listvendor") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-list" aria-hidden="true"></i>
// // //                           <span>List Vendor</span>
// // //                         </Link>
// // //                       </li>
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/addvendor"
// // //                           className={
// // //                             isActive("/admin/addvendor") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-plus" aria-hidden="true"></i>
// // //                           <span>Add Vendor</span>
// // //                         </Link>
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu3(!showTeamSubmenu3)}
// // //                   >
// // //                     <i className="fa fa-briefcase" aria-hidden="true"></i>
// // //                     <span>Jobs</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu3 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu3 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/listalljobs"
// // //                           className={
// // //                             isActive("/admin/listalljobs") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-list" aria-hidden="true"></i>
// // //                           <span>List All</span>
// // //                         </Link>
// // //                       </li>
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/addjob"
// // //                           className={isActive("/admin/addjob") ? "active" : ""}
// // //                         >
// // //                           <i className="fa fa-plus" aria-hidden="true"></i>
// // //                           <span>Add Jobs</span>
// // //                         </Link>
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu1(!showTeamSubmenu1)}
// // //                   >
// // //                     <i className="fa fa-user-graduate" aria-hidden="true"></i>
// // //                     <span>JobSeekers</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu1 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu1 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/listalljobseeker"
// // //                           className={
// // //                             isActive("/admin/listalljobseeker") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-list" aria-hidden="true"></i>
// // //                           <span>List All</span>
// // //                         </Link>
// // //                       </li>
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/Addjobseeker"
// // //                           className={
// // //                             isActive("/admin/Addjobseeker") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-plus" aria-hidden="true"></i>
// // //                           <span>Add Job Seeker</span>
// // //                         </Link>
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu2(!showTeamSubmenu2)}
// // //                   >
// // //                     <i className="fa fa-user-tie" aria-hidden="true"></i>
// // //                     <span>Employer</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu2 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu2 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/employeelist"
// // //                           className={
// // //                             isActive("/admin/employeelist") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-list" aria-hidden="true"></i>
// // //                           <span>List All</span>
// // //                         </Link>
// // //                       </li>
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/team/addemployers"
// // //                           className={
// // //                             isActive("/admin/team/addemployers") ? "active" : ""
// // //                           }
// // //                         >
// // //                           <i className="fa fa-plus" aria-hidden="true"></i>
// // //                           <span>Add Employers</span>
// // //                         </Link>
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu8(!showTeamSubmenu8)}
// // //                   >
// // //                     <i className="fa fa-file-alt" aria-hidden="true"></i>
// // //                     <span>CMS</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu8 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu8 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link to="" className="">
// // //                           <i className="fa fa-home" aria-hidden="true"></i>
// // //                           <span>Home</span>
// // //                         </Link>
// // //                       </li>
// // //                       <li>
// // //                         <Link
// // //                           to="/admin/aboutus"
// // //                           className={isActive("/admin/aboutus") ? "active" : ""}
// // //                         >
// // //                           <i
// // //                             className="fa fa-info-circle"
// // //                             aria-hidden="true"
// // //                           ></i>
// // //                           <span>About Us</span>
// // //                         </Link>
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu9(!showTeamSubmenu9)}
// // //                   >
// // //                     <i className="fa fa-mobile-alt" aria-hidden="true"></i>
// // //                     <span>Apps</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu9 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu9 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu9A(!showTeamSubmenu9A)
// // //                           }
// // //                         >
// // //                           <i
// // //                             className="fa fa-graduation-cap"
// // //                             aria-hidden="true"
// // //                           ></i>
// // //                           <span>UltraAura</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu9A ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu9A && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <a
// // //                                 href="https://ultraaura.education/"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-external-link-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>View</span>
// // //                               </a>
// // //                             </li>
// // //                             <li>
// // //                               <Link
// // //                                 to="#"
// // //                                 onClick={() =>
// // //                                   setShowTeamSubmenu9A1(!showTeamSubmenu9A1)
// // //                                 }
// // //                               >
// // //                                 <i className="fa fa-cog" aria-hidden="true"></i>
// // //                                 <span>CMS</span>
// // //                                 <i
// // //                                   className={`fa fa-chevron-${
// // //                                     showTeamSubmenu9A1 ? "up" : "down"
// // //                                   } float-right`}
// // //                                 ></i>
// // //                               </Link>
// // //                               {showTeamSubmenu9A1 && (
// // //                                 <ul className="sub-menu">
// // //                                   <li>
// // //                                     <Link to="">
// // //                                       <i
// // //                                         className="fa fa-home"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Home</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                   <li>
// // //                                     <Link to="">
// // //                                       <i
// // //                                         className="fa fa-info-circle"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>About Us</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                 </ul>
// // //                               )}
// // //                             </li>
// // //                             <li>
// // //                               <a
// // //                                 href="https://ultraaura.education/admin/login"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-user-shield"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Admin</span>
// // //                               </a>
// // //                             </li>
// // //                             <li>
// // //                               <Link
// // //                                 to="#"
// // //                                 onClick={() =>
// // //                                   setShowTeamSubmenu9A2(!showTeamSubmenu9A2)
// // //                                 }
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-book"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Tutorial</span>
// // //                                 <i
// // //                                   className={`fa fa-chevron-${
// // //                                     showTeamSubmenu9A2 ? "up" : "down"
// // //                                   } float-right`}
// // //                                 ></i>
// // //                               </Link>
// // //                               {showTeamSubmenu9A2 && (
// // //                                 <ul className="sub-menu">
// // //                                   <li>
// // //                                     <a
// // //                                       href="https://docs.google.com/document/d/14r0mNIGruj3Kcm-BdaQOUHQRhk0AaM_ABKDDTPV17tA/edit?tab=t.0"
// // //                                       target="_blank"
// // //                                       rel="noopener noreferrer"
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-file-alt"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>UA - Docs</span>
// // //                                     </a>
// // //                                   </li>
// // //                                   <li>
// // //                                     <a
// // //                                       href="https://docs.google.com/document/d/1vIzNtR56pxjc79N9ID_lN-36fJ6TDWGXZmkUOsLdDIo/edit?tab=t.0#heading=h.m1e3b1xed0k9"
// // //                                       target="_blank"
// // //                                       rel="noopener noreferrer"
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-file-alt"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Nova - Docs</span>
// // //                                     </a>
// // //                                   </li>
// // //                                   <li>
// // //                                     <a
// // //                                       href="https://www.youtube.com/@HyperVSolutions"
// // //                                       target="_blank"
// // //                                       rel="noopener noreferrer"
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-video"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Video</span>
// // //                                     </a>
// // //                                   </li>
// // //                                 </ul>
// // //                               )}
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>

// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu9B(!showTeamSubmenu9B)
// // //                           }
// // //                         >
// // //                           <i className="fa fa-home" aria-hidden="true"></i>
// // //                           <span>HomeCare</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu9B ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu9B && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <a
// // //                                 href="https://novahome.care/"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-external-link-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>View</span>
// // //                               </a>
// // //                             </li>
// // //                             <li>
// // //                               <Link
// // //                                 to="#"
// // //                                 onClick={() =>
// // //                                   setShowTeamSubmenu9B1(!showTeamSubmenu9B1)
// // //                                 }
// // //                               >
// // //                                 <i className="fa fa-cog" aria-hidden="true"></i>
// // //                                 <span>CMS</span>
// // //                                 <i
// // //                                   className={`fa fa-chevron-${
// // //                                     showTeamSubmenu9B1 ? "up" : "down"
// // //                                   } float-right`}
// // //                                 ></i>
// // //                               </Link>
// // //                               {showTeamSubmenu9B1 && (
// // //                                 <ul className="sub-menu">
// // //                                   <li>
// // //                                     <Link to="">
// // //                                       <i
// // //                                         className="fa fa-home"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Home</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                   <li>
// // //                                     <Link
// // //                                       to="/admin/homecare/aboutus"
// // //                                       className={
// // //                                         isActive("/admin/homecare/aboutus")
// // //                                           ? "active"
// // //                                           : ""
// // //                                       }
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-info-circle"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>About Us</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                 </ul>
// // //                               )}
// // //                             </li>
// // //                             <li>
// // //                               <Link to="">
// // //                                 <i
// // //                                   className="fa fa-user-shield"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Admin</span>
// // //                               </Link>
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>

// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu9C(!showTeamSubmenu9C)
// // //                           }
// // //                         >
// // //                           <i className="fa fa-lightbulb" aria-hidden="true"></i>
// // //                           <span>ParadigmShift</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu9C ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu9C && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <a
// // //                                 href="https://paradigmshifts.life/"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-external-link-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>View</span>
// // //                               </a>
// // //                             </li>
// // //                             <li>
// // //                               <Link
// // //                                 to="#"
// // //                                 onClick={() =>
// // //                                   setShowTeamSubmenu9C1(!showTeamSubmenu9C1)
// // //                                 }
// // //                               >
// // //                                 <i className="fa fa-cog" aria-hidden="true"></i>
// // //                                 <span>CMS</span>
// // //                                 <i
// // //                                   className={`fa fa-chevron-${
// // //                                     showTeamSubmenu9C1 ? "up" : "down"
// // //                                   } float-right`}
// // //                                 ></i>
// // //                               </Link>
// // //                               {showTeamSubmenu9C1 && (
// // //                                 <ul className="sub-menu">
// // //                                   <li>
// // //                                     <Link to="">
// // //                                       <i
// // //                                         className="fa fa-home"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Home</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                   <li>
// // //                                     <Link
// // //                                       to="/admin/paradigmshift/aboutus"
// // //                                       className={
// // //                                         isActive("/admin/paradigmshift/aboutus")
// // //                                           ? "active"
// // //                                           : ""
// // //                                       }
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-info-circle"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>About Us</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                 </ul>
// // //                               )}
// // //                             </li>
// // //                             <li>
// // //                               <Link to="">
// // //                                 <i
// // //                                   className="fa fa-user-shield"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Admin</span>
// // //                               </Link>
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>

// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu9D(!showTeamSubmenu9D)
// // //                           }
// // //                         >
// // //                           <i className="fa fa-handshake" aria-hidden="true"></i>
// // //                           <span>Freevance</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu9D ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu9D && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <Link
// // //                                 to="#"
// // //                                 onClick={() =>
// // //                                   setShowTeamSubmenu9D1(!showTeamSubmenu9D1)
// // //                                 }
// // //                               >
// // //                                 <i className="fa fa-cog" aria-hidden="true"></i>
// // //                                 <span>CMS</span>
// // //                                 <i
// // //                                   className={`fa fa-chevron-${
// // //                                     showTeamSubmenu9D1 ? "up" : "down"
// // //                                   } float-right`}
// // //                                 ></i>
// // //                               </Link>
// // //                               {showTeamSubmenu9D1 && (
// // //                                 <ul className="sub-menu">
// // //                                   <li>
// // //                                     <Link to="">
// // //                                       <i
// // //                                         className="fa fa-home"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Home</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                   <li>
// // //                                     <Link
// // //                                       to="/admin/freevance/aboutus"
// // //                                       className={
// // //                                         isActive("/admin/freevance/aboutus")
// // //                                           ? "active"
// // //                                           : ""
// // //                                       }
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-info-circle"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>About Us</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                 </ul>
// // //                               )}
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>

// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu9E(!showTeamSubmenu9E)
// // //                           }
// // //                         >
// // //                           <i
// // //                             className="fa fa-shield-alt"
// // //                             aria-hidden="true"
// // //                           ></i>
// // //                           <span>Legitzone</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu9E ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu9E && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <Link
// // //                                 to="#"
// // //                                 onClick={() =>
// // //                                   setShowTeamSubmenu9E1(!showTeamSubmenu9E1)
// // //                                 }
// // //                               >
// // //                                 <i className="fa fa-cog" aria-hidden="true"></i>
// // //                                 <span>CMS</span>
// // //                                 <i
// // //                                   className={`fa fa-chevron-${
// // //                                     showTeamSubmenu9E1 ? "up" : "down"
// // //                                   } float-right`}
// // //                                 ></i>
// // //                               </Link>
// // //                               {showTeamSubmenu9E1 && (
// // //                                 <ul className="sub-menu">
// // //                                   <li>
// // //                                     <Link to="">
// // //                                       <i
// // //                                         className="fa fa-home"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>Home</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                   <li>
// // //                                     <Link
// // //                                       to="/admin/legitzone/aboutus"
// // //                                       className={
// // //                                         isActive("/admin/legitzone/aboutus")
// // //                                           ? "active"
// // //                                           : ""
// // //                                       }
// // //                                     >
// // //                                       <i
// // //                                         className="fa fa-info-circle"
// // //                                         aria-hidden="true"
// // //                                       ></i>
// // //                                       <span>About Us</span>
// // //                                     </Link>
// // //                                   </li>
// // //                                 </ul>
// // //                               )}
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="#"
// // //                     onClick={() => setShowTeamSubmenu10(!showTeamSubmenu10)}
// // //                   >
// // //                     <i className="fa fa-server" aria-hidden="true"></i>
// // //                     <span>Server</span>
// // //                     <i
// // //                       className={`fa fa-chevron-${
// // //                         showTeamSubmenu10 ? "up" : "down"
// // //                       } float-right`}
// // //                     ></i>
// // //                   </Link>
// // //                   {showTeamSubmenu10 && (
// // //                     <ul className="sub-menu">
// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu10A(!showTeamSubmenu10A)
// // //                           }
// // //                         >
// // //                           <i className="fa fa-cloud" aria-hidden="true"></i>
// // //                           <span>Hostinger</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu10A ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu10A && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <a
// // //                                 href="https://auth.hostinger.com/login"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-sign-in-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Hostinger Login</span>
// // //                               </a>
// // //                             </li>
// // //                             <li>
// // //                               <Link to="">
// // //                                 <i
// // //                                   className="fa fa-file-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Docs</span>
// // //                               </Link>
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>
// // //                       <li>
// // //                         <Link
// // //                           to="#"
// // //                           onClick={() =>
// // //                             setShowTeamSubmenu10B(!showTeamSubmenu10B)
// // //                           }
// // //                         >
// // //                           <i className="fa fa-aws" aria-hidden="true"></i>
// // //                           <span>AWS</span>
// // //                           <i
// // //                             className={`fa fa-chevron-${
// // //                               showTeamSubmenu10B ? "up" : "down"
// // //                             } float-right`}
// // //                           ></i>
// // //                         </Link>
// // //                         {showTeamSubmenu10B && (
// // //                           <ul className="sub-menu">
// // //                             <li>
// // //                               <a
// // //                                 href="https://signin.aws.amazon.com/signup?request_type=register"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-sign-in-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>AWS Login</span>
// // //                               </a>
// // //                             </li>
// // //                             <li>
// // //                               <a
// // //                                 href="https://docs.google.com/document/d/122uV91vvjYjTybxWaKXqWG6GP40oFAc6/edit"
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                               >
// // //                                 <i
// // //                                   className="fa fa-file-alt"
// // //                                   aria-hidden="true"
// // //                                 ></i>
// // //                                 <span>Docs</span>
// // //                               </a>
// // //                             </li>
// // //                           </ul>
// // //                         )}
// // //                       </li>
// // //                     </ul>
// // //                   )}
// // //                 </li>

// // //                 <li>
// // //                   <Link
// // //                     to="/admin/resumelist"
// // //                     className={isActive("/admin/resumelist") ? "active" : ""}
// // //                   >
// // //                     <i className="fa fa-file-alt" aria-hidden="true"></i>
// // //                     <span>Resume List</span>
// // //                   </Link>
// // //                 </li>
// // //               </ul>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default AdminSidebar;


// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import {
// //   LayoutDashboard,
// //   Paintbrush,
// //   TicketPercent,
// //   Store,
// //   Briefcase,
// //   GraduationCap,
// //   // UserTie,
// //   FileText,
// //   Home,
// //   Info,
// //   List,
// //   Plus,
// //   X,
// //   User,
// // } from "lucide-react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "../css/profilesidebar.css"; // keep if you already have base styling

// // const menuConfig = [
// //   {
// //     title: "Dashboard",
// //     icon: LayoutDashboard,
// //     path: "/admin/dashboard",
// //   },
// //   {
// //     title: "Branding",
// //     icon: Paintbrush,
// //     path: "/admin/branding",
// //   },

// //   {
// //     title: "Coupons",
// //     icon: TicketPercent,
// //     children: [
// //       { title: "Coupon List", icon: List, path: "/admin/coupon-list" },
// //       { title: "Add Coupon", icon: Plus, path: "/admin/add-coupon" },
// //     ],
// //   },
// //   {
// //     title: "Vendor",
// //     icon: Store,
// //     children: [
// //       { title: "List Vendor", icon: List, path: "/admin/listvendor" },
// //       { title: "Add Vendor", icon: Plus, path: "/admin/addvendor" },
// //     ],
// //   },
// //   {
// //     title: "Jobs",
// //     icon: Briefcase,
// //     children: [
// //       { title: "List All", icon: List, path: "/admin/listalljobs" },
// //       { title: "Add Jobs", icon: Plus, path: "/admin/addjob" },
// //     ],
// //   },
// //   {
// //     title: "JobSeekers",
// //     icon: GraduationCap,
// //     children: [
// //       { title: "List All", icon: List, path: "/admin/listalljobseeker" },
// //       { title: "Add Job Seeker", icon: Plus, path: "/admin/Addjobseeker" },
// //     ],
// //   },
// //   {
// //     title: "Employer",
// //     icon: User,
// //     children: [
// //       { title: "List All", icon: List, path: "/admin/employeelist" },
// //       { title: "Add Employers", icon: Plus, path: "/admin/team/addemployers" },
// //     ],
// //   },
// //   {
// //     title: "CMS",
// //     icon: FileText,
// //     children: [
// //       { title: "Home", icon: Home, path: "/admin/cms/home" },
// //       { title: "About Us", icon: Info, path: "/admin/aboutus" },
// //     ],
// //   },
// //   {
// //     title: "Resume List",
// //     icon: FileText,
// //     path: "/admin/resumelist",
// //   },
// // ];

// // const AdminSidebar = () => {
// //   const location = useLocation();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [openMenus, setOpenMenus] = useState({}); // track submenu open/close

// //   // expand parent menu if child is active
// //   useEffect(() => {
// //     menuConfig.forEach((item) => {
// //       if (item.children?.some((child) => location.pathname.startsWith(child.path))) {
// //         setOpenMenus((prev) => ({ ...prev, [item.title]: true }));
// //       }
// //     });
// //   }, [location.pathname]);

// //   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// //   const toggleMenu = (menuTitle) => {
// //     setOpenMenus((prev) => ({ ...prev, [menuTitle]: !prev[menuTitle] }));
// //   };

// //   const isActive = (path) => location.pathname === path;

// //   const renderMenu = (item) => {
// //     if (item.children) {
// //       return (
// //         <li key={item.title}>
// //           <div
// //             className="d-flex w-100 align-items-center justify-content-between fw-semibold text-start px-3 py-2"
// //             onClick={() => toggleMenu(item.title)}
// //           >
// //             <span>
// //               <item.icon className="w-5 h-5 me-2" />
// //               {item.title}
// //             </span>
// //             <i
// //               className={`fa fa-chevron-${openMenus[item.title] ? "up" : "down"}`}
// //             ></i>
// //           </div>
// //           {openMenus[item.title] && (
// //             <ul className="list-unstyled ms-4">
// //               {item.children.map((child) => (
// //                 <li key={child.title}>
// //                   <Link
// //                     to={child.path}
// //                     className={`d-flex align-items-center px-3 py-2 ${
// //                       isActive(child.path) ? "active fw-medium text-primary " : "text-black fw-medium"
// //                     }`}
// //                   >
// //                      <item.icon className="w-5 h-5 me-2" />
// //                     {child.title}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           )}
// //         </li>
// //       );
// //     }

// //     return (
// //       <li key={item.title}>
// //         <Link
// //           to={item.path}
// //           className={`d-flex align-items-center px-3 py-2 ${
// //             isActive(item.path) ? "active fw-semibold text-primary" : "text-black fw-semibold"
// //           }`}
// //         >
// //            <item.icon className="w-5 h-5 me-2" />
// //           {item.title}
// //         </Link>
// //       </li>
// //     );
// //   };

// //   return (
// //     <>
// //       <button className="sidebar-toggle" onClick={toggleSidebar}>
// //         ☰
// //       </button>

// //       <div className={`sidebar-2 ${sidebarOpen ? "open" : ""}`}
// //           >
// //         <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
// //           <h5 className="m-0">Admin Panel</h5>
// //           <X className="d-lg-none" onClick={toggleSidebar} style={{ cursor: "pointer" }} />
// //         </div>

// //         <ul className="list-unstyled">{menuConfig.map(renderMenu)}</ul>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminSidebar;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../css/profilesidebar.css";
// import {
//   LayoutDashboard,
//   Paintbrush,
//   TicketPercent,
//   List,
//   Plus,
//   Store,
//   Briefcase,
//   GraduationCap,
//   User,
//   FileText,
//   Home,
//   Info,
//   X,
//   LogOut,
// } from "lucide-react";
// import styled from "styled-components";

// const menuConfig = [
//   {
//     title: "Dashboard",
//     icon: LayoutDashboard,
//     path: "/admin/dashboard",
//   },
//   {
//     title: "Branding",
//     icon: Paintbrush,
//     path: "/admin/branding",
//   },
//   {
//     title: "Coupons",
//     icon: TicketPercent,
//     children: [
//       { title: "Coupon List", icon: List, path: "/admin/coupon-list" },
//       { title: "Add Coupon", icon: Plus, path: "/admin/add-coupon" },
//     ],
//   },
//   {
//     title: "Vendor",
//     icon: Store,
//     children: [
//       { title: "List Vendor", icon: List, path: "/admin/listvendor" },
//       { title: "Add Vendor", icon: Plus, path: "/admin/addvendor" },
//     ],
//   },
//   {
//     title: "Jobs",
//     icon: Briefcase,
//     children: [
//       { title: "List All", icon: List, path: "/admin/listalljobs" },
//       { title: "Add Jobs", icon: Plus, path: "/admin/addjob" },
//     ],
//   },
//   {
//     title: "JobSeekers",
//     icon: GraduationCap,
//     children: [
//       { title: "List All", icon: List, path: "/admin/listalljobseeker" },
//       { title: "Add Job Seeker", icon: Plus, path: "/admin/Addjobseeker" },
//     ],
//   },
//   {
//     title: "Employer",
//     icon: User,
//     children: [
//       { title: "List All", icon: List, path: "/admin/employeelist" },
//       { title: "Add Employers", icon: Plus, path: "/admin/team/addemployers" },
//     ],
//   },
//   {
//     title: "CMS",
//     icon: FileText,
//     children: [
//       { title: "Home", icon: Home, path: "/admin/cms/home" },
//       { title: "About Us", icon: Info, path: "/admin/aboutus" },
//     ],
//   },
//   {
//     title: "Resume List",
//     icon: FileText,
//     path: "/admin/resumelist",
//   },
// ];

// function AdminSidebar({ data }) {
//   const navigate = useNavigate();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [openSubmenus, setOpenSubmenus] = useState({});

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const toggleSubmenu = (title) => {
//     setOpenSubmenus((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };

//   const onLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/admin/login");
//   };

//   return (
//     <>
//       <button className="sidebar-toggle" onClick={toggleSidebar}>
//         ☰
//       </button>

//       <div className={`sidebar-2 ${sidebarOpen ? "open" : ""} overflow-y`}>
//         <div className="sticky-top overflow-y">
//           <div
//             className="candidate-info overflow-y"
//             style={{
//               maxHeight: "calc(100vh)",
//               overflowY: "auto",
//               scrollbarWidth: "none",
//             }}
//           >
//             <ul>
//               <li
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   textAlign: "center",
//                   fontSize: "1.5rem",
//                   fontWeight: "bold",
//                   padding: "1rem",
//                   borderBottom: "1px solid #ddd",
//                   backgroundColor: "#f8f9fa",
//                   color: "#1C2957",
//                 }}
//               >
//                 <span>Admin Menus</span>
//                 <X
//                   onClick={toggleSidebar}
//                   style={{ cursor: "pointer", color: "#1C2957" }}
//                   size={24}
//                   className="close-icon"
//                 />
//               </li>

//               {menuConfig.map((menu, idx) => {
//                 const Icon = menu.icon;
//                 const isActive = data === menu.title.toLowerCase().replace(/\s/g, "-");

//                 if (menu.children) {
//                   return (
//                     <li key={idx}>
//                       <div
//                         onClick={() => toggleSubmenu(menu.title)}
//                         className="submenu-toggle"
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           cursor: "pointer",
//                           fontSize: "15px",
//                           padding: "0.5rem 1rem",
//                           color: "#1C2957",
//                           fontWeight: "500",
//                         }}
//                       >
//                         <Icon className="me-2" size={18} />
//                         <span>{menu.title}</span>
//                         <span style={{ marginLeft: "auto" }}>
//                           {openSubmenus[menu.title] ? "▲" : "▼"}
//                         </span>
//                       </div>

//                       {openSubmenus[menu.title] && (
//                         <ul style={{ marginLeft: "20px" }}>
//                           {menu.children.map((child, cIdx) => {
//                             const ChildIcon = child.icon;
//                             const isChildActive =
//                               data ===
//                               child.title.toLowerCase().replace(/\s/g, "-");

//                             return (
//                               <li key={cIdx}>
//                                 <Link
//                                   to={child.path}
//                                   className={isChildActive ? "active" : null}
//                                   onClick={() => setSidebarOpen(false)}
//                                   style={{ fontSize: "14px" }}
//                                 >
//                                   <ChildIcon className="me-2" size={16} />
//                                   <span>{child.title}</span>
//                                 </Link>
//                               </li>
//                             );
//                           })}
//                         </ul>
//                       )}
//                     </li>
//                   );
//                 }

//                 return (
//                   <li key={idx}>
//                     <Link
//                       to={menu.path}
//                       className={isActive ? "active" : null}
//                       onClick={() => setSidebarOpen(false)}
//                       style={{ fontSize: "15px" }}
//                     >
//                       <Icon className="me-2" size={18} />
//                       <span>{menu.title}</span>
//                     </Link>
//                   </li>
//                 );
//               })}

//               <li>
//                 <Link
//                   to={"/admin/login"}
//                   onClick={() => {
//                     onLogout();
//                     setSidebarOpen(false);
//                   }}
//                   style={{ fontSize: "15px" }}
//                 >
//                   <LogOut className="me-2" />
//                   <span>Log Out</span>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// const FreeBadge = styled.span`
//   background-color: #28a745;
//   color: white;
//   font-size: 0.7rem;
//   padding: 2px 6px;
//   border-radius: 10px;
//   margin-left: 5px;
//   font-weight: bold;
// `;

// export default AdminSidebar;


import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/profilesidebar.css";
import {
  LayoutDashboard,
  Paintbrush,
  TicketPercent,
  List,
  Plus,
  Store,
  Briefcase,
  GraduationCap,
  User,
  FileText,
  Home,
  Info,
  X,
  LogOut,
} from "lucide-react";

// ✅ Define your base menuConfig
const menuConfig = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Branding",
    icon: Paintbrush,
    path: "/admin/branding",
  },
  {
    title: "Coupons",
    icon: TicketPercent,
    children: [
      { title: "Coupon List", icon: List, path: "/admin/coupon-list" },
      { title: "Add Coupon", icon: Plus, path: "/admin/add-coupon" },
    ],
  },
  {
    title: "Vendor",
    icon: Store,
    children: [
      { title: "List Vendor", icon: List, path: "/admin/listvendor" },
      { title: "Add Vendor", icon: Plus, path: "/admin/addvendor" },
    ],
  },
  {
    title: "Jobs",
    icon: Briefcase,
    children: [
      { title: "List All", icon: List, path: "/admin/listalljobs" },
      { title: "Add Jobs", icon: Plus, path: "/admin/addjob" },
    ],
  },
  {
    title: "JobSeekers",
    icon: GraduationCap,
    children: [
      { title: "List All", icon: List, path: "/admin/listalljobseeker" },
      { title: "Add Job Seeker", icon: Plus, path: "/admin/Addjobseeker" },
    ],
  },
  {
    title: "Employer",
    icon: User,
    children: [
      { title: "List All", icon: List, path: "/admin/employeelist" },
      { title: "Add Employers", icon: Plus, path: "/admin/team/addemployers" },
    ],
  },
  {
    title: "CMS",
    icon: FileText,
    children: [
      { title: "Home", icon: Home, path: "/admin/cms/home" },
      { title: "About Us", icon: Info, path: "/admin/aboutus" },
    ],
  },
  {
    title: "Resume List",
    icon: FileText,
    path: "/admin/resumelist",
  },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSubmenu = (title) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const onLogout = () => {
    localStorage.removeItem("adminLoginToken");
    navigate("/admin/login");
  };

  // ✅ enhance menuConfig with isActive automatically
  const enhancedMenuConfig = menuConfig.map((menu) => {
    if (menu.children) {
      const updatedChildren = menu.children.map((child) => ({
        ...child,
        isActive: location.pathname === child.path,
      }));
      return {
        ...menu,
        isActive: updatedChildren.some((child) => child.isActive),
        children: updatedChildren,
      };
    }
    return {
      ...menu,
      isActive: location.pathname === menu.path,
    };
  });

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar-2 ${sidebarOpen ? "open" : ""} overflow-y`}>
        <div className="sticky-top overflow-y">
          <div
            className="candidate-info overflow-y"
            style={{
              maxHeight: "calc(100vh)",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <ul>
              {/* Sidebar Header */}
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
                <span>Admin Menus</span>
                <X
                  onClick={toggleSidebar}
                  style={{ cursor: "pointer", color: "#1C2957" }}
                  size={24}
                  className="close-icon"
                />
              </li>

              {/* Menus */}
              {enhancedMenuConfig.map((menu, idx) => {
                const Icon = menu.icon;

                if (menu.children) {
                  return (
                    <li key={idx}>
                      {/* Parent item */}
                      <div
                        onClick={() => toggleSubmenu(menu.title)}
                        className={`submenu-toggle ${menu.isActive ? "active" : ""}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                          fontSize: "15px",
                          padding: "0.5rem 1rem",
                          color: "#1C2957",
                          fontWeight: "500",
                        }}
                      >
                        <Icon className="me-2" size={18} />
                        <span>{menu.title}</span>
                        <span style={{ marginLeft: "auto" }}>
                          {openSubmenus[menu.title] || menu.isActive ? "▲" : "▼"}
                        </span>
                      </div>

                      {/* Child items */}
                      {(openSubmenus[menu.title] || menu.isActive) && (
                        <ul style={{ marginLeft: "20px" }}>
                          {menu.children.map((child, cIdx) => {
                            const ChildIcon = child.icon;
                            return (
                              <li key={cIdx}>
                                <Link
                                  to={child.path}
                                  className={child.isActive ? "active" : null}
                                  onClick={() => setSidebarOpen(false)}
                                  style={{ fontSize: "14px" }}
                                >
                                  <ChildIcon className="me-2" size={16} />
                                  <span>{child.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={idx}>
                    <Link
                      to={menu.path}
                      className={menu.isActive ? "active" : null}
                      onClick={() => setSidebarOpen(false)}
                      style={{ fontSize: "15px" }}
                    >
                      <Icon className="me-2" size={18} />
                      <span>{menu.title}</span>
                    </Link>
                  </li>
                );
              })}

              {/* Logout */}
              <li>
                <Link
                  to={"/admin/login"}
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

export default AdminSidebar;
