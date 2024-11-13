import axios from 'axios';

const API_URL = 'https://localhost:7147/api/Jobs';
const API_URL_BY_ID = 'https://localhost:7147/api/Jobs/Detail';
const API_URL_SAVE_JOB = 'https://localhost:7147/api/SavedJobs';


export const getAllData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error('Error fetching job data:', error.response || error);
    throw error; 
  }
};


export const getJobsById = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL_BY_ID}?jobId=${jobId}`);
    return response.data; // Return data pekerjaan berdasarkan ID
  } catch (error) {
    console.error('Error fetching job details:', error.response || error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pekerjaan yang disimpan berdasarkan userId
export const getSaveJob = async (userId) => {
  const token = localStorage.getItem('authToken'); // Ambil token di dalam fungsi
  if (!token) throw new Error('Token is missing or expired'); // Pastikan token ada

  try {
    const response = await axios.get(`${API_URL_SAVE_JOB}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return daftar pekerjaan yang disimpan
  } catch (error) {
    console.error('Error fetching saved jobs:', error.response || error);
    throw error;
  }
};

// Fungsi untuk menyimpan pekerjaan ke favorit
export const saveJobs = async (data) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token is missing or expired'); // Pastikan token ada

  try {
    const response = await axios.post(API_URL_SAVE_JOB, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return response dari API
  } catch (error) {
    console.error('Error saving job:', error.response || error);
    throw error;
  }
};

// Fungsi untuk menghapus pekerjaan yang disimpan
export const deleteSaveJobs = async (data) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token is missing or expired'); // Pastikan token ada

  try {
    const response = await axios.delete(API_URL_SAVE_JOB, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        userId: data.userId,
        jobId: data.jobId,
      },
    });
    return response.data; // Return response setelah penghapusan pekerjaan
  } catch (error) {
    console.log('Error deleting saved job:', error.response || error);
    throw error;
  }
};

const API_GET_DATA_USER = 'https://localhost:7147/api/Profiles'; 

export const getDataUser = async (userId) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    console.error("No authentication token found");
    return; // Hentikan fungsi jika tidak ada token
  }
  
  try {
    const response = await axios.get(API_GET_DATA_USER, {
      params: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error.response || error);
    throw error; // Pastikan error dilempar agar bisa ditangani di tempat lain
  }
};

const API_APPLY_JOB = 'https://localhost:7147/api/Applications'

export const applyJob = async (data) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token is missing or expired'); 

  try {
    const response = await axios.post(API_APPLY_JOB,data,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return response dari API
  } catch (error) {
    console.error('Error saving job:', error.response || error);
    throw error;
  }
};

export const getApplyUser = async (userId) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Token is missing or expired');

  try {
    const response = await axios.get(API_APPLY_JOB, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        userId: userId, 
      },
    });
    return response.data; 
  } catch (e) {
    console.log('Error fetching applications:', e);
    throw e; // Throw the caught error
  }
}




