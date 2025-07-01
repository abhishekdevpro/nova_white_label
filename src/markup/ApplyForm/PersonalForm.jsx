

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FileIcon } from "lucide-react";

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
//     // console.log(file, "Selected file for", type);
//     setFormData((prev) => ({ ...prev, [type]: file }));
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-64 text-gray-500">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-md">
//         {error}
//       </div>
//     );

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="firstName"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//           />
//           {errors.firstName && (
//             <p className="mt-1 text-sm text-red-600 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {errors.firstName}
//             </p>
//           )}
//         </div>

//         <div>
//           <label
//             htmlFor="lastName"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//           />
//           {errors.lastName && (
//             <p className="mt-1 text-sm text-red-600 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {errors.lastName}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             readOnly
//             className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Phone Number
//           </label>
//           <input
//             type="tel"
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             readOnly
//             className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
//           />
//         </div>
//       </div>

//       {/* <div>
//         <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
//           Location
//         </label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
//         />
//         {errors.location && (
//           <p className="mt-1 text-sm text-red-600 flex items-center">
//             <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//             </svg>
//             {errors.location}
//           </p>
//         )}
//       </div> */}
//       {/* <LocationAutocomplete
//     className="w-full" // Dynamic styling
//     selectedLocation={formData.location} // Pass selected location
//     onChange={(selectedOption) =>
//       setFormData({ ...formData, location: selectedOption ? selectedOption.value : "" })
//     } 
//   /> */}

//       <div className="space-y-6">
//         {/* Resume Section */}
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <FileIcon className="w-6 h-6 mr-2 text-blue-600" />
//             Resumé
//           </h3>
//           <div className="space-y-3">
//             {["upload", "select"].map((option) => (
//               <label
//                 key={option}
//                 className="flex items-center space-x-3 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="resumeOption"
//                   value={option}
//                   checked={formData.resumeOption === option}
//                   onChange={handleChange}
//                   className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
//                 />
//                 <span className="text-gray-700 capitalize">
//                   {option === "none"
//                     ? "Don't include a resumé"
//                     : `${option} a resumé`}
//                 </span>
//               </label>
//             ))}
//             {formData.resumeOption === "upload" && (
//               <div className="ml-8 mt-2">
//                 <input
//                   type="file"
//                   id="resumeUpload"
//                   name="resumeUpload"
//                   onChange={(e) => handleFileChange(e, "resume")}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100
//                     focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             )}
//             {formData.resumeOption === "select" && (
//               <div className="ml-8 mt-2">
//                 {existingResume ? (
//                   <div className="border rounded-md p-3 bg-white shadow-md space-y-2">
//                     <p className="text-sm text-gray-700 font-medium mb-2">
//                        Selected resume:
//                     </p>
//                     <iframe
//                       src={`https://apiwl.novajobs.us${existingResume}`}
//                       title="Resume Preview"
//                       className="w-full h-[500px] border rounded"
//                     ></iframe>
//                     <p className="text-xs text-gray-500">
//                       This resume will be submitted with your application.
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-sm text-red-500">
//                     No resume found. Please upload one.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Cover Letter Section */}
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//             <svg
//               className="w-6 h-6 mr-2 text-blue-600"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
//               <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
//             </svg>
//             Cover Letter
//           </h3>
//           <div className="space-y-3">
//             {["upload", "none"].map((option) => (
//               <label
//                 key={option}
//                 className="flex items-center space-x-3 cursor-pointer"
//               >
//                 <input
//                   type="radio"
//                   name="coverLetterOption"
//                   value={option}
//                   checked={formData.coverLetterOption === option}
//                   onChange={handleChange}
//                   className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
//                 />
//                 <span className="text-gray-700 capitalize">
//                   {option === "none"
//                     ? "Don't include a cover letter"
//                     : `${option} a cover letter`}
//                 </span>
//               </label>
//             ))}
//             {formData.coverLetterOption === "upload" && (
//               <div className="ml-8 mt-2">
//                 <input
//                   type="file"
//                   id="coverLetterUpload"
//                   name="coverLetterUpload"
//                   onChange={(e) => handleFileChange(e, "coverLetter")}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100
//                     focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfoForm;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileIcon } from "lucide-react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

// Styled Components
const StyledCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  color: #6c757d;
  
  .spinner {
    width: 2rem;
    height: 2rem;
    border: 0.125rem solid transparent;
    border-top: 0.125rem solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorAlert = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f1aeb5;
  color: #721c24;
  padding: 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:read-only {
    background-color: #e9ecef;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
  display: flex;
  align-items: center;
  
  svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
`;

const SectionCard = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
    color: #007bff;
  }
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.75rem;
  
  input[type="radio"] {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
  }
  
  span {
    color: #495057;
    text-transform: capitalize;
  }
`;

const FileInput = styled.input`
  display: block;
  width: 100%;
  font-size: 0.875rem;
  color: #6c757d;
  
  &::file-selector-button {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    border: none;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: #e3f2fd;
    color: #1976d2;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  &::file-selector-button:hover {
    background-color: #bbdefb;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const ResumePreview = styled.div`
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  padding: 0.75rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  iframe {
    width: 100%;
    height: 500px;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
  }
  
  .preview-label {
    font-size: 0.875rem;
    color: #495057;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .preview-note {
    font-size: 0.75rem;
    color: #6c757d;
    margin-top: 0.5rem;
  }
`;

const ErrorText = styled.p`
  font-size: 0.875rem;
  color: #dc3545;
`;

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
      <LoadingSpinner>
        <div className="spinner"></div>
      </LoadingSpinner>
    );
  }

  if (error) {
    return <ErrorAlert>{error}</ErrorAlert>;
  }

  return (
    <StyledCard>
      <div className="container-fluid">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label fw-medium">
                First Name
              </label>
              <StyledInput
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
              />
              {errors.firstName && (
                <ErrorMessage>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.firstName}
                </ErrorMessage>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label fw-medium">
                Last Name
              </label>
              <StyledInput
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
              />
              {errors.lastName && (
                <ErrorMessage>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.lastName}
                </ErrorMessage>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium">
                Email
              </label>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                readOnly
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label fw-medium">
                Phone Number
              </label>
              <StyledInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                readOnly
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-column gap-4">
              {/* Resume Section */}
              <SectionCard>
                <SectionTitle>
                  <FileIcon />
                  Resumé
                </SectionTitle>
                <div className="d-flex flex-column gap-3">
                  {["upload", "select"].map((option) => (
                    <RadioLabel key={option}>
                      <input
                        type="radio"
                        name="resumeOption"
                        value={option}
                        checked={formData.resumeOption === option}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                      <span>
                        {option === "none"
                          ? "Don't include a resumé"
                          : `${option} a resumé`}
                      </span>
                    </RadioLabel>
                  ))}
                  {formData.resumeOption === "upload" && (
                    <div className="ms-5 mt-2">
                      <FileInput
                        type="file"
                        id="resumeUpload"
                        name="resumeUpload"
                        onChange={(e) => handleFileChange(e, "resume")}
                        className="form-control"
                      />
                    </div>
                  )}
                  {formData.resumeOption === "select" && (
                    <div className="ms-5 mt-2">
                      {existingResume ? (
                        <ResumePreview>
                          <div className="preview-label">Selected resume:</div>
                          <iframe
                            src={`https://apiwl.novajobs.us${existingResume}`}
                            title="Resume Preview"
                          ></iframe>
                          <div className="preview-note">
                            This resume will be submitted with your application.
                          </div>
                        </ResumePreview>
                      ) : (
                        <ErrorText>
                          No resume found. Please upload one.
                        </ErrorText>
                      )}
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Cover Letter Section */}
              <SectionCard>
                <SectionTitle>
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Cover Letter
                </SectionTitle>
                <div className="d-flex flex-column gap-3">
                  {["upload", "none"].map((option) => (
                    <RadioLabel key={option}>
                      <input
                        type="radio"
                        name="coverLetterOption"
                        value={option}
                        checked={formData.coverLetterOption === option}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                      <span>
                        {option === "none"
                          ? "Don't include a cover letter"
                          : `${option} a cover letter`}
                      </span>
                    </RadioLabel>
                  ))}
                  {formData.coverLetterOption === "upload" && (
                    <div className="ms-5 mt-2">
                      <FileInput
                        type="file"
                        id="coverLetterUpload"
                        name="coverLetterUpload"
                        onChange={(e) => handleFileChange(e, "coverLetter")}
                        className="form-control"
                      />
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

export default PersonalInfoForm;