// PostScreen.js
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import ViewPosts from '../components/ViewPosts';
import EditPost from '../components/EditPost'; // Import EditPost component
import '../styles/Post.css';

function PostScreen() {
  const [currentScreen, setCurrentScreen] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null); // To keep track of the editing post's ID
  const [currentPost, setCurrentPost] = useState(null); // To keep track of the current post being edited


  const handleBackClick = () => {
    if (currentScreen === 'edit') {
      setCurrentScreen('view');
      setEditingPostId(null); // Reset editing post ID when going back
    } else {
      setCurrentScreen('');
      setShowOptions(true);
    }
  };

  // Function to handle when a user clicks the edit button on a post
  const onEditPost = (post) => {
    setCurrentPost(post); // Save the current post to edit
    setCurrentScreen('edit'); // Change screen to edit
  };

  return (
    <div className="post-screen">
      {showOptions ? (
        <>
          <h1>Posts</h1>
          <div className="post-screen-buttons">
            <button onClick={() => { setCurrentScreen('create'); setShowOptions(false); }}>Create Post</button>
            <button onClick={() => { setCurrentScreen('view'); setShowOptions(false); }}>View Posts</button>
          </div>
        </>
      ) : (
        <>
          {currentScreen === 'create' && <CreatePost />}
          {currentScreen === 'view' && <ViewPosts onEditPost={onEditPost} />}
          {currentScreen === 'edit' && currentPost && (
            <EditPost post={currentPost} goBackToViewPosts={() => setCurrentScreen('view')} />
          )}
          <button className="back-button" onClick={handleBackClick}></button>
        </>
      )}
    </div>
  );
}

export default PostScreen;
