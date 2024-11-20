<template>
  <dialog :id="modalId" class="modal modal-bottom w-full sm:modal-middle">
    <div class="modal-box p-4 bg-white relative">
      <!-- Tombol Close di kanan atas -->
      <button
        @click="closeModal"
        class="bg-primary px-2 pb-1 absolute top-5 right-10 rounded-full text-white text-2xl font-bold flex items-center justify-center w-10 h-10"
      >
        ×
      </button>

      <div
        class="max-w-2xl mx-auto p-6 overflow-y-auto"
        style="max-height: 80vh"
      >
        <!-- Profile Section -->
        <div class="flex items-center mb-6">
          <img
            alt="Profile picture"
            class="w-24 h-24 object-cover rounded-full mr-6"
            :src="'https://localhost:7147/' + dataProfile.profileImage"
          />
          <div class="text-left">
            <h1 class="text-2xl text-gray-800 font-bold">
              {{ dataProfile.fullName }}
            </h1>
          </div>
        </div>
        <p class="text-gray-700 mb-4 text-left">
          {{ dataProfile.summary }}
        </p>
        <!-- <p class="text-gray-700">
        Gender: <span v-if="dataProfile.gender == 0">Male</span>  <span v-else>Female</span> 
      </p>
      <p class="text-gray-700 mb-8">
        Gender: {{ dataProfile.birth }}
      </p> -->
        <hr class="border-gray-300 mb-6" />

        <!-- Work Experience Section -->
        <h3 class="text-lg font-bold mb-4 text-left text-gray-700">WORK EXPERIENCE</h3>
        <div
          v-for="(experience, index) in dataExperience"
          :key="experience.experienceId"
          class="mb-6 text-left"
        >
          <h4 class="text-md font-semibold text-gray-800">
            {{ experience.position }} - {{ experience.company }}
          </h4>
          <p class="text-gray-600">
            {{ formatPeriod(experience.startDate, experience.endDate) }}
          </p>

          <h5 class="text-md font-medium text-gray-700 mb-2"></h5>
          <ul class="list-disc list-inside text-gray-700">
            {{
              experience.description
            }}
          </ul>
        </div>
        <hr class="border-gray-300 mb-6" />

        <!-- Education Section -->
        <h3 class="text-lg font-bold mb-4 text-gray-700 text-left">EDUCATION</h3>
        <div
          v-for="(education, index) in dataEducations"
          :key="education.educationId"
          class="mb-6 text-left"
        >
          <h4 class="text-md font-semibold text-gray-800">
            {{ education.universityName }}
          </h4>

          <p class="text-gray-600">
            <span v-if="education.degree === 0">S1</span>
            <span v-else-if="education.degree === 1">S2</span>
            <span v-else-if="education.degree === 2">S3</span>
            <span v-else-if="education.degree === 4">D3</span>
            <span v-else>Unknown</span> - {{ education.programStudy }}
          </p>

          <p class="text-gray-600">
            {{ education.startDateFormatted }} -
            {{ education.endDateFormatted }}
          </p>

          <h5 class="text-md font-medium text-gray-700 mb-2">
            GPA {{ education.gpa }}
          </h5>
          <ul class="list-disc list-inside text-gray-700">
            {{
              education.description
            }}
          </ul>
        </div>
        <hr class="border-gray-300 mb-6" />

        <!-- Skills and Language Sections -->
        <div class="flex">
          <div class="w-1/2 pr-4">
            <h3 class="text-lg font-bold mb-4 text-gray-700 text-left">SKILLS</h3>
            <ul class="list-disc list-inside text-gray-700 text-left">
              <li v-for="(skill, index) in dataSkill" :key="skill.skillId">
                {{ skill.skillName }}
              </li>
            </ul>
          </div>
          <div class="w-1/2 pl-4">
            <h3 class="text-lg font-bold mb-4 text-gray-700 text-left">Social Account</h3>
            <ul class="space-y-4">
              <li class="flex items-center">
                <i class="fas fa-globe text-gray-600 text-left" ></i>
                <span class="ml-2 text-gray-700 text-left"
                  ><a
                    v-if="dataProfile.linkPersonalWebsite"
                    :href="dataProfile.linkPersonalWebsite"
                    target="_blank"
                    class="text-primaryHover hover:text-primary hover:underline"
                  >
                    Personal Website
                  </a>
                  <span v-else>-</span></span
                >
              </li>
              <li class="flex items-center">
                <i class="fab fa-github text-gray-600"></i>
                <span class="ml-2 text-gray-700"
                  ><a
                    v-if="dataProfile.linkGithub"
                    :href="dataProfile.linkGithub"
                    target="_blank"
                    class="text-primaryHover hover:text-primary hover:underline"
                  >
                    Profile Github
                  </a>
                  <span v-else>-</span></span
                >
              </li>
              <li class="flex items-center">
                <i class="fab fa-linkedin text-gray-600"></i>
                <span class="ml-2 text-gray-700"
                  ><a
                    v-if="dataProfile.linkedin"
                    :href="dataProfile.linkedin"
                    target="_blank"
                    class="text-primaryHover hover:text-primary hover:underline"
                  >
                    Profile LinkedIn
                  </a>
                  <span v-else>-</span></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  getProfileUser,
  getExperienceUser,
  getEducationUser,
  getSkillUser,
} from "../../Services/Api/UserService";
import moment from "moment";
export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const dataProfile = ref([]);
    const selectedGender = ref(null);
    const userId = props.userId;
    const dataExperience = ref([]);
    const dataEducations = ref([]);
    const dataSkill = ref([]);

    const fetchProfileUser = async () => {
      try {
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

    const fetchExperienceUser = async () => {
      try {
        const data = await getExperienceUser(userId);
        dataExperience.value = data.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchEducationsUser = async () => {
      try {
        const data = await getEducationUser(userId);
        const sortedData = data.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        dataEducations.value = sortedData.map((education) => ({
          ...education,
          startDateFormatted: moment(education.startDate).format("MMM YYYY"),
          endDateFormatted: moment(education.endDate).format("MMM YYYY"),
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSkillUser = async () => {
      try {
        const data = await getSkillUser(userId);
        dataSkill.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Format tanggal periode
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

    const closeModal = () => {
      const modal = document.getElementById(props.modalId);
      if (modal) modal.close();
    };

    // Correctly call the onMounted hook
    onMounted(async () => {
      await fetchExperienceUser();
      await fetchProfileUser();
      await fetchEducationsUser();
      await fetchSkillUser();
      console.log("ini data", dataEducations.value); // Log the fetched data
    });

    return {
      closeModal,
      dataProfile,
      selectedGender,
      dataExperience,
      formatPeriod,
      dataEducations,
      dataSkill,
    };
  },
};
</script>

<style scoped>
/* Tambahkan gaya kustom jika diperlukan */
</style>
