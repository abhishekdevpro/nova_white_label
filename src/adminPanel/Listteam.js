import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Form, Button } from 'react-bootstrap';
import { FaStore } from 'react-icons/fa';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';

const Listteam = () => {
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
   
    // Add more dummy data as needed
  ]);

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
              <FaStore className="mx-1" /> / Add Team
            </p>
            <Row>
              {jobs.map((job) => (
                <Col key={job.id} md={12} className="mb-4">
                  <Form className="border p-3">
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Created Date</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" readOnly value={job.createdDate} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Name</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" readOnly value={job.name} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Contact No.</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" readOnly value={job.contactNumber} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Email</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="email" readOnly value={job.email} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Location</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" readOnly value={job.location} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Role</Form.Label>
                      <Col sm={10}>
                        <Form.Control type="text" readOnly value={job.role} />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Status</Form.Label>
                      <Col sm={10}>
                        <Dropdown>
                          <Dropdown.Toggle>
                            {job.status}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Pending')}>Pending</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Approved')}>Approved</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleOptionClick(job.id, 'Rejected')}>Rejected</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Note</Form.Label>
                      <Col sm={10}>
                        <Form.Control as="textarea" rows={3} value={job.note} readOnly />
                        <button className='my-3 p-2 rounded-3 text-white bg-primary border'>Add to team</button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Listteam;
