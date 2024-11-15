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
                        <div
                            v-if="showModal"
                            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full"
                        >
                            <!-- Modal Container -->
                            <div
                            class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3"
                            >
                            <!-- Modal Header -->
                            <div
                                class="flex justify-between items-center border-b pb-3"
                            >
                                <h3 class="text-xl font-semibold">Add New Job</h3>
                                <button
                                @click="showModal = false"
                                class="text-gray-500 hover:text-gray-700"
                                >
                                ✕
                                </button>
                            </div>
                            <!-- Modal Body -->
                            <div class="modal-body">
                                <form @submit.prevent="addJobHandler">
                                <div class="card-body">
                                    <h4 class="text-lg font-bold mb-2">Title</h4>
                                    <input
                                    v-model="newJobTitle"
                                    type="text"
                                    placeholder="Title"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />
                                    <h4 class="text-lg font-bold mb-2">
                                    Description
                                    </h4>
                                    <div>
                                    <QuillEditor
                                        v-model:content="newJobDescription"
                                        type="text"
                                        placeholder="Description"
                                        class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    ></QuillEditor>
                                    <div
                                        v-html="newJobDescription"
                                        class="hidden"
                                    ></div>
                                    </div>
                                    <h4 class="text-lg font-bold mb-2">
                                    Requirement
                                    </h4>
                                    <input
                                    v-model="newJobRequirement"
                                    type="text"
                                    placeholder="Requirement"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />
                                    <h4 class="text-lg font-bold mb-2">Job Type</h4>
                                    <input
                                    v-model="newJobType"
                                    type="text"
                                    placeholder="Type"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />
                                    <h4 class="text-lg font-bold mb-2">Salary</h4>
                                    <input
                                    v-model="newJobSalary"
                                    type="text"
                                    placeholder="Salary"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />
                                    <h4 class="text-lg font-bold mb-2">Location</h4>
                                    <input
                                    v-model="newJobLocation"
                                    type="text"
                                    placeholder="Location"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />
                                    <input
                                    v-model="newJobUserId"
                                    type="text"
                                    placeholder="Location"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50 hidden"
                                    />
                                </div>
                                </form>
                            </div>
                            <!-- Modal Footer -->
                            <div class="mt-6 flex justify-end space-x-4">
                                <button
                                @click="showModal = false"
                                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                                >
                                Close
                                </button>
                                <button
                                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
                                @click="addJobHandler"
                                >
                                Save Changes
                                </button>
                            </div>
                            </div>
                        </div>
                        <div
                            v-if="editModal"
                            class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 w-full"
                        >
                            <!-- Modal Container -->
                            <div
                            class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3"
                            >
                            <!-- Modal Header -->
                            <div
                                class="flex justify-between items-center border-b pb-3"
                            >
                                <h3 class="text-xl font-semibold">Edit Job</h3>
                                <button
                                @click="editModal = false"
                                class="text-gray-500 hover:text-gray-700"
                                >
                                ✕
                                </button>
                            </div>
                            <!-- Modal Body -->
                            <div class="modal-body">
                                <form @submit.prevent="updateJob">
                                <div class="card-body">
                                    <!-- Job Title -->
                                    <h4 class="text-lg font-bold mb-2">Title</h4>
                                    <input
                                    v-model="newJobTitle"
                                    type="text"
                                    placeholder="Enter job title"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />

                                    <!-- Job Description -->
                                    <h4 class="text-lg font-bold mb-2">
                                    Description
                                    </h4>
                                    <QuillEditor
                                    v-model:content="newJobDescription"
                                    placeholder="Enter job description"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    ></QuillEditor>

                                    <!-- Job Requirement -->
                                    <h4 class="text-lg font-bold mb-2">
                                    Requirement
                                    </h4>
                                    <input
                                    v-model="newJobRequirement"
                                    type="text"
                                    placeholder="Enter job requirement"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />

                                    <!-- Job Type -->
                                    <h4 class="text-lg font-bold mb-2">Job Type</h4>
                                    <input
                                    v-model="newJobType"
                                    type="text"
                                    placeholder="Enter job type (e.g., Full-time)"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />

                                    <!-- Salary -->
                                    <h4 class="text-lg font-bold mb-2">Salary</h4>
                                    <input
                                    v-model="newJobSalary"
                                    type="text"
                                    placeholder="Enter salary"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />

                                    <!-- Location -->
                                    <h4 class="text-lg font-bold mb-2">Location</h4>
                                    <input
                                    v-model="newJobLocation"
                                    type="text"
                                    placeholder="Enter location"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                    />
                                    <input
                                    v-model="newJobUserId"
                                    type="text"
                                    placeholder="Location"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50 hidden"
                                    />
                                </div>

                                <!-- Modal Footer with buttons -->
                                <div class="mt-6 flex justify-end space-x-4">
                                    <!-- Close Button -->
                                    <button
                                    @click="editModal = false"
                                    class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                                    >
                                    Close
                                    </button>
                                    <!-- Save Button -->
                                    <button
                                    type="submit"
                                    class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
                                    >
                                    Save Changes
                                    </button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>

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
                        <!-- Responsive Table Wrapper -->
                        <div class="overflow-x-auto">
                        <table class="table bg-white text-black w-full">
                            <thead class="text-black text-center">
                            <tr>
                                <th></th>
                                <th @click="sortTable('title')">Title</th>
                                <th @click="sortTable('description')">
                                Description
                                </th>
                                <th @click="sortTable('salary')">Salary</th>
                                <th @click="sortTable('type')">Type</th>
                                <th @click="sortTable('requirement')">
                                Requirement
                                </th>
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
                                <td v-html="job.description"></td>
                                <td>{{ job.salary }}</td>
                                <td>{{ job.type }}</td>
                                <td>{{ job.requirement }}</td>
                                <td>{{ job.location }}</td>
                                <td>{{ job.applicantsCount || 0 }}</td>
                                <td class="text-center">
                                <!-- Edit Button -->
                                <button
                                    type="button"
                                    class="btn bg-yellow-500 text-white border-none"
                                    data-toggle="modal"
                                    data-target="#modal-default"
                                    @click="editModal = true"
                                >
                                    <i class="fas fa-solid fa-pen-to-square"></i>
                                </button>
                                <!-- Delete Button -->
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
    import { ref, computed, onMounted } from "vue";
    import {
    getAllData,
    deleteJob,
    addJob,
    updateJob,
    } from "../../../Services/Api/AdminService"; // Import API functions
    import { decodeToken } from "../../../Services/JWT/JwtDecode";
    import Swal from "sweetalert2";
    import {
    RichTextEditorComponent,
    Toolbar,
    Image,
    HtmlEditor,
    Link,
    Table,
    } from "@syncfusion/ej2-vue-richtexteditor";
    import { QuillEditor } from "@vueup/vue-quill";
    import "@vueup/vue-quill/dist/vue-quill.snow.css";
    import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
    export default {
    components: {
        "ejs-richtexteditor": RichTextEditorComponent,
        QuillEditor,
    },
    methods: {
        openEditModal(jobId) {
        this.jobId = jobId;
        this.editModal = true;
        this.getJobsById(jobId);
        },

        getJobsById(jobId) {
        fetch(`/api/jobs/${jobId}`)
            .then((response) => response.json())
            .then((data) => {
            // Isi data untuk diedit
            this.newJobTitle = data.title;
            this.newJobDescription = data.description;
            this.newJobRequirement = data.requirement;
            this.newJobType = data.type;
            this.newJobSalary = data.salary;
            this.newJobLocation = data.location;
            })
            .catch((error) => console.error("Error fetching job data:", error));
        },
    },
    provide: {
        richtexteditor: [Toolbar, Image, HtmlEditor, Link, Table],
    },
    setup() {
        // State variables
        const showModal = ref(false);
        const editModal = ref(false);
        const selectedTitle = ref("");
        const searchQuery = ref("");
        const dataJobs = ref([]);
        const filteredJobs = ref([]);
        const perPage = ref(10); // Default number of jobs per page
        const currentPage = ref(1); // Default to first page
        const totalPages = ref(1); // For pagination calculation
        const newJobTitle = ref("");
        const newJobDescription = ref("");
        const newJobType = ref("");
        const newJobSalary = ref("");
        const newJobLocation = ref("");
        const newJobRequirement = ref("");
        const newJobUserId = ref("");
        const id = ref("");
        const userId = ref("");

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

        const getUserId = async () => {
        try {
            const dataUser = await decodeToken();
            id.value = dataUser.uid;
        } catch (error) {
            console.error("Error decoding token:", error);
        }
        };

        const getInsertValues = (delta) => {
        if (!delta || !delta.ops) {
            return "";
        }
        // Menggunakan QuillDeltaToHtmlConverter untuk mengonversi Delta ke HTML
        const converter = new QuillDeltaToHtmlConverter(delta.ops, {});

        const html = converter.convert();
        return html;
        };

        const addJobHandler = async () => {
        // const insertValues = getInsertValues(newJobDescription.value);
        // const descriptionHTML = newJobDescription.value;
        const descriptionHTML = getInsertValues(newJobDescription.value);
        const newJob = {
            Title: newJobTitle.value,
            Description: descriptionHTML,
            Requirement: newJobRequirement.value,
            Salary: newJobSalary.value,
            Type: newJobType.value,
            Location: newJobLocation.value,
            uid: id.value,
        };
        console.log("Job data to be added:", newJob);

        try {
            await addJob(newJob);
            console.log("Job successfully added!");
        } catch (exception) {
            console.error("Error adding job:", exception);
        }
        };

        // const updateJobHandler = async (
        // jobId,
        // newJobTitle,
        // newJobDescription,
        // newJobRequirement,
        // newJobSalary,
        // newJobType,
        // newJobLocation,
        // id
        // ) => {
        const token = localStorage.getItem("authToken");

        const dateNewJob = {
        title: newJobTitle.value,
        description: newJobDescription.value, // Ensure `newJobDescription` is a ref
        requirement: newJobRequirement.value,
        salary: newJobSalary.value,
        type: newJobType.value,
        location: newJobLocation.value,
        uid: id.value, // Make sure `id` holds the correct job identifier
        };

        const updateJob = async () => {
        if (!token) {
            console.error("No authentication token found.");
            Swal.fire({
            icon: "error",
            title: "Authentication Error",
            text: "Please log in again.",
            confirmButtonText: "OK",
            });
            return;
        }

        // Input validation
        if (
            !dateNewJob.title ||
            !dateNewJob.description ||
            !dateNewJob.requirement ||
            !dateNewJob.salary ||
            !dateNewJob.type ||
            !dateNewJob.location ||
            !dateNewJob.uid // Check if the userId/jobId is also provided
        ) {
            console.error("Missing required job fields.");
            Swal.fire({
            icon: "error",
            title: "Input Error",
            text: "Please fill in all required fields.",
            confirmButtonText: "Retry",
            });
            return;
        }

        try {
            console.log("Updating job with data:", dateNewJob);

            // Assuming the URL is correct with userId/jobId
            const response = await axios.put(
            `${API_URL}/${dateNewJob.uid}`, // Make sure userId is correct identifier
            dateNewJob,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            }
            );

            if (response?.data) {
            // Check if response.data exists
            console.log("Job updated successfully:", response.data);

            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Job updated successfully.",
                showConfirmButton: false,
                timer: 1500,
            });
            } else {
            throw new Error("Unexpected response structure");
            }
        } catch (error) {
            console.error(
            "Error updating job:",
            error.response ? error.response.data : error.message
            );

            Swal.fire({
            icon: "error",
            title: "Oops...",
            text:
                error.response?.data?.message ||
                "There was an error updating the job!",
            confirmButtonText: "Retry",
            });
        }
        };

        // };

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
            totalPages.value = Math.ceil(
                filteredJobs.value.length / perPage.value
            ); // Recalculate total pages
            Swal.fire("Deleted!", "Job has been deleted.", "success");
            } catch (error) {
            Swal.fire("Error", "There was an error deleting the job.", "error");
            }
        }
        };

        // Fetch job details when component is mounted
        onMounted(() => {
        getUserId();
        fetchJobDetail();
        });

        return {
        showModal,
        id,
        userId,
        newJobUserId,
        newJobTitle,
        newJobDescription,
        newJobRequirement,
        newJobLocation,
        newJobSalary,
        newJobType,
        editModal,
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
        addJobHandler,
        updateJob,
        // updateJobHandler,
        };
    },
    };
    </script>

    <style>
    .ql-editor {
    height: 15vh;
    }
    /* Styling for pagination and other elements */
    .pagination-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    }
    @import "/node_modules/@syncfusion/ej2-base/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-inputs/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-lists/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-popups/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-buttons//styles/material.css";
    @import "/node_modules/@syncfusion/ej2-navigations/styles/material.css";
    @import "/node_modules/@syncfusion/ej2-splitbuttons//styles/material.css";
    @import "/node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
    </style>
