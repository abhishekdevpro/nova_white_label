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
          <Sidebar />

          <Col
            md={token ? 9 : 9}
            className="px-4 py-4"
            style={{ minHeight: "100vh", overflowY: "auto" }}
          >
            <div className="bg-white rounded shadow p-4 h-100">
              {/* <Col>
                <h5 className="font-weight-700 pull-left text-uppercase">
                  <User className="mx-1" /> About Us
                </h5>
              </Col> */}
              <AdminAboutus projectName={projectName} />
            </div>
          </Col>
        </div>
      </div>
    </>
  );
}

export default AboutusForm;
