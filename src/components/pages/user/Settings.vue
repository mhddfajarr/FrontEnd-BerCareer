<template>
    <div class="p-6 flex justify-center w-full md:w-2/3 mx-auto">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-full mx-auto">
        <h2 class="text-2xl font-bold text-left text-gray-700 mb-6">Change Password</h2>
  
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <!-- Old Password -->
          <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label for="oldPassword" class="w-full sm:w-1/3 text-sm font-semibold text-gray-600 mb-2 sm:mb-0">Old Password</label>
            <input
              v-bind:type="showPassword ? 'text' : 'password'"
              id="oldPassword"
              v-model="oldPassword"
              class="w-full sm:w-2/3 px-4 py-2 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryHover focus:border-transparent"
              placeholder="Enter your old password"
              required
            />
          </div>
  
          <!-- New Password -->
          <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label for="newPassword" class="w-full sm:w-1/3 text-sm font-semibold text-gray-600 mb-2 sm:mb-0">New Password</label>
            <input
              v-bind:type="showPassword ? 'text' : 'password'"
              id="newPassword"
              v-model="newPassword"
              class="w-full sm:w-2/3 px-4 py-2 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryHover focus:border-transparent"
              placeholder="Enter your new password"
              required
            />
          </div>
  
          <!-- Repeat Password -->
          <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label for="repeatPassword" class="w-full sm:w-1/3 text-sm font-semibold text-gray-600 mb-2 sm:mb-0">Repeat Password</label>
            <input
              v-bind:type="showPassword ? 'text' : 'password'"
              id="repeatPassword"
              v-model="repeatPassword"
              class="w-full sm:w-2/3 px-4 py-2 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryHover focus:border-transparent"
              placeholder="Repeat your new password"
              required
            />
          </div>
  
          <!-- Show Password Checkbox -->
          <div class="mb-4 flex items-center justify-start sm:justify-end">
            <input
              type="checkbox"
              id="showPassword"
              v-model="showPassword"
              class="mr-2"
            />
            <label for="showPassword" class="text-sm font-semibold text-gray-600">Show Password</label>
          </div>
  
          <!-- Submit Button -->
          <div class="flex justify-center mb-4">
            <button
              type="submit"
              class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  

<script>
export default {
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      showPassword: false, // This controls whether the passwords are visible
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        repeatPassword: this.repeatPassword,
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>