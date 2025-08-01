import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";
import PDFPopupViewer from "../../../components/ui/PdfPopUp";

const Badge = styled.span`
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) =>
    props.status === "Verified"
      ? "#155724"
      : props.status === "Rejected"
      ? "#721c24"
      : "#856404"};
  background-color: ${(props) =>
    props.status === "Verified"
      ? "#d4edda"
      : props.status === "Rejected"
      ? "#f8d7da"
      : "#fff3cd"};
`;

const DocumentList = () => {
  const [docType, setDocType] = useState("");
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const token = localStorage.getItem("jobSeekerLoginToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDoc, setIsViewDoc] = useState(false);
  const fileInputRef = useRef(null);

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

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        "https://apiwl.novajobs.us/api/jobseeker/user-document",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDocuments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    return setFile(file);
  };
  const handleUpload = async () => {
    if (!docType) {
      toast.error("Please select a document type.");
      return;
    }
    if (!file) {
      toast.error("Please select a file.");
      return;
    }
    const max_size = 2 * 1024 * 1024;
    if (file.size > max_size) {
      toast.error("File size should be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("document_type_id", getDocumentTypeId(docType));
    formData.append("document_type_upload", file);

    try {
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/jobseeker/user-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.data.status === "success" || response.data.code === 200) {
        toast.success("Document uploaded successfully.");
        setDocType("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchDocuments();
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      toast.error(error?.response?.data?.message || "Upload failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://apiwl.novajobs.us/api/jobseeker/user-document/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Document deleted successfully.");
      setSelectedDocId(null);

      fetchDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error(error?.response?.data?.message || "Delete failed.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDeleteModale = () => {
    console.log("Deleted");
    setIsModalOpen(false);
  };
  const handleClosePDF = () => {
    setSelectedPDF(null);
  };
  return (
    <div className="container mt-5 p-4 bg-white rounded shadow">
      <h5 className="text-left  text-uppercase font-weight-700 mb-4">
        Upload Document
      </h5>

      <div className="mb-3">
        <label className="form-label">Document Type</label>
        <select
          className="form-select"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        >
          <option value="">Select Document Type</option>
          {documentTypeOptions.map((doc) => (
            <option key={doc.id} value={doc.label}>
              {doc.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Upload File</label>
        <input
          type="file"
          className="form-control"
          accept=".pdf"
          ref={fileInputRef}
          // onChange={(e) => setFile(e.target.files[0])}
          onChange={(e) => handleFileChange(e)}
        />
      </div>

      <button className="site-button w-100" onClick={handleUpload}>
        Upload
      </button>

      {documents.length >0 &&<table className="table table-striped table-responsive mt-4">
        <thead>
          <tr>
            <th>Document Type</th>
            <th>File Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td>{getDocumentTypeLabel(doc.document_type_id)}</td>
              <td>{doc.document_path?.split("/").pop()}</td>
              <td>
                <Badge
                  status={doc.is_document_verified ? "Verified" : "In Progress"}
                >
                  {doc.is_document_verified ? "Verified" : "In Progress"}
                </Badge>
              </td>

              <td>
                <div className="d-flex gap-2">
                  <button
                    className="site-button btn-sm btn-danger"
                    // onClick={() => handleDelete(doc.id)
                    onClick={() => {
                      setSelectedDocId(doc.id);
                      setIsModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="site-button btn-sm"
                    // onClick={() => handleDelete(doc.id)
                    onClick={() => {
                      setSelectedPDF(
                        `https://apiwl.novajobs.us${doc.document_path}`
                      );
                      setIsViewDoc(true);
                    }}
                  >
                    view
                  </button>
                  <a
                    href={`https://apiwl.novajobs.us${doc.document_path}`}
                    download={doc.document_path?.split("/").pop()}
                    className="site-button btn-sm btn-success"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </div>
              </td>
            </tr>
          ))}
          {documents.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No documents uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Document"
        message="Do you really want to delete this Documnet?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => handleDelete(selectedDocId)}
        onCancel={() => setIsModalOpen(false)}
      />

      {isViewDoc && (
        <PDFPopupViewer
          show={selectedPDF !== null}
          onClose={handleClosePDF}
          fileUrl={selectedPDF}
          // fileName={selectedPDF?.name}
        />
      )}
    </div>
  );
};

export default DocumentList;
