    <template>
    <div class="content-wrapper">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs text-sm mb-4">
        <ul>
            <li><a>Dashboard</a></li>
            <li><a>Manage Jobseekers</a></li>
        </ul>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-primary mb-2">Manage Jobseekers</h1>

        <!-- Main Content Section -->
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <!-- Card Component -->
                <div class="card shadow-xl border-t-4 border-t-primary bg-white">
                <div class="card-body">
                    <!-- Card Header with Filter Dropdown -->
                    <div class="flex justify-between">
                    <details class="dropdown bg-white border-none">
                        <summary
                        class="btn m-1 bg-slate-200 hover:bg-primaryHover border-none"
                        >
                        <i class="fas fa-solid fa-filter"></i>
                        </summary>
                        <ul
                        class="menu dropdown-content bg-white rounded-box z-[1] w-52 p-2 shadow border-none"
                        >
                        <!-- Iterasi dataJobs untuk menampilkan job title -->
                        <li
                            v-for="(job, index) in dataJobs"
                            :key="job.jobId"
                            @click="filterJobsByTitle(job.title)"
                        >
                            <a>{{ job.title }}</a>
                            <!-- Tampilkan job.title -->
                        </li>
                        </ul>
                    </details>
                    <h2 class="card-title">Fullstack Developer</h2>
                    </div>
                </div>

                <!-- Card Body with Tabs and Table -->
                <div class="card-body">
                    <div role="tablist" class="tabs tabs-lifted bg-white">
                    <!-- Tab 1: List -->
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab"
                        aria-label="List"
                        checked="checked"
                    />
                    <div
                        role="tabpanel"
                        class="tab-content border-base-300 rounded-xl p-6 bg-white"
                    >
                        <div class="card-body-sm mt-2">
                        <div class="overflow-x-auto">
                            <table class="table bg-white">
                            <!-- Table Head -->
                            <thead>
                                <tr>
                                <th></th>
                                <th>No</th>
                                <th>Profile</th>
                                <th>Job Title</th>
                                <th>Experience</th>
                                <th>Education</th>
                                <th>Skills</th>
                                <th>Certificate</th>
                                <th>Action</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <!-- Table Row 1 -->
                                <tr>
                                <th>
                                    <label>
                                    <input
                                        type="checkbox"
                                        class="checkbox bg-white"
                                    />
                                    </label>
                                </th>
                                <td>1</td>
                                <td>
                                    <div class="flex items-center gap-3 bg-white">
                                    <div class="avatar">
                                        <div
                                        class="mask mask-squircle h-12 w-12 bg-white"
                                        >
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                        </div>
                                    </div>
                                    <div>
                                        <div class="font-bold">Hart Hagerty</div>
                                        <div class="text-sm opacity-50">
                                        United Kingdom
                                        </div>
                                    </div>
                                    </div>
                                </td>
                                <td>Fullstack Developer</td>
                                <td>
                                    <span class="text-black border-none">
                                    Desktop Support Technician
                                    </span>
                                </td>
                                <td>Universitas Negeri London</td>
                                <td>
                                    <span class="text-black border-none">C#</span>
                                    <span class="text-black border-none">PHP</span>
                                    <span class="text-black border-none"
                                    >Javascript</span
                                    >
                                    <span class="text-black border-none"
                                    >Makan Banyak</span
                                    >
                                </td>
                                <td>
                                    <span class="text-black border-none"
                                    >TOEFL</span
                                    >
                                </td>
                                <td>
                                    <input
                                    type="checkbox"
                                    class="toggle toggle-success bg-white border-none"
                                    />
                                </td>
                                <th></th>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>

                    <!-- Tab 2: Accepted -->
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        class="tab"
                        aria-label="Accepted"
                    />
                    <div
                        role="tabpanel"
                        class="tab-content border-base-300 rounded-box p-6 bg-white"
                    >
                        Tab content 2
                    </div>
                    </div>

                    <!-- Join Buttons -->
                    <div class="join justify-end">
                    <input
                        class="join-item btn btn-square bg-white hover:bg-gray-400 border-none"
                        type="radio"
                        name="options"
                        aria-label="1"
                        checked="checked"
                    />
                    <input
                        class="join-item btn btn-square bg-white hover:bg-gray-400 border-none"
                        type="radio"
                        name="options"
                        aria-label="2"
                    />
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
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
        };
    },
    methods: {
        // Mengambil data pekerjaan dari API
        async fetchJobDetail() {
        try {
            const response = await getAllData();
            this.dataJobs = response.data;
            this.filteredJobs = response.data; // Initial display with all jobs
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
        // Filter pekerjaan berdasarkan pencarian judul dan deskripsi
        const query = this.searchQuery.toLowerCase();
        this.filteredJobs = this.dataJobs.filter(
            (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query)
        );
        },

        // Fungsi untuk mengedit pekerjaan
        editJob(job) {
        // Lakukan proses edit
        console.log("Edit Job:", job);
        },

        // Fungsi untuk menghapus pekerjaan
        deleteJob(jobId) {
        // Lakukan proses delete
        console.log("Delete Job:", jobId);
        },
    },
    created() {
        this.fetchJobDetail(); // Ambil data pekerjaan ketika komponen dibuat
    },
    };
    </script>

    <style lang="scss" scoped>
    /* Responsiveness for large screens and scaling adjustments */
    @media (max-width: 1200px) {
    .content-wrapper {
        padding: 1rem;
    }
    .table {
        font-size: 0.9rem; /* Adjust font size for larger screens */
    }
    .tabs-lifted {
        display: flex;
        flex-direction: column;
    }
    .card-title {
        font-size: 1.75rem; /* Slightly smaller card titles */
    }
    }

    /* For small screens */
    @media (max-width: 768px) {
    .tabs-lifted {
        flex-direction: column;
    }
    .card-title {
        font-size: 1.5rem; /* Make the title smaller on mobile */
    }
    .table {
        font-size: 0.85rem;
    }
    .breadcrumbs {
        display: block;
        font-size: 1rem; /* Adjust breadcrumb font for small screens */
    }
    }

    /* For extra small screens */
    @media (max-width: 480px) {
    .card-body {
        padding: 1rem;
    }
    .card-title {
        font-size: 1.25rem; /* Reduce title size further for small screens */
    }
    .table td,
    .table th {
        padding: 0.5rem; /* Adjust padding for table cells on small screens */
    }
    }
    </style>
