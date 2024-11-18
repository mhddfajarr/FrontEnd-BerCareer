<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-xl font-semibold text-gray-700">Edit Profile</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Modal Body (Form) -->
      <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-5">
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-700 font-semibold text-left"
              >Name</label
            >
            <input
              type="text"
              id="name"
              v-model="dataProfile.fullName"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p
              v-if="errors.fullName"
              class="text-red-500 text-left text-xs mt-1"
            >
              {{ errors.fullName }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="gender"
              class="block text-gray-700 font-semibold text-left"
            >
              Gender
            </label>
            <select
              id="gender"
              v-model="dataProfile.gender"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            >
              <option
                v-for="option in genderOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>

            <p v-if="errors.gender" class="text-red-500 text-xs text-left mt-1">
              {{ errors.gender }}
            </p>
          </div>

          <div class="mb-4">
            <label
              for="phone"
              class="block text-gray-700 font-semibold text-left"
              >Phone</label
            >
            <input
              type="text"
              id="phone"
              v-model="dataProfile.phoneNumber"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p v-if="errors.phoneNumber" class="text-red-500 text-xs text-left mt-1">
              {{ errors.phoneNumber }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="address"
              class="block text-gray-700 font-semibold text-left"
              >Address</label
            >
            <input
              type="text"
              id="address"
              v-model="dataProfile.address"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p v-if="errors.address" class="text-red-500 text-xs text-left mt-1">
              {{ errors.address }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="aboutMe"
              class="block text-gray-700 font-semibold text-left"
              >Summary</label
            >
            <textarea
              id="aboutMe"
              v-model="dataProfile.summary"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 required focus:outline-none focus:ring focus:ring-primary/50"
              rows="4"
              required
            ></textarea>
            <p v-if="errors.summary" class="text-red-500 text-xs text-left mt-1">
              {{ errors.summary }}
            </p>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end space-x-4">
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
import { ref, onMounted, toRefs, defineComponent, watch } from "vue";
import { decodeToken } from "../../Services/JWT/JwtDecode";
import { getProfileUser, updateProfile } from "../../Services/Api/UserService";
import Swal from "sweetalert2";
import { eventBus } from "../../Services/EvenBus";

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { showModal } = toRefs(props);
    const id = ref("");
    const dataProfile = ref({
      userId: "",
      fullName: "",
      gender: null,
      phoneNumber: "",
      address: "",
      summary: "",
    });
    const errors = ref({
      fullName: "",
      gender: "",
      phoneNumber: "",
      address: "",
      summary: "",
    });
    const genderOptions = [
      { value: null, text: "Select Gender" },
      { value: 0, text: "Laki-Laki" },
      { value: 1, text: "Perempuan" },
    ];
    const selectedGender = ref();

    const fetchProfileUser = async () => {
      try {
        const userId = id.value;
        const data = await getProfileUser(userId);
        dataProfile.value = data.data;
        if (dataProfile.value.gender !== null) {
          selectedGender.value = dataProfile.value.gender; 
        }
        console.log(dataProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
        console.log(id.value);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const validateForm = () => {
      let isValid = true;
      if (!dataProfile.value.fullName) {
        errors.value.fullName = "Name is required";
        isValid = false;
      } else {
        errors.value.fullName = "";
      }

      if (dataProfile.value.gender === null) {
        errors.value.gender = "Gender is required";
        isValid = false;
      } else {
        errors.value.gender = "";
      }

      if (!dataProfile.value.phoneNumber) {
        errors.value.phoneNumber = "Phone number is required";
        isValid = false;
      } else if (!/^\d+$/.test(dataProfile.value.phoneNumber)) {
        // Memastikan hanya angka (integer)
        errors.value.phoneNumber = "Phone number must be a valid number";
        isValid = false;
      } else if (dataProfile.value.phoneNumber.length > 13) {
        // Memastikan panjang phone number tidak lebih dari 13 karakter
        errors.value.phoneNumber = "Phone number cannot exceed 13 characters";
        isValid = false;
      } else {
        errors.value.phoneNumber = "";
      }


      if (!dataProfile.value.address) {
        errors.value.address = "Address is required";
        isValid = false;
      } else {
        errors.value.address = "";
      }

      if (!dataProfile.value.summary) {
        errors.value.summary = "Summary is required";
        isValid = false;
      } else if (dataProfile.value.summary.length > 255) {
        errors.value.summary = "Summary cannot exceed 255 characters";
        isValid = false;
      } else {
        errors.value.summary = "";
      }

      return isValid;
    };

    const closeModal = () => {
      emit("close");
    };
    

    const submitForm = async () => {
      if (!validateForm()) return;
      try {
        await updateProfile(dataProfile.value);
        eventBus.emit("profileUpdated");

        closeModal();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Success apply!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } catch (exception) {
        console.log(exception);
        Swal.fire("Error", "An error occurred while applying.", "error");
      }
    };

    onMounted(async () => {
      await getUserId();
      await fetchProfileUser();
      console.log(dataProfile);
    });

    return {
      id,
      errors,
      dataProfile,
      fetchProfileUser,
      getUserId,
      showModal,
      closeModal,
      submitForm,
      genderOptions,
      selectedGender,
    };
  },
});
</script>

<style lang="scss" scoped></style>
