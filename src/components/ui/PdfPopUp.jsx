import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FiExternalLink } from "react-icons/fi"; // 👈 optional icon library

const PDFPopupViewer = ({ show, onClose, fileUrl, fileName }) => {
  const openInNewTab = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white d-flex justify-content-between align-items-center">
        <Modal.Title className="fw-bold fs-4 m-0">
          {fileName}
        </Modal.Title>
        <Button
          variant="primary"
          size="sm"
          className="ms-2"
          onClick={openInNewTab}
          title="Open in new tab"
        >
          <FiExternalLink size={18} />
        </Button>
      </Modal.Header>

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
