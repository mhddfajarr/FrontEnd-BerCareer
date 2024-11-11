<template>
    <div class="flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-1 w-full mx-auto bg-slate-50">
        <RouterView />
      </main>
      <Footer />
    </div>
  </template>
  
  
  <script>
    import { RouterView } from 'vue-router';
    import Navbar from './Navbar.vue';
    import Footer from './Footer.vue';

    export default {
    components: {
        Footer,
        Navbar,
    },
    };
  </script>
  
  <style scoped>
  /* Tambahkan styling tambahan di sini jika diperlukan */
  </style>
  