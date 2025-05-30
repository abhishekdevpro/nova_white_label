import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import UserHeader2 from "../../Layout/Header2";
import EmployeeHeader2 from "../../../employeeMarkup/Layout/Header2";

const SinglePostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();
  const token =
    localStorage.getItem("jobSeekerLoginToken")
  useEffect(() => {
    const token =
    localStorage.getItem("jobSeekerLoginToken") ||
    localStorage.getItem("employeeLoginToken");

    const fetchSinglePost = async () => {
      try {
        const API = token
          ? `https://apiwl.novajobs.us/api/feed/pro/feed/${postId}`
          : `https://apiwl.novajobs.us/api/feed/feed/${postId}`;
        const response = await axios.get(API, {
          headers: {
            Authorization: token || "",
          },
        });
        if (response.data && response.data.status === "success") {
          setPost(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching single post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSinglePost();
  }, [postId]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center mt-5">Post not found</div>;
  }

  const profileImg = post.user_photo
    ? `https://apiwl.novajobs.us${post.user_photo}`
    : "/default-profile.jpg";

  const postImage = post.feed_image
    ? `https://apiwl.novajobs.us${post.feed_image}`
    : null;

  return (
    <>
     {token ? <UserHeader2 />:<EmployeeHeader2/>}
      <div
        className="container mt-5"
        style={{
          maxWidth: "600px",
          backgroundColor: "#fff",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <div className="d-flex align-items-center mb-4">
          <img
            src={profileImg}
            alt="User Profile"
            className="rounded-circle me-3"
            style={{ width: "48px", height: "48px", objectFit: "cover" }}
          />
          <div>
            <h5 style={{ margin: 0 }}>
              {post.user_first_name} {post.user_last_name}
            </h5>
            <small className="text-muted">
              {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>

        <p style={{ color: "#333" }}>{post.content}</p>

        {postImage && (
          <img
            src={postImage}
            alt="Post"
            className="img-fluid rounded"
            style={{ marginTop: "15px" }}
          />
        )}
      </div>
    </>
  );
};

export default SinglePostPage;
