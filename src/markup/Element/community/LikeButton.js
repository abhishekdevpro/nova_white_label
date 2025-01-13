import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Constant } from "@/utils/constant/constant";
import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai'; // Importing the heart icon from react-icons
import { toast } from "react-toastify";

// Styled Components
const Button = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ liked }) => (liked ? '#dc2626' : '#000')}; /* Red if liked, black otherwise */
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.75; /* Slightly transparent on hover */
  }
`;

const Icon = styled(AiFillHeart)`
  margin-right: 8px; /* Space between icon and text */
  color: ${({ liked }) => (liked ? '#dc2626' : '#000')}; /* Red if liked, black otherwise */
  transition: color 0.2s;
`;

const LikeButton = ({ post }) => {
  const [localLiked, setLocalLiked] = useState(post.feed_likes && post.feed_likes.id > 0);
  const [localLikesCount, setLocalLikesCount] = useState(post.feed_likes_count || 0);
  const token = localStorage.getItem("jobSeekerLoginToken");

  // Sync local state with props
  useEffect(() => {
    setLocalLiked(post.feed_likes && post.feed_likes.id > 0);
    setLocalLikesCount(post.feed_likes_count || 0);
  }, [post]);

  const toggleLike = async (postId) => {
    try {
      // Optimistic UI update
      const newLikedState = !localLiked;
      const newLikesCount = newLikedState ? localLikesCount + 1 : Math.max(0, localLikesCount - 1);

      setLocalLiked(newLikedState);
      setLocalLikesCount(newLikesCount);

      // Call API based on the new state
      let response;
      if (newLikedState) {
        // Like the post
        response = await axios.post(
          `https://api.sentryspot.co.uk/api/feed/feed/like/${postId}`,
          {},
          {
            headers: { Authorization: `${token}` },
          }
        );
        if (response.data.status === "success") {
          toast.success("Post liked successfully!");
        } else {
          throw new Error(response.message || "Failed to like the post.");
        }
      } else {
        // Unlike the post
        response = await axios.delete(
          `https://api.sentryspot.co.uk/api/feed/feed/like/${postId}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        if (response.data.status === "success") {
          toast.success("Post unliked successfully!");
        } else {
          throw new Error(response.message || "Failed to unlike the post.");
        }
      }
    } catch (error) {
      // Rollback UI state on failure
      setLocalLiked(!localLiked);
      setLocalLikesCount(localLikesCount);
      console.error("Error toggling like:", error);
      toast.error(error.message || "An error occurred while toggling like.");
    }
  };

  return (
    <Button liked={localLiked} onClick={() => toggleLike(post.id)}>
      <Icon liked={localLiked} />
      <span> Likes</span>
    </Button>
  );
};

export default LikeButton;