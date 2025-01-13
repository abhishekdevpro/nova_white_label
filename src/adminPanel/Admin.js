import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from '../adminPanel/Sidebar';
import CustomNavbar from '../adminPanel/Navbar';


function Admin() {
    return (
        <div>
        <CustomNavbar />
        <Container fluid>
          <Row>
            <Col md={2} className="p-0">
              <Sidebar />
            </Col>
            <Col md={10}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
      );
}

export default Admin;
