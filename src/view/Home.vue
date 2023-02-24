<script setup lang="ts">
  import { ref, reactive, onBeforeMount, onMounted } from 'vue'
  import HomePage from '@/components/page/HomePage.vue';
  import { useAuthStore } from '@/store/counter' // 自定义的token判断仓库
  const authStore = useAuthStore()
  console.log('authStore.getAuthenticated', authStore.isAuthenticated)
</script>

<template>
  <div class="containers">
    <HomePage></HomePage>

  </div>
</template>

<style scoped>
  
</style>
