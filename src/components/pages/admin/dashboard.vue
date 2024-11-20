<template>
  <div class="content-wrapper">
    <!-- Breadcrumb
        <div class="bg-gray-200 p-3 mb-4 flex justify-end rounded-lg">
        <nav class="text-gray-600 text-sm">
            <router-link to="/admin" class="hover:underline">Dashboard</router-link>
        </nav>
        </div> -->
    <h1 class="text-3xl font-bold text-primary mb-2">Dashboard</h1>
    <!-- Main content -->
    <div class="flex justify-between gap-4">
      <!-- Menambahkan gap antar card -->
      <div class="card w-full shadow-xl bg-white">
        <div class="card-body text-gray-700">
          <h2 class="card-title text-2xl">
            <i class="fas fa-user-friends text-3xl text-primary"></i>Total
            Applicants
          </h2>
          <p>The total number of applicants available.</p>
          <h1 class="text-5xl font-bold">{{ totalApplications }}</h1>
        </div>
      </div>

      <div class="card w-full shadow-xl bg-white">
        <div class="card-body text-gray-700">
          <h2 class="card-title text-2xl">
            <i class="fas fa-clipboard-list text-3xl text-primary"></i>Total
            Post Job
          </h2>
          <p>Number of jobs posted on the platform</p>
          <h1 class="text-5xl font-bold">{{ totalPostJobs }}</h1>
          <!-- Menampilkan total jumlah pekerjaan -->
        </div>
      </div>
    </div>
    <!-- /.content -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios"; // Pastikan Anda sudah mengimpor axios
import { getAllData } from "../../../Services/Api/AdminService"; // Fungsi untuk mengambil data pekerjaan

export default {
  props: ["Role"],
  setup(props) {
    // State variables
    const dataJobs = ref([]); // Menyimpan data pekerjaan
    const filteredJobs = ref([]); // Data pekerjaan yang difilter
    const totalPostJobs = ref(0); // Total pekerjaan

    const dataApplications = ref([]); // Menyimpan data pelamar
    const filteredApplications = ref([]); // Data pelamar yang difilter
    const totalApplications = ref(0); // Total pelamar

    console.log(props.Role);

    // Mengambil data pekerjaan dari API
    const fetchJobDetail = async () => {
      try {
        const response = await getAllData();
        dataJobs.value = response.data;
        filteredJobs.value = response.data;
        totalPostJobs.value = response.data.length; // Hitung total pekerjaan
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    // Mengambil data pelamar dari API
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error(
            "Token tidak ditemukan. Silakan login terlebih dahulu."
          );
        }

        const response = await axios.get(
          "https://localhost:7147/api/Applications/All",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dataApplications.value = response.data.data; // Asumsi data ada di response.data.data
        filteredApplications.value = dataApplications.value;
        totalApplications.value = dataApplications.value.length; // Hitung total aplikasi
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    onMounted(() => {
      fetchJobDetail(); // Ambil data pekerjaan saat komponen dibuat
      fetchApplications(); // Ambil data pelamar saat komponen dibuat
    });

    return {
      dataJobs,
      filteredJobs,
      totalPostJobs,
      dataApplications,
      filteredApplications,
      totalApplications,
      fetchJobDetail,
      fetchApplications,
    };
  },
};
</script>

<style scoped>
.card {
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.text-5xl {
  color: #333;
}
</style>
