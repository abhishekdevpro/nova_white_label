
// import React, { useState } from "react";
// import styled from "styled-components";
// import { Upload, Trash2, Plus } from "lucide-react";
// import { toast } from "react-toastify";

// const BulkUploadForm = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     const pdfFiles = files.filter((file) => file.type === "application/pdf");
    
//     // Check file size (limit to 10MB per file)
//     const oversizedFiles = pdfFiles.filter(file => file.size > 10 * 1024 * 1024);
    
//     if (oversizedFiles.length > 0) {
//       setError("Some files exceed the 10MB size limit");
//       return;
//     }

//     setSelectedFiles(pdfFiles);
//     setError("");
//   };

//   const removeFile = (indexToRemove) => {
//     setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
//   };

//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) {
//       setError("Please select at least one PDF file.");
//       return;
//     }

//     setIsLoading(true);
//     setError("");

//     try {
//       // Simulated upload logic
//       const formData = new FormData();
//       selectedFiles.forEach(file => {
//         formData.append('files', file);
//       });

//       // Uncomment and replace with actual API endpoint when ready
//       // const response = await axios.post('your-upload-endpoint', formData, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data'
//       //   }
//       // });

//       // Simulated success
//       toast.success(`Successfully uploaded ${selectedFiles.length} PDF file(s)`);
//       setSelectedFiles([]);
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error("Failed to upload files");
//       setError(error.response?.data?.message || "Upload failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <FormContainer>
//       <Title>Bulk PDF Upload</Title>
      
//       <Section>
//         <SectionTitle>Upload PDF Files</SectionTitle>
        
//         <FileInputWrapper>
//           <FileInput
//             type="file"
//             multiple
//             accept="application/pdf"
//             onChange={handleFileChange}
//             id="pdf-upload"
//           />
//           <FileInputLabel htmlFor="pdf-upload">
//             <Upload size={20} />
//             Choose PDF Files
//           </FileInputLabel>
//         </FileInputWrapper>

//         {selectedFiles.length > 0 && (
//           <FileListContainer>
//             {selectedFiles.map((file, index) => (
//               <FileItem key={index}>
//                 <FileName>{file.name}</FileName>
//                 <FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</FileSize>
//                 <RemoveButton onClick={() => removeFile(index)}>
//                   <Trash2 size={16} />
//                 </RemoveButton>
//               </FileItem>
//             ))}
//           </FileListContainer>
//         )}

//         <UpdateButton
//           onClick={handleUpload}
//           disabled={selectedFiles.length === 0 || isLoading}
//         >
//           {isLoading ? 'Uploading...' : `Upload ${selectedFiles.length} PDF(s)`}
//         </UpdateButton>
//       </Section>

//       {error && <ErrorText>{error}</ErrorText>}
//     </FormContainer>
//   );
// };

// // Styled Components (similar to the Navbar Management Form)
// const FormContainer = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 2rem;
// `;

// const Title = styled.h1`
//   font-size: 1.5rem;
//   font-weight: 600;
//   margin-bottom: 2rem;
//   text-align: center;
// `;

// const Section = styled.div`
//   margin-bottom: 2rem;
//   padding: 1.5rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.5rem;
// `;

// const SectionTitle = styled.h2`
//   font-size: 1.25rem;
//   font-weight: 600;
//   margin-bottom: 1.5rem;
// `;

// const FileInputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 1rem;
// `;

// const FileInput = styled.input`
//   display: none;
// `;

// const FileInputLabel = styled.label`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.5rem 1rem;
//   background-color: #f3f4f6;
//   border-radius: 0.25rem;
//   cursor: pointer;
//   &:hover {
//     background-color: #e5e7eb;
//   }
// `;

// const FileListContainer = styled.div`
//   margin-top: 1rem;
// `;

// const FileItem = styled.div`
//   display: grid;
//   grid-template-columns: 1fr auto auto;
//   gap: 1rem;
//   align-items: center;
//   padding: 0.75rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.25rem;
//   margin-bottom: 0.5rem;
// `;

// const FileName = styled.span`
//   font-size: 0.875rem;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;

// const FileSize = styled.span`
//   font-size: 0.75rem;
//   color: #6b7280;
// `;

// const UpdateButton = styled.button`
//   width: 100%;
//   margin-top: 1rem;
//   background-color: #3b82f6;
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 0.25rem;
//   border: none;
//   font-weight: 500;
//   &:disabled {
//     background-color: #9ca3af;
//     cursor: not-allowed;
//   }
//   &:hover:not(:disabled) {
//     background-color: #2563eb;
//   }
// `;

// const RemoveButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #ef4444;
//   border-radius: 0.25rem;
//   border:none;
//   &:hover {
//     background-color: #fee2e2;
//   }
// `;

// const ErrorText = styled.p`
//   color: #ef4444;
//   font-size: 0.875rem;
//   margin-top: 0.5rem;
//   text-align: center;
// `;

// export default BulkUploadForm;


// import { useState } from "react"
// import { Upload, Trash2 } from "lucide-react"
// import { toast } from "react-toastify"
// import "./Form-style.css"
// import axios from "axios"

// const BulkUploadForm = () => {
//   const [selectedFiles, setSelectedFiles] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")
//  const token = localStorage.getItem('vendorToken')
//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files)
//     const pdfFiles = files.filter((file) => file.type === "application/pdf")

//     // Check file size (limit to 10MB per file)
//     const oversizedFiles = pdfFiles.filter((file) => file.size > 10 * 1024 * 1024)

//     if (oversizedFiles.length > 0) {
//       setError("Some files exceed the 10MB size limit")
//       return
//     }

//     setSelectedFiles(pdfFiles)
//     setError("")
//   }

//   const removeFile = (indexToRemove) => {
//     setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove))
//   }
// const formData = {}
//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) {
//       setError("Please select at least one PDF file.")
//       return
//     }
//     formData.append("files",selectedFiles)
//     const response = await axios.post(`https://apiwl.novajobs.us/api/admin/bulk-upload`,
//         {
//             formData
//         },{
//             headers:token
//         }
//     )

//     setIsLoading(true)
//     setError("")

//     try {
//       // Simulated upload logic
//       const formData = new FormData()
//       selectedFiles.forEach((file) => {
//         formData.append("files", file)
//       })

//       // Uncomment and replace with actual API endpoint when ready
//       // const response = await axios.post('your-upload-endpoint', formData, {
//       //   headers: {
//       //     'Content-Type': 'multipart/form-data'
//       //   }
//       // });

//       // Simulated success
//       toast.success(`Successfully uploaded ${selectedFiles.length} PDF file(s)`)
//       setSelectedFiles([])
//     } catch (error) {
//       console.error("Upload error:", error)
//       toast.error("Failed to upload files")
//       setError(error.response?.data?.message || "Upload failed")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="form-container">
//       <h1 className="title">Bulk PDF Upload</h1>

//       <div className="section">
//         <h2 className="section-title1">Upload PDF Files</h2>

//         <div className="file-input-wrapper">
//           <input
//             className="file-input"
//             type="file"
//             multiple
//             accept="application/pdf"
//             onChange={handleFileChange}
//             id="pdf-upload"
//           />
//           <label className="file-input-label" htmlFor="pdf-upload">
//             <Upload size={20} />
//             Choose PDF Files
//           </label>
//         </div>

//         {selectedFiles.length > 0 && (
//           <div className="file-list-container">
//             {selectedFiles.map((file, index) => (
//               <div className="file-item" key={index}>
//                 <span className="file-name">{file.name}</span>
//                 <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
//                 <button className="remove-button" onClick={() => removeFile(index)}>
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <button className="update-button" onClick={handleUpload} disabled={selectedFiles.length === 0 || isLoading}>
//           {isLoading ? "Uploading..." : `Upload ${selectedFiles.length} PDF(s)`}
//         </button>
//       </div>

//       {error && <p className="error-text">{error}</p>}
//     </div>
//   )
// }

// export default BulkUploadForm

import React, { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BulkUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Get token from localStorage (ensure it's properly stored before usage)
  const token = localStorage.getItem('vendorToken');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    
    // Filter PDF files
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    // Check file size (limit to 10MB per file)
    const validFiles = pdfFiles.filter((file) => file.size <= 10 * 1024 * 1024);
    const oversizedFiles = pdfFiles.filter((file) => file.size > 10 * 1024 * 1024);

    if (oversizedFiles.length > 0) {
      const oversizedFileNames = oversizedFiles.map(file => file.name).join(", ");
      setError(`The following files exceed the 10MB size limit: ${oversizedFileNames}`);
      return;
    }

    setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
    setError("");
  };

  const removeFile = (indexToRemove) => {
    setSelectedFiles(selectedFiles.filter((_, index) => index !== indexToRemove));
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
        'https://apiwl.novajobs.us/api/admin/bulk-upload', 
        formData, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}` // Assuming token-based authentication
          }
        }
      );

      // Handle successful upload
      toast.success(`Successfully uploaded ${selectedFiles.length} PDF file(s)`);
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
                <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
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
    </div>
  );
};

export default BulkUploadForm;