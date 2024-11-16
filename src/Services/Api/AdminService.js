import axios from "axios";
import { uid } from "ckeditor5";
import Swal from "sweetalert2";

const API_URL = "https://localhost:7147/api/Jobs";
const API_URL_ROLE = "https://localhost:7147/api/Roles";

// Mendapatkan semua data job
export const getAllData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Mendapatkan data job berdasarkan ID
export const getJobsById = async (jobId) => {
  const API_URL_BY_ID = `${API_URL}/Detail`;
  try {
    const response = await axios.get(`${API_URL_BY_ID}?jobId=${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};

export const addJob = async (jobData) => {
  const token = localStorage.getItem("authToken");
  const newJob = {
    title: jobData.Title,
    description: jobData.Description,
    type: jobData.Type,
    requirement: jobData.Requirement,
    salary: jobData.Salary,
    location: jobData.Location,
    userId: jobData.uid,
  };
  console.log(newJob);

  try {
    const response = await axios.post(`${API_URL}`, newJob, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Job added successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error adding job:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "There was an error adding the job!",
      confirmButtonText: "Retry",
    });
    throw error;
  }
};

export const updateJob = async (jobData, currentJob, jobs, EditModal) => {
  const token = localStorage.getItem("authToken");

  const updatedJob = {
    userId: jobData.uid,
    title: jobData.title,
    description: jobData.description,
    type: jobData.type,
    requirement: jobData.requirement,
    salary: jobData.salary,
    location: jobData.location,
  };

  try {
    console.log("Updating job with ID:", currentJob.value.uid);
    const response = await axios.put(
      `${API_URL}/${currentJob.value.uid}`,
      updatedJob,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data) {
      // Adjusted for direct response
      const index = jobs.value.findIndex((j) => j.uid === currentJob.value.uid);
      if (index !== -1) {
        jobs.value[index] = response.data; // Assuming response.data is the updated job
      }
      EditModal.value = false;
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Job updated successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error(
      "Error updating job:",
      error.response ? error.response.data : error.message
    );
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        error.response?.data?.message || "There was an error updating the job!",
      confirmButtonText: "Retry",
    });
  }
};

export const getRoles = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(`${API_URL_ROLE}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export const getRoleDetails = async () => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(`${API_URL_ROLE}/Details`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};

export const changeRole = async (roleData) => {
  debugger;
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.put(
      `${API_URL_ROLE}/Change`,
      {
        roleId: roleData.roleId,
        userId: roleData.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
  // console.log(token);
};
