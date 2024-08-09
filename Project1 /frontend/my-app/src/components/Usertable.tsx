import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {User} from '../Interfaces/User'

const BaseURL =  "http://localhost:8080";

const UsersTable = () => {

  // State to hold the data
  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = async () => {
    try {
      // Fetch JSON data (replace with your API URL)
      const response = await axios.get('http://localhost:8080/users');
      // Update the state with the fetched data
      setUsers((users) => (response.data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []); 

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>U_ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.u_id}>
              <td>{user.u_id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>{user.pass}</td>
              <td>{user.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
