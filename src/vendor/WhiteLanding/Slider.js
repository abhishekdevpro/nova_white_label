import React, { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
//   min-width: 300px;
  height: 300px;
  padding: 0 1rem;
  flex: 0 0 auto;
  
  @media (max-width: 768px) {
    min-width: 100px;
    height: 300px;
  }

  @media (max-width: 480px) {
    min-width: 100px;
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Mock data for the slides
  const mockups = [
    { id: 1, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s", alt: "Dark themed recruitment website" },
    { id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s", alt: "Pink themed digital team website" },
    { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s", alt: "Blue themed recruitment platform" },
    { id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s", alt: "Modern recruitment website" },
    { id: 5, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s", alt: "Professional recruitment portal" }
  ];

  React.useEffect(() => {
    const updateSliderWidth = () => {
      const slideWidth = window.innerWidth < 768 ? 250 : 300;
      setSliderWidth(slideWidth);
    };

    updateSliderWidth();
    window.addEventListener('resize', updateSliderWidth);
    
    return () => window.removeEventListener('resize', updateSliderWidth);
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev === mockups.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev === 0 ? mockups.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <SliderContainer>
      <SliderTrack $offset={-currentIndex * sliderWidth}>
        {mockups.map((mockup, index) => (
          <Slide key={mockup.id}>
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
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} />
      </NavigationButton>

      <NavigationButton 
        $position="right"
        onClick={nextSlide}
        disabled={currentIndex === mockups.length - 1}
      >
        <ChevronRight size={24} />
      </NavigationButton>

      <DotContainer>
        {mockups.map((_, index) => (
          <Dot
            key={index}
            $active={currentIndex === index}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotContainer>
    </SliderContainer>
  );
};

export default WebsiteMockupSlider;