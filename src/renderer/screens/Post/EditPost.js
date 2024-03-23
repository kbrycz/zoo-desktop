import React, { useState } from 'react';
import server from '../../../api/server';
import '../../styles/Post/CreatePosts.css';

function EditPost({ post: initialPost, goBackToViewPosts }) {
  const [post, setPost] = useState({
    ...initialPost,
    postType: initialPost.postType.toString(),
    date: initialPost.date ? new Date(initialPost.date).toISOString().substring(0, 16) : '',
  });

  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await server.patch(`/updatePost/${initialPost._id}`, { post });
      alert('Post updated successfully!');
      goBackToViewPosts();
    } catch (err) {
      alert('Failed to update post: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      setLoading(true);

      try {
        await server.delete(`/deletePost`, {
          data: { postId: initialPost._id }
        });
        alert('Post deleted successfully!');
        goBackToViewPosts();
      } catch (err) {
        alert('Failed to delete post: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const callAiAssistant = async () => {
    if (!post.title && !post.description) return;
    setLoadingAI(true);
    setAnswer('');
    try {
      const response = await server.get('/postHelp', { params: { post: JSON.stringify(post) } });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching AI answer:', error);
      setAnswer('Sorry, an error occurred while getting your answer. Please try again.');
    }
    setLoadingAI(false);
  };

  const formatAnswer = (answer) => {
    const splitAnswer = answer.split("Description:");
    const titlePart = splitAnswer[0].replace("Title: ", "");
    const descriptionPart = splitAnswer[1];

    return (
      <>
        <strong>Title:</strong>
        <br />
        {titlePart}
        <br /><br />
        <strong>Description:</strong>
        <br />
        {descriptionPart}
      </>
    );
  };

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }
  return (
    <div className="create-post-screen">
      <h1>Edit Post</h1>
      <h3>Once posted, this will show up on the mobile app.</h3>
      <div className='form-container'>
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

          {answer && <div className="ai-response">{formatAnswer(answer)}</div>}

          <button type="button" onClick={callAiAssistant} disabled={loadingAI || (!post.title && !post.description)}>
            {loadingAI ? 'Generating...' : 'Generate with AI'}
          </button>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Post'}
          </button>

          <div className='delete-button'>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
