// Api/AuthService.js
import axios from 'axios';

const API_URL = 'https://localhost:7147/api/Users'; 

export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};


const API_URL_LOGIN = 'https://localhost:7147/api/Users/login'; 

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL_LOGIN}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};
