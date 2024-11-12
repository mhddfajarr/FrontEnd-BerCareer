<template>
  <!-- Footer -->
   <div>
  <footer class="bg-primary text-gray-200 container mx-auto px-10 py-10 md:px-0 md:pt-10 md:pb-2  text-sm">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Newsletter Section -->
      <div class="flex flex-col items-center justify-center">
        <img
          alt="Berca Hardayaperkasa logo"
          class="mb-4 w-64"
          src="/src/assets/images/BerCareerNoTP.png"
        />
      </div>

      <!-- Contact Us Section -->
      <div>
        <h2 class="text-lg font-bold">CONTACT US</h2>
        <div class="border-t border-4 border-gray-400 w-1/3 mb-3 mt-2"></div>
        <div class="mb-2 flex items-start">
          <i class="fas fa-map-marker-alt mr-2 mt-1"> </i>
          <p>Berca Building, Jl. Abdul Muis no.62 Jakarta Pusat 10160</p>
        </div>
        <div class="mb-2 flex items-start">
          <i class="fas fa-phone-alt mr-2 mt-1"> </i>
          <p>Telepon 1: (+62-21) 380-0902</p>
        </div>
        <div class="mb-2 flex items-start">
          <i class="fas fa-fax mr-2 mt-1"> </i>
          <p>Fax 1: (+62-21) 351-8814</p>
        </div>
        <div class="mb-2 flex items-start">
          <i class="fas fa-envelope mr-2 mt-1"> </i>
          <p>marketing@berca.co.id</p>
        </div>
      </div>

      <!-- Menu Section -->
      <div>
        <h2 class="text-lg font-bold">MENU</h2>
        <div class="border-t border-4 border-gray-400 w-1/3 mb-3 mt-2"></div>
        <ul>
          <li class="mb-2 hover:font-bold">
            <a class="hover:underline" href="#"> HOME </a>
          </li>
          <li class="mb-2 hover:font-bold">
            <a
              class="hover:underline"
              href="https://www.berca.co.id/articles-and-news/"
              target="_blank"
            >
              ARTICLES &amp; NEWS
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="mt-8 text-center">
      <p class="text-sm">&copy; 2024 Bercareer. All rights reserved.</p>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Tambahkan styling tambahan di sini jika diperlukan */
</style>
