import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminInfo.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AdminInfo = () => {
  const navigate = useNavigate();

  const userFirstName = jwtDecode(localStorage.getItem('token')).first_name
  const userEmail = jwtDecode(localStorage.getItem('token')).email

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    alert('Logged out')
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    getTotalProducts();
    getTotalUsers();
    getTotalOrders();
  }, [])

  const getTotalUsers = () => {
    axios.get(`http://localhost:3001/users/total`)
      .then((res) => {
        setTotalUsers(res.data.totalUsers)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            console.log(error.request)
        }
    })
  }

  const getTotalProducts = () => {
    axios.get(`http://localhost:3001/products/total`)
      .then((res) => {
        setTotalProducts(res.data.totalProducts)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            console.log(error.request)
        }
    })
  }

  const getTotalOrders = () => {
    axios.get(`http://localhost:3001/orders/total`)
      .then((res) => {
        setTotalOrders(res.data.totalOrders)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            console.log(error.request)
        }
    })
  }

  return (
    <div className="admin-info-container">
      <div className="admin-header">
        <input
          type="file"
          id="profilePicUpload"
          style={{ display: 'none' }}
          onChange={handleProfilePicChange}
        />
        <label htmlFor="profilePicUpload">
          <img src={profilePic} alt="Admin Profile" className="profile-pic" />
        </label>
        <div className="admin-basic-info">
          <h2>Admin Account</h2>
          <p>Hello, {userFirstName}!</p>
          <p>Email: {userEmail}</p>
        </div>
      </div>
      <div className="admin-details">
        <div className="admin-statistics">
          <div className="stat-item">
            <i className="fas fa-shopping-cart"></i>
            <p>Products Managed: <strong>{totalProducts}</strong></p>
          </div>
          <div className="stat-item">
            <i className="fas fa-user"></i>
            <p>Customers: <strong>{totalUsers}</strong></p>
          </div>
          <div className="stat-item">
            <i className="fas fa-box"></i>
            <p>Orders: <strong>{totalOrders}</strong></p>
          </div>
        </div>
        <div className="admin-actions">
          <button className="action-button" onClick={() => navigate('/admin/products')}>Manage Products</button>
          <button className="action-button" onClick={() => navigate('/admin/reports')}>View Reports</button>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminInfo;
