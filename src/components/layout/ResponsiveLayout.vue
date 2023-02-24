<!-- 响应式 布局 通过el-row el-col 行列控制 显示区域 -->

<template>
  
  <!-- 第一行 -->
  <el-row :gutter="10">
    <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="10"
      >
    <slot name="lefter"></slot>
  </el-col>
    <el-col :xs="16" :sm="18" :md="18" :lg="18" :xl="14"
      >
      <slot name="main"></slot>
    </el-col>
  </el-row>

  <!-- 第二行 -->
  <el-row :gutter="10">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24"
      >
      <slot name="footer"></slot>
    </el-col>
  </el-row>
</template>

<style>
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
