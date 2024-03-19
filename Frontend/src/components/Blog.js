import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faComment } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

function Blog({ posts, isLoggedIn }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [editMode, setEditMode] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedBody, setUpdatedBody] = useState('');

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  const deletePost = (postId) => {
    const updatedPosts = filteredPosts.filter(post => post.id !== postId);
    setFilteredPosts(updatedPosts);
  };

  const handleSearch = (keyword) => {
    const filtered = posts.filter(post => post.title.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredPosts(filtered);
  };

  const editPost = (postId) => {
    setEditMode(postId);
    const postToEdit = filteredPosts.find(post => post.id === postId);
    setUpdatedTitle(postToEdit.title);
    setUpdatedBody(postToEdit.body);
  };

  const saveEdit = (postId, updatedTitle, updatedBody) => {
    const updatedPosts = filteredPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          title: updatedTitle,
          body: updatedBody
        };
      }
      return post;
    });
    setFilteredPosts(updatedPosts);
    setEditMode(null);
  };

  return (
    <div className="blog">
      <h1>The Blogger's Blog</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="posts-container">
        {filteredPosts.map(post => (
          <div key={post.id} className="post shadow-lg shadow-orange-300">
            {editMode === post.id ? (
              <div>
                <input
                  className="mx-auto block w-full py-2 px-3 rounded-md border focus:outline-none focus:border-blue-500"
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <textarea
                  className="mx-auto block w-full py-2 px-3 rounded-md border mt-2 focus:outline-none focus:border-blue-500"
                  value={updatedBody}
                  onChange={(e) => setUpdatedBody(e.target.value)}
                ></textarea>
                <br />
                <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => saveEdit(post.id, updatedTitle, updatedBody)}>Save</button>
              </div>

            ) : (
              <div>
                <h2 className="post-title">{post.title}</h2><br></br>
                <p className="post-body">{post.body}</p><br></br>

                {isLoggedIn ? (
                  <div>
                    <button className="edit-button" onClick={() => editPost(post.id)}>
                      Edit <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="delete-button" onClick={() => deletePost(post.id)}>
                      Delete <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ) : (
                  <button className="comment-button border-gray-700 border-solid border-[1px] p-1 rounded-md">
                    Comment <FontAwesomeIcon icon={faComment} />
                  </button>
                )}

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
