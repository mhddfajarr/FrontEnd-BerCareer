<template>
  <Breadcrumbs :title="jobs.title || 'Default Title'" />
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

        <div class="flex flex-wrap items-center mb-7 mt-7">
          <!-- Tombol Apply -->

          <div v-if="isExpired" class="cursor-not-allowed">
            <button
              class="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700 px-4 py-2 rounded-md mr-2 mb-2 w-full sm:w-auto text-sm sm:text-base btn-disabled cursor-pointer"
              @click="postApplyJob(jobs.jobId)"
            >
              This job is expired
            </button>
          </div>
          <div v-else>
            <button
              class="bg-primary hover:bg-primaryHover font-semibold text-white px-4 py-2 rounded-md mr-2 mb-2 w-full sm:w-auto text-sm sm:text-base"
              @click="postApplyJob(jobs.jobId)"
            >
              {{ isApplied ? "Applied" : "Apply" }}
            </button>
          </div>

          <!-- Tombol Save/Remove Favorite -->
          <button
            class="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700 px-4 py-2 rounded-md mr-2 mb-2 w-full sm:w-auto text-sm sm:text-base"
            @click="isSaved ? deleteSaveJob(jobs.jobId) : saveJob(jobs.jobId)"
          >
            <i
              :class="
                isSaved
                  ? 'fas fa-bookmark text-primary mr-2'
                  : 'far fa-bookmark text-gray-400 mr-2'
              "
            ></i>
            {{ isSaved ? "Remove save job" : "Save Job" }}
          </button>

          <!-- Tombol Share -->
          <button
            @click="showModalShareLink = true"
            class="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-700 px-4 py-2 rounded-md mr-2 mb-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <i class="fas fa-share-alt text-primary"></i>
            Share
          </button>

          <!-- Modal Share Link -->
          <ModalShareLink
            v-if="showModalShareLink"
            :showModal="showModalShareLink"
            :shareLink="fullUrl"
            @close="showModalShareLink = false"
          />
        </div>

        <hr class="my-4" />

        <!-- Card Deskripsi Pekerjaan -->
        <div class="text-gray-700">
          <h2 class="text-xl font-bold mb-4">Description</h2>
          <p v-html="jobs.description" class="mb-4"></p>
        </div>
      </div>
    </div>

    <!-- Kolom 2: Card Benefit Perusahaan -->
    <div
      class="w-full lg:w-1/3 bg-white p-4 text-gray-700 shadow-md h-60 rounded-lg sticky top-0 border-t-4 border-primary"
    >
      <div class="w-full h-full">
        <h2 class="text-2xl font-bold text-gray-700 mt-2">Job Information</h2>
        <hr class="my-4" />
        <ul class="">
          <li class="flex items-center p-2">
            <i class="fas fa-user-check text-gray-600 mr-2"></i>
            <span>{{ totalApplications }} Applicants</span>
          </li>
          <li class="flex items-center p-2">
            <i class="fas fa-calendar-day text-gray-600 mr-2"></i>
            <span>Posted on {{ jobs.postDate }}</span>
          </li>
          <li class="flex items-center p-2">
            <div v-if="isExpired">
              <i class="fas fa-calendar-check text-red-600 mr-2"></i>
              <span class="text-red-600">Due to {{ jobs.dueDate }}</span>
            </div>
            <div v-else>
              <i class="fas fa-calendar-check text-gray-600 mr-2"></i>
              <span>Due to {{ jobs.dueDate }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from "../../User/Breadcrumbs.vue";
import {
  deleteSaveJobs,
  getJobsById,
  saveJobs,
  getSaveJob,
  applyJob,
  getApplyUser,
  getAllAplication,
  getProfileUser,
  getExperienceUser,
  getEducationUser,
  getSkillUser,
} from "../../../Services/Api/UserService";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import moment from "moment";
import ModalShareLink from "../../User/modalShareLink.vue";

export default {
  components: {
    Breadcrumbs,
    ModalShareLink,
  },
  setup() {
    const showModalShareLink = ref(false);
    const id = ref("");
    const jobs = ref({});
    const savedJob = ref([]);
    const applyJobArray = ref([]);
    const token = localStorage.getItem("authToken");
    const isSaved = ref(false);
    const route = useRoute();
    const getJobId = ref(route.params.id);
    const isApplied = ref(false);
    const totalApplications = ref(0);
    const dataApplication = ref([]);
    const fullUrl = window.location.href;
    const dataProfile = ref([]);
    const dataExperience = ref([]);
    const dataEducation = ref([]);
    const dataSkill = ref([]);
    const router = useRouter();

    const isExpired = ref(false);
    

    const fetchAllAplication = async () => {
      try {
        const data = await getAllAplication();
        dataApplication.value = data.data;

        const filteredApplications = data.data.filter(
          (application) => application.jobId === getJobId.value
        );

        totalApplications.value = filteredApplications.length;
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    const postApplyJob = async (jobId) => {
      // cek login
      if (!token) {
        Swal.fire("info", "Please login first.", "info");
        router.push("/login");
        const params = route.params.id
        localStorage.setItem("redirect", params);
        return;
      }
      if (isApplied.value) {
        Swal.fire("You have already applied for this job.", "", "info");
        return;
      }
      // Cek profile si  user
      if (
        dataProfile.value.profileImage == null ||
        dataExperience.value.length < 1 ||
        dataEducation.value.length < 1 ||
        dataSkill.value.length < 1
      ) {
        Swal.fire({
          title: "Please complete your profile first.",
          icon: "info",
          showCancelButton: true,
          cancelButtonText: "Close",
          confirmButtonText: "Go to Profile",
          confirmButtonColor: "#0a4d80",
          cancelButtonColor: "#d33",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/profile");
          }
        });

        return;
      } else {
        try {
          const data = {
            userId: id.value,
            jobId: jobId,
            applyDate: new Date().toISOString(),
          };
          await applyJob(data);
          isApplied.value = true;
          await fetchAllAplication();

          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Success apply!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        } catch (exception) {
          console.log(exception);
          Swal.fire("Error", "An error occurred while applying.", "error");
        }
      }
    };

    const saveJob = async (jobId) => {
      if (!token) {
        Swal.fire("Error", "Please login first.", "error");
        return;
      }
      try {
        const data = {
          userId: id.value,
          jobId: jobId,
        };
        await saveJobs(data);
        isSaved.value = true;
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Success save job!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Gagal menyimpan pekerjaan:", error);
      }
    };

    const fetchSavedJobs = async () => {
      if (!token) return;

      try {
        const data = await getSaveJob(id.value);
        savedJob.value = data.data;

        const jobExists = savedJob.value.some(
          (job) => job.jobId === getJobId.value
        );
        isSaved.value = jobExists;
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    const fetchApplyUser = async () => {
      if (!token) return;
      try {
        const data = await getApplyUser(id.value);
        applyJobArray.value = data.data;
        const jobExists = applyJobArray.value.some(
          (job) => job.jobId === getJobId.value
        );
        isApplied.value = jobExists;
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    const deleteSaveJob = async (jobId) => {
      if (!token) return;
      try {
        const data = {
          userId: id.value,
          jobId: jobId,
        };
        console.log("Data yang dikirim:", data);
        await deleteSaveJobs(data);
        isSaved.value = false;
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Removed save job!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Gagal menghapus pekerjaan:", error);
      }
    };

    const fetchJobDetail = async () => {
      try {
        const jobId = getJobId.value;
        const data = await getJobsById(jobId);
        jobs.value = data.data;

        console.log(jobs.value.title + " : " + "Due : " + jobs.value.dueDate);
        if (jobs.value && jobs.value.postDate) {
          jobs.value.postDate = moment(jobs.value.postDate).format(
            "MMMM DD, YYYY"
          );
        }
        if (jobs.value.dueDate) {
          jobs.value.dueDate = moment(jobs.value.dueDate).format(
            "MMMM DD, YYYY"
          );
          const dueDate = moment(jobs.value.dueDate, "MMMM DD, YYYY")
            .startOf("day")
            .toDate();
          const today = moment().startOf("day").toDate();
          isExpired.value = dueDate < today;
        }
        console.log(jobs.value.title + " : " + "Due : " + jobs.value.dueDate);
        // console.log(jobs.value.title + " : " + "Due : " + jobs.value.dueDate);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProfile = async () => {
      try {
        const userId = id.value;
        const data = await getProfileUser(userId);
        dataProfile.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchExperience = async () => {
      try {
        const data = await getExperienceUser(id.value);
        dataExperience.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch education data
    const fetchEducation = async () => {
      try {
        const data = await getEducationUser(id.value);
        dataEducation.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch skill data
    const fetchSkill = async () => {
      try {
        const data = await getSkillUser(id.value);
        dataSkill.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
        console.log(id.value);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    onMounted(async () => {
      if (token) {
        await getUserId();
        fetchSavedJobs();
        fetchApplyUser();
        fetchProfile();
        fetchExperience();
        fetchEducation();
        fetchSkill();
        fetchAllAplication();
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      fetchJobDetail();
    });

    return {
      dataProfile,
      fetchExperience,
      fetchEducation,
      fetchSkill,
      fetchProfile,
      showModalShareLink,
      dataApplication,
      totalApplications,
      jobs,
      savedJob,
      isSaved,
      saveJob,
      deleteSaveJob,
      fetchJobDetail,
      fetchSavedJobs,
      fetchApplyUser,
      getJobId,
      postApplyJob,
      route,
      isApplied,
      fullUrl,
      isExpired,
    };
  },
};
</script>

<style lang="scss" scoped></style>
