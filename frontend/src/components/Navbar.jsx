import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="https://via.placeholder.com/150x50" alt="Logo" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/shop" className="nav-links">Shop</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">Contact</Link>
          </li>
        </ul>
        <IconButton edge="end" color="inherit" aria-label="cart" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
    </nav>
  );
};

export default Navbar;
