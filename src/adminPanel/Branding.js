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
import Footer from "../markup/Layout/Footer";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component
import { FaFileAlt, FaPaintBrush } from "react-icons/fa";
import CustomNavbar from "./Navbar";
import BrandingTabs from "../employeeMarkup/Pages/BrandingCompany/brandingtabs.jsx";

const BrandingAdmin = () => {
  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          <Sidebar />

          <Col>
            <Container fluid className="p-4 ">
              <div className="job-bx-title clearfix">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="font-weight-700 pull-left text-uppercase ">
                    Admin Company Branding Page
                  </h5>
                </div>
              </div>
              <Row className="gap-3 ">
                <BrandingTabs />
              </Row>
            </Container>
          </Col>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandingAdmin;
