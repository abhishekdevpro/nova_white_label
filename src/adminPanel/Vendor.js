import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStore, FaUsers } from 'react-icons/fa';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Vendor = () => {
  return (
    <div>
      <CustomNavbar />
      <Container fluid >
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <p> <FaStore className='mx-1' /> / Vendor</p>
            <Row className='d-flex justify-content-center mt-5' >
              <Col md={5} className='text-center ' >
                <Link to="/admin/listvendor" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body>
                      <FaUsers className="display-4" />
                      <Card.Title>List Vendor</Card.Title>
                    
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={5} className='text-center'>
                <Link to="/admin/addvendor" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body >
                      <FaStore className="display-4"/><br/>
                      <Card.Title>Add Vendors</Card.Title>
                      
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Vendor;
