<template>
      <!-- Navbar -->
      <nav class="bg-slate-50 text-black p-4  border-b-2">
        <div class="container mx-auto flex justify-between items-center">
            <img src="/src/assets/images/berCareer-logo.png" alt="Logo" class="h-10" />
          <ul class="flex space-x-4">
            <li>
  <router-link to="login" class="bg-primary px-4 py-2 text-gray-100 hover:bg-primaryHover rounded-md">
    Login
  </router-link>
</li>
          </ul>
        </div>
      </nav>
  </template>
  
  <script>
  export default {
    name: 'Home',
  };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan di sini jika diperlukan */
  </style>
  