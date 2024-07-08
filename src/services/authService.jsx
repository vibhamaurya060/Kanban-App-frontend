import axios from 'axios';

const API_URL = 'https://kanban-app-backend-rurx.onrender.com/users';

const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Assuming response.data contains the accessToken after successful login
  } catch (error) {
    throw error;
  }
};

const getUserData = async (token) => {
  try {
    // Modify this function to fetch user data directly from the login endpoint or any other suitable endpoint
    // For example, if your login endpoint returns user data along with the access token, you can use it directly
    const response = await axios.get(`${API_URL}/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming response.data contains the user data from login endpoint
  } catch (error) {
    throw error;
  }
};

// taskService.js or wherever your API calls are defined





export default { register, login, getUserData };
