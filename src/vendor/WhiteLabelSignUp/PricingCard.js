import React from "react";
import styled from "styled-components";
import VendorPartnershipForm from "../WhiteLabel/Form";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  padding: 30px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PlanTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Price = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;

  span {
    font-size: 16px;
    color: #666;
  }
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 20px;
  min-height: 60px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0066ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background: #0052cc;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Feature = styled.li`
  padding: 8px 0;
  color: #444;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;
const Modal = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1000px;
  max-height: 90vh; /* Limits the modal's height */
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  z-index: 1000;
  overflow-y: auto; /* Enables vertical scrolling */
`;

const Backdrop = styled.div`
  display: ${(props) => (props.isActive ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 2px solid #ddd;
  background-color: #f8f8f8;
  border-radius: 8px 8px 0 0;
`;

// Title style (h2)
const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

// Close button (X icon)
const CloseButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: #888;
  transition: color 0.3s;

  &:hover {
    color: #f44336;
  }
`;

// const PricingCard = ({ title, price, description, features, isActive, openModal, closeModal }) => {
//   return (
//     <>
//       <Card>
//         <PlanTitle>{title}</PlanTitle>
//         <Price>
//           ${price} <span>per month</span>
//         </Price>
//         <Description>{description}</Description>
//         <Button onClick={openModal}>Start 14-Day Free Trial</Button>
//         <FeatureList>
//           {features.map((feature, index) => (
//             <Feature key={index}>{feature}</Feature>
//           ))}
//         </FeatureList>
//       </Card>

//       <Backdrop isActive={isActive} onClick={closeModal} />
//       <Modal isActive={isActive}>
//       <HeaderContainer>
//       <Title>{title} Plan</Title>
//       <CloseButton onClick={closeModal}>
//         <X  />
//       </CloseButton>
//     </HeaderContainer>
//         <VendorPartnershipForm />
//       </Modal>
//     </>
//   );
// };

// export default PricingCard;
const PricingCard = ({
  key,
  title,
  price,
  description,
  features,
  isActive,
  openModal,
  closeModal,
}) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleButtonClick = () => {
    const vendorToken = localStorage.getItem("vendorToken"); // Assuming token is stored in localStorage
    if (vendorToken) {
      openModal(); // Open the form modal if token exists
    } else {
      navigate("/vendor/login"); // Redirect to login page if no token
    }
  };

  return (
    <>
      <Card>
        <PlanTitle>{title}</PlanTitle>
        {price === "Free" ? "For Freelancers/Individuals" : ""}
        <Price>
          {price} <span>per month</span>
        </Price>
        {/* <Description>{description}</Description> */}
        <Button onClick={handleButtonClick}>
          {price === "Free" ? "Start Free Trial" : "Buy Now"}
        </Button>
        <FeatureList>
          {features.map((feature, index) => (
            <Feature key={index}>{feature}</Feature>
          ))}
        </FeatureList>
      </Card>

      <Backdrop isActive={isActive} onClick={closeModal} />
      <Modal isActive={isActive}>
        <HeaderContainer>
          <Title>{title} Plan</Title>
          <CloseButton onClick={closeModal}>
            <X />
          </CloseButton>
        </HeaderContainer>
        <VendorPartnershipForm />
      </Modal>
    </>
  );
};

export default PricingCard;
