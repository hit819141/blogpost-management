import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import { toast } from "react-toastify";
import "./PostDetails.css";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Calculate reading time
  const calculateReadTime = (text) => {
    if (!text) return 1;
    const wordsPerMinute = 200;
    const wordCount = text.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Post not found");
        toast.error("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="loading-state">Loading post...</div>;
  }

  if (error) {
    return <div className="no-posts">{error}</div>;
  }

  return (
    <div className="post-details-page">
      <Navbar />

      <main className="post-details-container">
        <button className="back-btn" onClick={handleBackToDashboard}>
          <FaArrowLeft /> Back to Feed
        </button>

        <article className="full-post">
          <header className="post-header">
            <div className="post-category">
              {post.category || "Journal"}
            </div>

            <h1 className="post-full-title">
              {post.title}
            </h1>

            <div className="post-author-meta">
              <div className="author-info">
                <div className="author-avatar">
                  {post.author?.charAt(0).toUpperCase() || "A"}
                </div>

                <div>
                  <span className="author-name">
                    {post.author || "Anonymous"}
                  </span>

                  <div className="post-date-row">
                    <span>
                      <FaCalendarAlt />{" "}
                      {new Date(
                        post.createdAt || Date.now()
                      ).toLocaleDateString()}
                    </span>

                    <span className="dot"></span>

                    <span>
                      <FaClock /> {calculateReadTime(post.content)} Min Read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="post-featured-image">
            <img
              src={
                post.image ||
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
              }
              alt={post.title}
            />
          </div>

          <div className="post-body">
            {post.description ? (
              <p>{post.description}</p>
            ) : (
              <p>No content available.</p>
            )}
          </div>

          <footer className="post-footer">
            <div className="post-share">
              <span>Share this story:</span>

              <div className="share-buttons">
                <button
                  className="share-button"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`
                    )
                  }
                >
                  Twitter
                </button>

                <button
                  className="share-button"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`
                    )
                  }
                >
                  LinkedIn
                </button>

                <button
                  className="share-button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Link copied!");
                  }}
                >
                  Copy Link
                </button>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default PostDetails;