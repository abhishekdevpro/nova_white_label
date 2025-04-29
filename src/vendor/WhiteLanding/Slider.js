import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../vendor/assests/2.jpg"
import image2 from "../../vendor/assests/1.jpg"
import image3 from "../../vendor/assests/3.jpg"
import image4 from "../../vendor/assests/4.jpg"
import image5 from "../../vendor/assests/5.jpg"

const SliderContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SliderTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${props => props.$offset}px);
`;

const Slide = styled.div`
  flex: 0 0 auto;
  width: ${props => props.$slideWidth}px;
  height: 300px;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    width: ${props => props.$slideWidth}px;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: ${props => props.$slideWidth}px;
    height: 300px;
  }
`;

const MockupImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    transform: translateY(-50%) scale(1.05);
  }

  ${props => props.$position === 'left' ? 'left: 1rem;' : 'right: 1rem;'}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.$active ? '#007bff' : '#e0e0e0'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.$active ? '#007bff' : '#c0c0c0'};
  }
`;

const WebsiteMockupSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to account for cloned slides
  const [slideWidth, setSlideWidth] = useState(300);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  // Mock data for the slides
  const originalMockups = [
    { id: 1, image: image1, alt: "Dark themed recruitment website" },
    { id: 2, image: image2, alt: "Pink themed digital team website" },
    { id: 3, image: image3, alt: "Blue themed recruitment platform" },
    { id: 4, image: image4, alt: "Modern recruitment website" },
    { id: 5, image: image5, alt: "Professional recruitment portal" }
  ];

  // Create infinite slides by cloning first and last slides
  const mockups = [
    ...originalMockups.slice(-2), // Clone last two slides to beginning
    ...originalMockups,
    ...originalMockups.slice(0, 2) // Clone first two slides to end
  ];

  useEffect(() => {
    const updateSlideWidth = () => {
      const width = window.innerWidth < 768 ? 250 : 300;
      setSlideWidth(width);
    };

    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
    
    setTimeout(() => {
      if (currentIndex >= originalMockups.length + 1) {
        setCurrentIndex(1);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
    
    setTimeout(() => {
      if (currentIndex <= 0) {
        setCurrentIndex(originalMockups.length);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setCurrentIndex(index + 1); // Add 1 to account for cloned slides
  };

  // Calculate the offset for the slider track
  const offset = -currentIndex * slideWidth;

  return (
    <SliderContainer ref={sliderRef}>
      <SliderTrack $offset={offset}>
        {mockups.map((mockup, index) => (
          <Slide key={`${mockup.id}-${index}`} $slideWidth={slideWidth}>
            <MockupImage>
              <img 
                src={mockup.image} 
                alt={mockup.alt}
                loading="lazy"
              />
            </MockupImage>
          </Slide>
        ))}
      </SliderTrack>

      <NavigationButton 
        $position="left"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </NavigationButton>

      <NavigationButton 
        $position="right"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </NavigationButton>

      <DotContainer>
        {originalMockups.map((_, index) => (
          <Dot
            key={index}
            $active={currentIndex === index + 1}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotContainer>
    </SliderContainer>
  );
};

export default WebsiteMockupSlider;