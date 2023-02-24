<!-- 每条评论 右下角 进行 举报 楼层 日期 回复 等功能 -->
<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
</script>

<template>
  <el-tag class="ml-2" type="info">举报</el-tag>
  <el-tag class="ml-2" type="info">楼</el-tag>
  <el-tag class="ml-2" type="info">日期</el-tag>
  
  <el-tag>回复</el-tag>

</template>


<style scoped>

</style>

