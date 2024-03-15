// EditPost.js
import React, { useState, useEffect } from 'react';
import server from '../../api/server'; // Adjust the path as necessary
import '../styles/CreatePosts.css'; // Reuse CreatePost styles

function EditPost({ post: initialPost, goBackToViewPosts }) {
    const [post, setPost] = useState({
        ...initialPost,
        postType: initialPost.postType.toString(), // Ensure postType is a string
        date: initialPost.date ? new Date(initialPost.date).toISOString().substring(0, 16) : '', // Format date
      });
      const [loading, setLoading] = useState(false);
    
      // No need for useEffect since we're passing the post down
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const response = await server.patch(`/updatePost/${initialPost._id}`, { post });
          alert('Post updated successfully!');
          goBackToViewPosts(); // Go back to view posts after updating
        } catch (err) {
          alert('Failed to update post: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
    

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  return (
    <div className="post-screen">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          required
        />

        <label htmlFor="dateTime">Date and Time:</label>
        <input
          id="dateTime"
          type="datetime-local"
          value={post.date}
          onChange={(e) => setPost({ ...post, date: e.target.value })}
          required
        />

        <label htmlFor="link">Link:</label>
        <input
          id="link"
          type="text"
          value={post.link}
          onChange={(e) => setPost({ ...post, link: e.target.value })}
        />

        <label htmlFor="postType">Post Type:</label>
        <select
          id="postType"
          value={post.postType}
          onChange={(e) => setPost({ ...post, postType: e.target.value })}
          required
        >
          <option value="0">Event</option>
          <option value="1">Internal</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
