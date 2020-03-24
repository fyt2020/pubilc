<template>
  <div class="layout-wrapper">
    <m-head />
    <div class="content-one">
      <m-nav />
      <div class="con">
         <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import MHead from "@/components/header/header.vue";
import MNav from "@/components/navigation/navigation.vue";
export default {
  data() {
    return {};
  },
  methods:{
  },
  components: {
    MHead,
    MNav
  }
};
</script>
<style lang="scss">
@import "@/assets/css/layout/layout.scss";
</style>