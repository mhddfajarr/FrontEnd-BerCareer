    import axios from "axios";
    import Swal from "sweetalert2";

    const API_URL = "https://localhost:7147/api/Jobs";
    const TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMUpDSE5TNUNCSlZUR0tBUERUMkRSN1NDNSIsInJvbGUiOiJBZG1pbiIsImVtYWlsIjoicmFrYS5zYWt0aUBnbWFpbC5jb20iLCJuYmYiOjE3MzE0Nzk5NTksImV4cCI6MTczMTU2NjM1OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzE0NyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNDcifQ.Ar1539RfDhYslm2gWtXueDBv9pwIof6XbLE6g6rylMo";

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
    export const createJob = async (jobData) => {
    try {
        const response = await axios.post(`${API_URL}`, jobData);
        return response.data;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
    };

    // Mengupdate job yang sudah ada
    export const updateJob = async (jobId, updatedJobData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(`${API_URL}/${jobId}`, updatedJobData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating job:", error);
        throw error;
    }
    };

    // Menghapus job berdasarkan ID
    export const deleteJob = async (userId, jobId) => {
        const user = await axios.post("https://localhost:7147/api/Sessions/Validate",{
            token: TOKEN
        });
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
        await axios.delete(`${API_URL}?userId=${uid}&jobId=${jobId}
`, {
            headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
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
        }
    }
    };
