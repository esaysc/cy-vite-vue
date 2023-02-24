<!-- 侧边栏 菜单 可折叠 -->
<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

var isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  
}
</script>
<template>
  <div class="contents">
    <!-- 菜单折叠 控制按钮 -->
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>

  
  <!-- 菜单主体 -->
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    
    
  >
  <div class="toggle-button" @click="toggleCollapse">|||</div>
  <!-- 一级菜单 -->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
  </div>
</template>



<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
.toggle-button{
 /* // 添加背景颜色 */
 background-color: #4A5064;
 /* // 设置文本大小 */
 font-size:10px;
 /* // 设置文本行高 */
 line-height:24px;
 /* // 设置文本颜色 */
 color:#fff;
 /* // 设置文本居中 */
 text-align: center;
 /* // 设置文本间距 */
 letter-spacing: 0.2em;
 /* // 设置鼠标悬浮变小手效果 */
 cursor:pointer;
}
.contents{
  width:200px;
  height: auto;
}
</style>
