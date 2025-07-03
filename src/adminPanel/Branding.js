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
          
          <Col >
            <Container fluid className="">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandingAdmin;
