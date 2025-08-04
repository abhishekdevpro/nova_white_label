import React from 'react';
import styled from 'styled-components';
import { FaCamera, FaTimes } from 'react-icons/fa';

// Styled Components
const PostWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
  border-top: 4px solid #1e3a8a;
  transition: all 0.3s ease;

  @media (max-width: 576px) {
    padding: 16px;
    border-radius: 12px;
  }

  &:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

const PostInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 16px;
  background-color: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  color: #374151;
  resize: none;
  transition: all 0.3s ease;

  @media (max-width: 576px) {
    font-size: 14px;
    padding: 12px;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #1e3a8a;
  font-weight: 500;

  &:hover {
    background-color: #e5e7eb;
    transform: translateY(-1px);
  }

  svg {
    font-size: 18px;
  }

  @media (max-width: 576px) {
    justify-content: center;
    padding: 10px;
  }
`;

const PostButton = styled.button`
  padding: 10px 24px;
  background-color: #1e3a8a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1e40af;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const ImagePreviewContainer = styled.div`
  margin-top: 16px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  @media (max-width: 576px) {
    margin-top: 12px;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 576px) {
    max-height: 200px;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc2626;
    transform: scale(1.1);
  }
`;

const PostCreation = ({ content, setContent, image, setImage, addPost }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <PostWrapper>
      <PostInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts or ask a question..."
        maxLength={100}
      />

      <ActionBar>
        <UploadButton htmlFor="file-upload">
          <FaCamera />
          <span>Add Photo</span>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </UploadButton>

        <PostButton
          onClick={addPost}
          disabled={!content.trim() && !image}
        >
          Share Post
        </PostButton>
      </ActionBar>

      {image && (
        <ImagePreviewContainer>
          <PreviewImage src={image} alt="Preview" />
          <RemoveImageButton onClick={() => setImage(null)}>
            <FaTimes />
          </RemoveImageButton>
        </ImagePreviewContainer>
      )}
    </PostWrapper>
  );
};

export default PostCreation;
