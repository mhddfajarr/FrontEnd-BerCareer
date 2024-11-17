<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <!-- Title and Toggle Section -->
      <div class="flex items-center mb-2 cursor-pointer" @click="toggleShow">
        <span class="mr-2">
          <i
            :class="showItems ? 'fas fa-chevron-down text-gray-700' : 'fas fa-chevron-right text-gray-700'"
          ></i>
        </span>
        <h1 class="text-xl font-bold text-black">License and Certificate</h1>
      </div>
  
      <!-- Divider Line -->
      <div class="mt-4 bg-gray-700 h-px mb-4"></div>

      <!-- Section for Certificates (conditionally shown) -->
      <div v-if="showItems" class="mt-6">
        <!-- Hardcoded list of certificates, you can replace with dynamic data -->
        <div class="flex flex-col space-y-6">
          <div v-for="certificate in certificates" :key="certificate.id" class="relative">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-3 h-3 bg-primary rounded-full mt-2"></div>
                <div class="w-1 bg-blue-500 h-full ml-1"></div>
              </div>
              <div class="ml-4 flex-1">
                <div class="flex justify-between items-center">
                  <div>
                    <h2 class="text-lg font-semibold text-gray-700">{{ certificate.name }}</h2>
                    <p class="text-gray-700 text-md">{{ certificate.institution }}</p>
                    <p class="text-gray-500 italic">{{ certificate.dateIssued }}</p>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="text-gray-700">{{ certificate.description }}</p>
                </div>
              </div>
            </div>
            <div class="mt-5 bg-gray-200 h-px"></div>
          </div>
        </div>
      </div>
      <!-- Add Education Button and Modal -->
      <div class="flex justify-center mt-4">
        <button
          @click="showModalCertificate = true"
          class="text-primaryHover hover:text-white hover:rounded-md hover:bg-primary px-3 py-2 font-semibold flex items-center justify-center transition-all duration-250 ease-in-out"
        >
          <i class="fas fa-plus-circle mr-2"></i>
          Add Education
        </button>
        <!-- ModalAddCertificate component -->
        <ModalAddCertificate
          v-if="showModalCertificate"
          :showModal="showModalCertificate"
          @close="closeModal"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import ModalAddCertificate from './ModalAddCertificate.vue'; // Ensure the path to ModalAddCertificate is correct
  
  export default {
    name: 'CertificateSection',
    components: {
      ModalAddCertificate
    },
    setup() {
      const showItems = ref(true); // Controls the toggle for displaying certificates
      const showModalCertificate = ref(false); // Controls the modal visibility
  
      // Static hardcoded data for certificates
      const certificates = ref([
        {
          id: 1,
          name: 'Web Development Certification',
          institution: 'FreeCodeCamp',
          dateIssued: 'January 2022',
          description: 'A comprehensive certificate in full-stack web development.'
        },
        {
          id: 2,
          name: 'Data Science Professional Certificate',
          institution: 'Coursera',
          dateIssued: 'March 2021',
          description: 'Certificate in data science, machine learning, and AI.'
        }
      ]);
  
      // Toggles the visibility of certificates
      const toggleShow = () => {
        showItems.value = !showItems.value;
      };
  
      // Closes the modal
      const closeModal = () => {
        showModalCertificate.value = false;
      };
  
      return {
        showModalCertificate,
        closeModal,
        showItems,
        toggleShow,
        certificates
      };
    }
  };
  </script>

  