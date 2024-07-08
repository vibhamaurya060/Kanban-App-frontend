import axios from 'axios';

const API_URL = 'https://kanban-app-backend-rurx.onrender.com';

const taskService = {
  getTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data.todos; // Assuming your response returns an object with 'todos' property
    } catch (error) {
      throw error;
    }
  },
  // Add other CRUD operations as needed

  createTask: async (title, desc) => {
    try {
      const response = await axios.post(`${API_URL}/tasks/admin`, {
        title: title,
        desc: desc
      });
      return response.data; // Assuming your backend responds with a message
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (taskId, title, desc) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${taskId}`, {
        title: title,
        desc: desc
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data; // Assuming your backend responds with a message
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      return response.data; // Assuming your backend responds with a message
    } catch (error) {
      throw error;
    }
  },
  
};

export default taskService;
