// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import { FaStore } from "react-icons/fa";
// import CustomNavbar from "./Navbar";
// import Sidebar from "./Sidebar";

// const Employeelist = () => {
//   const [companies, setCompanies] = useState([]);

//   useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         const authToken = localStorage.getItem("authToken");
//         if (!authToken) {
//           throw new Error("Auth token not found");
//         }

//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: authToken,
//         };

//         const companyEndpoint =
//           "https://apiwl.novajobs.us/api/admin/employeer-lists";

//         const response = await fetch(companyEndpoint, { headers });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setCompanies(data.data);
//         console.log(data.data);
//       } catch (error) {
//         console.error("Error fetching company data:", error);
//       }
//     };

//     fetchCompany();
//   }, []);

//   const handleStatusChange = async (companyId, status) => {
//     const authToken = localStorage.getItem("authToken");
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: authToken,
//     };

//     try {
//       if (status === "active") {
//         await fetch(
//           `https://apiwl.novajobs.us/api/admin/employeer-active/${companyId}`,
//           {
//             method: "PUT",
//             headers,
//             body: JSON.stringify({ status: 1 }), // Sending 1 for active
//           }
//         );
//       } else if (status === "inactive") {
//         await fetch(
//           `https://apiwl.novajobs.us/api/admin/employeer-inactive/${companyId}`,
//           {
//             method: "PUT",
//             headers,
//             body: JSON.stringify({ status: 0 }), // Sending 0 for inactive
//           }
//         );
//       }
//       // Optionally refetch the company data after status change
//     } catch (error) {
//       console.error("Error updating company status:", error);
//     }
//   };

//   return (
//     <div>
//       <CustomNavbar />
//       <Container fluid>
//         <Row>
//           <Col md={2} className="p-0">
//             <Sidebar />
//           </Col>
//           <Col md={10}>
//             <p>
//               <FaStore className="mx-1" /> / Company
//             </p>
//             <Row>
//               <Col md={12}>
//                 {companies?.length >0  ? (
//                   <div
//                     style={{
//                       overflowX: "auto",
//                       overflowY: "auto",
//                       maxHeight: "500px",
//                     }}
//                   >
//                     <table className="table">
//                       <thead className="text-center">
//                         <tr>
//                           <th>Company Name</th>
//                           <th>State</th>
//                           <th>Email</th>
//                           <th>Account Status</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       {companies.map((company)=>{
//                         <tbody className="text-center">
//                         <tr key={company.company_detail.id}>
//                           <td>{company.company_detail.company_name}</td>
//                           <td>{company.company_detail.states.name}</td>
//                           <td>{company.company_detail.email}</td>
//                           <td>
//                             {company.company_detail.is_active === 1 ? "Active" : "Inactive"}
//                           </td>
//                           <td>
//                             {company.company_detail.is_active === 1 ? (
//                               <Button
//                                 variant="warning"
//                                 onClick={() =>
//                                   handleStatusChange(company.company_detail.id, "inactive")
//                                 }
//                               >
//                                 Set Inactive
//                               </Button>
//                             ) : (
//                               <Button
//                                 variant="success"
//                                 onClick={() =>
//                                   handleStatusChange(company.company_detail.id, "active")
//                                 }
//                               >
//                                 Set Active
//                               </Button>
//                             )}
//                           </td>
//                         </tr>
//                       </tbody>
//                       })}
//                     </table>
//                   </div>
//                 ) : (
//                   <p>Loading...</p>
//                 )}
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Employeelist;


import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStore } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";

const Employeelist = () => {
  const [companies, setCompanies] = useState([]);
   const [domainList, setDomainList] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) throw new Error("Auth token not found");

        const headers = {
          "Content-Type": "application/json",
          Authorization: authToken,
        };
        const API = selectedDomain ? `https://apiwl.novajobs.us/api/admin/employeer-lists?domain_filter=${selectedDomain}`:"https://apiwl.novajobs.us/api/admin/employeer-lists"
        const response = await fetch(
          API,
          { headers }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCompanies(data.data || []);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchCompany();
    fetchDomains()
  }, [selectedDomain]);

  const handleStatusChange = async (companyId, status) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: authToken,
      };

      const url =
        status === "active"
          ? `https://apiwl.novajobs.us/api/admin/employeer-active/${companyId}`
          : `https://apiwl.novajobs.us/api/admin/employeer-inactive/${companyId}`;

      await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify({ status: status === "active" ? 1 : 0 }),
      });

      // Re-fetch companies
      const updated = await fetch(
        "https://apiwl.novajobs.us/api/admin/employeer-lists",
        { headers }
      );
      const updatedData = await updated.json();
      setCompanies(updatedData.data || []);
    } catch (error) {
      console.error("Error updating company status:", error);
    }
  };
   const fetchDomains = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await axios.get(
          `https://apiwl.novajobs.us/api/admin/domain-list`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
  
        if (response.data.status === "success" || response.data.code === 200) {
          setDomainList(response?.data?.data);
          //  console.log(response);
        }
      } catch (error) {
        console.log(error, "Error while fetching domains");
      }
    };

  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
           <Row className="align-items-center my-3">
                         <Col xs={12} md={6} className="mb-2 mb-md-0">
                           <h4 className="text-dark fw-semibold mb-0">
                             Employer List
                           </h4>
                         </Col>
                         <Col xs={12} md={6}>
                           <div className="d-flex gap-2 justify-content-md-end">
                             <select
                             // size={5}
                               className="form-select"
                               style={{
                                 width: "250px",
                                 maxWidth: "100%",
                               }}
                               value={selectedDomain}
                               onChange={(e) => setSelectedDomain(e.target.value)}
                             >
                               <option value=""
                              
                               >Search by vendor domain</option>
                               {domainList.map((domain, index) => (
                                 <option key={index} value={domain}>
                                   {domain}
                                 </option>
                               ))}
                             </select>
           
                             <Button
                              className="site-button btn-sm "
                              variant="danger"
                              onClick={()=>setSelectedDomain("")}
                             >
                               Clear
                             </Button>
                           </div>
                         </Col>
                       </Row>
            <Row>
              <Col md={12}>
                {companies.length > 0 ? (
                  <div
                    style={{
                      overflowX: "auto",
                      overflowY: "auto",
                      // maxHeight: "500px",
                    }}
                  >
                    <table className="table">
                      <thead className="text-center">
                        <tr>
                          <th>Company Name</th>
                          <th>State</th>
                          <th>Email</th>
                          <th>Account Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {companies.map((company) => (
                        <tbody className="text-center" key={company.company_detail.id}>
                          <tr>
                            <td>{company.company_detail.company_name}</td>
                            <td>{company.company_detail.state?.name || "N/A"}</td>
                            <td>{company.company_detail.email || "N/A"}</td>
                            <td>
                              {company.company_detail.is_active === 1 ? "Active" : "Inactive"}
                            </td>
                            <td>
                              {company.company_detail.is_active === 1 ? (
                                <Button
                                  variant="warning"
                                  className="site-button"
                                  onClick={() =>
                                    handleStatusChange(company.company_detail.id, "inactive")
                                  }
                                >
                                  Set Inactive
                                </Button>
                              ) : (
                                <Button
                                  variant="success"
                                  className="site-button"
                                  onClick={() =>
                                    handleStatusChange(company.company_detail.id, "active")
                                  }
                                >
                                  Set Active
                                </Button>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                ) : (
                  <p>Loading or no companies found...</p>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employeelist;
