import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled Components
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderContent = styled.div`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(10, 28, 61, 0.1);
`;

const LoaderText = styled.h3`
  color: #1C2957;
  font-weight: 500;
  margin-top: 1rem;
`;

const CustomSpinner = styled(Spinner)`
  width: 3rem;
  height: 3rem;
  color: #0a1c3d !important;
`;

const FullPageLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <LoaderContainer>
      <LoaderContent>
        <CustomSpinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </CustomSpinner>
        <LoaderText>Get Your Dream Jobs...</LoaderText>
      </LoaderContent>
    </LoaderContainer>
  );
};

export default FullPageLoader;