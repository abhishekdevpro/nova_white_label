import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import {
  FaRegCopy,
  FaEdit,
  FaTimes,
  FaEllipsisV,
  FaTrash,
  FaComment,
  FaCamera,
} from "react-icons/fa";
// import { Constant } from "@/utils/constant/constant";
// import LikeButton from "./LikeButton";
// import ConfirmationDialog from "./ConfirmationDialog";
// import LinkedInShareButton from "./ShareButton";
import { Link, redirect } from "react-router-dom";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import LinkedInShareButton from "./ShareButton";
import ConfirmationDialog from "./ConformationDialog";
import { toast } from "react-toastify";

// Styled Components
const Container = styled.div`
  max-width: 640px;
  margin: auto;
  // padding: 24px;
  background-color: #f9fafb; /* Light gray background */
`;

const PostCreationSection = styled.div`
  background-color: #ffffff; /* White background */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Rounded corners */
  padding: 24px;
  margin-bottom: 24px;
  border-top: 4px solid #1e3a8a; /* Dark blue border */
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 18px; /* Font size */
  color: #1f2937; /* Dark gray text */
  background-color: #e5e7eb; /* Light gray background */
  border-radius: 6px; /* Rounded corners */
  resize: none;
  border: 1px solid #d1d5db; /* Light gray border */
  &:focus {
    outline: none;
    border-color: #3b82f6; /* Blue border on focus */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Blue shadow */
  }
`;

const Button = styled.button`
  background-color: #1e3a8a; /* Dark blue background */
  color: #ffffff; /* White text */
  padding: 8px 24px;
  border-radius: 6px; /* Rounded corners */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #1e40af; /* Darker blue on hover */
  }
`;

// const PostSection = styled.div`
//   margin-top: 16px;
//   display: flex;
//   flex-direction: column;
//   gap: 16px;

// `;
const PostSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 700px; /* or whatever height you need */
  overflow-y: auto;
  padding-right: 4px; /* Prevents content from being hidden under hidden scrollbar */

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for IE/Edge */
  -ms-overflow-style: none;
`;

const PostCard = styled.div`
  background-color: #ffffff; /* White background */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Shadow on hover */
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Circular image */
  margin-right: 12px;
  object-fit: cover;
`;

const CommentSection = styled.div`
  margin-top: 24px;
`;

const CommentCard = styled.div`
  background-color: #ffffff; /* White background */
  padding: 12px;
  border-radius: 8px; /* Rounded corners */
  display: flex;
  align-items: center;
  justify-center: between;
  gap: 0.5rem;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  padding: 5px 5px;
  border-radius: 8px;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2563eb; /* Slightly deeper blue */
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3); /* Softer blue shadow */
    background-color: #ffffff;
  }

  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }
`;

// Main Component
const FeedSection = ({ loginModal, setLoginModal }) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentAnonymous, setIsCommentAnonymous] = useState(false);
  const [activeSharePostId, setActiveSharePostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [editingCommentPostId, setEditingCommentPostId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmationDialog, setConfirmationDialog] = useState({
    isOpen: false,
    type: null, // 'post' or 'comment'
    id: null,
    commentId: null,
  });
  const token =
    localStorage.getItem("jobSeekerLoginToken") ||
    localStorage.getItem("employeeLoginToken") ||
    "";

  function isValidJWT(token) {
    return typeof token === "string" && token.split(".").length === 3;
  }

  const editComment = (commentId, content, postId) => {
    setEditingCommentId(commentId);
    setEditedCommentContent(content);
    setEditingCommentPostId(postId);
  };

  const toggleDropdown = (postId) => {
    setOpenDropdownId((prevId) => (prevId === postId ? null : postId));
  };

  const saveEditedComment = async () => {
    if (!token) {
      // setLoginModal(true);
      toast.warn("Login First to Edit comments");
      return;
    }

    if (editedCommentContent.trim()) {
      try {
        const response = await axios.put(
          `https://apiwl.novajobs.us/api/feed/feed-comment/${editingCommentId}`,
          {
            feed_id: editingCommentPostId,
            content: editedCommentContent,
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          setPosts(
            posts.map((post) => {
              if (post.id === editingCommentPostId) {
                return {
                  ...post,
                  feed_comments: post.feed_comments.map((comment) =>
                    comment.id === editingCommentId
                      ? { ...comment, content: editedCommentContent }
                      : comment
                  ),
                };
              }
              return post;
            })
          );

          setEditingCommentId(null);
          setEditedCommentContent("");
          setEditingCommentPostId(null);
        } else {
          console.error("Error editing comment:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing comment:", error);
      }
    }
  };

  const cancelCommentEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent("");
    setEditingCommentPostId(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const toggleLike = async (postId) => {
    if (!token || !isValidJWT(token)) {
      setLoginModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `https://apiwl.novajobs.us/api/feed/toggle-like/${postId}`,
        {},
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.status === "success") {
        setPosts(
          posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  liked: !post.liked,
                  likes: post.liked ? post.likes - 1 : post.likes + 1,
                }
              : post
          )
        );
      } else {
        console.error("Error toggling like:", response.data.message);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const addPost = async () => {
    if (!token) {
      toast.warn("Login First to add Post");
      // setLoginModal(true);
      return;
    }
    if (content.trim()) {
      try {
        const formData = new FormData();
        formData.append("content", content);
        if (image) {
          const imageBlob = await fetch(image).then((r) => r.blob());
          formData.append("image_upload", imageBlob, "uploaded-image.jpg");
        }

        const response = await axios.post(
          "https://apiwl.novajobs.us/api/feed/feed-create",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          const newPost = response.data.data;
          setPosts([newPost, ...posts]);
          setContent("");
          setIsAnonymous(false);
          setImage(null);
        } else {
          console.error("Error creating post:", response.data.message);
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };
// console.log(token,"From feed get")
  const fetchPosts = async () => {
    const API = token
      ? "https://apiwl.novajobs.us/api/feed/pro/feeds"
      : "https://apiwl.novajobs.us/api/feed/feeds";
    try {
      const response = await axios.get(API, {
        headers: {
          Authorization: token,
        },
      });
      if (response.data && Array.isArray(response.data.data.feed_data)) {
        setPosts(response.data.data.feed_data);
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [posts.length]);

  const addComment = (postId) => {
    if (!token) {
      toast.warn("Login to join the conversation");
      // setLoginModal(true);
      return;
    }

    if (!commentContent.trim()) return;

    axios
      .post(
        "https://apiwl.novajobs.us/api/feed/feed-comment",
        {
          feed_id: postId,
          content: commentContent,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.status === "success") {
          const newComment = {
            content: commentContent,
            isAnonymous: isCommentAnonymous,
          };
          fetchPosts();
          setPosts(
            posts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    comments: [...(post.comments || []), newComment],
                  }
                : post
            )
          );
          setCommentContent("");
          setIsCommentAnonymous(false);
          setActiveCommentPostId(null);
        } else {
          console.error("Error adding comment:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const handleCopyLink = (postId) => {
    navigator.clipboard
      .writeText(`https://example.com/post/${postId}`)
      .then(() => alert("Link copied to clipboard"))
      .catch((err) => console.error("Error copying link:", err));
  };

  const sharePost = (postId) => {
    setActiveSharePostId(activeSharePostId === postId ? null : postId);
    setCommentContent("");
  };

  const editPost = (postId, currentContent) => {
    setEditingPostId(postId);
    setEditedContent(currentContent);
  };

  const deletePost = async () => {
    if (!token) {
      toast.warn("Login First to delete the post");
      // setLoginModal(true);
      return;
    }
    const { type, id, commentId } = confirmationDialog;

    try {
      let endpoint;

      if (commentId) {
        endpoint = `https://apiwl.novajobs.us/api/feed/feed/comment/${id}/${commentId}`;
      } else {
        endpoint = `https://apiwl.novajobs.us/api/feed/feed/${id}`;
      }

      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data && response.data.status === "success") {
        fetchPosts();
        if (commentId) {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === id
                ? {
                    ...post,
                    feed_comments: post.feed_comments.filter(
                      (comment) => comment.id !== commentId
                    ),
                  }
                : post
            )
          );
        } else {
          setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        }

        setConfirmationDialog({
          isOpen: false,
          type: null,
          id: null,
          commentId: null,
        });
      } else {
        console.error("Error deleting:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const confirmDeletePost = (postId) => {
    console.log(postId, "postId");
    setConfirmationDialog({
      isOpen: true,
      type: "post",
      id: postId,
      commentId: null,
    });
  };

  // console.log(confirmationDialog, "confirmationDialog");

  const confirmDeleteComment = (postId, commentId) => {
    setConfirmationDialog({
      isOpen: true,
      type: "comment",
      id: postId,
      commentId: commentId,
    });
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: false,
      type: null,
      id: null,
      commentId: null,
    });
  };

  const saveEditedPost = async (postId) => {
    if (!token) {
      toast.warn("Login First to save the post");
      // setLoginModal(true);
      return;
    }
    if (editedContent.trim()) {
      try {
        const response = await axios.put(
          `https://apiwl.novajobs.us/api/feed/feed-edit/${postId}`,
          { content: editedContent },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.status === "success") {
          setPosts(
            posts.map((post) =>
              post.id === postId ? { ...post, content: editedContent } : post
            )
          );
          setEditingPostId(null);
          setEditedContent("");
        } else {
          console.error("Error editing post:", response.data.message);
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    }
  };

  const toggleShowComments = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, showAllComments: !post.showAllComments }
          : post
      )
    );
  };

  return (
    <Container>
      <PostCreationSection>
        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ask anything (even anonymously)..."
        />
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <label
              htmlFor="file-upload"
              style={{ cursor: "pointer", color: "#1e3a8a" }}
            >
              <FaCamera style={{ marginRight: "8px" }} />
              <span style={{ fontSize: "14px" }}>Upload Image</span>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <button className="site-button rounded-2" onClick={addPost}>
            Post
          </button>
        </div>

        {image && (
          <div style={{ marginTop: "16px", position: "relative" }}>
            <img
              src={image}
              alt="Uploaded"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
            <button
              onClick={() => setImage(null)}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                backgroundColor: "#ef4444" /* Red */,
                color: "#ffffff",
                padding: "4px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaTimes />
            </button>
          </div>
        )}
      </PostCreationSection>

      <PostSection>
        {posts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: "32px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            No posts available. Be the first to post!
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={
                      post.user_photo
                        ? `https://apiwl.novajobs.us/${post.user_photo}`
                        : "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                    }
                    alt="Profile"
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />

                  <div className="d-flex flex-column justify-content-center">
                    <Link
                      to={`/community/${post.id}`}
                      className="text-decoration-none"
                    >
                      <p className="fw-bold text-dark mb-0">
                        {post.user_first_name} {post.user_last_name}
                      </p>
                    </Link>
                    <p className="text-muted mb-0" style={{ fontSize: "12px" }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  {post.is_edit && editingPostId !== post.id && (
                    <button
                      onClick={() => toggleDropdown(post.id)}
                      style={{
                        padding: "8px",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        border: "none",
                      }}
                    >
                      <FaEllipsisV />
                    </button>
                  )}

                  {openDropdownId === post.id &&
                    post.is_edit &&
                    editingPostId !== post.id && (
                      <div
                        style={{
                          position: "absolute",
                          right: "0",
                          marginTop: "8px",
                          width: "120px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                          zIndex: 10,
                        }}
                      >
                        {post.is_edit && editingPostId !== post.id && (
                          <button
                            onClick={() => {
                              editPost(post.id, post.content);
                              setOpenDropdownId(null);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "8px",
                              width: "100%",
                              textAlign: "left",
                              color: "#1e3a8a",
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <FaEdit style={{ marginRight: "8px" }} /> Edit
                          </button>
                        )}
                        {post.is_edit && (
                          <button
                            onClick={() => {
                              confirmDeletePost(post.id);
                              setOpenDropdownId(null);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "8px",
                              width: "100%",
                              textAlign: "left",
                              color: "#ef4444",
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            <FaTrash style={{ marginRight: "8px" }} /> Delete
                          </button>
                        )}
                      </div>
                    )}
                </div>
              </div>

              {editingPostId === post.id ? (
                <div style={{ marginBottom: "16px" }}>
                  <TextArea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <button
                      onClick={() => setEditingPostId(null)}
                      style={{
                        backgroundColor: "#e5e7eb",
                        color: "#4b5563",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <Button onClick={() => saveEditedPost(post.id)}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p
                  style={{
                    color: "#4b5563",
                    marginBottom: "16px",
                    whiteSpace: "pre-wrap",
                    textAlign: "start",
                  }}
                >
                  {post.content}
                </p>
              )}
              {/* {console.log(`https://apiwl.novajobs.us/api${post.feed_image}`)} */}
              {post.feed_image && (
                <img
                  src={`https://apiwl.novajobs.us${post.feed_image}`}
                  alt="Post"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    objectFit: "fit",
                    maxHeight: "400px",
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px",
                  // gap:"6px"
                }}
              >
                <LikeButton post={post} />

                <button
                  style={{
                    color: "#6b7280",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  onClick={() =>
                    setActiveCommentPostId(
                      activeCommentPostId === post.id ? null : post.id
                    )
                  }
                >
                  <FaComment style={{ marginRight: "8px" }} />
                  <span className="comment-text text-secondary fw-semibold small px-2 py-1 rounded hover-effect">
                    Comment{" "}
                    {post?.feed_comments?.length > 0
                      ? post?.feed_comments?.length
                      : ""}
                  </span>
                </button>

                <style>
                  {`
    @media (max-width: 768px) {
      .comment-text {
        display: none;
      }
    }
  `}
                </style>

                <LinkedInShareButton post={post} />
              </div>

              {activeCommentPostId === post.id && (
                <CommentSection>
                  <CommentCard>
                    <CommentTextArea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Join the conversation..."
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <button
                        className="site-button"
                        onClick={() => addComment(post.id)}
                      >
                        Comment
                      </button>
                    </div>
                  </CommentCard>

                  {/* {post.feed_comments && post.feed_comments.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      {post.feed_comments?.map((comment, index) => (
                        <CommentCard key={index}>
                          <ProfileImage
                            src={comment?.user_photo ?`https://apiwl.novajobs.us/${comment.user_photo}`:"https://liccar.com/wp-content/uploads/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png"}
                            alt="Profile"
                          />
                          {editingCommentId === comment.id ? (
                            <div style={{ flexGrow: 1 }}>
                              <CommentTextArea
                                value={editedCommentContent}
                                onChange={(e) =>
                                  setEditedCommentContent(e.target.value)
                                }
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  gap: "8px",
                                  marginTop: "8px",
                                }}
                              >
                                <button
                                  onClick={cancelCommentEdit}
                                  style={{
                                    backgroundColor: "#e5e7eb",
                                    color: "#4b5563",
                                    padding: "8px 16px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                >
                                  Cancel
                                </button>
                                <Button onClick={saveEditedComment}>
                                  Save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  border:"2px solid red",
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    color: "#1f2937",
                                  }}
                                >
                                  {`${comment?.user_first_name} ${comment?.user_last_name}`}
                                </p>
                                <p
                                  style={{ color: "#4b5563", fontSize: "14px" }}
                                >
                                  {comment.content}
                                </p>
                              </div>
                              <div style={{ position: "relative" }}>
                                <button
                                  onClick={() => toggleDropdown(comment.id)}
                                  style={{
                                    padding: "8px",
                                    backgroundColor: "transparent",
                                    cursor: "pointer",
                                    border: "none",
                                  }}
                                >
                                  <FaEllipsisV />
                                </button>

                                {openDropdownId === comment.id && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      right: "0",
                                      marginTop: "8px",
                                      width: "120px",
                                      backgroundColor: "#ffffff",
                                      border: "1px solid #d1d5db",
                                      borderRadius: "8px",
                                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                                      zIndex: 10,
                                    }}
                                  >
                                    {comment.is_edit &&
                                      editingCommentId !== comment.id && (
                                        <button
                                          onClick={() => {
                                            editComment(
                                              comment.id,
                                              comment.content,
                                              post.id
                                            );
                                            setOpenDropdownId(null);
                                          }}
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "8px",
                                            width: "100%",
                                            textAlign: "left",
                                            color: "#1e3a8a",
                                            backgroundColor: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <FaEdit
                                            style={{ marginRight: "8px" }}
                                          />{" "}
                                          Edit
                                        </button>
                                      )}
                                    <button
                                      onClick={() => {
                                        confirmDeleteComment(
                                          post.id,
                                          comment.id
                                        );
                                        setOpenDropdownId(null);
                                      }}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px",
                                        width: "100%",
                                        textAlign: "left",
                                        color: "#ef4444",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <FaTrash style={{ marginRight: "8px" }} />{" "}
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CommentCard>
                      ))}
                      <ConfirmationDialog
                        isOpen={confirmationDialog.isOpen}
                        onClose={closeConfirmationDialog}
                        onConfirm={deletePost}
                        title={
                          confirmationDialog.type === "post"
                            ? "Delete Post"
                            : "Delete Comment"
                        }
                        message={
                          confirmationDialog.type === "post"
                            ? "Are you sure you want to delete this post? This action cannot be undone."
                            : "Are you sure you want to delete this comment? This action cannot be undone."
                        }
                      />
                    </div>
                  )} */}
                  {post.feed_comments && post.feed_comments.length > 0 && (
                    <div className="d-flex flex-column gap-2 mt-3">
                      {post.feed_comments.map((comment, index) => (
                        <div
                          key={index}
                          className="d-flex p-3 border rounded bg-light mb-2"
                        >
                          <img
                            src={
                              comment?.user_photo
                                ? `https://apiwl.novajobs.us/${comment.user_photo}`
                                : "https://liccar.com/wp-content/uploads/png-transparent-head-the-dummy-avatar-man-tie-jacket-user.png"
                            }
                            alt="Profile"
                            className="rounded-circle me-3"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />

                          {editingCommentId === comment.id ? (
                            <div className="flex-grow-1">
                              <textarea
                                className="form-control"
                                value={editedCommentContent}
                                onChange={(e) =>
                                  setEditedCommentContent(e.target.value)
                                }
                                rows={2}
                              />
                              <div className="d-flex justify-content-end gap-2 mt-2">
                                <button
                                  onClick={cancelCommentEdit}
                                  className="btn btn-secondary btn-sm"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={saveEditedComment}
                                  className="btn btn-primary btn-sm"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex justify-content-between align-items-start w-100">
                              <div className="flex-grow-1">
                                <p className="fw-bold mb-1">
                                  {comment?.user_first_name}{" "}
                                  {comment?.user_last_name}
                                </p>
                                <p className="text-muted mb-0">
                                  {comment.content}
                                </p>
                              </div>

                              <div className="position-relative">
                                {comment.is_edit && (
                                  <button
                                    onClick={() => toggleDropdown(comment.id)}
                                    className="btn btn-sm btn-link text-dark p-0"
                                  >
                                    <FaEllipsisV />
                                  </button>
                                )}

                                {openDropdownId === comment.id && (
                                  <div
                                    className="position-absolute bg-white border rounded shadow-sm mt-2 p-2"
                                    style={{
                                      right: 0,
                                      zIndex: 10,
                                      minWidth: "120px",
                                    }}
                                  >
                                    {comment.is_edit &&
                                      editingCommentId !== comment.id && (
                                        <button
                                          onClick={() => {
                                            editComment(
                                              comment.id,
                                              comment.content,
                                              post.id
                                            );
                                            setOpenDropdownId(null);
                                          }}
                                          className="dropdown-item d-flex align-items-center text-primary"
                                        >
                                          <FaEdit className="me-2" />
                                          Edit
                                        </button>
                                      )}
                                    {comment.is_edit && (
                                      <button
                                        onClick={() => {
                                          confirmDeleteComment(
                                            post.id,
                                            comment.id
                                          );
                                          setOpenDropdownId(null);
                                        }}
                                        className="dropdown-item d-flex align-items-center text-danger"
                                      >
                                        <FaTrash className="me-2" />
                                        Delete
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Confirmation Dialog */}
                      <ConfirmationDialog
                        isOpen={confirmationDialog.isOpen}
                        onClose={closeConfirmationDialog}
                        onConfirm={deletePost}
                        title={
                          confirmationDialog.type === "post"
                            ? "Delete Post"
                            : "Delete Comment"
                        }
                        message={
                          confirmationDialog.type === "post"
                            ? "Are you sure you want to delete this post? This action cannot be undone."
                            : "Are you sure you want to delete this comment? This action cannot be undone."
                        }
                      />
                    </div>
                  )}
                </CommentSection>
              )}
            </PostCard>
          ))
        )}
      </PostSection>
    </Container>
  );
};

export default FeedSection;
