// PostScreen.js
import React, { useState } from 'react';
import CreatePost from './CreatePost';
import ViewPosts from './ViewPosts';
import EditPost from './EditPost'; // Import EditPost component
import '../../styles/Post/Post.css';
import '../../styles/Background.css';

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
    <div className='background-screen'>
      {currentScreen !== '' && (
        <button className="back-button" onClick={handleBackClick}>
          ←
        </button>
      )}
      <div className="post-screen">
      {showOptions ? (
        <>
          <h1>Posts</h1>
          <div className="post-screen-buttons screen-buttons">
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
        </>
      )}
    </div>
    </div>
  );
}

export default PostScreen;
