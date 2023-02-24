<!-- 原设想的 主要内容显示区域  -->
<script setup lang="ts">
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 左区域 => 折叠菜单 -->
      <el-aside width="200px">
        <slot name="lefter"></slot>
      </el-aside>
      <!-- 主区域 => 显示内容 -->
      <el-main>
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout{
  margin-top: 0px;
}</style>

