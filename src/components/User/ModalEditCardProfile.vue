<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
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
              <span v-if="imagePreview" class="text-gray-700 font-semibold"
                >Preview</span
              >

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
                  @mouseenter="isHovered = true"
                  @mouseleave="isHovered = false"
                  class="absolute -top-4 right-10 bg-red-600 rounded-full p-1 shadow-md hover:bg-red-700 transition-all"
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

                <!-- Tooltip -->
                <div
                  v-if="isHovered"
                  class="absolute top-5 right-2 bg-gray-700 text-white text-xs rounded p-2 z-10"
                >
                  Remove Image
                </div>
              </div>
            </div>

            <div
              class="flex flex-col items-center"
              @dragover.prevent="handleDragOver"
              @dragleave="handleDragLeave"
              @drop.prevent="handleDrop"
            >
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
                  <span class="font-semibold"
                    >Upload to Change Profile Picture</span
                  >
                  <span class="text-sm">Drag & drop or click to select</span>
                </div>
              </label>
              <p v-if="errorImage" class="text-red-500 text-xs mt-2 ml-1">
                {{ errorImage }}
              </p>
            </div>
          </div>

          <div class="w-full mx-auto">
            <h2 class="text-lg text-gray-700 font-semibold mb-4">
              Social accounts
            </h2>
            <div class="flex items-center mb-4">
              <i class="fas fa-globe text-gray-500 mr-2"></i>
              <input
                type="text"
                v-model="linkPersonalWebsite"
                placeholder="Link to personal website"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              />
            </div>
            <div class="flex items-center mb-4">
              <i class="fab fa-github text-gray-500 mr-2"></i>
              <input
                type="text"
                v-model="linkGithub"
                placeholder="Link to github"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              />
            </div>
            <div class="flex items-center">
              <i class="fab fa-linkedin text-gray-500 mr-2"></i>
              <input
                type="text"
                v-model="linkedin"
                placeholder="Link to LinkedIn"
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
          :disabled="!newData"
          @click="submitForm"
          class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import {
  uploadImage,
  updateProfile,
  getProfileUser,
} from "../../Services/Api/UserService";
import { decodeToken } from "../../Services/JWT/JwtDecode";
import { eventBus } from "../../Services/EvenBus";
import Swal from "sweetalert2";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const imagePreview = ref(null);
    const isHovered = ref(false);
    const selectedFile = ref(null);
    const userId = ref("");
    const linkPersonalWebsite = ref(null);
    const linkGithub = ref(null);
    const errorImage = ref("");
    const successMessage = ref("");
    const failed = ref(false);
    const dataProfile = ref({});
    const newData = ref(false);
    const oldLinkGithub = ref(null);
    const oldLinkPersonalWebsite = ref(null);
    const linkedin = ref(null);
    const oldLinkedin = ref(null);

    // Close modal
    const closeModal = () => {
      emit("close");
    };

    // Handle image preview
    const previewImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          imagePreview.value = reader.result;
        };
        reader.readAsDataURL(file);
        selectedFile.value = file;
      }
    };

    // Handle drag over event
    const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.target.classList.add("border-primary");
    };

    // Handle drag leave event
    const handleDragLeave = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.target.classList.remove("border-primary");
    };

    // Handle drop event
    const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        previewImage({ target: { files: [file] } });
      }
    };

    // Remove image preview
    const removeImage = () => {
      errorImage.value = null;
      imagePreview.value = null;
      selectedFile.value = null;
    };

    // Form submit
    const submitForm = async () => {
      // Cek jika tidak ada input yang diisi
      if (
        !selectedFile.value &&
        !linkPersonalWebsite.value &&
        !linkedin &&
        !linkGithub.value
      ) {
        closeModal();
        return;
      }

      // Jika ada gambar yang dipilih, upload gambar
      if (selectedFile.value) {
        const allowedExtensions = [".png", ".jpg", ".jpeg"];
        const fileExtension = selectedFile.value.name
          .split(".")
          .pop()
          .toLowerCase(); // Ambil ekstensi file dan konversi ke huruf kecil

        // Validasi ekstensi file
        if (!allowedExtensions.includes("." + fileExtension)) {
          errorImage.value =
            "Invalid file type. Only PNG, JPG, and JPEG are allowed.";
          return;
        }

        try {
          const data = await uploadImage(userId.value, selectedFile.value);
          const profileImageUrl = data.data.profileImage;
          dataProfile.value.profileImage = profileImageUrl;
          successMessage.value += "Image updated successfully!";
        } catch (error) {
          failed.value = true;
          console.error("Error uploading image:", error);
        }
      }
      if (linkPersonalWebsite.value || linkGithub.value || linkedin.value) {
        try {
          const profileData = {
            userId: userId.value,
            fullName: dataProfile.value.fullName,
            summary: dataProfile.value.summary,
            phoneNumber: dataProfile.value.phoneNumber,
            gender: dataProfile.value.gender,
            address: dataProfile.value.address,
            linkPersonalWebsite:
              linkPersonalWebsite.value ||
              dataProfile.value.linkPersonalWebsite,
            profileImage: dataProfile.value.profileImage,
            linkGithub: linkGithub.value || dataProfile.value.linkGithub,
            linkedin: linkedin.value || dataProfile.value.linkedin,
          };
          const data = await updateProfile(profileData);
          successMessage.value += "Profile updated successfully!";
        } catch (error) {
          failed.value = true;
          console.error("Error updating profile:", error);
        }
      }

      if (failed.value) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "An error occurred while processing your request.",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else if (successMessage.value) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: successMessage.value,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }

      eventBus.emit("profileUpdated");
      closeModal();
    };

    // Ambil userId dari token
    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        userId.value = dataUser.uid;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    // Ambil data profil pengguna
    const fetchProfileUser = async () => {
      try {
        const data = await getProfileUser(userId.value);
        dataProfile.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    watch([linkGithub, linkPersonalWebsite, linkedin, selectedFile], () => {
      if (
        linkGithub.value !== oldLinkGithub.value ||
        linkPersonalWebsite.value !== oldLinkPersonalWebsite.value ||
        linkedin.value !== oldLinkedin.value ||
        selectedFile.value
      ) {
        newData.value = true;
      } else {
        newData.value = false;
      }
    });

    const cekNewData = () => {
      oldLinkGithub.value = dataProfile.value.linkGithub;
      oldLinkPersonalWebsite.value = dataProfile.value.linkPersonalWebsite;
      oldLinkedin.value = dataProfile.value.linkedin;

      linkGithub.value = dataProfile.value.linkGithub;
      linkPersonalWebsite.value = dataProfile.value.linkPersonalWebsite;
      linkedin.value = dataProfile.value.linkedin;
    };
    onMounted(async () => {
      await getUserId();
      await fetchProfileUser();
      cekNewData();
    });

    return {
      newData,
      oldLinkGithub,
      oldLinkPersonalWebsite,
      fetchProfileUser,
      errorImage,
      linkGithub,
      linkPersonalWebsite,
      isHovered,
      imagePreview,
      closeModal,
      previewImage,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      removeImage,
      submitForm,
      linkedin,
      oldLinkedin,
    };
  },
};
</script>
