import React, { useEffect, useState } from 'react';
import { getAllUsersAPI } from '../Services/allApi';

function ViewUsers() {
    const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
        const response = await getAllUsersAPI();
        console.log('API Response:', response.data);
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          alert('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
       <div className="container mt-5">
      <h2 className="text-center fw-bold" style={{ color: '#53633f' }}>
        Registered Users
      </h2>
      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ViewUsers
