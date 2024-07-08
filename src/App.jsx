import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Board from './components/Board/Board';
// import PrivateRoute from './utils/PrivateRoute';
import authService from './services/authService';

const App = () => {
  const [user, setUser] = useState(null);

  const checkLoggedInUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await authService.getUserData(token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };
  
  // Check logged-in user on component mount
  useEffect(() => {
    checkLoggedInUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    checkLoggedInUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={logout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/register" element={<Register />} />
{/*         
        <Route path="/" element={<PrivateRoute user={user} />}> */}
          <Route path="/" element={<Board />} />
          {/* <Route path="/column" element={<Column />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default App;
