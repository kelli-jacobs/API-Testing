import axios from 'axios';
import { useState, useEffect } from 'react';
 
const AxiosExample = () => {
  // STEP 1: Setting up State
  const [posts, setPosts] = useState([]); // Stores posts
  const [newPost, setNewPost] = useState({ title: "", body: "" }); // Stores new post data
  const [editingPost, setEditingPost] = useState(null); // Tracks editing posts
  const [error, setError] = useState(null); // Stores error messages
 
  // STEP 2: Fetch data from API
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts") // Sending a GET request
      .then((response) => setPosts(response.data.slice(0, 5))) // Updates posts state with API data
      .catch((error) => setError(error.message)); // Handles errors
  }, []);
 
  // STEP 3: Creating a Post
  const addPost = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", newPost) // Sending new data to API
      .then((response) => {
        setPosts([response.data, ...posts]); // Adds new post to the top of the list
        setNewPost({ title: "", body: "" }); // Clears input fields
      })
      .catch((error) => setError(error.message));
  };
 
  // STEP 4: Updating a Post
  const updatePost = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, editingPost) // Sending updated data to API
      .then(() => {
        setPosts(posts.map((post) => (post.id === id ? editingPost : post))); // Updates UI
        setEditingPost(null); // Exit editing mode
      })
      .catch((error) => setError(error.message));
  };
 
  // STEP 5: Deleting a Post
  const deletePost = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`) // Removes post from server
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id)); // Updates UI
      })
      .catch((error) => setError(error.message));
  };
 
  return (
<div>
<h2>Manage Posts</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
 
      {/* Create Post */}
<h3>Create Post</h3>
<input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
<input
        type="text"
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
<button onClick={addPost}>Add Post</button>
 
      {/* Post List */}
<h3>Post List</h3>
<ul>
        {posts.map((post) => (
<li key={post.id}>
            {editingPost && editingPost.id === post.id ? (
              // Edit Mode
<>
<input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />
<input
                  type="text"
                  value={editingPost.body}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, body: e.target.value })
                  }
                />
<button onClick={() => updatePost(post.id)}>Save</button>
<button onClick={() => setEditingPost(null)}>Cancel</button>
</>
            ) : (
              // Display Mode
<>
<strong>{post.title}</strong>: {post.body}
<button onClick={() => setEditingPost(post)}>Edit</button>
<button onClick={() => deletePost(post.id)}>Delete</button>
</>
            )}
</li>
        ))}
</ul>
</div>
  );
};
 
export default AxiosExample;