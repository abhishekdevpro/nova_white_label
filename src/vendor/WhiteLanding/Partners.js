import React from 'react';
import styled from 'styled-components';
import ultraLogo from "../../vendor/assests/ultraLogo.png"
import novalogo from '../../vendor/assests/NovaLoog.png'
import homecare from "../../vendor/assests/homecare.png"
import para from '../../vendor/assests/para.png'


const Partners = () => {
    const PartnersSection = styled.section`
  background-color: #0a1435;
  padding: 4rem 2rem;
  width: 100%;
`;

const PartnersGrid = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
`;

 const PartnerLogo = styled.img`
  height: 40px;
  object-fit: cover;
  // filter: brightness(0) invert(1);
  // opacity: 0.8;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

  const partners = [
    { name: 'Bullhorn', logo: ultraLogo },
    { name: 'Vincere', logo: novalogo },
    { name: 'JobAdder', logo: homecare },
    { name: 'Loxo', logo: para },
    // { name: 'JobDiva', logo: 'https://novajobs.us/static/media/NovaUS.649f79957e5090a75022.png' },
    // { name: 'idibu', logo: 'https://abhishekdevpro-nova-home-care-fe.vercel.app/assets/logo-B4gdw3fA.png' },
  ];

  return (
    <PartnersSection>
      <PartnersGrid>
        {partners.map((partner) => (
          <PartnerLogo 
            key={partner.name}
            src={partner.logo}
            alt={`${partner.name} logo`}
          />
        ))}
      </PartnersGrid>
    </PartnersSection>
  );
};

export default Partners;

