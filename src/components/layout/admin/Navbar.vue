<template>
  <nav
    class="navbar bg-white flex items-center justify-between border-b border-gray-300 shadow-xl"
  >
    <div class="flex-none">
      <button
        @click="$emit('toggleSidebar')"
        class="btn btn-square btn-ghost text-slate-600"
      >
        <i class="fas fa-bars text-lg"></i>
      </button>
    </div>
    <div class="flex-none gap-2">
      <div>
        <p class="font-semibold text-black">{{ Name }}</p>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              :src="getAvatarUrl(Role)"
              alt="Profile"
              class="w-10 h-10 rounded-full mr-2"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <!-- <li>
            <RouterLink
              to="#"
              class="w-full flex items-center"
              data-toggle="modal"
              data-target="#modal-default"
              data-tooltip="tooltip"
              data-placement="top"
              @click="passwordModal = true"
            >
              <a class="justify-between"> Settings </a>
            </RouterLink>
          </li> -->
          <li>
            <button
              class="block text-left w-full px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-b-md"
              @click="logout"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div
        v-if="passwordModal"
        class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
      >
        <!-- Modal Container -->
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
          <!-- Modal Header -->
          <div class="flex justify-between items-center border-b pb-3">
            <h3 class="text-xl font-semibold">Settings</h3>
            <button
              @click="passwordModal = false"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <!-- Modal Body -->
          <div class="modal-body">
            <form id="quickForm">
              <div class="card-body">
                <h4 class="text-lg font-bold mb-2">Name</h4>
                <input
                  v-model="newUniversityName"
                  type="text"
                  placeholder=""
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                />
                <h4 class="text-lg font-bold mb-2">Old Password</h4>
                <input
                  v-model="newUniversityName"
                  type="text"
                  placeholder="Old Password"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                />
                <h4 class="text-lg font-bold mb-2">New Password</h4>
                <input
                  v-model="newUniversityName"
                  type="text"
                  placeholder="New Password"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                />
                <h4 class="text-lg font-bold mb-2">Repeat New Password</h4>
                <input
                  v-model="newUniversityName"
                  type="text"
                  placeholder="Repeat New Password"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                />
              </div>
            </form>
          </div>
          <!-- Modal Footer -->
          <div class="mt-6 flex justify-end space-x-4">
            <button
              @click="passwordModal = false"
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
    </div>
  </nav>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { getDataUser } from "../../../Services/Api/UserService";
import { decodeToken } from "../../../Services/JWT/JwtDecode";

export default {
  props: ["Name", "Avatar", "Role"],
  setup(props) {
    const passwordModal = ref(false);
    const cekLogin = ref(localStorage.getItem("authToken") ? true : false);
    const isDropdownVisible = ref(false);
    const username = ref("Username");
    // const avatar = ref(null);
    const id = ref(null);
    const router = useRouter();
    const dropdownMenu = ref(null);
    const dropdownButton = ref(null);

    // console.log(props.Avatar);

    const logout = () => {
      Swal.fire({
        title: "Are you sure you want to logout?",
        text: "You will be logged out of the application.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "No, stay logged in",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("authToken");
          localStorage.setItem("logoutNotif", "true");
          cekLogin.value = false;
          router.push("/");
        }
      });
    };

    const getAvatarUrl = (role) => {
      // console.log(role);
      const defaultAvatarUrl = ref(
        "https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png"
      );
      if (role == "Super Admin") {
        defaultAvatarUrl.value =
          "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Clipart.png";
      }
      return defaultAvatarUrl.value;
    };

    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    const closeDropdown = () => {
      isDropdownVisible.value = false;
    };

    const handleOutsideClick = (event) => {
      if (
        dropdownMenu.value &&
        !dropdownMenu.value.contains(event.target) &&
        dropdownButton.value &&
        !dropdownButton.value.contains(event.target)
      ) {
        isDropdownVisible.value = false;
      }
    };

    watch(cekLogin, (newValue) => {
      if (newValue) {
        localStorage.setItem("authToken", localStorage.getItem("authToken"));
      } else {
        localStorage.removeItem("authToken");
      }
    });

    onMounted(() => {
      // getUser();
      // fetchDataUser();
      document.addEventListener("click", handleOutsideClick);

      window.addEventListener("storage", () => {
        cekLogin.value = localStorage.getItem("authToken") ? true : false;
      });
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    return {
      dropdownMenu,
      dropdownButton,
      passwordModal,
      cekLogin,
      isDropdownVisible,
      username,
      logout,
      getAvatarUrl,
      toggleDropdown,
      closeDropdown,
      handleOutsideClick,
      router,
      id,
    };
  },
};
</script>
