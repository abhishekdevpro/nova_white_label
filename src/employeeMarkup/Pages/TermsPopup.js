
// import React, { useRef, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { toast } from "react-toastify";

// // Styled Components
// const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   z-index: 1000;
//   background-color: rgba(0, 0, 0, 0.6);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Modal = styled.div`
//   background: white;
//   width: 90%;
//   max-width: 600px;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 0 10px rgba(0,0,0,0.3);
// `;

// const ModalHeader = styled.div`
//   padding: 1rem;
//   border-bottom: 1px solid #ccc;
//   font-weight: bold;
//   font-size: 1.2rem;
// `;

// const ModalBody = styled.div`
//   padding: 1rem;
//   max-height: 300px;
//   overflow-y: auto;
// `;

// const ModalFooter = styled.div`
//   padding: 1rem;
//   border-top: 1px solid #ccc;
//   display: flex;
//   justify-content: flex-end;
//   gap: 10px;
// `;

// const Button = styled.button`
//   background-color: ${(props) => (props.cancel ? "#6c757d" : props.disabled ? "#ccc" : "#007bff")};
//   color: white;
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 5px;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${(props) =>
//       props.cancel ? "#5a6268" : props.disabled ? "#ccc" : "#0056b3"};
//   }
// `;

// const TermsPopup = ({ email, onAgree, onCancel }) => {
//   const [agreeEnabled, setAgreeEnabled] = useState(false);
//   const scrollRef = useRef(null);

//   const handleScroll = () => {
//     const el = scrollRef.current;
//     if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
//       setAgreeEnabled(true);
//     }
//   };

//   const handleAgree = async () => {
//     try {
//       await axios.post("https://apiwl.novajobs.us/api/admin/auth/vendor/terms-agreement", {
//         email,
//         accepted: true,
//       });

//       if (onAgree) onAgree(); // trigger parent success
//     } catch (err) {
//       console.error("Failed to submit agreement", err);
//       toast.error(err.response.data.message || "Failed to submit agreement");
//     }
//   };

//   return (
//     <Overlay>
//       <Modal>
//         <ModalHeader>Terms and Conditions</ModalHeader>
//         <ModalBody onScroll={handleScroll} ref={scrollRef}>
//           <p>
//             Please read and scroll to the bottom to agree. These are sample terms.
//           </p>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur sem nec sem commodo, ac rutrum sapien viverra. Aenean pulvinar, lorem id vulputate tincidunt, metus justo sollicitudin nisl, nec fermentum ante ipsum a nulla.</p>
//           <p>Proin vitae felis lorem. Vivamus vel sem at velit suscipit faucibus. Nulla facilisi. Donec commodo sagittis lacus vel facilisis.</p>
//           <p>Scroll till the end to enable the agree button.</p>
//         </ModalBody>
//         <ModalFooter>
//           <Button cancel onClick={onCancel}>Cancel</Button>
//           <Button onClick={handleAgree} >I Agree</Button>
//         </ModalFooter>
//       </Modal>
//     </Overlay>
//   );
// };

// export default TermsPopup;


import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../../adminPanel/utils/DateUtils";

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
  max-width: 700px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  font-size: 1.3rem;
`;

const ModalBody = styled.div`
  padding: 2rem;
  max-height: 400px;
  overflow-y: auto;
  font-size: 0.95rem;
  line-height: 1.5;
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
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
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
      toast.error(err.response?.data?.message || "Failed to submit agreement");
    }
  };

  return (
    <Overlay>
      <Modal>
        <ModalHeader>White Label Vendor Agreement – Terms and Conditions</ModalHeader>
        <ModalBody onScroll={handleScroll} ref={scrollRef}>
          <p><strong>Effective Date: </strong> {formatDate(Date.now())}</p>
          <p><strong>Platform Owner:</strong> NovaJobs.us, a business registered in Columbia, South Carolina, United States.</p>

          <p>By registering as a vendor on NovaJobs.us, you (“Vendor”, “Partner”, “You”) agree to the following terms and conditions constituting a White Label Agreement between you and NovaJobs.us (“We”, “Our”, or “NovaJobs”).</p>

          <p><strong>1. White Label Usage Grant</strong></p>
          <ul>
            <li>NovaJobs.us grants you a non-exclusive, revocable license to use its job portal services, resume builder, community features, or other modules under your own brand or trade name.</li>
            <li>You are authorized to operate a branded version of our platform for your clients and users.</li>
            <li>You are not permitted to sublicense, sell, or transfer this white-label access to third parties without written consent.</li>
          </ul>

          <p><strong>2. Branding and Ownership</strong></p>
          <ul>
            <li>You may customize certain visual elements (logo, brand name, primary color scheme).</li>
            <li>All intellectual property remains the sole property of <strong>NovaJobs.us</strong>.</li>
            <li>You must display the “Powered by NovaJobs.us” footer (unless waived by a written agreement).</li>
          </ul>

          <p><strong>3. Data Handling and Privacy</strong></p>
          <ul>
            <li>All user data collected through your white-label portal will be stored securely and remain confidential.</li>
            <li>NovaJobs.us will not use your client or user data for marketing or solicitation without consent.</li>
            <li>You must inform your clients and users about NovaJobs.us’s privacy practices and ensure compliance with applicable laws (e.g., CCPA, GDPR).</li>
          </ul>

          <p><strong>4. Vendor Responsibilities</strong></p>
          <ul>
            <li>Provide accurate business information at the time of registration.</li>
            <li>Ensure ethical conduct and compliance with all employment, advertising, and anti-discrimination laws.</li>
            <li>No fraudulent job listings, resume scraping, or misleading communication.</li>
          </ul>

          <p><strong>5. Fees and Payments</strong></p>
          <ul>
            <li>Revenue-sharing, subscription, or commission is governed by a separate pricing agreement.</li>
            <li>You are responsible for local taxes, billing, and compliance in your region.</li>
          </ul>

          <p><strong>6. Service Availability & Support</strong></p>
          <ul>
            <li>NovaJobs.us provides platform uptime, maintenance, and support per standard availability.</li>
            <li>Scheduled downtime or critical updates will be communicated in advance.</li>
          </ul>

          <p><strong>7. Limitation of Liability</strong></p>
          <ul>
            <li>NovaJobs.us is not liable for loss of profits, data, or third-party claims due to vendor misuse.</li>
            <li>Errors from vendor-customized settings are the vendor’s responsibility.</li>
          </ul>

          <p><strong>8. Termination Clause</strong></p>
          <ul>
            <li>Either party may terminate this agreement with 15 days’ written notice.</li>
            <li>Upon termination, access is revoked and branding removed.</li>
          </ul>

          <p><strong>9. Jurisdiction and Legal Governance</strong></p>
          <ul>
            <li>Governing law: State of South Carolina, United States.</li>
            <li>Jurisdiction: Courts in Columbia, SC.</li>
          </ul>

          <p><strong>10. Acceptance of Agreement</strong></p>
          <p>By registering and checking the box “I agree to the Terms and Conditions”, you affirm that you have read, understood, and agree to be bound by this Agreement.</p>
        </ModalBody>
        <ModalFooter>
          <Button cancel onClick={onCancel}>Cancel</Button>
          <Button onClick={handleAgree} disabled={!agreeEnabled}>I Agree</Button>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
};

export default TermsPopup;


