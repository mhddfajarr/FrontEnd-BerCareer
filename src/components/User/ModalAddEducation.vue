<template>
    <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <!-- Modal Container -->
      <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-[50%]">
        <!-- Modal Header -->
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-xl font-semibold text-gray-700">Add Education</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">✕</button>
        </div>
  
        <!-- Modal Body (Form) -->
        <div class="mt-4 max-h-full md:max-h-80 overflow-y-auto p-5">
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label for="univName" class="block text-gray-700 font-semibold text-left">University Name</label>
              <input
                type="text"
                id="univName"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="mb-4">
              <label for="degree" class="block text-gray-700  font-semibold text-left">Degree</label>
              <input
                type="text"
                id="degree"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="mb-4">
              <label for="gpa" class="block text-gray-700 font-semibold text-left">GPA</label>
              <input
                type="text"
                id="gpa"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                required
              />
            </div>
            <div class="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
              <div class="w-full md:flex-1">
                <label for="startDate" class="block text-gray-700 font-semibold text-left">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                  required
                />
              </div>
              <div class="w-full md:flex-1">
                <label for="endDate" class="block text-gray-700 font-semibold text-left">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                  required
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="description" class="block text-gray-700 font-semibold text-left">Description</label>
              <textarea
                id="description"
                class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50"
                rows="4"
                required
              ></textarea>
            </div>
          </form>
        </div>
  
        <!-- Modal Footer -->
        <div class="flex justify-end space-x-4">
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">Close</button>
          <button @click="submitForm" class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md">Submit</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
 props: {
   showModal: {
     type: Boolean,
     required: true,
   },
 },
 methods:{
   closeModal() {
       this.$emit('close');
     },
   submitForm(){
       console.log('berhasil')
   }
 }
 // Code lainnya
};
</script>


<style lang="scss" scoped>

</style>
