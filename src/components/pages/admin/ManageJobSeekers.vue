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

        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <!-- Card Component -->
                <div class="card shadow-xl border-t-4 border-t-primary bg-white">
                <div class="card-body">
                    <!-- Card Header with Filter Tabs -->
                    <div class="flex justify-between flex-wrap">
                    <!-- Tabs Container with Scrollable Property -->
                    <div
                        class="tabs tabs-boxed overflow-x-auto whitespace-nowrap"
                    >
                        <!-- Create a tab for each job title -->
                        <div
                        v-for="(job, index) in dataJobs"
                        :key="job.jobId"
                        class="tab tab-lg inline-block mx-2 cursor-pointer"
                        @click="filterJobsByTitle(job.title)"
                        >
                        {{ job.title }}
                        </div>
                    </div>
                    <h2 class="card-title text-lg md:text-xl">
                        Fullstack Developer
                    </h2>
                    </div>
                </div>

                <!-- Card Body with Tabs and Table -->
                <div class="card-body">
                    <div role="tablist" class="tabs tabs-lifted bg-white flex-wrap">
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
                            <table class="table bg-white table-auto w-full">
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
                                    <span class="text-black border-none"
                                    >Desktop Support Technician</span
                                    >
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
    },
    created() {
        this.fetchJobDetail(); // Ambil data pekerjaan ketika komponen dibuat
    },
    };
    </script>

    <style>
    .tabs {
    -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
    scrollbar-width: thin; /* For Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0); /* Custom scrollbar for Firefox */
    }

    .tabs::-webkit-scrollbar {
    height: 8px;
    }

    .tabs::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    }

    .tabs::-webkit-scrollbar-track {
    background-color: transparent;
    }
    </style>
