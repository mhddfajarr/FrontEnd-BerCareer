<template>
    <nav class="navbar bg-white flex items-center justify-between border-b border-gray-300 shadow-xl">
      <div class="flex-none">
        <button @click="$emit('toggleSidebar')" class="btn btn-square btn-ghost text-slate-600">
          <i class="fas fa-bars text-lg"></i>
        </button>
      </div>
      <div class="flex-none gap-2">
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow ">
          <li>
            <RouterLink to="#" class="w-full flex items-center" data-toggle="modal" data-target="#modal-default" data-tooltip="tooltip" data-placement="top" @click="passwordModal = true">
              <a class="justify-between">
              Settings
            </a>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="Login" class="w-full flex items-center">
              <a class="justify-between">
              Logout
            </a>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div v-if="passwordModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <!-- Modal Container -->
        <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <!-- Modal Header -->
            <div class="flex justify-between items-center border-b pb-3">
              <h3 class="text-xl font-semibold">Settings</h3>
              <button @click="passwordModal = false" class="text-gray-500 hover:text-gray-700">✕</button>
            </div>
              <!-- Modal Body -->
              <div class="modal-body">
                <form id="quickForm">
                  <div class="card-body">
                    <h4 class="text-lg font-bold mb-2">Name</h4>
                    <input v-model="newUniversityName" type="text" placeholder="" class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50" />
                    <h4 class="text-lg font-bold mb-2">Old Password</h4>
                    <input v-model="newUniversityName" type="text" placeholder="Old Password" class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50" />
                    <h4 class="text-lg font-bold mb-2">New Password</h4>
                    <input v-model="newUniversityName" type="text" placeholder="New Password" class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50" />
                    <h4 class="text-lg font-bold mb-2">Repeat New Password</h4>
                    <input v-model="newUniversityName" type="text" placeholder="Repeat New Password" class="w-full text-gray-700 border bg-white rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-primary/50" />
                  </div>
                </form>
              </div>
              <!-- Modal Footer -->
              <div class="mt-6 flex justify-end space-x-4">
                <button @click="passwordModal = false" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">Close</button>
                <button class="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-md">Save Changes</button>
              </div>
        </div>
        </div>
    </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        passwordModal: false, // State to control modal visibility
      };
    },
  };
  </script>