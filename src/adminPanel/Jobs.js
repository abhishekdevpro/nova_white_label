import React, { useEffect, useState } from 'react';
import { Container, Row, Col ,Dropdown} from 'react-bootstrap';
import { setPostAJobData } from '../store/reducers/postAJobSlice';
import CustomNavbar from './Navbar';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  Card } from 'react-bootstrap';
import { FaStore, FaUsers } from 'react-icons/fa';

import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';

const Jobs = () => {
  const token = localStorage.getItem("authToken");
  //   const [res.data.data, setres.data.dataa] = useState({})

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const postJob = async () => {
    await axios({
      url: "https://apiwl.novajobs.us/api/admin/job-post",
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data.data, "job");
        // setres.data.dataa(res.data.data);
        dispatch(
          setPostAJobData({
            jobTitle: res.data.data.job_title,
            company: res.data.data.country_id,
            workplaceType: res.data.data.workplace_type_id,
            // location: res.data.data.,
            jobType: res.data.data.job_type_id,
            description: res.data.data.job_description,
            // education: res.data.data.,
            // qualificationSetting: res.data.data.,
            selectedCity: res.data.data.city_id,
            selectedState: res.data.data.state_id,
            selectedCountry: res.data.data.country_id,
          })
        );
        // dispatch(setSkillsData(res.data.data.skills_arr))
        navigate(`/admin/addjob/${res.data.data.id}`);
      })
      .catch((err) => {
        console.log(err, "joy");
      });
  };

  return (
    <div>
      <CustomNavbar />
      <Container fluid >
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          <Col md={10}>
            <p> <FaStore className='mx-1' /> / Jobs</p>
            <Row className='d-flex justify-content-center mt-5' >
              <Col md={5} className='text-center ' >
                <Link to="/admin/listalljobs" className="card-link">
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body>
                      <FaUsers className="display-4" />
                      <Card.Title>List All</Card.Title>
                    
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              <Col md={5} className='text-center'>
                <Link  className="card-link"  onClick={postJob}>
                  <Card className="box-card w-75 border rounded-4" style={{ fontSize: '1.5rem', fontWeight:'500', color:'white', backgroundColor:'#1C2957' }}>
                    <Card.Body >
                      <FaStore className="display-4"/><br/>
                      <Card.Title>Add Jobs</Card.Title>
                      
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

export default Jobs;
