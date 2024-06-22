import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import logo from '../../../Images/agriconnectlogo.png';

const Header = () => {
  const navigate = useNavigate();

  const linkStyle = { textDecoration: "none", color: "white" }
  return (
    <header className="header">
      <img src={logo} alt="Logo" />
      {/* <div className="search-bar">
        <input type="text" placeholder="Search products" />
        <button><i className="fas fa-search">Search</i></button>
      </div> */}
      <nav>
        <ul>
          <Link to={`/`} style={linkStyle}><li>Home</li></Link>
          <Link to={`/shop`} style={linkStyle}><li>Shop</li></Link>
          <Link to={`/shop/cart`} style={linkStyle}><li>Cart</li></Link>
          <Link to={'/shop/orders'} style={linkStyle}><li>Orders</li></Link>
          <Link to={'/account'} style={linkStyle}><li>Account</li></Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;