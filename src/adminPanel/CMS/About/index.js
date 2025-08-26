// import React from "react";

// import { Container, Row, Col } from "react-bootstrap";
// import Sidebar from "../../Sidebar";
// import CustomNavbar from "../../Navbar";

// import AdminAboutus from "./AdminAboutus";

// function AboutusForm({ projectName }) {
//   const token = localStorage.getItem("vendorToken")
//   return (
//     <>
//      {token ? "" :<CustomNavbar />}
//       <Container fluid>
//         <Row>
//           {token?"":<Col md={2} className="p-0">
//             <Sidebar />
//           </Col>}
//           <Col md={10}>
//             <Container
//               fluid
//               className="p-4"
//               style={{ overflow: "auto", maxHeight: "100vh" }}
//             >
//               <AdminAboutus projectName={projectName} />
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default AboutusForm;
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Sidebar";
import CustomNavbar from "../../Navbar";
import AdminAboutus from "./AdminAboutus";
import { User } from "lucide-react";

function AboutusForm({ projectName }) {
  const token = localStorage.getItem("vendorToken");

  return (
    <>
      {!token && <CustomNavbar />}

      <div className="container">
        <div className="row">
         {token ? "":<Sidebar />}

          <Col
            md={token ? 12 : 9}
            // className="px-4 py-4"
            style={{ minHeight: "100vh", overflowY: "auto" }}
          >
            <div className="bg-white rounded shadow h-100 p-4">
             
              <div className="job-bx-title clearfix">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className=" font-weight-700 pull-left text-uppercase">
                     About Us
                    </h5>
                   
                  </div>
                </div>
              <AdminAboutus projectName={projectName} />
            </div>
          </Col>
        </div>
      </div>
    </>
  );
}

export default AboutusForm;
