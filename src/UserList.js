import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css'
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

   
    const request = selectedUser
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${selectedUser.id}`, formData)
      : axios.post('https://jsonplaceholder.typicode.com/users', formData);

    request
      .then(response => {
        if (selectedUser) {
          setUsers(users.map(user => (user.id === selectedUser.id ? response.data : user)));
        } else {
          setUsers([...users, response.data]);
        }
        setFormData({ name: '', email: '', phone: '' });
        setSelectedUser(null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to save user');
        setLoading(false);
      });
  };

 
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
  };

 
  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(() => {
        setError('Failed to delete user');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h2>User Management</h2>

     
      <form onSubmit={handleSubmit}>
        <h3>{selectedUser ? 'Edit User' : 'Create User'}</h3>
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <button type="submit">{selectedUser ? 'Update' : 'Create'}</button>
      </form>

     
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
           
          <li key={user.id}>
            <Link to={`/user/${user.id}`}> <span>{user.name} - {user.email}</span>  </Link>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        
        ))}
      </ul>
    </div>
  );
};

export default UserList;
