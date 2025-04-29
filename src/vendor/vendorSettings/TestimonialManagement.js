// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Upload, Trash2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import styled from "styled-components";
// import ReactQuill from 'react-quill';

// const TestimonialManagementForm = () => {
//   const [name, setName] = useState('');
//   const [place, setPlace] = useState('');
//   const [content, setContent] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [testimonials, setTestimonials] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [currentTestimonialId, setCurrentTestimonialId] = useState(null);

//   const token = localStorage.getItem("vendorToken");

//   // Fetch existing testimonials
//   const fetchTestimonials = async () => {
//     try {
//       const response = await axios.get('https://apiwl.novajobs.us/api/admin/testimonial', {
//         headers: {
//           Authorization: token,
//         },
//       });
      
//       if (response.data.data) {
//         setTestimonials(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching testimonials:', error);
//       toast.error(error.response?.data?.message || 'Failed to fetch testimonials');
//     }
//   };
//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
//       const fileExtension = file.name.split('.').pop().toLowerCase();
      
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Photo size should not exceed 5MB');
//         return;
//       }

//       if (!allowedExtensions.includes(fileExtension)) {
//         setError('Please upload a valid image file (PNG, JPG, JPEG, GIF)');
//         return;
//       }

//       setPhoto(file);
//       setError('');

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhotoPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemovePhoto = () => {
//     setPhoto(null);
//     setPhotoPreview('');
//   };

//   const resetForm = () => {
//     setName('');
//     setPlace('');
//     setContent('');
//     setPhoto(null);
//     setPhotoPreview('');
//     setError('');
//     setEditMode(false);
//     setCurrentTestimonialId(null);
//   };

//   const handleEditTestimonial = (testimonial) => {
//     setName(testimonial.name || '');
//     setPlace(testimonial.place || '');
//     setContent(testimonial.content || '');
    
//     if (testimonial.photo) {
//       setPhotoPreview(testimonial.photo);
//     }
    
//     setEditMode(true);
//     setCurrentTestimonialId(testimonial.id);
//   };

//   const handleDeleteTestimonial = async (id) => {
//     if (window.confirm('Are you sure you want to delete this testimonial?')) {
//       try {
//         await axios.delete(`https://apiwl.novajobs.us/api/admin/delete-testimonial/${id}`, {
//           headers: {
//             Authorization: token,
//           },
//         });
        
//         toast.success('Testimonial deleted successfully');
//         // Update testimonials list
//         setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
//       } catch (error) {
//         console.error('Error deleting testimonial:', error);
//         toast.error(error.response?.data?.message || 'Failed to delete testimonial');
//       }
//     }
//   };

//   const handleSubmit = async () => {
//     if (!name.trim()) {
//       setError('Name is required');
//       return;
//     }

//     if (!place.trim()) {
//       setError('Place is required');
//       return;
//     }

//     if (!content.trim()) {
//       setError('Content is required');
//       return;
//     }

//     if (!photoPreview && !editMode) {
//       setError('Photo is required');
//       return;
//     }

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('place', place);
//     formData.append('content', content);

//     if (photo) {
//       formData.append('photo', photo);
//     }

//     try {
//       let response;
      
//       if (editMode) {
//         response = await axios.put(
//           `https://apiwl.novajobs.us/api/admin/update-testimonial/${currentTestimonialId}`,
//           formData,
//           {
//             headers: {
//               Authorization: token,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         toast.success('Testimonial updated successfully');
//       } else {
//         response = await axios.post(
//           'https://apiwl.novajobs.us/api/admin/add-testimonial',
//           formData,
//           {
//             headers: {
//               Authorization: token,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         toast.success('Testimonial added successfully');
//       }

//       if (response.status === 200 || response.status === 201) {
//         // Refresh testimonials list
//         fetchTestimonials()
        
//         resetForm();
//       }
//     } catch (error) {
//       console.error('Error managing testimonial:', error);
//       setError(error.response?.data?.message || 'Failed to save testimonial');
//       toast.error('Failed to save testimonial');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <FormContainer>
//       <Title>{editMode ? 'Edit Testimonial' : 'Add New Testimonial'}</Title>

//       <Section>
//         <SectionTitle>Testimonial Information</SectionTitle>
        
//         <FormGroup>
//           <Label>Name</Label>
//           <Input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter person's name"
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Place/Company</Label>
//           <Input
//             type="text"
//             value={place}
//             onChange={(e) => setPlace(e.target.value)}
//             placeholder="Enter location or company name"
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Testimonial Content</Label>
//           <ReactQuill
//             theme="snow"
//             value={content}
//             onChange={setContent}
//             placeholder="Enter testimonial content..."
//           />
//         </FormGroup>
//       </Section>

//       <Section>
//         <SectionTitle>Upload Photo</SectionTitle>
//         <FormGroup>
//           <Label>Person's Photo</Label>
//           <MediaContainer>
//             {photoPreview && (
//               <MediaPreview src={photoPreview} alt="Photo preview" />
//             )}
//             <FileInputWrapper>
//               <FileInput
//                 type="file"
//                 accept="image/*"
//                 onChange={handlePhotoChange}
//                 id="photo-upload"
//               />
//               <FileInputLabel htmlFor="photo-upload">
//                 <Upload size={20} />
//                 Choose Photo
//               </FileInputLabel>
//               {photoPreview && (
//                 <RemoveButton onClick={handleRemovePhoto}>
//                   <Trash2 size={20} />
//                 </RemoveButton>
//               )}
//             </FileInputWrapper>
//           </MediaContainer>
//         </FormGroup>
//       </Section>

//       <ButtonGroup>
//         <ActionButton onClick={handleSubmit} disabled={isLoading} primary>
//           {editMode ? 'Update Testimonial' : 'Add Testimonial'}
//         </ActionButton>
        
//         {editMode && (
//           <ActionButton onClick={resetForm} disabled={isLoading}>
//             Cancel Edit
//           </ActionButton>
//         )}
//       </ButtonGroup>

//       {error && <ErrorText>{error}</ErrorText>}

//       {testimonials.length > 0 && (
//         <Section>
//           <SectionTitle>Existing Testimonials</SectionTitle>
//           <TestimonialsList>
//             {testimonials.map((testimonial) => (
//               <TestimonialCard key={testimonial.id}>
//                 <TestimonialHeader>
//                   {testimonial.photo && (
//                     <TestimonialPhoto src={testimonial.photo} alt={testimonial.name} />
//                   )}
//                   <TestimonialInfo>
//                     <TestimonialName>{testimonial.name}</TestimonialName>
//                     <TestimonialPlace>{testimonial.place}</TestimonialPlace>
//                   </TestimonialInfo>
//                 </TestimonialHeader>
//                 <TestimonialContent dangerouslySetInnerHTML={{ __html: testimonial.content }} />
//                 <TestimonialActions>
//                   <ActionButton small onClick={() => handleEditTestimonial(testimonial)}>
//                     Edit
//                   </ActionButton>
//                   <ActionButton small danger onClick={() => handleDeleteTestimonial(testimonial.id)}>
//                     Delete
//                   </ActionButton>
//                 </TestimonialActions>
//               </TestimonialCard>
//             ))}
//           </TestimonialsList>
//         </Section>
//       )}
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

// const MediaContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
// `;

// const MediaPreview = styled.img`
//   max-width: 200px;
//   max-height: 200px;
//   object-fit: contain;
//   border-radius: 0.25rem;
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

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
// `;

// const ActionButton = styled.button`
//   background-color: ${props => props.primary ? '#3b82f6' : props.danger ? '#ef4444' : '#f3f4f6'};
//   color: ${props => props.primary || props.danger ? 'white' : '#374151'};
//   padding: ${props => props.small ? '0.25rem 0.75rem' : '0.5rem 1rem'};
//   border-radius: 0.25rem;
//   border: none;
//   font-weight: 500;
//   flex: ${props => props.small ? '0 0 auto' : '1'};
//   &:disabled {
//     background-color: #9ca3af;
//     cursor: not-allowed;
//   }
//   &:hover:not(:disabled) {
//     background-color: ${props => props.primary ? '#2563eb' : props.danger ? '#dc2626' : '#e5e7eb'};
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

// const TestimonialsList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1.5rem;
// `;

// const TestimonialCard = styled.div`
//   border: 1px solid #e2e8f0;
//   border-radius: 0.5rem;
//   padding: 1rem;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// const TestimonialHeader = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   margin-bottom: 1rem;
// `;

// const TestimonialPhoto = styled.img`
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   object-fit: cover;
// `;

// const TestimonialInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const TestimonialName = styled.h3`
//   font-size: 1rem;
//   font-weight: 600;
//   margin: 0;
// `;

// const TestimonialPlace = styled.p`
//   font-size: 0.875rem;
//   color: #6b7280;
//   margin: 0.25rem 0 0;
// `;

// const TestimonialContent = styled.div`
//   font-size: 0.875rem;
//   margin-bottom: 1rem;
  
//   p {
//     margin: 0 0 0.5rem;
//   }
// `;

// const TestimonialActions = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.5rem;
// `;

// export default TestimonialManagementForm;

"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Upload, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import ReactQuill from "react-quill"
import "./Form-style.css"

const TestimonialManagementForm = () => {
  const [name, setName] = useState("")
  const [place, setPlace] = useState("")
  const [content, setContent] = useState("")
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [currentTestimonialId, setCurrentTestimonialId] = useState(null)

  const token = localStorage.getItem("vendorToken")

  // Fetch existing testimonials
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get("https://apiwl.novajobs.us/api/admin/testimonial", {
        headers: {
          Authorization: token,
        },
      })

      if (response.data.data) {
        setTestimonials(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      toast.error(error.response?.data?.message || "Failed to fetch testimonials")
    }
  }
  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedExtensions = ["png", "jpg", "jpeg", "gif"]
      const fileExtension = file.name.split(".").pop().toLowerCase()

      if (file.size > 5 * 1024 * 1024) {
        setError("Photo size should not exceed 5MB")
        return
      }

      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please upload a valid image file (PNG, JPG, JPEG, GIF)")
        return
      }

      setPhoto(file)
      setError("")

      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setPhotoPreview("")
  }

  const resetForm = () => {
    setName("")
    setPlace("")
    setContent("")
    setPhoto(null)
    setPhotoPreview("")
    setError("")
    setEditMode(false)
    setCurrentTestimonialId(null)
  }

  const handleEditTestimonial = (testimonial) => {
    setName(testimonial.name || "")
    setPlace(testimonial.place || "")
    setContent(testimonial.content || "")

    if (testimonial.photo) {
      setPhotoPreview(testimonial.photo)
    }

    setEditMode(true)
    setCurrentTestimonialId(testimonial.id)
  }

  const handleDeleteTestimonial = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(`https://apiwl.novajobs.us/api/admin/delete-testimonial/${id}`, {
          headers: {
            Authorization: token,
          },
        })

        toast.success("Testimonial deleted successfully")
        // Update testimonials list
        setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id))
      } catch (error) {
        console.error("Error deleting testimonial:", error)
        toast.error(error.response?.data?.message || "Failed to delete testimonial")
      }
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!place.trim()) {
      setError("Place is required")
      return
    }

    if (!content.trim()) {
      setError("Content is required")
      return
    }

    if (!photoPreview && !editMode) {
      setError("Photo is required")
      return
    }

    setIsLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("place", place)
    formData.append("content", content)

    if (photo) {
      formData.append("photo", photo)
    }

    try {
      let response

      if (editMode) {
        response = await axios.put(
          `https://apiwl.novajobs.us/api/admin/update-testimonial/${currentTestimonialId}`,
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          },
        )
        toast.success("Testimonial updated successfully")
      } else {
        response = await axios.post("https://apiwl.novajobs.us/api/admin/add-testimonial", formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        })
        toast.success("Testimonial added successfully")
      }

      if (response.status === 200 || response.status === 201) {
        // Refresh testimonials list
        fetchTestimonials()

        resetForm()
      }
    } catch (error) {
      console.error("Error managing testimonial:", error)
      setError(error.response?.data?.message || "Failed to save testimonial")
      toast.error("Failed to save testimonial")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h1 className="title">{editMode ? "Edit Testimonial" : "Add New Testimonial"}</h1>

      <div className="section">
        <h2 className="section-title1">Testimonial Information</h2>

        <div className="form-group">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter person's name"
          />
        </div>

        <div className="form-group">
          <label className="label">Place/Company</label>
          <input
            className="input"
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Enter location or company name"
          />
        </div>

        <div className="form-group">
          <label className="label">Testimonial Content</label>
          <ReactQuill theme="snow" value={content} onChange={setContent} placeholder="Enter testimonial content..." />
        </div>
      </div>

      <div className="section">
        <h2 className="section-title1">Upload Photo</h2>
        <div className="form-group">
          <label className="label">Person's Photo</label>
          <div className="media-container">
            {photoPreview && (
              <img className="media-preview" src={photoPreview || "/placeholder.svg"} alt="Photo preview" />
            )}
            <div className="file-input-wrapper">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                id="photo-upload"
              />
              <label className="file-input-label" htmlFor="photo-upload">
                <Upload size={20} />
                Choose Photo
              </label>
              {photoPreview && (
                <button className="remove-button" onClick={handleRemovePhoto}>
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className={`action-button ${editMode ? "" : "primary"}`} onClick={handleSubmit} disabled={isLoading}>
          {editMode ? "Update Testimonial" : "Add Testimonial"}
        </button>

        {editMode && (
          <button className="action-button secondary" onClick={resetForm} disabled={isLoading}>
            Cancel Edit
          </button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      {testimonials.length > 0 && (
        <div className="section">
          <h2 className="section-title1">Existing Testimonials</h2>
          <div className="testimonials-list">
            {testimonials.map((testimonial) => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-header">
                  {testimonial.photo && (
                    <img
                      className="testimonial-photo"
                      src={`https://apiwl.novajobs.us${testimonial.photo}` || "/placeholder.svg"}
                      alt={testimonial.name}
                    />
                  )}
                  <div className="testimonial-info">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-place">{testimonial.place}</p>
                  </div>
                </div>
                <div className="testimonial-content" dangerouslySetInnerHTML={{ __html: testimonial.content }} />
                <div className="testimonial-actions">
                  <button className="action-button small" onClick={() => handleEditTestimonial(testimonial)}>
                    Edit
                  </button>
                  <button
                    className="action-button small danger"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TestimonialManagementForm

