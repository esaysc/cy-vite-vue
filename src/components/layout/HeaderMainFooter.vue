<!-- 原设想的 头部 中间 底部 布局容器 -->
<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <slot name="header"></slot>
      </el-header>
      <el-main>
        <slot name="main"></slot>
      </el-main>
      <el-footer>
        <slot name="footer">
        </slot>
      </el-footer>
    </el-container>
  </div>
</template>


<style scoped></style>
