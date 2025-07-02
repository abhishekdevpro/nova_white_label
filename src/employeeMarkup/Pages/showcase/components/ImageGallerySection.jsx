
import React, { useState } from "react";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { FaImages } from "react-icons/fa";

const GalleryContainer = styled.section`
  margin-bottom: 8rem;
  padding: 3rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  position: relative;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    margin-bottom: 4rem;
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #1e40af; /* Tailwind's bg-blue-800 */
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1e3a8a; /* Tailwind's bg-blue-900 */
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: #1e40af;
    border-radius: 2px;
  }
`;

const TabContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

const TabItem = styled.li`
  flex: 1;
`;

const TabButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${(props) =>
    props.active ? "#1C2957" : "white"};
  color: ${(props) => (props.active ? "white" : "#6c757d")};
  border: none;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: ${(props) => (props.active ? "white" : "#343a40")};
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 25%;
    right: 0;
    height: 50%;
    width: 1px;
    background: #dee2e6;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
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
  padding: 3rem 2rem;
  color: #6c757d;
  background: #fff;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 2rem;
    color: #ced4da;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
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
  // console.log(FALLBACK_IMAGES.gallery,"FALLBACK_IMAGES")

  // const getImagesForTab = () => {
  //   switch (activeTab) {
  //     case "culture":
  //       return companyData?.inside_culture_images?.length
  //         ? companyData.inside_culture_images
  //         : FALLBACK_IMAGES.gallery || [];
  //     case "people":
  //       return companyData?.inside_people_images?.length
  //         ? companyData.inside_people_images
  //         : FALLBACK_IMAGES.gallery || [];
  //     case "workplace":
  //       return companyData?.inside_workplace_images?.length
  //         ? companyData.inside_workplace_images
  //         : FALLBACK_IMAGES.gallery || [];
  //     default:
  //       return FALLBACK_IMAGES.gallery || [];
  //   }
  // };
// const getImagesForTab = () => {
//   const placeholderImage = "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop";

//   let images = [];

//   switch (activeTab) {
//     case "culture":
//       images = companyData?.inside_culture_images || [];
//       break;
//     case "people":
//       images = companyData?.inside_people_images || [];
//       break;
//     case "workplace":
//       images = companyData?.inside_workplace_images || [];
//       break;
//     default:
//       images = [];
//   }

//   return images.length > 0 ? images : [placeholderImage];
// };

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
