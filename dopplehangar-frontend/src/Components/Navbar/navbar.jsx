import React from 'react';
import './navbar.css';
import logo from '../../Assets/logo.svg';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user); 

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/' className="logo">
          <img src={logo} alt="logo" />
        </a>
      </div>

      <div className="navbar-right">
        <a href='/gallery' className="gallery">Gallery</a>

        {user ? (
          <span className="username">Welcome, {user.username}</span> 
        ) : (
          <a href='/login' className="login">Login</a> 
        )}
      </div>
    </nav>
  );
};

export default Navbar;
