import React from 'react';
import logo from "./trashtrack.png"
import { useState } from 'react';

import { Link } from 'react-router-dom'; // Import Link from react-router-dom
function NavBar({ isLoggedIn }) {


  const [tgl, setTgl] = useState("Enable Dark mode");
  let count = 0
  function toggleDark() {
    let root = document.getElementById("root");
    console.log(root);
    count += 1 
if (count%2===0){
  root.style.filter = "invert(90%)"
  setTgl("Enable Light mode")
}else{
  root.style.filter = "invert(0%)"
  setTgl("Enable Dark mode")
}
}

  return (
    <nav className="bg-gray-800  ">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 ">
          {/* Logo and Home Link */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-lg font-bold rounded-full">
              <img src={logo} alt="Logo" width={45} style={{ borderRadius: '50%' }} />
            </Link>          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/NewPost" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">New Post</Link>
                  <Link to="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>

                </>
              ) : (
                <>
                 <Link to="/contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact Us</Link>
                  <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Creator's Login</Link>
                </>
              )}
              <li><button className="text-gray-200 rounded-lg bg-gradient-to-r from-slate-900 to-slate-700 px-3 " onClick={toggleDark}>{tgl}</button></li>

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
