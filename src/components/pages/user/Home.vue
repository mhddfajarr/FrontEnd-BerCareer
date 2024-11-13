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
        <p><i class="fas fa-dollar-sign"></i> {{ job.salary }}</p>
      </div>

      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>

      <div class="absolute top-0 right-0 p-3" @click="saveJob(job.jobId)">
        <i :class="isSavedJob(job.jobId) ? 'fas fa-bookmark text-primary' : 'far fa-bookmark text-gray-400'"></i>
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
import { getAllData, getSaveJob } from "../../../Api/UserService";

export default {
  name: "Home",
  data() {
    return {
      id: '01JCGB585KS3T00C2QR2Z5PCSF', // Menetapkan id secara langsung
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwMUpDR0I1ODVLUzNUMDBDMlFSMlo1UENTRiIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJtaGRkZmFqYXJAZ21haWwuY29tIiwibmJmIjoxNzMxNDYyNTk0LCJleHAiOjE3MzE0NjYxOTQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxNDciLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MTQ3In0.0co_fBAkHwRoZBFbDTJbSVGHNBmeCRACSvz_w-B0e4o"
, // Menetapkan token secara langsung
      searchQuery: "",
      jobs: [], // State untuk menyimpan data jobs
      visibleJobs: [], // State untuk menampilkan pekerjaan yang terlihat
      itemsToShow: 6, // Jumlah item yang ditampilkan setiap kali tombol "Show More" diklik
      savedJobs: [] // State untuk menyimpan pekerjaan yang disimpan
    };
  },
  computed: {
    // Cek apakah job sudah disimpan
    isSavedJob() {
      return (jobId) => {
        return this.savedJobs.some(savedJob => savedJob.jobId === jobId);
      };
    },
    // Filter jobs berdasarkan search query
    filteredJobs() {
      if (!this.searchQuery) {
        return this.jobs; // Kembalikan semua item jika tidak ada query pencarian
      }
      return this.jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || // Cocokkan title pekerjaan
          job.description.toLowerCase().includes(this.searchQuery.toLowerCase()) // Cocokkan deskripsi pekerjaan
      );
    },
    // Tampilkan jobs yang sudah difilter sesuai dengan jumlah yang terlihat
    filteredVisibleJobs() {
      return this.filteredJobs.slice(0, this.visibleJobs.length); // Menampilkan pekerjaan yang difilter sesuai jumlah yang terlihat
    },
    // Menampilkan tombol "Show More" jika masih ada pekerjaan yang bisa ditampilkan
    showMoreButton() {
      return this.filteredJobs.length > this.visibleJobs.length;
    },
  },
  async mounted() {
    try {
      // Mendapatkan semua data pekerjaan
      const data = await getAllData();
      this.jobs = data.data; // Menyimpan data pekerjaan ke dalam state jobs
      this.visibleJobs = this.jobs.slice(0, this.itemsToShow); // Menampilkan hanya 6 pekerjaan pertama
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      // Mendapatkan pekerjaan yang sudah disimpan oleh user
      const data = await getSaveJob(this.id, this.token);
      this.savedJobs = data.data; // Menyimpan data pekerjaan yang disimpan
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
    }
  },
  methods: {
    // Fungsi untuk memuat lebih banyak pekerjaan
    loadMore() {
      const nextItems = this.filteredJobs.slice(
        this.visibleJobs.length,
        this.visibleJobs.length + this.itemsToShow
      );
      this.visibleJobs = [...this.visibleJobs, ...nextItems]; // Menambahkan pekerjaan baru ke visibleJobs
    },
    // Fungsi untuk menyimpan pekerjaan
    saveJob(jobId) {
      // Cek jika pekerjaan sudah ada di daftar yang disimpan, jika belum simpan pekerjaan
      if (!this.isSavedJob(jobId)) {
        // Lakukan aksi simpan pekerjaan, misalnya dengan API untuk menyimpan job
        console.log(`Pekerjaan ${jobId} disimpan.`);
        this.savedJobs.push({ jobId }); // Menambahkan job ke daftar yang disimpan (update state savedJobs)
      } else {
        console.log(`Pekerjaan ${jobId} sudah disimpan.`);
      }
    },
    scrollToSection() {
      const section = this.$refs.sectionCard;
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
  },
};
</script>


