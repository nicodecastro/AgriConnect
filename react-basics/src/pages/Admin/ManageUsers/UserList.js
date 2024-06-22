import React, { useEffect, useState } from 'react';
import './UserList.css';
import axios from 'axios';

const UserList = () => {
  const [userList, setUserList] = useState([])
  const [isUserListEmpty, setIsUserListEmpty] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    await axios.get(`http://localhost:3001/users`)
      .then((res) => {
        console.log(res)
        setUserList(res.data.users)
        setIsUserListEmpty(false)
      })
      .catch((error) => {
        setIsUserListEmpty(true)
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
    <div className="user-list">
      <h2 className="user-list-header">User List</h2>
      <h4 className="user-list-subheading">Total Registered Users: {userList.length}</h4>
      <ul>
        {isUserListEmpty && <h3>No users found!</h3>}
        {
          !isUserListEmpty && userList.map((user, index) => {
            return <li key={index} onClick={() => null} className="user-item">
              {/* Replace src with user image field */}
              <img src={'https://via.placeholder.com/150'} alt={`${user.first_name}'s profile`} />
              <div className="user-info">
                <p className="user-info-p">{user.first_name} {user.middle_name} {user.last_name}</p>
                <p className="user-info-p">{user.email}</p>
              </div>
            </li>
          })
        }
      </ul>
    </div>
  );
};

export default UserList;
