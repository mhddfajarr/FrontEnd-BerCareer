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
                <!-- Main Card -->
                <div class="card shadow-xl border-t-4 border-t-primary bg-white">
                <div class="flex justify-between">
                    <!-- Job List Card -->
                    <!-- Card dengan tabel daftar pekerjaan -->
                    <div class="card bg-base-100 w-96 shadow-xl mb-4 ml-4">
                    <div class="card-body">
                        <h2 class="card-title">List Jobs</h2>
                        <input
                        type="text"
                        v-model="searchQuery"
                        @input="filterBySearch"
                        placeholder="Search jobs..."
                        class="input input-bordered w-full mb-4"
                        />
                        <div class="h-96 overflow-x-auto">
                        <table class="table table-pin-rows">
                            <thead>
                            <tr>
                                <th>Title</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(job, index) in filteredJobs"
                                :key="job.id"
                                @click="filterJobsByTitle(job)"
                                class="cursor-pointer hover:bg-gray-200"
                            >
                                <td>{{ job.title }}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>

                    <!-- Job Details and Applications -->
                    <div
                    class="card bg-base-100 w-full shadow-xl ml-4 mr-4 mb-4 mx-auto"
                    >
                    <div class="card-body">
                        <!-- Job Details -->
                        <div>
                        <h2 class="card-title">
                            {{ selectedJob?.title || "Select a Job" }}
                        </h2>
                        <div v-if="selectedJob" class="mt-4">
                            <div v-html="selectedJob.description"></div>
                        </div>
                        <p v-else class="mt-4">
                            Please select a job to view details.
                        </p>
                        </div>
                        <!-- Pilih jumlah item per halaman -->
                        <div class="flex items-center justify-end mb-4 mt-4">
                        <label class="flex items-center">
                            <span class="mr-2">Show</span>
                            <select
                            v-model="itemsPerPage"
                            class="select select-bordered w-20"
                            >
                            <option
                                v-for="option in pageOptions"
                                :key="option"
                                :value="option"
                            >
                                {{ option }}
                            </option>
                            </select>
                            <span class="ml-2">entries</span>
                        </label>
                        </div>
                        <!-- Applications Table -->
                        <div class="w-full overflow-x-auto mt-6">
                        <table class="table table-auto w-full">
                            <thead>
                            <tr>
                                <th>Detail</th>
                                <th>Job Title</th>
                                <th>Profile</th>
                                <th>Experience</th>
                                <th>Education</th>
                                <th>Skills</th>
                                <th>Progress</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for="(
                                application, index
                                ) in paginatedApplications"
                                :key="index"
                            >
                                <td>
                                    <button class="btn btn-circle" @click="showModal('modal-' + index)">
        <i class="fas fa-solid fa-info"></i>
                                    </button>
                                    <ModalComponent
                                        :modalId="'modal-' + index"
                                        :userId="application.userId"
                                    />
                                </td>
                                <td>{{ application.jobTitle }}</td>
                                <td>{{ application.fullName }}</td>
                                <td>{{ application.experience }}</td>
                                <td>{{ application.education }}</td>
                                <td>{{ application.skills }}</td>
                                <td>
                                {{
                                    application.progress ? "Completed" : "Pending"
                                }}
                                </td>
                                <td>
                                <div
                                    class="dropdown dropdown-bottom dropdown-end"
                                >
                                    <div tabindex="0" role="button" class="btn m-1">
                                    Click
                                    </div>
                                    <ul
                                    tabindex="0"
                                    class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                    >
                                    <li><a>Item 1</a></li>
                                    <li><a>Item 2</a></li>
                                    </ul>
                                </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <!-- Pagination -->
                        <div class="mt-4 flex justify-end items-center">
                            <button
                            class="btn bg-primary text-white"
                            :disabled="applicationsPagination.currentPage <= 1"
                            @click="
                                changeApplicationsPage(
                                applicationsPagination.currentPage - 1
                                )
                            "
                            >
                            Previous
                            </button>
                            <span class="mx-2"
                            >Page {{ applicationsPagination.currentPage }} of
                            {{ applicationsTotalPages }}</span
                            >
                            <button
                            class="btn bg-primary text-white"
                            :disabled="
                                applicationsPagination.currentPage >=
                                applicationsTotalPages
                            "
                            @click="
                                changeApplicationsPage(
                                applicationsPagination.currentPage + 1
                                )
                            "
                            >
                            Next
                            </button>
                        </div>
                        </div>
                    </div>
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
    import axios from "axios";
    import ModalComponent from "../../../components/Admin/ModalCV.vue"

    export default {
        components: {
    ModalComponent,
  },
    data() {
        return {
        // Jobs Data
        dataJobs: [],
        filteredJobs: [],
        searchQuery: "",
        selectedJob: null,
        jobsPagination: {
            currentPage: 1,
            itemsPerPage: 5,
        },

        // Applications Data
        dataApplications: [],
        filteredApplications: [],
        applicationsPagination: {
            currentPage: 1,
            itemsPerPage: 5,
        },
        };
    },
    computed: {
        // Jobs Pagination
        jobsTotalPages() {
        return Math.ceil(
            this.filteredJobs.length / this.jobsPagination.itemsPerPage
        );
        },
        paginatedJobs() {
        const start =
            (this.jobsPagination.currentPage - 1) *
            this.jobsPagination.itemsPerPage;
        const end = start + this.jobsPagination.itemsPerPage;
        return this.filteredJobs.slice(start, end);
        },

        // Applications Pagination
        applicationsTotalPages() {
        return Math.ceil(
            this.filteredApplications.length /
            this.applicationsPagination.itemsPerPage
        );
        },
        paginatedApplications() {
        const start =
            (this.applicationsPagination.currentPage - 1) *
            this.applicationsPagination.itemsPerPage;
        const end = start + this.applicationsPagination.itemsPerPage;
        return this.filteredApplications.slice(start, end);
        },
    },
    methods: {
        showModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    },
        async fetchJobDetail() {
        try {
            const response = await getAllData();
            this.dataJobs = response.data || [];
            this.filteredJobs = [...this.dataJobs];
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
        },
        async fetchApplications() {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(
            "https://localhost:7147/api/Applications/AllDetail",
            {
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            this.dataApplications = response.data.data || [];
            this.filteredApplications = [...this.dataApplications];
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
        },
        filterBySearch() {
        const query = this.searchQuery.toLowerCase();
        this.filteredJobs = this.dataJobs.filter(
            (job) =>
            job.title.toLowerCase().includes(query) ||
            job.description.toLowerCase().includes(query) ||
            (job.location && job.location.toLowerCase().includes(query))
        );
        },
        filterJobsByTitle(job) {
        this.selectedJob = job;
        this.searchQuery = "";
        this.filteredApplications = this.dataApplications.filter(
            (app) => app.jobTitle === job.title
        );
        this.applicationsPagination.currentPage = 1;
        },
        changeJobsPage(page) {
        this.jobsPagination.currentPage = page;
        },
        changeApplicationsPage(page) {
        this.applicationsPagination.currentPage = page;
        },
    },
    created() {
        this.fetchJobDetail();
        this.fetchApplications();
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
    .breadcrumbs {
    margin-bottom: 16px;
    }
    </style>
