<template>
  <div class="newLayout">
      <div class="Head">
          <m-head />
      </div>
      <div class="Main">
          <router-view />
      </div>
  </div>
</template>
<script>
import MHead from "@/components/header/newHead.vue";
export default {
  data() {
    return {};
  },
  components: {
    MHead
  }
};
</script>

<style lang="scss">
@import "@/assets/css/layout/newLayout.scss";
</style>