<template>
  <div class="flex min-h-screen">
    <Sidebar :isSidebarVisible="isSidebarVisible" />
    <div
      :class="isSidebarVisible ? 'flex-1 max-w-[calc(100%-15rem)]' : 'w-full'"
      class="transition-all duration-300 flex flex-col"
    >
      <Navbar @toggleSidebar="toggleSidebar" />
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import Swal from "sweetalert2";

export default {
  components: {
    Sidebar,
    Navbar,
  },
  setup() {
    const router = useRouter();
    const isSidebarVisible = ref(true); // Make the sidebar visibility reactive

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

    return {
      isSidebarVisible,
      toggleSidebar,
      logout,
    };
  }
};
</script>


<style>
.color-main-content {
  background-color: #ededed;
}
</style>
