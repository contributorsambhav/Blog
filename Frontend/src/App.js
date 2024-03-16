import React from 'react';
import './App.css';
import Blog from "./components/Blog";
import SideNav from './components/SideNav';

function App() {
  return (
    <div className='main'>
      <SideNav />
      <Blog />
    </div>
   
  );
}

export default App;
