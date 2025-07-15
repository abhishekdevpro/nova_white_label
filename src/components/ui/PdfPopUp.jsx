import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi"; // 👈 optional icon library

const PDFPopupViewer = ({ show, onClose, fileUrl, fileName }) => {
  const openInNewTab = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };
//  console.log(fileUrl,"filllll");
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <div closeButton className="py-2 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold fs-4 m-0">
          {fileName}
        </h5>
        <Button
          variant="primary"
          size="sm"
          className="ms-2"
          onClick={openInNewTab}
          title="Open in new tab"
        >
          <FiExternalLink size={18} />
        </Button>
      </div>

      <Modal.Body style={{ height: "60vh" }}>
        <iframe
          src={fileUrl}
          title="PDF Viewer"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PDFPopupViewer;
