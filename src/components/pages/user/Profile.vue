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
          <img
            alt="Profile picture of John Doe"
            class="w-28 h-28 mx-auto rounded-full"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/EAszZfc2DORhC69L8qU6XOAvuejiWJUqZVkwvRgeGteFQXfdC.jpg"
            width="100"
          />
          <h2 class="text-xl font-semibold mt-4 text-gray-700">
            {{ dataProfile.fullName }}
          </h2>
          <p class="text-gray-600">{{ email }}</p>
        </div>
        <div class="mt-6 mb-4">
          <ul class="space-y-4">
            <li class="flex items-center">
              <i class="fas fa-globe text-gray-600"></i>
              <span class="ml-2 text-gray-700">Website</span>
              <span class="ml-auto text-gray-500">https://bootdey.com</span>
            </li>
            <li class="flex items-center">
              <i class="fab fa-github text-gray-600"></i>
              <span class="ml-2 text-gray-700">Github</span>
              <span class="ml-auto text-gray-500">bootdey</span>
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
        />
      </div>

      <!-- Profile Details -->
      <div
        class="bg-white px-6 md:px-10 h-auto rounded-lg shadow-md md:col-span-8 border-t-4 border-primary flex flex-col"
      >
        <div class="mt-3">
          <h1 class="text-2xl font-bold text-black mb-2">Profile</h1>
          <hr class="border-gray-300 mb-4" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-700">Full Name</h3>
            <p class="text-gray-500">{{ dataProfile.fullName }}</p>
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
                  ? "Laki-Laki"
                  : dataProfile.gender === 1
                  ? "Perempuan"
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
          />
        </div>
      </div>
    </div>

    <!-- Experience, Education, Skill, Certificate Section -->
    <div class="flex justify-end mt-6 lg:ml-3">
      <div class="w-full md:w-8/12">
        <div class="space-y-6">
          <!-- Experience -->
          <ExperienceCard  />

          <!-- Education -->
          <EducationCard />

          <!-- Skill -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Skill</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                @click="showModalSkill = true"
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Add Skill
              </button>
              <ModalAddSkill
                v-if="showModalSkill"
                :showModal="showModalSkill"
                @close="showModalSkill = false"
              />
            </div>
          </div>

          <!-- Certificate -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Certificate</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                @click="showModalCertificate = true"
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Add Certificate
              </button>
              <ModalAddCertificate
                v-if="showModalCertificate"
                :showModal="showModalCertificate"
                @close="showModalCertificate = false"
              />
            </div>
          </div>
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
import ExperienceCard from '../../User/ProfileExperienceCard.vue';
import EducationCard from '../../User/ProfileEducationCard.vue';

import { eventBus } from "../../../Services/EvenBus";

import { decodeToken } from "../../../Services/JWT/JwtDecode";
import { getProfileUser } from "../../../Services/Api/UserService";

export default {
  setup() {
    const showModalExperience = ref(false);
    const showModalProfile = ref(false);
    const showModalEducation = ref(false);
    const showModalSkill = ref(false);
    const showModalCertificate = ref(false);
    const showModalCardProfile = ref(false);
    const id = ref("");
    const dataProfile = ref([]);
    const email = ref("");

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    eventBus.on("profileUpdated", fetchProfileUser);
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
      fetchProfileUser();
    });
    return {
      id,
      dataProfile,
      fetchProfileUser,
      getUserId,
      email,
      showModalExperience,
      showModalProfile,
      showModalEducation,
      showModalSkill,
      showModalCertificate,
      showModalCardProfile,
    };
  },
  components: {
    EducationCard,
    ModalEditProfile,
    ModalAddExperience,
    ModalAddEducation,
    ModalAddSkill,
    ModalAddCertificate,
    ModalEditCardProfile,ExperienceCard
  },
};
</script>

<style lang="scss" scoped></style>
