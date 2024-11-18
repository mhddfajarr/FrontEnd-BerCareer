<template>
  <div
    :class="[
      'transition-all duration-300 color-primary text-slate-200 flex flex-col',
      isSidebarVisible ? 'w-60' : 'w-[4.5rem]',
    ]"
  >
    <div class="px-2">
      <div
        class="flex items-center justify-center py-4"
        :class="[
          isSidebarVisible ? '' : 'invisible opacity-0 pointer-events-none',
        ]"
      >
        <img
          src="../../../assets/images/logo-berca-2.png"
          alt="Avatar"
          class="h-9 w-9 rounded-full object-cover"
        />
        <h2 class="text-2xl font-bold">RAS Bercareer</h2>
      </div>
      <hr class="border-gray-500 border-1 mb-4" />
      <div v-if="Role == 'Super Admin'">
        <ul :class="[isSidebarVisible ? '' : 'mt-5']">
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/admin' }"
          >
            <RouterLink to="admin" class="w-full flex items-center">
              <i
                class="fas fa-home text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Dashboard</span
              >
            </RouterLink>
          </li>

          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/ManageRole' }"
          >
            <RouterLink to="ManageRole" class="w-full flex items-center">
              <i
                class="fas fa-solid fa-briefcase text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Manage Role</span
              >
            </RouterLink>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul :class="[isSidebarVisible ? '' : 'mt-5']">
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/admin' }"
          >
            <RouterLink to="admin" class="w-full flex items-center">
              <i
                class="fas fa-home text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Dashboard</span
              >
            </RouterLink>
          </li>

          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/ManageJob' }"
          >
            <RouterLink to="ManageJob" class="w-full flex items-center">
              <i
                class="fas fa-solid fa-briefcase text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Manage Job Portal</span
              >
            </RouterLink>
          </li>
          <li
            class="py-2 px-2 flex items-center mb-1"
            :class="{ active: $route.path === '/ManageJobseekers' }"
          >
            <RouterLink to="ManageJobseekers" class="w-full flex items-center">
              <i
                class="fas fa-solid fa-people-roof text-lg ml-2"
                :class="[isSidebarVisible ? '' : 'ml-2.5']"
              ></i>
              <span
                :class="[isSidebarVisible ? '' : 'hidden']"
                class="ml-2 font-semibold"
                >Manage Jobseekers</span
              >
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  props: ["isSidebarVisible", "Role"],
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
