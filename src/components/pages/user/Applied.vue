<template>
  <div
    class="flex flex-col justify-center items-center h-full text-center mt-32 md:mt-0"
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
        to="Jobs"
        class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <div class="flex items-center justify-center mb-2">
          <div>
            <h2 class="text-xl font-bold text-gray-700">
              Area Sales Leader - Ambon
            </h2>
          </div>
        </div>
        <!-- Garis horizontal di bawah h2 -->
        <div
          class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"
        ></div>
        <div class="text-sm text-gray-600 space-y-2">
          <p>
            <i class="fas fa-user-clock text-purple-500"></i>
            <span class="text-purple-500"> Penuh waktu</span>
          </p>
          <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
          <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
          <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
        </div>
        <div class="mt-4 flex justify-center items-center">
          <span
            class="w-full text-center font-md font-semibold bg-gray-100 text-gray-600 text-xs px-2 py-2 rounded-full"
          >
            Pending
          </span>
        </div>
      </routerLink>

      <routerLink
        to="Jobs"
        class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <div class="flex items-center justify-center mb-2">
          <div>
            <h2 class="text-xl font-bold text-gray-700">
              Area Sales Leader - Ambon
            </h2>
          </div>
        </div>
        <!-- Garis horizontal di bawah h2 -->
        <div
          class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"
        ></div>
        <div class="text-sm text-gray-600 space-y-2">
          <p>
            <i class="fas fa-user-clock text-purple-500"></i>
            <span class="text-purple-500"> Penuh waktu</span>
          </p>
          <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
          <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
          <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
        </div>
        <div class="mt-4 flex justify-center items-center">
          <span
            class="w-full text-center font-md font-semibold bg-green-100 text-green-600 text-xs px-2 py-2 rounded-full"
          >
          Approved
          </span>
        </div>
      </routerLink>

      <routerLink
        to="Jobs"
        class="bg-white rounded-lg shadow-lg p-4 relative hover:border border-primary transform hover:scale-105 transition-all duration-200 ease-in-out"
      >
        <div class="flex items-center justify-center mb-2">
          <div>
            <h2 class="text-xl font-bold text-gray-700">
              Area Sales Leader - Ambon
            </h2>
          </div>
        </div>
        <!-- Garis horizontal di bawah h2 -->
        <div
          class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"
        ></div>
        <div class="text-sm text-gray-600 space-y-2">
          <p>
            <i class="fas fa-user-clock text-purple-500"></i>
            <span class="text-purple-500"> Penuh waktu</span>
          </p>
          <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
          <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
          <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
        </div>
        <div class="mt-4 flex justify-center items-center">
          <span
            class="w-full text-center font-md font-semibold bg-pink-100 text-pink-600 text-xs px-2 py-2 rounded-full"
          >
          Rejected
          </span>
        </div>
      </routerLink>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
