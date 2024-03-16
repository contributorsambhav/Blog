import React from 'react';

export default function SideNav() {
  return (
    <div className='sideNav'>
      <h2 className='sideNavTitle'>Blog</h2>
      <button className='newPostButton'>+ New Post</button>
      <ul className='sideNavList'>
        <li className='sideNavItem'>Home</li>
        <li className='sideNavItem'>Stats</li>
      </ul>
    </div>
  );
}
