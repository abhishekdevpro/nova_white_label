import React, { useEffect, useState } from 'react';
import { Container, Row, Col ,Dropdown} from 'react-bootstrap';
import { FaStore } from 'react-icons/fa';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompanyListAdmin = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
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
        setJobs(data.data); // Assuming the data is in data.data
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <CustomNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <p>
              <FaStore className='mx-1' /> / Jobs
            </p>
            <Row>
              <Col md={12}>
                <table className="table">
                  <thead className='text-center'>
                    <tr>
                      <th> ID</th>
                      <th>Company Name</th>
                      <th>State</th>
                      <th>Company Industry</th>
                      
                      <th>Status</th>
                      <th>More info</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {jobs.map((job) => (
                      <tr key={job.id} >
                        <td>{job.s_no}</td>
                        <td>{job.company_name}</td>
                        <td>{job.state.name}</td>
                        <td>{job.company_industry.name}</td>
                        <td>
                          {/* Example dropdown */}
                          <Dropdown>
                            <Dropdown.Toggle >
                              Select
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item >Active</Dropdown.Item>
                              <Dropdown.Item >Pending</Dropdown.Item>
                             
                            </Dropdown.Menu>
                          </Dropdown>
                        </td> 
                        
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CompanyListAdmin;
