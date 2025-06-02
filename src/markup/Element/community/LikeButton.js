import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';
import { toast } from "react-toastify";

// Styled Components
const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ liked }) => (liked ? '#dc2626' : '#000')};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.75;
  }
`;

const Icon = styled(AiFillHeart)`
  margin-right: 8px;
  color: ${({ liked }) => (liked ? '#dc2626' : '#000')};
  transition: color 0.2s;
`;

const Text = styled.span`
  @media (max-width: 768px) {
    display: none; // Hide "Likes" text on mobile
  }
`;

function isValidJWT(token) {
  return typeof token === 'string' && token.split('.').length === 3;
}

const LikeButton = ({ post }) => {
  const [localLiked, setLocalLiked] = useState(post.feed_likes && post.feed_likes.id > 0);
  const [localLikesCount, setLocalLikesCount] = useState(post.feed_likes_count || 0);
   const token =
    localStorage.getItem("jobSeekerLoginToken") ||
    localStorage.getItem("employeeLoginToken")

  useEffect(() => {
    setLocalLiked(post.feed_likes && post.feed_likes.id > 0);
    setLocalLikesCount(post.feed_likes_count || 0);
  }, [post]);

  const toggleLike = async (postId) => {
    if (!token || !isValidJWT(token)) {
      toast.error("You must be logged in to like posts.");
      return;
    }

    try {
      const newLikedState = !localLiked;
      const newLikesCount = newLikedState ? localLikesCount + 1 : Math.max(0, localLikesCount - 1);

      setLocalLiked(newLikedState);
      setLocalLikesCount(newLikesCount);

      let response;
      if (newLikedState) {
        response = await axios.post(
          `https://apiwl.novajobs.us/api/feed/feed/like/${postId}`,
          {},
          { headers: { Authorization: `${token}` } }
        );
        if (response.data.status === "success") {
          toast.success("Post liked successfully!");
        } else {
          throw new Error(response.message || "Failed to like the post.");
        }
      } else {
        response = await axios.delete(
          `https://api.sentryspot.co.uk/api/feed/feed/like/${postId}`,
          { headers: { Authorization: `${token}` } }
        );
        if (response.data.status === "success") {
          toast.success("Post unliked successfully!");
        } else {
          throw new Error(response.message || "Failed to unlike the post.");
        }
      }
    } catch (error) {
      setLocalLiked(!localLiked);
      setLocalLikesCount(localLikesCount);
      console.error("Error toggling like:", error);
      toast.error(error.message || "An error occurred while toggling like.");
    }
  };

  return (
    <Button liked={localLiked} onClick={() => toggleLike(post.id)}>
      <Icon liked={localLiked} />
      <Text>Likes</Text>
    </Button>
  );
};

export default LikeButton;
