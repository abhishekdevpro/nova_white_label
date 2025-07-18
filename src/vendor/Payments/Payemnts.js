import React, { useState } from "react";
import styled from "styled-components";
import { Bell, CheckCircle, Clock, DollarSign, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import VendorHeader from "../../markup/Layout/VendorHeader";

// Styled Components
const PricingContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Arial", sans-serif;
`;

const PageTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
    margin: 0 auto;
  }
`;

const PlanCard = styled.div`
  border: 1px solid ${(props) => (props.selected ? "#1C2957" : "#E0E0E0")};
  border-radius: 12px;
  padding: 1.5rem;
  background-color: ${(props) => (props.selected ? "#F0FFF0" : "white")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PlanTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1c2957;
  margin-bottom: 1rem;
`;

const PlanDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
  min-height: 60px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #333;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => (props.selected ? "#1C2957" : "#2196F3")};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.selected ? "#45a049" : "#1976D2")};
  }
`;
const FeatureSection = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NextButton = styled.button`
  width: 100%;
  background-color: #1c2957;
  color: white;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.75rem;
  transition: background-color 0.3s;
`;

// Pricing Data
const pricingData = [
  // {
  //   id: 1,
  //   title: "NovaJobs Start",
  //   price: "Free",
  //   description: "Best-in-class recruitment website package, with integrated job board.",
  //   features: [
  //     "Unlimited Job post",
  //     "Upload and manage job openings",
  //     "Basic Candidate Management",
  //     "Community Access",
  //     "Engage in a forum for recruiters and job seekers",
  //     "Basic Reporting",
  //     "View simple metrics like job views",
  //     "Branding pages"
  //   ]
  // },
  {
    id: 2,
    title: "Nova Pro",
    price: "$99/month",
    description:
      "For larger recruitment websites, including an hour of Web Care every month.",
    features: [
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
  },
  {
    id: 3,
    title: "Nova Enterprise",
    price: "$199/month",
    description:
      "Integrate your CRM, ATS, or Multi-Poster to automatically import your jobs.",
    features: [
      "All Nova Pro Features",
      "Digital Marketing",
      "Nova Database access",
      "WhiteLabel everything under your brand",
      "Priority Customer Support",
      "Admin Panel",
    ],
  },
];

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  const Feature = ({ icon, title, description }) => (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "start" }}>
      <div style={{ marginTop: "0.25rem" }}>{icon}</div>
      <div>
        <p style={{ fontWeight: 600 }}>{title}</p>
        <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>{description}</p>
      </div>
    </div>
  );

  return (
    <>
      <VendorHeader />
      <PricingContainer>
        <PageTitle>Choose Your NovaJobs Plan</PageTitle>
        <PlansGrid>
          {pricingData.map((plan) => (
            <PlanCard
              key={plan.id}
              selected={selectedPlan === plan.id}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <PlanTitle>{plan.title}</PlanTitle>
              <PlanPrice>{plan.price}</PlanPrice>
              <PlanDescription>{plan.description}</PlanDescription>

              <FeatureList>
                {plan.features.map((feature, index) => (
                  <FeatureItem key={index}>
                    <CheckCircle
                      size={20}
                      color="#1C2957"
                      style={{ marginRight: "0.5rem" }}
                    />
                    {feature}
                  </FeatureItem>
                ))}
              </FeatureList>

              <SelectButton
                selected={selectedPlan === plan.id}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {selectedPlan === plan.id ? "Selected" : "Select Plan"}
              </SelectButton>
            </PlanCard>
          ))}
        </PlansGrid>
        <div style={{ marginTop: "2rem" }}>
          <FeatureSection>
            {/* <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: 600, 
              marginBottom: '1rem', 
              textAlign: 'center' 
            }}>
              All subscription features
            </h3> */}
            {/* <FeatureGrid>
              <Feature
                icon={<CheckCircle color="#4A1D96" />}
                title="AI-Powered Job Matching"
                description="Get real-time job recommendations tailored to your skills and experience."
              />
              <Feature
                icon={<RefreshCw color="#4A1D96" />}
                title="ATS-Optimized Resumes"
                description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS)."
              />
              <Feature
                icon={<Bell color="#4A1D96" />}
                title="Instant Job Alerts"
                description="Stay ahead with real-time notifications about new job openings that match your profile."
              />
              <Feature
                icon={<Clock color="#4A1D96" />}
                title="Expert Resume Assistance"
                description="Get personalized resume reviews and improvements from industry professionals."
              />
              <Feature
                icon={<DollarSign color="#4A1D96" />}
                title="Career Community & Networking"
                description="Connect with industry peers, mentors, and recruiters to enhance your career opportunities."
              />
              <Feature
                icon={<CheckCircle color="#4A1D96" />}
                title="One-Click Applications"
                description="Apply faster and more efficiently with seamless, single-click job applications."
              />
            </FeatureGrid> */}

            <div style={{ marginTop: "1.5rem" }}>
              <Link to={`/vendor/payment/plans?selectedPlan=${selectedPlan}`}>
                <NextButton>Next</NextButton>
              </Link>

              {/* <p style={{ 
                color: '#6B7280', 
                textAlign: 'center', 
                marginTop: '1rem' 
              }}>
                <strong>Got questions?</strong> Contact our customer support.
              </p>
              
              <p style={{ 
                color: '#6B7280', 
                textAlign: 'center' 
              }}>
                You may cancel via email at{" "}
                <a
                  href="mailto:customersupport@Abroadium.com"
                  style={{ color: '#2563EB', textDecoration: 'underline' }}
                >
                  customersupport@Abroadium.com
                </a>
                .
              </p> */}
            </div>
          </FeatureSection>
        </div>
      </PricingContainer>
    </>
  );
}
