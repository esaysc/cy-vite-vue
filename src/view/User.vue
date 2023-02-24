<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted,toRefs } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import InfoFormVue from '@/components/form/InfoForm.vue'; // 个人信息 展示及修改 界面
import ArticleListVue from '@/components/data/ArticleList.vue'; // 个人文章列表
import ChangeAvatarVue from '@/components/data/ChangeAvatar.vue'; // 个人头像 上传
import { useRoute } from 'vue-router'

const activeName = ref('first')


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>

<template>
  <div class="container" >
    <!-- 个人展示 -->
    <!-- tab选项：个人信息 文章数量 消息 收藏 -->
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="我的信息" name="first">
        <InfoFormVue></InfoFormVue>
      </el-tab-pane>
      <el-tab-pane label="我的文章" name="second"><ArticleListVue></ArticleListVue></el-tab-pane>
      <el-tab-pane label="修改头像" name="fourth"><ChangeAvatarVue></ChangeAvatarVue></el-tab-pane>
    </el-tabs>
    <!-- 展示区域 -->
  </div>
</template>

<style scoped>
/* 容器样式 */
.container{
  width:80%;
  margin: auto;
  top: 100px;
}
/* tabs 样式 */
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
