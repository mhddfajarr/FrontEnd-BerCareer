<template>
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <!-- Modal Container -->
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-xl font-semibold text-gray-700">Edit Card Profile</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
  
        <!-- Modal Body (Form) -->
        <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-2">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <div class="relative">
                <!-- Gambar preview di atas input, rata tengah -->
                <span v-if="imagePreview" class="text-gray-700 font-semibold">Preview</span>
  
                <!-- Gambar preview dengan ikon X untuk menghapus -->
                <div v-if="imagePreview" class="relative">
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="mt-2 w-36 h-36 object-cover rounded-full mx-auto mb-4"
                  />
                  <!-- Ikon X untuk menghapus gambar -->
                  <button
                    @click="removeImage"
                    class="absolute -top-4 right-7 bg-red-600 rounded-full p-1 shadow-md hover:bg-red-700 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-white font-semibold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
  
              <div class="flex flex-col items-center" @dragover.prevent="handleDragOver"
                  @dragleave="handleDragLeave"
                  @drop.prevent="handleDrop">
                <!-- Label dan area untuk drag & drop -->
                <label
                v-if="!imagePreview"
                  for="skill"
                  class="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all duration-300"
                  
                >
                  <input
                    type="file"
                    id="skill"
                    accept="image/*"
                    class="hidden"
                    @change="previewImage"
                  />
                  <div
                    class="flex flex-col items-center justify-center text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-12 w-12 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 16.5V21h18v-4.5M3 8.5V3h18v5.5M3 12h18M3 12h18M3 12h18M3 12h18"
                      />
                    </svg>
                    <span class="font-semibold">Upload to Change Profile Picture</span>
                    <span class="text-sm">Drag & drop or click to select</span>
                  </div>
                </label>
              </div>
            </div>
  
            <div class="max-w-md mx-auto">
              <h2 class="text-lg text-gray-700 font-semibold mb-4">Social accounts</h2>
              <div class="flex items-center mb-4">
                <i class="fas fa-link text-gray-500 mr-2"></i>
                <input
                  type="text"
                  placeholder="Link to personal website"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                />
              </div>
              <div class="flex items-center">
                <i class="fas fa-link text-gray-500 mr-2"></i>
                <input
                  type="text"
                  placeholder="Link to github"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                />
              </div>
            </div>
          </form>
        </div>
  
        <!-- Modal Footer -->
        <div class="flex justify-end space-x-4 mt-5">
          <button
            @click="closeModal"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
          >
            Close
          </button>
          <button
            @click="submitForm"
            class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </template>
  

  <script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        imagePreview: null,
      };
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
      submitForm() {
        console.log("Form submitted");
      },
      previewImage(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreview = reader.result;
          };
          reader.readAsDataURL(file);
        }
      },
      handleDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.add("border-primary");
      },
      handleDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        event.target.classList.remove("border-primary");
      },
      handleDrop(event) {
        event.preventDefault();
        event.stopPropagation();
  
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          this.previewImage({ target: { files: [file] } });
        }
      },
      removeImage() {
        this.imagePreview = null; // Reset preview image
      },
    },
  };
  </script>
  

<style scoped>
/* Optional custom styling */
</style>
