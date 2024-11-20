<template>
  <div class="content-wrapper">
    <!-- Breadcrumb -->
    <div class="bg-gray-200 p-4 mb-4 flex justify-end rounded-lg">
      <nav class="text-mint-700">
        <router-link to="/ManageRole" class="hover:underline"
          >Manage Role Portal</router-link
        >
      </nav>
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
                      <div
                        class="flex justify-end items-center w-full space-x-2 bg-white"
                      >
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
                              v-for="(role, index) in uniqueRoles"
                              :key="index"
                              @click="filterRolesByName(role)"
                            >
                              <a>{{ role }}</a>
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
                            <th @click="sortTable('userName')">Name</th>
                            <th @click="sortTable('userEmail')">Email</th>
                            <th @click="sortTable('roleName')">Role</th>
                          </tr>
                        </thead>
                        <tbody class="text-center">
                          <tr
                            v-for="(role, index) in filteredAdminRoles"
                            :key="role.userId"
                          >
                            <td>
                              {{ index + 1 + (currentPage - 1) * perPage }}
                            </td>
                            <td>{{ role.userName }}</td>
                            <td>{{ role.userEmail }}</td>
                            <td>
                              <select
                                @click.stop
                                v-model="role.roleName"
                                @change="updateRole($event, role.userId)"
                                class="select select-bordered w-full max-w-xs"
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
    const perPage = ref(10);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const token = localStorage.getItem("authToken");

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

    const uniqueRoles = computed(() => {
      const roleNames = dataRoles.value
        .map((role) => role.roleName)
        .filter((roleName) => roleName !== "Super Admin");
      // roleNames.value.filter((role) => role.roleName !== "Super Admin");
      return [...new Set(roleNames)];
    });

    const filteredAdminRoles = computed(() => {
      return paginatedRoles.value.filter(
        (role) => role.roleName !== "Super Admin"
      );
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

      let filtered = [];

      if (name === "All") {
        filtered = dataRoles.value;
      } else {
        filtered = dataRoles.value.filter((role) => role.roleName === name);
      }

      filteredRoles.value = filtered;
      totalPages.value = Math.ceil(filteredRoles.value.length / perPage.value); // Recalculate total pages
    };

    // Handle search filtering
    const filterBySearch = () => {
      const query = searchQuery.value.toLowerCase();
      filteredRoles.value = dataRoles.value.filter(
        (role) =>
          role.roleName.toLowerCase().includes(query) ||
          role.userName.toLowerCase().includes(query) ||
          role.userEmail.toLowerCase().includes(query)
      );
      totalPages.value = Math.ceil(filteredRoles.value.length / perPage.value); // Recalculate total pages after search
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
      filteredAdminRoles,
      filterBySearch,
      uniqueRoles,
      fetchRoleDetail,
      token,
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
      Swal.fire({
        title: "Are you sure you want to update the user role?",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonText: "Update",
        confirmButtonColor: "#0a4d80",
        cancelButtonColor: "#d33",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (!this.token) {
              Swal.fire({
                icon: "error",
                title: "Authentication Error",
                text: "Please log in again.",
              });
              throw error;
            }
            await changeRole(roleData);
            this.fetchRoleDetail();
            Swal.fire({
              title: "Success !",
              icon: "success",
              text: "Role updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.error("Error updating role:", error);
          }
        }
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
