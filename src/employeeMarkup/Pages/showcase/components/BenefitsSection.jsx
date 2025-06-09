
// import { MdEdit } from "react-icons/md"


// const BenefitsSection = ({
//   renderedBenefits,
//   companyData,
//   isEdit,
//   handleEditClick,
// }) => {
//   return (
//     <section id="benefits" className="section">
//       {isEdit && (
//         <button className="edit-button" onClick={() => handleEditClick("benefits")}>
//           <MdEdit size={18} />
//           Edit Benefits
//         </button>
//       )}
//       <h2 className="section-title">What Makes Us Unique</h2>
//       <div className="benefits-container">
//         {renderedBenefits.length > 0 ? (
//           renderedBenefits.map((item) => (
//             <div key={item.key} className="benefit-item">
//               <div className="benefit-icon">{item.icon}</div>
//               <div className="benefit-content">
//                 <h3 className="benefit-title">{item.title}</h3>
//                 <p className="benefit-description">{companyData?.[item.valueKey]}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div>No unique benefits added yet.</div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default BenefitsSection
import React from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';

// Styled Components
const Section = styled.section`
  position: relative;
  padding: 4rem 2rem;
  background: white;
  min-height: 400px;
  margin-bottom:1rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 2rem 0.75rem;
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: 1.5rem;
    right: 1.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    gap: 0.25rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: #3b82f6;
  margin: 0 0 4rem 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    border-radius: 2px;
  }

  @media (max-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    
    &::after {
      width: 60px;
      height: 3px;
    }
  }
`;

const BenefitsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(59, 130, 246, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    border-color: rgba(59, 130, 246, 0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    gap: 1rem;
    flex-direction: column;
    text-align: center;
  }
`;

const BenefitIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  // background: ;
  border-radius: 50%;
  color: #1e40af;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 1.125rem;
  }
`;

const BenefitContent = styled.div`
  flex: 1;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.625rem;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }
`;

const BenefitDescription = styled.p`
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #64748b;
  font-size: 1.125rem;
  padding: 3rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 2px dashed #e2e8f0;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 1.5rem;
  }
`;

// Main Component
const BenefitsSection = ({
  renderedBenefits,
  companyData,
  isEdit,
  handleEditClick,
}) => {
  return (
    <Section id="benefits">
      {isEdit && (
        <EditButton onClick={() => handleEditClick("benefits")}>
          <MdEdit size={18} />
          Edit Benefits
        </EditButton>
      )}
      
      <SectionTitle>What Makes Us Unique</SectionTitle>
      
      <BenefitsContainer>
        {renderedBenefits.length > 0 ? (
          renderedBenefits.map((item) => (
            <BenefitItem key={item.key}>
              <BenefitIcon>{item.icon}</BenefitIcon>
              <BenefitContent>
                <BenefitTitle>{item.title}</BenefitTitle>
                <BenefitDescription>
                  {companyData?.[item.valueKey]}
                </BenefitDescription>
              </BenefitContent>
            </BenefitItem>
          ))
        ) : (
          <EmptyState>No unique benefits added yet.</EmptyState>
        )}
      </BenefitsContainer>
    </Section>
  );
};

export default BenefitsSection;