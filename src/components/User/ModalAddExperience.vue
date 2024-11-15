<template>
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <!-- Modal Container -->
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-xl font-semibold text-gray-700">Add Experience</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
  
        <!-- Modal Body (Form) -->
        <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-5">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="position" class="block text-gray-700 font-semibold text-left">Position</label>
              <input
                type="text"
                id="position"
                v-model="formData.position"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="mb-4">
              <label for="companyName" class="block text-gray-700  font-semibold text-left">Company Name</label>
              <input
                type="text"
                id="companyName"
                v-model="formData.companyName"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="mb-4">
              <label for="jobType" class="block text-gray-700 font-semibold text-left">Job Type</label>
              <input
                type="text"
                id="jobType"
                v-model="formData.jobType"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
              <div class="w-full md:flex-1">
                <label for="startDate" class="block text-gray-700 font-semibold text-left">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  v-model="formData.startDate"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                  required
                />
              </div>
              <div class="w-full md:flex-1">
                <label for="endDate" class="block text-gray-700 font-semibold text-left">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  v-model="formData.endDate"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="description" class="block text-gray-700 font-semibold text-left">Description</label>
              <textarea
                id="description"
                v-model="formData.description"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                rows="4"
                required
              ></textarea>
            </div>
          </form>
        </div>
  
        <!-- Modal Footer -->
        <div class="flex justify-end space-x-4">
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">Close</button>
          <button @click="submitForm" class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true,
      },
    },
    setup(props, { emit }) {
      // Ref for form data
      const formData = ref({
        position: '',
        companyName: '',
        jobType: '',
        startDate: '',
        endDate: '',
        description: '',
      });
  
      // Method to close the modal
      const closeModal = () => {
        emit('close');
      };
  
      // Method to submit the form
      const submitForm = () => {
        // Emit form data for parent handling
        console.log('Experience form submitted', formData.value);
        // Optionally, you can emit data to the parent component
        // emit('submit', formData.value);
      };
  
      return {
        formData,
        closeModal,
        submitForm,
      };
    },
  };
  </script>
  
  
  <style scoped>
  /* Optional custom styling */
  </style>
  