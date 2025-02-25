// import React from 'react';
// import styled from 'styled-components';
// import PricingCard from './PricingCard';

// const PlansContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 30px;
  
//   @media (max-width: 1024px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// const plans = [
//   { id:1,
//     title: 'Connect',
//     price: 100,
//     description: 'Best-in-class recruitment website package, with integrated job board.',
//     features: [
//       'Up to 50 Jobs',
//       'Up to 20 Pages',
//       '10GB Disk Space',
//       'No Set-Up Fee',
//       'Full CMS Access',
//       'Unlimited Support'
//     ]
//   },
//   {
//     id:2,
//     title: 'Pro',
//     price: 150,
//     description: 'For larger recruitment websites, including an hour of Web Care every month.',
//     features: [
//       'Up to 100 Jobs',
//       'Up to 30 Pages',
//       '20GB Disk Space',
//       'Google For Jobs',
//       'Google Indexing API Integration',
//       '1hr Web Care'
//     ]
//   },
//   { id:3,
//     title: 'VIP',
//     price: 220,
//     description: 'Integrated your CRM, ATS or Multi-Poster to automatically import your jobs.',
//     features: [
//       'Unlimited Jobs',
//       'Unlimited Pages',
//       '50GB Disk Space',
//       'CRM Integration',
//       'Multi-Poster Integration',
//       'AI SEO Add-On',
//       'Advanced Traffic Insights',
//       '2 hrs Web Care'
//     ]
//   }
// ];

// const PricingPlans = () => {
//   return (
//     <PlansContainer>
//       {plans.map((plan) => (
//         <PricingCard key={plan.title} {...plan} />
//       ))}
//     </PlansContainer>
//   );
// };

// export default PricingPlans;
import React, { useState } from "react";
import styled from "styled-components";
import PricingCard from "./PricingCard";

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const plans = [
  {
    id: 1,
    title: "NovaJobs Start",
    price: "Free",
    description: "Best-in-class recruitment website package, with integrated job board.",
    features: [
      "Unlimited Job post",
      "Upload and manage job openings",
      "Basic Candidate Management",
      "Community Access",
      "Engage in a forum for recruiters and job seekers",
      "Basic Reporting",
      "View simple metrics like job views",
      "Branding pages"
    ]
  },
  {
    id: 2,
    title: "Nova Pro",
    price: "$99/month",
    description: "For larger recruitment websites, including an hour of Web Care every month.",
    features: [
      "All Nova Start Features",
      "Jobseeker self help portal",
      "Resume Builder",
      "Skill Test for Jobseeker",
      "Basic Applicant Tracking System (ATS)",
      "Messaging",
      "Custom Email Notifications",
      "Mobile-Responsive Design",
      "Payment gateway"
    ]
  },
  {
    id: 3,
    title: "Nova Enterprise",
    price: "$199/month",
    description: "Integrate your CRM, ATS, or Multi-Poster to automatically import your jobs.",
    features: [
      "All Nova Pro Features",
      "Digital Marketing",
      "Nova Database access",
      "WhiteLabel everything under your brand",
      "Priority Customer Support",
      "Admin Panel"
    ]
  },
];

const PricingPlans = () => {
  const [activeModalId, setActiveModalId] = useState(null);

  const openModal = (id) => setActiveModalId(id);
  const closeModal = () => setActiveModalId(null);

  return (
    <>
      <PlansContainer>
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            {...plan}
            isActive={activeModalId === plan.id}
            openModal={() => openModal(plan.id)}
            closeModal={closeModal}
          />
        ))}
      </PlansContainer>
    </>
  );
};

export default PricingPlans;
