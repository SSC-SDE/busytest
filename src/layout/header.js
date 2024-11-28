// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <h1 className="dashboard-title">Busy Buy</h1>
      <nav>
        <Link to="/">Home</Link><br/>
        <Link to="/signin">LogIn</Link>
      </nav>
    </header>
  );
};

export default Header;
