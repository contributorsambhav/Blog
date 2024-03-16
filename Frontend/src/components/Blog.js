import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Importing the trash icon

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="blog">
      <h1>JSONPlaceholder Blog</h1>
      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post">
            
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <button className="delete-button" onClick={() => deletePost(post.id)}>
              Delete <FontAwesomeIcon icon={faTrash} /> {/* Using the trash icon */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
