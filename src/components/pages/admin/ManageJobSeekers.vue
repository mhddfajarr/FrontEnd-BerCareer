<template>
  <div class="content-wrapper">
    <!-- Breadcrumb -->
    <div class="bg-gray-200 p-3 mb-4 flex justify-end rounded-lg">
      <nav class="text-gray-600 text-sm">
        <router-link to="/admin" class="hover:underline">Dashboard</router-link>
        <span class="mx-2">/</span>
        <span class="text-gray-400">Manage Job Portal</span>
      </nav>
    </div>
    <!-- Title -->
    <h1 class="text-3xl font-bold text-primary mb-2">Manage Jobseekers</h1>

    <section class="content">
      <div class="container-fluid">
        <div class="flex justify-between">
          <!-- Job List Card -->
          <div
            class="card bg-white w-96 shadow-xl mb-4 border-t-4 border-t-primary"
          >
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
                        class="cursor-pointer hover:bg-gray-200 font-semibold text-gray-700"
                        @click="resetJobFilter"
                      >
                        <td>All</td>
                      </tr>
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
          <div
            class="card bg-white w-full md:w-11/12 lg:w-9/12 xl:w-full shadow-xl ml-4 mb-4 mx-auto border-t-4 border-t-primary"
          >
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

              <!-- Filter Status -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <label for="statusFilter" class="mr-2 font-semibold">
                    Filter by Status:
                  </label>
                  <select
                    id="statusFilter"
                    v-model="selectedStatus"
                    @change="filterApplicationsByStatus"
                    class="select select-bordered w-40 bg-white"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <!-- Pilih jumlah item per halaman -->
                <div class="flex items-center">
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
              </div>

              <!-- Applications Table -->
              <div class="w-full overflow-x-auto rounded-md">
                <table class="table table-auto w-full">
                  <thead class="bg-primary text-white text-md text-center">
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
                  <tbody class="text-center">
                    <tr v-if="paginatedApplications.length === 0">
                      <td colspan="8" class="text-gray-500">
                        No data available
                      </td>
                    </tr>
                    <tr
                      v-else
                      v-for="application in paginatedApplications"
                      :key="application.applicationId"
                    >
                      <!-- Tombol untuk membuka modal -->
                      <td>
                        <button
                          class="btn bg-primary text-white hover:bg-primaryHover border-none btn-circle"
                          @click="
                            showModal('modal-' + application.applicationId)
                          "
                        >
                          <i class="fas fa-solid fa-info"></i>
                        </button>

                        <!-- Modal Komponen -->
                        <ModalComponent
                          v-for="application in paginatedApplications"
                          :key="application.applicationId"
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
                        <span
                          class="badge"
                          :class="{
                            'badge-success text-white':
                              application.progress === 'Approved',
                            'badge-error text-white':
                              application.progress === 'Rejected',
                            'badge-warning text-white':
                              application.progress === 'Pending',
                          }"
                        >
                          {{ application.progress }}
                        </span>
                      </td>
                      <td>
                        <select
                          class="select border-2 select-bordered w-32 bg-white"
                          v-model="application.progress"
                          @change="updateApplicationStatus(application)"
                          :disabled="
                            application.progress === 'Approved' ||
                            application.progress === 'Rejected'
                          "
                        >
                          <option
                            v-for="option in statusOptions"
                            :key="option.value"
                            :value="option.value"
                          >
                            {{ option.text }}
                          </option>
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
                  <i class="fas fa-solid fa-angles-left"></i>
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
                  <i class="fas fa-solid fa-angles-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="loading-overlay flex flex-col">
        <div
          class="animate-spin inline-block w-12 h-12 border-4 border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        ></div>

        <div class="pt-5">
          <h1 class="text-lg text-white font-semibold">
            Sending notification to applicant email
          </h1>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { getAllData, updateStatus } from "../../../Services/Api/AdminService";
import axios from "axios";
import Swal from "sweetalert2";
import ModalComponent from "../../../components/Admin/ModalCV.vue";

export default {
  components: {
    ModalComponent,
  },
  setup() {
    // State variables
    const dataJobs = ref([]);
    const filteredJobs = ref([]);
    const searchQuery = ref("");
    const selectedJob = ref(null);
    const jobsPagination = ref({
      currentPage: 1,
      itemsPerPage: 10,
    });
    const pageOptions = ref([5, 10, 15]);
    const dataApplications = ref([]);
    const applicationsPagination = ref({
      currentPage: 1,
      itemsPerPage: 10,
    });
    const sortKey = ref("jobTitle");
    const sortOrder = ref("asc");
    const loading = ref(false);
    const selectedStatus = ref("");
    const statusOptions = [
      { value: "Pending", text: "Update Status" },
      { value: "Approved", text: "Approved" },
      { value: "Rejected", text: "Rejected" },
    ];
    const status = ref(null);
    // Computed properties
    const jobsTotalPages = computed(() => {
      return Math.ceil(
        filteredJobs.value.length / jobsPagination.value.itemsPerPage
      );
    });

    const paginatedJobs = computed(() => {
      const start =
        (jobsPagination.value.currentPage - 1) *
        jobsPagination.value.itemsPerPage;
      const end = start + jobsPagination.value.itemsPerPage;
      const sortedJobs = sortJobs(filteredJobs.value);
      return sortedJobs.slice(start, end);
    });

    const filteredApplications = computed(() => {
      let filtered = selectedJob.value
        ? dataApplications.value.filter(
            (application) => application.jobTitle === selectedJob.value.title
          )
        : dataApplications.value;

      if (selectedStatus.value) {
        filtered = filtered.filter(
          (application) => application.progress === selectedStatus.value
        );
      }

      return filtered;
    });

    const applicationsTotalPages = computed(() => {
      return Math.ceil(
        filteredApplications.value.length /
          applicationsPagination.value.itemsPerPage
      );
    });

    const paginatedApplications = computed(() => {
      const start =
        (applicationsPagination.value.currentPage - 1) *
        applicationsPagination.value.itemsPerPage;
      const end = start + applicationsPagination.value.itemsPerPage;
      return filteredApplications.value.slice(start, end);
    });

    // Methods
    const fetchJobDetail = async () => {
      try {
        const response = await getAllData();
        dataJobs.value = response.data || [];
        filteredJobs.value = [...dataJobs.value];
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://localhost:7147/api/Applications/AllDetail",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dataApplications.value = response.data.data.map((app) => ({
          ...app,
          isDisabled:
            app.progress === "Approved" || app.progress === "Rejected",
        }));
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    const sortJobs = (jobs) => {
      return jobs.sort((a, b) => {
        const fieldA = a[sortKey.value].toLowerCase();
        const fieldB = b[sortKey.value].toLowerCase();
        if (sortOrder.value === "asc") {
          return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
        } else {
          return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
        }
      });
    };

    const changeSort = (newSortKey) => {
      if (sortKey.value === newSortKey) {
        sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
      } else {
        sortKey.value = newSortKey;
        sortOrder.value = "asc";
      }
    };

    const filterBySearch = () => {
      const query = searchQuery.value.toLowerCase();
      filteredJobs.value = dataJobs.value.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          (job.location && job.location.toLowerCase().includes(query))
      );
    };

    const filterJobsByTitle = (job) => {
      selectedJob.value = job;
      searchQuery.value = "";
      applicationsPagination.value.currentPage = 1;
    };

    const resetJobFilter = () => {
      selectedJob.value = null;
      filteredJobs.value = [...dataJobs.value];
      jobsPagination.value.currentPage = 1;
    };

    const changeJobsPage = (page) => {
      jobsPagination.value.currentPage = page;
    };

    const changeApplicationsPage = (page) => {
      applicationsPagination.value.currentPage = page;
    };

    const updateItemsPerPage = () => {
      applicationsPagination.value.currentPage = 1;
    };

    const updateApplicationStatus = async (application) => {
      Swal.fire({
        title: "Are You Sure About Updating the Application Status?",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "Update",
        confirmButtonColor: "#0a4d80",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem("authToken");

          if (!token) {
            Swal.fire({
              icon: "error",
              title: "Authentication Error",
              text: "Please log in again.",
            });
            return;
          }
          if (application.progress == "Approved") {
            status.value = 1;
          }
          if (application.progress == "Rejected") {
            status.value = 2;
          }
          const updatedStatus = {
            applicationId: application.applicationId,
            status: status.value,
          };

          loading.value = true;
          try {
            const updatedApplication = await updateStatus(updatedStatus, token);

            const index = dataApplications.value.findIndex(
              (app) => app.applicationId === application.applicationId
            );

            if (index !== -1) {
              dataApplications.value[index] = {
                ...dataApplications.value[index],
                status: updatedApplication.status,
                progress:
                  updatedApplication.status === 1
                    ? "Approved"
                    : updatedApplication.status === 2
                    ? "Rejected"
                    : "Pending",
              };
            }
            fetchApplications();
            Swal.fire({
              title: "Success !",
              icon: "success",
              text: "Status updated successfully",
              showConfirmButton: false,
              timer: 1500,
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
          } finally {
            loading.value = false;
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    };

    const showModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    };

    const closeModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.close();
      }
    };

    // Adding additional computed properties and methods
    const jobsPaginationDetails = computed(() => ({
      currentPage: jobsPagination.value.currentPage,
      itemsPerPage: jobsPagination.value.itemsPerPage,
    }));

    const filteredAndSortedJobs = computed(() => {
      return sortJobs(filteredJobs.value);
    });

    const applicationsPaginationDetails = computed(() => ({
      currentPage: applicationsPagination.value.currentPage,
      itemsPerPage: applicationsPagination.value.itemsPerPage,
    }));

    onMounted(() => {
      fetchJobDetail();
      fetchApplications();
      console.log("ini data aplication", dataApplications);
    });

    return {
      statusOptions,
      dataJobs,
      filteredJobs,
      searchQuery,
      selectedJob,
      jobsPagination,
      pageOptions,
      dataApplications,
      filteredApplications,
      applicationsPagination,
      sortKey,
      sortOrder,
      loading,
      jobsTotalPages,
      paginatedJobs,
      applicationsTotalPages,
      paginatedApplications,
      fetchJobDetail,
      fetchApplications,
      sortJobs,
      changeSort,
      filterBySearch,
      filterJobsByTitle,
      resetJobFilter,
      changeJobsPage,
      changeApplicationsPage,
      updateItemsPerPage,
      updateApplicationStatus,
      selectedStatus,
      jobsPaginationDetails,
      filteredAndSortedJobs,
      applicationsPaginationDetails,
      showModal,
    };
  },
};
</script>

<style scoped>
select[disabled] {
  background-color: white; /* Warna putih */
  color: gray; /* Opsional: Warna teks untuk disabled */
  cursor: not-allowed; /* Menunjukkan bahwa elemen tidak bisa diklik */
  opacity: 1; /* Pastikan tidak terlihat transparan */
}
/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

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
