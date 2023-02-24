<!-- 根页面 -->
<script setup lang="ts">
import TopContentVue from './components/contents/TopContent.vue';
import Scrollbar from './components/basic/Scrollbar.vue'

</script>

<template>
  <!-- 加滚动条 -->
  <!-- <Scrollbar>
    <router-view>
    </router-view>
  </Scrollbar> -->
  <router-view>
    </router-view>
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.top-content-vue{
  height: auto;
}
</style>
