<template>
  <!-- Navbar -->
  <nav class="bg-slate-50 text-black p-4 border-b-2">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/">
        <img
          src="/src/assets/images/berCareer-logo.png"
          alt="Logo"
          class="h-10"
        />
      </router-link>

      <!-- Navbar Links -->
      <ul class="flex space-x-1 items-center px-7">
        <li class="relative group hidden md:block">
          <router-link
            to="/"
            class="px-4 py-2 text-gray-700 relative"
            :class="{ 'text-primary': $route.path === '/' }"
          >
            Home
            <!-- Garis bawah saat path URL cocok -->
            <div
              class="absolute left-0 right-0 bottom-0 h-1 bg-primary transition-transform duration-300"
              :class="{
                'scale-x-75': $route.path === '/',
                'scale-x-0': $route.path !== '/',
              }"
            ></div>
          </router-link>
        </li>
        <li v-if="!cekLogin">
          <router-link
            to="/login"
            class="bg-primary px-4 py-2 text-gray-100 hover:bg-primaryHover rounded-md"
          >
            Login
          </router-link>
        </li>
        <li v-if="cekLogin" class="relative group hidden md:block">
          <router-link
            to="/saveJobs"
            class="px-4 py-2 text-gray-700 relative"
            :class="{ 'text-primary': $route.path === '/saveJobs' }"
          >
            Save Jobs
            <div
              class="absolute left-0 right-0 bottom-0 h-1 bg-primary transition-transform duration-300"
              :class="{
                'scale-x-75': $route.path === '/saveJobs',
                'scale-x-0': $route.path !== '/saveJobs',
              }"
            ></div>
          </router-link>
        </li>
        <li v-if="cekLogin" class="relative group hidden md:block">
          <router-link
            to="/applied"
            class="px-4 py-2 text-gray-700 relative"
            :class="{ 'text-primary': $route.path === '/applied' }"
          >
            Applied
            <div
              class="absolute left-0 right-0 bottom-0 h-1 bg-primary transition-transform duration-300"
              :class="{
                'scale-x-75': $route.path === '/applied',
                'scale-x-0': $route.path !== '/applied',
              }"
            ></div>
          </router-link>
        </li>

        <!-- Profile Dropdown -->
        <li class="relative" v-if="cekLogin">
          <button
            @click="toggleDropdown"
            class="flex items-center text-black focus:outline-none"
            ref="dropdownButton"
          >
            <div v-if="avatar.startsWith('https') || avatar.startsWith('http')">
              <img
                :src="avatar"
                alt="Profile"
                class="w-10 h-10 rounded-full mr-2"
                referrerpolicy="no-referrer"
              />
            </div>
            <div v-else>
              <img
                src="https://storage.googleapis.com/a1aa/image/EAszZfc2DORhC69L8qU6XOAvuejiWJUqZVkwvRgeGteFQXfdC.jpg"
                alt="Profile"
                class="w-10 h-10 rounded-full mr-2"
              />
            </div>
            <span class="relative inline-block group">
              <span
                :class="[
                  'transition-all duration-300 color-primary text-slate-200 flex flex-col',
                  isDropdownVisible
                    ? 'font-semibold mb-0.5 bg-primary rounded-full px-2 py-1 text-white'
                    : 'text-slate-700 ',
                ]"
                class="font-semibold"
                >{{ username }}</span
              >
            </span>
            <i
              :class="{
                'fas fa-caret-left ml-2 transition-transform duration-300':
                  !isDropdownVisible,
                'fas fa-caret-left ml-2 transition-transform duration-300 -rotate-90':
                  isDropdownVisible,
              }"
            ></i>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-show="isDropdownVisible"
            class="absolute -right-10 md:-right-2 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 transition-all duration-300"
            :class="{ 'slide-down': isDropdownVisible }"
            ref="dropdownMenu"
          >
            <ul>
              <li class="block md:hidden">
                <router-link
                  to="/"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Menu</router-link
                >
              </li>
              <li>
                <router-link
                  to="Profile"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200 hover:rounded-t-md"
                  @click="closeDropdown"
                  >Profile</router-link
                >
              </li>
              <li class="block md:hidden">
                <router-link
                  to="/saveJobs"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Save Jobs</router-link
                >
              </li>
              <li class="block md:hidden">
                <router-link
                  to="/applied"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Applied</router-link
                >
              </li>
              <li>
                <router-link
                  to="/settings"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Settings</router-link
                >
              </li>
              <hr class="border border-gray-200" />
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
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import { getDataUser } from "../../../Services/Api/UserService";
import { useRouter } from "vue-router";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  setup() {
    const cekLogin = ref(localStorage.getItem("authToken") ? true : false);
    const isDropdownVisible = ref(false);
    const username = ref("");
    const avatar = ref("");
    const id = ref("");
    const router = useRouter();
    const auth0 = useAuth0();

    // ref untuk dropdown dan tombol dropdown
    const dropdownMenu = ref(null);
    const dropdownButton = ref(null);

    // Method untuk logout
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
          auth0.logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
          localStorage.removeItem("authToken");
          cekLogin.value = false;
          // Redirect ke halaman login
          router.push("/login");
        }
      });
    };

    // Method untuk toggle visibility dropdown
    const toggleDropdown = () => {
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    // Method untuk menutup dropdown
    const closeDropdown = () => {
      isDropdownVisible.value = false;
    };

    // Method untuk menangani klik di luar dropdown
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
    const fetchDataUser = async () => {
      try {
        const userId = id.value;
        if (!userId) {
          console.log(id.value);
          console.error("User ID is missing");
          return;
        }
        const response = await getDataUser(userId); // Memanggil API untuk mendapatkan data user
        console.log(response);

        if (response && response.data && response.data.fullName) {
          // Ambil kata pertama dari fullName
          username.value = response.data.fullName.split(" ")[0];
          avatar.value = response.data.profileImage;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };
    onMounted(async () => {
      if (cekLogin.value) {
        // Pastikan ini memeriksa nilai reaktif .value
        await getUserId();
        fetchDataUser();
      }

      document.addEventListener("click", handleOutsideClick);

      window.addEventListener("storage", () => {
        cekLogin.value = localStorage.getItem("authToken") ? true : false;
      });
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    return {
      cekLogin,
      isDropdownVisible,
      username,
      logout,
      toggleDropdown,
      closeDropdown,
      dropdownMenu,
      dropdownButton,
      handleOutsideClick,
      avatar,
    };
  },
};
</script>

<style scoped>
.slide-down {
  opacity: 0;
  transform: translateY(-10px); /* Start slightly above */
  animation: slideDown 0.5s forwards;
}

@keyframes slideDown {
  to {
    opacity: 1;
    transform: translateY(0); /* End at original position */
  }
}
</style>
