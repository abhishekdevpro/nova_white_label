
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
import { Link } from "react-router-dom";
import styled from 'styled-components';
import LikeButton from "./LikeButton";
import LinkedInShareButton from "./ShareButton";
import ConfirmationDialog from "./ConformationDialog";

// Styled Components
const Container = styled.div`
  max-width: 640px;
  margin: auto;
  padding: 24px;
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

const PostSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  justify-center:between;
  gap:1rem;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 6px; /* Rounded corners */
  background-color: #f9fafb; /* Light gray background */
  // resize: none;
  border: 1px solid #d1d5db; /* Light gray border */
  &:focus {
    outline: none;
    border-color: #3b82f6; /* Blue border on focus */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* Blue shadow */
  }
`;

// Main Component
const FeedSection = ({
  loginModal,
  setLoginModal,
}) => {
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
  const token = localStorage.getItem("jobSeekerLoginToken") || localStorage.getItem("employeeLoginToken") || '';

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
      setLoginModal(true);
      return;
    }

    if (editedCommentContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.novajobs.us/api/feed/feed-comment/${editingCommentId}`,
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
    if (!token) {
      setLoginModal(true);
      return;
    }

    try {
      const response = await axios.post(
        `https://api.novajobs.us/api/feed/toggle-like/${postId}`,
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
      setLoginModal(true);
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
          "https://api.novajobs.us/api/feed/feed-create",
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

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://api.novajobs.us/api/feed/pro/feeds",
        {
          headers: {
            Authorization: token,
          },
        }
      );
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
      setLoginModal(true);
      return;
    }

    if (!commentContent.trim()) return;

    axios
      .post(
        "https://api.novajobs.us/api/feed/feed-comment",
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
    const { type, id, commentId } = confirmationDialog;

    try {
      let endpoint;

      if (commentId) {
        endpoint = `https://api.novajobs.us/api/feed/feed/comment/${id}/${commentId}`;
      } else {
        endpoint = `https://api.novajobs.us/api/feed/feed/${id}`;
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
    setConfirmationDialog({
      isOpen: true,
      type: "post",
      id: postId,
      commentId: null,
    });
  };

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
      setLoginModal(true);
      return;
    }
    if (editedContent.trim()) {
      try {
        const response = await axios.put(
          `https://api.novajobs.us/api/feed/feed-edit/${postId}`,
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
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <label
              htmlFor="file-upload"
              style={{ cursor: 'pointer', color: '#1e3a8a' }}
            >
             <FaCamera style={{ marginRight: '8px' }} />
              <span style={{ fontSize: '14px' }}>Upload Image</span>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>

          </div>

          <Button onClick={addPost}>Post</Button>
        </div>

        {image && (
          <div style={{ marginTop: '16px', position: 'relative' }}>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
            />
            <button
              onClick={() => setImage(null)}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: '#ef4444', /* Red */
                color: '#ffffff',
                padding: '4px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <FaTimes  />
            </button>
          </div>
        )}
      </PostCreationSection>

      <PostSection>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6b7280', padding: '32px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>
            No posts available. Be the first to post!
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ProfileImage
                    src={
                      post.user_photo
                        ? `https://api.novajobs.us/${post.user_photo}`
                        : "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                    }
                    alt="Profile"
                  />
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'center',alignItems:'center' }}>
                      <Link to={`/community/${post.id}`}>
                        <p style={{ fontWeight: 'bold', color: '#1f2937' }}>
                          {post.user_first_name} {post.user_last_name}
                        </p>
                      </Link>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => toggleDropdown(post.id)}
                    style={{ padding: '8px',backgroundColor:'transparent' ,cursor: 'pointer',border:'none' }}
                  >
                    <FaEllipsisV />
                  </button>

                  {openDropdownId === post.id && (
                    <div style={{ position: 'absolute', right: '0', marginTop: '8px', width: '120px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
                      {post.is_edit && editingPostId !== post.id && (
                        <button
                          onClick={() => {
                            editPost(post.id, post.content);
                            setOpenDropdownId(null);
                          }}
                          style={{ display: 'flex', alignItems: 'center', padding: '8px', width: '100%', textAlign: 'left', color: '#1e3a8a', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        >
                          <FaEdit style={{ marginRight: '8px' }} /> Edit
                        </button>
                      )}
                      <button
                        onClick={() => {
                          confirmDeletePost(post.id);
                          setOpenDropdownId(null);
                        }}
                        style={{ display: 'flex', alignItems: 'center', padding: '8px', width: '100%', textAlign: 'left', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                      >
                        <FaTrash style={{ marginRight: '8px' }} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {editingPostId === post.id ? (
                <div style={{ marginBottom: '16px' }}>
                  <TextArea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                    <button
                      onClick={() => setEditingPostId(null)}
                      style={{ backgroundColor: '#e5e7eb', color: '#4b5563', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <Button onClick={() => saveEditedPost(post.id)}>Save</Button>
                  </div>
                </div>
              ) : (
                <p style={{ color: '#4b5563', marginBottom: '16px', whiteSpace: 'pre-wrap',textAlign:'start' }}>
                  {post.content}
                </p>
              )}

              {post.feed_image && (
                <img
                  src={`https://api.novajobs.us${post.feed_image}`}
                  alt="Post"
                  style={{ width: '100%', borderRadius: '8px', marginBottom: '16px', objectFit: 'fit', maxHeight: '400px' }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',padding:'6px' }}>
                <LikeButton post={post} />

                <button
  style={{
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    border:'none',
    backgroundColor:'transparent'
  }}
  onClick={() =>
    setActiveCommentPostId(
      activeCommentPostId === post.id ? null : post.id
    )
  }
>
  <FaComment style={{ marginRight: '8px' }} />
  Comment
</button>

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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                      {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          id={`comment-anonymous-${post.id}`}
                          checked={isCommentAnonymous}
                          onChange={(e) =>
                            setIsCommentAnonymous(e.target.checked)
                          }
                          style={{ display: 'none' }}
                        />
                        <label
                          htmlFor={`comment-anonymous-${post.id}`}
                          style={{ cursor: 'pointer', color: '#4b5563' }}
                        >
                          <span
                            style={{
                              width: '20px',
                              height: '20px',
                              marginRight: '8px',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              backgroundColor: isCommentAnonymous ? '#1e3a8a' : '#ffffff',
                              display: 'inline-block',
                              position: 'relative',
                            }}
                          >
                            {isCommentAnonymous && (
                              <i className="fas fa-check" style={{ color: '#ffffff', fontSize: '12px', position: 'absolute', top: '2px', left: '2px' }}></i>
                            )}
                          </span>
                          Comment Anonymously
                        </label>
                      </div> */}
                      <Button onClick={() => addComment(post.id)}>Post Comment</Button>
                    </div>
                  </CommentCard>

                  {post.feed_comments && post.feed_comments.length > 0 && (
                    <div style={{  display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {post.feed_comments.map((comment, index) => (
                        <CommentCard key={index}>
                          <ProfileImage
                            src={
                              comment.isAnonymous
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSTiGG5lX9viMNkyHJL-13qWwWJgQUI-LxSg&s"
                                : "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/149197250/original/e91f8ca9de6e762865d3c20959e544f07bb760cc/create-a-simple-professional-profile-picture-for-you.png"
                            }
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
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                                <button
                                  onClick={cancelCommentEdit}
                                  style={{ backgroundColor: '#e5e7eb', color: '#4b5563', padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                                >
                                  Cancel
                                </button>
                                <Button onClick={saveEditedComment}>Save</Button>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                              <div style={{ display: 'flex', flexDirection: 'column',}}>
                                <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#1f2937' }}>
                                  {comment.isAnonymous ? "Anonymous" : "User"}
                                </p>
                                <p style={{ color: '#4b5563', fontSize: '14px' }}>
                                  {comment.content}
                                </p>
                              </div>
                              <div style={{ position: 'relative' }}>
                                <button
                                  onClick={() => toggleDropdown(comment.id)}
                                  style={{ padding: '8px', color: '#4b5563', cursor: 'pointer' }}
                                >
                                  <FaEllipsisV />
                                </button>

                                {openDropdownId === comment.id && (
                                  <div style={{ position: 'absolute', right: '0', marginTop: '8px', width: '120px', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', zIndex: 10 }}>
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
                                          style={{ display: 'flex', alignItems: 'center', padding: '8px', width: '100%', textAlign: 'left', color: '#1e3a8a', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                                        >
                                          <FaEdit style={{ marginRight: '8px' }} /> Edit
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
                                      style={{ display: 'flex', alignItems: 'center', padding: '8px', width: '100%', textAlign: 'left', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                                    >
                                      <FaTrash style={{ marginRight: '8px' }} /> Delete
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