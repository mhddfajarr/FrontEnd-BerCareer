import axios from 'axios';

const API_URL = 'https://localhost:7147/api/Sessions/Validate';

export const decodeToken = async () => {
    const token = localStorage.getItem('authToken');
  try {
    const response = await axios.post("https://localhost:7147/api/Sessions/Validate",{
        token: token
    });
    const responseData = JSON.parse(response.data.message);
    return responseData;
    
  } catch (exception) {
    console.log(token)
    console.error('Error creating user:', exception);
    throw exception; // Melempar error agar bisa ditangani di tempat pemanggilan
  }
};