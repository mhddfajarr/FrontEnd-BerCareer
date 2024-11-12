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
              DISPATCHER ASSA - PADANG SIDEMPUAN
            </h1>
          </div>
        </div>
        <hr class="my-4" />
        <div class="mb-4">
          <div class="flex items-center text-gray-600 mb-2">
            <i class="fas fa-briefcase mr-2"></i>
            <span>Kontrak</span>
          </div>
          <div class="flex items-center text-gray-600 mb-2">
            <i class="fas fa-map-marker-alt mr-2"></i>
            <span>On-site • Padang Sidempuan</span>
          </div>
          <div class="flex items-center text-gray-600 mb-2">
            <i class="fas fa-briefcase mr-2"></i>
            <span>Min. 1 years of experience</span>
          </div>
          <div class="flex items-center text-gray-600">
            <i class="fas fa-money-bill-wave mr-2"></i>
            <span>Negotiable</span>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <button
            class="bg-primary hover:bg-primaryHover font-semibold text-white px-4 py-2 rounded-lg mr-2"
          >
            Apply
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 font-semibold text-gray-700 px-4 py-2 rounded-lg mr-2"
          >
            Save Job
          </button>
        </div>

        <hr class="my-4" />

        <!-- Card Deskripsi Pekerjaan -->
        <div class="text-gray-700">
          <h2 class="text-xl font-bold mb-4">Requirements</h2>
          <p class="mb-4">
            Melakukan &amp; memastikan proses pengiriman barang meliputi:
          </p>
          <ul class="list-disc list-inside">
            <li class="mb-2">Merencanakan rute pengiriman</li>
            <li class="mb-2">Mengkoordinasikan pengiriman dengan Driver</li>
            <li class="mb-2">Merencanakan rute pengiriman</li>
            <li class="mb-2">Mengkoordinasikan pengiriman dengan Driver</li>
            <li class="mb-2">Merencanakan rute pengiriman</li>
            <li class="mb-2">Mengkoordinasikan pengiriman dengan Driver</li>
          </ul>
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

export default {
  setup() {
    return {};
  },
  components: {
    Breadcrumbs,
  },
};
</script>

<style lang="scss" scoped></style>
