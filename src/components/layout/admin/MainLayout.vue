<template>
  <div class="flex min-h-screen">
    <Sidebar :isSidebarVisible="isSidebarVisible" :Role="role" />
    <div
      :class="isSidebarVisible ? 'flex-1 max-w-[calc(100%-15rem)]' : 'w-full'"
      class="transition-all duration-300 flex flex-col"
    >
      <Navbar @toggleSidebar="toggleSidebar" :Name="name" />
      <main class="flex-1 p-4 color-main-content overflow-x-auto">
        <RouterView />
      </main>
      <footer
        class="footer footer-center text-base-content p-5 bg-white shadow-xl"
      >
        <aside>
          <p class="text-primary">Copyright © 2024 - RAS Bercareer</p>
        </aside>
      </footer>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Swal from "sweetalert2";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import { getDataUser } from "../../../Services/Api/UserService";

export default {
  components: {
    Sidebar,
    Navbar,
  },
  setup() {
    const router = useRouter();
    const isSidebarVisible = ref(true); // Make the sidebar visibility reactive
    const token = localStorage.getItem("authToken");
    const name = ref(null);
    const role = ref(null);

    const toggleSidebar = () => {
      isSidebarVisible.value = !isSidebarVisible.value; // Toggle the sidebar visibility
    };

    const logout = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out!",
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          router.push({ name: "Login" });
          Swal.fire(
            "Logged Out!",
            "You have been logged out successfully.",
            "success"
          );
        }
      });
    };
    const fetchDataUser = async (id) => {
      try {
        // console.log(id);
        // const userId = id.value;
        if (!id) {
          // console.log(id);
          console.error("User ID is missing");
          return;
        }
        const response = await getDataUser(id); // Memanggil API untuk mendapatkan data user

        if (response && response.data && response.data.fullName) {
          // Ambil kata pertama dari fullName
          name.value = response.data.fullName.split(" ")[0];
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    onMounted(async () => {
      var decodedToken = await decodeToken();
      role.value = decodedToken.role;
      if (role.value == "User") {
        router.push({ name: "Home" });
      }
      await fetchDataUser(decodedToken.uid);
      // console.log(name.value);
      // console.log(decodedToken);
    });

    return {
      isSidebarVisible,
      toggleSidebar,
      logout,
      token,
      name,
      role,
    };
  },
};
</script>

<style>
.color-main-content {
  background-color: #ededed;
}
</style>
