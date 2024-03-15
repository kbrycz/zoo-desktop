import React, { useState } from 'react';
import server from '../../api/server'; // Import the server instance
import '../styles/CreatePosts.css';

function CreatePost() {
  const [post, setPost] = useState({
    postType: '0', // Default to 'Event', should be a string since it's the value of an option
    title: '',
    description: '',
    date: '',
    picture: '',
    link: '',
  });

  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const payload = {
      post: {
        postType: post.postType,
        title: post.title,
        description: post.description,
        date: post.date, // This should match the state and input field names
        link: post.link,
        picture: ""
      },
      // picture: we're omitting this part for now as you mentioned
    };

    try {
      const response = await server.post('/submitPost', payload);
      if (response.data) {
        alert('Post submitted successfully!');
      }
    } catch (err) {
      alert('Failed to submit post: ' + err.message);
    } finally {
      setLoading(false); // Set loading to false regardless of the outcome
    }
  };


  return (
    <div className="post-screen">
      <h1>Create a Post</h1>
      <h3>Once posted, this will show up on the mobile app.</h3>
      <form onSubmit={handleSubmit} className="post-form">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />

        <label htmlFor="dateTime">Date and Time:</label>
        <input
          id="dateTime"
          type="datetime-local"
          value={post.date}
          onChange={(e) => setPost({ ...post, date: e.target.value })}
          required
        />

        {/* <label htmlFor="picture">Picture:</label>
        <input
          id="picture"
          type="file"
          onChange={handleFileChange}
        /> */}

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
        >
          <option value={0}>Event</option>
          <option value={1}>Internal</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Submit Post'}
        </button>
        {loading && <div className="loading-indicator">Loading...</div>}
      </form>
    </div>
  );
}

export default CreatePost;
