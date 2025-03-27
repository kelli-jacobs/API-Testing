import axios from 'axios';
import { useState, useEffect } from 'react';

const AxiosWithBootstrap = () => {
  // State for managing posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [editingPost, setEditingPost] = useState(null);
  const [error, setError] = useState(null);

  // Fetch posts from API on mount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data.slice(0, 5)))
      .catch((error) => setError(error.message));
  }, []);

  // Add new post
  const addPost = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => {
        setPosts([response.data, ...posts]);
        setNewPost({ title: "", body: "" });
      })
      .catch((error) => setError(error.message));
  };

  // Update post
  const updatePost = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, editingPost)
      .then(() => {
        setPosts(posts.map((post) => (post.id === id ? editingPost : post)));
        setEditingPost(null);
      })
      .catch((error) => setError(error.message));
  };

  // Delete post
  const deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📌 Manage Posts</h2>
      {error && <div className="alert alert-danger">⚠️ {error}</div>}

      {/* Create Post Card */}
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">➕ Create a New Post</h4>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Enter body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button className="btn btn-dark w-100 fw-bold" onClick={addPost}>
          Add Post
        </button>
      </div>

      {/* Post List */}
      <h3 className="mb-3">📜 Your Posts</h3>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm border-0 p-3">
              {editingPost && editingPost.id === post.id ? (
                // Edit Mode
                <>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                  />
                  <textarea
                    className="form-control mb-2"
                    value={editingPost.body}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, body: e.target.value })
                    }
                  />
                  <div className="d-flex gap-2">
                    <button className="btn btn-success w-50" onClick={() => updatePost(post.id)}>
                      💾 Save
                    </button>
                    <button className="btn btn-secondary w-50" onClick={() => setEditingPost(null)}>
                      ❌ Cancel
                    </button>
                  </div>
                </>
              ) : (
                // Display Mode
                <>
                  <h5 className="fw-bold">{post.title}</h5>
                  <p className="text-muted">{post.body}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setEditingPost(post)}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => deletePost(post.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AxiosWithBootstrap;