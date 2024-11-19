<template>
  <div class="relative bg-gray-800 text-white h-80 mb-5">
    <img
      src="https://images.pexels.com/photos/6858314/pexels-photo-6858314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      alt="Job Seek"
      class="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <div class="relative flex flex-col items-center justify-center h-full p-4">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">Find Your Dream Job</h1>
      <p class="text-lg px-4 sm:text-xl mb-6">
        Discover countless career opportunities and secure your ideal position.
        Let's grow and thrive together at Berca.
      </p>
      <div class="mb-5 px-6 py-3 text-center">
        <!-- Form content -->
        <div
          class="hidden md:flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Type your dream Role"
            class="w-56 text-gray-700 px-2 text-md rounded-md border-2 bg-white focus:border-gray-400"
          />

          <v-select
            v-model="selectedProvince"
            :options="provinces"
            label="name"
            placeholder="Pilih Lokasi"
            class="w-56 text-gray-500 text-md rounded-md border-2 bg-white focus:border-none"
          />

          <button
            class="w-full sm:w-[180px] bg-primary font-semibold text-white px-5 py-1 text-sm hover:bg-primaryHover rounded-md"
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
        class="py-1 text-gray-700 px-2 text-md rounded-md border-4 bg-white"
      />
      <v-select
        v-model="selectedProvince"
        :options="provinces"
        label="name"
        placeholder="Pilih Lokasi"
        class="w-full text-gray-500 text-md rounded-md border-2 bg-white"
      />
    </div>
  </div>

  <div
    v-if="
      filteredJobs.length === 0 && (searchQuery.length > 0 || selectedProvince)
    "
  >
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
      v-for="(job, index) in paginatedJobs"
      :key="job.jobId"
      v-model="selectedProvince"
      :to="{ name: 'Jobs', params: { id: job.jobId } }"
      class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary"
    >
      <!-- <div
        v-if="job.isApplied"
        class="absolute top-0 left-0 bg-blue-100 text-gray-500 text-xs font-semibold italic px-4 py-2 rounded-tl-lg rounded-br-lg flex items-center"
      >
        Applied
      </div> -->
      <div
        v-if="job.isApplied"
        class="absolute top-2 left-2 bg-green-100 text-green-500 text-xs font-semibold italic px-2 py-1 rounded-full flex items-center"
      >
        Applied
      </div>

      <div class="flex items-center justify-center mb-2">
        <div>
          <h2 class="text-xl font-bold text-gray-700">{{ job.title }}</h2>
        </div>
      </div>

      <!-- Garis horizontal di bawah h2 -->
      <div class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"></div>

      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock mr-1"></i>
          <span class="">{{ job.type }}</span>
        </p>
        <p><i class="fas fa-map-marker-alt mr-2"></i> {{ job.location }}</p>
        <p><i class="fas fa-briefcase mr-1"></i> {{ job.requirement }}</p>
        <p><i class="fas fa-money-bill-wave mr-1"></i> {{ job.salary }}</p>
      </div>
      <hr class="mt-4 mb-2" />
      <div class="flex justify-between items-center">
        <span
          class="ml-auto italic text-gray-600 text-xs px-2 py-1 rounded-full"
        >
          Posted On {{ job.postDate }}
        </span>
      </div>

      <!-- Tombol bookmark di dalam router-link dengan @click.stop -->
      <div class="absolute top-0 right-0 p-3" @click.stop="saveJob(job.jobId)">
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
  <!-- Pagination Controls -->
  <div class="relative w-full flex items-center justify-center space-x-4 mb-10">
  <!-- Previous Button -->
  <button
    @click="prevPage(); scrollToSection()"
    :disabled="currentPage === 1"
    class="bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  <span class="text-gray-700 font-medium">
    Page {{ currentPage }} of {{ totalPages }}
  </span>

  <button
    @click="nextPage(); scrollToSection()"
    :disabled="currentPage === totalPages"
    class="bg-primary hover:bg-primaryHover text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Next
  </button>

  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import {
  getAllData,
  getSaveJob,
  getApplyUser,
} from "../../../Services/Api/UserService";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment";

export default {
  components: {
    vSelect, 
  },
  name: "Home",
  setup() {
    const id = ref("");
    const token = localStorage.getItem("authToken");
    const searchQuery = ref("");
    const jobs = ref([]);
    const selectedProvince = ref(null);
    const visibleJobs = ref([]);
    const itemsToShow = ref(9);
    const savedJobs = ref([]);
    const appliedJobs = ref([]);
    const provinces = [
      { id: "1", name: "Jakarta" },
      { id: "2", name: "Bogor" },
      { id: "3", name: "Depok" },
      { id: "4", name: "Tanggerang" },
      { id: "5", name: "Bekasi" },
    ];
   
    const currentPage = ref(1);
    const itemsPerPage = ref(9);

    const totalPages = computed(() => {
      return Math.ceil(filteredJobs.value.length / itemsPerPage.value);
    });

    const paginatedJobs = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      return filteredJobs.value.slice(start, start + itemsPerPage.value);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
  
    const isSavedJob = computed(() => {
      return (jobId) => {
        return savedJobs.value.some((savedJob) => savedJob.jobId === jobId);
      };
    });

    const filteredJobs = computed(() => {
      return jobs.value.filter((job) => {
        const matchesSearchQuery = job.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
        const matchesProvince =
          !selectedProvince.value ||
          job.location
            .toLowerCase()
            .includes(selectedProvince.value.name.toLowerCase());

        return matchesSearchQuery && matchesProvince;
      });
    });

    const filteredVisibleJobs = computed(() => {
      return filteredJobs.value.slice(0, visibleJobs.value.length);
    });

    const showMoreButton = computed(() => {
      return filteredJobs.value.length > visibleJobs.value.length;
    });

    const fetchJobs = async () => {
      try {
        const data = await getAllData();
        jobs.value = data.data;
        console.log(jobs);
        jobs.value.forEach((job) => {
          if (job.postDate) {
            job.postDate = moment(job.postDate).format("MMMM DD, YYYY");
          }
          if (job.dueDate) {
            job.dueDate = moment(job.dueDate).format("MMMM DD, YYYY");
          }
        });

        // Remove jobs with past due dates
        const today = new Date();
        jobs.value = jobs.value.filter((job) => {
          const dueDate = moment(job.dueDate, "MMMM DD, YYYY").toDate();
          return dueDate >= today;
        });

        // Set isApplied for each job based on appliedJobs
        jobs.value = jobs.value.map((job) => {
          return {
            ...job,
            isApplied: appliedJobs.value.some(
              (appliedJob) => appliedJob.jobId === job.jobId
            ),
          };
        });

        visibleJobs.value = jobs.value.slice(0, itemsToShow.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
        console.log(id.value);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const fetchSavedJob = async () => {
      try {
        const data = await getSaveJob(id.value);
        savedJobs.value = data.data;
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    const fetchAppliedJob = async () => {
      try {
        const data = await getApplyUser(id.value);
        appliedJobs.value = data.data;
        console.log(appliedJobs.value);

        jobs.value = jobs.value.map((job) => {
          return {
            ...job,
            isApplied: appliedJobs.value.some(
              (appliedJob) => appliedJob.jobId === job.jobId
            ),
          };
        });
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    // Mounted lifecycle hook
    onMounted(async () => {
      await fetchJobs();
      await fetchUserId();
      await fetchSavedJob();
      await fetchAppliedJob();
    });

    // Methods
    // const loadMore = () => {
    //   const nextItems = filteredJobs.value.slice(
    //     visibleJobs.value.length,
    //     visibleJobs.value.length + itemsToShow.value
    //   );
    //   visibleJobs.value = [...visibleJobs.value, ...nextItems]; // Add new jobs to visibleJobs
    // };

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
      appliedJobs,
      isSavedJob,
      filteredJobs,
      filteredVisibleJobs,
      showMoreButton,
      saveJob,
      scrollToSection,
      selectedProvince,
      provinces,
      currentPage,
      totalPages,
      paginatedJobs,
      nextPage,
      prevPage,
    };
  },
};
</script>
