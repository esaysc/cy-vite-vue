<script setup lang="ts">
import { ref, reactive, onBeforeMount, onMounted, toRaw } from 'vue'
import { toRefs, defineProps } from 'vue'
import useHotStore from '@/store/modules/hot';
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router';

const hotStore = useHotStore()
const { getUserInfoByArticleId,getArticleInfoByArticleId } = hotStore
const { ArticleAuthor,ArticleInfo } = storeToRefs(hotStore)
const props = defineProps({
  // 接收文章id
  articleId: Number,
})
const router = useRoute()
const articleId = router.query.articleId
console.log("接收的文章ID:",articleId);
console.log("接收到的 ArticleInfo 中的文章ID:",ArticleInfo.value.articleId);

const { title,contentMarkdown} = ArticleInfo.value

const params = {
  articleId: articleId
}


// onMounted(()=>{
//   const params = {
//     articleId: articleId
//   }
//   getUserInfoByArticleId(params)
//   getArticleInfoByArticleId(params)
// })


</script>

<template>
  <div class="container">
    {{ "标题:"+title}}
    {{ "文章ID:"+articleId }}
    <el-divider />
    {{ "文章内容:"+contentMarkdown}}

  </div>
</template>

<style scoped></style>
