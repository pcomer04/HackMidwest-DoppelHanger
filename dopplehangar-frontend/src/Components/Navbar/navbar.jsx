import React from 'react';
import './navbar.css';
import logo from '../../Assets/logo.svg';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href='/' className ="logo"><img src={logo} alt="logo" /></a>
  </div>

  <div className="navbar-right">
    <a href='/gallery' className="gallery">Gallery</a>
    <a href='/login' className="login">Login</a>
  </div>
</nav>
);
};

export default Navbar;