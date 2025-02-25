import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Header from './../Layout/Header';
import Footer from './../Layout/Footer';
import Latestblogowl from './../Element/Owlblog2';
import "./aboutus.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Slider from "react-slick"; // Assuming you are using react-slick for the slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import web1 from './resume/templateimages/template10.png'
import web2 from './resume/templateimages/template9.png'
import web3 from './resume/templateimages/template5.png'
import web4 from './resume/templateimages/template8.png'
import web5 from './resume/templateimages/template1.png'
import chat from './resume/chat.webp'
import google from './resume/Google-Logo-PNG-Picture-1024x427.png'
import rating from './resume/rating.png'
import telephone from './resume/telephone.webp'
import works_1 from './resume/works_1.png'
import works_2 from './resume/works_2.png'
import works_3 from './resume/works_3.png'
import axios from "axios";
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Aboutus(){
	const [token, setToken] = useState(null);
	
	
	useEffect(() => {
		const storedToken = localStorage.getItem("jobSeekerLoginToken");
		if (storedToken) {
		  console.log("Stored token:", storedToken); // Log the stored token when component mounts
		  setToken(storedToken);
		}
	  }, []);


    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      amount: 9.99
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://apiwl.novajobs.us/api/jobseeker/payment/create-checkout-session', formData);
        console.log(response.data);
        const data = response.data;
        if (data && data.data) {
          // Redirect to the PayPal URL provided in the response
          window.location.href = data.data;
        }
      
        // Handle successful response here
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error here
      }
    };

	  const handleChoosePlan = () => {
      
        if(!token){
            window.location.href="/user/login";
            return;
        }
		else{
			window.location.href=`https://airesume.novajobs.us/${token}`;
		}
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
		  {
			breakpoint: 768, // Mobile breakpoint
			settings: {
			  slidesToShow: 1,
			  slidesToScroll: 1,
			},
		  },
		],
	  };

	return(
		<div className="page-wraper d-flex row justify-content-center">		
			<Header />	
			
        <div className="banner1 d-flex row justify-content-center">
          <div className="top-header ">
            <h3>Professional Resume Writing By Industry Experts</h3>
          </div>
          <div className="banner-content ">
            <div className="heading">
			
              <h1 className="hero-heading">Increase visibility,  <br />  get hired. </h1>
              <h2 className="sub-hero">Unleash the power of your professional narrative with Reachmore Resume Writing Services - where your career ambitions meet expertly crafted resumes for unparalleled impact. More than just words on a page, Reachmore amplifies your career potential with a strategic blend of precision and dynamism.</h2>
              <h2 className="price">From $ 9.99 only</h2>
              <div className="banner-btn">
                <a href="accessibility-center" className='text-black'> Avail Now</a>
                <a href="accessibility-center" className="btn-text">Get Free Resume Review</a>
              </div>
            </div>
          </div>
        </div>
        <div className="google" style={{textAlign: '-webkit-center'}}>
          <div className="google-content">
            <div className="google-review">
              <div className="google-img">
                <img src={google} />
              </div>
              <div className="rating">
                <img src={rating} />
              </div>
              <h2>4.9 out of 5 with 94 reviews</h2>
            </div>
           
          </div>
        </div>
		
		 <div className="testimonials">
      <div className="container">
        <div className="global-heading">
          <h2>Job-winning resume templates</h2>
        </div>
        <div className="test-section ">
          <Slider {...settings}>
            <div>
              <div className="slideCopy-container">
                <div className="slideCopy-content">
                  <div className="resume-img">
                    <img src={web1} alt="Resume Template 1" style={{height:"340px"}}/>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="slideCopy-container">
                <div className="slideCopy-content">
                  <div className="resume-img">
                    <img src={web2} alt="Resume Template 2"  style={{height:"340px"}} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="slideCopy-container">
                <div className="slideCopy-content">
                  <div className="resume-img">
                    <img src={web3} alt="Resume Template 3"  style={{height:"340px"}} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="slideCopy-container">
                <div className="slideCopy-content">
                  <div className="resume-img">
                    <img src={web4} alt="Resume Template 4"  style={{height:"340px"}} />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="slideCopy-container">
                <div className="slideCopy-content">
                  <div className="resume-img">
                    <img src={web5} alt="Resume Template 5"  style={{height:"340px"}} />
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>

        <div className="testimonials">
          <div className="container">
            <div className="global-heading">
              <h2>Our Special Features. <span>Even more reasons to shop with us.</span></h2>
            </div>
            <div className="services">
              <div className="service-section">
                <div className="service-img">
                  <i className="fa fa-people-arrows " />
                </div>
                <div className="service-text">
                  <h3>Personalized Attention</h3>
                  <p>Our resume writing service provides personalized attention to ensure that your unique skills and experiences are highlighted in your resume.</p>
                </div>
              </div>
              <div className="service-section">
                <div className="service-img">
                  <i className="fa fa-solid fa-bolt" />
                </div>
                <div className="service-text">
                  <h3>ATS Optimization</h3>
                  <p>We use industry-specific keywords in your resume to optimize it for (ATS), which are commonly used by employers to screen job applications.</p>
                </div>
              </div>
              <div className="service-section">
                <div className="service-img">
                  <i aria-hidden="true" className="fa fa-lock" />
                </div>
                <div className="service-text">
                  <h3>Confidentiality and Privacy</h3>
                  <p>We understand that your job search can be sensitive, and we take confidentiality and privacy seriously. </p>
                </div>
              </div>
              <div className="service-section">
                <div className="service-img">
                  <i className="fa fa-solid fa-clock" />
                </div>
                <div className="service-text">
                  <h3>Guaranteed Satisfaction</h3>
                  <p>We are confident in the quality of our work and stand behind our resume writing service with a satisfaction guarantee.</p>
                </div>
              </div>
              <div className="service-section">
                <div className="service-img">
                  <i aria-hidden="true" className="elementkit-infobox-icon fa fa-keyboard" />
                </div>
                <div className="service-text">
                  <h3>Keyword Optimization</h3>
                  <p>This increases the chances of your resume being seen by hiring managers and can help you get noticed in a competitive job market.</p>
                </div>
              </div>
              <div className="service-section">
                <div className="service-img">
                  <i className="fa fa-headset" />
                </div>
                <div className="service-text">
                  <h3>24/7 Customer Support</h3>
                  <p>We offer 24/7 customer support, our team is available to assist you at any time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonials">
          <div className="container">
            <div className="global-heading">
              <h3>Process</h3>
              <h2>How it Works?</h2>
            </div>
            <div className="column-section">
              <div className="three-text">
                <div className="works-content">
                  <div className="first">
                    <img src={works_1} />
                    <h3>Discussion</h3>
                    <p>Once the payment is done, a professional resume writer will be assigned to you who will then reach out to discuss your expectations and ask for relevant details.</p>
                  </div>
                </div>
                <div className="works-content">
                  <div className="first">
                    <img src={works_2} />
                    <h3 className="color2">First Draft</h3>
                    <p>You'll receive the first draft of your new resume to review and offer feedback on, based on the information shared during your consultation call.</p>
                  </div>
                </div>
                <div className="works-content">
                  <div className="first">
                    <img src={works_3} />
                    <h3 className="color3">Final File</h3>
                    <p>After incorporating your feedback and making the necessary revisions, the writer will provide you with the final version of your resume.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonials">
          <div className="container">
            <div className="global-heading">
              <h3>Pricing</h3>
              <h2>Level <span>Which is right for you?</span></h2>
            </div>
            <div className="column-section">
              <div className="three-text">
                
                <div className="works-content">
                  <div className="first">
                    <h2 className="junior">AI Resume</h2>
                    <h2 className="hero hero2">$ 1.99</h2>
                    <h2 className="section-title hero2"></h2>
                  
					<h2 className="size-default">✔️ AI Assistance</h2>
					<h2 className="size-default">✔️ Fully Automatic</h2>
					<h2 className="size-default">✔️ Immediate download</h2>
                    
                    <div className="price-btn">
					<button href className='text-white bg-black px-4 py-2  rounded-pill' onClick={handleChoosePlan}>Buy</button>
                      
                    </div>
                  </div>
                </div>
                <div className="works-content">
                  <div className="first">
                    <h2 className="junior">AI Resume by Expert</h2>
                    <h2 className="hero hero2">$ 9.99</h2>
					<h2 className="size-default">✔️ One page resume  </h2>
					<h2 className="size-default">✔️ Delivered in one day </h2>
					<h2 className="size-default">✔️ AI & ATS Compatible</h2>
                    <div className="price-btn">
                    <button className='text-white bg-black px-4 py-2  rounded-pill' onClick={() => setShowModal(true)}>Buy</button>
                    
                    </div>
                  </div>
                </div>
                <div className="works-content">
        <div className="first">
          <h2 className="junior">AI Resume by Expert Senior.</h2>
          <h2 className="hero hero2">$ 19.99</h2>
          <h2 className="size-default">✔️ Multiple page resume  </h2>
          <h2 className="size-default">✔️ Delivered in two day </h2>
          <h2 className="size-default">✔️ AI & ATS Compatible</h2>
          <div className="price-btn">
          <a href className='text-white'>Buy</a>
          </div>
        </div>
      </div>

     

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title >💳 Payment Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                name="amount"
                placeholder="$"
                value={formData.amount}
                readOnly
              />
            </Form.Group>
            <Button variant="success" className="me-4" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonials">
          <div className="container">
            <div className="global-heading">
              <h2>Need assistance?</h2>
              <h3>Connect with our Experts (Quick response)</h3>
            </div>
            
          </div>
        </div>
      
			<Footer />
		</div>	
	)
	
}
export default Aboutus;