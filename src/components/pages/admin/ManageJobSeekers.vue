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
        <div class="grid grid-cols-3 gap-4">
          <!-- Job List Card -->
          <div class="card bg-white shadow-xl col-span-1">
            <div class="card-body text-gray-700">
              <h2 class="card-title">List Jobs</h2>
              <input
                type="text"
                v-model="searchQuery"
                @input="filterBySearch"
                placeholder="Search jobs..."
                class="input input-bordered w-full mb-4 bg-white"
              />
              <div class="h-96 overflow-y-auto">
                <div class="overflow-hidden rounded-md shadow-lg">
                  <table class="table table-auto w-full border-collapse">
                    <thead>
                      <tr>
                        <th class="bg-primary text-white font-semibold text-md">
                          Title
                        </th>
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
          </div>

          <!-- Job Details and Applications -->
          <div class="card bg-white shadow-xl col-span-2">
            <div class="card-body text-gray-700">
              <!-- Job Details -->
              <div>
                <h2 class="card-title text-lg font-bold">
                  {{ selectedJob?.title || "Select a Job" }}
                </h2>
                <div v-if="selectedJob" class="mt-4">
                  <div v-html="selectedJob.description"></div>
                </div>
                <p v-else class="mt-4">Please select a job to view details.</p>
              </div>

              <!-- Pilih jumlah item per halaman -->
              <div class="flex items-center justify-end mb-4 mt-4">
                <label class="flex items-center">
                  <span class="mr-2">Show</span>
                  <select
                    v-model="applicationsPagination.itemsPerPage"
                    @change="updateItemsPerPage"
                    class="select select-bordered w-20 bg-white"
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
              <div class="w-full overflow-x-auto rounded-md">
                <table class="table table-auto w-full">
                  <thead class="bg-primary text-white text-md">
                    <tr>
                      <th>Detail</th>
                      <th>Job Title</th>
                      <th>Profile</th>
                      <th>Experience</th>
                      <th>Education</th>
                      <th>Skills</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="application in paginatedApplications"
                      :key="application.applicationId"
                    >
                      <td>
                        <button
                          class="btn bg-primary text-white hover:bg-primaryHover border-none btn-circle"
                          @click="
                            showModal('modal-' + application.applicationId)
                          "
                        >
                          <i class="fas fa-solid fa-info"></i>
                        </button>
                        <ModalComponent
                          :modalId="'modal-' + application.applicationId"
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
                          application.progress === "Pending"
                            ? "Pending"
                            : "Completed"
                        }}
                      </td>
                      <td>
                        <select
                          class="select select-bordered w-32 bg-white"
                          v-model="application.status"
                          @change="updateApplicationStatus(application)"
                        >
                          <option value="" disabled>Select Status</option>
                          <option value="0">Pending</option>
                          <option value="1">Approved</option>
                          <option value="2">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination -->
              <div class="mt-4 flex justify-end items-center">
                <button
                  class="bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  :disabled="applicationsPagination.currentPage <= 1"
                  @click="
                    changeApplicationsPage(
                      applicationsPagination.currentPage - 1
                    )
                  "
                >
                  Previous
                </button>
                <span class="mx-2">
                  Page {{ applicationsPagination.currentPage }} of
                  {{ applicationsTotalPages }}
                </span>
                <button
                  class="bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  :disabled="
                    applicationsPagination.currentPage >= applicationsTotalPages
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
    </section>
  </div>
</template>

<script>
import { getAllData, updateStatus } from "../../../Services/Api/AdminService";
import axios from "axios";
import Swal from "sweetalert2";
import ModalComponent from "../../../components/Admin/ModalCV.vue";

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
        itemsPerPage: 5, // Default items per page for jobs
      },
      pageOptions: [5, 10, 15], // Options for items per page
      // Applications Data
      dataApplications: [],
      filteredApplications: [],
      applicationsPagination: {
        currentPage: 1,
        itemsPerPage: 5, // Default items per page for applications
      },
      // Sorting options
      sortKey: "jobTitle", // default sorting by jobTitle
      sortOrder: "asc", // default ascending order
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

      // Apply sorting before slicing
      const sortedJobs = this.sortJobs(this.filteredJobs);
      return sortedJobs.slice(start, end);
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
        this.dataApplications = response.data.data.map((app) => ({
          ...app,
          newStatus: "", // Add a property for new status
        }));
        this.filteredApplications = [...this.dataApplications];
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    },
    // Sort jobs based on selected key and order
    sortJobs(jobs) {
      return jobs.sort((a, b) => {
        const fieldA = a[this.sortKey].toLowerCase();
        const fieldB = b[this.sortKey].toLowerCase();
        if (this.sortOrder === "asc") {
          return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
        } else {
          return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
        }
      });
    },
    // Handle sort change
    changeSort(sortKey) {
      if (this.sortKey === sortKey) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = sortKey;
        this.sortOrder = "asc"; // Reset to ascending when a new column is selected
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
    // Update number of items per page for applications
    updateItemsPerPage() {
      this.applicationsPagination.currentPage = 1; // Reset to the first page when items per page changes
    },

    // Function to update application status
    async updateApplicationStatus(application) {
      const token = localStorage.getItem("authToken");

      // Validasi token
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Authentication Error",
          text: "Please log in again.",
        });
        return;
      }

      // Validasi status
      if (![0, 1, 2].includes(Number(application.status))) {
        Swal.fire({
          icon: "error",
          title: "Invalid Status",
          text: "Status must be 0 (Pending), 1 (Approved), or 2 (Rejected).",
        });
        return;
      }

      // Siapkan data untuk pembaruan
      const updatedStatus = {
        applicationId: application.applicationId,
        status: Number(application.status), // Konversi ke angka
      };

      console.log("Data being sent to API:", updatedStatus); // Debugging

      try {
        const updatedApplication = await updateStatus(updatedStatus, token);

        const index = this.dataApplications.findIndex(
          (app) => app.applicationId === application.applicationId
        );

        // if (index !== -1) {
        //     this.$set(this.dataApplications, index, {
        //         ...this.dataApplications[index],
        //         status: updatedApplication.status, // Perbarui status
        //     });
        // }

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Status updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(
          "Error updating status:",
          error.response?.data || error.message
        );
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            error.response?.data?.message ||
            "An error occurred while updating the status.",
        });
      }
    },
  },
  created() {
    // Fetch job and application data when the component is created
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
