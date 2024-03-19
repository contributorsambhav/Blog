import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from "./components/Blog";
import SideNav from './components/SideNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewPage from './components/NewPage';
import Navbar from "./components/Navbar"
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import ProfilePage from './components/Profile';
import ContactUs from './components/ContactUs';
import Logout from './components/Logout';




function App() {
  const [posts, setPosts] = useState([]);

  const [parentState, setParentState] = useState(false);
  const [activeProfile, setActiveProfile] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts(); // Call fetchPosts function inside useEffect
  }, []); // Empty dependency array ensures useEffect runs only once

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };



  return (
    <div className='main '>
      <BrowserRouter>
        <Navbar setParentState={setParentState} isLoggedIn={parentState}/>
        <div className='body'>
          <SideNav isLoggedIn={parentState} />
          <Routes>
            <Route path="/" element={<Blog posts={posts} isLoggedIn={parentState} />} />
            <Route path="/NewPost" element={<NewPage addPost={addPost} />} />
            <Route exact path='/contact' element={<ContactUs />} />
            <Route
            exact
            path='/login'
            element={<LoginPage setActiveProfile={setActiveProfile} setParentState={setParentState} />}
          />
            <Route exact path='/signup' element={<SignUp />} />
            <Route
            exact
            path='/profile'
            element={<ProfilePage user={activeProfile} setuser={setActiveProfile} setParentState={setParentState} />}
          />
            <Route exact path='/logout' element={<Logout setActiveProfile={setActiveProfile} setParentState={setParentState} />} />


          </Routes>
        </div>
      </BrowserRouter>
    </div >
  );
}

export default App;
