import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href='#' className ="history">History</a>
  </div>
  <div className="navbar-center">
    <a href="/" className="logo">
      <img src="" alt="logo" />
    </a>
  </div>
  <div className="navbar-right">
    <a href='#' className="logout">Logout</a>
  </div>
</nav>
);
};

export default Navbar;