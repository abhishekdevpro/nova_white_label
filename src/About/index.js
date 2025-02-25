import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../Sidebar";
import CustomNavbar from "../../Navbar";

import AdminAboutus from "./AdminAboutus";

function AboutusForm({ projectName }) {
  return (
    <>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Container
              fluid
              className="p-4"
              style={{ overflow: "auto", maxHeight: "100vh" }}
            >
              <AdminAboutus projectName={projectName} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutusForm;
