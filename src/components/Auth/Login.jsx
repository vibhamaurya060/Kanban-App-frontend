import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Hook for navigation

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://kanban-app-backend-rurx.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Debugging: log response data

      if (data.accessToken) {
        alert("User login successfully");
        console.log('Token:', data.accessToken); // Debugging: log token
        setLoggedIn(true); // Update login status to true
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  // Use useEffect to navigate after state update
  useEffect(() => {
    if (loggedIn) {
      navigate('/'); // Navigate to home page after successful login
    }
  }, [loggedIn, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: "column", gap: "10px", padding: "20px" }}>
      <input
        type="text"
        name='email'
        placeholder='email'
        value={user.email}
        onChange={inputHandler}
      />
      <input
        type="password"
        name='password'
        placeholder='password'
        value={user.password}
        onChange={inputHandler}
      />
      <button
        type="button"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
