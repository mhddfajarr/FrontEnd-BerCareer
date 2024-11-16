<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-xl font-semibold text-gray-700">Add Education</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Modal Body (Form) -->
      <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-5">
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label
              for="univName"
              class="block text-gray-700 font-semibold text-left"
              >University Name</label
            >
            <input
              type="text"
              id="univName"
              v-model="universityName"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p
                v-if="errors.universityNameError"
                class="text-red-500 text-xs text-left mt-1"
              >
                {{ errors.universityNameError }}
              </p>
          </div>
          <div class="mb-4">
            <label
              for="programStudy"
              class="block text-gray-700 font-semibold text-left"
              >Program Study</label
            >
            <input
              type="text"
              id="programStudy"
              v-model="programStudy"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p
                v-if="errors.programStudyError"
                class="text-red-500 text-xs text-left mt-1"
              >
                {{ errors.programStudyError }}
              </p>
          </div>
          <div class="mb-4">
            <label
              for="degree"
              class="block text-gray-700 font-semibold text-left"
              >Degree</label
            >
            <select
              id="degree"
              v-model="degree"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
            >
              <option
                v-for="option in degreeOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <p
                v-if="errors.degreeError"
                class="text-red-500 text-xs text-left mt-1"
              >
                {{ errors.degreeError }}
              </p>
          </div>
          <div class="mb-4">
            <label for="gpa" class="block text-gray-700 font-semibold text-left"
              >GPA</label
            >
            <input
              type="number"
              id="gpa"
              v-model="gpa"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
            <p
                v-if="errors.gpaError"
                class="text-red-500 text-xs text-left mt-1"
              >
                {{ errors.gpaError }}
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
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
              <p
                v-if="errors.endDateError"
                class="text-red-500 text-xs text-left mt-1"
              >
                {{ errors.endDateError }}
              </p>
            </div>
          </div>
          <div class="mb-4">
            <label
              for="description"
              class="block text-gray-700 font-semibold text-left"
            >
              Description <span class="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              id="description"
              v-model="description"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              rows="4"
            ></textarea>
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
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const universityName = ref("");
    const programStudy = ref("");
    const degree = ref(null);
    const gpa = ref("");
    const startDate = ref("");
    const endDate = ref("");
    const description = ref("");
    const degreeOptions = [
      { value: null, text: "Select degree" },
      { value: 0, text: "S1" },
      { value: 1, text: "S2" },
      { value: 2, text: "S3" },
      { value: 3, text: "D3" },
    ];
    const isEditForm = ref(false);
    const errors = ref({
      universityNameError: "",
      programStudyError: "",
      degreeError: "",
      gpaError: "",
      startDateError: "",
      endDateError: "",
      descriptionError: "",
    });

    // Watchers to clear error messages when inputs change
    watch(universityName, () => {
      errors.value.universityNameError = "";
    });
    watch(programStudy, () => {
      errors.value.programStudyError = "";
    });
    watch(degree, () => {
      errors.value.degreeError = "";
    });
    watch(gpa, () => {
      errors.value.gpaError = "";
    });
    watch(startDate, () => {
      errors.value.startDateError = "";
    });
    watch(endDate, () => {
      errors.value.endDateError = "";
    });
    watch(description, () => {
      errors.value.descriptionError = "";
    });

    const validateForm = () => {
      let isValid = true;

      if (!universityName.value) {
        errors.value.universityNameError = "University Name is required";
        isValid = false;
      }
      if (!programStudy.value) {
        errors.value.programStudyError = "Program Study is required";
        isValid = false;
      }
      if (!degree.value) {
        errors.value.degreeError = "Degree is required";
        isValid = false;
      }
      if (!gpa.value) {
        errors.value.gpaError = "GPA is required";
        isValid = false;
      } else if (isNaN(gpa.value) || gpa.value < 0 || gpa.value > 4.0) {
        errors.value.gpaError = "GPA must be a number between 0 and 4.00";
        isValid = false;
      }
      if (!startDate.value) {
        errors.value.startDateError = "Start date is required";
        isValid = false;
      }
      if (!endDate.value) {
        errors.value.endDateError = "End date is required";
        isValid = false;
      }

      return isValid;
    };

    const closeModal = () => {
      emit("close");
    };

    const submitForm = () => {
      if (!validateForm()) return;
      console.log("Form submitted with values:", {
        universityName: universityName.value,
        programStudy: programStudy.value,
        degree: degree.value,
        gpa: gpa.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value,
      });
    };

    return {
      universityName,
      programStudy,
      degree,
      gpa,
      startDate,
      endDate,
      description,
      closeModal,
      submitForm,
      validateForm,
      degreeOptions,
      errors,
    };
  },
});
</script>


<style scoped>
/* Hide number input spinner (Chrome, Safari, Edge, and Opera) */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide number input spinner (Firefox) */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
