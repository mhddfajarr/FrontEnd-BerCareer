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

const API_URL_BY_ID = 'https://localhost:7147/api/Jobs/Detail';

export const getJobsById = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL_BY_ID}?jobId=${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};


