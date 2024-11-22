<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex items-center mb-2 cursor-pointer">
      <span class="mr-2" @click="toggleShow">
        <i
          :class="
            showItems
              ? 'fas fa-chevron-down text-gray-700'
              : 'fas fa-chevron-right text-gray-700'
          "
        ></i>
      </span>
      <div class="flex justify-between w-full items-center">
        <h1 class="text-xl font-bold text-black" @click="toggleShow">Skill
          <span v-if="dataSkill.length < 1"  class="text-red-500">*</span>
        </h1>
        <button
          v-if="dataSkill.length > 0"
          @click="isEdit = !isEdit"
          class="flex items-center bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-600 text-gray-400 px-2 py-1 transition-all duration-250 ease-in-out ml-auto"
        >
          <i :class="isEdit ? 'fas fa-times' : 'fas fa-trash'" class="mr-2"></i>
          <span>{{ isEdit ? "Close Delete" : "Remove Skill" }}</span>
        </button>
      </div>
    </div>

    <div class="mt-5 bg-gray-700 h-px mb-4"></div>

    <div v-if="showItems" class="flex flex-wrap mt-4 gap-2">
      <div
        v-for="skill in dataSkill"
        :key="skill.skillId"
        class="flex items-center bg-gray-100 text-gray-800 rounded-full px-3 py-1"
      >
        <span>{{ skill.skillName }}</span>
        <button
          v-if="isEdit"
          @click="deleteSkillUser(skill.skillId)"
          class="ml-2 text-xl text-red-500 hover:text-red-700 focus:outline-none"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <div class="flex justify-center mt-7">
      <button
        @click="openModal"
        class="text-primaryHover hover:text-white hover:rounded-md hover:bg-primary px-3 py-2 font-semibold flex items-center justify-center transition-all duration-250 ease-in-out"
      >
        <i class="fas fa-plus-circle mr-2"></i>
        Add Skill
      </button>
      <ModalAddSkill
        v-if="showModalSkill"
        :showModal="showModalSkill"
        @close="closeModal"
        @click.self="closeModal" 
      />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import ModalAddSkill from "./ModalAddSkill.vue";
import { getSkillUser, deleteSkill } from "../../Services/Api/UserService";
import { decodeToken } from "../../Services/JWT/JwtDecode";
import Swal from "sweetalert2";
import { eventBus } from "../../Services/EvenBus";

export default {
  name: "SkillCard",
  components: {
    ModalAddSkill,
  },
  setup() {
    const showModalSkill = ref(false);
    const dataSkill = ref([]);
    const userId = ref("");
    const isEdit = ref(false);
    const showItems = ref(true);
    const toggleShow = () => {
      showItems.value = !showItems.value;
    };

    const openModal = () => {
      showItems.value = true;
      showModalSkill.value = true;
    };
    const closeModal = () => {
      showModalSkill.value = false;
    };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        userId.value = dataUser.uid;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    const fetchSkillUser = async () => {
      try {
        const data = await getSkillUser(userId.value);
        dataSkill.value = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const deleteSkillUser = async (skillId) => {
      try {
        const data = {
          userId: userId.value,
          id: skillId,
        };
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this action!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        });

        if (result.isConfirmed) {
          await deleteSkill(data);
          await fetchSkillUser();
          eventBus.emit("checkProgres");
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Success deleted experience!",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      } catch (error) {
        console.error("Gagal menghapus pekerjaan:", error);
      }
    };

    eventBus.on("newSkill", fetchSkillUser);
    onMounted(async () => {
      await getUserId();
      await fetchSkillUser();
    });

    return {
      showItems,
      toggleShow,
      deleteSkillUser,
      getUserId,
      fetchSkillUser,
      dataSkill,
      showModalSkill,
      openModal,
      closeModal,
      isEdit,
    };
  },
};
</script>

<style scoped>
/* Styles spesifik untuk komponen ini */
</style>
