import React, { useState } from 'react';
import server from '../../../api/server'; // Import the server instance
import '../../styles/Post/CreatePosts.css';

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
  const [answer, setAnswer] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);


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
        setPost(
          {
            postType: '0',
            title: '',
            description: '',
            date: '',
            picture: '',
            link: ''
          }
        )
      }
    } catch (err) {
      alert('Failed to submit post: ' + err.message);
    } finally {
      setLoading(false); // Set loading to false regardless of the outcome
    }
  };

  const callAiAssistant = async () => {
    if (!post.title && !post.description) return; // Ensure there's content to generate from
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
    // Assuming the format "Title: <title> Description: <description>"
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
  

  return (
    <div className="create-post-screen">
      <h1>Create a Post</h1>
      <h3>Once posted, this will show up on the mobile app.</h3>
      <div className='form-container'>
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

          {
            answer
            ? <div className="ai-response">{formatAnswer(answer)}</div>
            : null
          }

          <button type="button" onClick={callAiAssistant} disabled={loadingAI || (!post.title && !post.description)}>
            {loadingAI ? 'Generating...' : 'Generate with AI'}
          </button>

          <button type="submit" disabled={loading || (!post.title || !post.description || !post.date || !post.link)}>
            {loading ? 'Posting...' : 'Submit Post'}
          </button>
          {loading && <div className="loading-indicator">Loading...</div>}
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
