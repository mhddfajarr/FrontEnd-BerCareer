<template>
    <div
      :class="[
        'transition-all duration-300 color-primary text-slate-200 flex flex-col',
        isSidebarVisible ? 'w-60' : 'w-[4.5rem] hover:w-60',
      ]"
    >
      <div class="px-2">
        <div
          class="flex items-center justify-center py-4"
          :class="[
            isSidebarVisible ? '' : 'invisible opacity-0 pointer-events-none',
          ]"
        >
          <h2 class="text-2xl font-bold">Manage Jobs</h2>
        </div>
        <hr class="border-gray-500 border-1 mb-4" />
        <div class="flex items-center px-2 ml-1 mb-4">
          <img
            src="https://plus.unsplash.com/premium_photo-1693258698597-1b2b1bf943cc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Avatar"
            class="h-9 w-9 rounded-full object-cover"
          />
          <div class="ml-2" :class="[isSidebarVisible ? '' : 'hidden']">
            <p class="font-semibold">Muhammad Fajar</p>
          </div>
        </div>
        <hr class="border-gray-500 border-1 mb-3" />
        <ul :class="[isSidebarVisible ? '' : 'mt-5']">
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/dashboard' }"
          >
            <RouterLink to="dashboard" class="w-full flex items-center">
              <i
                class="fas fa-home text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Home</span
              >
            </RouterLink>
          </li>
  
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/university' }"
          >
            <RouterLink to="university" class="w-full flex items-center">
              <i
                class="fas fa-building-columns text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >University</span
              >
            </RouterLink>
          </li>
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/register' }"
          >
            <RouterLink to="register" class="w-full flex items-center">
              <i
                class="fas fa-user-plus text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Regiter Account</span
              >
            </RouterLink>
          </li>
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/accountRole' }"
          >
            <RouterLink to="accountRole" class="w-full flex items-center">
              <i
                class="fas  fa-users-cog text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Account Role</span
              >
            </RouterLink>
          </li>
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/role' }"
          >
            <RouterLink to="role" class="w-full flex items-center">
              <i
                class="fas fa-user-shield text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Role</span
              >
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { RouterLink } from "vue-router";
  
  export default {
    props: ["isSidebarVisible"],
  };
  </script>
  
  <style scoped>
  .color-primary {
    background-color: #0a4d80;
  }
  .active {
    @apply bg-white text-black rounded;
  }
  </style>
  