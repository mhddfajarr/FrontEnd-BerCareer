<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-xl font-semibold text-gray-700">Add Skill</h3>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <!-- Modal Body (Form) -->
      <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-2">
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label
              for="skillName"
              class="block text-gray-700 font-semibold text-left"
              >Skill</label
            >
            <input
              type="text"
              id="skillName"
              v-model="skillName"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
            />
            <p
              v-if="skillNameError"
              class="text-red-500 text-xs text-left mt-1"
            >
              {{ skillNameError }}
            </p>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end space-x-4">
        <button
          @click="closeModal"
          class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
        >
          Close
        </button>
        <button
          @click="submitForm"
          class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, watch, onMounted } from 'vue';
import { decodeToken } from '../../Services/JWT/JwtDecode';
import { addSkill } from '../../Services/Api/UserService';
import { eventBus } from '../../Services/EvenBus';
import Swal from 'sweetalert2';

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const userId = ref("")
    const skillName = ref("")
    const skillNameError = ref("")
    const closeModal = () => {
      emit('close');
    };

    const getUserId = async () => {
    try {
      const dataUser = await decodeToken();
      userId.value = dataUser.uid;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  watch(skillName, () => {
    skillNameError.value = "";
  });

  const validateForm = () => {
    let isValid = true;
    if (!skillName.value) {
      skillNameError.value = "Skill name is required";
      isValid = false;
    } else {
      skillNameError.value = "";
    }
    return isValid;
  };

    const submitForm = async() => {
      if (!validateForm()) return;

    const newData = {
      skillName: skillName.value,
      userId: userId.value,
    };
      try {
        await addSkill(newData);
        eventBus.emit("newSkill");
        closeModal();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Success add new skill!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    onMounted(()=>{
      getUserId()
    })
    return {
      skillName,userId,
      closeModal,skillNameError,
      submitForm,getUserId
    };
  },
});
</script>

<style scoped>
/* Optional custom styling */
</style>
