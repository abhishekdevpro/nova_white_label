import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaStore, FaUsers } from 'react-icons/fa';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom'; 
const Team = () => {
  return (

    <div>
    <CustomNavbar />
      <Container fluid >
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <p> <FaStore className='mx-1' /> / Team</p>
            <Row className='d-flex justify-content-center mt-5' >
              <Col md={5} className='text-center ' >
                <Link to="/admin/team/list-number" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body>
                      <FaUsers className="display-4 m-2" />
                      <Card.Title>List Team</Card.Title>
                    
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={5} className='text-center'>
                <Link to="/admin/team/list-team" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body >
                      <FaStore className="display-4 m-2"/><br/>
                      <Card.Title>Add Team</Card.Title>
                      
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

export default Team;
