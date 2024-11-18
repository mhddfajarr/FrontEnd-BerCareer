<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
  >
    <!-- Modal Container -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
      <div class="flex justify-between items-center border-b pb-3">
        <h3 class="text-2xl font-bold text-gray-700">Share This job</h3>
        <button
          @click="closeModal"
          class="text-gray-500 font-bold hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body (Form) -->
      <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-2">
        <div class="mb-4 flex items-center">
          <div class="flex w-full mt-1 space-x-2">
            <input
              type="text"
              id="shareLink"
              v-model="shareLinkValue"
              class="w-full text-gray-700 border bg-white rounded px-2 py-2 focus:outline-none focus:ring focus:ring-primary/50"
              required
              readonly
            />
            <button
              type="button"
              class="bg-primary hover:bg-primaryHover text-white px-8 py-2 text-sm font-semibold rounded-md transition-all duration-200 flex-grow"
              @click="handleButtonClick"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2";

export default defineComponent({
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    shareLink: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const shareLinkValue = ref(props.shareLink);
    const closeModal = () => {
      emit("close");
    };
    const submitForm = () => {
      console.log("Form submitted");
    };



    const handleButtonClick = () => {
    navigator.clipboard.writeText(shareLinkValue.value).then(() => {
        closeModal();
        Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Link copied to clipboard!',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        })
    })
    };


    return {
      closeModal,
      submitForm,
      shareLinkValue,
      handleButtonClick,
    };
  },
});
</script>

<style scoped>
/* Optional custom styling */
</style>
