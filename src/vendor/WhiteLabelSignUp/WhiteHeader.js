// import React from "react";
// import styled from "styled-components";

// const HeaderContainer = styled.div`
//   text-align: left;
//   margin-bottom: 40px;
// `;

// const Title = styled.h1`
//   font-size: 50px;
//   font: bold;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     font-size: 36px;
//   }
// `;

// const SubText = styled.p`
//   width: 50%;
//   font-size: 16px;
//   color: #666;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     width: 100%;
//   }
// `;

// const CountrySelector = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   margin-top: 20px;
// `;

// const Header = () => {
//   return (
//     <HeaderContainer>
//       <Title>Sign Up For Your </Title>
//       <Title>Free Trial</Title>
//       <SubText>
//         Start your Novajobs trial today, by choosing the subscription best for
//         your needs. Click on 'Start Free Trial' below...
//       </SubText>
//       {/* <CountrySelector>
//         Country Selector —
//         <span>🇺🇸 USA</span>
//       </CountrySelector> */}
//     </HeaderContainer>
//   );
// };

// export default Header;

"use client";

import React from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SubText = styled.p`
  width: 50%;
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  background-color: #1c2957;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #0066ff;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate("/vendor/subscription");
  };

  return (
    <HeaderContainer>
      <div className="d-flex justify-content-between">
        <div>
          <Title>Sign Up For Your</Title>
          <Title>Free Trial</Title>
          <SubText>
            Start your Novajobs trial today, by choosing the subscription best
            for your needs. Click on 'Start Free Trial' below...
          </SubText>
        </div>
        <div>
          <Button onClick={handleSubscribe}>Subscription Plan</Button>
        </div>
      </div>
    </HeaderContainer>
  );
};

export default Header;
