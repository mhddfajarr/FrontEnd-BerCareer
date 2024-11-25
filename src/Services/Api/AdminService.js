import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "https://localhost:7147/api/Jobs";
const API_URL_ROLE = "https://localhost:7147/api/Roles";
const API_URL_APPLICATION = "https://localhost:7147/api/Applications";

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

// Menambahkan job baru
export const addJob = async (jobData) => {
  const token = localStorage.getItem("authToken");
  const newJob = {
    title: jobData.Title,
    description: jobData.Description,
    type: jobData.Type,
    requirement: jobData.Requirement,
    salary: jobData.Salary,
    location: jobData.Location,
    postDate: jobData.PostDate,
    dueDate: jobData.DueDate,
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

// Menghapus job berdasarkan ID
export const deleteJob = async (userId, jobId) => {
  const token = localStorage.getItem("authToken");
  const user = await axios.post(
    "https://localhost:7147/api/Sessions/Validate",
    {
      token: token,
    }
  );
  // Parse the 'message' field, which contains the actual JSON string
  const responseData = JSON.parse(user.data.message);
  // Access the 'uid' from the parsed object
  const uid = responseData.uid;
  // console.log(uid);  // This will log the uid to the console
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this job!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          userId: uid,
          jobId: jobId,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Job has been deleted successfully.",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting job:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error deleting the job!",
        confirmButtonText: "Retry",
      });
      throw error;
    }
  }
};

// Memperbarui job berdasarkan ID
export const updateJob = async (jobId, updatedJob, token) => {
  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  try {
    const response = await axios.patch(`${API_URL}`, updatedJob, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.data) {
      return response.data; // Kembalikan data pekerjaan yang diperbarui
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error(error);
    console.error("Error updating job:", error.response?.data || error.message);
    throw error; // Lempar kesalahan untuk ditangani di Vue.js
  }
};

// Memperbarui status aplikasi
export const updateStatus = async (data, token) => {
  if (!token) {
    throw new Error("Authentication token is missing.");
  }
  console.log(data);

  try {
    const response = await axios.patch(
      `${API_URL_APPLICATION}`,
      {
        applicationId: data.applicationId,
        status: Number(data.status), // Konversi status ke angka
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Kembalikan data yang diperbarui
  } catch (error) {
    console.error(
      "Error updating status:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Mendapatkan semua role
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

// Mendapatkan detail role
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

// Mengubah role
export const changeRole = async (roleData) => {
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
    console.error("Error changing role:", error);
    throw error;
  }
};

const API_APPLICATION = "https://localhost:7147/api/Applications/All";

export const getAllAplication = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Token is missing or expired");

  try {
    const response = await axios.get(API_APPLICATION, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (e) {
    console.log("Error fetching applications:", e);
    throw e; // Throw the caught error
  }
};
