// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Upload, Trash2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import styled from "styled-components";
// import ReactQuill from 'react-quill';


// const FooterManagementForm = () => {
//   const [terms, setTerms] = useState({ title: '', description: '' });
//   const [privacy, setPrivacy] = useState({ title: '', description: '' });
//   const [cookie, setCookie] = useState({ title: '', description: '' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("vendorToken");

//   useEffect(() => {
//     fetchTermsAndCondition();
//     fetchPrivacyPolicy();
//     fetchCookiePolicy();
//   }, []);

//   const fetchData = async (url, setter) => {
//     try {
//       const response = await axios.get(url, { headers: { Authorization: token } });
//       setter(response.data.data || { title: '', description: '' });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       toast.error(error.response?.data?.message || 'Failed to fetch data');
//     }
//   };

//   const fetchTermsAndCondition = () => fetchData('https://apiwl.novajobs.us/api/admin/terms-and-condition', setTerms);
//   const fetchPrivacyPolicy = () => fetchData('https://apiwl.novajobs.us/api/admin/privacy-and-policy', setPrivacy);
//   const fetchCookiePolicy = () => fetchData('https://apiwl.novajobs.us/api/admin/cookie-and-policy', setCookie);

//   const updateData = async (url, data, successMessage) => {
//     if (!data.title.trim()) {
//       setError('Title is required');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await axios.put(url, data, {
//         headers: { Authorization: token, 'Content-Type': 'application/json' },
//       });
//       if (response.status === 200) {
//         toast.success(successMessage);
//         setError('');
//       }
//     } catch (error) {
//       console.error('Error updating data:', error);
//       toast.error(error.response?.data?.message || 'Failed to update data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <FormContainer>
//       <Title>Footer Management</Title>

//       {[{
//         title: 'Terms & Condition',
//         state: terms,
//         setState: setTerms,
//         updateFunc: () => updateData('https://apiwl.novajobs.us/api/admin/update-terms-and-condition', terms, 'Terms & Condition updated successfully')
//       }, {
//         title: 'Privacy Policy',
//         state: privacy,
//         setState: setPrivacy,
//         updateFunc: () => updateData('https://apiwl.novajobs.us/api/admin/update-privacy-and-policy', privacy, 'Privacy Policy updated successfully')
//       }, {
//         title: 'Cookie Policy',
//         state: cookie,
//         setState: setCookie,
//         updateFunc: () => updateData('https://apiwl.novajobs.us/api/admin/update-cookie-and-policy', cookie, 'Cookie Policy updated successfully')
//       }].map(({ title, state, setState, updateFunc }) => (
//         <Section key={title}>
//           <SectionTitle>{title}</SectionTitle>
//           <FormGroup>
//             <Label>Title</Label>
//             <Input
//               type="text"
//               value={state.title}
//               onChange={(e) => setState({ ...state, title: e.target.value })}
//               placeholder={`Enter ${title.toLowerCase()} title`}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Label>Description</Label>
//             {/* <TextArea
//               value={state.description}
//               onChange={(e) => setState({ ...state, description: e.target.value })}
//               placeholder={`Enter ${title.toLowerCase()} description`}
//               rows={4}
//             /> */}
//             <ReactQuill
//                 theme="snow"
//                 value={state.description}
//                 onChange={(content) => setState({ ...state, description: content })}
//                 placeholder={`Enter ${title.toLowerCase()} description`}
//               />
//           </FormGroup>
//           <UpdateButton onClick={updateFunc} disabled={isLoading}>
//             Update {title}
//           </UpdateButton>
//         </Section>
//       ))}
//       <Section>
//       <SectionTitle>Footer Data</SectionTitle>
//         <FormGroup>
//             <Label>Address</Label>
//             <Input
//               type="text"
//               placeholder='Enter the Address'
//             />
//           </FormGroup>
//         <FormGroup>
//             <Label>Email</Label>
//             <Input
//               type="text"
//               placeholder='Enter the Address'
//             />
//           </FormGroup>
//         <FormGroup>
//             <Label>Photo</Label>
//             <Input
//               type="file"
//               placeholder='Enter the Address'
//             />
//           </FormGroup>
//       </Section>
//     </FormContainer>
//   );
// };


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

// const FormGroup = styled.div`
//   margin-bottom: 1rem;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-weight: 500;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.25rem;
//   font-size: 0.875rem;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid #e2e8f0;
//   border-radius: 0.25rem;
//   font-size: 0.875rem;
//   resize: vertical;
// `;

// const MediaContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const MediaPreview = styled.img`
//   max-width: 300px;
//   max-height: 300px;
//   object-fit: contain;
// `;

// const VideoPreview = styled.video`
//   max-width: 300px;
//   max-height: 300px;
// `;

// const FileInputWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
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

// const UpdateButton = styled.button`
//   background-color: #3b82f6;
//   color: white;
//   padding: 0.5rem 1rem;
//   border-radius: 0.25rem;
//   border: none;
//   font-weight: 500;
//   width: 100%;
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
//   padding: 0.5rem;
//   color: #ef4444;
//   border-radius: 0.25rem;
//   &:hover {
//     background-color: #fee2e2;
//   }
// `;

// const ErrorText = styled.p`
//   color: #ef4444;
//   font-size: 0.875rem;
//   margin-top: 0.5rem;
// `;

// export default FooterManagementForm;

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import ReactQuill from "react-quill"
import "./Form-style.css"

const FooterManagementForm = () => {
  const [terms, setTerms] = useState({ title: "", description: "" })
  const [privacy, setPrivacy] = useState({ title: "", description: "" })
  const [cookie, setCookie] = useState({ title: "", description: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const token = localStorage.getItem("vendorToken")

  useEffect(() => {
    fetchTermsAndCondition()
    fetchPrivacyPolicy()
    fetchCookiePolicy()
  }, [])

  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url, { headers: { Authorization: token } })
      setter(response.data.data || { title: "", description: "" })
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error(error.response?.data?.message || "Failed to fetch data")
    }
  }

  const fetchTermsAndCondition = () => fetchData("https://apiwl.novajobs.us/api/admin/terms-and-condition", setTerms)
  const fetchPrivacyPolicy = () => fetchData("https://apiwl.novajobs.us/api/admin/privacy-and-policy", setPrivacy)
  const fetchCookiePolicy = () => fetchData("https://apiwl.novajobs.us/api/admin/cookie-and-policy", setCookie)

  const updateData = async (url, data, successMessage) => {
    if (!data.title.trim()) {
      setError("Title is required")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.put(url, data, {
        headers: { Authorization: token, "Content-Type": "application/json" },
      })
      if (response.status === 200) {
        toast.success(successMessage)
        setError("")
      }
    } catch (error) {
      console.error("Error updating data:", error)
      toast.error(error.response?.data?.message || "Failed to update data")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">Footer Management</h1>

      {[
        {
          title: "Terms & Condition",
          state: terms,
          setState: setTerms,
          updateFunc: () =>
            updateData(
              "https://apiwl.novajobs.us/api/admin/update-terms-and-condition",
              terms,
              "Terms & Condition updated successfully",
            ),
        },
        {
          title: "Privacy Policy",
          state: privacy,
          setState: setPrivacy,
          updateFunc: () =>
            updateData(
              "https://apiwl.novajobs.us/api/admin/update-privacy-and-policy",
              privacy,
              "Privacy Policy updated successfully",
            ),
        },
        {
          title: "Cookie Policy",
          state: cookie,
          setState: setCookie,
          updateFunc: () =>
            updateData(
              "https://apiwl.novajobs.us/api/admin/update-cookie-and-policy",
              cookie,
              "Cookie Policy updated successfully",
            ),
        },
      ].map(({ title, state, setState, updateFunc }) => (
        <div className="section" key={title}>
          <h2 className="section-title1">{title}</h2>
          <div className="form-group">
            <label className="label">Title</label>
            <input
              className="input"
              type="text"
              value={state.title}
              onChange={(e) => setState({ ...state, title: e.target.value })}
              placeholder={`Enter ${title.toLowerCase()} title`}
            />
          </div>
          <div className="form-group">
            <label className="label">Description</label>
            <ReactQuill
              theme="snow"
              value={state.description}
              onChange={(content) => setState({ ...state, description: content })}
              placeholder={`Enter ${title.toLowerCase()} description`}
            />
          </div>
          <button className="update-button" onClick={updateFunc} disabled={isLoading}>
            Update {title}
          </button>
        </div>
      ))}
      <div className="section">
        <h2 className="section-title1">Footer Data</h2>
        <div className="form-group">
          <label className="label">Address</label>
          <input className="input" type="text" placeholder="Enter the Address" />
        </div>
        <div className="form-group">
          <label className="label">Email</label>
          <input className="input" type="text" placeholder="Enter the Address" />
        </div>
        <div className="form-group">
          <label className="label">Photo</label>
          <input className="input" type="file" placeholder="Enter the Address" />
        </div>
      </div>
    </div>
  )
}

export default FooterManagementForm

