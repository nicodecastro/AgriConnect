import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../Images/agriconnectlogo.png';

const AdminHeader = () => {
  const navigate = useNavigate();

  const linkStyle = { textDecoration: "none", color: "white" }
  return (
    <header className="header">
      <img src={logo} alt="Logo" />
      <div className="search-bar">
        <input type="text" placeholder="Search products" />
        <button><i className="fas fa-search"></i></button>
      </div>
      <nav>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/admin/products')}>Products</li>
          <li onClick={() => navigate('/admin/orders')}>Manage Orders</li>
          <li onClick={() => navigate('/admin/reports')}>Sales Reports</li>
          <li onClick={() => navigate('/admin/users')}>Manage Users</li>
          <li onClick={() => navigate('/admin/account')}>Account</li>
        </ul>
      </nav>
    </header>
  );
}

export default AdminHeader;