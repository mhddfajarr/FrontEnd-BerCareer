<template>
  <div class="bg-white p-6 rounded-lg shadow-md w-full">
    <div class="flex items-center mb-2 cursor-pointer" @click="toggleShow">
      <span class="mr-2">
        <i
          :class="showItems ? 'fas fa-chevron-down text-gray-700' : 'fas fa-chevron-right text-gray-700'"
        ></i>
      </span>
      <h1 class="text-xl font-bold text-black">Education</h1>
    </div>
    <div class="mt-4 bg-gray-700 h-px mb-4"></div>

    <div v-if="showItems" class="flex flex-col space-y-6">
      <div
        v-for="education in dataEducations"
        :key="education.educationId"
        class="relative"
      >
        <!-- Bullet Point and Line -->
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-3 h-3 bg-primary rounded-full mt-2"></div>
            <div class="w-1 bg-blue-500 h-full ml-1"></div>
          </div>

          <!-- Education Details -->
          <div class="ml-4 flex-1">
            <!-- Title and School Info -->
            <div class="flex justify-between items-center">
              <div>
                <h2 class="text-lg font-semibold text-gray-700">
                  {{ education.universityName}} 
                </h2>
                <p class="text-gray-700 text-md">
                <span v-if="education.degree === 0">S1</span>
                <span v-else-if="education.degree === 1">S2</span>
                <span v-else-if="education.degree === 2">S3</span>
                <span v-else-if="education.degree === 3">D3</span>
                <span v-else>{{ education.degree }}</span> - {{ education.programStudy }}
                </p>
                <p class="text-gray-700 text-md">{{ education.school }}</p>
                <p class="text-gray-500 italic">
                  {{ formatPeriod(education.startDate, education.endDate) }}
                </p>
                <p class="text-gray-700">GPA {{ education.gpa }}</p>
              </div>
            </div>
            <div class="mt-2">
              <p class="text-gray-700">{{ education.description }}</p>
            </div>

            <div class="hidden md:flex absolute top-0 right-0 space-x-3">
              <!-- Edit Button -->
              <button
                class="text-primary hover:text-primaryHover rounded-md"
                @click="openModalEdit(education.educationId)"
              >
                <i class="fas fa-edit text-md"></i> Edit
              </button>
              <!-- Delete Button -->
              <button
                class="text-red-500 hover:text-red-600 rounded-md"
                @click="deleteEducationUser(education.educationId)"
              >
                <i class="fas fa-trash text-md"></i> Delete
              </button>
            </div>

            <div class="md:hidden flex justify-center space-x-4 mt-4">
              <button
                class="text-primary hover:text-primaryHover rounded-md"
                @click="openModalEdit(education.educationId)"
              >
                <i class="fas fa-edit text-md"></i> Edit
              </button>
              <!-- Delete Button -->
              <button
                class="text-red-500 hover:text-red-600 rounded-md"
                @click="deleteEducationUser(education.educationId)"
              >
                <i class="fas fa-trash text-md"></i> Delete
              </button>
            </div>
            <div class="mt-5 bg-gray-200 h-px"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Education Button -->
    <div class="flex justify-center mt-4">
      <button
        @click="openModalAdd"
        class="text-primaryHover hover:text-white hover:rounded-md hover:bg-primary px-3 py-2 font-semibold flex items-center justify-center transition-all duration-250 ease-in-out"
      >
        <i class="fas fa-plus-circle mr-2"></i>
        Add Education
      </button>
    </div>

    <ModalAddEducation
      v-if="showModalEducation"
      :showModal="showModalEducation"
      :educationId="modalId"
      @close="showModalEducation = false"
    />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import ModalAddEducation from "./ModalAddEducation.vue";
import { getEducationUser, deleteEducation } from "../../Services/Api/UserService";
import { decodeToken } from "../../Services/JWT/JwtDecode";
import moment from "moment";
import { eventBus } from "../../Services/EvenBus";
import Swal from "sweetalert2";

export default {
  name: "EducationCard",
  components: {
    ModalAddEducation,
  },
  setup() {
    const showModalEducation = ref(false);
    const userId = ref("");
    const dataEducations = ref("");
    const modalId = ref(null);
    const showItems = ref(true);
    const toggleShow = () => {
      showItems.value = !showItems.value;
    };

    // Method to open modal for editing education
    const openModalEdit = (educationId) => {
        modalId.value = educationId;
        showModalEducation.value = true;
    };
    const openModalAdd = () => {
      showItems.value = true
      modalId.value = null;
      showModalEducation.value = true;
    };

    // Method to delete education entry
   

    // Method to format period (startDate to endDate)
    const formatPeriod = (startDate, endDate) => {
        const start = moment(startDate);

        // If endDate is null or "Sekarang", use the current date
        const end =
            endDate === null || endDate === "Sekarang" ? moment() : moment(endDate);

        const duration = moment.duration(end.diff(start));
        const months = duration.months() + duration.years() * 12; // Calculate total months

        // Format start and end dates as "Month YYYY"
        const startFormatted = start.format("MMMM YYYY");
        const endFormatted = end.isSame(moment(), "day")
            ? "Now"
            : end.format("MMMM YYYY");

        // If endDate is null, show "Now" instead of calculating months
        if (endDate === null) {
            return `${startFormatted} - Now (${months} months)`;
        }

        // Return formatted string like "May 2024 - Now (6 months)"
        return `${startFormatted} - ${endFormatted} (${months} months)`;
        };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        userId.value = dataUser.uid;
        console.log(userId.value); // Debugging ID User
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };
    const fetchEducationsUser = async () => {
        await getUserId()
      try {
        const data = await getEducationUser(userId.value);
        dataEducations.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const deleteEducationUser = async(educationId) => {
      try {
        const data = {
          userId: userId.value,
          id: educationId,
        };
        console.log(data)
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this action!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true, 
        });

        if (result.isConfirmed) {
          await deleteEducation(data); 
          await fetchEducationsUser(); 
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Success deleted experience!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        console.error("Gagal menghapus pekerjaan:", error);
      }
    };
    eventBus.on("newEducation", fetchEducationsUser);
    onMounted(async () => {
      await getUserId();
      fetchEducationsUser();
      console.log(dataEducations);
    });
    return {
      modalId,
      showItems,
      toggleShow,
      showModalEducation,
      fetchEducationsUser,
      dataEducations,
      openModalEdit,
      deleteEducationUser,
      formatPeriod,
      userId,
      openModalAdd
    };
  },
};
</script>
