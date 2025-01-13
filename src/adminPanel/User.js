import React, { useState } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { FaStore } from 'react-icons/fa';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';

const User = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      createdDate: '2024-06-27',
      name: 'John Doe',
      contactNumber: '123-456-7890',
      email: 'john.doe@example.com',
      location: 'New York',
      role: 'InActive',
      status: 'Pending',
      analyst: 'Alice Smith',
      note: '',
    },
    {
      id: 2,
      createdDate: '2024-06-26',
      name: 'Jane Smith',
      contactNumber: '987-654-3210',
      email: 'jane.smith@example.com',
      location: 'San Francisco',
      role: 'Active',
      status: 'Approved',
      analyst: 'Bob Johnson',
      note: '',
    },
    // Add more dummy data as needed
  ]);

  const toggleDropdown = (jobId) => {
    // Implement dropdown toggle logic if needed
  };

  const handleOptionClick = (jobId, option) => {
    // Implement option click handling logic if needed
  };

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
              <FaStore className="mx-1" /> / Users
            </p>
            <Row>
              <Col md={14}>
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Created Date</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Name</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Contact No.</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Email</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Location</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Role</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Status</th>
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>More Info</th>
                  
                      <th style={{ backgroundColor: '#1C2957', color: 'white' }}>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className='text-center'>
                        <td>{job.createdDate}</td>
                        <td>{job.name}</td>
                        <td>{job.contactNumber}</td>
                        <td>{job.email}</td>
                        <td>{job.location}</td>
                        <td>
                          {/* Example dropdown */}
                          <Dropdown>
                            <Dropdown.Toggle >
                              Select
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Pending')}>Vendor</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Pending')}>Team</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Pending')}>JobSeeker</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Approved')}>Employer</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td> 
                        <td>{job.role}</td>
                        
                      
                        <td>{job.note}</td>
                        <td> <input
                        type='textbox'
                        className='p-2'
                        /></td>
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

export default User;
