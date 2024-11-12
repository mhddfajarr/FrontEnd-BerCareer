// Api/AuthService.js
import axios from 'axios';

const API_URL = 'https://localhost:7147/api/Jobs'; 

export const getAllData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};

