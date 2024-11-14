<template>
  <div v-if="dataSaveJobs.length < 1" class="grid place-items-center h-screen text-center flex-grow">
  <div class="flex flex-col items-center">
    <img
      src="../../../assets/images/notFound.png"
      alt="Not Found"
      class="w-60 md:w-72 mb-4" 
    />
    <p class="text-xl text-gray-700 font-bold">No Saved Jobs.</p>
  </div>
</div>


  <div v-else class="py-6 flex-grow">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 pb-6">
      <!-- Job Card 1 -->
      <routerLink
        v-for="(job, index) in dataSaveJobs"
        :key="job.jobId"
        :to="{ name: 'Jobs', params: { id: job.jobId } }"
        class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <div class="flex items-center justify-center mb-2">
          <div>
            <h2 class="text-xl font-bold text-gray-700">
              {{ job.jobTitle }}
            </h2>
          </div>
        </div>

        <!-- Garis horizontal di bawah h2 -->
        <div class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"></div>

        <div class="text-sm text-gray-600 space-y-2">
          <p>
            <i class="fas fa-user-clock text-purple-500"></i>
            <span class="text-purple-500"> {{ job.jobType }}</span>
          </p>
          <p><i class="fas fa-map-marker-alt"></i> {{ job.jobLocation }}</p>
          <p><i class="fas fa-briefcase"></i> {{ job.jobRequirement }}</p>
          <p><i class="fas fa-dollar-sign"></i> {{ job.jobSalary }}</p>
        </div>

        <div class="mt-4">
          <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
            Rekruter aktif 1 jam lalu
          </span>
        </div>
      </routerLink>
    </div>
  </div>
</template>



<script>
import { getSaveJob } from '../../../Services/Api/UserService';
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { decodeToken } from "../../../Services/JWT/JwtDecode";

export default {
  setup() {
    const isSaved = ref(true);
    const id = ref("");
    const dataSaveJobs = ref([]);

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
        console.log("User ID:", id.value);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const fetchSavedJobs = async () => {
      try {
        const data = await getSaveJob(id.value);
        dataSaveJobs.value = data.data;
        console.log("Saved jobs:", dataSaveJobs.value);
      } catch (error) {
        console.error(error)
      }
    };

    onMounted(async () => {
      await getUserId();  
        await fetchSavedJobs();
      
    });

    return {
      id,
      isSaved,
      dataSaveJobs,
    };
  }
};
</script>


<style lang="scss" scoped>

</style>