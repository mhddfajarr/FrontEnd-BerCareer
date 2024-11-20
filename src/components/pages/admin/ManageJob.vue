<template>
  <div class="content-wrapper">
    <!-- Breadcrumb -->
    <div class="bg-gray-200 p-3 mb-4 flex justify-end rounded-lg">
      <nav class="text-gray-600 text-sm">
        <router-link to="/admin" class="hover:underline">Dashboard</router-link>
        <span class="mx-2">/</span>
        <span  class="text-gray-400"
          >Manage Job Portal</span
        >
      </nav>
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
                          class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 max-h-[90vh] overflow-hidden"
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

                          <!-- Modal Body with scrollable content -->
                          <div class="modal-body overflow-y-auto max-h-[60vh]">
                            <form @submit.prevent="addJobHandler">
                              <div class="card-body">
                                <span class="text-lg font-bold">Title</span>
                                <input
                                  v-model="newJob.title"
                                  type="text"
                                  placeholder="Title"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />

                                <span class="text-lg font-bold mt-4"
                                  >Description</span
                                >
                                <div>
                                  <QuillEditor
                                    v-model:content="newJobDescription"
                                    type="text"
                                    placeholder="Description"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                  ></QuillEditor>
                                </div>

                                <span
                                  for="newDueDate"
                                  class="text-lg font-bold mt-4"
                                  >Due Date</span
                                >
                                <input
                                  type="date"
                                  id="newDueDate"
                                  v-model="newJob.dueDate"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                  required
                                />

                                <span class="text-lg font-bold mt-4"
                                  >Requirement</span
                                >
                                <select
                                  v-model="newJob.requirement"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Requirement
                                  </option>
                                  <option value="Freshgraduate">
                                    Freshgraduate
                                  </option>
                                  <option value="Min. 1 - 2 Years">
                                    Min. 1 - 2 Years
                                  </option>
                                  <option value="Min. 3 - 5 Years">
                                    Min. 3 - 5 Years
                                  </option>
                                  <option value="Above 5 Years">
                                    Above 5 Years
                                  </option>
                                </select>

                                <span class="text-lg font-bold mt-4"
                                  >Job Type</span
                                >
                                <select
                                  v-model="newJob.type"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Job Type
                                  </option>
                                  <option value="Fulltime">Fulltime</option>
                                  <option value="Contract">Contract</option>
                                </select>

                                <span class="text-lg font-bold mt-4"
                                  >Salary</span
                                >
                                <select
                                  v-model="newJob.salary"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                <option disabled value="">
                                    Select Job Salary
                                  </option>
                                  <option value="Negotiable">
                                    Negotiable
                                  </option>
                                  <option value="Rp 3,000,000 - Rp 5,000,000">
                                    Rp 3,000,000 - Rp 5,000,000
                                  </option>
                                  <option value="Rp 5,000,000 - Rp 8,000,000">
                                    Rp 5,000,000 - Rp 8,000,000
                                  </option>
                                  <option value="Rp 8,000,000 - Rp 12,000,000">
                                    Rp 8,000,000 - Rp 10,000,000
                                  </option>
                                  <option value="Above Rp 10,000,000">
                                    Above Rp 10,000,000
                                  </option>
                                </select>

                                <span class="text-lg font-bold mt-4"
                                  >Location</span
                                >
                                <select
                                  v-model="newJob.location"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Job Location
                                  </option>
                                  <option value="Jakarta">Jakarta</option>
                                  <option value="Bogor">Bogor</option>
                                  <option value="Depok">Depok</option>
                                  <option value="Tanggerang">Tanggerang</option>
                                  <option value="Bekasi">Bekasi</option>
                                </select>

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
                          class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 max-h-[90vh] overflow-hidden"
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

                          <!-- Modal Body with scrollable content -->
                          <div class="modal-body overflow-y-auto max-h-[60vh]">
                            <form @submit.prevent="handleUpdateJob">
                              <div class="card-body">
                                <!-- Job ID (hidden) -->
                                <input
                                  v-bind:value="jobId"
                                  disabled
                                  class="w-full text-gray-400 border bg-gray-100 rounded px-3 py-2 mt-1 focus:outline-none cursor-not-allowed hidden"
                                />
                                <span class="text-lg font-bold">Title</span>
                                <input
                                  v-model="editJob.title"
                                  type="text"
                                  placeholder="Enter job title"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />

                                <span class="text-lg font-bold mt-4"
                                  >Description</span
                                >
                                <div>
                                  <QuillEditor
                                    v-model:content="editJob.description"
                                    content-type="html"
                                    type="text"
                                    placeholder="Description"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                  ></QuillEditor>
                                </div>

                                <span
                                  for="editDueDate"
                                  class="text-lg font-bold mt-4"
                                  >Due Date</span
                                >
                                <input
                                  type="date"
                                  id="editDueDate"
                                  v-model="editJob.formatedDueDate"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                  required
                                />
                                <span class="text-lg font-bold mt-4"
                                  >Requirement</span
                                >
                                <select
                                  v-model="editJob.requirement"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Requirement
                                  </option>
                                  <option value="Freshgraduate">
                                    Freshgraduate
                                  </option>
                                  <option value="Min. 1 - 2 Years">
                                    Min. 1 - 2 Years
                                  </option>
                                  <option value="Min. 3 - 5 Years">
                                    Min. 3 - 5 Years
                                  </option>
                                  <option value="Above 5 Years">
                                    Above 5 Years
                                  </option>
                                </select>

                                <span class="text-lg font-bold mt-4"
                                  >Job Type</span
                                >
                                <select
                                  v-model="editJob.type"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Job Type
                                  </option>
                                  <option value="Fulltime">Fulltime</option>
                                  <option value="Contract">Contract</option>
                                </select>

                                <span class="text-lg font-bold mt-4"
                                  >Salary</span
                                >
                                <select
                                  v-model="editJob.salary"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Job Salary
                                  </option>
                                  <option value="Negotiable">
                                    Negotiable
                                  </option>
                                  <option value="Rp 3,000,000 - Rp 5,000,000">
                                    Rp 3,000,000 - Rp 5,000,000
                                  </option>
                                  <option value="Rp 5,000,000 - Rp 8,000,000">
                                    Rp 5,000,000 - Rp 8,000,000
                                  </option>
                                  <option value="Rp 8,000,000 - Rp 12,000,000">
                                    Rp 8,000,000 - Rp 10,000,000
                                  </option>
                                  <option value="Above Rp 10,000,000">
                                    Above Rp 10,000,000
                                  </option>
                                </select>

                                <span class="text-lg font-bold mt-4"
                                  >Location</span
                                >
                                <select
                                  v-model="editJob.location"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                >
                                  <option disabled value="">
                                    Select Job Location
                                  </option>
                                  <option value="Jakarta">Jakarta</option>
                                  <option value="Bogor">Bogor</option>
                                  <option value="Depok">Depok</option>
                                  <option value="Tanggerang">Tanggerang</option>
                                  <option value="Bekasi">Bekasi</option>
                                </select>
                              </div>
                              <!-- Modal Footer with buttons -->
                              <div class="mt-6 flex justify-end space-x-4">
                                <button
                                  @click="editModal = false"
                                  class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                                >
                                  Close
                                </button>
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
                            class="menu dropdown-content text-gray-700 bg-white rounded-box z-[1] w-52 p-2 shadow border-none"
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
                        <select
                          v-model="perPage"
                          @change="updatePagination"
                          class="select select-bordered bg-white"
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
                    <div class="overflow-x-auto rounded-lg">
                      <table class="table bg-white text-black w-full">
                        <thead
                          class="text-white text-md text-center bg-primary"
                        >
                          <tr>
                            <th>No</th>
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
                            <td>
                              {{ index + 1 + (currentPage - 1) * pageSize }}
                            </td>
                            <td>{{ job.title }}</td>
                            <td v-html="job.description"></td>
                            <td>{{ job.salary }}</td>
                            <td>{{ job.type }}</td>
                            <td>{{ job.requirement }}</td>
                            <td>{{ job.location }}</td>
                            <td>
                              {{ totalApplications[job.jobId] || 0 }} Applicants
                            </td>
                            <td class="text-center">
                              <div class="flex justify-center items-center">
                                <button
                                  type="button"
                                  class="px-4 py-3 rounded-md hover:bg-yellow-400 bg-yellow-500 text-white border-none tooltip" data-tip="Edit"
                                  @click="openEditModal(job.jobId)"
                                >
                                  <i class="fas fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                  @click="
                                    deleteJobHandler(job.userId, job.jobId)
                                  "
                                  class="px-4 py-3 rounded-md hover:bg-red-400 bg-red-500 ml-2 text-white border-none tooltip" data-tip="Delete"
                                >
                                  <i class="fas fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div
                    class="pagination-container flex justify-end items-center mb-5 mr-3 space-x-4 p-4"
                  >
                    <!-- Pagination controls -->
                    <button
                      class="bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      :disabled="currentPage <= 1"
                      @click="changePage(currentPage - 1)"
                    >
                      <i class="fas fa-solid fa-angles-left"></i>
                    </button>
                    <span class="mx-2"
                      >Page {{ currentPage }} of {{ totalPages }}</span
                    >
                    <button
                      class="bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
  getJobsById,
  getAllData,
  deleteJob,
  addJob,
  updateJob,
  getAllAplication,
} from "../../../Services/Api/AdminService";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import Swal from "sweetalert2";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import moment from "moment";
import { uid } from "ckeditor5";
export default {
  components: {
    QuillEditor,
  },
  data() {
    return {
      currentPage: 1, // Pastikan halaman awal dimulai dari 1
      pageSize: 10, // Tentukan jumlah item per halaman
      paginatedJobs: [], // Data pekerjaan untuk halaman
    };
  },
  setup() {
    // State variables
    const showModal = ref(false);
    const selectedTitle = ref("");
    const searchQuery = ref("");
    const dataJobs = ref([]);
    const filteredJobs = ref([]);
    const perPage = ref(10);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const newJob = ref({});
    const newJobTitle = ref("");
    const newJobDescription = ref("");
    const newJobType = ref("");
    const newDueDate = ref("");
    const newJobSalary = ref("");
    const newJobLocation = ref("");
    const newJobRequirement = ref("");
    const newJobUserId = ref("");
    const id = ref("");
    const editModal = ref(false);
    const jobId = ref(null);
    // Data pekerjaan untuk diedit
    const editJob = ref({});
    const dueDate = ref("");
    const jobs = ref([]); // Asumsikan ini daftar pekerjaan
    const totalApplications = ref({}); // Data jumlah aplikasi per jobId

    // Fungsi mengambil semua aplikasi
    const fetchAllAplication = async () => {
      try {
        const response = await getAllAplication(); // Panggil API

        const applications = response.data; // Ambil array dari properti `data`

        if (!Array.isArray(applications)) {
          throw new Error(
            "Expected an array in the 'data' property but got something else"
          );
        }

        // Inisialisasi objek untuk menyimpan jumlah aplikasi berdasarkan jobId
        const applicationsByJobId = {};

        // Hitung jumlah aplikasi berdasarkan jobId
        applications.forEach((application) => {
          const jobId = application.jobId;
          applicationsByJobId[jobId] = (applicationsByJobId[jobId] || 0) + 1;
        });

        // Simpan hasil dalam totalApplications
        totalApplications.value = applicationsByJobId;
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    // Fungsi mengambil data pekerjaan
    const fetchJobDetail = async () => {
      try {
        const response = await getAllData(); // Ambil data pekerjaan
        dataJobs.value = response.data;
        filteredJobs.value = response.data; // Inisialisasi data yang difilter
        totalPages.value = Math.ceil(filteredJobs.value.length / perPage.value); // Hitung total halaman
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
      // const descriptionHTML = getInsertValues(newJobDescription.value);
      // const newJob = {
      //   Title: newJobTitle.value,
      //   Description: descriptionHTML,
      //   Requirement: newJobRequirement.value,
      //   Salary: newJobSalary.value,
      //   Type: newJobType.value,
      //   Location: newJobLocation.value,
      //   PostDate: new Date(),
      //   DueDate: newDueDate.value,
      //   uid: id.value,
      // };
      newJob.value.description = getInsertValues(newJobDescription.value);
      const newInsertedJob = {
        Title: newJob.value.title,
        Description: newJob.value.description,
        Requirement: newJob.value.requirement,
        Salary: newJob.value.salary,
        Type: newJob.value.type,
        Location: newJob.value.location,
        PostDate: new Date(),
        DueDate: newJob.value.dueDate,
        uid: id.value,
      };
      console.log("Job data to be added:", newInsertedJob);

      try {
        await addJob(newInsertedJob);
        await fetchJobDetail();
        showModal.value = false;
        console.log("Job successfully added!");
        newJob.value = {};
        newJobDescription.value = "";
      } catch (exception) {
        console.error("Error adding job:", exception);
      }
    };

    // Membuka modal edit
    const openEditModal = async (id) => {
      // Reset form state sebelum mengisi data baru

      jobId.value = id; // Menyimpan ID pekerjaan yang dipilih
      editModal.value = true; // Menampilkan modal edit

      try {
        const response = await getJobsById(id); // Mengambil data pekerjaan berdasarkan ID dan mengisinya di form modal
        editJob.value = response.data;
        editJob.value.formatedDueDate = moment(response.data.dueDate).format(
          "YYYY-MM-DD"
        );
        console.log(editJob.value.formatedDueDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Update
    const handleUpdateJob = async () => {
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

      // Data pekerjaan yang diperbarui
      // const editdescriptionHTML = getInsertValues(editJobDescription.value);
      const updatedJob = {
        jobId: jobId.value,
        title: editJob.value.title,
        description: editJob.value.description,
        requirement: editJob.value.requirement,
        type: editJob.value.type,
        salary: editJob.value.salary,
        location: editJob.value.location,
        dueDate: editJob.value.dueDate,
        userId: id.value,
      };

      // Validasi input
      if (
        !updatedJob.title ||
        !updatedJob.description ||
        !updatedJob.requirement ||
        !updatedJob.type ||
        !updatedJob.salary ||
        !updatedJob.location ||
        !updatedJob.userId
      ) {
        Swal.fire({
          icon: "error",
          title: "Input Error",
          text: "Please fill in all required fields.",
        });
        return;
      }

      // Panggil fungsi API
      try {
        console.log({
          id: jobId.value,
          updated: updatedJob,
          token: token,
        });
        const updatedData = await updateJob(jobId.value, updatedJob, token);

        // Perbarui data di state jobs
        const index = jobs.value.findIndex((job) => job.jobId === jobId.value);
        if (index !== -1) {
          jobs.value.splice(index, 1, updatedData);
        }
        await fetchJobDetail();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Job updated successfully.",
          showConfirmButton: false,
          timer: 1500,
        });

        editModal.value = false;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response?.data?.message ||
            "There was an error updating the job!",
        });
      }
    };

    // Hapus
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
          await deleteJob(userId, jobId);
          filteredJobs.value = filteredJobs.value.filter(
            (job) => job.jobId !== jobId
          ); // Remove job from list
          totalPages.value = Math.ceil(
            filteredJobs.value.length / perPage.value
          ); // Recalculate total pages
          await fetchJobDetail();
          Swal.fire("Deleted!", "Job has been deleted.", "success");
        } catch (error) {
          await fetchJobDetail();
          Swal.fire("Error", "There was an error deleting the job.", "error");
        }
      }
    };

    onMounted(() => {
      getUserId();
      fetchJobDetail();
      fetchAllAplication();
    });

    return {
      showModal,
      id,
      newJobUserId,
      newJobTitle,
      newJobDescription,
      newJobRequirement,
      newJobLocation,
      newJobSalary,
      newDueDate,
      newJobType,
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
      editModal,
      jobId,
      postDate: new Date().toISOString(),
      jobs,
      openEditModal,
      handleUpdateJob,
      editJob,
      newJob,
      dueDate,
      fetchJobDetail,
      fetchAllAplication,
      totalApplications,
    };
  },
};
</script>

<style>
.ql-editor {
  height: 15vh;
}
.pagination-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
}
</style>
