import React, { useState } from 'react';
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton, WhatsappShareButton } from 'react-share';
import { AiOutlineShareAlt } from 'react-icons/ai'; // Importing share icon
import { FaLinkedin, FaTwitter, FaFacebookF, FaWhatsapp } from 'react-icons/fa'; // Importing social media icons
import styled from 'styled-components';

// Styled Components
const ShareButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: black;
  padding: 8px 16px;
  border-radius: 6px;
  border:none;
  cursor: pointer;
  transition: background-color 0.2s;

//   &:hover {
//     background-color: ${({ hoverColor }) => hoverColor || '#005582'};
//   }
`;

const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #f9fafb; /* Light gray */
`;

const CopyButton = styled.button`
  background-color: #3b82f6; /* Blue */
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb; /* Darker blue */
  }
`;

const CloseButton = styled.button`
  background-color: #e5e7eb; /* Light gray */
  color: #4b5563; /* Dark gray */
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d1d5db; /* Darker gray */
  }
`;

const LinkedInShareButton = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://novajobs.us/community/${post.id}`;
  const shareTitle = post.content;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    setShowPopup(true);
    setCopied(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <ShareButton onClick={handleShare}>
        <AiOutlineShareAlt style={{ marginRight: '8px' }} />
        Share
      </ShareButton>

      {showPopup && (
        <PopupOverlay>
          <PopupContainer>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Share Post</h2>

            {/* Social Media Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareTitle}>
                <ShareButton bgColor="#0077b5" hoverColor="#005582">
                  <FaLinkedin style={{ marginRight: '8px' }} />
                  LinkedIn
                </ShareButton>
              </LinkedinShareButton>

              <TwitterShareButton url={shareUrl} title={shareTitle}>
                <ShareButton bgColor="#1da1f2" hoverColor="#1a91da">
                  <FaTwitter style={{ marginRight: '8px' }} />
                  Twitter
                </ShareButton>
              </TwitterShareButton>

              <FacebookShareButton url={shareUrl} quote={shareTitle}>
                <ShareButton bgColor="#3b5998" hoverColor="#2d4373">
                  <FaFacebookF style={{ marginRight: '8px' }} />
                  Facebook
                </ShareButton>
              </FacebookShareButton>

              <WhatsappShareButton url={shareUrl} title={shareTitle} separator=" - ">
                <ShareButton bgColor="#25D366" hoverColor="#1da851">
                  <FaWhatsapp style={{ marginRight: '8px' }} />
                  WhatsApp
                </ShareButton>
              </WhatsappShareButton>
            </div>

            {/* Copy Link Section */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Input type="text" readOnly value={shareUrl} />
              <CopyButton onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </CopyButton>
            </div>

            {/* Close Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseButton onClick={handleClosePopup}>
                Close
              </CloseButton>
            </div>
          </PopupContainer>
        </PopupOverlay>
      )}
    </>
  );
};

export default LinkedInShareButton;