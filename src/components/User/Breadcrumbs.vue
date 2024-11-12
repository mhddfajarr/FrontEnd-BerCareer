<template>
  <nav aria-label="Breadcrumb" class="bg-gray-100 px-5 py-3 rounded-lg">
    <ol class="flex space-x-2 text-sm font-medium text-gray-700">
      <li>
        <router-link to="/" class="text-primary hover:text-primaryHover"
          >Home</router-link
        >
      </li>
      <li>
        <span class="text-gray-500">/</span>
      </li>
      <li>
        <span class="text-gray-400">Nama Jobs</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumbs",
};
</script>

<style lang="scss" scoped></style>
