import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";

const Dashboard = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const deletePost = async (id) => {
    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      fetchPosts(); // refresh UI
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <div className="welcomme-text">
            <h1>Welcome to your Dashboard</h1>
            <p>
              Manage your posts, track enagagment , and connect with your
              audience.
            </p>
          </div>
        </div>

        <div className="dashboard-stats-overview">
          <div className="dash-card">
            <h3>Total Posts</h3>
            <span className="dash-number">{posts.length}</span>
          </div>

          <div className="dash-card">
            <h3>Your Stories</h3>
            <span className="dash-number">5</span>
          </div>

          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">10</span>
          </div>
        </div>

        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent Feed</h2>
            <button className="create-shortcut-btn">
              <FaPlus />
              New Post
            </button>
          </div>

          <div className="posts-grid">
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-image-container">
                  <img
                    src={post.image}
                    alt="post"
                    className="post-card-image"
                  />

                  <div className="post-actions">
                    <button
                      className="action-btn edit-btn"
                      title="Edit Post"
                    >
                      <MdEdit size={22} color="#ffffff" />
                    </button>

                    <button
                      className="action-btn delete-btn"
                      title="Delete Post"
                      onClick={() => deletePost(post.id)}
                    >
                      <MdDelete size={22} color="#ffffff" />
                    </button>
                  </div>
                </div>

                <div className="post-card-content">
                  <div className="post-meta">
                    <span className="post-author">
                      By {post.author || "Admin"}
                    </span>
                    <span className="post-date">
                      {post.date || "Recent"}
                    </span>
                  </div>

                  <h3 className="post-card-title">{post.title}</h3>

                  <p className="post-card-description">
                    {post.description}
                  </p>

                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;