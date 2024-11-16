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
              for="position"
              class="block text-gray-700 font-semibold text-left"
              >Skill</label
            >
            <input
              v-model="skillName"
              type="text"
              id="position"
              class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
              required
            />
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
import { toRefs } from "vue";
// import { addSkill } from "../../Services/Api/DetailService";

export default {
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { showModal } = toRefs(props);
    const skillName = ref("");

    const closeModal = () => {
      emit("close");
    };

    const submitForm = () => {
      try {
        const skillData = {
          skillName: skillName.value,
          // userId: password.value,
        };
        // addSkill(skillData);
      } catch (error) {
        console.error(error);
      }
      // Emit form data for parent handling
      // console.log("berhasilexperience")
    };

    return {
      skillName,
      showModal,
      closeModal,
      submitForm,
    };
  },
};
</script>

<style scoped>
/* Optional custom styling */
</style>
