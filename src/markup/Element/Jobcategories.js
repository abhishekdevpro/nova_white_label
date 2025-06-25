// import axios from "axios";
// import { showToastError } from "../../utils/toastify";
// import React, { useEffect, useState } from "react";
// import {
//   FaAccessibleIcon,
//   FaAddressCard,
//   FaAppleAlt,
//   FaArtstation,
//   FaBuilding,
//   FaCarSide,
//   FaChartBar,
//   FaChartLine,
//   FaHatCowboy,
//   FaHotel,
//   FaPhone,
//   FaStar,
//   FaTable,
//   FaWarehouse,
// } from "react-icons/fa";
// import { FaAppStore, FaBriefcase, FaHeartPulse } from "react-icons/fa6";
// import { Link, useNavigate } from "react-router-dom";

// function Jobcategories() {
//   const navigate = useNavigate();
//   const handleSelectedTitle = (category) => {
//     localStorage.setItem("jobCategory", category);
//     navigate("/user/job");
//   };
//   const token = localStorage.getItem("jobSeekerLoginToken");
//   const [categories, setCategories] = useState([
//     {
//       id: 0,
//       name: "",
//     },
//   ]);
//   useEffect(() => {
//     axios({
//       method: "GET",
//       url: "https://apiwl.novajobs.us/api/jobseeker/job-categories",
//       headers: {
//         Authorization: token,
//       },
//     })
//       .then((response) => {
//         console.log(response.data.data);
//         setCategories(response.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   const iconMap = {
//     1: FaArtstation,
//     2: FaAddressCard,
//     3: FaChartBar,
//     4: FaTable,
//     5: FaPhone,
//     6: FaHotel,
//     7: FaWarehouse,
//     8: FaHeartPulse,
//     9: FaBuilding,
//   };

//   return (
//     <div className="row sp20">
//       {categories.map((item, index) => {
//         return (
//           <div
//             key={index}
//             onClick={() => handleSelectedTitle(item.id)}
//             className="col-lg-3 col-md-6 col-sm-6"
//             style={{ cursor: "pointer" }}
//           >
//             <div className="icon-bx-wraper" style={{height:'125px',}}>
//               <div className="icon-content ">
//                 <div
//                   className="icon-20px text-primary"
//                   style={{   fontSize: "40px" }}
//                 >
//                   {React.createElement(iconMap[item.id] || FaCarSide)}
//                 </div>
//                 <Link to={"#"} className="dez-tilte">
//                   {item.name}
//                 </Link>
//                 {/* <p className="m-a0">198 Open Positions</p> */}
//                 <div className="rotate-icon">
//                   <i className="ti-location-pin"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//       {/* <div
//         onClick={() => handleSelectedTitle("education training")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-wand"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Education Training
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-wand"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => handleSelectedTitle("accounting & finance")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-wallet"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Accounting / Finance
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-wallet"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => handleSelectedTitle("human resource")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-cloud-up"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Human Resource
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-cloud-up"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => handleSelectedTitle("telecommunications")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-bar-chart"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Telecommunications
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-bar-chart"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => handleSelectedTitle("restaurant")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-tablet"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Restaurant / Food Service
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-tablet"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => handleSelectedTitle("construction")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-camera"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Construction / Facilities
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-camera"></i>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         onClick={() => handleSelectedTitle("health")}
//         className="col-lg-3 col-md-6 col-sm-6"
//         style={{ cursor: "pointer" }}
//       >
//         <div className="icon-bx-wraper">
//           <div className="icon-content">
//             <div className="icon-md text-primary m-b20">
//               <i className="ti-panel"></i>
//             </div>
//             <Link to={"#"} className="dez-tilte">
//               Health
//             </Link>
//             <p className="m-a0">198 Open Positions</p>
//             <div className="rotate-icon">
//               <i className="ti-panel"></i>
//             </div>
//           </div>
//         </div>
//       </div> */}
//       <div className="col-lg-12 text-center m-t30">
//         <button className="site-button radius-xl">
//           <Link to={"/user/job"} className="site-button">
//             All Categories
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Jobcategories;

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaAccessibleIcon,
  FaAddressCard,
  FaAppleAlt,
  FaArtstation,
  FaBuilding,
  FaCarSide,
  FaChartBar,
  FaChartLine,
  FaHatCowboy,
  FaHotel,
  FaPhone,
  FaStar,
  FaTable,
  FaWarehouse,
} from "react-icons/fa";
import { FaAppStore, FaBriefcase, FaHeartPulse } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const JobCategoriesWrapper = styled.div`
  .icon-bx-wraper {
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 20px;
    margin-bottom: 20px;
    height: 150px; /* Fixed height for consistency */
    transition: transform 0.3s, 
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(119, 208, 237, 0.2);
    }
  }

  .icon-content {
    .icon-20px {
      font-size: 40px;
      color: #007bff;
    }

    .dez-title {
      font-size: 18px;
      font-weight: 600;
      color: #343a40;
      margin-top: 10px;
      text-decoration: none;

     
    }
  }

  .site-button {
    display: inline-block;
    background: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 20px;
    text-decoration: none;
    transition: background 0.3s;

    &:hover {
      background: #77d0ed;
      color: #fff;
    }
  }
`;

function Jobcategories() {
  const navigate = useNavigate();
  const handleSelectedTitle = (category) => {
    localStorage.setItem("jobCategory", category);
    navigate("/user/job/2");
  };
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/job-categories",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const iconMap = {
    1: FaArtstation,
    2: FaAddressCard,
    3: FaChartBar,
    4: FaTable,
    5: FaPhone,
    6: FaHotel,
    7: FaWarehouse,
    8: FaHeartPulse,
    9: FaBuilding,
  };

  return (
    <JobCategoriesWrapper className="container">
      <div className="row">
        {categories.map((item, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
            onClick={() => handleSelectedTitle(item.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="icon-bx-wraper">
              <div className="icon-content">
                <div className="icon-20px">
                  {React.createElement(iconMap[item.id] || FaCarSide)}
                </div>
                <Link to="#" className="dez-title">
                  {item.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12 text-center">
          <Link to="/user/jobs" className="site-button">
            All Categories
          </Link>
        </div>
      </div>
    </JobCategoriesWrapper>
  );
}

export default Jobcategories;
