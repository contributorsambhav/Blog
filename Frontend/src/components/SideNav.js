import React from 'react';
import { Link } from "react-router-dom";

export default function SideNav({ isLoggedIn }) {
  return (
    <div className='sideNav'>
      <h2 className='sideNavTitle'>Blog</h2>
      {isLoggedIn ? (
        <button className='newPostButton'><Link className="linkbtn" to="/NewPost">+ New Post</Link></button>
      ) : (
        <button className='newPostButton'><Link className="linkbtn" to="/login">+ New Post</Link></button>
      )}
      <ul className='sideNavList'>
        <li className='sideNavItem'><Link className="link" to="/">Home</Link></li>
        <li className='sideNavItem'>Stats</li>
      </ul>
    </div>
  );
}
