    <template>
    <div class="content-wrapper">
        <div class="breadcrumbs text-sm mb-4">
        <ul>
            <li><a>Dashboard</a></li>
        </ul>
        </div>
        <h1 class="text-3xl font-bold text-primary mb-2">Dashboard</h1>
        <!-- Main content -->
        <div class="flex justify-between gap-4">
        <!-- Menambahkan gap antar card -->
        <div class="card w-full shadow-xl border-t-4 border-t-primary bg-white">
            <div class="card-body">
            <h2 class="card-title">Total Applicants</h2>
            <p>The total number of applicants available.</p>
            <h1 class="text-5xl font-bold">{{ totalApplications }}</h1>
            </div>
        </div>

        <div class="card w-full shadow-xl border-t-4 border-t-primary bg-white">
            <div class="card-body">
            <h2 class="card-title">Total Post Job</h2>
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
    import axios from "axios"; // Pastikan Anda sudah mengimpor axios
    import { getAllData } from "../../../Services/Api/AdminService"; // Fungsi untuk mengambil data pekerjaan

    export default {
    data() {
        return {
        dataJobs: [], // Menyimpan data pekerjaan
        filteredJobs: [], // Data pekerjaan yang difilter
        totalPostJobs: 0, // Total pekerjaan

        dataApplications: [], // Menyimpan data pelamar
        filteredApplications: [], // Data pelamar yang difilter
        totalApplications: 0, // Total pelamar
        };
    },
    methods: {
        // Mengambil data pekerjaan dari API
        async fetchJobDetail() {
        try {
            const response = await getAllData();
            this.dataJobs = response.data;
            this.filteredJobs = response.data;
            this.totalPostJobs = response.data.length; // Hitung total pekerjaan
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        },

        // Mengambil data pelamar dari API
        async fetchApplications() {
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

            this.dataApplications = response.data.data; // Asumsi data ada di response.data.data
            this.filteredApplications = this.dataApplications;
            this.totalApplications = this.dataApplications.length; // Hitung total aplikasi
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
        },
    },
    created() {
        this.fetchJobDetail(); // Ambil data pekerjaan saat komponen dibuat
        this.fetchApplications(); // Ambil data pelamar saat komponen dibuat
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
