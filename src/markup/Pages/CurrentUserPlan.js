import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header2 from "./../Layout/Header2";
import axios from "axios";
import Footer from "./../Layout/Footer";
import Profilesidebar from "./../Element/Profilesidebar";
import styled from "styled-components";
import { toast } from "react-toastify";
import { plans } from "./Payments/Plan";

function CurrentUserPlan() {
  const token = localStorage.getItem("jobSeekerLoginToken");

  const [currentPlan, setCurrentPlan] = useState(1);
  const [isactivePlan,setIsActivePlan] = useState(false)
  const [loading, setLoading] = useState(true);

  const getReq = () => {
    axios({
      method: "GET",
      url: "https://apiwl.novajobs.us/api/jobseeker/user-profile",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        const data = response.data.data;
        const userPlanId = data?.plan_id;
        setIsActivePlan(data?.is_active_plan)

        // Match plan_id with static plans array
        const matchedPlan = plans.find(
          (plan) => plan.plan_id === userPlanId?.toString()
        );

        if (matchedPlan) {
          setCurrentPlan(matchedPlan);
        } else {
          toast.error("Your current plan could not be identified.");
        }

        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Failed to load user profile."
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    getReq();
  }, []);

  return (
    <>
      <Header2 />
      <div className="page-content bg-white">
        <div className="content-block">
          <div className="section-full bg-white browse-job p-t50 p-b20">
            <div className="container">
              <div className="row">
                <Profilesidebar data={"currentplan"} />
                <div className="col-xl-9 col-12 m-b30">
                  <div className="job-bx job-profile">
                    <div className="">
                      <div className="job-bx-title clearfix d-flex flex-column gap-2 ">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Your Current Plan
                        </h5>
                        <p className="text-danger small">{isactivePlan?"":"You have no active plan. Upgrade it now"}</p>
                      </div>
                       
                       <h5 className="text-muted ">
                         {isactivePlan ? " " : "Recommended Plan for you"}
                       </h5>
                      <PricingContainer>
                        {loading ? (
                          <div>Loading...</div>
                        ) : currentPlan ? (
                          <PricingCard featured={currentPlan.isPopular}>
                            <CardHeader featured={currentPlan.isPopular}>
                              <h3 className="text-white">{currentPlan.name}</h3>
                              <Price>
                                <span>${currentPlan.price}</span>
                                <span className="text-white">/month</span>
                              </Price>
                            </CardHeader>
                            <CardBody>
                              <FeatureList>
                                {currentPlan.features.map((feature, index) => (
                                  <li key={index}>✓ {feature}</li>
                                ))}
                              </FeatureList>

                              <Link to="/user/payment-plans">
                                <SelectButton>Upgrade your Plan</SelectButton>
                              </Link>
                            </CardBody>
                          </PricingCard>
                        ) : (
                          <>
                            <div>
                              <p className="mb-4">No plan data available.</p>

                              <Link to="/user/payment-plans">
                                <SelectButton>Upgrade your Plan</SelectButton>
                              </Link>
                            </div>
                          </>
                        )}
                      </PricingContainer>
                    </div>
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

export default CurrentUserPlan;
