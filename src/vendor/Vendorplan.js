import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import VendorCompanySideBar from "./Vendorsidebar";
import Footer from "../markup/Layout/Footer";
import VendorHeader from "../markup/Layout/VendorHeader";
import axios from "axios";
import { Button } from "react-bootstrap";

function Vendorplan() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const planName = {
    1: "NovaJobs Start",
    2: "Nova Pro",
    3: "Nova Enterprise",
  };

  const planFeatures = {
    1: [
      "Unlimited Job post",
      "Upload and manage job openings",
      "Basic Candidate Management",
      "Community Access",
      "Engage in a forum for recruiters and job seekers",
      "Basic Reporting",
      "View simple metrics like job views",
      "Branding pages",
    ],
    2: [
      "All Nova Start Features",
      "Jobseeker self help portal",
      "Resume Builder",
      "Skill Test for Jobseeker",
      "Basic Applicant Tracking System (ATS)",
      "Messaging",
      "Custom Email Notifications",
      "Mobile-Responsive Design",
      "Payment gateway",
    ],
    3: [
      "All Nova Pro Features",
      "Digital Marketing",
      "Nova Database access",
      "WhiteLabel everything under your brand",
      "Priority Customer Support",
      "Admin Panel",
    ],
  };

  const planPrices = {
    1: "Free",
    2: "$99/month",
    3: "$199/month",
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        const response = await axios.get(
          "https://apiwl.novajobs.us/api/admin/vendor/user-profile",
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          setUserData(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const currentPlanId = userData?.vendors_detail?.plan_id===1? 2 : userData?.vendors_detail?.plan_id;
  const currentPlanName = planName[currentPlanId];
  const currentPlanFeatures = planFeatures[currentPlanId];
  const currentPlanPrice = planPrices[currentPlanId];
  const isActivePlan = userData?.vendors_detail?.is_active_plan || false;
  const isFreePlan = currentPlanId === 1;
  const shouldShowFeatured = isActivePlan || isFreePlan; // Show featured styling for active plan OR free plan
  return (
    <>
      <div className="page-content bg-white">
        
        <VendorHeader />
        <div className="content-block">
          <div className="section-full bg-white p-t50 p-b20">
            <div className="container">
              <div className="row">
                <VendorCompanySideBar active="vendorplan" />
                <div className="col-xl-9 col-12 m-b30">
                  <div className="job-bx table-job-bx clearfix">
                    <div className="job-bx-title clearfix d-flex flex-column gap-2">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Your Current Plan
                      </h5>
                     <p className="text-danger small">{isActivePlan ?"":"You have no active plan. Upgrade it now"}</p>
                    </div>

                     <h5 className="text-muted ">
                         {isActivePlan ? " " : "Recommended Plan for you"}
                       </h5>
                    <PricingContainer>
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        <PricingCard featured={shouldShowFeatured}>
                          <CardHeader featured={shouldShowFeatured}>
                            <h3 className="text-white">{currentPlanName}</h3>
                            <Price>
                              <span>
                                {currentPlanPrice === "Free"
                                  ? "$0"
                                  : currentPlanPrice.split("/")[0]}
                              </span>
                              <span className="text-white">
                                {currentPlanPrice === "Free"
                                  ? "/month"
                                  : "/month"}
                              </span>
                            </Price>
                          </CardHeader>
                          <CardBody>
                            <FeatureList>
                              {currentPlanFeatures.map((feature, index) => (
                                <li key={index}>✓ {feature}</li>
                              ))}
                            </FeatureList>
                            {/* <SelectButton primary={isActivePlan}>
                              {isActivePlan ? "Current Plan" : "Inactive Plan"}
                            </SelectButton> */}
                            <Link to="/vendor/payments">
                              <SelectButton>Upgrade your Plan </SelectButton>
                            </Link>
                          </CardBody>
                        </PricingCard>
                      )}

                    
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
  width: 100%;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: "2px solid #1C2957";
  transform: "scale(1.05)";

  &:hover {
    transform: "scale(1.08)";
  }
`;

const CardHeader = styled.div`
  background: #1c2957;
  color: white;
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
  background-color: #1c2957;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;
export default Vendorplan;
