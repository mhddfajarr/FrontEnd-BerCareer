<template>
    <div class="flex min-h-screen">
     <Sidebar :isSidebarVisible="isSidebarVisible" />
     <div :class="isSidebarVisible ? 'flex-1 max-w-[calc(100%-15rem)]' : 'w-full'" class="transition-all duration-300 flex flex-col">
       <Navbar @toggleSidebar="toggleSidebar" />
       <main class="flex-1 p-4 color-main-content overflow-x-auto">
         <RouterView />
       </main>
     </div>
   </div>
   
   </template>
   
   <script>
   import { RouterView } from 'vue-router';
   import Sidebar from './Sidebar.vue';
   import Navbar from './Navbar.vue';
   
   export default {
     components: {
       Sidebar,
       Navbar,
     },
     data() {
       return {
         isSidebarVisible: true,
       };
     },
     methods: {
       toggleSidebar() {
         this.isSidebarVisible = !this.isSidebarVisible;
       },
     },
   };
   </script>
   
   <style>
   .color-main-content {
     background-color: #ededed;
   }
   </style>
   