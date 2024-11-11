<template>
    <nav class="navbar bg-white flex items-center justify-between border-b border-gray-300">
      <div class="flex-none">
        <button @click="$emit('toggleSidebar')" class="btn btn-square btn-ghost text-slate-600">
          <i class="fas fa-bars text-lg"></i>
        </button>
      </div>
      <div class="flex-none">
        <button class="btn btn-ghost text-slate-600">
          <i class="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  