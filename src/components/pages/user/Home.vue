<template>
  <div class="relative bg-gray-800 text-white h-80 mb-5">
    <img
      src="https://images.pexels.com/photos/6858314/pexels-photo-6858314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Job Seek"
      class="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <div class="relative flex flex-col items-center justify-center h-full p-4">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">Find Your Dream Job</h1>
      <!-- <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ authUser.email }}</h1> -->
      <p class="text-lg px-4 sm:text-xl mb-6">
        Discover countless career opportunities and secure your ideal position.
        Let's grow and thrive together at Berca.
      </p>
      <p>{{ auth0User }}</p>
      <div class="mb-5 px-6 py-3 text-center">
        <!-- Form content -->
        <div
          class="hidden md:flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Type your dream Role"
            class="w-full sm:w-[350px] text-gray-500 bg-white px-4 py-2 rounded-xl border-2"
          />
          <select
            class="w-full sm:w-[250px] bg-white text-gray-500 px-4 py-2 rounded-xl border-2"
          >
            <option>Location</option>
          </select>
          <button
            class="w-full sm:w-[200px] bg-primary text-white px-6 py-2 hover:bg-primaryHover rounded-xl"
            @click="scrollToSection"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="px-5 py-2 mb-4">
    <div
      class="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 md:hidden"
    >
      <input
        type="text"
        placeholder="Type your dream Role"
        v-model="searchQuery"
        class="w-full text-gray-400 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
      />
      <select
        class="w-full text-gray-400 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
      >
        <option>Location</option>
      </select>
    </div>
  </div>

  <div v-if="filteredJobs.length === 0 && searchQuery.length > 0">
    <div class="flex justify-center p-7 items-center h-80">
      <div
        class="bg-white rounded-lg shadow-md text-center w-full h-full flex justify-center items-center"
      >
        <p class="text-xl px-5 md:text-2xl font-bold text-gray-500">
          "Sorry, No jobs are available for this position at the moment"
        </p>
      </div>
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 pb-6"
    id="sectionCard"
    ref="sectionCard"
  >
    <!-- Job Card -->
    <router-link
      v-for="(job, index) in filteredVisibleJobs"
      :key="job.jobId"
      :to="{ name: 'Jobs', params: { id: job.jobId } }"
      class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary"
    >
      <div class="flex items-center justify-center mb-2">
        <div>
          <h2 class="text-xl font-bold text-gray-700">{{ job.title }}</h2>
        </div>
      </div>

      <!-- Garis horizontal di bawah h2 -->
      <div class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"></div>

      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i>
          <span class="text-purple-500">{{ job.type }}</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> {{ job.location }}</p>
        <p>
          <i class="fas fa-briefcase"></i> {{ job.experience }} years of
          experience
        </p>
        <p><i class="fas fa-money-bill-wave mr-2"></i> {{ job.salary }}</p>
      </div>

      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>

      <div class="absolute top-0 right-0 p-3" @click="saveJob(job.jobId)">
        <i
          :class="
            isSavedJob(job.jobId)
              ? 'fas fa-bookmark text-primary'
              : 'far fa-bookmark text-gray-400'
          "
        ></i>
      </div>
    </router-link>
  </div>

  <!-- Show More Button -->
  <div
    v-if="showMoreButton"
    class="relative w-full flex items-center justify-center mb-10"
  >
    <div class="flex-grow border-t-2 ml-10 border-primary"></div>
    <div class="mx-4">
      <button
        @click="loadMore"
        class="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-full shadow-lg border-2 transition duration-300 ease-in-out opacity-85 hover:opacity-100 flex items-center group"
      >
        See More
        <i
          class="fas fa-caret-left ml-2 transition-transform duration-300 group-hover:-rotate-90"
        ></i>
      </button>
    </div>
    <div class="flex-grow border-t-2 mr-10 border-primary"></div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import Swal from "sweetalert2";
import { getAllData, getSaveJob } from "../../../Services/Api/UserService";
import { useAuth0 } from "@auth0/auth0-vue";

export default {
  name: "Home",
  setup() {
    // State declarations using ref and reactive
    const id = ref("01JCGB585KS3T00C2QR2Z5PCSF");
    const token = localStorage.getItem("authToken");
    const searchQuery = ref("");
    const jobs = ref([]);
    const visibleJobs = ref([]);
    const itemsToShow = ref(6);
    const savedJobs = ref([]);
    let auth0User = ref("");

    // console.log(auth0);
    // Computed properties
    const isSavedJob = computed(() => {
      return (jobId) => {
        return savedJobs.value.some((savedJob) => savedJob.jobId === jobId);
      };
    });

    const filteredJobs = computed(() => {
      if (!searchQuery.value) {
        return jobs.value; // Return all items if there is no search query
      }
      return jobs.value.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
      );
    });

    const filteredVisibleJobs = computed(() => {
      return filteredJobs.value.slice(0, visibleJobs.value.length);
    });

    const showMoreButton = computed(() => {
      return filteredJobs.value.length > visibleJobs.value.length;
    });

    // Mounted lifecycle hook
    onMounted(async () => {
      try {
        const auth0 = await useAuth0();
        auth0User = auth0.user;
        console.log(auth0User.value.email);
        const data = await getAllData();
        jobs.value = data.data;
        visibleJobs.value = jobs.value.slice(0, itemsToShow.value); // Show only the first 6 jobs
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      if (token) {
        try {
          const data = await getSaveJob(id.value);
          savedJobs.value = data.data; // Store saved jobs data
        } catch (error) {
          console.error("Error fetching saved jobs:", error);
        }
      }
    });

    // Methods
    const loadMore = () => {
      const nextItems = filteredJobs.value.slice(
        visibleJobs.value.length,
        visibleJobs.value.length + itemsToShow.value
      );
      visibleJobs.value = [...visibleJobs.value, ...nextItems]; // Add new jobs to visibleJobs
    };

    const saveJob = (jobId) => {
      if (!isSavedJob.value(jobId)) {
        console.log(`Pekerjaan ${jobId} disimpan.`);
        savedJobs.value.push({ jobId });
      } else {
        console.log(`Pekerjaan ${jobId} sudah disimpan.`);
      }
    };

    const scrollToSection = () => {
      const section = document.querySelector("#sectionCard");
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    // Return the state, computed properties, and methods for the template
    return {
      id,
      token,
      searchQuery,
      jobs,
      visibleJobs,
      itemsToShow,
      savedJobs,
      isSavedJob,
      filteredJobs,
      filteredVisibleJobs,
      showMoreButton,
      loadMore,
      saveJob,
      scrollToSection,
      auth0User,
    };
  },
};
</script>
