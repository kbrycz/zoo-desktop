import React, { useEffect, useState } from 'react';
import server from '../../../api/server'; // Adjust the path as necessary
import '../../styles/Post/ViewPosts.css'; // Make sure the path is correct
import defaultImage from '../../../../assets/default.jpg';


function ViewPosts({onEditPost}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await server.get('/getPosts');
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false); // Set loading to false after fetching posts
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading-indicator">Loading...</div>; // Loading indicator
  }

  return (
    <div className="view-posts-screen">
      <h1>View Posts</h1>
      <div className='form-container'>
      {posts.length > 0 ? (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-item">
              <div className="post-header">
                <h2 className="post-title">{post.title}</h2>
                <button className="edit-button" onClick={() => onEditPost(post)}>Edit</button>
              </div>
              <img src={defaultImage} alt="Post" className="post-image" />
              <p className="post-description">{post.description}</p>
              {post.link && (
              <div className="post-link">
                <button 
                  onClick={() => window.open(post.link, '_blank', 'noopener,noreferrer')}
                  className="link-button">
                  Click here to view the post on the website
                </button>
              </div>
            )}
              <div className="post-footer">
                <p className="post-type">{post.postType === 0 ? 'Event' : 'Internal'}</p>
                <span className="post-date">{new Date(post.date).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-posts-message">
          <h2 className="post-title">No posts yet!</h2>
        </div>
        )}
      </div>
      
    </div>
  );
}

export default ViewPosts;
