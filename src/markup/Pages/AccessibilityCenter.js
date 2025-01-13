import React, { useState, useEffect ,useRef} from "react";
import Header from "./../Layout/Header";
import Footer from "./../Layout/Footer";
import './aboutuscopy.css'



import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Form, Button } from 'react-bootstrap';

function AccessibilityCenter() {

    const fileInputRef = useRef(null);

    const handleFileChange = () => {
      // Custom file input handling
    };
  
    return (
        <>
            <Header />
            <div className="testimonials">
      <Container>
        <div className="contact-form border">
          <div className="contact-head">
            <h2>
              How strong is your resume? <br />
              <span>Get a free, confidential review from a resume expert.</span>
            </h2>
          </div>
          <div className="form-area">
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  id="mobile_code"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                />
              </Form.Group>
              <div className="custom-file-container" data-upload-id="myUniqueUploadId">
                <label
                  style={{ display: 'none',color:"black" }}
                  cl
                >
                  Upload File
                  <a
                    href="#"
                    className="custom-file-container__image-clear"
                    title="Clear Image"
                    onClick={() => fileInputRef.current && (fileInputRef.current.value = '')}
                  >
                    &times;
                  </a>
                </label>
               
                <label className="custom-file-container__custom-file"> uplaod File
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="custom-file-container__custom-file__custom-file-input"
                    accept="*"
                    multiple
                    aria-label="Choose File"
                    onChange={handleFileChange}
                  />
                 
                </label>
                <div className="custom-file-container__image-preview">
                  {/* Optionally, you can display a preview of the selected image */}
                </div>
              
                <div className="custom-file-container__image-preview"></div>
              </div>
              <div className="submit-btn mt-3">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </div>
            <Footer />
        </>
    );
}

export default AccessibilityCenter;
