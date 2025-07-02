

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FileIcon } from "lucide-react";
// import styled from "styled-components";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Styled Components
// const StyledCard = styled.div`
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   padding: 1.5rem;
// `;

// const LoadingSpinner = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 16rem;
//   color: #6c757d;
  
//   .spinner {
//     width: 2rem;
//     height: 2rem;
//     border: 0.125rem solid transparent;
//     border-top: 0.125rem solid #007bff;
//     border-radius: 50%;
//     animation: spin 1s linear infinite;
//   }
  
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
// `;

// const ErrorAlert = styled.div`
//   background-color: #f8d7da;
//   border: 1px solid #f1aeb5;
//   color: #721c24;
//   padding: 1rem;
//   border-radius: 0.375rem;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const StyledInput = styled.input`
//   width: 100%;
//   padding: 0.5rem 0.75rem;
//   border: 1px solid #ced4da;
//   border-radius: 0.375rem;
//   transition: all 0.3s ease;
  
//   &:focus {
//     outline: none;
//     border-color: #80bdff;
//     box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
//   }
  
//   &:read-only {
//     background-color: #e9ecef;
//     cursor: not-allowed;
//   }
// `;

// const ErrorMessage = styled.p`
//   margin-top: 0.25rem;
//   font-size: 0.875rem;
//   color: #dc3545;
//   display: flex;
//   align-items: center;
  
//   svg {
//     width: 1rem;
//     height: 1rem;
//     margin-right: 0.25rem;
//   }
// `;

// const SectionCard = styled.div`
//   background-color: #f8f9fa;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   border: 1px solid #dee2e6;
// `;

// const SectionTitle = styled.h3`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: #495057;
//   margin-bottom: 1rem;
//   display: flex;
//   align-items: center;
  
//   svg {
//     width: 1.5rem;
//     height: 1.5rem;
//     margin-right: 0.5rem;
//     color: #007bff;
//   }
// `;

// const RadioLabel = styled.label`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   margin-bottom: 0.75rem;
  
//   input[type="radio"] {
//     width: 1.25rem;
//     height: 1.25rem;
//     margin-right: 0.75rem;
//   }
  
//   span {
//     color: #495057;
//     text-transform: capitalize;
//   }
// `;

// const FileInput = styled.input`
//   display: block;
//   width: 100%;
//   font-size: 0.875rem;
//   color: #6c757d;
  
//   &::file-selector-button {
//     margin-right: 1rem;
//     padding: 0.5rem 1rem;
//     border-radius: 50px;
//     border: none;
//     font-size: 0.875rem;
//     font-weight: 600;
//     background-color: #e3f2fd;
//     color: #1976d2;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
//   }
  
//   &::file-selector-button:hover {
//     background-color: #bbdefb;
//   }
  
//   &:focus {
//     outline: none;
//     box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
//   }
// `;

// const ResumePreview = styled.div`
//   border: 1px solid #ced4da;
//   border-radius: 0.375rem;
//   padding: 0.75rem;
//   background: white;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
//   iframe {
//     width: 100%;
//     height: 500px;
//     border: 1px solid #dee2e6;
//     border-radius: 0.375rem;
//   }
  
//   .preview-label {
//     font-size: 0.875rem;
//     color: #495057;
//     font-weight: 500;
//     margin-bottom: 0.5rem;
//   }
  
//   .preview-note {
//     font-size: 0.75rem;
//     color: #6c757d;
//     margin-top: 0.5rem;
//   }
// `;

// const ErrorText = styled.p`
//   font-size: 0.875rem;
//   color: #dc3545;
// `;

// const PersonalInfoForm = ({ formData, setFormData, errors }) => {
//   const [loading, setLoading] = useState(true);
//   const [existingResume, setExistingResume] = useState(null);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("jobSeekerLoginToken");

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(
//           "https://apiwl.novajobs.us/api/jobseeker/user-profile",
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );

//         const userData = response.data.data;
//         setExistingResume(userData.resume);
//         setFormData((prevData) => ({
//           ...prevData,
//           firstName: userData.first_name || "",
//           lastName: userData.last_name || "",
//           email: userData.email || "",
//           phone: userData.phone || "",
//           location: userData.location || "",
//           resumeOption: "",
//           coverLetterOption: "",
//         }));
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching user profile:", err);
//         setError("Failed to load user profile. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [setFormData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, [type]: file }));
//   };

//   if (loading) {
//     return (
//       <LoadingSpinner>
//         <div className="spinner"></div>
//       </LoadingSpinner>
//     );
//   }

//   if (error) {
//     return <ErrorAlert>{error}</ErrorAlert>;
//   }

//   return (
//     <StyledCard>
//       <div className="container-fluid">
//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label htmlFor="firstName" className="form-label fw-medium">
//                 First Name
//               </label>
//               <StyledInput
//                 type="text"
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//               {errors.firstName && (
//                 <ErrorMessage>
//                   <svg fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {errors.firstName}
//                 </ErrorMessage>
//               )}
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="mb-3">
//               <label htmlFor="lastName" className="form-label fw-medium">
//                 Last Name
//               </label>
//               <StyledInput
//                 type="text"
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//               {errors.lastName && (
//                 <ErrorMessage>
//                   <svg fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   {errors.lastName}
//                 </ErrorMessage>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="row g-4">
//           <div className="col-md-6">
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label fw-medium">
//                 Email
//               </label>
//               <StyledInput
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 readOnly
//                 className="form-control"
//               />
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="mb-3">
//               <label htmlFor="phone" className="form-label fw-medium">
//                 Phone Number
//               </label>
//               <StyledInput
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 value={formData.phone}
//                 readOnly
//                 className="form-control"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-12">
//             <div className="d-flex flex-column gap-4">
//               {/* Resume Section */}
//               <SectionCard>
//                 <SectionTitle>
//                   <FileIcon />
//                   Resumé
//                 </SectionTitle>
//                 <div className="d-flex flex-column gap-3">
//                   {["upload", "select"].map((option) => (
//                     <RadioLabel key={option}>
//                       <input
//                         type="radio"
//                         name="resumeOption"
//                         value={option}
//                         checked={formData.resumeOption === option}
//                         onChange={handleChange}
//                         className="form-check-input"
//                       />
//                       <span>
//                         {option === "none"
//                           ? "Don't include a resumé"
//                           : `${option} a resumé`}
//                       </span>
//                     </RadioLabel>
//                   ))}
//                   {formData.resumeOption === "upload" && (
//                     <div className="ms-5 mt-2">
//                       <FileInput
//                         type="file"
//                         id="resumeUpload"
//                         name="resumeUpload"
//                         onChange={(e) => handleFileChange(e, "resume")}
//                         className="form-control"
//                       />
//                     </div>
//                   )}
//                   {formData.resumeOption === "select" && (
//                     <div className="ms-5 mt-2">
//                       {existingResume ? (
//                         <ResumePreview>
//                           <div className="preview-label">Selected resume:</div>
//                           <iframe
//                             src={`https://apiwl.novajobs.us${existingResume}`}
//                             title="Resume Preview"
//                           ></iframe>
//                           <div className="preview-note">
//                             This resume will be submitted with your application.
//                           </div>
//                         </ResumePreview>
//                       ) : (
//                         <ErrorText>
//                           No resume found. Please upload one.
//                         </ErrorText>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </SectionCard>

//               {/* Cover Letter Section */}
//               <SectionCard>
//                 <SectionTitle>
//                   <svg fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
//                     <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
//                   </svg>
//                   Cover Letter
//                 </SectionTitle>
//                 <div className="d-flex flex-column gap-3">
//                   {["upload", "none"].map((option) => (
//                     <RadioLabel key={option}>
//                       <input
//                         type="radio"
//                         name="coverLetterOption"
//                         value={option}
//                         checked={formData.coverLetterOption === option}
//                         onChange={handleChange}
//                         className="form-check-input"
//                       />
//                       <span>
//                         {option === "none"
//                           ? "Don't include a cover letter"
//                           : `${option} a cover letter`}
//                       </span>
//                     </RadioLabel>
//                   ))}
//                   {formData.coverLetterOption === "upload" && (
//                     <div className="ms-5 mt-2">
//                       <FileInput
//                         type="file"
//                         id="coverLetterUpload"
//                         name="coverLetterUpload"
//                         onChange={(e) => handleFileChange(e, "coverLetter")}
//                         className="form-control"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </SectionCard>
//             </div>
//           </div>
//         </div>
//       </div>
//     </StyledCard>
//   );
// };

// export default PersonalInfoForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileIcon,
  AlertCircle,
  FileText,
  Mail,
  Phone,
  User,
  UserPlus,
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const PersonalInfoForm = ({ formData, setFormData, errors }) => {
  const [loading, setLoading] = useState(true);
  const [existingResume, setExistingResume] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jobSeekerLoginToken");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://apiwl.novajobs.us/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const userData = response.data.data;
        setExistingResume(userData.resume);
        setFormData((prevData) => ({
          ...prevData,
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          resumeOption: "",
          coverLetterOption: "",
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [type]: file }));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 text-primary">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <AlertCircle className="me-2" />
        {error}
      </div>
    );
  }

  return (
    <div className="">
      <div className="row g-4">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label text-primary fw-semibold">
            <User className="me-1" size={16} />
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.firstName && (
            <div className="text-danger mt-1 d-flex align-items-center">
              <AlertCircle className="me-1" size={16} />
              {errors.firstName}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label text-primary fw-semibold">
            <UserPlus className="me-1" size={16} />
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-control"
          />
          {errors.lastName && (
            <div className="text-danger mt-1 d-flex align-items-center">
              <AlertCircle className="me-1" size={16} />
              {errors.lastName}
            </div>
          )}
        </div>
      </div>

      <div className="row g-4 mt-3">
        <div className="col-md-6">
          <label className="form-label text-primary fw-semibold">
            <Mail className="me-1" size={16} />
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            className="form-control"
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label className="form-label text-primary fw-semibold">
            <Phone className="me-1" size={16} />
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            className="form-control"
            readOnly
          />
        </div>
      </div>

      {/* Resume Section */}
      <div className="mt-4 p-4 bg-light border rounded">
        <h5 className="text-primary d-flex align-items-center mb-3">
          <FileIcon className="me-2" />
          Resume
        </h5>
        {["upload", "select"].map((option) => (
          <div key={option} className="form-check mb-2">
            <input
              type="radio"
              name="resumeOption"
              value={option}
              checked={formData.resumeOption === option}
              onChange={handleChange}
              className="form-check-input"
              id={`resume-${option}`}
            />
            <label htmlFor={`resume-${option}`} className="form-check-label text-secondary">
              {option === "select" ? "Select existing resume" : "Upload a resume"}
            </label>
          </div>
        ))}
        {formData.resumeOption === "upload" && (
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "resume")}
            />
          </div>
        )}
        {formData.resumeOption === "select" && (
          <div className="mt-3">
            {existingResume ? (
              <div className="border p-2 rounded bg-white">
                <div className="mb-2 text-secondary">Selected resume:</div>
                <iframe
                  src={`https://apiwl.novajobs.us${existingResume}`}
                  className="w-100"
                  height="400"
                  title="Resume Preview"
                ></iframe>
              </div>
            ) : (
              <div className="text-danger mt-2">No resume found. Please upload one.</div>
            )}
          </div>
        )}
      </div>

      {/* Cover Letter Section */}
      <div className="mt-4 p-4 bg-light border rounded">
        <h5 className="text-primary d-flex align-items-center mb-3">
          <FileText className="me-2" />
          Cover Letter
        </h5>
        {["upload", "none"].map((option) => (
          <div key={option} className="form-check mb-2">
            <input
              type="radio"
              name="coverLetterOption"
              value={option}
              checked={formData.coverLetterOption === option}
              onChange={handleChange}
              className="form-check-input"
              id={`cover-${option}`}
            />
            <label htmlFor={`cover-${option}`} className="form-check-label text-secondary">
              {option === "none" ? "Don't include a cover letter" : "Upload a cover letter"}
            </label>
          </div>
        ))}
        {formData.coverLetterOption === "upload" && (
          <div className="mt-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleFileChange(e, "coverLetter")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
