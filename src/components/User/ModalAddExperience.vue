<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-xl font-semibold text-gray-700">Add Experience</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Modal Body (Form) -->
      <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-5">
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label
              for="position"
              class="block text-gray-700 font-semibold text-left"
              >Position</label
            >
            <input
              type="text"
              id="position"
              v-model="position"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p
              v-if="errors.positionError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ errors.positionError }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="companyName"
              class="block text-gray-700 font-semibold text-left"
              >Company Name</label
            >
            <input
              type="text"
              id="companyName"
              v-model="companyName"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p
              v-if="errors.companyNameError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ errors.companyNameError }}
            </p>
          </div>
          <div class="mb-4">
            <label
              for="jobType"
              class="block text-gray-700 font-semibold text-left"
              >Job Type</label
            >
            <select
              id="jobType"
              v-model="jobType"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
            <p
              v-if="errors.jobTypeError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ errors.jobTypeError }}
            </p>
          </div>

          <div class="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
            <div class="w-full md:flex-1">
              <label
                for="startDate"
                class="block text-gray-700 font-semibold text-left"
                >Start Date</label
              >
              <input
                type="date"
                id="startDate"
                v-model="startDate"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
              <p
              v-if="errors.startDateError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ errors.startDateError }}
            </p>
            </div>
            <div class="w-full md:flex-1">
              <label
                for="endDate"
                class="block text-gray-700 font-semibold text-left"
                >End Date</label
              >
              <input
                type="date"
                id="endDate"
                v-model="endDate"
                class="w-full text-gray-700 bg-white border rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                :disabled="stilWorking"
                :class="
                  stilWorking ? 'opacity-50 bg-gray-200 cursor-not-allowed' : ''
                "
              />
              <p
              v-if="errors.endDateError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ errors.endDateError }}
            </p>
            </div>
          </div>
          <div class="w-full mb-4">
            <div class="w-full mb-4">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  v-model="stilWorking"
                  class="text-primary focus:ring-primary/50"
                />
                <label for="agreeTerms" class="ml-2 text-gray-700"
                  >I still work at this company</label
                >
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="description"
              class="block text-gray-700 font-semibold text-left"
              >Description</label
            >
            <textarea
              id="description"
              v-model="description"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              rows="4"
            ></textarea>
            <p
              v-if="errors.descriptionError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ errors.descriptionError }}
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
import { onMounted, ref } from "vue";
import { addExperience } from "../../Services/Api/UserService";
import { decodeToken } from "../../Services/JWT/JwtDecode";
import Swal from "sweetalert2";
import { eventBus } from "../../Services/EvenBus";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Ref for form data
    const userId = ref("");
    const position = ref("");
    const companyName = ref("");
    const jobType = ref("");
    const startDate = ref("");
    const endDate = ref("");
    const description = ref("");
    const stilWorking = ref(false);
    const errors = ref({
      positionError: "",
      companyNameError: "",
      jobTypeError: "",
      startDateError: "",
      endDateError: "",
      descriptionError: "",
    });

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        userId.value = dataUser.uid;
        console.log(userId.value);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const closeModal = () => {
      emit("close");
    };

    const validateForm = () => {
      let isValid = true;

      if (!position.value) {
        errors.value.positionError = "Position is required";
        isValid = false;
      } else {
        errors.value.positionError = "";
      }

      if (!companyName.value) {
        errors.value.companyNameError = "Company name is required";
        isValid = false;
      } else {
        errors.value.companyNameError = "";
      }

      if (!jobType.value) {
        errors.value.jobTypeError = "Job type is required";
        isValid = false;
      } else {
        errors.value.jobTypeError = "";
      }

      if (!startDate.value) {
        errors.value.startDateError = "Start date is required";
        isValid = false;
      } else {
        errors.value.startDateError = "";
      }

      if (!description.value) {
        errors.value.descriptionError = "Description is required";
        isValid = false;
      } else {
        errors.value.descriptionError = "";
      }

      if (!stilWorking.value && !endDate.value) {
        errors.value.endDateError = "End date is required";
        isValid = false;
      } else {
        errors.value.endDateError = "";
      }

      return isValid;
    };

    const submitForm = async () => {
      if (!validateForm()) return;
      const newData = {
        position: position.value,
        company: companyName.value,
        description: description.value,
        jobTypes: jobType.value,
        startDate: startDate.value,
        userId: userId.value,
        endDate: stilWorking.value ? null : endDate.value,
      };

      try {
        await addExperience(newData);
        eventBus.emit("newExperience");
        closeModal();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Success add new experience!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    onMounted(() => {
      getUserId();
    });

    return {
      position,
      companyName,
      jobType,
      startDate,
      endDate,
      description,
      stilWorking,
      errors,
      submitForm,
      closeModal,
    };
  },
};
</script>


<style scoped>
/* Optional custom styling */
</style>
