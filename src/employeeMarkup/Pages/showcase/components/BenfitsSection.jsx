import React from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";

const Section = styled.section`
  padding: 3rem 1rem;
  background-color: #f8f9fa;
  border-radius: 12px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #0d6efd;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  float: right;

  &:hover {
    text-decoration: underline;
    color: #0b5ed7;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #1c2957;
  margin-bottom: 2rem;
`;

const BenefitCard = styled.div`
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;

  &:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.08);
  }
`;

const IconWrapper = styled.div`
  font-size: 1.75rem;
  color: #0d6efd;
`;

const BenefitTitle = styled.h5`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1c2957;
`;

const BenefitDescription = styled.p`
  margin-bottom: 0;
  color: #495057;
`;

const BenefitsSection = ({ isEdit, handleEditClick, renderedBenefits, companyData }) => {
  return (
    <Section id="benefits" className="container">
      {isEdit && (
        <EditButton onClick={() => handleEditClick("benefits")}>
          <MdEdit size={18} style={{ marginRight: "5px" }} />
          Edit
        </EditButton>
      )}
      <SectionTitle>Benefits & Perks</SectionTitle>
      <div className="row g-4">
        {renderedBenefits.length > 0 ? (
          renderedBenefits.map((item) => (
            <div className="col-sm-6 col-md-4" key={item.key}>
              <BenefitCard>
                <IconWrapper>{item.icon}</IconWrapper>
                <div>
                  <BenefitTitle>{item.title}</BenefitTitle>
                  <BenefitDescription>
                    {companyData?.[item.valueKey]}
                  </BenefitDescription>
                </div>
              </BenefitCard>
            </div>
          ))
        ) : (
          <p className="text-muted">No unique benefits added yet.</p>
        )}
      </div>
    </Section>
  );
};

export default BenefitsSection;
