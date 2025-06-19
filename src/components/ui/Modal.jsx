import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ReusableModal = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
  size = "md", // sm, md, lg, xl
  centered = true,
  backdrop = true, // true, false, or "static"
  keyboard = true,
  isLoading = false,
  customModalClass = "",
  customHeaderClass = "",
  customBodyClass = "",
  customFooterClass = "",
}) => {
  const modalSizeClass = size !== "md" ? `modal-${size}` : "";
  const centeredClass = centered ? "modal-dialog-centered" : "";
  const backdropAttr = backdrop === "static" ? "static" : backdrop;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdrop !== "static") {
      onClose();
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && keyboard && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, keyboard, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal fade show ${customModalClass}`}
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
      aria-hidden="false"
      onClick={handleBackdropClick}
    >
      <div className={`modal-dialog ${modalSizeClass} ${centeredClass}`}>
        <div className="modal-content shadow-lg border-0">
          {/* Loading Overlay */}
          {isLoading && (
            <div
              className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                zIndex: 9999,
                borderRadius: "0.375rem",
              }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Modal Header */}
          <div className={`modal-header border-bottom-0 pb-3 ${customHeaderClass}`}>
            <h5 className="modal-title fw-bold text-dark mb-0">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body */}
          <div className={`modal-body py-4 ${customBodyClass}`}>
            {children}
          </div>

          {/* Modal Footer */}
          {footerContent && (
            <div className={`modal-footer border-top-0 pt-3 ${customFooterClass}`}>
              {footerContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;