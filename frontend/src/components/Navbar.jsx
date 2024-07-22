import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
        <li style={{ margin: '0 15px' }}>
          <strong>ABC Jewelers</strong>
        </li>
      </ul>
      <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
        <li style={{ margin: '0 15px' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/shop">Shop</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/about">About</Link>
        </li>
        <li style={{ margin: '0 15px' }}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <IconButton edge="end" color="inherit" aria-label="cart" component={Link} to="/cart">
        <ShoppingCartIcon />
      </IconButton>
    </nav>
  );
};

export default Navbar;
