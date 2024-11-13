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
            src="https://storage.googleapis.com/a1aa/image/Gt5zcQPIZtLMOlNzeTYeL95S9R0UOEiaMI1gYmZ2aZ8cgyvTA.jpg"
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
          <button
            class="bg-gray-300 hover:bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded-lg mr-2"
          @click="saveJob(jobs.jobId)"
            >
            Save Job
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded-lg mr-2"
          @click="saveJob(jobs.jobId)"
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
import { getJobsById } from "../../../Services/Api/UserService";
import { saveJobs } from '../../../Services/Api/UserService';
import { reactive } from 'vue';
import Swal from "sweetalert2";

export default {
  components: {
    Breadcrumbs,
  },
  setup(){
    // State reaktif untuk menyimpan id dan token
    const state = reactive({
      id: '01JCGB585KS3T00C2QR2Z5PCSF', // Menetapkan id secara langsung
      // Menetapkan token secara langsung
    });

    // Method untuk menyimpan pekerjaan
    const saveJob = async (jobId) => {
  try { // Log token untuk memastikan
    
    
    const data = {
      userId: state.id,
      jobId: jobId
    };
    console.log('Data yang dikirim:', data);
    await saveJobs(data);
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
};


    return {
      ...state,
      saveJob // Mengembalikan method untuk digunakan di template
    };
  },
  data() {
    return {
      buttonSaveJob: true,
      jobs: [], 
    };
  },
  mounted(){
    window.scrollTo({
      top: 0,  // Mengatur scroll ke posisi atas
      behavior: 'smooth',  // Menambahkan efek smooth scroll
    });
  },
  created() {
    
    console.log('Job ID:', this.$route.params.id);  // Menampilkan ID dari URL di console
    this.fetchJobDetail();  // Memanggil fetchJobDetail saat komponen dibuat
  },
  methods: {
    async fetchJobDetail() {
      try {
        const jobId = this.$route.params.id;  // Mengambil jobId dari URL
        const data = await getJobsById(jobId);  // Mengambil data pekerjaan berdasarkan jobId
        this.jobs = data.data; // Menyimpan data ke dalam state jobs
        console.log(this.jobs)
      } catch (error) {
        console.error("Error fetching data:", error); // Menangani error jika gagal mengambil data
      }
    },
  },
};
</script>



<style lang="scss" scoped></style>
