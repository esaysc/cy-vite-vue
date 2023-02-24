<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import TopContentVue from '../components/contents/TopContent.vue';

</script>

<template>
  <div class="container">
    <!-- 固定菜单栏 -->
    
    <el-affix :offset="0">
      <TopContentVue class="top-content-vue"></TopContentVue>
    </el-affix>
    
    <!--声明路由占位符标签-->
	  <router-view>
    </router-view>
  </div>
</template>

<style scoped></style>
