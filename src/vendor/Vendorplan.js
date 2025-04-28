import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import VendorCompanySideBar from "./Vendorsidebar";
import Footer from "../markup/Layout/Footer";
import VendorHeader from "../markup/Layout/VendorHeader";

function Vendorplan() {
  return (
    <>
      <div className="page-content bg-white">
        {/* <Navbar bg="white" variant="white" className="py-3 border-bottom">
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "110px" }}
              src={require("../images/logo/NovaUS.png")}
              className="logo"
              alt="img"
            />
          </Navbar.Brand>

          <Nav className="ml-auto align-items-center"></Nav>
        </Navbar> */}
        <VendorHeader />
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <VendorCompanySideBar active="vendorplan" />
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Choose Your Plan
                      </h5>
                    </div>
                    <PricingContainer>
                      <PricingCard>
                        <CardHeader>
                          <h3>Free</h3>
                          <Price>
                            <span>$0</span>
                            <span>/month</span>
                          </Price>
                        </CardHeader>
                        <CardBody>
                          <FeatureList>
                            <li>✓ Basic job posting</li>
                            <li>✓ Up to 5 job listings</li>
                            <li>✓ Basic candidate search</li>
                            <li>✓ Email support</li>
                            <li>✓ Basic analytics</li>
                          </FeatureList>
                          <SelectButton>Current Plan</SelectButton>
                        </CardBody>
                      </PricingCard>

                      {/* <PricingCard featured>
                        <CardHeader>
                          <h3>Professional</h3>
                          <Price>
                            <span>$49</span>
                            <span>/month</span>
                          </Price>
                        </CardHeader>
                        <CardBody>
                          <FeatureList>
                            <li>✓ Unlimited job postings</li>
                            <li>✓ Advanced candidate search</li>
                            <li>✓ Priority support</li>
                            <li>✓ Advanced analytics</li>
                            <li>✓ Custom branding</li>
                            <li>✓ ATS integration</li>
                          </FeatureList>
                          <SelectButton primary>Upgrade Now</SelectButton>
                        </CardBody>
                      </PricingCard>

                      <PricingCard>
                        <CardHeader>
                          <h3>Enterprise</h3>
                          <Price>
                            <span>Custom</span>
                          </Price>
                        </CardHeader>
                        <CardBody>
                          <FeatureList>
                            <li>✓ All Professional features</li>
                            <li>✓ Dedicated account manager</li>
                            <li>✓ API access</li>
                            <li>✓ Custom integrations</li>
                            <li>✓ White-label solution</li>
                            <li>✓ SLA guarantee</li>
                          </FeatureList>
                          <SelectButton>Contact Sales</SelectButton>
                        </CardBody>
                      </PricingCard> */}
                    </PricingContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const PricingContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  padding: 2rem 0;
`;

const PricingCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: ${props => props.featured ? '2px solid #1C2957' : '1px solid #e0e0e0'};
  transform: ${props => props.featured ? 'scale(1.05)' : 'none'};

  &:hover {
    transform: ${props => props.featured ? 'scale(1.08)' : 'scale(1.03)'};
  }
`;

const CardHeader = styled.div`
  background: ${props => props.featured ? '#1C2957' : '#f8f9fa'};
  color: ${props => props.featured ? 'white' : '#333'};
  padding: 2rem;
  text-align: center;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Price = styled.div`
  margin-top: 1rem;
  
  span:first-child {
    font-size: 2.5rem;
    font-weight: 700;
  }
  
  span:last-child {
    font-size: 1rem;
    color: #666;
  }
`;

const CardBody = styled.div`
  padding: 2rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;

  li {
    padding: 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.primary ? '#1C2957' : '#f8f9fa'};
  color: ${props => props.primary ? 'white' : '#333'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#161f3f' : '#e9ecef'};
  }
`;

export default Vendorplan;
