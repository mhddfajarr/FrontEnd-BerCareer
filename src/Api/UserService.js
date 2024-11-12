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

const API_URL_GET_SAVE_JOB = 'https://localhost:7147/api/SavedJobs';

export const getSaveJob = async (userId, token) => {
  try {
    // Menambahkan token JWT ke dalam header Authorization
    const response = await axios.get(`${API_URL_GET_SAVE_JOB}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Menyertakan Bearer token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};

const API_URL_GET_SAVE = 'https://localhost:7147/api/SavedJobs';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMUpDR0I1ODVLUzNUMDBDMlFSMlo1UENTRiIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJtaGRkZmFqYXJAZ21haWwuY29tIiwibmJmIjoxNzMxNDI1NjgwLCJleHAiOjE3MzE0MjkyODAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNDciLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTQ3In0.dqv6RpjFr85c3S1Gc6PcWnwdQqm1y4EXwFUgoZ_yaqI' 
export const saveJobs = async (data) => {
  try {
    // Menambahkan token JWT ke dalam header Authorization
    const response = await axios.post(`${API_URL_GET_SAVE}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'  
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching job details:', error);
    throw error; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};


