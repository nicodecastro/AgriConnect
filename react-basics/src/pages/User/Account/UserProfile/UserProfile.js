import React, { useEffect, useState } from 'react';
import PurchaseHistory from './PurchaseHistory';
import './UserProfile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import Expire from '../../../../components/Expire';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // for popup
  const [key, setKey] = useState(0)
  const [requestMessage, setRequestMessage] = useState('')
  const [bgColor, setBgColor] = useState("#0A6847")

  const userEmail = jwtDecode(localStorage.getItem('token')).email;

  useEffect(() => {
    fetchUser();
    fetchOrdersByUser();
}, []);

  const fetchUser = async () => {
    await axios.get(`http://localhost:3001/user?email=${encodeURIComponent(userEmail)}`)
      .then((res) => {
        // console.log(res.data)
        setUser(res.data.user[0])
        setFormData(res.data.user[0])
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

  const fetchOrdersByUser = async () => {
    await axios.get(`http://localhost:3001/orders?email=${encodeURIComponent(userEmail)}`)
      .then((res) => {
        // console.log(res.data)
        setPurchasedProducts(res.data.transactions)
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

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/user', 
      {
        first_name: formData.first_name,
        middle_name: formData.middle_name,
        last_name: formData.last_name,
        email: formData.email
      })
      .then((res) => {
        // console.log(res.data);
        setUser(formData);
        setIsEditing(false);
        setRequestMessage(res.data.message);
        setKey(key+1)
        setBgColor("#0A6847")
      })
      .catch((error) => {
        if (error.response) {
          setRequestMessage(`Failed to update personal info! (Error: ${error.response.status})`);
          setKey(key+1)
          setBgColor("#D32F2F")
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          console.log(error.request)
        }
      })
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setFormData(user);
    setIsEditing(false);
  }

  return (
    <div className="user-profile">
      <img src={'https://via.placeholder.com/150'} alt={`${user.name}'s profile`} className="profile-picture" />
      <h2>{isEditing ? 'Edit Profile' : ` Profile`}</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Edit Name:
            <input type="text" name="first_name" placeholder='First Name' value={formData.first_name} onChange={handleChange} required/>
            <input type="text" name="middle_name" placeholder='Middle Name' value={formData.middle_name} onChange={handleChange} />
            <input type="text" name="last_name" placeholder='Last Name' value={formData.last_name} onChange={handleChange} required/>
          </label>
          {/* <label>
            Email:
            <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} />
          </label> */}
          <div className='btn-container'>
            <button type="submit" onClick={handleCancel}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      ) : (
        <div>
          <div className="user-info">
            <p><strong>Full Name:</strong> {user.first_name} {user.middle_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button className="logout-button" onClick={handleSignOut}>Logout</button>
          </div>
          <hr />
          <PurchaseHistory items={purchasedProducts} />
        </div>
      )}
      {<Expire delay="3000" text={requestMessage} bgColor={bgColor} expireKey={key} />}
    </div>
  );
};

export default UserProfile;
