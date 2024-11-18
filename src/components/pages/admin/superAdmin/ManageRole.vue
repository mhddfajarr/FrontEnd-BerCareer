<template>
  <div class="content-wrapper" :key="componentKey">
    <div class="breadcrumbs text-sm mb-4">
      <ul>
        <li><a>Dashboard</a></li>
        <li><a>Manage Role Portal</a></li>
      </ul>
    </div>
    <h1 class="text-3xl font-bold text-primary mb-2">Manage Role Portal</h1>

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
                            <form id="quickForm">
                              <div class="card-body">
                                <h4 class="text-lg font-bold mb-2">Title</h4>
                                <input
                                  v-model="newJobTitle"
                                  type="text"
                                  placeholder="Enter job title"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">
                                  Description
                                </h4>
                                <div>
                                  <QuillEditor
                                    v-model:content="newJobDescription"
                                    type="text"
                                    placeholder="Enter job description"
                                    class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                  ></QuillEditor>
                                </div>
                                <h4 class="text-lg font-bold mb-2">
                                  Requirement
                                </h4>
                                <input
                                  v-model="newJobRequirement"
                                  type="text"
                                  placeholder="Enter job requirement"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">Job Type</h4>
                                <input
                                  v-model="newJobType"
                                  type="text"
                                  placeholder="Enter job type (e.g., Full-time)"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">Salary</h4>
                                <input
                                  v-model="newJobSalary"
                                  type="text"
                                  placeholder="Enter salary"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                                <h4 class="text-lg font-bold mb-2">Location</h4>
                                <input
                                  v-model="newJobLocation"
                                  type="text"
                                  placeholder="Enter location"
                                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                                />
                              </div>
                            </form>
                          </div>
                          <!-- Modal Footer -->
                          <div class="mt-6 flex justify-end space-x-4">
                            <button
                              @click="editModal = false"
                              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                            >
                              Close
                            </button>
                            <button
                              class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
                            >
                              Save Changes
                            </button>
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
                            <li @click="filterRolesByName('All')">
                              <a>All</a>
                            </li>
                            <li
                              v-for="(role, index) in dataRoles"
                              :key="role.userId"
                              @click="filterRolesByName(role.roleName)"
                            >
                              <a>{{ role.roleName }}</a>
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
                            <th @click="sortTable('userName')">Name</th>
                            <th @click="sortTable('userEmail')">Email</th>
                            <th @click="sortTable('roleName')">Role Name</th>
                          </tr>
                        </thead>
                        <tbody class="text-center">
                          <tr
                            v-for="(role, index) in paginatedRoles"
                            :key="role.userId"
                          >
                            <td><input type="checkbox" class="checkbox" /></td>
                            <td>{{ role.userName }}</td>
                            <td>{{ role.userEmail }}</td>
                            <td>
                              <select
                                @click.stop
                                v-model="role.roleName"
                                @change="updateRole($event, role.userId)"
                              >
                                <option disabled>
                                  {{ role.roleName }}
                                </option>
                                <option
                                  v-for="(
                                    roleOption, index
                                  ) in dataRolesOptions"
                                  :key="index"
                                  :value="roleOption.roleId"
                                >
                                  {{ roleOption.roleName }}
                                </option>
                              </select>
                            </td>
                            <td class="text-center">
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
  getRoleDetails,
  getRoles,
  changeRole,
} from "../../../../Services/Api/AdminService"; // Import API functions
import Swal from "sweetalert2";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  components: {
    QuillEditor,
  },
  setup() {
    // State variables
    const showModal = ref(false);
    const editModal = ref(false);
    const selectedName = ref("");
    const searchQuery = ref("");
    const dataRoles = ref([]);
    const dataRolesOptions = ref([]);
    const filteredRoles = ref([]);
    const perPage = ref(10); // Default number of roles per page
    const currentPage = ref(1); // Default to first page
    const totalPages = ref(1); // For pagination calculation

    const fetchRoleDetail = async () => {
      try {
        const response = await getRoleDetails();
        const roles = await getRoles();
        dataRoles.value = response.data;
        dataRolesOptions.value = roles.data;
        filteredRoles.value = response.data;
        totalPages.value = Math.ceil(
          filteredRoles.value.length / perPage.value
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Calculate paginated roles based on current page and items per page
    const paginatedRoles = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      const end = start + perPage.value;
      return filteredRoles.value.slice(start, end);
    });

    const sortTable = (column) => {
      const sortedRole = [...filteredRoles.value].sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
      filteredRoles.value = sortedRole;
    };

    // Handle filtering by role name
    const filterRolesByName = (name) => {
      selectedName.value = name;
      searchQuery.value = ""; // Reset search query when filtering by title

      let uniqueRoles = new Set();
      let filtered = [];

      if (name === "All") {
        filtered = dataRoles.value.filter((role) => {
          if (!uniqueRoles.has(role.roleName)) {
            uniqueRoles.add(role.roleName);
            return true;
          }
          return false;
        });
      } else {
        filtered = dataRoles.value.filter((role) => {
          if (role.roleName === name && !uniqueRoles.has(role.roleName)) {
            uniqueRoles.add(role.roleName);
            return true;
          }
          return false;
        });
      }

      filteredRoles.value = filtered;
      totalPages.value = Math.ceil(filteredRoles.value.length / perPage.value); // Recalculate total pages
    };

    // Handle page change
    const changePage = (page) => {
      if (page < 1 || page > totalPages.value) return;
      currentPage.value = page;
    };

    // Update pagination when items per page changes
    const updatePagination = () => {
      currentPage.value = 1; // Reset to first page when items per page is changed
      totalPages.value = Math.ceil(filteredRoles.value.length / perPage.value); // Recalculate total pages
    };

    // Fetch role details when component is mounted
    onMounted(() => {
      fetchRoleDetail();
    });

    return {
      showModal,
      editModal,
      selectedName,
      searchQuery,
      dataRoles,
      dataRolesOptions,
      filteredRoles,
      perPage,
      currentPage,
      totalPages,
      paginatedRoles,
      sortTable,
      filterRolesByName,
      changePage,
      updatePagination,
    };
  },
  methods: {
    updateRole(e, id) {
      const roleId = e.target.value;
      const userId = id;
      const roleData = {
        userId: userId,
        roleId: roleId,
      };
      changeRole(roleData).then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style scoped>
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
</style>
