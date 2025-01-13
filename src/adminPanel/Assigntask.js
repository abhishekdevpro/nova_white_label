import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import {FaStore}  from 'react-icons/fa';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';

const AssignTask = () => {
  return (

    <div>
    <CustomNavbar />
     <Container fluid>
       <Row>
         <Col md={2} className="p-0">
           <Sidebar />
         </Col>
         <Col md={10}>
         <p> <FaStore className='mx-1' /> / AssignTask</p>
         </Col>
       </Row>
     </Container>
 </div>
    
  );
};

export default AssignTask;
