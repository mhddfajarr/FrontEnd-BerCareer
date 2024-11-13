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
        <div
            class="card  w-full shadow-xl border-t-4 border-t-primary bg-white"
        >
            <div class="card-body">
            <h2 class="card-title">Total Applicates</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <h1 class="text-5xl font-bold">30</h1>
            </div>
        </div>

        <div
            class="card  w-full shadow-xl border-t-4 border-t-primary bg-white"
        >
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
    import { getAllData } from "../../../Services/Api/AdminService";

    export default {
    data() {
        return {
        showModal: false,
        selectedTitle: "", // Untuk menyimpan judul yang dipilih
        searchQuery: "", // Untuk menyimpan query pencarian
        dataJobs: [], // Data pekerjaan yang diambil dari API
        filteredJobs: [], // Data pekerjaan yang telah difilter
        totalPostJobs: 0, // Variabel untuk menyimpan jumlah total pekerjaan
        };
    },
    methods: {
        // Mengambil data pekerjaan dari API
        async fetchJobDetail() {
        try {
            const response = await getAllData(); // Ambil semua data pekerjaan dari API
            this.dataJobs = response.data; // Menyimpan data pekerjaan ke dataJobs
            this.filteredJobs = response.data; // Inisialisasi filteredJobs dengan data semua pekerjaan
            this.totalPostJobs = response.data.length; // Menghitung jumlah total pekerjaan
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        },

        // Fungsi untuk memfilter pekerjaan berdasarkan judul yang dipilih
        filterJobsByTitle(title) {
        this.selectedTitle = title; // Simpan judul yang dipilih
        this.searchQuery = ""; // Reset pencarian saat filter berdasarkan judul
        this.filteredJobs = this.dataJobs.filter((job) => job.title === title); // Filter dataJobs berdasarkan title
        },

        // Fungsi untuk memfilter pekerjaan berdasarkan query pencarian
        filterBySearch() {
        const query = this.searchQuery.toLowerCase(); // Menyesuaikan pencarian menjadi huruf kecil
        this.filteredJobs = this.dataJobs.filter(
            (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query)
        );
        },

        // Fungsi untuk mengedit pekerjaan
        editJob(job) {
        console.log("Edit Job:", job); // Menampilkan pekerjaan yang dipilih untuk diedit
        },

        // Fungsi untuk menghapus pekerjaan
        deleteJob(jobId) {
        console.log("Delete Job:", jobId); // Menampilkan pekerjaan yang dipilih untuk dihapus
        },
    },
    created() {
        this.fetchJobDetail(); // Ambil data pekerjaan ketika komponen dibuat
    },
    };
    </script>

    <style lang="scss" scoped></style>
