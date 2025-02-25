import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import styled from "styled-components";

const HeaderManagementForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null);
    const [mediaPreview, setMediaPreview] = useState('');
    const [mediaType, setMediaType] = useState(''); // 'image' or 'video'
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const token = localStorage.getItem("vendorToken");
  
    // Fetch existing header data
    useEffect(() => {
      const fetchHeaderData = async () => {
        try {
          const response = await axios.get('https://apiwl.novajobs.us/api/admin/general-info', {
            headers: {
              Authorization: token,
            },
          });
          const headerData = response.data.data?.home_here_section;
          if (headerData) {
            setTitle(headerData.title || '');
            setDescription(headerData.description || '');
  
            const backgroundMedia = headerData.BackgroundMedia || '';
            if (backgroundMedia) {
              setMediaPreview(backgroundMedia);
  
              // Determine the media type based on the extension
              const fileExtension = backgroundMedia.split('.').pop().toLowerCase();
              const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
              const allowedVideoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  
              if (allowedImageExtensions.includes(fileExtension)) {
                setMediaType('image');
              } else if (allowedVideoExtensions.includes(fileExtension)) {
                setMediaType('video');
              } else {
                setError('Unsupported media type received from the server.');
              }
            }
          }
        } catch (error) {
          console.error('Error fetching header data:', error);
          toast.error('Failed to fetch existing header data');
        }
      };
  
      fetchHeaderData();
    }, []);
  
    const handleMediaChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        const allowedVideoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (file.size > 10 * 1024 * 1024) {
          setError('Media file size should not exceed 10MB');
          return;
        }
  
        if (allowedImageExtensions.includes(fileExtension)) {
          setMediaType('image');
        } else if (allowedVideoExtensions.includes(fileExtension)) {
          setMediaType('video');
        } else {
          setError('Please upload a valid image or video file');
          return;
        }
  
        setMedia(file);
        setError('');
  
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleRemoveMedia = () => {
      setMedia(null);
      setMediaPreview('');
      setMediaType('');
    };
  
    const handleSubmit = async () => {
      if (!title.trim()) {
        setError('Title is required');
        return;
      }
  
      setIsLoading(true);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
  
      if (media) {
        formData.append('background_media_upload', media);
      }
  
      try {
        const response = await axios.put(
          'https://apiwl.novajobs.us/api/admin/herosection',
          formData,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        if (response.status === 200) {
          toast.success('Header updated successfully');
          setError('');
        }
      } catch (error) {
        console.error('Error updating header:', error);
        setError(error.response?.data?.message || 'Failed to update header');
        toast.error('Failed to update header');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <FormContainer>
        <Title>Header Management</Title>
  
        <Section>
          <SectionTitle>Header Content</SectionTitle>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter header title"
            />
          </FormGroup>
  
          <FormGroup>
            <Label>Description</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter header description"
              rows={4}
            />
          </FormGroup>
        </Section>
  
        <Section>
          <SectionTitle>Media Upload</SectionTitle>
          <FormGroup>
            <Label>Header Image/Video</Label>
            <MediaContainer>
              {mediaPreview && (
                mediaType === 'image' ? (
                  <MediaPreview src={mediaPreview} alt="Media preview" />
                ) : (
                  <VideoPreview src={mediaPreview} controls alt="Video preview" />
                )
              )}
              <FileInputWrapper>
                <FileInput
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  id="media-upload"
                />
                <FileInputLabel htmlFor="media-upload">
                  <Upload size={20} />
                  Choose Media
                </FileInputLabel>
                {media && (
                  <RemoveButton onClick={handleRemoveMedia}>
                    <Trash2 size={20} />
                  </RemoveButton>
                )}
              </FileInputWrapper>
            </MediaContainer>
          </FormGroup>
        </Section>
  
        <UpdateButton onClick={handleSubmit} disabled={isLoading}>
          Update Header
        </UpdateButton>
  
        {error && <ErrorText>{error}</ErrorText>}
      </FormContainer>
    );
  };
  
// const HeaderManagementForm = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [media, setMedia] = useState(null);
//   const [mediaPreview, setMediaPreview] = useState('');
//   const [mediaType, setMediaType] = useState(''); // 'image' or 'video'
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const token = localStorage.getItem("vendorToken");

//   // Fetch existing header data
//   useEffect(() => {
//     const fetchHeaderData = async () => {
//       try {
//         const response = await axios.get('https://apiwl.novajobs.us/api/admin/general-info', {
//           headers: {
//             'Authorization': token
//           }
//         });
//         console.log(response.data.data.home_here_section,"llll");
//         if (response.data.data) {
//           const headerData = response.data.data.home_here_section;
//           setTitle(headerData.title || '');
//           setDescription(headerData.description || '');
//           setMediaPreview(headerData.BackgroundMedia || '');
//         }
//       } catch (error) {
//         console.error('Error fetching header data:', error);
//         toast.error('Failed to fetch existing header data');
//       }
//     };

//     fetchHeaderData();
//   }, []);

//   const handleMediaChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Define allowed extensions for images and videos
//       const allowedImageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
//       const allowedVideoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
  
//       // Extract file extension
//       const fileExtension = file.name.split('.').pop().toLowerCase();
  
//       // Check file size (10MB limit)
//       if (file.size > 10 * 1024 * 1024) {
//         setError('Media file size should not exceed 10MB');
//         return;
//       }
  
//       // Validate file extension and determine media type
//       if (allowedImageExtensions.includes(fileExtension)) {
//         setMediaType('image'); // Set media type to image
//       } else if (allowedVideoExtensions.includes(fileExtension)) {
//         setMediaType('video'); // Set media type to video
//       } else {
//         setError('Please upload a valid image or video file');
//         return;
//       }
  
//       setMedia(file); // Save the file
//       setError(''); // Clear any existing errors
  
//       // Generate a preview based on media type
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview(reader.result); // For images or videos
//       };
//       reader.readAsDataURL(file);
//     }
//   };
  
  
//   const handleRemoveMedia = () => {
//     setMedia(null);
//     setMediaPreview('');
//     setMediaType('');
//   };

//   const handleSubmit = async () => {
//     // Validate inputs
//     if (!title.trim()) {
//       setError('Title is required');
//       return;
//     }

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
    
//     if (media) {
//       formData.append('background_media_upload', media);
//     }

//     try {
//       const response = await axios.put(
//         'https://apiwl.novajobs.us/api/admin/herosection',
//         formData,
//         {
//           headers: {
//             'Authorization': token,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       if (response.status === 200) {
//         toast.success('Header updated successfully');
//         setError('');
//       }
//     } catch (error) {
//       console.error('Error updating header:', error);
//       setError(error.response?.data?.message || 'Failed to update header');
//       toast.error('Failed to update header');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <FormContainer>
//       <Title>Header Management</Title>

//       <Section>
//         <SectionTitle>Header Content</SectionTitle>
        
//         <FormGroup>
//           <Label>Title</Label>
//           <Input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter header title"
//           />
//         </FormGroup>

//         <FormGroup>
//           <Label>Description</Label>
//           <TextArea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter header description"
//             rows={4}
//           />
//         </FormGroup>
//       </Section>

//       <Section>
//         <SectionTitle>Media Upload</SectionTitle>
//         <FormGroup>
//           <Label>Header Image/Video</Label>
//           <MediaContainer>
//             {mediaPreview && (
//               mediaType === 'image' ? (
//                 <MediaPreview 
//                   src={mediaPreview} 
//                   alt="Media preview" 
//                 />
//               ) : (
//                 <VideoPreview 
//                   src={mediaPreview} 
//                   controls 
//                   alt="Video preview" 
//                 />
//               )
//             )}
//             <FileInputWrapper>
//               <FileInput
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleMediaChange}
//                 id="media-upload"
//               />
//               <FileInputLabel htmlFor="media-upload">
//                 <Upload size={20} />
//                 Choose Media
//               </FileInputLabel>
//               {media && (
//                 <RemoveButton onClick={handleRemoveMedia}>
//                   <Trash2 size={20} />
//                 </RemoveButton>
//               )}
//             </FileInputWrapper>
//           </MediaContainer>
//         </FormGroup>
//       </Section>

//       <UpdateButton 
//         onClick={handleSubmit}
//         disabled={isLoading}
//       >
//         Update Header
//       </UpdateButton>

//       {error && <ErrorText>{error}</ErrorText>}
//     </FormContainer>
//   );
// };

// Styled Components (mostly reused from previous component)
const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  resize: vertical;
`;

const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MediaPreview = styled.img`
  max-width: 300px;
  max-height: 300px;
  object-fit: contain;
`;

const VideoPreview = styled.video`
  max-width: 300px;
  max-height: 300px;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #e5e7eb;
  }
`;

const UpdateButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  font-weight: 500;
  width: 100%;
  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #2563eb;
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  color: #ef4444;
  border-radius: 0.25rem;
  &:hover {
    background-color: #fee2e2;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export default HeaderManagementForm;