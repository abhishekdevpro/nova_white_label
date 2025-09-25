import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaStore,
  FaUserTie,
  FaBriefcase,
  FaUserGraduate,
  FaBell,
  FaUserPlus,
  FaTasks,
  FaWallet,
  FaTachometerAlt,
} from "react-icons/fa";

import Sidebar from "./Sidebar";
import CustomNavbar from "./Navbar";
import axios from "axios";

const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const fecthCounts = async () => {
    try {
      const res = await axios.get(
        `https://apiwl.novajobs.us/api/admin/dashboard-count`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.data, "kkkkk");
      if (res.data.code === 200 || res.data.status === "success") {
        setCounts(res.data.data);
      }
      // console.log((await res).data,"counts")
    } catch (error) {
      console.log(error, "error in fetching counts");
    }
  };

  useEffect(() => {
    fecthCounts();
  }, []);
  // console.log(counts, "counts in dashboard");
  const Box = ({ icon, title, count, path, size }) => (
    // console.log(count, "count in box"),
    <Col md={size} className="">
      <Card
        className="border rounded-5 w-100 "
        style={{
          backgroundColor: "#F8F9FA",
          cursor: "pointer",
          color: "#1C2957",
        }}
        onClick={() => navigate(path)}
      >
        <Card.Body>
          <div className="d-flex align-items-center justify-content-center ">
            {icon}
          </div>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text
            className="text-center border px-5 rounded-5"
            style={{
              fontSize: "1.5rem",
              fontWeight: "500",
              color: "white",
              backgroundColor: "#1C2957",
            }}
          >
            {count}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div>
      <CustomNavbar />
      <div className="container">
        <div className="row">
          {/* <Col md={2} className="p-0"> */}
          <Sidebar active="dashboard" />
          {/* </Col> */}
          <Col>
            <Container fluid className="p-4">
              <div className="job-bx-title clearfix ">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="font-weight-700 pull-left text-uppercase ">
                    Dashboard
                  </h5>
                </div>
              </div>
              <Row className="g-3">
                <Col md={6} className="mb-3">
                  <Box
                    icon={<FaStore className="display-4" />}
                    title="Vendors"
                    count={counts.vendor_count}
                    path="/admin/vendor-list"
                    size={12}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Box
                    icon={<FaUserTie className="display-4" />}
                    title="Employer"
                    count={counts.employeer_count}
                    path="/admin/employer-list"
                    size={12}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Box
                    icon={<FaBriefcase className="display-4" />}
                    title="Jobs"
                    count={counts.job_count}
                    path="/admin/job-list"
                    size={12}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Box
                    icon={<FaUserGraduate className="display-4" />}
                    title="JobSeekers"
                    count={counts.job_seeker_count}
                    path="/admin/jobseekers-list"
                    size={12}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Box
                    icon={<FaUserGraduate className="display-4" />}
                    title="Applicants"
                    count={counts.applicant_count}
                    path="/admin/jobseekers-list?defaultView=applicants"
                    size={12}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
