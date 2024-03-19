import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './NewPage.css';
import { useNavigate } from 'react-router-dom';

function NewPage({ addPost }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Math.floor(Math.random() * 1000),
      title,
      body,
      userId: parseInt(userId)
    };
    addPost(newPost);
    setTitle('');
    setBody('');
    setUserId('');
    navigate("/");
  };

  return (
    <div className="new-page-container">
      <h1 className="new-page-title">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="new-page-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body" className="form-label">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId" className="form-label">User ID:</label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Post <FontAwesomeIcon icon={faPlus} className="submit-icon" />
        </button>
      </form>
    </div>
  );
}

export default NewPage;
