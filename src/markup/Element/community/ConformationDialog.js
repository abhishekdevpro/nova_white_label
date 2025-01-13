import React from 'react';
import styled from 'styled-components';

// Styled Components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5); /* Black background with opacity */
`;

const DialogContainer = styled.div`
  background-color: white;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 24px;
  width: 400px; /* Fixed width */
`;

const Title = styled.h2`
  font-size: 20px; /* Font size */
  font-weight: bold; /* Bold text */
  margin-bottom: 16px; /* Space below title */
`;

const Message = styled.p`
  margin-bottom: 24px; /* Space below message */
`;

const Button = styled.button`
  background-color: ${({ cancel }) => (cancel ? '#e5e7eb' : '#dc2626')}; /* Gray for cancel, red for confirm */
  color: ${({ cancel }) => (cancel ? '#4b5563' : '#ffffff')}; /* Dark gray for cancel, white for confirm */
  padding: 8px 16px; /* Padding */
  border-radius: 6px; /* Rounded corners */
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ cancel }) => (cancel ? '#d1d5db' : '#b91c1c')}; /* Darker on hover */
  }

  margin-left: 8px; /* Space between buttons */
`;

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message 
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <DialogContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button cancel onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </DialogContainer>
    </Overlay>
  );
};

export default ConfirmationDialog;