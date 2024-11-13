    <template>
    <div class="content-wrapper">
        <div class="breadcrumbs text-sm mb-4">
        <ul>
            <li><a>Dashboard</a></li>
            <li><a>Manage Job Portal</a></li>
        </ul>
        </div>
        <h1 class="text-3xl font-bold text-primary mb-2">Manage Job Portal</h1>

        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card bg-white shadow-xl border-t-4 border-t-primary">
                    <div class="card-header">
                    <div class="card-body">
                        <div class="flex justify-between items-center space-x-4">
                        <button
                            type="button"
                            class="btn bg-primary border hover:bg-primaryHover text-white border-none"
                            data-toggle="modal"
                            data-target="#modal-default"
                            @click="showModal = true"
                        >
                            Add New Job
                        </button>

                        <div class="flex items-center space-x-2 bg-white">
                            <details class="dropdown bg-white border-none">
                            <summary
                                class="btn m-1 bg-slate-200 hover:bg-primaryHover border-none"
                            >
                                <i class="fas fa-solid fa-filter"></i>
                            </summary>
                            <ul
                                class="menu dropdown-content bg-white rounded-box z-[1] w-52 p-2 shadow border-none"
                            >
                                <li
                                v-for="(job, index) in dataJobs"
                                :key="job.jobId"
                                @click="filterJobsByTitle(job.title)"
                                >
                                <a>{{ job.title }}</a>
                                </li>
                            </ul>
                            </details>
                            <!-- Data per page selection -->
                            <select
                            v-model="perPage"
                            @change="updatePagination"
                            class="select select-bordered"
                            >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            </select>
                            <div class="form-control">
                            <input
                                type="text"
                                v-model="searchQuery"
                                @input="filterBySearch"
                                placeholder="Search"
                                class="input input-bordered w-24 md:w-auto bg-white"
                            />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <table class="table bg-white text-black">
                        <thead class="text-black text-center">
                            <tr>
                            <th></th>
                            <th @click="sortTable('title')">Title</th>
                            <th @click="sortTable('description')">Description</th>
                            <th @click="sortTable('salary')">Salary</th>
                            <th @click="sortTable('type')">Type</th>
                            <th @click="sortTable('requirement')">Requirement</th>
                            <th @click="sortTable('location')">Location</th>
                            <th>Total Applicants</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr
                            v-for="(job, index) in paginatedJobs"
                            :key="job.jobId"
                            >
                            <td><input type="checkbox" class="checkbox" /></td>
                            <td>{{ job.title }}</td>
                            <td>{{ job.description }}</td>
                            <td>{{ job.salary }}</td>
                            <td>{{ job.type }}</td>
                            <td>{{ job.requirement }}</td>
                            <td>{{ job.location }}</td>
                            <td>{{ job.applicantsCount || 0 }}</td>
                            <td class="text-center">
                                <button
                                @click="editJob(job)"
                                class="btn bg-yellow-500 text-white"
                                >
                                <i class="fas fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                @click="deleteJobHandler(job.userId, job.jobId)"
                                class="btn bg-red-500 ml-2 text-white"
                                >
                                <i class="fas fa-solid fa-trash"></i>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>

                    <div
                        class="pagination-container flex justify-end items-center space-x-4 p-4"
                    >
                        <!-- Pagination controls -->
                        <button
                        class="btn bg-primary text-white"
                        :disabled="currentPage <= 1"
                        @click="changePage(currentPage - 1)"
                        >
                        <i class="fas fa-solid fa-angles-left"></i>
                        </button>
                        <span class="mx-2"
                        >Page {{ currentPage }} of {{ totalPages }}</span
                        >
                        <button
                        class="btn bg-primary text-white"
                        :disabled="currentPage >= totalPages"
                        @click="changePage(currentPage + 1)"
                        >
                        <i class="fas fa-solid fa-angles-right"></i>
                        </button>
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
import { ref, computed, onMounted } from 'vue';
import { getAllData, deleteJob } from "../../../Api/AdminService"; // Import API functions
import Swal from 'sweetalert2';

export default {
  setup() {
    // State variables
    const showModal = ref(false);
    const selectedTitle = ref("");
    const searchQuery = ref("");
    const dataJobs = ref([]);
    const filteredJobs = ref([]);
    const perPage = ref(10); // Default number of jobs per page
    const currentPage = ref(1); // Default to first page
    const totalPages = ref(1); // For pagination calculation

    // Fetch job details from API
    const fetchJobDetail = async () => {
      try {
        const response = await getAllData();
        dataJobs.value = response.data;
        filteredJobs.value = response.data; // Initialize filteredJobs with all data
        totalPages.value = Math.ceil(filteredJobs.value.length / perPage.value); // Calculate total pages
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Calculate paginated jobs based on current page and items per page
    const paginatedJobs = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return filteredJobs.value.slice(start, end);
    });

    // Handle sorting of data by column
    const sortTable = (column) => {
      const sortedJobs = [...filteredJobs.value].sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
      filteredJobs.value = sortedJobs;
    };

    // Handle search filtering
    const filterBySearch = () => {
      const query = searchQuery.value.toLowerCase();
      filteredJobs.value = dataJobs.value.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
      );
      totalPages.value = Math.ceil(filteredJobs.value.length / perPage.value); // Recalculate total pages after search
    };

    // Handle filtering by job title
    const filterJobsByTitle = (title) => {
      selectedTitle.value = title;
      searchQuery.value = ""; // Reset search query when filtering by title
      filteredJobs.value = dataJobs.value.filter((job) => job.title === title);
      totalPages.value = Math.ceil(filteredJobs.value.length / perPage.value); // Recalculate total pages
    };

    // Handle page change
    const changePage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };

    // Update pagination when items per page changes
    const updatePagination = () => {
      currentPage.value = 1; // Reset to first page when items per page is changed
      totalPages.value = Math.ceil(filteredJobs.value.length / perPage.value); // Recalculate total pages
    };

    // Function to delete job
    const deleteJobHandler = async (userId, jobId) => {
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
          await deleteJob(userId, jobId); // API call to delete job
          filteredJobs.value = filteredJobs.value.filter(
            (job) => job.jobId !== jobId
          ); // Remove job from list
          totalPages.value = Math.ceil(filteredJobs.value.length / perPage.value); // Recalculate total pages
          Swal.fire("Deleted!", "Job has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "There was an error deleting the job.", "error");
        }
      }
    };

    // Fetch job details when component is mounted
    onMounted(() => {
      fetchJobDetail(); 
    });

    return {
      showModal,
      selectedTitle,
      searchQuery,
      dataJobs,
      filteredJobs,
      perPage,
      currentPage,
      totalPages,
      paginatedJobs,
      sortTable,
      filterBySearch,
      filterJobsByTitle,
      changePage,
      updatePagination,
      deleteJobHandler,
    };
  },
};
</script>


    <style scoped>
    /* Styling for pagination and other elements */
    .pagination-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    }
    </style>
