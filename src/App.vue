<template>
  <div >
  <RouterView/>
  </div>
</template>
<script>
import Login from "./components/auth/Login.vue";
import { RouterView } from "vue-router";

export default {
  components: {
     Login, RouterView
  },
  setup() {
  },
};
</script>

<style lang="scss" scoped></style>
