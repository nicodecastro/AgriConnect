import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-item">Dashboard</div>
      <div className="sidebar-item">Products</div>
      <div className="sidebar-item">Orders</div>
      <div className="sidebar-item">Customers</div>
      <div className="sidebar-item">Reports</div>
    </div>
  );
};

export default Sidebar;
