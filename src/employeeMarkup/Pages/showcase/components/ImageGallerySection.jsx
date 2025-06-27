import React, { useState } from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";

const GalleryContainer = styled.section`
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 2rem 0;
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    background: #007bff;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #007bff, #6c757d);
    border-radius: 2px;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TabItem = styled.li`
  flex: 1;
`;

const TabButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${(props) =>
    props.active ? "linear-gradient(135deg, #007bff, #0056b3)" : "white"};
  color: ${(props) => (props.active ? "white" : "#6c757d")};
  border: none;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  font-size: 0.95rem;

  &:hover {
    background: ${(props) =>
      props.active ? "linear-gradient(135deg, #007bff, #0056b3)" : "#f8f9fa"};
    color: ${(props) => (props.active ? "white" : "#495057")};
    transform: translateY(-1px);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 25%;
    height: 50%;
    width: 1px;
    background: #e9ecef;
  }

  ${(props) =>
    props.active &&
    `
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
    }
  `}
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  }

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    height: 140px;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #6c757d;
  background: white;
  border-radius: 12px;
  border: 2px dashed #dee2e6;

  p {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const GallerySection = ({
  companyData,
  isEdit,
  handleEditClick,
  FALLBACK_IMAGES,
  BASE_IMAGE_URL,
  handleImageError,
}) => {
  const [activeTab, setActiveTab] = useState("culture");

  const getImagesForTab = () => {
    switch (activeTab) {
      case "culture":
        return companyData?.inside_culture_images?.length
          ? companyData.inside_culture_images
          : FALLBACK_IMAGES?.gallery || [];
      case "people":
        return companyData?.inside_people_images?.length
          ? companyData.inside_people_images
          : FALLBACK_IMAGES?.gallery || [];
      case "workplace":
        return companyData?.inside_workplace_images?.length
          ? companyData.inside_workplace_images
          : FALLBACK_IMAGES?.gallery || [];
      default:
        return FALLBACK_IMAGES?.gallery || [];
    }
  };

  const images = getImagesForTab();
  const tabLabels = {
    culture: "Inside Culture",
    people: "People",
    workplace: "Workplace",
  };

  return (
    <GalleryContainer id="gallery">
      {isEdit && (
        <EditButton onClick={() => handleEditClick("gallery")}>
          <MdEdit size={18} />
          Edit Gallery
        </EditButton>
      )}

      <Title>Life at {companyData?.company_name || "Our Company"}</Title>

      <TabContainer>
        <TabList>
          {Object.entries(tabLabels).map(([key, label]) => (
            <TabItem key={key}>
              <TabButton
                active={activeTab === key}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </TabButton>
            </TabItem>
          ))}
        </TabList>
      </TabContainer>

      <GalleryGrid>
        {images.length > 0 ? (
          images.map((image, index) => (
            <GalleryImage
              key={index}
              src={
                typeof image === "string" ? `${BASE_IMAGE_URL}${image}` : image
              }
              alt={`${tabLabels[activeTab]} ${index + 1}`}
              onError={handleImageError}
            />
          ))
        ) : (
          <EmptyState>
            <p>No images available for {tabLabels[activeTab].toLowerCase()}</p>
          </EmptyState>
        )}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default GallerySection;
