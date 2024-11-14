    import axios from "axios";
import { uid } from "ckeditor5";
    import Swal from "sweetalert2";

    const API_URL = "https://localhost:7147/api/Jobs";

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

    export const addJob = async () => {
    const token = localStorage.getItem("authToken");
    const newJob = {
        title: newJobTitle.value,
        description: newJobDescription.value,
        requirement: newJobRequirement.value,
        salary: newJobSalary,
        location: newJobLocation,
        userId: newJobUserId,
    };

    try {
        const response = await axios.post(`${API_URL}`, newJob, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (response.data && response.data.data) {
        jobs.value.push(response.data.data);
        showAddModal.value = false;

        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Job added successfully.",
            showConfirmButton: false,
            timer: 1500,
        });
        }
    } catch (exception) {
        console.error("Error adding job:", error);
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error adding the job!",
        confirmButtonText: "Retry",
        });
    }
    };

    // Mengupdate job yang sudah ada
    export const updateJob = async () => {
        const token = localStorage.getItem('authToken');

        const updatedJob = {
            uid: editedJobId.value,
            title: editedJobTitle.value,
            description: editedJobDescription.value,
            salary: editedJobSalary.value,
            location: editedJobLocation.value,
            // Tambahkan field lain jika diperlukan
        };

        try {
            console.log('Updating job with ID:', currentJob.value.uid); // Cek ID
            const response = await axios.put(`${API_URL}/${currentJob.value.uid}`, updatedJob, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            // Cek struktur respons
            if (response.data && response.data.data) {
                const index = jobs.value.findIndex(j => j.uid === currentJob.value.uid);
                if (index !== -1) {
                    jobs.value[index] = response.data.data;
                }
                EditModal.value = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Job updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (exception) {
            console.error('Error updating job:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || 'There was an error updating the university!',
                confirmButtonText: 'Retry'
            });
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
        await axios
            .delete(`${API_URL}?`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: {
                userId: uid,
                jobId: jobId,
            },
            })
            .then((result) => {
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Job has been deleted successfully.",
                confirmButtonText: "OK",
            });
            });
        } catch (exception) {
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
