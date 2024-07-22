import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="https://via.placeholder.com/150x50" alt="Logo" />
        </Link>
        <ul className="nav-menu" style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
          <li className="nav-item" style={{ margin: '0 15px' }}>
            <Link to="/" className="nav-links">Home</Link>
          </li>
          <li className="nav-item" style={{ margin: '0 15px' }}>
            <Link to="/shop" className="nav-links">Shop</Link>
          </li>
          <li className="nav-item" style={{ margin: '0 15px' }}>
            <Link to="/about" className="nav-links">About</Link>
          </li>
          <li className="nav-item" style={{ margin: '0 15px' }}>
            <Link to="/contact" className="nav-links">Contact</Link>
          </li>
        </ul>
        <IconButton edge="end" color="inherit" aria-label="cart" component={Link} to="/cart">
          <ShoppingCartIcon />
        </IconButton>
      </div>
    </nav>
  );
};

export default Navbar;
