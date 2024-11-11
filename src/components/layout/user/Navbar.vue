<template>
  <!-- Navbar -->
  <nav class="bg-slate-50 text-black p-4 border-b-2">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" >
        <img
          src="/src/assets/images/berCareer-logo.png"
          alt="Logo"
          class="h-10"
        />
      </router-link>

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
              class="w-10 h-10 rounded-full mr-2"
            />
            <span class="relative inline-block group">
              <span :class="[
      'transition-all duration-300 color-primary text-slate-200 flex flex-col',
      isDropdownVisible ? 'font-semibold mb-0.5 bg-primary rounded-full px-2 py-1 text-white' : 'text-slate-700 ',
    ]" 
              class="">{{ username }}</span>
            </span>
            <i
  :class="{
    'fas fa-caret-left ml-2 transition-transform duration-300': !isDropdownVisible,
    'fas fa-caret-left ml-2 transition-transform duration-300 -rotate-90': isDropdownVisible
  }"
></i>
          </button>

          <!-- Dropdown Menu -->
          <div
      v-show="isDropdownVisible"
      class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 transition-all duration-300"
      :class="{ 'slide-down': isDropdownVisible }"
      ref="dropdownMenu"
    >
            <ul>
              <li>
                <router-link
                  to="Profile"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Profile</router-link
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Save Jobs</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
                  >Settings</a
                >
              </li>
              <hr class="border border-gray-200" />
              <li>
                <router-link
                  to="login"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  @click="closeDropdown"
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
    closeDropdown() {
      // Close dropdown when a sub-menu item is clicked
      this.isDropdownVisible = false;
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

