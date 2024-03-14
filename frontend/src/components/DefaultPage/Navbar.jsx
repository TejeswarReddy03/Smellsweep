import React from 'react';
import './Navbar.css'; // Assuming you've saved the CSS code in a file named Navbar.css
import { Link } from 'react-router-dom';
const Navbar = () => {

  return (
    <nav className="navbar">
     <Link to="/" className="home">
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
