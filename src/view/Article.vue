<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted } from 'vue'
import PaginationVue from '@/components/data/Pagination.vue'
import ReplyInputVue from '../components/form/ReplyInput.vue'
import RemarksVue from '../components/Remarks.vue'
import { toRefs, defineProps } from 'vue'

import HeaderMainFooterVue from '@/components/layout/HeaderMainFooter.vue';
import useHotStore from '@/store/modules/hot'
import ArticlePage from '@/components/page/ArticlePage.vue'
import { storeToRefs } from 'pinia'
// hot Store
const store = useHotStore()
// 取出 请求文章列表和文章函数 所有文章列表 一个文章
const {Article} = store
const articleId = Article.articleId
console.log("article接收的文章ID:",articleId);


// 获取文章内容
</script>

<template>
  <HeaderMainFooterVue >
    <!-- 文章标题 -->
    <template #header>
      <ArticlePage :articleId="articleId"></ArticlePage>
    </template> 
    <!-- 文章内容 -->
    <template #main>
    </template>
    <!-- 文章评论区 -->
    <template #footer>
      

    </template>
  </HeaderMainFooterVue>
</template>

<style scoped>

</style>



