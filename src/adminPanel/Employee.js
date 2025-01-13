import React, { useEffect, useState } from 'react';
import { Container, Row, Col ,Dropdown} from 'react-bootstrap';

import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  Card } from 'react-bootstrap';
import { FaStore, FaUsers } from 'react-icons/fa';

import { Link } from 'react-router-dom'; 

const Employee = () => {
 

  return (
    <div>
      <CustomNavbar />
      <Container fluid >
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <p> <FaStore className='mx-1' /> / Employee</p>
            <Row className='d-flex justify-content-center mt-5' >
              <Col md={5} className='text-center ' >
                <Link to="/admin/employeelist" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body>
                      <FaUsers className="display-4" />
                      <Card.Title>List All</Card.Title>
                    
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={5} className='text-center'>
                <Link to="/admin/addvendor" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body >
                      <FaStore className="display-4"/><br/>
                      <Card.Title>Add Employee</Card.Title>
                      
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
             {/* <Col md={5} className='text-center m-5'>
                <Link to="/admin/addvendor" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body >
                      <FaStore className="display-4"/><br/>
                      <Card.Title>Bulk Upload</Card.Title>
                      
                    </Card.Body>
                  </Card>
                </Link>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Employee;
