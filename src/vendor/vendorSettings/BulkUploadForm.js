
import React, { useEffect, useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BulkResumeTable from "./bulktable";

const BulkUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resumes, setResumes] = useState([]);

  // Get token from localStorage (ensure it's properly stored before usage)
  const token = localStorage.getItem("vendorToken");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Filter PDF files
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    // Check file size (limit to 10MB per file)
    const validFiles = pdfFiles.filter((file) => file.size <= 10 * 1024 * 1024);
    const oversizedFiles = pdfFiles.filter(
      (file) => file.size > 10 * 1024 * 1024
    );

    if (oversizedFiles.length > 0) {
      const oversizedFileNames = oversizedFiles
        .map((file) => file.name)
        .join(", ");
      setError(
        `The following files exceed the 10MB size limit: ${oversizedFileNames}`
      );
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setError("");
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles(
      selectedFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one PDF file.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create FormData and append files
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Actual API call with token in headers
      const response = await axios.post(
        "https://apiwl.novajobs.us/api/admin/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`, // Assuming token-based authentication
          },
        }
      );

      // Handle successful upload
      toast.success(
        `Successfully uploaded ${selectedFiles.length} PDF file(s)`
      );
      fetchResumes()
      setSelectedFiles([]); // Clear selected files after successful upload
    } catch (error) {
      console.error("Upload error:", error);

      // More specific error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message || "Upload failed");
        setError(error.response.data.message || "Upload failed");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from server");
        setError("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request
        toast.error("Error setting up the upload");
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("vendorToken");

      if (!token) {
        console.error("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.get(
        "https://apiwl.novajobs.us/api/admin/bulk-resume",
        {
          headers: { Authorization: token },
        }
      );

      if (response.data?.status === "success") {
        setResumes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };
   useEffect(() => {
      fetchResumes();
    }, []);

  return (
    <div className="form-container">
      <ToastContainer /> {/* Add toast notifications container */}
      <h1 className="title">Bulk PDF Upload</h1>
      <div className="section">
        <h2 className="section-title1">Upload PDF Files</h2>

        <div className="file-input-wrapper">
          <input
            className="file-input"
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            id="pdf-upload"
          />
          <label className="file-input-label" htmlFor="pdf-upload">
            <Upload size={20} />
            Choose PDF Files
          </label>
        </div>

        {selectedFiles.length > 0 && (
          <div className="file-list-container">
            {selectedFiles.map((file, index) => (
              <div className="file-item" key={index}>
                <span className="file-name">{file.name}</span>
                <span className="file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
                <button
                  className="remove-button"
                  onClick={() => removeFile(index)}
                  disabled={isLoading}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          className="update-button"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isLoading}
        >
          {isLoading ? "Uploading..." : `Upload ${selectedFiles.length} PDF(s)`}
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
      <BulkResumeTable resumes={resumes} />
    </div>
  );
};

export default BulkUploadForm;
