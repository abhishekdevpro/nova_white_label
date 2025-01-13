import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Navbar, Nav, Badge } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import Footer from '../markup/Layout/Footer';

const Vendorregistration = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    company_name: '',
    created_on: '', // Created On field
    website: '', // Website field
    authorized_person: '', // Authorized Person field
    public_view_link: '', // Public View link field
    alternative_number: '', // Alternative Number field
    company_linkedin: '', // Company Linkedin field
    access: [], // Checkbox access options
  });
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      const isChecked = checked;
      const updatedAccess = isChecked
        ? [...formData.access, name]
        : formData.access.filter((item) => item !== name);
  
      setFormData({ ...formData, access: updatedAccess });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const response = await fetch('https://api.novajobs.us/api/admin/auth/vendor/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
  
        // Check if response is ok
        if (response.ok) {
            toast.success('Vendor registered successfully! Please check your email for verification.');
        } else {
            // Attempt to parse the error message from the response
            const errorData = await response.json();
            toast.error(errorData.message || 'Registration failed. Please try again.');
        }
    } catch (error) {
        toast.error('An unexpected error occurred. Please try again.');
        console.error('Error:', error); // Log the error for debugging
    }
};


  return (
    <div>
       <Navbar bg="white" variant="white" className='py-3 border-bottom'>
      <Navbar.Brand as={Link} to="/">
        <img
          style={{ width: "110px" }}
          src={require("../images/logo/NovaUS.png")}
          className="logo"
          alt="img"
        />
      </Navbar.Brand>

<ToastContainer/>
        <Nav className="ml-auto align-items-center">
          <Nav.Link href="/vendor/login" className="mr-4">
          
          <Button variant="primary" type="submit" className="  " style={{ backgroundColor: '#1C2957'}}>
                  Sign In
                </Button>
          </Nav.Link>

          
        </Nav>
    
    </Navbar>
      <Link to={"/"}
             className="dez-page d-flex justify-content-center mt-5">
                    <img style={{width:"210px"}}
                      src={require("../images/logo/NovaUS.png")}
                      className="logo"
                      alt="img"
                    />
                    </Link>
          <h3 className="text-center m-4">Vendor registration</h3>
       
          <Container fluid>
        <Row>
          
          <Col md={10} className='d-flex justify-content-center'>
          
            <Form onSubmit={handleSubmit} className='ms-5 ps-5'>
              <div className='d-flex gap-4'>
              <Form.Group controlId="formFirstName">
                <Form.Label className='mx-5'>First Name</Form.Label>
                <Form.Control
                className='w-100 p-4 mx-5'
                  type="text"
                  placeholder="Enter first name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label className='mx-5'>Last Name</Form.Label>
                <Form.Control
                className='w-100 p-4 mx-5'
                  type="text"
                  placeholder="Enter last name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              </div>
              <div className='d-flex gap-4'>
              <Form.Group controlId="formEmail">
                <Form.Label className='mx-5'>Email address</Form.Label>
                <Form.Control
                className='w-100 p-4 mx-5'
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label className='mx-5'>Phone</Form.Label>
                <Form.Control
                className='w-100 p-4 mx-5'
                  type="tel"
                  placeholder="Enter phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
             </div>

            <div className='d-flex gap-4'>
            <Form.Group controlId="formPassword">
                <Form.Label className='mx-5'>Password</Form.Label>
                <Form.Control
                className='w-100 p-4 mx-5'
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCompanyName">
                <Form.Label className='mx-5'>Company Name</Form.Label>
                <Form.Control
                className='w-100 p-4 mx-5'
                  type="text"
                  placeholder="Enter company name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              
            </div>
              <div className='d-flex gap-5'>
              <Form.Group controlId="formCreatedOn">
  <Form.Label className='mx-5'>Created On</Form.Label>
  <Form.Control
  className=' px- py-4 mx-5 pe-5'
    type="date"
    name="created_on"
    value={formData.created_on}
    onChange={handleChange}
    required
  />
</Form.Group>

<Form.Group controlId="formWebsite">
  <Form.Label className='mx-5'>Website</Form.Label>
  <Form.Control
  className='w-100 p-4 mx-5 ps-5'
    type="url"
    placeholder="Enter website URL"
    name="website"
    value={formData.website}
    onChange={handleChange}
  />
</Form.Group>
              </div>

<div className='d-flex gap-4'>
<Form.Group controlId="formAuthorizedPerson">
  <Form.Label className='mx-5'>Authorized Person</Form.Label>
  <Form.Control
  className='w-100 p-4 mx-5'
    type="text"
    placeholder="Enter authorized person"
    name="authorized_person"
    value={formData.authorized_person}
    onChange={handleChange}
  />
</Form.Group>

<Form.Group controlId="formPublicViewLink">
  <Form.Label className='mx-5'>Public View Link</Form.Label>
  <Form.Control
  className='w-100 p-4 mx-5'
    type="url"
    placeholder="Enter public view link"
    name="public_view_link"
    value={formData.public_view_link}
    onChange={handleChange}
  />
</Form.Group>
</div>

<div className='d-flex gap-4'><Form.Group controlId="formAlternativeNumber">
  <Form.Label className='mx-5'>Alternative Number</Form.Label>
  <Form.Control
  className='w-100 p-4 mx-5'
    type="tel"
    placeholder="Enter alternative number"
    name="alternative_number"
    value={formData.alternative_number}
    onChange={handleChange}
  />
</Form.Group>

<Form.Group controlId="formCompanyLinkedin">
  <Form.Label className='mx-5'>Company Linkedin</Form.Label>
  <Form.Control
  className='w-100 p-4 mx-5'
    type="url"
    placeholder="Enter company LinkedIn URL"
    name="company_linkedin"
    value={formData.company_linkedin}
    onChange={handleChange}
  />
</Form.Group></div>

<div className='d-flex gap-5'><Form.Group controlId="formAccess">
  <Form.Label className='mx-5'>Access</Form.Label>
  <Form.Check
  className='w-100 my-3 mx-5'
    type="checkbox"
    label="Jobs posting"
    name="A"
    checked={formData.access.includes('A')}
    onChange={handleChange}
  />
  <Form.Check
  className='w-100 my-3 mx-5'
    type="checkbox"
    label="Bulk Upload"
    name="A+"
    checked={formData.access.includes('A+')}
    onChange={handleChange}
  />
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Job seeker"
    name="B"
    checked={formData.access.includes('B')}
    onChange={handleChange}
  />
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Job seeker Bulk upload"
    name="B+"
    checked={formData.access.includes('B+')}
    onChange={handleChange}
  />
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Search Jobs"
    name="C"
    checked={formData.access.includes('C')}
    onChange={handleChange}
  />
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Dashboard"
    name="D"
    checked={formData.access.includes('D')}
    onChange={handleChange}
  />
</Form.Group>

<Form.Group controlId="formWhiteLabelPlans">
  <Form.Label className='mx-5' >White Label Plans</Form.Label>
  
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Skill Test"
    name="skill_test"
    checked={formData.access.includes('skill_test')}
    onChange={handleChange}
  />
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Resume Builder"
    name="resume_builder"
    checked={formData.access.includes('resume_builder')}
    onChange={handleChange}
  />
  <Form.Check
   className='w-100 my-3 mx-5'
    type="checkbox"
    label="Jobseeker access"
    name="jobseeker_access"
    checked={formData.access.includes('jobseeker_access')}
    onChange={handleChange}
  />
 
</Form.Group></div>


              <Button variant="primary" type="submit" className="m-5 ml-5 w-100" style={{ backgroundColor: '#1C2957'}}>
                Register
              </Button> 
              
            </Form>
            
          </Col>
            <div className='d-flex justify-content-center'>
            
            </div>
        </Row>
      </Container>
      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default Vendorregistration;
