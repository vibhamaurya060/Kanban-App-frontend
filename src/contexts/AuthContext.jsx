import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const { accessToken } = await authService.login(credentials);
      localStorage.setItem('accessToken', accessToken);
      setUser(accessToken);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const register = async (formData) => {
    try {
      await authService.register(formData);
      // Optionally, automatically log in the user after registration
      // const { accessToken } = await authService.login(formData);
      // localStorage.setItem('accessToken', accessToken);
      // setUser(accessToken);
      navigate('/login'); // Redirect to login after successful registration
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  const authContextValue = {
    user,
    error,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
