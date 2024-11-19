<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-xl font-semibold text-gray-700">
          {{ isEditForm ? "Edit Education" : "Add Education" }}
        </h3>
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
import { defineComponent, ref, watch, onMounted } from "vue";
import {
  addEducation,
  getEducationUser,
  updateEducation,
} from "../../Services/Api/UserService";
import { decodeToken } from "../../Services/JWT/JwtDecode";
import { eventBus } from "../../Services/EvenBus";
import Swal from "sweetalert2";

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    educationId: {
      type: Number,
      required: false,
      default: null,
    },
  },
  setup(props, { emit }) {
    const userId = ref("");
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
    const education = ref({});
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

      if (
        degree.value === null ||
        degree.value === undefined ||
        degree.value === ""
      ) {
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

      const today = new Date();
      const startDateValue = new Date(startDate.value);
      if (!startDate.value) {
        errors.value.startDateError = "Start date is required";
        isValid = false;
      } else if (startDateValue > today) {
        errors.value.startDateError = "Start date cannot be in the future";
        isValid = false;
      }

      // Validasi endDate dan tidak kurang dari startDate
      const endDateValue = new Date(endDate.value);
      if (!endDate.value) {
        errors.value.endDateError = "End date is required";
        isValid = false;
      } else if (endDateValue < startDateValue) {
        errors.value.endDateError =
          "End date cannot be earlier than start date";
        isValid = false;
      }

      return isValid;
    };

    const closeModal = () => {
      emit("close");
    };
    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        userId.value = dataUser.uid;
        console.log(userId.value);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const submitForm = async () => {
      if (!validateForm()) return;
      const newDataEducation = {
        userId: userId.value,
        universityName: universityName.value,
        programStudy: programStudy.value,
        degree: degree.value,
        gpa: gpa.value,
        startDate: startDate.value,
        endDate: endDate.value,
        description: description.value ? description.value : null,
      };
      if (props.educationId) {
        newDataEducation.educationId = props.educationId;
        try {
          await updateEducation(newDataEducation);
          eventBus.emit("newEducation");
          closeModal();
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Success edit education!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        try {
          await addEducation(newDataEducation);
          eventBus.emit("newEducation");
          eventBus.emit("checkProgres");

          closeModal();
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Success add new education!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const fetchEducationUser = async () => {
      try {
        const data = await getEducationUser(userId.value);
        education.value = data.data.filter(
          (item) => item.educationId === props.educationId
        );
        console.log("Filtered education:", education.value); // Menampilkan hasil filter
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    onMounted(async () => {
      console.log("ini daari prop", props.educationId);
      await getUserId();
      await fetchEducationUser();
      if (props.educationId) {
        universityName.value = education.value[0].universityName;
        programStudy.value = education.value[0].programStudy;
        degree.value = education.value[0].degree;
        gpa.value = education.value[0].gpa;
        startDate.value = education.value[0].startDate.split("T")[0];
        endDate.value = education.value[0].endDate.split("T")[0];
        description.value = education.value[0].description || "";
        console.log("id education:", props.educationId);
        isEditForm.value = true;
      }
      console.log(education);
      console.log(userId);
    });

    return {
      education,
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
      fetchEducationUser,
      decodeToken,
      addEducation,
      userId,
      isEditForm,
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
