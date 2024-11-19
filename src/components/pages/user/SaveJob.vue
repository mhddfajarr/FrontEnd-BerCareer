<template>
  <div
    v-if="dataSaveJobs.length < 1"
    class="grid place-items-center h-screen text-center flex-grow"
  >
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
      <!-- Job Card -->
      <router-link
        v-for="(job, index) in dataSaveJobs"
        :key="job.jobId"
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
            <h2 class="text-xl font-bold text-gray-700">{{ job.jobTitle }}</h2>
          </div>
        </div>

        <!-- Garis horizontal di bawah h2 -->
        <div
          class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"
        ></div>

        <div class="text-sm text-gray-600 space-y-2">
          <p>
            <i class="fas fa-user-clock mr-1"></i>
            <span class="">{{ job.jobType }}</span>
          </p>
          <p><i class="fas fa-map-marker-alt"></i> {{ job.jobLocation }}</p>
          <p><i class="fas fa-briefcase"></i> {{ job.jobRequirement }}</p>
          <p><i class="fas fa-money-bill-wave mr-1"></i> {{ job.jobSalary }}</p>
        </div>
        <hr class="mt-4 mb-2" />
        <div class="flex justify-between items-center">
          <span
            class="ml-auto italic text-gray-600 text-xs px-2 py-1 rounded-full"
          >
            <div v-if="job.isExpire">
              <span class="text-red-500">This job is expired</span>
            </div>
            <div v-else>Posted On {{ job.postDate }}</div>
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getSaveJob } from "../../../Services/Api/UserService";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import moment from "moment";

export default {
  setup() {
    const isSaved = ref(true);
    const id = ref("");
    const dataSaveJobs = ref([]);
    const isExpired = ref(false);

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const fetchSavedJobs = async () => {
      try {
        const data = await getSaveJob(id.value);
        dataSaveJobs.value = data.data;
        dataSaveJobs.value.forEach((job) => {
          if (job.postDate) {
            job.postDate = moment(job.postDate).format("MMMM DD, YYYY");
          }
          if (job.dueDate) {
            job.dueDate = moment(job.dueDate).format("MMMM DD, YYYY");
          }
          const dueDate = moment(job.dueDate, "MMMM DD, YYYY").toDate();
          const today = new Date();
          job.isExpire = dueDate < today;
        });
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      await getUserId();
      await fetchSavedJobs();
      console.log(dataSaveJobs);
    });

    return {
      id,
      isSaved,
      dataSaveJobs,
      isExpired,
    };
  },
};
</script>

<style lang="scss" scoped></style>
