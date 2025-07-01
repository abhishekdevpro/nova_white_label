import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import PDFPopupViewer from "../../components/ui/PdfPopUp";

const DocumentListModal = ({ show, onClose, jobseekerId }) => {
  // console.log(jobseekerId,"jobseekerId");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);

  const token = localStorage.getItem("authToken");

   const documentTypeOptions = [
    { id: 1, label: "SSN" },
    { id: 2, label: "PassBook" },
    { id: 3, label: "Resume" },
    { id: 4, label: "Experience Letter" },
    { id: 5, label: "Cover Letter" },
    { id: 6, label: "Education" },
    { id: 7, label: "Certificate" },
  ];

  const getDocumentTypeId = (label) =>
    documentTypeOptions.find((item) => item.label === label)?.id;

  const getDocumentTypeLabel = (id) =>
    documentTypeOptions.find((item) => item.id === id)?.label;



  useEffect(() => {
    if (show && jobseekerId) {
      fetchDocuments();
    }
  }, [show, jobseekerId]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://apiwl.novajobs.us/api/admin/user-document-list/${jobseekerId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDocuments(res?.data?.data || []);
    } catch (err) {
      toast.error("Error loading documents");
    } finally {
      setLoading(false);
    }
  };

  const verifyDocument = async (docId) => {
    try {
      const res = await axios.post(
        "https://apiwl.novajobs.us/api/admin/verfiy-document",
        { 
            job_seekerid: jobseekerId,
            document_id: docId
         },
        {
          headers: { Authorization: token },
        }
      );
      if (res.data.status === "success" || res.data.code === 200) {
        toast.success("Document verified");
        fetchDocuments();
      }
    } catch (error) {
      toast.error("Verification failed");
    }
  };

  const handleView = (url) => {
    setSelectedPDF({
      url: `https://apiwl.novajobs.us${url}`,
      name: "Document Preview",
    });
  };

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered>
        <div closeButton>
          <h2 className="modal-title">Document List</h2>
        </div>
        <Modal.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table bordered hover responsive>
              <thead className="table-light text-center">
                <tr>
                  <th>Type</th>
                  <th>File</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {documents.length > 0 ? (
                  documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{getDocumentTypeLabel(doc?.document_type_id)}</td>
                      <td>{doc.document_path?.split("/").pop()}</td>
                      <td>
                        <span
                          className={`badge py-2 px-2 ${
                            doc.is_document_verified
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {doc.is_document_verified
                            ? "Verified"
                            : "In Progress"}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleView(doc.document_path)}
                          className="me-2"
                        >
                          View
                        </Button>
                        {!doc.is_document_verified && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => verifyDocument(doc.id)}
                            disabled={doc.is_document_verified}
                          >
                            Verify
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No documents found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* PDF Viewer */}
      <PDFPopupViewer
        show={selectedPDF !== null}
        onClose={() => setSelectedPDF(null)}
        fileUrl={selectedPDF?.url}
        fileName={selectedPDF?.name}
      />
    </>
  );
};

export default DocumentListModal;
