import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaStore, FaUserTie, FaBriefcase, FaUserGraduate, FaBell, FaUserPlus, FaTasks, FaWallet, FaTachometerAlt } from 'react-icons/fa';

import Sidebar from './Sidebar';
import CustomNavbar from './Navbar';

const Dashboard = () => {
  const [maxSNo, setMaxSNo] = useState(0); 
  const [maxSNo2, setMaxSNo2] = useState(0);// State to store max s_no
  const [maxSNo3, setMaxSNo3] = useState(0);
  const [maxSNo4, setMaxSNo4] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobsCount = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('Auth token not found');
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: authToken,
        };

        const jobsEndpoint = 'https://api.novajobs.us/api/admin/job-lists';

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          // Find the maximum s_no value
          const maxSNoValue = Math.max(...data.data.map(job => job.s_no));
          setMaxSNo(maxSNoValue);
        } else {
          setMaxSNo(0); // Handle case where no jobs are returned
        }
      } catch (error) {
        console.error('Error fetching jobs count:', error);
        // Handle errors, e.g., setMaxSNo(-1);
      }
    };

    fetchJobsCount();
  }, []);

  useEffect(() => {
    const fetchJobsCount2 = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('Auth token not found');
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: authToken,
        };

        const jobsEndpoint = 'https://api.novajobs.us/api/admin/job-seekers';

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          // Find the maximum s_no value
          const maxSNoValue = Math.max(...data.data.map(job => job.jobskkers_detail.id));
          setMaxSNo2(maxSNoValue);
        } else {
          setMaxSNo2(0); // Handle case where no jobs are returned
        }
      } catch (error) {
        console.error('Error fetching jobs count:', error);
        // Handle errors, e.g., setMaxSNo(-1);
      }
    };

    fetchJobsCount2();
  }, []);

  useEffect(() => {
    const fetchJobsCount3 = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('Auth token not found');
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: authToken,
        };

        const jobsEndpoint = 'https://api.novajobs.us/api/admin/vendor-lists';

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          // Find the maximum s_no value
          const maxSNoValue = Math.max(...data.data.map(job => job.vendors_detail.id));
          setMaxSNo3(maxSNoValue);
        } else {
          setMaxSNo3(0); // Handle case where no jobs are returned
        }
      } catch (error) {
        console.error('Error fetching jobs count:', error);
        // Handle errors, e.g., setMaxSNo(-1);
      }
    };

    fetchJobsCount3();
  }, []);

  useEffect(() => {
    const fetchJobsCount4 = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          throw new Error('Auth token not found');
        }

        const headers = {
          'Content-Type': 'application/json',
          Authorization: authToken,
        };

        const jobsEndpoint = 'https://api.novajobs.us/api/admin/companies';

        const response = await fetch(jobsEndpoint, { headers });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.data && data.data.length > 0) {
          // Find the maximum s_no value
          const maxSNoValue = Math.max(...data.data.map(job => job.id));
          setMaxSNo4(maxSNoValue);
        } else {
          setMaxSNo4(0); // Handle case where no jobs are returned
        }
      } catch (error) {
        console.error('Error fetching jobs count:', error);
        // Handle errors, e.g., setMaxSNo(-1);
      }
    };

    fetchJobsCount4();
  }, [])

  const Box = ({ icon, title, count, path, size }) => (
    <Col md={size} className="">
      <Card
        className="border rounded-5 w-100 "
        style={{ backgroundColor: '#F8F9FA', cursor: 'pointer', color:'#1C2957'  }}
        onClick={() => navigate(path)}
      >
        <Card.Body>
          <div className="d-flex align-items-center justify-content-center ">
            {icon}
          </div>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text className="text-center border px-5 rounded-5"  style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
            {title === 'Jobs' ? maxSNo : count}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );

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
              <Row className="mb-4">
                <Col>
                  <p className="d-flex align-items-center">
                    <FaTachometerAlt className="mx-1" /> Dashboard
                  </p>
                </Col>
              </Row>
              <Row className="gap-3">
                <Box
                  icon={<FaStore className="display-4" />}
                  title="Vendors"
                  count={maxSNo3} // Replace with actual count
                  path="/admin/vendor"
                  size={6} // Size for this Box
                />
                <Box
                  icon={<FaUserTie className="display-4" />}
                  title="Employer"
                  count={maxSNo4} // Replace with actual count
                  path="/admin/employer"
                  size={5} // Size for this Box
                />
                <Box
                  icon={<FaBriefcase className="display-4" />}
                  title="Jobs"
                  count={maxSNo} // Display max s_no here
                  path="/admin/jobs"
                  size={6} // Larger size for this Box
                />

                <Box
                  icon={<FaUserGraduate className="display-4" />}
                  title="JobSeekers"
                  count={maxSNo2} // Replace with actual count
                  path="/admin/jobseekers"
                  size={5} // Size for this Box
                />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
