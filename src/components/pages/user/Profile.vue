<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Profile Card -->
      <div
        class="bg-white px-6 rounded-lg shadow-md h-auto md:col-span-4 border-t-4 border-primary"
      >
        <div class="mt-3">
          <h1 class="text-xl font-bold text-black mb-2">Card Profile</h1>
          <hr class="border-gray-300 mb-4" />
        </div>

        <div class="text-center">
          <div v-if="dataProfile.profileImage">
            <div v-if="dataProfile.profileImage.includes('uploads')">
              <img
                :src="'https://localhost:7147/' + dataProfile.profileImage"
                alt="Profile"
                class="w-28 h-28 mx-auto rounded-full object-cover"
                height="100"
              />
            </div>
            <div v-else>
              <img
                :src="dataProfile.profileImage"
                alt="Default Google"
                class="w-40 h-28 mx-auto rounded-full object-cover"
                height="100"
                referrerpolicy="no-referrer"
              />
            </div>
          </div>
          <div v-else>
            <img
              src="../../../assets/images/default.png"
              alt="Default Profile"
              class="w-28 h-28 mx-auto rounded-full object-cover"
            />
          </div>
          <h2 class="text-xl font-semibold mt-4 text-gray-700">
            {{ dataProfile.fullName }}
          </h2>
          <p class="text-gray-600">{{ email }}</p>
        </div>
        <div class="mt-6 mb-4">
          <p class="text-gray-700 mb-3 font-semibold">Social Account</p>
          <ul class="space-y-4">
            <li class="flex items-center">
              <i class="fas fa-globe text-gray-600"></i>
              <span class="ml-2 text-gray-700">Website</span>
              <span class="ml-auto text-gray-500">
                <a
                  v-if="dataProfile.linkPersonalWebsite"
                  :href="dataProfile.linkPersonalWebsite"
                  target="_blank"
                  class="text-primaryHover hover:text-primary hover:underline"
                >
                  Personal Website
                </a>
                <span v-else>-</span>
              </span>
            </li>
            <li class="flex items-center">
              <i class="fab fa-github text-gray-600"></i>
              <span class="ml-2 text-gray-700">Github</span>
              <span class="ml-auto text-gray-500">
                <a
                  v-if="dataProfile.linkGithub"
                  :href="dataProfile.linkGithub"
                  target="_blank"
                  class="text-primaryHover hover:text-primary hover:underline"
                >
                  Profile Github
                </a>
                <span v-else>-</span>
              </span>
            </li>
            <li class="flex items-center">
              <i class="fab fa-linkedin text-gray-600"></i>
              <span class="ml-2 text-gray-700">LinkedIn</span>
              <span class="ml-auto text-gray-500">
                <a
                  v-if="dataProfile.linkedin"
                  :href="dataProfile.linkedin"
                  target="_blank"
                  class="text-primaryHover hover:text-primary hover:underline"
                >
                  Profile LinkedIn
                </a>
                <span v-else>-</span>
              </span>
            </li>
          </ul>
        </div>
        <button
          @click="showModalCardProfile = true"
          class="bg-gray-300 hover:bg-gray-400 w-full font-semibold text-gray-700 px-4 py-2 rounded-md mb-5 md:mt-5"
        >
          Edit Card Profile
        </button>
        <ModalEditCardProfile
          v-if="showModalCardProfile"
          :showModal="showModalCardProfile"
          @close="showModalCardProfile = false"
          @click.self="showModalCardProfile = false" 
        />
      </div>

      <!-- Profile Details -->
      <div class="bg-slate-50 h-auto md:col-span-8 flex flex-col">
        <div v-if="!isComplete" class="mb-2">
          <p class="text-gray-700 font-semibold">
            Complete your
            <template v-if="requiredPersonalInfo"
              >{{ requiredPersonalInfo }},
            </template>
            <template v-if="requiredImage">{{ requiredImage }}, </template>
            <template v-if="requiredExperience"
              >{{ requiredExperience }},
            </template>
            <template v-if="requiredEducation"
              >{{ requiredEducation }},
            </template>
            <template v-if="requiredSkill">{{ requiredSkill }}</template>
            to start applying for jobs.
          </p>

          <div class="flex items-center">
            <progress
              class="progress progress-primary w-full"
              :value="progress"
              max="100"
            ></progress>
            <span class="ml-2 text-gray-700 font-semibold"
              >{{ progress }}%</span
            >
          </div>
        </div>
        <div
          class="bg-white px-6 md:px-10 h-full rounded-lg shadow-md md:col-span-8 border-t-4 border-primary flex flex-col"
        >
          <div class="mt-3">
            <h1 class="text-2xl font-bold text-black mb-2">
              Personal Info
              <span
                v-if="requiredPersonalInfo == 'Personal Info'"
                class="text-red-500"
                >*</span
              >
            </h1>
            <hr class="border-gray-300 mb-4" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="mt-4">
              <h3 class="text-lg font-semibold text-gray-700">Full Name</h3>
              <p class="text-gray-500">{{ dataProfile.fullName ?? "-" }}</p>
            </div>

            <div class="mt-4">
              <h3 class="text-lg font-semibold text-gray-700">Phone</h3>
              <p class="text-gray-500">{{ dataProfile.phoneNumber ?? "-" }}</p>
            </div>
            <div class="mt-4">
              <h3 class="text-lg font-semibold text-gray-700">Address</h3>
              <p class="text-gray-500">{{ dataProfile.address ?? "-" }}</p>
            </div>
            <div class="mt-4">
              <h3 class="text-lg font-semibold text-gray-700">Gender</h3>
              <p class="text-gray-500">
                {{
                  dataProfile.gender === 0
                    ? "Male"
                    : dataProfile.gender === 1
                    ? "Female"
                    : "-"
                }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:mt-7">
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Summary</h3>
              <p class="text-gray-500">{{ dataProfile.summary ?? "-" }}</p>
            </div>
          </div>

          <div class="mt-5 text-end">
            <button
              @click="showModalProfile = true"
              class="bg-primary hover:bg-primaryHover text-white px-4 py-2 mb-6 rounded-md"
            >
              Edit Profile
            </button>
            <ModalEditProfile
              v-if="showModalProfile"
              :showModal="showModalProfile"
              @close="showModalProfile = false"
              @click.self="showModalProfile = false" 
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Experience, Education, Skill, Certificate Section -->
    <div class="flex justify-end mt-6 lg:ml-3 mb-20">
      <div class="w-full md:w-8/12">
        <div class="space-y-6">
          <!-- Experience -->
          <ExperienceCard />

          <!-- Education -->
          <EducationCard />

          <!-- Skill -->
          <SkillCard />

          <!-- Certificate -->
          <!-- <CertificateCard/>    -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import ModalAddExperience from "../../User/ModalAddExperience.vue";
import ModalEditProfile from "../../User/ModalAddProfile.vue";
import ModalAddEducation from "../../User/ModalAddEducation.vue";
import ModalAddSkill from "../../User/ModalAddSkill.vue";
import ModalAddCertificate from "../../User/ModalAddCertificate.vue";
import ModalEditCardProfile from "../../User/ModalEditCardProfile.vue";
import ExperienceCard from "../../User/ProfileExperienceCard.vue";
import EducationCard from "../../User/ProfileEducationCard.vue";
import SkillCard from "../../User/ProfileSkillCard.vue";

// import CertificateCard from '../../User/ProfileCertificateCard.vue';

import { eventBus } from "../../../Services/EvenBus";

import { decodeToken } from "../../../Services/JWT/JwtDecode";
import {
  getProfileUser,
  getExperienceUser,
  getEducationUser,
  getSkillUser,
} from "../../../Services/Api/UserService";

export default {
  setup() {
    const showModalExperience = ref(false);
    const showModalProfile = ref(false);
    const showModalEducation = ref(false);
    const showModalSkill = ref(false);
    const showModalCertificate = ref(false);
    const showModalCardProfile = ref(false);

    const id = ref("");
    const dataProfile = ref({});
    const dataExperience = ref([]);
    const email = ref("");
    const isComplete = ref(false);
    const progress = ref(20);
    const dataEducation = ref([]);
    const dataSkill = ref([]);
    const requiredImage = ref("Profile Image");
    const requiredPersonalInfo = ref("Personal Info");
    const requiredExperience = ref("Experience");
    const requiredEducation = ref("Education");
    const requiredSkill = ref("Skill");

    // Fetch user profile data
    const fetchProfileUser = async () => {
      try {
        const userId = id.value;
        const data = await getProfileUser(userId);
        dataProfile.value = data.data;
        if (dataProfile.value && dataProfile.value.postDate) {
          dataProfile.value.postDate = moment(
            dataProfile.value.postDate
          ).format("MMMM DD, YYYY");
        }
        checkProgress();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchExperience = async () => {
      try {
        const data = await getExperienceUser(id.value);
        dataExperience.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch education data
    const fetchEducation = async () => {
      try {
        const data = await getEducationUser(id.value);
        dataEducation.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch skill data
    const fetchSkill = async () => {
      try {
        const data = await getSkillUser(id.value);
        dataSkill.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Check progress based on available data
    const checkProgress = async () => {
      progress.value = 20;
      if (progress.value < 100) {
        isComplete.value = false;
      }
      await fetchExperience();
      await fetchEducation();
      await fetchSkill();
      if (dataProfile.value.phoneNumber != null) {
        progress.value += 20;
        requiredPersonalInfo.value = "";
      }
      if (dataProfile.value.profileImage != null) {
        progress.value += 10;
        requiredImage.value = "";
      }
      if (dataExperience.value.length > 0) {
        progress.value += 20;
        requiredExperience.value = "";
      }
      if (dataEducation.value.length > 0) {
        progress.value += 20;
        requiredEducation.value = "";
      }
      if (dataSkill.value.length > 0) {
        progress.value += 10;
        requiredSkill.value = "";
      }
      if (progress.value === 100) {
        isComplete.value = true;
      }
    };

    eventBus.on("profileUpdated", fetchProfileUser);
    eventBus.on("checkProgres", checkProgress);

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
        email.value = dataUser.email;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    onMounted(async () => {
      await getUserId();
      await fetchProfileUser();
    });

    return {
      id,
      progress,
      isComplete,
      dataProfile,
      email,
      showModalExperience,
      showModalProfile,
      showModalEducation,
      showModalSkill,
      showModalCertificate,
      showModalCardProfile,
      fetchProfileUser,
      getUserId,
      fetchExperience,
      fetchEducation,
      fetchSkill,
      dataExperience,
      dataEducation,
      dataSkill,
      requiredImage,
      requiredPersonalInfo,
      requiredExperience,
      requiredEducation,
      requiredSkill,
    };
  },
  components: {
    SkillCard,
    EducationCard,
    ModalEditProfile,
    ModalAddExperience,
    ModalAddEducation,
    ModalAddSkill,
    ModalAddCertificate,
    ModalEditCardProfile,
    ExperienceCard,
  },
};
</script>

<style lang="scss" scoped></style>
