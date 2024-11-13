<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Profile Card -->
      <div
        class="bg-white px-6 rounded-lg shadow-md h-auto md:col-span-4 border-t-4 border-primary"
      >
        <div class="flex justify-center px-3 py-2">
          <h1 class="text-xl font-bold text-gray-700">Card Profile</h1>
        </div>
        <!-- Garis dibawah tulisan -->
        <hr class="border-t-1 border-gray-200 my-1 mx-auto w-full mb-4" />
        <div class="text-center">
          <img
            alt="Profile picture of John Doe"
            class="w-28 h-28 mx-auto rounded-full"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/EAszZfc2DORhC69L8qU6XOAvuejiWJUqZVkwvRgeGteFQXfdC.jpg"
            width="100"
          />
          <h2 class="text-xl font-semibold mt-4 text-gray-700">John Doe</h2>
          <p class="text-gray-600">Full Stack Developer</p>
          <p class="text-gray-600">Bay Area, San Francisco, CA</p>
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
        class="bg-white px-6 rounded-lg shadow-md md:col-span-8 border-t-4 border-primary"
      >
      <div class="flex justify-center ">
          <h1 class="text-xl font-bold text-gray-700 px-3 py-2">Profile</h1>
        </div>

        <hr class="border-t-1 border-gray-200 my-1 mx-auto w-full mb-4" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Full Name</h3>
            <p class="text-gray-500">Kenneth Valdez</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Email</h3>
            <p class="text-gray-500">fip@jukmuh.al</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Phone</h3>
            <p class="text-gray-500">(239) 816-9029</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Gender</h3>
            <p class="text-gray-500">Female</p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-6 mt-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-700">About Me</h3>
            <p class="text-gray-500">
              "Saya adalah seorang profesional yang memiliki pengalaman lebih
              dari 5 tahun di bidang pengembangan perangkat lunak, dengan
              spesialisasi dalam pengembangan aplikasi web dan API menggunakan
              teknologi terkini seperti ASP.NET Core, Vue.js, dan Tailwind CSS.
              Saya berkomitmen untuk terus belajar dan mengembangkan
              keterampilan teknis, serta berkolaborasi dalam tim untuk
              menciptakan solusi yang inovatif dan efisien. Selain itu, saya
              juga memiliki minat dalam desain antarmuka pengguna yang intuitif
              dan fokus pada pengalaman pengguna yang optimal. Di luar
              pekerjaan, saya senang mengeksplorasi tren teknologi terbaru dan
              berbagi pengetahuan dengan komunitas pengembang."
            </p>
          </div>
        </div>
        <div class="mt-6 text-end">
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
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Experience</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                @click="showModalExperience = true"
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Add Experience
              </button>
              <ModalAddExperience
                v-if="showModalExperience"
                :showModal="showModalExperience"
                @close="showModalExperience = false"
              />
            </div>
          </div>

          <!-- Education -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Education</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                @click="showModalEducation = true"
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Add Education
              </button>
              <ModalAddEducation
                v-if="showModalEducation"
                :showModal="showModalEducation"
                @close="showModalEducation = false"
              />
            </div>
          </div>

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
import ModalAddExperience from "../../User/ModalAddExperience.vue";
import ModalEditProfile from "../../User/ModalAddProfile.vue";
import ModalAddEducation from "../../User/ModalAddEducation.vue";
import ModalAddSkill from "../../User/ModalAddSkill.vue";
import ModalAddCertificate from "../../User/ModalAddCertificate.vue";
import ModalEditCardProfile from "../../User/ModalEditCardProfile.vue";

export default {
  data() {
    return {
      showModalExperience: false,
      showModalProfile: false,
      showModalEducation: false,
      showModalSkill: false,
      showModalCertificate: false,
      showModalCardProfile: false,
    };
  },
  methods: {},
  components: {
    ModalEditProfile,
    ModalAddExperience,
    ModalAddEducation,
    ModalAddSkill,
    ModalAddCertificate,
    ModalEditCardProfile,
  },
};
</script>

<style lang="scss" scoped></style>
