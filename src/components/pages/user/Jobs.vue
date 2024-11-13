<template>
  <Breadcrumbs />
  <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 py-5 px-5">
    <!-- Kolom 1: Card Utama dan Deskripsi Pekerjaan -->
    <div class="w-full lg:w-2/3">
      <!-- Card Utama -->
      <div
        class="bg-white rounded-lg shadow-md p-6 border-t-4 border-t-primary"
      >
        <div class="flex items-center mb-4">
          <!-- <img
            alt="Company logo"
            class="w-12 h-12 rounded-full mr-4"
            src="../../../assets/images/logo-berca.png"
            width="50"
            height="50"
          /> -->
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-700">
              {{ jobs.title }}
            </h1>
          </div>
        </div>
        <hr class="my-4" />
        <div class="mb-4">
          <div class="flex items-center text-gray-600 mb-2">
            <i class="fas fa-briefcase mr-2"></i>
            <span>{{ jobs.type }}</span>
          </div>
          <div class="flex items-center text-gray-600 mb-2">
            <i class="fas fa-map-marker-alt mr-2"></i>
            <span>{{ jobs.location }}</span>
          </div>
          <div class="flex items-center text-gray-600 mb-2">
            <i class="fas fa-briefcase mr-2"></i>
            <span>{{ jobs.requirement }}</span>
          </div>
          <div class="flex items-center text-gray-600">
            <i class="fas fa-money-bill-wave mr-2"></i>
            <span>{{ jobs.salary }}</span>
          </div>
        </div>

        <div class="flex items-center mb-7 mt-7">
          <button
            class="bg-primary hover:bg-primaryHover font-semibold text-white px-4 py-2 rounded-lg mr-2"
          >
            Apply
          </button>
          <button v-if="!isSaved"
            class="bg-gray-300 hover:bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded-lg mr-2"
          @click="saveJob(jobs.jobId)"
            >
            Save Job
          </button>
          <button v-if="isSaved"
            class="bg-gray-300 hover:bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded-lg mr-2"
          @click="deleteSaveJob(jobs.jobId)"
            >
            Remove from favorite
          </button>
        </div>

        <hr class="my-4" />

        <!-- Card Deskripsi Pekerjaan -->
        <div class="text-gray-700">
          <h2 class="text-xl font-bold mb-4">Description</h2>
          <p class="mb-4">
            {{ jobs.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Kolom 2: Card Benefit Perusahaan -->
    <div
      class="w-full lg:w-1/3 bg-white p-4 text-gray-700 shadow-md rounded-lg max-h-[250px] overflow-y-auto sticky top-0 border-t-4 border-primary"
    >
      <h2 class="text-lg font-bold mb-4">Benefit Perusahaan</h2>
      <hr class="my-4" />
      <ul>
        <li class="flex items-center mb-2">
          <i class="fas fa-dollar-sign text-gray-600 mr-2"></i>
          <span>Competitive Salary</span>
        </li>
        <li class="flex items-center mb-2">
          <i class="fas fa-medkit text-gray-600 mr-2"></i>
          <span>Medical Insurance</span>
        </li>
        <li class="flex items-center">
          <i class="fas fa-gift text-gray-600 mr-2"></i>
          <span>THR / Bonus system</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "../../User/Breadcrumbs.vue";
import { deleteSaveJobs, getJobsById, saveJobs, getSaveJob } from "../../../Api/UserService";
import Swal from "sweetalert2";

export default {
  components: {
    Breadcrumbs,
  },
  data() {
    return {
      id: '01JCGB585KS3T00C2QR2Z5PCSF', 
      jobs: [], 
      savedJob: [], // To store the fetched saved jobs
      isSaved: false,
      getJobId: this.$route.params.id,  // Job ID from the URL
    };
  },
  methods: {
    // Method untuk menyimpan pekerjaan
    async saveJob(jobId) {
      try {
        const data = {
          userId: this.id,
          jobId: jobId
        };
        console.log('Data yang dikirim:', data);
        await saveJobs(data);
        this.isSaved = true;
        Swal.fire({
          toast: true,
          position: "top-end", // Posisi di pojok kanan atas
          icon: "success",
          title: "Success add job to favorite!",
          showConfirmButton: false,
          timer: 1500, // Menampilkan toast selama 1.5 detik
          timerProgressBar: true
        });
      } catch (error) {
        console.error('Gagal menyimpan pekerjaan:', error);
      }
    },

    // Method to fetch saved jobs for the user
    async fetchSavedJobs() {
      try {
        const data = await getSaveJob(this.id);  // Get saved jobs for the user
        this.savedJob = data.data;  // Store the fetched data

        // Check if the current jobId exists in the saved jobs
        const jobExists = this.savedJob.some(job => job.jobId === this.getJobId);

        // If jobId exists in saved jobs, set isSaved to true
        if (jobExists) {
          this.isSaved = true;
        }

        console.log(this.savedJob);  // Log the saved jobs data
      } catch (error) {
        console.error("Error fetching saved jobs:", error);  // Handle errors
      }
    },

    // Method untuk menghapus pekerjaan yang disimpan
    async deleteSaveJob(jobId) {
      try {
        const data = {
          userId: this.id,
          jobId: jobId
        };
        console.log('Data yang dikirim:', data);
        await deleteSaveJobs(data);
        this.isSaved = false;
        Swal.fire({
          toast: true,
          position: "top-end", // Posisi di pojok kanan atas
          icon: "success",
          title: "Success delete job!",
          showConfirmButton: false,
          timer: 1500, // Menampilkan toast selama 1.5 detik
          timerProgressBar: true
        });
      } catch (error) {
        console.error('Gagal menyimpan pekerjaan:', error);
      }
    },

    // Method untuk mengambil detail pekerjaan
    async fetchJobDetail() {
      try {
        const jobId = this.getJobId;  // Mengambil jobId dari URL
        const data = await getJobsById(jobId);  // Mengambil data pekerjaan berdasarkan jobId
        this.jobs = data.data; // Menyimpan data ke dalam state jobs
        console.log(this.jobs);
      } catch (error) {
        console.error("Error fetching data:", error); // Menangani error jika gagal mengambil data
      }
    },
  },
  mounted() {
    window.scrollTo({
      top: 0,  // Mengatur scroll ke posisi atas
      behavior: 'smooth',  // Menambahkan efek smooth scroll
    });
  },
  created() {
    console.log('Job ID:', this.$route.params.id);  // Menampilkan ID dari URL di console
    this.fetchJobDetail();  // Memanggil fetchJobDetail saat komponen dibuat
    this.fetchSavedJobs();  // Memanggil fetchSavedJobs untuk memeriksa pekerjaan yang disimpan
  },
};
</script>





<style lang="scss" scoped></style>
