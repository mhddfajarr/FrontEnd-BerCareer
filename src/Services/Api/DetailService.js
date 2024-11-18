import axios from "axios";

const API_ROOT = "https://localhost:7147/api/Details";
const API_URL_EXPERIENCE = `${API_ROOT}/Experiences`;
const API_URL_EDUCATIONS = `${API_ROOT}/Educations`;
const API_URL_SKILLS = `${API_ROOT}/Skills`;
const API_URL_CERTIFICATES = `${API_ROOT}/Certificates`;
const API_URL_SOCIAL = `${API_ROOT}/Social`;

export const getSkills = async (skillData) => {
  try {
    const response = await axios.get(API_URL_SKILLS);
    return response.data;
  } catch (error) {
    console.error("Error fetching job data:", error.response || error);
    throw error;
  }
};
