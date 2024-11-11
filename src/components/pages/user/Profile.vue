<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Profile Card -->
      <div class="bg-white p-6 rounded-lg shadow-md h-96 md:col-span-4  border-t-4 border-primary">
        <div class="text-center">
          <img
            alt="Profile picture of John Doe"
            class="w-24 h-24 mx-auto rounded-full"
            height="100"
            src="https://storage.googleapis.com/a1aa/image/EAszZfc2DORhC69L8qU6XOAvuejiWJUqZVkwvRgeGteFQXfdC.jpg"
            width="100"
          />
          <h2 class="text-xl font-semibold mt-4">John Doe</h2>
          <p class="text-gray-600">Full Stack Developer</p>
          <p class="text-gray-600">Bay Area, San Francisco, CA</p>
          <div class="mt-4">
            <button
              class="bg-gray-300 hover:bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded-md"
            >
              Edit Profile Picture
            </button>
          </div>
        </div>
        <div class="mt-6">
          <ul class="space-y-4">
            <li class="flex items-center">
              <i class="fas fa-globe text-gray-600"></i>
              <span class="ml-2">Website</span>
              <span class="ml-auto text-gray-600">https://bootdey.com</span>
            </li>
            <li class="flex items-center">
              <i class="fab fa-github text-gray-600"></i>
              <span class="ml-2">Github</span>
              <span class="ml-auto text-gray-600">bootdey</span>
            </li>
          </ul>
        </div>
      </div>
      

      <!-- Profile Details -->
      <div class="bg-white p-6 rounded-lg shadow-md md:col-span-8 border-t-4 border-primary">
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
      @click="showModal = true"
      class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
    >
      Edit Profile
    </button>
    
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
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
            
          </div>

          <!-- Education -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Education</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          </div>

          <!-- Skill -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Skill</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          </div>

          <!-- Certificate -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold text-gray-600">Certificate</h3>
            <div class="mt-4"></div>
            <div class="mt-6 text-end">
              <button
                class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- modal edit prfile -->
    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <!-- Modal Container -->
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-xl font-semibold text-gray-700">Edit Profile</h3>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        
        <!-- Modal Body (Form) -->
        <div class="mt-4">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
          </form>
        </div>
        
        <!-- Modal Footer -->
        <div class="mt-6 flex justify-end space-x-4">
          <button @click="showModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">Close</button>
          <button @click="submitForm" class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      formData: {
        name: '',
        email: '',
      },
    };
  },
  methods: {
    submitForm() {
      alert(`Name: ${this.formData.name}\nEmail: ${this.formData.email}`);
      this.showModal = false; // Close modal after submitting
    },
  },
};
</script>

<style lang="scss" scoped></style>
