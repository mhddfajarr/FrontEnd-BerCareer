<template>
  <div
    v-if="applyJobArray.length < 1"
    class="flex flex-col justify-center items-center h-full text-center mt-28 mb-36 md:mb-28 md:mt-6"
  >
    <img
      src="../../../assets/images/noItem.png"
      alt="Not Found"
      class="w-48 mt-10 h-auto"
    />
    <p class="text-md md:text-xl text-gray-700 font-semibold mt-6">
      No applications submitted yet.<router-link
        to="/"
        class="bg-gray-200 hover:bg-gray-300 w-full font-semibold text-gray-700 px-2 ml-2 py-1 rounded-md"
      >
        Let's Apply!</router-link
      >
    </p>
  </div>

  <div class="py-6">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 pb-6">
      <!-- Job Card 1 -->
      <routerLink
        v-for="(job, index) in applyJobArray"
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
        <div
          class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"
        ></div>
        <div class="text-sm text-gray-600 space-y-2">
          <p>
            <i class="fas fa-user-clock text-purple-500 mr-2"></i>
            <span class="text-purple-500"> {{ job.jobType }}</span>
          </p>
          <p><i class="fas fa-map-marker-alt mr-3"></i>{{ job.jobLocation }}</p>
          <p><i class="fas fa-briefcase mr-2"></i>{{ job.jobRequirement }}</p>
          <p><i class="fas fa-money-bill-wave mr-1"></i> {{ job.jobSalary }}</p>
        </div>
        <div class="mt-4 flex justify-center items-center">
          <span
            :class="{
              'w-full text-center text-sm font-semibold  px-2 py-2 rounded-full': true,
              'bg-gray-100 text-gray-600': job.jobStastus === 'Pending',
              'bg-green-100 text-green-600': job.jobStastus === 'Approved',
              'bg-pink-100 text-pink-600': job.jobStastus === 'Rejected',
            }"
          >
            {{ job.jobStastus }}
          </span>
        </div>
      </routerLink>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { getApplyUser } from "../../../Services/Api/UserService";
import { decodeToken } from "../../../Services/JWT/JwtDecode";

export default {
  setup() {
    const id = ref("");
    const applyJobArray = ref([]);
    const fetchApplyUser = async () => {
      try {
        const data = await getApplyUser(id.value);
        applyJobArray.value = data.data;
        console.log(applyJobArray);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    onMounted(async () => {
      await getUserId();
      fetchApplyUser();
    });
    return {
      fetchApplyUser,
      applyJobArray,
      getUserId,
    };
  },
};
</script>

<style lang="scss" scoped></style>
