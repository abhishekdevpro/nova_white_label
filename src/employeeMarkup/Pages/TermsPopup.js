// // import { useState, useRef, useEffect } from "react";

// // function TermsPopup({ email, onAgree }) {
// //   const [agreeEnabled, setAgreeEnabled] = useState(false);
// //   const scrollRef = useRef(null);
// //   const toastRef = useRef(null);

// //   useEffect(() => {
// //     const modal = new window.bootstrap.Modal(document.getElementById("termsModal"));
// //     modal.show();
// //   }, []);

// //   const handleScroll = () => {
// //     const el = scrollRef.current;
// //     if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
// //       setAgreeEnabled(true);
// //     }
// //   };

// //   const handleAgree = async () => {
// //     try {
// //       const response = await fetch("/api/admin/auth/vendor/terms-agreement", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           email,
// //           accepted: true,
// //         }),
// //       });

// //       if (!response.ok) throw new Error("Failed to submit agreement");

// //       const toastElement = toastRef.current;
// //       const bsToast = new window.bootstrap.Toast(toastElement);
// //       bsToast.show();

// //       const modalElement = document.getElementById("termsModal");
// //       const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
// //       modalInstance.hide();

// //       if (onAgree) onAgree();
// //     } catch (error) {
// //       alert("Error: " + error.message);
// //     }
// //   };

// //   return (
// //     <>
// //       <div
// //         className="modal fade"
// //         id="termsModal"
// //         tabIndex="-1"
// //         aria-labelledby="termsModalLabel"
// //         aria-hidden="true"
// //       >
// //         <div className="modal-dialog modal-dialog-centered modal-lg">
// //           <div className="modal-content">
// //             <div className="modal-header">
// //               <h5 className="modal-title" id="termsModalLabel">
// //                 Terms and Conditions
// //               </h5>
// //               <button
// //                 type="button"
// //                 className="btn-close"
// //                 data-bs-dismiss="modal"
// //                 aria-label="Close"
// //               />
// //             </div>
// //             <div
// //               className="modal-body overflow-auto border p-3"
// //               style={{ maxHeight: "300px" }}
// //               onScroll={handleScroll}
// //               ref={scrollRef}
// //             >
// //               <p>
// //                 [Your actual terms and conditions go here. Scroll to the bottom
// //                 to enable "I Agree."]
// //               </p>
// //             </div>
// //             <div className="modal-footer">
// //               <button
// //                 className="btn btn-primary"
// //                 onClick={handleAgree}
// //                 disabled={!agreeEnabled}
// //               >
// //                 I Agree
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Toast */}
// //       <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
// //         <div
// //           ref={toastRef}
// //           className="toast align-items-center text-white bg-success border-0"
// //           role="alert"
// //           aria-live="assertive"
// //           aria-atomic="true"
// //         >
// //           <div className="d-flex">
// //             <div className="toast-body">Terms accepted successfully!</div>
// //             <button
// //               type="button"
// //               className="btn-close btn-close-white me-2 m-auto"
// //               data-bs-dismiss="toast"
// //               aria-label="Close"
// //             ></button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default TermsPopup;


// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import axios from "axios";

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
// `;

// const Button = styled.button`
//   background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
//   color: white;
//   padding: 0.5rem 1rem;
//   border: none;
//   border-radius: 5px;
//   cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${(props) =>
//       props.disabled ? "#ccc" : "#0056b3"};
//   }
// `;

// const TermsPopup = ({ email, onAgree }) => {
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
//       await axios.post("/api/admin/auth/vendor/terms-agreement", {
//         email,
//         accepted: true,
//       });

//       if (onAgree) onAgree(); // trigger success callback (e.g., close popup)
//     } catch (err) {
//       console.error("Failed to submit agreement", err);
//       alert("Failed to submit agreement");
//     }
//   };

//   return (
//     <Overlay>
//       <Modal>
//         <ModalHeader>Terms and Conditions</ModalHeader>
//         <ModalBody onScroll={handleScroll} ref={scrollRef}>
//           <p>
//             [Your full terms and conditions go here...]
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             Sed commodo elit vel arcu pharetra, sed scelerisque lacus ornare.
//             Fusce eget velit ut purus tincidunt dapibus nec ac orci.
//           </p>
//           <p>
//             Duis bibendum nisi nec velit tristique, vel fringilla sapien tincidunt.
//             Cras luctus lacus id sapien luctus malesuada. Aenean eget magna ac ante
//             vestibulum feugiat. Pellentesque habitant morbi tristique senectus.
//           </p>
//           <p>
//             Continue scrolling until the end of terms to enable the agree button...
//           </p>
//         </ModalBody>
//         <ModalFooter>
//           <Button disabled={!agreeEnabled} onClick={handleAgree}>
//             I Agree
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </Overlay>
//   );
// };

// export default TermsPopup;

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

