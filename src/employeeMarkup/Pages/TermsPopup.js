
import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  font-size: 1.2rem;
`;

const ModalBody = styled.div`
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.cancel ? "#6c757d" : props.disabled ? "#ccc" : "#007bff")};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.cancel ? "#5a6268" : props.disabled ? "#ccc" : "#0056b3"};
  }
`;

const TermsPopup = ({ email, onAgree, onCancel }) => {
  const [agreeEnabled, setAgreeEnabled] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
      setAgreeEnabled(true);
    }
  };

  const handleAgree = async () => {
    try {
      await axios.post("https://apiwl.novajobs.us/api/admin/auth/vendor/terms-agreement", {
        email,
        accepted: true,
      });

      if (onAgree) onAgree(); // trigger parent success
    } catch (err) {
      console.error("Failed to submit agreement", err);
      alert("Failed to submit agreement");
    }
  };

  return (
    <Overlay>
      <Modal>
        <ModalHeader>Terms and Conditions</ModalHeader>
        <ModalBody onScroll={handleScroll} ref={scrollRef}>
          <p>
            Please read and scroll to the bottom to agree. These are sample terms.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur sem nec sem commodo, ac rutrum sapien viverra. Aenean pulvinar, lorem id vulputate tincidunt, metus justo sollicitudin nisl, nec fermentum ante ipsum a nulla.</p>
          <p>Proin vitae felis lorem. Vivamus vel sem at velit suscipit faucibus. Nulla facilisi. Donec commodo sagittis lacus vel facilisis.</p>
          <p>Scroll till the end to enable the agree button.</p>
        </ModalBody>
        <ModalFooter>
          <Button cancel onClick={onCancel}>Cancel</Button>
          <Button onClick={handleAgree} >I Agree</Button>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
};

export default TermsPopup;

