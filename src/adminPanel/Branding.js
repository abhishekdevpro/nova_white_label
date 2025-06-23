import React, { useEffect, useState } from "react";

import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Pagination,
  Form,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component
import { FaFileAlt, FaPaintBrush } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import BrandingTabs from "../employeeMarkup/Pages/BrandingCompany/brandingtabs.jsx";

const BrandingAdmin = () => {
  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <Container fluid className="p-4">
              {/* <Row className="mb-4">
                <Col>
                  <p className="d-flex align-items-center">
                    <FaPaintBrush className="mx-2" /> Branding
                  </p>
                </Col>
              </Row> */}
              <Row className="gap-3">
                <BrandingTabs />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BrandingAdmin;
