<template>
  <!-- Navbar -->
  <nav class="bg-slate-50 text-black p-4 border-b-2">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" ><img
        src="/src/assets/images/berCareer-logo.png"
        alt="Logo"
        class="h-10"
      /></router-link>

      <!-- Navbar Links -->
      <ul class="flex space-x-4 items-center">
        <!-- Login Button (placed next to profile) -->
        <li>
          <router-link
            to="login"
            class="bg-primary px-4 py-2 text-gray-100 hover:bg-primaryHover rounded-md"
          >
            Login
          </router-link>
        </li>

        <!-- Profile Dropdown -->
        <li class="relative">
          <!-- Dropdown Trigger (Profile Icon) -->
          <button
            @click="toggleDropdown"
            class="flex items-center text-black focus:outline-none"
            ref="dropdownButton"
          >
            <img
              src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg"
              alt="Profile"
              class="w-8 h-8 rounded-full mr-2"
            />
            <span class="relative inline-block group">
              <span class="font-semibold mb-0.5">{{ username }}</span>
              <span
                class="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-200 ease-in-out"
              ></span>
            </span>
            <i class="fas fa-caret-down ml-2"></i>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-show="isDropdownVisible"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
            ref="dropdownMenu"
          >
            <ul>
              <li>
                <router-link
                  to="Profile"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >Profile</router-link
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >Save Jobs</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >Settings</a
                >
              </li>
              <hr class="border border-gray-200" />
              <li>
                <router-link
                  to="login"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >Logout</router-link
                >
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      isDropdownVisible: false,
      username: "Username", // Dynamic username if needed
    };
  },
  methods: {
    toggleDropdown() {
      // Toggle the dropdown visibility on click
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleOutsideClick(event) {
      const dropdown = this.$refs.dropdownMenu;
      const button = this.$refs.dropdownButton;

      // Close dropdown if the click is outside the button or dropdown
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        button &&
        !button.contains(event.target)
      ) {
        this.isDropdownVisible = false;
      }
    },
  },
  mounted() {
    // Add event listener for clicks outside the dropdown
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeDestroy() {
    // Remove event listener when the component is destroyed
    document.removeEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
/* Optional styling if needed */
</style>
