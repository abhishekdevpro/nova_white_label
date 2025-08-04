
import React, { useState } from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { FaImages } from "react-icons/fa";

const GalleryContainer = styled.section`
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  max-width: 1400px;
  width: 95%;

  @media (min-width: 768px) {
    margin: 4rem auto;
    padding: 3rem;
  }

  @media (min-width: 1024px) {
    margin: 6rem auto;
    padding: 4rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;

  @media (min-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
  }

  @media (min-width: 1024px) {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -0.75rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #1e40af;
    border-radius: 2px;

    @media (min-width: 768px) {
      width: 80px;
      height: 4px;
      bottom: -1rem;
    }
  }
`;

const TabContainer = styled.div`
  margin-bottom: 1.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 768px) {
    margin-bottom: 2rem;
    overflow-x: visible;
  }
`;

const TabList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  min-width: min-content;

  @media (max-width: 767px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabItem = styled.li`
  flex: 1;
  min-width: 120px;

  @media (min-width: 768px) {
    min-width: auto;
  }
`;

const TabButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${(props) => (props.active ? "#1C2957" : "white")};
  color: ${(props) => (props.active ? "white" : "#6c757d")};
  border: none;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (min-width: 768px) {
    padding: 1rem 1.5rem;
    font-size: 0.95rem;
  }

  &:hover {
    color: ${(props) => (props.active ? "white" : "#343a40")};
    background: ${(props) => (props.active ? "#1C2957" : "#f8f9fa")};
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 480px) {
    height: 250px;
  }

  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1024px) {
    height: 350px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem 1rem;
  color: #6c757d;
  background: #fff;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
    gap: 1rem;
  }

  svg {
    font-size: 1.5rem;
    color: #ced4da;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    margin: 0;
    font-size: 1rem;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  background-color: #1e40af;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
  z-index: 10;

  @media (min-width: 768px) {
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    gap: 0.5rem;
  }

  &:hover {
    background-color: #1e3a8a;
    transform: translateY(-2px);
  }
`;

const GallerySection = ({
  companyData,
  isEdit,
  handleEditClick,
  // FALLBACK_IMAGES,
  BASE_IMAGE_URL,
  handleImageError,
}) => {
  const [activeTab, setActiveTab] = useState("culture");
  const FALLBACK_IMAGES = {
    gallery: Array(6).fill(
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop"
    ),
  };

const getImagesForTab = () => {
  const placeholderImage = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop";

  let rawImages = [];

  switch (activeTab) {
    case "culture":
      rawImages = companyData?.inside_culture_images || [];
      break;
    case "people":
      rawImages = companyData?.inside_people_images || [];
      break;
    case "workplace":
      rawImages = companyData?.inside_workplace_images || [];
      break;
    default:
      rawImages = [];
  }

  // Filter out empty strings and null/undefined
  const validImages = rawImages.filter(img => img && img.trim() !== "");

  return validImages.length > 0 ? validImages : [placeholderImage];
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
        {console.log(images,"images")}
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
            <FaImages />
            <p>No images available for {tabLabels[activeTab].toLowerCase()}.</p>
          </EmptyState>
        )}
      </GalleryGrid>
    </GalleryContainer>
  );
};

export default GallerySection;
