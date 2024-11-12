<template>
    <!-- <div class="px-6 py-2">
     <h1 class="font-bold text-2xl md:text-3xl text-gray-700  mb-6 text-left">
        Save Jobs
    </h1>
</div> -->
    <div class="flex flex-col justify-center items-center h-full text-center">
     <img src="../../../assets/images/notFound.png" alt="Not Found" class="w-72 mt-10 h-auto">
     <p  class="text-xl text-gray-700 font-bold mt-6">No Saved Jobs.<router-link to="/" class="bg-gray-300 hover:bg-gray-400 w-full font-semibold text-gray-700 px-2 ml-2 py-1 rounded-md"> Let's Apply!</router-link>  </p>
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
      <div class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"></div>

      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i>
          <span class="text-purple-500"> Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>

      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>

      <div class="absolute top-0 right-0 p-3">
        <i class="far fa-bookmark text-gray-400"></i>
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
      <div class="w-24 mx-auto border-t-4 rounded-sm border-primary mb-4"></div>

      <div class="text-sm text-gray-600 space-y-2">
        <p>
          <i class="fas fa-user-clock text-purple-500"></i>
          <span class="text-purple-500"> Penuh waktu</span>
        </p>
        <p><i class="fas fa-map-marker-alt"></i> On-site • Ambon</p>
        <p><i class="fas fa-briefcase"></i> Min. 1 years of experience</p>
        <p><i class="fas fa-dollar-sign"></i> Negotiable</p>
      </div>

      <div class="mt-4">
        <span class="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
          Rekruter aktif 1 jam lalu
        </span>
      </div>

      <div class="absolute top-0 right-0 p-3">
        <i class="far fa-bookmark text-gray-400"></i>
      </div>
    </routerLink>


  </div>
</div>
 


</template>

<script>
export default {
    setup () {
        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>