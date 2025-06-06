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

function AboutusForm({ projectName }) {
  const token = localStorage.getItem("vendorToken");

  return (
    <>
      {!token && <CustomNavbar />}

      <Container fluid className="min-vh-100 p-0 bg-light">
        <Row className="g-0">
          {!token && (
            <Col
              md={2}
              className="d-none d-md-block bg-white border-end shadow-sm"
              style={{ minHeight: "100vh" }}
            >
              <Sidebar />
            </Col>
          )}

          <Col
            md={token ? 12 : 10}
            className="px-4 py-4"
            style={{ minHeight: "100vh", overflowY: "auto" }}
          >
            <div className="bg-white rounded shadow p-4 h-100">
             
              <AdminAboutus projectName={projectName} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutusForm;
